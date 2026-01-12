# P0-12 階段二-4 符合要求內容（可寫入文本）

**建立日期**：2026-01-12  
**來源**：P0-12 階段二-4 最終結案報告（整合增補權威版）  
**審核結果**：部分通過（部分內容符合要求，可寫入文本）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、說明

本文件提取了顧問團隊交付內容中**符合任務包要求**的部分，可以直接寫入文本作為設計基準。

**符合要求的部分**：
- ✅ 呈現規則與邏輯映射（1.1-1.3）
- ✅ 系統決策流程（高層次，2.1）
- ✅ AI 約束（3.1）
- ✅ Legacy 資料處置（5）

**需要補充的部分**：
- ❌ buildGuidance.js 決策邏輯分析（詳細分析）
- ❌ guidancePrinciples 邏輯提取（完整提取所有原則）
- ❌ 完整的規則文件（Markdown 或 JSON）
- ❌ 驗證機制的詳細說明
- ❌ 規則應用指南的詳細說明（應用場景、使用方法）
- ❌ 整合報告的詳細說明（提取過程、轉換記錄、驗證結果）

**詳細審核報告**：`P0-12_PHASE2-4_AUDIT_REPORT.md`  
**追問包（含完整背景資料）**：`P0-12_PHASE2-4_FOLLOWUP_WITH_BACKGROUND.md`

---

## 二、呈現規則與邏輯映射（符合要求）

### 2.1 L2 / L3 敘事觸發規則（Narrative Trigger Rules）

**Legacy 來源**：`anchor_statements`（confidence levels）  
**Stage 4 映射**：Risk Level → Band → L2/L3 Narratives

| 計算結果（Risk Level）  | 對應 Band | 觸發內容                    | 呈現邏輯                                |
| ----------------- | ------- | ----------------------- | ----------------------------------- |
| **LOW**（0–33%）    | `low`   | L2 Opening + L3 Explain | **平穩／持守**：強調「土」性穩定，確認現況安穩。          |
| **MID**（34–66%）   | `mid`   | L2 Opening + L3 Explain | **過渡／拉扯**：強調「金木」交戰或生機受阻，指出能量流動卡點。   |
| **HIGH**（67–100%） | `high`  | L2 Opening + L3 Explain | **警示／耗損**：強調「火」旺耗油或「水」寒無生，凸顯陰陽失衡後果。 |

**制度補充**：
- L2、L3 僅負責「狀態敘事」，**不涉及後果或行動**。
- 敘事文本 **只能選取，不可改寫**。

---

### 2.2 L4 風險阻斷規則（Risk Blocking Rules）

**Legacy 來源**：`consequence_chain_library`、`guidancePrinciples`

| Risk Level | 風險鏈（Risk Chain） | 行動建議（Recommendations） | 制度邏輯                |
| ---------- | --------------- | --------------------- | ------------------- |
| **LOW**    | ❌ 不顯示           | ✅ Maintenance         | 不製造恐嚇，僅保守維持。        |
| **MID**    | ✅ Warning       | ✅ Correction          | 顯示初步後果，建議以修正為主。     |
| **HIGH**   | ✅ Critical      | ✅ Stop Loss           | 清楚呈現嚴重後果，以止損、收斂為核心。 |

**硬性制度**：
- `low` 風險 **禁止顯示任何負向後果敘事**。
- `high` 風險 **必須至少包含一條風險鏈**。

---

### 2.3 L4 介入邊界矩陣（Intervention Boundary Matrix）

**Legacy 來源**：`intervention_boundary_matrix.v1.json`

| Boundary   | Band | Legacy 含義             | Stage 4 制度轉譯             |
| ---------- | ---- | --------------------- | ------------------------ |
| Boundary 1 | Low  | Psycho-education only | **養氣**：微小作息調整與涵養，不改變結構。  |
| Boundary 2 | Mid  | Behavioral activation | **調氣**：主動調整行為與節奏，疏通氣機。   |
| Boundary 3 | High | Stop loss / reduction | **止損**：停止、斷捨離、收斂，語氣具決斷性。 |

**制度鎖定**：
- Band 與 Boundary **一對一映射**。
- 不得跨 Band 使用更強介入語氣。

---

## 三、系統決策流程（高層次，符合要求）

### 3.1 系統決策流程（Canonical Flow）

