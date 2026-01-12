# P0-12 Legacy Map 完整映射提取任務包

**建立日期**：2026-01-12  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**任務目標**：完成所有領域的 legacy_map 完整映射（100% 提取舊版本資料）

---

## 一、任務目標

### 1.1 核心目標

將舊版本（Legacy）的 `questionBank.v1.json` 中的所有 `pattern_tags` 和 `choice_meta.behavior_facet` 資料，完整提取並映射到新版本的 `legacy_map.v1.0.json` 中。

**目標**：
- ✅ 完成所有 8 個領域的完整映射
- ✅ 每個領域的所有 7 題都要有完整映射
- ✅ 每個題目的所有 5 個選項（choice index 0-4）都要有映射
- ✅ 確保 100% 提取，不遺漏任何資料

---

### 1.2 當前狀態

**已完成**：
- ✅ `chronic_depletion`：完整的 7 題映射（所有 choice indices 0-4）

**待完成**：
- ⚠️ `chronic_alertness`：目前只有 1 題的範例映射
- ⚠️ `fear_based_stability`：目前只有 1 題的範例映射
- ⚠️ `hyper_responsibility`：目前只有 1 題的範例映射
- ⚠️ `identity_diffusion`：目前只有 1 題的範例映射
- ⚠️ `loss_of_agency`：目前只有 1 題的範例映射
- ⚠️ `meaning_vacuum`：目前只有 1 題的範例映射
- ⚠️ `suppressed_needs`：目前只有 1 題的範例映射

---

## 二、完整背景資料

### 2.1 系統設計和終極目標

#### 2.1.1 UI/互動介面設計（Stage 1-4）

**設計文件**：`P0-5.7_DESIGN_DOC_FINAL.md`（世界觀設計最終版）

**四階段設計**：

**Stage 1（The Wheel / 八卦盤）**：
- UI隱喻：先天八卦盤（Primordial Bagua）
- 功能：Facet Triage（領域分類）
- 互動方式：使用者選擇對應的八卦領域
- 題目形式：單一對象選擇（對應八個領域）

**Stage 2（Radial Compass / 五行羅盤）**：
- UI隱喻：五行羅盤（Elemental Compass）
- 功能：Symbol Selection（符號選擇）
- 互動方式：使用者選擇五行元素相關的符號
- 題目形式：單一對象選擇（五行元素相關）

**Stage 3（Projection / 鑄爻）**：
- UI隱喻：鑄爻（Casting Lines）
- 功能：Deep Profiling（深度分析）
- 互動方式：基於 Stage 1-2 的選擇，進行量表問答
- 題目形式：likert_5（5點量表，但以玄學語境呈現）
- **關鍵**：使用者選擇 5 個選項中的一個（choice index 0-4）

**Stage 4（Results / 卦象顯影）**：
- UI隱喻：卦象顯影（Hexagram Manifestation）
- 功能：結果呈現（L1-L4 分層架構）
- 輸出內容：
  - L1：Hexagram Visual（卦象視覺）
  - L2：Root Personalization（根元素個人化敘事）
  - L3：Flow Analysis（流動分析）
  - L4：Risk Blocking & Action Advice（風險阻斷與行動建議）

---

#### 2.1.2 題目設計原則

**設計文件**：`domain/knowledge_base/question_design_guidelines.v1.0.md`

**核心原則**：
- **De-Questionnaire 原則**：避免傳統問卷元素（滑桿、Likert量表UI）
- **儀式化互動**：單一對象選擇，避免多選
- **語境純粹性**：完全使用玄學語境，禁止心理學術語
- **結構映射**：題目映射到易經矩陣系統（八卦、五行、六十四卦）

**題型設計**：
- 題目類型：`likert_5`（5點量表）
- 選項設計：使用玄學語境的選項文字（如「巨石壓身，難以動彈」等）
- 互動方式：單一選擇，而非滑桿或多選
- **選項索引**：0（最差/最嚴重）到 4（最好/最健康）

---

