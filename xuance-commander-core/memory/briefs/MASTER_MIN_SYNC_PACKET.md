# MASTER_MIN_SYNC_PACKET（小快照｜每次必帶｜SSOT 指向）
generatedAt: 2026-01-07T14:04:25+0800
sourceRoot: xuance-commander-core

## RULE
- Always consult: CHARTER / ROADMAP / CURRENT / TEXT_ONLY / TASK_LIFECYCLE / AI_ADVISORY_ROLES
- Evidence: LAST_COMMAND_STATUS + REPO_STATUS + LATEST_VERIFICATION_PACK
- Recordkeeping: after each task, update CURRENT (what/where/result/next) and CHANGELOG when applicable; milestone requires checkpoint + evidence pointers
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

---
## FILE: memory/briefs/CURRENT.md

# CURRENT（當前狀態短摘要）

## P0-2（income_expansion_pressure）決策已鎖定
- R1：採用「歲時農耕・倉廩觀」作為題目與敘事主隱喻
- R4：採用 A/B 風險鏈結構（對外全部轉譯為農耕詞彙，避免隱喻混用）
- 下一步：產出 questions + scoring -> 交 R2 做 narr/reco -> 風險鏈落盤 -> golden tests
- 證據：docs/gem/runs/DECISION_P0-2_income_expansion_pressure_20260106.md



目標：MVP（最小可行產品）採用「核心引擎穩定、內容外置化、schema 版本化」架構，降低後期衝突。

已完成：
- 初始化資料夾結構與玄策指揮官角色規範
- 建立可擴充 MVP 骨架（domain 分檔、schema、golden tests、build 合併）

下一步（主線）：
1) P0-2：為 income_expansion_pressure 建立 questions/scoring/recommendations/narratives/riskchains
2) 走 Research → Brief → Advisor → Domain gate
3) 補齊 golden tests（固定輸入輸出）

治理橋接任務（已批准）：Governance Inventory Sprint
- 預設由 Cursor 產出 Inventory Report（Markdown + JSON）→ 指揮官裁決 → 才允許 Codex 落地
- Done Definition 以 GOVERNANCE_INDEX.md 內之章節為準

制度已建立：
- 想法治理（Idea Governor）
- 記憶治理（Memory Curator）
- Phase Gate
- 系統健康檢查

操作習慣：
- 任何新討論/新任務前：bash tools/export_chat_packet.sh .
- 並貼 xuance-commander-core/out/CHAT_PACKET.md 給指揮官（最小必要上下文）

---

## 補充：即時同步（MASTER）成果（已達成）

已達成：
- ✅ 已建立「即時同步」機制：用 `LAST_COMMAND_STATUS` 作為執行證據，並由 hook（或 tools）觸發重建 `MASTER_SYNC_PACKET.md`。
- ✅ 已形成固定做法（不靠人工複製貼上）：
  1) 任何關鍵指令 → 自動寫入 `memory/briefs/LAST_COMMAND_STATUS.md`
  2) 同步重建 `memory/briefs/MASTER_SYNC_PACKET.md`
  3) 後續對齊一律貼 MASTER（必要時再補 CHAT_PACKET）

驗收（可檢查）：
- 跑一條指令後，`LAST_COMMAND_STATUS.md` 的 `updatedAt` 會更新。
- 同一輪操作後，`MASTER_SYNC_PACKET.md` 的 `generatedAt` 會更新。
- MASTER 內能看得到最新的 `LAST_COMMAND_STATUS`（必要時含 `REPO_STATUS`）。

注意：
- SSOT 仍是 charter/roadmap/governance/adr 等原始檔；MASTER 只是同步快照。
- hook 失效時：不得宣稱「即時同步」，改用既有工具（如 `tools/xc` / `tools/xuance_run.sh`）跑關鍵指令以產生證據。

---
【狀態更新｜2026-01-04】

已完成：
- ✅ 絕對同步（Absolute Auto-Log）已啟用
  - 每一條終端機指令會自動寫入 memory/briefs/LAST_COMMAND_STATUS.md
  - 指令結果可被 MASTER_SYNC_PACKET 納入同步
  - 已實測（echo sync-test）：成功寫入 command / exitCode / success


---
【里程碑完成｜2026-01-04】

已驗收完成：
- ✅ GitHub 雲端同步已可用（local HEAD 可與 origin/main 比對）
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - 備註：雲端保留的前提是 commit + push（未 commit 的檔案仍只在本機）
- ✅ 即時同步（MASTER）已可用（每次指令 → LAST_COMMAND_STATUS 更新 → 觸發 MASTER 重建）
  - 驗收方式：`LAST_COMMAND_STATUS.md.updatedAt` 會更新，且同一輪 `MASTER_SYNC_PACKET.md.generatedAt` 會更新。
- ✅ 里程碑備份流程已建立（Checkpoint）
  - 執行：`bash xuance-commander-core/tools/xc_checkpoint.sh "MILESTONE: <里程碑名稱> 已驗收完成"`
  - 成功條件：push 成功 + CURRENT/CHANGELOG 留證 + MASTER 更新

決策：
- 「第八行（quick verify timestamps）」不再視為必做門檻；它只是『最後看一眼』，可省略。

待處理（下一個任務）：
- ⏳ 清除殼層遺留的 `_xc_precmd` 噴錯：`_xc_precmd:8: no such file or directory:`（以 hook cleanup + 新開終端驗收）


## 白話補充說明：看不懂技術輸出是什麼意思

有時系統會顯示很多技術性很強的內容（像一些 shell 輸出或 hook 路徑訊息）。  
**這些不是錯誤**，而是系統在寫很多「機器用的證據」給它自己看。  
真正要看的重點只有三件事：

1) 這條指令是否真正成功（exitCode 代表執行結果）  
2) 有沒有成功推到雲端（commit + push）  
3) MASTER 是否更新

如果這三件事都有證據支持，那就算成功，  
其它技術輸出不用特別理解或記住。

---

## 白話補充說明：GPT 上下文長度與同步資料的問題

GPT 每一次最多只能讀取一定長度的文字（上下文長度限制）。  
因此我們不會把所有歷史訊息一次塞給它，而是透過「同步快照 + 分段掃描」讓 GPT 只讀**必要部分**。

白話比喻：

- 把整本書印成一張大海報 → GPT 會爆掉（因為太長）  
- 把書拆成很多小片段 + 目錄查詢 → GPT 只看重要章節

未來我們也可能把這些片段存進更進階的查詢系統（例如向量資料庫），
讓 GPT 只抓與當前任務最相關的段落來讀。

這些白話補充能幫助讀者理解底層機制，而不被技術輸出搞混。

---

---

---
【里程碑備份｜2026-01-05T09:28:00+0800】

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: 路徑表與提醒規則已完成
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: bd398057c290f1eb2ac507cf152a903db27aa4f4

---

---

---
【里程碑備份｜2026-01-05T09:56:10】

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: Checkpoint script TS bug fixed
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: f22bddf54e52048e19aff1a71dbfae9a6bd7b901


---
<!-- XUANCE_MILESTONE_SYNC_STABLE_BEGIN -->
---
【里程碑封板｜2026-01-05T11:01:02+0800】

已驗收完成（封板）：
- ✅ LAST_COMMAND_STATUS 不再出現 (unknown)，可記錄實際指令
- ✅ Checkpoint 可用：可 commit + push + 留證 + 重建 MASTER
- ✅ GitHub 雲端同步可用：main / 54982618a5f6dc8fa2dbc432845adc0d29199346
- ✅ 即時同步（MASTER）可用：指令 → LAST_COMMAND_STATUS → MASTER 重建
- ✅ 終端噪音 _xc_precmd:8 已清除（新 terminal 不應再出現）

驗收方式（最簡單）：
1) 跑任一無害指令，例如：echo __probe__
2) 檢查：memory/briefs/LAST_COMMAND_STATUS.md 的 command/updatedAt 變新
3) 檢查：memory/briefs/MASTER_SYNC_PACKET.md 的 generatedAt 變新
4) 宣告封板時，一律用 checkpoint：
   bash xuance-commander-core/tools/xc_checkpoint.sh "MILESTONE: <名稱> 已驗收完成"

注意：
- 雲端保留前提仍是 commit + push；未提交檔案只在本機。
<!-- XUANCE_MILESTONE_SYNC_STABLE_END -->

---
## 里程碑封板紀錄（可讀版｜後續只追加，不重寫）

### 2026-01-05｜同步系統封板（Sync System Stable）
- ✅ LAST_COMMAND_STATUS 不再出現 `(unknown)`，可記錄實際指令
- ✅ Checkpoint 可用：可 commit + push + 留證 + 重建 MASTER
- ✅ GitHub 雲端同步可用（main 對齊 origin/main）
- ✅ 即時同步（MASTER）可用：指令 → LAST_COMMAND_STATUS → MASTER 重建

