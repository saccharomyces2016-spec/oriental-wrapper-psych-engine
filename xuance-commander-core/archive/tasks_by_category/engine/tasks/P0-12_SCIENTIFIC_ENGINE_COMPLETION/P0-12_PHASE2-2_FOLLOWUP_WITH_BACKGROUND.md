# P0-12 階段二-2 追問包（完整背景資料版）

**建立日期**：2026-01-12  
**審核結果**：部分符合，需要補充  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、審核結果摘要

### 1.1 符合要求的部分

- ✅ 映射策略定義清晰完整
- ✅ 語境轉換規則完整且正確
- ✅ 轉換後的範例文字符合語境要求
- ✅ 語境純粹性通過檢查

### 1.2 需要補充的部分

1. **結構不符合現有系統**：範例中包含 `meta` 欄位，但現有系統不包含
2. **缺少實際檔案產出**：僅提供範例，未提供實際可寫入的 JSON 檔案
3. **缺少轉換過程記錄**：未提供轉換過程說明、語境轉換記錄、結構轉換記錄
4. **缺少映射表文件**：未提供詳細的映射表文件
5. **Facet 命名問題**：使用了 `energy_regulation`，未說明對應關係

---

## 二、關鍵問題詳細說明

### 2.1 結構不符合現有系統（關鍵問題）

#### 2.1.1 現有系統結構（基準）

**narratives.v1.0.json 結構**（以 `domain/narratives/stress_recovery.narr.v1.0.json` 為例）：
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
- ❌ **不包含 `meta` 欄位**
- ✅ 頂層直接是 `low/mid/high` bands
- ✅ 每個 band 包含 `opening` 和 `explain`

**riskchains.v1.0.json 結構**（以 `domain/riskchains/stress_recovery.risk.v1.0.json` 為例）：
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
- ❌ **不包含 `meta` 欄位**
- ✅ 頂層直接是 `mid/high` bands（低風險通常不需要風險鏈）
- ✅ 每個 band 包含 `if_not_improve` 陣列

**recommendations.v1.0.json 結構**（以 `domain/recommendations/stress_recovery.reco.v1.0.json` 為例）：
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
- ❌ **不包含 `meta` 欄位**
- ✅ 頂層直接是 `low/mid/high` bands
- ✅ 每個 band 的值是陣列（array of objects）
- ✅ 每個建議對象包含：`id`、`title`、`steps`

#### 2.1.2 交付內容結構問題

**交付內容中的範例結構**：
```json
{
  "meta": {
    "version": "1.0",
    "facet": "energy_regulation",
    "source_legacy": "anchor_statements.v1.json"
  },
  "low": {...},
  "mid": {...},
  "high": {...}
}
```

**問題說明**：
1. ❌ 包含 `meta` 欄位，但現有系統**不包含此欄位**
2. ⚠️ 如果未來要加入 `meta` 欄位，需要：
   - 修改所有現有檔案（破壞性變更）
   - 更新編譯引擎（`engine/compile_domain.py`）
   - 更新前端適配器（Adapter）
   - 更新 Schema 定義（`schemas/compiled_facet.schema.json`）

**解決方案**：
1. ✅ **移除所有範例中的 `meta` 欄位**
2. ✅ 確保結構完全符合現有系統（頂層直接是 `low/mid/high` bands）
3. ✅ 如果需要在未來加入 `meta` 欄位，應該在 Phase 2-3 或 Phase 2-4 中討論，而不是在 Phase 2-2 中直接加入

#### 2.1.3 結構對照表

| 項目 | 現有系統 | 交付內容 | 是否符合 |
|------|----------|----------|---------|
| narratives 頂層 | `low/mid/high` bands | `meta` + `low/mid/high` bands | ❌ 不符合 |
| riskchains 頂層 | `mid/high` bands | `meta` + `mid/high` bands | ❌ 不符合 |
| recommendations 頂層 | `low/mid/high` bands | `meta` + `low/mid/high` bands | ❌ 不符合 |

