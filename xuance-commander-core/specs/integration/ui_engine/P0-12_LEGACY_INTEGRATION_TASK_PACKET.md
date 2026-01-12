# P0-12 Legacy 現代科學/心理學資料整合任務包

**建立日期**：2026-01-11  
**目的**：整合 Legacy 資料夾中的現代科學/心理學資料到現有系統  
**狀態**：待執行

---

## 一、任務目標

將 Legacy 資料夾中的現代科學/心理學相關資料整合到現有系統，包括：
1. 題目資料（題目內容、題目設計、題目風格、題型）
2. 分數計算方式（權重計算、量表處理）
3. 結果呈現邏輯（建議生成、敘事模板）

**⚠️ 重要原則**：
- **保留所有可用資訊**：過去系統的題目設計、分數計算方式、加權計分方式等，理想情況是全部保留，但調整符合現在的需求，而不是全部刪掉
- **符合現有系統架構**：整合後必須符合現有系統的 UI 設計（八卦轉盤、五行羅盤等）、世界觀架構（五行、八卦、六十四卦、棄用姓名學等）
- **系統差異處理**：過去版本的系統計算方式、介面呈現方式、結果呈現方式跟現在都不一樣，需要詳細比對並調整

---

## 二、現有系統結構

### 2.1 資料位置

**Facet 資料夾**：`domain/facets/`
- 目前僅有 `income_expansion_pressure/hexagram_mapping.v1.0.json`（玄學相關）

**分散式結構**：
- `domain/questions/` - 題目資料（例如：`stress_recovery.questions.v1.0.json`）
- `domain/facets/` - 分數計算規則（例如：`stress_recovery.scoring.v1.0.json`）
- `domain/narratives/` - 敘事資料（例如：`stress_recovery.narr.v1.0.json`）
- `domain/recommendations/` - 建議資料（例如：`stress_recovery.reco.v1.0.json`）
- `domain/riskchains/` - 風險鏈資料（例如：`stress_recovery.risk.v1.0.json`）

**編譯後資料**：`domain/compiled/`
- 編譯後的 Facet 資料（供前端使用）

**引擎模組**：`engine/`
- `score_facet.py` - Facet 分數計算引擎
- `compile_domain.py` - Domain 編譯引擎

### 2.2 現有系統結構範例

**Questions 結構**（`domain/questions/stress_recovery.questions.v1.0.json`）：
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

**Scoring 結構**（`domain/facets/stress_recovery.scoring.v1.0.json`）：
```json
{
  "model": "weighted_sum",
  "inputs": [
    { "questionId": "sr_q1", "weight": 1.0, "direction": "higher_is_worse" }
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

**Compiled Facet Schema**（`schemas/compiled_facet.schema.json`）：
- 要求欄位：`domainVersion`, `facetId`, `questions`, `scoring`, `recommendations`, `narratives`, `riskchains`

### 2.3 設計原則

**「去問卷化」原則**：
- 避免滑桿、李克特量表與多選題
- 優先採用單選、直覺式決定
- 使用象徵化互動（符號、元素、狀態或情境）

**語境純粹性要求**：
- 不得出現任何心理學名詞
- 不得出現任何現代科學背景
- 僅使用玄學詞彙庫（`domain/knowledge_base/vocabulary_metaphysical.v1.0.json`）

**雙計算一致結果機制**：
- 科學系統和玄學系統都進行計算
- 玄學計算結果必須與科學計算結果一致
- 科學結果作為絕對驗證基準
- 最終呈現給使用者的是正確的科學結果，但包裝為計算的玄學結果

---

## 三、Legacy 資料結構

### 3.1 題目相關資料

**位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json` (78KB)
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json` (65KB)

**questionBank.v1.json 結構**：
```json
{
  "_schema": "items[]: {theme_id, theme_enLabel, theme_zhLabel, questions[]: {question_text, choices[], pattern_tags[], confidence_weight}}",
  "version": 1,
  "items": [
    {
      "theme_id": "chronic_depletion",
      "theme_enLabel": "Chronic Depletion",
      "theme_zhLabel": "慢性耗竭",
      "questions": [
        {
          "question_text": "在同時照顧年邁父母與未成年子女的高壓期，你每天醒來的第一個念頭是？",
          "choices": ["選項1", "選項2", "選項3", "選項4"],
          "pattern_tags": ["overextension", "body_signals", "routine"],
          "confidence_weight": 1.2,
          "choice_meta": [
            {
              "choice": "選項1",
              "behavior_facet": "withdraw_and_protect"
            }
          ]
        }
      ]
    }
  ]
}
```

**p1_question_blueprint_v1.json 結構**：
```json
{
  "meta": {
    "purpose": "blueprint only, not final wording",
    "totalThemes": 10,
    "questionsPerTheme": 7,
    "totalQuestions": 70
  },
  "themes": {
    "chronic_depletion": [
      {
        "theme_id": "chronic_depletion",
        "intent_label": "Intent 1",
        "question_text": "[Rough question text]",
        "choices": ["[Choice 1]", "[Choice 2]", "[Choice 3]", "[Choice 4]"],
        "pattern_tags": ["overextension", "recovery", "body_signals"],
        "confidence_weight": 1.2
      }
    ]
  }
}
```

### 3.2 分數計算相關資料

**位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/psych/scorer.js` (4.7KB)

