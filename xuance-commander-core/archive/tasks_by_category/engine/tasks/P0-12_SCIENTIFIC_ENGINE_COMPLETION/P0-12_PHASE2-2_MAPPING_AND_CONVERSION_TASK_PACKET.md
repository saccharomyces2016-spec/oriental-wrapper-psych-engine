# P0-12 階段二-2：內容映射與轉換任務包

**建立日期**：2026-01-11  
**任務階段**：P0-12 階段二-2（結果呈現資料提取與整合 - 內容映射與轉換）  
**任務狀態**：待執行（PENDING）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、任務目標

將 Phase 2-1 提取的 Legacy 結果呈現資料映射到現有系統結構，並進行語境轉換（心理學 → 玄學）和結構轉換（動態 → 靜態），生成符合現有系統格式的資料檔案。

### 1.1 具體目標

1. **建立映射表**：
   - 建立 Legacy → 現有系統的完整映射表
   - 定義每個 Legacy 檔案的映射目標（L2/L4）
   - 定義每個欄位的映射規則

2. **語境轉換**：
   - 識別需要轉換的心理學詞彙
   - 使用玄學詞彙庫進行轉換
   - 確保通過禁用詞檢查

3. **結構轉換**：
   - 將 Legacy 的 `items` 陣列結構轉換為現有系統的 `low/mid/high` band 結構
   - 定義轉換規則和邏輯

4. **生成新系統檔案**：
   - 生成 `domain/narratives/<facet>.narr.v1.0.json`
   - 生成 `domain/riskchains/<facet>.risk.v1.0.json`
   - 生成 `domain/recommendations/<facet>.reco.v1.0.json`

---

## 二、背景資料

### 2.1 任務脈絡

本任務是 P0-12「現代科學引擎完成」任務的第二階段，專門處理結果呈現相關資料的映射與轉換。

**階段一已完成**（✅ 2026-01-11）：
- 題目設計整合
- 分數計算整合
- buildGuidance.js 整合方向（高層次）

**階段二-1已完成**（✅ 2026-01-11）：
- 完整提取 Legacy 結果呈現資料
- 分析每個檔案的結構和內容
- 建立完整的資料清單
- 生成 artifacts 檔案（manifest.json、analysis.json、report.generated.md）

**階段二-2目標**：
- 將 Legacy 內容映射到現有系統結構
- 進行語境轉換（心理學 → 玄學）
- 進行結構轉換（動態 → 靜態）

### 2.2 Phase 2-1 交付成果（輸入資料）

**Artifacts 檔案位置**：`docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/`

**manifest.json**：
- 包含 9 個檔案的完整清單
- 每個檔案包含：`file`、`abs_path`、`rel_root`、`size_bytes`、`sha256`、`kind`、`lines`
- 關鍵檔案路徑：
  - `anchor_statements.v1.json`: `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/anchor_statements.v1.json`
  - `consequence_chain_library.v1.json`: `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/consequence_chain_library.v1.json`
  - `intervention_boundary_matrix.v1.json`: `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

**analysis.json**：
- 包含 9 個檔案的完整分析
- 每個檔案包含：`file`、`kind`、`context_detected`、`usability`、`conversion_difficulty`、`suggested_use`、`json_shape`（或 `js_hints`）
- 關鍵檔案分析：
  - `anchor_statements.v1.json`: `usability: high`, `context: psych_like`, `suggested_use: "Use for L2/L3 Narratives (rewrite required)"`
  - `consequence_chain_library.v1.json`: `usability: high`, `context: psych_like`, `suggested_use: "Use for L4 RiskChains (if_not_improve)"`
  - `intervention_boundary_matrix.v1.json`: `usability: medium`, `context: neutral`, `suggested_use: "Logic reference for L4 Action Advice gating"`

**report.generated.md**：
- 可讀的摘要報告
- 包含檔案清單和每檔案分析

### 2.3 Legacy 檔案實際結構（基於 Phase 2-1 分析）

#### 2.3.1 anchor_statements.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/anchor_statements.v1.json`

