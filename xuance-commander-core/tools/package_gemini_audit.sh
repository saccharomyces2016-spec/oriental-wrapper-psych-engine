#!/bin/bash
# Gemini Constitution 審核報告打包腳本
# 建立日期：2026-01-13

set -e

PROJECT_ROOT="/Users/yujunwei/Projects/115.1.4 oriental-wrapper-psych-engine/xuance-commander-core"
cd "$PROJECT_ROOT"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="GEMINI_CONSTITUTION_AUDIT_${TIMESTAMP}"
OUTPUT_DIR="tmp/${PACKAGE_NAME}"
ZIP_NAME="tmp/${PACKAGE_NAME}.zip"

mkdir -p "$OUTPUT_DIR"
echo "📦 開始打包 Gemini Constitution 審核報告..."

# 1. 審核報告
cp docs/task_packets/advisor/GEMINI_CONSTITUTION_AUDIT_REPORT.md "$OUTPUT_DIR/"

# 2. 追問包
cp docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md "$OUTPUT_DIR/"

# 3. 關鍵技術裁示摘要
cat > "$OUTPUT_DIR/KEY_DECISIONS.md" << 'EOF'
# 關鍵技術裁示摘要

## Rigidity 預設值衝突

**任務包裁示**：採用 0.0（符合 DIRECTIVE REV.B 的實際內容）

**DIRECTIVE REV.B Section 1.2**：
```python
if not profile:
    return 0.0
```

**Gemini 方案**：
```python
# 若無 Priors，預設為 0.1 (Internal Deficit)，而非 0.0
# 理由：使用者會來尋求幫助，通常帶有輕微的無力感，0.0 過於理想化
if priors and priors.get("attribution_profile"):
    rigidity = _calculate_rigidity_3_layer(priors["attribution_profile"])
else:
    rigidity = 0.1
```

**衝突**：與任務包裁示和 DIRECTIVE REV.B 衝突

**建議**：維持 0.0（符合任務包裁示和 DIRECTIVE REV.B）
EOF

# 4. 建立 README
cat > "$OUTPUT_DIR/README.md" << 'EOF'
# Gemini Constitution 審核報告包

**建立日期**：2026-01-13  
**狀態**：部分通過，部分需追問

---

## 📋 文件說明

1. **GEMINI_CONSTITUTION_AUDIT_REPORT.md** - 完整審核報告
2. **GEMINI_CONSTITUTION_QUESTIONS.md** - 追問包（3 個關鍵問題）
3. **KEY_DECISIONS.md** - 關鍵技術裁示摘要

---

## ✅ 通過項目（可直接整合）

1. ✅ **Domain Schema i18n 結構** - 可整合到 `schemas/domain.schema.json`
2. ✅ **題目數量規範（8 題固定）** - 可更新 CONSTITUTION Section 2

---

## ⚠️ 需追問項目（結構性變更）

1. ⚠️ **五行全循環矩陣（剋/洩）** - 需要裁示
2. ⚠️ **角色原型參數矩陣** - 需要裁示
3. ❌ **Rigidity 預設值（0.1 vs 0.0）** - 與任務包裁示衝突

---

**建立日期**：2026-01-13  
**狀態**：等待使用者裁示
EOF

# 打包
cd tmp
zip -r "${PACKAGE_NAME}.zip" "${PACKAGE_NAME}" > /dev/null
cd "$PROJECT_ROOT"

echo "✅ 打包完成：${ZIP_NAME}"
echo "📦 檔案大小：$(ls -lh ${ZIP_NAME} | awk '{print $5}')"
