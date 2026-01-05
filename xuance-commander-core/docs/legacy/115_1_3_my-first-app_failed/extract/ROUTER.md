# LEGACY ROUTER（可調用導航｜不要再翻整包）

用途：
- 當我們在做「主線 P0-2（questions/scoring/reco/narr/risk）」或任何治理/流程討論時，
  直接用本路由定位 legacy 內的可用材料。
- 本檔只做「導航」，不做全文引用；需要時再開檔精讀。

原則：
- ✅ 必須參考（consult）可用材料
- ❌ 不要求引用原文（quote/copy）
- ✅ 若採納 legacy 方案：要在「採納摘要」寫出來源路徑（traceability）

---

## 路由：題目系統（Question Design / Blueprint）
優先看：
- reports/question_bank_concept_package.md
- reports/mother_theme_questionization_v2.md
- scripts/generateQuestionBlueprint.mjs
- reports/p1_question_blueprint_v1.json

延伸看（更上層的舊規格/白皮書）：
- artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/02_QUESTION_SYSTEM.md
- artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/01_PROJECT_MASTER.md

---

## 路由：計分模型（Scoring）
優先看：
- src/core/psych/scorer.js
- reports/p1_question_blueprint_v1.json
- scripts/validate/validate-questionbank.mjs

---

## 路由：敘事與結果呈現（Narrative / Result Templates）
優先看：
- src/core/flow/readingNarrative.v1.js
- archive/legacy/core-content/resultTemplates/readingOutputV2.js
- src/engine/contracts/readingContract.v1.js
- src/engine/readingFacade.v1.js

---

## 路由：LLM 提示與總控（Prompt / Orchestration）
優先看：
- src/core/SoulArchitect.js
- src/core/llm/masterPrompt.v1.1.md
- src/core/guidance/buildGuidance.js

---

## 路由：金錢/經濟題庫（Money / Finance question bank）
優先看：
- archive/legacy/questionBank/money.js
- archive/legacy/questionBank/index.js

搭配看（標籤/政策/清理）：
- reports/pattern_tag_policy_v1.md
- reports/pattern_tag_cleanup_summary.md
- reports/pattern_tag_usage_audit.md
- reports/pattern_tag_audit_raw.json

---

## 路由：治理與證據（Governance / Evidence）
優先看：
- docs/governance/02_ROLES/ROLE_REGISTRY.md
- docs/governance/08_REPORTS/GOVERNANCE_STATE_REPORT.md
- docs/governance/08_REPORTS/root_reports/PRODUCT_ANALYSIS_REPORT.md

舊資料（僅用來理解歷史設計思路，不直接搬）：
- artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/04_GOVERNANCE_EVIDENCE.md
- artifacts/governance_runs/_governance/state_snapshot/missing_refs.json
- artifacts/governance_runs/_governance/state_snapshot/legacy_candidates_classified.json

---

## 路由：資料結構/Schema（Data Schema）
優先看：
- docs/DATA_SCHEMA_SPEC.md
- scripts/validate/validate-canonical.mjs
- scripts/validate/validate-modes.mjs

---

## 路由：診斷與分析工具（Diagnostics / Analytics）
優先看：
- scripts/analyticsReport.mjs
- scripts/diagnoseReading.mjs
