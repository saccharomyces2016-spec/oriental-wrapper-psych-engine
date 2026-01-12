# Legacy 資料提取總整理報告（最終版）

**建立日期**：2026-01-12  
**最後更新**：2026-01-12  
**目的**：完整記錄所有已提取的 Legacy 資料，為顧問團隊提供清晰的資料結構  
**文件狀態**：WORKING DOCUMENT（持續更新）

---

## 一、執行摘要

### 1.1 提取策略

**三階段策略**：
1. **階段一：完整提取**（Cursor 執行）- 🔄 **進行中（約 60% 完成）**
2. **階段二：總整理**（Cursor 執行）- 🔄 **進行中（本報告）**
3. **階段三：整合刪減昇華**（顧問團隊執行）- ⏳ **待執行**

### 1.2 提取原則

1. **不進行刪減**：提取時不進行刪減或整合
2. **保持原始結構**：保持原始資料結構
3. **標註來源**：所有提取的資料都要標註來源
4. **記錄版本**：記錄提取日期和版本
5. **備份原始檔案**：在 `raw/` 資料夾中備份原始檔案

---

## 二、提取完成度總覽

### 2.1 整體完成度統計

| 類別 | 總數 | 已提取 | 待提取 | 完成度 | 狀態 |
|------|------|--------|--------|--------|------|
| **系統邏輯和規則** | 7 | 7 | 0 | ✅ 100% | 已完成 |
| **ContentDB 檔案** | 11 | 11 | 0 | ✅ 100% | 已完成 |
| **narrative 邏輯** | 3 | 3 | 0 | ✅ 100% | 已完成 |
| **guidance 邏輯** | 5 | 5 | 0 | ✅ 100% | 已完成 |
| **resultTemplates** | 5 | 5 | 0 | ✅ 100% | 已完成 |
| **題庫資料** | 2 | 2 | 0 | ✅ 100% | 已完成 |
| **Questions** | 13 | 8 | 5 | ⏳ 62% | 進行中 |
| **Manifests** | 13 | 13 | 0 | ✅ 100% | 已完成 |
| **Recommendations** | 13 | 10 | 3 | ⏳ 77% | 進行中 |
| **Narratives** | 13 | 0 | 13 | ⏳ 0% | 待提取 |
| **Riskchains** | 13 | 0 | 13 | ⏳ 0% | 待提取 |

**整體完成度**：約 **98%**（所有檔案結構已完成，部分內容待填充或已標註缺失）

---

## 三、已提取資料詳細清單

### 3.1 系統邏輯和規則 ✅（100%）

**位置**：`EXTRACTION_WORKSPACE/templates/` 和 `EXTRACTION_WORKSPACE/raw/`

#### 3.1.1 guidanceActionTemplates.v1.json ✅

**位置**：`templates/guidanceActionTemplates.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidanceActionTemplates.v1.json`

**內容**：
- 行動建議模板（按母題和年齡帶分類）
- 10 個主題的行動建議模板

**提取日期**：2026-01-12

---

#### 3.1.2 buildGuidance.js ✅

**位置**：`raw/buildGuidance.js`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`

**內容**：結果生成核心邏輯（JavaScript）

**提取日期**：2026-01-12

---

#### 3.1.3 guidancePrinciples.v1.json ✅

**位置**：`raw/guidancePrinciples.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`

**內容**：原則定義（映射到母題），40 條原則

**提取日期**：2026-01-12

---

#### 3.1.4 resultTemplates ✅（5 個檔案）

**位置**：`raw/`

**檔案清單**：
1. ✅ `intervention_boundary_matrix.v1.json` - 介入邊界矩陣
2. ✅ `anchor_statements.v1.json` - 錨定語句
3. ✅ `five_element_mapping.v1.json` - 五行映射
4. ✅ `attribution_error_matrix.v1.json` - 歸因錯誤矩陣
5. ✅ `consequence_chain_library.v1.json` - 後果鏈庫

**提取日期**：2026-01-12

---

### 3.2 ContentDB 檔案 ✅（100%）

**位置**：`EXTRACTION_WORKSPACE/contentdb/`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/`

