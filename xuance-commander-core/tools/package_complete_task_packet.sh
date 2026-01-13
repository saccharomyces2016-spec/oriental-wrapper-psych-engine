#!/bin/bash
# 完整任務包打包腳本（包含所有背景資料）
# 建立日期：2026-01-13

set -e

PROJECT_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core"
cd "$PROJECT_ROOT"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="COMPLETE_TASK_PACKET_${TIMESTAMP}"
OUTPUT_DIR="tmp/${PACKAGE_NAME}"
ZIP_NAME="tmp/${PACKAGE_NAME}.zip"

mkdir -p "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/docs"
mkdir -p "$OUTPUT_DIR/engine"
mkdir -p "$OUTPUT_DIR/schemas"
mkdir -p "$OUTPUT_DIR/domain"
mkdir -p "$OUTPUT_DIR/domain/facets"
mkdir -p "$OUTPUT_DIR/domain/manifests"
mkdir -p "$OUTPUT_DIR/domain/domains"
mkdir -p "$OUTPUT_DIR/domain/knowledge_base"
mkdir -p "$OUTPUT_DIR/specs"
mkdir -p "$OUTPUT_DIR/specs/engine/core"
mkdir -p "$OUTPUT_DIR/specs/integration"

echo "📦 開始打包完整任務包（包含所有背景資料）..."

# ============================================================
# 1. 主要任務包
# ============================================================
echo "📄 複製主要任務包..."
cp docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md "$OUTPUT_DIR/00_MAIN_TASK_PACKET.md"

# ============================================================
# 2. 核心技術文件（Rigidity 預設值相關）
# ============================================================
echo "📄 複製核心技術文件..."
cp docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md "$OUTPUT_DIR/docs/" 2>/dev/null || echo "⚠️  DIRECTIVE REV.B 不存在"
cp docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md "$OUTPUT_DIR/docs/" 2>/dev/null || echo "⚠️  DIRECTIVE REV.C+ 不存在"
cp docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md "$OUTPUT_DIR/docs/" 2>/dev/null || echo "⚠️  CONSTITUTION V4 不存在"
cp engine/score_facet.py "$OUTPUT_DIR/engine/" 2>/dev/null || echo "⚠️  score_facet.py 不存在"

# ============================================================
# 3. ADR 文件（標準差模式相關）
# ============================================================
echo "📄 複製 ADR 文件..."
cp docs/adr/ADR_0005_vector_state_scoring_engine.md "$OUTPUT_DIR/docs/" 2>/dev/null || echo "⚠️  ADR_0005 不存在"
cp docs/adr/ADR_0003_world_class_bilingual_global_market.md "$OUTPUT_DIR/docs/" 2>/dev/null || echo "⚠️  ADR_0003 不存在"

# ============================================================
# 4. 核心規格文件
# ============================================================
echo "📄 複製核心規格文件..."
cp specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md "$OUTPUT_DIR/specs/engine/core/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_MASTER_V3.md 不存在"
cp charter/CHARTER.md "$OUTPUT_DIR/docs/" 2>/dev/null || echo "⚠️  CHARTER.md 不存在"

# ============================================================
# 5. Schema 文件（Domain Schema 相關）
# ============================================================
echo "📄 複製 Schema 文件..."
cp schemas/domain_manifest.schema.json "$OUTPUT_DIR/schemas/" 2>/dev/null || echo "⚠️  domain_manifest.schema.json 不存在"
cp schemas/compiled_facet.schema.json "$OUTPUT_DIR/schemas/" 2>/dev/null || echo "⚠️  compiled_facet.schema.json 不存在"

# ============================================================
# 6. Domain 配置（Domain Schema 範例）
# ============================================================
echo "📄 複製 Domain 配置..."
cp domain/domains/bagua.domain_map.v1.0.json "$OUTPUT_DIR/domain/domains/" 2>/dev/null || echo "⚠️  bagua.domain_map.v1.0.json 不存在"

# ============================================================
# 7. 題目設計指南（Legacy Facet 遷移相關）
# ============================================================
echo "📄 複製題目設計指南..."
cp domain/knowledge_base/question_design_guidelines.v1.0.md "$OUTPUT_DIR/domain/knowledge_base/" 2>/dev/null || echo "⚠️  question_design_guidelines.v1.0.md 不存在"

