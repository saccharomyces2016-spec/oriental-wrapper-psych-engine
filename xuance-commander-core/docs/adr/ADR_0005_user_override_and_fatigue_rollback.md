# ADR 0005 - User Override & Fatigue-Rollback Protocol

## Status
Proposed

## Context
高密度討論容易造成疲勞與決策失誤。專案需要一個操作層規範，明確保障使用者「最後可修正」的權利，同時保留可審計、可回滾的工程流程。

## Decision
1) 新增 docs/governance/USER_OVERRIDE_PROTOCOL.md 作為操作層規範：
   - 使用者可隨時修正決策
   - AI 必須在明顯違反專業常理時提醒風險與替代方案
   - 疲勞狀態優先封板最小決策，避免返工
2) 回滾以 Git 為唯一可靠方式：
   - 里程碑封板使用 checkpoint（commit+push+evidence+MASTER）
   - 後續修正以新 checkpoint 留證，不手改歷史

## Consequences
- 流程更穩定：可回溯、可回滾、可審計
- 決策成本降低：疲勞時可先封板最小可行決策

## Verification
- repo 內存在 USER_OVERRIDE_PROTOCOL.md
- ROADMAP/CURRENT/CHANGELOG 對應紀錄可追溯
