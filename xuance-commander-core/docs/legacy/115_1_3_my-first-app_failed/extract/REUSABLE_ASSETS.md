# REUSABLE ASSETS（可重用資產清單）

原則：
- ✅ 可用作「參考、模板、接口設計對照」
- ❌ 不直接複製舊系統全文進新 domain（避免帶入舊版矛盾/治理死鎖）

---

## Code assets（可能可重用的程式骨架）
- src/core/psych/scorer.js（計分骨架）
- src/engine/contracts/readingContract.v1.js（契約）
- src/engine/readingFacade.v1.js（外觀/入口）
- scripts/validate/*（驗證腳本模式）
- scripts/analyticsReport.mjs（分析輸出模式）

---

## Content assets（題目/模板原型）
- archive/legacy/questionBank/money.js（經濟/金錢題型原型）
- archive/legacy/core-content/resultTemplates/readingOutputV2.js（結果模板原型）
- reports/p1_question_blueprint_v1.json（題目藍圖資料範例）

---

## Governance assets（治理模板/報告結構）
- docs/governance/02_ROLES/ROLE_REGISTRY.md
- docs/governance/08_REPORTS/*（報告組織方式）
