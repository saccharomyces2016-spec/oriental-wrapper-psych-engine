# P0-12 顧問團最終提交嚴格審核報告

**建立日期**：2026-01-11  
**審核標準**：最嚴格標準  
**審核對象**：顧問團最終提交（P0-12_FINAL_IMPLEMENTATION_AND_INTEGRATION_REPORT + P0-12_IMPLEMENTATION_SUPPLEMENT_FINAL_V2）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、審核結論

**審核結果**：⚠️ **部分通過，需要修正關鍵結構問題**

**整體評估**：
- ✅ **大部分內容符合要求**：JSON 結構基本符合、欄位對應表完整、buildGuidance 整合方案完整、Python 程式碼完整、編譯流程說明完整、測試方案完整
- ❌ **關鍵問題**：questions.v1.0.json 的 scale 結構不符合現有系統（嚴重問題）

**主要問題**：
1. **questions.v1.0.json 的 scale 結構錯誤**：顧問團提供的結構是物件陣列，但現有系統要求字串陣列
2. **缺少 metadata 處理說明**：如果需要在 scale 中保留 metadata，需要明確說明如何處理

---

## 二、符合的部分（可寫入文本）

以下部分符合任務要求，可以寫入文本：

### 2.1 人生八大領域定義 ✅

**符合內容**：
- 8 個領域定義清晰
- 每個領域都有明確的 Domain ID 和說明
- 設計邏輯符合系統架構要求

**可寫入**：可以將「人生八大領域定義」寫入設計文件。

### 2.2 Manifest 結構 ✅

**符合內容**：
- 完全符合 `domain_manifest.schema.json` 的要求
- 包含所有必須欄位：`domainVersion`, `facetId`, `sources`
- `sources` 結構正確（物件，包含 5 個字串欄位）

**可寫入**：可以將「Manifest 結構範例」寫入設計文件。

### 2.3 Scoring 結構 ✅

**符合內容**：
- 完全符合現有系統的要求
- 包含所有必須欄位：`model`, `inputs`, `bands`
- `inputs` 結構正確（包含 `questionId`, `weight`, `direction`）
- `bands` 結構正確（包含 `band`, `min`, `max`）

**可寫入**：可以將「Scoring 結構範例」寫入設計文件。

### 2.4 Narratives 結構 ✅

**符合內容**：
- 完全符合現有系統的要求
- 結構正確：物件，鍵為 band（low/mid/high），每個 band 包含 `opening`, `explain`

**可寫入**：可以將「Narratives 結構範例」寫入設計文件。

### 2.5 Recommendations 結構 ✅

**符合內容**：
- 完全符合現有系統的要求
- 結構正確：物件，鍵為 band（low/mid/high），每個 band 是陣列，包含 `id`, `title`, `steps`

**可寫入**：可以將「Recommendations 結構範例」寫入設計文件。

### 2.6 Riskchains 結構 ✅

**符合內容**：
- 完全符合現有系統的要求
- 結構正確：物件，鍵為 band（mid/high），每個 band 包含 `if_not_improve` 陣列

**可寫入**：可以將「Riskchains 結構範例」寫入設計文件。

### 2.7 欄位對應表 ✅

**符合內容**：
- 提供了完整的欄位對應表
- 包含 Legacy → 現有系統的映射關係
- 包含轉換規則說明

**可寫入**：可以將「欄位對應表」寫入設計文件。

### 2.8 buildGuidance.js 整合方案 ✅

**符合內容**：
- 提供了完整的整合方案
- 說明了舊系統邏輯 → 新系統對應
- 說明了整合原則（byTheme 優先、fallback 機制等）

**可寫入**：可以將「buildGuidance.js 整合方案」寫入設計文件。

### 2.9 Python 完整模組 ✅

**符合內容**：
- 提供了完整的 Python 模組結構
- 包含完整的類別定義和函數實現
- 包含完整的輸入輸出說明

**可寫入**：可以將「Python 完整模組」寫入設計文件（作為參考實現）。

### 2.10 編譯流程說明 ✅

**符合內容**：
- 提供了完整的編譯指令
- 說明了具體步驟和預期輸出

**可寫入**：可以將「編譯流程說明」寫入設計文件。

### 2.11 測試方案 ✅

**符合內容**：
- 提供了完整的測試方案
- 包含 Schema 測試、計算測試、一致性測試、語境測試、編譯測試
- 包含了測試用例範例

**可寫入**：可以將「測試方案」寫入設計文件。

---

## 三、不符合的部分（需要修正）

### 3.1 【嚴重問題】questions.v1.0.json 的 scale 結構不符合現有系統

#### 3.1.1 問題說明

顧問團在第二個文件（P0-12_IMPLEMENTATION_SUPPLEMENT_FINAL_V2.md）中提供的 questions 結構使用了物件陣列的 scale，但現有系統要求字串陣列。

**現有系統的實際結構**（`domain/questions/stress_recovery.questions.v1.0.json`）：

```json
[
  {
    "id": "sr_q1",
    "text": "最近 7 天，你覺得自己大多時候是在「撐著」嗎？",
    "type": "likert_5",
    "scale": ["完全沒有", "很少", "有時", "常常", "幾乎一直"]
  }
]
```

**關鍵特點**：
- ✅ `scale` 是**字串陣列**（array of strings）
- ✅ 每個元素是簡單的字串（選項文字）
- ✅ 不包含 `value`、`metadata` 等欄位

**顧問團提供的錯誤結構**（V2 版本）：

