# Gemini Constitution 審核報告

**建立日期**：2026-01-13  
**審核標準**：最嚴格標準（對比現有 SSOT）  
**狀態**：部分通過，部分需追問

---

## 📋 審核總覽

### 審核結果摘要

| 項目 | 狀態 | 說明 |
|------|------|------|
| **Domain Schema i18n 結構** | ✅ **通過** | 可整合，符合世界級目標 |
| **題目數量規範（8 題固定）** | ✅ **通過** | 更嚴格但符合現有規格 |
| **五行全循環矩陣（剋/洩）** | ⚠️ **需追問** | 結構性變更，需 ADR + 批准 |
| **角色原型參數矩陣** | ⚠️ **需追問** | 結構性變更，需 ADR + 批准 |
| **Rigidity 預設值（0.1）** | ❌ **不通過** | 與任務包裁示（0.0）衝突 |

---

## ✅ 通過項目（可直接整合）

### 1. Domain Schema i18n 結構

**Gemini 方案**：
```json
{
  "name": {
    "zh_TW": "坤",
    "en_US": "Kun (The Earth)"
  },
  "keywords": {
    "zh_TW": ["事業", "財富", "積累"],
    "en_US": ["Career", "Wealth", "Accumulation"]
  }
}
```

**現有方案**：
```json
{
  "labels": {
    "zh": "坤｜地",
    "en": "Kun｜Earth"
  }
}
```

**審核結果**：✅ **通過**

**理由**：
- 符合世界級目標（ADR_0003）
- 更完整的 i18n 結構，支援多語言擴充
- 可整合到現有 Schema，不破壞向後相容性

**整合方式**：
- 更新 `schemas/domain.schema.json` 支援 `name` 和 `keywords` 的 i18n 結構
- 保留現有 `labels` 欄位（向後相容）
- 新 Domain 配置使用 `name` 和 `keywords`，舊配置仍可使用 `labels`

---

### 2. 題目數量規範（8 題固定）

**Gemini 方案**：
- 固定 8 題為最佳實務
- 允許擴充至 10 題，但新增的 2 題必須是 Validation 類型

**現有規格**（CONSTITUTION V4 Section 2）：
- 允許 6-10 題彈性
- 預設（RECOMMENDED DEFAULT）= 8 題

**審核結果**：✅ **通過**

**理由**：
- Gemini 方案更嚴格（固定 8 題），但符合現有規格（8 題為預設）
- 10 題擴充規則（必須是 Validation 類型）是合理的約束
- 不破壞現有 Facet（已有 7 題的 Facet 仍可使用）

**整合方式**：
- 更新 CONSTITUTION Section 2.1，明確「固定 8 題為最佳實務」
- 更新 Section 2.2，明確「10 題擴充時，新增的 2 題必須是 Validation 類型」

---

## ⚠️ 需追問項目（結構性變更）

### 3. 五行全循環矩陣（剋/洩雙向傳導）

**Gemini 方案**：
- 引入「洩（Exhaustion）」路徑，擴充為剋/洩雙向傳導
- 提供完整的 5-Element 全循環矩陣（包含剋和洩兩條路徑）

**現有實作**：
- `engine/cascade_calculator.py` 只有「剋（Overcomes）」路徑
- `domain/cascade/cascade_overrides.v1.0.json` 只有 `EARTH_OVERCOMES_WATER` 等剋關係

**審核結果**：⚠️ **需追問**

**理由**：
- 這是**結構性變更**（根據 CHARTER Section 3：任何結構性變更必須 ADR + 使用者批准）
- 需要評估：
  1. 是否真的需要「洩」路徑？（現有「剋」路徑是否已足夠？）
  2. 實作複雜度（需要更新 `cascade_calculator.py` 和 `cascade_overrides.v1.0.json`）
  3. 是否會增加使用者混淆？（兩條路徑可能產生更多警告）

**追問問題**：
1. 為什麼需要「洩」路徑？現有「剋」路徑無法解釋哪些場景？
2. 雙向傳導是否會產生過多警告？（Anti-Spam 規則是否需要調整？）
3. 是否需要建立 ADR 記錄此決策？

---

### 4. 角色原型參數矩陣

**Gemini 方案**：
- 引入完整的角色原型參數矩陣（開拓者、守成者、謀略者、工匠）
- 每個角色有不同的 `volatility_thresholds` 和 `rigidity_weight`

**現有設計**：
- CONSTITUTION V4 Section 5.1 提到「Role Archetype（可選或弱必填）：用於調整 `volatility_thresholds`」
- 但沒有具體的角色定義和參數矩陣

**審核結果**：⚠️ **需追問**

**理由**：
- 這是**結構性變更**（根據 CHARTER Section 3：任何結構性變更必須 ADR + 使用者批准）
- 需要評估：
  1. 角色原型的定義是否合理？（4 個角色是否足夠覆蓋所有使用者？）
  2. 參數值的設定是否有依據？（`[0.20, 0.40]` vs `[0.10, 0.25]` 的差異是否經過驗證？）
  3. 是否需要建立 ADR 記錄此決策？

**追問問題**：
1. 為什麼選擇這 4 個角色原型？是否有遺漏？
2. 參數值（`volatility_thresholds` 和 `rigidity_weight`）的設定依據是什麼？
3. 是否需要建立 ADR 記錄此決策？
4. 如何處理使用者不選擇角色的情況？（使用預設值？）