### 2026-01-05｜GEM 顧問角色封板（R1/R4）
- ✅ 已建立 R1（題目設計顧問）與 R4（風險鏈顧問）的 GEM 使用說明與輸出格式
- ✅ 顧問輸出落點：`docs/gem/runs/`
- ✅ 指揮官採納後才可落盤到 `domain/`

### 2026-01-05｜Research 層封板（內部研究不可外露）
- ✅ 新增 `docs/research/` 作為內部研究層（不可直接外露到使用者可見輸出）
- ✅ 匯入研究筆記：`docs/research/life_cycle_0_100_integrated_research_note.zh.md`
- ✅ 新增顧問摘要佔位：`docs/gem/briefs/BRIEF_life_cycle_0_100_inputs.zh.md`
---



---

---
【里程碑備份｜

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: sync system + GEM roles + research layer (evidence cleaned & readable)
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: dd90747261b1cccc0058ba226242394f8dd2adcc

---
【里程碑備份｜

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: evidence drift sealed (post-readable-cleanup)
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: be6ef3e1f1e8ebc5fb7f00d133d524bb27c36995

---
【里程碑備份｜

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: research reference modes sealed (Research->Brief->Advisor->Domain gate)
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: a64e7c0696a05226397e6544800253abb6ea9be8

---
【階段性任務完成｜基礎系統已封板】

已完成（封板）：
- MASTER 即時同步機制
- Absolute Auto-Log（LAST_COMMAND_STATUS）
- Checkpoint（commit + push + evidence + MASTER）
- 同步噪音清理（_xc_precmd）
- 治理文件體系（BOOT / STOP / PREWRITE / TEXT-ONLY）
- AI 合夥人責任制
- AI 顧問角色系統（R1–R5 + GEM）
- Research 層（docs/research）建立
- 0–100 生命週期研究筆記匯入
- Research → Brief → Advisor → Domain Gate

狀態：
- 基礎治理與同步系統穩定
- 可正式進入主線（ROADMAP Phase 0）

下一步（主線）：
- P0-1：選定第一個 facet（單一構面）

<!-- XUANCE_CURRENT_MAINLINE_BEGIN -->
## 主線狀態（Phase 0 / MVP）

已決定：
- P0-1 第一個 facet：income_expansion_pressure（薪資增速 vs 家庭開銷 + 第二收入驅動）

下一步（主線待做）：
- P0-2：為 income_expansion_pressure 建立：
  - questions / scoring / recommendations / narratives / riskchains
  - 並走 Research → Brief → Advisor → Domain gate
- P0-3：補齊 golden tests（固定輸入輸出）
<!-- XUANCE_CURRENT_MAINLINE_END -->

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: P0-1 facet selected (income_expansion_pressure) + user override protocol added
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 4bc4347cc615b35fcbf1720bcd215a72a23a7f0c

<!-- XUANCE_CURRENT_LESSONS_POINTER_BEGIN -->
## 失敗案例已入庫（避免重犯｜指向）
- 治理層已記錄兩個過去失敗案例（版本漂移 / 規則卡死）：
  - docs/governance/LESSONS_LEARNED.md
- 給顧問的約束 brief：
  - docs/gem/briefs/BRIEF_lessons_and_constraints.zh.md
<!-- XUANCE_CURRENT_LESSONS_POINTER_END -->


---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: failure cases recorded (version drift + rules deadlock) + advisory constraints brief
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: eefb589c79dc4952c1b0fdda8d88010d8dcb9e11

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: legacy project analyzed (my-first-app) + research signals preserved
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 645967b9bdc9f31cbd71a7da6f986f261d3cedba

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: legacy vault imported (115_1_3_my-first-app_failed) + inventory + brief pointers
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 4fed2a38373d1c4f419d661bd886e461713df856

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: legacy vault routing layer added (ROUTER/CAPABILITY/UI/REUSE/FAIL) + legacy consult rule
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: b906b27ecb1882771dbb48b2c245208e04014a0d

---
### 【臨時目標完成｜Legacy Vault 可調用層封板】

已完成：
- Legacy 專案（115_1_3_my-first-app_failed）已完成「可調用層」整理
- 已建立以下導覽與判斷文件：
  - ROUTER.md（從需求導向 legacy）
  - CAPABILITY_MAP.md（能做什麼）
  - REUSABLE_ASSETS.md（哪些值得重用）
  - UI_FLOW_REFERENCES.md（互動與流程參考）
  - FAILURE_PATTERNS.md（禁止重犯）

刻意未做：
- ❌ 段落級解析
- ❌ 細粒度語義索引

停止理由：
- 避免 MASTER 語義膨脹
- 避免過早鎖死解讀角度
- 保留在「實際主線需要時」再精讀的彈性

重新開啟條件（任一成立）：
1. 主線（如 P0-2）實作卡關，且明確需要 legacy 對照
2. 顧問輸出出現歧義，需以 legacy 作裁決依據
3. 決定正式納入 legacy 方法為新系統的一部分

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: mandatory milestone recording rule added + legacy callable-layer sealed
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 31e098added6882a747d435acc543ac42c433540

---
【臨時目標完成｜Legacy Routing Layer】

已完成：
- 建立 legacy vault 路由層（ROUTER / CAPABILITY / REUSE / UI / FAIL）
- 建立 legacy consult 強制規則（未查 legacy 不得設計題型）
- legacy 專案可被「導航式引用」，避免整包失憶

套用規範代碼：
- G01 G03 G04
- M03 → M04

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: completion-record rule + codebook + mode switches + legacy routing sealed
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 3d59b138c642f23f2cbf2bd11d81229964d35ad5

---
【主線推進｜P0-2 Kickoff｜2026-01-05T18:20:32+0800】

---
【施工方式升級｜Smart Sync Tiered Workflow｜2026-01-05】

決策（已啟用或即將啟用）：
- 由「單一 FULL MASTER」升級為「分層同步」：MIN（每次必帶）+ FULL（條件觸發）+ VERIFICATION_PACK（工程證據）。
- 目的：不漏任何規範（roles/治理/主線），但避免 MASTER 因歷史全文膨脹而降低可靠性。

影響：
- 日常你只要貼 MIN；遇到里程碑/關鍵改動/失敗診斷才需要 FULL + 證據包。

驗收：
- 存在：MASTER_MIN_SYNC_PACKET.md（每次生成）
- 存在：VERIFICATION_PACK（有需要時生成），並有 LATEST 指標
- AUTO 能依規則決定 MIN/FULL（或至少保留可手動切換）
---



已建立顧問輸入 Brief（高階藍圖，不是題庫全文）：
- R1 題目藍圖：docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R1_question_blueprint.zh.md
- R4 風險鏈框架：docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R4_riskchains.zh.md

引用規則：
- 必查 legacy router（ROUTER/CAPABILITY/REUSE/UI/FAIL）
- 必查 research 層（不得外露原文到使用者層）
- 必查 lessons learned（避免版本漂移/規則卡死）

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: P0-2 kickoff briefs staged for income_expansion_pressure (R1/R4) with legacy+research+lessons mandatory refs
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 8d5ab106241d3df036d5ac00fe0e51deedeb9831

---

---

---

---
[MILESTONE|2026-01-05T19:17:04+0800]

已完成：
- ✅ 雲端備份（commit + push）預備執行
  - message: MILESTONE: checkpoint flow reorder test
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head(before): 89343ec4b15ec29a7ea321b75311d73e9ea479d6

---
[MILESTONE|2026-01-05T19:17:04+0800]

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: checkpoint flow reorder test
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 5170f146441673c2e0a8830c8daefd0aafaa7675

---
[CHECKPOINT|2026-01-05T19:23:21+0800]
phase: pre-commit
message: MILESTONE: checkpoint flow reorder test 2
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: 5170f146441673c2e0a8830c8daefd0aafaa7675

---
[CHECKPOINT|2026-01-05T19:23:44+0800]
phase: post-push
message: MILESTONE: checkpoint flow reorder test 2
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 4e11f8f0309e1cf4afaa8ac05d8f5e55775ca450

---
[CHECKPOINT|2026-01-05T19:24:02+0800]
phase: pre-commit
message: MILESTONE: checkpoint flow reorder test 2
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: ad3249a61ac3f29f446a75371f12b108abd0df71

---
[CHECKPOINT|2026-01-05T19:24:04+0800]
phase: post-push
message: MILESTONE: checkpoint flow reorder test 2
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: fd8be79ac672af77ae2a71514bd39c3059f1bb60

---

【已納入但尚未實作的能力】

- Analysis Orchestrator（AI 聚合分析層）
- Exploration / Unlock Mechanism（探索／抽取式呈現）

