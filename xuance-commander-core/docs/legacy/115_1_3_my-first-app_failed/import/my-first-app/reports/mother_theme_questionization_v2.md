# 母題出題化重構概念包 v2

## A) motherThemes 現況

### 母題列表（src/core/ontology/motherThemes.v1.json）

| ID | 英文標籤 | 中文標籤 | 描述 |
|---|---|---|---|
| chronic_depletion | Chronic Depletion | 長期耗竭 | A pattern of prolonged physical, mental, or emotional exhaustion caused by overextension, pressure, or lack of recovery. |
| loss_of_agency | Loss of Agency | 主控感流失 | Feeling unable to influence one's life direction, decisions, or outcomes despite effort. |
| hyper_responsibility | Hyper-Responsibility | 過度承擔 | Taking excessive responsibility for others, systems, or outcomes at the cost of self-needs. |
| fear_based_stability | Fear-Based Stability | 恐懼型求穩 | Avoiding change or risk primarily due to fear of loss, failure, or collapse. |
| identity_diffusion | Identity Diffusion | 自我模糊 | Unclear sense of self, values, or direction, often shaped by external expectations. |
| suppressed_needs | Suppressed Needs | 需求壓抑 | Habitually minimizing or ignoring personal needs to maintain harmony or function. |
| chronic_alertness | Chronic Alertness | 長期警戒 | Persistent tension or vigilance even when no immediate threat is present. |
| unprocessed_loss | Unprocessed Loss | 未處理的失落 | Past losses or endings that continue to affect present behavior or emotions. |
| meaning_vacuum | Meaning Vacuum | 意義真空 | A sense that life actions lack purpose or internal justification. |
| self_erosion | Self-Erosion | 自我耗損 | Gradual loss of vitality, confidence, or identity through repeated compromise. |

### 每個母題目前題目數量（從 questionBank.v1.json 統計）

| 母題 ID | 題目數量 |
|---|---|
| chronic_depletion | 3 |
| loss_of_agency | 3 |
| hyper_responsibility | 3 |
| fear_based_stability | 3 |
| identity_diffusion | 3 |
| suppressed_needs | 3 |
| chronic_alertness | 3 |
| unprocessed_loss | 3 |
| meaning_vacuum | 3 |
| self_erosion | 3 |
| **總計** | **30** |

**備註**：目前每個母題都有 3 題，分布均勻。若需擴充，建議每個母題至少補到 10 題以上。

---

## B) pattern tags 能用哪些

### pattern tags 完整列表（src/core/ontology/patternToThemeMap.v1.js）

