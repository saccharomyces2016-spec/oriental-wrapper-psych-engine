# Checkpoint Template — Weakest Link Reinforcement (Required)

Purpose: Convert progress discussion into a repeatable decision and execution gate.

## Trigger
A checkpoint MUST run and be persisted when:
- Every 3 Codex runs, OR
- Slice status changes (start / blocked / done), OR
- Context-loss risk is detected, OR
- Before starting any new work.

## Inputs (Required)
- Active Plan:
  - docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md (or current phase file)
- Decision Log:
  - docs/governance/04_DECISIONS/DECISION_LOG.md
- Worklog (append-only):
  - docs/governance/03_PROCESS/PROJECT_WORKLOG.md
- State Snapshot (evidence-based):
  - docs/governance/08_REPORTS/PHASE_*_STATE_SNAPSHOT_*.md
- Machine-readable State:
  - docs/governance/08_REPORTS/PROJECT_STATE.json

## Step 0) Mission Brief Verification
- Confirm all active assignments have valid Mission Briefs.
- Confirm Mission Briefs reference current PROJECT_STATE.json.
- Record verification result in PROJECT_WORKLOG.md.

## Step 0A) Role Deliverable Report Check
- Confirm latest role milestones have ROLE DELIVERABLE REPORT entries.
- Reference docs/governance/03_PROCESS/ROLE_DELIVERABLE_REPORT_TEMPLATE.md.
- Link the latest deliverable report entries in ROLE_PERFORMANCE_LOG.md and PROJECT_WORKLOG.md.

## Step 0B) Sync Snapshot Presence
- Confirm the latest sync snapshot exists for this checkpoint (or request it using ASSISTANT_SYNC_REQUEST_TEMPLATE.md).

## Step 0C) Deputy Involvement Gate
- If the topic is strategic/ethical/structural and multi-round, confirm Deputy Architect & Risk Auditor (GEM) review is initiated with a repo-based Context Packet.
- Verify persistence plan for Deputy outputs (PROJECT_WORKLOG; DECISION_LOG if decisions change; RISK_REGISTER if new risks).

## Step 0D) Multi-turn Topic Escalation
- Confirm open decisions classified as multi-turn have Deputy escalation logged (DECISION_LOG.md) and, if applicable, ROLE_PERFORMANCE_LOG.md references.

### Step 0E — Work-Mode Discovery Check
- If any new workflow/mode was adopted since last checkpoint, confirm it is persisted in repo.
- Reference: docs/governance/03_PROCESS/WORK_MODE_DISCOVERY_PROTOCOL.md

## Step 1) State Synchronization Verification
- Sync outputs present (git status -sb; git log -1 --oneline --decorate; git show --stat --oneline --decorate HEAD).
- PROJECT_STATE.json matches git reality.
- No unresolved drift between chat claims and sync outputs.
- If failed: abort checkpoint.
- Before scoring, attach latest Assistant Sync Report output (`npm run sync:assistant`).

## Step 2) Role Review Quick Pass
- Use docs/governance/03_PROCESS/ROLE_REVIEW_TEMPLATE.md
- Persist outputs via PROJECT_WORKLOG.md (append-only)
- If any blank-output issue exists, include the path to an EMPTY_DATA_INCIDENT_TEMPLATE.md record.

## Step 3) Maturity Radar Scoring (0–3)
Reference:
- docs/governance/03_PROCESS/MATURITY_RADAR.md

Record scores (example table):

| Dimension | Score (0–3) | Evidence Links (paths) | Notes |
| --- | --- | --- | --- |
| 1) Governance & Single Source |  |  |  |
| 2) Vertical Slice Runnable |  |  |  |
| 3) Toolchain Reproducibility |  |  |  |
| 4) Core Safety Boundary |  |  |  |
| 5) Product Flow Skeleton |  |  |  |
| 6) Billing & Licensing (DEFERRED) |  |  |  |
| 7) Observability & Recovery |  |  |  |
| 8) Maintainability & Extensibility |  |  |  |

## Step 4) Weakest Link Selection
- Weakest dimension(s):
- Default next slice objective:
- If overridden: MUST log in Decision Log (reason + rollback + deferral).

## Step 5) Slice Definition (DoD-first)
Use the slice template in:
- docs/governance/03_PROCESS/VERTICAL_SLICE_PROTOCOL.md

Minimum required fields:
- Slice ID
- Scope / Exclusions
- DoD checklist
- Verification commands
- Evidence artifacts paths
- Rollback plan

## Step 6) Execution Gate ("No Evidence, No Work")
Work cannot proceed unless:
- Active plan updated (status + next actions)
- PROJECT_STATE.json updated (active_slice_id, next_actions)
- Worklog appended (what changed)
- Decision log appended (if any decision changed)
- Snapshot includes REAL outputs (no placeholders)
