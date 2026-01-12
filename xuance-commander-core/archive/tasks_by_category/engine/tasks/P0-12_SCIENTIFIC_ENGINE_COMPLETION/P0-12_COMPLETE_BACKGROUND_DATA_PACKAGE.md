# P0-12 完整背景資料包

**建立日期**：2026-01-11  
**目的**：提供完整的背景資料，讓顧問團能夠完成 Legacy 現代科學資料的完全整合  
**狀態**：COMPLETE BACKGROUND DATA PACKAGE

---

## 說明

本資料包包含所有 Legacy 系統和現有系統的現代科學相關資料，旨在提供完整的背景資訊，讓顧問團能夠：
1. 理解所有 Legacy 系統的完整結構和內容
2. 理解現有系統的完整結構和要求
3. 完成所有 10 個主題的完整整合
4. 完成計算邏輯、結果呈現、系統整合等所有環節

---

## 一、Legacy 系統完整資料

### 1.1 題目資料完整資訊

#### 1.1.1 主題完整列表

**Legacy 題庫（questionBank.v1.json）中的主題**：

根據掃描結果，Legacy 題庫包含以下主題：

1. **chronic_depletion**（慢性耗竭）
   - 中文標籤：慢性耗竭
   - 英文標籤：Chronic Depletion
   - 題數：7 題

2. **hyper_responsibility**（過度責任）
   - 中文標籤：過度責任
   - 英文標籤：Hyper-Responsibility
   - 題數：5 題（題庫）或 7 題（藍圖）

3. **fear_based_stability**（恐懼驅動的穩定）
   - 中文標籤：恐懼驅動的穩定
   - 英文標籤：Fear-Based Stability
   - 題數：3 題（題庫）或 7 題（藍圖）

4. **loss_of_agency**（主控感流失）
   - 中文標籤：主控感流失
   - 英文標籤：Loss of Agency
   - 題數：7 題

5. **social_comparison**（社會比較壓力）
   - 中文標籤：社會比較壓力
   - 英文標籤：Social Comparison
   - 題數：7 題
   - **注意**：此主題只在題庫中，不在藍圖中

6. **suppressed_needs**（需求壓抑）
   - 中文標籤：需求壓抑
   - 英文標籤：Suppressed Needs
   - 題數：7 題

7. **identity_diffusion**（自我模糊）
   - 中文標籤：自我模糊
   - 英文標籤：Identity Diffusion
   - 題數：7 題

8. **emotional_permeability**（情緒滲透）
   - 中文標籤：情緒滲透
   - 英文標籤：Emotional Permeability
   - 題數：7 題
   - **注意**：此主題只在題庫中，不在藍圖中

9. **avoidance_coping**（逃避型因應）
   - 中文標籤：逃避型因應
   - 英文標籤：Avoidance Coping
   - 題數：7 題
   - **注意**：此主題只在題庫中，不在藍圖中

**Legacy 藍圖（p1_question_blueprint_v1.json）中的主題**：

根據掃描結果，Legacy 藍圖包含以下主題（每個主題 7 題）：

1. **chronic_alertness**（慢性警覺）
   - **注意**：此主題只在藍圖中，不在題庫中

2. **chronic_depletion**（慢性耗竭）

3. **fear_based_stability**（恐懼驅動的穩定）

4. **hyper_responsibility**（過度責任）

5. **identity_diffusion**（身份擴散）

6. **loss_of_agency**（失去自主性）

7. **meaning_vacuum**（意義真空）
   - **注意**：此主題只在藍圖中，不在題庫中

8. **self_erosion**（自我侵蝕）
   - **注意**：此主題只在藍圖中，不在題庫中

9. **suppressed_needs**（壓抑需求）

10. **unprocessed_loss**（未處理的損失）
    - **注意**：此主題只在藍圖中，不在題庫中

**主題不一致說明**：

- 題庫和藍圖的主題列表不完全一致
- 需要決定以哪個為準，或是否需要合併兩者的主題
- 建議：以藍圖為準（因為藍圖是設計文件），但也要參考題庫中的實際題目內容

#### 1.1.2 題目結構完整說明

**questionBank.v1.json 結構**：