| Pattern Tag | 對應 Mother Theme ID | 權重 |
|---|---|---|
| overextension | chronic_depletion | 1.0 |
| recovery | chronic_depletion | 0.8 |
| body_signals | chronic_depletion | 0.8 |
| self-prioritization | chronic_depletion | 0.6 |
| pace | chronic_depletion | 0.6 |
| routine | chronic_depletion | 0.6 |
| planning | chronic_depletion | 0.6 |
| boundaries | suppressed_needs | 0.7 |
| voice | loss_of_agency | 1.0 |
| decision-making | loss_of_agency | 0.9 |
| negotiation | loss_of_agency | 0.8 |
| adaptation | loss_of_agency | 0.6 |
| initiative | loss_of_agency | 0.6 |
| change_readiness | loss_of_agency | 0.6 |
| assertion | loss_of_agency | 0.7 |
| goal_setting | loss_of_agency | 0.6 |
| role_drift | hyper_responsibility | 1.0 |
| control | hyper_responsibility | 0.8 |
| shared_ownership | hyper_responsibility | 0.7 |
| self-sacrifice | hyper_responsibility | 0.9 |
| support_network | hyper_responsibility | 0.6 |
| limits | hyper_responsibility | 0.7 |
| people_pleasing | hyper_responsibility | 0.6 |
| capacity | hyper_responsibility | 0.6 |
| risk_aversion | fear_based_stability | 1.0 |
| status_quo | fear_based_stability | 0.8 |
| experimentation | fear_based_stability | 0.7 |
| safety_behaviors | fear_based_stability | 0.7 |
| learning | fear_based_stability | 0.5 |
| fear_of_change | fear_based_stability | 0.9 |
| obligation | fear_based_stability | 0.6 |
| evidence_seeking | fear_based_stability | 0.6 |
| external_validation | identity_diffusion | 1.0 |
| values_clarity | identity_diffusion | 0.9 |
| direction | identity_diffusion | 0.8 |
| alignment | identity_diffusion | 0.7 |
| autonomy | identity_diffusion | 0.7 |
| consistency | identity_diffusion | 0.6 |
| self_concept | identity_diffusion | 0.9 |
| expression | identity_diffusion | 0.7 |
| clarity | identity_diffusion | 0.6 |
| self-care | suppressed_needs | 1.0 |
| need_expression | suppressed_needs | 0.9 |
| conflict_avoidance | suppressed_needs | 0.8 |
| self_assessment | suppressed_needs | 0.6 |
| decision_habit | suppressed_needs | 0.6 |
| baseline_tension | chronic_alertness | 1.0 |
| somatic_state | chronic_alertness | 0.8 |
| safety_signal | chronic_alertness | 0.7 |
| hypervigilance | chronic_alertness | 0.9 |
| environment_scan | chronic_alertness | 0.8 |
| social_entry | chronic_alertness | 0.6 |
| flexibility | chronic_alertness | 0.6 |
| uncertainty_tolerance | chronic_alertness | 0.6 |
| control_needs | chronic_alertness | 0.7 |
| avoidance | unprocessed_loss | 0.8 |
| emotional_regulation | unprocessed_loss | 0.7 |
| triggers | unprocessed_loss | 0.8 |
| generalization | unprocessed_loss | 0.7 |
| risk_avoidance | unprocessed_loss | 0.6 |
| decision_filter | unprocessed_loss | 0.6 |
| processing | unprocessed_loss | 0.7 |
| ritual | unprocessed_loss | 0.6 |
| emotional_expression | unprocessed_loss | 0.6 |
| purpose_alignment | meaning_vacuum | 1.0 |
| task_quality | meaning_vacuum | 0.7 |
| fulfillment | meaning_vacuum | 0.8 |
| prioritization | meaning_vacuum | 0.7 |
| external_drivers | meaning_vacuum | 0.6 |
| values_alignment | meaning_vacuum | 0.8 |
| motivation | meaning_vacuum | 0.8 |
| narrative | meaning_vacuum | 0.6 |
| values_tradeoff | self_erosion | 1.0 |
| compromise_habit | self_erosion | 0.9 |
| integrity | self_erosion | 0.8 |
| self_trust | self_erosion | 0.8 |
| confidence | self_erosion | 0.7 |
| external_influence | self_erosion | 0.6 |
| authenticity | self_erosion | 0.8 |
| social_fitting | self_erosion | 0.7 |
| energy | self_erosion | 0.6 |

**總計**：92 個 pattern tags

### 風險分析

**「沒有對應母題」的 pattern tags**：
- 無（所有 pattern tags 都有對應）

**「重複對應過多」的 pattern tags**（實際題庫中使用情況 vs patternToThemeMap 定義）：
- `boundaries`：
  - patternToThemeMap 定義：只對應到 `suppressed_needs`（權重 0.7）
  - 實際題庫使用：出現在 `chronic_depletion`, `loss_of_agency`, `hyper_responsibility`, `suppressed_needs` 四個母題的題目中
  - 風險：可能導致母題分數計算不準確，因為 `chronic_depletion` 等母題的題目使用了 `boundaries`，但無法映射到對應母題
  - 建議：確認 `boundaries` 應該對應到哪個母題，或是否需要拆分為 `boundaries_depletion`, `boundaries_agency`, `boundaries_responsibility`, `boundaries_needs`

- `adaptation`：
  - patternToThemeMap 定義：只對應到 `loss_of_agency`（權重 0.6）
  - 實際題庫使用：出現在 `loss_of_agency`, `suppressed_needs` 兩個母題的題目中
  - 風險：`suppressed_needs` 的題目使用了 `adaptation`，但無法映射到該母題
  - 建議：確認 `adaptation` 是否應該也對應到 `suppressed_needs`，或是否需要拆分

- `change_readiness`：
  - patternToThemeMap 定義：只對應到 `loss_of_agency`（權重 0.6）
  - 實際題庫使用：出現在 `loss_of_agency`, `fear_based_stability` 兩個母題的題目中
  - 風險：`fear_based_stability` 的題目使用了 `change_readiness`，但無法映射到該母題
  - 建議：確認 `change_readiness` 是否應該也對應到 `fear_based_stability`，或是否需要拆分

- `assertion`：
  - patternToThemeMap 定義：只對應到 `loss_of_agency`（權重 0.7）
  - 實際題庫使用：出現在 `loss_of_agency`, `suppressed_needs` 兩個母題的題目中
  - 風險：`suppressed_needs` 的題目使用了 `assertion`，但無法映射到該母題
  - 建議：確認 `assertion` 是否應該也對應到 `suppressed_needs`，或是否需要拆分

