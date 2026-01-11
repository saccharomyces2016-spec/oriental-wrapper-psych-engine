# P0-3 Narrative Control Protocol (R4)

Role: R4 (Safety & Consistency Arbiter)
Status: FROZEN_FOR_P0-3 (Amendable Later)
Scope: income_expansion_pressure
Applies-To: All Advisors (R1–R5) + Engine Runtime

---

## 1. Affirmative Scope Definition（肯定句邊界）

### Time
- Allowed: 當下、週期規律（冬藏→春生）
- Forbidden: 具體未來事件、確定性預言

### Subject
- Allowed: 結構、環境、能量流（倉廩、田地、氣、勢）
- Forbidden: 個人本質、他人指控

### Assertion
- Allowed: 物理/能量因果（久滯生腐、強耕耗地）
- Forbidden: 社會/生活因果（不離職就會生病）

### Keywords
- Allowed: 宜、忌、象、勢、時、氣、流、滯
- Forbidden: 註定、必、絕、死、完、命定、永遠

---

## 2. Sharp but Non-Fatalistic Templates

### A. State Observation
Pattern: [現狀]，[自然後果]
Example: 「溝渠久未疏通，水流自難入田。」

### B. Structural Tension
Pattern: [意圖] 與 [時節] 相背，[損耗]
Example: 「嚴冬之期，強求播種，徒耗種籽。」

### C. Risk Warning
Pattern: 若 [狀態]，恐有 [結構風險] 之虞
Example: 「若倉底虛空而不補，恐有根基鬆動之虞。」

---

## 3. Narrative Blacklist SSOT（統一真源）

Path:
docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json

Structure:
- clinical_medical
- finance_corporate
- fatalism_fear
- specific_instruction
- exceptions (context-whitelist)

---

## 4. Violation Strategy（雙階段）

### Design Phase (Advisor Outputs)
- Policy: Gate=0
- Action: Reject & Regenerate
- Enforcement: CI scan → blacklist hit → exit 1

### Runtime Phase (Engine/UI)
- Policy: Rewrite Guard
- Action: Force L4 Safety Fallback
- Note: Last-resort only

---

Binding for all P0-3 artifacts.
Only 0% contaminated texts may enter domain/.
