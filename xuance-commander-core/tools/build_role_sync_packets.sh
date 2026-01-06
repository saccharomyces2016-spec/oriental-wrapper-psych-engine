#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CORE="$REPO_ROOT/xuance-commander-core"
OUT_DIR="$CORE/memory/briefs/role_sync_packets"
LATEST_DIR="$OUT_DIR/LATEST"
mkdir -p "$OUT_DIR" "$LATEST_DIR"

ts="$(date -Iseconds)"

# Utility: add a file (if exists) with a header; otherwise note missing.
add_file() {
  local out="$1"
  local label="$2"
  local path="$3"

  echo "" >> "$out"
  echo "---" >> "$out"
  echo "## FILE: $label" >> "$out"
  echo "path: $path" >> "$out"
  echo "" >> "$out"

  if [[ -f "$path" ]]; then
    cat "$path" >> "$out"
  else
    echo "> MISSING: $path" >> "$out"
  fi
}

# Utility: pick first existing among candidates
pick_first_existing() {
  for p in "$@"; do
    if [[ -f "$p" ]]; then
      echo "$p"
      return 0
    fi
  done
  echo ""  # none
}

# Common references (embedded into every role packet)
COMMON_FILES=(
  "$REPO_ROOT/charter/CHARTER.md"
  "$REPO_ROOT/roadmap/ROADMAP.md"
  "$CORE/memory/briefs/CURRENT.md"
  "$CORE/memory/changes/CHANGELOG.md"
  "$CORE/docs/governance/TEXT_ONLY_EXECUTION_RULES.md"
  "$CORE/docs/process/TASK_LIFECYCLE.md"
  "$CORE/docs/governance/AI_ADVISORY_ROLES.md"
  "$CORE/docs/governance/REPAIR_RECORDING_RULE.md"
  "$CORE/docs/ops/SYNC_TRIGGERS.md"
  "$CORE/docs/ops/VERIFICATION_PACK_POLICY.md"
  "$CORE/docs/ops/ROLE_SYNC_PACKET_PROTOCOL.md"
  "$CORE/docs/adr/ADR_0002_esoteric_experience_scientific_core.md"
  "$CORE/docs/adr/ADR_0003_world_class_bilingual_global_market.md"
  "$CORE/docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md"
  "$CORE/docs/governance/LESSONS_LEARNED.md"
  "$CORE/memory/briefs/REPO_STATUS.md"
  "$CORE/memory/briefs/LAST_COMMAND_STATUS.md"
)

# Legacy router pointer(s) (include if present)
LEGACY_ROUTER_CANDIDATES=(
  "$CORE/legacy/ROUTER.md"
  "$CORE/docs/legacy/ROUTER.md"
  "$REPO_ROOT/legacy/ROUTER.md"
  "$REPO_ROOT/docs/legacy/ROUTER.md"
)

LEGACY_ROUTER="$(pick_first_existing "${LEGACY_ROUTER_CANDIDATES[@]}")"

