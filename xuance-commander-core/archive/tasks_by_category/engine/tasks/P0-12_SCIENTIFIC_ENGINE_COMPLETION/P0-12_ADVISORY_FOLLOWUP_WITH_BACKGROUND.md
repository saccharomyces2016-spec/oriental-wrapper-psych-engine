# P0-12 顧問團最終回報追問包（含詳細背景資料）

**建立日期**：2026-01-11  
**審核標準**：最嚴格標準  
**審核對象**：顧問團最終回報（P0-12_IMPLEMENTATION_SUPPLEMENT_FINAL）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、審核結論

**審核結果**：⚠️ **部分通過，需要補充關鍵細節**

**符合的部分**（已寫入設計文件）：
- ✅ 人生八大領域定義
- ✅ 八卦、五行、六十四卦的系統定位
- ✅ 10 → 8 主題整合決策
- ✅ 雙層計算模型設計方向
- ✅ 測試驗證標準

**不符合的部分**（需要追問）：
- ❌ JSON 結構不符合現有系統 schema（嚴重問題）
- ❌ 缺少完整的欄位對應表和轉換規則（嚴重問題）
- ❌ 缺少 buildGuidance.js 和結果呈現系統的整合方案（嚴重問題）
- ❌ Python 程式碼不完整
- ❌ 缺少完整的編譯流程說明
- ❌ 缺少完整的測試方案

---

## 二、不符合部分的詳細背景資料與追問要求

### 2.1 【嚴重問題】JSON 結構不符合現有系統 Schema

#### 2.1.1 問題說明

顧問團提供的 JSON 結構範例與現有系統的實際結構和 schema 要求不一致，這會導致：
- 無法通過現有系統的編譯流程
- 無法通過 schema 驗證
- 無法與現有系統整合

#### 2.1.2 現有系統的實際結構（參考範例）

**Manifest 結構**（`domain/manifests/stress_recovery.v1.0.json`）：

```json
{
  "domainVersion": "1.0",
  "facetId": "stress_recovery",
  "sources": {
    "questions": "domain/questions/stress_recovery.questions.v1.0.json",
    "scoring": "domain/facets/stress_recovery.scoring.v1.0.json",
    "recommendations": "domain/recommendations/stress_recovery.reco.v1.0.json",
    "narratives": "domain/narratives/stress_recovery.narr.v1.0.json",
    "riskchains": "domain/riskchains/stress_recovery.risk.v1.0.json"
  }
}
```

**Schema 要求**（`schemas/domain_manifest.schema.json`）：

- **必須欄位**：
  - `domainVersion`（string，格式：`^[0-9]+\\.[0-9]+$`）
  - `facetId`（string）
  - `sources`（object）
- **sources 必須包含**：
  - `questions`（string，檔案路徑）
  - `scoring`（string，檔案路徑）
  - `recommendations`（string，檔案路徑）
  - `narratives`（string，檔案路徑）
  - `riskchains`（string，檔案路徑）
- **禁止額外欄位**：`additionalProperties: false`

**顧問團提供的錯誤結構**：

```json
{
  "domain": "chronic_depletion",
  "files": ["questions.v1.0.json", "scoring.v1.0.json", ...]
}
```

**問題**：
- ❌ 使用 `domain` 而非 `facetId`（必須欄位）
- ❌ 缺少 `domainVersion`（必須欄位）
- ❌ 使用 `files` 陣列而非 `sources` 物件（必須欄位）
- ❌ `sources` 必須是物件，包含 5 個字串欄位（檔案路徑），不是陣列

---

**Questions 結構**（`domain/questions/stress_recovery.questions.v1.0.json`）：

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
- ✅ **類型**：陣列（array），直接是題目陣列
- ✅ **項目結構**：每個項目包含 `id`, `text`, `type`, `scale`
- ✅ **不包含**：`domainId`, `version`（這些在 manifest 中）

