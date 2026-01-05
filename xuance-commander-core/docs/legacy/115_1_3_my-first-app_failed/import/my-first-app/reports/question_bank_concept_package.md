# 題庫分析功能概念包（給 GPT → Gemini 資料搜集指令）

## A) 盤點：目前網頁內「題庫分析功能」有哪些？

### 1) 測驗流程（01/02/03/04/05）各階段做什麼、輸入輸出是什麼

- **01_Origin（起點）**：使用者輸入基本資訊（出生日期等），輸出 `birthData`
- **02_Input（輸入）**：處理出生資訊，輸出 `birthData` 給下一階段
- **03_Resonance（共振）**：
  - 輸入：`birthData`（來自 02）
  - 流程：四回合選擇（Round1 選領域、Round2/3 選細項、Round4 錨點）
  - 若啟用題庫模式（`VITE_USE_QUESTION_BANK=true`）：顯示 6 題隨機題目（從 `questionBank.v1.json` 選取）
  - 輸出：`resonance` 物件，包含 `domain`, `domainLabel`, `elements`, `axes`, `userChoices`（題庫回答或舊流程選擇）
- **04_Computation（推演）**：顯示載入狀態，等待 `consultTheOracle` 完成
- **05_Dashboard（結果）**：顯示最終結果，包含錨點語句、母題命中、五行分布、敘事等

### 2) 題庫資料來源（JSON 檔）在哪裡、檔名、載入方式

- **主要題庫**：`src/core/ontology/questionBank.v1.json`
  - Schema: `items[]: {theme_id, theme_enLabel, theme_zhLabel, questions[]: {question_text, choices[], pattern_tags[], confidence_weight, choice_meta[]}}`
  - 載入方式：`ontologyLoader.js` 的 `getQuestionsByThemeId()` / `getRandomQuestions()`
  
- **母題定義**：`src/core/ontology/motherThemes.v1.json`
  - Schema: `items[]: {id, enLabel, zhLabel, description, synonyms?}`
  - 載入方式：`ontologyLoader.js` 的 `getAllThemes()`

- **行為面向詞彙**：`src/core/ontology/behaviorFacetLexicon.v1.json`
  - 用途：定義 `behavior_facet` 與禁止用語清單
  - 載入方式：`ontologyLoader.js` 的驗證邏輯

- **舊版題庫（legacy）**：`src/core/psych/questionBank/money.js`, `relationship.js`
  - 用途：舊版計分系統（目前 scorer.js 仍會讀取，但主要用 `questionBank.v1.json`）
  - 載入方式：`questionBank/index.js` 的 `getQuestions()`

- **模式到母題映射**：`src/core/ontology/patternToThemeMap.v1.js`
  - 用途：將 `pattern_tags` 映射到 `mother_theme` ID
  - 載入方式：`scorer.js` 的 `accumulateMotherThemesFromQuestions()`

### 3) Scoring/計分輸入是什麼格式 → 產出什麼

**輸入格式**（來自 03_Resonance）：
- `resonance.userChoices`: Array<{ type: 'question', themeId, questionText, choiceText, pattern_tags[], confidence_weight, behavior_facet, label }>
- `resonance.domain`: string（例如 'money', 'relationship'）
- `resonance.axes`: { move, inward, heat, damp, boundary }（可選，作為 baseline）
- `resonance.elements`: { wood, fire, earth, metal, water }（可選，作為 baseline）

**產出格式**（`psych` 物件）：
- `input`: { domain, domainLabel, r2Label, r3Labels, userChoices }
- `traits`: { drive, control, stabilityNeed, sensitivity, riskAversion, innerTension }（0~1 正規化）
- `axes`: { move, inward, heat, damp, boundary }（0~1 正規化）
- `elements`: { wood, fire, earth, metal, water }（unit，總和=1）
- `archetype`: { topElements: [string, string] }
- `motherThemes`: { hits: Array<{ themeId, score, source: 'question' }> }

**計分邏輯**：
- 從 `questionBank.v1.json` 的 `choice_meta` 提取 `behavior_facet`
- 從 `pattern_tags` 透過 `patternToThemeMap.v1.js` 映射到 `mother_theme`
- 累加 `confidence_weight` 作為母題分數
- 若舊版題庫有 `weights` 欄位，直接累加到 traits/axes/elements

