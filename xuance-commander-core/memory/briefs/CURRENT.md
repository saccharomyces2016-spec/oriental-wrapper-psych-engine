# CURRENT（當前狀態短摘要）

<!-- XUANCE_RESEARCH_LEGACY_SEPARATION_POINTER_BEGIN -->
## 資料層分離（RESEARCH vs LEGACY_FAILED vs CURRENT_DOMAIN）— 指標
- 規則（SSOT）：docs/governance/RESEARCH_LEGACY_SEPARATION_RULE.md
- RESEARCH（Google Notebook 匯集）：docs/domain/research/RESEARCH/
- LEGACY_FAILED（舊失敗版本）：docs/legacy/115_1_3_my-first-app_failed/
- 現行主線產物：docs/domain/ + domain/

補充：
- 使用者口令「記得寫進去」= 立即產出指令包寫入 SSOT，禁止直接寫快照；規則：docs/governance/REMEMBER_MEANS_COMMAND_PACK_RULE.md
- 顧問完整背景提案包：docs/gem/briefs/BRIEF_P0-2_ADVISOR_CONTEXT_SUPERPACK_income_expansion_pressure.zh.md
<!-- XUANCE_RESEARCH_LEGACY_SEPARATION_POINTER_END -->


## 任務重置（2026-01-15）
- 已封閉所有未完成任務，改以單一主線任務承接整合工作。
- 新主線：SURFACE_CORE_ENGINE_INTEGRATION_REBASELINE_001
- 任務包：docs/task_packets/SURFACE_CORE_ENGINE_INTEGRATION_MASTER_TASK_PACKET.md
- 掃描報告：docs/ops/analysis/ENGINE_SURFACE_CORE_INTEGRATION_SCAN_2026-01-15.md
- 執行計劃：docs/task_packets/SURFACE_CORE_ENGINE_INTEGRATION_EXECUTION_PLAN.md
- 執行紀錄：docs/ops/analysis/SURFACE_CORE_ENGINE_INTEGRATION_EXECUTION_LOG_2026-01-15.md


## P0-2｜Facet 設計語境已確認
- 題型與結果統一採用東方玄學體系（五行／陰陽／八卦等）
- 題目、分數、敘事在封板前皆可回調


## P0-2（income_expansion_pressure）決策已鎖定
- R1：採用「歲時農耕・倉廩觀」作為題目與敘事主隱喻
- R4：採用 A/B 風險鏈結構（對外全部轉譯為農耕詞彙，避免隱喻混用）
- R4（用詞校正）：為了讓中/高風險層級一眼可辨，已將四條風險鏈的玄學名改為「氣滯流塞（中）／基石掏空（高）／雙力相衝（中）／逐幻斷航（高）」，並補上 Severity Cue。
- 下一步：產出 questions + scoring -> 交 R2 做 narr/reco -> 風險鏈落盤 -> golden tests
- 證據：docs/gem/runs/DECISION_P0-2_income_expansion_pressure_20260106.md



目標：MVP（最小可行產品）採用「核心引擎穩定、內容外置化、schema 版本化」架構，降低後期衝突。

**注意**：以下舊任務狀態已被「任務重置（2026-01-15）」取代，不再作為主進度依據。

已完成：
- 初始化資料夾結構與玄策指揮官角色規範

## 所有剩餘任務執行計劃

**狀態**：🔄 進行中（任務包 1 已完成，任務包 2-5 等待執行）  
**開始日期**：2026-01-13

**任務目標**：
完成所有剩餘任務，依照難易度和執行對象分類，確保所有待辦事項全部完成。

**當前進度**：
- ✅ 任務包 1：Cursor 直接解決包（已完成）
  - ✅ 修正 Rigidity 預設值（0.5 → 0.0）
  - ✅ 更新 ADR_0005 標準差模式
  - ✅ 更新 CONSTITUTION 文件（Rigidity 預設值）
- ⏳ 任務包 2：Legacy Facet 遷移（9 個 Facet）— 等待執行
- ⏳ 任務包 3：P0-12 階段二-4 規則提取（Legacy 檔案未找到）— 等待執行
- ⏳ 任務包 4：五行「洩」關係決策— 等待 Gemini 裁示
- ⏳ 任務包 5：角色原型參數矩陣決策— 等待 Gemini 裁示