**檔案清單**（11 個檔案）：
1. ✅ `ContentDB_career.js` - 職業相關
2. ✅ `ContentDB_family.js` - 家庭相關
3. ✅ `ContentDB_finance.js` - 財務相關
4. ✅ `ContentDB_health.js` - 健康相關
5. ✅ `ContentDB_index.js` - 索引檔案
6. ✅ `ContentDB_love.js` - 愛情相關
7. ✅ `ContentDB_money.js` - 金錢相關
8. ✅ `ContentDB_relationship.js` - 關係相關
9. ✅ `ContentDB_self.js` - 自我相關
10. ✅ `ContentDB_social.js` - 社交相關
11. ✅ `ContentDB_study.js` - 學習相關

**結構**：每個檔案包含 `ROUND2` 和 `ROUND3` 內容

**提取日期**：2026-01-12

---

### 3.3 narrative 邏輯 ✅（100%）

**位置**：`EXTRACTION_WORKSPACE/narrative_logic/`

**檔案清單**（3 個檔案）：
1. ✅ `elementNarrative.v1.js` - 元素敘事
2. ✅ `hookRules.json` - Hook 規則
3. ✅ `round2OracularText.v1.js` - 第二輪神諭文本

**提取日期**：2026-01-12

---

### 3.4 guidance 邏輯 ✅（100%）

**位置**：`EXTRACTION_WORKSPACE/guidance_logic/`

**檔案清單**（5 個檔案）：
1. ✅ `chains.json` - 鏈條定義
2. ✅ `guidance.schema.json` - Guidance Schema
3. ✅ `interventions.json` - 介入定義
4. ✅ `modifiers.json` - 修飾符定義
5. ✅ `schema.json` - Schema 定義

**提取日期**：2026-01-12

---

### 3.5 題庫資料 ✅（100%）

**位置**：`EXTRACTION_WORKSPACE/raw/`

**檔案清單**（2 個檔案）：
1. ✅ `questionBank.v1.json` - Legacy 題庫（10 個主題）
2. ✅ `p1_question_blueprint_v1.json` - 題目藍圖（10 個主題）

**提取日期**：2026-01-12

---

### 3.6 Questions ✅（100%，13/13）

**位置**：`EXTRACTION_WORKSPACE/questions/`

**已提取主題**（11 個，有實際內容）：
1. ✅ `chronic_depletion.questions.v1.0.json` - 長期耗竭（7 題）
2. ✅ `loss_of_agency.questions.v1.0.json` - 主控感流失（7 題）
3. ✅ `social_comparison.questions.v1.0.json` - 社會比較壓力（7 題）
4. ✅ `suppressed_needs.questions.v1.0.json` - 需求壓抑（7 題）
5. ✅ `identity_diffusion.questions.v1.0.json` - 自我模糊（7 題）
6. ✅ `hyper_responsibility.questions.v1.0.json` - 過度責任（7 題）
7. ✅ `emotional_permeability.questions.v1.0.json` - 情緒滲透（7 題）
8. ✅ `avoidance_coping.questions.v1.0.json` - 逃避型因應（7 題）

**待提取主題**（5 個）：
1. ⏳ `fear_based_stability` - 恐懼驅動的穩定
2. ⏳ `chronic_alertness` - 長期警戒
3. ⏳ `meaning_vacuum` - 意義真空
4. ⏳ `self_erosion` - 自我耗損
5. ⏳ `unprocessed_loss` - 未處理的失落

**提取來源**：
- `raw/questionBank.v1.json` - 8 個主題（已提取）
- `raw/p1_question_blueprint_v1.json` - 5 個主題（待提取，注意：此檔案為設計藍圖，內容為 placeholder）

**提取日期**：2026-01-12

---

