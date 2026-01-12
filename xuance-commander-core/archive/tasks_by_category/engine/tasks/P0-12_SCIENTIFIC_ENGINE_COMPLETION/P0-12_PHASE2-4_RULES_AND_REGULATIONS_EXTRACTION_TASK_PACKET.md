# P0-12 階段二-4：規則與制度提取任務包

**建立日期**：2026-01-12  
**任務階段**：P0-12 階段二-4（結果呈現資料提取與整合 - 規則與制度提取）  
**任務狀態**：待執行（PENDING）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、任務目標

提取 Legacy 系統中的呈現規則、制度、依據，建立符合現有系統設計規範的規則文件，用於指導 Stage 4 結果呈現的決策邏輯和規則應用。

### 1.1 具體目標

1. **分析 intervention_boundary_matrix 的規則**：
   - 提取介入邊界規則
   - 分析規則的觸發條件和邏輯
   - 將規則轉換為現有系統可用的格式

2. **提取 guidancePrinciples 的邏輯**：
   - 提取指導原則的邏輯
   - 分析原則的適用條件和決策規則
   - 將原則轉換為現有系統可用的格式

3. **分析 buildGuidance.js 的決策邏輯**：
   - 分析決策邏輯的流程
   - 提取關鍵決策點和規則
   - 將決策邏輯轉換為現有系統可用的格式

4. **建立呈現規則文件**：
   - 建立規則文件（Markdown 或 JSON）
   - 建立決策邏輯說明文件
   - 建立規則應用指南

---

## 二、完整背景資料

### 2.1 任務脈絡

本任務是 P0-12「現代科學引擎完成」任務的第二階段，專門處理結果呈現相關資料的規則與制度提取。

**階段一已完成**（✅ 2026-01-11）：
- 題目設計整合
- 分數計算整合
- buildGuidance.js 整合方向（高層次）

**階段二-1已完成**（✅ 2026-01-11）：
- 完整提取 Legacy 結果呈現資料
- 分析每個檔案的結構和內容
- 建立完整的資料清單
- 生成 artifacts 檔案（manifest.json、analysis.json、report.generated.md）

**階段二-2已完成**（✅ 2026-01-12）：
- 將 Legacy 內容映射到現有系統結構
- 進行語境轉換（心理學 → 玄學）
- 進行結構轉換（動態 → 靜態）
- 生成符合現有系統格式的資料檔案（`chronic_depletion` facet）

**階段二-3已完成**（✅ 2026-01-12）：
- 將 Phase 2-2 轉換後的資料整合到 L1-L4 分層架構
- 設計各層的資料結構（Storage vs Runtime 對照）
- 確保所有內容符合 Stage 4 結果呈現的設計規範

**階段二-4目標**：
- 提取呈現規則、制度、依據
- 建立規則文件
- 建立決策邏輯說明
- 建立規則應用指南

### 2.2 Stage 4 結果呈現設計規範（完整參考）

根據 `P0-5.7_DESIGN_DOC_FINAL.md`，Stage 4 採用 L1-L4 分層架構和 AI 敘事生成層。

#### 2.2.1 4 階段 UI 流程

- **Stage 1（The Wheel）**：先天八卦盤（Primordial Bagua）- Facet Triage
- **Stage 2（Radial Compass）**：五行羅盤（Elemental Compass）- Symbol Selection
- **Stage 3（Projection）**：鑄爻（Casting Lines）- Deep Profiling
- **Stage 4（Results）**：卦象顯影（Hexagram Manifestation）- 結果呈現

#### 2.2.2 Stage 4 結果呈現分層架構（L1-L4）

**L1：Hexagram Visual（卦象視覺層）**
- 功能定位：顯示六十四卦的視覺化，卦象的基本資訊（名稱、結構等）
- 資料來源：`hexagram_deriver.py` + `hexagram_64_full.v1.0.json`
- 資料結構：Runtime Payload（hexagram_id, hexagram_name, upper_trigram, lower_trigram, changing_line）
- 治理說明：L1 不接收 Phase 2-2 靜態資料，嚴禁 AI 解釋或重算卦象

