# P0-12 最終審核報告與追問包

**建立日期**：2026-01-12  
**審核標準**：最高標準嚴格審核  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、審核結果總覽

### 1.1 符合的部分 ✅

1. **題目內容的語境轉換**：
   - ✅ 所有題目文字已轉換為玄學語境
   - ✅ 符合「去心理學化」和「玄學語境純粹性」要求
   - ✅ 題目文字品質良好

2. **整合決策**：
   - ✅ 明確處理了 avoidance_coping 和 hyper responsibility 的整合決策
   - ✅ 建立了 Archive 機制保存未對應的資料

3. **雙向核對意識**：
   - ✅ 報告中提到了雙向核對的概念

---

## 二、不符合的部分 ❌

### 2.1 嚴重問題：JSON 結構不符合現有系統 Schema

#### 問題 1：questions 文件結構錯誤

**顧問提供的結構**：
```json
{
  "meta": {...},
  "questions": [
    {"id": "...", "legacy_id": "...", "text": "...", "category": "...", "weight": ...}
  ]
}
```

**現有系統要求的結構**（來自 `stress_recovery.questions.v1.0.json`）：
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

**問題分析**：
- ❌ 缺少 `type` 欄位（必須是 `"likert_5"`）
- ❌ 缺少 `scale` 欄位（必須是字串陣列，5 個選項）
- ❌ 多了 `meta` 物件（不應該在 questions 文件中）
- ❌ 多了 `legacy_id`, `category`, `weight` 欄位（這些應該在 legacy_map 中，不在 questions 文件中）
- ❌ 結構應該是陣列，不是物件

**正確結構要求**：
- questions 文件必須是**陣列**（array），不是物件（object）
- 每個題目必須包含：`id`, `text`, `type`, `scale`
- `scale` 必須是**字串陣列**（array of strings），5 個選項
- 不得包含 `meta`, `legacy_id`, `category`, `weight` 等欄位

---

#### 問題 2：scoring 文件結構錯誤

**顧問提供的結構**：
```json
{
  "meta": {...},
  "scoring_rules": {
    "base_range": [1, 5],
    "dimension_weights": {...}
  },
  "thresholds": {...},
  "interpretation_map": {...}
}
```

**現有系統要求的結構**（來自 `stress_recovery.scoring.v1.0.json`）：
```json
{
  "model": "weighted_sum",
  "inputs": [
    {"questionId": "sr_q1", "weight": 1.0, "direction": "higher_is_worse"},
    {"questionId": "sr_q2", "weight": 1.0, "direction": "higher_is_worse"}
  ],
  "bands": [
    {"band": "low", "min": 0.0, "max": 0.33},
    {"band": "mid", "min": 0.33, "max": 0.66},
    {"band": "high", "min": 0.66, "max": 1.01}
  ]
}
```

**問題分析**：
- ❌ 缺少 `model` 欄位（必須是 `"weighted_sum"`）
- ❌ 缺少 `inputs` 陣列（必須包含每個題目的 `questionId`, `weight`, `direction`）
- ❌ 缺少 `bands` 陣列的正確結構（必須是 `[{band, min, max}]`）
- ❌ `thresholds` 和 `interpretation_map` 不是標準結構
- ❌ `scoring_rules.base_range` 和 `dimension_weights` 不符合現有系統

**正確結構要求**：
- scoring 文件必須包含：`model`, `inputs`, `bands`
- `model` 必須是 `"weighted_sum"`
- `inputs` 必須是陣列，每個項目包含：`questionId`, `weight`, `direction`
- `bands` 必須是陣列，每個項目包含：`band` (low/mid/high), `min`, `max`
- `bands` 的數值範圍是 0.0-1.01（標準化分數），不是 7-35

---

#### 問題 3：legacy_map 結構不完整

**顧問提供的結構**：
```json
{
  "mappings": {
    "chronic_depletion": {
      "legacy_theme": "chronic_depletion",
      "mapped_ids": ["cd_q1", "cd_q2", ...]
    }
  }
}
```

**現有系統要求的結構**（來自實際生成的 `legacy_map.v1.0.json`）：
```json
{
  "chronic_depletion": {
    "domainId": "chronic_depletion",
    "mappings": {
      "cd_q1": {
        "0": {"pattern": "withdraw_and_protect", "legacy_weight": 1.2},
        "1": {"pattern": "push_through", "legacy_weight": 1.2},
        ...
      }
    }
  }
}
```

