# Required Text Set (Hard Stop)

Purpose:
- 定義開始工作前的最低文本集合，避免憑空推斷。

Mandatory files:
- memory/briefs/COMMAND_BRIEF.md
- memory/changes/CHANGELOG.md
- 最新的 docs/adr/ADR_*.md（若存在）
- Active Focus 定義（若已啟用 Focus Lock）

Rules:
- 缺任一檔案 -> 必須停止。
- 唯一允許的回應：列出缺的檔案，請使用者提供。

Prohibited behavior:
- 猜測上下文
- 在資訊缺失時硬做決策
- 用對話歷史替代文本
