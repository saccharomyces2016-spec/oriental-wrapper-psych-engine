# Simplified Relation Table for MVP
# (Root, Flow) -> Relation
ELEMENT_REL = {
    ("WOOD","METAL"): "conflict",
    ("METAL","WOOD"): "conflict",
    ("WOOD","FIRE"): "generate",
    ("FIRE","EARTH"): "generate",
    ("EARTH","METAL"): "generate",
    ("METAL","WATER"): "generate",
    ("WATER","WOOD"): "generate",
    ("WATER","FIRE"): "conflict",
    ("FIRE","WATER"): "conflict"
}

# Mapping Hexagram ID to its Element (Flow)
# IDs are 0-63
HEXAGRAM_ELEMENT = {
    29: "WATER", # Kan
    30: "FIRE",  # Li
    47: "METAL", # Kun (Oppression) - Lake/Water but implies metal/water interaction
    11: "EARTH", # Tai
    48: "WATER", # Jing
    0:  "METAL", # Qian
    1:  "EARTH"  # Kun
}

def collision_key(root_element: str | None, hexagram_id: int) -> str:
    """
    Calculate the narrative collision key between Root (User) and Flow (Hexagram).
    """
    if not root_element:
        return "no_root_flow"
        
    # Default to Earth if unknown hexagram in MVP
    flow_element = HEXAGRAM_ELEMENT.get(hexagram_id, "EARTH")
    
    rel = ELEMENT_REL.get((root_element, flow_element), "neutral")
    
    return f"{root_element.lower()}_{flow_element.lower()}_{rel}"
