# P0-12 階段二-1 追問包（含詳細背景資料）

**建立日期**：2026-01-11  
**審核標準**：最嚴格標準  
**審核對象**：顧問團提供的兩個版本報告  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、審核結論

**審核結果**：⚠️ **部分符合，需要補充實際提取結果**

**符合的部分**（可寫入文本）：
- ✅ 提取器腳本和執行說明
- ✅ 分析框架和映射策略
- ✅ 驗收標準

**不符合的部分**（需要追問）：
- ❌ 缺少實際執行提取的結果
- ❌ 缺少實際檔案內容的分析
- ❌ 缺少實際的 manifest.json、analysis.json、report.generated.md

---

## 二、不符合部分的詳細背景資料與追問要求

### 2.1 【嚴重問題】缺少實際執行結果

#### 問題說明

任務包明確要求執行以下步驟：

1. **步驟 1：檔案提取與結構分析**
   - 讀取所有目標檔案
   - 分析每個檔案的結構（JSON 結構或 JavaScript 邏輯）
   - 記錄檔案大小、行數等基本資訊

2. **步驟 2：內容類型識別**
   - 識別每個檔案的主要內容類型
   - 識別內容的語境

3. **步驟 3：可用性評估**
   - 評估每個檔案對於現有系統的價值
   - 評估轉換難度

4. **步驟 4：建立資料清單**
   - 建立完整的檔案清單
   - 為每個檔案建立詳細說明

但兩個版本都只提供了：
- ✅ 提取器腳本（工具）
- ✅ 分析框架（策略）
- ❌ **缺少實際執行結果**

#### 任務包要求（參考）

根據 `P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION_TASK_PACKET.md`：

**預期產出**：
1. **資料提取報告**：
   - 檔案清單
   - 每個檔案的詳細分析
   - 可用性評估
   - 轉換難度評估

2. **資料結構說明**：
   - 各檔案的結構說明
   - 內容類型分類
   - 語境分析

#### 實際檔案存在性驗證

**已驗證的檔案**（實際檢查結果）：

**Result Templates 資料夾**：
- ✅ `anchor_statements.v1.json` - 存在（約 50KB）
- ✅ `consequence_chain_library.v1.json` - 存在
- ✅ `intervention_boundary_matrix.v1.json` - 存在
- ✅ `attribution_error_matrix.v1.json` - 存在
- ✅ `readingOutputV2.js` - 存在
- ✅ `anchorSelector.js` - 存在
- ✅ `stateTagExtractor.js` - 存在
- ✅ `loader.js` - 存在

**Guidance 資料夾**：
- ✅ `modifiers.json` - 存在
- ⚠️ `guidance.schema.json` - 需要確認
- ⚠️ `schema.json` - 需要確認

**Ontology 資料夾**：
- ⚠️ `resultLexicon.v1.json` - 需要確認實際路徑
- ⚠️ 其他檔案 - 需要確認

#### 實際檔案結構示例（參考）

為了說明需要什麼樣的實際分析，以下是關鍵檔案的實際結構示例（基於實際讀取）：

**anchor_statements.v1.json**：

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/anchor_statements.v1.json`

**實際結構**（基於實際讀取）：
- 檔案類型：JSON
- 檔案大小：50,706 bytes
- 結構類型：object（頂層為 dict）
- 頂層 keys：`['meta', 'items']`

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
- 每個項目的 keys：`['id', 'label', 'mother_theme', 'state_tags', 'confidence', 'uncertainty_note', 'do_not_say', 'safe_tone_template', 'variants', 'why_it_hits']`

**第一個項目示例結構**：
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

**consequence_chain_library.v1.json**：

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/consequence_chain_library.v1.json`

**實際結構**（基於實際讀取）：
- 檔案類型：JSON
- 檔案大小：2,105 bytes
- 結構類型：object（頂層為 dict）
- 頂層 keys：`['meta', 'items']`

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
- 每個項目的 keys：`['id', 'label', 'confidence', 'uncertainty_note', 'do_not_say', 'safe_tone_template']`

**intervention_boundary_matrix.v1.json**：

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

**實際結構**（基於實際讀取）：
- 檔案類型：JSON
- 檔案大小：2,221 bytes
- 結構類型：object（頂層為 dict）
- 頂層 keys：`['meta', 'items']`

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
- 每個項目的 keys：`['id', 'label', 'confidence', 'uncertainty_note', 'do_not_say', 'safe_tone_template']`

**需要的分析**：
- 實際的 JSON 結構（已提供上述結構）
- 實際的內容類型（基於結構和內容判斷：anchor_statements 是敘事模板庫，consequence_chain 是後果鏈庫，intervention_boundary 是規則庫）
- 實際的語境（需要檢查內容中的詞彙，判斷是否包含心理學詞彙）

#### 追問要求

**必須提供**：

