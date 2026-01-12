# P0-12 資料提取完成報告

**建立日期**：2026-01-12  
**目的**：記錄所有資料提取完成狀態，準備進行雙向比對和舊資料清理  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、提取完成狀態

### 1.1 已提取的資料

#### ✅ 題目內容（questions）

**文件位置**：`domain/questions/{facet_id}.questions.v1.0.json`

**統計**：
- 領域數：8 個領域
- 總題數：52 題
- 文件狀態：✅ 全部生成

**提取內容**：
- question_text → text（題目文本）
- choices → scale（選項）
- 題型類型：likert_5

---

#### ✅ 分數計算方式（scoring）

**文件位置**：`domain/facets/{facet_id}.scoring.v1.0.json`

**統計**：
- 文件數：8 個文件
- 文件狀態：✅ 全部生成

**提取內容**：
- confidence_weight → inputs[].weight（權重）
- 計算模型：weighted_sum
- bands 定義：low/mid/high

---

#### ✅ 母題對應（legacy_map）

**文件位置**：`domain/knowledge_base/legacy_map.v1.0.json`

**統計**：
- 領域數：8 個領域
- 文件狀態：✅ 已生成

**提取內容**：
- pattern_tags（模式標籤）
- choice_meta.behavior_facet（行為構面）
- confidence_weight（權重）

**結構**：
```json
{
  "{domain_id}": {
    "domainId": "{domain_id}",
    "mappings": {
      "{question_id}": {
        "{choice_index}": {
          "pattern": "{behavior_facet}",
          "legacy_weight": {weight}
        }
      }
    }
  }
}
```

---

## 二、新舊版本對應關係

### 2.1 領域對應表

| 新版本領域 | 舊版本主題 | 題數 | 狀態 |
|-----------|-----------|------|------|
| chronic_depletion | chronic_depletion | 7 | ✅ 已提取 |
| chronic_alertness | emotional_permeability | 7 | ✅ 已提取 |
| fear_based_stability | fear based stability | 3 | ✅ 已提取 |
| hyper_responsibility | hyper_responsibility | 7 | ✅ 已提取 |
| identity_diffusion | identity_diffusion | 7 | ✅ 已提取 |
| loss_of_agency | loss_of_agency | 7 | ✅ 已提取 |
| meaning_vacuum | social_comparison | 7 | ✅ 已提取 |
| suppressed_needs | suppressed_needs | 7 | ✅ 已提取 |

**總結**：✅ **8個領域，52題，全部已提取**

---

## 三、雙向比對確認

### 3.1 新版本文件完整性檢查

| 領域 | questions | scoring | legacy_map | 狀態 |
|------|-----------|---------|------------|------|
| chronic_depletion | ✅ | ✅ | ✅ | ✅ 完整 |
| chronic_alertness | ✅ | ✅ | ✅ | ✅ 完整 |
| fear_based_stability | ✅ | ✅ | ✅ | ✅ 完整 |
| hyper_responsibility | ✅ | ✅ | ✅ | ✅ 完整 |
| identity_diffusion | ✅ | ✅ | ✅ | ✅ 完整 |
| loss_of_agency | ✅ | ✅ | ✅ | ✅ 完整 |
| meaning_vacuum | ✅ | ✅ | ✅ | ✅ 完整 |
| suppressed_needs | ✅ | ✅ | ✅ | ✅ 完整 |

**總結**：✅ **所有領域的資料已完整提取**

---

### 3.2 舊版本資料狀態

**已提取的舊版本主題（8個）**：
1. chronic_depletion（7題）
2. emotional_permeability（7題）→ chronic_alertness
3. fear based stability（3題）→ fear_based_stability
4. hyper_responsibility（7題）
5. identity_diffusion（7題）
6. loss_of_agency（7題）
7. social_comparison（7題）→ meaning_vacuum
8. suppressed_needs（7題）

**未提取的舊版本主題（2個）**：
1. avoidance_coping（7題）- 未對應到新版本領域
2. hyper responsibility（5題）- 可能與 hyper_responsibility 重複

---

## 四、可刪除的舊版本內容

### 4.1 已完全提取的內容

根據雙向比對確認，以下舊版本內容已完全提取到新版本：

#### ✅ questionBank.v1.json 中的已提取內容

**可刪除的部分**：
- chronic_depletion 主題的所有題目數據
- emotional_permeability 主題的所有題目數據
- fear based stability 主題的所有題目數據
- hyper_responsibility 主題的所有題目數據
- identity_diffusion 主題的所有題目數據
- loss_of_agency 主題的所有題目數據
- social_comparison 主題的所有題目數據
- suppressed_needs 主題的所有題目數據

**注意**：
- 這些主題的 question_text, choices, pattern_tags, choice_meta 都已提取
- 但 avoidance_coping 和 hyper responsibility 尚未提取

---

### 4.2 需要保留的內容

以下內容需要保留（未提取或可能需要）：

1. **avoidance_coping 主題**：7 題（未對應到新版本領域）
2. **hyper responsibility 主題**：5 題（可能與 hyper_responsibility 重複，需確認）
3. **其他舊版本文件**：scorer.js, guidancePrinciples, buildGuidance.js（可能還需參考）

---

## 五、下一步行動

### 5.1 準備交付顧問團

**交付內容**：
1. ✅ 所有新版本文件（questions, scoring, legacy_map）
2. ✅ 提取狀態報告
3. ✅ 比對確認結果

**交付目的**：
- 進行總整理
- 語境轉換改進
- 內容品質提升

---

### 5.2 舊資料清理計劃

**清理原則**：
1. ✅ 僅刪除已完全提取的內容
2. ✅ 保留未提取的內容（avoidance_coping, hyper responsibility）
3. ✅ 保留可能還需參考的文件（scorer.js 等）

**清理步驟**：
1. 等待顧問團總整理完成
2. 確認所有資料已在新版本中正確使用
3. 進行最終比對確認
4. 執行清理（刪除重複的舊資料）

---

## 六、總結

### 6.1 提取完成狀態

- ✅ **題目內容**：8個領域，52題，完全提取
- ✅ **分數計算方式**：8個scoring文件，完全提取
- ✅ **母題對應**：legacy_map.v1.0.json，完全提取

### 6.2 比對確認結果

- ✅ **新版本文件完整性**：所有領域的文件都已生成
- ✅ **資料提取完整性**：所有對應的舊版本資料都已提取
- ⚠️ **未提取的主題**：2個主題（avoidance_coping, hyper responsibility）

### 6.3 可清理狀態

- ✅ **已準備好交付顧問團進行總整理**
- ⚠️ **舊資料清理**：等待顧問團總整理完成後再執行

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**當前狀態**：✅ **資料提取完成，準備交付顧問團**
