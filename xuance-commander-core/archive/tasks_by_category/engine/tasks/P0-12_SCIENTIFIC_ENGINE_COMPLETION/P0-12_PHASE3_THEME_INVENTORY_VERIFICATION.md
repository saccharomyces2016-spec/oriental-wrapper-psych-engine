# P0-12 階段三：主題數量與分類驗證報告

**建立日期**：2026-01-12  
**驗證目的**：確認當前最新版本的主題數量、主題列表，以及文件分類方式  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、驗證結果總結

### 1.1 Legacy 系統主題總數

**總數**：**10 個主題**

### 1.2 當前系統主題總數

**總數**：**2 個主題**
- 完整主題：1 個（`stress_recovery`）
- 部分主題：1 個（`chronic_depletion`）

### 1.3 未整合主題總數

**總數**：**9 個主題**

---

## 二、Legacy 系統主題詳細列表

### 2.1 guidancePrinciples.v1.json 主題列表

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`

**主題總數**：10 個

**主題列表**（按字母順序）：
1. `chronic_alertness`（慢性警覺）
2. `chronic_depletion`（慢性耗竭）
3. `fear_based_stability`（恐懼驅動的穩定）
4. `hyper_responsibility`（過度責任）
5. `identity_diffusion`（自我模糊）
6. `loss_of_agency`（主控感流失）
7. `meaning_vacuum`（意義真空）
8. `self_erosion`（自我侵蝕）
9. `suppressed_needs`（需求壓抑）
10. `unprocessed_loss`（未處理的失落）

---

### 2.2 p1_question_blueprint_v1.json 主題列表

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json`

**主題總數**：10 個

**主題列表**（與 guidancePrinciples 一致）：
1. `chronic_alertness`
2. `chronic_depletion`
3. `fear_based_stability`
4. `hyper_responsibility`
5. `identity_diffusion`
6. `loss_of_agency`
7. `meaning_vacuum`
8. `self_erosion`
9. `suppressed_needs`
10. `unprocessed_loss`

**藍圖資訊**：
- `totalThemes`: 10
- `questionsPerTheme`: 7
- `totalQuestions`: 70

---

### 2.3 questionBank.v1.json 主題列表

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`

**說明**：questionBank.v1.json 中包含 10 個主題，但部分主題 ID 使用了空格而非下劃線（如 "fear based stability"、"hyper responsibility"），這可能是數據錄入錯誤。**標準格式應使用下劃線**，以 guidancePrinciples 和 p1_question_blueprint_v1.json 為準。

---

### 2.4 Legacy 系統主題完整列表（最終確認）

**標準來源**：以 `guidancePrinciples.v1.json` 和 `p1_question_blueprint_v1.json` 為準（兩者一致）

**總主題數**：**10 個**

**主題列表**（按字母順序）：
1. `chronic_alertness`（慢性警覺）
2. `chronic_depletion`（慢性耗竭）
3. `fear_based_stability`（恐懼驅動的穩定）
4. `hyper_responsibility`（過度責任）
5. `identity_diffusion`（自我模糊）
6. `loss_of_agency`（主控感流失）
7. `meaning_vacuum`（意義真空）
8. `self_erosion`（自我侵蝕）
9. `suppressed_needs`（需求壓抑）
10. `unprocessed_loss`（未處理的失落）

**注意**：questionBank.v1.json 中可能包含 `avoidance_coping`、`emotional_permeability`、`social_comparison` 等主題，但這些主題不在 guidancePrinciples 和 p1_question_blueprint_v1.json 的標準列表中。**應以 guidancePrinciples 和 p1_question_blueprint_v1.json 的 10 個主題為準。**

---

## 三、當前系統主題詳細列表

### 3.1 完整主題（5 個文件類型）

**總數**：1 個

**主題列表**：
1. **`stress_recovery`**（壓力恢復）
   - ✅ `domain/facets/stress_recovery.scoring.v1.0.json`
   - ✅ `domain/questions/stress_recovery.questions.v1.0.json`
   - ✅ `domain/narratives/stress_recovery.narr.v1.0.json`
   - ✅ `domain/recommendations/stress_recovery.reco.v1.0.json`
   - ✅ `domain/riskchains/stress_recovery.risk.v1.0.json`

---

### 3.2 部分主題（< 5 個文件類型）

**總數**：1 個

**主題列表**：
1. **`chronic_depletion`**（慢性耗竭）
   - ❌ `domain/facets/chronic_depletion.scoring.v1.0.json` - 缺失
   - ❌ `domain/questions/chronic_depletion.questions.v1.0.json` - 缺失
   - ✅ `domain/narratives/chronic_depletion.narr.v1.0.json`
   - ✅ `domain/recommendations/chronic_depletion.reco.v1.0.json`
   - ✅ `domain/riskchains/chronic_depletion.risk.v1.0.json`

**說明**：`chronic_depletion` 已完成 Phase 2-2 的轉換設計，但僅有 narratives、recommendations、riskchains 三個文件已寫入系統，仍缺少 questions 和 scoring 文件。

---

## 四、文件分類方式

### 4.1 當前系統文件分類結構

**分類結構**：
```
domain/
├── facets/          # Facet 定義和計分邏輯
│   └── <theme>.scoring.v1.0.json
├── questions/       # 題目定義
│   └── <theme>.questions.v1.0.json
├── narratives/      # 敘事文本（L2/L3 層）
│   └── <theme>.narr.v1.0.json
├── recommendations/ # 建議文本（L4 層）
│   └── <theme>.reco.v1.0.json
├── riskchains/      # 風險鏈文本（L4 層）
│   └── <theme>.risk.v1.0.json
├── manifests/       # Manifest 文件（可選）
│   └── <theme>.v1.0.json
├── knowledge_base/  # 知識庫文件（共享）
└── compiled/        # 編譯後的完整 Facet（可選）
    └── <theme>.v1.0.compiled.json