**相關文件**：
- `docs/task_packets/advisor/ALL_REMAINING_TASKS_EXECUTION_PLAN.md` - 執行計劃
- `docs/task_packets/advisor/ALL_REMAINING_TASKS_MASTER_PACKAGE.md` - 主包
- `docs/task_packets/advisor/TASK_PACKAGE_2_LEGACY_FACET_MIGRATION.md` - 任務包 2
- `docs/task_packets/advisor/TASK_PACKAGE_3_P0-12_PHASE2-4_RULES_EXTRACTION.md` - 任務包 3
- `docs/task_packets/advisor/TASK_PACKAGE_4_WUXING_EXHAUSTION_DECISION.md` - 任務包 4
- `docs/task_packets/advisor/TASK_PACKAGE_5_ROLE_ARCHETYPE_DECISION.md` - 任務包 5
- `docs/ops/analysis/ALL_REMAINING_TASKS_COMPREHENSIVE_SCAN.md` - 全案掃描報告

---

## ENGINE_CORE_FINAL_INTEGRATION_EXECUTION（底層引擎最終整合執行）

**狀態**：🔄 進行中（準備階段）  
**開始日期**：2026-01-12

**任務目標**：
基於最終整合任務包，與顧問團隊進行最終整合討論，執行 7 個主要任務，達成「全人類、全年齡、全困擾、全解決策略、全連鎖反應」的終極目標。

**當前進度**：
- ✅ 任務包已建立並打包完成（`ENGINE_CORE_FINAL_INTEGRATION_PACKAGE_20260112_212851.zip`）
- ✅ 8 個核心問題已整理完成（最高優先級 3 個）
- ✅ `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` 審核完成並整合
- ✅ **任務包 1 已完成**：Rigidity 預設值修正、ADR_0005 更新、CONSTITUTION 更新
- ⏳ 等待顧問團隊回饋（追問包：任務包 4 和 5）
- ⏳ 準備開始執行 7 個主要任務

**核心問題**（最高優先級 3 個）：
1. ⭐⭐⭐ 八大領域覆蓋度評估與題庫設計
2. ⭐⭐⭐ 解決方案與連鎖反應資料庫完整性
3. ⭐⭐⭐ UI 互動設計的四個回合明確化

**關聯審核**：
- ✅ `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md` 審核完成
- ✅ `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` 審核完成並整合（V2/V3/V4）
- ✅ 審核報告：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_AUDIT.md`
- ✅ 追問包：`docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_QUESTIONS.md`（4 個關鍵問題）
- ✅ **V4 實作已整合**：`engine/score_facet.py`、`engine/cascade_calculator.py`、`engine/narrative_guard.py`、`tests/test_v3_scoring.py`、`schemas/domain_manifest.schema.json`、`schemas/compiled_facet.schema.json`、`domain/domains/bagua.domain_map.v1.0.json`、`domain/cascade/cascade_overrides.v1.0.json`
- ✅ **任務包 1 已完成**：Rigidity 預設值統一為 0.0、ADR_0005 標準差模式更新

**相關文件**：
- `docs/task_packets/advisor/ENGINE_CORE_FINAL_INTEGRATION_TASK_PACKET.md`
- `docs/ops/analysis/ENGINE_CORE_COMPREHENSIVE_INTEGRATION_ANALYSIS.md`
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_INTEGRATION_SUMMARY.md`
- `docs/ops/TASK_RECORDS_SUMMARY.md`
- 建立可擴充 MVP 骨架（domain 分檔、schema、golden tests、build 合併）

下一步（主線）：
1) P0-2：為 income_expansion_pressure 建立 questions/scoring/recommendations/narratives/riskchains
2) 走 Research → Brief → Advisor → Domain gate
3) 補齊 golden tests（固定輸入輸出）