# ============================================================
# 8. Legacy Facet 配置文件（9 個）
# ============================================================
echo "📄 複製 Legacy Facet 配置..."
LEGACY_FACETS=(
  "stress_recovery"
  "chronic_depletion"
  "identity_diffusion"
  "fear_based_stability"
  "meaning_vacuum"
  "suppressed_needs"
  "chronic_alertness"
  "hyper_responsibility"
  "loss_of_agency"
)

for facet in "${LEGACY_FACETS[@]}"; do
  if [ -f "domain/facets/${facet}.scoring.v1.0.json" ]; then
    cp "domain/facets/${facet}.scoring.v1.0.json" "$OUTPUT_DIR/domain/facets/"
    echo "  ✅ ${facet}.scoring.v1.0.json"
  else
    echo "  ⚠️  ${facet}.scoring.v1.0.json 不存在"
  fi
  
  if [ -f "domain/manifests/${facet}.v1.0.json" ]; then
    cp "domain/manifests/${facet}.v1.0.json" "$OUTPUT_DIR/domain/manifests/"
    echo "  ✅ ${facet}.v1.0.json (manifest)"
  fi
done

# ============================================================
# 9. V3 範例 Facet（作為參考）
# ============================================================
echo "📄 複製 V3 範例 Facet..."
if [ -f "domain/facets/burnout_syndrome.scoring.v1.0.json" ]; then
  cp domain/facets/burnout_syndrome.scoring.v1.0.json "$OUTPUT_DIR/domain/facets/" && echo "  ✅ burnout_syndrome.scoring.v1.0.json (V3 範例)"
fi
if [ -f "domain/facets/deep_depression.scoring.v1.0.json" ]; then
  cp domain/facets/deep_depression.scoring.v1.0.json "$OUTPUT_DIR/domain/facets/" && echo "  ✅ deep_depression.scoring.v1.0.json (V3 範例)"
fi

# ============================================================
# 10. 追問包（精簡版）
# ============================================================
echo "📄 複製追問包..."
cp docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_QUESTIONS_COMPACT.md "$OUTPUT_DIR/QUESTIONS_COMPACT.md" 2>/dev/null || echo "⚠️  QUESTIONS_COMPACT.md 不存在"

# ============================================================
# 11. 關鍵技術裁示摘要
# ============================================================
echo "📄 建立關鍵技術裁示摘要..."
cat > "$OUTPUT_DIR/KEY_DECISIONS.md" << 'EOF'
# 關鍵技術裁示摘要

## DIRECTIVE REV.B - Rigidity 計算（實際內容）

**缺失 Priors 的處理**：
```python
if not profile:
    return 0.0  # 缺失時預設 Rigidity = 0
```

## CONSTITUTION Section 7.2 - 缺失 priors 的行為

```json
"rigidity_default_when_missing": 0.50  // MIXED default；寫入 params
```

## engine/score_facet.py - 實際實作

```python
def calculate_rigidity(profile: Optional[Dict[str, Any]], default_when_missing: float = 0.5) -> float:
    if not profile:
        return float(default_when_missing)
```

**衝突**：三個地方對缺失 Priors 的 Rigidity 預設值不一致。

**裁示**：統一為 0.0（符合 DIRECTIVE REV.B 的實際內容）
EOF

# ============================================================
# 12. Legacy Facet 清單
# ============================================================
echo "📄 建立 Legacy Facet 清單..."
cat > "$OUTPUT_DIR/LEGACY_FACETS_LIST.md" << 'EOF'
# Legacy Facet 遷移清單

## 待遷移的 Facet（9 個）

1. `stress_recovery` - 2 題（需擴充到 6-10 題）
2. `chronic_depletion` - 7 題（符合規範）
3. `identity_diffusion` - 7 題（符合規範）
4. `fear_based_stability` - 3 題（需擴充到 6-10 題）
5. `meaning_vacuum` - 7 題（符合規範）
6. `suppressed_needs` - 7 題（符合規範）
7. `chronic_alertness` - 7 題（符合規範）
8. `hyper_responsibility` - 7 題（符合規範）
9. `loss_of_agency` - 7 題（符合規範）

