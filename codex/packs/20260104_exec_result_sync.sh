#!/usr/bin/env bash
set -euo pipefail

# Codex Pack: MASTER Compaction & Guardrails
# Purpose: Prevent MASTER_SYNC_PACKET.md from uncontrolled growth

# ===== Config =====
ROOT="xuance-commander-core"
BRIEFS="${ROOT}/memory/briefs"
TOOLS="${ROOT}/tools"

STATUS="${BRIEFS}/LAST_COMMAND_STATUS.md"
MASTER_GEN="${TOOLS}/generate_master_sync_packet.sh"

CMD="$*"
TS="$(date '+%Y-%m-%d %H:%M:%S')"

if [[ -z "$CMD" ]]; then
  echo "ERROR: No command provided."
  exit 1
fi

mkdir -p "$(dirname "$STATUS")"

echo "=== RUN WITH STATUS ==="
echo "Command: $CMD"

START=$(date +%s)
set +e
OUTPUT="$($CMD 2>&1)"
EXIT_CODE=$?
set -e
END=$(date +%s)
DELAY=$((END - START))

# ===== Write LAST_COMMAND_STATUS =====
cat >> "$STATUS" << EOF

---
time: $TS
command: $CMD
exit_code: $EXIT_CODE
duration_sec: $DELAY
result: $( [[ $EXIT_CODE -eq 0 ]] && echo "SUCCESS" || echo "FAIL" )

output_tail:
$(echo "$OUTPUT" | tail -n 20)
EOF

echo "Status written to LAST_COMMAND_STATUS.md"

# ===== Rebuild MASTER =====
if [[ -x "$MASTER_GEN" ]]; then
  "$MASTER_GEN"
  echo "MASTER regenerated (includes LAST_COMMAND_STATUS)"
else
  echo "WARNING: MASTER generator not found or not executable"
fi

exit $EXIT_CODE
