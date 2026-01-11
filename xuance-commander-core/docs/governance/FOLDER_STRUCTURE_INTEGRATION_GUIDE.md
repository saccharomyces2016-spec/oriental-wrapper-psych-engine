# 資料夾結構整合指南（Folder Structure Integration Guide）

**狀態**：ACTIVE | REFERENCE（雙重保障規範）  
**建立日期**：2026-01-10  
**版本**：v1.0

---

## ⚠️ 重要聲明：雙重保障規範

**本規範在工作規範中明確記錄資料夾放置規則，作為雙重保障，以防長期工作後資料散落。**

**雙重保障機制**：
1. **主要規範**：`CURSOR_FILE_PLACEMENT_RULE.md`（詳細規範）
2. **整合指南**：本文件（整合彙總，方便快速查閱）

**使用情境**：
- ✅ 每次寫入文件前，必須同時參考兩個文件
- ✅ 不確定文件放置位置時，先查本文件，再查主要規範
- ✅ 長期工作後，可透過本文件快速找回文件分類規則

---

## 一、核心原則（寫入前必檢查）

### 1. Canon Path 原則（硬規則）
- **所有文件必須寫入 `xuance-commander-core/` 下的 Canon 路徑**
- **禁止使用相對路徑**（如 `out/`, `tmp/`, `docs/`）
- **必須使用完整絕對路徑**（如 `xuance-commander-core/docs/governance/`）

### 2. 單一真實來源（SSOT）原則
- **同一性質的文件只能有一個 Canon 路徑**
- **禁止在多個位置放置相同的文件**
- **相似或相關的文件應集中在同一資料夾**

### 3. 分類清晰原則
- **每個資料夾有明確的功能定義**
- **不確定的文件應先查閱本規範，不得隨意放置**

---

## 二、資料夾結構完整對照表（快速參考）

### 📋 治理文件（Governance Files）

**放置位置**：`xuance-commander-core/docs/governance/`

**包含類型**：
- 治理規則與制度
- AI 協作框架（Cursor 架構版本）
- 角色定義
- 流程協議
- 決策記錄與經驗總結
- 文件組織指南

**禁止放置**：
- ❌ repo-root 的 `./docs/governance`
- ❌ 任何其他位置的 `docs/governance/`
- ❌ 領域特定的治理規則（應放在 `docs/domain/GOVERNANCE_RULES.md`）

---

### 🎯 領域文件（Domain Files）

#### 領域規格與設計

**放置位置**：`xuance-commander-core/docs/domain/`

**子資料夾結構**：
- `advisory/`：顧問師相關的領域規格（R1-R5）
- `output/`：領域輸出規格
- `ci/`：CI 測試規格
- `design/`：領域設計文件
- `research/`：研究資料
- `snapshots/`：領域快照（已廢棄，僅保留歷史快照）
- `metrics/`：指標定義
- `engine_assets/`：引擎資產
- `facets/`：Facet 定義文件（非 JSON 數據）

#### 領域數據文件

**放置位置**：`xuance-commander-core/domain/`

**包含類型**：
- Facet JSON 數據（`facets/`）
- 領域 Manifest（`manifests/`）
- 敘事數據（`narratives/`）
- 問題數據（`questions/`）
- 建議數據（`recommendations/`）
- 風險鏈數據（`riskchains/`）
- 編譯後的 Facet（`compiled/`）

---

### 📦 任務包文件（Task Packet Files）

**放置位置**：`xuance-commander-core/docs/task_packets/`

**子資料夾結構**：
- `phase/`：階段任務包（如 P0-3, P0-4, P0-5）
- `advisor/`：顧問任務包
  - `task_packages/`：具體任務包
  - `briefs/`：任務簡報
- `README.md`：任務包總索引
- `INDEX.md`：任務包索引
- `NEXT_TASK_RECOMMENDATION.md`：下一任務建議

**禁止放置**：
- ❌ repo-root 的 `./task_packets`
- ❌ 任何其他位置的 `task_packets/`

---

### 🔧 操作文件（Operations Files）

**放置位置**：`xuance-commander-core/docs/ops/`

