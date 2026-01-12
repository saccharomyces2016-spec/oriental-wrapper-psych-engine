# 檔案放置與查找指引（從零開始的思考邏輯）

**建立日期**：2026-01-12  
**目的**：在完全沒有任務提示的情況下，告訴 AI 應該從哪裡開始找檔案、檔案應該寫在哪裡  
**狀態**：ACTIVE ⭐ **SSOT**

---

## 🎯 核心原則

### 原則 1：SSOT（單一真相來源）
- 每個概念只有一個 SSOT 檔案
- 其他位置應引用 SSOT，而非重複內容

### 原則 2：按特性分類
- 檔案按功能特性分類，而非按任務編號
- 同類別檔案放在同一資料夾

### 原則 3：從上到下查找
- 先查索引和總覽檔案
- 再查具體的 SSOT 檔案
- 最後查任務資料夾（如果需要詳細記錄）

---

## 🗺️ 第一部分：從零開始的查找流程

### 場景 1：完全沒有上下文，第一次接觸專案

#### 步驟 1：了解專案目標（必須讀）
```
1. START_HERE.md
   └─> 指向 docs/ONBOARDING.md（AI）或 專案資料夾說明.md（人類）

2. charter/CHARTER.md
   └─> 專案終極目標、不可違背的原則

3. roadmap/ROADMAP.md
   └─> 主線進度、當前階段
```

#### 步驟 2：了解專案現狀（必須讀）
```
1. docs/ops/TASK_STATUS.md
   └─> 當前任務狀態總覽（統一入口）

2. memory/briefs/CURRENT.md
   └─> 當前狀態摘要

3. memory/changes/CHANGELOG.md
   └─> 變更記錄
```

#### 步驟 3：了解工作規則（必須讀）
```
1. docs/ONBOARDING.md
   └─> AI 上手指南（按優先級排序）

2. docs/governance/ESSENTIAL_RULES.md
   └─> 核心制度（必須遵守的規則）

3. docs/governance/CURSOR_FILE_PLACEMENT_RULE.md
   └─> 文件放置規範（寫入前必讀）
```

---

### 場景 2：需要查找特定概念

#### 查找制度/規則
```
入口：docs/governance/GOVERNANCE_INDEX.md
  └─> 索引所有治理文件

核心制度：docs/governance/ESSENTIAL_RULES.md
  └─> 必須遵守的規則

文件放置規範：docs/governance/CURSOR_FILE_PLACEMENT_RULE.md
  └─> 寫入文件前必讀

特定規則：docs/governance/{規則名稱}.md
  └─> 例如：CURSOR_FILE_PLACEMENT_RULE.md
```

#### 查找題目設計
```
SSOT：domain/knowledge_base/question_design_guidelines.v1.0.md
  └─> 題目設計指南（唯一真相來源）

規格副本：specs/domain/questions/question_design_guidelines.v1.0.md
  └─> 規格文件位置（應引用 SSOT）

策略筆記：docs/domain/design/QUESTION_STRATEGY_NOTES.md
  └─> 題目策略筆記

任務報告：archive/tasks_by_category/ui/TASK_REPORTS.md
  └─> UI 類別任務報告（包含題目設計相關任務）
```

#### 查找分數計算
```
計算定義（SSOT）：domain/facets/*.scoring.v1.0.json
  └─> 各 Facet 的分數計算定義
  └─> 例如：domain/facets/stress_recovery.scoring.v1.0.json

計算實作（SSOT）：engine/score_facet.py
  └─> Python 實作：weighted_sum 模型

編譯後資料：domain/compiled/*.compiled.json
  └─> 包含 scoring 的編譯後資料

規格文件：specs/engine/core/（建議建立 SCORING_LOGIC_SPEC.md）
  └─> 分數計算規格說明（待建立）

任務報告：archive/tasks_by_category/engine/TASK_REPORTS.md
  └─> 引擎類別任務報告
```