build_role_packet() {
  local role="$1"      # R1 or R4
  local facet="$2"     # income_expansion_pressure
  local out="$OUT_DIR/ROLE_${role}_SYNC_PACKET.md"

  : > "$out"
  echo "# ROLE_${role}_SYNC_PACKET（單檔同步包｜Common + Role + References）" >> "$out"
  echo "generatedAt: $ts" >> "$out"
  echo "facetId: $facet" >> "$out"
  echo "" >> "$out"
  echo "## NOTE" >> "$out"
  echo "- This file is auto-generated. Do not edit by hand." >> "$out"
  echo "- Regenerate via: bash xuance-commander-core/tools/build_role_sync_packets.sh" >> "$out"
  echo "- If you think anything is missing, STOP and report missing paths; do NOT assume." >> "$out"

  echo "" >> "$out"
  echo "---" >> "$out"
  echo "## 0) ROLE SCOPE" >> "$out"
  echo "- Role: $role" >> "$out"
  echo "- Facet: $facet" >> "$out"
  echo "- Required behavior: obey Common Rules + Role Brief + embedded references below" >> "$out"

  echo "" >> "$out"
  echo "---" >> "$out"
  echo "## 1) COMMON (embedded)" >> "$out"

  for f in "${COMMON_FILES[@]}"; do
    add_file "$out" "$(basename "$f")" "$f"
  done

  if [[ -n "${LEGACY_ROUTER}" ]]; then
    add_file "$out" "LEGACY_ROUTER" "$LEGACY_ROUTER"
  else
    echo "" >> "$out"
    echo "---" >> "$out"
    echo "## FILE: LEGACY_ROUTER" >> "$out"
    echo "> MISSING: no legacy router file found in candidates." >> "$out"
  fi

  echo "" >> "$out"
  echo "---" >> "$out"
  echo "## 2) ROLE-SPECIFIC (embedded)" >> "$out"

  if [[ "$role" == "R1" ]]; then
    # R1 brief candidates
    R1_BRIEF_CANDIDATES=(
      "$CORE/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R1_question_blueprint.zh.md"
      "$CORE/memory/briefs/BRIEF_P0-2_income_expansion_pressure_R1.zh.md"
      "$REPO_ROOT/BRIEF_P0-2_income_expansion_pressure_R1.zh.md"
    )
    R1_BRIEF="$(pick_first_existing "${R1_BRIEF_CANDIDATES[@]}")"
    if [[ -n "$R1_BRIEF" ]]; then
      add_file "$out" "R1_BRIEF" "$R1_BRIEF"
    else
      add_file "$out" "R1_BRIEF" "$CORE/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R1_question_blueprint.zh.md"
    fi

    # Master proposal (facet) candidates
    MASTER_PROPOSAL_CANDIDATES=(
      "$CORE/memory/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"
      "$CORE/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"
      "$REPO_ROOT/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"
    )
    MASTER_PROPOSAL="$(pick_first_existing "${MASTER_PROPOSAL_CANDIDATES[@]}")"
    if [[ -n "$MASTER_PROPOSAL" ]]; then
      add_file "$out" "MASTER_PROPOSAL" "$MASTER_PROPOSAL"
    else
      # still record missing deterministically
      add_file "$out" "MASTER_PROPOSAL" "$CORE/memory/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"
    fi
  fi

  if [[ "$role" == "R4" ]]; then
    # R4 brief candidates
    R4_BRIEF_CANDIDATES=(
      "$CORE/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R4_riskchains.zh.md"
      "$CORE/memory/briefs/BRIEF_P0-2_income_expansion_pressure_R4.zh.md"
      "$REPO_ROOT/BRIEF_P0-2_income_expansion_pressure_R4.zh.md"
    )
    R4_BRIEF="$(pick_first_existing "${R4_BRIEF_CANDIDATES[@]}")"
    if [[ -n "$R4_BRIEF" ]]; then
      add_file "$out" "R4_BRIEF" "$R4_BRIEF"
    else
      add_file "$out" "R4_BRIEF" "$CORE/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R4_riskchains.zh.md"
    fi

    # Master proposal (facet) candidates
    MASTER_PROPOSAL_CANDIDATES=(
      "$CORE/memory/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"
      "$CORE/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"
      "$REPO_ROOT/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"
    )
    MASTER_PROPOSAL="$(pick_first_existing "${MASTER_PROPOSAL_CANDIDATES[@]}")"
    if [[ -n "$MASTER_PROPOSAL" ]]; then
      add_file "$out" "MASTER_PROPOSAL" "$MASTER_PROPOSAL"
    else
      add_file "$out" "MASTER_PROPOSAL" "$CORE/memory/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md"
    fi
  fi

  # LATEST pointer copy (no symlink to avoid cross-platform issues)
  cp -f "$out" "$LATEST_DIR/$(basename "$out")"
  echo "OK: built $out"
}

build_role_packet "R1" "income_expansion_pressure"
build_role_packet "R4" "income_expansion_pressure"
