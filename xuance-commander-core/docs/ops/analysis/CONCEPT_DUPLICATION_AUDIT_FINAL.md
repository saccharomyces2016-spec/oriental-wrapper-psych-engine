# 概念重複與分散情況全面審計 - 最終報告

**建立日期**：2026-01-12  
**狀態**：✅ COMPLETE  
**執行者**：共同專案開發人 & 合夥人

---

## 📊 執行摘要

### 審計範圍
- 從根目錄開始，搜尋所有檔案
- 盤點制度、題目設計、分數計算、引擎規格等概念的分散情況
- 識別重複檔案和分散的概念

### 核心發現

1. **制度/規則分散**：478 個檔案提到制度/規則，93 個檔案在 governance 資料夾
2. **題目設計重複**：`question_design_guidelines.v1.0.md` 出現在 2 個位置（已處理）
3. **分數計算分散**：247 個檔案提到計算/分數，但已有明確的 SSOT
4. **引擎規格分散**：257 個檔案提到引擎，14 個引擎規格檔案，但已有明確的 SSOT

---

## 🔍 詳細發現

### 1. 制度/規則相關

#### 統計
- **總檔案數**：478 個檔案提到制度/規則
- **governance 資料夾**：93 個檔案
- **其他位置**：385 個檔案（分散在任務資料夾、領域文件等）

#### 主要位置
- ✅ **`docs/governance/`** ⭐ **SSOT** - 主要治理文件位置（93 個檔案）
- ✅ **`archive/governance_duplicates/`** - 重複的治理規則（6 個檔案，已歸檔）
- ⚠️ **`docs/domain/advisory/`** - 領域特定規則（多個檔案）
- ⚠️ **`archive/tasks_by_category/engine/tasks/`** - 任務相關規則（多個檔案）

#### 建議
- ✅ 已有 SSOT：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
- ✅ 重複檔案已歸檔：`archive/governance_duplicates/`
- 💡 建議：領域特定規則可考慮整理到 `docs/domain/governance/`

---

### 2. 題目設計相關

#### 統計
- **總檔案數**：316 個檔案提到題目
- **包含 "question design"**：7 個檔案

#### 重複檔案（已處理）
1. ✅ **`domain/knowledge_base/question_design_guidelines.v1.0.md`** ⭐ **SSOT**
   - 位置：核心資料位置
   - 狀態：ACTIVE
   - 行數：102 行

2. ✅ **`specs/domain/questions/question_design_guidelines.v1.0.md`** ✅ **已刪除（2026-01-12）**
   - 位置：規格文件位置
   - 狀態：已刪除（內容與 SSOT 相同）
   - 處理：已建立 `specs/domain/questions/README.md` 說明 SSOT 位置

#### 其他相關檔案
- `docs/domain/design/QUESTION_STRATEGY_NOTES.md` - 題目策略筆記
- `docs/domain/design/P0-5_QUESTION_MODALITY_EXTENSIBILITY.md` - 題目模態擴展性
- `docs/governance/QUESTION_FLOW_DESIGN_PRIORITY_ANALYSIS.md` - 題目流程設計優先級分析
- `docs/governance/QUESTION_QUALITY_ACCEPTANCE_RULE.md` - 題目品質驗收規則

#### 處理結果
- ✅ 已確認兩個檔案內容相同（102 行）
- ✅ 已刪除 `specs/domain/questions/question_design_guidelines.v1.0.md`
- ✅ 已建立 `specs/domain/questions/README.md` 說明 SSOT 位置

---

### 3. 分數計算相關

#### 統計
- **總檔案數**：247 個檔案提到計算/分數

#### 主要位置
1. ✅ **`domain/facets/*.scoring.v1.0.json`** ⭐ **SSOT** - 各 Facet 的分數計算定義
   - 例如：`domain/facets/stress_recovery.scoring.v1.0.json`
   - 格式：JSON，定義 model, inputs, bands

2. ✅ **`engine/score_facet.py`** ⭐ **SSOT** - 分數計算實作
   - Python 實作：weighted_sum 模型
   - 邏輯：weighted_sum，支援 higher_is_worse 和 higher_is_worse_reversed

3. **`domain/compiled/*.compiled.json`** - 編譯後的資料（包含 scoring）