#### 查找引擎規格
```
引擎規格（SSOT）：specs/engine/
  ├─> specs/engine/metaphysical/（玄學引擎）
  └─> specs/engine/metaphysical/hexagram/（易經矩陣）

引擎實作（SSOT）：engine/
  ├─> engine/score_facet.py（分數計算）
  └─> engine/compile_domain.py（編譯）

引擎任務報告：archive/tasks_by_category/engine/TASK_REPORTS.md
  └─> 整合所有引擎任務報告

引擎任務索引：archive/tasks_by_category/engine/TASK_INDEX.md
  └─> 快速查找索引
```

#### 查找 UI 設計
```
UI 架構（SSOT）：specs/ui/architecture/P0-5_UI_ARCHITECTURE.md
  └─> UI 架構設計（Layer 0-6）

UI 工作流程（SSOT）：specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md
  └─> 4 階段分流系統設計

UI 世界觀（SSOT）：specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md
  └─> 世界觀設計

UI 任務報告：archive/tasks_by_category/ui/TASK_REPORTS.md
  └─> 整合所有 UI 任務報告

UI 任務索引：archive/tasks_by_category/ui/TASK_INDEX.md
  └─> 快速查找索引
```

---

## 📝 第二部分：檔案寫入指引

### 2.1 寫入檔案前的思考流程

```
我要寫什麼類型的檔案？
    ↓
┌─────────────────────────────────────────┐
│ 1. 這是治理文件嗎？（規則、制度、協議） │
│    → 查閱 docs/governance/CURSOR_FILE_  │
│       PLACEMENT_RULE.md                  │
│    → 放置位置：docs/governance/         │
│    → 檢查是否已有相同規則                │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ 2. 這是規格文件嗎？（設計規格）         │
│    → 放置位置：specs/{類別}/             │
│    → 檢查是否已有相同規格                │
│    → 如果是新規格，建立 SSOT             │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ 3. 這是 Domain 資料嗎？（JSON 資料）    │
│    → 放置位置：domain/{類型}/            │
│    → 遵循命名規範：{id}.{type}.v{版本}  │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ 4. 這是任務相關嗎？（任務包、報告）     │
│    → 任務包：docs/task_packets/         │
│    → 任務報告：archive/tasks_by_category/│
│       {類別}/TASK_REPORTS.md            │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ 5. 這是運營記錄嗎？（狀態、報告、分析） │
│    → 任務狀態：docs/ops/TASK_STATUS.md │
│    → 報告：docs/ops/reports/            │
│    → 分析：docs/ops/analysis/           │
└─────────────────────────────────────────┘
```

### 2.2 檔案類型對照表

| 檔案類型 | 放置位置 | SSOT 檢查 | 命名規範 |
|---------|---------|----------|---------|
| **治理規則** | `docs/governance/` | 查 `GOVERNANCE_INDEX.md` | `UPPERCASE_WITH_UNDERSCORES.md` |
| **專案憲章** | `charter/` | 只有一個 | `CHARTER.md` |
| **路線圖** | `roadmap/` | 只有一個 | `ROADMAP.md` |
| **UI 架構** | `specs/ui/architecture/` | 查 `P0-5_UI_ARCHITECTURE.md` | `{任務編號}_{描述}.md` |
| **UI 工作流程** | `specs/ui/workflow/` | 查 `P0-4.5_FUNNEL_SYSTEM_DESIGN.md` | `{任務編號}_{描述}.md` |
| **UI 世界觀** | `specs/ui/worldview/` | 查 `P0-5.7_WORLDVIEW_DESIGN.md` | `{任務編號}_{描述}.md` |
| **引擎規格** | `specs/engine/` | 查 `specs/engine/` | `{任務編號}_{描述}.md` |
| **引擎實作** | `engine/` | 查 `engine/` | `{功能}.py` |
| **題目設計指南** | `domain/knowledge_base/` | 查 `question_design_guidelines.v1.0.md` | `{概念}.v{版本}.md` |
| **分數計算定義** | `domain/facets/` | 查 `*.scoring.v1.0.json` | `{facet_id}.scoring.v{版本}.json` |
| **分數計算實作** | `engine/` | 查 `score_facet.py` | `score_facet.py` |
| **任務包** | `docs/task_packets/` | 查 `docs/task_packets/INDEX.md` | `{任務名稱}_TASK_PACKET.md` |
| **任務報告** | `archive/tasks_by_category/{類別}/` | 查 `TASK_REPORTS.md` | `TASK_REPORTS.md` |
| **任務狀態** | `docs/ops/TASK_STATUS.md` | 只有一個 | `TASK_STATUS.md` |

