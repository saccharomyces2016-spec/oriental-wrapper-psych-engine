#!/bin/bash
# 剩餘任務完整執行包打包腳本
# 建立日期：2026-01-13

set -e

PROJECT_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core"
cd "$PROJECT_ROOT"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="REMAINING_TASKS_COMPLETE_PACKET_${TIMESTAMP}"
OUTPUT_DIR="tmp/${PACKAGE_NAME}"
ZIP_NAME="tmp/${PACKAGE_NAME}.zip"

mkdir -p "$OUTPUT_DIR"
echo "📦 開始打包剩餘任務完整執行包..."

# 1. 主要任務包
cp docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md "$OUTPUT_DIR/"

# 2. 精簡追問包（便於 Gemini 處理）
cp docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_QUESTIONS_COMPACT.md "$OUTPUT_DIR/QUESTIONS_COMPACT.md"

# 3. 關鍵技術裁示摘要
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

# 4. Domain 範例
cp domain/domains/bagua.domain_map.v1.0.json "$OUTPUT_DIR/domain_example.json"

# 5. 核心規格文件（精簡引用）
cp specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md "$OUTPUT_DIR/" 2>/dev/null || echo "⚠️  ENGINE_CORE_LOGIC_MASTER_V3.md 不存在，跳過"
cp docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md "$OUTPUT_DIR/" 2>/dev/null || echo "⚠️  DIRECTIVE REV.B 不存在，跳過"
cp docs/adr/ADR_0005_vector_state_scoring_engine.md "$OUTPUT_DIR/" 2>/dev/null || echo "⚠️  ADR_0005 不存在，跳過"

# 6. 當前實作狀態
cp engine/score_facet.py "$OUTPUT_DIR/engine_score_facet_current.py" 2>/dev/null || echo "⚠️  score_facet.py 不存在，跳過"

# 7. Legacy Facet 清單
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

## 遷移步驟

1. 檢查每個 Facet 的題目數量
2. 更新 `scoring.model` 為 `"vector_state_v3"`
3. 更新 `scoring.params` 包含 V3 參數
4. 確保所有題目都有 `exclude_from_volatility` 標記
5. 更新 `domainKey` 和 `questionSet`（如果缺失）
EOF

# 8. 建立 README
cat > "$OUTPUT_DIR/README.md" << 'EOF'
# 剩餘任務完整執行包

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION  
**目標**：完成所有剩餘任務，結束當前所有進行中的工作

---

## 📋 文件說明

1. **REMAINING_TASKS_COMPLETE_PACKET.md** - 主要任務包（完整執行步驟）
2. **QUESTIONS_COMPACT.md** - 精簡追問包（4 個關鍵問題）
3. **KEY_DECISIONS.md** - 關鍵技術裁示摘要
4. **domain_example.json** - Domain 配置文件範例
5. **LEGACY_FACETS_LIST.md** - Legacy Facet 遷移清單

---

## 🎯 核心任務

### 第一階段：解決 V4 追問包問題（必須先完成）

1. ⭐⭐⭐ Rigidity 預設值統一為 0.0
2. ⭐⭐ Domain Schema 定義
3. ⭐⭐ ADR_0005 標準差模式更新
4. ⭐⭐ 世界級增強建議的實作規格（5 個文件）

### 第二階段：完成 P0-12 階段二-4

5. ⭐⭐ 規則與制度提取

### 第三階段：Legacy Facet 遷移

6. ⭐⭐ 遷移 9 個 Legacy Facet 到 V3

### 第四階段：更新文件

7. ⭐ 更新所有相關文件

---

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION
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
echo "   - REMAINING_TASKS_COMPLETE_PACKET.md（主要任務包）"
echo "   - QUESTIONS_COMPACT.md（精簡追問包）"
echo "   - KEY_DECISIONS.md（關鍵技術裁示摘要）"
echo "   - LEGACY_FACETS_LIST.md（Legacy Facet 遷移清單）"
