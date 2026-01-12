# P0-11 階段四任務包：題目設計與結果呈現對應

**建立日期**：2026-01-11  
**狀態**：READY FOR EXECUTION  
**階段**：階段四（題目設計與結果呈現對應）

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本任務包中的所有設計、規格、決策均為暫時性版本，不得凍結。**

- 所有設計決策均可在後續討論中調整
- 所有規格均可根據實際測試結果修改
- 所有流程均可根據協作經驗優化

**目標**：建立一個**可運作、可測試、可持續調整**的基礎版本，而非完美終版。

---

## 📋 文件導航（快速定位）

- **一、背景資料摘要**：階段一、二、三完成狀態與關鍵決策
- **二、階段四核心任務**：題目設計與結果呈現對應
- **三、執行要求與驗收標準**：品質要求與成功標準

---

## 一、背景資料摘要（避免上下文遺忘）

### 1.1 階段一完成狀態

**✅ 階段一已完成**（2026-01-11）

**交付物**：
1. ✅ `domain/knowledge_base/hexagram_64_full.v1.0.json` - 64 卦基礎知識庫
2. ✅ `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行基礎知識庫
3. ✅ `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦基礎知識庫
4. ✅ `domain/knowledge_base/mapping_tables.v1.0.json` - 基礎對應關係表

**關鍵資料結構**（供階段四參考）：
- 64 卦包含：`id` (0-63), `name` (中英文), `keywords` (中英文), `psychological_mapping`, `risk_level` (0-5)
- 五行包含：`id`, `name` (中英文), `properties` (中英文), `psychological_mapping`, `relationships`
- 對應關係表包含：`hexagram_to_risk`, `risk_to_hexagrams`, `element_to_psychological_state`, `risk_level_definitions`

**詳細報告**：`P0-11_PHASE1_COMPLETION_SUMMARY.md`

### 1.2 階段二完成狀態

**✅ 階段二已完成（條件式完成）**（2026-01-11）

**交付物**：
- ✅ `engine/root_element_mapper.py` - Root Element Mapper
- ✅ `engine/hexagram_deriver.py` - Hexagram Deriver
- ✅ `engine/collision_calculator.py` - Collision Calculator

**關鍵輸出格式**（供階段四參考）：
- Root Element Mapper 輸出：`root_element`, `is_derived`, `name`, `properties`, `psychological_mapping`
- Hexagram Deriver 輸出：`base_hexagram`, `variable_line`, `reading_summary`
- Collision Calculator 輸出：`root`, `target`, `collision_key`, `context` (archetype, flow)

**詳細報告**：`P0-11_PHASE2_CONDITIONAL_ACCEPTANCE.md`

### 1.3 階段三完成狀態

**✅ 階段三已完成**（2026-01-11）