---

## 🔍 第三部分：查找特定概念的快速指南

### 3.1 制度/規則

**查找流程**：
1. 先查 `docs/governance/GOVERNANCE_INDEX.md`（治理索引）
2. 再查 `docs/governance/ESSENTIAL_RULES.md`（核心制度）
3. 特定規則：`docs/governance/{規則名稱}.md`

**寫入位置**：
- `docs/governance/{規則名稱}.md`
- 更新 `docs/governance/GOVERNANCE_INDEX.md`

---

### 3.2 題目設計

**查找流程**：
1. SSOT：`domain/knowledge_base/question_design_guidelines.v1.0.md`
2. 規格副本：`specs/domain/questions/question_design_guidelines.v1.0.md`
3. 策略筆記：`docs/domain/design/QUESTION_STRATEGY_NOTES.md`

**寫入位置**：
- 題目設計指南：`domain/knowledge_base/question_design_guidelines.v1.0.md` ⭐ SSOT
- 題目策略筆記：`docs/domain/design/QUESTION_STRATEGY_NOTES.md`

**注意**：
- ⚠️ `specs/domain/questions/question_design_guidelines.v1.0.md` 是重複檔案，應引用 SSOT

---

### 3.3 分數計算

**查找流程**：
1. 計算定義：`domain/facets/*.scoring.v1.0.json` ⭐ SSOT
2. 計算實作：`engine/score_facet.py` ⭐ SSOT
3. 編譯後資料：`domain/compiled/*.compiled.json`

**寫入位置**：
- 分數計算定義：`domain/facets/{facet_id}.scoring.v1.0.json`
- 分數計算實作：`engine/score_facet.py`
- 分數計算規格：`specs/engine/core/SCORING_LOGIC_SPEC.md`（建議建立）

**注意**：
- 每個 Facet 有自己的 scoring JSON
- 計算邏輯統一在 `engine/score_facet.py`

---

### 3.4 引擎規格

**查找流程**：
1. 引擎規格：`specs/engine/` ⭐ SSOT
2. 引擎實作：`engine/` ⭐ SSOT
3. 引擎任務報告：`archive/tasks_by_category/engine/TASK_REPORTS.md`

**寫入位置**：
- 引擎規格：`specs/engine/{類型}/{檔案名稱}.md`
- 引擎實作：`engine/{功能}.py`
- 引擎任務報告：更新 `archive/tasks_by_category/engine/TASK_REPORTS.md`

---

### 3.5 UI 設計

**查找流程**：
1. UI 架構：`specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` ⭐ SSOT
2. UI 工作流程：`specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` ⭐ SSOT
3. UI 世界觀：`specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md` ⭐ SSOT
4. UI 任務報告：`archive/tasks_by_category/ui/TASK_REPORTS.md`

**寫入位置**：
- UI 架構：`specs/ui/architecture/{檔案名稱}.md`
- UI 工作流程：`specs/ui/workflow/{檔案名稱}.md`
- UI 世界觀：`specs/ui/worldview/{檔案名稱}.md`
- UI 任務報告：更新 `archive/tasks_by_category/ui/TASK_REPORTS.md`

---

## 📚 第四部分：SSOT（單一真相來源）總覽

### 4.1 核心 SSOT 檔案

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

### 4.2 重複檔案處理

#### 題目設計指南
- ✅ `domain/knowledge_base/question_design_guidelines.v1.0.md` ⭐ **SSOT**
- ✅ `specs/domain/questions/question_design_guidelines.v1.0.md` - **已刪除（2026-01-12）**

**處理結果**：
- ✅ 已確認兩個檔案內容相同（102 行）
- ✅ 已刪除 `specs/domain/questions/question_design_guidelines.v1.0.md`
- ✅ 已建立 `specs/domain/questions/README.md` 說明 SSOT 位置