以上能力已寫入治理文件，待後續階段實作。

---
[CHECKPOINT|2026-01-06T10:10:51+0800]
phase: pre-commit
message: MILESTONE: system capabilities (AI orchestrator + exploration unlock) declared
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: ca71c4f1aadd484c1f34e993a7e0d7ba77f42b40

---
[CHECKPOINT|2026-01-06T10:10:53+0800]
phase: post-push
message: MILESTONE: system capabilities (AI orchestrator + exploration unlock) declared
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 3abf24bc98bdb9c7cc1842440ead9c5b962eac8e

---
[CHECKPOINT|2026-01-06T10:25:11+0800]
phase: pre-commit
message: MILESTONE: CURRENT aligned to P0-2 (income_expansion_pressure)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: 9c59b93ab20fb6586807c1cfa9278c77a6bc33c5

---
[CHECKPOINT|2026-01-06T10:25:13+0800]
phase: post-push
message: MILESTONE: CURRENT aligned to P0-2 (income_expansion_pressure)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 4569052a10dde039b4c4f6a0b155234ee20bb5b4

---
[CHECKPOINT|2026-01-06T10:27:24+0800]
phase: pre-commit
message: MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: 9a71dffaa7eaf906b49de3e2980279388fc790b8

---
[CHECKPOINT|2026-01-06T11:24:37+0800]
phase: pre-commit
message: MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4) [seal wording fix]
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: e1b05a5e05657d21e5871f0698f2d198725de743

---
[CHECKPOINT|2026-01-06T11:24:42+0800]
phase: post-push
message: MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4) [seal wording fix]
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 047bc9ba1d5afbd68d0738942afc75c3bca11d19

- 🛠 修繕治理已啟用：任何小修正（wording / script / guard）皆需留 CHANGELOG + CURRENT 紀錄

---
[CHECKPOINT|2026-01-06T11:35:03+0800]
phase: pre-commit
message: MILESTONE: repair recording rule added (no silent fixes allowed)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: 6ef9ba707d910c0d2afeef0c0991b3e86b29b743

---
[CHECKPOINT|2026-01-06T11:35:09+0800]
phase: post-push
message: MILESTONE: repair recording rule added (no silent fixes allowed)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 9742044430fb1d9c16d8be74aa952075f1c2f88d

- 🧭 同步觸發治理已補齊：MIN/FULL/VERIFICATION_PACK 觸發條件改為可審計決策表（避免長期漂移）

---
[CHECKPOINT|2026-01-06T14:19:24+0800]
phase: pre-commit
message: MILESTONE: sync trigger governance + verification pack policy + commander optimization duty
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: bb94c7a0f465cf822fb09a78b78815b12402b4db

---
[CHECKPOINT|2026-01-06T14:20:23+0800]
phase: pre-commit
message: MILESTONE: sync trigger governance + verification pack policy + commander optimization duty
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: bb94c7a0f465cf822fb09a78b78815b12402b4db

---
[CHECKPOINT|2026-01-06T14:20:25+0800]
phase: post-push
message: MILESTONE: sync trigger governance + verification pack policy + commander optimization duty
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: fdaaa8728e2ac80d1bf2cee9022c39d811398509

- 📦 角色同步封包（Role Sync Packet）已啟用：一角色一包（Common+Role+Refs 內嵌），避免缺件與假設漂移
  - 生成：bash xuance-commander-core/tools/build_role_sync_packets.sh
  - 產物：xuance-commander-core/memory/briefs/role_sync_packets/（含 LATEST/ 指標）

- 🧠 新工作模式已啟用：GPT 架構/治理判斷、Cursor 主力施工、Codex 一次性修復；所有指令包必須標註「貼給誰」

---
[CHECKPOINT|2026-01-06T15:31:17+0800]
phase: pre-commit
message: MILESTONE: role sync packets (single file per role, embeds all refs) enabled
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: c812b52b8954afe5108f8b852c5b2377d8af743e

---
[CHECKPOINT|2026-01-06T15:31:24+0800]
phase: pre-commit
message: MILESTONE: role sync packets (single file per role, embeds all refs) enabled
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: c812b52b8954afe5108f8b852c5b2377d8af743e

---
[CHECKPOINT|2026-01-06T15:31:26+0800]
phase: post-push
message: MILESTONE: role sync packets (single file per role, embeds all refs) enabled
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 0073f2e241f7b8e66a0e40ba2723a52acddc0d81

---
[CHECKPOINT|2026-01-06T15:37:08+0800]
phase: pre-commit
message: MILESTONE: smart work allocation mode enabled (GPT/Cursor/Codex explicit roles)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: bbee5f4a9d6d949f548e77cd8b87106702939f7e

---
[CHECKPOINT|2026-01-06T15:37:09+0800]
phase: post-push
message: MILESTONE: smart work allocation mode enabled (GPT/Cursor/Codex explicit roles)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 16ec30ed760bb482cd1996a2d362fc7b382576c9

- 📦 顧問交付流程升級：一角色一包（Role Sync Packet）
  - 對顧問（R1–R5）：使用 ROLE_*_SYNC_PACKET.md 作為唯一輸入
  - 對指揮官：日常 MASTER_MIN；需要深度對齊才用 FULL
  - 若顧問輸出出現缺件/假設：先重建 Role Sync Packet 再重做，不得硬採納

- 🧭 任務指派規範已啟用：Execution Assignment Rule（Cursor / Codex 分工決策）

---
[CHECKPOINT|2026-01-06T15:51:09+0800]
phase: pre-commit
message: MILESTONE: advisor role packet workflow integrated
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: 1555140c6066d474493ddd767bead2f96ec78135

---
[CHECKPOINT|2026-01-06T15:51:11+0800]
phase: post-push
message: MILESTONE: advisor role packet workflow integrated
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 7b2567a4ce565140374ef71c45834082893eac37

---
[CHECKPOINT|2026-01-06T16:41:40+0800]
phase: pre-commit
message: MILESTONE: execution assignment rule added (Cursor vs Codex decision)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: 31fffc70e5539b9d18ea9db8e33f8313aef529f4

---
[CHECKPOINT|2026-01-06T16:41:43+0800]
phase: post-push
message: MILESTONE: execution assignment rule added (Cursor vs Codex decision)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: e2514c8b651ecc110e57f6349367fe282bd50997

---
[CHECKPOINT|2026-01-06T16:58:01+0800]
phase: pre-commit
message: MILESTONE: enforce role sync packet coverage audit (single-packet rule)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: e1e0df1a90ddd13877453367a76989693bc8e516

---
[CHECKPOINT|2026-01-06T16:58:03+0800]
phase: post-push
message: MILESTONE: enforce role sync packet coverage audit (single-packet rule)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 5790e6216d77c4737296585d543c54b704eb3c35

---
[CHECKPOINT|2026-01-06T18:34:13+0800]
phase: pre-commit
message: MILESTONE: FULL trigger + MIN evidence policy added
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: fc5d088495465be3d44062a681a78826802422ba

---
[CHECKPOINT|2026-01-06T18:34:15+0800]
phase: post-push
message: MILESTONE: FULL trigger + MIN evidence policy added
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: a7e98cabe9f49ed96c185600f7f9bf71138d5107

## Temporary Objective — Governance Hardening

目標：
- 系統性盤點並修補「制度型漂移風險」
- 優先於功能推進，避免後期高成本回補

目前聚焦：
- docs/gem 證據路徑治理
- SSOT 明確化 + 可自動驗證

狀態：
- In progress


---
[CHECKPOINT|2026-01-06T22:00:33+0800]
phase: pre-commit
message: MILESTONE: exec response mode + docs/gem drift audit PASS + ignore generated （禁止引用之暫存路徑）
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: cdfb9011a3ae549d057b48cd8608ef189d05314d

---
[CHECKPOINT|2026-01-06T22:00:41+0800]
phase: post-push
message: MILESTONE: exec response mode + docs/gem drift audit PASS + ignore generated （禁止引用之暫存路徑）
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: d031279f9f676de1d1f77ee35051427aa6266daf

---
[CHECKPOINT|2026-01-06T22:09:05+0800]
phase: pre-commit
message: MILESTONE: docs/gem drift audit hardened + pushed (repo-root anchored + depth 6)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: a3eb9664a43ec3cc1c47194b0a36a4966c9ef8ef

---
[CHECKPOINT|2026-01-06T22:09:08+0800]
phase: post-push
message: MILESTONE: docs/gem drift audit hardened + pushed (repo-root anchored + depth 6)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: c9fff2cfa44224679d5dc62b9d235ba328a6319f


### TEMP_OBJECTIVE: Governance Hardening via Cursor Audit

背景：
- 曾發生同類資料分散於不同資料夾（docs/gem）導致判斷困難
- 問題非單點錯誤，而是制度缺口

