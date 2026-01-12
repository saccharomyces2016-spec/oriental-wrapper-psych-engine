from engine.hexagram_deriver import derive_hexagram

def test_stage1_mapping():
    # KAN (Water) should map to ID 29
    h, c = derive_hexagram("KAN", ["WATER"], {})
    assert h == 29
    assert c is None

def test_changing_line_trigger():
    answers = {"q1": "a"}
    h, c = derive_hexagram("KAN", ["WATER"], answers)
    assert h == 29
    assert c is not None
    assert 0 <= c <= 5
