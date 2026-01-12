# P0-12 階段三步驟一：完整資料盤點報告

**建立日期**：2026-01-12  
**任務階段**：階段三步驟一  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、任務目標

盤點所有新舊系統的現代科學相關資料，包括：
1. 現有系統資料（`domain/` 目錄）
2. Legacy 系統資料（`docs/legacy/` 目錄）
3. 建立整合狀態對照表

---

## 二、現有系統資料盤點

### 2.1 Questions（題庫）

**位置**：`domain/questions/`

**檔案清單**：
- `stress_recovery.questions.v1.0.json` - 2 題

**Facet 數量**：1 個（`stress_recovery`）

**狀態**：✅ 現有系統檔案

---

### 2.2 Scoring（計分）

**位置**：`domain/facets/`

**檔案清單**：
- `stress_recovery.scoring.v1.0.json` - 計分規則
- `income_expansion_pressure/hexagram_mapping.v1.0.json` - 卦象映射（玄學相關）

**Facet 數量**：1 個現代科學相關（`stress_recovery`）+ 1 個玄學相關（`income_expansion_pressure`）

**狀態**：✅ 現有系統檔案

---

### 2.3 Narratives（敘事）

**位置**：`domain/narratives/`

**檔案清單**：
- `stress_recovery.narr.v1.0.json` - 敘事內容

**Facet 數量**：1 個（`stress_recovery`）

**狀態**：✅ 現有系統檔案

---

### 2.4 Recommendations（建議）

**位置**：`domain/recommendations/`

**檔案清單**：
- `stress_recovery.reco.v1.0.json` - 建議內容

**Facet 數量**：1 個（`stress_recovery`）

**狀態**：✅ 現有系統檔案

---

### 2.5 Riskchains（風險鏈）

**位置**：`domain/riskchains/`

**檔案清單**：
- `stress_recovery.risk.v1.0.json` - 風險鏈內容

**Facet 數量**：1 個（`stress_recovery`）

**狀態**：✅ 現有系統檔案

---

### 2.6 Manifests（Facet 定義）

**位置**：`domain/manifests/`

**檔案清單**：
- `stress_recovery.v1.0.json` - Facet 定義

**Facet 數量**：1 個（`stress_recovery`）

**狀態**：✅ 現有系統檔案

---

### 2.7 Knowledge Base（知識庫）

**位置**：`domain/knowledge_base/`

**檔案清單**：
- `vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫
- `vocabulary_psychology_mapping.v1.0.json` - 心理學映射
- `forbidden_terms.v1.0.json` - 禁用詞清單
- `hexagram_64_full.v1.0.json` - 64 卦定義
- `bagua_8_trigrams.v1.0.json` - 8 卦定義
- `wuxing_5_elements.v1.0.json` - 五行定義
- `mapping_tables.v1.0.json` - 映射表
- `question_design_guidelines.v1.0.md` - 題目設計指南
- `result_presentation_design.v1.0.md` - 結果呈現設計
- `presentation_guidelines.v1.0.md` - 呈現指南
- `ai_narrative_spec.v1.0.md` - AI 敘事規格

**狀態**：✅ 現有系統檔案（主要為玄學系統相關，部分為現代科學整合相關）

---

### 2.8 現有系統資料總結

**現代科學相關 Facet**：
- `stress_recovery` - 完整 Facet（包含 questions、scoring、narratives、recommendations、riskchains、manifest）

**檔案統計**：
- Questions：1 個檔案
- Scoring：1 個檔案
- Narratives：1 個檔案
- Recommendations：1 個檔案
- Riskchains：1 個檔案
- Manifests：1 個檔案
- Knowledge Base：11 個檔案

**總計**：17 個檔案（6 個 Facet 相關檔案 + 11 個知識庫檔案）

---

## 三、Legacy 系統資料盤點

### 3.1 題庫資料

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`

**狀態**：✅ 檔案存在

**內容**：
- 主題數：10 個
- 主題列表：
  1. `chronic_depletion`（慢性耗竭）- 7 題
  2. `hyper_responsibility`（過度責任）- 5 題（題庫）或 7 題（藍圖）
  3. `fear_based_stability`（恐懼驅動的穩定）- 3 題（題庫）或 7 題（藍圖）
  4. `loss_of_agency`（主控感流失）- 7 題
  5. `social_comparison`（社會比較壓力）- 7 題
  6. `suppressed_needs`（需求壓抑）- 7 題
  7. `identity_diffusion`（自我模糊）- 7 題
  8. `emotional_permeability`（情緒滲透）- 7 題
  9. `avoidance_coping`（逃避型因應）- 7 題
  10. 重複的 `hyper_responsibility`（過度責任）- 7 題

**結構**：
- 每個主題包含：`theme_id`、`theme_enLabel`、`theme_zhLabel`、`questions[]`
- 每個問題包含：`question_text`、`choices[]`、`pattern_tags[]`、`confidence_weight`、`choice_meta[]`

---

