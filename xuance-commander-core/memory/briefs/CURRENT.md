# CURRENT（當前狀態短摘要）

目標：MVP（最小可行產品）採用「核心引擎穩定、內容外置化、schema 版本化」架構，降低後期衝突。

已完成：
- 初始化資料夾結構與玄策指揮官角色規範
- 建立可擴充 MVP 骨架（domain 分檔、schema、golden tests、build 合併）

下一步（待做）：
1) 選定第一個心理構面（facet）：例如 stress_recovery
2) 寫入該 facet 的 questions / scoring / recommendations / narratives / riskchains
3) 跑 golden tests，確保輸入輸出穩定

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
