# FILE_ORGANIZATION_GUIDE（文件組織指南）

## 狀態
- ACTIVE
- EDITABLE
- 建立日期：2026-01-09
- 必須納入任務包生成流程

---

## 目的
提供完整的文件組織指南，讓總指揮（Cursor）在寫入文件時能夠快速判斷：
- 文件應該寫到哪裡
- 文件應該如何命名
- 文件應該如何分類
- 哪些資料夾有哪些功能

---

## 核心原則

### 1. Canon Path 原則
- **同一「資料性質」只能有一個 Canon Path**
- **所有文件必須寫入 `xuance-commander-core/` 下的 Canon 路徑**
- **禁止使用相對路徑**（如 `out/`, `tmp/`, `docs/`）

### 2. 文件分類原則
- **治理文件**：`docs/governance/`
- **領域文件**：`docs/domain/`
- **顧問輸出**：`docs/gem/runs/`
- **任務記錄**：`docs/ops/`
- **臨時文件**：`tmp/`
- **輸出文件**：`out/`
- **日誌文件**：`logs/`

---

## 資料夾結構與功能說明

### 1. 治理層（Governance Layer）

#### `xuance-commander-core/docs/governance/`
**功能**：所有治理規則、制度、協議
**包含**：
- 治理規則（如 `FILE_WRITE_LOCATION_RULE.md`）
- 角色定義（如 `AI_ADVISORY_ROLES.md`）
- 流程協議（如 `CURSOR_TASK_PACKAGE_RULE.md`）
- 決策記錄（如 `LESSONS_LEARNED.md`）

**禁止**：
- ❌ repo-root 的 `./docs/governance`
- ❌ 任何其他位置的 `docs/governance/`

**檢查方法**：
- 絕對路徑必須包含 `xuance-commander-core/docs/governance/`

---

### 2. 領域層（Domain Layer）

#### `xuance-commander-core/docs/domain/`
**功能**：領域相關的設計、規格、輸出
**包含**：
- 領域設計原則（如 `FACET_DESIGN_PRINCIPLES.md`）
- 領域規格（如 `advisory/R1/`, `advisory/R2/`）
- 領域輸出（如 `output/`）
- CI 規格（如 `ci/`）

**子資料夾**：
- `advisory/`：顧問師相關的領域規格（R1-R5）
- `output/`：領域輸出規格
- `ci/`：CI 測試規格
- `design/`：設計相關文件
- `research/`：研究資料（RESEARCH）
- `snapshots/`：領域快照

**禁止**：
- ❌ repo-root 的 `./docs/domain`
- ❌ 任何其他位置的 `docs/domain/`

---

#### `xuance-commander-core/domain/`
**功能**：領域數據文件（JSON）
**包含**：
- `manifests/`：領域 manifest 文件
- `compiled/`：編譯後的 compiled facet
- `facets/`：Facet 定義
- `questions/`：題目數據
- `narratives/`：敘事數據
- `recommendations/`：建議數據
- `riskchains/`：風險鏈數據

---

### 3. 顧問層（Advisor Layer）

#### `xuance-commander-core/docs/gem/`
**功能**：顧問師相關文件
**包含**：
- `briefs/`：任務包（給顧問師的完整任務包）
- `runs/`：顧問師輸出（所有顧問師的產出都寫在這裡）
- `profiles/`：顧問師角色定義

**規則**：
- 所有顧問輸出必須寫入 `docs/gem/runs/`
- 所有任務包必須寫入 `docs/gem/briefs/`

---

### 4. 任務記錄層（Task Records Layer）

#### `xuance-commander-core/docs/ops/`
**功能**：任務記錄、運營相關文件
**包含**：
- `TASK_RECORDS_INDEX.md`：任務記錄索引
- `TASK_RECORDS_SUMMARY.md`：任務記錄摘要（用於快照）
- `HEALTH_CHECK_RECORDS.md`：健康檢查記錄

---

### 5. 記憶層（Memory Layer）

#### `xuance-commander-core/memory/`
**功能**：項目記憶、狀態、索引
**包含**：
- `briefs/`：簡報文件（如 `CURRENT.md`, `COMMAND_BRIEF.md`）
- `changes/`：變更記錄（如 `CHANGELOG.md`）
- `index/`：索引文件（如 `INDEX.md`）
- `state/`：狀態文件

---

### 6. 臨時文件層（Temporary Layer）

#### `xuance-commander-core/tmp/`
**功能**：臨時文件、審計文件
**包含**：
- `audit/`：審計報告
- `health_check/`：健康檢查輸出

