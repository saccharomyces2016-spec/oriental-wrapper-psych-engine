# ENGINE_CORE_LOGIC_V3 FINAL TECHNICAL DIRECTIVES 審核報告

**審核日期**：2026-01-12  
**審核文件**：ENGINE CORE LOGIC V3 — FINAL TECHNICAL DIRECTIVES (HARDENED)  
**審核狀態**：95% 符合，5% 需追問確認

---

## 📋 審核摘要

### 整體評估

這份「最終工程級強化版」文件質量極高，幾乎完全解決了追問包中的所有技術細節問題。文件提供了：
- ✅ 完整的 Rigidity Index 三層計算模型（包含具體數值映射）
- ✅ 完整的 Volatility Index 計算細節（包含正規化和排除規則）
- ✅ 完整的 Debug Payload JSON Schema
- ✅ 明確的 L1-L4 與風險鏈整合說明
- ✅ 完整的參數預設值處理機制

**符合度**：約 95% 可直接寫入，5% 需要追問確認

---

## ✅ 符合任務需求的部分（可直接寫入）

### 1. 裁示 1：Rigidity Index（固著指數）

**符合度**：✅ **100% 符合**

**符合的部分**：
- ✅ 提供了完整的正式定義（Canonical Definition）
- ✅ 提供了三層計算模型（Layer A/B/C）
- ✅ 提供了具體的數值映射表（Base Rigidity）
- ✅ 提供了 Agency Modifier 的具體數值
- ✅ 提供了完整的 Python 實作（Canonical Implementation）
- ✅ 與 P0-4.5 的 `attribution_profile` 結構完全一致

**寫入位置**：`docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`

---

### 2. 裁示 2：Volatility Index（波動指數）

**符合度**：✅ **95% 符合**

**符合的部分**：
- ✅ 提供了正規化規則（Normalization）
- ✅ 提供了排除規則（Exclusion Rules）
- ✅ 提供了完整的 Python 實作（Canonical Implementation）
- ✅ 提供了解讀區間（Narrative Binding）

**待確認**：`exclude_from_volatility` 欄位在現有 Facet schema 中不存在，需要確認是否要新增此欄位

---

### 3. 裁示 3：Debug Payload

**符合度**：✅ **100% 符合**

**符合的部分**：
- ✅ 提供了完整的 JSON Schema
- ✅ 明確了 `_meta` 的定位（必須存在、UI 不顯示、Log 保留）
- ✅ 包含了所有必要的審計追蹤數據

---

### 4. 裁示 4：L1-L4 與風險鏈的嚴格分工

**符合度**：✅ **100% 符合**

**符合的部分**：
- ✅ 明確了風險鏈只存在於 L4
- ✅ 提供了 L4 的最終結構圖
- ✅ 與現有的 `result_presentation_design.v1.0.md` 一致

---

### 5. 裁示 5：參數預設值治理

**符合度**：✅ **100% 符合**

**符合的部分**：
- ✅ 提供了 Engine-Level Canonical Defaults
- ✅ 提供了合併規則（不可變）
- ✅ 明確了 Facet 可覆寫但引擎負責完整性的原則

---

## ⚠️ 需要追問的部分

### 1. `exclude_from_volatility` 欄位的 Schema 擴充

**問題描述**：
- 文件中提到「以下題型不得納入 Volatility 計算」：驗證題、二選一的情境鎖定題、非強度量測題
- 實作方式是在 `inputs_config` 中檢查 `exclude_from_volatility` 欄位
- 但現有的 Facet schema（`domain/facets/*.scoring.v1.0.json`）中沒有這個欄位

**追問問題**：
1. 是否需要在 Facet schema 中新增 `exclude_from_volatility` 欄位？
2. 還是應該根據題目類型（`type`）自動判斷？
3. 如果根據題目類型判斷，哪些 `type` 應該被排除？

**建議選項**：

**選項 A：新增欄位（推薦）**
```json
{
  "questionId": "sr_q1",
  "weight": 1.0,
  "direction": "higher_is_worse",
  "exclude_from_volatility": true  // 新增欄位
}
```

**選項 B：根據題目類型自動判斷**
```python
# 在引擎中定義排除規則
EXCLUDED_TYPES = ["validation", "barnum", "categorical"]
if question_type in EXCLUDED_TYPES:
    exclude_from_volatility = True
```

**選項 C：混合方式**
- 預設根據題目類型判斷
- Facet 可以透過 `exclude_from_volatility` 欄位覆寫

---

### 2. 驗證題（Validation/Barnum）的定義

**問題描述**：
- 文件中提到「驗證題（Barnum / Physiological Anchors）」應該被排除
- 但現有系統中沒有明確的「驗證題」定義
- 需要確認哪些題目應該被視為驗證題

**追問問題**：
1. 驗證題的具體定義是什麼？
2. 是否需要在題目設計指南中明確定義驗證題？
3. 現有的 `stress_recovery` Facet 中是否有驗證題？

**建議**：
- 在 `domain/knowledge_base/question_design_guidelines.v1.0.md` 中新增驗證題的定義
- 或在 Facet schema 中新增 `question_type` 欄位來標示題目類型

---

## 📝 寫入策略

### 策略 1：直接寫入符合的部分

**寫入位置**：`docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`

**寫入內容**：
1. ✅ 裁示 1：Rigidity Index（100% 符合）
2. ✅ 裁示 2：Volatility Index（95% 符合，需標註待確認部分）
3. ✅ 裁示 3：Debug Payload（100% 符合）
4. ✅ 裁示 4：L1-L4 與風險鏈（100% 符合）
5. ✅ 裁示 5：參數預設值（100% 符合）

**狀態標記**：
- 所有內容標記為 `EXECUTABLE / AUDIT-SAFE / CODE-FREEZE`
- 明確標註哪些部分需要後續追問確認

---

### 策略 2：建立追問包（需追問的部分）

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md`

**追問內容**：
1. ⚠️ `exclude_from_volatility` 欄位的 Schema 擴充
2. ⚠️ 驗證題（Validation/Barnum）的定義

---

## 🎯 建議執行順序

1. **立即執行**：寫入符合的部分到 `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`
2. **建立追問包**：為需追問的部分建立追問包（包含完整背景資料）
3. **更新 ADR**：更新 `ADR_0005_vector_state_scoring_engine.md`，標記所有追問已解決
4. **更新任務記錄**：記錄審核結果和後續行動

---

**審核完成時間**：2026-01-12  
**審核者**：Cursor（總指揮）