治理橋接任務（已批准）：Governance Inventory Sprint
---
【治理橋接任務｜Governance Slimming Sprint｜Apply 完成｜2026-01-07】
已完成：
- 合併規則：COMPLETION_RECORD_RULE.md + REPAIR_RECORDING_RULE.md → MANDATORY_MILESTONE_RECORDING_RULE.md（並移除原檔）
- FULL_ONLY 標記：24 份治理文件已標記為 [FULL_ONLY]
- MIN 補規則：Cursor Model Selection（Gemini 分析 / Claude 實作 / GPT 裁決）

下一步（必做收尾）：
1) git commit + push（把 Apply 變更入庫）
2) 重建 MASTER_MIN / MASTER（auto）
3) 更新 LATEST_VERIFICATION_PACK（若有生成新 pack）

封板後摘要化規則：
- 本段落在任務完成後，需縮成 3~6 行摘要 + 指標（避免 CURRENT 膨脹與上下文漂移）

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

補充規則（已啟用）：
- MIN/FULL = 快照集合，不是 SSOT 本體
- Cursor 執行前必提供 CONTEXT_BRIEF；執行後必回報 what/where/result/next + evidence pointers
- 來源：docs/governance/CURSOR_USAGE_RULE.md（Cursor Context Brief Protocol）

## P0-2｜Facet Meta-Map Sprint（ACTIVE）
- Goal: Define Facet qualification rules before listing facets
- Status: Meta-Map drafting started
- Tools: Cursor + Gemini Pro (research only)
- Governance: Structure decisions reserved to GPT
<!-- XUANCE_P0_2_META_STAGE1_BEGIN -->
【P0-2｜Facet Meta Research｜Stage 1 完成｜Failure Distillation + Evidence Coverage Map】
產物（SSOT 指標｜給顧問/後續設計必讀）：
- docs/domain/research/EVIDENCE_COVERAGE_MAP.md
- docs/domain/research/FAILURE_PATTERNS.md
- docs/domain/research/SALVAGEABLE_ELEMENTS.md
- docs/domain/research/RECURRING_ANTI_PATTERNS.md

結論（白話）：
- 我們已把「會搞死系統的設計」整理成負面案例庫（避免重犯）
- 我們也把「可以回收的關係模型/敘事原型」整理成零件庫（可用但需裁決）
- 外部實證（市場/學術/用戶反饋）仍屬缺口：只允許以顧問研究補齊，使用者不必手動補資料

接下來（Stage 2｜外部實證補缺口｜只做研究，不做結構決策）：
- 由 Cursor + Gemini Pro 做 sources scan（市場/學術/評測），輸出比較表 + 引用清單
- 指揮官（GPT）負責裁決：採納哪些原型/禁用哪些反模式 → 才能進入 Facet 題目設計（R1/R4）
<!-- XUANCE_P0_2_META_STAGE1_END -->
<!-- XUANCE_P0_2_META_STAGE2_KICKOFF -->
【P0-2｜Facet Meta Research｜Stage 2 啟動｜External Evidence】
Executor: Cursor + Gemini Pro（僅研究）
Scope:
- 市場趨勢 / 學術量表設計 / 成功產品互動模式
Constraints:
- 不新增 Facet 結構
- 不改 CHARTER / ROADMAP / governance
Deliverables:
- 比較表（8–12）
- 可引用來源清單（link + 1 句）
- 失敗風險對照（映射 FAILURE/ANTI-PATTERNS）
Decision: GPT only
Next:
- 研究完成後提交裁決（切 FULL）

---
## 【主線啟動｜P0-2 Facet 設計階段｜進行中】

狀態切換：
- 已從「治理/準備階段」正式進入 ROADMAP Phase 0 / P0-2
- 當前任務：income_expansion_pressure 的題目／評分／敘事／風險鏈設計（顧問制）

強制引用來源（不可省略）：
1) 失敗案例（Legacy Failed）
   - 路徑：docs/legacy/115_1_3_my-first-app_failed/
   - 用途：避免重犯已知的版本漂移、規則卡死、敘事失效問題
2) 研究文獻（Research / Google Notebook 匯整）
   - 路徑：docs/domain/research/
   - 用途：提供可推導的結構依據（僅內部使用，不外露）

