# XuanCe Commander Core (玄策指揮官核心資料夾)

## 🚀 AI 第一次接觸此專案？請先讀這裡

**👉 [AI 上手指南（ONBOARDING.md）](docs/ONBOARDING.md) 👈**

如果你是第一次接觸這個專案的 AI，請先閱讀 `docs/ONBOARDING.md`，它會告訴你：
- 應該先讀什麼文件（按優先級排序）
- 如何快速開始工作
- 文件應該放在哪裡
- 應該遵守哪些核心規則

---

## 📋 快速入口

### 對 AI 來說（必須讀）
1. **`docs/ONBOARDING.md`** - AI 上手指南（總入口）
2. **`docs/ops/TASK_STATUS.md`** - 任務狀態總覽（當前任務狀態）
3. **`docs/governance/ESSENTIAL_RULES.md`** - 核心制度（必須遵守的規則）
4. **`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`** - 文件放置規範（寫入文件前必讀）

### 對人類來說
- **`專案資料夾說明.md`** - 專案資料夾說明（給人類看的）

---

## 📖 專案概述

用途：把「工作進度、規範、決策、角色分工、Codex 指令包」全部外置化存檔，避免對話上下文遺失。

操作原則：
- 任何結論都要落盤（docs/ 或 memory/ 或 adr/）
- 任何可執行改動都要有 Codex 指令包（codex/packs/）
- 任何規則變更都要有 ADR（docs/adr/）

---

## 🔗 詳細入口（需要時查閱）

### 核心文件
- **終極目標**：`charter/CHARTER.md`
- **主線進度**：`roadmap/ROADMAP.md`（SSOT）
- **主線工作目標**：`roadmap/MASTER_WORK_OBJECTIVES.md`
- **當前狀態**：`memory/briefs/CURRENT.md`

### 工作流程
- **角色規範**：`docs/roles/ROLE_XUANCE_COMMANDER.md`
- **工作流程**：`docs/process/WORKFLOW.md`
- **記憶主檔**：`memory/PROJECT_MEMORY.md`
- **決策紀錄**：`docs/adr/`（Architecture Decision Records）

### 任務管理
- **任務狀態總覽**：`docs/ops/TASK_STATUS.md`（統一入口）
- **任務記錄索引**：`docs/ops/TASK_RECORDS_INDEX.md`
- **Codex 指令包**：`codex/packs/`

## 同步包生成（最小步驟）
- 先跑：`bash tools/export_chat_packet.sh .`
- 再跑：`bash codex/packs/20260104_master_sync_v1.sh .`
