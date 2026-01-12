#!/bin/bash
# ENGINE_CORE_OMNISCIENT_MATRIX 任務包打包腳本
# 用途：打包審核報告、追問包、背景資料，供顧問團隊使用

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="ENGINE_CORE_OMNISCIENT_MATRIX_PACKAGE"
OUTPUT_DIR="/tmp/${PACKAGE_NAME}_${TIMESTAMP}"
ZIP_NAME="${PACKAGE_NAME}_${TIMESTAMP}.zip"

echo "📦 開始打包 ENGINE_CORE_OMNISCIENT_MATRIX 任務包..."

# 建立輸出目錄
mkdir -p "${OUTPUT_DIR}"

# 專案根目錄
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${PROJECT_ROOT}"

echo "📋 複製審核報告和追問包..."

# 1. 審核報告
mkdir -p "${OUTPUT_DIR}/docs/ops/analysis"
cp -v "docs/ops/analysis/ENGINE_CORE_OMNISCIENT_MATRIX_AUDIT.md" "${OUTPUT_DIR}/docs/ops/analysis/" 2>/dev/null || echo "⚠️  ENGINE_CORE_OMNISCIENT_MATRIX_AUDIT.md 不存在"

# 2. 追問包
mkdir -p "${OUTPUT_DIR}/docs/task_packets/advisor"
cp -v "docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_MATRIX_QUESTIONS.md" "${OUTPUT_DIR}/docs/task_packets/advisor/" 2>/dev/null || echo "⚠️  ENGINE_CORE_OMNISCIENT_MATRIX_QUESTIONS.md 不存在"

# 3. 原始文件（用戶提供的）
cp -v "/Users/yujunwei/Downloads/ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md" "${OUTPUT_DIR}/" 2>/dev/null || echo "⚠️  ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md 不存在"

echo "📋 複製核心規格文件..."

# 4. 核心規格文件
mkdir -p "${OUTPUT_DIR}/specs/engine/core"
cp -v "specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md" "${OUTPUT_DIR}/specs/engine/core/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_MASTER_V3.md 不存在"

# 5. 最終技術裁示
mkdir -p "${OUTPUT_DIR}/docs/directives"
cp -v "docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md" "${OUTPUT_DIR}/docs/directives/" 2>/dev/null || echo "⚠️  DIRECTIVE-2026-01-12-02-REV.C+.md 不存在"
cp -v "docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md" "${OUTPUT_DIR}/docs/directives/" 2>/dev/null || echo "⚠️  DIRECTIVE-2026-01-12-02-REV.B.md 不存在"

# 6. 架構決策文件
mkdir -p "${OUTPUT_DIR}/docs/adr"
cp -v "docs/adr/ADR_0005_vector_state_scoring_engine.md" "${OUTPUT_DIR}/docs/adr/" 2>/dev/null || echo "⚠️  ADR_0005_vector_state_scoring_engine.md 不存在"

echo "📋 複製分流系統設計文件..."

# 7. P0-4.5 分流系統設計
mkdir -p "${OUTPUT_DIR}/P0-4.5"
cp -v "P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md" "${OUTPUT_DIR}/P0-4.5/" 2>/dev/null || echo "⚠️  P0-4.5_FUNNEL_SYSTEM_DESIGN.md 不存在"

echo "📋 複製題目設計文件..."

# 8. 題目設計指南
mkdir -p "${OUTPUT_DIR}/domain/knowledge_base"
cp -v "domain/knowledge_base/question_design_guidelines.v1.0.md" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  question_design_guidelines.v1.0.md 不存在"

echo "📋 複製 UI 架構文件..."

# 9. UI 架構
mkdir -p "${OUTPUT_DIR}/specs/ui/architecture"
cp -v "specs/ui/architecture/P0-5_UI_ARCHITECTURE.md" "${OUTPUT_DIR}/specs/ui/architecture/" 2>/dev/null || echo "⚠️  P0-5_UI_ARCHITECTURE.md 不存在"

echo "📋 複製實作範例..."

# 10. 實作範例
mkdir -p "${OUTPUT_DIR}/engine"
cp -v "engine/score_facet.py" "${OUTPUT_DIR}/engine/" 2>/dev/null || echo "⚠️  score_facet.py 不存在"
cp -v "engine/root_element_mapper.py" "${OUTPUT_DIR}/engine/" 2>/dev/null || echo "⚠️  root_element_mapper.py 不存在"
cp -v "engine/collision_calculator.py" "${OUTPUT_DIR}/engine/" 2>/dev/null || echo "⚠️  collision_calculator.py 不存在"

