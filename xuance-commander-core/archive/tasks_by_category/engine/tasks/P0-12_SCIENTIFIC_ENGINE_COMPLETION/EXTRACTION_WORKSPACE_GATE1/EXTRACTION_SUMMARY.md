# Legacy 資料提取總整理報告

**建立日期**：2026-01-12  
**目的**：總整理所有已提取的 Legacy 資料，為顧問團隊提供清晰的資料結構  
**文件狀態**：WORKING DOCUMENT（持續更新）

---

## 一、執行摘要

### 1.1 提取策略

**三階段策略**：
1. **階段一：完整提取**（Cursor 執行）- 🔄 進行中
2. **階段二：總整理**（Cursor 執行）- 🔄 進行中
3. **階段三：整合刪減昇華**（顧問團隊執行）- ⏳ 待執行

### 1.2 提取原則

1. **不進行刪減**：提取時不進行刪減或整合
2. **保持原始結構**：保持原始資料結構
3. **標註來源**：所有提取的資料都要標註來源
4. **記錄版本**：記錄提取日期和版本
5. **備份原始檔案**：在 `raw/` 資料夾中備份原始檔案

---

## 二、已提取資料總覽

### 2.1 提取進度統計

| 類別 | 總數 | 已提取 | 待提取 | 完成度 |
|------|------|--------|--------|--------|
| **系統邏輯和規則** | 7 | 7 | 0 | ✅ 100% |
| **ContentDB 檔案** | 11 | 11 | 0 | ✅ 100% |
| **narrative 邏輯** | 3 | 3 | 0 | ✅ 100% |
| **guidance 邏輯** | 5 | 5 | 0 | ✅ 100% |
| **resultTemplates** | 5 | 5 | 0 | ✅ 100% |
| **題庫資料** | 2 | 2 | 0 | ✅ 100% |
| **主題相關資料** | 13 | 0 | 13 | ⏳ 0% |

**整體完成度**：約 **35%**（系統檔案已完成，主題資料待提取）

---

## 三、已提取資料詳細清單

### 3.1 系統邏輯和規則 ✅

**位置**：`EXTRACTION_WORKSPACE/templates/` 和 `EXTRACTION_WORKSPACE/raw/`

#### 3.1.1 guidanceActionTemplates.v1.json

**位置**：`templates/guidanceActionTemplates.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidanceActionTemplates.v1.json`

**內容**：
- 行動建議模板（按母題和年齡帶分類）
- 10 個主題的行動建議模板：
  - `chronic_depletion`
  - `loss_of_agency`
  - `hyper_responsibility`
  - `fear_based_stability`
  - `identity_diffusion`
  - `suppressed_needs`
  - `chronic_alertness`
  - `unprocessed_loss`
  - `meaning_vacuum`
  - `self_erosion`

**結構**：
- 每個主題包含：`actionTemplates`（today、week）
- 部分主題包含：`ageBands`（按年齡帶分類的模板）

**用途**：用於生成 recommendations（行動建議）

**提取日期**：2026-01-12

---

#### 3.1.2 buildGuidance.js

**位置**：`raw/buildGuidance.js`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`

**內容**：
- 結果生成核心邏輯（JavaScript）
- 包含主題優先級、風險鏈生成、年齡帶選擇等邏輯
- 已在 Phase 2-4 提取決策規則（10 條規則）

**用途**：用於生成結果呈現的決策邏輯

**提取日期**：2026-01-12

---

#### 3.1.3 guidancePrinciples.v1.json

**位置**：`raw/guidancePrinciples.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`

**內容**：
- 原則定義（映射到母題）
- 40 條原則，轉換為 10 條決策規則（已在 Phase 2-4 提取）

**用途**：用於生成 recommendations 的原則依據

**提取日期**：2026-01-12

---

#### 3.1.4 intervention_boundary_matrix.v1.json

**位置**：`raw/intervention_boundary_matrix.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

