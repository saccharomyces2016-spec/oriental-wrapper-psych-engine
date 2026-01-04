# ADR 0004 - AI Advisory Roles System & GEM Protocol

## Status
Accepted (approved by user)

- approvedAt: 2026-01-04

## Context
為達成「世界級水準」與「CN/EN 可原生切換」且維持「對使用者：純玄學體驗」，專案不能只靠單一 AI 隨機產出題目或文案。
需要一個可審計、可追溯、可分工的顧問角色系統，並用受限的 GEM 角色來產出「建議稿」供指揮官審核。

若未建立此制度，常見風險：
- 題目像心理測驗或太直白，削弱玄學體驗
- 英文版像翻譯機，失去原生語感與可信度
- 敘事/建議/風險鏈品質不穩定，無法迭代
- 無法回溯「為何這樣設計」，難以維護與擴充

## Decision
1) 建立「AI 顧問角色系統」（Advisory Roles System），定義每個角色的責任、輸入、輸出、禁區、驗收標準。
2) 建立「GEM Protocol」：以 Gemini GEM（或等價角色提示）模擬顧問，但其輸出僅能作為建議稿，不得直接寫入正式 domain。
3) 指揮官負責：
   - 指派任務給顧問角色
   - 審核顧問輸出
   - 決定是否寫入正式 domain（必要時追加 ADR）
4) 所有顧問輸出必須可追溯：保存到 `docs/gem/runs/`，包含：任務、輸入、輸出、指揮官決策摘要。

## Consequences
- 新增 docs/gem/ 與 prompts/gem/ 作為顧問角色與 GEM 設定的真相來源。
- 題目/敘事/建議/風險鏈進入正式 domain 前，必須先經過顧問輸出 -> 指揮官審核 ->（必要時）版本更新與測試。

## Verification
- 新增以下檔案：
  - docs/governance/AI_ADVISORY_ROLES.md
  - docs/gem/README.md
  - docs/gem/profiles/*.md
  - prompts/gem/*.md
  - docs/gem/runs/README.md
- CHANGELOG 與 INDEX 註冊完成