## V3 範例 Facet（參考）

- `burnout_syndrome` - V3 標準範例
- `deep_depression` - V3 標準範例

## 遷移步驟

1. 檢查每個 Facet 的題目數量
2. 更新 `scoring.model` 為 `"vector_state_v3"`
3. 更新 `scoring.params` 包含 V3 參數
4. 確保所有題目都有 `exclude_from_volatility` 標記
5. 更新 `domainKey` 和 `questionSet`（如果缺失）
EOF

# ============================================================
# 13. 建立 README
# ============================================================
echo "📄 建立 README..."
cat > "$OUTPUT_DIR/README.md" << 'EOF'
# 完整任務包（包含所有背景資料）

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION  
**目標**：完成所有剩餘任務，結束當前所有進行中的工作

---

## 📋 文件結構

### 主要任務包
- `00_MAIN_TASK_PACKET.md` - 主要任務包（完整執行步驟）

### 核心技術文件（Rigidity 預設值相關）
- `docs/DIRECTIVE-2026-01-12-02-REV.B.md` - 技術裁示（Rigidity 預設值 0.0）
- `docs/DIRECTIVE-2026-01-12-02-REV.C+.md` - 技術裁示（驗證題標記）
- `docs/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` - V4 憲法（Rigidity 預設值 0.50）
- `engine/score_facet.py` - 引擎實作（Rigidity 預設值 0.5）

### ADR 文件（標準差模式相關）
- `docs/ADR_0005_vector_state_scoring_engine.md` - V3 引擎架構決策
- `docs/ADR_0003_world_class_bilingual_global_market.md` - 世界級 + CN/EN

### 核心規格文件
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - V3 引擎核心邏輯規格
- `docs/CHARTER.md` - 專案憲章（最高目標與限制）

### Schema 文件（Domain Schema 相關）
- `schemas/domain_manifest.schema.json` - Facet Manifest Schema
- `schemas/compiled_facet.schema.json` - Compiled Facet Schema

### Domain 配置（Domain Schema 範例）
- `domain/domains/bagua.domain_map.v1.0.json` - 八卦領域映射範例

### 題目設計指南（Legacy Facet 遷移相關）
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

### Legacy Facet 配置（9 個）
- `domain/facets/stress_recovery.scoring.v1.0.json`
- `domain/facets/chronic_depletion.scoring.v1.0.json`
- `domain/facets/identity_diffusion.scoring.v1.0.json`
- `domain/facets/fear_based_stability.scoring.v1.0.json`
- `domain/facets/meaning_vacuum.scoring.v1.0.json`
- `domain/facets/suppressed_needs.scoring.v1.0.json`
- `domain/facets/chronic_alertness.scoring.v1.0.json`
- `domain/facets/hyper_responsibility.scoring.v1.0.json`
- `domain/facets/loss_of_agency.scoring.v1.0.json`

### V3 範例 Facet（參考）
- `domain/facets/burnout_syndrome.scoring.v1.0.json` - V3 標準範例
- `domain/facets/deep_depression.scoring.v1.0.json` - V3 標準範例

### 其他文件
- `QUESTIONS_COMPACT.md` - 精簡追問包（4 個關鍵問題）
- `KEY_DECISIONS.md` - 關鍵技術裁示摘要
- `LEGACY_FACETS_LIST.md` - Legacy Facet 遷移清單

---

## 🎯 核心任務

### 第一階段：解決 V4 追問包問題（必須先完成）

1. ⭐⭐⭐ **問題 1**：Rigidity 預設值統一為 0.0
   - 相關文件：`docs/DIRECTIVE-2026-01-12-02-REV.B.md`, `docs/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`, `engine/score_facet.py`

2. ⭐⭐ **問題 2**：Domain Schema 定義
   - 相關文件：`domain/domains/bagua.domain_map.v1.0.json`, `schemas/domain_manifest.schema.json`

3. ⭐⭐ **問題 3**：ADR_0005 標準差模式更新
   - 相關文件：`docs/ADR_0005_vector_state_scoring_engine.md`

4. ⭐⭐ **問題 4**：世界級增強建議的實作規格（5 個文件）
   - 相關文件：`docs/ADR_0003_world_class_bilingual_global_market.md`, `docs/CHARTER.md`

