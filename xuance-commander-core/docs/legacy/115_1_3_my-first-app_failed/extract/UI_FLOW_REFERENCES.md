# UI / FLOW REFERENCES（互動流程參考）

用途：
- 後續做 P0-4（最小 UI 串接）時，快速定位舊版如何串接「輸入→計分→敘事→輸出」。

---

## Candidate files
- src/engine/readingFacade.v1.js（入口/流程）
- src/core/flow/readingNarrative.v1.js（敘事流程）
- archive/legacy/core-content/resultTemplates/readingOutputV2.js（結果模板）
- src/core/telemetry/choiceMetrics.js（使用者選擇記錄/遙測可能性）

---

## What to extract later（精讀時要抓的點）
- UI 的狀態機：題目如何分步呈現？
- 結果頁：哪些欄位/區塊最能承載「玄學體驗」？
- 收集資料點：哪些資料適合做成後續迭代的 telemetry（不侵犯隱私前提下）？