**問題分析**：
- ❌ 缺少 `domainId` 欄位
- ❌ `mappings` 結構不完整（缺少 choice index 到 pattern 的映射）
- ❌ 缺少 `legacy_weight` 資訊

---

### 2.2 其他問題

#### 問題 4：題目數量不一致

- 顧問聲稱：56 題（8 個領域 × 7 題）
- 實際情況：52 題（fear_based_stability 只有 3 題）
- 需要確認：是否所有領域都應該是 7 題，還是可以不同數量

#### 問題 5：缺少 scale 選項內容

- 顧問提供的題目只有 `text`，沒有 `scale`（5 個選項）
- 需要提供每個題目的 5 個選項文字（玄學語境）

---

## 三、追問包（Follow-up Package）

### 3.1 關鍵背景資料補充

#### 3.1.1 現有系統的標準結構（必須嚴格遵守）

**questions 文件標準結構**：
```json
[
  {
    "id": "cd_q1",
    "text": "在需要休息的時候，你最常出現的狀態是？",
    "type": "likert_5",
    "scale": [
      "巨石壓身，難以動彈",
      "燈火微弱，仍勉強撐著",
      "警鈴不斷，無法真正放鬆",
      "水面平穩，能自然恢復",
      "精神充沛，能快速回復"
    ]
  }
]
```

**關鍵要求**：
- ✅ 必須是**陣列**（array），不是物件
- ✅ 每個題目必須有：`id`, `text`, `type`, `scale`
- ✅ `type` 必須是 `"likert_5"`
- ✅ `scale` 必須是**字串陣列**，包含 5 個選項
- ✅ 選項文字必須是玄學語境
- ❌ 不得包含 `meta`, `legacy_id`, `category`, `weight` 等欄位

---

**scoring 文件標準結構**：
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
    {"band": "low", "min": 0.0, "max": 0.33},
    {"band": "mid", "min": 0.33, "max": 0.66},
    {"band": "high", "min": 0.66, "max": 1.01}
  ]
}
```

**關鍵要求**：
- ✅ 必須包含：`model`, `inputs`, `bands`
- ✅ `model` 必須是 `"weighted_sum"`
- ✅ `inputs` 必須是陣列，每個項目包含：`questionId`, `weight`, `direction`
- ✅ `direction` 通常是 `"higher_is_worse"`（分數越高越不好）
- ✅ `bands` 必須是陣列，每個項目包含：`band` (low/mid/high), `min`, `max`
- ✅ `bands` 的數值範圍是 **0.0-1.01**（標準化分數），不是原始分數 7-35
- ❌ 不得包含 `meta`, `scoring_rules`, `thresholds`, `interpretation_map` 等非標準欄位

---

**legacy_map 文件標準結構**：
```json
{
  "chronic_depletion": {
    "domainId": "chronic_depletion",
    "mappings": {
      "cd_q1": {
        "0": {
          "pattern": "withdraw_and_protect",
          "legacy_weight": 1.2
        },
        "1": {
          "pattern": "push_through",
          "legacy_weight": 1.2
        }
      }
    }
  }
}
```

**關鍵要求**：
- ✅ 每個領域必須有 `domainId` 和 `mappings`
- ✅ `mappings` 的 key 是 `questionId`
- ✅ 每個 `questionId` 的 value 是 choice index (0-4) 到 pattern 的映射
- ✅ 必須包含 `pattern` (behavior_facet) 和 `legacy_weight`

---

### 3.2 需要補充的資訊

#### 3.2.1 每個題目的 scale 選項

**要求**：
- 每個題目必須提供 5 個選項（`scale` 陣列）
- 選項文字必須是玄學語境
- 選項必須對應到舊版本的 choices，但轉換為玄學語境

**範例**：
```json
{
  "id": "cd_q1",
  "text": "在需要休息的時候，你最常出現的狀態是？",
  "type": "likert_5",
  "scale": [
    "巨石壓身，難以動彈",
    "燈火微弱，仍勉強撐著",
    "警鈴不斷，無法真正放鬆",
    "水面平穩，能自然恢復",
    "精神充沛，能快速回復"
  ]
}
```

---

#### 3.2.2 題目數量確認

**需要確認**：
- 每個領域是否都必須是 7 題？
- 還是可以不同數量（如 fear_based_stability 是 3 題）？

**當前實際情況**：
- chronic_depletion: 7 題
- chronic_alertness: 7 題
- fear_based_stability: 3 題
- hyper_responsibility: 7 題
- identity_diffusion: 7 題
- loss_of_agency: 7 題
- meaning_vacuum: 7 題
- suppressed_needs: 7 題
- **總計：52 題**（不是 56 題）

---

### 3.3 追問要求

#### 追問 1：修正 questions 文件結構

**要求**：
1. 將結構改為陣列（不是物件）
2. 移除 `meta` 物件
3. 移除 `legacy_id`, `category`, `weight` 欄位（這些在 legacy_map 中）
4. 添加 `type: "likert_5"` 欄位
5. 添加 `scale` 欄位（5 個選項的字串陣列）
6. 確保每個題目都有完整的 5 個選項

**範例格式**：
```json
[
  {
    "id": "cd_q1",
    "text": "在需要休息的時候，你最常出現的狀態是？",
    "type": "likert_5",
    "scale": [
      "選項1（最差）",
      "選項2",
      "選項3",
      "選項4",
      "選項5（最好）"
    ]
  }
]
```

---

#### 追問 2：修正 scoring 文件結構

**要求**：
1. 添加 `model: "weighted_sum"` 欄位
2. 將 `scoring_rules.dimension_weights` 轉換為 `inputs` 陣列
3. 每個 `inputs` 項目必須包含：`questionId`, `weight`, `direction`
4. 將 `thresholds` 轉換為 `bands` 陣列
5. `bands` 必須使用標準化分數（0.0-1.01），不是原始分數（7-35）
6. 移除 `meta`, `scoring_rules`, `thresholds`, `interpretation_map` 等非標準欄位

**範例格式**：
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
    {"band": "low", "min": 0.0, "max": 0.33},
    {"band": "mid", "min": 0.33, "max": 0.66},
    {"band": "high", "min": 0.66, "max": 1.01}
  ]
}
```