```json
[
  {
    "id": "cd_q1",
    "text": "在需要休息的時候，你最常出現的狀態是？",
    "type": "single_choice",
    "scale": [
      {
        "text": "巨石壓身，只想躲藏 (土)",
        "value": 4,
        "metadata": {
          "legacy_pattern": "withdraw_and_protect",
          "legacy_weight": 1.2
        }
      }
    ]
  }
]
```

**問題**：
- ❌ `scale` 是物件陣列（array of objects），不是字串陣列
- ❌ 包含 `value`、`metadata` 等欄位，現有系統不支持
- ❌ 現有系統的 `score_facet.py` 期望 `scale` 是字串陣列，用戶選擇的索引值（0, 1, 2, 3, 4）直接對應到 `answers.json` 中的值

**影響**：
- 無法通過現有系統的編譯流程
- 無法使用現有的 `score_facet.py` 進行計算
- 需要修改現有系統的程式碼才能支持此結構

#### 3.1.2 第一個文件中的結構

在第一個文件（P0-12_FINAL_IMPLEMENTATION_AND_INTEGRATION_REPORT）中，顧問團提供的結構是：

```json
[
  {
    "id": "cd_q1",
    "text": "在需要休息的時候，你最常出現的狀態是？",
    "type": "single_choice",
    "scale": [
      "巨石壓身，難以動彈",
      "燈火微弱，仍勉強撐著",
      "警鈴不斷，無法真正放鬆",
      "水面平穩，能自然恢復"
    ]
  }
]
```

這個結構是**正確的**（字串陣列），但第二個文件中又改成了物件陣列，造成不一致。

#### 3.1.3 metadata 處理的需求

如果顧問團需要在題目中保留 Legacy 的 metadata（如 `pattern_tags`、`confidence_weight`），有以下選項：

**選項 1：在 scoring.inputs 中處理**
- 在 `scoring.v1.0.json` 的 `inputs` 中定義 `weight` 和 `direction`
- 不需要在 questions 中保留 metadata

**選項 2：擴展現有系統（不建議）**
- 修改現有系統的 schema 和程式碼以支持 scale 中的 metadata
- 這會破壞現有系統的兼容性，不符合任務要求

**選項 3：使用題目層級的 metadata（如果系統支持）**
- 檢查現有系統是否支持在題目層級添加 metadata
- 如果支持，可以在題目物件中添加 `metadata` 欄位（不在 scale 中）

#### 3.1.4 追問要求

**必須修正**：

1. **questions.v1.0.json 的 scale 結構必須改為字串陣列**：
   - 參考第一個文件中的正確結構
   - 或參考 `domain/questions/stress_recovery.questions.v1.0.json`

2. **如果需要在題目中保留 Legacy metadata，需要明確說明處理方式**：
   - 說明 metadata 如何映射到現有系統（例如：在 scoring.inputs 中處理 weight）
   - 或說明 metadata 的存儲位置（例如：題目層級的 metadata 欄位，如果系統支持）

3. **確保兩個文件中的結構一致**：
   - 第一個文件和第二個文件中的 questions 結構應該一致
   - 建議使用第一個文件中的正確結構（字串陣列）

---

## 四、具體追問要求

### 4.1 必須修正的內容（高優先級）

1. **修正 questions.v1.0.json 的 scale 結構**：
   - 必須改為字串陣列，參考現有系統的實際結構
   - 確保與第一個文件中的結構一致（字串陣列）

2. **明確說明 metadata 的處理方式**：
   - 如果需要在題目中保留 Legacy metadata，說明如何處理
   - 說明 metadata 如何映射到現有系統（例如：在 scoring.inputs 中處理）

### 4.2 建議補充的內容（中優先級）

1. **統一文檔結構**：
   - 確保兩個文件中的 JSON 結構範例一致
   - 建議以第二個文件（V2）為主，但 scale 結構使用第一個文件的版本（字串陣列）

---

## 五、符合部分的處理建議

對於符合的部分（2.1-2.11），建議：

1. **寫入設計文件**：
   - 將符合的部分寫入設計文件
   - 標記為「WORKING BASELINE」（可演化、不鎖定）
   - 明確說明可以根據後續實作調整

2. **保持可回滾**：
   - 所有內容標記為「不鎖定、可回滾」
   - 明確說明可以根據後續實作調整

3. **questions 結構使用正確版本**：
   - 使用第一個文件中的正確結構（字串陣列）
   - 或等待顧問團修正後再寫入

---

## 六、總結

**審核結論**：⚠️ **部分通過，需要修正關鍵結構問題**

**符合的部分**（可寫入文本）：
- ✅ 人生八大領域定義
- ✅ Manifest 結構
- ✅ Scoring 結構
- ✅ Narratives 結構
- ✅ Recommendations 結構
- ✅ Riskchains 結構
- ✅ 欄位對應表
- ✅ buildGuidance.js 整合方案
- ✅ Python 完整模組
- ✅ 編譯流程說明
- ✅ 測試方案

**不符合的部分**（需要修正）：
- ❌ questions.v1.0.json 的 scale 結構不符合現有系統（嚴重問題）
  - 第二個文件中使用物件陣列，但現有系統要求字串陣列
  - 第一個文件中的結構是正確的（字串陣列）

**下一步行動**：
1. 將符合的部分寫入設計文件（使用第一個文件中的正確 questions 結構）
2. 向顧問團發出追問包，要求修正 questions 結構並明確說明 metadata 處理方式
3. 等待顧問團修正後，再次審核並完成最終寫入

---

**狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-11