執行規則：
- 題目與風險鏈設計一律走 Research → Brief → Advisor → Commander → Domain Gate
- 未引用 legacy 或 research 的顧問輸出，一律退回重做

下一個檢查點：
- 啟動 R1（題目設計顧問）與 R4（風險鏈顧問）
- 產出 docs/gem/runs/ 下的顧問建議稿
- 由指揮官裁決後，才允許落盤 domain/


---
## 【P0-2｜R1+R4 已啟動】
- 啟動方式：A（題目＋風險鏈）
- 時間：2026-01-07T18:02:55+0800
- 強制引用：
  - Legacy（失敗版）：xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed
  - Research（Google Notebook 匯整）：xuance-commander-core/docs/domain/research
- 限制：
  - 顧問僅產出研究/建議，不得決定結構或落盤 domain/
  - 必須逐條引用來源（legacy / research），未引用一律退回
- 輸出位置：docs/gem/runs/

---

### P0-2 | R4 Structural Assets Integrated

- R4 risk-chain structures accepted at engine level.
- Stored as SSOT under docs/domain/advisory/R4/.
- Exclusions confirmed and locked.
- Awaiting metaphysical + plain-language translation pass.
- No UI or scoring dependency introduced.

Next Dependency:
- R4 Translation Addendum
- R1 Question Mapping

---
## 【決策鎖定｜ADR-0006】Facet Question Design Scope Lock (P0-2)
- **範圍鎖定**：P0-2 期間禁止引入創新 UI 交互（八卦盤、符號多選）。
- **優先級**：結構正確性 > UI 表現力。
- **未來保留**：符號化多代幣介面保留至 P0-2 之後。
- **研究規範**：R1 不得直接消費原始研究語料，必須使用經指揮官批准的萃取物。
- **文件**：docs/adr/ADR_0006_question_modality_scope_lock.md

<!-- DESIGN_NOTES_DEFERRED_BEGIN -->

### 題目形式（Question Modality）— 重要但延後封板（避免過早鎖死）
背景：為服務 NORTH_STAR Canon（見 FULL/NORTH_STAR.md），本階段目標是將「全世界所有人的狀態」收斂到可維護、可解釋、可擴充的結構，因此 **題目形式/互動形式** 對「訊號品質」與「可收斂性」高度關鍵。

現狀（已知約束）：
- 依 **ADR-0006**：P0-2 期間禁止引入創新 UI 交互（例如八卦盤、多代幣符號多選）。
- 因此本階段只做：**結構正確性 + 可穩定分 band 的題目/選項**（UI 先占位，不做創新落地）。

未來必討論（強制提醒點，不等於制度/不鎖死）：
- 在進入 **P0-4 最小 UI 串接** 前，必須開一個「Question Modality 設計會議」：
  - 目的：定義「幾階段問法」與每階段可用題型（單選/複選/光譜/情境/卡牌/連連看/符號盤等）的適用條件。
  - 產出：只允許是「候選方案 + 取捨理由 + 驗收方式」，不得直接封成硬制度；需要封板時走 ADR。

候選方向（記錄想法，未裁決）：
- **八卦盤（符號/詞彙多選）** 作為「高維掃描」：讓使用者用多個獨立詞彙拼出狀態分佈，可用加權/去相關做收斂。
- **單選/情境題** 作為「強制收斂」：用少量關鍵題把 band 拉開，降低漂移。
- **兩段式順序**（未定，後續再決）：
  - 方案 A：先八卦盤多選（掃描）→ 再單選（收斂/確認）
  - 方案 B：先單選（定位類別）→ 再八卦盤（細化強弱/細節）

陰陽（Yin/Yang）納入討論（記錄想法，未裁決）：
- 若主打五行，可考慮把「陰陽兩極」作為 **強弱/方向性** 的輔助軸（例如同一五行在陰/陽呈現不同表徵）。
- 後續諮詢東方命理顧問時，必須把「陰陽是否納入、如何映射到題目形式」列為討論題。

文本安全原則（避免上下文飄移）：
- 本段為 **提醒與候選清單**，不得被解讀為已封板制度。
- 未來若採用任何新題型/新交互，必須在 ROADMAP 記錄版本調整，必要時用 ADR 封板。

