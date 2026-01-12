# 主題資料提取計劃

**建立日期**：2026-01-12  
**目的**：系統性提取所有 13 個主題的完整資料  
**文件狀態**：WORKING DOCUMENT（持續更新）

---

## 一、提取策略

### 1.1 提取順序

1. **Questions**：從 questionBank.v1.json 和 p1_question_blueprint_v1.json 提取
2. **Manifests**：從 motherThemes.v1.json 建立
3. **Recommendations**：從 guidanceActionTemplates.v1.json 提取
4. **Riskchains**：從 consequence_chain_library.v1.json 和 buildGuidance.js 提取
5. **Narratives**：從 ContentDB 檔案、resultTemplates 提取（需要分析）

### 1.2 提取原則

- 不進行刪減或整合
- 保持原始資料結構
- 標註來源檔案和位置
- 記錄提取日期和版本

---

## 二、主題清單

### 2.1 13 個主題

1. `chronic_depletion` - 長期耗竭
2. `hyper_responsibility` - 過度責任
3. `fear_based_stability` - 恐懼驅動的穩定
4. `loss_of_agency` - 主控感流失
5. `social_comparison` - 社會比較壓力
6. `suppressed_needs` - 需求壓抑
7. `identity_diffusion` - 自我模糊
8. `chronic_alertness` - 長期警戒
9. `meaning_vacuum` - 意義真空
10. `self_erosion` - 自我耗損
11. `emotional_permeability` - 情緒滲透
12. `avoidance_coping` - 逃避型因應
13. `unprocessed_loss` - 未處理的失落

---

## 三、提取進度

### 3.1 提取狀態表

| 主題 ID | Questions | Scoring | Narratives | Recommendations | Riskchains | Manifest | 狀態 |
|---------|-----------|---------|------------|----------------|------------|----------|------|
| `chronic_depletion` | ✅ | ✅ | ✅ | ✅ | ✅ | ⏳ | 部分完成 |
| `hyper_responsibility` | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `fear_based_stability` | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `loss_of_agency` | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `social_comparison` | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `suppressed_needs` | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `identity_diffusion` | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `chronic_alertness` | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `meaning_vacuum` | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `self_erosion` | ⏳ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `emotional_permeability` | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `avoidance_coping` | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |
| `unprocessed_loss` | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | 待提取 |

**說明**：
- ✅ = 已完成或已存在
- ⏳ = 待提取

---

## 四、提取來源對照

### 4.1 Questions 來源

- `raw/questionBank.v1.json` - 10 個主題
- `raw/p1_question_blueprint_v1.json` - 10 個主題（設計藍圖）

### 4.2 Recommendations 來源

- `templates/guidanceActionTemplates.v1.json` - 10 個主題的行動建議模板
- `raw/guidancePrinciples.v1.json` - 10 個主題的原則

### 4.3 Riskchains 來源

- `raw/consequence_chain_library.v1.json` - 後果鏈庫
- `raw/buildGuidance.js` - 風險鏈生成邏輯

### 4.4 Narratives 來源

- `contentdb/ContentDB_*.js` - 11 個 ContentDB 檔案（需要分析）
- `raw/anchor_statements.v1.json` - 錨定語句
- `narrative_logic/` - narrative 相關邏輯（需要分析）

### 4.5 Manifests 來源

- `raw/motherThemes.v1.json`（需要從 Legacy 提取）或使用已讀取的定義

---

## 五、提取執行計劃

### 5.1 步驟一：提取 Questions

**目標**：提取所有主題的 questions

**執行**：
1. 從 `raw/questionBank.v1.json` 提取 10 個主題的 questions
2. 從 `raw/p1_question_blueprint_v1.json` 提取 10 個主題的 questions（設計藍圖）
3. 合併並整理到 `questions/` 資料夾

---

### 5.2 步驟二：建立 Manifests

**目標**：建立所有主題的 manifest

**執行**：
1. 從 motherThemes.v1.json 的定義建立 manifests
2. 參考現有系統的 manifest 結構（stress_recovery.v1.0.json）
3. 建立到 `manifests/` 資料夾

---

### 5.3 步驟三：提取 Recommendations

**目標**：提取所有主題的 recommendations

**執行**：
1. 從 `templates/guidanceActionTemplates.v1.json` 提取行動建議模板
2. 從 `raw/guidancePrinciples.v1.json` 提取原則
3. 整理到 `recommendations/` 資料夾

---

### 5.4 步驟四：提取 Riskchains

**目標**：提取所有主題的 riskchains

**執行**：
1. 從 `raw/consequence_chain_library.v1.json` 提取後果鏈
2. 從 `raw/buildGuidance.js` 提取風險鏈生成邏輯
3. 整理到 `riskchains/` 資料夾

---

### 5.5 步驟五：提取 Narratives

**目標**：提取所有主題的 narratives

**執行**：
1. 分析 `contentdb/ContentDB_*.js` 檔案，提取相關 narratives
2. 從 `raw/anchor_statements.v1.json` 提取錨定語句
3. 從 `narrative_logic/` 提取相關邏輯
4. 整理到 `narratives/` 資料夾

---

## 六、提取注意事項

### 6.1 資料完整性

- 確保所有主題都有完整的資料
- 標註缺失的資料
- 記錄資料來源

### 6.2 資料結構

- 保持原始資料結構
- 不進行轉換或整合
- 標註資料格式和版本

### 6.3 資料來源

- 所有提取的資料都要標註來源
- 記錄提取日期和版本
- 保持可追溯性

---

**文件狀態**：WORKING DOCUMENT（持續更新）  
**最後更新**：2026-01-12  
**下一步**：開始執行提取計劃
