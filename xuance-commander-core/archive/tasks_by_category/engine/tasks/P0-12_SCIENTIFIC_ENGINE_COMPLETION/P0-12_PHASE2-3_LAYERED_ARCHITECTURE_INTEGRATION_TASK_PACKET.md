# P0-12 階段二-3：分層架構整合任務包

**建立日期**：2026-01-12  
**任務階段**：P0-12 階段二-3（結果呈現資料提取與整合 - 分層架構整合）  
**任務狀態**：待執行（PENDING）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、任務目標

將 Phase 2-2 轉換後的 Legacy 結果呈現資料整合到現有系統的 L1-L4 分層架構，設計各層的資料結構，並確保所有內容符合 Stage 4 結果呈現的設計規範。

### 1.1 具體目標

1. **分析 L1-L4 各層的需求**：
   - 理解 Stage 4 結果呈現分層架構的設計要求
   - 分析各層的功能定位和資料需求

2. **將 Legacy 內容分配到各層**：
   - L1：Hexagram Visual（卦象視覺呈現）
   - L2：Root Personalization（本命元素個人化敘事）
   - L3：Flow Analysis（當前狀態分析）
   - L4：Risk Blocking & Action Advice（風險阻斷與行動建議）

3. **設計各層的資料結構**：
   - 定義各層需要的資料欄位
   - 確保資料結構符合現有系統規範

---

## 二、背景資料

### 2.1 任務脈絡

本任務是 P0-12「現代科學引擎完成」任務的第二階段，專門處理結果呈現相關資料的分層架構整合。

**階段一已完成**（✅ 2026-01-11）：
- 題目設計整合
- 分數計算整合
- buildGuidance.js 整合方向（高層次）

**階段二-1已完成**（✅ 2026-01-11）：
- 完整提取 Legacy 結果呈現資料
- 分析每個檔案的結構和內容
- 建立完整的資料清單

**階段二-2已完成**（✅ 2026-01-12）：
- 將 Legacy 內容映射到現有系統結構
- 進行語境轉換（心理學 → 玄學）
- 進行結構轉換（動態 → 靜態）
- 生成符合現有系統格式的資料檔案（`chronic_depletion` facet）

**階段二-3目標**：
- 將 Phase 2-2 轉換後的資料整合到 L1-L4 分層架構
- 設計各層的資料結構
- 確保所有內容符合 Stage 4 結果呈現的設計規範

### 2.2 Stage 4 結果呈現分層架構（完整設計規範）

根據 `P0-5.7_DESIGN_DOC_FINAL.md`，Stage 4 採用 L1-L4 分層架構：

#### 2.2.1 L1：Hexagram Visual（卦象視覺呈現）

**功能定位**：
- 顯示六十四卦的視覺化
- 卦象的基本資訊（名稱、結構等）
- 卦象的視覺化呈現（陰陽爻、卦象圖形等）

**資料需求**：
- Hexagram ID（0-63，內部 canonical ID）
- Hexagram 名稱（中文、英文）
- Hexagram 結構（上下卦、陰陽爻）
- Hexagram 視覺化資料（如果需要）

**資料來源**：
- `domain/knowledge_base/hexagram_64_full.v1.0.json`
- 玄學引擎計算結果（`hexagram_deriver.py`）

**對應檔案**：
- 目前沒有專門的 L1 資料檔案（可能需要從 hexagram_64_full.v1.0.json 和計算結果中提取）

#### 2.2.2 L2：Root Personalization（本命元素個人化敘事）

**功能定位**：
- 使用 Root Element（本命元素）進行個人化
- 敘事內容（opening, explain）
- 基於用戶的本命元素（Root Element）進行敘事

**資料需求**：
- Root Element（木、火、土、金、水）
- 個人化敘事（opening, explain）
- 與本命元素相關的敘事內容

**資料來源**：
- `domain/narratives/<facet>.narr.v1.0.json`（Phase 2-2 轉換後的資料）
- `domain/knowledge_base/wuxing_5_elements.v1.0.json`
- 玄學引擎計算結果（`root_element_mapper.py`）

**對應檔案**：
- `domain/narratives/<facet>.narr.v1.0.json`（已由 Phase 2-2 轉換）

**設計要求**：
- 敘事內容需要使用五行生剋關係
- 敘事內容需要與本命元素相關
- 敘事內容需要符合語境純粹性要求（純玄學語境）

#### 2.2.3 L3：Flow Analysis（當前狀態分析）

**功能定位**：
- 使用 Flow Hexagram（當前卦象）進行分析
- 狀態描述和解釋
- 基於用戶的當前互動（Stage 1-3）進行分析

**資料需求**：
- Flow Hexagram ID（0-63）
- Changing Line Index（變爻索引）
- 狀態分析敘事（opening, explain）
- 與當前卦象相關的敘事內容

**資料來源**：
- `domain/narratives/<facet>.narr.v1.0.json`（可能與 L2 共用或分離）
- `domain/knowledge_base/hexagram_64_full.v1.0.json`
- 玄學引擎計算結果（`hexagram_deriver.py`）

