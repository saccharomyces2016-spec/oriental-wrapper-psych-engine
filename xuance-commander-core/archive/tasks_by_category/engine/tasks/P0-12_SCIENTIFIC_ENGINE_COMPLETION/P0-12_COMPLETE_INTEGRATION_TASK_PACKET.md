# P0-12 完整整合任務包（交付顧問團隊）

**建立日期**：2026-01-12  
**目的**：將所有已提取和尚未提取的資料交付顧問團隊，進行完整整合  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、任務目標

### 1.1 核心目標

將所有舊版本資料完整整合到新版本系統，確保：
1. ✅ 所有資料都已提取到新版本
2. ✅ 所有資料都經過雙向核對確認
3. ✅ 可以安全刪除重複的舊版本檔案

---

## 二、交付內容

### 2.1 已提取的資料（新版本）

#### questions 文件（8個領域）

**文件位置**：`domain/questions/{facet_id}.questions.v1.0.json`

**領域列表**：
1. chronic_depletion.questions.v1.0.json
2. chronic_alertness.questions.v1.0.json
3. fear_based_stability.questions.v1.0.json
4. hyper_responsibility.questions.v1.0.json
5. identity_diffusion.questions.v1.0.json
6. loss_of_agency.questions.v1.0.json
7. meaning_vacuum.questions.v1.0.json
8. suppressed_needs.questions.v1.0.json

**狀態**：✅ 已生成（初步版本，結構轉換完成，語境轉換待改進）

---

#### scoring 文件（8個領域）

**文件位置**：`domain/facets/{facet_id}.scoring.v1.0.json`

**領域列表**：
1. chronic_depletion.scoring.v1.0.json
2. chronic_alertness.scoring.v1.0.json
3. fear_based_stability.scoring.v1.0.json
4. hyper_responsibility.scoring.v1.0.json
5. identity_diffusion.scoring.v1.0.json
6. loss_of_agency.scoring.v1.0.json
7. meaning_vacuum.scoring.v1.0.json
8. suppressed_needs.scoring.v1.0.json

**狀態**：✅ 已生成（初步版本，結構轉換完成，權重和方向待驗證）

---

#### legacy_map 文件

**文件位置**：`domain/knowledge_base/legacy_map.v1.0.json`

**內容**：包含 8 個領域的 pattern_tags 和 choice_meta 映射

**狀態**：✅ 已生成

---

### 2.2 尚未提取的舊版本文件

#### questionBank.v1.json

**文件位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/questionBank.v1.json`

**內容**：
- 10 個主題的完整題目資料
- 包含 question_text, choices, pattern_tags, confidence_weight, choice_meta

**狀態**：✅ 存在

**注意**：
- 8 個主題已對應到新版本領域並提取
- 2 個主題未對應（avoidance_coping, hyper responsibility）

---

#### scorer.js

**文件位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/psych/scorer.js`

**內容**：計算邏輯（traits, axes, elements, motherThemes）

**狀態**：✅ 存在

**注意**：confidence_weight 已提取，但完整計算邏輯可能需要進一步整合

---

#### guidancePrinciples.v1.json

**文件位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`

**內容**：母題原則（motherTheme principles）

**狀態**：✅ 存在

---

#### buildGuidance.js

**文件位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`

**內容**：結果生成邏輯

**狀態**：✅ 存在

**注意**：Phase 2-4 已提取規則，但完整邏輯可能需要進一步整合

---

### 2.3 尚未對應的舊版本主題

1. **avoidance_coping**：7 題（逃避型因應）
2. **hyper responsibility**：5 題（過度責任）- 注意：可能與 hyper_responsibility 重複

---

## 三、新舊版本對應關係

### 3.1 領域對應表

| 新版本領域 | 舊版本主題 | 題數 | 提取狀態 |
|-----------|-----------|------|---------|
| chronic_depletion | chronic_depletion | 7 | ✅ 已提取 |
| chronic_alertness | emotional_permeability | 7 | ✅ 已提取 |
| fear_based_stability | fear based stability | 3 | ✅ 已提取 |
| hyper_responsibility | hyper_responsibility | 7 | ✅ 已提取 |
| identity_diffusion | identity_diffusion | 7 | ✅ 已提取 |
| loss_of_agency | loss_of_agency | 7 | ✅ 已提取 |
| meaning_vacuum | social_comparison | 7 | ✅ 已提取 |
| suppressed_needs | suppressed_needs | 7 | ✅ 已提取 |

