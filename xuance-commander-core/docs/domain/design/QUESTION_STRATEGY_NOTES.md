# Question Strategy Notes (DRAFT / NON-BINDING)

Status:
- Not locked
- For P0-2 and later reference
- Subject to future consolidation

## Core Intent
Design question systems capable of extreme state compression across
- all ages
- all cultures
- all socioeconomic backgrounds

Questions are NOT for accounting or diagnosis.
Questions are for **state sensing** and **attribution pattern extraction**.

## Key Accepted Insights (from R1)

### 1. Multi-Stage Questioning Is Allowed
- Questioning may occur in 2–4 stages.
- P0-2 recommended total questions: 5–7.
- Each stage serves a different compression role:
  - Broad symbol scan
  - Severity localization
  - Attribution / response style
  - Narrative anchoring (ritual layer)

### 2. Yin–Yang Is a Continuous Spectrum
- Yin/Yang must NOT be binary.
- Treated as:
  - direction of attribution
  - energy expenditure style
- Suitable for spectrum or graded scenario questions.

### 3. Symbol-First Strategy Is Preferred (But Not Locked)
- Symbol / archetype / metaphor questions reduce defense mechanisms.
- Must be UI-neutral at design level (no UI commitment at P0-2).
- Eight-trigram / element disks are a **strategic option**, not a requirement.

### 4. Questions Must Be UI-Neutral at P0-2
Allowed modality labels:
- symbol_select
- scenario_single
- spectrum
- token_multi_select
- pair_semantic_diff

UI embodiment is deferred.

### 5. Consistency Checking Is Part of Diagnosis
- Conflicting answers are signals, not errors.
- Inconsistency may indicate suppression, numbness, or instability.
- Rules for this must be explicit before scoring.


<!-- GLOBAL_OUTPUT_CONTRACT_BEGIN -->
## Global Goal & Output Contract (DRAFT)

### Ultimate Goal (Non-negotiable)
The system aims to compress **global human states** across:
- all ages
- all genders
- all cultures
into **fine-grained, actionable clusters** (state convergence at high resolution).

### Fine-grained Convergence Examples (illustrative, not exhaustive)
A target "cluster" may require separation like:
- Relationship conflict:
  - external pressure (dominant other party / coercion / boundary violations)
  - internal over-demand (perfectionism / excessive self-blame)
- Stress manifestation:
  - hyperarousal (insomnia-like pattern, agitation)
  - hypoarousal (numbness-like pattern, shutdown)

### Output Contract (what the system must be able to produce)
Final output (system-level, possibly across multiple facets/rounds) should support:
1. **Primary cluster hypothesis** (fine-grained)
2. **Attribution hypothesis** (internal/external balance)
3. **Coping hypothesis** (approach/avoid/freeze tendencies)
4. **Low-risk, general intervention suggestions** (non-medical, evidence-aligned framing)
5. **Risk chain flags** (e.g., prolonged stress → functional impairment signals), phrased cautiously
6. **Consistency / contradiction signals** as diagnostic value

Note:
- Health/psych-related advice must remain **general, low-risk, and non-diagnostic**.
- If later adding higher-stakes claims, an evidence-note workflow and citations are required.

<!-- GLOBAL_OUTPUT_CONTRACT_END -->

<!-- YINYANG_AXIS_REFINEMENT_BEGIN -->
## Yin–Yang Axis Refinement Requirement (DRAFT)

### Problem
Yin–Yang is often overloaded to represent multiple constructs at once:
- attribution (internal vs external locus)
- coping (approach/expansion vs avoidance/freeze)
- intensity (severity)

This causes coarse extremes and ambiguous scoring.

### Requirement
Do NOT treat Yin–Yang as a single axis carrying all meaning.
Split into separable axes at scoring/spec level:
- `attribution_axis`: internal ↔ external
- `coping_axis`: approach/expansion ↔ avoidance/freeze
- `severity_axis`: low ↔ high intensity (kept separate)

### Scale Granularity
Minimum recommended scale per axis:
- 5-point is acceptable for MVP
- 7–9 point preferred for fine-grained convergence (later phase)

Design note:
A user can be external-attribution **and** freeze-coping at the same time; the model must allow it.

<!-- YINYANG_AXIS_REFINEMENT_END -->

<!-- R1_REFINED_SPEC_P0_2_BEGIN -->
## R1 Refined Specification Summary (P0-2) (DRAFT)

Source:
- R1 (Advisor) delivered a refined P0-2 specification after the iteration checklist was provided.

### Key Improvements (recorded)
1. **Three-Axis Model (instead of single Yin–Yang axis)**
   - `attribution_axis`: internal ↔ external
   - `coping_axis`: passive/guard ↔ active/expansion
   - `severity_axis`: 0..4 intensity (kept separate)
   Rationale: avoid conflating locus/behavior/intensity; allow combinations like external + freeze.

2. **De-dramatization (anti-extremes)**
   - Reduced disaster phrasing ("flood/dam burst") into daily container/flow metaphors.
   - Goal: prevent narrative forcing toward extremes; improve mid-range resolution.

3. **System Output Contract Alignment**
   - **Valid inferences**: subjective pressure texture, energy-flow direction, pain index (derived), contradiction signals.
   - **Forbidden inferences**: objective financial status, naming specific relationship targets (e.g., mother-in-law), psychiatric diagnosis labels, success/failure predictions.

4. **Intervention/Consequence Safety Framing**
   - Advice must remain general, low-risk, non-diagnostic ("tuning" language).
   - Concrete domain-specific suggestions must be gated via an extension mechanism.

