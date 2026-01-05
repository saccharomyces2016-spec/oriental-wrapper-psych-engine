# PUZZLE MISSING INVENTORY
## vNext Diagnostic System

Purpose:
Maintain an explicit list of **required but not-yet-assembled puzzle pieces** needed to fulfill the Ultimate Objective.

This list prevents hidden gaps and AI hallucinated completion.

---

## PUZZLE STATUS LEGEND
- ⬜ NOT STARTED
- 🟨 PARTIALLY DEFINED
- 🟩 FIXED / PERSISTED

---

## CORE INNER PUZZLES (Must Exist)

### PZ-01 — Question Group Purpose Map
Status: ⬜

Definition:
- Define WHY each group of questions exists
- Define WHAT structural signal it attempts to extract
- Define system behavior if the signal cannot be extracted

Notes:
- This is NOT question wording
- This is the prerequisite for all question design

---

### PZ-02 — Multi-Group Convergence Rule
Status: ⬜

Definition:
- Define how multiple question groups combine
- Define when to continue questioning
- Define when to stop and declare “structure not detectable”

---

### PZ-03 — Scoring / Weight Influence Rule
Status: 🟨

Definition:
- Define how answers influence Five-Element weights
- Define what happens when influence is weak or contradictory
- Must not include psychological interpretation

---

### PZ-04 — Result Output Boundary
Status: 🟨

Definition:
- Define what result output MUST contain
- Define what result output MUST NEVER contain
- Enforces Semantic Firewall at presentation layer

---

### PZ-05 — Session Termination Logic
Status: 🟨

Definition:
- Define maximum question depth
- Define early termination conditions
- Define silence / no-result behavior

---

## EXECUTION RULE

- Only one puzzle may be moved from ⬜ to 🟨 or 🟩 at a time.
- Human Commander selects next puzzle.
- AI only evaluates adjacency and risk.