---

## 四、任務要求

### 4.1 整合任務

1. **檢查已提取的資料**：
   - 確認所有新版本文件結構正確
   - 檢查語境轉換品質
   - 驗證權重和計算邏輯

2. **處理尚未對應的主題**：
   - avoidance_coping（7題）
   - hyper responsibility（5題）
   - 決定是否整合或保留

3. **完整整合檢查**：
   - 確保所有資料都已提取
   - 進行雙向核對確認
   - 識別可刪除的重複檔案

4. **準備清理計劃**：
   - 列出可刪除的舊版本檔案
   - 確認所有資料都已在新版本中

---

### 4.2 整合原則

1. **以新版本制度為準**（8個領域，5個核心文件結構）
2. **從舊版本提取內容**（100% 提取目標）
3. **確保資料完整性**（所有資料都要有對應）
4. **雙向核對確認**（新舊版本都要確認）

---

## 五、關鍵背景資料

### 5.1 系統設計和終極目標

#### 5.1.1 UI/互動介面設計（Stage 1-4）

**設計文件**：`P0-5.7_DESIGN_DOC_FINAL.md`（世界觀設計最終版）

**四階段設計**：

**Stage 1（The Wheel / 八卦盤）**：
- UI隱喻：先天八卦盤（Primordial Bagua）
- 功能：Facet Triage（領域分類）
- 互動方式：使用者選擇對應的八卦領域
- 題目形式：單一對象選擇（對應八個領域）

**Stage 2（Radial Compass / 五行羅盤）**：
- UI隱喻：五行羅盤（Elemental Compass）
- 功能：Symbol Selection（符號選擇）
- 互動方式：使用者選擇五行元素相關的符號
- 題目形式：單一對象選擇（五行元素相關）

**Stage 3（Projection / 鑄爻）**：
- UI隱喻：鑄爻（Casting Lines）
- 功能：Deep Profiling（深度分析）
- 互動方式：基於 Stage 1-2 的選擇，進行量表問答
- 題目形式：likert_5（5點量表，但以玄學語境呈現）

**Stage 4（Results / 卦象顯影）**：
- UI隱喻：卦象顯影（Hexagram Manifestation）
- 功能：結果呈現（L1-L4 分層架構）
- 輸出內容：
  - L1：Hexagram Visual（卦象視覺）
  - L2：Root Personalization（根元素個人化敘事）
  - L3：Flow Analysis（流動分析）
  - L4：Risk Blocking & Action Advice（風險阻斷與行動建議）

---

#### 5.1.2 題目設計原則

**設計文件**：`domain/knowledge_base/question_design_guidelines.v1.0.md`

**核心原則**：
- **De-Questionnaire 原則**：避免傳統問卷元素（滑桿、Likert量表UI）
- **儀式化互動**：單一對象選擇，避免多選
- **語境純粹性**：完全使用玄學語境，禁止心理學術語
- **結構映射**：題目映射到易經矩陣系統（八卦、五行、六十四卦）

**題型設計**：
- 題目類型：`likert_5`（5點量表）
- 選項設計：使用玄學語境的選項文字（如「巨石壓身，難以動彈」等）
- 互動方式：單一選擇，而非滑桿或多選

---

#### 5.1.3 結果產出和AI處理流程

**設計文件**：
- `domain/knowledge_base/result_presentation_design.v1.0.md`
- `domain/knowledge_base/ai_narrative_spec.v1.0.md`

**結果產出流程**：

1. **本地計算層（Python Engine）**：
   - 計算科學評估結果（weighted_sum 模型）
   - 計算玄學結果（八卦、五行、六十四卦）
   - 確保「雙軌計算，結果一致」

2. **AI敘事層（AI Narrative Layer）**：
   - **AI角色**：敘事者（Narrator），非計算者（Calculator）
   - **輸入**：本地計算的結構化資料（JSON）
   - **處理**：將結構化資料轉換為文學性、同理心、玄學主題的自然語言報告
   - **輸出**：最終使用者看到的分析答案