**顧問團提供的錯誤結構**：

```json
{
  "domainId": "chronic_depletion",
  "version": "1.0",
  "questions": [...]
}
```

**問題**：
- ❌ 應該是陣列，不是物件
- ❌ 不應該包含 `domainId` 和 `version`（這些在 manifest 中）
- ❌ 編譯系統期望的是陣列，不是物件

---

**Scoring 結構**（`domain/facets/stress_recovery.scoring.v1.0.json`）：

```json
{
  "model": "weighted_sum",
  "inputs": [
    {
      "questionId": "sr_q1",
      "weight": 1.0,
      "direction": "higher_is_worse"
    },
    {
      "questionId": "sr_q2",
      "weight": 1.0,
      "direction": "higher_is_worse"
    }
  ],
  "bands": [
    {
      "band": "low",
      "min": 0.0,
      "max": 0.33
    },
    {
      "band": "mid",
      "min": 0.33,
      "max": 0.66
    },
    {
      "band": "high",
      "min": 0.66,
      "max": 1.01
    }
  ],
  "notes": "這是 MVP 範例；分數 0~1 之間，視為低/中/高三段。"
}
```

**關鍵特點**：
- ✅ **必須欄位**：`model`, `inputs`, `bands`
- ✅ **inputs**：陣列，定義如何計算分數（questionId, weight, direction）
- ✅ **bands**：陣列，每個項目包含 `band`, `min`, `max`
- ✅ **不包含**：`facetId`（這個在 manifest 中）

**顧問團提供的錯誤結構**：

```json
{
  "facetId": "chronic_depletion",
  "model": "weighted_sum",
  "bands": [
    { "id": "low", "range": [0.0, 0.33] }
  ]
}
```

**問題**：
- ❌ 缺少 `inputs` 欄位（必須欄位，定義如何計算分數）
- ❌ bands 結構錯誤：應該使用 `band`, `min`, `max`，不是 `id`, `range`
- ❌ 不應該包含 `facetId`（這個在 manifest 中）

---

**Narratives 結構**（`domain/narratives/stress_recovery.narr.v1.0.json`）：

```json
{
  "low": {
    "opening": "你現在的氣場比較穩，像是五行之中「土」有根。",
    "explain": "土穩代表你有基本節奏，身心不容易被外界帶著跑。"
  },
  "mid": {
    "opening": "你最近像是「木」被風拉扯，能長但也容易累。",
    "explain": "木主伸展，代表你在撐著往前，但恢復沒跟上。"
  },
  "high": {
    "opening": "你目前像是「火」過旺，亮但消耗很快。",
    "explain": "火旺常見於壓力堆疊，短期能衝，長期容易透支。"
  }
}
```

**關鍵特點**：
- ✅ **結構**：物件，鍵為 band（low/mid/high）
- ✅ **每個 band**：包含 `opening`, `explain`

---

**Recommendations 結構**（`domain/recommendations/stress_recovery.reco.v1.0.json`）：

```json
{
  "low": [
    {
      "id": "sr_low_1",
      "title": "維持節奏",
      "steps": [
        "每天固定一個 10 分鐘放鬆段落",
        "睡前 30 分鐘不做高刺激內容"
      ]
    }
  ],
  "mid": [
    {
      "id": "sr_mid_1",
      "title": "先把恢復拉回來",
      "steps": [
        "連續 3 天，固定起床時間",
        "下午兩點後避免含咖啡因飲品",
        "每天 15 分鐘輕度走路"
      ]
    }
  ],
  "high": [
    {
      "id": "sr_high_1",
      "title": "先止血再談提升",
      "steps": [
        "把今天要做的事砍到 3 件",
        "晚上只做低耗能活動",
        "明天安排一段可被打斷也沒關係的休息"
      ]
    }
  ]
}
```

