# ROLE_R1_SYNC_PACKET（單檔同步包｜Common+Role+Refs）
generatedAt: 2026-01-06T16:19:34+08:00
sourceRoot: /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core

## NOTE
- This file is auto-generated. Do not edit by hand.
- Regenerate via: bash xuance-commander-core/tools/build_role_sync_packets.sh

---
## 0) ROLE SCOPE
- role: R1
- rule: one-file-per-role; embeds common + role-specific + refs

---
## 1) COMMON

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
## FILE: memory/changes/CHANGELOG.md

# CHANGELOG

## Unreleased
- Changed: Sync governance now explicitly integrates Role Sync Packets for advisor inputs (avoid missing-text assumptions)
- Added: Advisor return-pack minimal spec (Used Packet/Output/Assumptions/Acceptance) to ROLE_SYNC_PACKET_PROTOCOL
- Added: Tiered Sync spec (MIN/FULL/VERIFICATION_PACK) + Smart Sync definition -> docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md
- Changed: TASK_LIFECYCLE Sync step now prefers AUTO + requires VERIFICATION_PACK when correctness must be proven -> docs/process/TASK_LIFECYCLE.md
- Added: CURRENT records workflow upgrade to Smart Sync Tiered Workflow (construction method upgraded)
- Added: Governance lessons learned from prior failures (version drift + rules deadlock) -> docs/governance/LESSONS_LEARNED.md
- Added: GEM briefing from failures/constraints -> docs/gem/briefs/BRIEF_lessons_and_constraints.zh.md
- Changed: CURRENT now points to lessons + advisory constraints to avoid repeating failure modes

- Added: USER_OVERRIDE_PROTOCOL (fatigue-safe final override + rollback-by-checkpoint)
- Added: ADR_0005 (Proposed) user override + fatigue rollback protocol
- Changed: ROADMAP P0-1 marked done; selected first facet income_expansion_pressure with seed Q1
- Changed: CURRENT updated to reflect mainline transition to P0-2 for income_expansion_pressure
- Added: Sync system stabilized + milestone sealed (ts=2026-01-05T11:01:02+0800, branch=main, head=54982618a5f6dc8fa2dbc432845adc0d29199346) <!-- XUANCE_CHANGELOG_SYNC_STABLE -->
- Added: GitHub cloud sync verified (local HEAD can be matched to origin/main); documented the safety caveat that only committed+pushed changes are protected
- Added: Legacy zsh hook `_xc_precmd` auto-cleanup in tools/sync_mode_hooks.sh to stop prompt errors and keep Absolute Auto-Log stable
- Added: Milestone checkpoint workflow (xc_checkpoint.sh) required in Task Lifecycle/Autopilot with MASTER rebuild + CURRENT/CHANGELOG evidence


- Added: Realtime MASTER sync marked as achieved (LAST_COMMAND_STATUS as evidence + hook/tool-triggered MASTER rebuild + verifiable checks documented in CURRENT)
- Added: REPO_STATUS auto snapshot (git status/remote/last commit) -> `memory/briefs/REPO_STATUS.md`, included in MASTER for deterministic repo alignment
- Changed: Commander may proactively propose best-path workflow (Cursor diagnosis -> Codex one-shot fix) under controlled limits (see ROLE_XUANCE_COMMANDER R6; COMMANDER_AUTOPILOT_PROTOCOL Cursor/Codex section)

- Changed: ADR_0003 + ADR_0004 status -> Accepted (approvedAt: 2026-01-04)
- Added: ADR_0004 AI advisory roles system + GEM protocol
- Added: docs/governance/AI_ADVISORY_ROLES.md (roles + responsibilities)
- Added: docs/gem/ (profiles + run archive) and prompts/gem/ (GEM templates)
- Added: AI_PARTNERSHIP_PROTOCOL to upgrade AI role to accountable professional partner with mandatory proactive checks and hard-stop authority
- Added: BOOT_RULE (single mandatory task entry gate)
- Added: AUTONOMOUS_STOP_PROTOCOL (hard stop on missing text)
- Added: ADR_0003 world-class quality + bilingual (CN/EN) global-market readiness
- Changed: prototype now loads compiled facet (no hardcoded scoring ranges) + npm dev ready styling
- Added: PREWRITE_STATE_CONFIRMATION governance rule (stop + confirm state before any write)
- Added: extensible MVP skeleton (domain externalization, schema versioning, golden tests, build compiler)
- Changed: memory/index/INDEX.md de-duplicated ADR headings
- Added: MASTER_SYNC_PACKET as single-file synchronization anchor
- Added: MASTER Sync Protocol for real-time alignment and long-term memory
- Changed: Workflow now supports deterministic AI state recovery via MASTER
- Added: MASTER_SYNC_PACKET single-file snapshot for deterministic AI alignment (read-only; SSOT remains original files)
- Added: MASTER sync workflow to prevent context drift and enable state recovery per chat

- Added: Absolute Auto-Log sync mode enabled
  - Shell hook active (bash/zsh)
  - LAST_COMMAND_STATUS auto-written per command
  - Sync verified via live command execution


