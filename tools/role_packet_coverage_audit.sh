#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   tools/role_packet_coverage_audit.sh ROLE_R1 memory/briefs/role_sync_packets/ROLE_R1_SYNC_PACKET.md > .../LATEST/ROLE_R1_AUDIT.md
#
# Env:
#   REPO_ROOT: repo root (default: pwd)

ROLE_KEY="${1:-}"
PACKET_PATH="${2:-}"

if [ -z "$ROLE_KEY" ] || [ -z "$PACKET_PATH" ]; then
  echo "Usage: $0 <ROLE_KEY e.g. ROLE_R1> <PACKET_PATH>"
  exit 2
fi

REPO_ROOT="${REPO_ROOT:-$(pwd)}"
# If running from the outer repo root, auto-hop into xuance-commander-core when sources live there.
if [ ! -f "${REPO_ROOT}/charter/CHARTER.md" ] && [ -d "${REPO_ROOT}/xuance-commander-core/charter" ]; then
  REPO_ROOT="${REPO_ROOT}/xuance-commander-core"
fi

# ---- REQUIRED SOURCES (SSOT) ----
# You can adjust as the project evolves; commit changes to avoid drift.
case "$ROLE_KEY" in
  ROLE_R1)
    REQUIRED=(
      "charter/CHARTER.md"
      "roadmap/ROADMAP.md"
      "memory/briefs/CURRENT.md"
      "docs/governance/TEXT_ONLY_EXECUTION_RULES.md"
      "docs/governance/AI_ADVISORY_ROLES.md"
      "docs/governance/LESSONS_LEARNED.md"
      "docs/gem/briefs/BRIEF_lessons_and_constraints.zh.md"
      "docs/research/life_cycle_0_100_integrated_research_note.zh.md"
      "docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R1_question_blueprint.zh.md"
      "memory/briefs/REPO_STATUS.md"
      "memory/briefs/LAST_COMMAND_STATUS.md"
    )
    ;;
  ROLE_R4)
    REQUIRED=(
      "charter/CHARTER.md"
      "roadmap/ROADMAP.md"
      "memory/briefs/CURRENT.md"
      "docs/governance/TEXT_ONLY_EXECUTION_RULES.md"
      "docs/governance/AI_ADVISORY_ROLES.md"
      "docs/governance/LESSONS_LEARNED.md"
      "docs/gem/briefs/BRIEF_lessons_and_constraints.zh.md"
      "docs/research/life_cycle_0_100_integrated_research_note.zh.md"
      "docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R4_riskchains.zh.md"
      "memory/briefs/REPO_STATUS.md"
      "memory/briefs/LAST_COMMAND_STATUS.md"
    )
    ;;
  *)
    echo "Unknown ROLE_KEY: $ROLE_KEY"
    exit 3
    ;;
esac

echo "# ${ROLE_KEY} Role Sync Packet Coverage Audit"
echo ""
echo "- generatedAt: $(date -Iseconds)"
echo "- packet: ${PACKET_PATH}"
echo ""

# ---- Check: packet exists ----
if [ ! -f "$PACKET_PATH" ]; then
  echo "## Verdict"
  echo ""
  echo "- ❌ FAIL: packet not found"
  exit 1
fi

echo "## Required Sources"
for f in "${REQUIRED[@]}"; do
  echo "- \`${f}\`"
done
echo ""

echo "## Coverage Check"
missing=0
for f in "${REQUIRED[@]}"; do
  # Packets must visibly embed each required source (looks for your FILE: header markers)
  if ! rg -n --fixed-strings "FILE: ${f}" "$PACKET_PATH" >/dev/null 2>&1; then
    echo "- ❌ MISSING_IN_PACKET: \`${f}\`"
    missing=1
  else
    echo "- ✅ OK: \`${f}\`"
  fi
done
echo ""

echo "## Included Sources Hashes (SSOT)"
# Hashes and line counts help confirm whether embedded content matches current repo state.
for f in "${REQUIRED[@]}"; do
  if [ -f "${REPO_ROOT}/${f}" ]; then
    sha="$(shasum -a 256 "${REPO_ROOT}/${f}" | awk '{print $1}')"
    lines="$(wc -l < "${REPO_ROOT}/${f}" | tr -d ' ')"
    echo "- \`${f}\`"
    echo "  - sha256: \`${sha}\`"
    echo "  - lines: \`${lines}\`"
  else
    echo "- ⚠️ SOURCE_FILE_NOT_FOUND_IN_REPO: \`${f}\`"
    missing=1
  fi
done
echo ""

echo "## Verdict"
if [ "$missing" -eq 1 ]; then
  echo ""
  echo "- ❌ FAIL: missing required sources (see above)"
  exit 1
fi
echo ""
echo "- ✅ PASS: all required sources are embedded and source files exist"
