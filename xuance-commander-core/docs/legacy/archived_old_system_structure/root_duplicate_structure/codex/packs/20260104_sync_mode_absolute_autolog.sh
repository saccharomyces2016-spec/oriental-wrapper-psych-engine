#!/usr/bin/env bash
set -euo pipefail

# CODEX PACK: Absolute Sync Mode (enforced)
# Goal:
# - EVERY command executed in your shell is auto-logged to memory/briefs/LAST_COMMAND_STATUS.md
# - MASTER_SYNC_PACKET.md is auto-regenerated after EVERY command
# - If this hook isn't active, Sync Mode is considered INVALID (MASTER not trusted)

ROOT="${1:-.}"

# Detect core root
if [[ -d "${ROOT}/xuance-commander-core" ]]; then
  CORE="${ROOT}/xuance-commander-core"
else
  CORE="${ROOT}"
fi

TOOLS="${CORE}/tools"
SYNC_DIR="${TOOLS}/sync_mode"
BRIEFS="${CORE}/memory/briefs"

LAST_STATUS="${BRIEFS}/LAST_COMMAND_STATUS.md"
MASTER_GEN="${TOOLS}/generate_master_sync_packet.sh"
MASTER_FILE="${BRIEFS}/MASTER_SYNC_PACKET.md"

mkdir -p "${TOOLS}" "${SYNC_DIR}" "${BRIEFS}"

echo "==> CORE: ${CORE}"

# --- [0] Ensure MASTER generator exists (minimal fallback if missing) ---
if [[ ! -x "${MASTER_GEN}" ]]; then
  echo "==> [0] Installing minimal MASTER generator (missing): ${MASTER_GEN}"
  cat > "${MASTER_GEN}" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${ROOT_DIR}/memory/briefs/MASTER_SYNC_PACKET.md"
SOURCES=(
"charter/CHARTER.md"
"roadmap/ROADMAP.md"
"memory/briefs/CURRENT.md"
"memory/changes/CHANGELOG.md"
"docs/governance/TEXT_ONLY_EXECUTION_RULES.md"
"docs/governance/BOOT_RULE.md"
"docs/governance/AUTONOMOUS_STOP_PROTOCOL.md"
"docs/governance/PREWRITE_STATE_CONFIRMATION.md"
"docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md"
"docs/roles/ROLE_XUANCE_COMMANDER.md"
"docs/process/WORKFLOW.md"
"docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md"
"memory/briefs/LAST_COMMAND_STATUS.md"
)
GEN_AT="$(date -Iseconds)"
{
  echo "# MASTER_SYNC_PACKET（單檔同步包｜唯一對話錨點｜自動生成）"
  echo "generatedAt: ${GEN_AT}"
  echo "sourceRoot: ${ROOT_DIR}"
  echo
  echo "## MASTER RULE（很重要）"
  echo "- MASTER 只讀快照；SSOT 仍是原始檔。"
  echo "- 若 Sync Mode 未生效（無 LAST_COMMAND_STATUS 更新），MASTER 不可信。"
  echo
  echo "## SOURCES"
  for p in "${SOURCES[@]}"; do echo "- ${p}"; done
  echo
  for p in "${SOURCES[@]}"; do
    echo
    echo "---"
    echo "## FILE: ${p}"
    echo
    if [[ -f "${ROOT_DIR}/${p}" ]]; then cat "${ROOT_DIR}/${p}"; else echo "(missing)"; fi
  done
} > "${OUT}"
echo "Wrote: ${OUT}"
EOF
  chmod +x "${MASTER_GEN}"
fi

# --- [1] Create logger used by shell hooks ---
echo "==> [1] Writing logger: ${SYNC_DIR}/log_last_status.sh"
cat > "${SYNC_DIR}/log_last_status.sh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

# log_last_status.sh
# Called by shell hooks after each command.
# Writes (OVERWRITES) LAST_COMMAND_STATUS.md, then regenerates MASTER.

ROOT_DIR="${XC_ROOT_DIR:-}"
if [[ -z "${ROOT_DIR}" ]]; then
  # best-effort: assume this script is at tools/sync_mode/
  ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
