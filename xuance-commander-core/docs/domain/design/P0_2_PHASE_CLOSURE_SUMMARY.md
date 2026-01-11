# P0-2 Phase Closure Summary — Question Design

Status: **Phase Closed (Implementation-Ready)**  
Binding: **NON-BINDING / DRAFT**  
Scope: Facet `income_expansion_pressure`

---

## 1. Phase Outcome (What is finished)

P0-2 題型設計已完成至 **工程可實作規格**，包含：
- 題目結構（5 題制）
- 題型順序（Symbol → Severity → Attribution → Coping → Validation）
- 整數化計分模型（無浮點、可 clamp）
- 明確 gate（Repression / Overcompensation / Inconsistency）
- 最小詞彙盤（Q5 Tokens）
- 工程交接用 Schema 與 Logic Gate 定義

本階段成果 **足以直接進入工程實作與內測**。

---

## 2. Locked Decisions (This Phase)

These decisions are **locked for P0-2 implementation**, but **NOT immutable**:

1. **Total Questions:** 5
2. **Axes Model:**  
   - Severity (1..10, integer)  
   - Attribution (-4..+4, clamped)  
   - Coping (-4..+4, clamped)
3. **Severity Range:** `1..10`  
   - Min = 「死水 + 溫」→ 有隱患、低痛感  
   - Max = 「滿杯 + 冰/燙」→ 極度過載
4. **Symbol-First Strategy:**  
   - 第一題為投射型符號題（非財務語言）
5. **Forbidden Inference:**  
   - 不推論客觀財務  
   - 不指認具體人際（如婆媳）  
   - 不做醫療/精神診斷  
   - 不做成敗預測

---

## 3. Explicitly Deferred (Future Phases)

以下項目**明確延後**，不得在 P0-2 補做：

- UI 呈現形式（八卦盤 / 圖像 / 文字混合）
- Phase 2 / Phase 3 追問模組
- Evidence-Note 掛載（婆媳 / 職場 / 創業）
- 具體行動建議內容（R2/R3）
- 文化或年齡層差異優化

---

## 4. Iteration Rule

後續任何修改必須滿足：
- 依據 **實測數據 / 使用者回饋**
- 不得破壞 5 題核心結構
- 不得回溯修改 P0-2 的歷史決策
- 必須新增記錄（不得覆寫）

---

## 5. Ownership

- Design Authority: R1 (Question Design)
- Execution Authority: Engineering
- Governance: CURRENT / ADR / Phase Closure

