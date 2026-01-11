# BRIEF_P0-3_B2_banned_terms_machine_R4

## 任務資訊
- **Phase**: P0-3 Narrative Sharpness / Esoteric Precision
- **Blocker**: B2（阻斷點）
- **Role**: R4 (Risk Chain Architect / Safety Auditor)
- **Facet**: income_expansion_pressure
- **主隱喻**: 歲時農耕・倉廩觀（對外唯一主隱喻）

---

## 任務目標
建立禁用詞機器化（中英 + 同義變體）+ 對外轉譯規則，確保對外輸出零現代污染，欄位名不外洩。

---

## 禁區（必須遵守）
- ❌ 現代心理/醫療/投資/管理術語
- ❌ 具體事件預言
- ❌ 可操作人生決策指令（辭職/就醫/投資/分手…）
- ❌ 內部欄位名直接出現在對外輸出（severity/coping/attribution/risk chain…）

---

## 交付物格式要求
- 條列式、可落盤、少論述
- 必須包含：
  1. **更新** `xuance-commander-core/docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`
     - 擴充：中英禁用詞、同義詞、常見變體（最小可用集合即可）
  2. **新增** `xuance-commander-core/docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`
     - 條列：中文禁用 / 英文禁用 / 變體規則（人類可讀版本）
  3. **新增** `xuance-commander-core/docs/domain/output/P0-3_FIELD_TRANSLATION_RULES.md`
     - 內部欄位（severity/coping/attribution/risk chain…）對外轉譯規則
     - 明確：對外輸出不得出現內部欄位名

---

## 驗收點
- ✅ grep/測試能擋下：焦慮、壓力、burnout、coping…等現代詞（以及變體）
- ✅ 對外輸出：0 現代污染（心理/醫療/投資/管理術語）
- ✅ 欄位名不外洩（severity/risk chain 等不出現在 user-facing text）

---

## 參考資料
- 決策包：`P0-3/DECISION_PACKET_P0-3.md`
- 現有黑名單：`xuance-commander-core/docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`
- R1 規格：`P0-3/R1_METRICS_V1_EXECUTABLE_SPEC.md`（Forbidden Lexicon）
- 任務記錄：`xuance-commander-core/docs/ops/TASK_RECORDS_SUMMARY.md`

---

---

## 題目卷（Authoritative Question Set）

> **來源**：總指揮 GPT 產出  
> **封包日期**：2026-01-09  
> **規則**：以下問題文本保持原樣，未經改寫、簡化或補語義

---

### Q3（禁用詞擴充｜B2）

在不暴露現代語境下，請列出必須禁用的詞彙（最小可用集）：
- 中文：核心禁用詞 + 常見變體
- 英文：核心禁用詞 + 常見變體

**目的**：補齊 Narrative Blacklist（可機器化）。  
**邊界**：只列清單，不給替代說法、不解釋。

---

### Q4（對外轉譯｜B2）

以下內部概念，對外（user-facing）應如何轉譯？請給「允許用語」而非解釋：
- severity
- coping
- attribution
- risk chain

**目的**：防止欄位名與現代詞外洩。  
**邊界**：只給對外用語（CN），不描述內涵。

