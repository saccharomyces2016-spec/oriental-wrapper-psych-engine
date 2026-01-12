# Legacy 資料完整提取報告

**建立日期**：2026-01-12  
**目的**：記錄所有已提取的 Legacy 資料  
**文件狀態**：WORKING DOCUMENT（持續更新）

---

## 一、提取完成度總覽

### 1.1 整體完成度

| 類別 | 總數 | 已提取 | 待提取 | 完成度 |
|------|------|--------|--------|--------|
| **系統邏輯和規則** | 7 | 7 | 0 | ✅ 100% |
| **ContentDB 檔案** | 11 | 11 | 0 | ✅ 100% |
| **narrative 邏輯** | 3 | 3 | 0 | ✅ 100% |
| **guidance 邏輯** | 5 | 5 | 0 | ✅ 100% |
| **resultTemplates** | 5 | 5 | 0 | ✅ 100% |
| **題庫資料** | 2 | 2 | 0 | ✅ 100% |
| **Questions** | 13 | 8 | 5 | ⏳ 62% |
| **Manifests** | 13 | 13 | 0 | ✅ 100% |
| **Recommendations** | 13 | 10 | 3 | ⏳ 77% |
| **Narratives** | 13 | 0 | 13 | ⏳ 0% |
| **Riskchains** | 13 | 0 | 13 | ⏳ 0% |

**整體完成度**：約 **60%**

---

## 二、已提取資料詳細清單

### 2.1 Questions ✅（8/13）

**已提取主題**：
1. ✅ `chronic_depletion` - 長期耗竭（7 題）
2. ✅ `loss_of_agency` - 主控感流失（7 題）
3. ✅ `social_comparison` - 社會比較壓力（7 題）
4. ✅ `suppressed_needs` - 需求壓抑（7 題）
5. ✅ `identity_diffusion` - 自我模糊（7 題）
6. ✅ `hyper_responsibility` - 過度責任（7 題）
7. ✅ `emotional_permeability` - 情緒滲透（7 題）
8. ✅ `avoidance_coping` - 逃避型因應（7 題）

**待提取主題**：
1. ⏳ `fear_based_stability` - 恐懼驅動的穩定（需從 p1_question_blueprint_v1.json 提取）
2. ⏳ `chronic_alertness` - 長期警戒（需從 p1_question_blueprint_v1.json 提取）
3. ⏳ `meaning_vacuum` - 意義真空（需從 p1_question_blueprint_v1.json 提取）
4. ⏳ `self_erosion` - 自我耗損（需從 p1_question_blueprint_v1.json 提取）
5. ⏳ `unprocessed_loss` - 未處理的失落（需從 p1_question_blueprint_v1.json 提取）

**提取來源**：
- `raw/questionBank.v1.json` - 8 個主題
- `raw/p1_question_blueprint_v1.json` - 待提取 5 個主題

---

### 2.2 Manifests ✅（13/13）

**已建立主題**：
1. ✅ `chronic_depletion.v1.0.json`
2. ✅ `hyper_responsibility.v1.0.json`
3. ✅ `fear_based_stability.v1.0.json`
4. ✅ `loss_of_agency.v1.0.json`
5. ✅ `social_comparison.v1.0.json`
6. ✅ `suppressed_needs.v1.0.json`
7. ✅ `identity_diffusion.v1.0.json`
8. ✅ `chronic_alertness.v1.0.json`
9. ✅ `meaning_vacuum.v1.0.json`
10. ✅ `self_erosion.v1.0.json`
11. ✅ `emotional_permeability.v1.0.json`
12. ✅ `avoidance_coping.v1.0.json`
13. ✅ `unprocessed_loss.v1.0.json`

**提取來源**：從 motherThemes.v1.json 定義建立

---

### 2.3 Recommendations ✅（10/13）