**AI處理約束**：
- 禁止重新解讀卦象
- 禁止修改風險等級
- 禁止新增建議（只能使用本地計算的建議）
- 禁止使用心理學術語
- 必須使用玄學詞彙表

**L1-L4 分層架構**：
- **L1（Hexagram Visual）**：卦象視覺呈現
- **L2（Root Personalization）**：基於根元素的個人化敘事
- **L3（Flow Analysis）**：基於流動卦象的當前狀態分析
- **L4（Risk Blocking & Action Advice）**：風險鏈和行動建議

---

#### 5.1.4 系統架構和終極目標

**設計文件**：
- `P0-5.5_ELEMENT_SELECTION_DECISION.md`（元素選擇決策，最終定案）
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md`（設計方向總結）

**核心架構**：
- **結構層**：八卦（Eight Trigrams）/ 六十四卦（64 Hexagrams）
- **動態層**：五行（Five Elements）
- **計算層**：雙軌引擎（Root x Flow）

**終極目標**：
- 提供一個完整的玄學系統體驗（對使用者而言）
- 背後使用現代科學計算（對系統而言）
- 最終呈現：科學計算的正確結果，但包裝為玄學計算結果
- 使用者體驗：完全以玄學語境呈現，無心理學痕跡

---

### 5.2 設計文件（整合相關）

- `P0-12_IMPLEMENTATION_SPEC_FINAL.md`：整合工程實作規格書（最終版）
- `P0-12_CURRENT_SYSTEM_THEME_VERIFICATION.md`：當前系統主題驗證報告
- `P0-12_INTEGRATION_PRINCIPLES.md`：整合原則

### 5.3 執行記錄

- `P0-12_PHASE3_INTEGRATION_EXECUTION_LOG.md`：階段三執行日誌
- `P0-12_DATA_EXTRACTION_COMPLETE_REPORT.md`：資料提取完成報告
- `P0-12_DATA_EXTRACTION_STATUS_REPORT.md`：資料提取狀態報告

### 5.4 現有系統範例

- `domain/questions/stress_recovery.questions.v1.0.json`：現有系統 questions 範例
- `domain/facets/stress_recovery.scoring.v1.0.json`：現有系統 scoring 範例
- `domain/narratives/stress_recovery.narr.v1.0.json`：現有系統 narratives 範例
- `domain/recommendations/stress_recovery.reco.v1.0.json`：現有系統 recommendations 範例

---

## 六、預期產出

### 6.1 整合完成報告

1. **整合狀態報告**：
   - 所有資料的提取狀態
   - 雙向核對確認結果
   - 識別的可刪除檔案列表

2. **改進建議**：
   - 語境轉換改進建議
   - 計算邏輯整合建議
   - 品質提升建議

3. **清理計劃**：
   - 可刪除的舊版本檔案列表
   - 刪除順序和注意事項

---

## 七、執行流程

### 7.1 階段一：檢查和改進

1. 檢查所有已提取的資料
2. 改進語境轉換和品質
3. 驗證計算邏輯

### 7.2 階段二：處理未對應主題

1. 決定 avoidance_coping 和 hyper responsibility 的處理方式
2. 如需整合，進行提取和轉換
3. 記錄決策和處理結果

### 7.3 階段三：雙向核對確認

1. 新版本 → 舊版本核對（確認所有資料已提取）
2. 舊版本 → 新版本核對（確認所有資料都有對應）
3. 生成核對報告

### 7.4 階段四：準備清理

1. 列出可刪除的檔案
2. 確認所有資料都已在新版本中
3. 準備清理計劃

---

## 八、注意事項

### 8.1 資料狀態

- ✅ 所有新版本文件為初步版本（結構轉換完成，語境轉換待改進）
- ✅ 所有資料保持不鎖定、可回滾狀態
- ✅ 以新版本制度為準，舊版本資料用於補充

### 8.2 整合原則

- ✅ P0 版本為最新版本，制度為準則
- ✅ 當有制度衝突時，以 P0 版本為準
- ✅ 從舊版本提取內容，100% 提取目標

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**交付對象**：顧問團隊  
**當前狀態**：✅ **任務包準備完成，等待顧問團隊處理**
