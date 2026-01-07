#!/usr/bin/env bash
set -euo pipefail

echo "=== Installing XuanCe Commander toolchain ==="

ROOT="${1:-.}"

# Core directories expected by the lightweight installer
mkdir -p "$ROOT/tools"
mkdir -p "$ROOT/memory/briefs"
mkdir -p "$ROOT/memory/changes"
mkdir -p "$ROOT/docs/adr"
mkdir -p "$ROOT/out"

# Helper to create a file only if it does not already exist
create_if_missing() {
  local path="$1"
  local content="$2"
  if [[ -f "$path" ]]; then
    echo "↺ Keep existing $path (not overwritten)"
  else
    echo "→ Creating $path"
    printf "%s" "$content" >"$path"
  fi
}

# Preflight script (kept if already present)
create_if_missing "$ROOT/tools/preflight.sh" "$(cat <<'EOS'
#!/usr/bin/env bash
set -euo pipefail

echo "=== XuanCe Commander Preflight ==="

mkdir -p memory/briefs

cat > memory/briefs/COMMAND_BRIEF.md <<'EOB'
# COMMAND_BRIEF

狀態：初始化階段

說明：
- 本檔案由 preflight.sh 自動產生
- 作為玄策指揮官的唯一主控簡報
- 所有主目標與主進度之後都必須寫在這裡

主目標：
- 建立可上線、可收費、可長期維護的互動式命理包裝心理分析網頁

目前階段：
- Phase 0：系統初始化與治理落地

下一步：
- 補齊第一個可運作的分析構面（facet）
EOB

touch memory/changes/CHANGELOG.md

echo "✅ COMMAND_BRIEF generated at memory/briefs/COMMAND_BRIEF.md"
EOS
)"
chmod +x "$ROOT/tools/preflight.sh"

# CHAT_PACKET exporter (kept if already present)
create_if_missing "$ROOT/tools/export_chat_packet.sh" "$(cat <<'EOS'
#!/usr/bin/env bash
set -euo pipefail

echo "=== Exporting CHAT_PACKET ==="

mkdir -p out

{
  echo "# CHAT_PACKET"
  echo
  echo "## COMMAND_BRIEF"
  if [ -f memory/briefs/COMMAND_BRIEF.md ]; then
    cat memory/briefs/COMMAND_BRIEF.md
  else
    echo "(COMMAND_BRIEF missing)"
  fi
  echo
  echo "## CHANGELOG"
  if [ -f memory/changes/CHANGELOG.md ]; then
    cat memory/changes/CHANGELOG.md
  else
    echo "(CHANGELOG missing)"
  fi
  echo
  echo "## ADR"
  ls docs/adr/ADR_*.md 2>/dev/null || echo "(no ADR yet)"
} > xuance-commander-core/out/CHAT_PACKET.md

echo "✅ CHAT_PACKET generated at xuance-commander-core/out/CHAT_PACKET.md"
EOS
)"
chmod +x "$ROOT/tools/export_chat_packet.sh"

echo "=== Installation complete ==="
echo "Next:"
echo "  1) bash tools/preflight.sh ."
echo "  2) bash tools/export_chat_packet.sh ."