**實際結構**（基於 Phase 2-1 分析）：
- 檔案類型：JSON
- 檔案大小：50,706 bytes
- 頂層結構：object（dict）
- 頂層 keys：`["meta", "items"]`

**meta 結構**：
```json
{
  "version": "1.1",
  "purpose": "initial psychological hit before explanation",
  "note": "Frozen – do not rewrite, only extend"
}
```

**items 結構**：
- 類型：array（list）
- 長度：50 個項目
- 每個項目類型：object（dict）
- 每個項目的 keys：`["id", "label", "mother_theme", "state_tags", "confidence", "uncertainty_note", "do_not_say", "safe_tone_template", "variants", "why_it_hits"]`

**第一個項目結構示例**：
- `id`: string（例如："ANCHOR_FIRE_CONTROL_01"）
- `label`: string（例如："高頻運轉下的隱性耗竭"）
- `mother_theme`: string（例如："control_vs_exhaustion"）
- `state_tags`: array of strings（例如：["high_arousal", "over_control", "anxiety"]）
- `confidence`: string（例如："medium-high"）
- `uncertainty_note`: string
- `do_not_say`: array of strings（禁用語句列表）
- `safe_tone_template`: object（包含 acknowledge, guide, action 等欄位）
- `variants`: array of strings（變體語句）
- `why_it_hits`: string（說明為什麼這個語句有效）

**語境分析**：
- `context`: `psych_like`（包含心理學詞彙）
- `psychHits`: 12（心理學詞彙數量）
- `metaphysHits`: 0（玄學詞彙數量）

**可用性評估**：
- `usability`: `high`
- `conversion_difficulty`: `medium`
- `suggested_use`: "Use for L2/L3 Narratives (rewrite required)"

#### 2.3.2 consequence_chain_library.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/consequence_chain_library.v1.json`

**實際結構**（基於 Phase 2-1 分析）：
- 檔案類型：JSON
- 檔案大小：2,105 bytes
- 頂層結構：object（dict）
- 頂層 keys：`["meta", "items"]`

**meta 結構**：
```json
{
  "version": "1.0",
  "description": "後果連鎖庫：描述行為模式的可能發展路徑",
  "note": "Frozen - do not edit, only extend"
}
```

**items 結構**：
- 類型：array（list）
- 長度：3 個項目
- 每個項目類型：object（dict）
- 每個項目的 keys：`["id", "label", "confidence", "uncertainty_note", "do_not_say", "safe_tone_template"]`

**語境分析**：
- `context`: `psych_like`（包含心理學詞彙）
- `psychHits`: 5（心理學詞彙數量）
- `metaphysHits`: 0（玄學詞彙數量）

**可用性評估**：
- `usability`: `high`
- `conversion_difficulty`: `medium`
- `suggested_use`: "Use for L4 RiskChains (if_not_improve)"

#### 2.3.3 intervention_boundary_matrix.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

**實際結構**（基於 Phase 2-1 分析）：
- 檔案類型：JSON
- 檔案大小：2,221 bytes
- 頂層結構：object（dict）
- 頂層 keys：`["meta", "items"]`

**meta 結構**：
```json
{
  "version": "1.0",
  "description": "介入邊界矩陣：定義建議的適用範圍和限制",
  "note": "Frozen - do not edit, only extend"
}
```

**items 結構**：
- 類型：array（list）
- 長度：3 個項目
- 每個項目類型：object（dict）
- 每個項目的 keys：`["id", "label", "confidence", "uncertainty_note", "do_not_say", "safe_tone_template"]`

**語境分析**：
- `context`: `neutral`（邏輯規則，無語境問題）
- `psychHits`: 0（心理學詞彙數量）
- `metaphysHits`: 0（玄學詞彙數量）

**可用性評估**：
- `usability`: `medium`
- `conversion_difficulty`: `medium`
- `suggested_use`: "Logic reference for L4 Action Advice gating"

### 2.4 現有系統的結果呈現需求

#### 2.4.1 4 階段 UI 流程（最新版設計）

根據 `P0-5.7_DESIGN_DOC_FINAL.md`，現有系統採用 4 階段 UI 流程：

