#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATUS="$ROOT/memory/briefs/LAST_COMMAND_STATUS.md"
MASTER_GEN="$ROOT/tools/build_master_sync_packet.sh"

TS="$(date -Iseconds)"
CMD="$*"

TMP="$(mktemp -d)"
OUT="$TMP/out"
ERR="$TMP/err"

set +e
"$@" >"$OUT" 2>"$ERR"
EC=$?
set -e

mkdir -p "$(dirname "$STATUS")"

cat > "$STATUS" <<EOT
# LAST_COMMAND_STATUS（唯一可信執行紀錄）

updatedAt: $TS
command: $CMD
exitCode: $EC
success: $([[ "$EC" -eq 0 ]] && echo true || echo false)

## STDOUT (tail)
```
$(tail -n 100 "$OUT")
```

## STDERR (tail)
```
$(tail -n 100 "$ERR")
```
EOT

if [[ -x "$MASTER_GEN" ]]; then
  bash "$MASTER_GEN" >/dev/null 2>&1 || true
fi

cat "$OUT"
cat "$ERR" >&2
exit "$EC"
