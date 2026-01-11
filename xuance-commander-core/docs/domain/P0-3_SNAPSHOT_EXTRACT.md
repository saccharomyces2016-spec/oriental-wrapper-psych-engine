# P0-3 Snapshot Extract (Authoritative View)

## 0. Meta
- Phase: P0-3
- Status: OPEN
- Last Updated: 2026-01-08
- Editable: YES (All snapshots are revisable)

---

## 1. Phase Objective (本階段要解的唯一問題)
為 `income_expansion_pressure（歲時農耕・倉廩觀）` 建立可填槽的敘事骨架與詞彙對照，讓輸出「咬合入骨」但不越界（不得落入具體醫療/法律/投資/人際決策指令）。

---

## 2. Accepted Deliverables (已正式採納)
> 只列「已寫入 domain / metrics / protocol 的內容」

### R1 (Metrics)
- ✔ Narrative Sharpness Metrics v1 (Gated Scoring)
- ✔ M1/M2 Algorithm & CI Schema
- ✔ Narrative Metrics Implementation Spec v1
- Reference:
  - docs/domain/advisory/R1/P0-3_METRICS.md
  - docs/domain/metrics/P0-3_NARRATIVE_METRICS_IMPLEMENTATION.md

### R2 (Narrative)
- ✔ Bite Tuning Techniques v1
- ✔ Absolute Verdict Scope Definition
- ✔ Narrative Skeleton v1 (L1–L4 fixed cadence + slots)
- ✔ Esoteric Lexicon & Mapping v1
- Reference:
  - docs/domain/advisory/R2/P0-3_NARRATIVE_TUNING.md
  - docs/domain/advisory/R2/P0-3_ABSOLUTE_VERDICT_PROTOCOL.md
  - docs/domain/output/P0-3_NARRATIVE_SHARPNESS.md

### R4 (Safety)
- ✔ Mandatory L4 Trigger Protocol
- ✔ Affirmative Scope Control
- ✔ Narrative Blacklist SSOT (JSON)
- ✔ Narrative Control Protocol
- Reference:
  - docs/domain/advisory/R4/P0-3_SAFETY_PROTOCOL.md
  - docs/domain/advisory/R4/P0-3_NARRATIVE_CONTROL_PROTOCOL.md
  - docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json

---

## 3. Rejected / Deferred Decisions (有討論但沒進)
- **UI 呈現形式（八卦盤 / 圖像 / 文字混合）**：明確延後至後續階段（ADR-0006）
- **Phase 2 / Phase 3 追問模組**：不在 P0-3 範圍內
- **Evidence-Note 掛載（婆媳 / 職場 / 創業）**：延後至後續階段
- **具體行動建議內容（R2/R3）**：不在 P0-3 範圍內
- **文化或年齡層差異優化**：延後至後續階段

---

## 4. Known Tensions / Open Risks (已知但暫不解)
- **M1 詞表是否需 Embedding**：Deferred（Regex matching is sufficient for MVP）
- **多 Facet 共用 Blacklist 的擴展風險**：當前 Blacklist 僅針對 `income_expansion_pressure`，後續需評估通用化策略
- **次隱喻白名單的機器化檢查**：當前為人工審核，後續可考慮自動化
- **高強度意象降溫規則的細化**：R4 已定義基本框架，但具體降溫詞表需後續補充
- **「建議你」禁用詞的產品語氣統一**：待後續產品層面決策

---

## 5. Cross-Role Consistency Check (橫向檢查)
- **R1 Metrics ⟷ R2 Narrative**：✅ 一致
  - R1 的 M1/M2 評分與 R2 的 Bite Tuning 技術對齊
  - R2 的 Absolute Verdict Protocol 符合 R1 的 M3/M4 Gate 要求
- **R2 Narrative ⟷ R4 Safety**：✅ 一致
  - R2 的模板與 R4 的 Mandatory L4 Trigger 協議對齊
  - R4 的 Blacklist 涵蓋 R2 禁止的現代污染詞彙
- **R1 Metrics ⟷ R4 Safety**：✅ 一致
  - R1 的 Gate 機制與 R4 的 Violation Strategy 對齊
  - R4 的 Blacklist 作為 R1 M3/M4 檢查的數據源

---

## 6. Freeze Criteria (何時可封版)
- 條件 1：所有 R1/R2/R4 規格文檔已寫入 SSOT 且通過驗證
- 條件 2：CI Golden Tests（TC-01~TC-05）全部通過
- 條件 3：Cross-Role Consistency Check 全部為「一致」
- 條件 4：所有已知風險已明確標記為「已知但暫不解」或「延後」

---

## 7. Final Verdict (本階段結論)
- ☐ 已達成階段目標
- ☑ 尚需補強（指明哪一塊）
  - 需補強：次隱喻白名單的機器化檢查規則
  - 需補強：高強度意象降溫詞表的細化
  - 需補強：產品語氣統一策略（「建議你」→「宜/可/不宜」）
- ☐ 可封版入檔（保留修改權）

---

## 8. Next Actions (下一步)
- 補強上述三項「需補強」項目
- 執行 CI Golden Tests 驗證
- 完成 Cross-Role Consistency 最終檢查
- 準備封版決策
