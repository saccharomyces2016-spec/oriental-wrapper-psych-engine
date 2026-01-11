# BRIEF（P0-2｜income_expansion_pressure｜R1 題目設計顧問）
generatedAt: 2026-01-05T18:20:32+0800

## 任務
請以「高階題庫藍圖」形式輸出（不是直接寫完整題庫）：
- 題目分段（sections）
- 每段目的（要區分什麼狀態）
- 題型配置（單選/量表/情境題…）
- 目標：能把使用者穩定分成 3~5 個可解釋狀態（bands）
- 必須同時輸出 CN/EN 的問法風格指引（不必逐題翻譯，但要給規則與範例）

## facet 定義（SSOT：ROADMAP P0-1）
- facetId: income_expansion_pressure
- 定義：薪資增速追不上家庭開銷所產生的壓力，以及對「第二收入」的驅動與可行性狀態。

## 硬性約束（不得違反）
- ADR_0002：對使用者層 = 純玄學體驗（不得暴露心理學/科學名詞）
- ADR_0003：必須可做 CN/EN 原生語感
- 顧問輸出僅為建議稿（不得直接寫入 domain）

## 失敗避免（必讀）
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/governance/LESSONS_LEARNED.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/gem/briefs/BRIEF_lessons_and_constraints.zh.md

## legacy 參照（必查路由｜只需引用要點）
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/ROUTER.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/CAPABILITY_MAP.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/REUSABLE_ASSETS.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/UI_FLOW_REFERENCES.md
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/extract/FAILURE_PATTERNS.md

## research 參照（必查，但不得外露原文到使用者層）
- /Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core/docs/research/  （請只萃取結構訊號，轉寫成你的設計理由）

## 你要輸出的格式（固定）
1) Blueprint 概覽（3~5 bands 的命名與定義）
2) Sections（每段：目的 / 題型 / 題數 / 範例問法 2~3 題）
3) Scoring signals（每段怎麼影響 bands，給「可落盤規則」）
4) 風險提示（哪些問法會太像心理測驗，如何改成玄學問卦）
5) 驗收（最少 3 組對照使用者，能明顯落在不同 band）