### 4) 結果輸出目前用到哪些 content/resultTemplates

- **anchor_statements.v1.json**：錨點語句（v1.1，50 條）
  - Schema: `items[]: {id, label, mother_theme, state_tags[], confidence, uncertainty_note, do_not_say[], safe_tone_template: {acknowledge, guide, action}, variants[], why_it_hits}`
  - 用途：結果頁第一屏顯示的「命中感」語句

- **attribution_error_matrix.v1.json**：歸因錯誤矩陣
  - 用途：識別和修正結果輸出中的歸因偏差（目前未直接接入，預留）

- **intervention_boundary_matrix.v1.json**：介入邊界矩陣
  - 用途：定義建議的適用範圍和限制（目前未直接接入，預留）

- **consequence_chain_library.v1.json**：後果連鎖庫
  - 用途：描述行為模式的可能發展路徑（目前未直接接入，預留）

- **five_element_mapping.v1.json**：五行映射
  - 用途：將五行概念映射到行為模式和建議（目前未直接接入，預留）

### 5) Telemetry 記錄了哪些事件，資料落點在哪

**事件類型**（`src/core/telemetry/telemetryClient.js`）：
- `anchor_shown`: { anchor_id, mother_theme, tags_count, variant_key }
- `anchor_dwell_ms`: { anchor_id, dwell_ms, milestone: '2s'|'5s'|'10s'|'left' }
- `qb_choice`: { questionId, themeId, behaviorFacet, dwellMs, changeCount, hesitant }
- `qb_session`: { stage, mode, totalQuestions, hesitantCount, avgDwellMs }
- `stage_view`: { stage: 0|1|2|3|4 }
- `error`: { message, stack, ...context }

**資料落點**：
- 開發環境：`_telemetry.log`（專案根目錄）
- 生產環境：透過 `VITE_TELEMETRY_ENDPOINT` 發送到後端
- 分析腳本：`scripts/analyticsReport.mjs` 讀取 `_telemetry.log` 產生報告

---

## B) 驗證：目前「題庫分析」能否在本機跑通？

**驗證結果**：✅ PASS

- `npm run build`: ✅ PASS (685ms)
- `npm run dev`: 未測試（但 build 通過表示基本結構正確）

**潛在問題**（僅警告，不影響執行）：
1. `stateTagExtractor.js` 同時被動態和靜態導入（不影響功能，僅為優化建議）
2. 題庫模式需設定 `VITE_USE_QUESTION_BANK=true` 才會啟用（預設為舊流程）

---

## C) 產出：給 GPT 的「資料概念包」

### 【1. 現行資料結構總覽】

**Ontology/題庫**：
- `src/core/ontology/questionBank.v1.json`：主要題庫，依 `theme_id` 分組，每組包含多個問題
- `src/core/psych/questionBank/money.js`, `relationship.js`：舊版題庫（legacy，仍被 scorer 讀取）

**MotherThemes**：
- `src/core/ontology/motherThemes.v1.json`：母題定義（10 個：chronic_depletion, loss_of_agency, hyper_responsibility, fear_based_stability, identity_diffusion, suppressed_needs, chronic_alertness, unprocessed_loss, meaning_vacuum, self_erosion）

**Result Templates**：
- `src/core/content/resultTemplates/anchor_statements.v1.json`：錨點語句（v1.1，50 條）
- `src/core/content/resultTemplates/attribution_error_matrix.v1.json`：歸因錯誤矩陣（3 條）
- `src/core/content/resultTemplates/intervention_boundary_matrix.v1.json`：介入邊界矩陣（3 條）
- `src/core/content/resultTemplates/consequence_chain_library.v1.json`：後果連鎖庫（3 條）
- `src/core/content/resultTemplates/five_element_mapping.v1.json`：五行映射（5 條）

**Anchor**：
- 位置：`src/core/content/resultTemplates/anchor_statements.v1.json`
- Schema：
```json
{
  "meta": { "version": "1.1", "purpose": "...", "note": "Frozen – do not rewrite, only extend" },
  "items": [{
    "id": "ANCHOR_*",
    "label": "中文標籤",
    "mother_theme": "chronic_depletion|avoidance_stagnation|attachment_insecurity|...",
    "state_tags": ["high_arousal", "over_control", ...],
    "confidence": "high|medium-high|medium|low",
    "uncertainty_note": "一句話說明可能不準的原因",
    "do_not_say": ["禁止用語1", "禁止用語2", ...],
    "safe_tone_template": {
      "acknowledge": "錨點文字",
      "guide": "",
      "action": ""
    },
    "variants": ["變體句1", "變體句2", ...],
    "why_it_hits": "心理學解碼（僅後台）"
  }]
}
```

