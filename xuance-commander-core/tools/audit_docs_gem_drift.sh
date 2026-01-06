#!/usr/bin/env bash
set -euo pipefail

echo "== audit: docs/gem drift =="

echo
echo "-- find */docs/gem (maxdepth 4) --"
FOUND="$(find . -maxdepth 4 -path "*/docs/gem" 2>/dev/null || true)"
echo "$FOUND"

echo
echo "-- decision --"
CANON="./xuance-commander-core/docs/gem"
PROMPTS="./xuance-commander-core/prompts/gem"

DRIFT=0
while IFS= read -r p; do
  [ -z "$p" ] && continue
  if [ "$p" != "$CANON" ] && [ "$p" != "$PROMPTS" ]; then
    echo "[DRIFT] $p"
    DRIFT=1
  fi
done <<< "$FOUND"

if [ "$DRIFT" -eq 1 ]; then
  echo
  echo "[FAIL] drift detected. Canon must be only:"
  echo "  - $CANON"
  echo "  - $PROMPTS"
  exit 3
fi

echo "[PASS] no drift."
