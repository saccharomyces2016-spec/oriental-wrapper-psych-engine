# Task Lifecycle（任務執行與驗證流程）

本專案所有任務，必須遵循以下流程，否則視為未執行：

## 1. 任務啟動（Before）
- 必須存在最新的 `COMMAND_BRIEF.md`
- 任務目標必須能對應到：`CHARTER` / `ROADMAP` / `CURRENT` / `ADR`
- 未寫入文本的任務，視為不存在

## 2. 任務執行（During）
- 所有終端機指令由自動同步機制記錄
- 每一次指令執行結果，必須寫入：`memory/briefs/LAST_COMMAND_STATUS.md`

## 3. 任務驗證（After）
- 以 `LAST_COMMAND_STATUS` 作為唯一執行證據
- 若無對應成功紀錄，任務視為未完成

## 4. 狀態對齊（Sync）
- 執行 `tools/build_master_sync_packet.sh`
- 更新 `MASTER_SYNC_PACKET.md` 作為對話快照
- MASTER 為只讀，不可手改

## 核心原則
- 有紀錄才算做過
- 有成功狀態才算完成
- 有寫入文本才算存在
