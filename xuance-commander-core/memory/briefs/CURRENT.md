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
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: checkpoint TS/locale fix probe
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: a3b273ba9e61344807874219225361310ee7596e

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: cleanup mojibake evidence (CURRENT/CHANGELOG) verified
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: b2fd185984ea15b73d1e8a01515d918080f5a48a

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: sync system stable (evidence clean)
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 54982618a5f6dc8fa2dbc432845adc0d29199346

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
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: sync system stable (sealed in text)
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 6d85ad419578cbdc9d3e9f803c2e80a1b9ef1f31

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: GEM advisory roles (R1/R4) defined and sealed
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: ac3e4abeccd963336f00f2a1da362a92ba49a7c2

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: GEM roles sealed + evidence clean + LAST_COMMAND_STATUS verified
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 6c6ab9211620f97e6f2e6753755c3e20c9db14ad

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: sync hook stable (command capture verified) + evidence updated
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 7ec63de4f11b3128ac8da5178205fe2e1acc4d63

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: sync hook stable - evidence sealed
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 49a7a95a543720fb995539a080b915ea17779d5a

---
【里程碑備份｜��

已完成：
- ✅ 雲端備份（commit + push）完成
  - message: MILESTONE: sync hook stable - evidence sealed (final)
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - head: 6ec5eb7f1fef27450b1acc3614068d548ce7786c