- `people_pleasing`：
  - patternToThemeMap 定義：只對應到 `hyper_responsibility`（權重 0.6）
  - 實際題庫使用：出現在 `hyper_responsibility`, `suppressed_needs` 兩個母題的題目中
  - 風險：`suppressed_needs` 的題目使用了 `people_pleasing`，但無法映射到該母題
  - 建議：確認 `people_pleasing` 是否應該也對應到 `suppressed_needs`，或是否需要拆分

- `direction`：
  - patternToThemeMap 定義：只對應到 `identity_diffusion`（權重 0.8）
  - 實際題庫使用：出現在 `identity_diffusion`, `meaning_vacuum` 兩個母題的題目中
  - 風險：`meaning_vacuum` 的題目使用了 `direction`，但無法映射到該母題
  - 建議：確認 `direction` 是否應該也對應到 `meaning_vacuum`，或是否需要拆分

**其他觀察**：
- 大部分 pattern tags 只對應一個母題，結構清晰
- 權重範圍：0.5 ~ 1.0，大部分在 0.6 ~ 0.9 之間
- 每個母題都有至少一個權重為 1.0 的「核心 pattern tag」

---

## C) behavior facets 能用哪些

### behavior facets 完整列表（src/core/ontology/behaviorFacetLexicon.v1.json）

| Behavior Facet | 中文標籤 | 核心描述 | 範例短句 |
|---|---|---|---|
| follow_momentum | 隨勢而行 | 把決定權交給局勢 | "順著局勢推進，暫不多做判斷" / "事情怎麼走，就先跟著走" |
| avoid_conflict | 避衝承接 | 不正面破局，先接住 | "暫時忍讓，避開正面衝局" / "先承接下來，不正面對抗" |
| observe_and_wait | 觀望留步 | 暫不出手，先觀其變 | "先看局勢，再動" / "等勢明朗，再走" |
| self_prioritize | 量力守本 | 以自身能承為準 | "先顧自身承受" / "量力而行，不強撐" |
| adjust_strategy | 換步調整 | 改步而行，不硬推 | "調整步法，不硬推" / "換個走法再行" |
| seek_support | 借力而行 | 引外助以穩局 | "請人支援再走" / "借助外力穩住局面" |
| push_through | 硬撐頂過 | 先撐過這段 | "先頂過去再說" / "先撐過這段" |
| withdraw_and_protect | 抽身保全 | 退出當下戰場 | "退出當下戰場" / "先抽身保全" |

**總計**：8 個 behavior facets

### 禁語清單（banned_terms）

以下詞彙**禁止**出現在選項文字中：
- "狀態"
- "訊號"
- "自我"
- "空間"

**驗證邏輯**：`ontologyLoader.js` 的 `validateQuestionBankPhrasing()` 會檢查所有選項文字，若包含禁語會標記為錯誤（若 `VITE_STRICT_ONTLOGY_VALIDATION=true` 會阻止載入）。

---

## D) 題庫 schema 約束（以實際 loader 驗證邏輯為準）

### 硬規則（從 ontologyLoader.js 摘出）

**1. 結構約束**：
- `questionBank.v1.json` 必須是 `{ items: [...] }` 格式
- 每個 `item` 必須有：
  - `theme_id`: string（必須對應到 `motherThemes.v1.json` 的 `id`）
  - `theme_enLabel`: string
  - `theme_zhLabel`: string
  - `questions`: Array（至少 1 題）

**2. Question 約束**：
- `question_text`: string（必填，不能為空）
- `choices`: Array<string>（必填，至少 2 個選項，每個選項必須是 string）
- `choice_meta`: Array<{ choice: string, behavior_facet: string }>（必填，**每個 choice 都必須有對應的 choice_meta 條目**）
  - `choice`: 必須完全匹配 `choices[]` 中的某個字串（trim 後）
  - `behavior_facet`: 必須是 `behaviorFacetLexicon.v1.json` 中定義的 facet
- `pattern_tags`: Array<string>（可選，但建議有，用於映射到母題）
- `confidence_weight`: number（可選，預設 1）

**3. 文字長度約束**（警告，非錯誤）：
- 選項文字：中文長度 ≤ 18 字，或 ASCII 長度 ≤ 60 字元
- 超過會產生警告，但不阻止載入