```json
{
  "_schema": "items[]: {theme_id, theme_enLabel, theme_zhLabel, questions[]: {question_text, choices[], pattern_tags[], confidence_weight, choice_meta[]}}",
  "version": 1,
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
            },
            {
              "choice": "立刻列出清單，強迫自己開機",
              "behavior_facet": "push_through"
            },
            {
              "choice": "緊盯手機，擔心有突發狀況",
              "behavior_facet": "observe_and_wait"
            },
            {
              "choice": "希望能有人接手這一切",
              "behavior_facet": "seek_support"
            }
          ]
        }
      ]
    }
  ]
}
```

**關鍵欄位說明**：

- **theme_id**：主題 ID
- **theme_enLabel / theme_zhLabel**：主題標籤（英文/中文）
- **question_text**：題目文字
- **choices**：選項陣列（4 個選項）
- **pattern_tags**：模式標籤陣列（用於映射到 themes 和 elements）
- **confidence_weight**：置信度權重（用於加權計分，範圍約 1.0-1.3）
- **choice_meta**：選項元資料陣列
  - **choice**：選項文字
  - **behavior_facet**：行為構面（例如：withdraw_and_protect, push_through, observe_and_wait, seek_support）

**p1_question_blueprint_v1.json 結構**：

```json
{
  "meta": {
    "purpose": "blueprint only, not final wording",
    "generatedAt": "2025-12-30T00:38:24.432Z",
    "totalThemes": 10,
    "questionsPerTheme": 7,
    "totalQuestions": 70
  },
  "themes": {
    "chronic_depletion": [
      {
        "theme_id": "chronic_depletion",
        "intent_label": "Intent 1",
        "question_text": "[Rough question text for chronic_depletion - intent 1]",
        "choices": [
          "[Choice 1]",
          "[Choice 2]",
          "[Choice 3]",
          "[Choice 4]"
        ],
        "choice_meta": [
          {
            "choice": "[Choice 1]",
            "behavior_facet": "follow_momentum"
          }
        ],
        "pattern_tags": [
          "overextension",
          "recovery",
          "body_signals"
        ],
        "confidence_weight": 1.2
      }
    ]
  }
}
```

**注意**：藍圖是設計文件，題目文字是占位符（"[Rough question text]"），實際題目內容在 questionBank.v1.json 中。

#### 1.1.3 題目資料檔案位置

- **完整題庫**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json` (78KB)
- **題目藍圖**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json` (65KB)

---

### 1.2 計算系統完整資訊

#### 1.2.1 scorer.js 完整程式碼

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/psych/scorer.js` (4.7KB)

**核心功能**：

1. **輸入**：`resonance` 物件，包含：
   - `domain` / `domainLabel`：領域標籤
   - `userChoices`：使用者選擇陣列
   - `axes`：軸向量（可選）
   - `elements`：元素向量（可選）

2. **計算流程**：

   **步驟 1：初始化**
   - 初始化 `traits`（6 個維度）：drive, control, stabilityNeed, sensitivity, riskAversion, innerTension
   - 初始化 `axes`（5 個維度）：move, inward, heat, damp, boundary
   - 初始化 `elements`（5 個元素）：wood, fire, earth, metal, water

   **步驟 2：累積權重**
   - 從 `userChoices` 中的每個選擇的 `weights` 屬性累積到 traits, axes, elements
   - 格式：`uc.weights.traits`, `uc.weights.axes`, `uc.weights.elements`

   **步驟 3：正規化 traits**
   - 公式：`(value + 0.5) / 1.2`，然後 clamp 到 [0, 1]
   - SCALE.traits = 1.2
   - 輸出：`traits01`（6 個維度，每個都在 [0, 1] 範圍內）

   **步驟 4：正規化 axes**
   - 公式：`(value + 1) / 2.0`，然後 clamp 到 [0, 1]
   - SCALE.axes = 2.0
   - 輸出：`axes01`（5 個維度，每個都在 [0, 1] 範圍內）

   **步驟 5：正規化 elements**
   - 使用 `normalizeElementsToUnit` 函數
   - 計算總和，然後每個元素除以總和
   - 確保總和為 1（單位向量）
   - 輸出：`elementsUnit`（5 個元素，總和為 1）

   **步驟 6：計算 motherThemes**
   - 使用 `accumulateMotherThemesFromQuestions` 函數
   - 從 `userChoices` 中的 `pattern_tags` 和 `confidence_weight` 映射到 themes
   - 使用 `patternToThemeMap` 進行映射
   - 輸出：`motherThemes`（陣列，每個項目包含 themeId, score, source）

3. **輸出**：`psychometrics` 物件，包含：
   - `input`：輸入資料
   - `traits`：traits01（6 個維度）
   - `axes`：axes01（5 個維度）
   - `elements`：elementsUnit（5 個元素，總和為 1）
   - `archetype`：{ topElements: [前 2 個元素] }
   - `motherThemes`：母題陣列

**關鍵函數**：

- `normalizeElementsToUnit(e)`：將 elements 正規化為總和為 1 的單位向量
- `topElementsFromUnit(eUnit, topN = 2)`：從單位向量中提取前 N 個元素
- `accumulateMotherThemesFromQuestions(userChoices)`：從 userChoices 中累積 motherThemes
  - 使用 `patternToThemeMap` 映射 pattern_tags 到 themeId
  - 使用 `confidence_weight` 進行加權

#### 1.2.2 patternToThemeMap 映射規則

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/patternToThemeMap.v1.js`

