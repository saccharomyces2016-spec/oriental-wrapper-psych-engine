[FULL_ONLY]

# MASTER Sync Protocol（單檔同步與永久記憶協議）

## 定位
- MASTER_SYNC_PACKET.md 是「只讀同步快照」
- 不取代任何原始檔案（SSOT）
- 用於 AI / 指揮官快速對齊專案現況

## 真相來源（SSOT）
- charter/CHARTER.md
- roadmap/ROADMAP.md
- memory/briefs/CURRENT.md
- memory/changes/CHANGELOG.md
- docs/governance/*
- docs/adr/*

## 使用規則（硬性）
1) MASTER 不可手動編輯，只能由同步工具生成
2) 若 MASTER 與原檔衝突：
   - 以原檔為準
   - 必須重新生成 MASTER
3) 任何新任務／重要決策前，若已有 MASTER，應優先提供 MASTER

## 目的
- 防止對話上下文污染
- 防止 AI 依賴記憶或推測
- 確保長期合作下的狀態一致性
