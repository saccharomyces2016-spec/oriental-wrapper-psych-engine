# P0-12 階段二-1：結果呈現資料提取與分析任務包

**建立日期**：2026-01-11  
**任務階段**：階段二-1（結果呈現資料提取與整合 - 資料提取與分析）  
**任務狀態**：進行中（IN PROGRESS）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、任務目標

完整提取 Legacy 系統中與結果呈現相關的所有資料，並進行詳細分析，為後續的映射、轉換和整合提供基礎。

### 1.1 具體目標

1. **提取所有結果呈現相關資料**：
   - `resultTemplates/` 資料夾中的所有檔案
   - `guidance/` 資料夾中的相關檔案
   - 其他相關的結果呈現資料

2. **分析每個檔案的結構和內容**：
   - 檔案結構分析
   - 內容類型識別
   - 可用性評估

3. **建立完整的資料清單**：
   - 檔案清單
   - 結構說明
   - 內容摘要
   - 可用性評估

---

## 二、背景資料

### 2.1 任務脈絡

本任務是 P0-12「現代科學引擎完成」任務的第二階段，專門處理結果呈現相關資料。

**階段一已完成**（✅ 2026-01-11）：
- 題目設計整合
- 分數計算整合
- buildGuidance.js 整合方向（高層次）

**階段二目標**：
- 完整提取 Legacy 結果呈現資料
- 整合到現有系統的 L1-L4 分層架構

### 2.2 現有系統的結果呈現需求

#### 2.2.1 4 階段 UI 流程（最新版設計）

根據 `P0-5.7_DESIGN_DOC_FINAL.md`，現有系統採用 4 階段 UI 流程：

- **Stage 1（The Wheel）**：先天八卦盤（Primordial Bagua）- Facet Triage
- **Stage 2（Radial Compass）**：五行羅盤（Elemental Compass）- Symbol Selection
- **Stage 3（Projection）**：鑄爻（Casting Lines）- Deep Profiling
- **Stage 4（Results）**：卦象顯影（Hexagram Manifestation）- 結果呈現

#### 2.2.2 Stage 4 結果呈現分層架構（L1-L4）

根據設計文件，Stage 4 採用 L1-L4 分層架構：

- **L1（Hexagram Visual）**：卦象視覺呈現
  - 顯示六十四卦的視覺化
  - 卦象的基本資訊（名稱、結構等）

- **L2（Root Personalization）**：本命元素個人化敘事
  - 使用 Root Element（本命元素）進行個人化
  - 敘事內容（opening, explain）

- **L3（Flow Analysis）**：當前狀態分析
  - 使用 Flow Hexagram（當前卦象）進行分析
  - 狀態描述和解釋

- **L4（Risk Blocking & Action Advice）**：風險阻斷與行動建議
  - 風險鏈（riskchains）
  - 行動建議（recommendations）

#### 2.2.3 現有系統的結果資料結構

**檔案位置**：`domain/` 資料夾

- `narratives.v1.0.json` - 敘事資料
  ```json
  {
    "low": { "opening": "...", "explain": "..." },
    "mid": { "opening": "...", "explain": "..." },
    "high": { "opening": "...", "explain": "..." }
  }
  ```

- `recommendations.v1.0.json` - 建議資料
  ```json
  {
    "low": [{ "id": "...", "title": "...", "steps": [...] }],
    "mid": [...],
    "high": [...]
  }
  ```

- `riskchains.v1.0.json` - 風險鏈資料
  ```json
  {
    "mid": { "if_not_improve": [...] },
    "high": { "if_not_improve": [...] }
  }
  ```

### 2.3 Legacy 系統的結果呈現資料

#### 2.3.1 Result Templates 資料夾

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`

**已知檔案**（根據目錄列表）：
- `anchor_statements.v1.json` (50KB) - 錨定語句模板
- `intervention_boundary_matrix.v1.json` (2.2KB) - 介入邊界矩陣
- `consequence_chain_library.v1.json` (2.1KB) - 後果鏈庫
- `attribution_error_matrix.v1.json` (2.1KB) - 歸因錯誤矩陣
- `five_element_mapping.v1.json` (3.4KB) - 五行映射（已處理）
- `readingOutputV2.js` (4.1KB) - 結果輸出模板（JavaScript）
- `anchorSelector.js` (11KB) - 錨定語句選擇器（JavaScript）
- `stateTagExtractor.js` (3.5KB) - 狀態標籤提取器（JavaScript）
- `loader.js` (1.6KB) - 載入器（JavaScript）

#### 2.3.2 Guidance 資料夾

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/`