**結構**：
- JavaScript 模組
- 使用 `patternToThemeMap` 和 `canonicalizeUserChoices`
- 計算 traits, axes, elements
- 輸出 psychometrics 結果

### 3.3 結果呈現相關資料

**位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js` (12KB)
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`

**結果模板檔案**：
- `anchor_statements.v1.json` (50KB) - 錨定語句模板
- `intervention_boundary_matrix.v1.json` - 介入邊界矩陣
- `consequence_chain_library.v1.json` - 後果鏈庫
- `readingOutputV2.js` - 結果輸出模板
- 其他相關檔案

---

## 四、結構比對分析

### 4.1 題目結構差異

| 項目 | 現有系統 | Legacy 系統 |
|------|----------|-------------|
| **結構類型** | Array of questions | Dict with themes → questions |
| **題目 ID** | `id` (例如：`sr_q1`) | 無明確 ID（使用 theme_id + index） |
| **題目文字** | `text` | `question_text` |
| **選項** | `scale` (Likert 量表) | `choices` (單選項陣列) |
| **題型** | `type` (例如：`likert_5`) | 無明確 type 欄位 |
| **主題分類** | 無（Facet 級別） | `theme_id`, `theme_enLabel`, `theme_zhLabel` |
| **模式標籤** | 無 | `pattern_tags` |
| **權重** | 無（在 scoring 中定義） | `confidence_weight` |
| **選項元資料** | 無 | `choice_meta` (behavior_facet) |

### 4.2 分數計算差異

| 項目 | 現有系統 | Legacy 系統 |
|------|----------|-------------|
| **語言** | Python (`score_facet.py`) | JavaScript (`scorer.js`) |
| **計算模型** | `weighted_sum` | 複雜的 traits/axes/elements 計算 |
| **輸入格式** | `questionId`, `weight`, `direction` | `pattern_tags`, `confidence_weight`, `weights` |
| **輸出格式** | `score`, `band`, `narrative`, `recommendations`, `riskchains` | `traits`, `axes`, `elements`, `archetype`, `motherThemes` |

#### 4.2.1 現有系統計算邏輯詳細說明

**檔案**：`engine/score_facet.py`

**計算步驟**：
1. 讀取 `compiled_facet.json` 和 `answers.json`
2. 從 `scoring.inputs` 取得每個題目的 `questionId`, `weight`, `direction`
3. 從 `answers` 取得每個題目的回答值（0-4，對應 Likert 量表）
4. 根據 `direction` 計算單題分數：
   - `higher_is_worse`: `score = v / 4.0`（將 0-4 正規化為 0-1）
   - `higher_is_worse_reversed`: `score = (4.0 - v) / 4.0`（反向計分）
5. 計算加權總分：`total += score * weight`, `total_w += weight`
6. 計算平均分：`avg = total / total_w`
7. 根據 `scoring.bands` 判斷 band（low/mid/high）
8. 輸出：`score`, `band`, `narrative`, `recommendations`, `riskchains`

**範例**：
```python
# 輸入
scoring = {
  "model": "weighted_sum",
  "inputs": [
    { "questionId": "sr_q1", "weight": 1.0, "direction": "higher_is_worse" }
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
answers = { "sr_q1": 3 }  # 使用者選擇第 3 個選項（0-4 範圍）

# 計算過程
score = 3 / 4.0 = 0.75
weighted_sum = 0.75 * 1.0 = 0.75
total_w = 1.0
avg = 0.75 / 1.0 = 0.75
band = "high"  # 0.75 在 [0.66, 1.01) 範圍內
```

