#!/bin/bash
# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3 任務包打包腳本
# 審核日期：2026-01-12

set -e

PROJECT_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core"
cd "$PROJECT_ROOT"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_PACKAGE_${TIMESTAMP}"
OUTPUT_DIR="tmp/${PACKAGE_NAME}"
ZIP_NAME="tmp/${PACKAGE_NAME}.zip"

mkdir -p "$OUTPUT_DIR"
echo "📦 開始打包 ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3 任務包..."

# 1. 審核報告和追問包
cp docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_AUDIT.md "$OUTPUT_DIR/"
cp docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_QUESTIONS.md "$OUTPUT_DIR/"

# 2. 原始文件（GPT V3 處理後版本）
cp docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V3.md "$OUTPUT_DIR/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md"

# 3. 核心規格文件
cp specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md "$OUTPUT_DIR/"
cp docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md "$OUTPUT_DIR/"
cp docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md "$OUTPUT_DIR/"
cp docs/adr/ADR_0005_vector_state_scoring_engine.md "$OUTPUT_DIR/"
cp docs/adr/ADR_0001_externalize_domain_and_version_schema.md "$OUTPUT_DIR/"

# 4. 分流系統設計
mkdir -p "$OUTPUT_DIR/P0-4.5"
cp P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md "$OUTPUT_DIR/P0-4.5/"

# 5. UI 架構設計
mkdir -p "$OUTPUT_DIR/specs/ui/architecture"
cp specs/ui/architecture/P0-5_UI_ARCHITECTURE.md "$OUTPUT_DIR/specs/ui/architecture/"

# 6. 前後端對齊規範
mkdir -p "$OUTPUT_DIR/specs/integration/ui_engine"
cp specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md "$OUTPUT_DIR/specs/integration/ui_engine/"

# 7. 題目設計指南
mkdir -p "$OUTPUT_DIR/domain/knowledge_base"
cp domain/knowledge_base/question_design_guidelines.v1.0.md "$OUTPUT_DIR/domain/knowledge_base/"

# 8. Domain 配置文件
mkdir -p "$OUTPUT_DIR/domain/domains"
cp domain/domains/bagua.domain_map.v1.0.json "$OUTPUT_DIR/domain/domains/" 2>/dev/null || echo "⚠️  bagua.domain_map.v1.0.json 不存在，跳過"

# 9. Schema 文件
mkdir -p "$OUTPUT_DIR/schemas"
cp schemas/compiled_facet.schema.json "$OUTPUT_DIR/schemas/"
cp schemas/domain_manifest.schema.json "$OUTPUT_DIR/schemas/"

# 10. 專案憲章
mkdir -p "$OUTPUT_DIR/charter"
cp charter/CHARTER.md "$OUTPUT_DIR/charter/"

# 11. 實作文件（V3 引擎）
mkdir -p "$OUTPUT_DIR/engine"
cp engine/score_facet.py "$OUTPUT_DIR/engine/"
cp engine/cascade_calculator.py "$OUTPUT_DIR/engine/"
cp engine/narrative_guard.py "$OUTPUT_DIR/engine/"

# 12. 測試文件
mkdir -p "$OUTPUT_DIR/tests"
cp tests/test_v3_scoring.py "$OUTPUT_DIR/tests/"

# 13. Cascade 覆寫表
mkdir -p "$OUTPUT_DIR/domain/cascade"
cp domain/cascade/cascade_overrides.v1.0.json "$OUTPUT_DIR/domain/cascade/"

# 14. 之前的審核報告（作為參考）
cp docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_AUDIT.md "$OUTPUT_DIR/" 2>/dev/null || echo "⚠️  V2_AUDIT 不存在，跳過"
cp docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_QUESTIONS.md "$OUTPUT_DIR/" 2>/dev/null || echo "⚠️  V2_QUESTIONS 不存在，跳過"

# 15. 建立 README
cat > "$OUTPUT_DIR/README.md" << 'EOF'
# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3 任務包

