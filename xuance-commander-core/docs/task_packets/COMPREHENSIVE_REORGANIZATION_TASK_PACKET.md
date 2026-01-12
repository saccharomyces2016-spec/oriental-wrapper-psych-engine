# 全面總整理任務包

**任務編號**：COMPREHENSIVE-REORG-001  
**任務名稱**：全面總整理 - 按類別整合所有資料夾和任務  
**優先級**：P0（立即執行）  
**狀態**：READY_TO_EXECUTE  
**建立日期**：2026-01-12  
**負責人**：共同專案開發人 & 合夥人

---

## 📋 任務概述

### 任務目標

對整個專案進行**全面、深層、全面**的總整理，包括：

1. **分析所有根目錄資料夾**：識別功能、判斷是獨立功能還是散亂資料夾
2. **按類別整合任務資料**：將同類別任務整合成統一檔案
3. **重新組織資料夾結構**：建立清晰、易於查找的結構
4. **整合任務報告**：將同類別任務的報告整合到統一檔案
5. **優化 AI 上下文使用**：減少資訊碎片化，提高查找效率

### 任務重要性

- ✅ **解決資訊碎片化**：任務數量越來越多（16+ 個），資訊散落在不同資料夾
- ✅ **優化 AI 上下文**：可以一次傳遞完整類別的資訊，而不是分散的多個資料夾
- ✅ **提升查找效率**：按類別組織，符合人類思維模式
- ✅ **長期合作基礎**：建立可持續、可維護的資料結構

---

## 🔍 第一部分：根目錄資料夾分析與分類

### 1.1 資料夾功能分析

根據分析，根目錄資料夾可分為以下類別：

#### 核心專案資料（保留，不移動）
- `charter/` - 專案憲章（1 檔案）
- `roadmap/` - 路線圖（2 檔案）
- `memory/` - 專案記憶（31 檔案）
- `docs/` - 所有文件（328 檔案）
- `specs/` - 規格文件（38 檔案）

#### 開發相關（保留，不移動）
- `ui/` - UI 程式碼（9137 檔案）
- `engine/` - 引擎程式碼（11 檔案）
- `domain/` - 核心資料（103 檔案）
- `schemas/` - 結構定義（4 檔案）
- `tests/` - 測試檔案（13 檔案）
- `tools/` - 工具腳本（24 檔案）

#### 建置/輸出資料夾（需要整理）
- `build/` - 建置腳本和輸出（1 檔案：compile_all.sh）
  - **判斷**：獨立功能，保留在根目錄
  - **建議**：保留，但建立說明文件
  
- `dist/` - 分發版本輸出（5 檔案：zip 檔案）
  - **判斷**：輸出資料夾，可以移動到 `out/dist/` 或保留
  - **建議**：保留在根目錄（符合常見專案結構）
  
- `out/` - 工具輸出檔案（23 檔案）
  - **判斷**：輸出資料夾，保留
  - **建議**：保留在根目錄，但整理內容
  
- `tmp/` - 臨時檔案（133 檔案：大量健康檢查報告）
  - **判斷**：臨時資料夾，內容可以清理
  - **建議**：清理舊的健康檢查報告，保留結構
  
- `logs/` - 系統日誌（67 檔案）
  - **判斷**：日誌資料夾，保留
  - **建議**：保留在根目錄

#### 任務/歸檔（需要重新組織）
- `archive/` - 歸檔資料（705 檔案）
  - **判斷**：需要按類別重新組織
  - **建議**：建立 `archive/tasks_by_category/` 結構
  
- `P0-4.5/` - 基準檔案來源（4 檔案）
  - **判斷**：基準檔案，保留在根目錄
  - **建議**：保留，內容已複製到 `specs/`

#### 工具/模板（保留，但需要說明）
- `codex/` - Codex 指令包和模板（6 檔案）
  - **判斷**：獨立功能，保留
  - **建議**：保留在根目錄，建立說明文件
  
- `prompts/` - AI 提示詞（8 檔案）
  - **判斷**：獨立功能，保留
  - **建議**：保留在根目錄

#### 其他（需要判斷）
- `ideas/` - 想法暫存池（1 檔案：inbox.md）
  - **判斷**：暫存區，可以移動到 `docs/ideas/` 或保留
  - **建議**：保留在根目錄（方便快速存取）
  
