#!/usr/bin/env bash
set -euo pipefail

CORE_DIR="${1:-}"
if [ -z "${CORE_DIR}" ]; then
  echo "usage: build_verification_pack.sh <core_dir>"
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel)"
BRIEFS_DIR="${CORE_DIR}/memory/briefs"
OUT_DIR="${CORE_DIR}/docs/ops/verification_packs"
mkdir -p "${OUT_DIR}"

ts="$(date '+%Y-%m-%dT%H:%M:%S%z')"
slug="$(date '+%Y%m%d_%H%M%S')"
OUT="${OUT_DIR}/VERIFICATION_PACK_${slug}.md"

golden_script="${REPO_ROOT}/tests/run_golden.sh"
validate_modes="${REPO_ROOT}/scripts/validate/validate-modes.mjs"
validate_canon="${REPO_ROOT}/scripts/validate/validate-canonical.mjs"

echo "# VERIFICATION_PACK（工程證據包｜可追溯）" > "${OUT}"
echo "generatedAt: ${ts}" >> "${OUT}"
echo "" >> "${OUT}"

echo "## Repo quick status" >> "${OUT}"
echo '```' >> "${OUT}"
git status -sb >> "${OUT}" || true
echo '```' >> "${OUT}"
echo "" >> "${OUT}"

echo "## Diffstat (working tree vs HEAD)" >> "${OUT}"
echo '```' >> "${OUT}"
git diff --stat >> "${OUT}" || true
echo '```' >> "${OUT}"
echo "" >> "${OUT}"

echo "## Recent commits" >> "${OUT}"
echo '```' >> "${OUT}"
git --no-pager log -n 5 --oneline >> "${OUT}" || true
echo '```' >> "${OUT}"
echo "" >> "${OUT}"

exit_code_all=0

run_and_capture () {
  local name="$1"; shift
  echo "## Run: ${name}" >> "${OUT}"
  echo '```' >> "${OUT}"
  set +e
  "$@" >> "${OUT}" 2>&1
  local ec=$?
  set -e
  echo "exitCode=${ec}" >> "${OUT}"
  echo '```' >> "${OUT}"
  echo "" >> "${OUT}"
  if [ "${ec}" -ne 0 ]; then
    exit_code_all="${ec}"
  fi
}

if [ -x "${golden_script}" ]; then
  run_and_capture "tests/run_golden.sh" bash "${golden_script}"
fi

if [ -f "${validate_modes}" ]; then
  run_and_capture "scripts/validate/validate-modes.mjs" node "${validate_modes}"
fi

if [ -f "${validate_canon}" ]; then
  run_and_capture "scripts/validate/validate-canonical.mjs" node "${validate_canon}"
fi

echo "## Summary" >> "${OUT}"
echo "- overallExitCode: ${exit_code_all}" >> "${OUT}"

PTR="${BRIEFS_DIR}/LATEST_VERIFICATION_PACK.md"
cat > "${PTR}" <<MD
# LATEST_VERIFICATION_PACK（指向最新工程證據包）
updatedAt: ${ts}
path: docs/ops/verification_packs/$(basename "${OUT}")
overallExitCode: ${exit_code_all}
MD

echo "OK: wrote ${OUT}"
echo "OK: wrote ${PTR}"
exit "${exit_code_all}"
