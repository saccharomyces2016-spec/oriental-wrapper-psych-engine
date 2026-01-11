# P0-3 Secondary Metaphor – Machine Check Rules (SSOT)

## 狀態
- ACTIVE
- Facet 限定：`income_expansion_pressure`（歲時農耕・倉廩觀）
- 版本：v1.0
- 日期：2026-01-09

## Allowed Domains (Whitelist)
- agriculture
- granary
- irrigation
- weather (terrestrial only)
- seasonal_cycle

## Banned Domains (Hard Fail)
- navigation_sea
- warfare
- machinery_industrial
- clinical_psychology
- finance_corporate

## CI Rule
- If any token matches banned domain → FAIL (Gate=0)
- If mixed-domain detected → FAIL (Metaphor Collapse)

---

## 詳細規則（見 P0-3_SECONDARY_METAPHOR_WHITELIST.md）

本文件定義域層級（domain-level）的允許/禁止規則。

**具體詞彙裁決和使用規則**：見 `P0-3_SECONDARY_METAPHOR_WHITELIST.md`
- 次隱喻裁決表（允許/禁止/限制）
- 使用密度規則（每段最多 1 個）
- 禁用詞 Regex（grep 即 FAIL）
- 角色場景限制
- 跨段延展禁止

---

## 治理定位

**本規則屬於**：P0-3 Facet-Level Governance  
**不等於**：全域禁用  
**其他 Facet**：若需使用狩獵/航行隱喻，必須另立 Facet 和白名單，不可回滲本 Facet。  
**詳細說明**：見 `P0-3_SECONDARY_METAPHOR_WHITELIST.md` 第 3 節「治理定位說明」。

