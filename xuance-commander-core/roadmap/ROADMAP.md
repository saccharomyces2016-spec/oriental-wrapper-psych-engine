# ROADMAP（唯一主線進度）

規則：
- 任何「題目版本」「規則版本」「方向調整」都必須先記錄在此
- 沒寫進 ROADMAP 的東西 = 不存在，不得採用
- 每次推進只允許更新一個「目前工作項」避免亂跳

## Phase 0：MVP（單一構面）
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
