# 任務包集中管理遷移報告（Task Packets Centralization Migration Report）

**建立日期**：2026-01-10  
**執行日期**：2026-01-10  
**狀態**：✅ 已完成

---

## 📋 遷移概述

本次遷移將散落在不同位置的任務包文件集中管理，建立統一的分類結構和索引系統。

---

## ✅ 已完成的工作

### 1. 建立集中管理結構

**新建目錄結構**：
```
docs/task_packets/
├── README.md（集中管理說明）
├── INDEX.md（任務包索引）
├── MIGRATION_REPORT.md（本文件）
├── phase/（階段任務包索引）
│   └── README.md
└── advisor/（顧問相關任務包）
    ├── task_packages/（顧問完整任務包）
    │   └── README.md
    └── briefs/（顧問輸入包）
        └── README.md
```

### 2. 文件遷移統計

#### 階段任務包
- **位置**：保留在原位置 `P0-X/P0-X_TASK_PACKET.md`（屬於階段管理文件）
- **數量**：1 個文件
  - `P0-5/P0-5_TASK_PACKET.md`
- **索引**：在 `docs/task_packets/phase/README.md` 建立索引

#### 顧問任務包
- **舊位置**：`docs/gem/briefs/TASK_PACKAGE_*.md`
- **新位置**：`docs/task_packets/advisor/task_packages/`
- **數量**：4 個文件（已遷移）
  - `TASK_PACKAGE_P0-5_UI_INTEGRATION.md`
  - `TASK_PACKAGE_P0-4_FACET_PORTABILITY.md`
  - `TASK_PACKAGE_P0-4_FACET_PORTABILITY_APPROVED.md`
  - `TASK_PACKAGE_P0-4.5_QUESTION_FLOW_FUNNEL_SYSTEM.md`

#### 顧問 Brief
- **舊位置**：`docs/gem/briefs/BRIEF_*.md`
- **新位置**：`docs/task_packets/advisor/briefs/`
- **數量**：28 個文件（已遷移）
  - P0-2 相關：10 個文件
  - P0-3 相關：8 個文件
  - P0-4 相關：2 個文件
  - P0-5 相關：2 個文件
  - 其他：6 個文件

### 3. 索引文件建立

**已建立索引**：
- ✅ `docs/task_packets/INDEX.md`：完整任務包索引
- ✅ `docs/task_packets/phase/README.md`：階段任務包索引
- ✅ `docs/task_packets/advisor/task_packages/README.md`：顧問任務包說明
- ✅ `docs/task_packets/advisor/briefs/README.md`：顧問 Brief 說明
- ✅ `docs/gem/briefs/README.md`：舊位置遷移說明

### 4. 文件放置規範更新

**已更新規範**：
- ✅ `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`：加入任務包管理規則
  - 新增「任務包文件」分類
  - 更新文件分類決策流程
  - 更新混淆情況處理方式
  - 更新快速參考表

---

## 📊 分類規則

### 1. 階段任務包（Phase Task Packets）

**定義**：給 GPT/Gemini 的完整任務包，包含完整的背景、歷史、目標等信息。

**位置**：`P0-X/P0-X_TASK_PACKET.md`（保留在階段資料夾）

**索引**：`docs/task_packets/phase/README.md`

**命名規則**：`P<階段編號>_TASK_PACKET.md`

---

### 2. 顧問任務包（Advisor Task Packets）

**定義**：給顧問師的完整任務包，包含完整的背景信息，用於給特定顧問角色執行任務。

**位置**：`docs/task_packets/advisor/task_packages/`

**命名規則**：`TASK_PACKAGE_<Phase>_<Task>.md`

**特徵**：
- 包含完整的任務背景
- 包含歷史任務狀態
- 包含已完成結果
- 包含下一步目標

---

### 3. 顧問 Brief（Advisor Briefs）

**定義**：給特定顧問角色的輸入包，更具體、針對性更強。