5. **Extension Path via Evidence-Note (future scalability)**
   - MVP stays generic.
   - Optional follow-up probes can unlock domain notes later (e.g., relationship conflict) with an evidence-note workflow.

### Open Items / Minimal Follow-up Needed (to prevent engineering guesswork)
R1 should provide MVP-level, implementable details for:
1. **Scoring contract**: exact output fields + per-question scoring/weighting for the 3 axes.
2. **Token (Q5) mapping**: minimal token list (e.g., 12–20) + weak mapping hints to axes.
3. **Contradiction rules**: MVP thresholds/if-else rules for repression/overcompensation/noise flags.

Status: DRAFT / NON-BINDING (allowed to evolve).
<!-- R1_REFINED_SPEC_P0_2_END -->

<!-- R1_ENGINEERING_HANDOFF_P0_2_BEGIN -->
## R1 Engineering Handoff Spec (P0-2) (DRAFT)

### Output Schema (AssessmentResult)
- `scores.severity_score` (int)
- `scores.attribution_score` (int; internal negative, external positive)
- `scores.coping_score` (int; passive negative, active positive)
- `flags.is_repressed`
- `flags.is_overcompensating`
- `flags.is_inconsistent`
- `raw_inputs` stores Q1–Q5 choices

### Scoring (Integer Addition)
- Q1 contributes to `severity` and sometimes `coping`
- Q2 calibrates `severity` and nudges `attribution`
- Q3 anchors `attribution`
- Q4 anchors `coping`
- Q5 is **validation-only** (token table + hints)

### Q5 Token Set (MVP=12)
- Tokens T01..T12 with `severity_hint` (High/Med/Low) and `nature_hint` for consistency checks.

### Flag Gates (MVP if/else)
- Repression: low conscious severity vs high-intensity token, or vice versa (inconsistent/noise)
- Overcompensation: attribution strongly internal AND coping strongly active
- Bonus: learned helplessness (internal + passive extremes) reserved for later care routing (no diagnosis labels)

### Required Clarifications (to prevent implementation drift)
1. **Score ranges & normalization**
   - Confirm whether to keep raw maxima (e.g., severity may be 0..7 by current weights) or map to 0..10.
   - Confirm whether to clamp attribution/coping within displayed ranges.
2. **Variable definitions for gates**
   - Define `Q2_score` used in repression logic: slider position (1..5) vs severity increment (0/2/4).
   - Provide numeric mapping for token `severity_hint` (High/Med/Low) to enable deterministic comparisons.

Status: DRAFT / NON-BINDING.
<!-- R1_ENGINEERING_HANDOFF_P0_2_END -->

<!-- R1_HARD_DEFINITIONS_P0_2_BEGIN -->
## R1 Hard Definitions (P0-2) (DRAFT)

### Severity Scale (Native 0–10; integer-only)
- Decision: **native integer weights** (no post linear mapping / no floats)
- Q1 (Symbol) severity weights:
  - B (滿杯) = +4
  - A (乾河床) = +2
  - D (濁流) = +2
  - C (死水) = +0  ← **PATCH (required): ensure severity minimum can be 0**
- Q2 (Sensation) severity weights:
  - 1 (冰) / 5 (燙) = +6
  - 2 (涼) / 4 (熱) = +3
  - 3 (溫) = +0
- Therefore `severity_score = Q1 + Q2` falls in **[0, 10]**.

### Clamp rules (Output contract)
- Apply clamp before output:
  - `attribution_score = clamp(attribution_score, -4, +4)` (safety; may not trigger in MVP)
  - `coping_score = clamp(coping_score, -4, +4)` (**required**; coping can reach -5 by combination)

### Repression gate variable definitions (No ambiguity)
- `Q2_Severity_Score` refers to **Q2 severity increment** in {0,3,6}; NOT slider index.
- Token severity numeric mapping:
  - High = 3
  - Med  = 2
  - Low  = 0  (note: "空" is low-energy even if negative valence)

### Repression gate (final)
- If `Q2_Severity_Score <= 3` AND `Token_Severity_Level >= 3` then `flags.is_repressed = true`.

Status: DRAFT / NON-BINDING.
<!-- R1_HARD_DEFINITIONS_P0_2_END -->

---
### P0-2 Phase Closure
See: `docs/domain/design/P0_2_PHASE_CLOSURE_SUMMARY.md`  
Status: Phase Closed / Implementation-Ready / NON-BINDING
---

<!-- PSY_INFERENCE_VS_DIAGNOSIS_BEGIN -->
## Psychological State Inference vs Clinical Diagnosis (DRAFT)

### Core Principle
- This system **does NOT perform clinical or medical diagnosis**.
- This system **DOES perform high-resolution psychological state inference** based on validated psychological constructs.

### Allowed (Explicitly Supported)
- Inferring **psychological states**, including but not limited to:
  - Attribution style (internal / external)
  - Coping strategy (active / defensive / frozen)
  - Distress or pressure severity (continuous scale)
  - Intra-psychic contradictions (e.g. repression, overcompensation)
- Internal use of psychology as an **analytic engine**.

### Forbidden (Hard Boundary)
- No clinical labels (e.g. depression, anxiety disorder).
- No medical recommendations.
- No claims of diagnosis, prognosis, or treatment necessity.

### Output Constraint
- All user-facing output MUST be rendered through **symbolic / esoteric narration**.
- Psychological constructs remain **engine-internal**, never surfaced verbatim to users.

Status: DRAFT / NON-BINDING.
<!-- PSY_INFERENCE_VS_DIAGNOSIS_END -->