mkdir -p "${OUTPUT_DIR}/domain/facets"
cp -v "domain/facets/stress_recovery.scoring.v1.0.json" "${OUTPUT_DIR}/domain/facets/" 2>/dev/null || echo "⚠️  stress_recovery.scoring.v1.0.json 不存在"

mkdir -p "${OUTPUT_DIR}/domain/questions"
cp -v "domain/questions/stress_recovery.questions.v1.0.json" "${OUTPUT_DIR}/domain/questions/" 2>/dev/null || echo "⚠️  stress_recovery.questions.v1.0.json 不存在"

echo "📋 複製專案憲章..."

# 11. 專案憲章
mkdir -p "${OUTPUT_DIR}/charter"
cp -v "charter/CHARTER.md" "${OUTPUT_DIR}/charter/" 2>/dev/null || echo "⚠️  CHARTER.md 不存在"

echo "📋 複製風險鏈結構文件..."

# 12. 風險鏈結構
mkdir -p "${OUTPUT_DIR}/docs/domain/advisory/R4"
cp -v "docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md" "${OUTPUT_DIR}/docs/domain/advisory/R4/" 2>/dev/null || echo "⚠️  R4_RISKCHAINS_STRUCTURAL_ASSETS.md 不存在"

echo "📋 複製詞彙管理文件..."

# 13. 詞彙管理
cp -v "domain/knowledge_base/vocabulary_metaphysical.v1.0.json" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  vocabulary_metaphysical.v1.0.json 不存在"
cp -v "domain/knowledge_base/forbidden_terms.v1.0.json" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  forbidden_terms.v1.0.json 不存在"

echo "📋 建立 README..."

# 14. 建立 README
cat > "${OUTPUT_DIR}/README.md" << 'EOF'
# ENGINE_CORE_OMNISCIENT_MATRIX 任務包

**建立日期**：2026-01-12  
**狀態**：OPEN（等待裁示）  
**目標**：審核 `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md`，確認是否符合任務需求

---

## 📋 使用指南

### 1. 必須閱讀的文件（SSOT）

#### 審核報告
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_MATRIX_AUDIT.md` - 審核報告 ⭐⭐⭐

#### 追問包
- `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_MATRIX_QUESTIONS.md` - 追問包 ⭐⭐⭐

#### 原始文件
- `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md` - 用戶提供的原始文件

#### 核心規格文件
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示（工程定錨級）
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
- `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策文件

#### 分流系統設計
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計

#### 題目設計
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

#### UI 架構
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` - UI 架構設計

#### 專案憲章
- `charter/CHARTER.md` - 專案憲章

---

### 2. 審核結果摘要

**整體評估**：⚠️ **部分合格，需要追問**

**合格部分**：
- ✅ 八大領域覆蓋方案
- ✅ P0-4.5 分流系統整合
- ✅ UI/Engine 契約

**需要追問的部分**：
- ⚠️ 題目數量規範（是否強制 8 題？）
- ⚠️ V3 引擎計算公式完整性（Rigidity、Volatility、Debug Payload）
- ⚠️ 跨域擴散引擎實作細節
- ⚠️ 使用者背景資料策略整合
- ⚠️ 向後相容性

---

### 3. 關鍵追問問題（5 個）

1. ⭐⭐⭐ **題目數量規範**：是否強制 8 題？還是允許 6-10 題？
2. ⭐⭐⭐ **V3 引擎計算公式**：是否採用 DIRECTIVE REV.B 的完整公式？
3. ⭐⭐ **Debug Payload**：是否需要包含完整的 `_meta` 欄位？
4. ⭐⭐ **跨域擴散引擎**：觸發條件、傳導矩陣、實作架構
5. ⭐⭐ **使用者背景資料**：Role Archetype 和出生年月日如何整合？

---

### 4. 建議的裁示選項

請參考 `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_MATRIX_QUESTIONS.md` 的「第三部分：建議的裁示選項」。

---

**建立日期**：2026-01-12  
**狀態**：OPEN（等待裁示）
EOF

echo "📦 建立 ZIP 檔案..."

# 建立 ZIP 檔案
cd /tmp
zip -r "${ZIP_NAME}" "${PACKAGE_NAME}_${TIMESTAMP}" > /dev/null

# 移動到專案目錄
mv "${ZIP_NAME}" "${PROJECT_ROOT}/tmp/"

echo ""
echo "✅ 打包完成！"
echo "📦 ZIP 檔案位置：${PROJECT_ROOT}/tmp/${ZIP_NAME}"
echo "📁 解壓縮目錄：${OUTPUT_DIR}"
echo ""
echo "📋 檔案清單："
find "${OUTPUT_DIR}" -type f | wc -l | xargs echo "   總共"
echo ""
