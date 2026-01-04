#!/usr/bin/env bash
set -euo pipefail

# Root wrapper (single-entry command)
# Always prefer xuance-commander-core as the SSOT when present.
#
# Usage:
#   bash tools/export_chat_packet.sh [PROJECT_ROOT]
#
# Output:
#   ./out/CHAT_PACKET.md  (always)
#
# Behavior:
# - If ./xuance-commander-core exists and looks like the real project root,
#   delegate to its tools/export_chat_packet.sh, then copy output back to ./out.
# - Otherwise, fall back to legacy behavior (treat PROJECT_ROOT as SSOT root).

ROOT="${1:-.}"
OUTDIR="$ROOT/out"
OUT="$OUTDIR/CHAT_PACKET.md"

CORE="$ROOT/xuance-commander-core"
CORE_EXPORT="$CORE/tools/export_chat_packet.sh"
CORE_OUT="$CORE/out/CHAT_PACKET.md"

mkdir -p "$OUTDIR"

looks_like_core_root() {
  [[ -d "$CORE" ]] \
  && [[ -f "$CORE/charter/CHARTER.md" ]] \
  && [[ -f "$CORE/roadmap/ROADMAP.md" ]] \
  && [[ -f "$CORE/memory/briefs/CURRENT.md" ]] \
  && [[ -f "$CORE/docs/governance/TEXT_ONLY_EXECUTION_RULES.md" ]]
}

legacy_export() {
  # --- legacy logic (kept for safety) ---
  PROJ="$ROOT"
  OUTDIR="$PROJ/out"
  OUT="$OUTDIR/CHAT_PACKET.md"

  MAX_KB="${MAX_KB:-350}"
  MAX_TREE_LINES="${MAX_TREE_LINES:-350}"
  MAX_MANIFESTS="${MAX_MANIFESTS:-20}"
  MAX_COMPILED="${MAX_COMPILED:-20}"

  mkdir -p "$OUTDIR"

  cat_if_exists() {
    local p="$1"
    if [[ -f "$p" ]]; then
      echo "## FILE: $p"
      echo
      cat "$p"
      echo
    else
      echo "## FILE: $p"
      echo
      echo "(missing)"
      echo
    fi
  }

  latest_adr() {
    local dir="$PROJ/docs/adr"
    if [[ -d "$dir" ]]; then
      ls -1t "$dir"/ADR_*.md 2>/dev/null | head -n 1 || true
    fi
  }

  emit_tree() {
    echo "## REPO TREE (limited)"
    echo
    if command -v find >/dev/null 2>&1; then
      find "$PROJ" -maxdepth 4 \
        -not -path "*/.git/*" \
        -not -path "*/node_modules/*" \
        -not -path "*/dist/*" \
        -not -path "*/build/*" \
        -not -path "*/out/*" \
        -print | sed "s#^$PROJ/##" | head -n "$MAX_TREE_LINES"
    else
      echo "(find not available)"
    fi
    echo
  }

  emit_domain_lists() {
    echo "## DOMAIN SUMMARY"
    echo
    if [[ -d "$PROJ/domain/manifests" ]]; then
      echo "- manifests:"
      ls -1 "$PROJ/domain/manifests"/*.json 2>/dev/null | sed "s#^$PROJ/##" | head -n "$MAX_MANIFESTS" || true
    else
      echo "- manifests: (none)"
    fi
    echo
    if [[ -d "$PROJ/domain/compiled" ]]; then
      echo "- compiled:"
      ls -1 "$PROJ/domain/compiled"/*.json 2>/dev/null | sed "s#^$PROJ/##" | head -n "$MAX_COMPILED" || true
    else
      echo "- compiled: (none)"
    fi
    echo
  }

  emit_git_summary() {
    echo "## GIT SUMMARY (if available)"
    echo
    if [[ -d "$PROJ/.git" ]] && command -v git >/dev/null 2>&1; then
      (cd "$PROJ" && git status --porcelain=v1 || true)
      echo
      echo "- last 5 commits:"
      (cd "$PROJ" && git log -n 5 --oneline || true)
    else
      echo "(no git repo detected)"
    fi
    echo
  }

  if [[ -x "$PROJ/tools/preflight.sh" ]]; then
    bash "$PROJ/tools/preflight.sh" "$PROJ" >/dev/null || true
  fi

  ADR="$(latest_adr)"

  {
    echo "# CHAT_PACKET (paste this whole file into XuanCe Commander)"
    echo
    echo "Generated: $(date -Iseconds)"
    echo
    echo "## WHAT THIS PACKET IS"
    echo "- Minimal context bundle to keep Commander aligned to TEXT-only goals/progress."
    echo "- If Commander needs more code, it must request specific paths + reasons."
    echo
    cat_if_exists "$PROJ/memory/briefs/COMMAND_BRIEF.md"
    cat_if_exists "$PROJ/memory/changes/CHANGELOG.md"
    if [[ -n "$ADR" ]]; then
      cat_if_exists "$ADR"
    else
      echo "## FILE: docs/adr/(latest)"
      echo
      echo "(no ADR found)"
      echo
    fi
    emit_domain_lists
    emit_git_summary
    emit_tree
    cat_if_exists "$PROJ/docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md"
  } > "$OUT"

  KB="$(du -k "$OUT" | awk '{print $1}')"
  if [[ "$KB" -gt "$MAX_KB" ]]; then
    {
      echo
      echo "## SIZE WARNING"
      echo "This packet is ${KB}KB > ${MAX_KB}KB."
      echo "Action: reduce tree depth / limits via env vars:"
      echo "  MAX_KB=250 MAX_TREE_LINES=200 MAX_MANIFESTS=10 MAX_COMPILED=10 bash tools/export_chat_packet.sh ."
      echo
    } >> "$OUT"
  fi

  echo "✅ Generated: $OUT  (${KB}KB)"
}

if looks_like_core_root; then
  # Delegate to core SSOT exporter
  bash "$CORE_EXPORT" "$CORE" >/dev/null
  if [[ -f "$CORE_OUT" ]]; then
    cp "$CORE_OUT" "$OUT"
    KB="$(du -k "$OUT" | awk '{print $1}')"
    echo "✅ Generated (delegated to xuance-commander-core): $OUT  (${KB}KB)"
  else
    echo "ERROR: core exporter did not produce: $CORE_OUT"
    exit 1
  fi
else
  # Fall back to old behavior
  legacy_export
fi