**包含類型**：
- 操作協議（如 `COMMANDER_AUTOPILOT_PROTOCOL.md`）
- 健康檢查記錄（如 `HEALTH_CHECK_RECORDS.md`）
- 任務記錄索引（如 `TASK_RECORDS_INDEX.md`）
- 驗證包政策（如 `VERIFICATION_PACK_POLICY.md`）
- `verification_packs/`：驗證包文件

**禁止放置**：
- ❌ repo-root 的 `./ops`
- ❌ 任何其他位置的 `ops/`

---

### 📝 流程文件（Process Files）

**放置位置**：`xuance-commander-core/docs/process/`

**包含類型**：
- 工作流程（如 `WORKFLOW.md`）
- 任務生命週期（如 `TASK_LIFECYCLE.md`）
- 階段結案（如 `P0-2_PHASE_CLOSURE.md`）

---

### 👤 角色文件（Role Files）

**放置位置**：`xuance-commander-core/docs/roles/`

**包含類型**：
- 角色定義（如 `ROLE_XUANCE_COMMANDER.md`）

---

### 📚 ADR 文件（Architecture Decision Records）

**放置位置**：`xuance-commander-core/docs/adr/`

**命名規則**：`ADR_XXXX_short_description.md`

**包含類型**：
- 架構決策記錄

---

### 🗂️ 記憶文件（Memory Files）

**放置位置**：`xuance-commander-core/memory/`

**子資料夾結構**：
- `briefs/`：簡報文件（如 `CURRENT.md`, `CHANGELOG.md`）
- `index/`：索引文件（如 `INDEX.md`, `COMMANDER_ENTRYPOINTS.md`）
- `changes/`：變更記錄（如 `CHANGELOG.md`）
- `state/`：狀態文件
- `role_sync_packets/`：角色同步包（已廢棄，僅保留歷史）

**禁止放置**：
- ❌ 快照文件（已廢棄，不再使用 MASTER/MIN 快照）
- ❌ 副指揮官快照（已廢棄）

---

### 📊 輸出文件（Output Files）

**放置位置**：`xuance-commander-core/out/`

**包含類型**：
- 對話包（如 `CHAT_PACKET.md`）
- 清單報告（如 `inventory/`）
- 審計報告（如 `tool_audit/`）

---

### 🗑️ 臨時文件（Temporary Files）

**放置位置**：`xuance-commander-core/tmp/`

**包含類型**：
- 臨時審計文件
- 健康檢查結果
- 備份文件

**注意**：臨時文件應定期清理

---

### 📋 日誌文件（Log Files）

**放置位置**：`xuance-commander-core/logs/`

**子資料夾結構**：
- `alerts/`：警告日誌
- `inventory/`：清單日誌
- `preflight/`：預檢日誌

---

### 📦 階段文件（Phase Files）

**放置位置**：`xuance-commander-core/P<階段編號>/`

**命名規則**：`P<階段編號>_<文件名>.md`

**範例**：
- `P0-3/P0-3_FINAL_CHECKLIST.md`
- `P0-5/P0-5_TECHNICAL_ARCHITECTURE.md`

---

## 三、已廢棄的資料夾結構（不再使用）

### ❌ 快照系統（已廢棄）

**已刪除的文件**：
- `memory/briefs/MASTER_SYNC_PACKET.md`
- `memory/briefs/MASTER_MIN_SYNC_PACKET.md`
- `memory/briefs/DEPUTY_COMMANDER_SNAPSHOT.md`
- `docs/governance/MASTER_SNAPSHOT_USAGE_GUIDE.md`
- `docs/governance/MASTER_SYNC_PROTOCOL.md`
- `docs/governance/FULL_SNAPSHOT_RULES.md`

**廢棄原因**：
- Cursor 可以直接讀取完整代碼庫，不需要快照系統
- 純粹以任務包處理任務的工作模式

### ❌ 舊架構資料夾（已廢棄）

**已刪除的文件**：
- `docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`
- `docs/governance/CURSOR_GPT_GEMINI_TASK_PACKET_FRAMEWORK.md`
- `docs/governance/DOCS_GEM_CANON_RULE.md`
- `docs/governance/CURSOR_DEPUTY_COMMANDER_INTERFACE_RULE.md`

**廢棄原因**：
- 已轉換為 Cursor 架構：Cursor 為總指揮，GPT/GEM/GEMINI 為任務執行者
- 不再使用副指揮官架構

