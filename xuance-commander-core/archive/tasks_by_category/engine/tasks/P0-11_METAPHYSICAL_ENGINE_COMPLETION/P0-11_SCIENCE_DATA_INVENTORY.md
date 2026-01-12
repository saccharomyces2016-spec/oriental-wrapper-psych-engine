# P0-11 現代科學/心理學資料盤點報告

**建立日期**：2026-01-11  
**目的**：盤點現有系統和 Legacy 中的現代科學/心理學資料，評估整合可能性

---

## 一、現有系統的現代科學/心理學資料位置

### 1.1 Facet 資料夾

**位置**：`domain/facets/`

**現有 Facet**：
- `income_expansion_pressure/` - 收入擴張壓力 Facet

**Facet 檔案結構**（以 `income_expansion_pressure` 為例）：
- `questions.v1.0.json` - 題目資料
- `scoring.v1.0.json` - 分數計算規則
- `narratives.v1.0.json` - 敘事資料
- `recommendations.v1.0.json` - 建議資料
- `riskchains.v1.0.json` - 風險鏈資料
- `hexagram_mapping.v1.0.json` - 卦象映射（玄學對應）

### 1.2 Compiled 資料夾

**位置**：`domain/compiled/`

**用途**：編譯後的 Facet 資料（供前端使用）

### 1.3 Engine 模組

**位置**：`engine/`

**相關檔案**：
- `score_facet.py` - Facet 分數計算引擎
- `compile_domain.py` - Domain 編譯引擎

---

## 二、Legacy 資料中的現代科學/心理學資料

### 2.1 題目相關資料

**位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json` (78KB)
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json` (65KB)

**內容**：
- 題目內容
- 題目設計
- 題目風格
- 題型

### 2.2 分數計算相關資料

**位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/psych/scorer.js`

**內容**：
- 分數計算方式
- 權重計算
- 量表處理

### 2.3 結果呈現相關資料

**位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`

**內容**：
- 結果呈現邏輯
- 建議生成
- 敘事模板

---

## 三、初步評估

### 3.1 資料結構比對

**需要檢查**：
1. Legacy 題庫的結構是否與現有系統的 `questions.v1.0.json` 兼容
2. Legacy 分數計算邏輯是否與現有系統的 `scoring.v1.0.json` 和 `score_facet.py` 兼容
3. Legacy 結果呈現是否與現有系統的結果呈現設計兼容

### 3.2 整合複雜度評估

**待評估項目**：
- 題目資料的結構差異
- 分數計算方式的差異
- 結果呈現方式的差異
- 是否符合現有系統的設計原則（「去問卷化」等）

---

## 四、下一步行動

### 4.1 立即行動

1. ⏳ **詳細檢查現有系統結構**：讀取現有 Facet 檔案的完整結構
2. ⏳ **詳細檢查 Legacy 資料結構**：讀取 Legacy 題庫、分數計算、結果呈現的完整結構
3. ⏳ **比對分析**：比對結構差異，評估兼容性
4. ⏳ **整合可行性評估**：判斷能否直接整合或需要任務包

### 4.2 整合策略

**如果可以直接整合**：
- 提取有用的題目設計模式
- 提取有用的分數計算方式
- 提取有用的結果呈現邏輯
- 整合到現有系統的 Facet 結構中

**如果需要任務包**：
- 建立完整的任務包，包含所有相關檔案的位置
- 提供結構比對分析
- 提供整合建議和步驟

---

**狀態**：IN_PROGRESS  
**最後更新**：2026-01-11
