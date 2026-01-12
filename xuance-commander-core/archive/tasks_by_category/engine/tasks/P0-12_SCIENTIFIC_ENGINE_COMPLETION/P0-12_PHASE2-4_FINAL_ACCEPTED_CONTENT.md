# P0-12 階段二-4 最終版本符合要求內容（可寫入文本）

**建立日期**：2026-01-12  
**來源**：P0-12 階段二-4 最終結案報告 v3 追問補完・完整權威版  
**審核結果**：✅ **通過（完全符合追問包要求）**  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、說明

本文件提取了顧問團隊交付內容中**完全符合 v3 追問包要求**的部分，可以直接寫入文本作為設計基準。

**審核結論**：✅ **第二個版本（v3 追問補完・完整權威版）完全通過審核**

**通過的部分**：
- ✅ 完整規則文件（39 條規則，完整列出）
- ✅ 驗證機制詳細說明和範例（完整）
- ✅ 規則應用指南詳細說明和範例（完整）
- ✅ 整合報告詳細說明（完整）

**詳細審核報告**：`P0-12_PHASE2-4_FINAL_AUDIT_REPORT.md`

---

## 二、完整規則文件（符合要求）

### 2.1 規則結構定義（Schema）

```json
{
  "rule_id": "string",
  "rule_type": "decision | presentation | boundary | ai_constraint | validation",
  "applicable_layer": "GLOBAL | L1 | L2 | L3 | L4",
  "applicable_band": "low | mid | high | all",
  "trigger_condition": "string",
  "rule_description": "string",
  "action": "string",
  "violation_handling": "invalidate | drop | trim | regenerate | reject",
  "source": "buildGuidance | guidancePrinciples | intervention_boundary | stage4_canon"
}
```

### 2.2 完整規則清單（39 條規則）

#### A. buildGuidance.js 決策規則（10 條）

| Rule ID | Type | Layer | Band | Trigger | Action | Source |
| --- | --- | --- | --- | --- | --- | --- |
| **BG_THEME_PRIORITY** | decision | GLOBAL | all | `themeHits` 非空 | 僅使用 Theme 對應建議 (Facet-Centric) | buildGuidance |
| **BG_DOMAIN_FALLBACK** | decision | GLOBAL | all | `themeHits` 為空 | 使用 Domain 建議（Stage 4 中轉為 Facet 保底） | buildGuidance |
| **BG_NO_FABRICATION** | decision | GLOBAL | all | 無可用建議 | 回傳空集合，禁止補寫 | buildGuidance |
| **BG_RISK_CHAIN_TRIGGER** | decision | L4 | mid/high | `riskLevel >= MID` 且命中 `riskTheme` | 生成 Risk Chain | buildGuidance |
| **BG_RISK_CHAIN_ONLY** | decision | L4 | mid/high | 生成 Chain | Chain 不得包含行動建議，僅描述後果 | buildGuidance |
| **BG_WARNING_SEPARATION** | decision | L4 | high | Risk Chain 存在 | Warning 需與 Recommendations 分離 | buildGuidance |
| **BG_AGE_BAND_GATE** | decision | GLOBAL | all | `birthDate` 存在 | 選擇對應 Age Band 模板（作為可用性門控） | buildGuidance |
| **BG_AGE_BAND_DEFAULT** | decision | GLOBAL | all | `birthDate` 缺失 | 使用 default 模板 | buildGuidance |
| **BG_PRIORITY_SLICE** | decision | GLOBAL | all | 候選建議 > 上限 | 依 Score 優先級裁切至上限 | buildGuidance |
| **BG_OUTPUT_MINIMAL** | decision | GLOBAL | all | 所有來源皆空 | 允許空輸出（禁止 AI Hallucination） | buildGuidance |

#### B. guidancePrinciples 決策規則（10 條，母題級）

| Rule ID | Type | Trigger (Theme Hit) | Band | Action Intent | Source |
| --- | --- | --- | --- | --- | --- |
| **GP_CHRONIC_DEPLETION_RULE** | decision | chronic_depletion | high | Stop Loss (保元神) | guidancePrinciples |
| **GP_LOSS_OF_AGENCY_RULE** | decision | loss_of_agency | mid | Adjust (觀照) | guidancePrinciples |
| **GP_HYPER_RESPONSIBILITY_RULE** | decision | hyper_responsibility | high | Boundary (界線) | guidancePrinciples |
| **GP_FEAR_BASED_STABILITY_RULE** | decision | fear_based_stability | low | Maintain (試探) | guidancePrinciples |
| **GP_IDENTITY_DIFFUSION_RULE** | decision | identity_diffusion | mid | Adjust (定心) | guidancePrinciples |
| **GP_SUPPRESSED_NEEDS_RULE** | decision | suppressed_needs | low | Maintain (發聲) | guidancePrinciples |
| **GP_CHRONIC_ALERTNESS_RULE** | decision | chronic_alertness | high | Stop Loss (安神) | guidancePrinciples |
| **GP_UNPROCESSED_LOSS_RULE** | decision | unprocessed_loss | mid | Adjust (儀式) | guidancePrinciples |
| **GP_MEANING_VACUUM_RULE** | decision | meaning_vacuum | low | Maintain (繫念) | guidancePrinciples |
| **GP_SELF_EROSION_RULE** | decision | self_erosion | high | Stop Loss (護體) | guidancePrinciples |

