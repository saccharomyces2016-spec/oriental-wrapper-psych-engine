#!/usr/bin/env bash
set -euo pipefail

# CODEX PACK: Master Sync Packet v1.0 generator
# What it does:
# - Auto-generates/overwrites: memory/briefs/MASTER_SYNC_PACKET.md
# - Treats source files as truth; MASTER is a read-only snapshot
# - Includes: goals, roadmap, current, governance rules, roles, ADRs, GEM roles
# - Adds: "LAST COMMAND STATUS" by snapshotting latest preflight/alerts (tails)
#
# Usage:
#   bash codex/packs/20260104_master_sync_v1.sh .
# or:
#   bash 20260104_master_sync_v1.sh .

ROOT="${1:-.}"

# If user runs at repo root that contains xuance-commander-core/, auto-enter it.
if [[ -d "$ROOT/xuance-commander-core" ]]; then
  CORE="$ROOT/xuance-commander-core"
else
  CORE="$ROOT"
fi

OUTDIR="$CORE/memory/briefs"
OUT="$OUTDIR/MASTER_SYNC_PACKET.md"
mkdir -p "$OUTDIR"

# Soft cap controls (reduce if file too large for pasting)
MAX_TAIL_LINES="${MAX_TAIL_LINES:-120}"
MAX_SECTION_LINES="${MAX_SECTION_LINES:-2000}"

emit_header() {
  cat <<EOF
# MASTER_SYNC_PACKET（單檔同步包｜唯一對話錨點｜自動生成）
generatedAt: $(date -Iseconds)
sourceRoot: $(realpath "$CORE" 2>/dev/null || echo "$CORE")

## MASTER RULE（很重要）
- 這份檔案 = 「只讀快照」，用來貼給 GPT 對齊現況。
- 真相來源 = 各原始檔（charter/roadmap/governance/adr/roles/...）。
- 若 MASTER 與原檔衝突：以原檔為準，然後重新生成 MASTER。

## SOURCES（本檔同步來源清單）
EOF
}

cat_file() {
  local p="$1"
  echo
  echo "---"
  echo "## FILE: $p"
  echo
  if [[ -f "$CORE/$p" ]]; then
    # Limit per-section lines to prevent huge MASTER
    sed -n "1,${MAX_SECTION_LINES}p" "$CORE/$p"
    local total
    total="$(wc -l < "$CORE/$p" | tr -d ' ')"
    if [[ "$total" -gt "$MAX_SECTION_LINES" ]]; then
      echo
      echo "(truncated: ${MAX_SECTION_LINES}/${total} lines)"
    fi
  else
    echo "(missing)"
  fi
}

latest_file_tail() {
  local dir="$1"
  local label="$2"
  echo
  echo "---"
  echo "## $label (latest tail)"
  echo
  if [[ -d "$CORE/$dir" ]]; then
    local latest
    latest="$(ls -1t "$CORE/$dir" 2>/dev/null | head -n 1 || true)"
    if [[ -n "$latest" ]] && [[ -f "$CORE/$dir/$latest" ]]; then
      echo "- path: $dir/$latest"
      echo
      tail -n "$MAX_TAIL_LINES" "$CORE/$dir/$latest"
    else
      echo "(none)"
    fi
  else
    echo "(missing dir: $dir)"
  fi
}

latest_adr_path() {
  local d="$CORE/docs/adr"
  if [[ -d "$d" ]]; then
    ls -1t "$d"/ADR_*.md 2>/dev/null | head -n 1 || true
  fi
}

# --- Define what MUST be in MASTER ---
SOURCES=(
  "charter/CHARTER.md"
  "roadmap/ROADMAP.md"
  "memory/briefs/CURRENT.md"
  "memory/changes/CHANGELOG.md"

  "docs/governance/TEXT_ONLY_EXECUTION_RULES.md"
  "docs/governance/BOOT_RULE.md"
  "docs/governance/AUTONOMOUS_STOP_PROTOCOL.md"
  "docs/governance/PREWRITE_STATE_CONFIRMATION.md"
  "docs/governance/AI_PARTNERSHIP_PROTOCOL.md"
  "docs/governance/AI_ADVISORY_ROLES.md"
  "docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md"

  "docs/roles/ROLE_XUANCE_COMMANDER.md"
  "docs/process/WORKFLOW.md"

  "docs/gem/README.md"
  "docs/gem/profiles/R1_assessment_designer.md"
  "docs/gem/profiles/R2_esoteric_narrative_designer.md"
  "docs/gem/profiles/R3_actionability_coach.md"
  "docs/gem/profiles/R4_risk_chain_architect.md"
  "docs/gem/profiles/R5_bilingual_native_editor.md"
)

# Also include: latest ADR + key ADRs if present
KEY_ADRS=(
  "docs/adr/ADR_0001_externalize_domain_and_version_schema.md"
  "docs/adr/ADR_0002_esoteric_experience_scientific_core.md"
  "docs/adr/ADR_0003_world_class_bilingual_global_market.md"
  "docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md"
)

{
  emit_header

  # Print source list
  for s in "${SOURCES[@]}"; do echo "- $s"; done
  for a in "${KEY_ADRS[@]}"; do echo "- $a"; done
  echo "- docs/adr/(latest ADR_*.md)"
  echo "- logs/preflight/(latest tail)"
  echo "- logs/alerts/(latest tail)"
  echo

  # Core sources
  for s in "${SOURCES[@]}"; do cat_file "$s"; done

  # ADRs
  for a in "${KEY_ADRS[@]}"; do cat_file "$a"; done

  # Latest ADR (if newer/different)
  echo
  echo "---"
  echo "## FILE: docs/adr/(latest ADR_*.md)"
  echo
  LATEST_ADR="$(latest_adr_path || true)"
  if [[ -n "${LATEST_ADR:-}" ]] && [[ -f "$LATEST_ADR" ]]; then
    rel="${LATEST_ADR#"$CORE/"}"
    echo "- path: $rel"
    echo
    sed -n "1,${MAX_SECTION_LINES}p" "$LATEST_ADR"
  else
    echo "(no ADR found)"
  fi

  # Last command status snapshot (tails)
  latest_file_tail "logs/preflight" "LAST COMMAND STATUS: logs/preflight"
  latest_file_tail "logs/alerts" "LAST COMMAND STATUS: logs/alerts"

  # Optional: explicit status file if you decide to use it later
  cat_file "memory/briefs/LAST_COMMAND_STATUS.md"

  echo
  echo "---"
  echo "## HEALTH CHECK (quick)"
  echo
  # Minimal “is anything missing” report
  MISSING=0
  for must in "charter/CHARTER.md" "roadmap/ROADMAP.md" "memory/briefs/CURRENT.md" "docs/governance/TEXT_ONLY_EXECUTION_RULES.md"; do
    if [[ ! -f "$CORE/$must" ]]; then
      echo "- ❌ missing: $must"
      MISSING=1
    else
      echo "- ✅ present: $must"
    fi
  done
  if [[ "$MISSING" -eq 0 ]]; then
    echo
    echo "Result: ✅ Minimum truth-set present."
  else
    echo
    echo "Result: ⚠️ Missing minimum truth-set. Fix missing files, then regenerate."
  fi

} > "$OUT"

echo "✅ Generated: $OUT"