**4. 禁語約束**：
- 選項文字不能包含 `behaviorFacetLexicon.v1.json` 的 `banned_terms` 中的任何詞彙
- 若包含，會標記為錯誤（若 `VITE_STRICT_ONTLOGY_VALIDATION=true` 會阻止載入）

**5. choice_meta 完整性約束**：
- `choice_meta` 的長度必須等於 `choices` 的長度
- 每個 `choice_meta` 的 `choice` 必須完全匹配 `choices[]` 中的某個字串（trim 後）
- 若某個 choice 沒有對應的 `choice_meta`，scorer 無法正確計分

**6. 載入邏輯約束**（從 `getQuestionsByThemeId()` 觀察）：
- `choices` 必須是 `Array.isArray()` 為 true
- `pattern_tags` 必須是 `Array.isArray()` 為 true（若存在）
- `confidence_weight` 必須是 `typeof === 'number'`（若存在）

---

## E) 可複製的單題模板（符合 schema）

### 範例：chronic_depletion 母題的一題

```json
{
  "question_text": "When several people need you at once late in the day, how do you usually handle your own rest or recovery?",
  "choices": [
    "Push through and rest only after everything is done, even if it is very late",
    "Promise yourself rest but keep saying yes until you are drained",
    "Take short breaks but feel guilty stepping away",
    "Protect a set stop time and accept some things may wait"
  ],
  "pattern_tags": [
    "overextension",
    "boundaries",
    "recovery"
  ],
  "confidence_weight": 1,
  "choice_meta": [
    {
      "choice": "Push through and rest only after everything is done, even if it is very late",
      "behavior_facet": "push_through"
    },
    {
      "choice": "Promise yourself rest but keep saying yes until you are drained",
      "behavior_facet": "follow_momentum"
    },
    {
      "choice": "Take short breaks but feel guilty stepping away",
      "behavior_facet": "avoid_conflict"
    },
    {
      "choice": "Protect a set stop time and accept some things may wait",
      "behavior_facet": "withdraw_and_protect"
    }
  ]
}
```

### 模板說明

**必填欄位**：
- `question_text`: 問題文字（英文，建議 50-150 字）
- `choices`: 選項陣列（至少 2 個，建議 4 個，每個選項為 string）
- `choice_meta`: 每個選項的 metadata（長度必須等於 `choices` 長度）

**強烈建議欄位**：
- `pattern_tags`: 模式標籤陣列（用於映射到母題，建議 2-4 個）
- `confidence_weight`: 信心權重（預設 1，可調整為 0.5-2.0）

**注意事項**：
1. `choice_meta[].choice` 必須**完全匹配** `choices[]` 中的字串（trim 後）
2. `choice_meta[].behavior_facet` 必須是 8 個已定義的 facet 之一
3. `pattern_tags[]` 中的每個 tag 必須在 `patternToThemeMap.v1.js` 中有定義
4. 選項文字不能包含禁語（"狀態"、"訊號"、"自我"、"空間"）
5. 選項文字長度建議：中文 ≤ 18 字，或 ASCII ≤ 60 字元

### 完整題目結構（放在 questionBank.v1.json 中）

```json
{
  "theme_id": "chronic_depletion",
  "theme_enLabel": "Chronic Depletion",
  "theme_zhLabel": "長期耗竭",
  "questions": [
    {
      "question_text": "...",
      "choices": [...],
      "pattern_tags": [...],
      "confidence_weight": 1,
      "choice_meta": [...]
    }
  ]
}
```

---

## 補充說明

### 出題建議

1. **每個母題至少 10 題**：目前每個母題只有 3 題，建議擴充到 10 題以上
2. **pattern_tags 多樣性**：每題建議使用 2-4 個不同的 pattern_tags，避免重複
3. **behavior_facet 分布**：每題的 4 個選項應該涵蓋不同的 behavior_facet，避免所有選項都指向同一個 facet
4. **confidence_weight 調整**：若某題特別重要或特別不確定，可調整權重（0.5-2.0）
5. **文字語氣**：選項文字應符合「非臨床語言」原則，避免診斷性、標籤性、恐嚇性用語

### 驗證流程

1. 執行 `npm run build` 確認 JSON 格式正確
2. 檢查 `ontologyLoader.js` 的驗證邏輯是否通過
3. 確認所有 `theme_id` 都在 `motherThemes.v1.json` 中存在
4. 確認所有 `behavior_facet` 都在 `behaviorFacetLexicon.v1.json` 中定義
5. 確認所有 `pattern_tags` 都在 `patternToThemeMap.v1.js` 中有映射

