#!/bin/bash
# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4 精簡追問包打包腳本
# 審核日期：2026-01-13
# 用途：只包含追問包和必要背景資料，便於 Gemini 處理

set -e

PROJECT_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core"
cd "$PROJECT_ROOT"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_QUESTIONS_COMPACT_${TIMESTAMP}"
OUTPUT_DIR="tmp/${PACKAGE_NAME}"
ZIP_NAME="tmp/${PACKAGE_NAME}.zip"

mkdir -p "$OUTPUT_DIR"
echo "📦 開始打包 ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4 精簡追問包..."

# 1. 精簡版追問包（主要文件）
cp docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_QUESTIONS_COMPACT.md "$OUTPUT_DIR/QUESTIONS.md"

# 2. 核心規格文件（精簡引用）
# 只複製關鍵章節，不複製整個文件
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
EOF

# 3. Domain Schema 範例（簡化）
cp domain/domains/bagua.domain_map.v1.0.json "$OUTPUT_DIR/domain_example.json"

# 4. 建立 README
cat > "$OUTPUT_DIR/README.md" << 'EOF'
# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4 精簡追問包

**建立日期**：2026-01-13  
**狀態**：OPEN  
**用途**：精簡版追問包，只包含必要背景資料，便於 Gemini 處理

---

## 📋 文件說明

1. **QUESTIONS.md** - 主要追問包（4 個關鍵問題）
2. **KEY_DECISIONS.md** - 關鍵技術裁示摘要
3. **domain_example.json** - Domain 配置文件範例

---

## 🎯 核心問題

1. ⭐⭐⭐ 缺失 Priors 的 Rigidity 預設值（應該是 0 還是 0.50？）
2. ⭐⭐ Domain Schema 定義（是否需要建立完整的 Domain Schema？）
3. ⭐⭐ ADR_0005 標準差模式更新（是否需要更新 ADR_0005？）
4. ⭐⭐ 世界級增強建議的實作細節（是否需要建立詳細的實作規格？）

---

**建立日期**：2026-01-13  
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
echo "   - QUESTIONS.md（精簡追問包）"
echo "   - KEY_DECISIONS.md（關鍵技術裁示摘要）"
echo "   - domain_example.json（Domain 範例）"
