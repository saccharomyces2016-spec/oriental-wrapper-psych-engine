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