1. **實際執行提取結果**：
   - 執行提供的提取器腳本（`extract_legacy_result_presentation.mjs`）
   - 生成實際的 `manifest.json`（包含實際的檔案路徑、大小、hash、行數）
   - 生成實際的 `analysis.json`（包含實際的結構分析、語境偵測、可用性評估）
   - 生成實際的 `report.generated.md`（包含實際的分析報告）

   **或者**：

   - 手動執行提取和分析
   - 提供實際的檔案清單（基於實際檔案，不是預期檔案）
   - 提供實際的結構分析（基於實際讀取的檔案內容）
   - 提供實際的內容摘要（基於實際檔案內容）

2. **實際檔案內容分析**：
   - 至少分析關鍵檔案的實際內容：
     - `anchor_statements.v1.json` - 實際結構、實際內容類型、實際語境
     - `consequence_chain_library.v1.json` - 實際結構、實際內容類型、實際語境
     - `intervention_boundary_matrix.v1.json` - 實際結構、實際內容類型、實際語境
   - 提供實際的 JSON 結構說明（至少是主要結構）
   - 提供實際的內容摘要（基於實際內容，不是推測）

3. **檔案路徑驗證**：
   - 驗證每個檔案的實際路徑
   - 如果檔案不存在，明確說明
   - 如果路徑與預期不同，提供實際路徑

---

### 2.2 【問題】分析表缺乏實際內容依據

#### 問題說明

兩個版本提供的分析表（如「3.1 Result Templates」）中的描述是基於推測，而不是基於實際檔案內容。

**例如**：
- "分數段錨定敘事（開場/說明）" - 這是基於檔案名稱的推測
- "介入觸發邊界" - 這是基於檔案名稱的推測
- "行為→後果鏈" - 這是基於檔案名稱的推測

**但實際上**：
- 需要實際讀取檔案內容
- 需要分析實際的結構
- 需要基於實際內容進行描述

#### 需要的實際分析（參考範例）

以 `anchor_statements.v1.json` 為例：

**如果實際結構是**：
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

**則分析應該是**：
- 結構類型：object，鍵為 band（low/mid/high）
- 內容類型：模板庫（分層敘事模板）
- 語境：需要實際檢查內容中的詞彙

**如果實際結構是**：
```json
[
  {
    "band": "low",
    "text": "...",
    "context": "..."
  }
]
```

**則分析應該是**：
- 結構類型：array of objects
- 內容類型：模板列表
- 語境：需要實際檢查內容中的詞彙

#### 追問要求

**必須提供**：

1. **基於實際內容的分析**：
   - 實際讀取檔案內容
   - 分析實際的結構（至少是主要結構）
   - 基於實際內容進行描述

2. **實際結構說明**：
   - 對於 JSON 檔案，提供實際的 JSON 結構（至少是主要結構，可以用簡化表示）
   - 對於 JavaScript 檔案，提供實際的邏輯說明（至少是主要功能）

---

### 2.3 【問題】缺少檔案路徑驗證

#### 問題說明

兩個版本提供的檔案列表是基於任務包中的預期檔案，但沒有驗證這些檔案是否真的存在於指定路徑。

#### 實際檔案路徑（參考）

**已驗證的實際路徑**：

- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/anchor_statements.v1.json` ✅
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/consequence_chain_library.v1.json` ✅
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json` ✅
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/modifiers.json` ✅

