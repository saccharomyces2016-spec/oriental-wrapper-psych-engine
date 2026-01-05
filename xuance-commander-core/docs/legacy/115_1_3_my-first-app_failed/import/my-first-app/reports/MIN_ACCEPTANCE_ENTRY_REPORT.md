# Minimal Acceptance Report — Entry Clean + Canonical Guard

## What changed
- 01_Origin.vue: CTA now purges persisted legacy state (local/session storage) and blocks launch if legacy domain keys remain.
- App.vue: Origin->Round1 entry resets flow state and bumps stageKey for a clean rerender.
- 03_Resonance.vue: Round1 selection enforces canonical domain_* IDs and blocks invalid transitions.
- Added verify:entry:nolegacy script and hooked into verify:all.

## Why
- Prevent legacy domain/content state from leaking into governance flow and causing Safari transition instability or wrong dataset selection.

## How to verify
- `npm run build`
- `npm run validate:all`
- `npm run verify:all`
- Manual (Safari): open Origin -> click CTA -> Round1 -> pick each domain -> ensure no legacy prompt appears.
