#!/bin/bash
# 底層引擎最終整合任務包打包腳本
# 用途：打包所有底層引擎相關文件，供顧問團隊使用

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="ENGINE_CORE_FINAL_INTEGRATION_PACKAGE"
OUTPUT_DIR="/tmp/${PACKAGE_NAME}_${TIMESTAMP}"
ZIP_NAME="${PACKAGE_NAME}_${TIMESTAMP}.zip"

echo "📦 開始打包底層引擎最終整合任務包..."

# 建立輸出目錄
mkdir -p "${OUTPUT_DIR}"

# 專案根目錄
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${PROJECT_ROOT}"

echo "📋 複製核心規格文件..."

# 1. 核心規格文件
mkdir -p "${OUTPUT_DIR}/specs/engine/core"
cp -v "specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md" "${OUTPUT_DIR}/specs/engine/core/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_MASTER_V3.md 不存在"

# 2. 最終技術裁示
mkdir -p "${OUTPUT_DIR}/docs/directives"
cp -v "docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md" "${OUTPUT_DIR}/docs/directives/" 2>/dev/null || echo "⚠️  DIRECTIVE-2026-01-12-02-REV.C+.md 不存在"
cp -v "docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md" "${OUTPUT_DIR}/docs/directives/" 2>/dev/null || echo "⚠️  DIRECTIVE-2026-01-12-02-REV.B.md 不存在"

# 3. 架構決策文件
mkdir -p "${OUTPUT_DIR}/docs/adr"
cp -v "docs/adr/ADR_0005_vector_state_scoring_engine.md" "${OUTPUT_DIR}/docs/adr/" 2>/dev/null || echo "⚠️  ADR_0005_vector_state_scoring_engine.md 不存在"

# 4. 整合分析報告
mkdir -p "${OUTPUT_DIR}/docs/ops/analysis"
cp -v "docs/ops/analysis/ENGINE_CORE_COMPREHENSIVE_INTEGRATION_ANALYSIS.md" "${OUTPUT_DIR}/docs/ops/analysis/" 2>/dev/null || echo "⚠️  ENGINE_CORE_COMPREHENSIVE_INTEGRATION_ANALYSIS.md 不存在"

# 5. 最終整合任務包
mkdir -p "${OUTPUT_DIR}/docs/task_packets/advisor"
cp -v "docs/task_packets/advisor/ENGINE_CORE_FINAL_INTEGRATION_TASK_PACKET.md" "${OUTPUT_DIR}/docs/task_packets/advisor/" 2>/dev/null || echo "⚠️  ENGINE_CORE_FINAL_INTEGRATION_TASK_PACKET.md 不存在"
cp -v "docs/task_packets/advisor/ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md" "${OUTPUT_DIR}/docs/task_packets/advisor/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md 不存在"

echo "📋 複製分流系統設計文件..."

# 6. P0-4.5 分流系統設計
mkdir -p "${OUTPUT_DIR}/P0-4.5"
cp -v "P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md" "${OUTPUT_DIR}/P0-4.5/" 2>/dev/null || echo "⚠️  P0-4.5_FUNNEL_SYSTEM_DESIGN.md 不存在"
cp -v "P0-4.5/P0-4.5_CHARTER.md" "${OUTPUT_DIR}/P0-4.5/" 2>/dev/null || echo "⚠️  P0-4.5_CHARTER.md 不存在"
cp -v "P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md" "${OUTPUT_DIR}/P0-4.5/" 2>/dev/null || echo "⚠️  P0-4.5_INTEGRATION_WITH_P0-5.md 不存在"

echo "📋 複製題目設計文件..."

# 7. 題目設計指南
mkdir -p "${OUTPUT_DIR}/domain/knowledge_base"
cp -v "domain/knowledge_base/question_design_guidelines.v1.0.md" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  question_design_guidelines.v1.0.md 不存在"
cp -v "domain/knowledge_base/result_presentation_design.v1.0.md" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  result_presentation_design.v1.0.md 不存在"
cp -v "domain/knowledge_base/presentation_guidelines.v1.0.md" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  presentation_guidelines.v1.0.md 不存在"
cp -v "domain/knowledge_base/ai_narrative_spec.v1.0.md" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  ai_narrative_spec.v1.0.md 不存在"

echo "📋 複製詞彙管理文件..."

# 8. 詞彙管理
cp -v "domain/knowledge_base/vocabulary_metaphysical.v1.0.json" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  vocabulary_metaphysical.v1.0.json 不存在"
cp -v "domain/knowledge_base/forbidden_terms.v1.0.json" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  forbidden_terms.v1.0.json 不存在"
cp -v "domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json" "${OUTPUT_DIR}/domain/knowledge_base/" 2>/dev/null || echo "⚠️  vocabulary_psychology_mapping.v1.0.json 不存在"

echo "📋 複製 UI 架構文件..."

# 9. UI 架構
mkdir -p "${OUTPUT_DIR}/specs/ui/architecture"
cp -v "specs/ui/architecture/P0-5_UI_ARCHITECTURE.md" "${OUTPUT_DIR}/specs/ui/architecture/" 2>/dev/null || echo "⚠️  P0-5_UI_ARCHITECTURE.md 不存在"

echo "📋 複製實作範例..."

# 10. 實作範例
mkdir -p "${OUTPUT_DIR}/engine"
cp -v "engine/score_facet.py" "${OUTPUT_DIR}/engine/" 2>/dev/null || echo "⚠️  score_facet.py 不存在"
cp -v "engine/compile_domain.py" "${OUTPUT_DIR}/engine/" 2>/dev/null || echo "⚠️  compile_domain.py 不存在"