### 3.2 題目藍圖

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/reports/p1_question_blueprint_v1.json`

**狀態**：✅ 檔案存在

**內容**：
- 主題數量：不確定（需要進一步檢查）
- 主題列表可能與題庫不完全一致

**說明**：
- 藍圖是設計文件，可能包含題庫中沒有的主題
- 可能包含題庫中主題的不同版本

---

### 3.3 計分系統

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/psych/scorer.js`

**狀態**：✅ 檔案存在

**檔案大小**：4,688 bytes

**內容**：
- Legacy 計分邏輯（JavaScript）
- 包含 traits、axes、elements 計算
- 包含 weighted scoring 邏輯

---

### 3.4 結果模板（resultTemplates）

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`

**狀態**：✅ 目錄存在

**檔案清單**（5 個檔案）：
1. `intervention_boundary_matrix.v1.json` - 介入邊界矩陣
2. `anchor_statements.v1.json` - 錨定語句
3. `five_element_mapping.v1.json` - 五行映射
4. `attribution_error_matrix.v1.json` - 歸因錯誤矩陣
5. `consequence_chain_library.v1.json` - 後果鏈庫

**狀態**：✅ 檔案存在（已在 Phase 2-1 提取和分析）

---

### 3.5 結果生成邏輯

#### 3.5.1 buildGuidance.js

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`

**狀態**：✅ 檔案存在

**內容**：
- 結果生成核心邏輯（JavaScript）
- 包含主題優先級、風險鏈生成、年齡帶選擇等邏輯
- 已在 Phase 2-4 提取決策規則（10 條規則）

---

#### 3.5.2 guidancePrinciples.v1.json

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`

**狀態**：✅ 檔案存在

**內容**：
- 原則定義（映射到母題）
- 已在 Phase 2-4 提取（40 條原則，轉換為 10 條決策規則）

---

#### 3.5.3 guidanceActionTemplates.v1.json

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidanceActionTemplates.v1.json`

**狀態**：✅ 檔案存在

**內容**：
- 行動模板（按母題和年齡帶分類）
- 用於生成具體的行動建議

---

#### 3.5.4 intervention_boundary_matrix.v1.json

**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

**狀態**：✅ 檔案存在

**內容**：
- 介入邊界定義
- 已在 Phase 2-4 提取（3 條規則）

---

### 3.6 Legacy 系統資料總結

**題庫資料**：
- 10 個主題（題庫）
- 不確定數量的主題（藍圖）

**計分系統**：
- 1 個計分邏輯檔案（scorer.js）

**結果模板**：
- 5 個結果模板檔案

**結果生成邏輯**：
- 4 個邏輯檔案（buildGuidance.js、guidancePrinciples.v1.json、guidanceActionTemplates.v1.json、intervention_boundary_matrix.v1.json）

**總計**：至少 20 個檔案（10 個主題 × 多個相關檔案 + 系統邏輯檔案）

---

## 四、整合狀態對照表

### 4.1 階段一整合狀態

**狀態**：✅ 已完成

**完成內容**：
- ✅ JSON 結構定義（符合現有系統 schema）
- ✅ 欄位對應表（Legacy → 現有系統）
- ✅ Python 計算核心（Layer A 參考實現）
- ✅ Metadata 處理方案（分離策略）
- ✅ buildGuidance.js 整合方向（高層次）

**交付文件**：
- `P0-12_IMPLEMENTATION_SPEC_FINAL.md` - 最終實作規格書

**狀態說明**：
- 設計規格已完成
- 實際檔案整合尚未執行（待階段三步驟四執行）

---

### 4.2 階段二整合狀態

#### 4.2.1 階段二-1：資料提取與分析

**狀態**：✅ 已完成

**完成內容**：
- ✅ 提取 `resultTemplates/` 資料夾中的所有 JSON 檔案
- ✅ 分析每個檔案的結構和內容
- ✅ 生成實際的 artifacts 檔案

