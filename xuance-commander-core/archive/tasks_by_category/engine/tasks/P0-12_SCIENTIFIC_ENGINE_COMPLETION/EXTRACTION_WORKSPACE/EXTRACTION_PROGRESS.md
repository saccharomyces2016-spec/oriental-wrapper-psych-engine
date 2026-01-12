# Legacy 資料提取進度報告

**建立日期**：2026-01-12  
**最後更新**：2026-01-12  
**文件狀態**：WORKING DOCUMENT（持續更新）

---

## 一、提取進度總覽

### 1.1 整體進度

| 類別 | 總數 | 已提取 | 待提取 | 完成度 |
|------|------|--------|--------|--------|
| **系統邏輯和規則** | 7 | 7 | 0 | ✅ 100% |
| **ContentDB 檔案** | 11 | 11 | 0 | ✅ 100% |
| **narrative 邏輯** | 3 | 3 | 0 | ✅ 100% |
| **guidance 邏輯** | 5 | 5 | 0 | ✅ 100% |
| **resultTemplates** | 5 | 5 | 0 | ✅ 100% |
| **主題相關資料** | 13 | 0 | 13 | ⏳ 0% |
| **題庫資料** | 2 | 0 | 2 | ⏳ 0% |

**整體完成度**：約 **30%**（系統檔案已完成，主題資料待提取）

---

## 二、已完成的提取

### 2.1 系統邏輯和規則 ✅

**已提取檔案**：
1. ✅ `templates/guidanceActionTemplates.v1.json` - 行動建議模板（10 個主題）
2. ✅ `raw/buildGuidance.js` - 結果生成核心邏輯
3. ✅ `raw/guidancePrinciples.v1.json` - 原則定義（映射到母題）
4. ✅ `raw/intervention_boundary_matrix.v1.json` - 介入邊界矩陣
5. ✅ `raw/anchor_statements.v1.json` - 錨定語句
6. ✅ `raw/five_element_mapping.v1.json` - 五行映射
7. ✅ `raw/attribution_error_matrix.v1.json` - 歸因錯誤矩陣
8. ✅ `raw/consequence_chain_library.v1.json` - 後果鏈庫

**提取日期**：2026-01-12

---

### 2.2 ContentDB 檔案 ✅

**已提取檔案**（11 個）：
1. ✅ `contentdb/ContentDB_career.js` - 職業相關
2. ✅ `contentdb/ContentDB_family.js` - 家庭相關
3. ✅ `contentdb/ContentDB_finance.js` - 財務相關
4. ✅ `contentdb/ContentDB_health.js` - 健康相關
5. ✅ `contentdb/ContentDB_index.js` - 索引檔案
6. ✅ `contentdb/ContentDB_love.js` - 愛情相關
7. ✅ `contentdb/ContentDB_money.js` - 金錢相關
8. ✅ `contentdb/ContentDB_relationship.js` - 關係相關
9. ✅ `contentdb/ContentDB_self.js` - 自我相關
10. ✅ `contentdb/ContentDB_social.js` - 社交相關
11. ✅ `contentdb/ContentDB_study.js` - 學習相關

**提取日期**：2026-01-12

---

### 2.3 narrative 邏輯 ✅

**已提取檔案**（3 個）：
1. ✅ `narrative_logic/elementNarrative.v1.js` - 元素敘事
2. ✅ `narrative_logic/hookRules.json` - Hook 規則
3. ✅ `narrative_logic/round2OracularText.v1.js` - 第二輪神諭文本

**提取日期**：2026-01-12

---

### 2.4 guidance 邏輯 ✅

**已提取檔案**（5 個）：
1. ✅ `guidance_logic/chains.json` - 鏈條定義
2. ✅ `guidance_logic/guidance.schema.json` - Guidance Schema
3. ✅ `guidance_logic/interventions.json` - 介入定義
4. ✅ `guidance_logic/modifiers.json` - 修飾符定義
5. ✅ `guidance_logic/schema.json` - Schema 定義

**提取日期**：2026-01-12

---

## 三、待提取的資料

### 3.1 主題相關資料 ⏳

**待提取主題**（13 個）：
1. ⏳ `hyper_responsibility` - 過度責任
2. ⏳ `fear_based_stability` - 恐懼驅動的穩定
3. ⏳ `loss_of_agency` - 主控感流失
4. ⏳ `social_comparison` - 社會比較壓力
5. ⏳ `suppressed_needs` - 需求壓抑
6. ⏳ `identity_diffusion` - 自我模糊
7. ⏳ `chronic_alertness` - 長期警戒
8. ⏳ `meaning_vacuum` - 意義真空
9. ⏳ `self_erosion` - 自我耗損
10. ⏳ `emotional_permeability` - 情緒滲透
11. ⏳ `avoidance_coping` - 逃避型因應
12. ⏳ `unprocessed_loss` - 未處理的失落
13. ⏳ `chronic_depletion` - 長期耗竭（補充 manifest）

**每個主題需要提取的資料**：
- Questions（部分已有，需確認完整性）
- Scoring（部分已有，需確認完整性）
- Narratives（待提取）
- Recommendations（待提取）
- Riskchains（待提取）
- Manifest（待建立）

**提取來源**：
- Legacy 題庫：`questionBank.v1.json`
- 題目藍圖：`p1_question_blueprint_v1.json`
- resultTemplates：已提取到 `raw/`
- buildGuidance.js：已提取到 `raw/`
- guidancePrinciples：已提取到 `raw/`
- guidanceActionTemplates：已提取到 `templates/`
- ContentDB 檔案：已提取到 `contentdb/`

---

### 3.2 題庫資料 ⏳

**待提取檔案**（2 個）：
1. ⏳ `questionBank.v1.json` - Legacy 題庫（10 個主題）
2. ⏳ `p1_question_blueprint_v1.json` - 題目藍圖（10 個主題）

**提取來源**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/packages/data/src/raw/legacy_questionBank.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json`

---

## 四、下一步行動

### 4.1 立即執行

1. **提取題庫資料**
   - 提取 `questionBank.v1.json`
   - 提取 `p1_question_blueprint_v1.json`
   - 備份到 `raw/` 資料夾

2. **開始提取主題相關資料**
   - 從已提取的檔案中提取各主題的 narratives、recommendations、riskchains
   - 建立各主題的 manifest
   - 確認 questions 和 scoring 的完整性

---

### 4.2 後續執行

3. **完成所有主題的提取**
4. **建立提取索引**
5. **進行總整理**
6. **準備交給顧問團隊的資料包**

---

## 五、提取注意事項

### 5.1 已完成的提取

- ✅ 所有系統邏輯和規則檔案已提取
- ✅ 所有 ContentDB 檔案已提取
- ✅ 所有 narrative 和 guidance 邏輯檔案已提取
- ✅ 所有 resultTemplates 已提取

### 5.2 待完成的提取

- ⏳ 主題相關資料（13 個主題 × 多個檔案類型）
- ⏳ 題庫資料（2 個檔案）

### 5.3 提取原則

1. **不進行刪減**：提取時不進行刪減或整合
2. **保持原始結構**：保持原始資料結構
3. **標註來源**：所有提取的資料都要標註來源
4. **記錄版本**：記錄提取日期和版本
5. **備份原始檔案**：在 `raw/` 資料夾中備份原始檔案

---

**文件狀態**：WORKING DOCUMENT（持續更新）  
**最後更新**：2026-01-12  
**下次更新**：每次提取完成後
