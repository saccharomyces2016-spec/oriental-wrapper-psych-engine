#!/usr/bin/env bash
set -euo pipefail

CORE_DIR="${1:-}"
if [ -z "${CORE_DIR}" ]; then
  echo "usage: build_context_capsule.sh <core_dir>"
  exit 1
fi

BRIEFS_DIR="${CORE_DIR}/memory/briefs"
OUT="${BRIEFS_DIR}/CONTEXT_CAPSULE.md"

ROADMAP="${CORE_DIR}/roadmap/ROADMAP.md"
CURRENT="${BRIEFS_DIR}/CURRENT.md"
LAST="${BRIEFS_DIR}/LAST_COMMAND_STATUS.md"
REPO="${BRIEFS_DIR}/REPO_STATUS.md"

now="$(date '+%Y-%m-%dT%H:%M:%S%z')"

facetId="$(grep -E 'facetId:' -m 1 "${ROADMAP}" 2>/dev/null | sed 's/.*facetId:[[:space:]]*//')"
if [ -z "${facetId}" ]; then
  facetId="$(grep -E 'facetId:' -m 1 "${CURRENT}" 2>/dev/null | sed 's/.*facetId:[[:space:]]*//')"
fi
[ -n "${facetId}" ] || facetId="(unknown)"

p0_line="(unknown)"
if grep -q 'P0-2' "${ROADMAP}" 2>/dev/null; then
  p0_line="ROADMAP has P0-2 section"
fi

last_cmd="$(grep -E '^command:' -m 1 "${LAST}" 2>/dev/null | sed 's/^command:[[:space:]]*//')"
last_ok="$(grep -E '^success:' -m 1 "${LAST}" 2>/dev/null | sed 's/^success:[[:space:]]*//')"
repo_head="$(grep -E '^head:' -m 1 "${REPO}" 2>/dev/null | sed 's/^head:[[:space:]]*//')"

cat > "${OUT}" <<MD
# CONTEXT_CAPSULE（超短狀態膠囊｜每次同步必帶）
generatedAt: ${now}

## Mainline
- phase: Phase 0 / MVP
- currentFacetId: ${facetId}
- focus: P0-2 (questions/scoring/reco/narr/riskchains + golden tests)
- roadmapSignal: ${p0_line}

## Evidence pointers
- CURRENT: memory/briefs/CURRENT.md
- ROADMAP: roadmap/ROADMAP.md
- LAST_COMMAND_STATUS: memory/briefs/LAST_COMMAND_STATUS.md
- REPO_STATUS: memory/briefs/REPO_STATUS.md

## Latest evidence (quick)
- repoHead: ${repo_head:-"(missing)"}
- lastCommand: ${last_cmd:-"(missing)"}
- lastSuccess: ${last_ok:-"(missing)"}

## Mandatory rules always-on
- CHARTER + TEXT_ONLY + TASK_LIFECYCLE + AI_ADVISORY_ROLES must be consulted every run
MD

echo "OK: wrote ${OUT}"
