#!/usr/bin/env bash
set -euo pipefail

echo "=== ASSISTANT SYNC REPORT ==="
echo "Generated_at: $(date '+%Y-%m-%d %H:%M:%S %z')"
echo

echo "A) git status -sb"
git status -sb || true
echo

echo "B) git log -1 --oneline --decorate"
git log -1 --oneline --decorate || true
echo

echo "C) git show --stat --oneline --decorate HEAD"
git show --stat --oneline --decorate HEAD || true
echo

echo "---- PROJECT_STATE.json ----"
if [ -f docs/governance/08_REPORTS/PROJECT_STATE.json ]; then
  cat docs/governance/08_REPORTS/PROJECT_STATE.json
else
  echo "MISSING: docs/governance/08_REPORTS/PROJECT_STATE.json"
fi
echo

echo "---- PHASE CLOSEOUT (tail) ----"
tail -n 120 docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md || true
echo

echo "---- DECISION_LOG (tail) ----"
tail -n 80 docs/governance/04_DECISIONS/DECISION_LOG.md || true
echo

echo "---- ROLE_REGISTRY (head) ----"
sed -n '1,120p' docs/governance/02_ROLES/ROLE_REGISTRY.md || true
echo

echo "---- ROLE_PERFORMANCE_LOG (tail) ----"
tail -n 120 docs/governance/03_PROCESS/ROLE_PERFORMANCE_LOG.md || true
echo

echo "---- PROJECT_WORKLOG (tail) ----"
tail -n 120 docs/governance/03_PROCESS/PROJECT_WORKLOG.md || true
echo

echo "---- GOVERNANCE INDEX (head) ----"
sed -n '1,120p' docs/governance/00_INDEX/GOVERNANCE_INDEX.md || true
echo

echo "=== END ASSISTANT SYNC REPORT ==="
