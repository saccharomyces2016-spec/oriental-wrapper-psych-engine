# P0-12 完整提取執行計劃

**建立日期**：2026-01-12  
**目的**：完整提取所有 Legacy 資料，進行總整理後交由顧問團隊整合刪減昇華  
**策略**：先完整提取 → 總整理 → 顧問團隊整合刪減昇華 → 刪除 LEGACY 檔案夾  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、執行策略

### 1.1 三階段策略

**階段一：完整提取**（Cursor 執行）
- 提取所有 Legacy 資料
- 不進行刪減或整合
- 保持原始資料結構
- 目標：確保不遺漏任何資料

**階段二：總整理**（Cursor 執行）
- 將提取的資料進行分類整理
- 建立對照表和索引
- 識別重複和衝突
- 目標：為顧問團隊提供清晰的資料結構

**階段三：整合刪減昇華**（顧問團隊執行）
- 根據現有系統架構進行整合
- 刪減不需要的內容
- 昇華和優化內容
- 目標：產出符合現有系統規範的最終檔案

---

## 二、提取範圍

### 2.1 高優先級（必須提取）

#### 2.1.1 主題完整整合（9 個主題）

**主題列表**：
1. `hyper_responsibility`（過度責任）
2. `fear_based_stability`（恐懼驅動的穩定）
3. `loss_of_agency`（主控感流失）
4. `social_comparison`（社會比較壓力）
5. `suppressed_needs`（需求壓抑）
6. `identity_diffusion`（自我模糊）
7. `chronic_alertness`（長期警戒）
8. `meaning_vacuum`（意義真空）
9. `self_erosion`（自我耗損）

**每個主題需要提取的資料**：
- Questions（已有，但需要確認完整性）
- Scoring（已有，但需要確認完整性）
- Narratives（待提取）
- Recommendations（待提取）
- Riskchains（待提取）
- Manifest（待建立）

**提取來源**：
- Legacy 題庫：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`
- 題目藍圖：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json`
- resultTemplates：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`
- buildGuidance.js：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`
- guidancePrinciples：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`
- guidanceActionTemplates：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidanceActionTemplates.v1.json`

---

#### 2.1.2 完全缺失的主題（4 個主題）

**主題列表**：
1. `emotional_permeability`（情緒滲透）- Legacy 題庫中有
2. `avoidance_coping`（逃避型因應）- Legacy 題庫中有
3. `unprocessed_loss`（未處理的失落）- 題目藍圖中有
4. `self_erosion`（自我耗損）- 題目藍圖中有，scoring 已有

**每個主題需要提取的資料**：
- Questions（待提取）
- Scoring（待提取，self_erosion 已有）
- Narratives（待提取）
- Recommendations（待提取）
- Riskchains（待提取）
- Manifest（待建立）

**提取來源**：
- Legacy 題庫：`packages/data/src/raw/legacy_questionBank.v1.json`
- 題目藍圖：`reports/p1_question_blueprint_v1.json`
- resultTemplates：同上
- buildGuidance.js：同上
- guidancePrinciples：同上
- guidanceActionTemplates：同上

---

#### 2.1.3 其他必須提取的資料

1. **chronic_depletion Manifest**
   - 建立 `domain/manifests/chronic_depletion.v1.0.json`
   - 來源：motherThemes.v1.json

2. **Phase 2-4 規則文件**
   - 評估是否需要寫入系統
   - 如需要，提取 39 條規則
   - 來源：P0-12_PHASE2-4_FINAL_ACCEPTED_CONTENT.md

3. **階段一實際檔案整合**
   - Legacy 題目轉換（10+ 個主題）
   - Legacy 計分邏輯轉換
   - 來源：scorer.js、questionBank.v1.json

---

### 2.2 中優先級（建議提取）

#### 2.2.1 guidanceActionTemplates.v1.json

**內容**：
- 行動建議模板（按母題和年齡帶分類）
- 10 個主題的行動建議模板

**提取目標**：
- 完整提取所有模板
- 保持原始結構
- 標註來源和用途

---

#### 2.2.2 ContentDB 檔案（11 個檔案）

