# Git cannot create .git/index.lock (Operation not permitted)

**Status:** OPEN  
**Date:** 2026-01-02  
**Branch:** gov/cleanup-legacy-20260101-170835  
**HEAD:** 6ccbcb8

## Impact
- Cannot stage/commit governance restructuring and related doc work reliably.
- Risk: repository state exists on disk but cannot be persisted to git index/commits.

## Symptoms (observed)
- `rm: .git/index.lock: Operation not permitted`
- `fatal: Unable to create '/Users/yujunwei/Desktop/my-first-app/.git/index.lock': File exists.`

## Confirmations
- `.git/index.lock` existed at inspection time; removal attempt failed (Operation not permitted).
- `touch .git/index.lock` failed (same permission issue).

## Likely causes (hypotheses)
- macOS privacy/TCC restrictions (Full Disk Access not granted to terminal/IDE).
- iCloud Desktop/Documents sync interfering with `.git` writes.
- Security/AV agent locking `.git`.

## User-run Fix Checklist (in order)
1) Grant Full Disk Access to the terminal / Cursor / IDE used for git.
2) If repo is under iCloud Desktop/Documents, move it to a non-synced path, e.g. `~/Projects/my-first-app`.
3) Retry: `rm -f .git/index.lock && touch .git/index.lock` then `git add docs/governance`.
4) If flags suspected: `chflags -R nouchg .git` (only if needed).

## Closure condition
- `touch .git/index.lock` succeeds AND `git add docs/governance` succeeds AND `git status` shows staged changes.

## Evidence Snapshot
- Timestamp: 2026-01-02 (local)
- HEAD: 6ccbcb8
- Branch: gov/cleanup-legacy-20260101-170835
- touch test: FAILED (Operation not permitted)