#### 2.1.3 legacy_map 的作用和重要性

**legacy_map 的目的**：
1. **雙向追溯**：新版本題目可以追溯到舊版本的來源
2. **Pattern 映射**：使用者選擇的選項（choice index）對應到舊版本的 behavior pattern
3. **權重對應**：保留舊版本的權重資訊，用於分析和驗證
4. **未來擴展**：為未來的功能擴展（如 pattern 分析、推薦系統）提供基礎資料

**為什麼需要完整映射**：
- 舊版本的 `pattern_tags` 和 `choice_meta.behavior_facet` 包含了豐富的行為模式資訊
- 這些資訊對於理解使用者行為、提供個性化建議、風險評估等都很有價值
- 完整映射可以確保不遺漏任何有價值的資料

---

### 2.2 新版本結構（已確定）

#### 2.2.1 legacy_map 標準結構

**文件位置**：`domain/knowledge_base/legacy_map.v1.0.json`

**標準結構**：
```json
{
  "{domain_id}": {
    "domainId": "{domain_id}",
    "mappings": {
      "{question_id}": {
        "0": {
          "pattern": "{pattern_name}",
          "legacy_weight": {weight_value}
        },
        "1": {
          "pattern": "{pattern_name}",
          "legacy_weight": {weight_value}
        },
        "2": {
          "pattern": "{pattern_name}",
          "legacy_weight": {weight_value}
        },
        "3": {
          "pattern": "{pattern_name}",
          "legacy_weight": {weight_value}
        },
        "4": {
          "pattern": "{pattern_name}",
          "legacy_weight": {weight_value}
        }
      }
    }
  }
}
```

**關鍵要求**：
- ✅ 每個領域必須有 `domainId` 欄位
- ✅ 每個題目（question_id）必須有完整映射
- ✅ 每個選項（choice index 0-4）都必須有 `pattern` 和 `legacy_weight`
- ✅ `pattern` 對應到舊版本的 `choice_meta.behavior_facet` 或 `pattern_tags`
- ✅ `legacy_weight` 對應到舊版本的 `confidence_weight`

---

#### 2.2.2 完整範例：chronic_depletion

**參考文件**：`domain/knowledge_base/legacy_map.v1.0.json`（`chronic_depletion` 部分）

**完整結構範例**：
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
        },
        "2": {
          "pattern": "observe_and_wait",
          "legacy_weight": 1.2
        },
        "3": {
          "pattern": "seek_support",
          "legacy_weight": 1.2
        },
        "4": {
          "pattern": "full_restoration",
          "legacy_weight": 1.2
        }
      },
      "cd_q2": {
        "0": { "pattern": "...", "legacy_weight": 1.1 },
        "1": { "pattern": "...", "legacy_weight": 1.1 },
        "2": { "pattern": "...", "legacy_weight": 1.1 },
        "3": { "pattern": "...", "legacy_weight": 1.1 },
        "4": { "pattern": "...", "legacy_weight": 1.1 }
      },
      // ... 所有 7 題都要有完整映射
      "cd_q7": {
        "0": { "pattern": "...", "legacy_weight": 1.0 },
        "1": { "pattern": "...", "legacy_weight": 1.0 },
        "2": { "pattern": "...", "legacy_weight": 1.0 },
        "3": { "pattern": "...", "legacy_weight": 1.0 },
        "4": { "pattern": "...", "legacy_weight": 1.0 }
      }
    }
  }
}
```

---

### 2.3 舊版本結構（資料來源）

#### 2.3.1 舊版本 questionBank 結構

**文件位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`

**舊版本結構範例**：
```json
{
  "themes": [
    {
      "theme_id": "chronic_depletion",
      "questions": [
        {
          "question_id": "depletion_01",
          "question_text": "...",
          "choices": [
            {
              "choice_text": "...",
              "confidence_weight": 1.2,
              "choice_meta": {
                "behavior_facet": "withdraw_and_protect"
              }
            },
            {
              "choice_text": "...",
              "confidence_weight": 1.2,
              "choice_meta": {
                "behavior_facet": "push_through"
              }
            },
            // ... 其他選項
          ],
          "pattern_tags": ["..."]
        }
      ]
    }
  ]
}
```

