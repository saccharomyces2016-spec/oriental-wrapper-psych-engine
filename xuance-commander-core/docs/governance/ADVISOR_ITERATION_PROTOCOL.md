# Advisor Iteration Protocol (DRAFT)

Purpose:
Ensure advisor outputs converge toward implementable assets
without relying on conversational memory.

## General Rule
- Advisor outputs are considered **proposals**, not decisions.
- Commander retains final arbitration authority.

## Minimum Completeness for Advisor Output
An advisor deliverable is incomplete if it lacks:
1. A concrete minimal example (e.g. full question set, not just theory)
2. Explicit mapping rules (severity, attribution, signals)
3. Defined consistency / contradiction handling
4. Clear scope boundaries (what is excluded at this phase)

## Iteration Expectation
- Multiple rounds are expected.
- Each round must increase:
  - concreteness
  - testability
  - implementability

## Data Dependency Rule
- Advisors must NOT require raw research corpora to proceed.
- Advisors should propose candidate dimensions first.
- Commander decides which background data to expose next.


<!-- ADVISOR_FOLLOWUP_CHECKLIST_BEGIN -->
## Follow-up Checklist (Commander → Advisor)

Use this checklist when an advisor delivers a "full minimal set" but key requirements are under-specified.

### A. Axis Separation Check
Ask advisor to explicitly separate (even if only in metadata):
- attribution_axis
- coping_axis
- severity_axis
and clarify which question drives which axis.

### B. Anti-Extremes Check
Ask advisor to revise options to avoid narrative forcing into extremes:
- ensure mid options are meaningful
- ensure extremes are not framed as more "dramatic" or more "correct"

### C. Global Output Contract Alignment
Ask advisor to state how this facet contributes to the system-level output contract:
- which part of fine-grained cluster it informs
- what it cannot infer (explicit exclusions)
- how it interacts with other facets/rounds

### D. Intervention/Consequence Safety Framing
If advisor proposes interventions or consequence chains:
- require "general, low-risk, non-diagnostic" wording
- require an evidence-note plan if claims become specific/high-stakes

<!-- ADVISOR_FOLLOWUP_CHECKLIST_END -->

<!-- R1_MINIMAL_IMPLEMENTATION_ASKS_BEGIN -->
## Minimal Implementation Asks (Advisor Deliverable Addendum) (DRAFT)

When an advisor submits a "Refined Specification" intended for implementation, they must include:

1. **Scoring Contract**
   - Output fields for each axis and their ranges
   - Per-question scoring mapping and weights (even if MVP-simple)

2. **Token Mapping (if used for validation)**
   - Minimal token set and the intended validation role
   - Weak mapping hints (e.g., severity_hint: high/low; attribution_hint: internal/external)

3. **Contradiction/Signal Rules**
   - MVP thresholds and deterministic flags
   - Clearly separate: confusion/noise vs repression vs overcompensation

Purpose: prevent engineering-side inference and reduce rework.
<!-- R1_MINIMAL_IMPLEMENTATION_ASKS_END -->

## Score Range & Gate Variable Definitions (DRAFT)
Advisors must explicitly define:
- Expected score maxima/minima (or normalization mapping).
- Any clamping rules.
- Precise variable meanings used in gate pseudo-code (e.g., slider value vs computed increment).

## Range Truthfulness Check (DRAFT)
When a spec states a numeric range (e.g., severity 0–10), the minimum and maximum must be **reachable** under allowed answers.

<!-- ROLE_DEFINITIONS_CANON_BEGIN -->
## Canonical Role Definitions (DRAFT)

### R1 — 題目設計顧問 (Question Design Advisor)
- Responsibility:
  - Design high-compression question structures.
  - Ensure questions elicit **latent psychological states**, not factual reports.
  - Define scoring logic, axes, thresholds, and consistency gates.
- Forbidden:
  - Writing narrative interpretations.
  - Giving behavioral advice.

---

### R2 — 玄學敘事顧問 (Esoteric Narrative Advisor)
- Responsibility:
  - Transform engine outputs into **purely esoteric / symbolic narratives**.
  - Ensure outputs feel "accurate to the soul" without revealing logic.
- Forbidden:
  - Altering scoring logic.
  - Introducing psychological or clinical terminology.

---

### R3 — 行動建議顧問 (Action Recommendation Advisor)
- Responsibility:
  - Provide **non-diagnostic, non-prescriptive** guidance.
  - Frame actions as tuning, adjustment, or orientation—not solutions.
- Forbidden:
  - Medical or therapeutic instruction.
  - Certainty claims about outcomes.

---

### R4 — 風險鏈顧問 / 輸出倫理防火牆 (Risk Chain & Output Safety Advisor)
- Responsibility:
  - Review all outputs for:
    - Diagnostic leakage
    - Deterministic prediction
    - Moral coercion or blame assignment
  - Act as **final safety and ethics firewall**.
- Authority:
  - Can veto or require softening of any output.

---

### Terminology Normalization
- "總工程師" refers to tooling / execution layer (e.g. Cursor), **not a human individual**.

Status: DRAFT / NON-BINDING.
<!-- ROLE_DEFINITIONS_CANON_END -->

## Metrics-Gated Narrative (DRAFT)
Any narrative rule introduced after P0-3 must be evaluable by the current Sharpness Metrics.
Non-evaluable prose is not eligible for promotion.
