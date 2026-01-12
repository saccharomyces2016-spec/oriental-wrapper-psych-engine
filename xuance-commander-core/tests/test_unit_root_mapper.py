from engine.root_element_mapper import root_element_from_dob

def test_valid_years():
    # 1984 = 甲子 = Wood
    assert root_element_from_dob("1984-01-01") == "WOOD"
    # 1986 = 丙寅 = Fire
    assert root_element_from_dob("1986-06-01") == "FIRE"

def test_invalid():
    assert root_element_from_dob(None) is None
    assert root_element_from_dob("invalid-date") is None
