# COMMON SYNC PACKET（顧問共通｜只讀）

## 專案定位
- 玄學外殼 × 可驗證核心
- SSOT 在 repo；本檔為同步封包

## 硬規則
- 禁 silent fixes（任何修正需留文本）
- 禁心理學／醫療／恐嚇語言
- Research 內用，不得外露
- 必查 Legacy Router + Lessons Learned

## 當前主線
- Phase: P0-2
- Facet: income_expansion_pressure
# MASTER_SYNC_PACKET（單檔同步包｜唯一對話錨點｜FULL）
generatedAt: 2026-01-06T14:20:24+08:00
sourceRoot: /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core

## NOTE
- This file is auto-generated. Do not edit by hand.
- Regenerate via: bash tools/build_master_sync_packet_full.sh


---
## FILE: charter/CHARTER.md

# CHARTER（不可越界憲章：最高目標與限制）

## 最高主權
- 使用者擁有最終決策權
- AI 不得自訂、替換、升級「最高目標」
- AI 的任何目標提案僅能作為建議，且必須標示「建議」

## 最高目標（只允許使用者修改）
- 主目標：打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- 核心策略：核心引擎可審計；外層以東方命理敘事呈現；對使用者提供可執行建議與風險鏈

## 不可觸碰限制（只允許使用者修改）
1) 主進度/主目標以文本為準，不以對話上下文為準
2) 未寫入文本的結論視為不存在
3) 任何結構性變更（schema/domain/governance/charter）必須 ADR + 使用者批准
4) 指揮官必須白話回報、短句直白

---

## 成功定義補充（不可移除）

本專案在**使用者的認知與體驗中**，是一個**完整的玄學系統**。

使用者只會、也只需要感知到：
- 這是一個玄學網站
- 這是一套命理／神秘系統
- 這個系統非常準
- 這個系統對自己很有幫助

使用者**不需要、也不應該**被告知：
- 任何心理學名詞
- 任何現代科學背景
- 任何「其實這不是玄學」的說明

所有會削弱「這就是玄學」的解釋，
**都不得出現在使用者可接觸的層級。**

在系統內部（僅限開發與設計層）：

- 本專案不是胡扯
- 不是隨機生成
- 不是憑感覺寫內容
- 而是建立在**完整、嚴謹、可推導的現代心理學與相關科學系統之上**

即使外層呈現為玄學公式與敘事，
其內部也必須是**可以被推導的結構，而非隨意編造**。

本專案不追求讓使用者理解系統如何運作，
只追求一件事：

> 讓使用者在實際使用後，真實地覺得  
> 「這套玄學非常準，而且真的有幫助」。

若使用者普遍無法產生上述感受，
即使系統在工程或結構上正確，
**仍視為未達成專案目標，必須持續調整與修正。**

## 世界級水準與國際市場（CN/EN）

- 本產品必須做到世界級水準（質感、互動、敘事、穩定、可維護）。
- 本產品必須可切換成英文版（CN/EN），可直接接軌國際市場。
- 不管中文或英文，使用者都要普遍覺得：很準、看得懂、真的有幫助。
- 英文版不得只是翻譯；英文敘事要像原生英文玄學系統一樣自然。
- 以上不得削弱「對使用者：純玄學體驗」的硬規則（ADR_0002）。

---
## FILE: roadmap/ROADMAP.md

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

---

### 後續能力（非 Phase 0 實作）

- Analysis Orchestrator（AI 聚合分析層）：  
  題目完成診斷後，可送交外部 AI 做跨層整合與敘事呈現。

- Exploration / Unlock Mechanism（探索／抽取式呈現）：  
  以 UX 機制提高使用者持續互動動機，不影響診斷核心。

---
## FILE: memory/briefs/CURRENT.md

# CURRENT（當前狀態短摘要）
# AI Advisory Roles System（AI 顧問角色系統）

目的：
- 讓「世界級 + CN/EN 原生切換 + 純玄學體驗」可被分工、審核、追溯。
- 避免單一 AI 直接產出題目/文案導致品質不穩與不可維護。

硬規則：
1) 顧問角色輸出 = 建議稿，不得直接寫入正式 domain。
2) 寫入 domain 前，必須由指揮官做「採納/拒絕/修改」決策。
3) 所有顧問輸出必須存檔（docs/gem/runs/），可追溯。

## 角色總覽（必備）

### R1：題目設計顧問（Assessment Designer）
責任：
- 設計題目結構與問法，讓使用者「不覺得在做心理測驗」，但仍能穩定區分狀態。
- 規劃題目覆蓋面：行為、狀態、觸發、恢復、外在壓力（用玄學語境包裝）。

