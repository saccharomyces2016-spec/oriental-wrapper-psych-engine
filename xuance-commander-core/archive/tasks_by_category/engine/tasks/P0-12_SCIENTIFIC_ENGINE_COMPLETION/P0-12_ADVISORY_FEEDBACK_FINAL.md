# P0-12 顧問團最終回報嚴格審核與追問包

**建立日期**：2026-01-11  
**審核標準**：最嚴格標準  
**審核對象**：顧問團最終回報（P0-12_IMPLEMENTATION_SUPPLEMENT_FINAL）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、審核結論

**審核結果**：⚠️ **部分通過，需要補充關鍵細節**

**整體評估**：
- ✅ **符合的部分**：設計方向正確、計算邏輯有提供、資料結構有範例、測試標準有定義
- ❌ **不符合的部分**：JSON 結構不符合現有系統 schema、缺少完整欄位對應表、缺少 buildGuidance 整合方案、缺少完整轉換規則、Python 程式碼不完整

**主要問題**：
1. JSON 結構範例與現有系統 schema 不一致
2. 缺少完整的欄位對應表和轉換規則
3. 缺少 buildGuidance.js 和結果呈現系統的整合方案
4. Python 程式碼不完整（只有關鍵函數，缺少完整模組）
5. manifest 結構不符合現有系統 schema

---

## 二、符合的部分（可寫入文本）

以下部分符合任務要求，可以寫入文本：

### 2.1 人生八大領域定義 ✅

**符合內容**：
- 8 個領域定義清晰
- 每個領域都有明確的 Domain ID 和領域核心
- 設計邏輯符合系統架構要求

**可寫入**：可以將「人生八大領域定義」寫入設計文件。

### 2.2 八卦、五行、六十四卦的系統定位 ✅

**符合內容**：
- 明確分層：科學計算層、Facet/Domain 層、語義介面層、敘事延伸層
- 明確定位：象數系統不參與第一關計算，僅用於語義和敘事

**可寫入**：可以將「系統定位」寫入設計文件。

### 2.3 10 → 8 主題整合決策 ✅

**符合內容**：
- 明確說明了 10 個主題如何整合為 8 個領域
- 說明了 `self_erosion` 和 `unprocessed_loss` 的 downgrade 處理方式
- 提供了主題映射決策表

**可寫入**：可以將「主題整合決策」寫入設計文件。

### 2.4 雙層計算模型設計 ✅

**符合內容**：
- Layer A 和 Layer B 設計清晰
- 提供了 Python 程式碼片段（關鍵函數）
- 提供了簡單的一致性驗證函數

**可寫入**：可以將「雙層計算模型設計」寫入設計文件（但需要補充完整程式碼）。

### 2.5 測試驗證標準 ✅

**符合內容**：
- 提供了測試與驗收標準表
- 明確了 Schema、計算、一致性、語境、編譯的驗證標準

**可寫入**：可以將「測試驗證標準」寫入設計文件。

---

## 三、不符合的部分（需要追問）

以下部分不符合任務要求，需要顧問團補充：

### 3.1 【嚴重問題】JSON 結構不符合現有系統 Schema

**問題描述**：
- 顧問團提供的 JSON 結構範例與現有系統的實際結構不一致
- manifest 結構不符合 `domain_manifest.schema.json` 的要求
- questions 結構與現有系統不一致

**具體問題**：

1. **manifest.v1.0.json 結構錯誤**：

   **顧問團提供的結構**：
   ```json
   {
     "domain": "chronic_depletion",
     "files": [...]
   }
   ```

   **現有系統要求的結構**（根據 `domain_manifest.schema.json` 和實際範例）：
   ```json
   {
     "domainVersion": "1.0",
     "facetId": "chronic_depletion",
     "sources": {
       "questions": "domain/questions/chronic_depletion.questions.v1.0.json",
       "scoring": "domain/facets/chronic_depletion.scoring.v1.0.json",
       "recommendations": "domain/recommendations/chronic_depletion.reco.v1.0.json",
       "narratives": "domain/narratives/chronic_depletion.narr.v1.0.json",
       "riskchains": "domain/riskchains/chronic_depletion.risk.v1.0.json"
     }
   }
   ```

   **問題**：
   - ❌ 缺少 `domainVersion`（必須欄位）
   - ❌ 使用 `domain` 而非 `facetId`（必須欄位）
   - ❌ 使用 `files` 陣列而非 `sources` 物件（必須欄位）
   - ❌ `sources` 必須包含 5 個欄位：questions, scoring, recommendations, narratives, riskchains