**檔案清單**：
1. `ContentDB_career.js` - 職業相關
2. `ContentDB_family.js` - 家庭相關
3. `ContentDB_finance.js` - 財務相關
4. `ContentDB_health.js` - 健康相關
5. `ContentDB_love.js` - 愛情相關
6. `ContentDB_money.js` - 金錢相關
7. `ContentDB_relationship.js` - 關係相關
8. `ContentDB_self.js` - 自我相關
9. `ContentDB_social.js` - 社交相關
10. `ContentDB_study.js` - 學習相關
11. `ContentDB_index.js` - 索引檔案

**提取目標**：
- 完整提取所有檔案內容
- 分析結構（ROUND2、ROUND3）
- 標註可能的主題對應關係

---

#### 2.2.3 narrative 相關檔案（3 個檔案）

**檔案清單**：
1. `elementNarrative.v1.js` - 元素敘事
2. `hookRules.json` - Hook 規則
3. `round2OracularText.v1.js` - 第二輪神諭文本

**提取目標**：
- 完整提取所有檔案內容
- 分析結構和用途
- 標註可能的主題對應關係

---

#### 2.2.4 guidance 相關檔案（3 個檔案）

**檔案清單**：
1. `chains.json` - 鏈條定義
2. `interventions.json` - 介入定義
3. `modifiers.json` - 修飾符定義

**提取目標**：
- 完整提取所有檔案內容
- 分析結構和用途
- 標註可能的主題對應關係

---

### 2.3 低優先級（可選提取）

#### 2.3.1 round2Situations.v1.json

**內容**：第二輪情境相關資料

**提取目標**：
- 檢查內容
- 確認是否與現有系統相關
- 如相關，完整提取

---

## 三、提取執行計劃

### 3.1 階段一：完整提取（Cursor 執行）

#### 步驟 1：建立提取工作區

**目標**：建立臨時工作區存放提取的資料

**執行**：
1. 建立 `P0-12_SCIENTIFIC_ENGINE_COMPLETION/EXTRACTION_WORKSPACE/` 資料夾
2. 建立子資料夾結構：
   - `questions/` - 題庫資料
   - `scoring/` - 計分資料
   - `narratives/` - 敘事資料
   - `recommendations/` - 建議資料
   - `riskchains/` - 風險鏈資料
   - `manifests/` - Facet 定義
   - `rules/` - 規則資料
   - `templates/` - 模板資料
   - `contentdb/` - ContentDB 檔案
   - `narrative_logic/` - narrative 相關邏輯
   - `guidance_logic/` - guidance 相關邏輯
   - `raw/` - 原始檔案備份

---

#### 步驟 2：提取主題相關資料（13 個主題）

**目標**：提取所有主題的完整資料

**執行順序**：
1. **已有 questions 和 scoring 的主題（9 個）**：
   - `hyper_responsibility`
   - `fear_based_stability`
   - `loss_of_agency`
   - `social_comparison`
   - `suppressed_needs`
   - `identity_diffusion`
   - `chronic_alertness`
   - `meaning_vacuum`
   - `self_erosion`

   **提取內容**：
   - 從 resultTemplates 提取 narratives、recommendations、riskchains
   - 從 buildGuidance.js 提取相關邏輯
   - 從 guidancePrinciples 提取相關原則
   - 從 guidanceActionTemplates 提取相關模板
   - 從 ContentDB 檔案提取相關內容（如適用）

2. **完全缺失的主題（4 個）**：
   - `emotional_permeability`
   - `avoidance_coping`
   - `unprocessed_loss`
   - `self_erosion`（補充 questions）

   **提取內容**：
   - 從 Legacy 題庫提取 questions
   - 從題目藍圖提取 questions（如適用）
   - 從 resultTemplates 提取 narratives、recommendations、riskchains
   - 從 buildGuidance.js 提取相關邏輯
   - 從 guidancePrinciples 提取相關原則
   - 從 guidanceActionTemplates 提取相關模板
   - 從 ContentDB 檔案提取相關內容（如適用）

**提取原則**：
- 不進行刪減或整合
- 保持原始資料結構
- 標註來源檔案和位置
- 記錄提取日期和版本

---

#### 步驟 3：提取系統邏輯和規則

**目標**：提取所有系統邏輯和規則

