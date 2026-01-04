# XuanCe Commander Core (玄策指揮官核心資料夾)

用途：把「工作進度、規範、決策、角色分工、Codex 指令包」全部外置化存檔，避免對話上下文遺失。
操作原則：
- 任何結論都要落盤（docs/ 或 memory/ 或 adr/）
- 任何可執行改動都要有 Codex 指令包（codex/packs/）
- 任何規則變更都要有 ADR（docs/adr/）

入口：
- 角色規範：docs/roles/ROLE_XUANCE_COMMANDER.md
- 工作流程：docs/process/WORKFLOW.md
- 記憶主檔：memory/PROJECT_MEMORY.md
- 決策紀錄：docs/adr/（Architecture Decision Records）
- Codex 指令包：codex/packs/

## 同步包生成（最小步驟）
- 先跑：`bash tools/export_chat_packet.sh .`
- 再跑：`bash codex/packs/20260104_master_sync_v1.sh .`
