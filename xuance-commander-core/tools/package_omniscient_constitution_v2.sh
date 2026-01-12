#!/bin/bash
# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2 任務包打包腳本
# 審核日期：2026-01-12

set -e

PROJECT_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core"
cd "$PROJECT_ROOT"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_PACKAGE_${TIMESTAMP}"
OUTPUT_DIR="tmp/${PACKAGE_NAME}"
ZIP_NAME="tmp/${PACKAGE_NAME}.zip"

# 建立輸出目錄
mkdir -p "$OUTPUT_DIR"

echo "📦 開始打包 ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2 任務包..."

# 1. 審核報告
echo "  - 複製審核報告..."
cp "docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_AUDIT.md" "$OUTPUT_DIR/"

# 2. 追問包
echo "  - 複製追問包..."
cp "docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_QUESTIONS.md" "$OUTPUT_DIR/"

# 3. 原始文件（GPT 處理後版本）
echo "  - 複製原始文件..."
if [ -f "docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md" ]; then
    cp "docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md" "$OUTPUT_DIR/"
else
    echo "    ⚠️  警告：找不到原始文件，將從 ZIP 包中提取..."
    if [ -f "/tmp/constitution_extract/ENGINE_CORE_OMNISCIENT_CONSTITUTION_PACKAGE_20260112_220831/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md" ]; then
        cp "/tmp/constitution_extract/ENGINE_CORE_OMNISCIENT_CONSTITUTION_PACKAGE_20260112_220831/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md" "$OUTPUT_DIR/"
    fi
fi

# 4. 核心規格文件（SSOT）
echo "  - 複製核心規格文件..."
mkdir -p "$OUTPUT_DIR/specs/engine/core"
cp "specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md" "$OUTPUT_DIR/specs/engine/core/"

# 5. DIRECTIVE 文件
echo "  - 複製 DIRECTIVE 文件..."
mkdir -p "$OUTPUT_DIR/docs/directives"
cp "docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md" "$OUTPUT_DIR/docs/directives/"
cp "docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md" "$OUTPUT_DIR/docs/directives/"

# 6. ADR 文件
echo "  - 複製 ADR 文件..."
mkdir -p "$OUTPUT_DIR/docs/adr"
cp "docs/adr/ADR_0005_vector_state_scoring_engine.md" "$OUTPUT_DIR/docs/adr/"
cp "docs/adr/ADR_0001_externalize_domain_and_version_schema.md" "$OUTPUT_DIR/docs/adr/"

# 7. P0-4.5 Funnel 系統設計
echo "  - 複製 P0-4.5 Funnel 系統設計..."
mkdir -p "$OUTPUT_DIR/P0-4.5"
cp "P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md" "$OUTPUT_DIR/P0-4.5/"

# 8. 題目設計指南
echo "  - 複製題目設計指南..."
mkdir -p "$OUTPUT_DIR/domain/knowledge_base"
cp "domain/knowledge_base/question_design_guidelines.v1.0.md" "$OUTPUT_DIR/domain/knowledge_base/"

# 9. UI 架構設計
echo "  - 複製 UI 架構設計..."
mkdir -p "$OUTPUT_DIR/specs/ui/architecture"
cp "specs/ui/architecture/P0-5_UI_ARCHITECTURE.md" "$OUTPUT_DIR/specs/ui/architecture/"

# 10. 前後端對齊規範
echo "  - 複製前後端對齊規範..."
mkdir -p "$OUTPUT_DIR/specs/integration/ui_engine"
cp "specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md" "$OUTPUT_DIR/specs/integration/ui_engine/"

# 11. Domain 配置文件範例
echo "  - 複製 Domain 配置文件範例..."
mkdir -p "$OUTPUT_DIR/domain/domains"
if [ -f "domain/domains/bagua.domain_map.v1.0.json" ]; then
    cp "domain/domains/bagua.domain_map.v1.0.json" "$OUTPUT_DIR/domain/domains/"
else
    echo "    ⚠️  警告：找不到 Domain 配置文件，將從 ZIP 包中提取..."
    if [ -f "/tmp/constitution_extract/ENGINE_CORE_OMNISCIENT_CONSTITUTION_PACKAGE_20260112_220831/domain/domains/bagua.domain_map.v1.0.json" ]; then
        cp "/tmp/constitution_extract/ENGINE_CORE_OMNISCIENT_CONSTITUTION_PACKAGE_20260112_220831/domain/domains/bagua.domain_map.v1.0.json" "$OUTPUT_DIR/domain/domains/"
    fi
fi

# 12. Schema 文件
echo "  - 複製 Schema 文件..."
mkdir -p "$OUTPUT_DIR/schemas"
cp "schemas/compiled_facet.schema.json" "$OUTPUT_DIR/schemas/"
cp "schemas/domain_manifest.schema.json" "$OUTPUT_DIR/schemas/"

# 13. Charter
echo "  - 複製 Charter..."
mkdir -p "$OUTPUT_DIR/charter"
cp "charter/CHARTER.md" "$OUTPUT_DIR/charter/"