**關鍵欄位對應**：
- `choice_meta.behavior_facet` → 新版本的 `pattern`
- `confidence_weight` → 新版本的 `legacy_weight`
- `choices` 陣列索引 → 新版本的 choice index (0-4)

---

#### 2.3.2 新舊版本對應關係

**領域對應表**：

| 新版本領域 | 舊版本主題 ID | 題數 | 映射狀態 |
|-----------|--------------|------|---------|
| chronic_depletion | chronic_depletion | 7 | ✅ 已完成 |
| chronic_alertness | emotional_permeability | 7 | ⚠️ 待完成 |
| fear_based_stability | fear based stability + avoidance_coping | 7 | ⚠️ 待完成 |
| hyper_responsibility | hyper_responsibility | 7 | ⚠️ 待完成 |
| identity_diffusion | identity_diffusion | 7 | ⚠️ 待完成 |
| loss_of_agency | loss_of_agency | 7 | ⚠️ 待完成 |
| meaning_vacuum | social_comparison | 7 | ⚠️ 待完成 |
| suppressed_needs | suppressed_needs | 7 | ⚠️ 待完成 |

---

### 2.4 新版本 questions 文件（已確定）

**文件位置**：`domain/questions/{domain_id}.questions.v1.0.json`

**結構範例**（`chronic_alertness`）：
```json
[
  {
    "id": "ca_q1",
    "text": "如同行走在薄冰之上，隨時準備應對腳下可能出現的裂痕。",
    "type": "likert_5",
    "scale": [
      "薄冰將碎，隨時陷落",
      "裂痕四起，步步驚心",
      "冰層脆弱，需輕步慢行",
      "偶有冰裂，尚能平衡",
      "大地堅實，步履安穩"
    ]
  },
  // ... 其他 6 題
]
```

**關鍵資訊**：
- 每個題目都有 `id`（如 `ca_q1`, `ca_q2`, ...）
- 每個題目都有 5 個選項（`scale` 陣列）
- 選項索引：0（最嚴重）到 4（最健康）

---

### 2.5 新版本 scoring 文件（已確定）

**文件位置**：`domain/facets/{domain_id}.scoring.v1.0.json`

