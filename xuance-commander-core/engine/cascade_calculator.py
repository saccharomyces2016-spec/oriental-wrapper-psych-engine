"""
Engine Core - Cross-domain Cascade (Five-Element Transmission)
- Dynamic relation based on element 克/生 rules
- Optional override templates for high-value paths
- Anti-spam output constraints
"""
from __future__ import annotations

from typing import Any, Dict, List, Optional, Tuple
import json
from pathlib import Path

# 克 (overcomes) mapping
OVERCOMES = {
    "WOOD": "EARTH",
    "EARTH": "WATER",
    "WATER": "FIRE",
    "FIRE": "METAL",
    "METAL": "WOOD",
}

def relation(source: str, target: str) -> Optional[str]:
    source = source.upper()
    target = target.upper()
    if source in OVERCOMES and OVERCOMES[source] == target:
        return f"{source}_OVERCOMES_{target}"
    return None

def load_overrides(path: str) -> List[Dict[str, Any]]:
    p = Path(path)
    if not p.exists():
        return []
    data = json.loads(p.read_text(encoding="utf-8"))
    return data.get("overrides", [])

def cascade_warnings(
    source_element: str,
    final_score: float,
    flags: List[str],
    override_path: Optional[str] = None,
    max_warnings: int = 3,
) -> List[Dict[str, Any]]:
    if final_score <= 0.80:
        return []

    source_element = source_element.upper()
    overrides = load_overrides(override_path) if override_path else []

    # Default dynamic target: the one it overcomes
    target = OVERCOMES.get(source_element)
    if not target:
        return []

    rel = relation(source_element, target)
    if not rel:
        return []

    # Prefer override template if exists
    chosen = None
    for o in overrides:
        if o.get("sourceElement") == source_element and o.get("targetElement") == target:
            chosen = o
            break

    text_cn = chosen.get("cn") if chosen else f"{source_element} 克 {target}：此域過盛會向相剋之域傳導。"
    text_en = chosen.get("en") if chosen else f"{source_element} overcomes {target}: excess here can transmit risk across domains."

    # Anti-spam: 1 warning for now (can be extended to multiple targets later)
    warning = {
        "target_element": target,
        "relation": rel,
        "template_id": chosen.get("template_id") if chosen else "DYNAMIC_DEFAULT",
        "user_facing_text": {"zh-TW": text_cn, "en": text_en},
        "priority": "HIGH" if ("FROZEN" in flags and "STORM" in flags) else "MEDIUM",
    }
    return [warning][:max_warnings]