**內容**：
- 介入邊界定義
- 3 條規則（已在 Phase 2-4 提取）：
  - `IB_LOW_NURTURE` - 養氣（低風險）
  - `IB_MID_ADJUST` - 調氣（中風險）
  - `IB_HIGH_STOP_LOSS` - 止損（高風險）

**用途**：用於決定呈現的語調和介入方式

**提取日期**：2026-01-12

---

#### 3.1.5 anchor_statements.v1.json

**位置**：`raw/anchor_statements.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/anchor_statements.v1.json`

**內容**：
- 錨定語句定義
- 用於結果呈現的錨定語句

**用途**：用於結果呈現的錨定語句

**提取日期**：2026-01-12

---

#### 3.1.6 five_element_mapping.v1.json

**位置**：`raw/five_element_mapping.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/five_element_mapping.v1.json`

**內容**：
- 五行映射定義
- 用於結果呈現的五行映射

**用途**：用於結果呈現的五行映射

**提取日期**：2026-01-12

---

#### 3.1.7 attribution_error_matrix.v1.json

**位置**：`raw/attribution_error_matrix.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/attribution_error_matrix.v1.json`

**內容**：
- 歸因錯誤矩陣定義
- 用於結果呈現的歸因錯誤分析

**用途**：用於結果呈現的歸因錯誤分析

**提取日期**：2026-01-12

---

#### 3.1.8 consequence_chain_library.v1.json

**位置**：`raw/consequence_chain_library.v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/consequence_chain_library.v1.json`

**內容**：
- 後果鏈庫定義
- 用於生成風險鏈的後果鏈庫

**用途**：用於生成風險鏈（riskchains）

**提取日期**：2026-01-12

---

### 3.2 ContentDB 檔案 ✅

**位置**：`EXTRACTION_WORKSPACE/contentdb/`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/`

**檔案清單**（11 個檔案）：

| 檔案名稱 | 領域 | 內容類型 | 狀態 |
|---------|------|---------|------|
| `ContentDB_career.js` | 職業 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_family.js` | 家庭 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_finance.js` | 財務 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_health.js` | 健康 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_index.js` | 索引 | 索引定義 | ✅ 已提取 |
| `ContentDB_love.js` | 愛情 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_money.js` | 金錢 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_relationship.js` | 關係 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_self.js` | 自我 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_social.js` | 社交 | ROUND2、ROUND3 | ✅ 已提取 |
| `ContentDB_study.js` | 學習 | ROUND2、ROUND3 | ✅ 已提取 |

**結構**：
- 每個檔案包含 `ROUND2` 和 `ROUND3` 內容
- `ROUND2`：可能包含敘事內容
- `ROUND3`：可能包含建議內容

**用途**：可能包含大量敘事和建議內容，需要分析確認是否與主題相關

**提取日期**：2026-01-12

---

### 3.3 narrative 邏輯 ✅

**位置**：`EXTRACTION_WORKSPACE/narrative_logic/`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/narrative/`

**檔案清單**（3 個檔案）：

| 檔案名稱 | 內容類型 | 狀態 |
|---------|---------|------|
| `elementNarrative.v1.js` | 元素敘事 | ✅ 已提取 |
| `hookRules.json` | Hook 規則 | ✅ 已提取 |
| `round2OracularText.v1.js` | 第二輪神諭文本 | ✅ 已提取 |

**用途**：可能包含敘事生成邏輯，需要分析確認是否與現有系統相關

**提取日期**：2026-01-12

---

### 3.4 guidance 邏輯 ✅