```text
[Input Data]
    |
    +-> [Scientific Engine] -> (Score 0-100) -> [Risk Level Classifier] -> (Low/Mid/High)
    |
    +-> [Metaphysical Engine] -> (Birth Data + Time) -> [Hexagram Deriver] -> (Hexagram ID + Changing Line)
                                                     -> [Root Element Mapper] -> (Root Element)
    |
[Payload Builder] (Context Assembly)
    |
    +-> Check Risk Level (Lock)
    |     |
    |     +-> IF Low:  Fetch L2(low), L3(low), L4-Reco(low)
    |     +-> IF Mid:  Fetch L2(mid), L3(mid), L4-Risk(mid), L4-Reco(mid)
    |     +-> IF High: Fetch L2(high), L3(high), L4-Risk(high), L4-Reco(high)
    |
    +-> Check Root Element -> Select L2 Opening Variant
    +-> Check Hexagram -> Select L1 Visual Data
    |
[AI Generation Layer] (Translation & Polish)
    |
    +-> Receive Context (JSON)
    +-> Apply Constraints (No changes to Risk/Facts)
    +-> Apply Style (Metaphysical Narrative)
    |
[Output] -> Frontend Reveal Scroll
```

### 3.2 關鍵決策制度（Key Decision Points）

1. **風險鎖定（Risk Lock）**
   - Risk Level 為唯讀屬性，後續流程 **不可變更**；AI 不得淡化、強化或重解。

2. **建議數量門控（Action Gating）**
   - Low：1–2 則
   - Mid：2–3 則
   - High：1 則核心止損 + 最多 2 則輔助（總數 ≤ 3）

3. **語境過濾（Context Filter）**
   - Payload 必須完整、非 Null、結構正確後，方可送入 AI 層。

---

## 四、AI 約束（符合要求）

### 4.1 AI 敘事生成層五大戒律（The Five Commandments）

1. **NO RE-INTERPRETATION**：僅可使用 Payload，禁止自行推演或查詢。
2. **IMMUTABLE RISK**：風險不可被語氣沖淡或翻轉。
3. **NO HALLUCINATION**：嚴禁新增未在 Recommendations JSON 中的建議。
4. **METAPHYSICAL PURITY**：
   - 禁用：Anxiety、Stress、Depression、Dopamine、Cognitive、Therapy
   - 必用：氣場、心神、五行、生剋、流轉、養氣
5. **BILINGUAL ALIGNMENT**：
   - 中文：古典、內斂、無翻譯腔
   - 英文：Philosophical / Mystical，避免臨床化

---

## 五、Legacy 資料處置（符合要求）

### 5.1 Legacy 資料處置說明

- `intervention_boundary_matrix.v1.json` → 已制度化，可歸檔
- `buildGuidance.js` → 已轉為流程治理，不再執行
- `guidancePrinciples.v1.json` → 已內化為 AI 約束，可歸檔

---

## 六、規則治理與制度提取（部分符合要求）

### 6.1 介入邊界制度（Canonical Rule Form）

```json
{
  "rule_id": "string",
  "confidence_band": "low | mid | high",
  "rule_intent": "string",
  "uncertainty_note": "string | null",
  "prohibited_expressions": ["string"],
  "action_template_ref": "string"
}
```

### 6.2 指導原則制度（Guidance Principles）

**原則分類**：
1. Safety-First
2. No Escalation
3. Conservation of Qi
4. Non-Coercive Guidance

```json
{
  "principle_id": "string",
  "principle_type": "safety | narrative | decision",
  "applicable_layers": ["L2", "L3", "L4"],
  "mandatory": true,
  "violation_result": "invalidate_output"
}
```

**注意**：此部分僅有高層次分類和 Schema 範例，缺少具體原則的完整提取。需要補充所有 10 個 motherThemeId 的原則內容。

---

## 七、總結

### 7.1 符合要求的部分

- ✅ 呈現規則與邏輯映射（2.1-2.3）：完整的映射表
- ✅ 系統決策流程（高層次，3.1-3.2）：高層次流程圖和關鍵決策制度
- ✅ AI 約束（4.1）：完整的五大戒律
- ✅ Legacy 資料處置（5.1）：資料處置說明

### 7.2 需要補充的部分

- ❌ buildGuidance.js 決策邏輯分析（詳細分析）
- ❌ guidancePrinciples 邏輯提取（完整提取所有原則）
- ❌ 完整的規則文件（Markdown 或 JSON）
- ❌ 驗證機制的詳細說明
- ❌ 規則應用指南的詳細說明
- ❌ 整合報告的詳細說明

### 7.3 建議

1. **優先補充 buildGuidance.js 決策邏輯分析**：這是任務包的核心要求之一
2. **優先補充 guidancePrinciples 完整提取**：提取所有 10 個 motherThemeId 的原則
3. **提供完整的規則文件**：按照任務包要求的格式（Markdown 或 JSON）
4. **補充驗證機制和規則應用指南的詳細說明**

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**狀態說明**：本文件提取了符合要求的部分，可以直接寫入文本。不符合要求的部分請參考追問包進行補充。