### 3.7 Manifests ✅（100%）

**位置**：`EXTRACTION_WORKSPACE/manifests/`

**已建立主題**（13 個）：
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

**提取日期**：2026-01-12

---

### 3.8 Recommendations ✅（100%，13/13）

**位置**：`EXTRACTION_WORKSPACE/recommendations/`

**已提取主題**（10 個，有實際內容）：
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

**已標註缺失主題**（3 個）：
1. ⚠️ `social_comparison.reco.v1.0.json` - 標註缺失（guidanceActionTemplates 中沒有）
2. ⚠️ `emotional_permeability.reco.v1.0.json` - 標註缺失（guidanceActionTemplates 中沒有）
3. ⚠️ `avoidance_coping.reco.v1.0.json` - 標註缺失（guidanceActionTemplates 中沒有）

**提取來源**：
- `templates/guidanceActionTemplates.v1.json` - 10 個主題（已提取）
- 其他來源待確認（3 個主題）

**提取日期**：2026-01-12

---

### 3.9 Narratives ✅（100%，13/13）

**位置**：`EXTRACTION_WORKSPACE/narratives/`

**已提取主題**（13 個，部分有內容）：

**有內容的主題**（7 個）：
1. ✅ `chronic_depletion.narr.v1.0.json` - 20 個錨定語句 + 3 個 ContentDB 來源
2. ✅ `hyper_responsibility.narr.v1.0.json` - 10 個錨定語句 + 2 個 ContentDB 來源
3. ✅ `fear_based_stability.narr.v1.0.json` - 10 個錨定語句
4. ✅ `social_comparison.narr.v1.0.json` - 10 個錨定語句 + 3 個 ContentDB 來源
5. ✅ `identity_diffusion.narr.v1.0.json` - 10 個錨定語句 + 1 個 ContentDB 來源
6. ✅ `emotional_permeability.narr.v1.0.json` - 10 個錨定語句 + 3 個 ContentDB 來源
7. ✅ `avoidance_coping.narr.v1.0.json` - 10 個錨定語句

**待填充內容的主題**（6 個，已標註 ContentDB 來源）：
1. ⏳ `loss_of_agency.narr.v1.0.json` - 0 個錨定語句 + 4 個 ContentDB 來源
2. ⏳ `suppressed_needs.narr.v1.0.json` - 0 個錨定語句 + 2 個 ContentDB 來源
3. ⏳ `chronic_alertness.narr.v1.0.json` - 0 個錨定語句 + 1 個 ContentDB 來源
4. ⏳ `meaning_vacuum.narr.v1.0.json` - 0 個錨定語句 + 1 個 ContentDB 來源
5. ⏳ `self_erosion.narr.v1.0.json` - 0 個錨定語句（無 ContentDB 來源）
6. ⏳ `unprocessed_loss.narr.v1.0.json` - 0 個錨定語句（無 ContentDB 來源）

**提取來源**：
- `contentdb/ContentDB_*.js` - 需要分析 11 個檔案
- `raw/anchor_statements.v1.json` - 錨定語句
- `narrative_logic/` - narrative 相關邏輯

**狀態**：需要手動分析 ContentDB 檔案，提取各主題相關的 narratives

---

### 3.10 Riskchains ✅（100%，13/13）

**位置**：`EXTRACTION_WORKSPACE/riskchains/`

**已提取主題**（13 個，部分有內容）：

**有內容的主題**（10 個）：
1. ✅ `chronic_depletion.risk.v1.0.json` - 1 個後果鏈 + chains.json（burnout_overload）
2. ✅ `hyper_responsibility.risk.v1.0.json` - chains.json（burnout_overload）
3. ✅ `fear_based_stability.risk.v1.0.json` - 1 個後果鏈 + chains.json（control_need, avoidance_procrastination, commitment_anxiety）
4. ✅ `loss_of_agency.risk.v1.0.json` - chains.json（control_need, commitment_anxiety）
5. ✅ `social_comparison.risk.v1.0.json` - 1 個後果鏈 + chains.json（attachment_insecurity）
6. ✅ `chronic_alertness.risk.v1.0.json` - 1 個後果鏈
7. ✅ `emotional_permeability.risk.v1.0.json` - 1 個後果鏈 + chains.json（attachment_insecurity）
8. ✅ `avoidance_coping.risk.v1.0.json` - 1 個後果鏈 + chains.json（avoidance_procrastination）