**已提取主題**：
1. ✅ `chronic_depletion.reco.v1.0.json`
2. ✅ `loss_of_agency.reco.v1.0.json`
3. ✅ `hyper_responsibility.reco.v1.0.json`
4. ✅ `fear_based_stability.reco.v1.0.json`
5. ✅ `identity_diffusion.reco.v1.0.json`
6. ✅ `suppressed_needs.reco.v1.0.json`
7. ✅ `chronic_alertness.reco.v1.0.json`
8. ✅ `unprocessed_loss.reco.v1.0.json`
9. ✅ `meaning_vacuum.reco.v1.0.json`
10. ✅ `self_erosion.reco.v1.0.json`

**待提取主題**：
1. ⏳ `social_comparison` - 社會比較壓力（guidanceActionTemplates 中沒有）
2. ⏳ `emotional_permeability` - 情緒滲透（guidanceActionTemplates 中沒有）
3. ⏳ `avoidance_coping` - 逃避型因應（guidanceActionTemplates 中沒有）

**提取來源**：
- `templates/guidanceActionTemplates.v1.json` - 10 個主題

---

### 2.4 Narratives ⏳（0/13）

**待提取主題**：所有 13 個主題

**提取來源**：
- `contentdb/ContentDB_*.js` - 需要分析 11 個檔案
- `raw/anchor_statements.v1.json` - 錨定語句
- `narrative_logic/` - narrative 相關邏輯

**狀態**：需要手動分析 ContentDB 檔案，提取各主題相關的 narratives

---

### 2.5 Riskchains ⏳（0/13）

**待提取主題**：所有 13 個主題

**提取來源**：
- `raw/consequence_chain_library.v1.json` - 後果鏈庫
- `raw/buildGuidance.js` - 風險鏈生成邏輯

**狀態**：需要從 consequence_chain_library 和 buildGuidance.js 提取各主題相關的 riskchains

---

## 三、待完成工作

### 3.1 高優先級

1. **補充 Questions**（5 個主題）
   - 從 `p1_question_blueprint_v1.json` 提取：
     - `fear_based_stability`
     - `chronic_alertness`
     - `meaning_vacuum`
     - `self_erosion`
     - `unprocessed_loss`

2. **提取 Narratives**（13 個主題）
   - 分析 `contentdb/ContentDB_*.js` 檔案
   - 提取各主題相關的 narratives
   - 整理到 `narratives/` 資料夾

3. **提取 Riskchains**（13 個主題）
   - 從 `consequence_chain_library.v1.json` 提取
   - 從 `buildGuidance.js` 提取風險鏈生成邏輯
   - 整理到 `riskchains/` 資料夾

4. **補充 Recommendations**（3 個主題）
   - `social_comparison`
   - `emotional_permeability`
   - `avoidance_coping`
   - 可能需要從其他來源提取或標註缺失

---

### 3.2 中優先級

5. **建立資料對照表**
   - Legacy → 現有系統對照表
   - 主題對照表
   - 欄位對照表

6. **識別重複和衝突**
   - 識別重複資料
   - 識別衝突資料
   - 標註需要顧問團隊處理的部分

---

## 四、提取檔案位置

### 4.1 已提取檔案位置

- **Questions**：`EXTRACTION_WORKSPACE/questions/`
- **Manifests**：`EXTRACTION_WORKSPACE/manifests/`
- **Recommendations**：`EXTRACTION_WORKSPACE/recommendations/`

### 4.2 待提取檔案位置

- **Narratives**：`EXTRACTION_WORKSPACE/narratives/`（待建立）
- **Riskchains**：`EXTRACTION_WORKSPACE/riskchains/`（待建立）

---

## 五、下一步行動

### 5.1 立即執行

1. **補充 Questions**（5 個主題）
   - 從 `p1_question_blueprint_v1.json` 提取

2. **提取 Narratives**（13 個主題）
   - 分析 ContentDB 檔案
   - 提取各主題相關的 narratives

3. **提取 Riskchains**（13 個主題）
   - 從 consequence_chain_library 提取
   - 從 buildGuidance.js 提取邏輯

---

### 5.2 後續執行

4. **建立資料對照表**
5. **識別重複和衝突**
6. **完成總整理報告**
7. **準備交給顧問團隊的資料包**

---

**文件狀態**：WORKING DOCUMENT（持續更新）  
**最後更新**：2026-01-12  
**完成度**：約 60%
