# Governance UI Audit Report

## Component → Datasource Map
- Round2 renderer: `src/views/components/Round2FourSymbolPanel.v1.vue` (fed from `round2Questions` in `src/views/03_Resonance.vue`), source `src/core/ontology/round2FourSymbol.v1.json`.
- Round3 renderer: `src/views/03_Resonance.vue` star tokens built from `getRound3Questions()` (choiceEngine) backed by `src/core/ontology/round3Ipsative.v2.json`.
- Round4 renderer: `src/views/03_Resonance.vue` via `buildRound4Options()` using `src/core/ontology/round4IntensityTrigger.v1.json`.

## Binding Proofs
- Round2: `round2Questions` computed maps `round2FourSymbol.domains[].options[]` into UI tokens; dev log `[GOV][R2] datasource` shows domain + option text; panel logs same on prop change.
- Round3: `startRound3()` logs `[GOV][R3] datasource` with qids/prompts pulled from `round3Ipsative.v2.json`; tokens are rendered directly from that array.
- Round4: `buildRound4Options()` filters `round4IntensityTrigger.triggers` by `{source_question:'r3_q1_control'}` and only proceeds when matches exist; entering Round4 logs `[GOV][R4] datasource` with anchors count/first label.
- DEV exposure: `window.__GOV` now holds raw round2/round3/round4 ontology payloads in dev via `src/dev/governanceDebugExpose.js`.

## Hardcoded String Audit
- UI-only label helpers (e.g., `domainLabelChar` in Round2 panel) still map legacy keys to single characters; they do not source question text or options and are isolated to presentation.
- No UI imports of `questionBank`, `round2Situations`, `ContentDB`, or `anchorSelector`; new firewall script confirms.

## Script Results (latest run)
- `npm run build` ✓
- `npm run validate:governance` ✓
- `npm run verify:all` ✓ (includes `verify:ui:nolegacy` and `smoke:ui:governance`)

## Remaining Risk Surface
- Legacy domain tokens may still live in non-UI utilities (counts reported as non-fatal by `verify-entry-nolegacy`), but UI import firewall ensures they are not pulled into runtime render paths. Next check: `src/views/05_Dashboard.vue` for legacy sample data if further tightening is needed.
