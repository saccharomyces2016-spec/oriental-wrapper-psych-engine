# 任務包集中管理目錄（Task Packets Centralized Management）

**建立日期**：2026-01-10  
**版本**：v1.0

---

## 📋 目錄說明

本目錄用於集中管理所有任務包文件，避免散落在不同位置。

### 目錄結構

```
docs/task_packets/
├── README.md（本文件）
├── INDEX.md（任務包索引）
├── phase/（階段任務包索引）
│   └── README.md（階段任務包說明）
└── advisor/（顧問相關任務包）
    ├── task_packages/（顧問完整任務包）
    │   └── README.md（顧問任務包說明）
    └── briefs/（顧問輸入包）
        └── README.md（顧問 Brief 說明）
```

---

## 📦 任務包分類說明

### 1. 階段任務包（Phase Task Packets）

**定義**：給 GPT/Gemini 的完整任務包，包含完整的背景、歷史、目標等信息。

**實際位置**：階段任務包保留在 `P0-X/P0-X_TASK_PACKET.md`（屬於階段管理文件）

**本目錄用途**：
- 存放階段任務包的索引或引用
- 方便統一查看和管理所有階段任務包

**命名規則**：`P<階段編號>_TASK_PACKET.md`

**範例**：
- `P0-5/P0-5_TASK_PACKET.md`

---

### 2. 顧問任務包（Advisor Task Packets）

**定義**：給顧問師的完整任務包，包含完整的背景信息，用於給特定顧問角色執行任務。

**位置**：`docs/task_packets/advisor/task_packages/`

**命名規則**：`TASK_PACKAGE_<Phase>_<Task>.md`

**範例**：
- `TASK_PACKAGE_P0-5_UI_INTEGRATION.md`
- `TASK_PACKAGE_P0-4_FACET_PORTABILITY.md`

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

**範例**：
- `BRIEF_P0-5_UI_narrative_R2.md`（給 R2 的敘事任務）
- `BRIEF_P0-5_UI_bilingual_R5.md`（給 R5 的雙語任務）
- `BRIEF_P0-4_secondary_metaphor_whitelist_R2.md`（給 R2 的次要隱喻白名單任務）

**特徵**：
- 針對特定顧問角色（R1-R5）
- 包含具體的任務要求
- 包含約束條件和驗收標準

---

## 📊 任務包分類決策流程

### 決策樹

```
1. 是階段級別的完整任務包嗎？（給 GPT/Gemini）
   → 是 → 階段任務包 → P0-X/P0-X_TASK_PACKET.md
   → 否 → 繼續

2. 是給顧問師的完整任務包嗎？（包含完整背景）
   → 是 → 顧問任務包 → docs/task_packets/advisor/task_packages/
   → 否 → 繼續

3. 是給特定顧問角色的輸入包嗎？（更具體）
   → 是 → 顧問 Brief → docs/task_packets/advisor/briefs/
   → 否 → 需要明確分類
```

---

## 🔄 從舊位置遷移規則

### 階段任務包
- **不移動**：保留在 `P0-X/` 下
- **在索引中引用**：在 `docs/task_packets/phase/INDEX.md` 中記錄

### 顧問任務包（從 `docs/gem/briefs/` 遷移）
- **移動到**：`docs/task_packets/advisor/task_packages/`
- **檔案**：`TASK_PACKAGE_*.md`

### 顧問 Brief（從 `docs/gem/briefs/` 遷移）
- **移動到**：`docs/task_packets/advisor/briefs/`
- **檔案**：`BRIEF_*.md`

### 舊位置處理
- **保留**：`docs/gem/briefs/` 目錄（可能還有其他文件）
- **創建索引**：在舊位置創建 `README.md` 指向新位置

---

## 📝 相關規範文件

- `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`：文件放置規範
- `docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`：AI 協作框架
- `docs/governance/CURSOR_TASK_PACKAGE_RULE.md`：任務包規則

---

## 🔍 快速查找

### 按階段查找
- 階段任務包：查看 `docs/task_packets/phase/INDEX.md`
- 或直接查看：`P0-X/P0-X_TASK_PACKET.md`

### 按顧問角色查找
- 顧問任務包：查看 `docs/task_packets/advisor/task_packages/`
- 顧問 Brief：查看 `docs/task_packets/advisor/briefs/`

### 按任務性質查找
- UI 整合：`TASK_PACKAGE_P0-5_UI_INTEGRATION.md`
- Facet 可攜性：`TASK_PACKAGE_P0-4_FACET_PORTABILITY.md`
- 敘事設計：`BRIEF_P0-5_UI_narrative_R2.md`

---

**本目錄版本**：v1.0  
**建立日期**：2026-01-10  
**狀態**：ACTIVE | EDITABLE

**— 本目錄用於集中管理所有任務包，避免散落在不同位置。**
