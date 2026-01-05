# LEGACY CLEANUP REPORT
Date: 2025-12-31

## Inventory
| Path | Type | Classification | Reference Evidence | Action | Notes |
| --- | --- | --- | --- | --- | --- |
| src/_deprecated/core (ContentDB, WuXingEngine, domains/…) | dir | DEAD | No `rg "_deprecated"` hits in src/scripts; legacy ContentDB only | Moved to archive/legacy_question_bank/2025-12-31/src/_deprecated/core | Legacy question-bank / domain assets superseded by finalized ontology |
| src/core/ontology/round2Situations.v1.json | file | ACTIVE | Imported by validateRound2, readingEngine, dashboard | Kept | Validation/engine still reference legacy payload; not altered |
| src/core/content/ContentDB_* (non-deprecated) | files | ACTIVE | Used via CONTENT_MAP in choiceEngine for round3/other flows | Kept | Still part of runtime content pipeline |
| src/core/ontology/questionBank.v1.json | file | ACTIVE | Used in validators/psych scoring | Kept | Required |
| src/core/ontology/patternToThemeMap.v1.js | file | ACTIVE | Used in scoring/validators | Kept | Required |
| scripts/validateRound2.mjs and related validators | files | ACTIVE | Invoked by validate:all | Kept | Required |

## Archived (move-only, reversible)
- src/_deprecated/core → archive/legacy_question_bank/2025-12-31/src/_deprecated/core

## Not moved (ACTIVE/UNCERTAIN)
- ACTIVE: src/core/ontology/round2Situations.v1.json; src/core/content/ContentDB_*; src/core/ontology/questionBank.v1.json; src/core/ontology/patternToThemeMap.v1.js; validate scripts (Round2/reading/questionbank/metaphysics/canonical/outputv2)
- UNCERTAIN: None in this pass.

## Rollback
To restore archived items:
```
mv archive/legacy_question_bank/2025-12-31/src/_deprecated/core src/_deprecated/
```
Then rerun build/validate.

## Verification Commands & Results
- npm run build → PASS
- npm run validate:all → PASS
- npm run verify:round2:datasource → PASS

## Notes / Next Steps
- After a stable period, consider deleting `archive/legacy_question_bank/2025-12-31/src/_deprecated` if no regressions.
- Legacy Round2 validators still rely on round2Situations; migrate to finalized ontology before archiving further.
