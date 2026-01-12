# ENGINE_CORE_LOGIC_V3 DIRECTIVE 追問包

**建立日期**：2026-01-12  
**狀態**：OPEN（等待指揮官確認）  
**目的**：針對 ENGINE_CORE_LOGIC_V3 DIRECTIVE 中需要確認的技術細節進行追問

---

## 📋 追問概述

ENGINE_CORE_LOGIC_V3 DIRECTIVE（`docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`）已寫入，但以下技術細節需要指揮官確認後才能完全實作：

1. **`exclude_from_volatility` 欄位的 Schema 擴充**
2. **驗證題（Validation/Barnum）的定義**

---

## 📚 完整背景資料

### 背景 1：ENGINE_CORE_LOGIC_V3 DIRECTIVE 決策

**文件位置**：`docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`

**核心裁示**：
1. **Rigidity Index**：三層計算模型（Layer A/B/C），包含具體數值映射和 Python 實作
2. **Volatility Index**：正規化規則、排除規則、Canonical Implementation
3. **Debug Payload**：完整的 JSON Schema
4. **L1-L4 與風險鏈**：明確的結構分工
5. **參數預設值**：Engine-Level Canonical Defaults

**關鍵技術點**：
- Volatility Index 計算時需要排除某些題型（驗證題、二選一的情境鎖定題、非強度量測題）
- 實作方式是在 `inputs_config` 中檢查 `exclude_from_volatility` 欄位
- 但現有的 Facet schema 中沒有這個欄位

---

### 背景 2：現有 Facet Schema

**文件位置**：`domain/facets/stress_recovery.scoring.v1.0.json`

**當前結構**：
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
  "bands": [...]
}
```

**注意**：
- 現有的 `inputs` 結構中沒有 `exclude_from_volatility` 欄位
- 也沒有 `question_type` 或類似的欄位來標示題目類型

---

### 背景 3：題目設計指南

**文件位置**：`domain/knowledge_base/question_design_guidelines.v1.0.md`

**當前內容**：
- 定義了「去問卷化」原則
- 定義了題目語境要求
- 定義了題目結構要求（Stage 1/2/3）

**注意**：
- 沒有明確定義「驗證題（Validation/Barnum）」的概念
- 沒有說明哪些題目應該被視為驗證題

---

### 背景 4：ENGINE_CORE_LOGIC_MASTER_V3 規格

**文件位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`

**相關內容**：
- Section 2.2 提到題目類型配比：
  - Core State (30%)
  - Symptom/Validation (20%) - **驗證題**
  - Reaction (30%)
  - Resources (20%)

**注意**：
- 規格中提到「驗證題（Symptom/Validation）」，但沒有明確說明如何標示這些題目

---

### 背景 5：現有實作

**文件位置**：`engine/score_facet.py`

**當前實作**：
- 只支援 `weighted_sum` 模型
- 計算時不考慮 Volatility Index
- 不區分題目類型

---

## ⚠️ 追問項目 1：`exclude_from_volatility` 欄位的 Schema 擴充

### 問題描述

DIRECTIVE 中提到：
- Volatility Index 計算時需要排除某些題型（驗證題、二選一的情境鎖定題、非強度量測題）
- 實作方式是在 `inputs_config` 中檢查 `exclude_from_volatility` 欄位
- 但現有的 Facet schema（`domain/facets/*.scoring.v1.0.json`）中沒有這個欄位

### 追問問題

1. **Schema 擴充方式**：
   - 是否需要在 Facet schema 中新增 `exclude_from_volatility` 欄位？
   - 還是應該根據題目類型（`type`）自動判斷？
   - 如果根據題目類型判斷，哪些 `type` 應該被排除？

2. **向後相容性**：
   - 如果新增欄位，現有的 Facet（如 `stress_recovery`）是否需要更新？
   - 還是應該預設為 `false`（即不排除）？

3. **實作優先級**：
   - 如果 Facet 沒有提供 `exclude_from_volatility` 欄位，應該如何處理？
   - 預設行為是什麼？

### 建議選項

**選項 A：新增欄位（推薦）**
```json
{
  "model": "vector_state_v3",
  "inputs": [
    {
      "questionId": "sr_q1",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": false  // 新增欄位，預設 false
    },
    {
      "questionId": "sr_q2",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": true  // 驗證題，排除
    }
  ]
}
```