- **Stage 1（The Wheel）**：先天八卦盤（Primordial Bagua）- Facet Triage
- **Stage 2（Radial Compass）**：五行羅盤（Elemental Compass）- Symbol Selection
- **Stage 3（Projection）**：鑄爻（Casting Lines）- Deep Profiling
- **Stage 4（Results）**：卦象顯影（Hexagram Manifestation）- 結果呈現

#### 2.4.2 Stage 4 結果呈現分層架構（L1-L4）

Stage 4 採用 L1-L4 分層架構：

- **L1（Hexagram Visual）**：卦象視覺呈現
  - 顯示六十四卦的視覺化
  - 卦象的基本資訊（名稱、結構等）

- **L2（Root Personalization）**：本命元素個人化敘事
  - 使用 Root Element（本命元素）進行個人化
  - 敘事內容（opening, explain）
  - **對應資料結構**：`narratives.v1.0.json`

- **L3（Flow Analysis）**：當前狀態分析
  - 使用 Flow Hexagram（當前卦象）進行分析
  - 狀態描述和解釋
  - **對應資料結構**：`narratives.v1.0.json`（可能與 L2 共用或分離）

- **L4（Risk Blocking & Action Advice）**：風險阻斷與行動建議
  - 風險鏈（riskchains）
  - 行動建議（recommendations）
  - **對應資料結構**：`riskchains.v1.0.json`、`recommendations.v1.0.json`

### 2.5 現有系統的結果資料結構範例

#### 2.5.1 narratives.v1.0.json 結構

**檔案位置**：`domain/narratives/stress_recovery.narr.v1.0.json`

**實際結構範例**：
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

**結構說明**：
- 頂層為 object（dict）
- Keys：`low`、`mid`、`high`（對應風險等級或分數區間）
- 每個 band 包含：`opening`（開場語句）、`explain`（解釋說明）
- 所有文字使用玄學語境（五行、氣場等），不使用心理學詞彙

#### 2.5.2 recommendations.v1.0.json 結構

**檔案位置**：`domain/recommendations/stress_recovery.reco.v1.0.json`

**實際結構範例**：
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

**結構說明**：
- 頂層為 object（dict）
- Keys：`low`、`mid`、`high`（對應風險等級或分數區間）
- 每個 band 的值為 array of objects
- 每個建議對象包含：`id`（唯一識別碼）、`title`（標題）、`steps`（步驟列表）
- 所有文字使用日常語言，不使用心理學詞彙

#### 2.5.3 riskchains.v1.0.json 結構

**檔案位置**：`domain/riskchains/stress_recovery.risk.v1.0.json`

**實際結構範例**：
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

**結構說明**：
- 頂層為 object（dict）
- Keys：`mid`、`high`（只有中高風險等級，低風險通常不需要風險鏈）
- 每個 band 包含：`if_not_improve`（如果沒有改善的後果鏈）
- `if_not_improve` 的值為 array of strings（每個字串描述一個後果鏈）
- 後果鏈使用箭頭（→）連接因果關係
- 所有文字使用日常語言，不使用心理學詞彙

### 2.6 設計原則與約束

#### 2.6.1 語境純粹性要求（嚴格遵守）

**核心原則**：使用者必須感知為「純玄學系統」，不得暴露任何現代科學背景。

**具體要求**：

1. **禁止心理學名詞**：
   - ❌ 不得使用：焦慮、憂鬱、壓力、創傷、防禦機制、認知偏差、情緒調節等
   - ✅ 必須使用：心神不寧、氣滯流塞、能量低落、氣血不暢、自我保護、心神閉塞等玄學對應詞彙

2. **禁止現代科學背景**：
   - ❌ 不得使用：心理學、神經科學、認知科學、臨床診斷等
   - ❌ 不得說明「這是科學計算」或「基於心理學理論」

3. **僅使用玄學詞彙庫**：
   - ✅ 必須使用：`domain/knowledge_base/vocabulary_metaphysical.v1.0.json` 中定義的詞彙
   - ✅ 必須通過：`domain/knowledge_base/forbidden_terms.v1.0.json` 的禁用詞檢查