### 2.2 缺少實際檔案產出（關鍵問題）

#### 2.2.1 任務包要求

根據 `P0-12_PHASE2-2_MAPPING_AND_CONVERSION_TASK_PACKET.md`，預期產出包括：

**轉換後的資料檔案**：
- `domain/narratives/<facet>.narr.v1.0.json`
- `domain/riskchains/<facet>.risk.v1.0.json`
- `domain/recommendations/<facet>.reco.v1.0.json`

#### 2.2.2 實際交付內容

**問題**：
- ❌ 僅提供範例（在文件中），未提供實際可寫入的 JSON 檔案
- ❌ 未說明檔案應該放在哪個路徑
- ❌ 未說明檔案命名規則

**解決方案**：
1. ✅ 提供至少一個完整的 facet 轉換結果（三個 JSON 檔案）
2. ✅ 檔案結構必須完全符合現有系統（不包含 `meta` 欄位）
3. ✅ 檔案內容必須通過禁用詞檢查
4. ✅ 檔案命名必須符合現有系統規範（`<facet>.narr.v1.0.json` 等）

### 2.3 缺少轉換過程記錄（關鍵問題）

#### 2.3.1 任務包要求

根據 `P0-12_PHASE2-2_MAPPING_AND_CONVERSION_TASK_PACKET.md`，預期產出包括：

**轉換報告**：
- 轉換過程說明
- 語境轉換記錄
- 結構轉換記錄

#### 2.3.2 實際交付內容

**問題**：
- ❌ 未提供轉換過程說明
- ❌ 未提供語境轉換記錄（Legacy 文字 → 轉換後文字）
- ❌ 未提供結構轉換記錄（Legacy 欄位 → 目標欄位）

**解決方案**：
1. ✅ 提供轉換過程說明文件（Markdown）
2. ✅ 記錄每個 Legacy 檔案的轉換過程
3. ✅ 記錄語境轉換的具體對應（至少 5-10 個範例）
4. ✅ 記錄結構轉換的具體對應（每個欄位的映射規則）

### 2.4 缺少映射表文件（關鍵問題）

#### 2.4.1 任務包要求

根據 `P0-12_PHASE2-2_MAPPING_AND_CONVERSION_TASK_PACKET.md`，預期產出包括：

**映射表文件**：
- Legacy → 現有系統的完整映射表
- 轉換規則說明
- 欄位對應表

#### 2.4.2 實際交付內容

**問題**：
- ❌ 映射表僅在文件中（作為表格），未提供獨立的映射表文件
- ❌ 欄位對應表不夠詳細（缺少具體的欄位映射規則）

**解決方案**：
1. ✅ 提供詳細的映射表文件（Markdown 或 JSON）
2. ✅ 包含每個 Legacy 檔案的所有欄位映射
3. ✅ 包含轉換規則的詳細說明（包含具體範例）

### 2.5 Facet 命名問題

#### 2.5.1 問題說明

**交付內容中使用的 facet**：
- `energy_regulation`（來自 Legacy `control_vs_exhaustion`）

**問題**：
- ⚠️ 未說明是否對應現有系統的特定 facet
- ⚠️ 未說明是否需要新增此 facet
- ⚠️ 如果新增，是否需要對應的 questions、scoring 等檔案

#### 2.5.2 現有系統 Facet 清單

根據 `P0-12_IMPLEMENTATION_SPEC_FINAL.md`，現有系統的八大領域（Domains）：
- D1: `chronic_depletion`（能量與承載狀態）
- D2: `chronic_alertness`（生存警戒與安全）
- D3: `fear_based_stability`（停滯與改變阻力）
- D4: `hyper_responsibility`（角色與責任過載）
- D5: `identity_diffusion`（自我認同與方向）
- D6: `loss_of_agency`（行動力與主控感）
- D7: `meaning_vacuum`（價值與動機）
- D8: `suppressed_needs`（需求與情感表達）

**Legacy 主題對應**：
- `control_vs_exhaustion` 可能對應 `chronic_depletion`（能量與承載狀態）

