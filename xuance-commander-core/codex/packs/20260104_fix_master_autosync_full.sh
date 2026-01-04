#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CORE="$ROOT"

HOOK="$CORE/tools/sync_mode_hooks.sh"
FULL_GEN="$CORE/tools/build_master_sync_packet_full.sh"
STATUS_FILE="$CORE/memory/briefs/LAST_COMMAND_STATUS.md"
MASTER_FILE="$CORE/memory/briefs/MASTER_SYNC_PACKET.md"

mkdir -p "$CORE/tools" "$CORE/memory/briefs"

# 1) FULL MASTER generator (embeds key files)
cat > "$FULL_GEN" <<'GEN'
#!/usr/bin/env bash
set -euo pipefail
CORE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$CORE/memory/briefs/MASTER_SYNC_PACKET.md"
ts="$(date "+%Y-%m-%dT%H:%M:%S%z")"
ts="${ts:0:19}${ts:19:3}:${ts:22:2}"

write_file () {
  local rel="$1"
  local abs="$CORE/$rel"
  echo
  echo "---"
  echo "## FILE: $rel"
  echo
  if [[ -f "$abs" ]]; then
    cat "$abs"
  else
    echo "(missing)"
  fi
}

{
  echo "# MASTER_SYNC_PACKET（單檔同步包｜唯一對話錨點｜FULL）"
  echo "generatedAt: $ts"
  echo "sourceRoot: $CORE"
  echo
  echo "## NOTE"
  echo "- This file is auto-generated. Do not edit by hand."
  echo "- Regenerate via: bash tools/build_master_sync_packet_full.sh"
  echo
  write_file "charter/CHARTER.md"
  write_file "roadmap/ROADMAP.md"
  write_file "memory/briefs/CURRENT.md"
  write_file "memory/changes/CHANGELOG.md"
  write_file "docs/governance/TEXT_ONLY_EXECUTION_RULES.md"
  write_file "docs/governance/BOOT_RULE.md"
  write_file "docs/governance/AUTONOMOUS_STOP_PROTOCOL.md"
  write_file "docs/governance/PREWRITE_STATE_CONFIRMATION.md"
  write_file "docs/governance/AI_PARTNERSHIP_PROTOCOL.md"
  write_file "docs/governance/AI_ADVISORY_ROLES.md"
  write_file "docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md"
  write_file "docs/roles/ROLE_XUANCE_COMMANDER.md"
  write_file "docs/process/WORKFLOW.md"
  write_file "docs/adr/ADR_0001_externalize_domain_and_version_schema.md"
  write_file "docs/adr/ADR_0002_esoteric_experience_scientific_core.md"
  write_file "docs/adr/ADR_0003_world_class_bilingual_global_market.md"
  write_file "docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md"
  write_file "memory/briefs/LAST_COMMAND_STATUS.md"
} > "$OUT"
GEN
chmod +x "$FULL_GEN"

# 2) sync_mode_hooks.sh (bash/zsh compatible, auto-write status + regen FULL master)
cat > "$HOOK" <<'HOOK'
#!/usr/bin/env bash
# tools/sync_mode_hooks.sh
# Auto-log every command to memory/briefs/LAST_COMMAND_STATUS.md
# and regenerate FULL MASTER_SYNC_PACKET.md.
# Requires:
#   export XUANCE_CORE_ROOT="/absolute/path/to/xuance-commander-core"
#   source "$XUANCE_CORE_ROOT/tools/sync_mode_hooks.sh"

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
HOOK
chmod +x "$HOOK"

# 3) Ensure ~/.zshrc (or ~/.bashrc) has export + source lines (idempotent)
RC="$HOME/.zshrc"
[[ -f "$RC" ]] || RC="$HOME/.bashrc"

LINE1="export XUANCE_CORE_ROOT=\"$CORE\""
LINE2="source \"\\$XUANCE_CORE_ROOT/tools/sync_mode_hooks.sh\""

grep -Fq "$LINE1" "$RC" 2>/dev/null || echo "$LINE1" >> "$RC"
grep -Fq "$LINE2" "$RC" 2>/dev/null || echo "$LINE2" >> "$RC"

# 4) Regenerate FULL master once now
bash "$FULL_GEN"

# 5) Verify MASTER looks correct
head -n 2 "$MASTER_FILE" | grep -q "MASTER_SYNC_PACKET" || { echo "ERROR: MASTER header not correct"; exit 1; }
echo "OK: FULL MASTER repaired: $MASTER_FILE"
echo "OK: hooks installed in: $RC"
echo "NEXT: run -> source \"$RC\""
