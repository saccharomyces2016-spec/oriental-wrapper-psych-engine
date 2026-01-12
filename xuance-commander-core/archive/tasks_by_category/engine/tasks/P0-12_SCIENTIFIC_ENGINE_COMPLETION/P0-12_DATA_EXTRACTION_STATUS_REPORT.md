# P0-12 資料提取狀態完整報告

**建立日期**：2026-01-12  
**目的**：確認所有舊版本資料的提取狀態，識別可刪除的重複內容  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、用戶要求確認

根據用戶要求，需要確認以下內容是否已完全提取：

1. ✅ **題目分類和內容**
2. ❌ **母題對應**（pattern_tags, behavior_facet）
3. ✅ **分數計算方式**（confidence_weight）
4. ✅ **題型設計**（choices → scale）

---

## 二、舊版本資料統計

### 2.1 舊版本 questionBank 統計

**文件位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`

**統計**：
- 主題總數：10 個主題
- 總題數：64 題

**主題列表**：
1. chronic_depletion: 7 題
2. hyper responsibility: 5 題
3. fear based stability: 3 題
4. loss_of_agency: 7 題
5. social_comparison: 7 題
6. suppressed_needs: 7 題
7. identity_diffusion: 7 題
8. hyper_responsibility: 7 題
9. emotional_permeability: 7 題
10. avoidance_coping: 7 題

**注意**：`hyper responsibility`（5題）和 `hyper_responsibility`（7題）可能是重複主題。

---

## 三、新版本資料統計

### 3.1 新版本領域統計

**領域總數**：8 個領域  
**總題數**：52 題

**領域列表**：
1. chronic_depletion: 7 題
2. chronic_alertness: 7 題（對應 emotional_permeability）
3. fear_based_stability: 3 題
4. hyper_responsibility: 7 題
5. identity_diffusion: 7 題
6. loss_of_agency: 7 題
7. meaning_vacuum: 7 題（對應 social_comparison）
8. suppressed_needs: 7 題

### 3.2 新版本文件統計

| 文件類型 | 文件數量 | 狀態 |
|---------|---------|------|
| questions | 8 個文件 | ✅ 已生成 |
| scoring | 8 個文件 | ✅ 已生成 |
| narratives | 1 個文件 | ⚠️ 部分完成 |
| recommendations | 1 個文件 | ⚠️ 部分完成 |
| riskchains | 1 個文件 | ⚠️ 部分完成 |

---

## 四、詳細比對結果

### 4.1 題目內容提取狀態

| 新版本領域 | 對應舊版本主題 | 舊版本題數 | 新版本題數 | 提取狀態 |
|-----------|--------------|-----------|-----------|---------|
| chronic_depletion | chronic_depletion | 7 | 7 | ✅ 完全提取 |
| chronic_alertness | emotional_permeability | 7 | 7 | ✅ 完全提取 |
| fear_based_stability | fear based stability | 3 | 3 | ✅ 完全提取 |
| hyper_responsibility | hyper_responsibility | 7 | 7 | ✅ 完全提取 |
| identity_diffusion | identity_diffusion | 7 | 7 | ✅ 完全提取 |
| loss_of_agency | loss_of_agency | 7 | 7 | ✅ 完全提取 |
| meaning_vacuum | social_comparison | 7 | 7 | ✅ 完全提取 |
| suppressed_needs | suppressed_needs | 7 | 7 | ✅ 完全提取 |

**總結**：✅ **8個領域的題目內容已完全提取（52題）**

### 4.2 未提取的舊版本主題

以下舊版本主題未對應到新版本領域：

1. **avoidance_coping**: 7 題（逃避型因應）
2. **hyper responsibility**: 5 題（過度責任）- 注意：可能與 `hyper_responsibility` 重複

---

## 五、資料提取完整性檢查

### 5.1 題目內容 ✅

- ✅ 所有題目文本（question_text → text）已提取
- ✅ 所有選項（choices → scale）已提取
- ✅ 題目 ID 已生成
- ✅ 題型類型（likert_5）已設定

**狀態**：✅ **完全提取**

### 5.2 母題對應 ❌

- ❌ pattern_tags：**未提取**（應在 legacy_map.v1.0.json，但該文件不存在）
- ❌ choice_meta.behavior_facet：**未提取**（應在 legacy_map.v1.0.json，但該文件不存在）

**狀態**：❌ **未提取**

**說明**：根據 `P0-12_IMPLEMENTATION_SPEC_FINAL.md`，pattern_tags 和 choice_meta 應該提取到 `legacy_map.v1.0.json`，但該文件尚未生成。

### 5.3 分數計算方式 ✅

- ✅ confidence_weight 已提取到 scoring.inputs.weight
- ✅ 基本權重結構已轉換
- ⚠️ 完整的計算邏輯（scorer.js 的複雜邏輯）可能尚未完全轉換

**狀態**：✅ **基本提取完成**（複雜邏輯可能未完全轉換）

### 5.4 題型設計 ✅

- ✅ choices 已轉換為 scale（likert_5）
- ✅ 題型類型已設定
- ⚠️ 選項數量問題（舊版本4選項 vs 新版本5選項）待顧問團隊改進

**狀態**：✅ **結構轉換完成**（內容品質待改進）

---

## 六、總結

### 6.1 已提取的內容

1. ✅ **題目分類和內容**：8個領域，52題，完全提取
2. ✅ **分數計算方式**：confidence_weight 已提取到 scoring 文件
3. ✅ **題型設計**：結構轉換完成（內容品質待改進）

### 6.2 未提取的內容

1. ❌ **母題對應**：pattern_tags 和 choice_meta.behavior_facet 尚未提取（legacy_map.v1.0.json 不存在）

### 6.3 未對應的舊版本主題

1. ❌ avoidance_coping: 7 題（未對應）
2. ❌ hyper responsibility: 5 題（未對應，可能與 hyper_responsibility 重複）

---

## 七、刪除建議

### 7.1 可刪除的內容（謹慎建議）

**重要提醒**：雖然題目內容已提取，但 pattern_tags 和 choice_meta 尚未提取，這些資料在舊版本的 questionBank.v1.json 中。

**建議**：
1. ⚠️ **暫時不刪除 questionBank.v1.json**，因為包含未提取的 pattern_tags 和 choice_meta
2. ✅ **可以考慮刪除的部分**：如果確認某些主題已完全提取且不再需要，可以刪除
3. ⚠️ **建議先提取 pattern_tags 和 choice_meta**，再考慮刪除舊版本文件

### 7.2 需要用戶確認的問題

1. pattern_tags 和 choice_meta 是否需要提取？
2. 如果不需要提取，是否可以刪除包含這些資料的舊版本文件？
3. avoidance_coping 和 hyper responsibility 是否需要處理？

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**當前狀態**：✅ **比對完成，等待用戶確認**