**L2：Root Personalization（本命個人化敘事層）**
- 功能定位：以「本命五行（Root Element）」為核心，提供根本狀態敘事（Opening Statement）
- 資料來源：`root_element_mapper.py` + `domain/narratives/<facet>.narr.v1.0.json` (opening)
- 資料結構：Storage（narratives 檔案中的 opening 欄位）+ Runtime Payload（root_element, band, narrative）
- 治理說明：敘事內容完全來自 Phase 2-2 narratives 檔案，僅允許依 Root Element 與 Band 做語句選擇

**L3：Flow Analysis（當前流動狀態層）**
- 功能定位：結合「當前卦象（Flow Hexagram）」描述目前行運與變化趨勢，使用「解釋文 (Explain)」說明五行生剋機制
- 資料來源：`hexagram_deriver.py` + `domain/narratives/<facet>.narr.v1.0.json` (explain)
- 資料結構：Storage（narratives 檔案中的 explain 欄位）+ Runtime Payload（flow_hexagram_id, band, analysis）
- 治理說明：L2 與 L3 共用 narratives 檔案，差異僅在於取用欄位（Opening vs Explain）

**L4：Risk Blocking & Action Advice（風險阻斷與行動層）**
- 功能定位：唯一允許出現「未改善後果（Risk Chains）」與「行動建議（Recommendations）」的層級
- 資料來源：`score_facet.py` (Risk Level) + `domain/riskchains/<facet>.risk.v1.0.json` + `domain/recommendations/<facet>.reco.v1.0.json`
- 資料結構：Storage（riskchains 和 recommendations 檔案）+ Runtime Payload（risk_level, risk_chains, recommendations）
- 治理說明：嚴禁 AI 新增或刪除任何風險鏈與建議，僅能做語言潤飾，Risk Chain 僅在中高 (Mid/High) 風險等級觸發

#### 2.2.3 Stage 4 資料流向

1. **Local Calc (本機運算)**：雙引擎（科學評分 + 玄學推導）完成計算，鎖定 `Risk_Level`, `Hexagram_ID`, `Changing_Line`, `Root_Element`
2. **Payload Build (資料組裝)**：系統依據上述計算結果，從 L2-L4 JSON 檔案中提取對應內容，組裝成完整 Context
3. **AI Generation (生成)**：AI 模型僅負責將 Context 轉化為流暢的敘事文本（潤飾），不進行邏輯推理
4. **Frontend Presentation (呈現)**：前端依據 L1-L4 順序進行「卷軸顯影」

#### 2.2.4 AI 敘事生成層嚴格約束

根據 `P0-5.7_DESIGN_DOC_FINAL.md`，AI 敘事生成層必須遵守以下嚴格約束：

**核心規則（必須遵守）**：

1. **禁止 AI 重新解卦**：
   - ❌ AI 不得自行根據卦象 ID 進行網路搜索或自由聯想
   - ✅ AI 必須依據 Payload 中提供的 `Interpretation_Key` 進行擴寫
   - ✅ AI 必須使用 Payload 中的 `Hexagram_ID`、`Changing_Line` 等鎖定數據

2. **禁止 AI 修改風險等級**：
   - ❌ 若本機判定為 HIGH Risk，AI 生成的語氣必須是警示性的，不得生成「其實沒關係」的安撫話語
   - ❌ AI 不得降低或提升本機計算的風險等級
   - ✅ AI 必須維持本機計算的風險等級，並以對應的語氣進行敘事

3. **禁止 AI 新增建議**：
   - ❌ AI 僅能潤飾本機提供的 `Action_Points`，不得無中生有
   - ❌ AI 不得新增本機計算結果中不存在的建議或行動方案
   - ✅ AI 只能對本機提供的 `Action_Points` 進行文學性擴寫和潤飾

4. **必須遵守玄學語境規則**：
   - ✅ AI 生成的文本必須保持「純玄學系統」的語境
   - ❌ 不得使用心理學名詞（如：焦慮、憂鬱、壓力等）
   - ❌ 不得暴露科學計算過程或現代科學背景
   - ❌ 不得說明「其實這是科學計算」
   - ✅ 必須使用易經、五行等玄學語彙進行敘事

