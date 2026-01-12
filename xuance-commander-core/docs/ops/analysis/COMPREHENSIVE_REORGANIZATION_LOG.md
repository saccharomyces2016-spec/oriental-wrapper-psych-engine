# 全面資料夾重新分類整理記錄

**建立日期**：2026-01-12  
**目的**：記錄所有資料夾和檔案的重新分類整理過程  
**狀態**：IN_PROGRESS

---

## 📋 整理原則

### 分類標準
1. **任務資料夾（P0-X, P1-X, P5-X）**：歸檔到 `archive/` 下的對應位置
2. **規格檔案**：已整理到 `specs/`（按特性分類）
3. **治理文件**：統一放在 `docs/governance/`
4. **任務包/執行指南**：放在 `docs/task_packets/` 或歸檔
5. **想法/暫存**：放在 `docs/ideas/` 或保留在根目錄
6. **輸出/臨時檔案**：放在 `out/`, `tmp/`, `dist/`, `build/`
7. **開發相關**：保留在根目錄（`ui/`, `tests/`, `engine/`, `schemas/`）

---

## 🔍 資料夾檢查與分類

### 1. 任務資料夾（需要歸檔）

#### P1-1_USER_VALIDATION_PLAN/
- **內容**：使用者監測環境技術設計任務包
- **分類**：Phase 1 任務資料夾
- **處理**：移動到 `archive/p1_tasks/P1-1_USER_VALIDATION_PLAN/`
- **狀態**：待處理

#### P5-1_PRODUCTION_DEPLOYMENT/
- **內容**：生產環境部署任務包
- **分類**：Phase 5 任務資料夾
- **處理**：移動到 `archive/p5_tasks/P5-1_PRODUCTION_DEPLOYMENT/`
- **狀態**：待處理

#### P0-4.5/
- **內容**：基準檔案來源（4 階段分流系統設計）
- **分類**：基準檔案來源（保留在根目錄作為參考）
- **處理**：保留在根目錄（內容已複製到 `specs/ui/workflow/`）
- **狀態**：保留

---

### 2. 治理/規則資料夾

#### rules/
- **內容**：`safety_rules.md`（安全切換規則）
- **分類**：治理文件
- **處理**：移動到 `docs/governance/SAFETY_RULES.md`
- **狀態**：待處理
- **理由**：安全規則屬於治理文件，應統一放在 `docs/governance/`

---

### 3. 想法/暫存資料夾

#### ideas/
- **內容**：`inbox.md`（想法暫存池）
- **分類**：想法/暫存
- **處理**：保留在根目錄或移動到 `docs/ideas/`
- **狀態**：待決定
- **理由**：想法暫存池可以保留在根目錄方便快速存取

---

### 4. 指令包/模板資料夾

#### codex/
- **內容**：
  - `packs/` - 指令包
  - `templates/` - 模板
- **分類**：開發工具/模板
- **處理**：保留在根目錄
- **狀態**：保留
- **理由**：指令包和模板是開發工具，應保留在根目錄

---

### 5. 提示詞資料夾

#### prompts/
- **內容**：
  - `gem/` - GEM 顧問提示詞
  - `XUANCE_COMMANDER_SYSTEM.md` - 系統提示詞
- **分類**：提示詞/模板
- **處理**：保留在根目錄
- **狀態**：保留
- **理由**：提示詞是開發工具，應保留在根目錄

---

### 6. 根目錄檔案

#### .zip 檔案
- `P0-12_GATE2_COMPLETE.zip`
- `P0-12_SCIENTIFIC_ENGINE_COMPLETION.zip`
- **分類**：歸檔/備份檔案
- **處理**：移動到 `archive/backups/` 或 `out/archives/`
- **狀態**：待處理

#### 其他檔案
- `README.md` - 保留
- `START_HERE.md` - 保留
- `requirements.txt` - 保留
- `專案資料夾說明.md` - 保留

---

### 7. 開發相關資料夾（保留）

以下資料夾屬於開發相關，保留在根目錄：
- `ui/` - UI 程式碼
- `tests/` - 測試檔案
- `engine/` - 引擎程式碼
- `schemas/` - 結構定義
- `domain/` - 核心資料
- `prototype/` - 原型
- `build/` - 建置輸出
- `dist/` - 分發輸出
- `out/` - 工具輸出
- `tmp/` - 臨時檔案
- `logs/` - 日誌
- `tools/` - 工具腳本

---

### 8. 核心資料夾（保留）

以下資料夾是專案核心，保留在根目錄：
- `charter/` - 專案憲章
- `roadmap/` - 路線圖
- `memory/` - 專案記憶
- `docs/` - 所有文件
- `specs/` - 規格文件（已整理）
- `archive/` - 歸檔資料

---

## 📝 執行記錄

