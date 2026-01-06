#!/usr/bin/env bash
set -euo pipefail

# Location-independent: always audit from repo root.
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [ -z "${ROOT}" ] || [ ! -d "${ROOT}" ]; then
  echo "[FAIL] not inside a git repository (cannot determine repo root)."
  exit 2
fi
cd "${ROOT}"

echo "== audit: docs/gem drift =="
echo "repoRoot: ${ROOT}"

echo
echo "-- find */docs/gem (maxdepth 6) --"
# Print paths relative to repo root for stable comparisons.
FOUND="$(find . -maxdepth 6 -type d -path "*/docs/gem" 2>/dev/null || true)"
echo "${FOUND}"

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
done <<< "${FOUND}"

if [ "${DRIFT}" -eq 1 ]; then
  echo
echo "[FAIL] drift detected. Canon must be only:" 
  echo "  - ${CANON}"
  echo "  - ${PROMPTS}"
  exit 3
fi

echo "[PASS] no drift."