**位置**：`EXTRACTION_WORKSPACE/guidance_logic/`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/`

**檔案清單**（5 個檔案）：

| 檔案名稱 | 內容類型 | 狀態 |
|---------|---------|------|
| `chains.json` | 鏈條定義 | ✅ 已提取 |
| `guidance.schema.json` | Guidance Schema | ✅ 已提取 |
| `interventions.json` | 介入定義 | ✅ 已提取 |
| `modifiers.json` | 修飾符定義 | ✅ 已提取 |
| `schema.json` | Schema 定義 | ✅ 已提取 |

**用途**：可能包含風險鏈生成邏輯，需要分析確認是否與現有系統相關

**提取日期**：2026-01-12

---

### 3.5 題庫資料 ✅

**位置**：`EXTRACTION_WORKSPACE/raw/`

#### 3.5.1 questionBank.v1.json

**位置**：`raw/questionBank.v1.json`

**來源**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`
- 或 `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/packages/data/src/raw/legacy_questionBank.v1.json`

**內容**：
- 10 個主題的題庫資料
- 每個主題包含：`theme_id`、`theme_enLabel`、`theme_zhLabel`、`questions[]`

**主題清單**：
1. `chronic_depletion` - 慢性耗竭（7 題）
2. `hyper_responsibility` - 過度責任（5-7 題）
3. `fear_based_stability` - 恐懼驅動的穩定（3-7 題）
4. `loss_of_agency` - 主控感流失（7 題）
5. `social_comparison` - 社會比較壓力（7 題）
6. `suppressed_needs` - 需求壓抑（7 題）
7. `identity_diffusion` - 自我模糊（7 題）
8. `emotional_permeability` - 情緒滲透（7 題）
9. `avoidance_coping` - 逃避型因應（7 題）
10. 重複的 `hyper_responsibility` - 過度責任（7 題）

**用途**：用於提取各主題的 questions

**提取日期**：2026-01-12

---

#### 3.5.2 p1_question_blueprint_v1.json

