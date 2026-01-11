#!/usr/bin/env bash
set -euo pipefail

CORE="xuance-commander-core"
HC_ROOT="$CORE/tmp/health_check"
TS="$(date +%Y%m%d_%H%M%S)"
OUT_DIR="$HC_ROOT/HEALTH_CHECK_${TS}"

mkdir -p "$OUT_DIR"

# --- helpers ---
write_kv() { printf "%s: %s\n" "$1" "$2" >> "$OUT_DIR/summary.md"; }

# -----------------------------------------
# Scan 1) Duplicate basenames (tracked files)
# -----------------------------------------
git ls-files \
  | awk -F/ '{print $NF}' \
  | sort \
  | uniq -d \
  > "$OUT_DIR/duplicate_basenames.txt" || true

# -----------------------------------------
# Scan 2) Canon path violations (common)
# - forbid repo-root ./docs , ./tmp (non-core), etc.
# - allow legacy/
# -----------------------------------------
(
  cd "$CORE" >/dev/null 2>&1 || exit 1
  # find top-level offenders outside core context (run from repo root)
) || true

# repo-root checks (must be run from repo root)
{
  # Canon expectation:
  # - governance/docs live under xuance-commander-core/
  # - tmp lives under xuance-commander-core/
  # Flag: repo-root ./docs or ./tmp directories
  if [ -d "./docs" ]; then echo "./docs"; fi
  if [ -d "./tmp" ]; then echo "./tmp"; fi

  # Flag nested backup folders that accidentally contain ./docs or ./tmp
  find . -type d -maxdepth 6 \
    -not -path "*/.git/*" \
    -not -path "*/xuance-commander-core/docs/*" \
    -not -path "*/xuance-commander-core/tmp/*" \
    -not -path "*/xuance-commander-core/*" \
    2>/dev/null | grep -E '/(docs|tmp)$' || true

  # Flag any docs/governance outside core (except legacy)
  find . -type d -path "*/docs/governance" \
    -not -path "./xuance-commander-core/docs/governance" \
    -not -path "*/legacy/*" \
    -not -path "*/.git/*" \
    2>/dev/null || true
} | sed '/^$/d' | sort -u > "$OUT_DIR/canon_path_violations.txt" || true

# -----------------------------------------
# Scan 3) Shadow / relative path refs in md (tracked)
# Look for out/ tmp/ logs/ usage that may be ambiguous
# Exclude: rule files that explain the rule (ABSOLUTE_REFERENCE_RULE, GLOBAL_PATH_CANON, etc.)
# -----------------------------------------
git ls-files "*.md" \
  | grep -vE "(ABSOLUTE_REFERENCE_RULE|GLOBAL_PATH_CANON|SINGLE_SOURCE_RULES|SHADOW_PATH_REGISTRY|legacy)" \
  | xargs grep -nE "(^|[^a-zA-Z0-9_])(out/|tmp/|logs/)" 2>/dev/null \
  > "$OUT_DIR/shadow_refs.txt" || true

# -----------------------------------------
# Scan 4) Unindexed governance files
# Compare: files under core/docs/governance vs entries in GOVERNANCE_INDEX.md
# -----------------------------------------
GOV_DIR="$CORE/docs/governance"
INDEX_FILE="$GOV_DIR/GOVERNANCE_INDEX.md"

