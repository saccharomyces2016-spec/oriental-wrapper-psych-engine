"""
Integration test: Verifies that Science Baseline (Risk Band) strictly constrains 
Metaphysical Output (Hexagram Selection).
"""
import json
import os
from pathlib import Path
from engine.hexagram_deriver import derive_hexagram

# Load the domain mapping
ROOT = Path(__file__).parent.parent
MAPPING_FILE = ROOT / "domain/facets/income_expansion_pressure/hexagram_mapping.v1.0.json"

def load_mapping():
    with open(MAPPING_FILE, 'r') as f:
        return json.load(f)

def select_hexagram_by_risk(risk_band: str, mapping_data: dict):
    band_info = mapping_data["hexagram_mapping"]["bands"].get(risk_band)
    if not band_info:
        raise ValueError(f"Invalid risk band: {risk_band}")
    return band_info["default_hexagram_id"], band_info["hexagram_candidates"]

def test_dual_compute_consistency():
    mapping = load_mapping()
    
    # 1. Simulate Science Result (The Truth)
    science_risk_band = "high"
    
    # 2. Metaphysical Selection (The Face)
    default_hex, candidates = select_hexagram_by_risk(science_risk_band, mapping)
    
    # 3. Verify Constraints
    # High risk should map to Kan (29) or Oppression (47)
    assert default_hex == 29
    assert 29 in candidates
    assert 47 in candidates
    
    # 4. Verify Deriver Output vs Constraints
    # If user inputs "KAN", deriver gives 29.
    derived_hex, _ = derive_hexagram("KAN", ["WATER"], {})
    
    # The derived hexagram MUST be in the candidate set allowed by Science
    assert derived_hex in candidates