**已知檔案**：
- `buildGuidance.js` (12KB) - 結果生成邏輯（已分析）
- `interventions.json` (2.6KB) - 介入建議資料庫（已分析）
- `chains.json` (1.5KB) - 風險鏈資料庫（已分析）
- `guidance.schema.json` - Guidance Schema
- `schema.json` - Schema 定義
- `modifiers.json` (1.6KB) - 修飾符資料

#### 2.3.3 Ontology 資料夾

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/`

**相關檔案**（如果存在）：
- `guidancePrinciples.v1.json` - 指導原則
- `guidanceActionTemplates.v1.json` - 行動模板
- `resultLexicon.v1.json` - 結果詞彙庫
- `motherThemes.v1.json` - 母題資料庫

### 2.4 設計原則與約束

#### 2.4.1 語境純粹性要求

根據現有系統的設計原則：

- ✅ **禁止心理學名詞**：不得出現任何心理學名詞
- ✅ **禁止現代科學背景**：不得出現任何現代科學背景
- ✅ **僅使用玄學詞彙**：僅使用玄學詞彙庫（`domain/knowledge_base/vocabulary_metaphysical.v1.0.json`）
- ✅ **禁用詞檢查**：必須通過禁用詞檢查（`domain/knowledge_base/forbidden_terms.v1.0.json`）

#### 2.4.2 可回滾、不凍結原則

- ✅ **所有資料保持可回滾**：所有提取和整合的資料都可以回滾
- ✅ **不凍結設計**：設計和決策不鎖定，可以根據實作情況調整

#### 2.4.3 以最新版設計為主

- ✅ **以最新版設計為主**：以最新版的網頁設計、UI 設計、風格元素為主
- ✅ **舊資料作為參考**：Legacy 資料作為參考，判斷是否有價值資料可以後續用做討論

---

## 三、任務範圍

### 3.1 需要提取的資料

#### 3.1.1 Result Templates 資料夾（優先級：高）

1. **anchor_statements.v1.json** (50KB)
   - 目標：提取錨定語句模板
   - 用途：可能用於 narratives 的 opening
   - 分析重點：結構、內容類型、語境（心理學 vs 玄學）

2. **intervention_boundary_matrix.v1.json** (2.2KB)
   - 目標：提取介入邊界規則
   - 用途：可能用於風險判斷規則
   - 分析重點：規則結構、判斷邏輯

3. **consequence_chain_library.v1.json** (2.1KB)
   - 目標：提取後果鏈內容
   - 用途：可能用於 riskchains.if_not_improve
   - 分析重點：鏈結構、內容類型

4. **attribution_error_matrix.v1.json** (2.1KB)
   - 目標：提取歸因錯誤矩陣
   - 用途：待評估
   - 分析重點：結構、可用性

5. **readingOutputV2.js** (4.1KB)
   - 目標：分析結果輸出模板邏輯
   - 用途：理解呈現方式
   - 分析重點：輸出邏輯、模板結構

6. **anchorSelector.js** (11KB)
   - 目標：分析錨定語句選擇邏輯
   - 用途：理解選擇規則
   - 分析重點：選擇邏輯、規則

7. **stateTagExtractor.js** (3.5KB)
   - 目標：分析狀態標籤提取邏輯
   - 用途：理解狀態標籤系統
   - 分析重點：提取邏輯、標籤系統

8. **loader.js** (1.6KB)
   - 目標：分析載入邏輯
   - 用途：理解資料載入方式
   - 分析重點：載入邏輯

#### 3.1.2 Guidance 資料夾（優先級：中）

1. **modifiers.json** (1.6KB)
   - 目標：提取修飾符資料
   - 用途：待評估
   - 分析重點：結構、可用性

2. **guidance.schema.json** 和 **schema.json**
   - 目標：分析 Schema 定義
   - 用途：理解資料結構
   - 分析重點：Schema 結構

#### 3.1.3 Ontology 資料夾（優先級：中）

如果存在以下檔案，也需要提取：

- `guidancePrinciples.v1.json` - 指導原則
- `guidanceActionTemplates.v1.json` - 行動模板
- `resultLexicon.v1.json` - 結果詞彙庫

### 3.2 不需要提取的資料

以下資料已經在階段一處理或已知：

- ✅ `buildGuidance.js` - 已分析
- ✅ `interventions.json` - 已分析
- ✅ `chains.json` - 已分析
- ✅ `five_element_mapping.v1.json` - 已在 P0-11 處理

---

## 四、任務執行步驟

### 步驟 1：檔案提取與結構分析

1. 讀取所有目標檔案
2. 分析每個檔案的結構（JSON 結構或 JavaScript 邏輯）
3. 記錄檔案大小、行數等基本資訊

### 步驟 2：內容類型識別

1. 識別每個檔案的主要內容類型：
   - 模板資料（templates）
   - 規則資料（rules）
   - 邏輯代碼（logic）
   - 其他類型

2. 識別內容的語境：
   - 心理學語境
   - 玄學語境
   - 中性語境

### 步驟 3：可用性評估

1. 評估每個檔案對於現有系統的價值：
   - **高價值**：可以直接使用或轉換後使用
   - **中價值**：部分內容可用
   - **低價值**：僅作為參考
   - **無價值**：不符合現有系統需求

2. 評估轉換難度：
   - **容易**：結構相似，只需語境轉換
   - **中等**：需要結構調整和語境轉換
   - **困難**：需要大幅重構
   - **不可行**：不符合現有系統架構

### 步驟 4：建立資料清單

1. 建立完整的檔案清單
2. 為每個檔案建立詳細說明：
   - 檔案位置
   - 檔案大小
   - 結構說明
   - 內容摘要
   - 可用性評估
   - 轉換難度評估
   - 建議用途

---

## 五、預期產出

### 5.1 主要產出

1. **資料提取報告**：
   - 檔案清單
   - 每個檔案的詳細分析
   - 可用性評估
   - 轉換難度評估

2. **資料結構說明**：
   - 各檔案的結構說明
   - 內容類型分類
   - 語境分析

3. **下一步建議**：
   - 哪些資料值得進一步處理
   - 建議的處理優先級
   - 建議的轉換方向

### 5.2 文件格式

所有產出以 Markdown 格式記錄，標記為 WORKING DOCUMENT（不鎖定，可回滾）。

---

## 六、參考資料

### 6.1 現有系統設計文件

- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文件
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣系統實現
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

### 6.2 現有系統資料結構

- `domain/narratives/stress_recovery.narr.v1.0.json` - 敘事資料範例
- `domain/recommendations/stress_recovery.reco.v1.0.json` - 建議資料範例
- `domain/riskchains/stress_recovery.risk.v1.0.json` - 風險鏈資料範例

### 6.3 語境約束資料

- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞列表

### 6.4 階段一完成文件

- `P0-12_IMPLEMENTATION_SPEC_FINAL.md` - 最終實作規格書
- `P0-12_COMPLETE_BACKGROUND_DATA_PACKAGE.md` - 完整背景資料包
- `P0-12_INTEGRATION_STATUS_AND_NEXT_STEPS.md` - 整合狀態與下一步分析

---

## 七、注意事項

### 7.1 原則遵守

- ✅ **可回滾、不凍結**：所有提取和分析的資料都保持可回滾、不凍結狀態
- ✅ **以最新版設計為主**：分析時以最新版的設計需求為主，Legacy 資料作為參考
- ✅ **完整的背景資料**：所有分析都提供完整的背景資料說明

### 7.2 品質要求

- ✅ **詳細分析**：每個檔案都要進行詳細的結構和內容分析
- ✅ **可用性評估**：明確評估每個資料的可用性和轉換難度
- ✅ **文本記錄**：所有分析結果都以文本形式記錄

---

**任務狀態**：進行中（IN PROGRESS）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-11