**建立日期**：2026-01-12  
**狀態**：OPEN（等待裁示）  
**目標**：審核 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`（GPT V3 處理後版本），確認是否符合任務需求

---

## 📋 使用指南

### 1. 必須閱讀的文件（SSOT）

#### 審核報告
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_AUDIT.md` - 審核報告 ⭐⭐⭐

#### 追問包
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_QUESTIONS.md` - 追問包 ⭐⭐⭐

#### 原始文件
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` - GPT V3 處理後的原始文件

#### 核心規格文件
- `ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格
- `DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示（工程定錨級）
- `DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
- `ADR_0005_vector_state_scoring_engine.md` - 架構決策文件
- `ADR_0001_externalize_domain_and_version_schema.md` - Domain 外置化決策

#### 分流系統設計
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計

#### UI 架構設計
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` - UI 架構設計

#### 前後端對齊規範
- `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - 前後端計算對齊規範

#### 題目設計指南
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

#### Domain 配置文件範例
- `domain/domains/bagua.domain_map.v1.0.json` - Domain 配置文件範例

#### Schema 文件
- `schemas/compiled_facet.schema.json` - Compiled Facet Schema
- `schemas/domain_manifest.schema.json` - Domain Manifest Schema

#### 專案憲章
- `charter/CHARTER.md` - 專案憲章

#### 實作文件
- `engine/score_facet.py` - V3 引擎實作
- `engine/cascade_calculator.py` - Cascade 實作
- `engine/narrative_guard.py` - 詞彙治理實作
- `tests/test_v3_scoring.py` - V3 測試

#### Cascade 覆寫表
- `domain/cascade/cascade_overrides.v1.0.json` - Cascade 覆寫表範例

---

## 🎯 關鍵問題

### 必須裁示的問題（PRIORITY: HIGH）

1. ⭐⭐⭐ **缺失 Priors 的 Rigidity 預設值**：應該是 0 還是 0.50？
   - DIRECTIVE REV.B：0.0
   - CONSTITUTION Section 7.2：0.50
   - engine/score_facet.py：0.5（預設參數）

### 建議裁示的問題（PRIORITY: MEDIUM）

2. ⭐⭐ **Domain Schema 定義**：是否需要建立完整的 Domain Schema？
3. ⭐⭐ **世界級增強建議的實作細節**：是否需要建立詳細的實作規格？

---

## ✅ 可直接整合的部分

以下部分已經過審核，可以直接整合到現有文件：

1. ✅ **八大領域標準映射** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 0.3（已更新）
2. ✅ **V3 引擎實作** → `engine/score_facet.py`（可直接使用）
3. ✅ **V3 測試** → `tests/test_v3_scoring.py`（可直接使用）
4. ✅ **跨域擴散引擎** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.2（已更新）
5. ✅ **Cascade 實作** → `engine/cascade_calculator.py`（可直接使用）
6. ✅ **Cascade 覆寫表** → `domain/cascade/cascade_overrides.v1.0.json`（可直接使用）
7. ✅ **詞彙治理** → `engine/narrative_guard.py`（可直接使用）
8. ✅ **Schema 更新** → 可直接使用更新後的 schema

---

**建立日期**：2026-01-12  
**狀態**：OPEN  
**等待裁示**：使用者對追問問題的回應
EOF

# 打包
cd tmp
zip -r "${PACKAGE_NAME}.zip" "${PACKAGE_NAME}" > /dev/null
cd "$PROJECT_ROOT"

echo "✅ 打包完成：${ZIP_NAME}"
echo "📦 檔案大小：$(ls -lh ${ZIP_NAME} | awk '{print $5}')"
echo ""
echo "📋 包含文件："
find "$OUTPUT_DIR" -type f | wc -l | xargs echo "   - 總共"
echo ""
echo "🎯 關鍵文件："
echo "   - ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_AUDIT.md"
echo "   - ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_QUESTIONS.md"
echo "   - ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md"
echo "   - engine/score_facet.py（V3 實作）"
echo "   - engine/cascade_calculator.py"
echo "   - tests/test_v3_scoring.py"