作風（本專案的工作習慣，避免草率）：
- 可慢，不可草率：每一步都要有「可驗收」與「可回滾」的最小證據。
- 題目形式與互動一律以「可維護 + 可重跑 + 可審計」為先，不以炫技為先。

## Design Notes｜Deferred Improvements（未封板｜非制度｜僅記錄）

> 狀態說明：
> - 本段為「高價值但尚未進入制度化／封板」之設計判斷與建議
> - 不得視為規則、不可作為治理依據
> - 未來僅在「明確回合指定修正」時才可升級

### 本回合共識（已確認）
1. **問題一與問題二屬於「可修正但非立即阻斷主線」**
   - 同意延後修正
   - 不得因方便而提前制度化
   - 不可寫死為治理規則，避免上下文漂移誤判為 Canon

2. **文本安全原則**
   - CURRENT 中僅保留「判斷紀錄」
   - 不引入 MUST / SHALL / HARD RULE 等語言
   - 不新增觸發條件、不建立隱性依賴

### 已觀察到的優點（保留）
- 目前 R4 結構具有「可回收性高、可轉譯性佳」的優點
- 有助於後續從內部風險鏈轉譯為外層玄學語境
- 與既有 Research / Legacy Failure 的避免條件不衝突

### 明確待改善項（暫不處理）
- 資料覆蓋完整性仍需二次盤點（含 Research 大檔與 Failed 題型）
- 顧問是否「實際消費全部來源」仍需驗證機制（未建）
- 此類改善需搭配工具或稽核腳本，暫不人工補救

### 禁止事項（重要）
- ❌ 不得將本段內容引用為制度
- ❌ 不得作為顧問輸入的硬約束
- ❌ 不得在未指揮官明確指示下升級為 ADR / Governance

- 【UI 設計提醒｜未封板｜非制度】後續只要進入「UI/題型呈現」設計討論（不論是哪個 facet），必須把「八卦盤／符號化多代幣複選」作為候選題型之一納入比較與取捨（至少討論一次），避免上下文漂移導致遺漏。
  - 這是提醒規則（Design Note），不是制度；不得因此鎖死題型，也不得在 P0-2 期間引入創新 UI（遵守 ADR-0006）。

- 【陰陽軸概念｜未封板｜非制度】除五行外，保留把「陰陽兩極/雙向向度」作為"感受強弱/趨勢方向"的輔助軸之可能性（例如：同一五行狀態下，以陰陽標示偏盛/偏衰、偏躁/偏滯等）。
  - 待後續諮詢東方命理/五行顧問時，必須把此概念列為討論題：是否適合、如何不破壞主隱喻、如何映射到 scoring/敘事而不暴露內核。
  - 現階段只記錄為候選設計方向，不寫死為制度/必做項。

- 【待追問阿萬（R1 顧問）｜問題清單】若需要回合追問，請直接用以下問題：
  - Q1：在不違反「純玄學體驗」與 ADR-0006（P0-2 禁止創新 UI）前提下，你的 R1 藍圖是否能被改寫成「多代幣複選（八卦盤/字詞盤）」的題型？若可以，請給一個"同隱喻、同分段"的替代題型草案（只要 1 題示例）。
  - Q2：你的三段式（Climate/Granary/New Field）能否加入"陰陽軸"的輔助辨識（例如同一段內加上偏盛/偏衰）而不讓使用者覺得在做量表？若可以，請說明最小改動策略（不改結構，只加辨識）。
  - Q3：你在本次輸出中，是否有使用到 legacy/router 與 research 指標（不是引用原文，而是遵守 Research→Brief→Advisor Gate 的萃取物）？若沒有，請列出你缺的檔案名稱/路徑指標。

<!-- DESIGN_NOTES_DEFERRED_END -->

<!-- DESIGN_STRATEGY_NOTES_BEGIN -->
P0-2 Design Notes Update:
- R1 question strategy insights recorded in QUESTION_STRATEGY_NOTES.md
- Multi-stage questioning, Yin–Yang spectrum, and symbol-first strategy acknowledged
- All above marked as NON-BINDING / DRAFT
- Advisor iteration protocol draft created to prevent context drift
<!-- DESIGN_STRATEGY_NOTES_END -->


