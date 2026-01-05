# CAPABILITY MAP（legacy 能力盤點｜可移植資產）

用途：
- 把 legacy 的「可用能力」抽成模組，方便新系統採納或避免重犯。

---

## A. 題庫與命題能力（Questionization）
- 題庫概念包：reports/question_bank_concept_package.md
- 主題→命題方法：reports/mother_theme_questionization_v2.md
- 題目藍圖生成器：scripts/generateQuestionBlueprint.mjs
- 題目藍圖輸出：reports/p1_question_blueprint_v1.json

可移植方向（新系統）：
- 用於 P0-2 的「題目藍圖」設計（R1 顧問輸入/輸出結構）
- 用於後續多 facet 扩張（保持模板一致性）

---

## B. 計分與分段能力（Scoring / Banding）
- scorer：src/core/psych/scorer.js
- 校驗：scripts/validate/validate-questionbank.mjs

可移植方向：
- 保留「可校驗的 scoring contract」
- 保留「輸入→分數→band」的可測試鏈

---

## C. 敘事/結果輸出能力（Narrative / Templates）
- 敘事流程：src/core/flow/readingNarrative.v1.js
- 結果模板：archive/legacy/core-content/resultTemplates/readingOutputV2.js
- contract/facade：src/engine/contracts/readingContract.v1.js, src/engine/readingFacade.v1.js

可移植方向：
- P0-4 的最小 UI 串接（讀 compiled facet → 顯示敘事/建議/風險鏈）
- 文案與模板分離（便於 CN/EN）

---

## D. LLM 編排與引導能力（Orchestration / Guidance）
- 總控：src/core/SoulArchitect.js
- 主提示：src/core/llm/masterPrompt.v1.1.md
- guidance builder：src/core/guidance/buildGuidance.js

可移植方向：
- 僅抽象「接口設計」與「輸入輸出契約」
- 不直接搬 prompt（避免與現行治理/研究 gate 衝突）

---

## E. 標籤治理與清理能力（Tag policy / Audit）
- policy/summary/raw：reports/pattern_tag_policy_v1.md, reports/pattern_tag_cleanup_summary.md, reports/pattern_tag_audit_raw.json

可移植方向：
- 做為 domain 擴張時的「分類/標籤」治理模板
