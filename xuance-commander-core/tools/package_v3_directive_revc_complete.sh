#!/bin/bash
# ENGINE_CORE_LOGIC_V3 DIRECTIVE REV.C+ 完整檔案打包腳本
# 用途：一次性打包所有相關檔案到一個資料夾，方便傳送

set -e

# 設定變數
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_DIR="$PROJECT_ROOT/tmp/v3_directive_revc_complete_package"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="ENGINE_CORE_LOGIC_V3_DIRECTIVE_REVC_COMPLETE_${TIMESTAMP}"

echo "📦 開始打包 ENGINE_CORE_LOGIC_V3 DIRECTIVE REV.C+ 完整檔案..."

# 建立輸出資料夾
mkdir -p "$OUTPUT_DIR/$PACKAGE_NAME"

# 建立檔案清單
cat > "$OUTPUT_DIR/$PACKAGE_NAME/README.md" <<'EOF'
# ENGINE_CORE_LOGIC_V3 DIRECTIVE REV.C+ 完整檔案包

**打包日期**：自動生成
**目的**：一次性傳送所有 ENGINE_CORE_LOGIC_V3 DIRECTIVE REV.C+ 相關檔案

## 📋 檔案清單

### 核心檔案（必讀）
1. **DIRECTIVE-2026-01-12-02-REV.C+.md** - 最終技術裁示（REV.C+，工程定錨級）
2. **DIRECTIVE-2026-01-12-02-REV.B.md** - 前版技術裁示（參考）
3. **ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md** - 追問包（已解決）

### 背景資料（建議讀）
4. **ADR_0005_vector_state_scoring_engine.md** - 架構決策文件（ADR）
5. **ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md** - ADR 追問包
6. **ENGINE_CORE_LOGIC_MASTER_V3.md** - V3 規格文件
7. **ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md** - V3 審核報告

### 相關系統文件（參考）
8. **P0-4.5_FUNNEL_SYSTEM_DESIGN.md** - 分流系統設計（Priors 來源）
9. **R4_RISKCHAINS_STRUCTURAL_ASSETS.md** - 風險鏈結構（A/B Framework）
10. **result_presentation_design.v1.0.md** - 結果呈現設計（L1-L4 架構）
11. **question_design_guidelines.v1.0.md** - 題目設計指南
12. **score_facet.py** - 當前實作（需要升級）
13. **stress_recovery.scoring.v1.0.json** - 現有 Facet 範例

## 📖 閱讀順序建議

1. 先讀 **DIRECTIVE-2026-01-12-02-REV.C+.md**（最終技術裁示，工程定錨級）
2. 參考 **DIRECTIVE-2026-01-12-02-REV.B.md**（前版，了解演進）
3. 參考背景資料以理解完整上下文

---
EOF

# 複製核心檔案
echo "📄 複製核心檔案..."
cp "$PROJECT_ROOT/docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/01_DIRECTIVE-2026-01-12-02-REV.C+.md"

cp "$PROJECT_ROOT/docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/02_DIRECTIVE-2026-01-12-02-REV.B.md"

cp "$PROJECT_ROOT/docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/03_ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md"

# 複製背景資料
echo "📚 複製背景資料..."
cp "$PROJECT_ROOT/docs/adr/ADR_0005_vector_state_scoring_engine.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/04_ADR_0005_vector_state_scoring_engine.md"

cp "$PROJECT_ROOT/docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/05_ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md"

cp "$PROJECT_ROOT/specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/06_ENGINE_CORE_LOGIC_MASTER_V3.md"

cp "$PROJECT_ROOT/docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/07_ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md"

# 複製相關系統文件
echo "🔗 複製相關系統文件..."
cp "$PROJECT_ROOT/P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/08_P0-4.5_FUNNEL_SYSTEM_DESIGN.md"

cp "$PROJECT_ROOT/docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/09_R4_RISKCHAINS_STRUCTURAL_ASSETS.md"

cp "$PROJECT_ROOT/domain/knowledge_base/result_presentation_design.v1.0.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/10_result_presentation_design.v1.0.md"

cp "$PROJECT_ROOT/domain/knowledge_base/question_design_guidelines.v1.0.md" \
   "$OUTPUT_DIR/$PACKAGE_NAME/11_question_design_guidelines.v1.0.md"

cp "$PROJECT_ROOT/engine/score_facet.py" \
   "$OUTPUT_DIR/$PACKAGE_NAME/12_score_facet.py"

cp "$PROJECT_ROOT/domain/facets/stress_recovery.scoring.v1.0.json" \
   "$OUTPUT_DIR/$PACKAGE_NAME/13_stress_recovery.scoring.v1.0.json"

# 建立檔案索引
cat > "$OUTPUT_DIR/$PACKAGE_NAME/FILE_INDEX.txt" <<EOF
ENGINE_CORE_LOGIC_V3 DIRECTIVE REV.C+ 完整檔案包索引
===================================================

打包時間：$(date '+%Y-%m-%d %H:%M:%S')

檔案清單：
---------
01_DIRECTIVE-2026-01-12-02-REV.C+.md
  └─ 最終技術裁示（REV.C+，工程定錨級）- 主要內容

02_DIRECTIVE-2026-01-12-02-REV.B.md
  └─ 前版技術裁示（參考）

03_ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md
  └─ 追問包（已解決）

04_ADR_0005_vector_state_scoring_engine.md
  └─ 架構決策文件（ADR）- 背景資料

05_ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md
  └─ ADR 追問包（背景資料）

06_ENGINE_CORE_LOGIC_MASTER_V3.md
  └─ V3 規格文件（背景資料）

07_ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md
  └─ V3 審核報告（背景資料）

08_P0-4.5_FUNNEL_SYSTEM_DESIGN.md
  └─ 分流系統設計（Priors 來源）

09_R4_RISKCHAINS_STRUCTURAL_ASSETS.md
  └─ 風險鏈結構（A/B Framework）

10_result_presentation_design.v1.0.md
  └─ 結果呈現設計（L1-L4 架構）

11_question_design_guidelines.v1.0.md
  └─ 題目設計指南

12_score_facet.py
  └─ 當前實作（需要升級）

13_stress_recovery.scoring.v1.0.json
  └─ 現有 Facet 範例

建議閱讀順序：
-------------
1. 01_DIRECTIVE-2026-01-12-02-REV.C+.md（最終技術裁示，工程定錨級）
2. 02_DIRECTIVE-2026-01-12-02-REV.B.md（前版，了解演進）
3. 其他背景資料可視需要參考

EOF

# 建立 ZIP 壓縮檔
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