#### 4.2.2 Legacy 系統計算邏輯詳細說明

**檔案**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/psych/scorer.js`

**計算步驟**：
1. 接收 `resonance` 物件（包含 `userChoices`, `axes`, `elements`）
2. 初始化空的 traits, axes, elements 物件
3. 從 `userChoices` 中提取 `pattern_tags`，透過 `patternToThemeMap` 映射到 `themeId` 和 `weight`
4. 累積 `motherThemes` 分數（基於 `pattern_tags` 和 `confidence_weight`）
5. 從 `userChoices` 中提取 `weights`（traits, axes, elements）
6. 計算 traits（6 個維度）：
   - `drive`, `control`, `stabilityNeed`, `sensitivity`, `riskAversion`, `innerTension`
   - 正規化公式：`(value + 0.5) / 1.2`，然後 clamp 到 [0, 1]
7. 計算 axes（5 個維度）：
   - `move`, `inward`, `heat`, `damp`, `boundary`
   - 正規化公式：`(value + 1) / 2.0`，然後 clamp 到 [0, 1]
8. 計算 elements（5 個元素）：
   - `wood`, `fire`, `earth`, `metal`, `water`
   - 正規化為總和為 1 的單位向量
9. 輸出：`traits`, `axes`, `elements`, `archetype.topElements`, `motherThemes`

**範例**：
```javascript
// 輸入
userChoices = [
  {
    pattern_tags: ["overextension", "body_signals"],
    confidence_weight: 1.2,
    weights: {
      traits: { drive: 2, control: 1 },
      axes: { move: 3, inward: 1 },
      elements: { wood: 2, fire: 1 }
    }
  }
]

