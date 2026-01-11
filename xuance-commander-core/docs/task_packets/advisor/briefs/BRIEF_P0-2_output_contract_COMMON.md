# BRIEF — P0-2 Output Contract (COMMON) (DRAFT)

## 0) What you are doing
You are contributing to **P0-2 Output Contract**: define the **system-level output contract** for the MVP.

This is **not UI**, **not new questions**, **not domain-specific advice**. This is the contract that governs:
- what the engine is allowed to output
- what must be forbidden (diagnosis, deterministic life decisions, etc.)
- how "internal inference" is translated to "user-facing esoteric narrative" without exposing modern psychology terms.

## 1) Product identity (hard constraints)
- User-facing: **pure esoteric system** (玄學體驗). No modern psychology terms.
- Internal: inference is structured and auditable.
- No medical/clinical diagnosis, no treatment advice, no "you have X disorder".

## 2) SSOT you must follow (do not improvise)
You must consult these texts (SSOT pointers):
- CHARTER: xuance-commander-core/charter/CHARTER.md
- ROADMAP: xuance-commander-core/roadmap/ROADMAP.md
- CURRENT: xuance-commander-core/memory/briefs/CURRENT.md
- TASK_LIFECYCLE: xuance-commander-core/docs/process/TASK_LIFECYCLE.md
- AI_ADVISORY_ROLES: xuance-commander-core/docs/governance/AI_ADVISORY_ROLES.md

## 3) Output Contract scope (what is in / out)
IN SCOPE
- Output archetypes (result prototypes)
- Allowed / forbidden inference rules
- Output tone & abstraction layers (how concrete vs how symbolic)
- Expansion hooks (how we add more outputs safely later)

OUT OF SCOPE
- UI/visual design
- new question content
- domain-specific counseling (e.g.,婆媳/職場) for now

## 4) Your output format (mandatory)
Return your advice in this structure:

A) **Output Archetypes (5–10)**  
For each archetype:
- Archetype name (short)
- What it is allowed to say (bullet)
- What it must NOT say (bullet)
- Safety notes (risk triggers)
- Example 2–4 lines in CN (esoteric style), no psychology terms

B) **Forbidden Rules (hard bans)**  
- List explicit forbidden categories + examples

C) **Boundary Translation Rules**  
- How internal inference is translated into esoteric terms without leaking internals

D) **Open Questions (if any)**  
- Only questions that block implementation

## 5) Binding level
Everything you produce is **DRAFT / NON-BINDING** until Commander acceptance is written into SSOT.