**功能**：將 `pattern_tags`（例如：`overextension`, `body_signals`）映射到 `themeId` 和權重

**使用方式**：
- 在 `accumulateMotherThemesFromQuestions` 函數中使用
- 輸入：pattern tag（字串）
- 輸出：{ themeId, weight } 或 null

**注意**：此檔案是 JavaScript 模組，需要查看實際內容以了解完整的映射規則。

#### 1.2.3 計算邏輯詳細說明

**traits 計算**：

- **維度**：6 個
  - `drive`：驅動力
  - `control`：控制力
  - `stabilityNeed`：穩定性需求
  - `sensitivity`：敏感度
  - `riskAversion`：風險規避
  - `innerTension`：內在張力

- **正規化公式**：
  ```
  traits01[key] = clamp01((traits[key] + 0.5) / 1.2)
  ```
  - `clamp01`：將值限制在 [0, 1] 範圍內
  - SCALE.traits = 1.2

**axes 計算**：

- **維度**：5 個
  - `move`：移動/行動
  - `inward`：向內/內向
  - `heat`：熱度/能量
  - `damp`：濕度/情緒
  - `boundary`：邊界/界限

- **正規化公式**：
  ```
  axes01[key] = clamp01((axes[key] + 1) / 2.0)
  ```
  - SCALE.axes = 2.0

**elements 計算**：

- **元素**：5 個（五行）
  - `wood`：木
  - `fire`：火
  - `earth`：土
  - `metal`：金
  - `water`：水

- **正規化公式**：
  ```
  sum = wood + fire + earth + metal + water
  elementsUnit[key] = elements[key] / sum  (if sum > 0)
  ```
  - 如果 sum <= 0，返回均等分配 {0.2, 0.2, 0.2, 0.2, 0.2}
  - 確保總和為 1（單位向量）

**motherThemes 計算**：

- **輸入**：`userChoices` 陣列
- **處理**：
  1. 遍歷每個 userChoice
  2. 提取 `pattern_tags` 和 `confidence_weight`
  3. 使用 `patternToThemeMap` 將 pattern_tag 映射到 themeId 和 weight
  4. 累積分數：`score += confidence_weight * pattern_weight`
- **輸出**：陣列，每個項目包含 { themeId, score, source: 'question' }
- **排序**：按 score 降序排列

---

### 1.3 結果呈現系統完整資訊