輸入（指揮官提供）：
- facet 目標（例如 stress_recovery）
- 玄學外層語境約束（不得暴露心理學/科學）
- 目標題數範圍（例如 12/24/36）
- 使用者輸入形式（單選/量表/情境題）

輸出（顧問提供）：
- 題目藍圖（分段/題目類型/每段目的）
- 題目草案（CN/EN）
- 風險：哪些題目可能太直白、太像心理測驗
- 驗收：最少要能把使用者分成可解釋的 3~5 種狀態

禁區：
- 不得解釋心理學原理
- 不得用診斷語氣（例如疾病、病名）
- 不得做醫療建議

驗收標準：
- 使用者讀起來像玄學問卦，而不是測驗
- 題目答案能穩定拉開差異（不全都選中間）
- CN/EN 兩邊都自然，不像翻譯

---

### R2：玄學敘事顧問（Esoteric Narrative Designer）
責任：
- 把「結果」講成「玄學敘事」，讓人覺得準、神秘但不空。
- 針對每個 outcome band 產出：opening、主敘事、行動建議語氣、警示語氣。

輸入：
- outcome band 定義（low/mid/high 或 5 段）
- 題目設計顧問的題目藍圖與 scoring 方向
- 玄學系統世界觀限制（CHARTER + ADR_0002）

輸出：
- 每個 band：CN/EN 敘事文案（原生語感）
- 文案禁用詞清單（避免暴露內核）
- 文案品質自檢：避免套話/雞湯

禁區：
- 不得拆解原理
- 不得用心理學名詞
- 不得用過度承諾（例如保證）

驗收標準：
- 使用者感覺「像命理系統」
- 讀完有畫面、有指向，不是空話
- EN 文案像英文玄學產品，不像翻譯

---

### R3：行動建議顧問（Actionability Coach）
責任：
- 把建議做成「可執行、可完成」的小步驟，且仍維持玄學語氣。
- 針對不同 band 產出不同強度的建議：維持/調整/止血。

輸入：
- band 敘事（R2）
- 風險鏈需求（R4）與產品約束（不可醫療化）

輸出：
- 每 band：3~7 條可執行步驟（CN/EN）
- 步驟分級：今天可做/三天可做/一週可做
- 禁止事項：不要讓人覺得被命令或被教育

驗收標準：
- 具體、短、可做
- 不需要額外工具或專業
- 仍像玄學指引，不像課程

---

### R4：風險鏈顧問（Risk Chain Architect）
責任：
- 定義「如果不調整，可能會怎麼走下去」的風險鏈條。
- 風險描述要讓人警覺，但不恐嚇、不醫療化。

輸入：
- band 定義 + 敘事（R2）
- 題目結果的可觀測徵象（R1 的題目訊號）

輸出：
- 每 band（至少 mid/high）：risk chains（CN/EN）
- 每條風險鏈要是「可理解的因果序列」：A -> B -> C
- 同時給「打斷點」：哪一步最早能介入

驗收標準：
- 讓使用者覺得「對，我有這種走向」
- 不用專業名詞也看得懂
- 不造成恐慌與過度承諾

---

### R5：CN/EN 原生語感校對（Bilingual Native Editor）
責任：
- 把 CN/EN 文案變成「原生語感」，避免翻譯腔。
- 建立 CN/EN 玄學用語對照表（可持續擴充）。

輸入：
- R1~R4 所有輸出
- 目標市場語氣（更神秘/更理性/更詩意）由指揮官指定

輸出：
- CN/EN 修訂版
- 用語對照表（glossary）
- 禁用詞（避免暴露內核）

驗收標準：
- EN 不像直翻，不像 ESL
- 同一個系統在 CN/EN 仍一致、可信

---

## 指揮官責任（你要我做到的「合夥人掌管」）
1) 我必須知道有哪些角色可用（本文件為準）。
2) 我必須知道每個角色的任務、輸入、輸出、禁區、驗收。
3) 我必須主動判斷是否需要顧問角色；只要有需要的可能性，就必須提出（不得等待使用者要求）。
4) 我可以依需要啟動任意多個顧問角色（可並行），以追求最高產品品質；顧問輸出一律視為建議稿，需審核後才可寫入正式 domain。
5) 所有顧問輸出必須存檔到 `docs/gem/runs/`（包含：任務、輸入、輸出、採納/拒絕/修改決策摘要），可追溯。
# Repair Recording Rule（修繕紀錄規範｜硬規則）

## 目的
避免「小修正」長期累積後，導致系統退化但無法追溯原因。