### 第二階段：完成 P0-12 階段二-4

5. ⭐⭐ 規則與制度提取（如果找不到 Legacy 文件，標記為「待後續處理」）

### 第三階段：Legacy Facet 遷移

6. ⭐⭐ 遷移 9 個 Legacy Facet 到 V3
   - 相關文件：`domain/facets/*.scoring.v1.0.json`, `domain/facets/burnout_syndrome.scoring.v1.0.json` (範例)

### 第四階段：更新文件

7. ⭐ 更新所有相關文件

---

## 📝 使用說明

1. 先閱讀 `00_MAIN_TASK_PACKET.md` 了解完整任務
2. 根據任務需求，參考對應的背景文件
3. 執行任務，產出結果
4. 驗收標準見 `00_MAIN_TASK_PACKET.md`

---

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION
EOF

# ============================================================
# 14. 建立文件索引
# ============================================================
echo "📄 建立文件索引..."
cat > "$OUTPUT_DIR/FILE_INDEX.md" << 'EOF'
# 文件索引

## 按任務分類

### 任務 1.1：Rigidity 預設值統一為 0.0
- `docs/DIRECTIVE-2026-01-12-02-REV.B.md` - 技術裁示（0.0）
- `docs/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` - V4 憲法（0.50）
- `engine/score_facet.py` - 引擎實作（0.5）

### 任務 1.2：Domain Schema 定義
- `domain/domains/bagua.domain_map.v1.0.json` - 範例
- `schemas/domain_manifest.schema.json` - 相關 Schema

### 任務 1.3：ADR_0005 標準差模式更新
- `docs/ADR_0005_vector_state_scoring_engine.md` - ADR 文件

### 任務 1.4：世界級增強建議的實作規格
- `docs/ADR_0003_world_class_bilingual_global_market.md` - 世界級 + CN/EN
- `docs/CHARTER.md` - 專案憲章

### 任務 3：Legacy Facet 遷移
- `domain/facets/*.scoring.v1.0.json` - 9 個 Legacy Facet
- `domain/facets/burnout_syndrome.scoring.v1.0.json` - V3 範例
- `domain/facets/deep_depression.scoring.v1.0.json` - V3 範例
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

## 按文件類型分類

### 技術裁示
- `docs/DIRECTIVE-2026-01-12-02-REV.B.md`
- `docs/DIRECTIVE-2026-01-12-02-REV.C+.md`

### 規格文件
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`
- `docs/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`

### ADR 文件
- `docs/ADR_0005_vector_state_scoring_engine.md`
- `docs/ADR_0003_world_class_bilingual_global_market.md`

### Schema 文件
- `schemas/domain_manifest.schema.json`
- `schemas/compiled_facet.schema.json`

### 實作文件
- `engine/score_facet.py`

### 配置文件
- `domain/domains/bagua.domain_map.v1.0.json`
- `domain/facets/*.scoring.v1.0.json`
EOF

# ============================================================
# 打包
# ============================================================
cd tmp
zip -r "${PACKAGE_NAME}.zip" "${PACKAGE_NAME}" > /dev/null
cd "$PROJECT_ROOT"

echo ""
echo "✅ 打包完成：${ZIP_NAME}"
echo "📦 檔案大小：$(ls -lh ${ZIP_NAME} | awk '{print $5}')"
echo ""
echo "📋 包含文件："
find "$OUTPUT_DIR" -type f | wc -l | xargs echo "   - 總共"
echo ""
echo "🎯 關鍵文件："
echo "   - 00_MAIN_TASK_PACKET.md（主要任務包）"
echo "   - docs/（核心技術文件）"
echo "   - engine/（引擎實作）"
echo "   - schemas/（Schema 定義）"
echo "   - domain/（Domain 配置和 Facet）"
echo "   - specs/（規格文件）"
echo ""
echo "📝 使用說明："
echo "   1. 解壓縮 ZIP 檔案"
echo "   2. 閱讀 README.md 了解文件結構"
echo "   3. 閱讀 00_MAIN_TASK_PACKET.md 開始執行任務"
echo "   4. 根據任務需求，參考對應的背景文件"
