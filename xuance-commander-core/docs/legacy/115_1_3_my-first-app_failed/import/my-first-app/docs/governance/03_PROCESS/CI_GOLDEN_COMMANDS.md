# CI Golden Commands (Required)

Purpose: Ensure "works on my machine" does not happen.

## Golden Commands (single set)
- pnpm -w -r typecheck
- pnpm -w -r test
- pnpm -w -r build (if build exists)

## Policy
- If any Golden Command fails: status becomes BLOCKED.
- No feature work continues until unblocked OR an explicit decision is logged.

## Environment Lock (recommended)
- Pin Node version (e.g., .nvmrc or volta) — optional if already pinned.
- Pin pnpm version (corepack or npx pnpm@X.Y.Z) — optional if already pinned.

## Reporting requirement
Every execution report must include:
- git status -sb
- command outputs (exit codes)
- any blockers + how to reproduce
