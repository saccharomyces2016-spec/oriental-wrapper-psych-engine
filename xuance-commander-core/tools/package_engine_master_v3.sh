#!/bin/bash
# ENGINE_CORE_LOGIC_MASTER_V3 檔案打包腳本
# 用途：一次性打包所有相關檔案到一個資料夾，方便傳送

set -e

# 設定變數
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_DIR="$PROJECT_ROOT/tmp/engine_master_v3_package"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="ENGINE_CORE_LOGIC_MASTER_V3_PACKAGE_${TIMESTAMP}"

echo "📦 開始打包 ENGINE_CORE_LOGIC_MASTER_V3 檔案..."

# 建立輸出資料夾
mkdir -p "$OUTPUT_DIR/$PACKAGE_NAME"

# 建立檔案清單
cat > "$OUTPUT_DIR/$PACKAGE_NAME/README.md" <<'EOF'
# ENGINE_CORE_LOGIC_MASTER_V3 完整檔案包

**打包日期**：自動生成
**目的**：一次性傳送所有 ENGINE_CORE_LOGIC_MASTER_V3 相關檔案

## 📋 檔案清單

### 核心檔案（必讀）
1. **ENGINE_CORE_LOGIC_MASTER_V3.md** - 主要規格文件
2. **ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md** - 審核報告
3. **ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md** - 追問包

### 背景資料（建議讀）
4. **ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md** - 完整背景資料
5. **CHARTER.md** - 專案憲章
6. **P0-4.5_FUNNEL_SYSTEM_DESIGN.md** - 分流系統設計
7. **R4_RISKCHAINS_STRUCTURAL_ASSETS.md** - 風險鏈結構
8. **score_facet.py** - 當前實作

## 📖 閱讀順序建議

1. 先讀 **ENGINE_CORE_LOGIC_MASTER_V3.md**（主要規格）
2. 再讀 **ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md**（理解整合狀態）
3. 最後讀 **ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md**（待確認項目）

背景資料可視需要參考。

---
EOF

# 複製核心檔案
echo "📄 複製核心檔案..."
cp "$PROJECT_ROOT/specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/01_ENGINE_CORE_LOGIC_MASTER_V3.md"

cp "$PROJECT_ROOT/docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/02_ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md"

cp "$PROJECT_ROOT/docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/03_ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md"

# 複製背景資料
echo "📚 複製背景資料..."
cp "$PROJECT_ROOT/docs/task_packets/advisor/ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/04_ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md"

cp "$PROJECT_ROOT/charter/CHARTER.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/05_CHARTER.md"

cp "$PROJECT_ROOT/P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/06_P0-4.5_FUNNEL_SYSTEM_DESIGN.md"

cp "$PROJECT_ROOT/docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/07_R4_RISKCHAINS_STRUCTURAL_ASSETS.md"

cp "$PROJECT_ROOT/engine/score_facet.py" \
   "$OUTPUT_DIR/$PACKAGE_NAME/08_score_facet.py"

# 建立檔案索引
cat > "$OUTPUT_DIR/$PACKAGE_NAME/FILE_INDEX.txt" <<EOF
ENGINE_CORE_LOGIC_MASTER_V3 檔案包索引
=====================================

打包時間：$(date '+%Y-%m-%d %H:%M:%S')

檔案清單：
---------
01_ENGINE_CORE_LOGIC_MASTER_V3.md
  └─ 主要規格文件（主要內容）

02_ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md
  └─ 審核報告（理解整合狀態）

03_ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md
  └─ 追問包（待確認項目）

04_ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md
  └─ 完整背景資料任務包

05_CHARTER.md
  └─ 專案憲章（終極目標）

06_P0-4.5_FUNNEL_SYSTEM_DESIGN.md
  └─ 分流系統設計（Context Schema 來源）

07_R4_RISKCHAINS_STRUCTURAL_ASSETS.md
  └─ 風險鏈結構（現有 A/B Framework）

08_score_facet.py
  └─ 當前實作（weighted_sum 模型）

建議閱讀順序：
-------------
1. 01_ENGINE_CORE_LOGIC_MASTER_V3.md（主要規格）
2. 02_ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md（整合狀態）
3. 03_ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md（待確認項目）

背景資料可視需要參考。

EOF

# 建立 ZIP 壓縮檔（可選）
echo "📦 建立 ZIP 壓縮檔..."
cd "$OUTPUT_DIR"
zip -r "${PACKAGE_NAME}.zip" "$PACKAGE_NAME" > /dev/null

# 輸出結果
echo ""
echo "✅ 打包完成！"
echo ""
echo "📁 檔案位置："
echo "   資料夾：$OUTPUT_DIR/$PACKAGE_NAME"
echo "   ZIP 檔：$OUTPUT_DIR/${PACKAGE_NAME}.zip"
echo ""
echo "📋 包含檔案："
ls -1 "$OUTPUT_DIR/$PACKAGE_NAME" | grep -v "^README.md$" | grep -v "^FILE_INDEX.txt$" | nl
echo ""
echo "🚀 傳送方式："
echo "   1. 直接傳送整個資料夾：$OUTPUT_DIR/$PACKAGE_NAME"
echo "   2. 或傳送 ZIP 檔：$OUTPUT_DIR/${PACKAGE_NAME}.zip"
echo ""