目標：
- 使用 Cursor 進行全倉治理盤點與彙整
- 產出「可寫入文本的治理規則」

產出要求：
- 只關注「會再次發生的結構性問題」
- 每一項問題需對應：
  - 明確規範
  - 檢查方式（script / checklist）
  - Canon 路徑

完成條件：
- 新規則寫入 governance 文本
- 對應 audit / guard script 存在


## Phase Objective (Now)

### Governance Gap Closure: Canon / Artifacts / Shadow Paths

**Scope (from governance audit):**
- Canon violations: duplicate governance roots; undefined `out/`, `tmp/` placement
- Ambiguity: multiple sources for `ROLE_*_SYNC_PACKET`, `CHAT_PACKET`, timestamped advisor packs
- Drift risk: `out/`, `tmp/`, `logs/` not registered; `docs/gem/runs/` naming/versioning not governed
- Missing rules: duplicate filename resolution; shadow path registry; legacy governance; cross-directory references

**Goal:**
- Convert the audit findings into enforceable governance text + simple repo-level enforcement rules.
- Eliminate ambiguous sources so there is exactly one “source of truth” per artifact type.

### Deliverables

1) **Canonical path decision** (write down and enforce)
- Governance docs: single canonical root
- Output artifacts: single canonical `out/`
- Temporary artifacts: single canonical `tmp/`
- Logs: canonical `logs/` rules

2) **Artifact single-source rules**
- Sync packets: single-source path + allowed mirrors (if any)
- Chat packet: single canonical path
- Advisor packs: versioning rules + `LATEST` pointer rules

3) **Registry & lifecycle rules**
- Add/extend registry rule: all artifact dirs must be registered
- tmp lifecycle: retention + cleanup trigger
- logs lifecycle: naming + retention

4) **Reference rules**
- Duplicate filename resolution
- Cross-directory reference priority
- Legacy directory governance
- Shadow path registry + “not evidence” labeling

### Execution Checklist (acceptance)

- [ ] Repo contains **one** governance root; any non-canon governance dir is removed or clearly marked as non-canon
- [ ] Exactly **one** canonical `out/` path is declared and used by scripts/docs
- [ ] Exactly **one** canonical `tmp/` path is declared and used by scripts/docs
- [ ] `out/`, `tmp/`, `logs/` are registered in the artifact registry (or equivalent canon file)
- [ ] `CHAT_PACKET.md` and `ROLE_*_SYNC_PACKET` have exactly one source-of-truth path
- [ ] Timestamped advisor pack directories have a deterministic “latest” resolution rule
- [ ] Shadow paths (e.g., `prompts/gem`) are explicitly registered and labeled as non-canon evidence

### Notes
- This phase is *text-first*: policy comes before refactor.
- Any structural move (delete/move directories) must include a rollback note.

## Temporary Objective — Governance Hardening

- 強化 Governance 目錄結構與管理
- 實施自動化檢查點以防止違規路徑與文件重複
- 修正相對路徑引用問題，確保證據資料正確性
- In progress

<!-- XUANCE_GOVERNANCE_AUDIT_FULL_BEGIN -->
## Governance Audit Record (FULL) — Canon Violations + Automation Checkpoints

來源：Cursor 盤點輸出（已複寫入此處作為 SSOT 記錄；`./tmp/audit/*` 僅為暫存，不可引用為證據）

### Canon 違規盤點報告

#### A) Canon 路徑違規

##### A1. Governance 目錄違規
- **違規路徑**: `./docs/governance`
- **違反規範**: GLOBAL_PATH_CANON.md "禁止：repo root 出現 ./docs/governance"
- **Canon 路徑**: `xuance-commander-core/docs/governance/`

##### A2. Output 目錄違規
- **違規路徑**: `./out/`
- **違反規範**: GLOBAL_PATH_CANON.md "Canon: xuance-commander-core/out/"
- **Canon 路徑**: `xuance-commander-core/out/`
- **違規內容**: `xuance-commander-core/out/CHAT_PACKET.md`

##### A3. Temporary 目錄違規
- **違規路徑**: `./tmp/`
- **違反規範**: GLOBAL_PATH_CANON.md "Canon: xuance-commander-core/tmp/"
- **Canon 路徑**: `xuance-commander-core/tmp/`

#### B) 同名文件跨目錄

##### B1. CHAT_PACKET.md 重複
- `xuance-commander-core/out/CHAT_PACKET.md`
- `xuance-commander-core/out/CHAT_PACKET.md`
- **違反規範**: GLOBAL_PATH_CANON.md "CHAT_PACKET：single source（由 registry 指定）"

##### B2. ROLE_R1_SYNC_PACKET.md 重複
- `xuance-commander-core/memory/briefs/role_sync_packets/LATEST/ROLE_R1_SYNC_PACKET.md`
- `xuance-commander-core/memory/briefs/role_sync_packets/ROLE_R1_SYNC_PACKET.md`
- `xuance-commander-core/out/role_sync_packets/ROLE_R1_SYNC_PACKET.md`
- **違反規範**: GLOBAL_PATH_CANON.md "ROLE_*_SYNC_PACKET：single source（由 registry 指定）"

##### B3. ROLE_R4_SYNC_PACKET.md 重複
- `xuance-commander-core/memory/briefs/role_sync_packets/LATEST/ROLE_R4_SYNC_PACKET.md`
- `xuance-commander-core/memory/briefs/role_sync_packets/ROLE_R4_SYNC_PACKET.md`
- `xuance-commander-core/out/role_sync_packets/ROLE_R4_SYNC_PACKET.md`
- **違反規範**: GLOBAL_PATH_CANON.md "ROLE_*_SYNC_PACKET：single source（由 registry 指定）"

##### B4. COMMON_PACKET.md 重複（時間戳目錄）
- `xuance-commander-core/out/advisor_packs/20260106_143538/COMMON_PACKET.md`
- `xuance-commander-core/out/advisor_packs/20260106_143713/COMMON_PACKET.md`
- **違反規範**: 無明確版本管理規則，無法確定 single source

##### B5. README.md 多處存在（目錄說明文件，可能不違規）
- 11 個位置（legacy 目錄內多個，非 legacy 目錄內 8 個）
- **狀態**: 需確認是否違規（目錄說明文件可能允許多個）

#### C) out/（禁止引用之暫存路徑） 被誤引用為證據

##### C1. 引用 `xuance-commander-core/out/CHAT_PACKET.md`（相對路徑，可能指向錯誤位置）
- `xuance-commander-core/memory/briefs/CURRENT.md:30` - "並貼 xuance-commander-core/out/CHAT_PACKET.md 給指揮官"
- `xuance-commander-core/memory/briefs/COMMAND_BRIEF.md:163` - "並貼 xuance-commander-core/out/CHAT_PACKET.md 給指揮官"
- `xuance-commander-core/docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md:50,55` - 引用 `xuance-commander-core/out/CHAT_PACKET.md`
- **違反規範**: GLOBAL_PATH_CANON.md "規則：所有產物只允許寫入此處" + 相對路徑可能指向 `./out/` 而非 Canon `xuance-commander-core/out/`

##### C2. 引用 `tmp/`（在 CURRENT.md 中提及）
- `xuance-commander-core/memory/briefs/CURRENT.md:712,720` - 提及 "（禁止引用之暫存路徑）"
- **違反規範**: GLOBAL_PATH_CANON.md "規則：不可被引用為證據；可隨時清除"

##### C3. 引用 `logs/`（在 CURRENT.md 中提及）
- `xuance-commander-core/memory/briefs/CURRENT.md:712,720` - 提及 "（禁止引用之暫存路徑）"
- **違反規範**: GLOBAL_PATH_CANON.md "規則：僅供除錯，不可作為決策依據"

#### D) 可自動化的檢查點

##### D1. Governance 目錄檢查
```bash
# 檢查點：repo root 下不得有 docs/governance
find . -type d -path "*/docs/governance" -not -path "*/xuance-commander-core/docs/governance" -not -path "*/legacy/*" -not -path "*/.git/*"
# 預期：只應找到 xuance-commander-core/docs/governance
```

##### D2. Gem 目錄檢查
```bash
# 檢查點：只允許 xuance-commander-core/docs/gem 和 xuance-commander-core/prompts/gem
find . -type d -name "gem" -not -path "*/xuance-commander-core/docs/gem" -not -path "*/xuance-commander-core/prompts/gem" -not -path "*/legacy/*" -not -path "*/.git/*"
# 預期：無結果
```

##### D3. Output 目錄檢查
```bash
# 檢查點：只允許 xuance-commander-core/out/
find . -type d -name "out" -not -path "*/xuance-commander-core/out" -not -path "*/legacy/*" -not -path "*/.git/*"
# 預期：無結果（但會找到 ./out/）
```

