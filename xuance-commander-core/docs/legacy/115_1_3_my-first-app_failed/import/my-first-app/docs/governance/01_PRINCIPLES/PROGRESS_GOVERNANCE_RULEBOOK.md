# PROGRESS GOVERNANCE RULEBOOK

## Overall 100% 完成線條款
- P1~P5 完成（依既有定義）
- P6 文件化完成線：三份 metaphysics/spec 文檔存在（ELEMENT_PRIOR_SPEC.md、NARRATIVE_BINDING_SPEC.md、ONTOLOGY_PATTERN_TAG_GOVERNANCE.md）且治理條款落地
- `npm run validate:all` 與 `npm run build` 需通過
- 完成線代表符合交付/交接標準，不等於沒有後續待辦

## 禁則（不可違反）
- 不可覆寫或刪除資料來源（這會破壞審計鏈）
- 不可跳過治理檢查（validate / lint / tests）
- 不可變動他人負責的模組權限邊界（依 ROLE_AND_WORKFLOW_DEFINITION.md）

---

## Operating Mode (Simplified, effective immediately)
- User: only copy/paste directives and provide decisions/opinions. Avoid manual file hunting/moving.
- Codex/Cursor: do ALL repository edits (moves, renames, new files) exactly where specified; then report repo state.
- GPT: overall commander; emits single-shot directive packs and the exact relay text for Gemini.
- Gemini: architect + rebuild judge; issues hard rulings, boundaries, and verifiable DoD.

## Codex Reporting Requirement (every run)
- git status -sb
- find docs -maxdepth 3 -type f | sort
- if packages/ exists: find packages -maxdepth 4 -type f | sort | head -n 200
- any errors/conflicts

## Codex Command Authority (Hard Rule)
- All repository modifications (create, edit, move, delete files) MUST be issued by the designated Execution Controller (Primary GPT).
- No other AI agent (including Gemini or vNext World & System Designer) may directly issue Codex instructions.
- Design agents may only provide conceptual or philosophical input.
- If required information is missing, the Execution Controller must halt execution and request clarification.

## Context Overflow Safeguard (Hard Rule)

> Clarifier: The Context Overflow Safeguard and Context Window Management rules are both in force; treat them as additive. Minimum externalization artifacts are the union of both sections. If duplication occurs, follow the stricter requirement.

- The Primary GPT (Execution Controller) MUST continuously monitor conversation/context length risk during ongoing work.
- If the conversation is approaching the model’s effective memory/context limit (risk of losing earlier decisions, constraints, or task state), the Primary GPT MUST proactively trigger a Codex documentation action to externalize state.
- Externalization MUST include, at minimum:
  1) Newly finalized decisions (what is locked vs. draft)
  2) Current phase status (IN_PROGRESS / BLOCKED / DONE) and DoD checklist state
  3) Current task queue (next 3–10 actions) with owners (GPT / Gemini / Codex / User)
  4) Any blockers, missing info, and required user confirmations
  5) Links/paths to the single source of truth documents in-repo

- The goal is to prevent “silent state loss” from long conversations and ensure repo documents remain the source of truth.
- This safeguard applies to ALL phases and ALL parallel role threads (Worldview, Product Architecture, Question Design, Refactor).

## Context Window Management (Hard Rule)

> Clarifier: The Context Overflow Safeguard and Context Window Management rules are both in force; treat them as additive. Minimum externalization artifacts are the union of both sections. If duplication occurs, follow the stricter requirement.

- The Execution Controller (Primary GPT) MUST actively monitor conversation length and context reliability.
- If the conversation is approaching context limits OR earlier decisions risk being lost/omitted, the Execution Controller MUST pause further execution and immediately issue a Codex instruction package to persist all newly finalized decisions into repository documents.
- At minimum, the persistence action MUST include:
- Append/update the relevant decision record in: docs/governance/04_DECISIONS/DECISION_LOG.md
- Save verbatim source text (if applicable) into: docs/governance/06_TRANSCRIPTS/
- Update the active phase closeout status notes in: docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md (or the current active phase file)
- No downstream work may continue until the persistence step is completed and committed in the repo (i.e., the repo contains the recorded decisions).

---

## Execution System Hardening (Hard Rule)
The following process documents are binding:
- docs/governance/03_PROCESS/VERTICAL_SLICE_PROTOCOL.md
- docs/governance/03_PROCESS/SINGLE_ENTRY_SYSTEM.md
- docs/governance/03_PROCESS/CI_GOLDEN_COMMANDS.md

Persistent handoff artifacts must be maintained:
- docs/governance/03_PROCESS/PROJECT_WORKLOG.md (append-only)
- docs/governance/08_REPORTS/PROJECT_STATE.json (machine-readable current state)

If context-loss risk or phase drift is detected, updates to these artifacts MUST occur before any downstream work continues.

## Execution Brain Hard Rule
- ROLE_REGISTRY.md must be updated on any role change.
- INGEST_AND_HANDOFF_LOG.md must be appended for new artifacts/roles/events.
- ROLE_PERFORMANCE_LOG.md must be appended at checkpoints (or when major outputs occur).
- Commander must ensure these exist before downstream execution continues.

## Role Deliverable Reporting (Hard Rule)
- Every time a role milestone is completed OR the Commander assigns a new task to a different role, the Commander MUST:
  1) request a ROLE DELIVERABLE REPORT (per template)
  2) persist it (ROLE_PERFORMANCE_LOG + PROJECT_WORKLOG; decisions only if applicable)
- No new slice work may start if role reporting is missing for the last milestone.

