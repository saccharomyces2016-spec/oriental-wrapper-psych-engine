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

## FULL 索取觸發條件（對話層｜指揮官會點名你要貼 FULL）

預設：日常只貼 `MASTER_MIN_SYNC_PACKET.md`（MIN）。

只要符合下列任一條件，指揮官必須明確點名：
> 「請提供 FULL：MASTER_SYNC_PACKET.md，原因是觸發了 <條件>」

### 觸發條件（任一成立即索取 FULL）
1) 變更類型涉及結構/規則主權（高風險）
- schema / domain / governance / charter / roadmap / adr 任何一項有改動或正在討論改動。

2) 顧問/外部角色出現 STOP / MISSING / INCOMPLETE
- 任何顧問回報缺件、衝突、或要求補參照。

3) 需要跨檔案做「裁決」或「追溯」
- 例如：版本漂移、規則卡死、legacy 對照裁決、或需要確認某規範的原文細節。

4) 工程診斷需要更完整證據
- hook/殼層/路徑/分支/遠端同步/自動生成工具疑似異常，且 MIN 內的證據不足以判定。

5) 里程碑封板/Checkpoint 前後的對齊
- 你宣告「已驗收完成」要封板，或剛封板完成需要核對證據鏈。

6) 指揮官發現 MIN 與現況不一致（Evidence Drift）
- 例如：`LAST_COMMAND_STATUS`/`REPO_STATUS`/`LATEST_VERIFICATION_PACK` 顯示的時間戳或 head 與你描述不一致。

---

## MIN 必含工程回報（常用證據）

硬規則：
- `MASTER_MIN_SYNC_PACKET.md`（MIN）必須內嵌（或至少明確指向並包含最新內容摘要）以下 3 份證據：
  1) `memory/briefs/LAST_COMMAND_STATUS.md`
  2) `memory/briefs/REPO_STATUS.md`
  3) `memory/briefs/LATEST_VERIFICATION_PACK.md`

重要澄清：
- 指揮官看得到的「指令執行回報」，只會是 **MIN/FULL 快照生成當下** 的最新狀態。
- 因此：跑完指令後，必須確保「證據已寫入」且「MIN 已重建」。

### 驗收（最短可檢查）
1) 跑一條無害指令：`echo __probe__`
2) 檢查 `memory/briefs/LAST_COMMAND_STATUS.md`：`updatedAt/command/exitCode` 是否更新。
3) 檢查 `memory/briefs/MASTER_MIN_SYNC_PACKET.md`：`generatedAt` 是否更新，且內文的 LAST_COMMAND_STATUS 區塊是否同步到最新。

### 若你發現「跑完指令但 MIN 沒更新」
- 一律視為同步鏈不完整：不得宣稱已同步。
- 先用你們既定工具重建同步（例如 `build_master_sync_packet_auto.sh` 或專案內的 MIN 重建腳本）。
- 若仍無法自動更新：生成 `VERIFICATION_PACK` 作為當輪證據，並在 MIN/FULL 中提供路徑指標。

## FULL 觸發提醒（條件式）與 MIN 證據鏈規則

FULL 觸發條件（任一成立 → 改用 FULL / 或附帶 VERIFICATION_PACK）：
- 顧問回報 MISSING / INCOMPLETE / STOP
- 需要做跨資料夾判斷（路徑是否存在、是否已有某檔、是否已納入 legacy/router/brief）
- 要做結構性變更（schema/domain/governance/charter/roadmap/adr）
- 需要追溯「為什麼會變成這樣」（需看較完整變更脈絡）

MIN 是否需要包含所有變動？（答案：不用，但必須可追溯）
- MIN 目標是「足夠推進主線」+「帶最新證據」；不是存放全部歷史。
- 制度/流程/角色/策略的變更：必須落盤到 SSOT（CURRENT/CHANGELOG/治理文件/ADR），必要時用 FULL 或 Role Packets 提供原文。

MIN 證據鏈必備三件套（缺一視為證據不足）：
- `LAST_COMMAND_STATUS`（最新指令/exitCode/success）
- `REPO_STATUS`（branch/head/remote）
- `LATEST_VERIFICATION_PACK`（若本輪需要工程證據）

處理規則（硬性）：
- 若你發現 MIN 內沒有最新指令（例如 command 仍是 (unknown)、updatedAt 沒變）：
  1) 不要靠「我記得剛剛有跑」推進
  2) 先重建快照（MIN/FULL）或生成 VERIFICATION_PACK，再進入下一步