<!-- GLOBAL_OUTPUT_CONTRACT_POINTER_BEGIN -->
Design Strategy Update:
- Added Global Goal & Output Contract (DRAFT) to QUESTION_STRATEGY_NOTES.md
- Added Yin–Yang axis refinement requirement (separate attribution/coping/severity axes)
- Added Advisor follow-up checklist to ADVISOR_ITERATION_PROTOCOL.md
<!-- GLOBAL_OUTPUT_CONTRACT_POINTER_END -->


<!-- R1_REFINED_SPEC_POINTER_BEGIN -->
Design Strategy Update:
- Recorded R1 Refined Specification Summary (P0-2) in QUESTION_STRATEGY_NOTES.md (DRAFT)
- Added Minimal Implementation Asks addendum to ADVISOR_ITERATION_PROTOCOL.md (DRAFT)
<!-- R1_REFINED_SPEC_POINTER_END -->


<!-- R1_ENGINEERING_HANDOFF_POINTER_BEGIN -->
Design Strategy Update:
- Recorded R1 Engineering Handoff Spec (P0-2) in QUESTION_STRATEGY_NOTES.md (DRAFT)
- Noted two required clarifications (score range/normalization; gate variable definitions)
<!-- R1_ENGINEERING_HANDOFF_POINTER_END -->


<!-- R1_HARD_DEFINITIONS_POINTER_BEGIN -->
Design Strategy Update:
- Recorded R1 Hard Definitions (P0-2): native 0–10 integer severity, explicit gate variable semantics, token severity numeric mapping.
- Applied required patch: Q1(C 死水) severity set to 0 to make 0–10 range reachable; noted coping may reach -5 hence clamp is required.
<!-- R1_HARD_DEFINITIONS_POINTER_END -->


<!-- P0_2_PHASE_CLOSURE_BEGIN -->
P0-2 Question Design:
- Status: Phase Closed (Implementation-Ready)
- Output: 5-question symbol-first assessment with integer scoring & gates
- Notes: All UI, follow-up probes, and intervention layers explicitly deferred
- Reference: docs/domain/design/P0_2_PHASE_CLOSURE_SUMMARY.md
<!-- P0_2_PHASE_CLOSURE_END -->


<!-- COLLABORATION_MODEL_BEGIN -->
Collaboration Model — Current Assessment:

- Role coverage is **sufficient** for current and foreseeable scope.
- No new advisory roles are required at this stage.
- Priority is **institutional clarity**, not role expansion.

Operating Style (Institutionalized):
- Decisions are based on **textual records**, not conversational memory.
- All insights are recorded first, refined later.
- Early over-inclusion is preferred; pruning occurs only after convergence.

Design Philosophy:
- Aim: extreme psychological resolution + esoteric surface.
- Engine may be scientific; output must never feel scientific.
- Accuracy > explanation; resonance > transparency.

Status: ACTIVE PRACTICE / NON-BINDING.
<!-- COLLABORATION_MODEL_END -->


<!-- P0-2_QUESTION_DESIGN_CLOSED -->
P0-2 Phase Status Update:
- Question Design (R1) has reached **Engineering Handoff completeness**.
- Status: CLOSED for MVP scope.
- Note: Future refinements allowed via iteration protocol; core logic is stable.
<!-- /P0-2_QUESTION_DESIGN_CLOSED -->


<!-- P0-2_OUTPUT_CONTRACT_BEGIN -->
## Mainline Task: P0-2 Output Contract (ACTIVE)

### Objective
Define a **system-level Output Contract** that specifies:
- What kinds of results the engine is allowed to output
- The semantic granularity of those outputs
- Explicit boundaries between:
  - Internal psychological inference
  - External esoteric narrative presentation
  - Forbidden interpretations (diagnosis, concrete life decisions)

### Why this task exists
- Prevent UI-first or content-first drift
- Enable future domain extensions (e.g., family, in-law dynamics) without rewriting core logic
- Ensure all outputs remain aligned with risk & ethics constraints

