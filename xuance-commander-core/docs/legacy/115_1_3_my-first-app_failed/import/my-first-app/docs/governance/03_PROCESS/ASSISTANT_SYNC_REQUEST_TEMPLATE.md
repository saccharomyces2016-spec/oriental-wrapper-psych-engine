Assistant Sync Request Template (Copy/Paste)

Purpose:
Provide the exact commands the user runs to share current repo state.

Option A (preferred):
- Run: npm run sync:assistant
- Paste full output.

Option B (fallback if npm scripts not available):
Run the following commands together:

git status -sb
echo "----"
git log -1 --oneline --decorate
echo "----"
git show --stat --oneline --decorate HEAD
echo "----"
cat docs/governance/08_REPORTS/PROJECT_STATE.json
echo "----"
tail -n 120 docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md || true
echo "----"
tail -n 80 docs/governance/04_DECISIONS/DECISION_LOG.md || true
echo "----"
tail -n 120 docs/governance/03_PROCESS/ROLE_PERFORMANCE_LOG.md || true
echo "----"
tail -n 120 docs/governance/03_PROCESS/PROJECT_WORKLOG.md || true

Rule:
If the Commander asks for sync, the discussion pauses until the snapshot is provided.
