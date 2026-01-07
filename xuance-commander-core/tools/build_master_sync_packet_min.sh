#!/usr/bin/env bash
set -euo pipefail

CORE_DIR="${1:-}"
if [ -z "${CORE_DIR}" ]; then
  echo "usage: build_master_sync_packet_min.sh <core_dir>"
  exit 1
fi

OUT="${CORE_DIR}/memory/briefs/MASTER_MIN_SYNC_PACKET.md"
ts="$(date '+%Y-%m-%dT%H:%M:%S%z')"

emit_file () {
  local path="$1"
  echo "---" >> "${OUT}"
  echo "## FILE: ${path}" >> "${OUT}"
  echo "" >> "${OUT}"
  if [ -f "${CORE_DIR}/${path}" ]; then
    cat "${CORE_DIR}/${path}" >> "${OUT}"
  elif [ -f "${path}" ]; then
    cat "${path}" >> "${OUT}"
  else
    echo "(missing: ${path})" >> "${OUT}"
  fi
  echo "" >> "${OUT}"
}

cat > "${OUT}" <<MD
# MASTER_MIN_SYNC_PACKET（小快照｜每次必帶｜SSOT 指向）
generatedAt: ${ts}
sourceRoot: ${CORE_DIR}

## RULE
- Always consult: CHARTER / ROADMAP / CURRENT / TEXT_ONLY / TASK_LIFECYCLE / AI_ADVISORY_ROLES
- Evidence: LAST_COMMAND_STATUS + REPO_STATUS + LATEST_VERIFICATION_PACK
- Evidence: LAST_COMMAND_STATUS + REPO_STATUS + LATEST_VERIFICATION_PACK
MD

emit_file "charter/CHARTER.md"
emit_file "roadmap/ROADMAP.md"
emit_file "memory/briefs/CURRENT.md"
emit_file "docs/governance/TEXT_ONLY_EXECUTION_RULES.md"
emit_file "docs/process/TASK_LIFECYCLE.md"
emit_file "docs/governance/AI_ADVISORY_ROLES.md"
emit_file "memory/briefs/CONTEXT_CAPSULE.md"
emit_file "memory/briefs/LATEST_VERIFICATION_PACK.md"
emit_file "memory/briefs/REPO_STATUS.md"
emit_file "memory/briefs/LAST_COMMAND_STATUS.md"

echo "OK: wrote ${OUT}"