**交付物**：
1. ✅ `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫（CN/EN）
2. ✅ `domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json` - 心理學對應詞彙表（內部使用）
3. ✅ `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範
4. ✅ `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞清單

**關鍵資源**（供階段四參考）：
- 玄學詞彙庫包含：`hexagram_names`, `element_properties`, `state_descriptors`, `narrative_openers`, `advice_markers`
- 呈現用語規範定義：呈現原則、語言組織、禁用詞引用、替代詞彙示例、AI 敘事層約束
- 禁用詞清單包含：`psychological_terms`, `scientific_terms`, `diagnostic_terms`（含替代建議）

**詳細報告**：`P0-11_PHASE3_COMPLETION_SUMMARY.md`

### 1.4 系統設計核心原則（必須遵循）

**核心原則**（來自 `P0-5.5_ELEMENT_SELECTION_DECISION.md` 和 `P0-5.7_DESIGN_DOC_FINAL.md`）：

1. **雙重計算一致性**：
   - 科學計算和玄學計算必須同時進行，結果必須一致
   - 科學結果作為驗證基準，玄學結果作為表層呈現

2. **前端不可外顯規範**：
   - 使用者視角：此系統必須被感知為「完整玄學系統」
   - 禁止事項：不得向使用者揭露心理學名詞、科學引擎、或「其實不是玄學」的說明

3. **AI 敘事層約束**（來自 `P0-5.7_DESIGN_DOC_FINAL.md`）：
   - AI 是「敘事者」，不是「運算者」
   - 禁止 AI 重新解卦、修改風險等級、新增建議
   - 必須遵守「純玄學系統」語境，禁用心理學名詞、科學術語
   - 必須支持 CN/EN 雙語，且像原生語言

4. **語境純粹性要求**：
   - 所有使用者面向的文本必須使用玄學詞彙庫中的詞彙
   - 嚴禁混入心理學名詞、科學術語、診斷用語

5. **「去問卷化」原則**（來自 P0-5）：
   - UI 應該避免傳統問卷元素（滑桿、李克特量表）
   - 採用「儀式性互動」和「單一物件選擇」

---

## 二、階段四核心任務：題目設計與結果呈現對應

### 2.1 任務目標

**本次任務包要達成什麼**：

> 建立題目設計對應指南、結果呈現對應設計，以及 AI 敘事生成對應規範，確保題目設計符合玄學語境，結果呈現符合系統設計，AI 敘事生成符合所有約束條件。

### 2.2 任務重要性

**阻塞關係**：
- **阻塞**：題庫完善（P0-10）、結果呈現頁面設計（P0-13）、AI 整合設計（P0-14）
- **被阻塞**：階段一、階段二、階段三 ← 已全部解除

**理由**：
- 題目設計對應指南是題庫完善的基礎
- 結果呈現對應設計是結果呈現頁面設計的基礎
- AI 敘事生成對應規範是 AI 整合設計的基礎

---

## 三、交付物詳細規格

### 3.1 交付物 1：題目設計對應指南

**目標文件**：`domain/knowledge_base/question_design_guidelines.v1.0.md`（Markdown 格式）

**需要內容**：

1. **玄學語境下的題目設計原則**
   - **「去問卷化」原則**：
     - 避免傳統問卷元素（滑桿、李克特量表、多選題等）
     - 採用「儀式性互動」和「單一物件選擇」
     - 使用玄學詞彙庫中的詞彙
   - **題目語境要求**：
     - 題目文本必須使用玄學詞彙庫中的詞彙
     - 題目文本不得包含心理學名詞、科學術語、診斷用語
     - 題目文本必須符合「純玄學系統」語境
   - **題目結構要求**：
     - 題目應該引導使用者選擇「符號」「元素」「卦象」等玄學物件
     - 題目應該描述「狀態」「趨勢」「關係」等玄學概念

2. **題目與玄學系統的對應**
   - **題目 → 卦象對應**：
     - 題目如何對應到 Stage 1 的八卦選擇
     - 題目如何對應到 Stage 2 的五行選擇
     - 題目如何對應到 Stage 3 的深度剖析（量表權重 → 變爻觸發）
   - **題目 → 科學系統的對應**：
     - 題目如何對應到心理學評估
     - 題目如何對應到風險分析
     - 題目如何對應到分數計算

3. **題目設計指南**
   - **最佳實踐**：
     - 題目設計的範例和模板
     - 題目設計的流程和步驟
     - 題目設計的檢查清單
   - **常見錯誤**：
     - 混入心理學名詞的錯誤範例
     - 混入科學術語的錯誤範例
     - 使用傳統問卷元素的錯誤範例
   - **驗收標準**：
     - 題目是否符合玄學語境
     - 題目是否對應到玄學系統
     - 題目是否對應到科學系統

**建議格式**：Markdown 文件（結構清晰，易於閱讀和維護）

**建議結構**：
```markdown
# 題目設計對應指南 v1.0

## 一、玄學語境下的題目設計原則

### 1.1 「去問卷化」原則
...

### 1.2 題目語境要求
...

### 1.3 題目結構要求
...

## 二、題目與玄學系統的對應

### 2.1 題目 → 卦象對應
...

### 2.2 題目 → 科學系統的對應
...

## 三、題目設計指南

### 3.1 最佳實踐
...

### 3.2 常見錯誤
...

