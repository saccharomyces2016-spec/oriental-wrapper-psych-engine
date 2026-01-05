# Governance Inventory — 2026-01-02 (post-restructure)

## Repo docs tree (depth ≤3)
```
docs
docs/README.md
docs/RUNTIME_FLOW_RUNBOOK.md
docs/governance
docs/governance/00_INDEX/GOVERNANCE_INDEX.md
docs/governance/00_INDEX/README_GOVERNANCE.md
docs/governance/01_PRINCIPLES/AI_COLLABORATION_CHARTER.md
docs/governance/01_PRINCIPLES/PROGRESS_GOVERNANCE_RULEBOOK.md
docs/governance/02_ROLES/ROLE_AND_WORKFLOW_DEFINITION.md
docs/governance/02_ROLES/TASK_ASSIGNMENT_AND_ONE_OFF_RULES.md
docs/governance/04_DECISIONS/0002-repo-structure.md
docs/governance/04_DECISIONS/DECISION_LOG.md
docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md
docs/governance/05_PHASES/PHASE_CLOSEOUT_TEMPLATE.md
docs/governance/06_TRANSCRIPTS/2026-01-02_gemini_phase2_directives.md
docs/governance/06_TRANSCRIPTS/2026-01-02_phase2_architectural_ruling_gemini.md
docs/governance/08_REPORTS/GOVERNANCE_FINAL_DELETE_PLAN.md
docs/governance/08_REPORTS/GOVERNANCE_STATE_REPORT.md
docs/governance/09_LEGACY/LEGACY_CLEANUP_REPORT.md
docs/governance/09_LEGACY/LEGACY_DOMAIN_KEY_AUDIT.md
docs/governance/08_REPORTS/2026-01-02_governance_inventory.md
docs/metaphysics/ELEMENT_PRIOR_SPEC.md
docs/metaphysics/NARRATIVE_BINDING_SPEC.md
docs/metaphysics/ONTOLOGY_PATTERN_TAG_GOVERNANCE.md
docs/worldview/WORLDVIEW_CANON_vNEXT_v1.md
docs/worldview/WORLDVIEW_CANON_vNEXT_v1_PATCH.md
```

## docs/governance tree (depth ≤4)
```
docs/governance
docs/governance/00_INDEX
docs/governance/00_INDEX/GOVERNANCE_INDEX.md
docs/governance/00_INDEX/README_GOVERNANCE.md
docs/governance/01_PRINCIPLES
docs/governance/01_PRINCIPLES/AI_COLLABORATION_CHARTER.md
docs/governance/01_PRINCIPLES/PROGRESS_GOVERNANCE_RULEBOOK.md
docs/governance/02_ROLES
docs/governance/02_ROLES/ROLE_AND_WORKFLOW_DEFINITION.md
docs/governance/02_ROLES/TASK_ASSIGNMENT_AND_ONE_OFF_RULES.md
docs/governance/03_PROCESS
docs/governance/04_DECISIONS
docs/governance/04_DECISIONS/0002-repo-structure.md
docs/governance/04_DECISIONS/DECISION_LOG.md
docs/governance/05_PHASES
docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md
docs/governance/05_PHASES/PHASE_CLOSEOUT_TEMPLATE.md
docs/governance/06_TRANSCRIPTS
docs/governance/06_TRANSCRIPTS/2026-01-02_gemini_phase2_directives.md
docs/governance/06_TRANSCRIPTS/2026-01-02_phase2_architectural_ruling_gemini.md
docs/governance/07_BLOCKERS
docs/governance/07_BLOCKERS/2026-01-02_toolchain_offline.md
docs/governance/08_REPORTS
docs/governance/08_REPORTS/GOVERNANCE_FINAL_DELETE_PLAN.md
docs/governance/08_REPORTS/GOVERNANCE_STATE_REPORT.md
docs/governance/09_LEGACY
docs/governance/09_LEGACY/LEGACY_CLEANUP_REPORT.md
docs/governance/09_LEGACY/LEGACY_DOMAIN_KEY_AUDIT.md
docs/governance/08_REPORTS/2026-01-02_governance_inventory.md
```

## Governance-related files (current → proposed category)
| File | Current Path | Proposed Category |
| --- | --- | --- |
| README_GOVERNANCE.md | docs/governance/00_INDEX/README_GOVERNANCE.md | 00_INDEX |
| GOVERNANCE_INDEX.md | docs/governance/00_INDEX/GOVERNANCE_INDEX.md | 00_INDEX |
| PROGRESS_GOVERNANCE_RULEBOOK.md | docs/governance/01_PRINCIPLES/PROGRESS_GOVERNANCE_RULEBOOK.md | 01_PRINCIPLES |
| AI_COLLABORATION_CHARTER.md | docs/governance/01_PRINCIPLES/AI_COLLABORATION_CHARTER.md | 01_PRINCIPLES |
| ROLE_AND_WORKFLOW_DEFINITION.md | docs/governance/02_ROLES/ROLE_AND_WORKFLOW_DEFINITION.md | 02_ROLES |
| TASK_ASSIGNMENT_AND_ONE_OFF_RULES.md | docs/governance/02_ROLES/TASK_ASSIGNMENT_AND_ONE_OFF_RULES.md | 02_ROLES |
| DECISION_LOG.md | docs/governance/04_DECISIONS/DECISION_LOG.md | 04_DECISIONS |
| 0002-repo-structure.md | docs/governance/04_DECISIONS/0002-repo-structure.md | 04_DECISIONS |
| PHASE_0002_CLOSEOUT.md | docs/governance/05_PHASES/PHASE_0002_CLOSEOUT.md | 05_PHASES |
| PHASE_CLOSEOUT_TEMPLATE.md | docs/governance/05_PHASES/PHASE_CLOSEOUT_TEMPLATE.md | 05_PHASES |
| transcripts/* | docs/governance/06_TRANSCRIPTS/... | 06_TRANSCRIPTS |
| blockers/* | docs/governance/07_BLOCKERS/... | 07_BLOCKERS |
| GOVERNANCE_STATE_REPORT.md | docs/governance/08_REPORTS/GOVERNANCE_STATE_REPORT.md | 08_REPORTS |
| GOVERNANCE_FINAL_DELETE_PLAN.md | docs/governance/08_REPORTS/GOVERNANCE_FINAL_DELETE_PLAN.md | 08_REPORTS |
| LEGACY_CLEANUP_REPORT.md | docs/governance/09_LEGACY/LEGACY_CLEANUP_REPORT.md | 09_LEGACY |
| LEGACY_DOMAIN_KEY_AUDIT.md | docs/governance/09_LEGACY/LEGACY_DOMAIN_KEY_AUDIT.md | 09_LEGACY |

## Stray governance-like files at docs/ root
- (none detected after reclassify)

## Git status snapshot
- Branch: gov/cleanup-legacy-20260101-170835
- HEAD: 24a4eeb
- git status -sb (post root-report relocation):
```
## gov/cleanup-legacy-20260101-170835
```
- Root-level governance reports relocated to `docs/governance/08_REPORTS/root_reports/`; duplicated root `_governance/` removed after confirming parity with `artifacts/governance_runs/_governance/`.