**位置**：`docs/task_packets/advisor/briefs/`

**命名規則**：`BRIEF_<Phase>_<Task>_<Role>.md` 或 `BRIEF_<Phase>_<Task>_<Role>_<SubTask>.md`

**特徵**：
- 針對特定顧問角色（R1-R5）
- 包含具體的任務要求
- 包含約束條件和驗收標準

---

## 🔍 查找方式

### 按階段查找
- **階段任務包**：`P0-X/P0-X_TASK_PACKET.md` 或 `docs/task_packets/phase/README.md`
- **顧問任務包**：`docs/task_packets/advisor/task_packages/TASK_PACKAGE_P0-X_*.md`
- **顧問 Brief**：`docs/task_packets/advisor/briefs/BRIEF_P0-X_*.md`

### 按顧問角色查找
- **顧問任務包**：查看任務包內容
- **顧問 Brief**：查看文件名中的 `R<數字>` 部分

### 通過索引查找
- **完整索引**：`docs/task_packets/INDEX.md`
- **分類索引**：各子目錄的 `README.md`

---

## 📝 相關規範文件

### 核心規範
- `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`：文件放置規範（已更新任務包管理規則）
- `docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`：AI 協作框架
- `docs/governance/CURSOR_TASK_PACKAGE_RULE.md`：任務包規則

### 任務包管理
- `docs/task_packets/README.md`：任務包集中管理說明
- `docs/task_packets/INDEX.md`：任務包索引
- `codex/templates/TASK_PACKET_TEMPLATE.md`：任務包模板

---

## ⚠️ 注意事項

### 舊位置處理
- **`docs/gem/briefs/`**：已創建 `README.md` 說明遷移情況
- **舊位置引用**：所有舊位置引用應更新為新位置

### 新文件生成
- **階段任務包**：應放在 `P0-X/` 下，並在 `docs/task_packets/phase/` 更新索引
- **顧問任務包**：應放在 `docs/task_packets/advisor/task_packages/`
- **顧問 Brief**：應放在 `docs/task_packets/advisor/briefs/`

### 引用更新
- 所有引用舊位置（`docs/gem/briefs/`）的文件應更新為新位置
- 生成任務包時應參考 `docs/task_packets/README.md` 和 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

---

## ✅ 驗收檢查

- [x] 所有任務包文件已遷移到新位置
- [x] 所有索引文件已建立
- [x] 文件放置規範已更新
- [x] 舊位置已創建遷移說明
- [x] 各子目錄已創建說明文件
- [x] 文件數量統計正確

---

## 📊 遷移統計總結

| 類型 | 舊位置 | 新位置 | 數量 | 狀態 |
|------|--------|--------|------|------|
| 階段任務包 | `P0-X/` | `P0-X/`（保留）+ 索引 | 1 | ✅ 已完成 |
| 顧問任務包 | `docs/gem/briefs/` | `docs/task_packets/advisor/task_packages/` | 4 | ✅ 已遷移 |
| 顧問 Brief | `docs/gem/briefs/` | `docs/task_packets/advisor/briefs/` | 28 | ✅ 已遷移 |
| **總計** | - | - | **33** | ✅ **已完成** |

---

## 🎯 後續建議

1. **持續維護**：
   - 每次生成新任務包時，應遵循新的分類規則
   - 應在 `docs/task_packets/INDEX.md` 中更新索引

2. **引用更新**：
   - 檢查並更新所有引用舊位置的文件
   - 確保所有新生成的任務包都使用新位置

3. **規範遵循**：
   - 每次生成任務包前，應參考 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
   - 使用 `codex/templates/TASK_PACKET_TEMPLATE.md` 作為模板

---

**本報告版本**：v1.0  
**建立日期**：2026-01-10  
**執行日期**：2026-01-10  
**狀態**：✅ 已完成

**— 任務包集中管理遷移已完成，所有任務包已統一管理。**
