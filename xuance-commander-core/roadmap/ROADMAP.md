# ROADMAP（唯一主線進度）

規則：
- 任何「題目版本」「規則版本」「方向調整」都必須先記錄在此
- 沒寫進 ROADMAP 的東西 = 不存在，不得採用
- 每次推進只允許更新一個「目前工作項」避免亂跳

## Phase 0：MVP（單一構面）

<!-- XUANCE_P0_2_DECISION_BEGIN -->
### P0-2 決策（Commander Locked）
- 採納 R1 題目藍圖：A「歲時農耕・倉廩觀」作為 user-facing 唯一主隱喻
- 採納 R4 風險鏈：Framework A/B 作為 internal 結構（對外輸出必須翻譯成農耕語彙）
- 顧問證據落盤：
  - docs/gem/runs/RUN_P0-2_income_expansion_pressure_R1_20260106.md
  - docs/gem/runs/RUN_P0-2_income_expansion_pressure_R4_20260106.md
  - docs/gem/runs/DECISION_P0-2_income_expansion_pressure_20260106.md
<!-- XUANCE_P0_2_DECISION_END -->

- [x] P0-1 選定第一個構面（facet）
- [ ] P0-2 建立該 facet 的 questions/scoring/reco/narr/risk
- [ ] P0-3 跑 golden tests 固定輸入輸出
- [ ] P0-4 建立最小 UI 串接（讀 compiled facet -> 顯示敘事+建議+風險鏈）
- [ ] P0-5 最小付費/權限策略（占位，不優化）

<!-- XUANCE_P0_1_FACET_SELECTION_BEGIN -->
### P0-1 決策：第一個 facet（單一構面）已選定
- facetId: income_expansion_pressure
- 定義：薪資增速追不上家庭開銷所產生的壓力，以及對「第二收入」的驅動與可行性狀態。
- 題目種子（將在 P0-2 正式定稿）：
  - Q1：近一年，你覺得「俸祿的增幅」追得上「家用的潮水」嗎？
    - A 追得上且有餘裕 / B 追得上但幾乎不剩 / C 開始吃緊 / D 已透支或壓力明顯影響生活
<!-- XUANCE_P0_1_FACET_SELECTION_END -->

## 版本紀錄（只記關鍵）
- v0.0：初始化治理/記憶/外置化骨架

---

### 後續能力（非 Phase 0 實作）

- Analysis Orchestrator（AI 聚合分析層）：  
  題目完成診斷後，可送交外部 AI 做跨層整合與敘事呈現。

- Exploration / Unlock Mechanism（探索／抽取式呈現）：  
  以 UX 機制提高使用者持續互動動機，不影響診斷核心。

<!-- XUANCE_P0_2_OUTPUT_CONTRACT_POINTER_BEGIN -->
### P0-2（延伸任務）：Output Contract（ACTIVE）
- 目的：定義系統級輸出合約（允許/禁止輸出、抽象層級、翻譯邊界、安全 fallback）。
- 顧問啟動：R1/R2/R4（briefs 見 docs/gem/briefs/BRIEF_P0-2_output_contract_*.md）
- 備註：此任務不含 UI、不含新題目內容。
<!-- XUANCE_P0_2_OUTPUT_CONTRACT_POINTER_END -->

## P0-3 Narrative Sharpness / Esoteric Precision
- Goal: Make outputs sharper, consistent, and testable within P0-2 boundaries.
- Deliverables: Metrics v1, Skeleton v1, Lexicon v1, Diversity v1.
- Status: ACTIVE (DRAFT)
