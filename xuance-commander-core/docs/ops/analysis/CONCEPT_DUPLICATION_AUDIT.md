# 概念重複與分散情況全面審計報告

**建立日期**：2026-01-12  
**目的**：盤點所有重複和分散的概念，建立統一的檔案放置指引  
**狀態**：COMPLETE

---

## 📊 執行摘要

### 核心發現

1. **制度/規則分散**：478 個檔案提到制度/規則，93 個檔案在 governance 資料夾
2. **題目設計重複**：`question_design_guidelines.v1.0.md` 出現在 2 個位置
3. **分數計算分散**：247 個檔案提到計算/分數，分散在多個資料夾
4. **引擎規格分散**：257 個檔案提到引擎，14 個引擎規格檔案分散在不同位置

---

## 🔍 第一部分：概念分散情況分析

### 1.1 制度/規則相關（478 個檔案）

#### 主要位置
- **`docs/governance/`** ⭐ **SSOT** - 主要治理文件位置（93 個檔案）
- **`archive/governance_duplicates/`** - 重複的治理規則（6 個檔案，已歸檔）
- **`docs/domain/advisory/`** - 領域特定規則（多個檔案）
- **`archive/tasks_by_category/engine/tasks/`** - 任務相關規則（多個檔案）

#### 重複檔案
- `archive/governance_duplicates/FILE_ORGANIZATION_GUIDE.md` - 已歸檔
- `archive/governance_duplicates/FILE_WRITE_LOCATION_RULE.md` - 已歸檔
- `archive/governance_duplicates/FOLDER_ORGANIZATION_RULE.md` - 已歸檔
- `archive/governance_duplicates/FOLDER_STRUCTURE_HEALTH_ANALYSIS.md` - 已歸檔
- `archive/governance_duplicates/FOLDER_STRUCTURE_INTEGRATION_GUIDE.md` - 已歸檔
- `archive/governance_duplicates/GLOBAL_FILE_CANON.md` - 已歸檔