##### D4. Temporary 目錄檢查
```bash
# 檢查點：只允許 xuance-commander-core/tmp/
find . -type d -name "tmp" -not -path "*/xuance-commander-core/tmp" -not -path "*/legacy/*" -not -path "*/.git/*"
# 預期：無結果（但會找到 ./tmp/）
```

##### D5. CHAT_PACKET.md Single Source 檢查
```bash
# 檢查點：CHAT_PACKET.md 只能有一個位置（由 registry 指定）
git ls-files | grep "CHAT_PACKET.md$" | wc -l
# 預期：1（但實際為 2）
```

##### D6. ROLE_*_SYNC_PACKET.md Single Source 檢查
```bash
# 檢查點：每個 ROLE_*_SYNC_PACKET.md 只能有一個位置
git ls-files | grep "ROLE_.*_SYNC_PACKET.md$" | awk -F/ '{print $NF}' | sort | uniq -d
# 預期：無重複（但實際有重複）
```

##### D7. 相對路徑引用檢查
```bash
# 檢查點：不得使用相對路徑引用 out/（禁止引用之暫存路徑）（應使用絕對路徑或明確指定）
git ls-files "*.md" | xargs grep -l "out/CHAT_PACKET\\|tmp/\\|logs/" | grep -v "GLOBAL_PATH_CANON\\|TEXT_ONLY_EXECUTION"
# 預期：無結果（但實際有多個文件引用）
```

##### D8. 時間戳目錄版本管理檢查
```bash
# 檢查點：advisor_packs 下應有 LATEST 連結指向最新版本
ls -la xuance-commander-core/out/advisor_packs/ | grep LATEST
# 預期：存在 LATEST 連結（但實際可能不存在）
```

##### D9. Legacy 目錄引用檢查
```bash
# 檢查點：非 legacy 文件不得引用 legacy 目錄內容
git ls-files "*.md" | grep -v "legacy" | xargs grep -l "docs/legacy" | head -5
# 預期：無結果（需手動確認是否違規）
```

##### D10. 證據類資料夾登記檢查
```bash
# 檢查點：所有證據類資料夾必須在 ARTIFACT_REGISTRY 或 GLOBAL_PATH_CANON 中登記
# 需手動比對 find 結果與登記清單
find . -type d -maxdepth 3 -not -path "*/.git/*" -not -path "*/legacy/*" | grep -E "(evidence|artifact|output|result|report|data)" | sort
# 預期：所有結果都應在登記清單中
```

<!-- XUANCE_GOVERNANCE_AUDIT_FULL_END -->

---

## TEMP_OBJECTIVE: Governance Hardening (Cursor Audit SSOT)

來源（SSOT）：
- tmp/audit/CANON_VIOLATIONS.md（Cursor 全倉治理盤點完整報告）

目標：
- 以「最完整、未雨綢繆」為原則，**一次性消除制度型漂移風險**
- 所有對策必須能對應到「未來同類問題不再發生」

執行原則：
- 本臨時目標期間，**功能主線暫停**
- 僅允許：
  - 撰寫治理規則（text-first）
  - 新增/強化 audit / guard scripts
  - Canon 路徑與引用修正
- 禁止任何未在本報告列出的臆測性修正

工作分工：
- Cursor：盤點、彙整、產出完整治理對策文本（以報告為唯一依據）
- Codex：**逐條**依治理文本修正 repo（一條一驗收）
- 指揮官：只做 PASS / FAIL / NEXT 判斷

完成條件：
- CANON_VIOLATIONS.md 中每一項：
  - 都有對應的治理規則文本
  - 都有可執行的檢查方式（script / checklist）
  - 檢查結果為 PASS
- 完成後才允許進入「摘要化 / 精簡 CURRENT」

狀態：
- In progress

---

---

## 治理慣例已啟用：Cursor Audit 驅動制度升級

說明（白話）：
- 只要 Cursor 一次抓出一堆錯誤，就代表「制度不夠」
- 正確順序永遠是：
  1) 先補制度
  2) 再修實作
  3) 最後驗證不再復發

狀態：
- 永久有效（非臨時目標）

---

---
## 治理修復事件｜二次掃描後封板（Cursor Rescan Closure）

來源：
- Cursor 二次治理掃描（CURSOR_RESCAN_RESULTS.md）

錯誤性質分類：
- Canon 路徑違規（governance / out / tmp）
- Single-Source 失效（CHAT_PACKET / ROLE_* / COMMON_PACKET）
- 相對路徑歧義（out/（禁止引用之暫存路徑））
- 影子路徑未登記（verification_packs）
- 時間戳版本無 LATEST
- role_sync_packets 雙重結構

決策：
- 本次不只修檔案，**同步補齊制度**
- 同類問題未來一律視為制度缺口，不得只修單點

狀態：
- Fixing + Writing Governance

---

---
## 治理封板｜二次掃描結案

已補齊制度：
- Global Path Canon
- Single Source Rules
- Absolute Reference Rule
- Shadow Path Registry
- Advisor Pack Versioning

效果：
- 同類錯誤未來可被腳本與文本雙重阻擋
- 不再依賴人工記憶或對話上下文

狀態：
- Governance Hardening COMPLETE

---

---
## 治理事件（進行中）：Cursor 二次全面掃描（Post-Audit Pass）

目的：
- 在第一次 Canon Audit 修補後
- 再次用 Cursor 全倉掃描
- 確認是否仍有「未被制度覆蓋的結構性問題」

原則：
- 只要 Cursor 再抓到問題
- 一律視為「制度缺口」，不得只修單點

狀態：
- Scanning (Cursor)

---

---
[CHECKPOINT|2026-01-06T23:18:12+0800]
phase: pre-commit
message: MILESTONE: governance hardening sealed (cursor rescan -> rules written)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: e2a15aea40dfd558741c449f7863740683cec934

---
[CHECKPOINT|2026-01-06T23:18:14+0800]
phase: post-push
message: MILESTONE: governance hardening sealed (cursor rescan -> rules written)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: c5a7b11487a20395d943435e14a8aba56988949c

---
[CHECKPOINT|2026-01-07T08:24:36+0800]
phase: pre-commit
message: MILESTONE: canon cleanup applied (governance rules enforced in repo)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: 16a4cc4dabe3dbb522836455f7cda0a459de47b4

---
[CHECKPOINT|2026-01-07T08:24:37+0800]
phase: post-push
message: MILESTONE: canon cleanup applied (governance rules enforced in repo)
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: 771d1492c9896547e90e79faee5fcefa5f0da602

---
[CHECKPOINT|2026-01-07T08:47:16+0800]
phase: pre-commit
message: MILESTONE: zero-memory execution + master sharding phase started
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_before: 4871a427b43df2a1f01481980625ab1578ac5937

---
[CHECKPOINT|2026-01-07T08:47:18+0800]
phase: post-push
message: MILESTONE: zero-memory execution + master sharding phase started
remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
branch: main
head_pushed: a80397d9ff96a7581202ccac4660d55d6f8d8bcc


## TEMP OBJECTIVE｜System Governance Hardening (Cursor-driven)

來源：
- Cursor Full-System Governance Scan

狀態：
- 已識別治理缺口：17 項（未建立）
- 已存在核心規範：GLOBAL_PATH_CANON / SINGLE_SOURCE / ABSOLUTE_REF / REGISTRY

未完成（列管）：
- AUTOMATED_CANON_AUDIT_RULE
- FILENAME_COLLISION_RULE
- TIMESTAMP_DIRECTORY_AUTOMATION
- EVIDENCE_REFERENCE_TRACKING
- LEGACY_UPGRADE_PROTOCOL
- GOVERNANCE_RULE_VERSIONING
- GOVERNANCE_CI_CD_RULE
- GOVERNANCE_VIOLATION_SEVERITY
- GOVERNANCE_RULE_TESTING
- GOVERNANCE_ENFORCEMENT_TRACKING
- GOVERNANCE_INHERITANCE
- GOVERNANCE_AUTO_FIX_RULE
- RULE_CONFLICT_RESOLUTION
- RULE_EXECUTION_ORDER
- ONBOARDING_GOVERNANCE_GUIDE
- VIOLATION_REPAIR_GUIDE
- RULE_UPDATE_NOTIFICATION

證據：
- Cursor 原始報告：tmp/audit/CURSOR_FULL_SYSTEM_SCAN.md（非 SSOT）

策略：
- 每修一項制度 → 必須寫入治理文件 + CURRENT 留證
- 禁止只修實作不補制度


## Governance Hardening Status (Auto)

### 已 scaffold（自動落盤）
- governance sprint next steps block exists
- 17 governance rule stubs created in docs/governance/
- SMART_CONTEXT_SHARDING_RULE.md present
- CURSOR_USAGE_RULE.md filed
- MASTER_MIN_SYNC_PACKET.md updated with governance summary