#### 1.3.1 buildGuidance.js 完整邏輯

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js` (12KB)

**核心功能**：

1. **輸入**：`{ birth, resonance, psych, insights }`
   - `psych`：來自 `scorer.js` 的輸出（包含 traits, axes, elements, motherThemes）

2. **處理流程**：

   **步驟 1：提取 motherThemes**
   - 從 `psych.motherThemes` 提取前 3 個主題
   - 轉換為中文標籤（使用 `motherThemesDB`）

   **步驟 2：構建 recommendations（byTheme）**
   - 使用 `interventionsDB.byTheme` 根據主題選擇建議
   - 應用 `resultLexicon` 進行詞彙替換

   **步驟 3：構建 chains（byTheme）**
   - 使用 `chainsDB.byTheme` 根據主題選擇風險鏈
   - 應用 `resultLexicon` 進行詞彙替換

   **步驟 4：構建 recommendations（byDomain，相容模式）**
   - 如果 byTheme 模式失敗，回退到 byDomain 模式
   - 使用 `interventionsDB.domains` 和 `topElements`

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
   - `debug`：除錯資訊

**關鍵依賴**：

- `interventions.json`：介入建議資料庫
- `chains.json`：風險鏈資料庫
- `guidancePrinciples.v1.json`：指導原則
- `motherThemes.v1.json`：母題資料庫
- `guidanceActionTemplates.v1.json`：行動模板
- `resultLexicon.v1.json`：結果詞彙庫

#### 1.3.2 結果呈現資料檔案

**guidance 資料夾**（`src/core/guidance/`）：

- `interventions.json` (2.6KB)
  - 結構：`{ byTheme: {...}, domains: {...} }`
  - byTheme：根據主題 ID 索引的建議
  - domains：根據領域和元素索引的建議

- `chains.json` (1.5KB)
  - 結構：`{ byTheme: {...}, domains: {...} }`
  - byTheme：根據主題 ID 索引的風險鏈
  - domains：根據領域和元素索引的風險鏈

**ontology 資料夾**（`src/core/ontology/`）：

- `motherThemes.v1.json` (2.6KB)
  - 母題資料庫，包含主題 ID、中文標籤、英文標籤等

- `guidancePrinciples.v1.json` (2.8KB)
  - 指導原則，根據 motherThemeId 索引

- `guidanceActionTemplates.v1.json` (5.8KB)
  - 行動模板資料庫

- `resultLexicon.v1.json` (3.0KB)
  - 結果詞彙庫，用於詞彙替換

**resultTemplates 資料夾**（`archive/legacy/core-content/resultTemplates/`）：

- `anchor_statements.v1.json` (50KB)
  - 錨定語句模板庫

- `intervention_boundary_matrix.v1.json` (2.2KB)
  - 介入邊界矩陣

- `consequence_chain_library.v1.json` (2.1KB)
  - 後果鏈庫

- `readingOutputV2.js` (4.1KB)
  - 結果輸出模板（JavaScript 模組）

- 其他相關檔案

#### 1.3.3 結果呈現系統結構說明

**byTheme 模式（優先）**：

- 根據 `motherThemes` 的前 3 個主題選擇建議和風險鏈
- 使用 `interventionsDB.byTheme[themeId]` 和 `chainsDB.byTheme[themeId]`
- 這是新版本的模式，優先使用

**byDomain 模式（相容）**：

- 如果 byTheme 模式失敗，回退到 byDomain 模式
- 使用 `interventionsDB.domains[domainKey][element]` 和 `chainsDB.domains[domainKey][element]`
- 這是舊版本的模式，用於相容

**詞彙替換**：

- 使用 `resultLexicon` 對建議和風險鏈進行詞彙替換
- 確保使用一致的詞彙和語境

---

### 1.4 Legacy 系統檔案位置總覽

**題目資料**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json`

**計算系統**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/psych/scorer.js`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/patternToThemeMap.v1.js`

