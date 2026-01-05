# Single Entry System (Required)

Purpose: Prevent “multiple truths” and version drift across roles/tools.

## Inbound Gate (Hard Rule) — "No Doc, No Work"
- Any decision, spec, plan, or requirement produced by ANY agent/tool is considered NON-EXISTENT until persisted in-repo.
- The only valid persistence locations are:
  - Active Plan: docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md (or current phase file)
  - Decision Log: docs/governance/04_DECISIONS/DECISION_LOG.md
  - Worklog: docs/governance/03_PROCESS/PROJECT_WORKLOG.md
  - Backlog (non-active items only): docs/governance/03_PROCESS/BACKLOG.md
- Chat output alone does not count as a decision or progress.

## Role Registry Gate
- Any new role or role change must be committed before work assignment.
- Role reviews occur at checkpoints and must be reflected in PROJECT_WORKLOG.md.

## Deterministic Sync Gate (Hard Rule)
- No planning, auditing, or slice definition may proceed without a valid sync snapshot per PROJECT_SYNC_PROTOCOL.md.
- Chat context alone is never sufficient to establish project state.
- The sync protocol MUST be satisfied before checkpoints or governance reviews begin.

## Mission Brief Gate
- All assignments must reference a Mission Brief.
- Mission Briefs are part of the Single Entry System.
- No role may begin work without receiving a Mission Brief.
- Mission Briefs must reference PROJECT_STATE.json and relevant logs.

## Role Reporting Gate
- Role milestone outputs must be persisted before downstream assignment.

## Deputy Involvement Gate
- For strategic/ethical/structural topics expected to need multiple rounds, invoke Deputy Architect & Risk Auditor (GEM) with a repo-based Context Packet (Assistant Sync Snapshot preferred) before proceeding.
- No assignment is valid unless this gate is satisfied when triggered.

## Deputy Escalation Gate
- Multi-turn topics require escalation via DEPUTY_DISCUSSION_ESCALATION_PROTOCOL.md and logged outcome before assignment or spec change.

## Proactive Data Request Gate
- If a decision or task depends on repo state, require a fresh sync snapshot first.
- Reference ASSISTANT_SYNC_REQUEST_TEMPLATE.md.

## Communication Style Gate
- Mission Brief + Deputy Context Pack are required when involving roles without repo access; follow COMMUNICATION_STYLE_PROTOCOL.md (plain to USER, technical to roles/Deputy).

## Contradiction Disclosure Gate
- If a contradiction is detected during planning, design, or strategic discussion, pause until the contradiction is explicitly acknowledged (accepted or rejected) by the user.

## Work-Mode Discovery Gate
- If a workflow/mode has been declared adopted, it must be persisted into repo governance artifacts before downstream execution continues.
- Reference: docs/governance/03_PROCESS/WORK_MODE_DISCOVERY_PROTOCOL.md

## Commander Accountability Node
- Commander objections, alternatives, and risk disclosures are first-class governance artifacts.
- Strategic silence is NOT allowed.
- Final decision rests with the human owner, but Commander objections must be logged.

## Three-Layer Enforcement Gate
- Any new feature, mode, or slice MUST declare which layer(s) it operates in.
- If a feature spans layers, interfaces must be explicit and logged.
- No implicit layer-crossing is allowed.

## Source of Truth
At any time, the repo MUST have exactly:
1) One Active Plan (phase file):
   - docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md (or current phase file)
2) One State Snapshot (evidence-based):
   - docs/governance/08_REPORTS/PHASE_*_STATE_SNAPSHOT_*.md
3) One Decision Log:
   - docs/governance/04_DECISIONS/DECISION_LOG.md
4) Role Registry:
   - docs/governance/03_PROCESS/ROLE_REGISTRY.md

All other documents are supporting artifacts, never the primary plan.

## Update Trigger
Before starting any new work OR when context-risk is detected:
- Update the phase file status + next actions
- Append decision log entry (if decisions changed)
- Update PROJECT_STATE.json + WORKLOG.md
- If an item cannot be persisted immediately, it MUST be added to BACKLOG.md and work MUST stop.

## Evidence rule for snapshots
Snapshots must include real command outputs (no placeholders like $(...)).

## Ingest/Handoff Continuity
- INGEST_AND_HANDOFF_LOG.md must be updated for new artifacts/roles to maintain continuity.