**交付文件**：
- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/` - artifacts 檔案

---

#### 4.2.2 階段二-2：內容映射與轉換

**狀態**：✅ 已完成（設計完成，檔案尚未寫入系統）

**完成內容**：
- ✅ 建立 Legacy → 現有系統的映射表
- ✅ 進行語境轉換（心理學 → 玄學）
- ✅ 進行結構轉換（動態 → 靜態）
- ✅ 生成符合現有系統格式的資料檔案（`chronic_depletion` facet）

**交付文件**：
- `P0-12_PHASE2-2_FINAL_AUDIT_REPORT.md` - 最終審核報告
- `P0-12_PHASE2-2_COMPLETION_SUMMARY.md` - 完成摘要
- Phase 2-2 轉換後的 JSON 檔案定義（在交付報告中）

**檔案狀態**：
- ❌ `domain/narratives/chronic_depletion.narr.v1.0.json` - 尚未寫入
- ❌ `domain/riskchains/chronic_depletion.risk.v1.0.json` - 尚未寫入
- ❌ `domain/recommendations/chronic_depletion.reco.v1.0.json` - 尚未寫入

---

#### 4.2.3 階段二-3：分層架構整合

**狀態**：✅ 已完成

**完成內容**：
- ✅ 將 Phase 2-2 轉換後的資料整合到 L1-L4 分層架構
- ✅ 設計各層的資料結構（Storage vs Runtime 對照）
- ✅ 確保所有內容符合 Stage 4 結果呈現的設計規範

**交付文件**：
- `P0-12_PHASE2-3_AUDIT_REPORT.md` - 審核報告
- `P0-12_PHASE2-3_ACCEPTED_CONTENT.md` - 符合要求的內容提取

---

#### 4.2.4 階段二-4：規則與制度提取

**狀態**：✅ 已完成（規則文件尚未寫入系統）

**完成內容**：
- ✅ buildGuidance.js 決策邏輯完整提取（10 條規則）
- ✅ guidancePrinciples 全量提取（40 條原則，轉換為 10 條規則）
- ✅ intervention_boundary_matrix 規則提取（3 條規則）
- ✅ 完整規則文件（39 條規則）
- ✅ 驗證機制詳細說明和範例
- ✅ 規則應用指南詳細說明和範例
- ✅ 整合報告詳細說明

**交付文件**：
- `P0-12_PHASE2-4_FINAL_AUDIT_REPORT.md` - 最終審核報告
- `P0-12_PHASE2-4_FINAL_ACCEPTED_CONTENT.md` - 符合要求的內容提取

**檔案狀態**：
- ✅ 規則文件在報告中完整定義（39 條規則）
- ❌ 規則文件在 `domain/knowledge_base/` 中尚未寫入

---

### 4.3 已整合內容總結

**現有系統 Facet**：
- ✅ `stress_recovery` - 完整 Facet（現有系統原有）

**Phase 2-2 轉換後的 Facet**：
- ⏳ `chronic_depletion` - 設計完成，檔案尚未寫入系統

**規則文件**：
- ⏳ 39 條規則 - 定義完成，檔案尚未寫入系統

---

### 4.4 未整合內容總結

**Legacy 題庫主題**（10 個主題，僅 1 個已整合）：
- ✅ `chronic_depletion` - 已整合（設計完成，檔案尚未寫入）
- ❌ `hyper_responsibility` - 未整合
- ❌ `fear_based_stability` - 未整合
- ❌ `loss_of_agency` - 未整合
- ❌ `social_comparison` - 未整合
- ❌ `suppressed_needs` - 未整合
- ❌ `identity_diffusion` - 未整合
- ❌ `emotional_permeability` - 未整合
- ❌ `avoidance_coping` - 未整合
- ❌ 其他藍圖中的主題（如 `chronic_alertness`、`meaning_vacuum`、`self_erosion`、`unprocessed_loss`） - 未整合

**整合完成度**：
- 已整合：1 / 10+ 主題（約 10%）
- 未整合：9+ / 10+ 主題（約 90%）

---

## 五、關鍵發現

### 5.1 檔案產出狀態

1. **Phase 2-2 轉換後的檔案**：
   - 設計完成，但檔案尚未寫入系統
   - 需要執行步驟三：檔案產出

2. **Phase 2-4 規則文件**：
   - 規則定義完成，但檔案尚未寫入系統
   - 需要評估是否需要寫入系統

### 5.2 整合完成度

1. **階段一（題目設計 + 分數計算）**：
   - 設計規格完成
   - 實際檔案整合尚未執行

2. **階段二（結果呈現）**：
   - 設計規格完成
   - 僅 1 個主題（`chronic_depletion`）完成轉換設計
   - 檔案尚未寫入系統

3. **整體整合完成度**：
   - 約 10% 的 Legacy 主題已整合（設計階段）
   - 約 90% 的 Legacy 主題尚未整合

### 5.3 優先級建議

1. **高優先級**：
   - 步驟三：檔案產出（Phase 2-2 轉換後的檔案）
   - 步驟四：100% 提取與徹底整合（其他 Legacy 主題）

2. **中優先級**：
   - Phase 2-4 規則文件寫入系統（如需要）
   - 階段一的實際檔案整合

3. **低優先級**：
   - 藍圖中獨有的主題整合（如需要）

---

## 六、下一步建議

### 6.1 立即執行（步驟三）

**檔案產出**：
1. 將 Phase 2-2 轉換後的 `chronic_depletion` 三個 JSON 檔案寫入系統
2. 驗證檔案結構和內容
3. 評估 Phase 2-4 規則文件是否需要寫入系統

### 6.2 後續執行（步驟四）

**100% 提取與徹底整合**：
1. 識別所有未整合的 Legacy 主題
2. 按照階段一和階段二的整合規範，提取和轉換 Legacy 內容
3. 整合到系統

### 6.3 最終執行（步驟五）

**清理舊資料**：
1. 確認所有整合完成
2. 建立清理清單
3. 執行清理

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**下一步**：執行步驟三：檔案產出