# 14. 之前的審核報告和追問包（作為參考）
echo "  - 複製之前的審核報告和追問包（作為參考）..."
mkdir -p "$OUTPUT_DIR/docs/ops/analysis"
cp "docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_AUDIT.md" "$OUTPUT_DIR/docs/ops/analysis/" 2>/dev/null || true
mkdir -p "$OUTPUT_DIR/docs/task_packets/advisor"
cp "docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md" "$OUTPUT_DIR/docs/task_packets/advisor/" 2>/dev/null || true

# 15. 建立 README
echo "  - 建立 README..."
cat > "$OUTPUT_DIR/README.md" << 'EOF'
# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2 任務包

**建立日期**：2026-01-12  
**狀態**：OPEN（等待裁示）  
**目標**：審核 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`（GPT 處理後版本），確認是否符合任務需求

---

## 📋 使用指南

### 1. 必須閱讀的文件（SSOT）

#### 審核報告
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_AUDIT.md` - 審核報告 ⭐⭐⭐

#### 追問包
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_QUESTIONS.md` - 追問包 ⭐⭐⭐

#### 原始文件
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` - 用戶提供的原始文件（GPT 處理後版本）

#### 核心規格文件
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示（工程定錨級）
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
- `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策文件
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - Domain 外置化決策

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

---

## 🎯 審核摘要

### 整體評估

**狀態**：✅ **高度合格，已解決大部分追問問題，部分需要微調**

**合格部分**（可直接整合）：
- ✅ 八大領域覆蓋方案（完整且符合 P0-4.5 設計）
- ✅ 題目設計聖典（已解決追問 1，提供明確裁示）
- ✅ V3 運算引擎核心（已解決追問 2，採用 DIRECTIVE REV.B 完整公式，明確 Rigidity 預設值為 0.0）
- ✅ 跨域擴散引擎（已解決追問 3，提供完整實作架構）
- ✅ 使用者背景資料策略（已解決追問 4，明確裁示）
- ✅ 向後相容與遷移（已解決追問 5，提供完整策略）
- ✅ Domain Element 儲存結構（已解決追問 1.1，明確裁示建立獨立 Domain 設定檔）
- ✅ 缺失 Priors 的 Rigidity 預設值（已解決追問 2，明確為 0.0）
- ✅ 標準差模式（已解決追問 4，明確為 sample stdev）
- ✅ 世界級增強建議（新增 i18n、A11y、Compliance）

**需要微調和補強的部分**：
- ⚠️ 10 題擴展模板的 Schema 擴充（需要更新 schema）
- ⚠️ Domain Schema 定義（需要建立 domain.schema.json）
- ⚠️ Role Archetype 的必選性（文件說「可選或弱必填」，與之前裁示一致）
- ⚠️ 世界級增強建議的實作細節（需要更詳細的規格）

---

## 📝 追問包內容

追問包包含以下關鍵問題：

1. **Domain Schema 定義**（PRIORITY: HIGH）
2. **Facet Manifest Schema 更新**（PRIORITY: HIGH）
3. **10 題擴展模板的 Schema 擴充**（PRIORITY: MEDIUM）
4. **Role Archetype 的必選性**（PRIORITY: MEDIUM）
5. **世界級增強建議的實作細節**（PRIORITY: MEDIUM）

詳細內容請參閱 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_QUESTIONS.md`。

---

## ✅ 可直接整合的部分

以下部分已經過審核，可以直接整合到現有文件：

1. ✅ **八大領域標準映射** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 0.3（更新）
2. ✅ **Domain 數據儲存決策** → 可建立新的 Domain 配置文件結構
3. ✅ **題目設計聖典** → `domain/knowledge_base/question_design_guidelines.v1.0.md`（補強）
4. ✅ **V3 運算引擎核心** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 3（補強）
5. ✅ **跨域擴散引擎** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.2（補強）
6. ✅ **使用者背景資料策略** → `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1（補強）
7. ✅ **向後相容與遷移** → `docs/ops/TASK_STATUS.md`（補強）
8. ✅ **世界級增強建議** → 可建立獨立的增強策略文件

---

**建立日期**：2026-01-12  
**狀態**：OPEN  
**等待裁示**：使用者對追問問題的回應
EOF

# 16. 打包成 ZIP
echo "  - 打包成 ZIP..."
cd tmp
zip -r "${PACKAGE_NAME}.zip" "${PACKAGE_NAME}" > /dev/null
cd ..

# 17. 顯示結果
echo ""
echo "✅ 打包完成！"
echo ""
echo "📦 壓縮檔位置："
echo "   ${ZIP_NAME}"
echo ""
echo "📊 檔案大小："
ls -lh "$ZIP_NAME" | awk '{print "   " $5}'
echo ""
echo "📁 包含文件："
find "$OUTPUT_DIR" -type f | wc -l | awk '{print "   " $1 " 個文件"}'
echo ""
echo "🎯 主要內容："
echo "   - 審核報告"
echo "   - 追問包（5 個關鍵問題 + 世界級水準增強建議）"
echo "   - 原始文件（ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md）"
echo "   - 所有相關的背景資料和規格文件"
echo ""
echo "✅ 可直接傳送此檔案給顧問團隊。"
