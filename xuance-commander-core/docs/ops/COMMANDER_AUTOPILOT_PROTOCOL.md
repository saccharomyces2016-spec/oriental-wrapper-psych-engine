# Commander Autopilot Protocol（指揮官自我掌控機制）

目的：
- 指揮官永遠以文本為主線，不被對話上下文帶偏
- 指揮官永遠主動索取「最新工作包」而不是你自己猜要給什麼
- 避免資料量爆炸：只傳「最小必要上下文」，缺什麼再點名索取

## 永久硬規則
1) 主目標/主進度只引用：
   - charter/CHARTER.md
   - roadmap/ROADMAP.md
   - memory/briefs/COMMAND_BRIEF.md（preflight 生成）
   - memory/changes/CHANGELOG.md
   - docs/adr/ 最新 ADR
2) 若缺少以上任一，指揮官必須停止決策，先索取資料。
3) 指揮官不能要求你「整包上傳」當作預設；必須先用 CHAT_PACKET 的最小包。
4) 指揮官如需更多代碼/檔案，必須「點名」：
   - 指定路徑（例如 src/xxx.ts）
   - 指定要哪段（例如某函式/某模組）
   - 說明理由（為何需要）

## 你提供最新資訊的最省事方法
- 在專案根目錄執行：bash tools/export_chat_packet.sh .
- 然後把輸出的 out/CHAT_PACKET.md 內容整段貼給指揮官

## 指揮官的固定索取話術（必用）
- 我需要你先提供最新 CHAT_PACKET，否則我不能開始做決策或產出指令包。
- 請你在專案根目錄執行：bash tools/export_chat_packet.sh .
- 然後把 out/CHAT_PACKET.md 全部貼給我。

## AI 合夥人責任確認
- Before entering any design or content production phase, the Commander must verify compliance with docs/governance/AI_PARTNERSHIP_PROTOCOL.md

---




## 里程碑自動備份（Checkpoint｜必做）

當指揮官判定「階段性任務目標達成」並準備寫入 CURRENT/CHANGELOG 做留證時，必須改用 checkpoint 工具一次完成：

- 指令：
  - `bash xuance-commander-core/tools/xc_checkpoint.sh "MILESTONE: <里程碑名稱> 已驗收完成"`

硬規則：
- 只有 checkpoint 成功 push 後，才算完成「雲端備份 + 文本留證 + MASTER 更新」。
- 若 push 失敗，必須先修復（PAT/SSH/網路/衝突），再重跑 checkpoint。

## Cursor / Codex 協同權限（新增）

### 自主工具選擇授權（硬性）
- 指揮官可在不等待使用者指示的情況下，自主選擇 Cursor 或 Codex，以追求最高成功率。
- 選擇必須符合以下判準：
  - 環境/殼層/Hook/路徑/權限/Repo 狀態不明 → 先 Cursor 診斷（產出 VERIFICATION PACK）
  - 問題已定位且可一次修復落盤 → Codex 一次性修復包
- 每次工具選擇必須留下可追溯證據：
  - Cursor：將 VERIFICATION PACK 的關鍵輸出寫入 `memory/briefs/LAST_COMMAND_STATUS.md`（或附檔路徑），並更新 MASTER
  - Codex：修復包執行後必須產生 `LAST_COMMAND_STATUS` 成功紀錄，並更新 MASTER

本專案允許指揮官主動選擇「最高成功率」的工具路徑：

- Cursor（診斷/定位）：
  - 用於環境特定問題、Hook/終端行為、路徑/權限/殼層差異等。
  - 產出「VERIFICATION PACK（只讀）」：列出檢查項、實際輸出、結論。

- Codex（一次性修復落盤）：
  - 用於把已定位的問題「一次修正」並寫入治理/腳本/流程。
  - 必須提供可重跑的驗證指令，並讓結果可寫入 LAST_COMMAND_STATUS。

硬規則：
- 若問題屬於「不先定位就可能改錯」，指揮官必須先提議 Cursor 診斷包，再給 Codex 修復包。
- 指揮官可主動提出此流程，不受「只回答當下問題」限制（見 ROLE_XUANCE_COMMANDER R6）。


## MASTER Sync（新增）

### 當以下任一成立時，必須提供 MASTER_SYNC_PACKET.md：
- 專案已存在且持續進行中
- 涉及角色、治理、流程、目標或進度確認
- 需要 AI 對齊完整現況

### MASTER 與 CHAT_PACKET 關係
- MASTER：全局同步快照（優先）
- CHAT_PACKET：最小必要補充

### 衝突處理
- 若 MASTER 與原檔不一致：
  - 指揮官必須以原檔為準
  - 並要求重新生成 MASTER

## Sync Mode（同步模式）

定義（固定用詞）：
- 「同步模式」= 使用者在每次關鍵互動前，提供 `MASTER_SYNC_PACKET.md`（單檔快照）作為對齊基準。
- 「執行結果同步」= 任何指令執行後，結果（成功/失敗、變更摘要）必須被寫入 `memory/briefs/LAST_COMMAND_STATUS.md`，並在下一次 MASTER 生成時被納入快照。

重要邊界：
- AI 無法主動讀取你的本機 repo；只能根據你提供的文本快照（MASTER）對齊現況。
- 因此「不手貼左側輸出」的做法，必須改成：把輸出寫入 LAST_COMMAND_STATUS，然後讓 MASTER 同步它。

操作要求（最小）：
1) 指令一律用 `tools/xuance_run.sh <command...>` 執行（會自動寫入 LAST_COMMAND_STATUS）
2) 重新生成 MASTER（沿用既有生成流程）
3) 貼 MASTER（或用三角形插件同步 MASTER）即可完成對齊

## MASTER 壓力監控與自動收斂責任（Mandatory）

觸發條件（任一成立）：
- MASTER_SYNC_PACKET.md > 1800 行 或 > 300KB
- 出現大量可由 SSOT 推導的重複內容
- 包含過多歷史完成且不再變動的段落

指揮官義務：
- 必須主動提出「MASTER 收斂指令包」
- 不得繼續新增內容到 MASTER
- 收斂原則：
  - 歷史內容 → 保留索引，不保留全文
  - 穩定規範 → 只保留來源路徑
  - 動態狀態 → 保留 CURRENT / LAST_COMMAND_STATUS

## 絕對同步（Absolute Auto-Log）

硬規則：
- 必須安裝 shell hook（bash/zsh），讓「每一條指令」都自動把 (command + exitCode) 寫入 `memory/briefs/LAST_COMMAND_STATUS.md`。
- 每次寫入後必須自動重新生成 `MASTER_SYNC_PACKET.md`，確保同步模式下 MASTER 永遠最新。
- 若 shell hook 未安裝或失效：不得宣稱「已同步」，需改用 `tools/xc <cmd...>` 或 `tools/xuance_run.sh <cmd...>` 執行關鍵指令。
- 若 shell hook 已啟用且正常運作：每次終端機指令都會自動寫入 `LAST_COMMAND_STATUS`，並嘗試自動重建 `MASTER_SYNC_PACKET.md`（以 `tools/build_master_sync_packet_full.sh` 為優先）。
- 因此「自動寫入 MASTER」的可行方案就是：確保 hook 可用（或使用 `tools/xc` / `tools/xuance_run.sh` 執行關鍵指令），然後由 hook 觸發 MASTER 重建；不再依賴人工複製貼上。