**對應檔案**：
- `domain/narratives/<facet>.narr.v1.0.json`（可能與 L2 共用或分離）
- 可能需要新增 L3 專用的資料結構

**設計要求**：
- 敘事內容需要使用卦象解釋
- 敘事內容需要與當前卦象相關
- 敘事內容需要符合語境純粹性要求（純玄學語境）

#### 2.2.4 L4：Risk Blocking & Action Advice（風險阻斷與行動建議）

**功能定位**：
- 風險鏈（riskchains）
- 行動建議（recommendations）
- 基於風險等級和計算結果提供建議

**資料需求**：
- Risk Level（low/mid/high）
- Risk Chains（if_not_improve）
- Recommendations（id, title, steps）
- 與風險等級相關的建議內容

**資料來源**：
- `domain/riskchains/<facet>.risk.v1.0.json`（Phase 2-2 轉換後的資料）
- `domain/recommendations/<facet>.reco.v1.0.json`（Phase 2-2 轉換後的資料）
- 科學引擎計算結果（`score_facet.py`）

**對應檔案**：
- `domain/riskchains/<facet>.risk.v1.0.json`（已由 Phase 2-2 轉換）
- `domain/recommendations/<facet>.reco.v1.0.json`（已由 Phase 2-2 轉換）

**設計要求**：
- 風險鏈需要使用因果關係（→）
- 建議內容需要使用日常語言，不使用心理學詞彙
- 建議內容需要符合語境純粹性要求（純玄學語境）

### 2.3 Phase 2-2 交付成果（輸入資料）

**已轉換的檔案**（針對 `chronic_depletion` facet）：
- ✅ `domain/narratives/chronic_depletion.narr.v1.0.json`
- ✅ `domain/riskchains/chronic_depletion.risk.v1.0.json`
- ✅ `domain/recommendations/chronic_depletion.reco.v1.0.json`

**映射規則**：
- `anchor_statements.v1.json` → narratives
- `consequence_chain_library.v1.json` → riskchains
- `intervention_boundary_matrix.v1.json` → recommendations

**轉換過程記錄**：
- 語境轉換範例記錄（6 個範例）
- 結構轉換記錄
- 映射規則說明

### 2.4 現有系統的 Stage 4 設計要求

#### 2.4.1 4 階段 UI 流程

根據 `P0-5.7_DESIGN_DOC_FINAL.md`，現有系統採用 4 階段 UI 流程：

- **Stage 1（The Wheel）**：先天八卦盤（Primordial Bagua）- Facet Triage
- **Stage 2（Radial Compass）**：五行羅盤（Elemental Compass）- Symbol Selection
- **Stage 3（Projection）**：鑄爻（Casting Lines）- Deep Profiling
- **Stage 4（Results）**：卦象顯影（Hexagram Manifestation）- 結果呈現

#### 2.4.2 Stage 4 設計規範

**UI 隱喻**：卷軸顯影（Reveal Scroll Layered）

**互動流程**：
- **Unroll（展開）** → **Development（顯影）**
- 左側 Root 與右側 Flow 墨跡交匯，暈染出最終建議

**資料流向**：
1. 本機運算（Local Calc）：雙引擎完成計算，鎖定 `Risk_Level`, `Hexagram_ID`, `Changing_Line`, `Action_Points`
2. Payload 建構：系統將上述鎖定結果封裝為 JSON Context
3. AI 生成（Generation）：將 JSON Context 傳送至 AI 模型（LLM），依據 Prompt 生成完整報告
4. 使用者呈現（Presentation）：前端顯示 AI 生成的文本

**嚴格約束**：
- 禁止 AI 重新解卦
- 禁止 AI 修改風險等級
- 禁止 AI 新增建議
- 必須遵守玄學語境規則

### 2.5 設計原則與約束

#### 2.5.1 語境純粹性要求（嚴格遵守）

**核心原則**：使用者必須感知為「純玄學系統」，不得暴露任何現代科學背景。

**具體要求**：

1. **禁止心理學名詞**：
   - ❌ 不得使用：焦慮、憂鬱、壓力、創傷、防禦機制、認知偏差、情緒調節等
   - ✅ 必須使用：心神不寧、氣滯流塞、能量低落、氣血不暢、自我保護、心神閉塞等玄學對應詞彙

2. **禁止現代科學背景**：
   - ❌ 不得使用：心理學、神經科學、認知科學、臨床診斷等
   - ❌ 不得說明「這是科學計算」或「基於心理學理論」

3. **僅使用玄學詞彙庫**：
   - ✅ 必須使用：`domain/knowledge_base/vocabulary_metaphysical.v1.0.json` 中定義的詞彙
   - ✅ 必須通過：`domain/knowledge_base/forbidden_terms.v1.0.json` 的禁用詞檢查

#### 2.5.2 可回滾、不凍結原則

- ✅ **所有資料保持可回滾**：所有整合和生成的資料都可以回滾
- ✅ **不凍結設計**：設計和決策不鎖定，可以根據實作情況調整

#### 2.5.3 以最新版設計為主