---

## ❌ 不通過項目（與現有裁示衝突）

### 5. Rigidity 預設值（0.1 vs 0.0）

**Gemini 方案**：
```python
# 若無 Priors，預設為 0.1 (Internal Deficit)，而非 0.0
# 理由：使用者會來尋求幫助，通常帶有輕微的無力感，0.0 過於理想化
if priors and priors.get("attribution_profile"):
    rigidity = _calculate_rigidity_3_layer(priors["attribution_profile"])
else:
    rigidity = 0.1
```

**現有裁示**（任務包）：
- **裁示**：採用 0.0（符合 DIRECTIVE REV.B 的實際內容）
- DIRECTIVE REV.B Section 1.2：`if not profile: return 0.0`

**審核結果**：❌ **不通過**

**理由**：
1. **與任務包裁示衝突**：任務包已明確裁示採用 0.0
2. **與 DIRECTIVE REV.B 衝突**：DIRECTIVE REV.B 是技術裁示文件，具有更高的權威性
3. **Gemini 的理由不充分**：「使用者會來尋求幫助，通常帶有輕微的無力感」是推論，不是事實
4. **0.0 更安全**：缺失 Priors 時，不應該假設使用者的歸因模式，0.0 是最安全的預設值（避免誤判）

**追問問題**：
1. Gemini 是否了解任務包已裁示採用 0.0？
2. 如果堅持使用 0.1，需要建立 ADR 說明為何改為 0.1，並更新 DIRECTIVE REV.B
3. 是否有實際數據支持「使用者會來尋求幫助，通常帶有輕微的無力感」這個假設？

---

## 📋 追問包

### 追問 1：五行全循環矩陣（剋/洩雙向傳導）

**背景**：
- 現有實作只有「剋（Overcomes）」路徑
- Gemini 方案引入「洩（Exhaustion）」路徑，擴充為雙向傳導

**問題**：
1. 為什麼需要「洩」路徑？現有「剋」路徑無法解釋哪些場景？
2. 雙向傳導是否會產生過多警告？（Anti-Spam 規則是否需要調整？）
3. 是否需要建立 ADR 記錄此決策？

**選項**：
- **選項 A**：採納「洩」路徑，建立 ADR，更新實作
- **選項 B**：暫時不採納，先驗證「剋」路徑是否足夠
- **選項 C**：採納但簡化（例如：只在特定條件下觸發「洩」路徑）

---

### 追問 2：角色原型參數矩陣

**背景**：
- CONSTITUTION V4 提到 Role Archetype，但沒有具體定義
- Gemini 方案提供完整的 4 個角色原型和參數矩陣

**問題**：
1. 為什麼選擇這 4 個角色原型？是否有遺漏？
2. 參數值（`volatility_thresholds` 和 `rigidity_weight`）的設定依據是什麼？
3. 是否需要建立 ADR 記錄此決策？
4. 如何處理使用者不選擇角色的情況？（使用預設值？）

**選項**：
- **選項 A**：採納 4 個角色原型，建立 ADR，更新實作
- **選項 B**：暫時不採納，先驗證是否需要角色原型
- **選項 C**：採納但簡化（例如：只調整 `volatility_thresholds`，不調整 `rigidity_weight`）

---

### 追問 3：Rigidity 預設值（0.1 vs 0.0）

**背景**：
- 任務包已明確裁示採用 0.0
- DIRECTIVE REV.B 明確寫入 `return 0.0`
- Gemini 方案建議改為 0.1

**問題**：
1. Gemini 是否了解任務包已裁示採用 0.0？
2. 如果堅持使用 0.1，需要建立 ADR 說明為何改為 0.1，並更新 DIRECTIVE REV.B
3. 是否有實際數據支持「使用者會來尋求幫助，通常帶有輕微的無力感」這個假設？

**選項**：
- **選項 A**：維持 0.0（符合任務包裁示和 DIRECTIVE REV.B）
- **選項 B**：改為 0.1（需要建立 ADR 說明理由，更新 DIRECTIVE REV.B）
- **選項 C**：改為 0.1，但僅在特定條件下（例如：使用者明確選擇了 Role Archetype）

---

## ✅ 可直接整合的部分

### 1. Domain Schema i18n 結構

**整合方式**：
1. 更新 `schemas/domain.schema.json` 支援 `name` 和 `keywords` 的 i18n 結構
2. 保留現有 `labels` 欄位（向後相容）
3. 更新 `domain/domains/bagua.domain_map.v1.0.json` 範例，加入 `name` 和 `keywords`

### 2. 題目數量規範（8 題固定）

**整合方式**：
1. 更新 `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` Section 2.1，明確「固定 8 題為最佳實務」
2. 更新 Section 2.2，明確「10 題擴充時，新增的 2 題必須是 Validation 類型」

---

## 📝 建議

### 建議 1：先整合通過項目

建議先整合通過的項目（Domain Schema i18n 結構、題目數量規範），然後再處理追問項目。

### 建議 2：追問項目需要裁示

追問項目（五行全循環矩陣、角色原型參數矩陣、Rigidity 預設值）需要使用者裁示，因為：
1. 涉及結構性變更（需要 ADR + 批准）
2. 與現有裁示衝突（Rigidity 預設值）
3. 需要評估實作複雜度和影響範圍

---

**建立日期**：2026-01-13  
**審核者**：Cursor（總指揮）  
**狀態**：等待使用者裁示