2. **questions.v1.0.json 結構不一致**：

   **顧問團提供的結構**：
   ```json
   {
     "domainId": "chronic_depletion",
     "version": "1.0",
     "questions": [...]
   }
   ```

   **現有系統的實際結構**（根據 `stress_recovery.questions.v1.0.json`）：
   ```json
   [
     {
       "id": "sr_q1",
       "text": "...",
       "type": "likert_5",
       "scale": [...]
     }
   ]
   ```

   **問題**：
   - ❌ questions JSON 應該是陣列，不是物件
   - ❌ 不應該包含 `domainId` 和 `version`（這些在 manifest 中）
   - ❌ 題目結構需要符合現有系統的格式

3. **scoring.v1.0.json 結構不完整**：

   **顧問團提供的結構**：
   ```json
   {
     "facetId": "chronic_depletion",
     "model": "weighted_sum",
     "bands": [...]
   }
   ```

   **現有系統要求的結構**（根據 `stress_recovery.scoring.v1.0.json`）：
   ```json
   {
     "model": "weighted_sum",
     "inputs": [
       { "questionId": "sr_q1", "weight": 1.0, "direction": "higher_is_worse" }
     ],
     "bands": [
       { "band": "low", "min": 0.0, "max": 0.33 }
     ]
   }
   ```

   **問題**：
   - ❌ 缺少 `inputs` 欄位（必須欄位，定義如何計算分數）
   - ❌ bands 結構不完整（應該有 `band`, `min`, `max`，不是 `id`, `range`）
   - ❌ 不應該包含 `facetId`（這個在 manifest 中）

**追問要求**：
- 必須提供符合現有系統 schema 的 JSON 結構範例
- 必須參考 `domain/manifests/stress_recovery.v1.0.json` 和相關 schema 檔案
- 必須確保所有 JSON 結構都能通過現有系統的編譯流程

---

### 3.2 【嚴重問題】缺少完整的欄位對應表和轉換規則

**問題描述**：
- 任務包要求提供「結構對應表：Legacy 欄位 → 現有系統欄位」
- 顧問團沒有提供完整的欄位對應表
- 沒有提供詳細的轉換規則說明

**缺失內容**：

1. **Legacy → 現有系統欄位對應表**：
   - ❌ 沒有提供 `questionBank.v1.json` 欄位 → `questions.v1.0.json` 欄位的對應表
   - ❌ 沒有提供 `scorer.js` 輸出 → `scoring.v1.0.json` 欄位的對應表
   - ❌ 沒有提供 `buildGuidance.js` 輸出 → `narratives/recommendations/riskchains` 欄位的對應表

2. **轉換規則詳細說明**：
   - ❌ 沒有說明如何將 Legacy `question_text` 轉換為現有系統的 `text`
   - ❌ 沒有說明如何將 Legacy `choices` 轉換為現有系統的 `scale`
   - ❌ 沒有說明如何處理 `pattern_tags` 和 `choice_meta`
   - ❌ 沒有說明如何將 Legacy 的 `confidence_weight` 轉換為現有系統的 `weight`

**追問要求**：
- 必須提供完整的欄位對應表（Legacy → 現有系統）
- 必須提供詳細的轉換規則說明
- 必須提供轉換範例（至少 1-2 個完整題目的轉換過程）

---

### 3.3 【嚴重問題】缺少 buildGuidance.js 和結果呈現系統的整合方案

**問題描述**：
- 任務包要求說明如何整合 `buildGuidance.js` 的完整邏輯
- 任務包要求說明如何整合 `interventions.json`、`chains.json`、`guidancePrinciples` 等
- 顧問團沒有提供這些整合方案

**缺失內容**：

1. **buildGuidance.js 整合方案**：
   - ❌ 沒有說明如何將 `buildGuidance.js` 的邏輯整合到現有系統
   - ❌ 沒有說明如何處理 `byTheme` 和 `byDomain` 兩種模式
   - ❌ 沒有說明如何處理 `motherThemes` 的選擇邏輯
   - ❌ 沒有說明如何處理 `resultLexicon` 的詞彙替換

2. **結果呈現檔案整合方案**：
   - ❌ 沒有說明如何將 `interventions.json` 整合為 `recommendations.v1.0.json`
   - ❌ 沒有說明如何將 `chains.json` 整合為 `riskchains.v1.0.json`
   - ❌ 沒有說明如何處理 `guidancePrinciples`、`guidanceActionTemplates`、`resultLexicon`
   - ❌ 沒有說明如何處理 `anchor_statements`、`consequence_chain_library` 等 resultTemplates

**追問要求**：
- 必須提供 buildGuidance.js 的整合方案（至少是邏輯說明）
- 必須說明如何整合所有 Legacy 結果呈現檔案
- 必須提供轉換規則和範例（至少 1 個完整範例）

---

### 3.4 【問題】Python 程式碼不完整

**問題描述**：
- 顧問團只提供了關鍵函數，沒有提供完整的 Python 模組
- 缺少完整的輸入輸出定義
- 缺少完整的模組結構

**缺失內容**：

1. **完整模組結構**：
   - ❌ 沒有提供完整的模組結構（檔案組織、函數組織）
   - ❌ 沒有提供完整的輸入輸出定義（函數簽名、參數說明、返回值說明）
   - ❌ 沒有提供完整的錯誤處理