**關鍵特點**：
- ✅ **結構**：物件，鍵為 band（low/mid/high）
- ✅ **每個 band**：陣列，每個項目包含 `id`, `title`, `steps`

---

**Riskchains 結構**（`domain/riskchains/stress_recovery.risk.v1.0.json`）：

```json
{
  "mid": {
    "if_not_improve": [
      "專注力下降 → 決策品質變差",
      "情緒耐受度下降 → 口氣變衝、關係摩擦增加"
    ]
  },
  "high": {
    "if_not_improve": [
      "睡眠品質持續變差 → 白天更累 → 晚上更難睡（惡性循環）",
      "小事就爆 → 自責增加 → 更不想處理事情 → 壓力再上升"
    ]
  }
}
```

**關鍵特點**：
- ✅ **結構**：物件，鍵為 band（mid/high，通常不包含 low）
- ✅ **每個 band**：包含 `if_not_improve` 陣列

---

#### 2.1.3 追問要求

**必須提供符合現有系統 schema 的 JSON 結構範例**：

1. **manifest.v1.0.json**：
   - 必須使用 `domainVersion`, `facetId`, `sources` 結構
   - `sources` 必須包含 5 個字串欄位（檔案路徑）
   - 參考 `domain/manifests/stress_recovery.v1.0.json`

2. **questions.v1.0.json**：
   - 必須是陣列，不是物件
   - 每個項目包含 `id`, `text`, `type`, `scale`
   - 不包含 `domainId`, `version`
   - 參考 `domain/questions/stress_recovery.questions.v1.0.json`

3. **scoring.v1.0.json**：
   - 必須包含 `model`, `inputs`, `bands`
   - `inputs` 必須定義如何計算分數
   - `bands` 必須使用 `band`, `min`, `max` 結構
   - 不包含 `facetId`
   - 參考 `domain/facets/stress_recovery.scoring.v1.0.json`

4. **narratives.v1.0.json**：
   - 物件結構，鍵為 band（low/mid/high）
   - 參考 `domain/narratives/stress_recovery.narr.v1.0.json`

5. **recommendations.v1.0.json**：
   - 物件結構，鍵為 band（low/mid/high）
   - 參考 `domain/recommendations/stress_recovery.reco.v1.0.json`

6. **riskchains.v1.0.json**：
   - 物件結構，鍵為 band（mid/high）
   - 參考 `domain/riskchains/stress_recovery.risk.v1.0.json`

**必須確保所有 JSON 結構都能通過現有系統的編譯流程**（`engine/compile_domain.py`）。

---

### 2.2 【嚴重問題】缺少完整的欄位對應表和轉換規則

#### 2.2.1 問題說明

任務包明確要求提供「結構對應表：Legacy 欄位 → 現有系統欄位」和「轉換規則說明」，但顧問團沒有提供。這會導致：

- 無法理解如何將 Legacy 資料轉換為現有系統格式
- 無法確保轉換的正確性
- 無法進行批量轉換

#### 2.2.2 Legacy 系統的完整欄位結構（參考）

**Legacy questionBank.v1.json 結構**：

```json
{
  "items": [
    {
      "theme_id": "chronic_depletion",
      "theme_enLabel": "Chronic Depletion",
      "theme_zhLabel": "慢性耗竭",
      "questions": [
        {
          "question_text": "在同時照顧年邁父母與未成年子女的高壓期，你每天醒來的第一個念頭是？",
          "choices": [
            "覺得身體沉重，想躲回被窩",
            "立刻列出清單，強迫自己開機",
            "緊盯手機，擔心有突發狀況",
            "希望能有人接手這一切"
          ],
          "pattern_tags": ["overextension", "body_signals", "routine"],
          "confidence_weight": 1.2,
          "choice_meta": [
            {
              "choice": "覺得身體沉重，想躲回被窩",
              "behavior_facet": "withdraw_and_protect"
            }
          ]
        }
      ]
    }
  ]
}
```