**重要說明**：
- `bands` 的數值範圍是 **0.0-1.01**（標準化分數）
- 計算方式：原始分數（1-5）會先標準化為 0-1，然後根據 bands 判斷 low/mid/high
- 不是使用原始分數的總和（7-35）來判斷

---

#### 追問 3：完善 legacy_map 結構

**要求**：
1. 添加 `domainId` 欄位
2. 完善 `mappings` 結構，包含 choice index 到 pattern 的映射
3. 確保包含 `pattern` (behavior_facet) 和 `legacy_weight`

**範例格式**：
```json
{
  "chronic_depletion": {
    "domainId": "chronic_depletion",
    "mappings": {
      "cd_q1": {
        "0": {
          "pattern": "withdraw_and_protect",
          "legacy_weight": 1.2
        },
        "1": {
          "pattern": "push_through",
          "legacy_weight": 1.2
        }
      }
    }
  }
}
```

---

#### 追問 4：提供所有題目的 scale 選項

**要求**：
- 為每個題目提供 5 個選項（`scale` 陣列）
- 選項文字必須是玄學語境
- 選項必須對應到舊版本的 choices，但轉換為玄學語境

---

#### 追問 5：確認題目數量

**要求**：
- 確認每個領域的題目數量是否正確
- 如果 fear_based_stability 應該是 7 題，需要補充 4 題
- 如果可以是 3 題，需要說明理由

---

## 四、符合的部分（可寫入文本）

### 4.1 題目內容的語境轉換 ✅

**符合的部分**：
- ✅ 所有題目文字已轉換為玄學語境
- ✅ 符合「去心理學化」和「玄學語境純粹性」要求
- ✅ 題目文字品質良好，符合 Stage 3「鑄爻」的設計要求

**處理方式**：
- 題目文字內容可以保留，但需要調整結構
- 需要補充每個題目的 `scale` 選項

---

### 4.2 整合決策 ✅

**符合的部分**：
- ✅ 明確處理了 avoidance_coping 和 hyper responsibility 的整合決策
- ✅ 建立了 Archive 機制保存未對應的資料

**處理方式**：
- 整合決策可以保留
- Archive 機制可以保留，但需要確認結構是否符合要求

---

## 五、關鍵背景資料（補充給顧問團隊）

### 5.1 現有系統的實際範例

**questions 文件範例**（`domain/questions/stress_recovery.questions.v1.0.json`）：
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

**scoring 文件範例**（`domain/facets/stress_recovery.scoring.v1.0.json`）：
```json
{
  "model": "weighted_sum",
  "inputs": [
    {"questionId": "sr_q1", "weight": 1.0, "direction": "higher_is_worse"},
    {"questionId": "sr_q2", "weight": 1.0, "direction": "higher_is_worse"}
  ],
  "bands": [
    {"band": "low", "min": 0.0, "max": 0.33},
    {"band": "mid", "min": 0.33, "max": 0.66},
    {"band": "high", "min": 0.66, "max": 1.01}
  ],
  "notes": "這是 MVP 範例；分數 0~1 之間，視為低/中/高三段。"
}
```

