# Workspace Trust Mode — Codex Execution Policy (Project-Scoped)

## Purpose
Reduce execution friction while preserving governance, auditability, and rollback safety.

This document defines when and why Codex is allowed to execute shell/git/file operations
without interactive approval prompts **within this workspace only**.

## Scope
- Repository: my-first-app
- Workspace-level trust only
- Does NOT apply to other repositories or global environments

## Trust Grant
Codex / Cursor Execution Agent is authorized to:
- Run shell commands (node, pnpm, git, find, etc.)
- Modify repository files
- Commit changes

WITHOUT per-command interactive approval,
**provided that ALL conditions below are met**.

## Hard Preconditions (ALL REQUIRED)
1. Execution is initiated by a Commander-issued CODEX DIRECTIVE PACK.
2. Scope is explicitly declared in the directive pack.
3. Frozen documents are not modified:
   - docs/worldview/WORLDVIEW_CANON_vNEXT_v1.md
   - docs/architecture/PRODUCT_ARCHITECTURE_CONSTITUTION_vNEXT.md
4. All changes are auditable via:
   - git status
   - git log
   - diffstat
5. Violations immediately revoke trust (see Revocation).

## Prohibited Even in Trust Mode
- Autonomous planning or task invention
- Silent scope expansion
- Editing frozen canon / constitution
- Executing commands outside declared scope
- Skipping evidence reporting

## Revocation Conditions
Workspace Trust Mode is immediately revoked if:
- A frozen document is touched
- Changes occur without a directive pack
- Evidence is missing or falsified
- Multiple slices are worked in parallel

Revocation action:
- Trust Mode marked SUSPENDED in PROJECT_STATE.json
- Manual approval required again until reinstated

## Relationship to Governance
This mode does NOT override:
- Single Entry System
- Vertical Slice Protocol
- Checkpoint cadence
- Role Registry authority

It only removes UI friction for approved execution.

## Effective Date
Effective immediately upon commit.
