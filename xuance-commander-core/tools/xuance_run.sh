#!/usr/bin/env bash
set -euo pipefail

# tools/xuance_run.sh
# Run any command, capture success/failure + brief change summary, write to memory/briefs/LAST_COMMAND_STATUS.md
# Usage:
#   bash tools/xuance_run.sh <command...>
#
# Notes:
# - If this is a git repo, it will record git status and diffstat.
# - If not a git repo, it will record a filesystem-based summary (recent modified files under xuance-commander-core).

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LAST_STATUS="${ROOT}/memory/briefs/LAST_COMMAND_STATUS.md"

TS="$(date '+%Y-%m-%d %H:%M:%S%z')"
CMD="$*"

mkdir -p "$(dirname "${LAST_STATUS}")"

# Run command and capture output
set +e
OUT="$("$@" 2>&1)"
EC=$?
set -e

# Build summary
SUMMARY=""
if command -v git >/dev/null 2>&1 && git -C "${ROOT}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  GIT_HEAD="$(git -C "${ROOT}" rev-parse --short HEAD 2>/dev/null || true)"
  GIT_STATUS="$(git -C "${ROOT}" status --porcelain=v1 2>/dev/null || true)"
  DIFFSTAT="$(git -C "${ROOT}" diff --stat 2>/dev/null || true)"
  SUMMARY="$(cat <<SUM
git:
  head: ${GIT_HEAD}
  status:
$(printf '%s\n' "${GIT_STATUS}" | sed 's/^/    /')
  diffstat:
$(printf '%s\n' "${DIFFSTAT}" | sed 's/^/    /')
SUM
)"
else
  # Fallback: list recently modified files (last 10) within ROOT
  RECENT="$(cd "${ROOT}" && find . -type f -not -path "./.git/*" -mtime -7 2>/dev/null | head -n 10 | sed 's#^\./##')"
  SUMMARY="$(cat <<SUM
fs:
  recent_modified_files:
$(printf '%s\n' "${RECENT}" | sed 's/^/    /')
SUM
)"
fi

# Write log entry (append)
{
  echo "## ${TS} - LAST_COMMAND_STATUS"
  echo
  echo "- command: ${CMD}"
  echo "- exitCode: ${EC}"
  echo "- success: $([[ ${EC} -eq 0 ]] && echo "true" || echo "false")"
  echo
  echo "### summary"
  echo
  echo '```'
  echo "${SUMMARY}"
  echo '```'
  echo
  echo "### output (truncated)"
  echo
  echo '```'
  printf '%s\n' "${OUT}" | tail -n 200
  echo '```'
  echo
  echo "---"
  echo
} >> "${LAST_STATUS}"

# Also print minimal to console
echo "${OUT}"
exit "${EC}"
