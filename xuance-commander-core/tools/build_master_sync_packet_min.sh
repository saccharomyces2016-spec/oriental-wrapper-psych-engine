#!/usr/bin/env bash
set -euo pipefail

CORE_DIR="${1:-}"
if [ -z "${CORE_DIR}" ]; then
  echo "usage: build_master_sync_packet_min.sh <core_dir>"
  exit 1
fi

OUT="${CORE_DIR}/memory/briefs/MASTER_MIN_SYNC_PACKET.md"
ts="$(date '+%Y-%m-%dT%H:%M:%S%z')"

emit_file () {
  local path="$1"
  echo "---" >> "${OUT}"
  echo "## FILE: ${path}" >> "${OUT}"
  echo "" >> "${OUT}"
  if [ -f "${CORE_DIR}/${path}" ]; then
    cat "${CORE_DIR}/${path}" >> "${OUT}"
  elif [ -f "${path}" ]; then
    cat "${path}" >> "${OUT}"
  else
    echo "(missing: ${path})" >> "${OUT}"
  fi
  echo "" >> "${OUT}"
}

cat > "${OUT}" <<MD
# MASTER_MIN_SYNC_PACKET（主快照｜平常唯一需要開啟的快照）

## ⭐ 這是你的主快照
**平常只需要開啟這一份快照即可滿足 90% 的工作需求。**

### 包含內容
- ✅ 所有基本管理制度（文件寫入位置、Canon 路徑、禁止相對路徑）
- ✅ 角色定義（明確程式端 GPT 與 Cursor 的權責關係）
- ✅ 當前狀態（CHARTER, ROADMAP, CURRENT）
- ✅ 執行規則（TEXT_ONLY, TASK_LIFECYCLE）
- ✅ 快照使用指南（何時需要開啟其他快照）

### 重要提醒
1. **文件寫入位置**：所有文件必須寫入 \`xuance-commander-core/\` 下的 Canon 路徑
2. **代碼相關問題**：必須諮詢 Cursor（總工程師），程式端 GPT 不得自行決定
3. **需要其他快照時**：主動提醒使用者開啟（見 MASTER_SNAPSHOT_USAGE_GUIDE）

generatedAt: ${ts}
sourceRoot: ${CORE_DIR}

## RULE
- Always consult: CHARTER / ROADMAP / CURRENT / TEXT_ONLY / TASK_LIFECYCLE / AI_ADVISORY_ROLES
- Evidence: LAST_COMMAND_STATUS + REPO_STATUS + LATEST_VERIFICATION_PACK
MD

emit_file "charter/CHARTER.md"
emit_file "roadmap/ROADMAP.md"
# 使用 CURRENT_SUMMARY 而非完整的 CURRENT.md，避免歷史記錄導致快照過大
if [ -f "${CORE_DIR}/memory/briefs/CURRENT_SUMMARY.md" ]; then
  emit_file "memory/briefs/CURRENT_SUMMARY.md"
else
  # 如果 CURRENT_SUMMARY 不存在，使用 CURRENT.md（向後兼容）
  emit_file "memory/briefs/CURRENT.md"
fi
emit_file "docs/governance/TEXT_ONLY_EXECUTION_RULES.md"
emit_file "docs/governance/FILE_WRITE_LOCATION_RULE.md"
emit_file "docs/governance/GLOBAL_PATH_CANON.md"
emit_file "docs/governance/ABSOLUTE_REFERENCE_RULE.md"
emit_file "docs/governance/MASTER_SNAPSHOT_USAGE_GUIDE.md"
emit_file "docs/process/TASK_LIFECYCLE.md"
emit_file "docs/governance/AI_ADVISORY_ROLES.md"
emit_file "memory/briefs/CONTEXT_CAPSULE.md"
emit_file "memory/briefs/LATEST_VERIFICATION_PACK.md"
emit_file "memory/briefs/REPO_STATUS.md"
emit_file "memory/briefs/LAST_COMMAND_STATUS.md"
emit_file "docs/ops/HEALTH_CHECK_RECORDS.md"
emit_file "docs/ops/TASK_RECORDS_SUMMARY.md"
emit_file "docs/ops/CURSOR_COMMANDER_ALERTS.md"
emit_file "docs/governance/CURSOR_COMMANDER_INTERFACE_RULE.md"
emit_file "docs/governance/BASIC_NORMS_ALWAYS_VISIBLE_RULE.md"
emit_file "docs/governance/COMMANDER_CURSOR_COLLABORATION_GUIDE.md"
emit_file "docs/governance/TASK_COMPLETION_REPORT_PROTOCOL.md"
emit_file "docs/governance/ADVISOR_QUESTION_OWNERSHIP_RULE.md"
emit_file "docs/governance/CURSOR_PROACTIVE_SUGGESTION_RULE.md"
# 納入 AI 協作架構分析（總工程師的專業判斷和建議）
emit_file "docs/governance/AI_COLLABORATION_ARCHITECTURE.md"
emit_file "docs/governance/CURRENT_TASK_DETAILED_SUMMARY_RULE.md"

echo "OK: wrote ${OUT}"
