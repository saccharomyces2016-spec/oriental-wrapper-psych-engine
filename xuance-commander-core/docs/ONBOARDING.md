# AI 上手指南（Onboarding Guide）

**⚠️ 重要**：如果你是第一次接觸這個專案的 AI，請先閱讀本文件！

**目的**：讓 AI 在完全沒有上下文的情況下，能夠快速了解專案並開始工作。

**使用時機**：
- ✅ 第一次接觸這個專案（必須讀）
- ✅ 需要快速了解專案現狀
- ✅ 需要確認應該遵守哪些規則
- ✅ 需要知道文件應該放在哪裡

---

## 📖 閱讀順序（必須依序閱讀）

### 1. 終極目標（必須讀）

**文件**：`charter/CHARTER.md`

**為什麼重要**：
- 定義專案的終極目標和不可違背的原則
- 所有工作都必須符合這些目標

**關鍵內容**：
- 主目標：打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- 核心策略：核心引擎可審計；外層以東方命理敘事呈現
- 三個核心要求：真的能賺錢、真的可以上國際、真的可以幫到人

---

### 2. 當前狀態（必須讀）

**文件**：
- `docs/ops/TASK_STATUS.md`（任務狀態總覽，統一入口）
- `memory/briefs/CURRENT.md`（當前狀態摘要）

**為什麼重要**：
- 了解專案現在在哪裡
- 了解有哪些任務在進行中
- 了解有哪些任務已完成

**關鍵內容**：
- 整體進度：約 20-25% 完成
- Phase 0 已完成（100%）
- 當前進行中的任務：P0-12（科學運算引擎完善，80% 完成）

---

### 3. 工作規則（必須讀）

**文件**：
- `docs/governance/ESSENTIAL_RULES.md`（核心制度）
- `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`（文件放置規範）
- `docs/FILE_PLACEMENT_AND_SEARCH_GUIDE.md` ⭐ **檔案放置與查找指引（從零開始的思考邏輯）**

**為什麼重要**：
- 告訴 AI 應該遵守哪些規則
- 告訴 AI 文件應該放在哪裡
- 告訴 AI 任務應該怎麼執行
- 告訴 AI 在完全沒有上下文的情況下，應該從哪裡開始找檔案

**關鍵內容**：
- 文本主控硬規則：所有決策以文本為準
- 文件放置規範：每個文件類型都有明確的放置位置
- 寫入前現況確認：寫入前必須確認現有狀態
- 從零開始的查找流程：完全沒有上下文時的查找邏輯

---

### 4. 進度與目標（必須讀）

**文件**：
- `roadmap/ROADMAP.md`（主線進度，SSOT）
- `roadmap/MASTER_WORK_OBJECTIVES.md`（主線工作目標）

**為什麼重要**：
- 了解專案的整體進度
- 了解有哪些主線工作目標
- 了解下一步應該做什麼

**關鍵內容**：
- Phase 0：MVP 核心功能（已完成）
- Phase 1：使用者驗證（未開始）
- 下一步：P1-1 使用者監測環境技術設計

---

### 5. 工作流程（建議讀）

**文件**：
- `docs/process/WORKFLOW.md`（工作流程）
- `docs/roles/ROLE_XUANCE_COMMANDER.md`（角色規範）

**為什麼重要**：
- 了解標準工作流程
- 了解 AI 的角色和職責

---

### 6. 詳細索引（需要時查閱）

**文件**：
- `memory/index/INDEX.md`（記憶索引）
- `docs/governance/GOVERNANCE_INDEX.md`（治理索引）
- `docs/ops/TASK_RECORDS_INDEX.md`（任務記錄索引）

**為什麼重要**：
- 需要查找詳細資訊時使用
- 包含所有文件的完整索引

---

## 🚀 快速開始工作

### 第一次工作前必做

1. **讀取終極目標**：`charter/CHARTER.md`
2. **讀取當前狀態**：`docs/ops/TASK_STATUS.md`
3. **讀取核心規則**：`docs/governance/ESSENTIAL_RULES.md`
4. **讀取文件放置規範**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

### 每次工作前必做

1. **執行 preflight**：`bash tools/preflight.sh`
2. **讀取 COMMAND_BRIEF**：`memory/briefs/COMMAND_BRIEF.md`
3. **確認當前任務狀態**：`docs/ops/TASK_STATUS.md`

---

## 📝 文件放置規則（快速參考）

**⚠️ 重要**：每次寫入文件前，必須先確認文件應該放在哪裡！

**核心原則**：每個文件類型都有明確的放置位置，不得隨意放置。

| 文件類型 | 放置位置 | 範例 | 決策依據 |
|---------|---------|------|---------|
| **治理文件** | `docs/governance/` | `CURSOR_FILE_PLACEMENT_RULE.md` | 規則、制度、協議 |
| **任務狀態** | `docs/ops/TASK_STATUS.md` | 統一入口，不帶時間戳記 | ⚠️ 不要建立新的時間戳記檔案 |
| **任務記錄** | `docs/ops/TASK_RECORDS_INDEX.md` | 詳細記錄索引 | 任務詳細記錄 |
| **階段任務** | `P0-X/` | `P0-5/P0-5_TASK_PACKET.md` | 階段任務相關文件 |
| **領域規格** | `docs/domain/` | `FACET_DESIGN_PRINCIPLES.md` | 領域設計規格 |
| **領域數據** | `domain/` | `income_expansion_pressure.compiled.v1.0.json` | 實際數據文件 |
| **顧問輸出** | `docs/gem/runs/` | `RUN_P0-3_R1_20260106.md` | 顧問師的產出 |
| **任務包** | `docs/task_packets/` | `TASK_PACKAGE_P0-5_UI_INTEGRATION.md` | 任務包文件 |

**⚠️ 詳細規則（寫入文件前必讀）**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

**快速決策流程**：
1. 不確定文件應該放在哪裡？ → 讀 `docs/FILE_PLACEMENT_AND_SEARCH_GUIDE.md` ⭐
2. 需要查找特定概念？ → 讀 `docs/FILE_PLACEMENT_AND_SEARCH_GUIDE.md` ⭐
3. 更新任務狀態？ → 更新 `docs/ops/TASK_STATUS.md`（不要建立新檔案）
4. 建立新的治理規則？ → 放在 `docs/governance/`
5. 建立階段任務文件？ → 放在 `archive/tasks_by_category/{類別}/tasks/`
6. 建立領域規格？ → 放在 `docs/domain/` 或 `specs/domain/`
7. 建立領域數據？ → 放在 `domain/`

---

## ⚠️ 重要提醒

1. **所有決策以文本為準**：對話上下文只能作為參考，不得作為主目標與主進度依據
2. **文件必須放在正確位置**：每次寫入文件前，必須檢查 `CURSOR_FILE_PLACEMENT_RULE.md`
3. **寫入前必須確認現況**：見 `docs/governance/PREWRITE_STATE_CONFIRMATION.md`
4. **任務狀態統一追蹤**：所有任務狀態更新到 `docs/ops/TASK_STATUS.md`，不要建立新的時間戳記檔案
5. **遇到衝突時**：以 `docs/ops/TASK_STATUS.md` 為統一入口，詳細記錄保留在任務資料夾中

---

## 🔗 相關文件

- **專案資料夾說明**：`專案資料夾說明.md`（給人類看的）
- **文件整理建議**：`文件整理建議報告_2026-01-12.md`（本次整理的分析結果）
- **文件整理執行報告**：`docs/ops/DOCUMENTATION_CONSOLIDATION_REPORT_2026-01-12.md`

---

**最後更新**：2026-01-12  
**狀態**：ACTIVE
