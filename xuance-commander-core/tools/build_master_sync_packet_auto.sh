#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CORE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"


CORE_DIR="${1:-}"
if [ -z "${CORE_DIR}" ]; then
  echo "usage: build_master_sync_packet_auto.sh <core_dir>"
  exit 1
fi

STATE_DIR="${CORE_DIR}/memory/state"
mkdir -p "${STATE_DIR}"
STATE_FILE="${STATE_DIR}/master_generation_state.txt"

REPO_ROOT="$(git rev-parse --show-toplevel)"

days_since_full=9999
if [ -f "${STATE_FILE}" ]; then
  last_full_epoch="$(awk -F= '/last_full_epoch/{print $2}' "${STATE_FILE}" || true)"
  if [ -n "${last_full_epoch}" ]; then
    now_epoch="$(date +%s)"
    days_since_full="$(( (now_epoch - last_full_epoch) / 86400 ))"
  fi
fi

changed_critical=0
crit_regex='^(xuance-commander-core/(charter|roadmap|docs/governance|docs/adr|domain|schema|src/engine)/|charter/|roadmap/|docs/governance/|docs/adr/|domain/|schema/|src/engine/)'
if git diff --name-only | grep -Eq "${crit_regex}"; then
  changed_critical=1
fi

milestone_commit=0
if git --no-pager log -n 1 --pretty=%B | grep -q 'MILESTONE:'; then
  milestone_commit=1
fi

verification_failed=0
if [ -f "${CORE_DIR}/memory/briefs/LATEST_VERIFICATION_PACK.md" ]; then
  if grep -Eq '^overallExitCode:[[:space:]]*[1-9]' "${CORE_DIR}/memory/briefs/LATEST_VERIFICATION_PACK.md"; then
    verification_failed=1
  fi
fi

need_full=0
if [ "${days_since_full}" -ge 7 ]; then need_full=1; fi
if [ "${changed_critical}" -eq 1 ]; then need_full=1; fi
if [ "${milestone_commit}" -eq 1 ]; then need_full=1; fi
if [ "${verification_failed}" -eq 1 ]; then need_full=1; fi
bash "${SCRIPT_DIR}/build_context_capsule.sh" "${CORE_DIR}"

if ! git diff --quiet; then
  set +e
  bash "${CORE_DIR}/tools/build_verification_pack.sh" "${CORE_DIR}"
  _ec=$?
  set -e
  if [ "${_ec}" -ne 0 ]; then
    need_full=1
  fi
fi

bash "${CORE_DIR}/tools/build_master_sync_packet_min.sh" "${CORE_DIR}"

mode="MIN"
if [ "${need_full}" -eq 1 ] && [ -x "${CORE_DIR}/tools/build_master_sync_packet_full.sh" ]; then
  bash "${CORE_DIR}/tools/build_master_sync_packet_full.sh"
  now_epoch="$(date +%s)"
  {
    echo "last_full_epoch=${now_epoch}"
    echo "last_full_reason=auto_trigger"
  } > "${STATE_FILE}"
  mode="FULL"
fi

echo "OK: AUTO master sync mode=${mode}"
