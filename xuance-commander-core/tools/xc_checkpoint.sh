#!/usr/bin/env bash
set -euo pipefail

# xc_checkpoint.sh
# Goal: create an auditable, repeatable checkpoint that leaves the repo clean.
# Strategy:
#   1) write pre-push evidence + rebuild MASTER
#   2) commit + push
#   3) write post-push evidence
#   4) commit + push (so CURRENT/CHANGELOG are not left dirty)

# Locale (avoid mojibake)
export LANG="${LANG:-en_US.UTF-8}"
export LC_ALL="${LC_ALL:-en_US.UTF-8}"

TS="$(date '+%Y-%m-%dT%H:%M:%S%z')"

REPO_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine"
CORE="$REPO_ROOT/xuance-commander-core"
CURRENT="$CORE/memory/briefs/CURRENT.md"
CHANGELOG="$CORE/memory/changes/CHANGELOG.md"
STATE_FILE="$CORE/memory/briefs/_ANTI_DOUBLE_RUN_STATE.md"
MSG="${1:-MILESTONE: checkpoint}"
FORCE="${FORCE:-0}"

cd "$REPO_ROOT"

# --- sanity ---
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "ERROR: not inside a git work tree: $REPO_ROOT" >&2
  exit 1
}

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
REMOTE="$(git remote get-url origin 2>/dev/null || true)"
HEAD_PRE="$(git rev-parse HEAD 2>/dev/null || true)"

# --- anti double-run safeguard (optional) ---
ANTI="$CORE/tools/anti_double_run.sh"
if [[ -x "$ANTI" ]]; then
  FP="PACK:${MSG}"
  "$ANTI" "$FP" "$STATE_FILE" "$FORCE"
fi

# --- write PRE evidence (before commit/push) ---
if [[ -f "$CURRENT" ]]; then
  {
    echo ""
    echo "---"
    echo "[CHECKPOINT|$TS]"
    echo "phase: pre-commit"
    echo "message: $MSG"
    echo "remote: ${REMOTE}"
    echo "branch: ${BRANCH}"
    echo "head_before: ${HEAD_PRE}"
  } >> "$CURRENT"
fi

if [[ -f "$CHANGELOG" ]]; then
  {
    echo ""
    echo "- Added: checkpoint(pre-commit) ts=$TS msg=\"$MSG\" branch=$BRANCH head_before=$HEAD_PRE remote=\"$REMOTE\""
  } >> "$CHANGELOG"
fi

# --- rebuild MASTER (best effort) ---
if [[ -x "$CORE/tools/build_master_sync_packet_full.sh" ]]; then
  (cd "$CORE" && bash tools/build_master_sync_packet_full.sh >/dev/null)
elif [[ -x "$CORE/tools/build_master_sync_packet.sh" ]]; then
  (cd "$CORE" && bash tools/build_master_sync_packet.sh >/dev/null)
else
  echo "WARN: build_master_sync_packet script not found." >&2
fi

# --- commit #1: include PRE evidence + MASTER rebuild ---
git add -A
if git diff --cached --quiet; then
  echo "No staged changes; skip commit #1."
else
  git commit -m "chore: ${MSG}"
fi

# Push #1 (cloud backup)
git push -u origin "$BRANCH"
HEAD_AFTER_PUSH_1="$(git rev-parse HEAD 2>/dev/null || true)"

# --- write POST evidence (after successful push) ---
TS2="$(date '+%Y-%m-%dT%H:%M:%S%z')"
if [[ -f "$CURRENT" ]]; then
  {
    echo ""
    echo "---"
    echo "[CHECKPOINT|$TS2]"
    echo "phase: post-push"
    echo "message: $MSG"
    echo "remote: ${REMOTE}"
    echo "branch: ${BRANCH}"
    echo "head_pushed: ${HEAD_AFTER_PUSH_1}"
  } >> "$CURRENT"
fi

if [[ -f "$CHANGELOG" ]]; then
  {
    echo ""
    echo "- Added: checkpoint(post-push) ts=$TS2 msg=\"$MSG\" branch=$BRANCH head_pushed=$HEAD_AFTER_PUSH_1 remote=\"$REMOTE\""
  } >> "$CHANGELOG"
fi

# --- commit #2: include POST evidence so repo is clean ---
git add -A
if git diff --cached --quiet; then
  echo "No staged changes; skip commit #2."
else
  git commit -m "chore: ${MSG} (post-push evidence)"
fi

# Push #2 (so evidence is also in remote)
git push -u origin "$BRANCH"

HEAD_FINAL="$(git rev-parse HEAD 2>/dev/null || true)"

echo "== OK =="
echo "branch: $BRANCH"
echo "head:   $HEAD_FINAL"
echo "MASTER:"
head -n 5 "$CORE/memory/briefs/MASTER_SYNC_PACKET.md" || true