**SSOT**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md` ⭐

#### 分散情況
- 領域特定規則分散在 `docs/domain/advisory/` 和任務資料夾中
- 建議：統一放在 `docs/governance/`，領域特定規則放在 `docs/domain/governance/`

---

### 1.2 題目設計相關（316 個檔案提到，7 個檔案包含 "question design"）

#### 重複檔案（已處理）
1. **`domain/knowledge_base/question_design_guidelines.v1.0.md`** ⭐ **SSOT**
   - 位置：核心資料位置
   - 狀態：ACTIVE

2. **`specs/domain/questions/question_design_guidelines.v1.0.md`** ✅ **已刪除（2026-01-12）**
   - 位置：規格文件位置
   - 狀態：已刪除（內容與 SSOT 相同，102 行）
   - 處理：已建立 `specs/domain/questions/README.md` 說明 SSOT 位置

#### 其他相關檔案
- `docs/domain/design/QUESTION_STRATEGY_NOTES.md` - 題目策略筆記
- `docs/domain/design/P0-5_QUESTION_MODALITY_EXTENSIBILITY.md` - 題目模態擴展性
- `docs/governance/QUESTION_FLOW_DESIGN_PRIORITY_ANALYSIS.md` - 題目流程設計優先級分析
- `docs/governance/QUESTION_QUALITY_ACCEPTANCE_RULE.md` - 題目品質驗收規則

#### 建議
- **SSOT**：`domain/knowledge_base/question_design_guidelines.v1.0.md`
- **規格副本**：`specs/domain/questions/question_design_guidelines.v1.0.md` 應建立符號連結或刪除

---

### 1.3 分數計算相關（247 個檔案提到）

#### 主要位置
1. **`domain/facets/*.scoring.v1.0.json`** ⭐ **SSOT** - 各 Facet 的分數計算定義
   - 例如：`domain/facets/stress_recovery.scoring.v1.0.json`
   - 格式：JSON，定義 model, inputs, bands

2. **`engine/score_facet.py`** ⭐ **SSOT** - 分數計算實作
   - Python 實作：weighted_sum 模型

3. **`domain/compiled/*.compiled.json`** - 編譯後的資料（包含 scoring）

#### 分散情況
- 分數計算邏輯分散在：
  - `domain/facets/` - 各 Facet 的 scoring JSON
  - `engine/score_facet.py` - 計算實作
  - `domain/compiled/` - 編譯後的資料
  - `archive/tasks_by_category/engine/tasks/` - 任務相關文件

#### 建議
- **SSOT**：
  - 分數計算定義：`domain/facets/*.scoring.v1.0.json`
  - 分數計算實作：`engine/score_facet.py`
- **規格文件**：應在 `specs/engine/core/` 建立分數計算規格文件

---

### 1.4 引擎規格相關（257 個檔案提到，14 個引擎規格檔案）

#### 主要位置
1. **`specs/engine/`** ⭐ **SSOT** - 引擎規格文件
   - `specs/engine/metaphysical/` - 玄學引擎規格
   - `specs/engine/metaphysical/hexagram/` - 易經矩陣規格

2. **`archive/tasks_by_category/engine/tasks/`** - 引擎任務資料夾
   - `P0-11_METAPHYSICAL_ENGINE_COMPLETION/` - 玄學引擎完成任務
   - `P0-12_SCIENTIFIC_ENGINE_COMPLETION/` - 科學引擎完成任務
   - `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣實作任務

3. **`engine/`** - 引擎程式碼
   - `engine/score_facet.py` - 分數計算實作
   - `engine/compile_domain.py` - 編譯實作

#### 分散情況
- 引擎規格分散在 `specs/engine/` 和任務資料夾中
- 引擎實作在 `engine/` 資料夾
- 引擎任務報告在 `archive/tasks_by_category/engine/`

#### 建議
- **SSOT**：
  - 引擎規格：`specs/engine/`
  - 引擎實作：`engine/`
  - 引擎任務報告：`archive/tasks_by_category/engine/TASK_REPORTS.md`

---

## 📋 第二部分：重複檔案清單

### 2.1 確認重複的檔案

#### 題目設計指南
- ✅ `domain/knowledge_base/question_design_guidelines.v1.0.md` ⭐ **SSOT**
- ⚠️ `specs/domain/questions/question_design_guidelines.v1.0.md` - **重複，應刪除或建立符號連結**

#### 治理規則（已歸檔）
- ✅ `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md` ⭐ **SSOT**
- ✅ `archive/governance_duplicates/` - 已歸檔的重複規則（6 個檔案）

---

## 🎯 第三部分：檔案放置指引（從零開始的思考邏輯）

### 3.1 思考邏輯流程圖

```
開始寫檔案
    ↓
這是什麼類型的檔案？
    ↓
┌─────────────────────────────────────┐
│ 1. 治理文件（規則、制度、協議）      │
│    → docs/governance/               │
│    → 查閱 CURSOR_FILE_PLACEMENT_RULE │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 2. 專案核心資料（憲章、路線圖）     │
│    → charter/（憲章）                │
│    → roadmap/（路線圖）              │
│    → memory/（專案記憶）             │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 3. 規格文件（設計規格）              │
│    → specs/ui/（UI 規格）            │
│    → specs/engine/（引擎規格）       │
│    → specs/domain/（Domain 規格）    │
│    → specs/integration/（整合規格）  │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 4. Domain 資料（JSON 資料）          │
│    → domain/knowledge_base/（知識庫）│
│    → domain/facets/（Facet 資料）    │
│    → domain/questions/（題目資料）   │
│    → domain/manifests/（清單）       │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 5. 任務相關（任務包、報告）          │
│    → docs/task_packets/（任務包）    │
│    → archive/tasks_by_category/（歸檔）│
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 6. 運營記錄（狀態、報告、分析）      │
│    → docs/ops/TASK_STATUS.md（狀態）│
│    → docs/ops/reports/（報告）       │
│    → docs/ops/analysis/（分析）     │
└─────────────────────────────────────┘
```

### 3.2 具體檔案類型對照表

| 檔案類型 | 放置位置 | SSOT | 範例 |
|---------|---------|------|------|
| **治理規則** | `docs/governance/` | ✅ | `CURSOR_FILE_PLACEMENT_RULE.md` |
| **專案憲章** | `charter/` | ✅ | `CHARTER.md` |
| **路線圖** | `roadmap/` | ✅ | `ROADMAP.md` |
| **UI 架構設計** | `specs/ui/architecture/` | ✅ | `P0-5_UI_ARCHITECTURE.md` |
| **UI 工作流程** | `specs/ui/workflow/` | ✅ | `P0-4.5_FUNNEL_SYSTEM_DESIGN.md` |
| **UI 世界觀** | `specs/ui/worldview/` | ✅ | `P0-5.7_WORLDVIEW_DESIGN.md` |
| **引擎規格** | `specs/engine/` | ✅ | `P0-5.6_TASK_PACKET.md` |
| **引擎實作** | `engine/` | ✅ | `score_facet.py` |
| **題目設計指南** | `domain/knowledge_base/` | ✅ | `question_design_guidelines.v1.0.md` |
| **分數計算定義** | `domain/facets/*.scoring.v1.0.json` | ✅ | `stress_recovery.scoring.v1.0.json` |
| **分數計算實作** | `engine/score_facet.py` | ✅ | `score_facet.py` |
| **任務包** | `docs/task_packets/` | ✅ | `COMPREHENSIVE_REORGANIZATION_TASK_PACKET.md` |
| **任務報告** | `archive/tasks_by_category/{類別}/TASK_REPORTS.md` | ✅ | `ui/TASK_REPORTS.md` |
| **任務狀態** | `docs/ops/TASK_STATUS.md` | ✅ | `TASK_STATUS.md` |
| **分析報告** | `docs/ops/analysis/` | ✅ | `CONCEPT_DUPLICATION_AUDIT.md` |

---

## 🗺️ 第四部分：從零開始的查找指引

### 4.1 完全沒有上下文的情況下，應該從哪裡開始？

#### 步驟 1：了解專案目標
1. **讀 `START_HERE.md`** - 快速入口
2. **讀 `charter/CHARTER.md`** - 終極目標
3. **讀 `roadmap/ROADMAP.md`** - 主線進度

#### 步驟 2：了解專案現狀
1. **讀 `docs/ops/TASK_STATUS.md`** - 當前任務狀態
2. **讀 `memory/briefs/CURRENT.md`** - 當前狀態摘要
3. **讀 `memory/changes/CHANGELOG.md`** - 變更記錄

#### 步驟 3：了解工作規則
1. **讀 `docs/ONBOARDING.md`** - AI 上手指南
2. **讀 `docs/governance/ESSENTIAL_RULES.md`** - 核心制度
3. **讀 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`** - 文件放置規範

#### 步驟 4：查找特定概念

##### 查找制度/規則
```
1. 先查 docs/governance/GOVERNANCE_INDEX.md（治理索引）
2. 再查 docs/governance/ESSENTIAL_RULES.md（核心制度）
3. 特定規則：docs/governance/{規則名稱}.md
```

##### 查找題目設計
```
1. SSOT：domain/knowledge_base/question_design_guidelines.v1.0.md
2. 規格副本：specs/domain/questions/question_design_guidelines.v1.0.md
3. 策略筆記：docs/domain/design/QUESTION_STRATEGY_NOTES.md
```

##### 查找分數計算
```
1. 計算定義：domain/facets/*.scoring.v1.0.json
2. 計算實作：engine/score_facet.py
3. 編譯後資料：domain/compiled/*.compiled.json
```

##### 查找引擎規格
```
1. 引擎規格：specs/engine/
2. 引擎實作：engine/
3. 引擎任務報告：archive/tasks_by_category/engine/TASK_REPORTS.md
```

##### 查找 UI 設計
```
1. UI 架構：specs/ui/architecture/P0-5_UI_ARCHITECTURE.md
2. UI 工作流程：specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md
3. UI 世界觀：specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md
4. UI 任務報告：archive/tasks_by_category/ui/TASK_REPORTS.md
```

---

## 📝 第五部分：檔案寫入指引

### 5.1 寫入檔案前的檢查清單

#### ✅ 必做檢查
1. **查閱 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`**
   - 確認檔案類型對應的放置位置
   - 確認是否有 SSOT 檔案

2. **檢查是否已有相同概念的檔案**
   - 搜尋關鍵字，確認是否重複
   - 如果有重複，更新現有檔案而非建立新檔案

3. **確認 SSOT 狀態**
   - 如果是新概念，建立 SSOT 檔案
   - 如果是現有概念，更新 SSOT 檔案

4. **更新索引檔案**
   - 如果是新 SSOT，更新相關索引檔案
   - 例如：`docs/governance/GOVERNANCE_INDEX.md`

### 5.2 檔案命名規範

#### 治理文件
- 格式：`UPPERCASE_WITH_UNDERSCORES.md`
- 範例：`CURSOR_FILE_PLACEMENT_RULE.md`

#### 規格文件
- 格式：`{任務編號}_{描述}.md` 或 `{概念}.v{版本}.md`
- 範例：`P0-5_UI_ARCHITECTURE.md`, `question_design_guidelines.v1.0.md`

#### 任務文件
- 格式：`{任務編號}_{類型}.md`
- 範例：`P0-5_TASK_PACKET.md`, `P0-12_TASK_STATUS_REPORT.md`

#### Domain 資料
- 格式：`{facet_id}.{類型}.v{版本}.json`
- 範例：`stress_recovery.scoring.v1.0.json`

---

## 🔧 第六部分：建議的整合行動

### 6.1 立即行動（高優先級）

#### 1. 處理重複的題目設計指南
- **行動**：確認 `specs/domain/questions/question_design_guidelines.v1.0.md` 是否與 `domain/knowledge_base/question_design_guidelines.v1.0.md` 相同
- **建議**：如果相同，刪除 `specs/` 中的副本，或建立符號連結
- **如果不同**：合併內容，保留 `domain/knowledge_base/` 為 SSOT

#### 2. 建立分數計算規格文件
- **行動**：在 `specs/engine/core/` 建立 `SCORING_LOGIC_SPEC.md`
- **內容**：說明 weighted_sum 模型、權重設定、分數轉換邏輯
- **引用**：引用 `engine/score_facet.py` 和 `domain/facets/*.scoring.v1.0.json`

#### 3. 建立引擎規格索引
- **行動**：在 `specs/engine/` 建立 `README.md` 或 `INDEX.md`
- **內容**：索引所有引擎規格檔案的位置

### 6.2 後續行動（中優先級）

#### 4. 整合領域特定規則
- **行動**：將 `docs/domain/advisory/` 中的規則整理到 `docs/domain/governance/`
- **建議**：建立 `docs/domain/governance/INDEX.md`

#### 5. 建立概念索引
- **行動**：建立 `docs/CONCEPT_INDEX.md`
- **內容**：索引所有重要概念的位置（制度、題目、計算、引擎等）

---

## 📚 第七部分：SSOT（單一真相來源）清單

### 7.1 核心概念 SSOT

| 概念 | SSOT 位置 | 狀態 |
|------|----------|------|
| **專案憲章** | `charter/CHARTER.md` | ✅ SSOT |
| **路線圖** | `roadmap/ROADMAP.md` | ✅ SSOT |
| **任務狀態** | `docs/ops/TASK_STATUS.md` | ✅ SSOT |
| **文件放置規範** | `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md` | ✅ SSOT |
| **UI 架構** | `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` | ✅ SSOT |
| **UI 工作流程** | `specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` | ✅ SSOT |
| **UI 世界觀** | `specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md` | ✅ SSOT |
| **題目設計指南** | `domain/knowledge_base/question_design_guidelines.v1.0.md` | ✅ SSOT |
| **分數計算定義** | `domain/facets/*.scoring.v1.0.json` | ✅ SSOT |
| **分數計算實作** | `engine/score_facet.py` | ✅ SSOT |
| **引擎規格** | `specs/engine/` | ✅ SSOT |
| **引擎實作** | `engine/` | ✅ SSOT |

### 7.2 需要建立的 SSOT

| 概念 | 建議位置 | 優先級 |
|------|----------|--------|
| **分數計算規格** | `specs/engine/core/SCORING_LOGIC_SPEC.md` | 高 |
| **引擎規格索引** | `specs/engine/README.md` | 中 |
| **概念總索引** | `docs/CONCEPT_INDEX.md` | 中 |

---

## ✅ 第八部分：驗證與建議

### 8.1 發現的問題

1. ✅ **題目設計指南重複**：2 個位置
2. ✅ **制度檔案分散**：多個位置（但已有 SSOT）
3. ✅ **分數計算分散**：多個位置（但已有 SSOT）
4. ✅ **引擎規格分散**：多個位置（但已有 SSOT）

### 8.2 建議

1. **立即處理**：確認並處理 `question_design_guidelines.v1.0.md` 的重複
2. **建立規格文件**：為分數計算和引擎建立統一的規格文件
3. **建立索引**：建立概念總索引，方便查找

---

**最後更新**：2026-01-12  
**狀態**：COMPLETE
