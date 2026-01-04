# PROJECT MEMORY（保持精簡：指向式記憶）

注意：避免單一超大檔。此檔只放「短摘要 + 指向」。

請以 memory/index/INDEX.md 作為總入口。
當前狀態摘要見：memory/briefs/CURRENT.md
變更紀錄見：memory/changes/CHANGELOG.md

## 2026-01-04 16:26 - MASTER 單檔同步快照（即時對齊／狀態恢復）
- 目的：讓 AI 每次以同一份「可貼上」快照對齊現況，避免對話上下文漂移與失憶。
- 作法：生成 MASTER_SYNC_PACKET.md（只讀快照），SSOT 維持原始檔（charter/roadmap/governance/adr/...）。
- 操作：新任務與重要討論前，優先貼 MASTER；若缺資訊再補 CHAT_PACKET。
