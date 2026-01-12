"""
Golden tests: Fixed input -> Fixed output. 
Ensures no drift in logic or IDs over time.
"""
from engine.root_element_mapper import root_element_from_dob
from engine.collision_calculator import collision_key
from engine.hexagram_deriver import derive_hexagram

def test_golden_case_001_wood_metal_conflict():
    # Input
    dob = "1984-01-01" # Wood
    stage1 = "KAN"      # ID 29 (Water) - Note: In MVP collision map, we test 47 (Metal) for conflict
    
    # Execution
    root = root_element_from_dob(dob)
    assert root == "WOOD"
    
    # Force Hexagram 47 (Metal) to test collision logic specifically
    hex_id = 47 
    key = collision_key(root, hex_id)
    
    # Output Verification
    assert key == "wood_metal_conflict"

def test_golden_case_002_no_root():
    # Input
    dob = None
    
    # Execution
    root = root_element_from_dob(dob)
    assert root is None
    
    hex_id = 29
    key = collision_key(root, hex_id)
    
    # Output Verification
    assert key == "no_root_flow"