### In Scope
- Result Archetype definitions (types, not content)
- Allowed vs forbidden inference rules
- Output tone & abstraction level
- Extension hook rules (when follow-up probes are allowed)

### Out of Scope (for this phase)
- UI / visual design
- New question content
- Domain-specific advice (e.g.,婆媳、職場)

### Status
- State: ACTIVE
- Snapshot Visibility: MIN required
- Binding Level: DRAFT (modifiable by future evidence & iteration)

<!-- P0-2_OUTPUT_CONTRACT_END -->


<!-- XUANCE_P0_2_OUTPUT_CONTRACT_ROLE_ACTIVATION_BEGIN -->
## P0-2｜Output Contract｜Advisor Role Activation (ACTIVE) (DRAFT)

Activated roles (for this task only):
- R1（題目設計顧問）：定義「引擎可推斷的真邊界」與不可推斷清單；輸出為 Output Contract 的 truth boundary。
- R2（玄學敘事顧問）：把允許的推斷翻譯成 user-facing 玄學敘事；提供 archetypes + 禁語 + 抽象層級規則。
- R4（風險鏈/倫理防火牆）：對 Output Contract 做風險壓測；定義 hard bans + fallback mode（安全輸出模板）。

Advisor input artifacts (single-source for this task):
- COMMON: xuance-commander-core/docs/gem/briefs/BRIEF_P0-2_output_contract_COMMON.md
- R1:     xuance-commander-core/docs/gem/briefs/BRIEF_P0-2_output_contract_R1.md
- R2:     xuance-commander-core/docs/gem/briefs/BRIEF_P0-2_output_contract_R2.md
- R4:     xuance-commander-core/docs/gem/briefs/BRIEF_P0-2_output_contract_R4.md

Notes:
- All advisor outputs are DRAFT / NON-BINDING until Commander acceptance is written into SSOT.
- Scope: Output archetypes + allowed/forbidden inference rules + boundary translation; no UI, no new questions.
<!-- XUANCE_P0_2_OUTPUT_CONTRACT_ROLE_ACTIVATION_END -->


<!-- P0_2_OUTPUT_CONTRACT_STAGE_POINTER_BEGIN -->
Stage Update:
- P0-2 Output Contract 階段性結論已記錄
- 已鎖定：引擎只判斷「狀態」，不判斷「人生」
- 已完成：禁止清單、允許層級、責任邊界
Next Action:
- 補強「禁止 → 允許替代出口」規則（R4）
<!-- P0_2_OUTPUT_CONTRACT_STAGE_POINTER_END -->


<!-- P0_2_OUTPUT_CONTRACT_STAGE_CLOSED_POINTER -->
Stage Update:
- P0-2 Output Contract 已完成階段性收尾（DRAFT）
- 已明確：
  - 引擎只判斷狀態，不判斷人生
  - 禁止項 + 強制替代出口（Safe Expression Space）
- 本階段完成後，不再新增限制，只進行後續轉譯與銳化
- Next Phase（待開啟）：P0-3 Narrative Sharpness / Esoteric Precision
<!-- P0_2_OUTPUT_CONTRACT_STAGE_CLOSED_POINTER -->


<!-- P0-3_BEGIN -->
Mainline Task Opened: P0-3 Narrative Sharpness / Esoteric Precision
- Focus: narrative rules & precision (NOT UI, NOT new prohibitions)
- Deliverables: Metrics, Skeleton, Lexicon, Diversity (v1)
- Binding: DRAFT (iterable)
<!-- P0-3_END -->

P0-3 Roles Activated:
- R1: Narrative Metrics Architect
- R2: Esoteric Language Refiner
- R4: Safety Consistency Auditor
Briefs: docs/gem/briefs/BRIEF_P0-3_*.md

<!-- ANTI_DRIFT_WORKFLOW_POINTER_BEGIN -->
Process Update:
- Adopted Anti-Drift Collaboration Workflow.
- Rule: chat is for decisions; SSOT is the authority.
- Practice: accept-first (DRAFT), debate-later, phase-separated.
- Status: ACTIVE / NON-BINDING (subject to refinement).
<!-- ANTI_DRIFT_WORKFLOW_POINTER_END -->