**現有系統 questions.v1.0.json 結構**：

```json
[
  {
    "id": "cd_q1",
    "text": "在需要休息的時候，你最常出現的狀態是？",
    "type": "single_choice",
    "scale": [
      "巨石壓身，難以動彈",
      "風燭殘年，火光將熄",
      "驚弓之鳥，心弦緊繃",
      "平湖止水，波瀾不驚"
    ]
  }
]
```

#### 2.2.3 需要的欄位對應表

**必須提供的對應表**：

| Legacy 欄位 | 現有系統欄位 | 轉換規則 | 備註 |
|------------|------------|---------|------|
| `theme_id` | `facetId` (在 manifest 中) | 直接映射 | 例如：`chronic_depletion` → `chronic_depletion` |
| `question_text` | `text` | 需要轉換語境（去問卷化、語境純粹化） | 需要將心理學語境轉換為玄學語境 |
| `choices` | `scale` | 需要轉換語境和格式 | 從 4 個選項轉換為玄學語境的選項 |
| `pattern_tags` | `metadata.pattern_tags` (內部) | 保留，但不暴露給前端 | 僅供後端計算使用 |
| `confidence_weight` | `scoring.inputs[].weight` | 直接映射 | 例如：1.2 → 1.2 |
| `choice_meta.behavior_facet` | 內部處理（不暴露） | 保留，但不暴露給前端 | 僅供後端計算使用 |

#### 2.2.4 轉換規則詳細說明需求

**必須提供的轉換規則**：

1. **題目文字轉換規則**：
   - 如何將 Legacy `question_text`（包含心理學語境）轉換為現有系統的 `text`（玄學語境）
   - 需要參考 `forbidden_terms.v1.0.json` 和 `vocabulary_metaphysical.v1.0.json`
   - 需要符合「去問卷化」原則

2. **選項轉換規則**：
   - 如何將 Legacy `choices`（4 個選項）轉換為現有系統的 `scale`（玄學語境選項）
   - 如何處理 `choice_meta` 中的 `behavior_facet`
   - 需要符合「去問卷化」原則

3. **分數計算轉換規則**：
   - 如何將 Legacy `confidence_weight` 轉換為現有系統的 `scoring.inputs[].weight`
   - 如何將 Legacy `pattern_tags` 映射到現有系統的計算邏輯
   - 如何處理 `choice_meta` 中的權重資訊

4. **結果呈現轉換規則**：
   - 如何將 Legacy 的建議和敘事轉換為現有系統的 narratives/recommendations/riskchains
   - 需要符合語境純粹性要求

#### 2.2.5 追問要求

**必須提供**：

1. **完整的欄位對應表**：
   - Legacy `questionBank.v1.json` → 現有系統 `questions.v1.0.json`
   - Legacy `scorer.js` 輸出 → 現有系統 `scoring.v1.0.json`
   - Legacy `buildGuidance.js` 輸出 → 現有系統 `narratives/recommendations/riskchains`

2. **詳細的轉換規則說明**：
   - 題目文字轉換規則（包含範例）
   - 選項轉換規則（包含範例）
   - 分數計算轉換規則
   - 結果呈現轉換規則

3. **轉換範例**：
   - 至少 1-2 個完整題目的轉換過程（從 Legacy 格式到現有系統格式）

---

### 2.3 【嚴重問題】缺少 buildGuidance.js 和結果呈現系統的整合方案

#### 2.3.1 問題說明

任務包明確要求說明如何整合 `buildGuidance.js` 的完整邏輯和所有 Legacy 結果呈現檔案，但顧問團沒有提供。這會導致：

- 無法理解如何將 Legacy 的結果呈現系統整合到現有系統
- 無法確保整合的正確性
- 無法保留 Legacy 系統的完整功能

