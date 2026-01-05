## Legacy Domain Key Audit

- **Search scope:** `src` for legacy domain keys (groups A/B/C).
- **Findings (high-traffic):**
  - `src/views/03_Resonance.vue` — Round1 anchor list and Round2/3 state still use legacy ids (`career`, `relationship`, `money`, etc.).
  - `src/core/choiceEngine.js` — Domain anchors and round loaders use legacy ids and `CONTENT_MAP` (question bank fallback).
  - `src/core/domainScoring.js` + `src/core/flow/readingNarrative.v1.js` — Axes/labels keyed by legacy domains.
  - `src/core/content/*` + `src/core/ontology/round2Situations.v1.json` — Legacy ContentDB + round2Situations remain referenced in the build graph.
  - `src/core/ontology/domainAlias.v1.js` — Canonicalizer returns legacy short keys (`qing`, `cai`, …) instead of `domain_*`.
  - `src/views/components/Round2FourSymbolPanel.v1.vue` — UI map still includes legacy labels for relationship/money/etc.
  - `src/core/flow/readingEngine.v1.js` + `src/core/psych/scorer.js` — Runtime scoring imports `round2Situations`/`questionBank` with legacy domain keys.
- **Impact:** Round1–Round3 runtime can still emit/stash legacy ids, and downstream scoring paths rely on legacy question bank + ContentDB-derived ids.
- **Next actions:** Introduce a single canonical map (`domain_*`), route Round1–Round4 through it, drop ContentDB/round2Situations/questionBank dependencies from the active flow, and normalize payloads before scoring.