### 檢查要點
- stub files must be populated in Priority order (P0 → P1 → P2)
- Cursor original reports live in tmp/audit (non-SSOT)
- MASTER_MIN always shows governance sync status

---

---

## 階段性目標｜治理重整（Cursor-driven）— 進度盤點

### ✅ 已完成
- Canon / Single Source / Absolute Reference 制度落地
- Execution Target UI Legend（避免貼錯）
- Boss Mode 精簡回報（≤ 8 行）
- 指令包防截斷（腳本式交付）
- Cursor-first 治理流程（先盤點再改檔）

### ⏳ 進行中
- Cursor Limitation Review（語義/策略/歷史意圖）制度化（本次已補）

### ⛳ 下一步（臨時性目標）
- 由 Cursor 執行一次「三類必回檢項」掃描並產出 VERIFICATION_PACK
- 全部結論為 OK 後，允許推進主線任務
---
【Governance Inventory Sprint｜盤點完成｜2026-01-07T13:58:35】
- pointer: /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/memory/briefs/LATEST_INVENTORY_REPORT.md
- counts: governance=47 dupBasename=9 unindexed=46 missingOwner=59
- next: 先修 GOVERNANCE_INDEX coverage（unindexed=0）→ 再補 Owner（missingOwner 降到可接受）

---
## FILE: docs/governance/TEXT_ONLY_EXECUTION_RULES.md

# Text-Only Execution Rules（文本主控硬規則）


## 白話說明：看不懂技術輸出是什麼意思

## 白話說明：GPT 上下文長度與同步資料的問題

GPT 一次最多只能讀取一定長度的上下文（文字量限制）。  
為了讓 GPT 只讀需要的部分，我們不把所有歷史資料丟給它，  
而是用「同步快照 + 分段」方式讓 GPT 聚焦在關鍵段落。

簡單比喻：

- 把整本書全部丟給 GPT → 它會忘記前面  
- 把書拆成小段 + 目錄查詢 → GPT 只看需要的章節

未來我們可以進一步把重要片段存進更高效的查詢系統（例如向量資料庫），  
讓 GPT 查詢時更加精準、token 也省更多。

---



有時系統會顯示很多技術性很強的內容（例如 shell hook 輸出或系統內部訊息）。  
這些技術訊息並非錯誤，而是系統寫給機器或流程檢查用的「證據」文字。  
人類要看的重點是：

- 指令是否成功（exitCode / success）
- 是否已同步到雲端（commit + push）
- 是否更新 MASTER snapshot

如果這三件事都有證據，其他技術訊息可以視為背景細節，不影響結果判斷。

---


## Repo 可視性邊界（AI 不可直接瀏覽你的 repo）

硬事實：
- 指揮官（GPT）**無法直接讀取**你本機的資料夾結構、檔名清單、或任何未被貼出的檔案內容。
- 指揮官能掌握的全貌，**只能來自你提供的文本快照**（例如 MASTER / MIN / Role Sync Packets / Verification Pack）。

因此：
- 只要「資料夾全貌」會影響判斷（例如：顧問缺件、路徑是否存在、是否有 legacy/router/brief/run/domain 檔），就必須提供可審計的快照證據。
- 未被快照包含的檔案/內容，對指揮官而言視為不存在；不得基於猜測推進。

驗收（可檢查）：
- 任何需要 repo 全貌的任務，必須在 VERIFICATION_PACK 內提供一份「Repo Tree Snapshot」輸出（見 `docs/ops/VERIFICATION_PACK_POLICY.md`）。


## 穩定性優先（Stability-First）功能提升規則

硬規則：
- 任何「功能提升 / 自動化增強 / 同步策略優化」，都必須以**系統穩定性不下降**為前提。
- 若新增功能會引入不確定性（例如：更多 hook、更多自動生成、更多同步分支），必須先提供「可回滾」方案；未提供則不得合併。

必備驗收（至少一項，依變更範圍提升）：
- 最低：可重跑且成功（exitCode=0）+ 不產生新噪音/錯誤
- 中等：提供 VERIFICATION_PACK（含：版本/狀態/關鍵輸出）證明功能正常
- 高風險：必須先在「隔離測試」或「dry-run」模式驗證，並保留 rollback 指令

失敗處理：
- 一旦驗收失敗：立即停止追加功能，優先修回穩定狀態（必要時回退到上一次 checkpoint）。


## Execution Target｜貼哪裡才對（避免貼錯造成 Terminal exit 127）

<!-- XUANCE_TRUNCATION_GUARD_BEGIN -->


## 指令包交付防截斷規則（Chat / UI Truncation Guard）

問題：Chat/介面可能截斷「很長的 code block」，導致貼到 Terminal 只是一半 → 直接失敗。

硬規則（之後一律照做）：
1) 只要指令包 >= 80 行、或混合 shell+python、或包含多段 heredoc：不得在 Chat 交付全文。
2) 一律改成「兩段式交付」：
   - A 段（短 bootstrap）：貼到 Terminal 就能跑，負責驗證 pack 檔案存在與摘要。
   - B 段（完整 pack）：由 Cursor 在本機寫入固定路徑（建議 tmp/audit/packs/<name>.sh 或 /tmp/<name>.sh），不走 Chat 複製。
3) 驗收：bootstrap 必須印出 pack 的「路徑 + 行數 + hash」，用來抓截斷/貼錯。

標準 bootstrap（只允許貼這段到 Terminal）：
```bash
set -euo pipefail
PACK_PATH="/tmp/xc_pack.sh"

test -f "$PACK_PATH" || (echo "[ERR] Missing pack: $PACK_PATH" && exit 1)
echo "PACK=$PACK_PATH"
echo "LINES=$(wc -l < "$PACK_PATH" | tr -d ' ')"
if command -v shasum >/dev/null 2>&1; then
  echo "SHA256=$(shasum -a 256 "$PACK_PATH" | awk '{print $1}')"
else
  echo "SHA256=$(sha256sum "$PACK_PATH" | awk '{print $1}')"
fi

bash "$PACK_PATH"
```
備註：
- 要可追溯：pack 改存 repo：tmp/audit/packs/，並把「路徑 + hash」寫進 VERIFICATION_PACK。
<!-- XUANCE_TRUNCATION_GUARD_BEGIN -->

- **Terminal**：只能貼純 shell 指令（建議用「腳本式指令包」模板）。
- **Cursor AI**：適合貼「需要本機盤點/彙整/檢查」的需求，並要求它先跑只讀盤點。
- **Codex**：只在落點與規則位置已被 evidence 確認後，用來做一次性修補。
- **ChatGPT（指揮官）**：只做判斷與規格化，不直接宣稱已改到本機。