### 3.3 驗收標準
...
```

### 3.2 交付物 2：結果呈現對應設計

**目標文件**：`domain/knowledge_base/result_presentation_design.v1.0.md`（Markdown 格式）

**需要內容**：

1. **結果呈現結構設計**
   - **L1-L4 層級設計**（來自 P0-5.7 設計文檔）：
     - **L1 (Hexagram 視覺顯影)**：卦象的視覺呈現
     - **L2 (Root 個性化錨點)**：Root Element 的個性化敘事
     - **L3 (Flow 局勢分析)**：當前局勢的分析和解釋
     - **L4 (風險阻斷與行動建議)**：風險警告和行動建議
   - **每層級的內容定義**：
     - L1 應包含哪些內容（卦象 ID、卦名、卦象視覺等）
     - L2 應包含哪些內容（Root Element、個性化敘事等）
     - L3 應包含哪些內容（Flow 分析、局勢描述等）
     - L4 應包含哪些內容（風險等級、行動建議等）

2. **結果呈現與玄學系統的對應**
   - **卦象呈現對應**：
     - 如何呈現卦象（使用 `vocabulary_metaphysical.v1.0.json` 中的卦名）
     - 如何呈現卦象的狀態（使用 `state_descriptors`）
     - 如何呈現卦象的建議（使用 `advice_markers`）
   - **五行呈現對應**：
     - 如何呈現 Root Element（使用 `vocabulary_metaphysical.v1.0.json` 中的元素屬性）
     - 如何呈現 Collision（使用 `collision_key` 和玄學詞彙庫）
   - **風險等級呈現對應**：
     - 如何呈現風險等級（使用 `mapping_tables.v1.0.json` 中的 `risk_level_definitions`）
     - 如何根據風險等級選擇語氣（使用 `advice_markers` 中的 caution 類別）

3. **結果呈現與科學系統的對應**
   - **風險等級一致性**：
     - 如何確保玄學呈現的風險等級與科學計算的風險等級一致
     - 如何使用對應關係表進行驗證
   - **建議一致性**：
     - 如何確保玄學建議與科學建議一致
     - 如何將科學建議轉換為玄學建議

**建議格式**：Markdown 文件（結構清晰，易於閱讀和維護）

**建議結構**：
```markdown
# 結果呈現對應設計 v1.0

## 一、結果呈現結構設計

### 1.1 L1-L4 層級設計
...

### 1.2 每層級的內容定義
...

## 二、結果呈現與玄學系統的對應

### 2.1 卦象呈現對應
...

### 2.2 五行呈現對應
...

### 2.3 風險等級呈現對應
...

## 三、結果呈現與科學系統的對應

### 3.1 風險等級一致性
...