**執行**：
1. **buildGuidance.js**
   - 完整提取決策邏輯
   - 標註每個邏輯的用途和觸發條件

2. **guidancePrinciples.v1.json**
   - 完整提取所有原則
   - 標註每個原則對應的主題

3. **guidanceActionTemplates.v1.json**
   - 完整提取所有模板
   - 標註每個模板對應的主題和年齡帶

4. **intervention_boundary_matrix.v1.json**
   - 完整提取邊界規則
   - 標註每個規則的適用範圍

5. **其他 resultTemplates**
   - `anchor_statements.v1.json`
   - `five_element_mapping.v1.json`
   - `attribution_error_matrix.v1.json`
   - `consequence_chain_library.v1.json`

---

#### 步驟 4：提取 ContentDB 檔案

**目標**：提取所有 ContentDB 檔案內容

**執行**：
1. 提取 11 個 ContentDB_*.js 檔案
2. 分析每個檔案的結構（ROUND2、ROUND3）
3. 標註可能的主題對應關係
4. 記錄每個檔案的用途

---

#### 步驟 5：提取 narrative 和 guidance 邏輯

**目標**：提取所有 narrative 和 guidance 相關邏輯

**執行**：
1. **narrative 相關檔案**：
   - `elementNarrative.v1.js`
   - `hookRules.json`
   - `round2OracularText.v1.js`

2. **guidance 相關檔案**：
   - `chains.json`
   - `interventions.json`
   - `modifiers.json`

---

#### 步驟 6：建立提取索引

**目標**：建立完整的提取索引

**執行**：
1. 建立 `EXTRACTION_INDEX.md` 文件
2. 記錄所有提取的檔案
3. 記錄每個檔案的來源、位置、用途
4. 記錄提取日期和版本

---

### 3.2 階段二：總整理（Cursor 執行）

#### 步驟 1：分類整理

**目標**：將提取的資料進行分類整理

**執行**：
1. 按主題分類
2. 按資料類型分類（questions、scoring、narratives 等）
3. 按來源分類（Legacy 題庫、題目藍圖、resultTemplates 等）

---

#### 步驟 2：建立對照表

**目標**：建立 Legacy → 現有系統的對照表

**執行**：
1. 建立主題對照表
2. 建立欄位對照表
3. 建立結構對照表
4. 識別重複和衝突

---

#### 步驟 3：建立總整理報告

**目標**：建立完整的總整理報告

**執行**：
1. 建立 `EXTRACTION_SUMMARY.md` 文件
2. 記錄所有提取的資料
3. 記錄分類結果
4. 記錄對照表
5. 記錄重複和衝突
6. 記錄待處理事項

---

### 3.3 階段三：整合刪減昇華（顧問團隊執行）

**目標**：根據現有系統架構進行整合、刪減和昇華

**執行**：
1. 根據總整理報告進行整合
2. 刪減不需要的內容
3. 昇華和優化內容
4. 產出符合現有系統規範的最終檔案

**交付物**：
- 整合後的 questions 檔案
- 整合後的 scoring 檔案
- 整合後的 narratives 檔案
- 整合後的 recommendations 檔案
- 整合後的 riskchains 檔案
- 整合後的 manifests 檔案
- 整合後的規則文件

---

## 四、提取工作區結構

```
P0-12_SCIENTIFIC_ENGINE_COMPLETION/
└── EXTRACTION_WORKSPACE/
    ├── questions/              # 題庫資料
    │   ├── hyper_responsibility.json
    │   ├── fear_based_stability.json
    │   └── ...
    ├── scoring/                # 計分資料
    │   ├── hyper_responsibility.json
    │   └── ...
    ├── narratives/             # 敘事資料
    │   ├── hyper_responsibility.json
    │   └── ...
    ├── recommendations/        # 建議資料
    │   ├── hyper_responsibility.json
    │   └── ...
    ├── riskchains/             # 風險鏈資料
    │   ├── hyper_responsibility.json
    │   └── ...
    ├── manifests/              # Facet 定義
    │   ├── hyper_responsibility.json
    │   └── ...
    ├── rules/                  # 規則資料
    │   ├── buildGuidance_rules.json
    │   ├── guidancePrinciples.json
    │   └── ...
    ├── templates/              # 模板資料
    │   ├── guidanceActionTemplates.json
    │   └── ...
    ├── contentdb/              # ContentDB 檔案
    │   ├── ContentDB_career.js
    │   └── ...
    ├── narrative_logic/        # narrative 相關邏輯
    │   ├── elementNarrative.v1.js
    │   └── ...
    ├── guidance_logic/         # guidance 相關邏輯
    │   ├── chains.json
    │   └── ...
    ├── raw/                    # 原始檔案備份
    │   └── ...
    ├── EXTRACTION_INDEX.md     # 提取索引
    └── EXTRACTION_SUMMARY.md   # 總整理報告
```