```

---

### 4.2 每個主題需要的文件（標準配置）

每個主題需要以下 **5 個核心文件**：

1. **`domain/questions/<theme>.questions.v1.0.json`**
   - 題目定義
   - 包含問題文本、選項、scale 等

2. **`domain/facets/<theme>.scoring.v1.0.json`**
   - 計分邏輯
   - 包含計算模型、inputs、bands 等

3. **`domain/narratives/<theme>.narr.v1.0.json`**
   - 敘事文本（L2/L3 層）
   - 包含 low/mid/high 三個 band 的 opening 和 explain

4. **`domain/recommendations/<theme>.reco.v1.0.json`**
   - 建議文本（L4 層）
   - 包含 low/mid/high 三個 band 的建議列表

5. **`domain/riskchains/<theme>.risk.v1.0.json`**
   - 風險鏈文本（L4 層）
   - 包含 mid/high 兩個 band 的風險鏈

**可選文件**：
6. **`domain/manifests/<theme>.v1.0.json`**（可選）
   - Manifest 文件，用於引用和編譯

---

## 五、對比分析

### 5.1 主題對比統計

| 項目 | 數量 |
|------|------|
| Legacy 系統主題總數 | 10 個 |
| 當前系統主題總數 | 2 個 |
| 完整主題（5 個文件類型） | 1 個 |
| 部分主題（< 5 個文件類型） | 1 個 |
| 未整合的 Legacy 主題 | 9 個 |

---

### 5.2 已整合主題

**總數**：1 個（部分整合）

**主題列表**：
1. **`chronic_depletion`**
   - 狀態：部分整合（3/5 文件）
   - 已整合：narratives、recommendations、riskchains
   - 未整合：questions、scoring

---

### 5.3 未整合主題

**總數**：9 個

**主題列表**（按字母順序）：
1. `chronic_alertness`（慢性警覺）
2. `fear_based_stability`（恐懼驅動的穩定）
3. `hyper_responsibility`（過度責任）
4. `identity_diffusion`（自我模糊）
5. `loss_of_agency`（主控感流失）
6. `meaning_vacuum`（意義真空）
7. `self_erosion`（自我侵蝕）
8. `suppressed_needs`（需求壓抑）
9. `unprocessed_loss`（未處理的失落）

---

### 5.4 特殊說明

**`stress_recovery`**：
- 這是當前系統的原生主題（非來自 Legacy）
- 完整整合（5/5 文件）
- 作為系統的 MVP 範例

---

## 六、修正後的步驟四任務範圍

### 6.1 主題整合任務

**需要整合的 Legacy 主題**：**9 個主題**

**具體列表**：
1. `chronic_alertness`
2. `fear_based_stability`
3. `hyper_responsibility`
4. `identity_diffusion`
5. `loss_of_agency`
6. `meaning_vacuum`
7. `self_erosion`
8. `suppressed_needs`
9. `unprocessed_loss`

### 6.2 `chronic_depletion` 補完任務

**狀態**：部分整合（3/5 文件）

**需要補完的文件**：
1. `domain/questions/chronic_depletion.questions.v1.0.json`
2. `domain/facets/chronic_depletion.scoring.v1.0.json`

---

## 七、總結

### 7.1 主題數量確認

- **Legacy 系統主題總數**：**10 個主題**
- **當前系統主題總數**：**2 個主題**（1 個完整 + 1 個部分）
- **未整合主題總數**：**9 個主題**

### 7.2 文件分類確認

每個主題需要 **5 個核心文件**：
1. questions（題目定義）
2. scoring（計分邏輯）
3. narratives（敘事文本）
4. recommendations（建議文本）
5. riskchains（風險鏈文本）

### 7.3 步驟四任務範圍修正

**需要整合的主題**：**9 個主題**（不是 9+ 個）

**需要補完的主題**：**1 個主題**（`chronic_depletion` 需要補完 questions 和 scoring）

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**狀態**：✅ **驗證完成**
