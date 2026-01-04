#!/usr/bin/env bash
set -euo pipefail

# === MASTER SYNC UPGRADE PACK ===
# Goal:
# - Make MASTER_SYNC_PACKET.md the single conversation anchor
# - Auto-sync all role / governance / goal / progress / advisory info
# - Do NOT change source-of-truth files
# - MASTER is read-only snapshot, regenerated on demand

ROOT="${1:-.}"
MASTER="$ROOT/memory/briefs/MASTER_SYNC_PACKET.md"

echo "== [1/4] Ensure target path exists =="
mkdir -p "$(dirname "$MASTER")"

echo "== [2/4] Regenerate MASTER_SYNC_PACKET.md =="
cat > "$MASTER" <<EOF
# MASTER_SYNC_PACKET（單檔同步包｜唯一對話錨點）
generatedAt: $(date -Iseconds)

## ROLE & RESPONSIBILITY (WHO DOES WHAT)
- Source:
  - docs/roles/ROLE_XUANCE_COMMANDER.md
  - docs/governance/AI_PARTNERSHIP_PROTOCOL.md
  - docs/governance/AI_ADVISORY_ROLES.md

## GOALS & CONSTRAINTS (WHY WE EXIST)
- Source:
  - charter/CHARTER.md
  - docs/adr/ADR_0003_world_class_bilingual_global_market.md
  - docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md

## PROGRESS & CURRENT STATE (WHERE WE ARE)
- Source:
  - roadmap/ROADMAP.md
  - memory/briefs/CURRENT.md
  - memory/changes/CHANGELOG.md

## EXECUTION SAFETY (WHAT STOPS MISTAKES)
- Source:
  - docs/governance/BOOT_RULE.md
  - docs/governance/AUTONOMOUS_STOP_PROTOCOL.md
  - docs/governance/PREWRITE_STATE_CONFIRMATION.md
  - docs/governance/TEXT_ONLY_EXECUTION_RULES.md
  - docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md

## ADVISORY SYSTEM (HOW CONTENT IS PRODUCED)
- Source:
  - docs/gem/README.md
  - docs/gem/profiles/*.md

## WORKFLOW (HOW WE MOVE)
- Source:
  - docs/process/WORKFLOW.md

## TASK LIFECYCLE (TASK EXECUTION & VERIFICATION)
- Source:
  - docs/process/TASK_LIFECYCLE.md

## LAST COMMAND STATUS (DID THE LAST INSTRUCTION COMPLETE?)
- Source:
  - logs/preflight/
  - logs/alerts/
  - memory/briefs/LAST_COMMAND_STATUS.md (if exists)

## MASTER RULE
- This file is a READ-ONLY snapshot.
- If conflict exists, trust original source files.
- Any change requires regenerating this file.
EOF

echo "== [3/4] Verify missing critical sources =="
MISSING=0
for f in \
  charter/CHARTER.md \
  roadmap/ROADMAP.md \
  memory/briefs/CURRENT.md \
  docs/roles/ROLE_XUANCE_COMMANDER.md \
  docs/governance/AI_PARTNERSHIP_PROTOCOL.md \
  docs/governance/BOOT_RULE.md
do
  if [[ ! -f "$ROOT/$f" ]]; then
    echo "!! Missing: $f"
    MISSING=1
  fi
done

if [[ "$MISSING" -eq 1 ]]; then
  echo "⚠️ Some critical files missing. Master generated but incomplete."
else
  echo "✅ All critical sources present."
fi

echo "== [4/4] DONE: MASTER_SYNC_PACKET.md regenerated =="
