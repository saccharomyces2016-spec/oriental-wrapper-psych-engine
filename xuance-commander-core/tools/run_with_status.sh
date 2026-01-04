#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash tools/run_with_status.sh "bash tools/preflight.sh ."
#   bash tools/run_with_status.sh "bash tools/export_chat_packet.sh ."
#
# Writes a best-effort execution report to:
#   memory/briefs/LAST_COMMAND_STATUS.md
#
# Notes:
# - No git required.
# - Changed-files list is best-effort via mtime after a start marker.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATUS_FILE="${ROOT_DIR}/memory/briefs/LAST_COMMAND_STATUS.md"

if [[ $# -lt 1 ]]; then
  echo "ERROR: missing command string."
  echo "Usage: bash tools/run_with_status.sh \"<command>\""
  exit 2
fi

CMD="$1"
START_ISO="$(date -Iseconds)"
START_MS="$(date +%s%3N 2>/dev/null || python3 - <<'PY'
import time
print(int(time.time()*1000))
PY
)"

TMPDIR="$(mktemp -d)"
OUT="${TMPDIR}/stdout.txt"
ERR="${TMPDIR}/stderr.txt"
MARK="${TMPDIR}/.mark"

# Create mark file at start time to detect newer mtimes.
touch "$MARK"

set +e
bash -lc "$CMD" >"$OUT" 2>"$ERR"
EXIT_CODE=$?
set -e

END_MS="$(date +%s%3N 2>/dev/null || python3 - <<'PY'
import time
print(int(time.time()*1000))
PY
)"
DUR_MS=$((END_MS - START_MS))

# Best-effort changed files (exclude node_modules, tmp, build artifacts if needed)
CHANGED_FILES="$(
  cd "$ROOT_DIR"
  find . \
    -type f \
    -newer "$MARK" \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    | sed 's|^\./||' \
    | sort
)"

# Tail outputs to keep file small
STDOUT_TAIL="$(tail -n 80 "$OUT" 2>/dev/null || true)"
STDERR_TAIL="$(tail -n 80 "$ERR" 2>/dev/null || true)"

mkdir -p "$(dirname "$STATUS_FILE")"
cat > "$STATUS_FILE" <<EOF
# LAST_COMMAND_STATUS（上一條指令執行結果｜可被 MASTER 同步）

- updatedAt: ${START_ISO}
- command: ${CMD}
- exitCode: ${EXIT_CODE}
- durationMs: ${DUR_MS}

## Changed files (best-effort)
${CHANGED_FILES:-"(none)"}

## STDOUT (tail)
```
${STDOUT_TAIL:-"(none)"}
```

## STDERR (tail)
```
${STDERR_TAIL:-"(none)"}
```
EOF

# Also print a compact summary for human
echo "exitCode=$EXIT_CODE durationMs=$DUR_MS"
if [[ -n "${CHANGED_FILES}" ]]; then
  echo "changedFiles:"
  echo "${CHANGED_FILES}" | head -n 50
fi

exit "$EXIT_CODE"
