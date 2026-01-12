from datetime import datetime

# 天干對應五行
STEM_TO_ELEMENT = {
    "甲": "WOOD", "乙": "WOOD",
    "丙": "FIRE", "丁": "FIRE",
    "戊": "EARTH", "己": "EARTH",
    "庚": "METAL", "辛": "METAL",
    "壬": "WATER", "癸": "WATER",
}

STEMS = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]

def root_element_from_dob(dob: str | None) -> str | None:
    """
    Convert DOB (YYYY-MM-DD) to Root Element (Five Elements).
    Uses Year Stem method. Returns None on invalid/missing input (Soft Fail).
    """
    if not dob:
        return None
    try:
        year = datetime.fromisoformat(dob).year
        # (Year - 4) % 10 calculates the Heavenly Stem index
        stem_index = (year - 4) % 10
        stem = STEMS[stem_index]
        return STEM_TO_ELEMENT.get(stem)
    except Exception:
        return None
