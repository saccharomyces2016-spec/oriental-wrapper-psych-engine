## Canonical Domains
- Allowed ids: `domain_yuan`, `domain_cai`, `domain_shen`, `domain_ye`, `domain_jia`, `domain_ju`, `domain_ming`, `domain_xin`.
- All legacy keys (money/relationship/... love/finance/... qing/cai/...) must be canonicalized via `canonicalizeDomainId` before storing state.

## Round2 Payload
- Source: `src/core/ontology/round2FourSymbol.v1.json` (decoder.signal_map per option with qi/shi/jie/dong → LOW/HIGH/OVERFLOW/BALANCED/OVERLOAD).
- Runtime record: `resonance.round2[0]` = `{ question_id, option_id, domain_id, signal_map, symbol, label }`.
- UI: `Round2FourSymbolPanel` renders 4 symbols from the JSON; selecting one populates `round2Selection` and auto-transitions to Round3.

## Round3 Payload
- Source: `src/core/ontology/round3Ipsative.v2.json` (questions: r3_q1_control, r3_q2_risk, r3_q3_boundary with options A/B).
- Runtime record: `resonance.round3.answers` = `[{ question_id, selected_option, rejected_option, domain_id }, ...]` (three entries required).
- Flow: after the third answer, a 350ms delay triggers `transitionToRound(4)` automatically; no confirm button required.

## Round4 Payload & Safety
- Source: `src/core/ontology/round4IntensityTrigger.v1.json` (coverage for r3_q1_control A/B; each has at least BALANCED/OVERLOAD options).
- Runtime record: `resonance.round4.anchor_answers` = selected intensity options from the matched trigger.
- Critical guard: if resolved options length is 0 → `console.error('[CRITICAL] Round4 options=0', { current_round, selected_domain, r3_answers, ontology_versions })` and `alert('系統資料異常：找不到對應的強度定錨，請回報開發者')`; no fallback.