**Telemetry**：
- 位置：`_telemetry.log`（開發環境）或後端 endpoint（生產環境）
- Schema：每行一個 JSON 物件，格式 `{ kind: 'event'|'error', sessionId, ts, event: 'anchor_shown'|'qb_choice'|..., ...payload }`

---

### 【2. 題庫最小可行 schema（以你目前專案為準）】

**questionBank.v1.json 的 question item schema**：
```json
{
  "_schema": "items[]: {theme_id, theme_enLabel, theme_zhLabel, questions[]: {...}}",
  "version": 1,
  "items": [{
    "theme_id": "chronic_depletion",
    "theme_enLabel": "Chronic Depletion",
    "theme_zhLabel": "長期耗竭",
    "questions": [{
      "question_text": "When several people need you at once late in the day, how do you usually handle your own rest or recovery?",
      "choices": [
        "Push through and rest only after everything is done, even if it is very late",
        "Promise yourself rest but keep saying yes until you are drained",
        "Take short breaks but feel guilty stepping away",
        "Protect a set stop time and accept some things may wait"
      ],
      "pattern_tags": ["overextension", "boundaries", "recovery"],
      "confidence_weight": 1,
      "choice_meta": [{
        "choice": "Push through and rest only after everything is done, even if it is very late",
        "behavior_facet": "push_through"
      }, {
        "choice": "Promise yourself rest but keep saying yes until you are drained",
        "behavior_facet": "follow_momentum"
      }, {
        "choice": "Take short breaks but feel guilty stepping away",
        "behavior_facet": "avoid_conflict"
      }, {
        "choice": "Protect a set stop time and accept some things may wait",
        "behavior_facet": "withdraw_and_protect"
      }]
    }]
  }]
}
```

**必填欄位**：
- `theme_id`: string（必須對應到 `motherThemes.v1.json` 的 `id`）
- `theme_enLabel`: string
- `theme_zhLabel`: string
- `questions[].question_text`: string
- `questions[].choices`: string[]（至少 2 個選項）
- `questions[].choice_meta[]`: Array<{ choice: string, behavior_facet: string }>（每個 choice 都要有對應的 behavior_facet）

**可選欄位**：
- `questions[].pattern_tags`: string[]（用於映射到 mother_theme）
- `questions[].confidence_weight`: number（預設 1）

**motherTheme schema**（`motherThemes.v1.json`）：
```json
{
  "version": 1,
  "items": [{
    "id": "chronic_depletion",
    "enLabel": "Chronic Depletion",
    "zhLabel": "長期耗竭",
    "description": "A pattern of prolonged physical, mental, or emotional exhaustion...",
    "synonyms": []
  }]
}
```

**scoring 需要的鍵**：
- `choice_meta[].behavior_facet`: string（對應到 `behaviorFacetLexicon.v1.json`）
- `pattern_tags[]`: string[]（對應到 `patternToThemeMap.v1.js` 的 key）
- `confidence_weight`: number（用於加權母題分數）

**舊版題庫（legacy）的 weights 格式**（`questionBank/money.js`）：
```javascript
{
  choices: [{
    label: "選項文字",
    tag: "簡短標籤",
    weights: {
      traits: { riskAversion: +0.2, control: +0.1, ... },
      axes: { move: +0.2, inward: +0.1, ... },
      elements: { wood: +0.1, fire: -0.05, ... }
    }
  }]
}
```

---

### 【3. 03 Resonance（四回合）目前是怎麼決策的？】

**Round1 選「領域」**：
- 來源：`choiceEngine.js` 的 `getDomainAnchors()`（固定清單）
- 選項：money, relationship, career, family, health, self（study, social 目前 disabled）
- 決策：使用者點選，無加權邏輯