---

### 5.2 設計文件要求

**來自 `P0-12_IMPLEMENTATION_SPEC_FINAL.md`**：

**questions 結構要求**：
- ✅ `scale` 是**字串陣列**（array of strings），完全符合現有系統要求
- ✅ `type` 使用 `"likert_5"`（5 點量表），符合現有系統
- ✅ 結構與 `domain/questions/stress_recovery.questions.v1.0.json` 完全一致

**scoring 結構要求**：
- ✅ `inputs` 陣列，每個項目包含：`questionId`, `weight`, `direction`
- ✅ **不包含**任何額外欄位（如 `legacy_mapping`），完全符合現有系統
- ✅ 結構與 `domain/facets/stress_recovery.scoring.v1.0.json` 完全一致

---

### 5.3 UI/互動介面設計（Stage 1-4）

**Stage 3（鑄爻）的題目形式**：
- **題型**：`likert_5`（5 點量表）
- **互動方式**：單一選擇（不是滑桿）
- **選項呈現**：5 個選項以玄學語境呈現
- **使用者體驗**：像「問卦」，不是「填問卷」

**設計原則**：
- **De-Questionnaire 原則**：避免傳統問卷元素（滑桿、Likert量表UI）
- **儀式化互動**：單一對象選擇，避免多選
- **語境純粹性**：完全使用玄學語境，禁止心理學術語

---

### 5.4 結果產出和AI處理流程

**計算流程**：
1. 使用者選擇 5 個選項中的一個（0-4 索引）
2. 系統將選擇轉換為分數（0-1 標準化）
3. 使用 `weighted_sum` 模型計算總分
4. 根據 `bands` 判斷 low/mid/high
5. 結果傳遞給 AI 進行敘事轉換

**bands 的計算邏輯**：
- 原始選擇：0, 1, 2, 3, 4（對應 scale 的 5 個選項）
- 標準化：選擇值 / 4.0（例如：選擇 3 → 3/4 = 0.75）
- 加權計算：`weighted_sum = Σ(標準化分數 × weight) / Σ(weight)`
- 判斷 bands：根據 `bands` 的 min/max 範圍判斷 low/mid/high

---

## 六、追問要求總結

### 6.1 必須修正的問題

1. **questions 文件結構**：
   - ❌ 改為陣列結構
   - ❌ 移除 `meta`, `legacy_id`, `category`, `weight`
   - ✅ 添加 `type: "likert_5"`
   - ✅ 添加 `scale` 陣列（5 個選項）

2. **scoring 文件結構**：
   - ✅ 添加 `model: "weighted_sum"`
   - ✅ 將 `dimension_weights` 轉換為 `inputs` 陣列
   - ✅ 將 `thresholds` 轉換為 `bands` 陣列（使用 0.0-1.01 範圍）
   - ❌ 移除非標準欄位

3. **legacy_map 結構**：
   - ✅ 添加 `domainId` 欄位
   - ✅ 完善 choice index 到 pattern 的映射

4. **scale 選項**：
   - ✅ 為每個題目提供 5 個選項

5. **題目數量**：
   - ⚠️ 確認每個領域的題目數量

---

### 6.2 符合的部分（可保留）

1. ✅ 題目文字的玄學語境轉換（品質良好）
2. ✅ 整合決策（avoidance_coping, hyper responsibility）
3. ✅ Archive 機制概念

---

## 七、下一步行動

### 7.1 顧問團隊需要做的事

1. **修正所有 questions 文件**：
   - 改為陣列結構
   - 添加 `type` 和 `scale` 欄位
   - 為每個題目提供 5 個選項

2. **修正所有 scoring 文件**：
   - 改為標準結構（model, inputs, bands）
   - 使用標準化分數範圍（0.0-1.01）

3. **完善 legacy_map**：
   - 添加 `domainId` 和完整的 mappings 結構

4. **確認題目數量**：
   - 確認每個領域的題目數量是否正確

---

### 7.2 審核標準

**通過標準**：
- ✅ 所有文件結構完全符合現有系統 schema
- ✅ 所有題目都有完整的 5 個選項
- ✅ 所有 scoring 文件使用標準化分數範圍
- ✅ 所有資料可以雙向核對

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**當前狀態**：❌ **結構不符合，需要追問**