// 計算過程
traits.drive = (2 + 0.5) / 1.2 = 2.08 → clamp01 = 1.0
axes.move = (3 + 1) / 2.0 = 2.0 → clamp01 = 1.0
elements = normalizeElementsToUnit({ wood: 2, fire: 1, earth: 0, metal: 0, water: 0 })
// → { wood: 0.67, fire: 0.33, earth: 0, metal: 0, water: 0 }
```

#### 4.2.3 計算邏輯比對與轉換挑戰

**主要差異**：

1. **計算維度**：
   - 現有系統：單一分數（0-1）→ band（low/mid/high）
   - Legacy 系統：多維度分數（traits, axes, elements）→ 複雜輸出

2. **輸入來源**：
   - 現有系統：直接使用題目回答值（0-4）
   - Legacy 系統：使用 `pattern_tags` 映射和 `weights` 物件

3. **正規化方式**：
   - 現有系統：簡單的除以 4.0（Likert 量表正規化）
   - Legacy 系統：複雜的正規化公式（加偏移量、除以 SCALE、clamp）

4. **輸出結構**：
   - 現有系統：單一分數 + band + 對應的 narrative/recommendations/riskchains
   - Legacy 系統：多維度分數 + archetype + motherThemes

**轉換挑戰**：
- Legacy 的計算邏輯比現有系統複雜得多
- Legacy 使用 `pattern_tags` 系統，現有系統沒有
- Legacy 計算多維度分數，現有系統計算單一分數
- 需要決定是否保留 Legacy 的計算邏輯，或簡化為現有系統的 `weighted_sum` 模型

### 4.3 結果呈現差異

| 項目 | 現有系統 | Legacy 系統 |
|------|----------|-------------|
| **結構** | `narratives`, `recommendations`, `riskchains` | `guidance`, `interventions`, `chains`, `warnings` |
| **語言** | JSON | JavaScript 模組 |
| **模板系統** | 無（直接使用 JSON） | 使用模板系統（`anchor_statements`, `intervention_boundary_matrix` 等） |

---

## 五、整合挑戰

### 5.1 結構轉換挑戰

1. **題目結構轉換**：
   - Legacy 使用主題分類（themes），現有系統使用 Facet 級別
   - Legacy 使用 `choices` 陣列，現有系統使用 `scale`（Likert 量表）
   - Legacy 有 `pattern_tags` 和 `choice_meta`，現有系統沒有
   - 需要決定如何處理主題分類

2. **分數計算轉換**：
   - Legacy 使用複雜的 traits/axes/elements 計算
   - 現有系統使用簡單的 `weighted_sum` 模型
   - 需要決定如何對應 Legacy 的計算邏輯到現有系統

3. **結果呈現轉換**：
   - Legacy 使用模板系統，現有系統直接使用 JSON
   - 需要決定如何轉換模板到 JSON 格式

### 5.2 設計原則挑戰

1. **「去問卷化」原則**：
   - Legacy 題目可能使用傳統問卷形式
   - 需要檢查並轉換為「儀式感」互動

2. **語境純粹性要求**：
   - Legacy 題目可能包含心理學名詞
   - 需要檢查並過濾不符合語境的內容
   - 需要參考 `domain/knowledge_base/forbidden_terms.v1.0.json`

3. **玄學語境要求**：
   - Legacy 題目使用現代科學語境
   - 需要轉換為玄學語境（但這可能超出資料整合的範圍）

---

## 六、整合策略建議

### 6.1 階段性整合

**階段一：資料提取與分析**
1. 提取 Legacy 題目資料
2. 分析結構差異
3. 識別可用的內容
4. 識別需要過濾的內容（心理學名詞等）

**階段二：結構轉換**
1. 設計轉換規則
2. 轉換題目結構
3. 轉換分數計算邏輯（如果需要）
4. 轉換結果呈現結構

**階段三：設計原則檢查**
1. 檢查「去問卷化」原則
2. 檢查語境純粹性
3. 過濾不符合的內容

**階段四：整合測試**
1. 整合到現有系統
2. 測試編譯流程
3. 測試分數計算
4. 測試結果呈現

### 6.2 建議的轉換規則（初步）

**題目結構轉換**：
```
Legacy question_text → 現有系統 text
Legacy choices → 現有系統 scale（需要轉換為 Likert 量表格式）
Legacy theme_id → 現有系統 facetId（需要在 Facet 層級處理）
Legacy pattern_tags → 可能需要保留在內部（不暴露給前端）
Legacy confidence_weight → 現有系統 scoring.inputs.weight
```

**分數計算轉換**：
```
需要評估 Legacy 的計算邏輯是否值得保留
如果保留，需要轉換為現有系統的 weighted_sum 模型
或者擴展現有系統以支持更複雜的計算模型
```

**結果呈現轉換**：
```
Legacy guidance → 現有系統 recommendations
Legacy interventions → 現有系統 recommendations（可能需要合併）
Legacy chains → 現有系統 riskchains
Legacy warnings → 可能需要添加到現有系統
```

---

## 七、執行步驟

### 7.1 前置檢查

1. ✅ 確認現有系統結構
2. ✅ 確認 Legacy 資料位置
3. ✅ 進行結構比對分析
4. ⏳ 檢查 Legacy 題目是否包含心理學名詞
5. ⏳ 檢查 Legacy 題目是否符合「去問卷化」原則

### 7.2 整合執行

1. ⏳ 提取 Legacy 題目資料
2. ⏳ 過濾不符合設計原則的內容
3. ⏳ 轉換結構到現有系統格式
4. ⏳ 整合到現有系統
5. ⏳ 測試編譯和計算流程

---

## 八、相關檔案位置

### 8.1 現有系統檔案

- `domain/questions/stress_recovery.questions.v1.0.json` - 現有題目結構範例
- `domain/facets/stress_recovery.scoring.v1.0.json` - 現有分數計算範例
- `domain/narratives/stress_recovery.narr.v1.0.json` - 現有敘事範例
- `domain/recommendations/stress_recovery.reco.v1.0.json` - 現有建議範例
- `domain/compiled/stress_recovery.compiled.v1.0.json` - 編譯後範例
- `engine/score_facet.py` - 分數計算引擎
- `engine/compile_domain.py` - 編譯引擎
- `schemas/compiled_facet.schema.json` - 編譯後 Facet Schema

### 8.2 Legacy 檔案

- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json` - Legacy 題庫
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json` - Legacy 題目藍圖
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/psych/scorer.js` - Legacy 分數計算
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js` - Legacy 結果呈現
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/` - Legacy 結果模板

### 8.3 設計原則參考