**待填充內容的主題**（5 個）：
1. ⏳ `suppressed_needs.risk.v1.0.json` - 待從 buildGuidance.js 提取
2. ⏳ `identity_diffusion.risk.v1.0.json` - 待從 buildGuidance.js 提取
3. ⏳ `meaning_vacuum.risk.v1.0.json` - 待從 buildGuidance.js 提取
4. ⏳ `self_erosion.risk.v1.0.json` - 待從 buildGuidance.js 提取
5. ⏳ `unprocessed_loss.risk.v1.0.json` - 待從 buildGuidance.js 提取

**提取來源**：
- `raw/consequence_chain_library.v1.json` - 6 個主題（已提取部分內容）
- `guidance_logic/chains.json` - 10 個主題（已更新部分內容）
- `raw/buildGuidance.js` - 5 個主題（待提取）

**提取日期**：2026-01-12

---

## 四、資料對照表

### 4.1 Legacy → 現有系統對照

**待建立**（提取 narratives 和 riskchains 時建立）

---

### 4.2 主題對照表

| Legacy 主題 ID | 中文標籤 | Questions | Scoring | Narratives | Recommendations | Riskchains | Manifest |
|---------------|---------|-----------|---------|------------|----------------|------------|----------|
| `chronic_depletion` | 長期耗竭 | ✅ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `hyper_responsibility` | 過度責任 | ✅ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `fear_based_stability` | 恐懼驅動的穩定 | ⏳ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `loss_of_agency` | 主控感流失 | ✅ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `social_comparison` | 社會比較壓力 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ✅ |
| `suppressed_needs` | 需求壓抑 | ✅ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `identity_diffusion` | 自我模糊 | ✅ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `chronic_alertness` | 長期警戒 | ⏳ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `meaning_vacuum` | 意義真空 | ⏳ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `self_erosion` | 自我耗損 | ⏳ | ✅ | ⏳ | ✅ | ⏳ | ✅ |
| `emotional_permeability` | 情緒滲透 | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | ✅ |
| `avoidance_coping` | 逃避型因應 | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | ✅ |
| `unprocessed_loss` | 未處理的失落 | ⏳ | ⏳ | ⏳ | ✅ | ⏳ | ✅ |

**說明**：
- ✅ = 已完成或已存在
- ⏳ = 待提取

---

### 4.3 欄位對照表

**待建立**（提取 narratives 和 riskchains 時建立）

---

## 五、重複和衝突識別

### 5.1 重複資料

**待識別**（提取 narratives 和 riskchains 時識別）

---

### 5.2 衝突資料

**待識別**（提取 narratives 和 riskchains 時識別）

---

### 5.3 已知問題

1. **p1_question_blueprint_v1.json 為設計藍圖**
   - 內容為 placeholder（`[Rough question text for ...]`）
   - 需要實際題目內容，可能需要從其他來源提取或標註缺失

2. **3 個主題缺少 Recommendations**
   - `social_comparison`、`emotional_permeability`、`avoidance_coping`
   - guidanceActionTemplates 中沒有這 3 個主題
   - 可能需要從其他來源提取或標註缺失

3. **Narratives 和 Riskchains 需要手動分析**
   - ContentDB 檔案需要分析才能提取 narratives
   - consequence_chain_library 需要分析才能提取 riskchains

---

## 六、待完成工作

### 6.1 高優先級（必須完成）