2. **完整的計算流程**：
   - ❌ 沒有提供完整的 `scorePsychometrics` 函數（只有部分函數）
   - ❌ 沒有說明如何處理 `patternToThemeMap` 的載入和使用
   - ❌ 沒有說明如何處理 `canonicalizeUserChoices` 的邏輯

**追問要求**：
- 必須提供完整的 Python 模組結構（至少是主要函數的完整實現）
- 必須提供完整的輸入輸出定義
- 必須說明如何整合到現有系統

---

### 3.5 【問題】缺少完整的編譯流程說明

**問題描述**：
- 顧問團提到了 ETL → Compile，但說明不夠詳細
- 沒有說明具體的編譯步驟
- 沒有說明如何驗證編譯結果

**缺失內容**：

1. **編譯流程詳細步驟**：
   - ❌ 沒有說明如何使用 `compile_domain.py`
   - ❌ 沒有說明編譯的具體命令和參數
   - ❌ 沒有說明編譯後的輸出格式和位置

2. **編譯驗證**：
   - ❌ 沒有說明如何驗證編譯結果是否符合 schema
   - ❌ 沒有說明如何處理編譯錯誤

**追問要求**：
- 必須提供完整的編譯流程說明（具體步驟、命令、參數）
- 必須說明如何驗證編譯結果

---

### 3.6 【問題】缺少完整的測試方案

**問題描述**：
- 顧問團提供了測試標準，但沒有提供具體的測試方案
- 沒有說明如何進行測試
- 沒有提供測試範例

**缺失內容**：

1. **測試方案**：
   - ❌ 沒有說明如何測試計算邏輯
   - ❌ 沒有說明如何測試結果呈現
   - ❌ 沒有說明如何測試系統整合

2. **測試範例**：
   - ❌ 沒有提供測試用例範例
   - ❌ 沒有提供測試腳本或測試程式碼

**追問要求**：
- 必須提供具體的測試方案（測試步驟、測試方法）
- 必須提供測試範例（至少 1 個完整測試用例）

---

## 四、具體追問要求

### 4.1 必須補充的內容（高優先級）

1. **修正 JSON 結構範例**：
   - 提供符合現有系統 schema 的 manifest JSON 範例
   - 提供符合現有系統格式的 questions JSON 範例
   - 提供完整的 scoring JSON 範例（包含 inputs 欄位）
   - 確保所有 JSON 結構都能通過現有系統的編譯流程

2. **提供完整的欄位對應表**：
   - Legacy `questionBank.v1.json` → 現有系統 `questions.v1.0.json`
   - Legacy `scorer.js` → 現有系統 `scoring.v1.0.json`
   - Legacy `buildGuidance.js` → 現有系統 `narratives/recommendations/riskchains`
   - 提供詳細的轉換規則說明

3. **提供結果呈現系統整合方案**：
   - buildGuidance.js 的整合方案
   - interventions.json、chains.json 等的整合方案
   - 提供至少 1 個完整範例

### 4.2 建議補充的內容（中優先級）

1. **完整的 Python 模組**：
   - 提供完整的模組結構
   - 提供完整的函數實現
   - 提供輸入輸出定義

2. **完整的編譯和測試方案**：
   - 提供編譯流程的詳細步驟
   - 提供測試方案和測試範例

---

## 五、符合部分的處理建議

對於符合的部分（2.1-2.5），建議：

1. **寫入設計文件**：
   - 將符合的部分寫入設計文件
   - 標記為「WORKING BASELINE」（可演化、不鎖定）
   - 明確說明可以根據後續實作調整

2. **保持可回滾**：
   - 所有內容標記為「不鎖定、可回滾」
   - 明確說明可以根據後續實作調整

---

## 六、總結

**審核結論**：⚠️ **部分通過，需要補充關鍵細節**

**符合的部分**（可寫入文本）：
- ✅ 人生八大領域定義
- ✅ 八卦、五行、六十四卦的系統定位
- ✅ 10 → 8 主題整合決策
- ✅ 雙層計算模型設計（需要補充完整程式碼）
- ✅ 測試驗證標準

**不符合的部分**（需要追問）：
- ❌ JSON 結構不符合現有系統 schema（嚴重問題）
- ❌ 缺少完整的欄位對應表和轉換規則（嚴重問題）
- ❌ 缺少 buildGuidance.js 和結果呈現系統的整合方案（嚴重問題）
- ❌ Python 程式碼不完整
- ❌ 缺少完整的編譯流程說明
- ❌ 缺少完整的測試方案

**下一步行動**：
1. 將符合的部分寫入設計文件（標記為 WORKING BASELINE）
2. 向顧問團發出追問包，要求補充所有不符合的部分
3. 等待顧問團補充後，再次審核

---

**狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-11
