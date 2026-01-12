# P0-3 Freeze Readiness（P0-3 封版準備狀態）

## 狀態
- **Phase 狀態**：READY_TO_FREEZE
- **EDITABLE**：YES（保留後修權）
- **Governance**：STABLE
- **日期**：2026-01-09

---

## 1️⃣ Phase 狀態

### P0-3 = READY_TO_FREEZE
P0-3 階段（Narrative Sharpness / Esoteric Precision）已完成所有阻斷點（B1/B2/B3），所有 Canon 已建立，品質達封版等級，可進入封版狀態。

### EDITABLE = YES（保留後修權）
**重要**：封版不代表凍結，仍保留後修權。
- ✅ 可接受錯誤修正（Bug Fix）
- ✅ 可接受小幅優化（Minor Refinement）
- ❌ 不接受大幅改動（Major Rewrite）
- ❌ 不接受新增內容型規格（Content Addition）

### Governance = STABLE
治理結構已穩定，所有規則已明確，可持續執行。

---

## 2️⃣ 已完成 Canon（不可覆寫）

以下 Canon 已完成並通過審核，**不可覆寫**：

### R1：Narrative Metrics（M1–M4 + Critical Fail）
- **文件**：`P0-3/R1_METRICS_V1_EXECUTABLE_SPEC.md`
- **內容**：M1–M4 指標、Critical Fail 規則、Gated Scoring 算法
- **狀態**：COMPLETED | APPROVED
- **驗收**：✅ 機器可檢查、可 CI 化

### R2：L1–L4 敘事骨架 + 次隱喻白名單（含機器化規則）
- **文件**：
  - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`（新建）
  - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`（已更新）
- **內容**：L1–L4 敘事骨架、次隱喻裁決表、機器化使用規則、允許詞表
- **狀態**：COMPLETED | APPROVED
- **驗收**：✅ 機器可檢查、可 CI 化，符合主隱喻一致性

### R4：禁用詞 SSOT + L4 高風險出口模板
- **文件**：
  - `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`（v2.0）
  - `docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`（新建）
  - `docs/domain/output/P0-3_FIELD_TRANSLATION_RULES.md`（新建）
  - `docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`（新建）
- **內容**：禁用詞表（中英）、內部概念轉譯表、L4 高風險固定出口模板（A/B）
- **狀態**：COMPLETED | APPROVED
- **驗收**：✅ 完全可 CI / grep 化，符合安全性要求

---

## 3️⃣ Facet 限定聲明

### 本規格僅適用於 income_expansion_pressure
**Facet**：`income_expansion_pressure`（歲時農耕・倉廩觀）  
**主隱喻**：歲時農耕・倉廩觀

**重要聲明**：
- ✅ 本規格的所有規則、禁用詞表、轉譯表、模板，**僅適用於本 Facet**
- ✅ 不自動外推至其他 Facet
- ✅ 其他 Facet 可另行建立規則，不受本 Facet 限制

### 不自動外推至其他 Facet
**明確禁止**：
- ❌ 不得將本 Facet 的禁用詞表自動套用到其他 Facet
- ❌ 不得將本 Facet 的轉譯規則自動套用到其他 Facet
- ❌ 不得將本 Facet 的模板自動套用到其他 Facet

**正確做法**：
- ✅ 其他 Facet 必須另行建立規則
- ✅ 其他 Facet 必須另行建立禁用詞表
- ✅ 其他 Facet 必須另行建立轉譯規則和模板

---

## 4️⃣ 已知但延後（Explicitly Deferred）

以下項目已知但明確延後，**不阻擋封版**：

### 評分公式與權重
- **狀態**：DEFERRED
- **說明**：評分公式與權重已定義基本框架（Gated Scoring），但具體權重與閾值可能後續調整
- **影響**：不影響封版，可在後續階段優化

### 跨 Facet 通用化
- **狀態**：DEFERRED
- **說明**：跨 Facet 通用化規則已建立基本框架（`GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`），但具體實現延後
- **影響**：不影響封版，可在 P0-4 或後續階段處理

### UI / 視覺呈現
- **狀態**：DEFERRED
- **說明**：UI / 視覺呈現規格不在 P0-3 範圍內
- **影響**：不影響封版，屬於後續階段任務

### 行動建議模組
- **狀態**：DEFERRED
- **說明**：行動建議模組（R3）規格不在 P0-3 範圍內
- **影響**：不影響封版，屬於後續階段任務

---

## 5️⃣ 封版判定

### 封版條件檢查
- ✅ **所有阻斷點已完成**：B1、B2、B3 全部完成並通過審核
- ✅ **所有 Canon 已建立**：R1、R2、R4 的 Canon 已完成並通過審核
- ✅ **品質達封版等級**：所有審核結論為 APPROVED
- ✅ **機器可檢查**：所有規則可 CI / grep 化
- ✅ **Facet 限定明確**：所有規則明確標記為 Facet 限定

### 封版狀態
**P0-3 = READY_TO_FREEZE**

---

## 6️⃣ 後修規則

### 可接受的修改
- ✅ 錯誤修正（Bug Fix）：修正明顯錯誤
- ✅ 小幅優化（Minor Refinement）：優化表達或小幅調整
- ✅ 格式調整（Formatting）：調整格式或結構

### 不可接受的修改
- ❌ 大幅改動（Major Rewrite）：重寫核心邏輯或規則
- ❌ 新增內容型規格（Content Addition）：新增大量內容型規格
- ❌ 通用化或擴展至其他 Facet：嘗試通用化或擴展至其他 Facet

---

## 7️⃣ 狀態與版本

- **狀態**：READY_TO_FREEZE
- **版本**：v1.0
- **建立日期**：2026-01-09
- **最後更新**：2026-01-09

---

## 參考文件
- **封版檢查清單**：`P0-3/P0-3_FINAL_CHECKLIST.md`
- **交棒摘要**：`P0-3/P0-3_HANDOFF_SUMMARY.md`
- **任務日誌**：`docs/domain/advisory/P0-3_TASK_LOG.md`
- **SSOT 索引**：`docs/domain/SSOT_INDEX.md`



