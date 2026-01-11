# BRIEF_P0-3_B1_secondary_metaphor_whitelist_R2

## 任務資訊
- **Phase**: P0-3 Narrative Sharpness / Esoteric Precision
- **Blocker**: B1（阻斷點）
- **Role**: R2 (Esoteric Narrative Designer)
- **Facet**: income_expansion_pressure
- **主隱喻**: 歲時農耕・倉廩觀（對外唯一主隱喻）

---

## 任務目標
建立次隱喻白名單 + 機器化檢查規則，明確哪些次隱喻允許/禁止，並提供可 grep/regex 驗證的規則。

---

## 禁區（必須遵守）
- ❌ 現代心理/醫療/投資/管理術語
- ❌ 具體事件預言
- ❌ 可操作人生決策指令（辭職/就醫/投資/分手…）
- ❌ 隱喻崩塌（主隱喻與次隱喻混用導致出戲）

---

## 交付物格式要求
- 條列式、可落盤、少論述
- 必須包含：
  1. 允許的次隱喻清單（例如：導航/蜃樓/航海…是否允許由此裁決）
  2. 使用規則：每段最多 N 個；不可替代主隱喻；禁止句型（列出）
  3. 可 grep 檢查的關鍵詞表（若已存在 `P0-3_SECONDARY_METAPHOR_RULES.md`，則補齊）

---

## 驗收點
- ✅ 明確結論：哪些次隱喻允許/禁止
- ✅ 有「每段最多幾個」與「禁止句型」的硬規則
- ✅ Golden tests/CI gate 可用固定規則驗證（至少 grep/regex 層級）

---

## 參考資料
- 決策包：`P0-3/DECISION_PACKET_P0-3.md`
- 現有規則：`xuance-commander-core/docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`
- 任務記錄：`xuance-commander-core/docs/ops/TASK_RECORDS_SUMMARY.md`

---

---

## 題目卷（Authoritative Question Set）

> **來源**：總指揮 GPT 產出  
> **封包日期**：2026-01-09  
> **規則**：以下問題文本保持原樣，未經改寫、簡化或補語義

---

### Q1（裁決題）

在「歲時農耕・倉廩觀」主隱喻下，是否允許使用以下次隱喻？請逐一裁決（允許 / 禁止）：
- 航海 / 航向 / 風浪
- 導航 / 羅盤 / 坐標
- 蜃樓 / 幻景
- 築屋 / 修繕
- 山路 / 坡度

**目的**：確定「可共存」與「必禁止」的次隱喻集合。  
**邊界**：只給裁決結果，不解釋理由。

---

### Q2（規則題）

若允許任何次隱喻，請給出可機器化的使用規則（白名單規格）：
- 每段最多可出現幾個次隱喻（N=?）
- 不可替代主隱喻的句型（列出禁止句型關鍵詞）
- 不得跨段延展的規則（是/否）

**目的**：形成可 grep/regex 檢查的硬規則。  
**邊界**：只列規則與關鍵詞，不做敘事示例。