- Added: milestone checkpoint pushed (ts=2026-01-05T09:56:10, msg="MILESTONE: Checkpoint script TS bug fixed", branch=main, head=f22bddf54e52048e19aff1a71dbfae9a6bd7b901, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T10:12:13+0800, msg=MILESTONE: checkpoint TS/locale fix probe, branch=main, head=a3b273ba9e61344807874219225361310ee7596e, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T10:21:27+0800, msg=MILESTONE: cleanup mojibake evidence (CURRENT/CHANGELOG) verified, branch=main, head=b2fd185984ea15b73d1e8a01515d918080f5a48a, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T10:25:38+0800, msg=MILESTONE: sync system stable (evidence clean), branch=main, head=54982618a5f6dc8fa2dbc432845adc0d29199346, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T11:01:02+0800, msg=MILESTONE: sync system stable (sealed in text), branch=main, head=6d85ad419578cbdc9d3e9f803c2e80a1b9ef1f31, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T11:24:20+0800, msg=MILESTONE: GEM advisory roles (R1/R4) defined and sealed, branch=main, head=ac3e4abeccd963336f00f2a1da362a92ba49a7c2, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T11:34:01+0800, msg=MILESTONE: GEM roles sealed + evidence clean + LAST_COMMAND_STATUS verified, branch=main, head=6c6ab9211620f97e6f2e6753755c3e20c9db14ad, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T12:26:26+0800, msg=MILESTONE: sync hook stable (command capture verified) + evidence updated, branch=main, head=7ec63de4f11b3128ac8da5178205fe2e1acc4d63, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T12:30:09+0800, msg=MILESTONE: sync hook stable - evidence sealed, branch=main, head=49a7a95a543720fb995539a080b915ea17779d5a, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T12:35:48+0800, msg=MILESTONE: sync hook stable - evidence sealed (final), branch=main, head=6ec5eb7f1fef27450b1acc3614068d548ce7786c, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T13:10:23+0800, msg=MILESTONE: research layer added + life_cycle_0_100 note imported, branch=main, head=b6ae24c168e4b12954697885c72d35480254cd1e, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: Checkpoint workflow (`tools/xc_checkpoint.sh`) for milestone sealing (commit+push+evidence+MASTER rebuild)
- Added: Robust zsh command capture for LAST_COMMAND_STATUS (preexec+precmd hooks) to prevent `(unknown)` command evidence
- Added: Internal research layer (`docs/research/`) with explicit non-exposure rule (research text must not be pasted into user-visible domain outputs)
- Added: GEM briefing staging area (`docs/gem/briefs/`) to convert research signals into advisor-ready inputs

- Added: milestone checkpoint pushed (ts=2026-01-05T13:22:56+0800, msg=MILESTONE: sync system + GEM roles + research layer (evidence cleaned & readable), branch=main, head=dd90747261b1cccc0058ba226242394f8dd2adcc, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T13:27:50+0800, msg=MILESTONE: evidence drift sealed (post-readable-cleanup), branch=main, head=be6ef3e1f1e8ebc5fb7f00d133d524bb27c36995, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T14:02:11+0800, msg=MILESTONE: research reference modes sealed (Research->Brief->Advisor->Domain gate), branch=main, head=a64e7c0696a05226397e6544800253abb6ea9be8, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: Foundation & governance sealed (sync system, checkpoint workflow, AI advisory roles, research layer, research gate)
- Changed: Project state now ready to enter ROADMAP Phase 0 (MVP single facet)

- Added: milestone checkpoint pushed (ts=2026-01-05T15:05:28+0800, msg=MILESTONE: P0-1 facet selected (income_expansion_pressure) + user override protocol added, branch=main, head=4bc4347cc615b35fcbf1720bcd215a72a23a7f0c, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T15:15:31+0800, msg=MILESTONE: failure cases recorded (version drift + rules deadlock) + advisory constraints brief, branch=main, head=eefb589c79dc4952c1b0fdda8d88010d8dcb9e11, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T16:32:13+0800, msg=MILESTONE: legacy project analyzed (my-first-app) + research signals preserved, branch=main, head=645967b9bdc9f31cbd71a7da6f986f261d3cedba, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T17:21:40+0800, msg=MILESTONE: legacy vault imported (115_1_3_my-first-app_failed) + inventory + brief pointers, branch=main, head=4fed2a38373d1c4f419d661bd886e461713df856, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T17:43:01+0800, msg=MILESTONE: legacy vault routing layer added (ROUTER/CAPABILITY/UI/REUSE/FAIL) + legacy consult rule, branch=main, head=b906b27ecb1882771dbb48b2c245208e04014a0d, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: Mandatory Milestone Recording Rule (all completed phase/temporary goals must be written into text)
- Added: Legacy vault temporary milestone sealed at callable-layer (router/capability/reuse/ui/failure); paragraph-level analysis intentionally deferred

- Added: milestone checkpoint pushed (ts=2026-01-05T18:11:19+0800, msg=MILESTONE: mandatory milestone recording rule added + legacy callable-layer sealed, branch=main, head=31e098added6882a747d435acc543ac42c433540, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: Completion Record Rule (mandatory write-on-complete)
- Added: Governance CODEBOOK (high-density rules)
- Added: MODE_SWITCHES (auto workflow modes)
- Added: Legacy routing layer sealed as completed temporary goal

- Added: milestone checkpoint pushed (ts=2026-01-05T18:16:15+0800, msg=MILESTONE: completion-record rule + codebook + mode switches + legacy routing sealed, branch=main, head=3d59b138c642f23f2cbf2bd11d81229964d35ad5, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: P0-2 kickoff briefs for income_expansion_pressure (R1 blueprint + R4 riskchains), with mandatory legacy/research/lessons references

- Added: milestone checkpoint pushed (ts=2026-01-05T18:20:32+0800, msg=MILESTONE: P0-2 kickoff briefs staged for income_expansion_pressure (R1/R4) with legacy+research+lessons mandatory refs, branch=main, head=8d5ab106241d3df036d5ac00fe0e51deedeb9831, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint (pre-commit) staged (ts=2026-01-05T19:17:04+0800, msg=MILESTONE: checkpoint flow reorder test, branch=main, head_before=89343ec4b15ec29a7ea321b75311d73e9ea479d6, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T19:17:04+0800, msg=MILESTONE: checkpoint flow reorder test, branch=main, head=5170f146441673c2e0a8830c8daefd0aafaa7675, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: checkpoint(pre-commit) ts=2026-01-05T19:23:21+0800 msg="MILESTONE: checkpoint flow reorder test 2" branch=main head_before=5170f146441673c2e0a8830c8daefd0aafaa7675 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-05T19:23:44+0800 msg="MILESTONE: checkpoint flow reorder test 2" branch=main head_pushed=4e11f8f0309e1cf4afaa8ac05d8f5e55775ca450 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-05T19:24:02+0800 msg="MILESTONE: checkpoint flow reorder test 2" branch=main head_before=ad3249a61ac3f29f446a75371f12b108abd0df71 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-05T19:24:04+0800 msg="MILESTONE: checkpoint flow reorder test 2" branch=main head_pushed=fd8be79ac672af77ae2a71514bd39c3059f1bb60 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: System Capabilities declaration (Analysis Orchestrator; Exploration/Unlock UX) and noted in roadmap/current

- Added: checkpoint(pre-commit) ts=2026-01-06T10:10:51+0800 msg="MILESTONE: system capabilities (AI orchestrator + exploration unlock) declared" branch=main head_before=ca71c4f1aadd484c1f34e993a7e0d7ba77f42b40 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T10:10:53+0800 msg="MILESTONE: system capabilities (AI orchestrator + exploration unlock) declared" branch=main head_pushed=3abf24bc98bdb9c7cc1842440ead9c5b962eac8e remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T10:25:11+0800 msg="MILESTONE: CURRENT aligned to P0-2 (income_expansion_pressure)" branch=main head_before=9c59b93ab20fb6586807c1cfa9278c77a6bc33c5 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T10:25:13+0800 msg="MILESTONE: CURRENT aligned to P0-2 (income_expansion_pressure)" branch=main head_pushed=4569052a10dde039b4c4f6a0b155234ee20bb5b4 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T10:27:24+0800 msg="MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4)" branch=main head_before=9a71dffaa7eaf906b49de3e2980279388fc790b8 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T11:24:37+0800 msg="MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4) [seal wording fix]" branch=main head_before=e1b05a5e05657d21e5871f0698f2d198725de743 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T11:24:42+0800 msg="MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4) [seal wording fix]" branch=main head_pushed=047bc9ba1d5afbd68d0738942afc75c3bca11d19 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Repair Recording Rule (all fixes/patches must leave textual trace; no silent repairs) -> docs/governance/REPAIR_RECORDING_RULE.md

- Added: checkpoint(pre-commit) ts=2026-01-06T11:35:03+0800 msg="MILESTONE: repair recording rule added (no silent fixes allowed)" branch=main head_before=6ef9ba707d910c0d2afeef0c0991b3e86b29b743 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T11:35:09+0800 msg="MILESTONE: repair recording rule added (no silent fixes allowed)" branch=main head_pushed=9742044430fb1d9c16d8be74aa952075f1c2f88d remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Sync trigger governance doc (MIN/FULL/VERIFICATION_PACK decision table) -> docs/ops/SYNC_TRIGGERS.md
- Added: VERIFICATION_PACK policy (naming + LATEST pointer + cleanup rule) -> docs/ops/VERIFICATION_PACK_POLICY.md
- Changed: Commander role adds Optimization Suggestion Duty (controlled proactive improvements) -> docs/roles/ROLE_XUANCE_COMMANDER.md

- Added: checkpoint(pre-commit) ts=2026-01-06T14:19:24+0800 msg="MILESTONE: sync trigger governance + verification pack policy + commander optimization duty" branch=main head_before=bb94c7a0f465cf822fb09a78b78815b12402b4db remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T14:20:23+0800 msg="MILESTONE: sync trigger governance + verification pack policy + commander optimization duty" branch=main head_before=bb94c7a0f465cf822fb09a78b78815b12402b4db remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T14:20:25+0800 msg="MILESTONE: sync trigger governance + verification pack policy + commander optimization duty" branch=main head_pushed=fdaaa8728e2ac80d1bf2cee9022c39d811398509 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Role Sync Packet Protocol (one role = one packet; common+role+refs embedded) -> docs/ops/ROLE_SYNC_PACKET_PROTOCOL.md
- Added: Role Sync Packet generator + outputs -> tools/build_role_sync_packets.sh; memory/briefs/role_sync_packets/ROLE_R1_SYNC_PACKET.md; ROLE_R4_SYNC_PACKET.md

- Added: checkpoint(pre-commit) ts=2026-01-06T15:31:17+0800 msg="MILESTONE: role sync packets (single file per role, embeds all refs) enabled" branch=main head_before=c812b52b8954afe5108f8b852c5b2377d8af743e remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T15:31:24+0800 msg="MILESTONE: role sync packets (single file per role, embeds all refs) enabled" branch=main head_before=c812b52b8954afe5108f8b852c5b2377d8af743e remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T15:31:26+0800 msg="MILESTONE: role sync packets (single file per role, embeds all refs) enabled" branch=main head_pushed=0073f2e241f7b8e66a0e40ba2723a52acddc0d81 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Smart Work Allocation Protocol (GPT vs Cursor vs Codex) -> docs/ops/SMART_WORK_ALLOCATION_PROTOCOL.md
- Changed: Commander role adds Smart Allocation Duty (explicit tool assignment per instruction pack) -> docs/roles/ROLE_XUANCE_COMMANDER.md

- Added: checkpoint(pre-commit) ts=2026-01-06T15:37:08+0800 msg="MILESTONE: smart work allocation mode enabled (GPT/Cursor/Codex explicit roles)" branch=main head_before=bbee5f4a9d6d949f548e77cd8b87106702939f7e remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T15:37:09+0800 msg="MILESTONE: smart work allocation mode enabled (GPT/Cursor/Codex explicit roles)" branch=main head_pushed=16ec30ed760bb482cd1996a2d362fc7b382576c9 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T15:51:09+0800 msg="MILESTONE: advisor role packet workflow integrated" branch=main head_before=1555140c6066d474493ddd767bead2f96ec78135 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T15:51:11+0800 msg="MILESTONE: advisor role packet workflow integrated" branch=main head_pushed=7b2567a4ce565140374ef71c45834082893eac37 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"


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
## FILE: docs/governance/REPAIR_RECORDING_RULE.md

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


---
## FILE: docs/ops/SYNC_TRIGGERS.md

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

### Role Sync Packet Trigger（新增｜顧問交付專用）
當任一成立時，除了 MIN/FULL 之外，**必須**同時生成對應角色的 Role Sync Packet：
- 你要把任務交給顧問角色（R1–R5）
- 你要顧問做第二輪/改版輸出
- 你發現顧問輸出出現「缺件/自行假設」

目的：讓顧問永遠以最新共同規範 + 角色專屬 brief 工作，避免漂移。


---
## FILE: docs/ops/VERIFICATION_PACK_POLICY.md

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

---

## Advisor Runs 與 Verification Pack 的邊界
- 顧問輸出（docs/gem/runs/）不是工程證據，不屬於 VERIFICATION_PACK。
- VERIFICATION_PACK 只用於工程正確性：repo 狀態、測試、diff、環境/Hook 診斷。
- 若顧問輸出要被採納落盤到 domain/：
  - 必須在指揮官審核後，額外生成一個 VERIFICATION_PACK（含：變更檔案清單 + golden tests 或可重跑驗證指令）。


---
## FILE: docs/ops/ROLE_SYNC_PACKET_PROTOCOL.md

# Role Sync Packet Protocol（角色同步封包制度｜硬規則）

目的：
- 對外（R1/R4/未來顧問）交付永遠「一角色一包」，避免缺件與假設導致漂移。
- 每次改規範/改主線/改 briefs → 只要重生封包再重送即可，不依賴對話記憶。

## 硬規則（不可違反）
1) 一個角色 = 只發一個 Markdown 檔（Role Sync Packet）。
2) 該單一檔案必須同時包含：
   - 專案共通事項（Common Rules + SSOT 摘要/全文）
   - 該角色專屬事項（Brief / 禁區 / 輸出格式 / Gate）
   - 該角色所需參考資料（純文字來源，直接內嵌）
3) 禁止分成 common packet + role packet，避免「一個角色要傳兩包」。
4) 規範或 brief 變更時：
   - 唯一合法作法：重新生成該角色封包並重新傳送（以新封包為準）。
   - 舊封包視為過期，不得作為依據。

## 顧問缺件處置（防假設漂移）
若顧問回報缺件或無法對齊：
- 代表收到的不是最新封包或封包生成失敗。
- 顧問必須停止自行假設，改為回報「缺哪一項」。

## 產物落點與命名
- 產物目錄：`xuance-commander-core/memory/briefs/role_sync_packets/`
- 命名（固定）：
  - `ROLE_R1_SYNC_PACKET.md`
  - `ROLE_R4_SYNC_PACKET.md`
- LATEST 指標（固定）：
  - `role_sync_packets/LATEST/ROLE_R1_SYNC_PACKET.md`
  - `role_sync_packets/LATEST/ROLE_R4_SYNC_PACKET.md`

## 失效判定
- 若顧問產出與現行規範/brief 衝突：
  - 視為使用過期封包；
  - 該產出不得進入 Domain Gate（不得寫入 domain/）。

---

## Integration Notes（與現有同步/治理的整合｜必讀）

### 1) Role Sync Packets 與 MASTER_MIN/FULL 的分工
- 對 **顧問角色（R1/R4/R2/R3/R5）** 的交付：**一律用 Role Sync Packet**（一角色一包）。
- 對 **指揮官（GPT）** 的狀態對齊：日常用 **MASTER_MIN**；必要時用 **FULL**。
- 禁止：把 FULL MASTER 當成顧問輸入（容易爆上下文且顧問不需要工程證據）。

### 2) Role Sync Packets 的內容優先序（避免缺件與漂移）
Role Sync Packet 內文必至少包含：
1. CHARTER / ROADMAP / CURRENT（共同規範）
2. 角色專屬 Brief（例如 R1 blueprint、R4 riskchains）
3. 必查指標（legacy router、research gate、lessons learned）
4. 交付格式與驗收點（該角色在 AI_ADVISORY_ROLES.md 定義者）

### 3) 何時必須重新生成 Role Sync Packets
任一成立即必須重建並重新貼給對應角色：
- CHARTER / ROADMAP / CURRENT 任一更新
- ADR 變動（新增/狀態變更）
- 該角色的 brief 變動（docs/gem/briefs/*）
- 你要顧問在同一主題上做「第二輪」輸出（避免顧問仍使用舊規範）

### 4) 顧問需要提交給指揮官的「最小可用回包」（回收資料規格）
顧問回包必包含（否則視為缺件、不得採納落盤）：
- Used Packet: <ROLE_*_SYNC_PACKET.md 的 generatedAt 或 LATEST 指標路徑>
- Output: <建議稿全文>
- Assumptions: <所有假設條列>
- Acceptance: <如何驗收題目/風險鏈是否有效>


---
## FILE: docs/governance/LESSONS_LEARNED.md

# Lessons Learned（失敗案例→治理規則）

<!-- XUANCE_LESSONS_FAILCASES_BEGIN -->
## 失敗案例 A：不使用文本（對話內版本漂移）
現象：
- 同一個 GPT 對話串跑到後期，出現 4 個題型版本共存
- 版本之間引用路徑互相衝突
- 即使第 4 版表現不錯，最後因整包重做而汰除，只能封存

根因（工程語言）：
- 沒有 SSOT（Single Source of Truth）
- 版本與引用關係不受控（無 manifest / 無明確生效規則）
- 「看起來可用」但不可回溯、不可維護

本專案對策（已採用/必維持）：
- ROADMAP/CURRENT/ADR 為唯一主線事實來源（未寫入視為不存在）
- domain 外置化 + schema 版本化 + golden tests（避免行為漂移）
- MASTER_SYNC_PACKET 作為「同步快照」，但 SSOT 仍是原檔

驗收點：
- 同一時間只允許一個「生效的題型版本」
- 引用路徑必須可由 manifest/compile 推導且能測試

---

## 失敗案例 B：文本治理「寫死」導致上層不可改、下層不合目標
現象：
- 有用文本紀錄作唯一依據
- 但上層規定寫得太死，後期發現不符合目標也不能改
- 下層設定又無法滿足功能需求，造成雙向卡死而失敗

根因（工程語言）：
- 治理規則缺少「合法變更機制」（缺少可回滾、可覆蓋的改規則路徑）
- 上層規則與目標沒有保留「使用者最終修正權」的操作層落地

本專案對策（必採用/本輪新增強調）：
- 使用者最高主權（CHARTER）+ 可回滾（checkpoint）= 永遠可改
- 規則/架構變更走 ADR + 使用者批准（不是不能改，是要能審計地改）
- 若發現規則不再服務目標：允許「新 checkpoint 覆蓋進度」而非硬扛

驗收點：
- 任一規則都能用「新增 ADR + checkpoint」合法修正，不會卡死

---

## 本輪討論結論（要寫進治理層的共同約束）
- 題目設計要達成終極目標，需要顧問介入（R1 題目設計 + R4 風險鏈）
- 顧問輸出只能是建議稿：docs/gem/runs/；採納後才可落盤 domain
- 舊版本題庫/題型應進 archive/legacy 層：只做「反例與訊號萃取」，不得直接貼進 domain
<!-- XUANCE_LESSONS_FAILCASES_END -->

---

## 失敗案例補充：my-first-app（早期封存）

問題：
- 題目版本多線並存，無唯一真相來源
- 無研究層，直接把題目當結果
- UI 與命題邏輯耦合

改善原則：
- 強制 Research → Brief → Advisor → Domain
- 題目必須可被替換，不可綁死敘事
- 治理層允許「使用者最終覆寫」


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


---
## FILE: docs/adr/ADR_0001_externalize_domain_and_version_schema.md

# ADR 0001 - Externalize Domain Content & Versioned Schemas

## Status
Accepted

## Context
若把題目/規則/建議/敘事寫死在程式碼中，後期擴充時會大量修改同一檔案，造成 merge conflicts 與行為不可預測。
同時「文本記憶」會越來越大，必須採用小檔索引與指向式記憶，降低傳輸與同步成本。

## Decision
1) 引擎 code 固定且精簡；內容（questions/scoring/reco/narr/risk）全部外置化到 domain/ 分檔
2) 用 manifest 指向各分檔，build 時 compile 成 compiled facet
3) schema 固定並版本化（domainVersion），任何變更需新增 ADR 與 bump version
4) 用 golden tests 固定輸入輸出，確保新增內容不破壞既有行為
5) 記憶採小檔索引：INDEX + CURRENT + CHANGELOG + ADR，避免單一巨大文本

## Consequences
- 優點：後期新增多為新增檔案，降低衝突；行為可驗收可回歸
- 代價：需要 compile 步驟；需要維護 schema/manifest

## Verification
- 新增 facet 時可只新增 domain 檔案與 manifest，不必改引擎
- build/compile_all.sh 可成功編譯所有 manifests
- tests/run_golden.sh 通過


---
## FILE: docs/adr/ADR_0002_esoteric_experience_scientific_core.md

# ADR 0002 - Esoteric User Experience with Scientific Internal Core

## Status
Accepted

## Context
本專案以玄學形式呈現給使用者，但內部實際運作依賴現代心理學與可驗證的科學結構。
若未明確鎖定此原則，後期可能出現：
- 對使用者解釋過多，削弱玄學體驗
- 為了「合理化」而破壞玄學的整體感受
- 將產品誤導為心理測驗或教育工具，而非玄學系統

## Decision
1) 在使用者可感知的層級，本專案**完全且只是一個玄學系統**
2) 使用者不應被告知任何心理學或現代科學背景
3) 任何削弱「這就是玄學」的說明，禁止出現在使用者層
4) 系統內部必須建立在完整、嚴謹、可推導的現代心理學與相關科學系統之上
5) 外層玄學公式與敘事，必須對應到可推導的內部結構，不得隨意編造
6) 專案成功的唯一判準，是使用者實際感知到「很準、很有幫助」

## Consequences
- 所有設計與實作，必須同時滿足：
  - 對使用者：純玄學、直覺、不可被拆解
  - 對內部：結構完整、可驗證、可修正
- 若使用者普遍未感知其準確性與實用性，即視為未達成目標，必須持續修正

## Verification
- charter/CHARTER.md 明確載入此原則
- 未來所有功能、facet、敘事皆可回溯至此 ADR


---
## FILE: docs/adr/ADR_0003_world_class_bilingual_global_market.md

# ADR 0003 - World-Class Quality & Bilingual (CN/EN) Global Market Readiness

## Status
Accepted (approved by user)

- approvedAt: 2026-01-04

## Context
外層呈現是完整的玄學系統，但若要商業化並接軌國際市場，必須把「世界級水準」與「可切換英文版」視為硬目標。
若未明確寫入，可能只做到中文可用、英文只是草率翻譯，導致整體質感與可信度不足。

## Decision
1) 產品品質目標：世界級（水準涵蓋視覺、互動、敘事、穩定性、可維護性）
2) 產品必須可切換成英文版（CN/EN），可直接接軌國際市場
3) 無論中文或英文，使用者普遍要感知：
   - 很準
   - 看得懂（不含糊）
   - 真的有幫助（能促進行動或反思）
4) 英文版不得只是逐字翻譯；敘事需自然如原生英文玄學系統（外層仍是玄學，不暴露內核）

## Consequences
- 需要 i18n/文案結構；外層仍維持玄學體驗（遵守 ADR_0002）
- 後續「敘事/建議/風險鏈」需能產出 CN/EN 版（或可追溯的生成流程）
- 若使用者普遍不覺得準/有幫助，即使工程正確，也視為未達成目標，需迭代

## Verification
- charter/CHARTER.md 載入世界級 + CN/EN 切換要求
- prototype/UI 可顯示 CN/EN 兩種語系（不解釋原理）


---
## FILE: docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md

# ADR 0004 - AI Advisory Roles System & GEM Protocol

## Status
Accepted (approved by user)

- approvedAt: 2026-01-04

## Context
為達成「世界級水準」與「CN/EN 可原生切換」且維持「對使用者：純玄學體驗」，專案不能只靠單一 AI 隨機產出題目或文案。
需要一個可審計、可追溯、可分工的顧問角色系統，並用受限的 GEM 角色來產出「建議稿」供指揮官審核。

若未建立此制度，常見風險：
- 題目像心理測驗或太直白，削弱玄學體驗
- 英文版像翻譯機，失去原生語感與可信度
- 敘事/建議/風險鏈品質不穩定，無法迭代
- 無法回溯「為何這樣設計」，難以維護與擴充

## Decision
1) 建立「AI 顧問角色系統」（Advisory Roles System），定義每個角色的責任、輸入、輸出、禁區、驗收標準。
2) 建立「GEM Protocol」：以 Gemini GEM（或等價角色提示）模擬顧問，但其輸出僅能作為建議稿，不得直接寫入正式 domain。
3) 指揮官負責：
   - 指派任務給顧問角色
   - 審核顧問輸出
   - 決定是否寫入正式 domain（必要時追加 ADR）
4) 所有顧問輸出必須可追溯：保存到 `docs/gem/runs/`，包含：任務、輸入、輸出、指揮官決策摘要。

## Consequences
- 新增 docs/gem/ 與 prompts/gem/ 作為顧問角色與 GEM 設定的真相來源。
- 題目/敘事/建議/風險鏈進入正式 domain 前，必須先經過顧問輸出 -> 指揮官審核 ->（必要時）版本更新與測試。

## Verification
- 新增以下檔案：
  - docs/governance/AI_ADVISORY_ROLES.md
  - docs/gem/README.md
  - docs/gem/profiles/*.md
  - prompts/gem/*.md
  - docs/gem/runs/README.md
- CHANGELOG 與 INDEX 註冊完成


---
## FILE: docs/adr/ADR_0005_user_override_and_fatigue_rollback.md

# ADR 0005 - User Override & Fatigue-Rollback Protocol

## Status
Proposed

## Context
高密度討論容易造成疲勞與決策失誤。專案需要一個操作層規範，明確保障使用者「最後可修正」的權利，同時保留可審計、可回滾的工程流程。

## Decision
1) 新增 docs/governance/USER_OVERRIDE_PROTOCOL.md 作為操作層規範：
   - 使用者可隨時修正決策
   - AI 必須在明顯違反專業常理時提醒風險與替代方案
   - 疲勞狀態優先封板最小決策，避免返工
2) 回滾以 Git 為唯一可靠方式：
   - 里程碑封板使用 checkpoint（commit+push+evidence+MASTER）
   - 後續修正以新 checkpoint 留證，不手改歷史

## Consequences
- 流程更穩定：可回溯、可回滾、可審計
- 決策成本降低：疲勞時可先封板最小可行決策

## Verification
- repo 內存在 USER_OVERRIDE_PROTOCOL.md
- ROADMAP/CURRENT/CHANGELOG 對應紀錄可追溯


---
## FILE: docs/adr/ADR_TEMPLATE.md

# ADR XXXX - Title

## Status
Proposed / Accepted / Deprecated

## Context
（為什麼要做這個決策）

## Decision
（做了什麼決策）

## Consequences
（好處/代價/風險）

## Verification
（怎麼驗收這個決策是有效的）


---
## 1.5) LEGACY_ROUTER (MANDATORY REFS)

---
## FILE: xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/ROUTER.md

# LEGACY ROUTER（可調用導航｜不要再翻整包）

用途：
- 當我們在做「主線 P0-2（questions/scoring/reco/narr/risk）」或任何治理/流程討論時，
  直接用本路由定位 legacy 內的可用材料。
- 本檔只做「導航」，不做全文引用；需要時再開檔精讀。

原則：
- ✅ 必須參考（consult）可用材料
- ❌ 不要求引用原文（quote/copy）
- ✅ 若採納 legacy 方案：要在「採納摘要」寫出來源路徑（traceability）

---

## 路由：題目系統（Question Design / Blueprint）
優先看：
- reports/question_bank_concept_package.md
- reports/mother_theme_questionization_v2.md
- scripts/generateQuestionBlueprint.mjs
- reports/p1_question_blueprint_v1.json

延伸看（更上層的舊規格/白皮書）：
- artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/02_QUESTION_SYSTEM.md
- artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/01_PROJECT_MASTER.md

---

## 路由：計分模型（Scoring）
優先看：
- src/core/psych/scorer.js
- reports/p1_question_blueprint_v1.json
- scripts/validate/validate-questionbank.mjs

---

## 路由：敘事與結果呈現（Narrative / Result Templates）
優先看：
- src/core/flow/readingNarrative.v1.js
- archive/legacy/core-content/resultTemplates/readingOutputV2.js
- src/engine/contracts/readingContract.v1.js
- src/engine/readingFacade.v1.js

---

## 路由：LLM 提示與總控（Prompt / Orchestration）
優先看：
- src/core/SoulArchitect.js
- src/core/llm/masterPrompt.v1.1.md
- src/core/guidance/buildGuidance.js

---

## 路由：金錢/經濟題庫（Money / Finance question bank）
優先看：
- archive/legacy/questionBank/money.js
- archive/legacy/questionBank/index.js

搭配看（標籤/政策/清理）：
- reports/pattern_tag_policy_v1.md
- reports/pattern_tag_cleanup_summary.md
- reports/pattern_tag_usage_audit.md
- reports/pattern_tag_audit_raw.json

---

## 路由：治理與證據（Governance / Evidence）
優先看：
- docs/governance/02_ROLES/ROLE_REGISTRY.md
- docs/governance/08_REPORTS/GOVERNANCE_STATE_REPORT.md
- docs/governance/08_REPORTS/root_reports/PRODUCT_ANALYSIS_REPORT.md

舊資料（僅用來理解歷史設計思路，不直接搬）：
- artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/04_GOVERNANCE_EVIDENCE.md
- artifacts/governance_runs/_governance/state_snapshot/missing_refs.json
- artifacts/governance_runs/_governance/state_snapshot/legacy_candidates_classified.json

---

## 路由：資料結構/Schema（Data Schema）
優先看：
- docs/DATA_SCHEMA_SPEC.md
- scripts/validate/validate-canonical.mjs
- scripts/validate/validate-modes.mjs

---

## 路由：診斷與分析工具（Diagnostics / Analytics）
優先看：
- scripts/analyticsReport.mjs
- scripts/diagnoseReading.mjs


---
## FILE: xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/FAILURE_PATTERNS.md

# FAILURE PATTERNS（legacy 失敗模式庫｜用來避免重犯）

目的：
- 把「失敗」變成可查的規則與預警，不再靠記憶。

---

## 已知高風險模式（從你描述的歷史失敗 + legacy 結構推定）
1) 題型/題庫版本漂移（多版本並存、互相引用）
- 徵兆：同概念在多處 duplicated；引用路徑交叉；改 A 壞 B
- 對策：domain 外置化 + schema 版本化 + golden tests（現行 ADR_0001 已處理）

2) 規則上層寫死造成下層無法滿足需求（deadlock）
- 徵兆：治理/規則不可變；但需求演進必然改動 → 導致整包報廢
- 對策：USER_OVERRIDE_PROTOCOL + checkpoint rollback（現行已入治理）

3) 「整包保存但不可調用」
- 徵兆：資料在，但不知道去哪找；每次都要重新掃描
- 對策：本 vault 必須具備 ROUTER（本次已落盤）

---

## 後續要補的「精讀證據」（下一輪任務）
- 從 legacy 文件中抓出 3~5 個具體案例（檔名+段落摘要）來證明上述模式
- 把每個模式補上：
  - 觸發條件
  - 最短驗收（如何快速檢查是否又開始發生）


---
## FILE: xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/UI_FLOW_REFERENCES.md

# UI / FLOW REFERENCES（互動流程參考）

用途：
- 後續做 P0-4（最小 UI 串接）時，快速定位舊版如何串接「輸入→計分→敘事→輸出」。

---

## Candidate files
- src/engine/readingFacade.v1.js（入口/流程）
- src/core/flow/readingNarrative.v1.js（敘事流程）
- archive/legacy/core-content/resultTemplates/readingOutputV2.js（結果模板）
- src/core/telemetry/choiceMetrics.js（使用者選擇記錄/遙測可能性）

---

## What to extract later（精讀時要抓的點）
- UI 的狀態機：題目如何分步呈現？
- 結果頁：哪些欄位/區塊最能承載「玄學體驗」？
- 收集資料點：哪些資料適合做成後續迭代的 telemetry（不侵犯隱私前提下）？


---
## FILE: xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/CAPABILITY_MAP.md

# CAPABILITY MAP（legacy 能力盤點｜可移植資產）

用途：
- 把 legacy 的「可用能力」抽成模組，方便新系統採納或避免重犯。

---

## A. 題庫與命題能力（Questionization）
- 題庫概念包：reports/question_bank_concept_package.md
- 主題→命題方法：reports/mother_theme_questionization_v2.md
- 題目藍圖生成器：scripts/generateQuestionBlueprint.mjs
- 題目藍圖輸出：reports/p1_question_blueprint_v1.json

可移植方向（新系統）：
- 用於 P0-2 的「題目藍圖」設計（R1 顧問輸入/輸出結構）
- 用於後續多 facet 扩張（保持模板一致性）

---

## B. 計分與分段能力（Scoring / Banding）
- scorer：src/core/psych/scorer.js
- 校驗：scripts/validate/validate-questionbank.mjs

可移植方向：
- 保留「可校驗的 scoring contract」
- 保留「輸入→分數→band」的可測試鏈

---

## C. 敘事/結果輸出能力（Narrative / Templates）
- 敘事流程：src/core/flow/readingNarrative.v1.js
- 結果模板：archive/legacy/core-content/resultTemplates/readingOutputV2.js
- contract/facade：src/engine/contracts/readingContract.v1.js, src/engine/readingFacade.v1.js

可移植方向：
- P0-4 的最小 UI 串接（讀 compiled facet → 顯示敘事/建議/風險鏈）
- 文案與模板分離（便於 CN/EN）

---

## D. LLM 編排與引導能力（Orchestration / Guidance）
- 總控：src/core/SoulArchitect.js
- 主提示：src/core/llm/masterPrompt.v1.1.md
- guidance builder：src/core/guidance/buildGuidance.js

可移植方向：
- 僅抽象「接口設計」與「輸入輸出契約」
- 不直接搬 prompt（避免與現行治理/研究 gate 衝突）

---

## E. 標籤治理與清理能力（Tag policy / Audit）
- policy/summary/raw：reports/pattern_tag_policy_v1.md, reports/pattern_tag_cleanup_summary.md, reports/pattern_tag_audit_raw.json

可移植方向：
- 做為 domain 擴張時的「分類/標籤」治理模板


---
## FILE: xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/REUSABLE_ASSETS.md

# REUSABLE ASSETS（可重用資產清單）

原則：
- ✅ 可用作「參考、模板、接口設計對照」
- ❌ 不直接複製舊系統全文進新 domain（避免帶入舊版矛盾/治理死鎖）

---

## Code assets（可能可重用的程式骨架）
- src/core/psych/scorer.js（計分骨架）
- src/engine/contracts/readingContract.v1.js（契約）
- src/engine/readingFacade.v1.js（外觀/入口）
- scripts/validate/*（驗證腳本模式）
- scripts/analyticsReport.mjs（分析輸出模式）

---

## Content assets（題目/模板原型）
- archive/legacy/questionBank/money.js（經濟/金錢題型原型）
- archive/legacy/core-content/resultTemplates/readingOutputV2.js（結果模板原型）
- reports/p1_question_blueprint_v1.json（題目藍圖資料範例）

---

## Governance assets（治理模板/報告結構）
- docs/governance/02_ROLES/ROLE_REGISTRY.md
- docs/governance/08_REPORTS/*（報告組織方式）


---
## 2) ROLE-SPECIFIC

---
## FILE: docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R1_question_blueprint.zh.md

# BRIEF（P0-2｜income_expansion_pressure｜R1 題目設計顧問）
generatedAt: 2026-01-05T18:20:32+0800

## 任務
請以「高階題庫藍圖」形式輸出（不是直接寫完整題庫）：
- 題目分段（sections）
- 每段目的（要區分什麼狀態）
- 題型配置（單選/量表/情境題…）
- 目標：能把使用者穩定分成 3~5 個可解釋狀態（bands）
- 必須同時輸出 CN/EN 的問法風格指引（不必逐題翻譯，但要給規則與範例）

## facet 定義（SSOT：ROADMAP P0-1）
- facetId: income_expansion_pressure
- 定義：薪資增速追不上家庭開銷所產生的壓力，以及對「第二收入」的驅動與可行性狀態。

## 硬性約束（不得違反）
- ADR_0002：對使用者層 = 純玄學體驗（不得暴露心理學/科學名詞）
- ADR_0003：必須可做 CN/EN 原生語感
- 顧問輸出僅為建議稿（不得直接寫入 domain）

## 失敗避免（必讀）
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/governance/LESSONS_LEARNED.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/gem/briefs/BRIEF_lessons_and_constraints.zh.md

## legacy 參照（必查路由｜只需引用要點）
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/ROUTER.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/CAPABILITY_MAP.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/REUSABLE_ASSETS.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/UI_FLOW_REFERENCES.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/FAILURE_PATTERNS.md

## research 參照（必查，但不得外露原文到使用者層）
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/research/  （請只萃取結構訊號，轉寫成你的設計理由）

## 你要輸出的格式（固定）
1) Blueprint 概覽（3~5 bands 的命名與定義）
2) Sections（每段：目的 / 題型 / 題數 / 範例問法 2~3 題）
3) Scoring signals（每段怎麼影響 bands，給「可落盤規則」）
4) 風險提示（哪些問法會太像心理測驗，如何改成玄學問卦）
5) 驗收（最少 3 組對照使用者，能明顯落在不同 band）


---
## FILE: docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md

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

