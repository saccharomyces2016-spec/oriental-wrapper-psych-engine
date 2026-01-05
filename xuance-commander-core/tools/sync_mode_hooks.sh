#!/usr/bin/env bash
# tools/sync_mode_hooks.sh
# Auto-log every command to memory/briefs/LAST_COMMAND_STATUS.md
# and regenerate FULL MASTER_SYNC_PACKET.md.
# Requires:
#   export XUANCE_CORE_ROOT="/absolute/path/to/xuance-commander-core"
#   source "$XUANCE_CORE_ROOT/tools/sync_mode_hooks.sh"

# --- legacy hook cleanup (pre-20260104) ---
# Some older shells still have `_xc_precmd` registered in `precmd_functions`.
# That legacy implementation relies on STATUS_FILE/MASTER_GEN and can emit:
#   _xc_precmd:8: no such file or directory:
# We hard-remove it on every (re)source to keep prompts clean.
if typeset -f _xc_precmd >/dev/null 2>&1; then
  # remove from precmd_functions if present
  if typeset -p precmd_functions >/dev/null 2>&1; then
    precmd_functions=(${precmd_functions:#_xc_precmd})
  fi
  unset -f _xc_precmd 2>/dev/null || true
fi
# --- end legacy hook cleanup ---

_xc_write_status() {
  local cmd="$1"
  local ec="$2"
  local ts
  ts="$(date "+%Y-%m-%dT%H:%M:%S%z")"
  ts="${ts:0:19}${ts:19:3}:${ts:22:2}"

  [[ -z "${XUANCE_CORE_ROOT:-}" ]] && return 0
  local core="$XUANCE_CORE_ROOT"
  local status_file="$core/memory/briefs/LAST_COMMAND_STATUS.md"
  local full_gen="$core/tools/build_master_sync_packet_full.sh"

  mkdir -p "$(dirname "$status_file")"
  cat > "$status_file" <<EOF
# LAST_COMMAND_STATUS（最新一次指令結果｜自動）
updatedAt: $ts
command: $cmd
exitCode: $ec
success: $([[ "$ec" -eq 0 ]] && echo true || echo false)
EOF

  # --- REPO_STATUS (best-effort) ---
  local repo_root
  repo_root="$(cd "$core/.." 2>/dev/null && pwd)"
  local repo_file="$core/memory/briefs/REPO_STATUS.md"

  # Only attempt if this looks like a git repo
  if [ -d "$repo_root/.git" ] || git -C "$repo_root" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    local branch sha
    branch="$(git -C "$repo_root" rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
    sha="$(git -C "$repo_root" rev-parse --short HEAD 2>/dev/null || echo unknown)"

    mkdir -p "$(dirname "$repo_file")"
    {
      echo "# REPO_STATUS（Repo 狀態快照｜自動）"
      echo "updatedAt: $ts"
      echo "repoRoot: $repo_root"
      echo "branch: $branch"
      echo "head: $sha"
      echo ""
      echo "## git status -sb"
      git -C "$repo_root" status -sb 2>/dev/null || true
      echo ""
      echo "## git remote -v"
      git -C "$repo_root" remote -v 2>/dev/null || true
      echo ""
      echo "## last commit"
      git -C "$repo_root" log -1 --pretty=fuller 2>/dev/null || true
    } > "$repo_file"
  else
    mkdir -p "$(dirname "$repo_file")"
    {
      echo "# REPO_STATUS（Repo 狀態快照｜自動）"
      echo "updatedAt: $ts"
      echo "repoRoot: $repo_root"
      echo "note: not a git worktree (no .git found); skipping"
    } > "$repo_file"
  fi
  # --- /REPO_STATUS ---

  [[ -x "$full_gen" ]] && bash "$full_gen" >/dev/null 2>&1 || true
}

# ---- bash ----
_xc_bash_prompt_command() {
  local ec="$?"
  local cmd
  cmd="$(history 1 2>/dev/null | sed -E "s/^[[:space:]]*[0-9]+[[:space:]]+//")"
  [[ -z "$cmd" ]] && cmd="(unknown)"
  [[ "$cmd" == "_xc_bash_prompt_command" ]] && return 0
  _xc_write_status "$cmd" "$ec"
}

_xc_install_bash() {
  [[ "${PROMPT_COMMAND:-}" == *"_xc_bash_prompt_command"* ]] && return 0
  if [[ -n "${PROMPT_COMMAND:-}" ]]; then
    PROMPT_COMMAND="_xc_bash_prompt_command; ${PROMPT_COMMAND}"
  else
    PROMPT_COMMAND="_xc_bash_prompt_command"
  fi
}

# ---- zsh ----
_xc_zsh_last_cmd=""
_xc_zsh_preexec() { _xc_zsh_last_cmd="$1"; }
_xc_zsh_precmd() {
  local ec="$?"
  local cmd="${_xc_zsh_last_cmd:-"(unknown)"}"
  _xc_write_status "$cmd" "$ec"
}

_xc_install_zsh() {
  autoload -Uz add-zsh-hook 2>/dev/null || true
  add-zsh-hook -d preexec _xc_zsh_preexec 2>/dev/null || true
  add-zsh-hook -d precmd  _xc_zsh_precmd  2>/dev/null || true
  add-zsh-hook preexec _xc_zsh_preexec
  add-zsh-hook precmd  _xc_zsh_precmd
}

if [[ -n "${ZSH_VERSION:-}" ]]; then
  _xc_install_zsh
else
  _xc_install_bash
fi

# XUANCE_ZSH_CMD_CAPTURE_BEGIN
# Purpose: ensure zsh captures the last executed command so LAST_COMMAND_STATUS is not (unknown).

# Legacy cleanup (old function names)
if typeset -p precmd_functions >/dev/null 2>&1; then
  precmd_functions=(${precmd_functions:#_xc_precmd})
fi
if typeset -p preexec_functions >/dev/null 2>&1; then
  preexec_functions=(${preexec_functions:#_xc_preexec})
fi
unset -f _xc_precmd _xc_preexec 2>/dev/null || true

# --- zsh hooks (capture command + write status) ---
_xc_zsh_preexec() {
  # $1 is the full command line about to be executed
  _xc_zsh_last_cmd="$1"
}

_xc_zsh_precmd() {
  local ec="$?"
  local cmd="${_xc_zsh_last_cmd:-"(unknown)"}"
  _xc_write_status "$cmd" "$ec"
}

# Register zsh hooks (avoid duplicates)
if typeset -p preexec_functions >/dev/null 2>&1; then
  preexec_functions=(${preexec_functions:#_xc_zsh_preexec})
  preexec_functions+=( _xc_zsh_preexec )
fi
if typeset -p precmd_functions >/dev/null 2>&1; then
  precmd_functions=(${precmd_functions:#_xc_zsh_precmd})
  precmd_functions+=( _xc_zsh_precmd )
fi

if type add-zsh-hook >/dev/null 2>&1; then
  add-zsh-hook -d preexec _xc_zsh_preexec 2>/dev/null || true
  add-zsh-hook -d precmd _xc_zsh_precmd 2>/dev/null || true
  add-zsh-hook preexec _xc_zsh_preexec
  add-zsh-hook precmd _xc_zsh_precmd
fi
# XUANCE_ZSH_CMD_CAPTURE_END