- ✅ **以最新版設計為主**：以最新版的網頁設計、UI 設計、風格元素為主
- ✅ **舊資料作為參考**：Legacy 資料作為參考，判斷是否有價值資料可以後續用做討論

---

## 三、任務執行步驟

### 步驟 1：分析 L1-L4 各層的需求

1. 詳細分析 Stage 4 結果呈現分層架構的設計要求
2. 分析各層的功能定位和資料需求
3. 分析各層的資料來源和對應檔案
4. 分析各層的設計要求（語境、結構等）

### 步驟 2：分析 Phase 2-2 轉換後的資料

1. 分析 Phase 2-2 轉換後的 narratives 資料（L2/L3 候選）
2. 分析 Phase 2-2 轉換後的 riskchains 資料（L4 候選）
3. 分析 Phase 2-2 轉換後的 recommendations 資料（L4 候選）
4. 識別資料與各層的對應關係

### 步驟 3：設計各層的資料結構

1. 設計 L1 的資料結構（如果需要新增）
2. 設計 L2 的資料結構（基於 narratives，可能需要調整）
3. 設計 L3 的資料結構（基於 narratives，可能需要分離或共用）
4. 設計 L4 的資料結構（基於 riskchains 和 recommendations，可能需要整合）

### 步驟 4：將 Legacy 內容分配到各層

1. 將 narratives 內容分配到 L2 和 L3（如果共用或分離）
2. 將 riskchains 內容分配到 L4
3. 將 recommendations 內容分配到 L4
4. 確保所有內容符合各層的設計要求

### 步驟 5：驗證和測試

1. 驗證資料結構符合現有系統規範
2. 驗證語境純粹性（通過禁用詞檢查）
3. 驗證各層的資料完整性
4. 驗證資料與 Stage 4 設計要求的對應關係

---

## 四、預期產出

### 4.1 主要產出

1. **L1-L4 資料結構定義文件**：
   - 各層的資料結構定義
   - 各層的資料欄位說明
   - 各層的資料來源和對應檔案

2. **各層內容分配表**：
   - Legacy 內容分配到各層的對應關係
   - 各層內容的來源和處理方式

3. **整合後的資料範例**：
   - L1 資料範例（如果需要）
   - L2 資料範例（基於 narratives）
   - L3 資料範例（基於 narratives 或獨立）
   - L4 資料範例（基於 riskchains 和 recommendations）

4. **整合報告**：
   - 整合過程說明
   - 設計決策記錄
   - 驗證結果

### 4.2 文件格式

所有產出以 Markdown 或 JSON 格式記錄，標記為 WORKING DOCUMENT（不鎖定，可回滾）。

---

## 五、注意事項

### 5.1 原則遵守

- ✅ **可回滾、不凍結**：所有整合和生成的資料都保持可回滾、不凍結狀態
- ✅ **以最新版設計為主**：整合時以最新版的設計需求為主
- ✅ **完整的背景資料**：所有整合都提供完整的背景資料說明

### 5.2 品質要求

- ✅ **語境純粹性**：所有產出必須通過禁用詞檢查
- ✅ **結構一致性**：所有產出必須符合現有系統結構
- ✅ **文本記錄**：所有整合過程都以文本形式記錄

### 5.3 重要提醒

- ⚠️ **所有資料保持不凍結、不鎖定、可回滾**：所有生成的檔案和文件都標記為 WORKING BASELINE，可以隨時修改或回滾
- ⚠️ **文本作為唯一依據**：所有決策和整合都記錄在文本中，以文本為準

---

## 六、參考資料

### 6.1 Phase 2-2 交付成果

- `P0-12_PHASE2-2_FINAL_AUDIT_REPORT.md` - Phase 2-2 最終審核報告
- `P0-12_PHASE2-2_COMPLETION_SUMMARY.md` - Phase 2-2 完成摘要
- `P0-12_PHASE2-2_TASK_REPORT.md` - Phase 2-2 任務報告
- Phase 2-2 轉換後的 JSON 檔案（`chronic_depletion` facet）

### 6.2 現有系統設計文件

- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文件（Stage 4 設計規範）
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣系統實現
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

### 6.3 現有系統資料結構範例

- `domain/narratives/stress_recovery.narr.v1.0.json` - narratives 結構範例
- `domain/recommendations/stress_recovery.reco.v1.0.json` - recommendations 結構範例
- `domain/riskchains/stress_recovery.risk.v1.0.json` - riskchains 結構範例

### 6.4 玄學知識庫

- `domain/knowledge_base/hexagram_64_full.v1.0.json` - 六十四卦定義
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行系統定義
- `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦定義

### 6.5 語境約束資料

- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞列表

### 6.6 階段一完成文件

- `P0-12_IMPLEMENTATION_SPEC_FINAL.md` - 最終實作規格書
- `P0-12_COMPLETE_BACKGROUND_DATA_PACKAGE.md` - 完整背景資料包
- `P0-12_INTEGRATION_STATUS_AND_NEXT_STEPS.md` - 整合狀態與下一步分析

---

**任務狀態**：待執行（PENDING）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**重要提醒**：所有資料保持不凍結、不鎖定、可回滾  
**最後更新**：2026-01-12