**位置**：`raw/p1_question_blueprint_v1.json`

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json`

**內容**：
- 10 個主題的題目藍圖
- 每個主題包含 7 題的設計藍圖

**主題清單**：
1. `chronic_depletion` - 長期耗竭（7 題）
2. `loss_of_agency` - 主控感流失（7 題）
3. `hyper_responsibility` - 過度責任（7 題）
4. `fear_based_stability` - 恐懼驅動的穩定（7 題）
5. `identity_diffusion` - 自我模糊（7 題）
6. `suppressed_needs` - 需求壓抑（7 題）
7. `chronic_alertness` - 長期警戒（7 題）
8. `unprocessed_loss` - 未處理的失落（7 題）
9. `meaning_vacuum` - 意義真空（7 題）
10. `self_erosion` - 自我耗損（7 題）

**用途**：用於提取各主題的 questions（設計藍圖）

**提取日期**：2026-01-12

---

## 四、待提取資料清單

### 4.1 主題相關資料 ⏳

**待提取主題**（13 個）：

| 主題 ID | 中文標籤 | Questions | Scoring | Narratives | Recommendations | Riskchains | Manifest |
|---------|---------|-----------|---------|------------|----------------|------------|----------|
| `chronic_depletion` | 長期耗竭 | ✅ | ✅ | ✅ | ✅ | ✅ | ⏳ |
| `hyper_responsibility` | 過度責任 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `fear_based_stability` | 恐懼驅動的穩定 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `loss_of_agency` | 主控感流失 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `social_comparison` | 社會比較壓力 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `suppressed_needs` | 需求壓抑 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `identity_diffusion` | 自我模糊 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `chronic_alertness` | 長期警戒 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `meaning_vacuum` | 意義真空 | ✅ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `self_erosion` | 自我耗損 | ⏳ | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |
| `emotional_permeability` | 情緒滲透 | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| `avoidance_coping` | 逃避型因應 | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| `unprocessed_loss` | 未處理的失落 | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |

**說明**：
- ✅ = 已完成或已存在
- ⏳ = 待提取

**提取來源**：
- Questions：從 `questionBank.v1.json` 和 `p1_question_blueprint_v1.json` 提取
- Scoring：部分已有，需確認完整性
- Narratives：從 resultTemplates、ContentDB、buildGuidance.js 提取
- Recommendations：從 guidanceActionTemplates、guidancePrinciples、ContentDB 提取
- Riskchains：從 consequence_chain_library、buildGuidance.js 提取
- Manifest：從 motherThemes.v1.json 建立

---

## 五、資料對照表

### 5.1 Legacy → 現有系統對照

**待建立**（提取主題資料時建立）

---

### 5.2 主題對照表

**待建立**（提取主題資料時建立）

---

### 5.3 欄位對照表

**待建立**（提取主題資料時建立）

---

## 六、重複和衝突識別

### 6.1 重複資料

**待識別**（提取主題資料時識別）

---

### 6.2 衝突資料

**待識別**（提取主題資料時識別）

---

## 七、待處理事項

### 7.1 高優先級

1. **提取 13 個主題的完整資料**
   - 從已提取的檔案中提取各主題的 narratives、recommendations、riskchains
   - 建立各主題的 manifest
   - 確認 questions 和 scoring 的完整性

2. **建立資料對照表**
   - Legacy → 現有系統對照表
   - 主題對照表
   - 欄位對照表

3. **識別重複和衝突**
   - 識別重複資料
   - 識別衝突資料
   - 標註需要顧問團隊處理的部分

---

### 7.2 中優先級

4. **分析 ContentDB 檔案**
   - 分析每個檔案的結構
   - 確認內容是否與主題相關
   - 標註可能的主題對應關係

5. **分析 narrative 和 guidance 邏輯**
   - 分析內容
   - 確認是否與現有系統相關
   - 標註可能的主題對應關係

---

## 八、下一步行動

### 8.1 立即執行

1. **提取 13 個主題的完整資料**
   - 從已提取的檔案中提取各主題的 narratives、recommendations、riskchains
   - 建立各主題的 manifest
   - 確認 questions 和 scoring 的完整性

2. **建立資料對照表**
   - Legacy → 現有系統對照表
   - 主題對照表
   - 欄位對照表

3. **識別重複和衝突**
   - 識別重複資料
   - 識別衝突資料

---

### 8.2 後續執行

4. **完成總整理報告**
   - 更新資料對照表
   - 更新重複和衝突識別
   - 準備交給顧問團隊的資料包

5. **交付顧問團隊**
   - 準備完整的資料包
   - 準備總整理報告
   - 標註需要顧問團隊處理的部分

---

## 九、提取檔案結構

```
EXTRACTION_WORKSPACE/
├── questions/              # 題庫資料（待提取）
├── scoring/                # 計分資料（待提取）
├── narratives/             # 敘事資料（待提取）
├── recommendations/        # 建議資料（待提取）
├── riskchains/            # 風險鏈資料（待提取）
├── manifests/             # Facet 定義（待提取）
├── rules/                 # 規則資料（部分已提取）
├── templates/             # 模板資料（✅ 已提取）
│   └── guidanceActionTemplates.v1.json
├── contentdb/             # ContentDB 檔案（✅ 已提取）
│   ├── ContentDB_career.js
│   ├── ContentDB_family.js
│   └── ...（11 個檔案）
├── narrative_logic/        # narrative 相關邏輯（✅ 已提取）
│   ├── elementNarrative.v1.js
│   ├── hookRules.json
│   └── round2OracularText.v1.js
├── guidance_logic/        # guidance 相關邏輯（✅ 已提取）
│   ├── chains.json
│   ├── interventions.json
│   └── ...（5 個檔案）
├── raw/                   # 原始檔案備份（✅ 已提取）
│   ├── questionBank.v1.json
│   ├── p1_question_blueprint_v1.json
│   ├── buildGuidance.js
│   ├── guidancePrinciples.v1.json
│   └── ...（resultTemplates）
├── EXTRACTION_INDEX.md    # 提取索引
├── EXTRACTION_PROGRESS.md # 提取進度
└── EXTRACTION_SUMMARY.md  # 總整理報告（本文件）
```

---

**文件狀態**：WORKING DOCUMENT（持續更新）  
**最後更新**：2026-01-12  
**下次更新**：完成主題資料提取後