- `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞列表
- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南
- `P0-11_METAPHYSICAL_ENGINE_COMPLETION/` - 玄學引擎完成相關文件

---

## 九、注意事項

### 9.1 設計原則遵守

1. **「去問卷化」原則**：
   - 必須檢查 Legacy 題目是否符合「儀式感」互動
   - 必須轉換傳統問卷形式為「單選、直覺式決定」

2. **語境純粹性要求**：
   - 必須檢查 Legacy 題目是否包含心理學名詞
   - 必須過濾不符合語境的內容
   - 必須參考 `forbidden_terms.v1.0.json`

3. **玄學語境要求**：
   - Legacy 題目使用現代科學語境，需要考慮是否需要轉換
   - 如果需要轉換，可能需要額外的任務

### 9.2 技術限制

1. **結構差異**：
   - Legacy 和現有系統的結構差異較大
   - 需要詳細的轉換規則

2. **語言差異**：
   - Legacy 使用 JavaScript，現有系統使用 Python/JSON
   - 需要語言轉換（如果保留計算邏輯）

3. **資料量**：
   - Legacy 題庫 78KB，藍圖 65KB
   - 需要批量處理

---

## 十、預期產出

### 10.1 整合後的資料

1. **題目資料**：
   - 轉換後的題目 JSON 檔案
   - 符合現有系統結構
   - 符合設計原則

2. **分數計算規則**：
   - 轉換後的分數計算 JSON 檔案（如果需要）
   - 或擴展現有系統以支持更複雜的計算模型

3. **結果呈現資料**：
   - 轉換後的敘事、建議、風險鏈 JSON 檔案
   - 符合現有系統結構

### 10.2 文件

1. **整合報告**：
   - 記錄整合過程
   - 記錄轉換規則
   - 記錄設計原則檢查結果

2. **結構對應表**：
   - Legacy 欄位 → 現有系統欄位
   - 轉換規則說明

---

---

## 十一、現有系統架構要求（必須遵守）

### 11.1 UI 設計要求

**參考文件**：
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文件
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

**4 階段 UI 流程**：
- **Stage 1（The Wheel）**：UI 隱喻：先天八卦盤（Primordial Bagua）。功能：Facet Triage（題目分類）
- **Stage 2（Radial Compass）**：UI 隱喻：五行羅盤（Elemental Compass）。功能：Symbol Selection（符號選擇）
- **Stage 3（Projection）**：UI 隱喻：鑄爻（Casting Lines）。功能：Deep Profiling（深度剖析）
- **Stage 4（Results）**：UI 隱喻：卦象顯影（Hexagram Manifestation）。輸出：L1-L4 分層架構

**整合要求**：
- 題目設計必須符合 4 階段 UI 流程
- 題目選項必須能夠映射到八卦/五行系統
- 結果呈現必須符合 L1-L4 分層架構

### 11.2 世界觀架構要求

**參考文件**：
- `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md` - 元素選擇決策
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣系統實現

**核心系統**：易經矩陣系統（I Ching Matrix System）

**結構層（Structure Layer）**：
- **八卦（Eight Trigrams）**：`domain/knowledge_base/bagua_8_trigrams.v1.0.json`
- **六十四卦（64 Hexagrams）**：`domain/knowledge_base/hexagram_64_full.v1.0.json`

**動態層（Dynamic Layer）**：
- **五行（Five Elements）**：`domain/knowledge_base/wuxing_5_elements.v1.0.json`
- **五行生剋關係**：generates, controlled_by, controls, generated_by

**計算層（Computation Layer）**：
- **雙軌機制（Dual-Track Mechanism）**：
  - Track A（Root / Nature）：從 DOB 計算本命元素（Root Element）
  - Track B（Flow / Nurture）：從 Stage 1-3 互動計算卦象（Hexagram）
  - Collision：`Result = f(Root, Flow)` 計算衝突
- **引擎模組**：
  - `engine/root_element_mapper.py` - Root Element 計算
  - `engine/hexagram_deriver.py` - Hexagram 推導
  - `engine/collision_calculator.py` - Collision 計算

**⚠️ 重要限制**：
- **棄用姓名學**：系統不使用姓名學計算，僅使用 DOB（Date of Birth）計算 Root Element
- **棄用八字完整系統**：系統使用簡化的年份尾數法計算 Root Element，不使用完整的八字系統（年、月、日、時）

**整合要求**：
- 題目設計必須能夠映射到八卦/五行系統
- 分數計算結果必須能夠對應到六十四卦
- 結果呈現必須使用玄學詞彙（參考 `domain/knowledge_base/vocabulary_metaphysical.v1.0.json`）
- 不得使用心理學名詞（參考 `domain/knowledge_base/forbidden_terms.v1.0.json`）

### 11.3 設計原則要求

**「去問卷化」原則**：
- 避免滑桿、李克特量表與多選題
- 優先採用單選、直覺式決定
- 使用象徵化互動（符號、元素、狀態或情境）
- 使用者互動體驗應被感知為「選象、取兆、應機」，而非填寫問卷

**語境純粹性要求**：
- 不得出現任何心理學名詞
- 不得出現任何現代科學背景
- 僅使用玄學詞彙庫（`domain/knowledge_base/vocabulary_metaphysical.v1.0.json`）
- 必須通過禁用詞檢查（`domain/knowledge_base/forbidden_terms.v1.0.json`）

**雙計算一致結果機制**：
- 科學系統和玄學系統都進行計算
- 玄學計算結果必須與科學計算結果一致
- 科學結果作為絕對驗證基準
- 最終呈現給使用者的是正確的科學結果，但包裝為計算的玄學結果

---

## 十二、Legacy 系統歷史與版本資訊

### 12.1 題目設計版本歷史

**重要資訊**：過去系統的題目設計有四個版本，最後一個版本有很詳細複雜的分數計算方式和加權計分方式。

**已知資訊**：
- Legacy 題庫（`questionBank.v1.json`）是最後一個版本的題目設計
- 題目藍圖（`p1_question_blueprint_v1.json`）是題目設計的藍圖文件
- 分數計算（`scorer.js`）包含複雜的加權計分方式

**整合要求**：
- **保留所有可用資訊**：理想情況是全部保留過去版本的題目設計和分數計算方式
- **調整符合現有需求**：調整以符合現有系統的架構要求，而不是全部刪掉
- **詳細記錄版本歷史**：在整合過程中，記錄哪些內容來自哪個版本，以便後續參考

### 12.2 系統差異說明

**過去版本 vs 現有系統**：

| 項目 | 過去版本 | 現有系統 |
|------|----------|----------|
| **計算方式** | JavaScript 模組（`scorer.js`），使用 traits/axes/elements 多維度計算 | Python 引擎（`score_facet.py`），使用 weighted_sum 單一分數計算 |
| **介面呈現** | 未知（需要進一步調查） | 4 階段 UI 流程（八卦轉盤、五行羅盤、鑄爻、卦象顯影） |
| **結果呈現** | JavaScript 模組（`buildGuidance.js`），使用模板系統 | JSON 結構（narratives, recommendations, riskchains），使用 L1-L4 分層架構 |
| **題目設計** | 主題分類（themes），使用 choices 陣列，有 pattern_tags 和 choice_meta | Facet 級別，使用 scale（Likert 量表），無主題分類 |
| **分數計算** | 複雜的 traits/axes/elements 計算，使用 pattern_tags 映射，有 confidence_weight | 簡單的 weighted_sum 計算，使用 questionId/weight/direction |
| **玄學系統** | 可能使用姓名學或其他系統（需要確認） | 易經矩陣系統（八卦、六十四卦、五行），棄用姓名學 |

**整合挑戰**：
- 過去版本的計算方式比現有系統複雜，需要決定如何保留
- 過去版本的題目設計使用主題分類，現有系統使用 Facet 級別
- 過去版本可能使用不同的玄學系統，現有系統使用易經矩陣系統
- 需要詳細比對兩種系統的差異，並決定如何整合

### 12.3 保留與調整原則

**核心原則**：
- **保留所有可用資訊**：不要浪費過去系統所保留的資訊，包括題目設計、分數計算方式、加權計分方式等
- **調整符合現有需求**：調整以符合現有系統的架構要求（UI 設計、世界觀架構、設計原則等）
- **不全部刪掉**：理想情況是全部保留，但調整符合現在的需求，而不是全部刪掉

**具體要求**：
1. **題目設計**：
   - 保留過去版本的題目內容和設計思路
   - 調整結構以符合現有系統的 Facet 架構
   - 調整選項格式以符合現有系統的 scale 格式（如果需要）
   - 調整題目文字以符合「去問卷化」原則和語境純粹性要求

2. **分數計算**：
   - 保留過去版本的複雜計算邏輯（如果適用）
   - 調整以符合現有系統的計算模型（或擴展現有系統以支持更複雜的模型）
   - 確保計算結果能夠映射到現有系統的玄學系統（六十四卦等）

3. **結果呈現**：
   - 保留過去版本的建議和敘事內容（如果適用）
   - 調整結構以符合現有系統的 L1-L4 分層架構
   - 調整文字以符合語境純粹性要求（使用玄學詞彙，禁止心理學名詞）

---

**狀態**：待執行  
**最後更新**：2026-01-11
