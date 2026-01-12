# Hexagram ID Policy

To ensure consistency across Science (Backend) and Metaphysics (Frontend):

1.  **Internal Canonical ID**: **0–63**
    * Follows King Wen sequence minus 1 (e.g., Qian=0, Kun=1).
    * This ID is used in all Databases, Schemas, and Engine Logic.
2.  **Mapping**:
    * `0`: QIAN (乾)
    * `1`: KUN (坤)
    * ...
    * `63`: WEI JI (未濟)
3.  **Display Layer**:
    * Frontend may convert to 1–64 for display if necessary, but **API payload must use 0–63**.
4.  **Verification**:
    * All tests in P0-5.6 strictly adhere to the 0–63 range.