### 2026-01-12 開始整理

#### 步驟 1：建立整理記錄檔案
- ✅ 建立 `docs/ops/analysis/COMPREHENSIVE_REORGANIZATION_LOG.md`

#### 步驟 2：檢查所有資料夾
- ✅ 列出所有根目錄資料夾
- ✅ 檢查 P1-1、P5-1 任務資料夾內容
- ✅ 檢查 rules、ideas、codex、prompts 資料夾內容
- ✅ 檢查根目錄檔案

#### 步驟 3：執行重新分類
- ✅ 移動 `P1-1_USER_VALIDATION_PLAN/` 到 `archive/p1_tasks/`
- ✅ 移動 `P5-1_PRODUCTION_DEPLOYMENT/` 到 `archive/p5_tasks/`
- ✅ 移動 `rules/safety_rules.md` 到 `docs/governance/SAFETY_RULES.md`
- ✅ 刪除空的 `rules/` 資料夾
- ✅ 移動 `.zip` 檔案到 `archive/backups/`
- ✅ 更新所有內部引用

---

## 🎯 執行項目

1. **歸檔任務資料夾**
   - [x] 移動 `P1-1_USER_VALIDATION_PLAN/` 到 `archive/p1_tasks/`
   - [x] 移動 `P5-1_PRODUCTION_DEPLOYMENT/` 到 `archive/p5_tasks/`

2. **整理治理文件**
   - [x] 移動 `rules/safety_rules.md` 到 `docs/governance/SAFETY_RULES.md`
   - [x] 刪除空的 `rules/` 資料夾

3. **整理歸檔檔案**
   - [x] 建立 `archive/backups/` 資料夾
   - [x] 移動 `.zip` 檔案到 `archive/backups/`

4. **更新文件**
   - [x] 更新 `docs/roles/ROLE_XUANCE_COMMANDER.md` 中的引用
   - [x] 更新 `prompts/XUANCE_COMMANDER_SYSTEM.md` 中的引用
   - [x] 更新 `docs/ops/TASK_STATUS.md` 中的路徑
   - [x] 更新 `memory/briefs/` 中的路徑引用
   - [ ] 更新 `專案資料夾說明.md` 反映新的分類結構

---

## 📊 統計

### 待歸檔
- 任務資料夾：2 個（P1-1, P5-1）
- 治理文件：1 個（safety_rules.md）
- 歸檔檔案：2 個（.zip 檔案）

### 保留在根目錄
- 核心資料夾：6 個（charter, roadmap, memory, docs, specs, archive）
- 開發資料夾：11 個（ui, tests, engine, schemas, domain, prototype, build, dist, out, tmp, logs, tools）
- 工具資料夾：3 個（codex, prompts, ideas）
- 基準資料夾：1 個（P0-4.5）

---

## ✅ 完成總結

### 已完成的整理項目

1. **任務資料夾歸檔**
   - ✅ `P1-1_USER_VALIDATION_PLAN/` → `archive/p1_tasks/`
   - ✅ `P5-1_PRODUCTION_DEPLOYMENT/` → `archive/p5_tasks/`

2. **治理文件整理**
   - ✅ `rules/safety_rules.md` → `docs/governance/SAFETY_RULES.md`
   - ✅ 刪除空的 `rules/` 資料夾

3. **歸檔檔案整理**
   - ✅ 建立 `archive/backups/` 資料夾
   - ✅ 移動 `.zip` 檔案到 `archive/backups/`

4. **引用更新**
   - ✅ 更新 `docs/roles/ROLE_XUANCE_COMMANDER.md`
   - ✅ 更新 `prompts/XUANCE_COMMANDER_SYSTEM.md`
   - ✅ 更新 `docs/ops/TASK_STATUS.md`
   - ✅ 更新 `memory/briefs/` 中的路徑引用

5. **文件更新**
   - ✅ 更新 `專案資料夾說明.md` 反映新的分類結構

### 最終資料夾結構

**根目錄資料夾（22 個）**：
- 核心資料夾：6 個（charter, roadmap, memory, docs, specs, archive）
- 開發資料夾：11 個（ui, tests, engine, schemas, domain, prototype, build, dist, out, tmp, logs, tools）
- 工具資料夾：3 個（codex, prompts, ideas）
- 基準資料夾：1 個（P0-4.5）

**歸檔結構**：
- `archive/p0_tasks/` - Phase 0 任務（13 個資料夾）
- `archive/p1_tasks/` - Phase 1 任務（1 個資料夾）
- `archive/p5_tasks/` - Phase 5 任務（1 個資料夾）
- `archive/backups/` - 備份檔案（.zip 檔案）
- `archive/governance_duplicates/` - 重複治理規則（6 個檔案）

---

**最後更新**：2026-01-12  
**狀態**：COMPLETE