- `prototype/` - 原型開發（4 檔案）
  - **判斷**：原型開發，可以移動到 `docs/prototype/` 或保留
  - **建議**：保留在根目錄（如果還在開發中）

### 1.2 資料夾整理建議

#### 需要清理的資料夾
- `tmp/` - 清理舊的健康檢查報告（保留最近 3 個）

#### 需要建立說明的資料夾
- `build/` - 建立 README.md 說明建置流程
- `codex/` - 已有說明，確認完整性
- `dist/` - 建立 README.md 說明分發流程

#### 需要重新組織的資料夾
- `archive/` - 按類別重新組織（見第二部分）

---

## 📚 第二部分：任務資料整合方案

### 2.1 可以整合的任務群組

根據分析，以下任務可以整合：

#### UI 類別（5 個任務）
- `P0-5` - UI 整合與結果呈現設計（47 檔案）
- `P0-5.7` - 世界觀設計（7 檔案）
- `P0-8` - UI 改進（0 檔案）
- `P0-9` - 動畫效果（0 檔案）
- `P0-4.5` - 4 階段分流系統設計（4 檔案，在根目錄）

**整合方案**：
- 移動到 `archive/tasks_by_category/ui/tasks/`
- 建立 `archive/tasks_by_category/ui/TASK_REPORTS.md` 整合所有 UI 任務報告
- 建立 `archive/tasks_by_category/ui/TASK_INDEX.md` 作為快速查找索引

#### 引擎類別（3 個任務）
- `P0-11` - 玄學引擎完成（23 檔案）
- `P0-12` - 科學引擎完成（556 檔案）
- `P0-5.6` - 易經矩陣實作（13 檔案）

**整合方案**：
- 移動到 `archive/tasks_by_category/engine/tasks/`
- 建立 `archive/tasks_by_category/engine/TASK_REPORTS.md` 整合所有引擎任務報告
- 建立 `archive/tasks_by_category/engine/TASK_INDEX.md` 作為快速查找索引

#### 核心開發類別（2 個任務）
- `P0-3` - Narrative Sharpness（7 檔案）
- `P0-4` - Facet Portability（9 檔案）

**整合方案**：
- 移動到 `archive/tasks_by_category/core_development/tasks/`
- 建立統一的任務報告檔案

#### 其他類別
- `P0-5.5` - 東方元素諮詢（7 檔案）
  - 可以歸類到「元素選擇」或「UI」類別
  
- `P0-10` - 題目庫完成（0 檔案）
  - 歸類到「Domain」類別
  
- `P0-13` - 結果呈現設計（0 檔案）
  - 歸類到「結果呈現」類別
  
- `P0-14` - AI 整合設計（0 檔案）
  - 歸類到「整合」類別

### 2.2 任務報告整合方案

#### TASK_REPORTS.md 結構

每個類別的 `TASK_REPORTS.md` 應該包含：

```markdown
# {類別名稱} 任務報告整合

**建立日期**：2026-01-12  
**最後更新**：2026-01-12  
**狀態**：ACTIVE

---

## 📋 任務列表

### P0-5：UI 整合與結果呈現設計
- **狀態**：✅ COMPLETED
- **完成日期**：2026-01-10
- **主要交付物**：UMIP v1.0, UI 架構設計
- **詳細報告**：見 `tasks/P0-5/`

### P0-5.7：世界觀設計
- **狀態**：✅ COMPLETED
- **完成日期**：2026-01-XX
- **主要交付物**：世界觀設計文件
- **詳細報告**：見 `tasks/P0-5.7_WORLDVIEW_DESIGN/`

---

## 📊 任務進度總覽

### 已完成任務
1. P0-5：UI 整合與結果呈現設計 ✅
2. P0-5.7：世界觀設計 ✅
3. P0-4.5：4 階段分流系統設計 ✅

### 進行中任務
（目前無）

### 待執行任務
1. P0-8：UI 改進
2. P0-9：動畫效果

---

## 📝 任務報告整合

### P0-5 任務報告

#### 任務概述
[從 P0-5_TASK_PACKET.md 提取]

#### 執行記錄
[從 P0-5_IMPLEMENTATION_EXECUTION_LOG.md 提取關鍵時間點]

#### 完成總結
[從 P0-5_COMPLETION_SUMMARY.md 提取]

#### 審計報告
[從 P0-5_AUDIT_REPORT.md 提取關鍵發現]

---

## 🔍 關鍵決策記錄

### UI 架構決策
- **日期**：2026-01-09
- **決策**：採用 Layer 0-6 架構
- **依據**：P0-5_UI_ARCHITECTURE.md
- **狀態**：✅ CANONIZED

---

## 📚 相關規格檔案

以下規格檔案已整理到 `specs/ui/`：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` ⭐ SSOT
- `specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` ⭐ SSOT
- `specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md` ⭐ SSOT