**規則**：
- 臨時文件不得作為證據
- 臨時文件不得被引用為決策依據

---

### 7. 輸出文件層（Output Layer）

#### `xuance-commander-core/out/`
**功能**：工具生成的輸出文件
**包含**：
- `CHAT_PACKET.md`：聊天封包
- `inventory/`：盤點報告
- `tool_audit/`：工具審計報告
- `advisor_packs/`：顧問包

**規則**：
- 輸出文件不得作為 SSOT
- 輸出文件僅供參考

---

### 8. 日誌文件層（Logs Layer）

#### `xuance-commander-core/logs/`
**功能**：日誌文件
**包含**：
- `preflight/`：預檢日誌
- `alerts/`：警示日誌
- `inventory/`：盤點日誌

**規則**：
- 日誌文件不得作為決策依據

---

### 9. 階段文件層（Phase Layer）

#### `xuance-commander-core/P0-X/`（如 `P0-3/`, `P0-4/`, `P0-5/`）
**功能**：階段相關文件
**包含**：
- `P0-X_CHARTER.md`：階段憲章
- `P0-X_PHASE_LOG.md`：階段日誌
- `P0-X_FREEZE_READINESS.md`：凍結準備
- `P0-X_FINAL_CHECKLIST.md`：最終檢查清單
- `P0-X_HANDOFF_SUMMARY.md`：交接摘要

---

### 10. 決策記錄層（Decision Records Layer）

#### `xuance-commander-core/docs/adr/`
**功能**：架構決策記錄（Architecture Decision Records）
**包含**：
- `ADR_0001_*.md`：決策記錄
- `ADR_TEMPLATE.md`：決策記錄模板

**規則**：
- 任何結構性變更必須新增 ADR
- ADR 必須經過使用者批准

---

### 11. 研究資料層（Research Layer）

#### `xuance-commander-core/docs/domain/research/`
**功能**：外部研究資料（RESEARCH）
**包含**：
- `RESEARCH/`：Google Notebook 匯集的研究資料

**規則**：
- RESEARCH 與 LEGACY_FAILED 必須分離
- RESEARCH 可引用，但需標註來源

---

### 12. Legacy 層（Legacy Layer）

#### `xuance-commander-core/docs/legacy/`
**功能**：過往失敗版本（LEGACY_FAILED）
**包含**：
- `115_1_3_my-first-app_failed/`：失敗版本資料

**規則**：
- Legacy 僅作反例/零件庫
- Legacy 不得直接作為現行設計依據
- Legacy 需經裁決才可復用

---

## 文件命名規則

### 治理文件
- 格式：`UPPERCASE_WITH_UNDERSCORES.md`
- 範例：`FILE_WRITE_LOCATION_RULE.md`, `CURSOR_TASK_PACKAGE_RULE.md`

### 領域文件
- 格式：`PascalCase` 或 `UPPERCASE_WITH_UNDERSCORES.md`
- 範例：`FACET_DESIGN_PRINCIPLES.md`, `P0-3_NARRATIVE_SHARPNESS.md`

### 顧問輸出文件
- 格式：`BRIEF_<Phase>_<Task>_<Role>.md` 或 `RUN_<Phase>_<Task>_<Role>_<Date>.md`
- 範例：`BRIEF_P0-3_R1.md`, `RUN_P0-3_R1_20260106.md`

### 任務記錄文件
- 格式：`TASK_RECORDS_<Type>.md`
- 範例：`TASK_RECORDS_INDEX.md`, `TASK_RECORDS_SUMMARY.md`

---

## 文件寫入決策流程

### 步驟 1：判斷文件性質
1. **治理文件** → `docs/governance/`
2. **領域文件** → `docs/domain/` 或 `domain/`
3. **顧問輸出** → `docs/gem/runs/`
4. **任務記錄** → `docs/ops/`
5. **階段文件** → `P0-X/`
6. **決策記錄** → `docs/adr/`
7. **臨時文件** → `tmp/`
8. **輸出文件** → `out/`

### 步驟 2：檢查 Canon Path
- 確認目標路徑是否以 `xuance-commander-core/` 開頭
- 確認目標路徑是否符合 Canon 規則
- 確認是否使用了相對路徑（如 `out/`, `tmp/`）→ 必須改為完整 Canon 路徑

### 步驟 3：檢查命名規則
- 確認文件名是否符合命名規則
- 確認文件名是否與現有文件衝突