**結果呈現系統**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/interventions.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/chains.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/motherThemes.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidanceActionTemplates.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/resultLexicon.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`（所有檔案）

---

## 二、現有系統完整資料

### 2.1 題目資料

**檔案位置**：`domain/questions/stress_recovery.questions.v1.0.json`

**結構範例**：
```json
[
  {
    "id": "sr_q1",
    "text": "最近 7 天，你覺得自己大多時候是在「撐著」嗎？",
    "type": "likert_5",
    "scale": [
      "完全沒有",
      "很少",
      "有時",
      "常常",
      "幾乎一直"
    ]
  },
  {
    "id": "sr_q2",
    "text": "最近 7 天，你的睡眠恢復感如何？",
    "type": "likert_5",
    "scale": [
      "很好",
      "還不錯",
      "普通",
      "偏差",
      "很差"
    ]
  }
]
```

**關鍵欄位**：
- `id`：題目 ID
- `text`：題目文字
- `type`：題型（例如：`likert_5`）
- `scale`：量表選項陣列（5 個選項）

**注意**：現有系統使用 Likert 量表（5 點量表），但根據設計原則，應該改為「去問卷化」的單選形式。

### 2.2 計算系統

**檔案位置**：
- `engine/score_facet.py`：分數計算引擎
- `domain/facets/stress_recovery.scoring.v1.0.json`：分數計算規則

**score_facet.py 邏輯**：

1. **輸入**：
   - `compiled_facet.json`：編譯後的 Facet 資料
   - `answers.json`：使用者答案（格式：`{ questionId: answer_value }`）

2. **計算流程**：
   - 讀取 `scoring.inputs`（每個輸入包含 questionId, weight, direction）
   - 對每個輸入：
     - 取得答案值 `v`（0-4，對應 Likert 5 點量表）
     - 根據 `direction` 轉換為分數：
       - `higher_is_worse`：`score = v / 4.0`
       - `higher_is_worse_reversed`：`score = (4.0 - v) / 4.0`
     - 累積加權分數：`total += score * weight`
     - 累積總權重：`total_w += weight`
   - 計算平均分數：`avg = total / total_w`
   - 根據 `scoring.bands` 判斷 band（low/mid/high）

3. **輸出**：
   ```json
   {
     "facetId": "...",
     "domainVersion": "1.0",
     "score": 0.5,
     "band": "mid",
     "narrative": {...},
     "recommendations": [...],
     "riskchains": {...}
   }
   ```

**scoring 結構**：
```json
{
  "model": "weighted_sum",
  "inputs": [
    {
      "questionId": "sr_q1",
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
  ]
}
```

### 2.3 結果呈現系統

**narratives**（`domain/narratives/stress_recovery.narr.v1.0.json`）：
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

**recommendations**（`domain/recommendations/stress_recovery.reco.v1.0.json`）：
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

**riskchains**（`domain/riskchains/stress_recovery.risk.v1.0.json`）：
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

### 2.4 系統架構

**Manifest 系統**（`domain/manifests/stress_recovery.v1.0.json`）：
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

**編譯系統**（`engine/compile_domain.py`）：

1. **輸入**：manifest JSON 檔案
2. **處理**：
   - 讀取 manifest
   - 根據 `sources` 讀取所有相關檔案
   - 合併為單一 compiled facet JSON
3. **輸出**：compiled facet JSON（符合 `compiled_facet.schema.json`）

**Compiled Facet Schema**（`schemas/compiled_facet.schema.json`）：

必須包含以下欄位：
- `domainVersion`
- `facetId`
- `questions`
- `scoring`
- `narratives`
- `recommendations`
- `riskchains`

### 2.5 現有系統檔案位置總覽

**題目資料**：
- `domain/questions/stress_recovery.questions.v1.0.json`

**計算系統**：
- `engine/score_facet.py`
- `domain/facets/stress_recovery.scoring.v1.0.json`

**結果呈現系統**：
- `domain/narratives/stress_recovery.narr.v1.0.json`
- `domain/recommendations/stress_recovery.reco.v1.0.json`
- `domain/riskchains/stress_recovery.risk.v1.0.json`

**系統架構**：
- `domain/manifests/stress_recovery.v1.0.json`
- `engine/compile_domain.py`
- `schemas/compiled_facet.schema.json`
- `schemas/domain_manifest.schema.json`

**編譯後資料**：
- `domain/compiled/stress_recovery.compiled.v1.0.json`（或 `stress_recovery.v1.0.compiled.json`）

---

## 三、整合要求與指引

### 3.1 所有主題的整合計劃

**需要整合的主題列表**（以藍圖為準，共 10 個）：

1. `chronic_depletion`（慢性耗竭）
2. `chronic_alertness`（慢性警覺）
3. `fear_based_stability`（恐懼驅動的穩定）
4. `hyper_responsibility`（過度責任）
5. `identity_diffusion`（身份擴散）
6. `loss_of_agency`（失去自主性）
7. `meaning_vacuum`（意義真空）
8. `self_erosion`（自我侵蝕）
9. `suppressed_needs`（壓抑需求）
10. `unprocessed_loss`（未處理的損失）

**整合要求**：

- 每個主題需要：
  1. 題目資料（questions JSON）
  2. 分數計算規則（scoring JSON）
  3. 敘事資料（narratives JSON）
  4. 建議資料（recommendations JSON）
  5. 風險鏈資料（riskchains JSON）
  6. Manifest 檔案
  7. 編譯後的 compiled facet JSON

- 所有主題必須：
  - 符合現有系統的結構
  - 符合設計原則（去問卷化、語境純粹性）
  - 符合系統架構要求（UI 設計、世界觀架構）
  - 通過編譯和驗證

### 3.2 計算邏輯整合方案

**雙層計算模型**：

**Layer A：Legacy Psychometric Layer（保留）**

- 保留 Legacy 的完整計算邏輯
- 將 `scorer.js` 移植到 Python
- 計算 traits, axes, elements, motherThemes
- 輸出完整的 psychometrics 結果

**Layer B：Facet Canonical Layer（現有系統）**

- 使用 `weighted_sum` 模型
- 計算單一分數（0-1）
- 判斷 band（low/mid/high）

**一致性規則**：

- 兩種計算結果必須一致
- 科學計算結果作為驗證基準
- 如果 inconsistent，必須調整玄學計算結果以匹配科學計算結果

**整合策略**：

1. 保留 Legacy 計算邏輯作為內部驗證層
2. 使用現有系統的 weighted_sum 作為主要計算層
3. 確保兩種計算結果一致
4. 如果無法一致，優先以科學計算結果為準

### 3.3 結果呈現整合方案

**整合策略**：

1. **narratives**：
   - 從 Legacy 的 `anchor_statements` 和敘事模板提取
   - 轉換為現有系統的 narratives 結構
   - 確保符合語境純粹性要求

2. **recommendations**：
   - 從 Legacy 的 `interventions.json` 和 `guidanceActionTemplates` 提取
   - 轉換為現有系統的 recommendations 結構
   - 確保符合語境純粹性要求

3. **riskchains**：
   - 從 Legacy 的 `chains.json` 和 `consequence_chain_library` 提取
   - 轉換為現有系統的 riskchains 結構
   - 確保符合語境純粹性要求

4. **motherThemes 系統**：
   - 保留 Legacy 的 motherThemes 計算邏輯
   - 整合到現有系統的結果呈現中
   - 使用於選擇對應的建議和風險鏈

### 3.4 系統整合流程

1. **建立 Manifest**：
   - 為每個主題建立 manifest JSON 檔案
   - 指向所有相關的資料檔案

2. **編譯 Facet**：
   - 使用 `compile_domain.py` 編譯每個 Facet
   - 驗證編譯結果符合 schema

3. **測試計算**：
   - 使用 `score_facet.py` 測試分數計算
   - 驗證計算結果正確

4. **測試整合**：
   - 測試完整的整合流程
   - 驗證所有功能正常

### 3.5 測試驗證流程

1. **結構驗證**：
   - 驗證所有 JSON 檔案符合 schema
   - 驗證所有檔案路徑正確

2. **計算驗證**：
   - 驗證分數計算正確
   - 驗證 band 判斷正確
   - 驗證雙層計算結果一致

3. **語境驗證**：
   - 驗證所有文字符合語境純粹性要求
   - 驗證通過禁用詞檢查
   - 驗證符合「去問卷化」原則

4. **整合驗證**：
   - 驗證編譯流程正常
   - 驗證所有主題都能正常編譯和計算
   - 驗證結果呈現正確

---

## 四、其他重要參考資料

### 4.1 設計原則

- **「去問卷化」原則**：`domain/knowledge_base/question_design_guidelines.v1.0.md`
- **語境純粹性要求**：`domain/knowledge_base/forbidden_terms.v1.0.json`
- **玄學詞彙庫**：`domain/knowledge_base/vocabulary_metaphysical.v1.0.json`
- **心理學映射**：`domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json`

### 4.2 系統架構要求

- **UI 設計要求**：`P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`
- **世界觀架構要求**：`P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`
- **設計方向摘要**：`DESIGN_DIRECTION_SUMMARY_2026-01-11.md`

### 4.3 任務包

- **任務包**：`P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_LEGACY_INTEGRATION_TASK_PACKET.md`
- **審核報告**：`P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_ADVISORY_FEEDBACK_AUDIT.md`

---

## 五、總結

本背景資料包提供了：

1. **Legacy 系統完整資料**：
   - 所有主題的完整列表和說明
   - 題目結構的完整說明
   - 計算系統的完整邏輯和程式碼
   - 結果呈現系統的完整結構和邏輯

2. **現有系統完整資料**：
   - 題目、計算、結果呈現的完整結構
   - 系統架構的完整說明

3. **整合要求與指引**：
   - 所有主題的整合計劃
   - 計算邏輯整合方案
   - 結果呈現整合方案
   - 系統整合流程
   - 測試驗證流程

**期望結果**：

顧問團應該能夠：
1. 理解所有 Legacy 系統的完整結構和內容
2. 理解現有系統的完整結構和要求
3. 完成所有 10 個主題的完整整合
4. 完成計算邏輯、結果呈現、系統整合等所有環節
5. 提供完整的整合方案和實作結果

---

**狀態**：COMPLETE BACKGROUND DATA PACKAGE  
**最後更新**：2026-01-11