#### 分散情況
- 分數計算邏輯分散在：
  - `domain/facets/` - 各 Facet 的 scoring JSON（10 個檔案）
  - `engine/score_facet.py` - 計算實作（1 個檔案）
  - `domain/compiled/` - 編譯後的資料（2 個檔案）
  - `archive/tasks_by_category/engine/tasks/` - 任務相關文件

#### 建議
- ✅ 已有明確的 SSOT：
  - 分數計算定義：`domain/facets/*.scoring.v1.0.json`
  - 分數計算實作：`engine/score_facet.py`
- 💡 建議：在 `specs/engine/core/` 建立 `SCORING_LOGIC_SPEC.md` 作為規格說明文件

---

### 4. 引擎規格相關

#### 統計
- **總檔案數**：257 個檔案提到引擎
- **引擎規格檔案**：14 個檔案

#### 主要位置
1. ✅ **`specs/engine/`** ⭐ **SSOT** - 引擎規格文件
   - `specs/engine/metaphysical/` - 玄學引擎規格
   - `specs/engine/metaphysical/hexagram/` - 易經矩陣規格

2. ✅ **`engine/`** ⭐ **SSOT** - 引擎程式碼
   - `engine/score_facet.py` - 分數計算實作
   - `engine/compile_domain.py` - 編譯實作

3. **`archive/tasks_by_category/engine/tasks/`** - 引擎任務資料夾
   - `P0-11_METAPHYSICAL_ENGINE_COMPLETION/` - 玄學引擎完成任務
   - `P0-12_SCIENTIFIC_ENGINE_COMPLETION/` - 科學引擎完成任務
   - `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣實作任務

#### 分散情況
- 引擎規格分散在 `specs/engine/` 和任務資料夾中
- 引擎實作在 `engine/` 資料夾
- 引擎任務報告在 `archive/tasks_by_category/engine/`

#### 建議
- ✅ 已有明確的 SSOT：
  - 引擎規格：`specs/engine/`
  - 引擎實作：`engine/`
  - 引擎任務報告：`archive/tasks_by_category/engine/TASK_REPORTS.md`
- 💡 建議：在 `specs/engine/` 建立 `README.md` 或 `INDEX.md` 作為索引

---

## 📝 已執行的處理

### 1. 處理重複的題目設計指南 ✅
- **行動**：確認 `specs/domain/questions/question_design_guidelines.v1.0.md` 與 `domain/knowledge_base/question_design_guidelines.v1.0.md` 相同
- **結果**：兩個檔案內容相同（102 行）
- **處理**：
  - ✅ 已刪除 `specs/domain/questions/question_design_guidelines.v1.0.md`
  - ✅ 已建立 `specs/domain/questions/README.md` 說明 SSOT 位置

---

## 🎯 建立的指引檔案

### 1. 檔案放置與查找指引 ⭐ SSOT
- **位置**：`docs/FILE_PLACEMENT_AND_SEARCH_GUIDE.md`
- **內容**：
  - 從零開始的查找流程
  - 檔案寫入指引
  - 查找特定概念的快速指南
  - SSOT 總覽
  - 實際應用範例

### 2. 概念重複審計報告
- **位置**：`docs/ops/analysis/CONCEPT_DUPLICATION_AUDIT.md`
- **內容**：
  - 概念分散情況分析
  - 重複檔案清單
  - 檔案放置指引
  - 從零開始的查找指引
  - 建議的整合行動

---

## ✅ 最終結論

### 發現的問題
1. ✅ **題目設計指南重複**：2 個位置（已處理）
2. ✅ **制度檔案分散**：多個位置（但已有 SSOT）
3. ✅ **分數計算分散**：多個位置（但已有 SSOT）
4. ✅ **引擎規格分散**：多個位置（但已有 SSOT）

### 處理結果
1. ✅ 已刪除重複的題目設計指南檔案
2. ✅ 已建立檔案放置與查找指引（SSOT）
3. ✅ 已建立概念重複審計報告

### 建議的後續行動
1. 💡 建立分數計算規格文件：`specs/engine/core/SCORING_LOGIC_SPEC.md`
2. 💡 建立引擎規格索引：`specs/engine/README.md`
3. 💡 建立概念總索引：`docs/CONCEPT_INDEX.md`

---

**最後更新**：2026-01-12  
**狀態**：✅ COMPLETE