5. **必須遵守雙語規則**：
   - ✅ AI 生成必須支持 CN/EN 雙語
   - ✅ 中文版本必須像原生中文玄學系統，不得像翻譯
   - ✅ 英文版本必須像原生英文玄學產品，不得像翻譯
   - ✅ 必須根據 Payload 中的 `locale` 參數生成對應語言的文本

**提示詞規範 (Prompt Constraints)**：

AI 轉化版的 Prompt 必須包含以下要素：

1. **角色定義**：
   - AI 是「玄學敘事者」，不是運算者
   - AI 的任務是將結構化數據轉譯為玄學敘事

2. **數據約束**：
   - 必須明確告知 AI 只能使用 Payload 中的數據
   - 必須明確告知 AI 不得重新計算或修改風險等級

3. **語境約束**：
   - 必須明確告知 AI 保持「純玄學系統」語境
   - 必須明確列出禁用詞（心理學名詞、科學術語等）

4. **輸出格式**：
   - 必須明確定義輸出格式（L1-L4 分層結構）
   - 必須明確定義語言（CN/EN）

**驗證機制 (Validation Mechanism)**：

為確保 AI 轉化版的輸出符合規則，必須建立驗證機制：

1. **風險等級驗證**：驗證 AI 生成的風險等級與本機計算結果一致
2. **建議數量驗證**：驗證 AI 生成的建議數量不超過本機提供的數量
3. **禁用詞檢查**：驗證 AI 生成的文本不包含禁用詞
4. **語境檢查**：驗證 AI 生成的文本符合玄學語境

### 2.3 Phase 2-1 交付成果（輸入資料）

**Artifacts 檔案位置**：`docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/`

#### 2.3.1 manifest.json

**檔案位置**：`docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/manifest.json`

**內容說明**：
- 包含 9 個檔案的完整清單
- 每個檔案包含：`file`、`abs_path`、`rel_root`、`size_bytes`、`sha256`、`kind`、`lines`

**關鍵檔案路徑**：
- `intervention_boundary_matrix.v1.json`: `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

#### 2.3.2 analysis.json

**檔案位置**：`docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/analysis.json`

**關鍵檔案分析**：

**intervention_boundary_matrix.v1.json**：
- `kind`: `json`
- `context_detected`: `{context: "neutral", psychHits: 0, metaphysHits: 0}`
- `usability`: `medium`
- `conversion_difficulty`: `medium`
- `suggested_use`: `"Logic reference for L4 Action Advice gating"`
- `json_parse`: `ok`
- `json_shape`: `{type: "object", keys: 2, sample: {meta: "{...}", items: "[...]"}}`

#### 2.3.3 report.generated.md

**檔案位置**：`docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/report.generated.md`

**內容說明**：
- 可讀的摘要報告
- 包含檔案清單和每檔案分析

### 2.4 Legacy 檔案結構（完整參考）

#### 2.4.1 intervention_boundary_matrix.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

**實際結構**（基於 Phase 2-1 分析）：
- 檔案類型：JSON
- 檔案大小：2,221 bytes
- 頂層結構：object（dict）
- 頂層 keys：`["meta", "items"]`

**meta 結構**：
```json
{
  "version": "1.0",
  "description": "介入邊界矩陣：定義建議的適用範圍和限制",
  "note": "Frozen - do not edit, only extend"
}
```

**items 結構**：
- 類型：array（list）
- 長度：約 3 個項目
- 每個項目類型：object（dict）
- 每個項目的 keys：`["id", "label", "confidence", "uncertainty_note", "do_not_say", "safe_tone_template"]`

**關鍵欄位說明**：
- `id`: string（唯一識別碼）
- `label`: string（邏輯規則描述）- 用於生成 title
- `confidence`: string（例如："medium"）- 用於分類到 bands
- `safe_tone_template`: object（包含 action 等欄位）- 用於生成 steps

**語境分析**：
- `context`: `neutral`（邏輯規則，無語境問題）
- `psychHits`: 0（心理學詞彙數量）
- `metaphysHits`: 0（玄學詞彙數量）

**可用性評估**：
- `usability`: `medium`
- `conversion_difficulty`: `medium`
- `suggested_use`: "Logic reference for L4 Action Advice gating"

#### 2.4.2 buildGuidance.js 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`

