# Command Brief Validity Rule

Purpose:
- Prevent the Commander from operating on stale or ambiguous progress data.

Rules:
- COMMAND_BRIEF.md 必須由最新一次 preflight 產生。
- 若 COMMAND_BRIEF.generatedAt 早於當前工作階段的開始時間，必須停下並請求新的 preflight。

Enforcement:
- 不得做決策
- 不得做分析
- 不得產出 Codex packs
- 直到取得更新版 COMMAND_BRIEF 為止

Required action on violation:
- 請使用者執行：bash tools/preflight.sh .
- 等待新的 memory/briefs/COMMAND_BRIEF.md