#### 2.5.3 解決方案

**選項 1：使用現有 facet**
- 使用 `chronic_depletion` 作為 facet ID
- 優點：不需要新增檔案，可以直接整合
- 缺點：需要確認 `chronic_depletion` 是否已經有 questions、scoring 等檔案

**選項 2：新增 facet**
- 使用 `energy_regulation` 作為新的 facet ID
- 優點：語義清晰，符合 Legacy 主題
- 缺點：需要同時新增 questions、scoring、manifest 等檔案

**建議**：
- ✅ 優先使用現有 facet（如 `chronic_depletion`）
- ✅ 如果必須新增 facet，需要說明完整的檔案結構（questions、scoring、manifest 等）

---

## 三、完整背景資料（補充）

### 3.1 現有系統結構（完整參考）

#### 3.1.1 narratives.v1.0.json 完整結構

**檔案位置**：`domain/narratives/stress_recovery.narr.v1.0.json`

**完整內容**：
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

**關鍵規則**：
- ❌ **不包含 `meta` 欄位**
- ✅ 頂層直接是 `low/mid/high` bands
- ✅ 每個 band 必須包含 `opening` 和 `explain`
- ✅ 所有文字必須使用玄學語境

#### 3.1.2 riskchains.v1.0.json 完整結構

**檔案位置**：`domain/riskchains/stress_recovery.risk.v1.0.json`

**完整內容**：
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

**關鍵規則**：
- ❌ **不包含 `meta` 欄位**
- ✅ 頂層直接是 `mid/high` bands（低風險通常不需要風險鏈）
- ✅ 每個 band 必須包含 `if_not_improve` 陣列
- ✅ 每個後果鏈使用箭頭（→）連接因果關係
- ✅ 所有文字必須使用日常語言，不使用心理學詞彙

#### 3.1.3 recommendations.v1.0.json 完整結構

**檔案位置**：`domain/recommendations/stress_recovery.reco.v1.0.json`

**完整內容**：
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

**關鍵規則**：
- ❌ **不包含 `meta` 欄位**
- ✅ 頂層直接是 `low/mid/high` bands
- ✅ 每個 band 的值是陣列（array of objects）
- ✅ 每個建議對象必須包含：`id`（唯一識別碼）、`title`（標題）、`steps`（步驟列表）
- ✅ 所有文字必須使用日常語言，不使用心理學詞彙

### 3.2 Legacy 檔案結構（完整參考）

#### 3.2.1 anchor_statements.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/anchor_statements.v1.json`

**結構說明**（基於 Phase 2-1 分析）：
- 頂層結構：object（dict）
- 頂層 keys：`["meta", "items"]`
- `items` 類型：array（list）
- `items` 長度：約 50 個項目
- 每個項目類型：object（dict）
- 每個項目的 keys：`["id", "label", "mother_theme", "state_tags", "confidence", "uncertainty_note", "do_not_say", "safe_tone_template", "variants", "why_it_hits"]`

**關鍵欄位說明**：
- `id`: string（例如："ANCHOR_FIRE_CONTROL_01"）
- `label`: string（例如："高頻運轉下的隱性耗竭"）- 心理學語境
- `mother_theme`: string（例如："control_vs_exhaustion"）
- `state_tags`: array of strings（例如：["high_arousal", "over_control", "anxiety"]）- 心理學標籤
- `confidence`: string（例如："medium-high"）- 用於分類到 bands
- `safe_tone_template`: object（包含 acknowledge, guide, action 等欄位）- 用於生成 opening 和 explain
- `variants`: array of strings（變體語句）- 可選用於生成 opening
- `why_it_hits`: string（說明為什麼這個語句有效）- 用於生成 explain

#### 3.2.2 consequence_chain_library.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/consequence_chain_library.v1.json`