**檔案資訊**：
- 檔案類型：JavaScript
- 檔案大小：約 12KB（實際大小需要從檔案系統確認）
- 檔案行數：約 600 行（實際行數需要從檔案系統確認）

**結構說明**（基於檔案分析）：
- JavaScript 模組（ES6 模組或 CommonJS）
- 包含多個函數和導出
- 使用 `guidancePrinciples`、`guidanceActionTemplates`、`intervention_boundary_matrix` 等資料
- 包含決策邏輯和規則應用
- 包含風險等級判斷邏輯
- 包含建議生成邏輯

**關鍵邏輯關鍵字**（基於檔案內容分析）：
- `if (`：條件判斷邏輯
- `switch`：多分支決策邏輯
- `return`：返回值邏輯
- `risk`：風險相關邏輯
- `guidance`：指導相關邏輯
- `principle`：原則相關邏輯
- `template`：模板相關邏輯
- `intervention`：介入相關邏輯
- `boundary`：邊界相關邏輯
- `decision`：決策相關邏輯
- `rule`：規則相關邏輯
- `apply`：應用相關邏輯
- `validate`：驗證相關邏輯
- `check`：檢查相關邏輯

**關鍵函數和邏輯**（需要從檔案中提取）：
- 決策邏輯流程
- 規則應用邏輯
- 風險等級判斷
- 建議生成邏輯
- 規則驗證邏輯
- 條件檢查邏輯

#### 2.4.3 guidancePrinciples.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`

**實際結構**（需要讀取檔案確認）：
- 檔案類型：JSON
- 頂層結構：object（dict）
- 可能包含：原則定義、適用條件、決策規則等

#### 2.4.4 guidanceActionTemplates.v1.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidanceActionTemplates.v1.json`

**實際結構**（需要讀取檔案確認）：
- 檔案類型：JSON
- 頂層結構：object（dict）
- 可能包含：行動模板、步驟定義、適用條件等

