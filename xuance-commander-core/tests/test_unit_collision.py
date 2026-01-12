from engine.collision_calculator import collision_key

def test_collision_logic():
    # Wood vs Metal (ID 47) -> Conflict
    assert collision_key("WOOD", 47) == "wood_metal_conflict"

def test_no_root():
    assert collision_key(None, 47) == "no_root_flow"