#### C. intervention_boundary_matrix 規則（3 條）

| Rule ID | Type | Band | Action / Tone | Source |
| --- | --- | --- | --- | --- |
| **IB_LOW_NURTURE** | boundary | low | 養氣 (Psycho-education) | intervention_boundary |
| **IB_MID_ADJUST** | boundary | mid | 調氣 (Behavioral activation) | intervention_boundary |
| **IB_HIGH_STOP_LOSS** | boundary | high | 止損 (Stop loss) | intervention_boundary |

#### D. L2/L3/L4 呈現規則（6 條）

| Rule ID | Type | Condition | Action | Source |
| --- | --- | --- | --- | --- |
| **L23_LOW_NARRATIVE_ONLY** | presentation | `risk == low` | Use `low` band L2/L3 text | Stage 4 |
| **L23_MID_NARRATIVE_ONLY** | presentation | `risk == mid` | Use `mid` band L2/L3 text | Stage 4 |
| **L23_HIGH_NARRATIVE_ONLY** | presentation | `risk == high` | Use `high` band L2/L3 text | Stage 4 |
| **L4_LOW_HIDE_CHAIN** | presentation | `risk == low` | Hide Risk Chain section | Stage 4 |
| **L4_MID_SHOW_WARNING** | presentation | `risk == mid` | Show Warning Chain | Stage 4 |
| **L4_HIGH_FORCE_CHAIN** | presentation | `risk == high` | Force display Critical Chain | Stage 4 |

#### E. AI 約束規則（5 條）

| Rule ID | Type | Constraint | Source |
| --- | --- | --- | --- |
| **AI_NO_REINTERPRET** | ai_constraint | 禁止重解卦象 | Stage 4 |
| **AI_IMMUTABLE_RISK** | ai_constraint | 風險等級不可變 | Stage 4 |
| **AI_NO_HALLU** | ai_constraint | 禁止無中生有 (建議) | Stage 4 |
| **AI_META_PURE** | ai_constraint | 玄學純粹性 (Vocab) | Stage 4 |
| **AI_BI_ALIGN** | ai_constraint | 雙語對齊 (CN/EN) | Stage 4 |

#### F. 驗證規則（5 條）

| Rule ID | Type | Check | Source |
| --- | --- | --- | --- |
| **VAL_SCHEMA_INTEGRITY** | validation | Schema 完整性 | Stage 4 |
| **VAL_RISK_CONSISTENCY** | validation | Risk Level 一致性 | Stage 4 |
| **VAL_ACTION_COUNT** | validation | 建議數量上限 | Stage 4 |
| **VAL_FORBIDDEN_VOCAB** | validation | 禁用詞掃描 | Stage 4 |
| **VAL_CHAIN_BAND_MATCH** | validation | Chain/Band 邏輯匹配 | Stage 4 |

---

## 三、驗證機制詳細說明和範例（符合要求）

### 3.1 驗證邏輯細節

1. **VAL_SCHEMA_INTEGRITY**
   - **方法**：JSON Schema Validator (e.g., AJV)
   - **標準**：必填欄位 (`risk_level`, `recommendations`) 非 Null、型別正確

2. **VAL_RISK_CONSISTENCY**
   - **方法**：比對 Payload `risk_level` 與計算結果
   - **標準**：完全一致。若 Payload 為 `High` 但文本語氣為 `Low`，標記失敗

3. **VAL_ACTION_COUNT**
   - **方法**：計數 Recommendations 陣列長度
   - **標準**：Low ≤ 2；Mid ≤ 3；High ≤ 3

4. **VAL_FORBIDDEN_VOCAB**
   - **方法**：Regex + `forbidden_terms.v1.0.json` 詞彙表掃描
   - **標準**：禁用詞命中數為 0

5. **VAL_CHAIN_BAND_MATCH**
   - **方法**：條件邏輯驗證
   - **標準**：若 `risk == LOW`，`risk_chains` 必須為空；若 `risk == HIGH`，`risk_chains` 必須非空

### 3.2 驗證範例

#### 通過範例 (Pass Case)

- **Input**：`risk=high`, `chains=2`, `reco=1` (Stop Loss)
- **Process**：
  - Schema: OK
  - Risk: High matches High. OK
  - Count: 1 <= 3. OK
  - Vocab: Clean. OK
  - Chain: High has 2 chains. OK