**結構說明**（基於 Phase 2-1 分析）：
- 頂層結構：object（dict）
- 頂層 keys：`["meta", "items"]`
- `items` 類型：array（list）
- `items` 長度：約 3 個項目
- 每個項目類型：object（dict）
- 每個項目的 keys：`["id", "label", "confidence", "uncertainty_note", "do_not_say", "safe_tone_template"]`

**關鍵欄位說明**：
- `id`: string
- `label`: string（例如："Anxiety leads to insomnia"）- 心理學語境，需要轉換
- `confidence`: string（例如："high"）- 用於分類到 bands
- `safe_tone_template`: object（包含 guide 等欄位）- 用於生成 if_not_improve

#### 3.2.3 intervention_boundary_matrix.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

**結構說明**（基於 Phase 2-1 分析）：
- 頂層結構：object（dict）
- 頂層 keys：`["meta", "items"]`
- `items` 類型：array（list）
- `items` 長度：約 3 個項目
- 每個項目類型：object（dict）
- 每個項目的 keys：`["id", "label", "confidence", "uncertainty_note", "do_not_say", "safe_tone_template"]`

**關鍵欄位說明**：
- `id`: string
- `label`: string（邏輯規則描述）- 用於生成 title
- `confidence`: string（例如："medium"）- 用於分類到 bands
- `safe_tone_template`: object（包含 action 等欄位）- 用於生成 steps

### 3.3 映射規則（完整參考）

#### 3.3.1 anchor_statements → narratives 映射規則

| Legacy 欄位 | 目標欄位 | 轉換規則 |
|------------|---------|---------|
| `confidence` | `band` (low/mid/high) | `high` 或 `medium-high` → `high`<br>`medium` → `mid`<br>`low` 或 `undefined` → `low` |
| `safe_tone_template.acknowledge` 或 `variants[0]` | `opening` | 語境轉換（心理學 → 玄學） |
| `why_it_hits` | `explain` | 語境轉換（心理學解釋 → 命理解釋） |

#### 3.3.2 consequence_chain_library → riskchains 映射規則

| Legacy 欄位 | 目標欄位 | 轉換規則 |
|------------|---------|---------|
| `confidence` | `band` (mid/high) | `high` → `high`<br>`medium` → `mid`<br>`low` 通常不生成風險鏈 |
| `safe_tone_template.guide` 或 `label` | `if_not_improve` | 語境轉換（行為後果 → 運勢/能量耗損），使用箭頭（→）連接 |

#### 3.3.3 intervention_boundary_matrix → recommendations 映射規則

| Legacy 欄位 | 目標欄位 | 轉換規則 |
|------------|---------|---------|
| `confidence` | `band` (low/mid/high) | `high` → `high`<br>`medium` → `mid`<br>`low` → `low` |
| `label` | `title` | 語境轉換（臨床建議 → 行動指引） |
| `safe_tone_template.action` | `steps` | 拆解為陣列，語境轉換（臨床建議 → 日常行動建議） |

### 3.4 語境轉換規則（完整參考）

#### 3.4.1 核心詞彙對照表

| 心理語境 (Forbidden) | 玄學敘事 (Allowed) | 應用場景 |
|---------------------|-------------------|---------|
| Anxiety / High Arousal | 火氣過旺、心神不寧、氣機紊亂 | 描述高能量但不穩定的狀態 |
| Over-control | 金剋木、過度收斂、強行壓制 | 描述過度壓抑或控制的機制 |
| Exhaustion / Burnout | 油盡燈枯、水不涵木、火多土焦 | 描述資源耗盡的後果 |
| Stress | 氣滯、外煞、重壓 | 描述外部壓力或內部緊張 |
| Recovery | 養氣、涵養、歸根 | 描述恢復與休息的行動 |
| Mental Energy | 神識、精氣 | 描述精神資源 |

#### 3.4.2 禁用詞檢查

**參考檔案**：`domain/knowledge_base/forbidden_terms.v1.0.json`