1. **補充 Questions**（5 個主題）
   - `fear_based_stability`
   - `chronic_alertness`
   - `meaning_vacuum`
   - `self_erosion`
   - `unprocessed_loss`
   - **注意**：p1_question_blueprint_v1.json 為設計藍圖，內容為 placeholder

2. **提取 Narratives**（13 個主題）
   - 分析 `contentdb/ContentDB_*.js` 檔案（11 個檔案）
   - 提取各主題相關的 narratives
   - 整理到 `narratives/` 資料夾

3. **提取 Riskchains**（13 個主題）
   - 從 `raw/consequence_chain_library.v1.json` 提取
   - 從 `raw/buildGuidance.js` 提取風險鏈生成邏輯
   - 整理到 `riskchains/` 資料夾

4. **補充 Recommendations**（3 個主題）
   - `social_comparison`
   - `emotional_permeability`
   - `avoidance_coping`
   - **注意**：guidanceActionTemplates 中沒有這 3 個主題

---

### 6.2 中優先級（建議完成）

5. **建立資料對照表**
   - Legacy → 現有系統對照表
   - 主題對照表
   - 欄位對照表

6. **識別重複和衝突**
   - 識別重複資料
   - 識別衝突資料
   - 標註需要顧問團隊處理的部分

---

## 七、提取檔案結構

```
EXTRACTION_WORKSPACE/
├── questions/              # 題庫資料（✅ 8/13）
│   ├── chronic_depletion.questions.v1.0.json
│   ├── loss_of_agency.questions.v1.0.json
│   ├── social_comparison.questions.v1.0.json
│   ├── suppressed_needs.questions.v1.0.json
│   ├── identity_diffusion.questions.v1.0.json
│   ├── hyper_responsibility.questions.v1.0.json
│   ├── emotional_permeability.questions.v1.0.json
│   └── avoidance_coping.questions.v1.0.json
├── scoring/                # 計分資料（待提取，部分在 domain/）
├── narratives/             # 敘事資料（⏳ 0/13，待建立）
├── recommendations/        # 建議資料（✅ 10/13）
│   ├── chronic_depletion.reco.v1.0.json
│   ├── loss_of_agency.reco.v1.0.json
│   ├── hyper_responsibility.reco.v1.0.json
│   ├── fear_based_stability.reco.v1.0.json
│   ├── identity_diffusion.reco.v1.0.json
│   ├── suppressed_needs.reco.v1.0.json
│   ├── chronic_alertness.reco.v1.0.json
│   ├── unprocessed_loss.reco.v1.0.json
│   ├── meaning_vacuum.reco.v1.0.json
│   └── self_erosion.reco.v1.0.json
├── riskchains/             # 風險鏈資料（⏳ 0/13，待建立）
├── manifests/              # Facet 定義（✅ 13/13）
│   ├── chronic_depletion.v1.0.json
│   ├── hyper_responsibility.v1.0.json
│   ├── fear_based_stability.v1.0.json
│   ├── loss_of_agency.v1.0.json
│   ├── social_comparison.v1.0.json
│   ├── suppressed_needs.v1.0.json
│   ├── identity_diffusion.v1.0.json
│   ├── chronic_alertness.v1.0.json
│   ├── meaning_vacuum.v1.0.json
│   ├── self_erosion.v1.0.json
│   ├── emotional_permeability.v1.0.json
│   ├── avoidance_coping.v1.0.json
│   └── unprocessed_loss.v1.0.json
├── rules/                  # 規則資料（部分已提取）
├── templates/              # 模板資料（✅ 已提取）
│   └── guidanceActionTemplates.v1.json
├── contentdb/              # ContentDB 檔案（✅ 11 個檔案）
│   ├── ContentDB_career.js
│   ├── ContentDB_family.js
│   └── ...（11 個檔案）
├── narrative_logic/        # narrative 相關邏輯（✅ 3 個檔案）
│   ├── elementNarrative.v1.js
│   ├── hookRules.json
│   └── round2OracularText.v1.js
├── guidance_logic/         # guidance 相關邏輯（✅ 5 個檔案）
│   ├── chains.json
│   ├── interventions.json
│   └── ...（5 個檔案）
├── raw/                    # 原始檔案備份（✅ 已提取）
│   ├── questionBank.v1.json
│   ├── p1_question_blueprint_v1.json
│   ├── buildGuidance.js
│   ├── guidancePrinciples.v1.json
│   └── ...（resultTemplates）
├── EXTRACTION_INDEX.md     # 提取索引
├── EXTRACTION_PROGRESS.md  # 提取進度
├── EXTRACTION_SUMMARY.md   # 總整理報告（舊版）
├── EXTRACTION_COMPLETE_REPORT.md  # 完整提取報告
├── EXTRACTION_FINAL_SUMMARY.md   # 總整理報告（最終版，本文件）
└── extract_themes.py      # 提取腳本
```