### 3.2 建議一致性
...
```

### 3.3 交付物 3：AI 敘事生成對應規範

**目標文件**：`domain/knowledge_base/ai_narrative_spec.v1.0.md`（Markdown 格式）

**需要內容**：

1. **AI 角色定位與資料流向**
   - **角色定位**：
     - AI 是「敘事者」，不是「運算者」
     - AI 的任務是將結構化數據轉譯為玄學敘事
   - **資料流向**：
     - 本機運算鎖定結果（`Risk_Level`, `Hexagram_ID`, `Changing_Line`, `Action_Points`）
     - 封裝為 JSON Context
     - 傳送至 AI 模型
     - 生成完整報告

2. **嚴格約束（必須遵守）**
   - **禁止 AI 重新解卦**：
     - AI 不得自行根據卦象 ID 進行網路搜索或自由聯想
     - AI 必須依據 Payload 中提供的數據進行擴寫
     - AI 必須使用 Payload 中的 `Hexagram_ID`、`Changing_Line` 等鎖定數據
   - **禁止 AI 修改風險等級**：
     - AI 不得降低或提升本機計算的風險等級
     - AI 必須維持本機計算的風險等級，並以對應的語氣進行敘事
   - **禁止 AI 新增建議**：
     - AI 僅能潤飾本機提供的 `Action_Points`，不得無中生有
     - AI 不得新增本機計算結果中不存在的建議或行動方案
   - **必須遵守玄學語境規則**：
     - AI 生成的文本必須保持「純玄學系統」的語境
     - 必須使用玄學詞彙庫（`vocabulary_metaphysical.v1.0.json`）中的詞彙
     - 必須遵守禁用詞清單（`forbidden_terms.v1.0.json`）
     - 必須遵循呈現用語規範（`presentation_guidelines.v1.0.md`）
   - **必須遵守雙語規則**：
     - AI 生成必須支持 CN/EN 雙語
     - 中文版本必須像原生中文玄學系統
     - 英文版本必須像原生英文玄學產品

3. **Prompt 規範**
   - **角色定義**：
     - AI 是「玄學敘事者」，不是運算者
     - AI 的任務是將結構化數據轉譯為玄學敘事
   - **數據約束**：
     - 必須明確告知 AI 只能使用 Payload 中的數據
     - 必須明確告知 AI 不得重新計算或修改風險等級
   - **語境約束**：
     - 必須明確告知 AI 保持「純玄學系統」語境
     - 必須明確列出禁用詞（引用 `forbidden_terms.v1.0.json`）
     - 必須明確說明替代詞彙（引用 `presentation_guidelines.v1.0.md`）
   - **輸出格式**：
     - 必須明確定義輸出格式（L1-L4 分層結構）
     - 必須明確定義語言（CN/EN）
     - 必須明確定義使用詞彙庫（`vocabulary_metaphysical.v1.0.json`）

4. **驗證機制**
   - **自動驗證**：
     - 檢查 AI 輸出是否包含禁用詞（使用 `forbidden_terms.v1.0.json`）
     - 檢查 AI 輸出是否與本機計算的風險等級一致
     - 檢查 AI 輸出是否使用了 Payload 中提供的數據
   - **人工審核**（必要時）：
     - 對於高風險案例，必須進行人工審核
     - 審核重點：風險等級一致性、語境正確性、建議有效性

**建議格式**：Markdown 文件（結構清晰，易於閱讀和維護）

**建議結構**：
```markdown
# AI 敘事生成對應規範 v1.0

## 一、AI 角色定位與資料流向

### 1.1 角色定位
...

### 1.2 資料流向
...

## 二、嚴格約束（必須遵守）

### 2.1 禁止 AI 重新解卦
...

### 2.2 禁止 AI 修改風險等級
...

### 2.3 禁止 AI 新增建議
...

### 2.4 必須遵守玄學語境規則
...

### 2.5 必須遵守雙語規則
...

## 三、Prompt 規範

### 3.1 角色定義
...

### 3.2 數據約束
...

### 3.3 語境約束
...

### 3.4 輸出格式
...

## 四、驗證機制

### 4.1 自動驗證
...

### 4.2 人工審核
...
```

---

## 四、參考資料（完整路徑）

### 4.1 階段一、二、三交付物

**階段一知識庫**：
- `domain/knowledge_base/hexagram_64_full.v1.0.json` - 64 卦基礎知識庫
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行基礎知識庫
- `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦基礎知識庫
- `domain/knowledge_base/mapping_tables.v1.0.json` - 基礎對應關係表

**階段二運算引擎**：
- `engine/root_element_mapper.py` - Root Element Mapper
- `engine/hexagram_deriver.py` - Hexagram Deriver
- `engine/collision_calculator.py` - Collision Calculator