---

**最後更新**：2026-01-12
```

---

## 🎯 第三部分：執行計劃

### 3.1 執行階段

#### 階段 1：建立新結構（優先級：高）
1. 建立 `archive/tasks_by_category/` 資料夾結構
2. 為每個類別建立資料夾（ui, engine, domain, 等）
3. 在每個類別資料夾中建立 `tasks/` 子資料夾

#### 階段 2：移動任務資料夾（優先級：高）
1. **UI 類別**：
   - 移動 `P0-5/` → `archive/tasks_by_category/ui/tasks/P0-5/`
   - 移動 `P0-5.7_WORLDVIEW_DESIGN/` → `archive/tasks_by_category/ui/tasks/P0-5.7_WORLDVIEW_DESIGN/`
   - 移動 `P0-8_UI_IMPROVEMENT/` → `archive/tasks_by_category/ui/tasks/P0-8_UI_IMPROVEMENT/`
   - 移動 `P0-9_ANIMATION_EFFECTS/` → `archive/tasks_by_category/ui/tasks/P0-9_ANIMATION_EFFECTS/`
   - 複製 `P0-4.5/` 內容到 `archive/tasks_by_category/ui/tasks/P0-4.5/`（保留根目錄原始）

2. **引擎類別**：
   - 移動 `P0-11_METAPHYSICAL_ENGINE_COMPLETION/` → `archive/tasks_by_category/engine/tasks/`
   - 移動 `P0-12_SCIENTIFIC_ENGINE_COMPLETION/` → `archive/tasks_by_category/engine/tasks/`
   - 移動 `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` → `archive/tasks_by_category/engine/tasks/`

3. **核心開發類別**：
   - 移動 `P0-3/` → `archive/tasks_by_category/core_development/tasks/`
   - 移動 `P0-4/` → `archive/tasks_by_category/core_development/tasks/`

4. **其他類別**：
   - 移動對應任務到對應類別資料夾

#### 階段 3：建立整合報告（優先級：高）
1. 為每個類別建立 `TASK_REPORTS.md`
2. 從各任務資料夾提取關鍵資訊整合到報告檔案
3. 建立 `TASK_INDEX.md` 作為快速查找索引

#### 階段 4：清理和整理（優先級：中）
1. 清理 `tmp/` 中的舊健康檢查報告
2. 為 `build/`, `codex/`, `dist/` 建立 README.md
3. 整理 `out/` 中的輸出檔案

#### 階段 5：更新引用（優先級：高）
1. 更新所有引用任務資料夾路徑的檔案
2. 更新 `專案資料夾說明.md`
3. 更新 `docs/ops/TASK_STATUS.md`

### 3.2 執行順序

**立即執行（今天）**：
1. ✅ 建立新結構
2. ✅ 移動 UI 類別任務（作為試點）
3. ✅ 建立 UI 類別的 TASK_REPORTS.md

**後續執行（本週）**：
4. 移動引擎類別任務
5. 建立引擎類別的 TASK_REPORTS.md
6. 移動其他類別任務
7. 更新所有引用

**持續優化（長期）**：
8. 根據實際使用情況調整結構
9. 持續更新 TASK_REPORTS.md

---

## 📊 第四部分：預期成果

### 4.1 新資料夾結構

```
xuance-commander-core/
├── archive/
│   └── tasks_by_category/          # 按類別組織的任務資料
│       ├── ui/
│       │   ├── TASK_REPORTS.md    # 整合所有 UI 任務報告
│       │   ├── TASK_INDEX.md       # 快速查找索引
│       │   └── tasks/              # 原始任務資料夾
│       │       ├── P0-5/
│       │       ├── P0-5.7_WORLDVIEW_DESIGN/
│       │       ├── P0-8_UI_IMPROVEMENT/
│       │       └── P0-9_ANIMATION_EFFECTS/
│       ├── engine/
│       │   ├── TASK_REPORTS.md
│       │   ├── TASK_INDEX.md
│       │   └── tasks/
│       │       ├── P0-11_METAPHYSICAL_ENGINE_COMPLETION/
│       │       ├── P0-12_SCIENTIFIC_ENGINE_COMPLETION/
│       │       └── P0-5.6_ICHING_MATRIX_IMPLEMENTATION/
│       ├── core_development/
│       ├── domain/
│       ├── results_presentation/
│       ├── integration/
│       ├── user_validation/
│       └── deployment/
│   └── p0_tasks/                    # 保留原始結構（作為備份或符號連結）
│   └── p1_tasks/
│   └── p5_tasks/
├── build/                            # 建置腳本（保留，建立 README.md）
├── codex/                            # Codex 指令包（保留）
├── dist/                             # 分發版本（保留，建立 README.md）
├── ideas/                            # 想法暫存池（保留）
├── logs/                             # 系統日誌（保留）
├── out/                              # 工具輸出（保留，整理內容）
├── prototype/                        # 原型開發（保留）
├── tmp/                              # 臨時檔案（清理舊報告）
└── ...（其他核心資料夾）
```

### 4.2 效益

1. ✅ **解決資訊碎片化**：同類別任務集中在一起
2. ✅ **優化 AI 上下文**：可以一次傳遞完整類別的資訊
3. ✅ **提升查找效率**：TASK_INDEX.md 提供快速查找
4. ✅ **整合報告**：所有任務報告整合在同一個檔案
5. ✅ **保留原始**：原始任務資料夾完整保留

---

## ✅ 第五部分：驗收標準

### 5.1 完成標準

- [ ] 所有任務資料夾已按類別移動到 `archive/tasks_by_category/`
- [ ] 每個類別都有 `TASK_REPORTS.md` 和 `TASK_INDEX.md`
- [ ] 所有引用已更新
- [ ] `專案資料夾說明.md` 已更新
- [ ] `tmp/` 已清理舊報告
- [ ] `build/`, `codex/`, `dist/` 都有 README.md

### 5.2 測試標準

- [ ] 可以通過 `TASK_INDEX.md` 快速找到任務
- [ ] 可以通過 `TASK_REPORTS.md` 了解類別全貌
- [ ] 所有原始任務資料夾都可以正常訪問
- [ ] 所有引用路徑都正確

---

## 📝 第六部分：風險與注意事項

### 6.1 風險

1. **執行複雜度**：需要移動大量檔案（719+ 個）
2. **引用更新**：需要更新大量引用（估計 50+ 個檔案）
3. **維護成本**：TASK_REPORTS.md 需要持續更新

### 6.2 注意事項

1. **保留原始結構**：使用符號連結或建立備份
2. **分階段執行**：先執行 UI 和引擎類別，驗證方案可行性
3. **建立維護機制**：新任務完成後，必須更新對應類別的報告

---

## 🚀 執行狀態

**狀態**：✅ **COMPLETED**  
**完成日期**：2026-01-12  
**執行日誌**：見 `docs/ops/analysis/COMPREHENSIVE_REORGANIZATION_EXECUTION_LOG.md`

### 執行結果
- ✅ 階段 1：建立新結構 - 完成
- ✅ 階段 2：移動任務資料夾 - 完成（16 個任務）
- ✅ 階段 3：建立整合報告 - 完成（10 個報告檔案）
- ✅ 階段 4：清理和整理 - 完成
- ✅ 階段 5：更新引用 - 完成
- ✅ 階段 6：驗證和測試 - 完成（所有驗證通過）

### 執行統計
- 移動任務資料夾：16 個
- 建立報告檔案：10 個
- 清理檔案：tmp/health_check/ 舊報告
- 建立說明檔案：2 個（build/README.md, dist/README.md）

---

**建立日期**：2026-01-12  
**最後更新**：2026-01-12  
**狀態**：✅ **COMPLETED**