fi

STATUS_FILE="${ROOT_DIR}/memory/briefs/LAST_COMMAND_STATUS.md"
MASTER_GEN="${ROOT_DIR}/tools/generate_master_sync_packet.sh"

CMD="${XC_LAST_CMD:-}"
EC="${XC_LAST_EC:-}"
START_MS="${XC_LAST_START_MS:-}"
END_MS="${XC_LAST_END_MS:-}"

# Guard: avoid recursion / noise
# - skip if CMD empty
# - skip if command is the logger or master generator itself
if [[ -z "${CMD}" ]]; then exit 0; fi
case "${CMD}" in
  *"log_last_status.sh"*) exit 0 ;;
  *"generate_master_sync_packet.sh"*) exit 0 ;;
esac

dur_ms=""
if [[ -n "${START_MS}" && -n "${END_MS}" ]]; then
  dur_ms="$((END_MS - START_MS))"
else
  dur_ms="(unknown)"
fi

ts="$(date -Iseconds)"

# Best-effort changed files: git diffstat if available; else recent modified files
summary=""
if command -v git >/dev/null 2>&1 && git -C "${ROOT_DIR}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  head="$(git -C "${ROOT_DIR}" rev-parse --short HEAD 2>/dev/null || true)"
  status="$(git -C "${ROOT_DIR}" status --porcelain=v1 2>/dev/null || true)"
  diffstat="$(git -C "${ROOT_DIR}" diff --stat 2>/dev/null || true)"
  summary="$(cat <<SUM
git:
  head: ${head}
  status:
$(printf '%s\n' "${status}" | sed 's/^/    /')
  diffstat:
$(printf '%s\n' "${diffstat}" | sed 's/^/    /')
SUM
)"
else
  recent="$(find "${ROOT_DIR}" -type f -not -path "*/.git/*" -printf "%T@ %p\n" 2>/dev/null | sort -nr | head -n 12 | awk '{print $2}' | sed "s#^${ROOT_DIR}/##")"
  summary="$(cat <<SUM
fs:
  recent_modified_files:
$(printf '%s\n' "${recent}" | sed 's/^/    /')
SUM
)"
fi

mkdir -p "$(dirname "${STATUS_FILE}")"
cat > "${STATUS_FILE}" <<EOF
# LAST_COMMAND_STATUS
updatedAt: ${ts}
command: ${CMD}
exitCode: ${EC}
durationMs: ${dur_ms}

## summary
\`\`\`
${summary}
\`\`\`

## output
(auto-hook does not capture stdout/stderr to avoid heavy logging)
(use: bash tools/xc <command...> if you need output tail captured)
EOF

# Throttle MASTER regeneration (avoid tight-loop; 2s window)
now_s="$(date +%s)"
stamp="${ROOT_DIR}/memory/briefs/.master_regen_stamp"
last_s="0"
if [[ -f "${stamp}" ]]; then last_s="$(cat "${stamp}" 2>/dev/null || echo 0)"; fi

if [[ $((now_s - last_s)) -ge 2 ]]; then
  echo "${now_s}" > "${stamp}"
  if [[ -x "${MASTER_GEN}" ]]; then
    "${MASTER_GEN}" >/dev/null 2>&1 || true
  fi
fi
EOF
chmod +x "${SYNC_DIR}/log_last_status.sh"

# --- [2] Wrapper that captures stdout/stderr tail (optional use) ---
echo "==> [2] Writing tools/xc (optional output-capturing runner)"
cat > "${TOOLS}/xc" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

# tools/xc
# Runs command, captures stdout/stderr tails, writes LAST_COMMAND_STATUS.md, regenerates MASTER.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATUS_FILE="${ROOT_DIR}/memory/briefs/LAST_COMMAND_STATUS.md"
MASTER_GEN="${ROOT_DIR}/tools/generate_master_sync_packet.sh"

if [[ $# -lt 1 ]]; then
  echo "Usage: bash tools/xc <command...>"
  exit 2
fi

cmd_str="$*"
ts="$(date -Iseconds)"
start_ms="$(date +%s%3N 2>/dev/null || python3 - <<'PY'
import time; print(int(time.time()*1000))
PY
)"

tmp="$(mktemp -d)"
out="${tmp}/stdout.txt"
err="${tmp}/stderr.txt"

set +e
("$@") >"${out}" 2>"${err}"
ec=$?
set -e

end_ms="$(date +%s%3N 2>/dev/null || python3 - <<'PY'
import time; print(int(time.time()*1000))
PY
)"
dur_ms=$((end_ms - start_ms))

summary=""
if command -v git >/dev/null 2>&1 && git -C "${ROOT_DIR}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  head="$(git -C "${ROOT_DIR}" rev-parse --short HEAD 2>/dev/null || true)"
  status="$(git -C "${ROOT_DIR}" status --porcelain=v1 2>/dev/null || true)"
  diffstat="$(git -C "${ROOT_DIR}" diff --stat 2>/dev/null || true)"
  summary="$(cat <<SUM
git:
  head: ${head}
  status:
$(printf '%s\n' "${status}" | sed 's/^/    /')
  diffstat:
$(printf '%s\n' "${diffstat}" | sed 's/^/    /')
SUM
)"
else
  recent="$(find "${ROOT_DIR}" -type f -not -path "*/.git/*" -printf "%T@ %p\n" 2>/dev/null | sort -nr | head -n 12 | awk '{print $2}' | sed "s#^${ROOT_DIR}/##")"
  summary="$(cat <<SUM
fs:
  recent_modified_files:
$(printf '%s\n' "${recent}" | sed 's/^/    /')
SUM
)"
fi

stdout_tail="$(tail -n 80 "${out}" 2>/dev/null || true)"
stderr_tail="$(tail -n 80 "${err}" 2>/dev/null || true)"

mkdir -p "$(dirname "${STATUS_FILE}")"
cat > "${STATUS_FILE}" <<EOF
# LAST_COMMAND_STATUS
updatedAt: ${ts}
command: ${cmd_str}
exitCode: ${ec}
durationMs: ${dur_ms}

## summary
\`\`\`
${summary}
\`\`\`

## stdout_tail
\`\`\`
${stdout_tail}
\`\`\`

## stderr_tail
\`\`\`
${stderr_tail}
\`\`\`
EOF

if [[ -x "${MASTER_GEN}" ]]; then
  "${MASTER_GEN}" >/dev/null 2>&1 || true
fi

# Print original output
cat "${out}"
cat "${err}" >&2
exit "${ec}"
EOF
chmod +x "${TOOLS}/xc"

# --- [3] Install shell hooks (bash + zsh) that run after EVERY command ---
echo "==> [3] Writing bash hook: ${SYNC_DIR}/xc_hook.bash"
cat > "${SYNC_DIR}/xc_hook.bash" <<'EOF'
# xc_hook.bash (source this)
# After every command: write LAST_COMMAND_STATUS + regen MASTER
# Uses DEBUG trap + PROMPT_COMMAND to get exit code.

export XC_ROOT_DIR="${XC_ROOT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

# Avoid duplicate installation
if [[ -n "${XC_HOOK_BASH_INSTALLED:-}" ]]; then return 0; fi
export XC_HOOK_BASH_INSTALLED="1"

__xc_now_ms() {
  date +%s%3N 2>/dev/null || python3 - <<'PY'
import time; print(int(time.time()*1000))
PY
}

# Capture command before execution
trap '__xc_preexec "$BASH_COMMAND"' DEBUG

__xc_preexec() {
  local cmd="$1"
  # Skip empty / internal
  [[ -z "${cmd}" ]] && return 0
  case "${cmd}" in
    *"log_last_status.sh"*) return 0 ;;
    *"generate_master_sync_packet.sh"*) return 0 ;;
  esac
  export XC_LAST_CMD="${cmd}"
  export XC_LAST_START_MS="$(__xc_now_ms)"
}

__xc_postexec() {
  local ec="$?"
  # If no cmd tracked, skip
  [[ -z "${XC_LAST_CMD:-}" ]] && return "${ec}"
  export XC_LAST_EC="${ec}"
  export XC_LAST_END_MS="$(__xc_now_ms)"
  bash "${XC_ROOT_DIR}/tools/sync_mode/log_last_status.sh" >/dev/null 2>&1 || true
  return "${ec}"
}

# Append to existing PROMPT_COMMAND safely
if [[ -z "${PROMPT_COMMAND:-}" ]]; then
  PROMPT_COMMAND="__xc_postexec"
else
  PROMPT_COMMAND="__xc_postexec; ${PROMPT_COMMAND}"
fi
EOF

echo "==> [3] Writing zsh hook: ${SYNC_DIR}/xc_hook.zsh"
cat > "${SYNC_DIR}/xc_hook.zsh" <<'EOF'
# xc_hook.zsh (source this)
# After every command: write LAST_COMMAND_STATUS + regen MASTER
# Uses preexec + precmd to get exit code.

export XC_ROOT_DIR="${XC_ROOT_DIR:-$(cd "$(dirname "${0:A}")/../.." && pwd)}"

if [[ -n "${XC_HOOK_ZSH_INSTALLED:-}" ]]; then return 0; fi
export XC_HOOK_ZSH_INSTALLED="1"

__xc_now_ms() {
  if command -v gdate >/dev/null 2>&1; then
    gdate +%s%3N
  else
    date +%s%3N 2>/dev/null || python3 - <<'PY'
import time; print(int(time.time()*1000))
PY
  fi
}

preexec() {
  local cmd="$1"
  [[ -z "${cmd}" ]] && return 0
  case "${cmd}" in
    *"log_last_status.sh"*) return 0 ;;
    *"generate_master_sync_packet.sh"*) return 0 ;;
  esac
  export XC_LAST_CMD="${cmd}"
  export XC_LAST_START_MS="$(__xc_now_ms)"
}

precmd() {
  local ec="$?"
  [[ -z "${XC_LAST_CMD:-}" ]] && return 0
  export XC_LAST_EC="${ec}"
  export XC_LAST_END_MS="$(__xc_now_ms)"
  bash "${XC_ROOT_DIR}/tools/sync_mode/log_last_status.sh" >/dev/null 2>&1 || true
}
EOF

# --- [4] Idempotently source hooks from ~/.bashrc and ~/.zshrc ---
BASHRC="${HOME}/.bashrc"
ZSHRC="${HOME}/.zshrc"

echo "==> [4] Wiring hooks into shell rc files (idempotent)"

bash_line="source \"${CORE}/tools/sync_mode/xc_hook.bash\""
zsh_line="source \"${CORE}/tools/sync_mode/xc_hook.zsh\""

if [[ -f "${BASHRC}" ]]; then
  if ! grep -Fq "${bash_line}" "${BASHRC}"; then
    echo "${bash_line}" >> "${BASHRC}"
  fi
else
  echo "${bash_line}" > "${BASHRC}"
fi

if [[ -f "${ZSHRC}" ]]; then
  if ! grep -Fq "${zsh_line}" "${ZSHRC}"; then
    echo "${zsh_line}" >> "${ZSHRC}"
  fi
else
  echo "${zsh_line}" > "${ZSHRC}"
fi

# --- [5] Initialize LAST_COMMAND_STATUS if missing, regenerate MASTER once ---
if [[ ! -f "${LAST_STATUS}" ]]; then
  cat > "${LAST_STATUS}" <<'EOF'
# LAST_COMMAND_STATUS
updatedAt: (unset)
command: (unset)
exitCode: (unset)
durationMs: (unset)
EOF
fi

echo "==> [5] Regenerating MASTER once"
"${MASTER_GEN}" >/dev/null 2>&1 || true

echo
echo "DONE."
echo "NEXT (required): restart your terminal OR run:"
echo "  source ~/.zshrc   # if zsh"
echo "  source ~/.bashrc  # if bash"
echo
echo "After that: EVERY command auto-writes LAST_COMMAND_STATUS and auto-regenerates MASTER."
echo "If you need stdout/stderr tail captured for a command, use:"
echo "  bash tools/xc <command...>"