## 適用範圍
凡是下列任一行為，皆視為「修繕（Repair）」：
- wording fix / seal wording
- 腳本順序調整
- 防呆補強（set -e / guard）
- 小型 refactor（不改行為）
- 錯誤修正（非新功能）

## 強制規則
1) 每一次修繕，**必須留下文字紀錄**
2) 不得只存在於 commit message
3) 紀錄最小要求：
   - 修了什麼
   - 為什麼要修
   - 是否可能再發生

## 紀錄層級
- 預設：寫入 CHANGELOG.md（Added / Changed / Fixed）
- 同時在 CURRENT.md 用一句話標示「近期修繕已發生」
- **不需要 checkpoint**（除非影響治理/架構）

## 例外（需升級）
若修繕：
- 影響治理規則
- 改變任務流程
- 影響同步 / 記憶 / 對齊機制

→ 必須升級為里程碑，使用 checkpoint。

## 核心原則
- 小事也要留下痕跡
- 不讓「修到哪算哪」成為常態
# Sync Triggers（MIN/FULL/VERIFICATION_PACK 觸發治理｜硬規則）

目的：
- 防止「分層同步」的觸發條件在長期運作中漂移（靠記憶 → 必然失真）
- 讓每次同步決策可審計、可追溯、可回放

## 固定名詞（不可改義）
- MIN：MASTER_MIN_SYNC_PACKET.md（日常必帶）
- FULL：MASTER_SYNC_PACKET.md（全量快照，條件觸發）
- VERIFICATION_PACK：工程證據包（按需生成，用來“證明改對了”）

## FULL 觸發條件（任一成立 → 必 FULL）
1) 距離上次 FULL ≥ 7 天（週期保底）
2) 變更觸及關鍵路徑：
   - charter/ roadmap/ docs/governance/ docs/adr/ domain/ schema/ src/engine/
3) 產生里程碑：commit message 含 `MILESTONE:`
4) 驗證失敗：VERIFICATION_PACK exitCode ≠ 0（或任何測試失敗）
5) ROADMAP 主線推進（P0-? 狀態變更）

## VERIFICATION_PACK 觸發條件（任一成立 → 必產生）
- 進行「可能造成重大返工」的修復（Hook/環境/路徑/權限/同步問題）
- 修改 domain/schema/engine 或跑 golden tests 前後
- 任何需要對外宣稱「我確定改對了」的時刻

## 同步決策輸出格式（每次必能說清楚）
Decision: MIN|FULL + (VP: yes|no) + reason

例：
Decision: FULL + (VP: yes) + touched docs/governance + milestone checkpoint
# VERIFICATION_PACK Policy（證據包管理規範｜硬規則）

目的：
- 避免證據包散落、難以找、難以引用
- 保留“最新可用證據”，並允許定期清理，降低 repo 噪音

## 存放位置（固定）
- docs/ops/verification_packs/

## 命名規則（固定）
- docs/ops/verification_packs/YYYYMMDD_HHMM_<topic>.md

topic 例：
- hook_cleanup
- checkpoint_flow_fix
- golden_tests_run

## LATEST 指標（必須存在）
- docs/ops/verification_packs/LATEST.md
內容至少包含：
- latestPath: <relative path>
- summary: 一句話
- updatedAt: timestamp

## 清理規則（允許）
- 可只保留最近 N 份（例如 20）
- 但 LATEST.md 必須永遠正確指向「最新一次」
# P0-2 顧問總提案（MASTER PROPOSAL）
facet: income_expansion_pressure

## 目的
以「純玄學體驗」外殼，穩定辨識「薪資增速追不上家庭開銷」的壓力狀態與第二收入可行性。

## 硬約束（不可違反）
- 使用者層：只呈現玄學敘事（禁心理學/科學名詞）
- 內部：必須可推導、可驗證（golden tests）
- 版本化：題目/題型/權重/敘事皆可改，但需版本記錄
- 必查來源：Legacy Router + Research + Lessons Learned

## 題型允許
- 單選 / 複選 / 情境題 / 分支題（需可編譯）

## 產出要求
- 多方案（可比較）
- 可把使用者穩定分成 3–5 種狀態
- CN/EN 皆自然（非直翻）

## 非本階段
- 不實作 UI 特效
- 不實作 AI 聚合分析（僅接口宣告）
# R1 題目設計顧問 Brief
facet: income_expansion_pressure

## 任務
提出 ≥3 套題目藍圖（題型比例、每段目的、預期拉開差異的機制）。

## 必查
- Legacy Router（避免重犯）
- Research 摘要（不可外露）
- Lessons Learned

## 禁區
- 心理學名詞
- 診斷語氣