## 核心規則
- 對話上下文只能作為參考，不得作為主目標與主進度依據
- 主目標與主進度只允許引用：
  - charter/CHARTER.md
  - roadmap/ROADMAP.md
  - memory/briefs/CURRENT.md
  - docs/adr/*

## 低說明・指令優先互動模式（Anti-Drift Mode）

適用情境：
- 進入執行期 / 治理修復期 / 大型專案中後段
- 使用者明確要求「只要下一步 / 指令包」

互動原則：
- 指揮官預設 **不進行長篇說明**
- 回覆內容優先順序：
  1) 可直接執行的指令包
  2) 必要時的一行判斷（對 / 不對 / PASS / FAIL）
- 非必要背景、推理、術語一律省略

例外：
- 僅在「重大決策 / 題目設計 / 世界觀封板」時，才可進入詳細說明模式

驗收：
- 每次回覆可在 1 次貼上內完成
- 不依賴對話記憶即可執行
- 若「無法一次貼完」，必須先產生指令包或要求補充最小必要上下文

- 對話上下文只能作為參考，不得作為主目標與主進度依據
- 主目標與主進度只允許引用：
  - charter/CHARTER.md
  - roadmap/ROADMAP.md
  - memory/briefs/CURRENT.md
  - docs/adr/*

## 禁止行為
- AI 不得擅自新增更高層級目標
- AI 不得擅自增加不可接受的限制
- AI 不得基於「我覺得更好」改寫主線

## 強制行為
- 每次完成任務驗收後：必須在 MASTER_MIN / CURRENT 留下「進度百分比 + 下一個檢查點」的可讀摘要
- 每次開始任何工作前，必須先跑 preflight（tools/preflight.sh）
- preflight 會生成 memory/briefs/COMMAND_BRIEF.md
- 指揮官之後的所有決策與建議必須基於 COMMAND_BRIEF.md
- 預設證據來源：REPO_STATUS / LAST_COMMAND_STATUS / LATEST_VERIFICATION_PACK（對話中不貼長輸出）
- 若證據缺失或過期：先要求 Cursor 重新生成 REPO_STATUS + VERIFICATION_PACK；未補齊前不得提出修復方案

- 證據回報預設走「自動快照」：除非指揮官明確要求，否則不要要求使用者手動貼 terminal 輸出；以 LAST_COMMAND_STATUS / REPO_STATUS / LATEST_VERIFICATION_PACK / MASTER_MIN 作為回報依據
- 當需要驗收時，指揮官必須提供「可重跑指令包」來自動產出證據（寫入 LAST_COMMAND_STATUS + 更新 LATEST_VERIFICATION_PACK/MASTER），使用者只需執行完後貼最新 MASTER_MIN（或回覆 done 並附 MASTER_MIN）
- 治理/制度性改動的施工前檢查：優先由 Cursor 先做本機彙整與檢查（路徑/重複/索引/缺檔/未追蹤檔案），輸出報告後，指揮官才可下達修復指令包與寫入文本
- 會話紀錄硬規則：每回合結束必須把（計畫/指令/結果/阻塞）寫入文本（CURRENT/CHANGELOG/必要時 governance），下一回合必須輸出可直接執行的指令包以更新文本與驗收


<!-- XUANCE_DOCS_GEM_CANON_BEGIN -->
## docs/gem 單一真相來源（防漂移硬規則）

硬規則：
- GEM 證據（briefs/profiles/runs）的唯一合法落點是：
  - `xuance-commander-core/docs/gem/`
- `xuance-commander-core/prompts/gem/` 只放提示模板，不是 runs 落點。
- 任何其他 `*/docs/gem`（尤其是 repo root 的 `./docs/gem`）一律視為漂移副本，不得寫入。

驗收（可檢查）：
- `bash xuance-commander-core/tools/audit_docs_gem_drift.sh` 必須 PASS。

引用要求：
- ROADMAP/CURRENT/DECISION 內對 GEM runs 的引用，必須使用：
  - `xuance-commander-core/docs/gem/runs/...`

規範來源：
- `xuance-commander-core/docs/governance/DOCS_GEM_CANON_RULE.md`
<!-- XUANCE_DOCS_GEM_CANON_END -->

---

## Pending Governance Specs (to be authored from audit)

These items are approved to be written next (derived from the governance gap audit) and then enforced:

- Governance Canon Enforcement (single governance root)
- Output Artifact Canon (single `out/` + naming)
- Temporary Artifact Canon (single `tmp/` + lifecycle)
- Log Artifact Registry (structure + retention)
- Sync Packet Single Source (role sync packets)
- Chat Packet Canon (single path)
- Advisor Packet Versioning (timestamp dirs + LATEST rule)
- Duplicate Filename Resolution (priority + lint rule)
- Cross-Directory Reference Rule (how to cite paths)
- Shadow Path Registry (explicitly non-evidence unless promoted)
- Legacy Artifact Governance (retention + reference ban by default)

- Global Path Canon: docs/governance/GLOBAL_PATH_CANON.md
- Governance Audit Record (FULL): memory/briefs/CURRENT.md (section: Governance Audit Record)
  - 注意：`./tmp/audit/*` 只能當暫存輸出；FULL 記錄以 CURRENT 為準

---
## 執行環境標註（Execution Target Declaration｜硬規則）

- 每一個「指令包 / 操作建議」，**必須明確標註執行對象**：
  - Cursor + Terminal（本機）
  - Codex（一次性代碼修復）
  - NO RUN（僅制度/決策，先寫文本）

- 未標註執行對象的指令包，**視為不合格，不得執行**。

- 涉及以下類型，**預設一律使用 Cursor + Terminal**：
  - 文本治理（.md）
  - 規則／制度新增或調整
  - 流程文件（TASK / GOVERNANCE / RULES）
  - 需要 grep / git status / git diff 驗收者

- Codex 僅限用於：
  - 已明確定義修改範圍與內容的程式碼修復
  - 不涉及制度判斷與文本治理的情境

## Cursor 能力邊界（策略層補檢）
- Cursor 不自動處理：語義層衝突／跨文件策略衝突／歷史意圖偏離
- 必依 `docs/governance/CURSOR_LIMITATION_REVIEW_RULE.md` 於關鍵節點回檢

---
## FILE: docs/process/TASK_LIFECYCLE.md

# Task Lifecycle（任務執行與驗證流程）

本專案所有任務，必須遵循以下流程，否則視為未執行：

## 1. 任務啟動（Before）
- 必須存在最新的 `COMMAND_BRIEF.md`
- 任務目標必須能對應到：`CHARTER` / `ROADMAP` / `CURRENT` / `ADR`
- 未寫入文本的任務，視為不存在

## 2. 任務執行（During）
- 所有終端機指令由自動同步機制記錄
- 每一次指令執行結果，必須寫入：`memory/briefs/LAST_COMMAND_STATUS.md`

<!-- XUANCE_RESEARCH_GATE_BEGIN -->

## 2.2 Research → Brief → Advisor → Domain Gate（新增｜硬規則）

觸發條件（任一成立即必做）：
- 要新增/修改 facet 的 questions / scoring / narratives / recommendations / riskchains
- 要啟動顧問角色（R1/R2/R3/R4/R5）產出內容

必做流程（不可跳過）：
1) Research（內部推導）：
   - 只能讀 docs/research/ 的研究筆記做推導，不得直接外露
2) Brief（顧問輸入）：
   - 把 research 萃取成短輸入，存到 docs/gem/briefs/BRIEF_*.md
3) Advisor Runs（顧問建議稿）：
   - 顧問輸入一律使用對應 Role Sync Packet（ROLE_*_SYNC_PACKET.md）；不得用 FULL MASTER 取代。
   - 顧問輸出存到 docs/gem/runs/（只算建議稿）
4) Commander 審核：
   - 若顧問輸出顯示缺件或自行假設：必須先重建 Role Sync Packet 並要求顧問重做（不得直接採納）。
   - 指揮官做採納/拒絕/修改決策摘要後，才可落盤到 domain/
5) Golden Tests：
   - 跑 tests/run_golden.sh（或專案既定測試腳本）確保輸入輸出穩定

驗收：
- 能在 repo 中找到：brief + runs + domain 變更 + 測試結果（或至少可重跑的驗證指令）

<!-- XUANCE_RESEARCH_GATE_END -->

## 2.5 診斷（Diagnosis）

### 2.5.1 執行者選擇（避免治理期反覆返工）
治理/制度重整期間（目前階段）預設採用：
1) **Cursor（先盤點）**：先產出本機證據（git/grep/檔案落點/工具存在性）。
2) **指揮官（再決策）**：根據證據決定要改哪個檔、放哪個段落、驗收點是什麼。
3) **Codex（後修補）**：只在「落點與規則位置已確定」時，做一次性修補與收尾。

硬規則：
- 沒有 evidence（或 evidence 過期）→ 不得進入步驟 3。
- 若發現貼錯區（例如把說明貼進 Terminal）→ 先回到步驟 1 重新盤點，不要硬修。

當問題屬於環境/殼層/Hook/路徑等「不先定位就可能改錯」的類型：
- 先用 Cursor 產出 VERIFICATION PACK（只讀）。
- 再由指揮官根據證據產出 Codex 修復包。
- 驗證結果必須可被寫入 LAST_COMMAND_STATUS（直接執行或透過 tools/xc / tools/xuance_run.sh）。
- 同步 Repo 狀態：若為版本/分支/遠端相關問題，診斷階段必須生成 `memory/briefs/REPO_STATUS.md` 並納入 MASTER。

## 2.6 治理修繕（Governance Hardening）｜Cursor 先行檢查（硬規則）
觸發條件（任一成立即必做）：
- 新增/修改治理規則（docs/governance/*）
- 新增/修改快照制度（MASTER_MIN / MASTER / VERIFICATION_PACK / sharding）
- Cursor 掃描報告指出缺口或衝突（例如 FULL_SYSTEM_SCAN / audit gaps）

必做流程：
1) Cursor 本機檢查：先產出「檢查報告」（路徑正確性 / 缺檔清單 / 重複與命名衝突 / 未追蹤檔案 / 索引是否更新）。
2) 指揮官決策：根據報告，產出可重跑指令包（含驗收），並同回合寫入文本留證。
3) Cursor 二次驗證：執行後再跑一次檢查，確認缺口數下降或歸零。

證據：
- Cursor 報告：存 tmp/audit 或 verification_packs（只摘要進 MASTER，raw 保留路徑）
- git status -sb 必須可驗收（新增檔案需被追蹤；不允許把關鍵證據留在 tmp 但未留指標）

驗收：
- GOVERNANCE_INDEX.md（或對應索引）已更新
- 新增/修改的規則文件可被索引定位（不得孤兒文件）
- 若有 stub：至少填到「Procedure/Evidence/Acceptance」可用程度

## 3. 任務驗證（After）

- 以 `LAST_COMMAND_STATUS` 作為唯一執行證據
- 若無對應成功紀錄，任務視為未完成

- 驗收後必做：更新 MASTER_MIN 的「Progress (MIN)」兩條百分比與 next checkpoint（不需要貼長輸出）

### 3.1 Boss Mode｜驗收回報握手（減少貼輸出）

預設：使用者不需要理解也不需要手動貼長輸出。

指揮官在需要驗收時必須：
1) 給「可重跑指令包」（會自動更新 LAST_COMMAND_STATUS / REPO_STATUS / LATEST_VERIFICATION_PACK / MASTER）
2) 指定需要看的證據指標（例如：repo head/branch/dirty、git diff --stat、grep 命中、tests 是否通過）
3) 要求 Cursor 在本機端把「驗收輸出」寫入 VERIFICATION_PACK（不要貼長輸出到對話），MASTER_MIN 只保留指標與結論

使用者只需要：
- 跑完指令包後，貼最新 MASTER_MIN_SYNC_PACKET.md（或回覆 done 並附上 MASTER_MIN）

例外：
- 只有當自動快照沒更新、或證據指標缺失時，才要求使用者貼 terminal 原始輸出。
### 3.1 會話紀錄與下一輪指令包（硬規則｜避免遺忘）
每一次對話/施工回合結束，都必須把「我們決定要做什麼、怎麼做、做完的結果、遇到的困難」寫進文本，並在下一輪對話輸出可直接執行的指令包。

必寫入（至少其一；能多寫就多寫）：
- memory/briefs/CURRENT.md：更新「現在做到哪、下一步是什麼」
- memory/changes/CHANGELOG.md：記錄本回合做了哪些變更與原因（可用白話）
- 若屬治理修繕：在 CURRENT 的 GOV 區塊追加進度，並更新對應 governance 文件（或 stub）

下一輪對話必須輸出：
- 一包可重跑（idempotent）的指令包（含驗收指令）
- 若需要 Cursor 證據：明確寫「要 Cursor 提供哪個檔、哪個輸出」

驗收：
- CURRENT/CHANGELOG 至少一處有新增紀錄
- 指令包能在終端機直接跑，並在最後輸出可檢查的成功條件


## 4. 狀態對齊（Sync）

- 生成同步快照（優先 AUTO）：
  - `bash xuance-commander-core/tools/build_master_sync_packet_auto.sh`（若存在）
  - 否則沿用：`bash tools/build_master_sync_packet_full.sh`

- 日常對齊（推薦）：貼 MIN 快照（MASTER_MIN_SYNC_PACKET.md）。
- 需要深度對齊或觸發 FULL 條件時：貼 FULL 快照（MASTER_SYNC_PACKET.md）。

補充（對話層索取規則）：
- 日常對齊：只貼 MIN（`MASTER_MIN_SYNC_PACKET.md`）。
- 只有在 `docs/ops/SYNC_TRIGGERS.md` 的「FULL 索取觸發條件」任一成立時，指揮官才會點名索取 FULL（`MASTER_SYNC_PACKET.md`）。

### 工程證據（Verification）
當任務涉及「改碼是否改對」「測試是否通過」「環境/Hook 是否修好」：
- 必須生成 VERIFICATION_PACK（若工具存在）並在文本中留下路徑指標。


## 5. 里程碑備份（Checkpoint｜雲端留存）

當指揮官宣告「階段性任務目標達成 / 已驗收完成」時，必須立刻觸發一次雲端備份與留證：

- 執行：
  - `bash xuance-commander-core/tools/xc_checkpoint.sh "MILESTONE: <里程碑名稱> 已驗收完成"`

此指令必須同時完成：
- git add/commit/push（雲端備份）
- 將證據寫入：`memory/briefs/CURRENT.md` 與 `memory/changes/CHANGELOG.md`
- 重建：`memory/briefs/MASTER_SYNC_PACKET.md`

驗收：
- GitHub 上 `origin/main` 可看到新 commit（message 含 MILESTONE）。
- `CURRENT.md` / `CHANGELOG.md` 有新增里程碑留證。
- 同一輪 `MASTER_SYNC_PACKET.md` 的 `generatedAt` 更新。

注意：
- 若 push 失敗（網路/認證/衝突），不得宣稱「雲端已備份」；必須先修復後再重跑 checkpoint。


## 核心原則
- 有紀錄才算做過
- 有成功狀態才算完成
- 有寫入文本才算存在

### 封板判斷表（白話）

你可以把「封板」理解成：把這輪的成果存成一個「可回到的雲端版本」。

建議封板（任一成立就做）：
- 今天改到「制度/規則/流程/角色」
- 今天加了工具或腳本（或修改了生成邏輯）
- 今天修掉一個會反覆出現的問題（例如 sync drift / missing refs / hook 噪音）
- 今天做到一個可以獨立驗收的段落（有 PASS、有 grep、有 audit、有 pack）

不建議封板（通常先不要）：
- 只是探索，尚未驗收
- 只是聊天討論，尚未落盤到 repo

硬規則：
- 若你宣告「這段已完成/已驗收」但沒封板 → 一律視為未完成（因為未留雲端證據）。

---
## FILE: docs/governance/AI_ADVISORY_ROLES.md

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

## Cursor（治理盤點 / 結構審計顧問）

定位：
- 負責「全倉盤點」「重複 / 漂移 / 命名衝突」的發現
- 不負責決策，只提供結構證據與彙整建議

使用時機：
- 發生治理事故（Incident）
- 懷疑規範不足或規則重疊
- 需要一次性全面掃描 repo

輸出要求：
- 重點式（Issue / Location / Risk）
- 可直接轉寫為治理規則

---
## FILE: memory/briefs/CONTEXT_CAPSULE.md

# CONTEXT_CAPSULE（超短狀態膠囊｜每次同步必帶）
generatedAt: 2026-01-07T14:04:25+0800

## Mainline
- phase: Phase 0 / MVP
- currentFacetId: income_expansion_pressure
- focus: P0-2 (questions/scoring/reco/narr/riskchains + golden tests)
- roadmapSignal: ROADMAP has P0-2 section

## Evidence pointers
- CURRENT: memory/briefs/CURRENT.md
- ROADMAP: roadmap/ROADMAP.md
- LAST_COMMAND_STATUS: memory/briefs/LAST_COMMAND_STATUS.md
- REPO_STATUS: memory/briefs/REPO_STATUS.md

## Latest evidence (quick)
- repoHead: 5a041e6
- lastCommand: (unknown)
- lastSuccess: true

## Mandatory rules always-on
- CHARTER + TEXT_ONLY + TASK_LIFECYCLE + AI_ADVISORY_ROLES must be consulted every run

---
## FILE: memory/briefs/LATEST_VERIFICATION_PACK.md

# LATEST_VERIFICATION_PACK（指向最新工程證據包）
updatedAt: 2026-01-07T14:04:25+0800
path: docs/ops/verification_packs/VERIFICATION_PACK_20260107_140425.md
overallExitCode: 0

---
## FILE: memory/briefs/REPO_STATUS.md

# REPO_STATUS（Repo 狀態快照｜自動）
updatedAt: 2026-01-07T11:07:56+08:00
repoRoot: /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine
branch: main
head: 5a041e6

## git status -sb
## main...origin/main
 M xuance-commander-core/docs/governance/TEXT_ONLY_EXECUTION_RULES.md
 M xuance-commander-core/docs/process/TASK_LIFECYCLE.md
 M xuance-commander-core/memory/briefs/CURRENT.md
 M xuance-commander-core/memory/briefs/MASTER_MIN_SYNC_PACKET.md
?? xuance-commander-core/docs/governance/CURSOR_USAGE_RULE.md
?? xuance-commander-core/docs/governance/GOVERNANCE_INDEX.md
?? xuance-commander-core/docs/governance/SMART_CONTEXT_SHARDING_RULE.md

## git remote -v
origin	https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git (fetch)
origin	https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git (push)

## last commit
commit 5a041e656089163ed780099ff27b0ef2f9a2c5dc
Author:     saccharomyces2016-spec <Saccharomyces2016@gmail.com>
AuthorDate: Wed Jan 7 08:47:18 2026 +0800
Commit:     saccharomyces2016-spec <Saccharomyces2016@gmail.com>
CommitDate: Wed Jan 7 08:47:18 2026 +0800

    chore: MILESTONE: zero-memory execution + master sharding phase started (post-push evidence)

---
## FILE: memory/briefs/LAST_COMMAND_STATUS.md

# LAST_COMMAND_STATUS（最新一次指令結果｜自動）
updatedAt: 2026-01-07T11:07:56+08:00
command: (unknown)
exitCode: 0
success: true