#### 2.4.5 modifiers.json 結構

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/modifiers.json`

**實際結構**（基於 Phase 2-1 分析）：
- 檔案類型：JSON
- 檔案大小：1,600 bytes
- 頂層結構：object（dict）
- 頂層 keys：`["degree", "frequency", "tone"]`

**語境分析**：
- `context`: `neutral`（邏輯規則，無語境問題）
- `usability`: `medium`
- `conversion_difficulty`: `easy`
- `suggested_use`: "Structure helpers / Vocabulary mapping"

### 2.5 Phase 2-2 和 Phase 2-3 整合結果（完整參考）

#### 2.5.1 Phase 2-2 轉換後的資料結構

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

#### 2.5.2 Phase 2-3 L1-L4 分層架構定義

**L1：Hexagram Visual（卦象視覺層）**
- 功能定位：顯示六十四卦的視覺化，卦象的基本資訊（名稱、結構等）
- 資料來源：`hexagram_deriver.py` + `hexagram_64_full.v1.0.json`
- 資料結構：Runtime Payload（hexagram_id, hexagram_name, upper_trigram, lower_trigram, changing_line）
- 治理說明：L1 不接收 Phase 2-2 靜態資料，嚴禁 AI 解釋或重算卦象

**L2：Root Personalization（本命個人化敘事層）**
- 功能定位：以「本命五行（Root Element）」為核心，提供根本狀態敘事（Opening Statement）
- 資料來源：`root_element_mapper.py` + `domain/narratives/<facet>.narr.v1.0.json` (opening)
- 資料結構：Storage（narratives 檔案中的 opening 欄位）+ Runtime Payload（root_element, band, narrative）
- 治理說明：敘事內容完全來自 Phase 2-2 narratives 檔案，僅允許依 Root Element 與 Band 做語句選擇

**L3：Flow Analysis（當前流動狀態層）**
- 功能定位：結合「當前卦象（Flow Hexagram）」描述目前行運與變化趨勢，使用「解釋文 (Explain)」說明五行生剋機制
- 資料來源：`hexagram_deriver.py` + `domain/narratives/<facet>.narr.v1.0.json` (explain)
- 資料結構：Storage（narratives 檔案中的 explain 欄位）+ Runtime Payload（flow_hexagram_id, band, analysis）
- 治理說明：L2 與 L3 共用 narratives 檔案，差異僅在於取用欄位（Opening vs Explain）

**L4：Risk Blocking & Action Advice（風險阻斷與行動層）**
- 功能定位：唯一允許出現「未改善後果（Risk Chains）」與「行動建議（Recommendations）」的層級
- 資料來源：`score_facet.py` (Risk Level) + `domain/riskchains/<facet>.risk.v1.0.json` + `domain/recommendations/<facet>.reco.v1.0.json`
- 資料結構：Storage（riskchains 和 recommendations 檔案）+ Runtime Payload（risk_level, risk_chains, recommendations）
- 治理說明：嚴禁 AI 新增或刪除任何風險鏈與建議，僅能做語言潤飾，Risk Chain 僅在中高 (Mid/High) 風險等級觸發

### 2.6 設計原則與約束（完整參考）

#### 2.6.1 語境純粹性要求（嚴格遵守）

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

#### 2.6.2 可回滾、不凍結原則

- ✅ **所有資料保持可回滾**：所有提取和生成的資料都可以回滾
- ✅ **不凍結設計**：設計和決策不鎖定，可以根據實作情況調整

#### 2.6.3 以最新版設計為主

- ✅ **以最新版設計為主**：以最新版的網頁設計、UI 設計、風格元素為主
- ✅ **舊資料作為參考**：Legacy 資料作為參考，判斷是否有價值資料可以後續用做討論

---

## 三、任務執行步驟

### 步驟 1：讀取和分析 Legacy 檔案

1. 讀取 `intervention_boundary_matrix.v1.json`
   - 使用 manifest.json 中的路徑讀取檔案
   - 解析 JSON 結構
   - 分析規則邏輯和觸發條件

2. 讀取 `buildGuidance.js`
   - 使用檔案路徑讀取檔案
   - 分析 JavaScript 程式碼結構
   - 提取關鍵函數和決策邏輯

3. 讀取 `guidancePrinciples.v1.json`
   - 使用檔案路徑讀取檔案
   - 解析 JSON 結構
   - 分析原則邏輯和適用條件

4. 讀取 `guidanceActionTemplates.v1.json`
   - 使用檔案路徑讀取檔案
   - 解析 JSON 結構
   - 分析模板邏輯和適用條件

### 步驟 2：提取規則和邏輯

1. **提取 intervention_boundary_matrix 的規則**：
   - 分析每個規則項目的邏輯
   - 識別觸發條件
   - 識別規則的適用範圍和限制
   - 提取規則的核心邏輯

2. **提取 guidancePrinciples 的邏輯**：
   - 分析每個原則的定義
   - 識別原則的適用條件
   - 識別決策規則
   - 提取原則的核心邏輯

3. **分析 buildGuidance.js 的決策邏輯**：
   - 分析決策邏輯的流程
   - 識別關鍵決策點
   - 識別規則應用的邏輯
   - 提取決策邏輯的核心流程

### 步驟 3：轉換和整合規則

1. **將規則轉換為現有系統格式**：
   - 將 Legacy 規則轉換為現有系統可用的格式
   - 確保規則符合現有系統的設計規範
   - 確保規則符合語境純粹性要求

2. **整合規則到 Stage 4 設計規範**：
   - 將規則整合到 L1-L4 分層架構
   - 將規則整合到 AI 敘事生成層的約束
   - 確保規則符合資料流向和系統邊界

3. **建立規則對應關係**：
   - 建立 Legacy 規則 → 現有系統規則的對應關係
   - 建立規則應用的場景和條件
   - 建立規則的優先級和衝突處理

### 步驟 4：建立規則文件

1. **建立呈現規則文件**：
   - 定義規則的結構和格式
   - 記錄所有提取的規則
   - 記錄規則的適用條件和邏輯

2. **建立決策邏輯說明文件**：
   - 說明決策邏輯的流程
   - 說明關鍵決策點
   - 說明規則應用的邏輯

3. **建立規則應用指南**：
   - 說明規則的應用場景
   - 說明規則的使用方法
   - 說明規則的驗證機制

### 步驟 5：驗證和測試

1. 驗證規則符合現有系統規範
2. 驗證規則符合語境純粹性要求
3. 驗證規則的邏輯正確性
4. 驗證規則與 Stage 4 設計要求的對應關係

---

## 四、預期產出

### 4.1 主要產出

1. **呈現規則文件**：
   - 規則的結構定義
   - 所有提取的規則（格式：Markdown 或 JSON）
   - 規則的適用條件和邏輯說明

2. **決策邏輯說明文件**：
   - 決策邏輯流程圖或文字說明
   - 關鍵決策點說明
   - 規則應用邏輯說明

3. **規則應用指南**：
   - 規則的應用場景說明
   - 規則的使用方法說明
   - 規則的驗證機制說明

4. **整合報告**：
   - 提取過程說明
   - 規則轉換記錄
   - 驗證結果

### 4.2 文件格式

所有產出以 Markdown 或 JSON 格式記錄，標記為 WORKING DOCUMENT（不鎖定，可回滾）。

---

## 五、注意事項

### 5.1 原則遵守

- ✅ **可回滾、不凍結**：所有提取和生成的資料都保持可回滾、不凍結狀態
- ✅ **以最新版設計為主**：提取時以最新版的設計需求為主
- ✅ **完整的背景資料**：所有提取都提供完整的背景資料說明

### 5.2 品質要求

- ✅ **語境純粹性**：所有規則必須符合語境純粹性要求（如果規則包含文字說明）
- ✅ **邏輯正確性**：所有規則必須邏輯正確，符合現有系統規範
- ✅ **文本記錄**：所有提取過程都以文本形式記錄

### 5.3 重要提醒

- ⚠️ **所有資料保持不凍結、不鎖定、可回滾**：所有生成的檔案和文件都標記為 WORKING BASELINE，可以隨時修改或回滾
- ⚠️ **文本作為唯一依據**：所有決策和提取都記錄在文本中，以文本為準

---

## 六、參考資料

### 6.1 Phase 2-1 交付成果

- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/manifest.json` - 檔案清單
- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/analysis.json` - 分析報告
- `docs/P0-12_PHASE2-1_RESULT_PRESENTATION_EXTRACTION/artifacts/report.generated.md` - 可讀報告
- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-1_COMPLETION_SUMMARY.md` - Phase 2-1 完成摘要

