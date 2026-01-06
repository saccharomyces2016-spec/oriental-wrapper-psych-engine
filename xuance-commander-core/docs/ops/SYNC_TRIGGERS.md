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