**優點**：
- 明確、可控制
- 每個題目可以獨立設定

**缺點**：
- 需要更新現有 Facet
- 需要修改 Facet schema

---

**選項 B：根據題目類型自動判斷**
```python
# 在引擎中定義排除規則
EXCLUDED_QUESTION_TYPES = ["validation", "barnum", "categorical", "binary_choice"]

def should_exclude_from_volatility(question_type):
    return question_type in EXCLUDED_QUESTION_TYPES
```

**優點**：
- 不需要修改 Facet schema
- 自動化處理

**缺點**：
- 需要明確定義題目類型
- 可能不夠靈活（無法針對特定題目調整）

---

**選項 C：混合方式（最靈活）**
```json
{
  "model": "vector_state_v3",
  "inputs": [
    {
      "questionId": "sr_q1",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "question_type": "core_state",  // 新增欄位
      "exclude_from_volatility": false  // 可選，預設根據 question_type 判斷
    }
  ],
  "volatility_exclusion_rules": {  // 可選，全局規則
    "exclude_types": ["validation", "barnum"],
    "exclude_question_ids": []  // 可選，特定題目排除
  }
}
```

**優點**：
- 最靈活
- 支援全局規則和個別設定

**缺點**：
- 最複雜
- 需要更多的 Schema 定義

---

## ⚠️ 追問項目 2：驗證題（Validation/Barnum）的定義

### 問題描述

DIRECTIVE 中提到：
- 「驗證題（Barnum / Physiological Anchors）」應該被排除在 Volatility 計算之外
- 但現有系統中沒有明確的「驗證題」定義
- 需要確認哪些題目應該被視為驗證題

### 追問問題

1. **驗證題的定義**：
   - 驗證題的具體定義是什麼？
   - 是否就是 ENGINE_CORE_LOGIC_MASTER_V3 中提到的「Symptom/Validation (20%)」？
   - 驗證題的目的是什麼？（建立信任、驗證準確度？）

2. **驗證題的識別**：
   - 如何識別一個題目是驗證題？
   - 是否需要新增 `question_type` 欄位來標示？
   - 還是應該根據題目內容自動判斷？

3. **驗證題的範圍**：
   - 除了驗證題，還有哪些題型應該被排除？
   - 「二選一的情境鎖定題」和「非強度量測題（分類題）」的具體定義是什麼？

### 建議選項

**選項 A：在題目設計指南中明確定義（推薦）**
```markdown
## 驗證題（Validation Questions）

**定義**：
驗證題是用於建立使用者信任的題目，通常詢問具體的生理/行為徵兆（如睡眠、肌肉僵硬）。

**特徵**：
- 詢問具體、可觀察的現象
- 答案通常與使用者的實際經驗高度一致
- 目的不是測量心理狀態，而是驗證系統的準確度

**範例**：
- 「近來似有夜不成眠、肩背沈重之象...」
- 「最近 7 天，你的睡眠恢復感如何？」

**Volatility 計算**：
- 驗證題不應納入 Volatility 計算，因為它們的目的是驗證而非測量不穩定性
```

**選項 B：在 Facet schema 中標示**
```json
{
  "questions": [
    {
      "id": "sr_q1",
      "text": "...",
      "type": "likert_5",
      "question_category": "validation"  // 新增欄位
    }
  ]
}
```

---

## 📝 等待指揮官確認

請指揮官確認以上追問問題，以便：
1. 完成 Facet schema 的擴充
2. 更新題目設計指南
3. 完成 V3 Engine 的完整實作

---

---

## ✅ 追問狀態更新

**更新日期**：2026-01-12  
**狀態**：RESOLVED（所有問題已解決）

**解決文件**：`docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`

**解決內容**：
1. ✅ **`exclude_from_volatility` 欄位的 Schema 擴充** - 已確定採用「選項 A（顯式宣告）」
2. ✅ **驗證題（Validation/Barnum）的定義** - 已提供完整的工程定義和識別方式

---

**建立日期**：2026-01-12  
**狀態**：RESOLVED（所有問題已解決）  
**關聯 DIRECTIVE**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - 原始裁示
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終裁示（解決所有追問）
