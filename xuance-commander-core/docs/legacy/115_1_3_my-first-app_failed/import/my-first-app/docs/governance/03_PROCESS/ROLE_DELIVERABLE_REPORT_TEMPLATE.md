Role Deliverable Report (Template)

Purpose:
Standardize role completion reporting so the Commander can persist it.

Trigger:
When a role completes a milestone, or before the Commander assigns new work to another role.

Required fields:
- date (YYYY-MM-DD)
- role_id
- milestone_name
- summary (2–6 lines)
- repo_evidence (paths, commits, command outputs)
- decisions_required (if any)
- risks / blockers
- next_actions (with owners)

Rule:
Anything not backed by repo evidence must be labeled "ASSUMPTION".

Where to persist:
- Append to ROLE_PERFORMANCE_LOG.md (mandatory)
- Append to PROJECT_WORKLOG.md (mandatory)
- Append to DECISION_LOG.md (ONLY if a decision changed)
