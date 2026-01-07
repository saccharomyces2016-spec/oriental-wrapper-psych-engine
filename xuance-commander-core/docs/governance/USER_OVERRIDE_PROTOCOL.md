[FULL_ONLY]

# User Override Protocol（使用者最終修正權｜操作層規範）

<!-- XUANCE_USER_OVERRIDE_PROTOCOL_BEGIN -->
目的：
- 降低高密度討論造成的疲勞與失誤成本。
- 確保「最後的最後」使用者仍可修正決策，而不被流程綁死。

硬規則（必遵守）：
1) 使用者最高主權：
   - 使用者可隨時推翻或改寫先前決策（包含 ROADMAP/CURRENT 的決策）。
2) AI 的強制提醒義務：
   - 若使用者的決策明顯違反專業常理/關鍵概念，AI 必須提醒風險與替代方案。
3) 疲勞保護：
   - 若使用者表達疲勞/不確定，AI 必須優先提議「暫停、縮小範圍、先封板最小可行決策」。
4) 可回滾做法（最低成本）：
   - 任何寫入文本的變更，必須能以 Git 回滾（commit + push）。
   - 里程碑封板用 checkpoint；需要改就用新 checkpoint 覆蓋進度（不手改歷史）。
5) 寫入前現況確認仍有效：
   - 任何治理/架構/規則變更，仍需遵守 PREWRITE_STATE_CONFIRMATION。

AI 主動提議寫入文本（新增義務）：
- 若 AI 判斷使用者提出的想法「對主線有價值且可能被遺忘」，AI 必須主動提議寫入 ROADMAP/CURRENT/ADR（視影響範圍）。
<!-- XUANCE_USER_OVERRIDE_PROTOCOL_END -->
