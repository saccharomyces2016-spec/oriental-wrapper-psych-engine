#!/usr/bin/env bash
set -eo pipefail

REPO_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine"
CORE="$REPO_ROOT/xuance-commander-core"
CURRENT="$CORE/memory/briefs/CURRENT.md"
CHANGELOG="$CORE/memory/changes/CHANGELOG.md"

MSG="${1:-MILESTONE: checkpoint}"
TS="$(date "+%Y-%m-%dT%H:%M:%S%z")"

cd "$REPO_ROOT"

# --- sanity ---
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "ERROR: not inside a git work tree: $REPO_ROOT"
  exit 1
}

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
REMOTE="$(git remote get-url origin 2>/dev/null || true)"

# --- commit (only if needed) ---
git add -A
if git diff --cached --quiet; then
  echo "No staged changes; skip commit."
else
  git commit -m "chore: ${MSG}"
fi

# --- push (cloud backup) ---
# If auth/network fails, stop here so we do NOT claim cloud backup succeeded.
git push -u origin "$BRANCH"

HEADSHA="$(git rev-parse HEAD || true)"

# --- write evidence into texts ---
if [[ -f "$CURRENT" ]]; then
  {
    echo ""
    echo "---"
    echo "【里程碑備份｜$TS】"
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

# --- rebuild MASTER ---
if [[ -x "$CORE/tools/build_master_sync_packet_full.sh" ]]; then
  (cd "$CORE" && bash tools/build_master_sync_packet_full.sh >/dev/null)
elif [[ -x "$CORE/tools/build_master_sync_packet.sh" ]]; then
  (cd "$CORE" && bash tools/build_master_sync_packet.sh >/dev/null)
else
  echo "WARN: build_master_sync_packet script not found."
fi

echo "== OK =="
echo "branch: $BRANCH"
echo "head:   $HEADSHA"
echo "MASTER:"
head -n 5 "$CORE/memory/briefs/MASTER_SYNC_PACKET.md" || true
