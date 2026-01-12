# P0-12 整合狀態檢查與下一步分析

**建立日期**：2026-01-11  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、任務目的回顧

### 1.1 P0-12 任務主要目的

整合所有資料中有關於現代科學（心理學、人類學、社會學等）的：
1. **背景資料**：學科理論、研究資料
2. **學科資料**：相關知識庫、文獻
3. **題型設計**：問題設計、選項設計
4. **分數計算**：計算邏輯、權重設定、分數轉換

### 1.2 已完成的工作

根據 `P0-12_IMPLEMENTATION_SPEC_FINAL.md`，已完成：

1. ✅ **JSON 結構定義**：符合現有系統 schema 的完整結構
2. ✅ **欄位對應表**：Legacy → 現有系統的完整映射
3. ✅ **buildGuidance.js 整合方案**：結果呈現邏輯的整合方向
4. ✅ **Metadata 處理方案**：分離策略
5. ✅ **Python 計算核心**：Layer A 的參考實現

---

## 二、當前整合狀態檢查

### 2.1 已整合的內容

#### 2.1.1 題目設計
- ✅ Legacy 題目結構已分析
- ✅ 轉換規則已定義
- ✅ 符合現有系統的 questions 結構已確定

#### 2.1.2 分數計算
- ✅ Legacy scorer.js 邏輯已分析
- ✅ Layer A 計算邏輯已定義（Python 參考實現）
- ✅ Layer B 計算邏輯已確認（現有系統 weighted_sum）
- ✅ 一致性原則已確立

#### 2.1.3 結果呈現（部分）
- ✅ buildGuidance.js 邏輯已分析
- ✅ 整合方案已提出（byTheme 優先、fallback 機制）
- ✅ 結構對應已定義（interventions → recommendations, chains → riskchains）

### 2.2 尚未完全整合的內容

#### 2.2.1 結果呈現的詳細內容
- ⚠️ **結果模板檔案**：Legacy 的 resultTemplates 資料夾內容尚未完整提取
- ⚠️ **呈現規則**：Legacy 的呈現規則、制度、依據尚未完整分析
- ⚠️ **呈現方式**：Legacy 的具體呈現方式（UI/UX）尚未完整對應到現有系統

---

## 三、Legacy 結果呈現相關資料盤點

### 3.1 已知的 Legacy 結果呈現資料

根據之前的分析，Legacy 系統包含以下結果呈現相關資料：

#### 3.1.1 Guidance 系統
**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/`

- `buildGuidance.js` (12KB) - 結果生成邏輯
- `interventions.json` - 介入建議資料庫
- `chains.json` - 風險鏈資料庫
- `guidancePrinciples.v1.json` - 指導原則
- `guidanceActionTemplates.v1.json` - 行動模板
- `resultLexicon.v1.json` - 結果詞彙庫

#### 3.1.2 Result Templates 系統
**位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`

- `anchor_statements.v1.json` (50KB) - 錨定語句模板
- `intervention_boundary_matrix.v1.json` - 介入邊界矩陣
- `consequence_chain_library.v1.json` - 後果鏈庫
- `readingOutputV2.js` - 結果輸出模板
- 其他相關檔案

### 3.2 現有系統的結果呈現需求

根據設計文件（P0-5.7、P0-5.6 等），現有系統需要：

#### 3.2.1 4 階段 UI 流程
- **Stage 1（The Wheel）**：先天八卦盤（Facet Triage）
- **Stage 2（Radial Compass）**：五行羅盤（Symbol Selection）
- **Stage 3（Projection）**：鑄爻（Deep Profiling）
- **Stage 4（Results）**：卦象顯影（Hexagram Manifestation）

#### 3.2.2 Stage 4 結果呈現分層（L1-L4）
- **L1（Hexagram Visual）**：卦象視覺呈現
- **L2（Root Personalization）**：本命元素個人化敘事
- **L3（Flow Analysis）**：當前狀態分析
- **L4（Risk Blocking & Action Advice）**：風險阻斷與行動建議

#### 3.2.3 現有系統的結果資料結構
- `narratives.v1.0.json` - 敘事資料（opening, explain）
- `recommendations.v1.0.json` - 建議資料（id, title, steps）
- `riskchains.v1.0.json` - 風險鏈資料（if_not_improve）

---

## 四、進一步提取與整合的可行性分析

### 4.1 可提取的內容

#### 4.1.1 結果模板內容
- ✅ **anchor_statements.v1.json**：可以提取錨定語句模板，轉換為 narratives 的 opening
- ✅ **intervention_boundary_matrix.v1.json**：可以提取介入邊界規則，用於風險判斷
- ✅ **consequence_chain_library.v1.json**：可以提取後果鏈內容，轉換為 riskchains
- ✅ **readingOutputV2.js**：可以分析輸出模板邏輯，理解呈現方式

#### 4.1.2 呈現規則和制度
- ✅ **guidancePrinciples.v1.json**：可以提取指導原則，用於建議生成邏輯
- ✅ **guidanceActionTemplates.v1.json**：可以提取行動模板，轉換為 recommendations 的 steps
- ✅ **resultLexicon.v1.json**：可以提取詞彙庫，用於語境轉換