---

## 五、執行時間估算

### 5.1 階段一：完整提取

**工作量**：
- 13 個主題 × 每個主題約 2-3 小時 = **26-39 小時**
- 系統邏輯和規則提取 = **8-12 小時**
- ContentDB 檔案提取 = **8-12 小時**
- narrative 和 guidance 邏輯提取 = **4-6 小時**
- 建立提取索引 = **2-3 小時**

**總計**：約 **48-72 小時**（6-9 個工作天）

---

### 5.2 階段二：總整理

**工作量**：
- 分類整理 = **4-6 小時**
- 建立對照表 = **6-8 小時**
- 建立總整理報告 = **4-6 小時**

**總計**：約 **14-20 小時**（2-3 個工作天）

---

### 5.3 階段三：整合刪減昇華

**工作量**：由顧問團隊評估

**總計**：待顧問團隊評估

---

## 六、執行檢查清單

### 6.1 階段一檢查清單

- [ ] 建立提取工作區
- [ ] 提取 13 個主題的完整資料
- [ ] 提取系統邏輯和規則
- [ ] 提取 ContentDB 檔案
- [ ] 提取 narrative 和 guidance 邏輯
- [ ] 建立提取索引
- [ ] 驗證所有提取的資料完整性

---

### 6.2 階段二檢查清單

- [ ] 分類整理所有提取的資料
- [ ] 建立 Legacy → 現有系統的對照表
- [ ] 識別重複和衝突
- [ ] 建立總整理報告
- [ ] 準備交給顧問團隊的資料包

---

### 6.3 階段三檢查清單（顧問團隊）

- [ ] 接收總整理報告和資料包
- [ ] 根據現有系統架構進行整合
- [ ] 刪減不需要的內容
- [ ] 昇華和優化內容
- [ ] 產出符合現有系統規範的最終檔案
- [ ] 驗證最終檔案的完整性

---

## 七、風險和注意事項

### 7.1 風險

1. **資料遺漏**：
   - 風險：可能遺漏某些資料
   - 緩解：建立完整的提取索引，逐一檢查

2. **資料衝突**：
   - 風險：不同來源的資料可能有衝突
   - 緩解：在總整理階段識別衝突，交由顧問團隊處理

3. **資料不完整**：
   - 風險：某些主題的資料可能不完整
   - 緩解：標註不完整的部分，交由顧問團隊處理

---

### 7.2 注意事項

1. **不進行刪減**：
   - 階段一和階段二不進行刪減
   - 所有刪減工作交由顧問團隊執行

2. **保持原始結構**：
   - 提取時保持原始資料結構
   - 不進行轉換或整合

3. **標註來源**：
   - 所有提取的資料都要標註來源
   - 記錄提取日期和版本

4. **備份原始檔案**：
   - 在 `raw/` 資料夾中備份原始檔案
   - 確保可以追溯原始資料

---

## 八、下一步行動

### 8.1 立即執行

1. **建立提取工作區**
   - 建立 `EXTRACTION_WORKSPACE/` 資料夾
   - 建立子資料夾結構

2. **開始提取工作**
   - 按照執行計劃逐步提取
   - 記錄提取進度

---

### 8.2 後續執行

3. **完成階段一**
   - 完成所有資料提取
   - 建立提取索引

4. **完成階段二**
   - 進行總整理
   - 建立總整理報告

5. **交付顧問團隊**
   - 準備資料包
   - 交付總整理報告

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**下一步**：開始執行階段一：完整提取
