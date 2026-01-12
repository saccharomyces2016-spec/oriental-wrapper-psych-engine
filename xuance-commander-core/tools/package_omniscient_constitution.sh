#!/bin/bash
# ENGINE_CORE_OMNISCIENT_CONSTITUTION 任務包打包腳本
# 用途：打包審核報告、追問包、背景資料，供顧問團隊使用

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="ENGINE_CORE_OMNISCIENT_CONSTITUTION_PACKAGE"
OUTPUT_DIR="/tmp/${PACKAGE_NAME}_${TIMESTAMP}"
ZIP_NAME="${PACKAGE_NAME}_${TIMESTAMP}.zip"

echo "📦 開始打包 ENGINE_CORE_OMNISCIENT_CONSTITUTION 任務包..."

# 建立輸出目錄
mkdir -p "${OUTPUT_DIR}"

# 專案根目錄
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${PROJECT_ROOT}"

echo "📋 複製審核報告和追問包..."

# 1. 審核報告
mkdir -p "${OUTPUT_DIR}/docs/ops/analysis"
cp -v "docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_AUDIT.md" "${OUTPUT_DIR}/docs/ops/analysis/" 2>/dev/null || echo "⚠️  ENGINE_CORE_OMNISCIENT_CONSTITUTION_AUDIT.md 不存在"

# 2. 追問包
mkdir -p "${OUTPUT_DIR}/docs/task_packets/advisor"
cp -v "docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md" "${OUTPUT_DIR}/docs/task_packets/advisor/" 2>/dev/null || echo "⚠️  ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md 不存在"

# 3. 原始文件（用戶提供的）
cp -v "/Users/yujunwei/Downloads/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md" "${OUTPUT_DIR}/" 2>/dev/null || echo "⚠️  ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md 不存在"

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
cp -v "docs/adr/ADR_0001_externalize_domain_and_version_schema.md" "${OUTPUT_DIR}/docs/adr/" 2>/dev/null || echo "⚠️  ADR_0001_externalize_domain_and_version_schema.md 不存在"

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

echo "📋 複製整合規範文件..."

# 10. 前後端對齊規範
mkdir -p "${OUTPUT_DIR}/specs/integration/ui_engine"
cp -v "specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md" "${OUTPUT_DIR}/specs/integration/ui_engine/" 2>/dev/null || echo "⚠️  FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md 不存在"

echo "📋 複製實作範例..."

# 11. 實作範例
mkdir -p "${OUTPUT_DIR}/engine"
cp -v "engine/score_facet.py" "${OUTPUT_DIR}/engine/" 2>/dev/null || echo "⚠️  score_facet.py 不存在"

mkdir -p "${OUTPUT_DIR}/domain/facets"
cp -v "domain/facets/stress_recovery.scoring.v1.0.json" "${OUTPUT_DIR}/domain/facets/" 2>/dev/null || echo "⚠️  stress_recovery.scoring.v1.0.json 不存在"

mkdir -p "${OUTPUT_DIR}/domain/manifests"
cp -v "domain/manifests/stress_recovery.v1.0.json" "${OUTPUT_DIR}/domain/manifests/" 2>/dev/null || echo "⚠️  stress_recovery.v1.0.json 不存在"

echo "📋 複製 Schema 文件..."

# 12. Schema 文件
mkdir -p "${OUTPUT_DIR}/schemas"
cp -v "schemas/compiled_facet.schema.json" "${OUTPUT_DIR}/schemas/" 2>/dev/null || echo "⚠️  compiled_facet.schema.json 不存在"
cp -v "schemas/domain_manifest.schema.json" "${OUTPUT_DIR}/schemas/" 2>/dev/null || echo "⚠️  domain_manifest.schema.json 不存在"

echo "📋 複製專案憲章..."

# 13. 專案憲章
mkdir -p "${OUTPUT_DIR}/charter"
cp -v "charter/CHARTER.md" "${OUTPUT_DIR}/charter/" 2>/dev/null || echo "⚠️  CHARTER.md 不存在"

echo "📋 複製之前的審核報告和追問包（參考）..."

# 14. 之前的審核報告和追問包（作為參考）
cp -v "docs/ops/analysis/ENGINE_CORE_OMNISCIENT_MATRIX_AUDIT.md" "${OUTPUT_DIR}/docs/ops/analysis/" 2>/dev/null || echo "⚠️  ENGINE_CORE_OMNISCIENT_MATRIX_AUDIT.md 不存在"
cp -v "docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_MATRIX_QUESTIONS.md" "${OUTPUT_DIR}/docs/task_packets/advisor/" 2>/dev/null || echo "⚠️  ENGINE_CORE_OMNISCIENT_MATRIX_QUESTIONS.md 不存在"

echo "📋 建立 README..."

# 15. 建立 README
cat > "${OUTPUT_DIR}/README.md" << 'EOF'
# ENGINE_CORE_OMNISCIENT_CONSTITUTION 任務包

**建立日期**：2026-01-12  
**狀態**：OPEN（等待裁示）  
**目標**：審核 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`，確認是否符合任務需求

---

## 📋 使用指南

### 1. 必須閱讀的文件（SSOT）

#### 審核報告
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_AUDIT.md` - 審核報告 ⭐⭐⭐

#### 追問包
- `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md` - 追問包 ⭐⭐⭐

#### 原始文件
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` - 用戶提供的原始文件

#### 核心規格文件
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示（工程定錨級）
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
- `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策文件
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - Domain 外置化決策

#### 分流系統設計
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計

#### 題目設計
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

#### UI 架構
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` - UI 架構設計

#### 整合規範
- `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - 前後端對齊規範

#### 專案憲章
- `charter/CHARTER.md` - 專案憲章

---

### 2. 審核結果摘要

**整體評估**：✅ **高度合格，部分需要微調和補強**

**合格部分**（可直接整合）：
- ✅ 八大領域覆蓋方案
- ✅ 題目設計聖典（已解決追問 1）
- ✅ V3 運算引擎核心（已解決追問 2）
- ✅ 跨域擴散引擎（已解決追問 3）
- ✅ 使用者背景資料策略（已解決追問 4）
- ✅ 向後相容與遷移（已解決追問 5）
- ✅ P0-4.5 Funnel 整合
- ✅ UI/Engine 契約
- ✅ 風險鏈結構
- ✅ 驗收標準

**需要微調和補強的部分**：
- ⚠️ Domain element 儲存結構（需要建立新的 domain 配置文件）
- ⚠️ 缺失 Priors 的 Rigidity 預設值（與 DIRECTIVE REV.B 不一致）
- ⚠️ 10 題擴展模板的 Schema 擴充（需要更新 schema）
- ⚠️ 標準差模式的 ADR 更新（需要更新 ADR_0005）
- ⚠️ 衍生問題：世界級水準的增強建議

---

### 3. 關鍵追問問題（5 個）

1. ⭐⭐⭐ **Domain Element 儲存結構**：是否需要建立新的 domain 配置文件？
2. ⭐⭐ **缺失 Priors 的 Rigidity 預設值**：應該是 0 還是 0.50？
3. ⭐⭐ **10 題擴展模板的 Schema 擴充**：是否需要更新 schema？
4. ⭐ **標準差模式的 ADR 更新**：是否需要更新 ADR_0005？
5. ⭐⭐ **世界級水準增強建議**：是否需要建立多語言本地化、文化適應性、可訪問性、效能與擴展性、數據隱私與合規策略？

---

### 4. 建議的裁示選項

請參考 `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md` 的「第三部分：建議的裁示選項」。

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
