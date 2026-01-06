#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
XC_ROOT="$REPO_ROOT/xuance-commander-core"

OUT_DIR="$XC_ROOT/memory/briefs/role_sync_packets"
LATEST_DIR="$OUT_DIR/LATEST"
mkdir -p "$OUT_DIR" "$LATEST_DIR"

ts="$(date -Iseconds)"

emit_file() {
  local label="$1"
  local path="$2"
  echo ""
  echo "---"
  echo "## FILE: ${label}"
  echo ""
  cat "$path"
  echo ""
}

must_exist() {
  local path="$1"
  if [ ! -f "$path" ]; then
    echo "❌ missing required file: $path" >&2
    exit 1
  fi
}

resolve_one() {
  local p1="$1"
  local p2="$2"
  if [ -f "$p1" ]; then echo "$p1"; return; fi
  if [ -f "$p2" ]; then echo "$p2"; return; fi
  echo ""
}

CHARTER_PATH="$(resolve_one "$XC_ROOT/charter/CHARTER.md" "$REPO_ROOT/charter/CHARTER.md")"
ROADMAP_PATH="$(resolve_one "$XC_ROOT/roadmap/ROADMAP.md" "$REPO_ROOT/roadmap/ROADMAP.md")"

[ -n "$CHARTER_PATH" ] || { echo "❌ CHARTER not found" >&2; exit 1; }
[ -n "$ROADMAP_PATH" ] || { echo "❌ ROADMAP not found" >&2; exit 1; }

find_legacy() {
  local name="$1"
  find "$REPO_ROOT" -maxdepth 8 -type f -name "$name" 2>/dev/null | head -n 1 || true
}

LEGACY_ROUTER_PATH="$(find_legacy "ROUTER.md")"
LEGACY_FAIL_PATH="$(find_legacy "FAILURE_PATTERNS.md")"
LEGACY_UI_PATH="$(find_legacy "UI_FLOW_REFERENCES.md")"
LEGACY_CAP_PATH="$(find_legacy "CAPABILITY_MAP.md")"
LEGACY_REUSE_PATH="$(find_legacy "REUSABLE_ASSETS.md")"

[ -n "$LEGACY_ROUTER_PATH" ] || { echo "❌ LEGACY ROUTER.md not found" >&2; exit 1; }
[ -n "$LEGACY_FAIL_PATH" ] || { echo "❌ LEGACY FAILURE_PATTERNS.md not found" >&2; exit 1; }

COMMON_FILES=(
  "$CHARTER_PATH"
  "$ROADMAP_PATH"
  "$XC_ROOT/memory/briefs/CURRENT.md"
  "$XC_ROOT/memory/changes/CHANGELOG.md"
  "$XC_ROOT/docs/process/TASK_LIFECYCLE.md"
  "$XC_ROOT/docs/governance/AI_ADVISORY_ROLES.md"
  "$XC_ROOT/docs/governance/REPAIR_RECORDING_RULE.md"
  "$XC_ROOT/docs/ops/SYNC_TRIGGERS.md"
  "$XC_ROOT/docs/ops/VERIFICATION_PACK_POLICY.md"
  "$XC_ROOT/docs/ops/ROLE_SYNC_PACKET_PROTOCOL.md"
  "$XC_ROOT/docs/governance/LESSONS_LEARNED.md"
  "$XC_ROOT/memory/briefs/REPO_STATUS.md"
  "$XC_ROOT/memory/briefs/LAST_COMMAND_STATUS.md"
)

ADR_GLOBS=( "$XC_ROOT/docs/adr/"*.md )
for a in "${ADR_GLOBS[@]}"; do
  [ -f "$a" ] && COMMON_FILES+=( "$a" )
done

LEGACY_FILES=(
  "$LEGACY_ROUTER_PATH"
  "$LEGACY_FAIL_PATH"
)

[ -n "${LEGACY_UI_PATH:-}" ] && LEGACY_FILES+=( "$LEGACY_UI_PATH" )
[ -n "${LEGACY_CAP_PATH:-}" ] && LEGACY_FILES+=( "$LEGACY_CAP_PATH" )
[ -n "${LEGACY_REUSE_PATH:-}" ] && LEGACY_FILES+=( "$LEGACY_REUSE_PATH" )

emit_packet() {
  local role="$1"
  local brief="$2"
  local master_proposal="$3"
  local out="$OUT_DIR/ROLE_${role}_SYNC_PACKET.md"

  must_exist "$brief"
  must_exist "$master_proposal"

  {
    echo "# ROLE_${role}_SYNC_PACKET（單檔同步包｜Common+Role+Refs）"
    echo "generatedAt: ${ts}"
    echo "sourceRoot: ${XC_ROOT}"
    echo ""
    echo "## NOTE"
    echo "- This file is auto-generated. Do not edit by hand."
    echo "- Regenerate via: bash xuance-commander-core/tools/build_role_sync_packets.sh"
    echo ""
    echo "---"
    echo "## 0) ROLE SCOPE"
    echo "- role: ${role}"
    echo "- rule: one-file-per-role; embeds common + role-specific + refs"
    echo ""
    echo "---"
    echo "## 1) COMMON"
    for f in "${COMMON_FILES[@]}"; do
      [ -f "$f" ] && emit_file "${f#${XC_ROOT}/}" "$f"
    done
    echo ""
    echo "---"
    echo "## 1.5) LEGACY_ROUTER (MANDATORY REFS)"
    for f in "${LEGACY_FILES[@]}"; do
      [ -f "$f" ] && emit_file "${f#${REPO_ROOT}/}" "$f"
    done
    echo ""
    echo "---"
    echo "## 2) ROLE-SPECIFIC"
    emit_file "docs/gem/briefs/$(basename "$brief")" "$brief"
    emit_file "docs/gem/briefs/$(basename "$master_proposal")" "$master_proposal"
  } > "$out"

  cp -f "$out" "$LATEST_DIR/ROLE_${role}_SYNC_PACKET.md"
  echo "✅ generated: $out"
}

emit_packet "R1" \
  "$XC_ROOT/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R1_question_blueprint.zh.md" \
  "$XC_ROOT/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"

emit_packet "R4" \
  "$XC_ROOT/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R4_riskchains.zh.md" \
  "$XC_ROOT/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"

echo "== DONE =="