**關鍵規則**：
- ❌ 禁止使用：焦慮、憂鬱、創傷、防禦機制、認知偏差、神經科學、心理學等詞彙
- ✅ 必須使用：`domain/knowledge_base/vocabulary_metaphysical.v1.0.json` 中定義的詞彙
- ✅ 所有產出必須通過禁用詞檢查

---

## 四、明確要求（必須完成）

### 4.1 結構修正要求

1. ✅ **移除所有範例中的 `meta` 欄位**
2. ✅ 確保結構完全符合現有系統（頂層直接是 `low/mid/high` bands）
3. ✅ 提供修正後的完整範例

### 4.2 實際檔案產出要求

1. ✅ **提供至少一個完整的 facet 轉換結果**（三個 JSON 檔案）：
   - `domain/narratives/<facet>.narr.v1.0.json`
   - `domain/riskchains/<facet>.risk.v1.0.json`
   - `domain/recommendations/<facet>.reco.v1.0.json`

2. ✅ 檔案結構必須完全符合現有系統（不包含 `meta` 欄位）

3. ✅ 檔案內容必須通過禁用詞檢查

4. ✅ 檔案命名必須符合現有系統規範

5. ✅ 說明使用的 facet ID（建議使用現有 facet，如 `chronic_depletion`）

### 4.3 轉換過程記錄要求

1. ✅ **提供轉換過程說明文件**（Markdown）

2. ✅ **記錄每個 Legacy 檔案的轉換過程**：
   - 讀取的檔案路徑
   - 提取的項目數量
   - 分類到 bands 的規則
   - 轉換的關鍵步驟

3. ✅ **記錄語境轉換的具體對應**（至少 5-10 個範例）：
   - Legacy 原始文字
   - 轉換後的文字
   - 轉換規則說明

4. ✅ **記錄結構轉換的具體對應**：
   - 每個 Legacy 欄位的映射規則
   - 具體的轉換範例

### 4.4 映射表文件要求

1. ✅ **提供詳細的映射表文件**（Markdown 或 JSON）

2. ✅ **包含每個 Legacy 檔案的所有欄位映射**：
   - 欄位名稱
   - 目標欄位名稱
   - 轉換規則
   - 具體範例

3. ✅ **包含轉換規則的詳細說明**：
   - Band 分類規則
   - 語境轉換規則
   - 結構轉換規則

### 4.5 Facet 命名要求

1. ✅ **說明使用的 facet ID**：
   - 如果使用現有 facet，說明對應關係
   - 如果需要新增 facet，說明完整的檔案結構（questions、scoring、manifest 等）

2. ✅ **建議優先使用現有 facet**（如 `chronic_depletion`）

---

## 五、交付格式要求

### 5.1 檔案結構

所有交付檔案應該放在以下結構中：

```
P0-12_SCIENTIFIC_ENGINE_COMPLETION/
  P0-12_PHASE2-2_MAPPING_AND_CONVERSION_RESULTS/
    mapping_table.md (或 mapping_table.json)
    conversion_process.md
    converted_files/
      <facet>.narr.v1.0.json
      <facet>.risk.v1.0.json
      <facet>.reco.v1.0.json
    conversion_examples.md (語境轉換記錄)
```

### 5.2 文件格式

- ✅ 所有文件標記為 WORKING DOCUMENT（不鎖定，可回滾）
- ✅ 所有 JSON 檔案必須通過格式驗證
- ✅ 所有文字內容必須通過禁用詞檢查

---

## 六、參考資料

### 6.1 任務包

- `P0-12_PHASE2-2_MAPPING_AND_CONVERSION_TASK_PACKET.md` - 完整任務包

### 6.2 現有系統範例

- `domain/narratives/stress_recovery.narr.v1.0.json` - narratives 結構範例
- `domain/riskchains/stress_recovery.risk.v1.0.json` - riskchains 結構範例
- `domain/recommendations/stress_recovery.reco.v1.0.json` - recommendations 結構範例

### 6.3 Phase 2-1 交付成果

- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/manifest.json` - 檔案清單
- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/analysis.json` - 分析報告

### 6.4 語境約束資料

- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞列表

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12
