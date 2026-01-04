#!/usr/bin/env bash
set -euo pipefail

# Rebuild MASTER_SYNC_PACKET.md as a read-only snapshot.
# SSOT remains original files; MASTER is a pasteable alignment artifact.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${ROOT_DIR}/memory/briefs/MASTER_SYNC_PACKET.md"

# Canonical sources to include (keep small; add more only if needed)
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

  "docs/adr/ADR_0001_externalize_domain_and_version_schema.md"
  "docs/adr/ADR_0002_esoteric_experience_scientific_core.md"
  "docs/adr/ADR_0003_world_class_bilingual_global_market.md"
  "docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md"

  # New: execution result sync artifact
  "memory/briefs/LAST_COMMAND_STATUS.md"
)

GEN_AT="$(date -Iseconds)"
{
  echo "# MASTER_SYNC_PACKET（單檔同步包｜唯一對話錨點｜自動生成）"
  echo "generatedAt: ${GEN_AT}"
  echo "sourceRoot: ${ROOT_DIR}"
  echo
  echo "## MASTER RULE（很重要）"
  echo "- 這份檔案 = 「只讀快照」，用來貼給 GPT 對齊現況。"
  echo "- 真相來源 = 各原始檔（charter/roadmap/governance/adr/roles/...）。"
  echo "- 若 MASTER 與原檔衝突：以原檔為準，然後重新生成 MASTER。"
  echo

  echo "## SOURCES（本檔同步來源清單）"
  for p in "${SOURCES[@]}"; do
    echo "- ${p}"
  done
  echo

  for p in "${SOURCES[@]}"; do
    echo
    echo "---"
    echo "## FILE: ${p}"
    echo
    if [[ -f "${ROOT_DIR}/${p}" ]]; then
      cat "${ROOT_DIR}/${p}"
    else
      echo "(missing)"
    fi
  done
} > "$OUT"

echo "Wrote: $OUT"
