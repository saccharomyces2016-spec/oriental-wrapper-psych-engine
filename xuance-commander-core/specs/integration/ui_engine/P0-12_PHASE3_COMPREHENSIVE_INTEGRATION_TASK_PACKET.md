# P0-12 階段三：完整整合與檔案產出任務包

**建立日期**：2026-01-12  
**任務類型**：接續任務（Phase 3）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、任務概述

### 1.1 任務目標

在 P0-12 階段一和階段二的所有設計規格和提取工作完成後，進行**完整整合與檔案產出**，目標是：

1. **完整盤點**：盤點所有現代科學相關資料（包含新舊資料），包括題庫、題型、計分、結果產出等所有內容
2. **分析整合結果**：分析目前整合結果，識別已完成和未完成的部分
3. **100% 提取**：確保舊有檔案內容進行 100% 提取
4. **徹底整合**：在符合新版本網頁架構、世界觀、需求的前提下進行徹底整合
5. **檔案產出**：將尚未寫入的相關文檔寫入系統
6. **清理舊資料**：整合後依照檔案內部內容，將舊有資料刪除，僅保留整合後新檔案

### 1.2 核心原則

- ✅ **資料不鎖定、可回滾**：所有資料保持不鎖定、可回滾狀態
- ✅ **100% 提取目標**：確保舊有檔案內容 100% 提取
- ✅ **符合新版本架構**：所有整合必須符合新版本網頁架構、世界觀、需求
- ✅ **徹底整合**：不遺漏任何可用內容
- ✅ **文本為依據**：所有過程和結果進行文本記錄

---

## 二、任務背景

### 2.1 已完成工作

**階段一：現代科學資料整合（題目設計 + 分數計算）** ✅ 已完成
- JSON 結構定義（符合現有系統 schema）
- 欄位對應表（Legacy → 現有系統）
- Python 計算核心（Layer A 參考實現）
- Metadata 處理方案（分離策略）

**階段二：結果呈現資料提取與整合** ✅ 已完成
- 階段二-1：資料提取與分析 ✅
- 階段二-2：內容映射與轉換 ✅（生成 `chronic_depletion` facet 的 JSON 檔案定義）
- 階段二-3：分層架構整合 ✅
- 階段二-4：規則與制度提取 ✅（39 條規則）

### 2.2 當前狀態

**已完成但尚未寫入系統的內容**：
1. **Phase 2-2 轉換後的 JSON 檔案**：
   - `domain/narratives/chronic_depletion.narr.v1.0.json`
   - `domain/riskchains/chronic_depletion.risk.v1.0.json`
   - `domain/recommendations/chronic_depletion.reco.v1.0.json`
   - 狀態：檔案定義在 Phase 2-2 交付報告中，尚未寫入系統

2. **Phase 2-4 規則文件**：
   - 39 條規則的完整定義（在 `P0-12_PHASE2-4_FINAL_ACCEPTED_CONTENT.md` 中）
   - 狀態：規則文件已在報告中完整定義，可能需要寫入系統

**需要進一步整合的內容**：
1. **Legacy 資料的 100% 提取**：確保所有 Legacy 現代科學資料都已提取和整合
2. **現有系統資料的盤點**：盤點現有系統中所有現代科學相關資料
3. **整合結果分析**：分析目前整合結果，識別缺失和不足

---

## 三、任務範圍

### 3.1 資料盤點範圍

需要盤點的所有現代科學相關資料：

#### 3.1.1 新版本系統資料（現有系統）

**位置**：`domain/` 目錄

**需要盤點的內容**：
1. **題庫（Questions）**：
   - `domain/questions/*.questions.v1.0.json`
   - 包含：問題設計、選項設計、題型設計

2. **計分（Scoring）**：
   - `domain/facets/*.scoring.v1.0.json`
   - 包含：計算邏輯、權重設定、分數轉換、bands 定義

3. **結果產出（Result Presentation）**：
   - `domain/narratives/*.narr.v1.0.json` - 敘事內容
   - `domain/recommendations/*.reco.v1.0.json` - 建議內容
   - `domain/riskchains/*.risk.v1.0.json` - 風險鏈內容