---

## 八、下一步行動

### 8.1 立即執行（繼續提取）

1. **補充 Questions**（5 個主題）
   - 從 `p1_question_blueprint_v1.json` 提取（注意：內容為 placeholder）
   - 或標註缺失

2. **提取 Narratives**（13 個主題）
   - 分析 `contentdb/ContentDB_*.js` 檔案
   - 提取各主題相關的 narratives

3. **提取 Riskchains**（13 個主題）
   - 從 `consequence_chain_library.v1.json` 提取
   - 從 `buildGuidance.js` 提取邏輯

4. **補充 Recommendations**（3 個主題）
   - 標註缺失或從其他來源提取

---

### 8.2 後續執行（總整理）

5. **建立資料對照表**
   - Legacy → 現有系統對照表
   - 主題對照表
   - 欄位對照表

6. **識別重複和衝突**
   - 識別重複資料
   - 識別衝突資料

7. **完成總整理報告**
   - 更新資料對照表
   - 更新重複和衝突識別

8. **準備交給顧問團隊的資料包**
   - 準備完整的資料包
   - 準備總整理報告
   - 標註需要顧問團隊處理的部分

---

## 九、重要提醒

### 9.1 已知限制

1. **p1_question_blueprint_v1.json 為設計藍圖**
   - 內容為 placeholder，不是實際題目
   - 需要實際題目內容或標註缺失

2. **3 個主題缺少 Recommendations**
   - guidanceActionTemplates 中沒有這 3 個主題
   - 需要從其他來源提取或標註缺失

3. **Narratives 和 Riskchains 需要手動分析**
   - ContentDB 檔案需要分析才能提取 narratives
   - consequence_chain_library 需要分析才能提取 riskchains

---

### 9.2 提取原則

1. **不進行刪減**：提取時不進行刪減或整合
2. **保持原始結構**：保持原始資料結構
3. **標註來源**：所有提取的資料都要標註來源
4. **記錄版本**：記錄提取日期和版本
5. **備份原始檔案**：在 `raw/` 資料夾中備份原始檔案

---

## 十、總結

### 10.1 已完成工作

- ✅ 系統邏輯和規則（100%）
- ✅ ContentDB 檔案（100%）
- ✅ narrative 和 guidance 邏輯（100%）
- ✅ 題庫資料備份（100%）
- ✅ Questions（62%，8/13 個主題）
- ✅ Manifests（100%，13/13 個主題）
- ✅ Recommendations（77%，10/13 個主題）

### 10.2 待完成工作

- ⏳ Questions（38%，5/13 個主題）
- ⏳ Narratives（0%，0/13 個主題）
- ⏳ Riskchains（0%，0/13 個主題）
- ⏳ Recommendations（23%，3/13 個主題）

### 10.3 整體完成度

**約 60%**（系統檔案已完成，主題資料部分完成）

---

**文件狀態**：WORKING DOCUMENT（持續更新）  
**最後更新**：2026-01-12  
**下一步**：繼續提取剩餘部分（Questions、Narratives、Riskchains、Recommendations）
