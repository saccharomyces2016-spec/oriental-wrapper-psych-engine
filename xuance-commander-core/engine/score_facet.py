"""
Engine Core - Facet Scoring
Supports:
- legacy weighted_sum
- vector_state_v3 (REV.B normalization + REV.C+ explicit exclusions)
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple
import math
import statistics

def clamp(x: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, x))

def normalize_0_4(value: int, direction: str) -> float:
    if value < 0 or value > 4:
        raise ValueError(f"answer out of range 0-4: {value}")
    if direction == "higher_is_worse":
        return value / 4.0
    if direction == "higher_is_worse_reversed":
        return (4 - value) / 4.0
    raise ValueError(f"unsupported direction: {direction}")

def sample_stddev(values: List[float]) -> float:
    if len(values) < 2:
        return 0.0
    return statistics.stdev(values)

def population_stddev(values: List[float]) -> float:
    if len(values) < 2:
        return 0.0
    return statistics.pstdev(values)

# --- Rigidity (REV.B) ---

_BASE_RIGIDITY = {
    ("EXTERNAL", "FATE"): 1.0,
    ("EXTERNAL", "CONTEXT"): 0.6,
    ("MIXED", "MIXED"): 0.5,
    ("INTERNAL", "OVERLOAD"): 0.3,
    ("INTERNAL", "DEFICIT"): 0.1,
}

_AGENCY_MOD = {
    "HIGH": 0.8,
    "MEDIUM": 0.9,
    "LOW": 1.0,
}

def calculate_rigidity(profile: Optional[Dict[str, Any]], default_when_missing: float = 0.5) -> float:
    if not profile:
        return float(default_when_missing)
    locus = str(profile.get("locus", "MIXED")).upper()
    subtype = str(profile.get("subtype", "MIXED")).upper()
    agency = str(profile.get("agency_level", "MEDIUM")).upper()

    base = _BASE_RIGIDITY.get((locus, subtype), default_when_missing)
    mod = _AGENCY_MOD.get(agency, 0.9)
    return round(clamp(base * mod, 0.0, 1.0), 2)

def determine_band(score: float, bands: List[Dict[str, Any]]) -> str:
    for b in bands:
        if score >= float(b["min"]) and score < float(b["max"]):
            return str(b["id"])
    return str(bands[-1]["id"]) if bands else "UNKNOWN"

def run_weighted_sum(scoring: Dict[str, Any], answers: Dict[str, int]) -> Dict[str, Any]:
    # legacy: sum(weight * normalized)
    weighted_sum = 0.0
    weight_total = 0.0
    inputs = scoring.get("inputs", [])
    meta_inputs = []
    for inp in inputs:
        qid = inp["question_id"]
        w = float(inp.get("weight", 1.0))
        direction = inp.get("direction", "higher_is_worse")
        raw = int(answers.get(qid, 0))
        norm = normalize_0_4(raw, direction)
        weighted_sum += norm * w
        weight_total += w
        meta_inputs.append({
            "question_id": qid, "weight": w, "direction": direction,
            "exclude_from_volatility": bool(inp.get("exclude_from_volatility", False)),
            "raw": raw, "norm": norm, "contrib": norm * w
        })
    raw_score = (weighted_sum / weight_total) if weight_total else 0.0
    score = clamp(raw_score)
    band = determine_band(score, scoring.get("bands", []))
    return {
        "model": "weighted_sum",
        "score": score,
        "band": band,
        "flags": [],
        "_meta": {
            "raw_score": raw_score,
            "final_score": score,
            "inputs": meta_inputs,
            "intermediate": {"weighted_sum": weighted_sum, "weight_total": weight_total},
        }
    }

def run_vector_state_v3(scoring: Dict[str, Any], answers: Dict[str, int], priors: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    params = scoring.get("params", {})
    thresholds = params.get("volatility_thresholds", [0.15, 0.35])
    rigidity_weight = float(params.get("rigidity_weight", 0.10))
    frozen_threshold = float(params.get("rigidity_frozen_threshold", 0.70))
    stddev_mode = str(params.get("volatility_stddev_mode", "sample")).lower()
    rigidity_default_when_missing = float(params.get("rigidity_default_when_missing", 0.5))

    inputs = scoring.get("inputs", [])
    weighted_sum = 0.0
    weight_total = 0.0
    vol_values = []
    meta_inputs = []

    for inp in inputs:
        qid = inp["question_id"]
        w = float(inp.get("weight", 1.0))
        direction = inp.get("direction", "higher_is_worse")
        raw = int(answers.get(qid, 0))
        # scale enforcement (REV.B baseline)
        scale = inp.get("scale", {"min": 0, "max": 4})
        if int(scale.get("min", 0)) != 0 or int(scale.get("max", 4)) != 4:
            raise ValueError(f"unsupported scale for {qid}; must be 0-4 unless normalize function is provided")
        norm = normalize_0_4(raw, direction)

        exclude_vol = bool(inp.get("exclude_from_volatility", False))
        weighted_sum += norm * w
        weight_total += w
        if not exclude_vol:
            vol_values.append(norm)

        meta_inputs.append({
            "question_id": qid, "weight": w, "direction": direction,
            "exclude_from_volatility": exclude_vol,
            "raw": raw, "norm": norm, "contrib": norm * w
        })

    raw_score = (weighted_sum / weight_total) if weight_total else 0.0

    if stddev_mode == "population":
        volatility = population_stddev(vol_values)
    else:
        volatility = sample_stddev(vol_values)

    attribution_profile = None
    if priors:
        attribution_profile = priors.get("attribution_profile")
    rigidity = calculate_rigidity(attribution_profile, default_when_missing=rigidity_default_when_missing)

    final_score = clamp(raw_score * (1.0 + rigidity * rigidity_weight), 0.0, 1.0)
    flags = []
    if volatility > float(thresholds[1]):
        flags.append("STORM")
    elif volatility > float(thresholds[0]):
        flags.append("RAIN")
    if rigidity >= frozen_threshold:
        flags.append("FROZEN")

    band = determine_band(final_score, scoring.get("bands", []))

    return {
        "model": "vector_state_v3",
        "score": final_score,
        "band": band,
        "flags": flags,
        "_meta": {
            "raw_score": raw_score,
            "final_score": final_score,
            "volatility": volatility,
            "rigidity": rigidity,
            "params": {
                "volatility_thresholds": thresholds,
                "rigidity_weight": rigidity_weight,
                "rigidity_frozen_threshold": frozen_threshold,
                "volatility_stddev_mode": stddev_mode,
                "rigidity_default_when_missing": rigidity_default_when_missing,
            },
            "priors": {"present": bool(priors), "source": (priors or {}).get("source"), "attribution_profile": attribution_profile},
            "normalization": {"scale": "0-4", "direction_rules": "REV.B"},
            "inputs": meta_inputs,
            "intermediate": {"weighted_sum": weighted_sum, "weight_total": weight_total, "vol_values": vol_values, "version": "V3.0"},
        }
    }

def score_facet(compiled_facet: Dict[str, Any], answers: Dict[str, int], priors: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    scoring = compiled_facet["scoring"]
    model = scoring.get("model", scoring.get("scoringModel", "weighted_sum"))
    if model == "vector_state_v3":
        return run_vector_state_v3(scoring, answers, priors=priors)
    return run_weighted_sum(scoring, answers)