#### 2.3.2 buildGuidance.js 完整邏輯說明（參考背景資料）

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js` (12KB)

**核心功能**：

1. **輸入**：`{ birth, resonance, psych, insights }`
   - `psych`：來自 `scorer.js` 的輸出（包含 traits, axes, elements, motherThemes）

2. **處理流程**：

   **步驟 1：提取 motherThemes**
   - 從 `psych.motherThemes` 提取前 3 個主題
   - 轉換為中文標籤（使用 `motherThemesDB`）

   **步驟 2：構建 recommendations（byTheme 模式，優先）**
   - 使用 `interventionsDB.byTheme[themeId]` 根據主題選擇建議
   - 應用 `resultLexicon` 進行詞彙替換

   **步驟 3：構建 chains（byTheme 模式，優先）**
   - 使用 `chainsDB.byTheme[themeId]` 根據主題選擇風險鏈
   - 應用 `resultLexicon` 進行詞彙替換

   **步驟 4：構建 recommendations（byDomain 模式，相容）**
   - 如果 byTheme 模式失敗，回退到 byDomain 模式
   - 使用 `interventionsDB.domains[domainKey][element]` 和 `topElements`

   **步驟 5：應用 guidancePrinciples**
   - 從 `guidancePrinciplesDB` 根據 motherThemeId 獲取原則
   - 合併到 recommendations 中

   **步驟 6：應用 guidanceActionTemplates**
   - 從 `guidanceActionTemplatesDB` 獲取行動模板
   - 根據條件選擇和應用模板

3. **輸出**：guidance 物件，包含：
   - `recommendations`：建議陣列
   - `interventions`：介入建議（同 recommendations）
   - `chains`：風險鏈陣列
   - `warnings`：警告訊息
   - `debug`：除錯資訊

#### 2.3.3 interventions.json 結構（參考）

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/interventions.json`

**結構範例**：

```json
{
  "meta": {
    "version": "m3a-1",
    "note": "Interventions are grounded in psychology; metaphysics is narrative skin."
  },
  "byTheme": {
    "control_need": {
      "title": "控制與失控恐懼",
      "whatItMeans": "你需要確定性來穩定情緒，一旦局勢不可控，焦慮會快速放大。",
      "actions": [
        "把目前的困擾拆成「可控 / 半可控 / 不可控」三欄，各寫不超過三件事",
        "每天只為『可控』項目行動 20 分鐘，避免過度規劃",
        "用『試行版決策』取代一次到位的選擇"
      ],
      "avoid": [
        "無止盡蒐集資訊卻不行動",
        "把不確定性直接等同於失敗"
      ]
    }
  },
  "domains": {
    "domain_xin": {
      "wood": [...],
      "fire": [...]
    }
  }
}
```

**關鍵特點**：
- `byTheme`：根據主題 ID 索引的建議（新版本，優先使用）
- `domains`：根據領域和元素索引的建議（舊版本，相容模式）
- 每個建議包含 `title`, `whatItMeans`, `actions`, `avoid`