---

## 🎯 第五部分：實際應用範例

### 範例 1：我要寫一個新的治理規則

**思考流程**：
1. 這是治理文件 → 查 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
2. 放置位置：`docs/governance/`
3. 檢查是否已有相同規則 → 查 `docs/governance/GOVERNANCE_INDEX.md`
4. 如果沒有，建立新檔案：`docs/governance/{規則名稱}.md`
5. 更新 `docs/governance/GOVERNANCE_INDEX.md`

**結果**：
- 檔案位置：`docs/governance/{規則名稱}.md`
- 更新索引：`docs/governance/GOVERNANCE_INDEX.md`

---

### 範例 2：我要查找題目設計的相關資料

**思考流程**：
1. 這是題目設計 → 查 SSOT：`domain/knowledge_base/question_design_guidelines.v1.0.md`
2. 如果需要規格文件 → 查 `specs/domain/questions/question_design_guidelines.v1.0.md`
3. 如果需要策略筆記 → 查 `docs/domain/design/QUESTION_STRATEGY_NOTES.md`
4. 如果需要任務報告 → 查 `archive/tasks_by_category/ui/TASK_REPORTS.md`

**結果**：
- 主要資料：`domain/knowledge_base/question_design_guidelines.v1.0.md` ⭐ SSOT
- 相關資料：`specs/domain/questions/`, `docs/domain/design/`, `archive/tasks_by_category/ui/`

---

### 範例 3：我要查找分數計算的邏輯

**思考流程**：
1. 這是分數計算 → 查計算定義：`domain/facets/*.scoring.v1.0.json`
2. 查計算實作：`engine/score_facet.py`
3. 如果需要規格說明 → 查 `specs/engine/core/`（建議建立）

**結果**：
- 計算定義：`domain/facets/{facet_id}.scoring.v1.0.json` ⭐ SSOT
- 計算實作：`engine/score_facet.py` ⭐ SSOT
- 規格說明：待建立 `specs/engine/core/SCORING_LOGIC_SPEC.md`

---

### 範例 4：我要查找引擎的規格

**思考流程**：
1. 這是引擎規格 → 查 `specs/engine/`
2. 查引擎實作：`engine/`
3. 查引擎任務報告：`archive/tasks_by_category/engine/TASK_REPORTS.md`

**結果**：
- 引擎規格：`specs/engine/` ⭐ SSOT
- 引擎實作：`engine/` ⭐ SSOT
- 引擎任務報告：`archive/tasks_by_category/engine/TASK_REPORTS.md`

---

## ✅ 第六部分：檢查清單

### 寫入檔案前
- [ ] 已查閱 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
- [ ] 已檢查是否已有相同概念的檔案
- [ ] 已確認 SSOT 狀態
- [ ] 已確認檔案命名規範
- [ ] 已確認放置位置

### 查找檔案時
- [ ] 已查閱相關索引檔案（如 `GOVERNANCE_INDEX.md`）
- [ ] 已查閱 SSOT 檔案
- [ ] 已查閱相關任務報告（如需要詳細記錄）

---

## 📖 第七部分：快速參考

### 最重要的入口檔案
1. **`START_HERE.md`** - 快速入口
2. **`docs/ONBOARDING.md`** - AI 上手指南
3. **`專案資料夾說明.md`** - 專案資料夾說明（人類）
4. **`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`** - 文件放置規範 ⭐
5. **`docs/ops/TASK_STATUS.md`** - 任務狀態總覽

### 最重要的 SSOT 檔案
1. **`charter/CHARTER.md`** - 專案憲章
2. **`roadmap/ROADMAP.md`** - 路線圖
3. **`specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`** - UI 架構
4. **`specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`** - UI 工作流程
5. **`domain/knowledge_base/question_design_guidelines.v1.0.md`** - 題目設計指南
6. **`engine/score_facet.py`** - 分數計算實作

---

**建立日期**：2026-01-12  
**最後更新**：2026-01-12  
**狀態**：ACTIVE ⭐ **SSOT**
