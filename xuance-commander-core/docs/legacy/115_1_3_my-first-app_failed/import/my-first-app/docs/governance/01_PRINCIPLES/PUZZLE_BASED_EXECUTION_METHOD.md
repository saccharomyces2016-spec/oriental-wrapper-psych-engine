# PUZZLE-BASED EXECUTION METHOD (Binding)

## Status
- Level: Execution Method (Binding)
- Scope: All phases, all slices, all contributors (Human & AI)
- Purpose: Prevent scope drift, memory loss, and AI-led over-expansion

---

## Core Idea (Plain Definition)

The vNext system is developed as a **finite puzzle**.

- The **outer frame** (Ultimate Objective, Worldview, Architecture, Authority Boundaries) MUST be completed first.
- The **inner structure** is completed **one puzzle piece at a time**.
- No single actor (human or AI) is allowed to assemble the entire picture alone.

---

## Role Separation

### Human Commander (Primary Assembler)
- Chooses which puzzle piece is placed next.
- Decides when a piece is “fixed” and written into text.
- May assemble pieces incrementally without full system visibility.

### AI (Structural Analyst)
- MUST NOT propose a full roadmap or end-to-end plan.
- MUST:
  1. Analyze the selected puzzle piece.
  2. Identify which **adjacent pieces are missing**.
  3. Warn if the piece creates contradictions or dead ends.
- MUST assume limited memory and rely only on persisted text.

---

## Definition of a Puzzle Piece

A puzzle piece is a **self-contained, text-persisted unit**, such as:
- A question-group purpose definition
- A scoring or weighting rule
- A session flow boundary
- A result output boundary
- A UI constraint or prohibition

Each puzzle piece MUST declare:
1. What it depends on
2. What future pieces depend on it

---

## Execution Rules (Hard)

1. Only **ONE** puzzle piece may be actively assembled at a time.
2. AI MUST stop execution if required adjacent pieces are missing.
3. Chat context is NOT authoritative.
4. Only persisted text defines system state.
5. If a piece cannot be evaluated without assumptions, execution MUST pause.

---

## Success Condition

The Ultimate Objective is considered achievable when:
- All required puzzle pieces are persisted in text
- No piece depends on unstated assumptions
- The system can be reconstructed from documents alone
