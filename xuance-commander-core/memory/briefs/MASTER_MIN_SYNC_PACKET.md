# MASTER_MIN_SYNC_PACKET（小快照｜每次必帶｜SSOT 指向）
generatedAt: 2026-01-06T15:50:44+0800
sourceRoot: /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core

## RULE
- Always consult: CHARTER / ROADMAP / CURRENT / TEXT_ONLY / TASK_LIFECYCLE / AI_ADVISORY_ROLES
- Evidence: LAST_COMMAND_STATUS + REPO_STATUS + LATEST_VERIFICATION_PACK
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

目標：MVP（最小可行產品）採用「核心引擎穩定、內容外置化、schema 版本化」架構，降低後期衝突。

已完成：
- 初始化資料夾結構與玄策指揮官角色規範
- 建立可擴充 MVP 骨架（domain 分檔、schema、golden tests、build 合併）

下一步（主線）：
1) P0-2：為 income_expansion_pressure 建立 questions/scoring/recommendations/narratives/riskchains
2) 走 Research → Brief → Advisor → Domain gate
3) 補齊 golden tests（固定輸入輸出）

制度已建立：
- 想法治理（Idea Governor）
- 記憶治理（Memory Curator）
- Phase Gate
- 系統健康檢查

操作習慣：
- 任何新討論/新任務前：bash tools/export_chat_packet.sh .
- 並貼 out/CHAT_PACKET.md 給指揮官（最小必要上下文）

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


## 核心規則
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
- 每次開始任何工作前，必須先跑 preflight（tools/preflight.sh）
- preflight 會生成 memory/briefs/COMMAND_BRIEF.md
- 指揮官之後的所有決策與建議必須基於 COMMAND_BRIEF.md

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

當問題屬於環境/殼層/Hook/路徑等「不先定位就可能改錯」的類型：
- 先用 Cursor 產出 VERIFICATION PACK（只讀）。
- 再由指揮官根據證據產出 Codex 修復包。
- 驗證結果必須可被寫入 LAST_COMMAND_STATUS（直接執行或透過 tools/xc / tools/xuance_run.sh）。
- 同步 Repo 狀態：若為版本/分支/遠端相關問題，診斷階段必須生成 `memory/briefs/REPO_STATUS.md` 並納入 MASTER。

## 3. 任務驗證（After）

- 以 `LAST_COMMAND_STATUS` 作為唯一執行證據
- 若無對應成功紀錄，任務視為未完成

## 4. 狀態對齊（Sync）

- 生成同步快照（優先 AUTO）：
  - `bash xuance-commander-core/tools/build_master_sync_packet_auto.sh`（若存在）
  - 否則沿用：`bash tools/build_master_sync_packet_full.sh`

- 日常對齊（推薦）：貼 MIN 快照（MASTER_MIN_SYNC_PACKET.md）。
- 需要深度對齊或觸發 FULL 條件時：貼 FULL 快照（MASTER_SYNC_PACKET.md）。

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

---
## FILE: memory/briefs/CONTEXT_CAPSULE.md

# CONTEXT_CAPSULE（超短狀態膠囊｜每次同步必帶）
generatedAt: 2026-01-06T15:50:44+0800

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
- repoHead: bb94c7a
- lastCommand: (unknown)
- lastSuccess: true

## Mandatory rules always-on
- CHARTER + TEXT_ONLY + TASK_LIFECYCLE + AI_ADVISORY_ROLES must be consulted every run

---
## FILE: memory/briefs/LATEST_VERIFICATION_PACK.md

# LATEST_VERIFICATION_PACK（指向最新工程證據包）
updatedAt: 2026-01-06T15:50:44+0800
path: docs/ops/verification_packs/VERIFICATION_PACK_20260106_155044.md
overallExitCode: 0

---
## FILE: memory/briefs/REPO_STATUS.md

# REPO_STATUS（Repo 狀態快照｜自動）
updatedAt: 2026-01-06T14:15:35+08:00
repoRoot: /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine
branch: main
head: bb94c7a

## git status -sb
## main...origin/main

## git remote -v
origin	https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git (fetch)
origin	https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git (push)

## last commit
commit bb94c7a0f465cf822fb09a78b78815b12402b4db
Author:     saccharomyces2016-spec <Saccharomyces2016@gmail.com>
AuthorDate: Tue Jan 6 11:35:09 2026 +0800
Commit:     saccharomyces2016-spec <Saccharomyces2016@gmail.com>
CommitDate: Tue Jan 6 11:35:09 2026 +0800

    chore: MILESTONE: repair recording rule added (no silent fixes allowed) (post-push evidence)

---
## FILE: memory/briefs/LAST_COMMAND_STATUS.md

# LAST_COMMAND_STATUS（最新一次指令結果｜自動）
updatedAt: 2026-01-06T14:15:35+08:00
command: (unknown)
exitCode: 0
success: true

