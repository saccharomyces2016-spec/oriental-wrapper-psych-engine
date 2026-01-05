#!/usr/bin/env bash
set -euo pipefail

# Locale and timestamp
export LANG=${LANG:-en_US.UTF-8}
export LC_ALL=${LC_ALL:-en_US.UTF-8}
TS="$(date '+%Y-%m-%dT%H:%M:%S%z')"

REPO_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine"
CORE="$REPO_ROOT/xuance-commander-core"
CURRENT="$CORE/memory/briefs/CURRENT.md"
CHANGELOG="$CORE/memory/changes/CHANGELOG.md"
STATE_FILE="$CORE/memory/briefs/_ANTI_DOUBLE_RUN_STATE.md"
MSG="${1:-MILESTONE: checkpoint}"
FORCE="${FORCE:-0}"

cd "$REPO_ROOT"

# Sanity
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "ERROR: not inside a git work tree: $REPO_ROOT"
  exit 1
}
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
REMOTE="$(git remote get-url origin 2>/dev/null || true)"
HEAD_PRE="$(git rev-parse HEAD 2>/dev/null || true)"

# Anti double-run safeguard (optional)
ANTI="$CORE/tools/anti_double_run.sh"
if [ -x "$ANTI" ]; then
  FP="PACK:${MSG}"
  "$ANTI" "$FP" "$STATE_FILE" "$FORCE"
fi

# Write evidence BEFORE commit/push
if [[ -f "$CURRENT" ]]; then
  {
    echo ""
    echo "---"
    echo "[MILESTONE|$TS]"
    echo ""
    echo "已完成："
    echo "- ✅ 雲端備份（commit + push）預備執行"
    echo "  - message: $MSG"
    echo "  - remote: ${REMOTE}"
    echo "  - branch: ${BRANCH}"
    echo "  - head(before): ${HEAD_PRE}"
  } >> "$CURRENT"
fi

if [[ -f "$CHANGELOG" ]]; then
  {
    echo ""
    echo "- Added: milestone checkpoint (pre-commit) staged (ts=$TS, msg=$MSG, branch=$BRANCH, head_before=$HEAD_PRE, remote=$REMOTE)"
  } >> "$CHANGELOG"
fi

# Rebuild MASTER (best effort)
if [[ -x "$CORE/tools/build_master_sync_packet_full.sh" ]]; then
  (cd "$CORE" && bash tools/build_master_sync_packet_full.sh >/dev/null)
elif [[ -x "$CORE/tools/build_master_sync_packet.sh" ]]; then
  (cd "$CORE" && bash tools/build_master_sync_packet.sh >/dev/null)
fi

# Commit if needed
git add -A
if git diff --cached --quiet; then
  echo "No staged changes; skip commit."
else
  git commit -m "chore: ${MSG}"
fi

# Push
git push -u origin "$BRANCH"

HEADSHA="$(git rev-parse HEAD || true)"

# Append final success evidence
if [[ -f "$CURRENT" ]]; then
  {
    echo ""
    echo "---"
    echo "[MILESTONE|$TS]"
    echo ""
    echo "已完成："
    echo "- ✅ 雲端備份（commit + push）完成"
    echo "  - message: $MSG"
    echo "  - remote: ${REMOTE}"
    echo "  - branch: ${BRANCH}"
    echo "  - head: ${HEADSHA}"
  } >> "$CURRENT"
fi

if [[ -f "$CHANGELOG" ]]; then
  {
    echo ""
    echo "- Added: milestone checkpoint pushed (ts=$TS, msg=$MSG, branch=$BRANCH, head=$HEADSHA, remote=$REMOTE)"
  } >> "$CHANGELOG"
fi

echo "== OK =="
echo "branch: $BRANCH"
echo "head:   $HEADSHA"
echo "MASTER:"
head -n 5 "$CORE/memory/briefs/MASTER_SYNC_PACKET.md" || true