- **Result**：**PASS** → Output to Frontend

#### 失敗範例 A (Chain Violation)

- **Input**：`risk=low`, `chains=1` (Warning)
- **Trigger**：`VAL_CHAIN_BAND_MATCH` 失敗 (Low risk cannot have chains)
- **Handling**：**Drop chains** (移除 Chain) → Re-validate

#### 失敗範例 B (Action Overflow)

- **Input**：`risk=mid`, `reco=4`
- **Trigger**：`VAL_ACTION_COUNT` 失敗 (Max 3 for Mid)
- **Handling**：**Trim to 3** (保留前 3 條) → Re-validate

---

## 四、規則應用指南詳細說明和範例（符合要求）

### 4.1 應用場景

- **Low Risk (平穩期)**
  - **觸發規則**：`L23_LOW_NARRATIVE_ONLY`, `L4_LOW_HIDE_CHAIN`, `IB_LOW_NURTURE`
  - **表現**：僅顯示 L2/L3 敘事，隱藏風險鏈，提供 1-2 條「養氣」建議

- **Mid Risk (過渡期)**
  - **觸發規則**：`L23_MID_NARRATIVE_ONLY`, `L4_MID_SHOW_WARNING`, `IB_MID_ADJUST`
  - **表現**：顯示 L2/L3 及 Warning Chain，提供 2-3 條「調氣」建議

- **High Risk (警示期)**
  - **觸發規則**：`L23_HIGH_NARRATIVE_ONLY`, `L4_HIGH_FORCE_CHAIN`, `IB_HIGH_STOP_LOSS`
  - **表現**：強制顯示 Critical Chain，提供 1 條核心「止損」建議 + 輔助建議（總數 ≤ 3）

### 4.2 使用流程（可執行）

1. **本機計算**：完成科學與玄學引擎計算，產出 `score`, `risk_level`
2. **Payload 組裝**：根據 `risk_level` 選擇對應 Facet JSON 內容
3. **規則套用**：對照 **Rule Index (1.2)** 檢查 Payload 合規性
4. **AI 生成**：將 Payload 結合 **AI 約束 (1.2-E)** 送入模型
5. **後處理驗證**：執行 **Validation (2.1)**
6. **輸出**：驗證通過後，前端進行卷軸顯影

### 4.3 規則組合與衝突處理

- **優先級**：Decision (BuildGuidance) > Boundary (Intervention) > Presentation > AI Constraint
- **衝突原則**：**Risk Band 較高者覆蓋較低者**（安全優先）
- **範例**：若 `IB_LOW_NURTURE` 與 `L4_HIGH_FORCE_CHAIN` 同時命中（異常情況），系統應強制執行 `L4_HIGH_FORCE_CHAIN` 並報錯檢查 Risk Level 計算

---

## 五、整合報告詳細說明（符合要求）

### 5.1 提取流程

1. **靜態閱讀**：逐行審查 `buildGuidance.js`，標註所有 `if/else`、`switch` 決策點
2. **意圖抽象**：將代碼邏輯抽象為 Rule Intent（例如：`ageBand` 判斷 -> `Template Gating`）
3. **映射轉譯**：將 Intent 映射至 Stage 4 的 Layer/Band 架構

### 5.2 轉換範例

| Legacy Source | Legacy Text | Stage 4 Mapping |
| --- | --- | --- |
| `guidancePrinciples` | "reduce load to protect core energy" | **Rule**: `GP_CHRONIC_DEPLETION_RULE`<br>**Intent**: `stop_loss`<br>**Concept**: 保元神 |
| `buildGuidance.js` | `if (riskThemeIds.has(id)) warnings.push(...)` | **Rule**: `BG_RISK_CHAIN_TRIGGER`<br>**Action**: Generate Risk Chain if Risk >= Mid |

### 5.3 驗證結果摘要

- **規則總數**：39 條
- **驗證通過率**：在測試樣本中達到 100%
- **發現問題與修正**：初期發現 Low Risk 偶爾觸發 Risk Chain，已通過新增 `L4_LOW_HIDE_CHAIN` 與 `VAL_CHAIN_BAND_MATCH` 規則徹底修正

---

## 六、總結

### 6.1 符合要求的部分

- ✅ 完整規則文件（39 條規則，完整列出）
- ✅ 驗證機制詳細說明和範例（完整）
- ✅ 規則應用指南詳細說明和範例（完整）
- ✅ 整合報告詳細說明（完整）

### 6.2 審核結論

**第二個版本（v3 追問補完・完整權威版）完全符合所有追問包要求，可以通過審核並寫入文本。**

所有 v3 追問包要求的內容都已完整補充，內容詳細、完整、可執行。

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**狀態說明**：本文件提取了符合要求的部分，可以直接寫入文本。建議使用第二個版本（v3 追問補完・完整權威版）作為最終權威版本。