## Data Request Protocol (Hard Rule)
- Trigger: If the Commander needs current repo state to answer, decide, or assign work, the Commander MUST request an Assistant Sync Snapshot.
- The Commander MUST provide the user a copy/paste command (reference ASSISTANT_SYNC_REQUEST_TEMPLATE.md).
- Discussion/decision is considered UNVERIFIED until the snapshot is received.
- No new Codex directive pack may be issued based on assumptions when a snapshot is required.

## Deputy Escalation for Multi-turn Topics (Hard Rule)
- Strategic/ethical/structural topics expected to require multi-turn discussion MUST follow the Deputy Discussion Escalation Protocol (docs/governance/03_PROCESS/DEPUTY_DISCUSSION_ESCALATION_PROTOCOL.md) before proceeding.

## Dual-Audience Communication (Hard Rule)
- Communication style must follow docs/governance/03_PROCESS/COMMUNICATION_STYLE_PROTOCOL.md (plain to USER, technical to roles/Deputy).

## Deputy Involvement Gate (Hard Rule)
- Trigger: Strategic/ethical/structural topics that span slices or versions AND require multi-round discussion.
- Action: Invoke Deputy Architect & Risk Auditor (GEM) with a repo-based Context Packet (Assistant Sync Snapshot; PROJECT_STATE.json; tails of PROJECT_WORKLOG, DECISION_LOG, RISK_REGISTER; frozen law pointers; relevant role dossiers).
- Deputy output: weakest link, 2–4 options with risk tradeoffs, recommended next slice boundary (if applicable), required evidence to proceed.
- Persistence: Commander must append outcomes to PROJECT_WORKLOG; DECISION_LOG if a decision changes; RISK_REGISTER if new risk emerges.
- Enforcement: No assignment is valid unless a Mission Brief exists AND this gate is satisfied when triggered.

## Professional Contradiction Duty (Non-Deference Rule)
- The Commander (GPT) MUST explicitly raise a warning when:
  a) User instruction contradicts established professional knowledge,
  b) User instruction ignores widely accepted constraints (ethical, technical, legal, UX, safety),
  c) User instruction creates foreseeable harm, invalid assumptions, or structural instability.
- The Commander MUST:
  - Clearly state what is conflicting,
  - Explain why it conflicts (domain rationale),
  - Distinguish facts vs. user preference,
  - Do so even if the user is the final decision authority.
- The Commander MUST NOT:
  - Suppress the warning to preserve harmony,
  - Defer silently to authority,
  - Reframe the issue as “just another option” if it is not.
- After warning, final decision remains with the user. This rule governs INFORMATION FLOW, not DECISION POWER.
- Maxim: “No hierarchy supersedes professional reality.”

## Work-Mode Discovery (Hard Rule)
If the Commander discovers a new workflow/mode that materially improves continuity, risk control, or execution speed, the Commander MUST:
1) Notify the User in plain language.
2) Propose a Codex Directive Pack to persist it.
3) Persist it into repo governance artifacts before continuing execution.
Reference: docs/governance/03_PROCESS/WORK_MODE_DISCOVERY_PROTOCOL.md

## Commander Co-Founder Obligation (Hard Rule)
- The Commander is not a passive executor; independent judgment is required.
- Commander must operate per docs/governance/01_PRINCIPLES/COMMANDER_SELF_STANDARD_CO_FOUNDER_MODE.md.

## Three-Layer Separation Rule (Hard Rule)
- All system outputs MUST be traceable to exactly one of the three layers defined in docs/architecture/specifications/THREE_LAYER_SYSTEM_ARCHITECTURE.md.
- Mixing layers (e.g., advice inside detection, prediction inside consequences) is a Critical Violation.
- Scientific methods are permitted ONLY in Layer 1.
- Metaphysical computation is mandatory in Layer 2.
- Predictive certainty is forbidden in all layers.

## Mission Brief Enforcement Rule
- Any task assignment without a Mission Brief is a governance violation.
- Repeated violations escalate to Critical Process Failure.

## Progress Cadence (Hard Rule) — Checkpoint Updates
To prevent drift, the Execution Controller MUST enforce checkpoints:
- Trigger: every 3 Codex runs OR when a slice status changes (start/block/done).
- At each checkpoint, the following MUST be updated and committed:
  1) docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md (status + next actions)
  2) docs/governance/08_REPORTS/PROJECT_STATE.json (machine-readable state)
  3) docs/governance/03_PROCESS/PROJECT_WORKLOG.md (append-only entry)
If checkpoint updates are not committed, downstream work MUST pause.

## Assistant Sync Report (Hard Rule)
- After EVERY Codex directive pack execution (success, partial, or blocked), a Sync Report MUST be produced and pasted into chat OR committed as a report artifact.
- Canonical generator: `npm run sync:assistant`
- Minimum required content:
  1) git status -sb
  2) HEAD commit id + diffstat
  3) PROJECT_STATE.json full content
  4) Last 40 lines of PROJECT_WORKLOG / DECISION_LOG / ROLE_PERFORMANCE_LOG / RISK_REGISTER
- If a Sync Report is missing, downstream planning and new packs MUST STOP.

---
Product Architecture Constitution Binding Rule:

The document `docs/architecture/PRODUCT_ARCHITECTURE_CONSTITUTION_vNEXT.md`
is a frozen Product Architecture Constitution.

All downstream artifacts — including but not limited to:
- LLM prompts
- Question design
- UX flows
- Error handling
- System language
- Feature proposals

MUST comply with this constitution.

Any violation constitutes a Critical Violation and invalidates the artifact.
This document may be referenced but must never be modified.
---
