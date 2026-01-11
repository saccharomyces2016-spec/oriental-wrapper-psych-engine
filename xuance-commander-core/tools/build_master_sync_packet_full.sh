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
  write_file "docs/governance/FILE_WRITE_LOCATION_RULE.md"
  write_file "docs/governance/GLOBAL_PATH_CANON.md"
  write_file "docs/governance/ABSOLUTE_REFERENCE_RULE.md"
  write_file "docs/governance/MASTER_SNAPSHOT_USAGE_GUIDE.md"
  write_file "docs/governance/BOOT_RULE.md"
  write_file "docs/governance/AUTONOMOUS_STOP_PROTOCOL.md"
  write_file "docs/governance/PREWRITE_STATE_CONFIRMATION.md"
  write_file "docs/governance/AI_PARTNERSHIP_PROTOCOL.md"
  write_file "docs/governance/AI_ADVISORY_ROLES.md"
  write_file "docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md"
  write_file "docs/roles/ROLE_XUANCE_COMMANDER.md"
  write_file "docs/process/WORKFLOW.md"
  write_file "docs/process/TASK_LIFECYCLE.md"
  write_file "docs/adr/ADR_0001_externalize_domain_and_version_schema.md"
  write_file "docs/adr/ADR_0002_esoteric_experience_scientific_core.md"
  write_file "docs/adr/ADR_0003_world_class_bilingual_global_market.md"
  write_file "docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md"
  write_file "memory/briefs/REPO_STATUS.md"
  write_file "memory/briefs/LAST_COMMAND_STATUS.md"
  write_file "docs/ops/HEALTH_CHECK_RECORDS.md"
} > "$OUT"

# Append health check summary to FULL snapshot
LATEST_HEALTH_CHECK="$CORE/tmp/health_check/LATEST_HEALTH_CHECK.md"
if [ -f "$LATEST_HEALTH_CHECK" ]; then
  LATEST_REPORT_DIR=$(grep "^path:" "$LATEST_HEALTH_CHECK" | awk '{print $2}')
  if [ -n "$LATEST_REPORT_DIR" ] && [ -f "$CORE/$LATEST_REPORT_DIR/summary.md" ]; then
    {
      echo ""
      echo "---"
      echo "## HEALTH_CHECK_STATUS (Latest)"
      echo ""
      echo "**Latest Report:** $LATEST_REPORT_DIR"
      echo ""
      cat "$CORE/$LATEST_REPORT_DIR/summary.md"
      echo ""
      echo "**Full Report:** See $LATEST_REPORT_DIR/"
      echo "**Records:** docs/ops/HEALTH_CHECK_RECORDS.md"
    } >> "$OUT"
  fi
fi

# include: latest inventory pointer (governance sprint)
# LATEST_INVENTORY_REPORT.md
