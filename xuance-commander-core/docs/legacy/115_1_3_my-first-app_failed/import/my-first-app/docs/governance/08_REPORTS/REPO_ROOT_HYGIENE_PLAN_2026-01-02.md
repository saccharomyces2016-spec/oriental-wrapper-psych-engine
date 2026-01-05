# Repo Root Hygiene Plan — 2026-01-02

- Branch: gov/cleanup-legacy-20260101-170835
- HEAD: 32acd28
- Scope: Repo-root artifacts only (no runtime/business logic changes)

## Repo root directories (depth 1)
- 115.1.2
- artifacts/audits/_audit_candidate_refs
- _governance
- .corepack
- .git
- .vscode
- archive
- core
- dist
- docs
- node_modules
- packages
- public
- reports
- scripts
- server
- src
- tests
- (plus other standard project folders)

## Detected artifact-like items (root)
- Directories:
  - artifacts/imports/115.1.2/
  - artifacts/audits/_audit_candidate_refs/
  - artifacts/governance_runs/_governance/
  - (other artifacts/audits/_audit_* directories)
- Files (root, underscore-prefixed):
  - _ALLOWLIST.txt
  - _CLEANUP_REPORT.md
  - _DELETE_CANDIDATES.txt
  - _DELETE_CANDIDATES_QBANK.txt
  - _EXECUTE_CLEANUP_COMMANDS.sh
  - _FINAL_QBANK.txt
  - _FINAL_QBANK_EVIDENCE.md
  - _NEEDS_DECISION.txt
  - _PROTECTED_SET.txt
  - artifacts/qbank/_QBANK_DEDUP_DRYRUN_REPORT.md
  - artifacts/qbank/_QBANK_V1_CLASSIFICATION.md
  - artifacts/qbank/_QBANK_V1_STATUS.md
  - _ROLLBACK.md
  - artifacts/audits/_audit_artifacts_dirs.txt
  - artifacts/audits/_audit_backups.txt
  - artifacts/audits/_audit_code_file_count.txt
  - artifacts/audits/_audit_depcheck.json
  - artifacts/audits/_audit_files.txt
  - artifacts/audits/_audit_large_files.txt
  - artifacts/audits/_audit_npm_scripts.txt
  - artifacts/audits/_audit_package.json
  - artifacts/audits/_audit_qbank_candidates.txt
  - artifacts/audits/_audit_qbank_version_hints.txt
  - artifacts/audits/_audit_refs.txt
  - artifacts/audits/_audit_refs_all.txt
  - artifacts/audits/_audit_tree.txt
  - _backup_dir_path.txt
  - _delete_candidate_refcheck.tsv
  - _disk_df.txt
  - _git_perm_ls.txt
  - _mounts.txt
  - artifacts/qbank/_qbank_fingerprints.csv
  - artifacts/qbank/_qbank_flag_resonance_context.txt
  - artifacts/qbank/_qbank_flag_resonance_refs.txt
  - artifacts/qbank/_qbank_runtime_entrypoints.txt
  - artifacts/qbank/_qbank_script_expectations.md
  - artifacts/qbank/_qbank_script_locations.txt
  - artifacts/qbank/_qbank_script_readpaths.md
  - artifacts/qbank/_qbank_sha15c3_paths.txt
  - artifacts/qbank/_qbank_v1_exists_root.txt
  - artifacts/qbank/_qbank_v1_find.txt
  - artifacts/qbank/_qbank_v1_find_hash.txt
  - artifacts/qbank/_qbank_v1_refs.txt
  - artifacts/qbank/_qbank_v1_refs_runtime.txt
  - artifacts/qbank/_qbank_v1_refs_runtime_count.txt
  - artifacts/qbank/_qbank_v1_root_presence.txt
  - artifacts/qbank/_qbank_v1_sha_reverse_lookup.txt
  - _user_id.txt
  - _whereami.txt
  - docs/governance/08_REPORTS/root_reports/GOVERNANCE_UI_AUDIT_REPORT.md
  - docs/governance/08_REPORTS/root_reports/IMPLEMENTATION_REPORT.md
  - docs/governance/08_REPORTS/root_reports/PRODUCT_ANALYSIS_REPORT.md
  - docs/governance/08_REPORTS/root_reports/ROOT_CAUSE*.md (ROOT_CAUSE.md, ROOT_CAUSE_MIN.md)
  - docs/governance/08_REPORTS/root_reports/VERIFICATION_REPORT.md
  - docs/governance/08_REPORTS/root_reports/WORKFLOW_ROLES_AND_RECOMMENDATIONS.md
  - docs/governance/08_REPORTS/root_reports/PATCH_PLAN.md

## Classification
- KEEP_ROOT: package.json, README.md, node_modules/, dist/ (build), src/, packages/, docs/, scripts/, server/, tests/, public/, core/, archive/
- MOVE_TO_ARTIFACTS: artifacts/imports/115.1.2/, artifacts/audits/_audit_* dirs/files, artifacts/governance_runs/_governance/, root underscore-prefixed audit/qbank files
- MOVE_TO_DOCS: report markdowns under docs/governance/08_REPORTS/root_reports/ (GOVERNANCE_UI_AUDIT_REPORT.md, IMPLEMENTATION_REPORT.md, PRODUCT_ANALYSIS_REPORT.md, ROOT_CAUSE*.md, VERIFICATION_REPORT.md, WORKFLOW_ROLES_AND_RECOMMENDATIONS.md, PATCH_PLAN.md)
- REVIEW_REQUIRED: None beyond listed MOVE_TO_ARTIFACTS (all are non-runtime artifacts)

## Proposed targets
- artifacts/audits/: all artifacts/audits/_audit_* directories/files, audit reports, *_REPORT*.md
- artifacts/snapshots/: (for future snapshots; none moved yet)
- artifacts/imports/: artifacts/imports/115.1.2/
- artifacts/legacy_sources/: (unused this pass)
- artifacts/qbank/: artifacts/qbank/_qbank_* and artifacts/qbank/_QBANK_* files, qbank-related lists/reports
- artifacts/governance_runs/: artifacts/governance_runs/_governance/
- artifacts/misc/: remaining underscore-prefixed misc files (allowlist, backup markers, etc.)

## Reference scan (docs + scripts only; no src)
- Matches found in docs/governance/08_REPORTS/GOVERNANCE_STATE_REPORT.md referencing `artifacts/governance_runs/_governance/state_snapshot/...` and related files.
- Snapshot report REPO_DIR_TREE_SNAPSHOT_2026-01-02 lists artifacts/imports/115.1.2/, artifacts/audits/_audit_candidate_refs, and artifacts/governance_runs/_governance/ paths.
- Governance inventory report lists many `artifacts/audits/_audit_*`, `artifacts/qbank/_qbank_*`, `artifacts/governance_runs/_governance/` paths.
Action: These references will need path updates after moves if the files are relocated.

## Notes
- Directories only; file contents not inspected.
- Moves will be limited to non-runtime artifact paths per above classification.
