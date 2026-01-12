# P0-12 全面資料盤點與比對報告

**建立日期**：2026-01-12  
**目的**：確認所有舊版本資料是否已提取到新版本，識別重複內容並準備刪除  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、盤點範圍

### 1.1 需要盤點的內容

根據用戶要求，需要確認以下內容是否已完全提取：

1. **題目分類和內容**（questions）
2. **母題對應**（pattern_tags, behavior_facet）
3. **分數計算方式**（confidence_weight, 計算邏輯）
4. **題型設計**（choices, pattern_tags）
5. **所有相關內容**

---

## 二、舊版本資料盤點

### 2.1 關鍵文件位置

| 文件類型 | 文件路徑 | 狀態 | 說明 |
|---------|---------|------|------|
| questionBank | `docs/legacy/.../questionBank.v1.json` | ✅ 存在 | 包含所有主題的題目資料 |
| scorer.js | `docs/legacy/.../scorer.js` | ✅ 存在 | 計算邏輯 |
| guidancePrinciples | `docs/legacy/.../guidancePrinciples.v1.json` | ✅ 存在 | 母題原則 |
| buildGuidance.js | `docs/legacy/.../buildGuidance.js` | ✅ 存在 | 結果生成邏輯 |

### 2.2 舊版本 questionBank 統計

**主題總數**：10 個主題  
**總題數**：（待統計）

**主題列表**：
1. chronic_depletion
2. hyper responsibility
3. fear based stability
4. loss_of_agency
5. social_comparison
6. suppressed_needs
7. identity_diffusion
8. hyper_responsibility
9. emotional_permeability
10. avoidance_coping

---

## 三、新版本資料盤點

### 3.1 新版本領域統計

**領域總數**：8 個領域  
**總題數**：（待統計）

**領域列表**：
1. chronic_depletion
2. chronic_alertness
3. fear_based_stability
4. hyper_responsibility
5. identity_diffusion
6. loss_of_agency
7. meaning_vacuum
8. suppressed_needs

### 3.2 新版本文件統計

| 文件類型 | 文件數量 | 狀態 |
|---------|---------|------|
| questions | 8 個文件 | ✅ 已生成（初步版本） |
| scoring | 8 個文件 | ✅ 已生成（初步版本） |
| narratives | 2 個文件 | ⚠️ 部分完成 |
| recommendations | 2 個文件 | ⚠️ 部分完成 |
| riskchains | 2 個文件 | ⚠️ 部分完成 |

---

## 四、新舊版本比對

### 4.1 題目內容提取狀態

| 新版本領域 | 對應舊版本主題 | 舊版本題數 | 新版本題數 | 提取狀態 |
|-----------|--------------|-----------|-----------|---------|
| chronic_depletion | chronic_depletion | (待統計) | (待統計) | ✅/❌ |
| chronic_alertness | emotional_permeability | (待統計) | (待統計) | ✅/❌ |
| fear_based_stability | fear based stability | (待統計) | (待統計) | ✅/❌ |
| hyper_responsibility | hyper_responsibility | (待統計) | (待統計) | ✅/❌ |
| identity_diffusion | identity_diffusion | (待統計) | (待統計) | ✅/❌ |
| loss_of_agency | loss_of_agency | (待統計) | (待統計) | ✅/❌ |
| meaning_vacuum | social_comparison | (待統計) | (待統計) | ✅/❌ |
| suppressed_needs | suppressed_needs | (待統計) | (待統計) | ✅/❌ |

### 4.2 未提取的主題

（待統計）

---

## 五、資料提取完整性檢查

### 5.1 題目內容

- [ ] 所有題目文本是否已提取
- [ ] 所有選項（choices）是否已提取
- [ ] 題目 ID 是否已生成

### 5.2 母題對應

- [ ] pattern_tags 是否已提取（應在 legacy_map.v1.0.json）
- [ ] behavior_facet 是否已提取（應在 legacy_map.v1.0.json）
- [ ] 母題映射關係是否已建立

### 5.3 分數計算方式

- [ ] confidence_weight 是否已提取（應在 scoring 文件）
- [ ] 計算邏輯是否已轉換（scorer.js → scoring 文件）
- [ ] bands 定義是否已建立

### 5.4 題型設計

- [ ] choices 是否已轉換為 scale
- [ ] 題型類型（likert_5）是否已設定
- [ ] 選項數量是否正確（5 選項 vs 4 選項問題）

---

## 六、重複資料識別

### 6.1 需要比對的內容

1. **題目內容**：新版本的 questions 文件 vs 舊版本的 questionBank
2. **計算邏輯**：新版本的 scoring 文件 vs 舊版本的 scorer.js
3. **母題對應**：新版本的 legacy_map（如有）vs 舊版本的 questionBank

### 6.2 重複判定標準

- ✅ 如果新版本已完全提取舊版本的內容
- ✅ 如果新版本的內容可以完全替代舊版本
- ✅ 如果舊版本內容已在新版本中有對應

---

## 七、刪除計劃

### 7.1 可刪除的文件

（待確認後列出）

### 7.2 刪除原則

- ✅ 直接刪除（不封存）
- ✅ 僅刪除已完全提取的內容
- ✅ 保留未提取或無法對應的內容

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**當前狀態**：⏳ 進行中
