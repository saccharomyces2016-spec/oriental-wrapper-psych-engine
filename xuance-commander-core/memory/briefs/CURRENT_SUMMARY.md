# CURRENT_SUMMARY（當前狀態摘要｜MIN 快照用）

## 目的
這是 CURRENT.md 的摘要版本，只包含當前狀態的關鍵信息，用於納入 MIN 快照。
完整歷史記錄見 `memory/briefs/CURRENT.md`。

---

## 目標
MVP（最小可行產品）採用「核心引擎穩定、內容外置化、schema 版本化」架構，降低後期衝突。

---

## 當前任務狀態

### 主線任務：P0-3 Narrative Sharpness / Esoteric Precision
- **狀態**：ACTIVE / READY_FOR_HARDENING（進行中，不可封板）
- **目標**：為 `income_expansion_pressure（歲時農耕・倉廩觀）` 建立可填槽的敘事骨架與詞彙對照，讓輸出「咬合入骨」但不越界
- **主要成果**：
  - ✅ R1：敘事銳利度指標 M1–M4 + Critical Fail 規則
  - ✅ R2：L1–L4 敘事骨架 + 插槽規格 + Lexicon v1
  - ✅ R4：安全稽核清單 + 自動轉譯護欄

#### 本回合任務（三個阻斷點）

**B1｜次隱喻白名單 + 機器化檢查規則**
- **狀態**：IN_PROGRESS（brief 已封包，等待顧問輸出）
- **Brief**：`docs/gem/briefs/BRIEF_P0-3_B1_secondary_metaphor_whitelist_R2.md`（Q1, Q2 已封包）
- **產出**：`docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`（或更新現有文件）
- **完成條件**：明確次隱喻允許/禁止規則；有機器化檢查方法（grep/regex）

**B2｜禁用詞機器化 + 對外轉譯規則**
- **狀態**：IN_PROGRESS（brief 已封包，等待顧問輸出）
- **Brief**：`docs/gem/briefs/BRIEF_P0-3_B2_banned_terms_machine_R4.md`（Q3, Q4 已封包）
- **產出**：
  - `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`（更新）
  - `docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`（新建）
  - `docs/domain/output/P0-3_FIELD_TRANSLATION_RULES.md`（新建）
- **完成條件**：grep/測試能擋下所有現代詞；欄位名不外洩

**B3｜高風險 L4 安全出口模板固定**
- **狀態**：IN_PROGRESS（brief 已封包，等待顧問輸出）
- **Brief**：`docs/gem/briefs/BRIEF_P0-3_B3_L4_high_risk_exit_templates_R4.md`（Q5 已封包）
- **產出**：`docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`
- **完成條件**：固定模板符合不恐嚇、不宿命、不下決策指令

**支援任務（R1 一致性校驗）**
- **Brief**：`docs/gem/briefs/BRIEF_P0-3_R1_consistency_check.md`（Q6 已封包）

#### 非阻斷優化（延後處理）
- O1：高強度意象降溫詞表細化（NOT BLOCKING）
- O2：產品語氣統一（NOT BLOCKING）
- O3：次隱喻檢查自動化（NOT BLOCKING）

- **是否可以收尾**：❌ 否（B1 + B2 + B3 全部完成後方可封板）
- **下一檢查點**：完成 B1/B2/B3 後，執行 CI Golden Tests (TC-01~TC-05)
- **詳細記錄**：見 `docs/ops/TASK_RECORDS_SUMMARY.md` 和 `P0-3/DECISION_PACKET_P0-3.md`

---

## 已完成任務摘要

### P0-2 Output Contract
- **完成日期**：2026-01-07
- **關鍵成果**：引擎只判斷「狀態」，不判斷「人生」；已完成禁止清單、允許層級、責任邊界

### P0-2 Question Design
- **完成日期**：2026-01-07
- **關鍵成果**：5-question symbol-first assessment with integer scoring & gates

---

## 下一步
1. P0-3：補齊待補齊項目（隱喻一致性、禁用詞機器化、L4 安全出口模板）
2. 完成後進入 P0-4：建立最小 UI 串接

---

## 重要制度狀態
- ✅ 治理文件體系已建立
- ✅ 健康檢查機制已建立
- ✅ 任務記錄系統已建立
- ✅ Cursor 與總指揮 GPT 接口規範已建立

---

## 查看完整記錄
- **完整 CURRENT**：`memory/briefs/CURRENT.md`
- **任務記錄**：`docs/ops/TASK_RECORDS_INDEX.md`
- **主線進度**：`roadmap/ROADMAP.md`