**階段三詞彙庫**：
- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫（CN/EN）
- `domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json` - 心理學對應詞彙表（內部使用）
- `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞清單

### 4.2 系統設計文件

- `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md` - 易經矩陣系統決策
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文檔（包含 AI 敘事層約束、L1-L4 層級設計）
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

### 4.3 階段一、二、三報告

- `P0-11_METAPHYSICAL_ENGINE_COMPLETION/P0-11_PHASE1_COMPLETION_SUMMARY.md` - 階段一完成摘要
- `P0-11_METAPHYSICAL_ENGINE_COMPLETION/P0-11_PHASE2_CONDITIONAL_ACCEPTANCE.md` - 階段二條件式通過確認
- `P0-11_METAPHYSICAL_ENGINE_COMPLETION/P0-11_PHASE3_COMPLETION_SUMMARY.md` - 階段三完成摘要

### 4.4 現有題目資料（參考）

- `domain/facets/income_expansion_pressure/` - 現有 Facet 資料（可參考題目結構）
- `domain/compiled/` - 已編譯的 Facet 資料（可參考題目結構）

---

## 五、執行要求

### 5.1 格式要求

- ✅ Markdown 格式（所有三個交付物）
- ✅ UTF-8 編碼
- ✅ 結構清晰、易於閱讀和維護
- ✅ 包含完整的參考資料引用（完整路徑）

### 5.2 品質要求

- ✅ **內容完整**：覆蓋所有必要的設計原則、對應關係、規範和機制
- ✅ **一致性**：與階段一、二、三交付物一致
- ✅ **符合系統設計**：符合 P0-5.7 設計文檔的要求
- ✅ **可操作性**：提供具體的指南、範例和檢查清單

### 5.3 驗收標準

**功能驗收**：
- [ ] 題目設計對應指南完整且清晰（包含原則、對應關係、指南）
- [ ] 結果呈現對應設計完整且清晰（包含結構設計、對應關係）
- [ ] AI 敘事生成對應規範完整且清晰（包含角色定位、嚴格約束、Prompt 規範、驗證機制）

**一致性驗收**：
- [ ] 所有設計與階段一、二、三交付物一致
- [ ] 所有設計與系統設計文檔一致

**整合驗收**：
- [ ] 題目設計對應指南可被題庫完善（P0-10）使用
- [ ] 結果呈現對應設計可被結果呈現頁面設計（P0-13）使用
- [ ] AI 敘事生成對應規範可被 AI 整合設計（P0-14）使用

---

## 六、執行建議

### 6.1 執行順序

建議按以下順序執行：
1. **第一步**：建立 AI 敘事生成對應規範（因為它相對獨立，且約束最明確）
2. **第二步**：建立結果呈現對應設計（因為它依賴階段一、二、三的交付物）
3. **第三步**：建立題目設計對應指南（因為它需要參考結果呈現設計）

### 6.2 資料來源策略

**從階段一、二、三交付物提取**：
- 從階段一知識庫提取對應關係（卦象、五行、風險等級）
- 從階段二運算引擎提取輸出格式（Root Element, Hexagram, Collision）
- 從階段三詞彙庫提取詞彙和規範（玄學詞彙、呈現規範、禁用詞）

**從系統設計文件提取**：
- 從 `P0-5.7_DESIGN_DOC_FINAL.md` 提取 AI 敘事層約束和 L1-L4 層級設計
- 從 `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` 提取設計原則

**參考現有資料**：
- 從 `domain/facets/income_expansion_pressure/` 參考現有題目結構
- 從 `domain/compiled/` 參考已編譯的資料結構

---

## 七、成功標準

### 7.1 功能完整性

- [ ] 題目設計對應指南完整（包含原則、對應關係、指南）
- [ ] 結果呈現對應設計完整（包含結構設計、對應關係）
- [ ] AI 敘事生成對應規範完整（包含角色定位、嚴格約束、Prompt 規範、驗證機制）

### 7.2 一致性

- [ ] 所有設計與階段一、二、三交付物一致
- [ ] 所有設計與系統設計文檔一致

### 7.3 整合性

- [ ] 題目設計對應指南可被題庫完善使用
- [ ] 結果呈現對應設計可被結果呈現頁面設計使用
- [ ] AI 敘事生成對應規範可被 AI 整合設計使用

---

## 八、交付物清單

1. ⏳ `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計對應指南
2. ⏳ `domain/knowledge_base/result_presentation_design.v1.0.md` - 結果呈現對應設計
3. ⏳ `domain/knowledge_base/ai_narrative_spec.v1.0.md` - AI 敘事生成對應規範

---

**任務狀態**：READY FOR EXECUTION  
**建立日期**：2026-01-11
