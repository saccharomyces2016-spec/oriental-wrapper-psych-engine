# 主檔案索引 (Master File Index)

**建立日期**：2026-01-12  
**目的**：統一索引所有重要檔案，避免重複和衝突  
**狀態**：ACTIVE

---

## 🎯 SSOT（單一真相來源）檔案

### 專案憲章與目標
- **`charter/CHARTER.md`** ⭐ **SSOT** - 專案憲章，定義終極目標

### 路線圖與進度
- **`roadmap/ROADMAP.md`** ⭐ **SSOT** - 主線進度
- **`roadmap/MASTER_WORK_OBJECTIVES.md`** ⭐ **SSOT** - 主線工作目標
- **`docs/ops/TASK_STATUS.md`** ⭐ **SSOT** - 當前任務狀態

### UI 架構與流程
- **`specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`** ⭐ **SSOT** - UI 架構設計
- **`specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`** ⭐ **SSOT** - 4 階段分流系統設計
- **`specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md`** ⭐ **SSOT** - 世界觀設計

### Domain 規格
- **`specs/domain/questions/question_design_guidelines.v1.0.md`** ⭐ **SSOT** - 題目設計規範
- **`specs/domain/narratives/result_presentation_design.v1.0.md`** ⭐ **SSOT** - 結果呈現設計

### 治理索引
- **`docs/governance/GOVERNANCE_INDEX.md`** ⭐ **SSOT** - 治理文件索引
- **`docs/domain/SSOT_INDEX.md`** ⭐ **SSOT** - Domain SSOT 索引
- **`memory/index/INDEX.md`** ⭐ **SSOT** - 記憶索引

---

## 📁 主要資料夾說明

### 核心資料夾
- **`charter/`** - 專案憲章（SSOT）
- **`roadmap/`** - 路線圖（SSOT）
- **`domain/`** - Domain 資料（SSOT）
- **`engine/`** - 引擎實作
- **`ui/`** - UI 實作
- **`specs/`** - 規格文件（按特性分類）

### 文件資料夾
- **`docs/governance/`** - 治理規則（79 個檔案）
- **`docs/ops/`** - 運營記錄（35 個檔案）
  - `docs/ops/reports/` - 報告檔案
  - `docs/ops/analysis/` - 分析檔案
  - `docs/ops/archive/` - 歸檔報告
- **`docs/domain/`** - Domain 相關文件（42 個檔案）
- **`docs/gem/`** - AI 顧問記錄
- **`docs/adr/`** - 架構決策記錄

### 記憶資料夾
- **`memory/briefs/`** - 專案摘要
- **`memory/changes/`** - 變更記錄（CHANGELOG.md）
- **`memory/index/`** - 索引文件

### 歸檔資料夾
- **`archive/p0_tasks/`** - 已歸檔的 P0 任務資料夾
- **`docs/legacy/`** - 舊系統結構

---

## 📋 重複檔案處理

### 已確認的基準檔案
- **`CHANGELOG.md`**：`memory/changes/CHANGELOG.md` ⭐ **SSOT**
- **`COMMANDER_AUTOPILOT_PROTOCOL.md`**：`docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md` ⭐ **SSOT**
- **`INDEX.md`**：`memory/index/INDEX.md` ⭐ **SSOT**
- **`MASTER_SYNC_PACKET.md`**：`memory/briefs/MASTER_SYNC_PACKET.md` ⭐ **SSOT**

### 已處理的重複
- ✅ `P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 基準在 `specs/ui/workflow/`
- ✅ `P0-5_UI_ARCHITECTURE.md` - 基準在 `specs/ui/architecture/`

---

## 🔍 快速查找指南

### 我想了解專案的終極目標
→ `charter/CHARTER.md`

### 我想了解專案現在在做什麼
→ `docs/ops/TASK_STATUS.md` 或 `roadmap/ROADMAP.md`

### 我想了解 UI 架構
→ `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`

### 我想了解流程設計
→ `specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`

### 我想了解治理規則
→ `docs/governance/GOVERNANCE_INDEX.md`

### 我想了解 Domain 規格
→ `docs/domain/SSOT_INDEX.md`

---

**文件狀態**：ACTIVE  
**最後更新**：2026-01-12