### 步驟 4：檢查是否需要登記
- 新資料夾類型 → 需要登記（見 `ARTIFACT_REGISTRY_RULE.md`）
- 新資料線 → 需要登記
- 新證據/記錄型文件 → 需要登記

---

## 快速參考表

| 文件類型 | Canon Path | 範例 |
|---------|-----------|------|
| 治理規則 | `docs/governance/` | `FILE_WRITE_LOCATION_RULE.md` |
| 領域設計 | `docs/domain/design/` | `FACET_DESIGN_PRINCIPLES.md` |
| 領域規格 | `docs/domain/advisory/R1/` | `P0-3_METRICS.md` |
| 領域數據 | `domain/compiled/` | `income_expansion_pressure.compiled.v1.0.json` |
| 顧問任務包 | `docs/gem/briefs/` | `BRIEF_P0-3_R1.md` |
| 顧問輸出 | `docs/gem/runs/` | `RUN_P0-3_R1_20260106.md` |
| 任務記錄 | `docs/ops/` | `TASK_RECORDS_INDEX.md` |
| 階段文件 | `P0-X/` | `P0-3_CHARTER.md` |
| 決策記錄 | `docs/adr/` | `ADR_0001_*.md` |
| 臨時文件 | `tmp/` | `tmp/audit/xxx.md` |
| 輸出文件 | `out/` | `out/CHAT_PACKET.md` |

---

## 相關規則文件

1. **`FILE_WRITE_LOCATION_RULE.md`**：文件寫入位置規則（硬規則）
2. **`GLOBAL_FILE_CANON.md`**：全域檔案憲法（Canon Path 定義）
3. **`ARTIFACT_REGISTRY_RULE.md`**：產物登記制度（新資料夾/資料線登記）
4. **`ABSOLUTE_REFERENCE_RULE.md`**：絕對路徑規則（禁止相對路徑）
5. **`SHADOW_PATH_REGISTRY.md`**：影子路徑登記（允許存在但不可引用）

---

## 文件分類決策樹（File Classification Decision Tree）

### 快速決策流程
```
1. 是治理規則嗎？
   → 是 → docs/governance/
   → 否 → 繼續

2. 是領域規格嗎？
   → 是 → docs/domain/ 或 domain/
   → 否 → 繼續

3. 是顧問輸出嗎？
   → 是 → docs/gem/runs/
   → 否 → 繼續

4. 是階段管理文件嗎？
   → 是 → P0-X/
   → 否 → 繼續

5. 是臨時文件嗎？
   → 是 → tmp/
   → 否 → 繼續

6. 是工具輸出嗎？
   → 是 → out/
   → 否 → 繼續

7. 其他 → 需要明確分類
```

### 高風險區域判斷標準

#### 領域文件 vs 階段文件
- **階段管理相關**（階段憲章、階段日誌、階段檢查清單）→ `P0-X/`
- **領域規格相關**（領域設計、領域規格、領域輸出）→ `docs/domain/`

#### 治理文件 vs 領域治理文件
- **通用治理規則**（適用於所有階段）→ `docs/governance/`
- **領域特定治理規則**（僅適用於特定領域）→ `docs/domain/GOVERNANCE_RULES.md`

#### 顧問輸出 vs 領域規格
- **顧問原始輸出**（未採納的建議稿）→ `docs/gem/runs/`
- **採納後的領域規格**（已採納並寫入 domain）→ `docs/domain/advisory/`

---

## 相關規範文件

### 文件放置規範（可引用）
- **`CURSOR_FILE_PLACEMENT_RULE.md`**：Cursor 文件放置規則（每次任務前必引用）
  - 包含完整的文件分類對照表
  - 包含文件放置決策流程
  - 包含重複文件清理規則
  - 可在任務包生成時直接引用

### 其他相關規範
- `FILE_WRITE_LOCATION_RULE.md`：文件寫入位置規則（硬規則）
- `GLOBAL_FILE_CANON.md`：全域檔案憲法（Canon Path 定義）
- `ARTIFACT_REGISTRY_RULE.md`：產物登記制度
- `ABSOLUTE_REFERENCE_RULE.md`：絕對路徑規則

---

## 狀態
- ACTIVE
- EDITABLE
- 必須納入任務包生成流程
- 總指揮（Cursor）在寫入文件前必須參考此指南
- **重要更新**：請同時參考 `CURSOR_FILE_PLACEMENT_RULE.md`（文件放置規範）
- 詳細健康度分析：見 `FOLDER_STRUCTURE_HEALTH_ANALYSIS.md`