**Round2/3 的加權/細分依據**：
- 來源：`ContentDB`（`src/core/content/ContentDB_*.js`）
- Round2：`getRoundOptions(domainKey, 2)` 回傳 `db.round2[]`
- Round3：`getRoundOptions(domainKey, 3)` 回傳 `db.round3[]`
- 加權：選項的 `weights` 欄位（traits/axes/elements）累加到 `elementVector` 和 `axisVector`
- 細分：無 state_tags 或 mother_theme 邏輯，純粹依 domain 決定選項

**Round4（錨點階段）**：
- 用途：目前為 filler，使用者選 2 個錨點後進入推演
- 決策：無加權，純 UI 選擇

**題庫模式（若啟用）**：
- 取代 Round1-3，直接顯示 6 題隨機題目
- 題目來源：`getRandomQuestions({ themeIds: [前3個母題], limit: 6 })`
- 母題選擇：從 `getAllThemes()` 取前 3 個

---

### 【4. 你建議 Gemini 從 70 份文件抽取哪些欄位，才能無縫塞進我們現有 schema？】

**必抽（沒有就不能建題庫）**：
1. **問題文字** → `questionBank.v1.json` / `questions[].question_text`
2. **選項文字**（至少 2 個） → `questionBank.v1.json` / `questions[].choices[]`
3. **母題 ID** → `questionBank.v1.json` / `items[].theme_id`（必須對應到 `motherThemes.v1.json` 的 `id`）
4. **母題英文標籤** → `questionBank.v1.json` / `items[].theme_enLabel`
5. **母題中文標籤** → `questionBank.v1.json` / `items[].theme_zhLabel`
6. **行為面向**（每個選項一個） → `questionBank.v1.json` / `questions[].choice_meta[].behavior_facet`

**強烈建議抽（有就大幅提升命中）**：
7. **模式標籤** → `questionBank.v1.json` / `questions[].pattern_tags[]`（用於映射到母題）
8. **信心權重** → `questionBank.v1.json` / `questions[].confidence_weight`（預設 1）
9. **母題描述** → `motherThemes.v1.json` / `items[].description`（用於理解母題）
10. **母題同義詞** → `motherThemes.v1.json` / `items[].synonyms[]`（用於擴展匹配）

**可選（後期優化用）**：
11. **選項標籤**（簡短） → 舊版題庫的 `choices[].tag`（用於「路徑回聲」顯示）
12. **加權值**（traits/axes/elements） → 舊版題庫的 `choices[].weights`（若需精細計分）
13. **年齡區間** → 舊版題庫的 `ageBand`（目前未使用，預留）
14. **階段標記** → 舊版題庫的 `stage: 'r1'|'r2'|'r3'`（目前未使用，預留）

**映射關係**：
- `pattern_tags` → 需對應到 `patternToThemeMap.v1.js` 的 key
- `behavior_facet` → 需對應到 `behaviorFacetLexicon.v1.json` 的定義
- `theme_id` → 必須是 `motherThemes.v1.json` 中已存在的 `id`

---

### 【5. 風險清單（只列最致命 5 條）】

1. **theme_id 不匹配**：若抽取的 `theme_id` 不在 `motherThemes.v1.json` 中，題庫無法正確映射，scoring 會失效
   - 影響：題庫無法載入 / scoring 失準

2. **choice_meta 不完整**：若某個 choice 沒有對應的 `behavior_facet`，scorer 無法正確計分
   - 影響：scoring 失準

3. **pattern_tags 未映射**：若 `pattern_tags` 不在 `patternToThemeMap.v1.js` 中，無法累加母題分數
   - 影響：母題命中率降低

4. **choices 數量不足**：若某題只有 1 個選項或超過 4 個，UI 顯示可能異常
   - 影響：03 顯示不合理

5. **禁止用語未過濾**：若選項文字包含 `behaviorFacetLexicon.v1.json` 的 `banned_terms`，會被驗證邏輯標記（但不會阻止載入）
   - 影響：違反 Frozen 規則（非臨床語言）

---

**補充說明**：
- 所有 JSON 檔案都有 `"note": "Frozen – do not edit, only extend"` 標記
- 題庫驗證邏輯在 `ontologyLoader.js` 的 `validateQuestionBankPhrasing()`
- 禁止用語檢查會警告但不會阻止執行（除非 `VITE_STRICT_ONTLOGY_VALIDATION=true`）



