---

## 四、資料夾放置決策流程（寫入前必執行）

### Step 1：確定文件類型

檢查文件屬於哪一類：
- [ ] 治理文件 → `docs/governance/`
- [ ] 領域規格/設計 → `docs/domain/`
- [ ] 領域數據 → `domain/`
- [ ] 任務包 → `docs/task_packets/`
- [ ] 操作文件 → `docs/ops/`
- [ ] 流程文件 → `docs/process/`
- [ ] 角色文件 → `docs/roles/`
- [ ] ADR → `docs/adr/`
- [ ] 記憶文件 → `memory/`
- [ ] 輸出文件 → `out/`
- [ ] 臨時文件 → `tmp/`
- [ ] 日誌文件 → `logs/`
- [ ] 階段文件 → `P<階段編號>/`

### Step 2：檢查是否有重複文件

在目標資料夾中搜尋是否有相同或相似的文件：
- [ ] 使用 `grep` 搜尋文件名
- [ ] 檢查是否有功能重複的文件
- [ ] 如有重複，整合到現有文件或刪除重複文件

### Step 3：確認 Canon 路徑

確認目標路徑符合 Canon 規則：
- [ ] 路徑以 `xuance-commander-core/` 開頭
- [ ] 路徑符合上述對照表
- [ ] 路徑不是已廢棄的結構

### Step 4：寫入文件

執行寫入操作：
- [ ] 使用完整絕對路徑
- [ ] 確認文件寫入成功
- [ ] 更新相關索引文件（如 `GOVERNANCE_INDEX.md`）

---

## 五、常見錯誤與修正（錯誤防範）

### ❌ 錯誤 1：使用相對路徑

**錯誤範例**：
- `docs/governance/FILE.md`（缺少 `xuance-commander-core/` 前綴）
- `./docs/governance/FILE.md`（使用相對路徑）

**正確範例**：
- `xuance-commander-core/docs/governance/FILE.md`（完整絕對路徑）

### ❌ 錯誤 2：放置到錯誤的資料夾

**錯誤範例**：
- 將治理規則放到 `docs/domain/`（應放到 `docs/governance/`）
- 將任務包放到 `docs/governance/`（應放到 `docs/task_packets/`）

**正確範例**：
- 治理規則 → `docs/governance/`
- 任務包 → `docs/task_packets/`

### ❌ 錯誤 3：重複文件

**錯誤範例**：
- `docs/governance/TASK_PACKAGE_RULE.md`
- `docs/governance/COMPLETE_TASK_PACKAGE_RULE.md`（重複）

**正確做法**：
- 整合重複文件，保留一個版本
- 在索引中標註整合情況

---

## 六、雙重保障機制說明

### 主要規範文件

**文件位置**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

**用途**：
- 詳細的文件分類對照表
- 完整的決策流程
- 具體的命名規則

### 整合指南文件（本文件）

**文件位置**：`docs/governance/FOLDER_STRUCTURE_INTEGRATION_GUIDE.md`

**用途**：
- 快速參考資料夾結構
- 整合彙總，方便查閱
- 雙重保障，防止長期工作後資料散落

### 使用建議

1. **寫入文件前**：
   - 先查本文件（快速參考）
   - 再查主要規範（詳細確認）

2. **不確定時**：
   - 查本文件的「資料夾放置決策流程」
   - 查主要規範的「完整對照表」

3. **長期工作後**：
   - 透過本文件快速找回分類規則
   - 透過主要規範確認詳細要求

---

## 七、相關規範索引

**主要規範**：
- `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`：詳細規範

**相關規範**：
- `docs/governance/FILE_WRITE_LOCATION_RULE.md`：文件寫入位置規則（已整合到主要規範）
- `docs/governance/FILE_ORGANIZATION_GUIDE.md`：文件組織指南

**索引文件**：
- `docs/governance/GOVERNANCE_INDEX.md`：治理文件索引

---

## 八、更新記錄

**v1.0（2026-01-10）**：
- 建立整合指南
- 整合資料夾結構對照表
- 標註已廢棄的資料夾結構
- 建立雙重保障機制

---

**End of Folder Structure Integration Guide**

