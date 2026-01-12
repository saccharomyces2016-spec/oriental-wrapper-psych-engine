# Legacy 資料提取索引

**建立日期**：2026-01-12  
**目的**：記錄所有提取的資料及其來源、位置、用途  
**文件狀態**：WORKING DOCUMENT（持續更新）

---

## 一、提取進度總覽

### 1.1 整體進度

| 階段 | 狀態 | 完成度 | 備註 |
|------|------|--------|------|
| 階段一：完整提取 | 🔄 進行中 | 0% | 剛開始 |
| 階段二：總整理 | ⏳ 待執行 | 0% | 等待階段一完成 |
| 階段三：整合刪減昇華 | ⏳ 待執行 | 0% | 由顧問團隊執行 |

---

### 1.2 主題提取進度

| 主題 ID | Questions | Scoring | Narratives | Recommendations | Riskchains | Manifest | 狀態 |
|---------|-----------|---------|------------|----------------|------------|----------|------|
| `chronic_depletion` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | 部分完成 |
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
- ✅ = 已完成提取或已存在
- ⏳ = 待提取
- ❌ = 不需要或不存在

---

## 二、資料來源索引

### 2.1 Legacy 題庫

**位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/packages/data/src/raw/legacy_questionBank.v1.json`

**包含主題**：10 個主題
- `chronic_depletion`
- `hyper_responsibility`
- `fear_based_stability`
- `loss_of_agency`
- `social_comparison`
- `suppressed_needs`
- `identity_diffusion`
- `emotional_permeability`
- `avoidance_coping`
- 重複的 `hyper_responsibility`

**提取狀態**：⏳ 待提取

---

### 2.2 題目藍圖

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json`

**包含主題**：10 個主題
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

**提取狀態**：⏳ 待提取

---

### 2.3 resultTemplates

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`

**檔案清單**：
1. `intervention_boundary_matrix.v1.json` - ✅ 已分析（Phase 2-1）
2. `anchor_statements.v1.json` - ✅ 已分析（Phase 2-1）
3. `five_element_mapping.v1.json` - ✅ 已分析（Phase 2-1）
4. `attribution_error_matrix.v1.json` - ✅ 已分析（Phase 2-1）
5. `consequence_chain_library.v1.json` - ✅ 已分析（Phase 2-1）

**提取狀態**：✅ 已分析，⏳ 待完整提取

---

### 2.4 buildGuidance.js

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`

**內容**：結果生成核心邏輯

**提取狀態**：✅ 已提取規則（Phase 2-4），⏳ 待完整提取原始檔案

---

### 2.5 guidancePrinciples.v1.json

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`

**內容**：原則定義（映射到母題）

**提取狀態**：✅ 已提取規則（Phase 2-4），⏳ 待完整提取原始檔案

---

### 2.6 guidanceActionTemplates.v1.json

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidanceActionTemplates.v1.json`

**內容**：行動模板（按母題和年齡帶分類）

**提取狀態**：⏳ 待提取

---

### 2.7 ContentDB 檔案

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/`

**檔案清單**：
1. `ContentDB_career.js` - ⏳ 待提取
2. `ContentDB_family.js` - ⏳ 待提取
3. `ContentDB_finance.js` - ⏳ 待提取
4. `ContentDB_health.js` - ⏳ 待提取
5. `ContentDB_love.js` - ⏳ 待提取
6. `ContentDB_money.js` - ⏳ 待提取
7. `ContentDB_relationship.js` - ⏳ 待提取
8. `ContentDB_self.js` - ⏳ 待提取
9. `ContentDB_social.js` - ⏳ 待提取
10. `ContentDB_study.js` - ⏳ 待提取
11. `ContentDB_index.js` - ⏳ 待提取

**提取狀態**：⏳ 待提取

---

### 2.8 narrative 相關檔案

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/narrative/`

**檔案清單**：
1. `elementNarrative.v1.js` - ⏳ 待提取
2. `hookRules.json` - ⏳ 待提取
3. `round2OracularText.v1.js` - ⏳ 待提取

**提取狀態**：⏳ 待提取

---

### 2.9 guidance 相關檔案

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/`

**檔案清單**：
1. `chains.json` - ⏳ 待提取
2. `interventions.json` - ⏳ 待提取
3. `modifiers.json` - ⏳ 待提取

**提取狀態**：⏳ 待提取

---

## 三、提取檔案記錄

### 3.1 主題相關檔案

**待建立記錄表**（提取時更新）

---

### 3.2 系統邏輯和規則檔案

**待建立記錄表**（提取時更新）

---

### 3.3 ContentDB 檔案

**待建立記錄表**（提取時更新）

---

## 四、提取注意事項

### 4.1 提取原則

1. **不進行刪減**：提取時不進行刪減或整合
2. **保持原始結構**：保持原始資料結構
3. **標註來源**：所有提取的資料都要標註來源
4. **記錄版本**：記錄提取日期和版本
5. **備份原始檔案**：在 `raw/` 資料夾中備份原始檔案

---

### 4.2 提取格式

**檔案命名**：
- 主題相關：`<theme_id>.<type>.v1.0.json`
- 系統邏輯：`<logic_name>.v1.0.json`
- ContentDB：`ContentDB_<domain>.js`（保持原名）

**檔案結構**：
- 包含原始資料
- 包含來源標註（metadata）
- 包含提取日期和版本

---

**文件狀態**：WORKING DOCUMENT（持續更新）  
**最後更新**：2026-01-12  
**下次更新**：每次提取完成後