**結構範例**（`chronic_alertness`）：
```json
{
  "model": "weighted_sum",
  "inputs": [
    { "questionId": "ca_q1", "weight": 1.2, "direction": "higher_is_worse" },
    { "questionId": "ca_q2", "weight": 1.0, "direction": "higher_is_worse" },
    // ... 其他題目
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

**關鍵資訊**：
- 每個題目的 `weight` 對應到舊版本的 `confidence_weight`
- `legacy_weight` 應該與 `scoring` 文件中的 `weight` 一致

---

## 三、提取和轉換方法

### 3.1 提取步驟

#### 步驟 1：識別舊版本主題

1. 在舊版本的 `questionBank.v1.json` 中找到對應的主題
2. 確認主題 ID 和題目列表
3. 確認每個題目的 `choices` 陣列和 `choice_meta`

---

#### 步驟 2：對應新版本題目

1. 在新版本的 `questions.v1.0.json` 中找到對應的題目
2. 建立舊版本題目 ID 到新版本題目 ID 的對應關係
3. 確認新版本題目的 `scale` 陣列（5 個選項）

---

#### 步驟 3：提取 pattern 和 weight

對於每個題目的每個選項：

1. **提取 pattern**：
   - 從舊版本的 `choice_meta.behavior_facet` 提取
   - 如果沒有 `behavior_facet`，可以從 `pattern_tags` 推導
   - 保持舊版本的 pattern 名稱（不要修改）

2. **提取 legacy_weight**：
   - 從舊版本的 `confidence_weight` 提取
   - 如果題目級別有權重，使用題目級別的權重
   - 如果選項級別有權重，使用選項級別的權重

3. **對應 choice index**：
   - 舊版本的 `choices` 陣列索引對應到新版本的 choice index (0-4)
   - 注意：舊版本的選項順序可能與新版本不同，需要根據語意對應

---

#### 步驟 4：建立映射結構

1. 為每個領域建立 `domainId` 和 `mappings`
2. 為每個題目建立完整的映射（choice 0-4）
3. 確保所有欄位都存在（`pattern` 和 `legacy_weight`）

---

### 3.2 轉換範例

#### 範例 1：chronic_depletion（已完成，作為參考）

**舊版本資料**（假設）：
```json
{
  "theme_id": "chronic_depletion",
  "questions": [
    {
      "question_id": "depletion_01",
      "choices": [
        {
          "choice_text": "完全無法恢復",
          "confidence_weight": 1.2,
          "choice_meta": {
            "behavior_facet": "withdraw_and_protect"
          }
        },
        {
          "choice_text": "很難恢復",
          "confidence_weight": 1.2,
          "choice_meta": {
            "behavior_facet": "push_through"
          }
        }
        // ... 其他選項
      ]
    }
  ]
}
```

**新版本映射**：
```json
{
  "cd_q1": {
    "0": {
      "pattern": "withdraw_and_protect",
      "legacy_weight": 1.2
    },
    "1": {
      "pattern": "push_through",
      "legacy_weight": 1.2
    }
    // ... 其他選項
  }
}
```

---

#### 範例 2：chronic_alertness（待完成）

**新版本題目**（`chronic_alertness.questions.v1.0.json`）：
```json
[
  {
    "id": "ca_q1",
    "text": "如同行走在薄冰之上，隨時準備應對腳下可能出現的裂痕。",
    "type": "likert_5",
    "scale": [
      "薄冰將碎，隨時陷落",        // choice 0
      "裂痕四起，步步驚心",        // choice 1
      "冰層脆弱，需輕步慢行",      // choice 2
      "偶有冰裂，尚能平衡",        // choice 3
      "大地堅實，步履安穩"         // choice 4
    ]
  }
]
```

**需要提取的舊版本資料**：
- 從 `emotional_permeability` 主題中提取
- 找到對應的題目（語意相似）
- 提取每個選項的 `choice_meta.behavior_facet` 和 `confidence_weight`

**預期映射結構**：
```json
{
  "chronic_alertness": {
    "domainId": "chronic_alertness",
    "mappings": {
      "ca_q1": {
        "0": { "pattern": "{從舊版本提取}", "legacy_weight": {從舊版本提取} },
        "1": { "pattern": "{從舊版本提取}", "legacy_weight": {從舊版本提取} },
        "2": { "pattern": "{從舊版本提取}", "legacy_weight": {從舊版本提取} },
        "3": { "pattern": "{從舊版本提取}", "legacy_weight": {從舊版本提取} },
        "4": { "pattern": "{從舊版本提取}", "legacy_weight": {從舊版本提取} }
      },
      "ca_q2": { ... },
      // ... 所有 7 題
      "ca_q7": { ... }
    }
  }
}
```

---

### 3.3 注意事項

1. **語意對應**：
   - 新版本的選項文字已經轉換為玄學語境
   - 需要根據語意對應到舊版本的選項，而不是簡單的索引對應
   - 如果語意不對應，需要根據邏輯推導

2. **權重一致性**：
   - `legacy_weight` 應該與 `scoring` 文件中的 `weight` 一致
   - 如果題目級別有權重，所有選項使用相同的權重
   - 如果選項級別有權重，使用選項級別的權重

3. **Pattern 名稱**：
   - 保持舊版本的 pattern 名稱（不要修改）
   - 如果舊版本沒有 `behavior_facet`，可以從 `pattern_tags` 推導
   - 如果完全沒有，可以使用語意相近的 pattern 名稱

4. **完整性**：
   - 所有 8 個領域都要有完整映射
   - 所有 7 題都要有完整映射
   - 所有 5 個選項（choice 0-4）都要有映射

---

## 四、任務要求

### 4.1 需要完成的領域

以下 7 個領域需要完成完整映射：

1. **chronic_alertness**（對應舊版本：`emotional_permeability`）
2. **fear_based_stability**（對應舊版本：`fear based stability` + `avoidance_coping`）
3. **hyper_responsibility**（對應舊版本：`hyper_responsibility`）
4. **identity_diffusion**（對應舊版本：`identity_diffusion`）
5. **loss_of_agency**（對應舊版本：`loss_of_agency`）
6. **meaning_vacuum**（對應舊版本：`social_comparison`）
7. **suppressed_needs**（對應舊版本：`suppressed_needs`）

---

### 4.2 輸出要求

**輸出格式**：
- 完整的 JSON 結構
- 符合新版本的 `legacy_map.v1.0.json` 標準結構
- 所有欄位都必須存在（`pattern` 和 `legacy_weight`）

**輸出內容**：
- 每個領域的完整映射（所有 7 題，所有 5 個選項）
- 可以只提供新增的 7 個領域，或者提供完整的 8 個領域（包含已完成的 `chronic_depletion`）

---

### 4.3 驗證標準

**通過標準**：
1. ✅ 所有 7 個領域都有完整映射
2. ✅ 每個領域的所有 7 題都有完整映射
3. ✅ 每個題目的所有 5 個選項（choice 0-4）都有映射
4. ✅ 所有映射都包含 `pattern` 和 `legacy_weight`
5. ✅ `legacy_weight` 與 `scoring` 文件中的 `weight` 一致
6. ✅ JSON 結構符合標準格式

---

## 五、參考資料

### 5.1 已完成範例

**參考文件**：
- `domain/knowledge_base/legacy_map.v1.0.json`（`chronic_depletion` 部分）

**參考結構**：
- 完整的 7 題映射
- 每個題目的 5 個選項映射
- 標準的 JSON 結構

---

### 5.2 新版本文件（已確定）

**questions 文件**：
- `domain/questions/chronic_alertness.questions.v1.0.json`
- `domain/questions/fear_based_stability.questions.v1.0.json`
- `domain/questions/hyper_responsibility.questions.v1.0.json`
- `domain/questions/identity_diffusion.questions.v1.0.json`
- `domain/questions/loss_of_agency.questions.v1.0.json`
- `domain/questions/meaning_vacuum.questions.v1.0.json`
- `domain/questions/suppressed_needs.questions.v1.0.json`

**scoring 文件**：
- `domain/facets/chronic_alertness.scoring.v1.0.json`
- `domain/facets/fear_based_stability.scoring.v1.0.json`
- `domain/facets/hyper_responsibility.scoring.v1.0.json`
- `domain/facets/identity_diffusion.scoring.v1.0.json`
- `domain/facets/loss_of_agency.scoring.v1.0.json`
- `domain/facets/meaning_vacuum.scoring.v1.0.json`
- `domain/facets/suppressed_needs.scoring.v1.0.json`

---

### 5.3 舊版本文件（資料來源）

**文件位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`

**關鍵欄位**：
- `themes[].theme_id`
- `themes[].questions[].question_id`
- `themes[].questions[].choices[].choice_meta.behavior_facet`
- `themes[].questions[].choices[].confidence_weight`

---

## 六、最終交付

### 6.1 交付內容

**主要交付**：
- 完整的 `legacy_map.v1.0.json` 結構（包含所有 8 個領域的完整映射）

**輔助交付**（可選）：
- 提取過程記錄（說明如何對應新舊版本）
- 問題說明（如果遇到無法對應的情況）

---

### 6.2 交付格式

**格式**：
- JSON 格式
- 符合 `domain/knowledge_base/legacy_map.v1.0.json` 標準結構
- 可以直接合併到現有文件中

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**任務狀態**：READY FOR EXECUTION
