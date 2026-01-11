#!/usr/bin/env bash
# 更新「專案資料夾說明.md」的工具腳本
# 用途：自動檢查並更新資料夾說明文件

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GUIDE_FILE="$ROOT/專案資料夾說明.md"
TIMESTAMP=$(date '+%Y-%m-%d')

echo "=== 更新專案資料夾說明 ==="
echo ""

# 檢查主要資料夾是否存在
MAJOR_FOLDERS=(
  "docs"
  "domain"
  "memory"
  "P0-3"
  "P0-4"
  "P0-5"
  "tools"
  "tmp"
  "out"
  "logs"
  "charter"
  "roadmap"
  "FULL"
)

echo "檢查主要資料夾..."
for folder in "${MAJOR_FOLDERS[@]}"; do
  if [ -d "$ROOT/$folder" ]; then
    echo "  ✅ $folder/ 存在"
  else
    echo "  ⚠️  $folder/ 不存在（可能需要更新說明文件）"
  fi
done

echo ""
echo "更新說明文件的最後更新日期..."
if [ -f "$GUIDE_FILE" ]; then
  # 更新最後更新日期
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/最後更新日期.*/最後更新日期：$TIMESTAMP/" "$GUIDE_FILE"
  else
    # Linux
    sed -i "s/最後更新日期.*/最後更新日期：$TIMESTAMP/" "$GUIDE_FILE"
  fi
  echo "  ✅ 已更新最後更新日期為：$TIMESTAMP"
else
  echo "  ⚠️  說明文件不存在：$GUIDE_FILE"
fi

echo ""
echo "=== 更新完成 ==="
echo ""
echo "說明文件位置：$GUIDE_FILE"
echo "建議：定期執行此腳本以確保說明文件與實際資料夾結構同步"