mkdir -p "${OUTPUT_DIR}/domain/facets"
cp -v "domain/facets/stress_recovery.scoring.v1.0.json" "${OUTPUT_DIR}/domain/facets/" 2>/dev/null || echo "⚠️  stress_recovery.scoring.v1.0.json 不存在"

mkdir -p "${OUTPUT_DIR}/domain/questions"
cp -v "domain/questions/stress_recovery.questions.v1.0.json" "${OUTPUT_DIR}/domain/questions/" 2>/dev/null || echo "⚠️  stress_recovery.questions.v1.0.json 不存在"

mkdir -p "${OUTPUT_DIR}/domain/compiled"
cp -v "domain/compiled/stress_recovery.compiled.v1.0.json" "${OUTPUT_DIR}/domain/compiled/" 2>/dev/null || echo "⚠️  stress_recovery.compiled.v1.0.json 不存在"

echo "📋 複製專案憲章..."

# 11. 專案憲章
mkdir -p "${OUTPUT_DIR}/charter"
cp -v "charter/CHARTER.md" "${OUTPUT_DIR}/charter/" 2>/dev/null || echo "⚠️  CHARTER.md 不存在"

echo "📋 複製風險鏈結構文件..."

# 12. 風險鏈結構
mkdir -p "${OUTPUT_DIR}/docs/domain/advisory/R4"
cp -v "docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md" "${OUTPUT_DIR}/docs/domain/advisory/R4/" 2>/dev/null || echo "⚠️  R4_RISKCHAINS_STRUCTURAL_ASSETS.md 不存在"

echo "📋 複製審核報告..."

# 13. 審核報告
cp -v "docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md" "${OUTPUT_DIR}/docs/ops/analysis/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md 不存在"
cp -v "docs/ops/analysis/ENGINE_CORE_LOGIC_V3_DIRECTIVE_REVC_AUDIT.md" "${OUTPUT_DIR}/docs/ops/analysis/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_V3_DIRECTIVE_REVC_AUDIT.md 不存在"

echo "📋 複製追問包..."

# 14. 追問包
cp -v "docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md" "${OUTPUT_DIR}/docs/task_packets/advisor/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md 不存在"
cp -v "docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md" "${OUTPUT_DIR}/docs/task_packets/advisor/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md 不存在"
cp -v "docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md" "${OUTPUT_DIR}/docs/task_packets/advisor/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md 不存在"

echo "📋 建立 README..."

# 15. 建立 README
cat > "${OUTPUT_DIR}/README.md" << 'EOF'
# 底層引擎最終整合任務包

**建立日期**：2026-01-12  
**狀態**：READY_FOR_ADVISOR_CONSULTATION  
**目標**：基於最終版本，與顧問團隊進行最終整合討論

---

## 📋 使用指南

### 1. 必須閱讀的文件（SSOT）

#### 核心規格文件
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格（V3.0）
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示（工程定錨級）
- `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策文件

#### 分流系統設計
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計

#### 題目設計
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

#### 結果呈現
- `domain/knowledge_base/result_presentation_design.v1.0.md` - 結果呈現設計

#### 詞彙管理
- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙白名單 ⭐⭐⭐
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 全域禁用詞表 ⭐⭐⭐
- `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範 ⭐⭐
- `domain/knowledge_base/ai_narrative_spec.v1.0.md` - AI 敘事生成規範 ⭐⭐

#### UI 架構
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` - UI 架構設計

#### 專案憲章
- `charter/CHARTER.md` - 專案憲章

---

### 2. 任務包文件

#### 最終整合任務包
- `docs/task_packets/advisor/ENGINE_CORE_FINAL_INTEGRATION_TASK_PACKET.md` - **主要任務包** ⭐⭐⭐

#### 整合分析報告
- `docs/ops/analysis/ENGINE_CORE_COMPREHENSIVE_INTEGRATION_ANALYSIS.md` - 整合分析報告

#### 完整背景資料
- `docs/task_packets/advisor/ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md` - 完整背景資料

---

### 3. 實作範例

- `engine/score_facet.py` - 當前實作（需要升級到 V3）
- `domain/facets/stress_recovery.scoring.v1.0.json` - Facet 評分配置範例
- `domain/questions/stress_recovery.questions.v1.0.json` - 題目定義範例
- `domain/compiled/stress_recovery.compiled.v1.0.json` - 編譯後的 Facet 範例

---

### 4. 審核報告

- `docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md` - V3 審核報告
- `docs/ops/analysis/ENGINE_CORE_LOGIC_V3_DIRECTIVE_REVC_AUDIT.md` - REV.C+ 審核報告

---

### 5. 追問包（已解決）

- `docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md` - V3 追問包（狀態：RESOLVED）
- `docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md` - ADR 追問包（狀態：RESOLVED）
- `docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md` - DIRECTIVE 追問包（狀態：RESOLVED）

---

## 🎯 核心問題總結

請參考 `docs/task_packets/advisor/ENGINE_CORE_FINAL_INTEGRATION_TASK_PACKET.md` 的「第六部分：核心問題總結」部分。

---

## 📊 資料位置總覽

請參考 `docs/task_packets/advisor/ENGINE_CORE_FINAL_INTEGRATION_TASK_PACKET.md` 的「第八部分：資料位置總覽」部分。

---

**建立日期**：2026-01-12  
**狀態**：READY_FOR_ADVISOR_CONSULTATION
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