#### 2.6.2 玄學詞彙庫參考

**vocabulary_metaphysical.v1.0.json 結構範例**：
```json
{
  "version": "1.0",
  "categories": {
    "hexagram_names": {
      "zh": {
        "0": "乾",
        "1": "坤",
        ...
      }
    },
    "element_properties": {
      "zh": {
        "wood": {
          "name": "木",
          "properties": ["生長", "伸展", "向上"]
        },
        "fire": {
          "name": "火",
          "properties": ["熱", "亮", "消耗"]
        },
        ...
      }
    },
    "state_descriptors": {
      "zh": {
        "stable": "穩",
        "unstable": "亂",
        "excessive": "過",
        "insufficient": "不足"
      }
    }
  }
}
```

#### 2.6.3 禁用詞檢查參考

**forbidden_terms.v1.0.json 結構範例**：
```json
{
  "version": "1.0",
  "categories": {
    "psychological_terms": {
      "zh": {
        "焦慮": {
          "forbidden": true,
          "suggested_alternatives": ["心神不寧", "氣滯流塞"]
        },
        "抑鬱": {
          "forbidden": true,
          "suggested_alternatives": ["能量低落", "氣血不暢"]
        }
      }
    },
    "scientific_terms": {
      "zh": {
        "心理學": { "forbidden": true },
        "神經科學": { "forbidden": true }
      }
    }
  }
}
```

#### 2.6.4 五行系統參考

**wuxing_5_elements.v1.0.json 結構範例**：
```json
{
  "elements": {
    "wood": {
      "name": { "zh": "木", "en": "Wood" },
      "properties": {
        "zh": ["生長", "伸展", "向上"],
        "en": ["Growth", "Expansion", "Upward"]
      },
      "psychological_mapping": {
        "state": "Expansive / Growing",
        "description": "處於成長擴張狀態，能量向上向外"
      },
      "generates": "fire",
      "controlled_by": "metal",
      "controls": "earth",
      "generated_by": "water"
    },
    "fire": {
      "name": { "zh": "火", "en": "Fire" },
      "properties": {
        "zh": ["熱", "亮", "消耗"],
        "en": ["Heat", "Brightness", "Consumption"]
      },
      "psychological_mapping": {
        "state": "High Energy / High Arousal",
        "description": "處於高能量高喚醒狀態，容易消耗過度"
      },
      "generates": "earth",
      "controlled_by": "water",
      "controls": "metal",
      "generated_by": "wood"
    },
    ...
  }
}
```

#### 2.6.5 可回滾、不凍結原則

- ✅ **所有資料保持可回滾**：所有轉換和生成的資料都可以回滾
- ✅ **不凍結設計**：設計和決策不鎖定，可以根據實作情況調整

#### 2.6.6 以最新版設計為主

- ✅ **以最新版設計為主**：以最新版的網頁設計、UI 設計、風格元素為主
- ✅ **舊資料作為參考**：Legacy 資料作為參考，判斷是否有價值資料可以後續用做討論

---

## 三、映射策略（Legacy → 現有系統）

### 3.1 結構映射表

| Legacy Source | Target (L1-L4) | 轉換策略 | 優先級 |
|--------------|---------------|---------|--------|
| `anchor_statements.v1.json` | **L2 Narratives** | **語義重構**：保留結構，內容改為五行生剋敘事 | **High** |
| `consequence_chain_library.v1.json` | **L4 RiskChains** | **概念轉譯**：行為後果 → 運勢/能量耗損；落 `if_not_improve` | **High** |
| `intervention_boundary_matrix.v1.json` | **L4 Recommendations** | **邏輯抽象**：提取門檻/觸發條件，語境改寫 | **Medium** |
| `modifiers.json` | Vocabulary Base | **詞彙替換**：建立玄學修飾語對照表 | **Medium** |

### 3.2 詳細映射規則

#### 3.2.1 anchor_statements.v1.json → L2 Narratives

**映射目標**：`domain/narratives/<facet>.narr.v1.0.json`

