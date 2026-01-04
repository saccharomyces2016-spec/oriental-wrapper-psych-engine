# ADR 0003 - World-Class Quality & Bilingual (CN/EN) Global Market Readiness

## Status
Accepted (approved by user)

- approvedAt: 2026-01-04

## Context
外層呈現是完整的玄學系統，但若要商業化並接軌國際市場，必須把「世界級水準」與「可切換英文版」視為硬目標。
若未明確寫入，可能只做到中文可用、英文只是草率翻譯，導致整體質感與可信度不足。

## Decision
1) 產品品質目標：世界級（水準涵蓋視覺、互動、敘事、穩定性、可維護性）
2) 產品必須可切換成英文版（CN/EN），可直接接軌國際市場
3) 無論中文或英文，使用者普遍要感知：
   - 很準
   - 看得懂（不含糊）
   - 真的有幫助（能促進行動或反思）
4) 英文版不得只是逐字翻譯；敘事需自然如原生英文玄學系統（外層仍是玄學，不暴露內核）

## Consequences
- 需要 i18n/文案結構；外層仍維持玄學體驗（遵守 ADR_0002）
- 後續「敘事/建議/風險鏈」需能產出 CN/EN 版（或可追溯的生成流程）
- 若使用者普遍不覺得準/有幫助，即使工程正確，也視為未達成目標，需迭代

## Verification
- charter/CHARTER.md 載入世界級 + CN/EN 切換要求
- prototype/UI 可顯示 CN/EN 兩種語系（不解釋原理）