### 6.2 Phase 2-2 交付成果

- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-2_FINAL_AUDIT_REPORT.md` - Phase 2-2 最終審核報告
- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-2_COMPLETION_SUMMARY.md` - Phase 2-2 完成摘要
- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-2_TASK_REPORT.md` - Phase 2-2 任務報告
- Phase 2-2 轉換後的 JSON 檔案（在交付報告中）

### 6.3 Phase 2-3 交付成果

- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-3_AUDIT_REPORT.md` - Phase 2-3 審核報告
- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-3_ACCEPTED_CONTENT.md` - Phase 2-3 符合要求內容
- Phase 2-3 結案報告（第二個版本，推薦使用）

### 6.4 現有系統設計文件

- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文件（Stage 4 設計規範、AI 敘事生成層約束）
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣系統實現
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

### 6.5 階段一完成文件

- `P0-12_IMPLEMENTATION_SPEC_FINAL.md` - 最終實作規格書
- `P0-12_COMPLETE_BACKGROUND_DATA_PACKAGE.md` - 完整背景資料包
- `P0-12_INTEGRATION_STATUS_AND_NEXT_STEPS.md` - 整合狀態與下一步分析

### 6.6 語境約束資料

- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞列表

---

**任務狀態**：待執行（PENDING）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**重要提醒**：所有資料保持不凍結、不鎖定、可回滾  
**最後更新**：2026-01-12