**結構轉換**：
- Legacy：`{meta, items: [{id, label, mother_theme, state_tags, confidence, safe_tone_template, variants, why_it_hits}]}`
- 現有系統：`{low: {opening, explain}, mid: {opening, explain}, high: {opening, explain}}`

**轉換邏輯**：
1. **分類到 bands**：
   - 根據 `confidence` 或 `state_tags` 將 items 分類到 `low`、`mid`、`high`
   - `confidence: "high"` → `high` band
   - `confidence: "medium-high"` → `high` band
   - `confidence: "medium"` → `mid` band
   - `confidence: "low"` → `low` band

2. **生成 opening**：
   - 使用 `safe_tone_template.acknowledge` 或 `variants[0]` 作為基礎
   - 進行語境轉換（心理學 → 玄學）
   - 使用五行、八卦等玄學詞彙

3. **生成 explain**：
   - 使用 `why_it_hits` 作為基礎
   - 進行語境轉換（心理學解釋 → 命理解釋）
   - 使用五行生剋關係解釋

**語境轉換規則**：
- `state_tags: ["high_arousal", "anxiety"]` → "火氣過旺"、"氣機紊亂"
- `state_tags: ["over_control"]` → "金剋木"、"控制過度"
- `mother_theme: "control_vs_exhaustion"` → "金火相衝"、"控制與消耗的衝突"

#### 3.2.2 consequence_chain_library.v1.json → L4 RiskChains

**映射目標**：`domain/riskchains/<facet>.risk.v1.0.json`

**結構轉換**：
- Legacy：`{meta, items: [{id, label, confidence, safe_tone_template}]}`
- 現有系統：`{mid: {if_not_improve: [...]}, high: {if_not_improve: [...]}}`

**轉換邏輯**：
1. **分類到 bands**：
   - 根據 `confidence` 將 items 分類到 `mid`、`high`
   - `confidence: "high"` → `high` band
   - `confidence: "medium"` → `mid` band

2. **生成 if_not_improve**：
   - 使用 `safe_tone_template.guide` 或 `label` 作為基礎
   - 進行語境轉換（行為後果 → 運勢/能量耗損）
   - 使用箭頭（→）連接因果關係

**語境轉換規則**：
- "Anxiety leads to insomnia" → "火氣攻心導致夜不成眠"
- "Stress affects relationships" → "氣機不順影響人際和諧"
- "Burnout affects work" → "能量耗損影響事業運勢"

#### 3.2.3 intervention_boundary_matrix.v1.json → L4 Recommendations

**映射目標**：`domain/recommendations/<facet>.reco.v1.0.json`

**結構轉換**：
- Legacy：`{meta, items: [{id, label, confidence, safe_tone_template}]}`
- 現有系統：`{low: [{id, title, steps: [...]}], mid: [...], high: [...]}`

**轉換邏輯**：
1. **分類到 bands**：
   - 根據 `confidence` 將 items 分類到 `low`、`mid`、`high`
   - `confidence: "high"` → `high` band
   - `confidence: "medium"` → `mid` band
   - `confidence: "low"` → `low` band

2. **生成 recommendations**：
   - 使用 `safe_tone_template.action` 作為基礎
   - 拆解為 `steps` 陣列
   - 進行語境轉換（臨床建議 → 日常行動建議）

**語境轉換規則**：
- 移除臨床邊界語境
- 改寫為玄學「節點/關口/煞位」語氣（如果需要）
- 使用日常語言，不使用心理學詞彙

### 3.3 語境轉換規則（嚴格遵守）

1. **心理學名詞過濾**：
   - 不得直接翻譯心理學詞彙
   - 必須對應玄學概念（參考 `vocabulary_metaphysical.v1.0.json`）

2. **禁用詞檢查**：
   - 所有產出需通過 `forbidden_terms.v1.0.json` 驗證
   - 如果包含禁用詞，必須替換為建議的替代詞彙

3. **敘事風格調整**：
   - 從「臨床診斷」轉為「譬喻/指引式」
   - 從「科學解釋」轉為「玄學敘事」

---

## 四、任務執行步驟

### 步驟 1：讀取 Legacy 檔案