if [ -f "$INDEX_FILE" ]; then
  ls -1 "$GOV_DIR"/*.md 2>/dev/null \
    | awk -F/ '{print $NF}' \
    | sort -u \
    > "$OUT_DIR/gov_files.txt" || true

  # Extract filenames from index (handle various formats: - FILENAME.md, FILENAME.md, etc.)
  # Match any .md filename that starts with uppercase letter
  grep -oE "[A-Z][A-Z0-9_.-]*\.md" "$INDEX_FILE" \
    | sort -u \
    > "$OUT_DIR/gov_index_refs.txt" || true

  comm -23 "$OUT_DIR/gov_files.txt" "$OUT_DIR/gov_index_refs.txt" \
    > "$OUT_DIR/unindexed_governance.txt" || true
else
  echo "[WARN] Missing GOVERNANCE_INDEX.md at $INDEX_FILE" > "$OUT_DIR/unindexed_governance.txt"
fi

# -----------------------------------------
# Scan 5) Single-source violations (COMMON_PACKET.md baseline)
# Note: advisor_packs/*/COMMON_PACKET.md are allowed (historical packs)
# -----------------------------------------
git ls-files | grep -E "(^|/)COMMON_PACKET\.md$" \
  | grep -v "/advisor_packs/" \
  > "$OUT_DIR/common_packet_locations.txt" || true
COMMON_COUNT="$(wc -l < "$OUT_DIR/common_packet_locations.txt" | tr -d ' ')"
if [ "${COMMON_COUNT:-0}" -gt 1 ]; then
  printf "COMMON_PACKET.md appears %s times (excluding advisor_packs)\n" "$COMMON_COUNT" > "$OUT_DIR/single_source_violations.txt"
  cat "$OUT_DIR/common_packet_locations.txt" >> "$OUT_DIR/single_source_violations.txt"
else
  echo "OK" > "$OUT_DIR/single_source_violations.txt"
fi

# -----------------------------------------
# Summary
# -----------------------------------------
DUP_CNT="$(wc -l < "$OUT_DIR/duplicate_basenames.txt" | tr -d ' ' || echo 0)"
CANON_CNT="$(wc -l < "$OUT_DIR/canon_path_violations.txt" | tr -d ' ' || echo 0)"
SHADOW_CNT="$(wc -l < "$OUT_DIR/shadow_refs.txt" | tr -d ' ' || echo 0)"
UNIDX_CNT="$(wc -l < "$OUT_DIR/unindexed_governance.txt" | tr -d ' ' || echo 0)"
SSV_OK="$(head -1 "$OUT_DIR/single_source_violations.txt" || true)"

cat > "$OUT_DIR/summary.md" <<SUMMARY
# HEALTH_CHECK Summary
timestamp: ${TS}
outDir: ${OUT_DIR}

counts:
  duplicate_basenames: ${DUP_CNT}
  canon_path_violations: ${CANON_CNT}
  shadow_refs: ${SHADOW_CNT}
  unindexed_governance: ${UNIDX_CNT}

single_source:
  COMMON_PACKET: ${SSV_OK}
SUMMARY

cat > "$HC_ROOT/LATEST_HEALTH_CHECK.md" <<LATEST
# LATEST_HEALTH_CHECK
updatedAt: ${TS}
path: ${OUT_DIR}
SUMMARY
LATEST

# -----------------------------------------
# Scan 6) Update 專案資料夾說明.md (Human-Readable Folder Guide)
# -----------------------------------------
GUIDE_FILE="$CORE/專案資料夾說明.md"
TIMESTAMP=$(date '+%Y-%m-%d')

if [ -f "$GUIDE_FILE" ]; then
  # Update last updated date in guide file
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/最後更新日期.*/最後更新日期：$TIMESTAMP/" "$GUIDE_FILE" 2>/dev/null || true
  else
    # Linux
    sed -i "s/最後更新日期.*/最後更新日期：$TIMESTAMP/" "$GUIDE_FILE" 2>/dev/null || true
  fi
  echo "OK: updated 專案資料夾說明.md timestamp to $TIMESTAMP" >> "$OUT_DIR/summary.md"
else
  echo "WARN: 專案資料夾說明.md not found at $GUIDE_FILE" >> "$OUT_DIR/summary.md"
fi

echo "OK: report=$OUT_DIR"
echo "OK: latest=$HC_ROOT/LATEST_HEALTH_CHECK.md"
if [ -f "$GUIDE_FILE" ]; then
  echo "OK: updated 專案資料夾說明.md timestamp"
fi
echo "---"
sed -n '1,120p' "$OUT_DIR/summary.md"