**需要確認的路徑**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/guidance.schema.json` ⚠️
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/schema.json` ⚠️
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/resultLexicon.v1.json` ⚠️
- 其他 ontology 檔案 ⚠️

#### 追問要求

**必須提供**：

1. **檔案存在性驗證**：
   - 驗證每個檔案的實際路徑
   - 如果檔案不存在，明確說明
   - 如果路徑與預期不同，提供實際路徑

2. **完整的檔案清單**：
   - 基於實際驗證的檔案清單
   - 包含實際的檔案路徑
   - 包含檔案大小、行數等基本資訊

---

## 三、符合部分的處理建議

對於符合的部分，建議：

1. **寫入設計文件**：
   - 將提取器腳本和執行說明寫入工具文件
   - 將分析框架和映射策略寫入分析指南文件
   - 將驗收標準寫入驗收文件

2. **保持可回滾**：
   - 所有內容標記為「WORKING BASELINE」（可演化、不鎖定）
   - 明確說明可以根據後續實作調整

---

## 四、具體追問要求總結

### 4.1 必須提供的內容（高優先級）

1. **實際執行提取結果**：
   - 執行提取器腳本，生成實際的 artifacts
   - 或手動執行提取和分析，提供實際結果
   - 必須包含實際的 manifest.json、analysis.json、report.generated.md

2. **實際檔案內容分析**：
   - 至少分析關鍵檔案（anchor_statements.v1.json、consequence_chain_library.v1.json 等）的實際內容
   - 提供實際的結構說明（至少是主要結構）
   - 提供實際的內容摘要（基於實際內容）

3. **檔案存在性驗證**：
   - 驗證每個檔案的實際路徑
   - 提供實際的檔案清單（基於實際驗證）

### 4.2 建議補充的內容（中優先級）

1. **完整檔案分析**：
   - 分析所有目標檔案的實際內容
   - 提供完整的結構說明和內容摘要

---

## 五、完整背景資料（系統要求、設計原則、資料結構）

### 5.1 現有系統的結果呈現需求

#### 5.1.1 4 階段 UI 流程（最新版設計）

根據設計文件，現有系統採用 4 階段 UI 流程：

- **Stage 1（The Wheel）**：先天八卦盤（Primordial Bagua）- Facet Triage
- **Stage 2（Radial Compass）**：五行羅盤（Elemental Compass）- Symbol Selection
- **Stage 3（Projection）**：鑄爻（Casting Lines）- Deep Profiling
- **Stage 4（Results）**：卦象顯影（Hexagram Manifestation）- 結果呈現

#### 5.1.2 Stage 4 結果呈現分層架構（L1-L4）

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

### 5.2 現有系統的結果資料結構範例

#### 5.2.1 narratives.v1.0.json 結構

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

#### 5.2.2 recommendations.v1.0.json 結構

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

#### 5.2.3 riskchains.v1.0.json 結構

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

### 5.3 設計原則與約束

#### 5.3.1 語境純粹性要求（嚴格遵守）

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

4. **禁用詞檢查範例**：

**forbidden_terms.v1.0.json 結構範例**：
```json
{
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

#### 5.3.2 可回滾、不凍結原則

- ✅ **所有資料保持可回滾**：所有提取和整合的資料都可以回滾
- ✅ **不凍結設計**：設計和決策不鎖定，可以根據實作情況調整

#### 5.3.3 以最新版設計為主

- ✅ **以最新版設計為主**：以最新版的網頁設計、UI 設計、風格元素為主
- ✅ **舊資料作為參考**：Legacy 資料作為參考，判斷是否有價值資料可以後續用做討論

### 5.4 映射策略（Legacy → 現有系統）

#### 5.4.1 結構映射表

| Legacy Source | Target (L1-L4) | 轉換策略 | 優先級 |
|--------------|---------------|---------|--------|
| `anchor_statements.v1.json` | **L2 Narratives** | **語義重構**：保留段位結構，內容由心理狀態描述改寫為本命元素生剋描述 | **High** |
| `consequence_chain_library.v1.json` | **L4 RiskChains** | **概念轉譯**：將「行為後果」轉譯為「運勢阻滯/能量流失」，對應 `if_not_improve` 欄位 | **High** |
| `intervention_boundary_matrix.v1.json` | **L4 Recommendations** | **邏輯抽象**：提取其「觸發閾值」邏輯，應用於建議顯示的判斷條件 | **Medium** |
| `modifiers.json` | Vocabulary Base | **詞彙替換**：建立修飾語對照表（如：Severe -> 盛/極） | **Medium** |

#### 5.4.2 語境轉換規則（嚴格遵守）

1. **心理學名詞過濾**：
   - 不得直接翻譯心理學詞彙
   - 必須對應玄學概念（參考 `vocabulary_metaphysical.v1.0.json`）

2. **禁用詞檢查**：
   - 所有產出需通過 `forbidden_terms.v1.0.json` 驗證
   - 如果包含禁用詞，必須替換為建議的替代詞彙

3. **敘事風格調整**：
   - 從「臨床診斷」轉為「譬喻/指引式」
   - 從「科學解釋」轉為「玄學敘事」

### 5.5 任務包要求（完整摘要）

#### 5.5.1 任務目標

完整提取 Legacy 系統中與結果呈現相關的所有資料，並進行詳細分析。

#### 5.5.2 執行步驟

1. **步驟 1：檔案提取與結構分析**
   - 讀取所有目標檔案
   - 分析每個檔案的結構（JSON 結構或 JavaScript 邏輯）
   - 記錄檔案大小、行數等基本資訊

2. **步驟 2：內容類型識別**
   - 識別每個檔案的主要內容類型
   - 識別內容的語境（心理學 vs 玄學）

3. **步驟 3：可用性評估**
   - 評估每個檔案對於現有系統的價值
   - 評估轉換難度

4. **步驟 4：建立資料清單**
   - 建立完整的檔案清單
   - 為每個檔案建立詳細說明

#### 5.5.3 預期產出

1. **資料提取報告**：
   - 檔案清單
   - 每個檔案的詳細分析
   - 可用性評估
   - 轉換難度評估

2. **資料結構說明**：
   - 各檔案的結構說明
   - 內容類型分類
   - 語境分析

---

## 六、參考資料

### 6.1 任務包要求

- `P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION_TASK_PACKET.md` - 任務包文件

### 6.2 實際檔案路徑

**Result Templates**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`

**Guidance**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/`

**Ontology**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/`

---

**狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-11