1. 使用 `manifest.json` 中的 `abs_path` 讀取實際檔案
2. 驗證檔案存在性和完整性（使用 `sha256`）
3. 解析 JSON 結構

### 步驟 2：建立映射表

1. 分析 Legacy 檔案的實際結構
2. 設計映射規則（items → bands、欄位映射）
3. 建立映射表文件

### 步驟 3：結構轉換

1. 將 Legacy 的 `items` 陣列分類到 `low/mid/high` bands
2. 設計分類邏輯（基於 `confidence` 或 `state_tags`）
3. 生成新系統結構

### 步驟 4：語境轉換

1. 識別需要轉換的心理學詞彙
2. 使用 `vocabulary_metaphysical.v1.0.json` 進行轉換
3. 使用 `forbidden_terms.v1.0.json` 進行檢查和替換
4. 生成轉換後的內容

### 步驟 5：生成新系統檔案

1. 生成 `domain/narratives/<facet>.narr.v1.0.json`
2. 生成 `domain/riskchains/<facet>.risk.v1.0.json`
3. 生成 `domain/recommendations/<facet>.reco.v1.0.json`
4. 驗證檔案格式（符合現有系統結構）

---

## 五、預期產出

### 5.1 主要產出

1. **映射表文件**：
   - Legacy → 現有系統的完整映射表
   - 轉換規則說明
   - 欄位對應表

2. **轉換後的資料檔案**：
   - `domain/narratives/<facet>.narr.v1.0.json`
   - `domain/riskchains/<facet>.risk.v1.0.json`
   - `domain/recommendations/<facet>.reco.v1.0.json`

3. **轉換報告**：
   - 轉換過程說明
   - 語境轉換記錄
   - 結構轉換記錄

### 5.2 文件格式

所有產出以 Markdown 或 JSON 格式記錄，標記為 WORKING DOCUMENT（不鎖定，可回滾）。

---

## 六、注意事項

### 6.1 原則遵守

- ✅ **可回滾、不凍結**：所有轉換和生成的資料都保持可回滾、不凍結狀態
- ✅ **以最新版設計為主**：轉換時以最新版的設計需求為主
- ✅ **完整的背景資料**：所有轉換都提供完整的背景資料說明

### 6.2 品質要求

- ✅ **語境純粹性**：所有產出必須通過禁用詞檢查
- ✅ **結構一致性**：所有產出必須符合現有系統結構
- ✅ **文本記錄**：所有轉換過程都以文本形式記錄

### 6.3 重要提醒

- ⚠️ **所有資料保持不凍結、不鎖定、可回滾**：所有生成的檔案和文件都標記為 WORKING BASELINE，可以隨時修改或回滾
- ⚠️ **文本作為唯一依據**：所有決策和轉換都記錄在文本中，以文本為準

---

## 七、參考資料

### 7.1 Phase 2-1 交付成果

- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/manifest.json` - 檔案清單
- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/analysis.json` - 分析報告
- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/report.generated.md` - 可讀報告
- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-1_COMPLETION_SUMMARY.md` - Phase 2-1 完成摘要

### 7.2 現有系統設計文件

- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文件
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣系統實現
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

### 7.3 現有系統資料結構範例

- `domain/narratives/stress_recovery.narr.v1.0.json` - 敘事資料範例
- `domain/recommendations/stress_recovery.reco.v1.0.json` - 建議資料範例
- `domain/riskchains/stress_recovery.risk.v1.0.json` - 風險鏈資料範例

### 7.4 語境約束資料

- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞列表
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行系統定義

### 7.5 階段一完成文件

- `P0-12_IMPLEMENTATION_SPEC_FINAL.md` - 最終實作規格書
- `P0-12_COMPLETE_BACKGROUND_DATA_PACKAGE.md` - 完整背景資料包
- `P0-12_INTEGRATION_STATUS_AND_NEXT_STEPS.md` - 整合狀態與下一步分析

---

**任務狀態**：待執行（PENDING）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**重要提醒**：所有資料保持不凍結、不鎖定、可回滾  
**最後更新**：2026-01-11