#### 2.3.4 chains.json 結構（參考）

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/chains.json`

**結構範例**：

```json
{
  "meta": {
    "version": "m3a-1",
    "note": "Chains are probabilistic projections, not fate."
  },
  "byTheme": {
    "control_need": {
      "short": [
        "你會反覆驗算，決策速度下降。"
      ],
      "mid": [
        "你開始避免新的承諾，生活選項變少。"
      ],
      "long": [
        "人生逐漸縮成安全區，機會感明顯下降。"
      ]
    }
  }
}
```

**關鍵特點**：
- `byTheme`：根據主題 ID 索引的風險鏈（新版本，優先使用）
- 每個主題包含 `short`, `mid`, `long` 三個時間段的風險鏈

#### 2.3.5 現有系統結果呈現結構（參考）

**narratives.v1.0.json**：
```json
{
  "low": {
    "opening": "...",
    "explain": "..."
  },
  "mid": {...},
  "high": {...}
}
```

**recommendations.v1.0.json**：
```json
{
  "low": [
    {
      "id": "...",
      "title": "...",
      "steps": [...]
    }
  ],
  "mid": [...],
  "high": [...]
}
```

**riskchains.v1.0.json**：
```json
{
  "mid": {
    "if_not_improve": [
      "風險1 → 風險2 → 風險3"
    ]
  },
  "high": {
    "if_not_improve": [...]
  }
}
```

#### 2.3.6 需要的整合方案

**必須提供的整合方案**：

1. **buildGuidance.js 邏輯整合方案**：
   - 如何將 `buildGuidance.js` 的邏輯整合到現有系統
   - 如何處理 `byTheme` 和 `byDomain` 兩種模式
   - 如何處理 `motherThemes` 的選擇邏輯
   - 如何處理 `resultLexicon` 的詞彙替換

2. **interventions.json 整合方案**：
   - 如何將 `interventions.json.byTheme[themeId]` 轉換為 `recommendations.v1.0.json`
   - 如何將 `actions` 和 `avoid` 轉換為 `steps`
   - 如何處理語境轉換（心理學 → 玄學）

3. **chains.json 整合方案**：
   - 如何將 `chains.json.byTheme[themeId]` 轉換為 `riskchains.v1.0.json`
   - 如何將 `short/mid/long` 轉換為 `if_not_improve`
   - 如何處理語境轉換

4. **guidancePrinciples 整合方案**：
   - 如何將 `guidancePrinciples` 整合到 recommendations
   - 如何處理原則的選擇邏輯

5. **guidanceActionTemplates 整合方案**：
   - 如何將 `guidanceActionTemplates` 整合到 recommendations
   - 如何處理模板的選擇和應用

6. **resultLexicon 整合方案**：
   - 如何將 `resultLexicon` 用於詞彙替換
   - 如何確保語境純粹性

#### 2.3.7 追問要求

**必須提供**：

1. **buildGuidance.js 整合方案**：
   - 邏輯說明（至少是主要流程）
   - 如何整合到現有系統的建議

2. **結果呈現檔案整合方案**：
   - 如何整合 `interventions.json` → `recommendations.v1.0.json`
   - 如何整合 `chains.json` → `riskchains.v1.0.json`
   - 如何整合其他相關檔案

3. **轉換規則和範例**：
   - 至少 1 個完整範例（從 Legacy 格式到現有系統格式）
   - 轉換規則說明

---

### 2.4 【問題】Python 程式碼不完整

#### 2.4.1 問題說明

顧問團只提供了關鍵函數片段，沒有提供完整的 Python 模組。這會導致：

- 無法理解完整的模組結構
- 無法理解輸入輸出定義
- 無法進行實作

#### 2.4.2 需要的完整程式碼結構

**必須提供的內容**：

1. **完整的模組結構**：
   - 檔案組織（如何組織函數和類別）
   - 函數組織（哪些函數是公開的，哪些是內部的）

2. **完整的函數定義**：
   - 函數簽名（參數、返回值）
   - 參數說明（每個參數的類型和用途）
   - 返回值說明（返回值的類型和結構）
   - 錯誤處理

3. **完整的計算流程**：
   - 完整的 `scorePsychometrics` 函數實現
   - 如何處理 `patternToThemeMap` 的載入和使用
   - 如何處理 `canonicalizeUserChoices` 的邏輯（如果需要）

#### 2.4.3 追問要求

**必須提供**：

1. **完整的 Python 模組結構**（至少是主要函數的完整實現）
2. **完整的輸入輸出定義**
3. **如何整合到現有系統的說明**

---

### 2.5 【問題】缺少完整的編譯流程說明

#### 2.5.1 問題說明

顧問團提到了 ETL → Compile，但說明不夠詳細。需要了解：

- 如何使用現有系統的編譯工具
- 編譯的具體步驟和命令
- 如何驗證編譯結果

#### 2.5.2 現有系統編譯流程（參考）

**編譯工具**：`engine/compile_domain.py`

**使用方式**：

```bash
python3 engine/compile_domain.py <manifest.json> <out.json>
```

**處理流程**：

1. 讀取 manifest JSON 檔案
2. 根據 `sources` 讀取所有相關檔案：
   - `sources.questions` → 讀取 questions JSON
   - `sources.scoring` → 讀取 scoring JSON
   - `sources.recommendations` → 讀取 recommendations JSON
   - `sources.narratives` → 讀取 narratives JSON
   - `sources.riskchains` → 讀取 riskchains JSON
3. 合併為單一 compiled facet JSON
4. 輸出到指定路徑

**輸出結構**（必須符合 `compiled_facet.schema.json`）：

```json
{
  "domainVersion": "1.0",
  "facetId": "stress_recovery",
  "questions": [...],
  "scoring": {...},
  "recommendations": {...},
  "narratives": {...},
  "riskchains": {...}
}
```

#### 2.5.3 追問要求

**必須提供**：

1. **完整的編譯流程說明**：
   - 具體步驟（ETL 的每個步驟）
   - 具體命令（如何使用 compile_domain.py）
   - 參數說明

2. **編譯驗證**：
   - 如何驗證編譯結果是否符合 schema
   - 如何處理編譯錯誤

---

### 2.6 【問題】缺少完整的測試方案

#### 2.6.1 問題說明

顧問團提供了測試標準，但沒有提供具體的測試方案。需要了解：

- 如何進行測試（測試步驟、測試方法）
- 測試用例範例
- 測試腳本或測試程式碼

#### 2.6.2 測試標準（顧問團已提供）

| 類型 | 標準 |
|------|------|
| Schema | 全 JSON 通過 |
| 計算 | 誤差 < 0.01 |
| 一致性 | Layer A / B 無衝突 |
| 語境 | 無 forbidden_terms |
| 編譯 | 8 Domains 全通過 |

#### 2.6.3 需要的測試方案

**必須提供的測試方案**：

1. **Schema 測試**：
   - 如何測試 JSON 是否符合 schema
   - 測試工具或方法

2. **計算測試**：
   - 如何測試計算邏輯
   - 測試用例範例
   - 如何驗證誤差 < 0.01

3. **一致性測試**：
   - 如何測試 Layer A 和 Layer B 的一致性
   - 測試用例範例
   - 如何判斷「無衝突」

4. **語境測試**：
   - 如何測試語境純粹性（檢查 forbidden_terms）
   - 測試工具或方法

5. **編譯測試**：
   - 如何測試編譯流程
   - 如何驗證 8 Domains 全通過

#### 2.6.4 追問要求

**必須提供**：

1. **具體的測試方案**（測試步驟、測試方法）
2. **測試範例**（至少 1 個完整測試用例）
3. **測試腳本或測試程式碼**（如果可能）

---

## 三、總結

### 3.1 必須補充的內容（高優先級）

1. **修正 JSON 結構範例**：
   - 提供符合現有系統 schema 的所有 JSON 結構範例
   - 參考現有系統的實際結構（stress_recovery 範例）
   - 確保所有 JSON 結構都能通過編譯流程

2. **提供完整的欄位對應表和轉換規則**：
   - Legacy → 現有系統的完整欄位對應表
   - 詳細的轉換規則說明
   - 至少 1-2 個完整範例

3. **提供結果呈現系統整合方案**：
   - buildGuidance.js 的整合方案
   - interventions.json、chains.json 等的整合方案
   - 至少 1 個完整範例

### 3.2 建議補充的內容（中優先級）

1. **完整的 Python 模組**：
   - 完整的模組結構
   - 完整的函數實現
   - 輸入輸出定義

2. **完整的編譯和測試方案**：
   - 編譯流程的詳細步驟
   - 測試方案和測試範例

---

**狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-11
