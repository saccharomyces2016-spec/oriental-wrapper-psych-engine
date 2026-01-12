# P0-12 顧問團最終提交追問包

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

---

## 二、必須修正的問題

### 2.1 【嚴重問題】questions.v1.0.json 的 scale 結構錯誤

#### 問題說明

您在第二個文件（P0-12_IMPLEMENTATION_SUPPLEMENT_FINAL_V2.md）中提供的 questions 結構使用了物件陣列的 scale，但現有系統要求字串陣列。

#### 現有系統的實際結構（參考範例）

**檔案位置**：`domain/questions/stress_recovery.questions.v1.0.json`

```json
[
  {
    "id": "sr_q1",
    "text": "最近 7 天，你覺得自己大多時候是在「撐著」嗎？",
    "type": "likert_5",
    "scale": ["完全沒有", "很少", "有時", "常常", "幾乎一直"]
  },
  {
    "id": "sr_q2",
    "text": "最近 7 天，你的睡眠恢復感如何？",
    "type": "likert_5",
    "scale": ["很好", "還不錯", "普通", "偏差", "很差"]
  }
]
```

**關鍵特點**：
- ✅ `scale` 是**字串陣列**（array of strings）
- ✅ 每個元素是簡單的字串（選項文字）
- ✅ 不包含 `value`、`metadata` 等欄位
- ✅ 用戶選擇的索引值（0, 1, 2, 3, 4）直接對應到 `answers.json` 中的值

#### 您提供的錯誤結構（第二個文件 V2 版本）

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
- ❌ 現有系統的 `score_facet.py` 期望 `scale` 是字串陣列，無法處理物件陣列
- ❌ 無法通過現有系統的編譯流程
- ❌ 無法使用現有的計算引擎

#### 您提供正確的結構（第一個文件）

在您的第一個文件（P0-12_FINAL_IMPLEMENTATION_AND_INTEGRATION_REPORT）中，您提供的結構是：

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

#### 現有系統的計算邏輯（參考）

**檔案位置**：`engine/score_facet.py`

現有系統的計算邏輯期望：
- `questions` 中的 `scale` 是字串陣列
- `answers.json` 中的值是索引（0, 1, 2, 3, 4），對應 `scale` 陣列中的位置
- `scoring.inputs` 中的 `direction` 決定如何將索引轉換為分數（0-1 範圍）

例如：
- 如果用戶選擇第 3 個選項（索引 2），`answers.json` 中 `"cd_q1": 2`
- 如果 `direction: "higher_is_worse"`，分數 = 2 / 4.0 = 0.5

#### metadata 處理的需求

如果您需要在題目中保留 Legacy 的 metadata（如 `pattern_tags`、`confidence_weight`），有以下選項：

**選項 1：在 scoring.inputs 中處理（推薦）**
- 在 `scoring.v1.0.json` 的 `inputs` 中定義 `weight` 和 `direction`
- 不需要在 questions 中保留 metadata
- 這是現有系統的標準做法

**選項 2：使用題目層級的 metadata（如果系統支持）**
- 檢查現有系統是否支持在題目層級添加 metadata
- 如果支持，可以在題目物件中添加 `metadata` 欄位（不在 scale 中）
- 但這需要確認現有系統的 schema 是否支持

**選項 3：擴展現有系統（不建議）**
- 修改現有系統的 schema 和程式碼以支持 scale 中的 metadata
- 這會破壞現有系統的兼容性，不符合任務要求

#### 追問要求

**必須修正**：

1. **questions.v1.0.json 的 scale 結構必須改為字串陣列**：
   - 參考第一個文件中的正確結構
   - 或參考 `domain/questions/stress_recovery.questions.v1.0.json`
   - 確保與現有系統的結構一致

2. **如果需要在題目中保留 Legacy metadata，需要明確說明處理方式**：
   - 說明 metadata 如何映射到現有系統（例如：在 scoring.inputs 中處理 weight）
   - 或說明 metadata 的存儲位置（例如：題目層級的 metadata 欄位，如果系統支持）
   - 提供具體的映射範例

3. **確保兩個文件中的結構一致**：
   - 第一個文件和第二個文件中的 questions 結構應該一致
   - 建議使用第一個文件中的正確結構（字串陣列）

#### 正確的結構範例（參考）

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

對應的 `scoring.v1.0.json` 中，如果第一個選項（索引 0）對應較低風險，最後一個選項（索引 3）對應較高風險，則：

```json
{
  "model": "weighted_sum",
  "inputs": [
    {
      "questionId": "cd_q1",
      "weight": 1.2,
      "direction": "higher_is_worse"
    }
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

這樣，如果用戶選擇第一個選項（索引 0），分數 = 0 / 3.0 = 0.0（low band）
如果用戶選擇最後一個選項（索引 3），分數 = 3 / 3.0 = 1.0（high band）

---

## 三、其他確認事項

### 3.1 兩個文件的一致性

您提交了兩個文件：
1. P0-12_FINAL_IMPLEMENTATION_AND_INTEGRATION_REPORT
2. P0-12_IMPLEMENTATION_SUPPLEMENT_FINAL_V2.md

這兩個文件中的 JSON 結構範例應該保持一致。目前第一個文件中的 questions 結構是正確的（字串陣列），但第二個文件中的結構是錯誤的（物件陣列）。

**建議**：以第二個文件（V2）為主，但 questions 結構使用第一個文件的版本（字串陣列）。

### 3.2 type 欄位的值

現有系統使用的 `type` 值是 `"likert_5"`（5 點量表），但您提供的結構使用 `"single_choice"`（單選題）。

**確認**：`"single_choice"` 是否是現有系統支持的有效類型？如果是，請確認系統是否支持此類型。如果不是，請使用 `"likert_5"` 或其他系統支持的類型。

---

## 四、總結

**必須修正的問題**：

1. ❌ **questions.v1.0.json 的 scale 結構必須改為字串陣列**
   - 參考第一個文件中的正確結構
   - 或參考現有系統的實際結構

2. ❌ **明確說明 metadata 的處理方式**
   - 如果需要在題目中保留 Legacy metadata，說明如何處理
   - 提供具體的映射範例

3. ❌ **確保兩個文件中的結構一致**
   - 建議使用第一個文件中的正確結構（字串陣列）

**其他符合的部分**：

除了 questions 結構問題外，其他內容都符合要求，包括：
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

**下一步行動**：

1. 請修正 questions.v1.0.json 的 scale 結構（改為字串陣列）
2. 明確說明 metadata 的處理方式
3. 確保兩個文件中的結構一致
4. 重新提交修正後的版本

---

**狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-11