#### 4.1.3 呈現方式
- ✅ **buildGuidance.js**：已分析，可以進一步提取具體的呈現邏輯
- ⚠️ **UI/UX 相關**：需要檢查是否有相關的 UI 元件或樣式定義

### 4.2 整合挑戰

#### 4.2.1 語境轉換
- Legacy 系統使用心理學語境
- 現有系統要求玄學語境
- 需要進行語境轉換（使用 vocabulary_metaphysical.v1.0.json 和 forbidden_terms.v1.0.json）

#### 4.2.2 結構差異
- Legacy 系統：動態生成（buildGuidance.js）
- 現有系統：靜態 JSON 結構
- 需要將動態邏輯轉換為靜態資料結構

#### 4.2.3 分層架構差異
- Legacy 系統：單一結果物件
- 現有系統：L1-L4 分層架構
- 需要將 Legacy 內容映射到 L1-L4 架構

---

## 五、提取與整合方案建議

### 5.1 階段性整合策略

#### 階段一：資料提取與分析（優先級：高）
**目標**：完整提取 Legacy 結果呈現相關資料

**任務**：
1. 提取 `resultTemplates/` 資料夾中的所有 JSON 檔案
2. 分析每個檔案的結構和內容
3. 識別可用的模板、規則、制度
4. 建立資料清單

**產出**：
- Legacy 結果呈現資料清單
- 結構分析報告
- 可用性評估

#### 階段二：內容映射與轉換（優先級：高）
**目標**：將 Legacy 內容映射到現有系統結構

**任務**：
1. 建立 Legacy → 現有系統的映射表
   - anchor_statements → narratives.opening
   - intervention_boundary_matrix → riskchains（風險判斷規則）
   - consequence_chain_library → riskchains.if_not_improve
   - guidancePrinciples → recommendations.title（原則融合）
   - guidanceActionTemplates → recommendations.steps
2. 進行語境轉換（心理學 → 玄學）
3. 進行結構轉換（動態 → 靜態）

**產出**：
- 內容映射表
- 轉換規則文件
- 轉換後的資料範例

#### 階段三：分層架構整合（優先級：中）
**目標**：將 Legacy 內容整合到 L1-L4 分層架構

**任務**：
1. 分析 L1-L4 各層的需求
2. 將 Legacy 內容分配到各層
   - L1：Hexagram Visual（可能需要新增）
   - L2：Root Personalization（使用 narratives + Root Element）
   - L3：Flow Analysis（使用 narratives + Flow Hexagram）
   - L4：Risk Blocking & Action Advice（使用 recommendations + riskchains）
3. 設計各層的資料結構

**產出**：
- L1-L4 資料結構定義
- 各層內容分配表
- 整合後的資料範例

#### 階段四：規則與制度提取（優先級：中）
**目標**：提取呈現規則、制度、依據

**任務**：
1. 分析 intervention_boundary_matrix 的規則
2. 提取 guidancePrinciples 的邏輯
3. 分析 buildGuidance.js 的決策邏輯
4. 建立呈現規則文件

**產出**：
- 呈現規則文件
- 決策邏輯說明
- 規則應用指南

### 5.2 具體執行建議

#### 5.2.1 立即執行（高優先級）

1. **建立資料提取任務包**：
   - 目標：完整提取 `resultTemplates/` 資料夾內容
   - 產出：Legacy 結果呈現資料清單和分析報告

2. **建立內容映射任務包**：
   - 目標：將 Legacy 內容映射到現有系統結構
   - 產出：映射表和轉換規則

#### 5.2.2 後續執行（中優先級）

3. **建立分層整合任務包**：
   - 目標：整合到 L1-L4 架構
   - 產出：各層資料結構定義

4. **建立規則提取任務包**：
   - 目標：提取呈現規則和制度
   - 產出：規則文件和應用指南

---

## 六、分析結果總結

### 6.1 當前狀態

✅ **已完成**：
- 題目設計整合方案
- 分數計算整合方案
- 結果呈現整合方向（高層次）

⚠️ **部分完成**：
- 結果呈現的詳細內容提取（buildGuidance.js 已分析，但 resultTemplates 尚未完整提取）

❌ **尚未開始**：
- 結果模板檔案的完整提取
- 呈現規則、制度、依據的提取
- 分層架構（L1-L4）的詳細整合

### 6.2 建議

**建議執行進一步的提取與整合**，原因：

1. **價值高**：Legacy 的結果呈現資料豐富，包含大量可用的模板、規則、制度
2. **需求明確**：現有系統的 L1-L4 分層架構需要豐富的內容支持
3. **技術可行**：雖然有語境轉換和結構轉換的挑戰，但都有明確的解決方案
4. **完成度提升**：完整的結果呈現整合可以大幅提升系統的完整性

### 6.3 執行順序建議

1. **階段一：資料提取與分析**（立即執行）
   - 建立任務包，完整提取 resultTemplates 資料夾內容
   - 分析每個檔案的結構和內容

2. **階段二：內容映射與轉換**（階段一完成後）
   - 建立映射表和轉換規則
   - 進行語境轉換

3. **階段三和四：分層整合與規則提取**（階段二完成後）
   - 整合到 L1-L4 架構
   - 提取規則和制度

---

**狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-11