4. **知識庫（Knowledge Base）**：
   - `domain/knowledge_base/*.json` - 相關知識庫
   - `domain/knowledge_base/*.md` - 相關指南和規格

5. **Facet 定義**：
   - `domain/manifests/*.json` - Facet 清單
   - `domain/facets/*.json` - Facet 定義和映射

#### 3.1.2 Legacy 系統資料（舊有系統）

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/`

**需要盤點的內容**：
1. **題庫（Question Bank）**：
   - `archive/legacy/questionBank.v1.json` - Legacy 題庫
   - `reports/p1_question_blueprint_v1.json` - 題目藍圖
   - `archive/legacy_question_bank/2025-12-31/src/_deprecated/core/` - 舊題庫相關檔案

2. **計分系統（Scoring）**：
   - `src/core/psych/scorer.js` - Legacy 計分邏輯
   - 相關的 traits、axes、elements 計算邏輯

3. **結果產出（Result Templates）**：
   - `archive/legacy/core-content/resultTemplates/*.json` - Legacy 結果模板
   - `src/core/guidance/buildGuidance.js` - 結果生成邏輯
   - `src/core/ontology/guidancePrinciples.v1.json` - 原則定義
   - `src/core/ontology/guidanceActionTemplates.v1.json` - 行動模板
   - `archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json` - 介入邊界

4. **主題（Themes）**：
   - Legacy 系統的 10-15 個主題（例如：`chronic_depletion`、`control_vs_exhaustion` 等）
   - 各主題的問題、計分、結果模板

### 3.2 整合範圍

需要整合的內容：

1. **Phase 2-2 轉換後的檔案**：
   - `chronic_depletion` facet 的三個 JSON 檔案
   - 狀態：需要寫入系統

2. **Phase 2-4 規則文件**：
   - 39 條規則的完整定義
   - 狀態：需要評估是否需要寫入系統

3. **其他 Legacy 主題**：
   - 除了 `chronic_depletion` 之外的其他 Legacy 主題
   - 狀態：需要評估是否需要整合

---

## 四、任務執行步驟

### 4.1 步驟一：完整資料盤點

**目標**：盤點所有新舊系統的現代科學相關資料

**具體任務**：
1. **盤點現有系統資料**：
   - 列出所有 `domain/` 目錄下的現代科學相關檔案
   - 記錄每個檔案的內容、結構、用途
   - 建立現有系統資料清單

2. **盤點 Legacy 系統資料**：
   - 列出所有 Legacy 系統中的現代科學相關檔案
   - 記錄每個檔案的內容、結構、用途
   - 建立 Legacy 系統資料清單

3. **比對分析**：
   - 比對新舊系統的資料結構
   - 識別已整合和未整合的內容
   - 建立整合狀態對照表

**交付物**：
- `P0-12_PHASE3_DATA_INVENTORY.md` - 完整資料盤點報告

### 4.2 步驟二：整合結果分析

**目標**：分析目前整合結果，識別已完成和未完成的部分

**具體任務**：
1. **分析階段一整合結果**：
   - 題目設計整合完成度
   - 分數計算整合完成度
   - 識別缺失和不足

2. **分析階段二整合結果**：
   - 結果呈現資料提取完成度
   - 規則文件提取完成度
   - 識別缺失和不足

3. **識別 100% 提取目標**：
   - 列出所有 Legacy 資料中尚未提取的內容
   - 評估提取的可行性和優先級
   - 建立提取計劃

**交付物**：
- `P0-12_PHASE3_INTEGRATION_ANALYSIS.md` - 整合結果分析報告

### 4.3 步驟三：檔案產出

**目標**：將尚未寫入的相關文檔寫入系統

**具體任務**：
1. **Phase 2-2 檔案產出**：
   - 將 `chronic_depletion` facet 的三個 JSON 檔案寫入系統
   - 檔案路徑：
     - `domain/narratives/chronic_depletion.narr.v1.0.json`
     - `domain/riskchains/chronic_depletion.risk.v1.0.json`
     - `domain/recommendations/chronic_depletion.reco.v1.0.json`
   - 驗證檔案結構符合現有系統規範

2. **Phase 2-4 規則文件產出**（如需要）：
   - 評估規則文件是否需要寫入系統
   - 如果需要，確定寫入位置和格式
   - 寫入規則文件

3. **驗證產出檔案**：
   - 驗證所有產出檔案符合現有系統規範
   - 驗證檔案內容完整性和正確性

**交付物**：
- 產出的 JSON 檔案
- `P0-12_PHASE3_FILE_OUTPUT_REPORT.md` - 檔案產出報告

### 4.4 步驟四：100% 提取與徹底整合

**目標**：確保舊有檔案內容進行 100% 提取，並在符合新版本架構的前提下進行徹底整合

**具體任務**：
1. **識別未提取內容**：
   - 根據資料盤點結果，識別所有尚未提取的 Legacy 內容
   - 評估每項內容的提取優先級和可行性

2. **提取和轉換**：
   - 按照階段一和階段二的整合規範，提取和轉換 Legacy 內容
   - 確保所有轉換符合新版本架構、世界觀、需求
   - 進行語境轉換（心理學 → 玄學）
   - 進行結構轉換（動態 → 靜態）

3. **整合到系統**：
   - 將轉換後的內容整合到現有系統
   - 確保整合後的內容符合現有系統規範
   - 更新相關的 manifest 和映射文件

**交付物**：
- 轉換和整合後的檔案
- `P0-12_PHASE3_COMPREHENSIVE_INTEGRATION_REPORT.md` - 完整整合報告

### 4.5 步驟五：清理舊資料

**目標**：整合後依照檔案內部內容，將舊有資料刪除，僅保留整合後新檔案

**具體任務**：
1. **確認整合完成**：
   - 確認所有 Legacy 內容都已提取和整合
   - 確認所有整合後的檔案都已寫入系統
   - 驗證整合結果的完整性和正確性

2. **建立清理清單**：
   - 列出所有已整合的 Legacy 檔案
   - 確認每個檔案都已完全整合到新系統
   - 建立清理清單

3. **執行清理**：
   - 依照清理清單，刪除已整合的 Legacy 檔案
   - 保留整合後的新檔案
   - 記錄清理過程

**交付物**：
- `P0-12_PHASE3_LEGACY_CLEANUP_REPORT.md` - 清理報告
- 清理清單

---

## 五、預期產出

### 5.1 文件產出

1. **`P0-12_PHASE3_DATA_INVENTORY.md`** - 完整資料盤點報告
   - 現有系統資料清單
   - Legacy 系統資料清單
   - 整合狀態對照表

2. **`P0-12_PHASE3_INTEGRATION_ANALYSIS.md`** - 整合結果分析報告
   - 階段一整合結果分析
   - 階段二整合結果分析
   - 100% 提取目標識別
   - 提取計劃

3. **`P0-12_PHASE3_FILE_OUTPUT_REPORT.md`** - 檔案產出報告
   - 產出的檔案清單
   - 檔案驗證結果
   - 檔案狀態說明

4. **`P0-12_PHASE3_COMPREHENSIVE_INTEGRATION_REPORT.md`** - 完整整合報告
   - 提取和轉換的內容清單
   - 整合結果說明
   - 整合狀態對照表

5. **`P0-12_PHASE3_LEGACY_CLEANUP_REPORT.md`** - 清理報告
   - 清理清單
   - 清理過程記錄
   - 清理結果確認

### 5.2 檔案產出

1. **Phase 2-2 轉換後的 JSON 檔案**：
   - `domain/narratives/chronic_depletion.narr.v1.0.json`
   - `domain/riskchains/chronic_depletion.risk.v1.0.json`
   - `domain/recommendations/chronic_depletion.reco.v1.0.json`

2. **其他整合後的檔案**（根據整合結果確定）

### 5.3 任務執行日誌

- `P0-12_PHASE3_EXECUTION_LOG.md` - 任務執行日誌

---

## 六、驗收標準

### 6.1 資料盤點完成標準

- ✅ 所有現有系統資料都已盤點
- ✅ 所有 Legacy 系統資料都已盤點
- ✅ 建立完整的整合狀態對照表

### 6.2 整合結果分析完成標準

- ✅ 階段一整合結果分析完成
- ✅ 階段二整合結果分析完成
- ✅ 100% 提取目標識別完成
- ✅ 提取計劃建立完成

### 6.3 檔案產出完成標準

- ✅ Phase 2-2 轉換後的 JSON 檔案已寫入系統
- ✅ 所有產出檔案符合現有系統規範
- ✅ 所有產出檔案通過驗證

### 6.4 100% 提取與徹底整合完成標準

- ✅ 所有 Legacy 內容都已提取
- ✅ 所有轉換後的內容都符合新版本架構、世界觀、需求
- ✅ 所有整合後的內容都已寫入系統
- ✅ 整合結果完整性和正確性驗證通過

### 6.5 清理完成標準

- ✅ 所有已整合的 Legacy 檔案都已確認
- ✅ 清理清單建立完成
- ✅ 清理執行完成
- ✅ 清理結果確認完成

---

## 七、相關背景資料

### 7.1 階段一和階段二的完成文件

**階段一**：
- `P0-12_IMPLEMENTATION_SPEC_FINAL.md` - 最終實作規格書

**階段二-1**：
- `P0-12_PHASE2-1_COMPLETION_SUMMARY.md` - 完成摘要
- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/` - artifacts 檔案

**階段二-2**：
- `P0-12_PHASE2-2_COMPLETION_SUMMARY.md` - 完成摘要
- `P0-12_PHASE2-2_FINAL_AUDIT_REPORT.md` - 最終審核報告
- Phase 2-2 轉換後的 JSON 檔案定義（在交付報告中）

**階段二-3**：
- `P0-12_PHASE2-3_ACCEPTED_CONTENT.md` - 符合要求的內容提取

**階段二-4**：
- `P0-12_PHASE2-4_FINAL_ACCEPTED_CONTENT.md` - 符合要求的內容提取（最終版本）
- 39 條規則的完整定義

### 7.2 現有系統規範

**檔案結構規範**：
- 參見 `domain/` 目錄下的現有檔案結構
- 參見階段一和階段二的設計規格

**設計規範**：
- 參見 `P0-5.5_ELEMENT_SELECTION_DECISION.md` - 系統設計決策
- 參見 `P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計規範
- 參見階段一和階段二的設計規格

### 7.3 Legacy 系統資料位置

**主要位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/`

**關鍵檔案**：
- `archive/legacy/questionBank.v1.json` - Legacy 題庫
- `src/core/psych/scorer.js` - Legacy 計分邏輯
- `archive/legacy/core-content/resultTemplates/` - Legacy 結果模板
- `src/core/guidance/buildGuidance.js` - 結果生成邏輯
- `src/core/ontology/guidancePrinciples.v1.json` - 原則定義
- `src/core/ontology/guidanceActionTemplates.v1.json` - 行動模板

---

## 八、執行原則

### 8.1 資料處理原則

- ✅ **資料不鎖定、可回滾**：所有資料保持不鎖定、可回滾狀態
- ✅ **100% 提取目標**：確保舊有檔案內容 100% 提取
- ✅ **符合新版本架構**：所有整合必須符合新版本網頁架構、世界觀、需求
- ✅ **徹底整合**：不遺漏任何可用內容
- ✅ **文本為依據**：所有過程和結果進行文本記錄

### 8.2 檔案產出原則

- ✅ **優先處理尚未寫入的檔案**：優先處理 Phase 2-2 轉換後的 JSON 檔案
- ✅ **驗證後產出**：所有產出檔案必須通過驗證
- ✅ **符合系統規範**：所有產出檔案必須符合現有系統規範

### 8.3 清理原則

- ✅ **確認後清理**：只有在確認內容已完全整合後才進行清理
- ✅ **保留記錄**：清理過程必須進行完整記錄
- ✅ **可回滾**：清理操作必須可回滾

---

## 九、後續工作

完成本階段任務後，後續工作包括：

1. **整體健康分析**：根據整合後的新版本，進行整體健康分析
2. **弱點分析**：進行弱點分析，識別需要改進的地方
3. **內容擴充**：繼續朝著終極目標擴充內容
4. **內容整合**：繼續整合內容
5. **架構調整**：調整到符合題型設計的架構

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**任務狀態**：⏳ 待執行
