# CURSOR_FILE_PLACEMENT_RULE（Cursor 文件放置規則｜可引用規範）

**狀態**：ACTIVE | REFERENCE（每次任務前必引用）  
**建立日期**：2026-01-10  
**版本**：v1.0

---

## ⚠️ 重要聲明：本規範為可引用規範

**本規範必須在以下情況被引用：**
- ✅ 每次生成任務包前，必須參考本規範
- ✅ 每次寫入文件前，必須檢查本規範
- ✅ 每次遇到不確定文件放置位置時，必須查閱本規範
- ✅ 使用者說「請參考你的規範」時，即指本文件

**引用方式**：
- 在任務包中明確引用：`請參考 docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
- 在系統提示中引用：`每次寫入文件前，請參考 CURSOR_FILE_PLACEMENT_RULE.md`

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

## 二、文件分類與放置位置（完整對照表）

### 📋 治理文件（Governance Files）

**放置位置**：`xuance-commander-core/docs/governance/`

**包含類型**：
- 治理規則與制度（如 `FILE_WRITE_LOCATION_RULE.md`）
- AI 協作框架（如 `CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`）
- 角色定義（如 `AI_ADVISORY_ROLES.md`）
- 流程協議（如 `CURSOR_TASK_PACKAGE_RULE.md`）
- 決策記錄與經驗總結（如 `LESSONS_LEARNED.md`）
- 文件組織指南（如 `FILE_ORGANIZATION_GUIDE.md`）

**禁止放置**：
- ❌ repo-root 的 `./docs/governance`
- ❌ 任何其他位置的 `docs/governance/`
- ❌ 領域特定的治理規則（應放在 `docs/domain/GOVERNANCE_RULES.md`）

**檢查方法**：
- 絕對路徑必須包含 `xuance-commander-core/docs/governance/`

**命名規則**：
- 格式：`UPPERCASE_WITH_UNDERSCORES.md`
- 範例：`FILE_WRITE_LOCATION_RULE.md`, `CURSOR_TASK_PACKAGE_RULE.md`

---

### 🎯 領域文件（Domain Files）

#### 領域規格與設計（Domain Specifications & Design）

**放置位置**：`xuance-commander-core/docs/domain/`

**子資料夾結構**：
- `advisory/`：顧問師相關的領域規格（R1-R5）
- `output/`：領域輸出規格（如 `P0-2_OUTPUT_CONTRACT.md`）
- `ci/`：CI 測試規格
- `design/`：領域設計文件（如 `P0-5_UI_DESIGN_REQUIREMENTS.md`）
- `research/`：研究資料（RESEARCH，可引用但需標註來源）
- `snapshots/`：領域快照
- `metrics/`：指標定義
- `engine_assets/`：引擎資產
- `facets/`：Facet 定義文件（非 JSON 數據）

**包含類型**：
- Facet 設計原則（如 `FACET_DESIGN_PRINCIPLES.md`）
- Facet 元數據映射（如 `FACET_META_MAP.md`）
- 領域治理規則（如 `GOVERNANCE_RULES.md`）
- 領域 SSOT 索引（如 `SSOT_INDEX.md`）
- 階段快照提取（如 `P0-3_SNAPSHOT_EXTRACT.md`）

**禁止放置**：
- ❌ repo-root 的 `./docs/domain`
- ❌ 領域 JSON 數據（應放在 `domain/` 下）

#### 領域數據文件（Domain Data Files）

**放置位置**：`xuance-commander-core/domain/`

**子資料夾結構**：
- `manifests/`：領域 manifest 文件（JSON）
- `compiled/`：編譯後的 compiled facet（JSON，如 `income_expansion_pressure.compiled.v1.0.json`）
- `facets/`：Facet 定義（JSON）
- `questions/`：題目數據（JSON）
- `narratives/`：敘事數據（JSON）
- `recommendations/`：建議數據（JSON）
- `riskchains/`：風險鏈數據（JSON）

**命名規則**：
- 格式：`<facet_id>.<type>.v<version>.json`
- 範例：`income_expansion_pressure.compiled.v1.0.json`

---

### 👥 顧問文件（Advisor Files）

**放置位置**：`xuance-commander-core/docs/gem/`

**子資料夾結構**：
- `runs/`：顧問輸出（所有顧問師的產出，建議稿）
  - 命名：`RUN_<Phase>_<Task>_<Role>_<Date>.md` 或 `<Phase>_<ROLE>_<DATE>.md`
  - 範例：`RUN_P0-3_R1_20260106.md`, `P0-5_CHIEF_COMMANDER_REVIEW_20260109.md`
- `profiles/`：顧問師角色定義（由 `AI_ADVISORY_ROLES.md` 定義）
- `briefs/`：**已遷移**（見下方任務包管理說明）

**規則**：
- 所有顧問輸出（建議稿）必須寫入 `docs/gem/runs/`
- 顧問輸出不得直接寫入 domain，必須經過指揮官審核
- **顧問任務包和 Brief 已遷移至 `docs/task_packets/`（見下方任務包管理）**

---

### 📦 任務包文件（Task Packet Files）【新增分類】

**放置位置**：`xuance-commander-core/docs/task_packets/`

**⚠️ 重要更新（2026-01-10）**：任務包已集中管理，避免散落在不同位置。

**子資料夾結構**：
- `phase/`：階段任務包索引（階段任務包實際位置在 `P0-X/`）
  - 用途：存放階段任務包的索引或引用
  - 實際文件：`P0-X/P0-X_TASK_PACKET.md`（保留在階段資料夾）
  - 索引：`docs/task_packets/phase/README.md`
- `advisor/task_packages/`：顧問任務包（給顧問師的完整任務包）
  - 命名：`TASK_PACKAGE_<Phase>_<Task>.md`
  - 範例：`TASK_PACKAGE_P0-5_UI_INTEGRATION.md`, `TASK_PACKAGE_P0-4_FACET_PORTABILITY.md`
  - 特徵：包含完整的任務背景、歷史狀態、已完成結果、下一步目標
- `advisor/briefs/`：顧問 Brief（給特定顧問角色的輸入包）
  - 命名：`BRIEF_<Phase>_<Task>_<Role>.md` 或 `BRIEF_<Phase>_<Task>_<Role>_<SubTask>.md`
  - 範例：`BRIEF_P0-5_UI_narrative_R2.md`, `BRIEF_P0-5_UI_bilingual_R5.md`
  - 特徵：針對特定顧問角色（R1-R5），更具體、針對性更強

**規則**：
- **階段任務包**：保留在 `P0-X/P0-X_TASK_PACKET.md`（屬於階段管理文件），在 `docs/task_packets/phase/` 建立索引
- **顧問任務包**：必須寫入 `docs/task_packets/advisor/task_packages/`
- **顧問 Brief**：必須寫入 `docs/task_packets/advisor/briefs/`
- **任務包索引**：所有任務包都應在 `docs/task_packets/INDEX.md` 中記錄

**分類決策流程**：
```
1. 是階段級別的完整任務包嗎？（給 GPT/Gemini）
   → 是 → 階段任務包 → P0-X/P0-X_TASK_PACKET.md（在 docs/task_packets/phase/ 建立索引）
   → 否 → 繼續

2. 是給顧問師的完整任務包嗎？（包含完整背景）
   → 是 → 顧問任務包 → docs/task_packets/advisor/task_packages/
   → 否 → 繼續

3. 是給特定顧問角色的輸入包嗎？（更具體）
   → 是 → 顧問 Brief → docs/task_packets/advisor/briefs/
   → 否 → 需要明確分類
```

**相關文件**：
- 任務包集中管理說明：`docs/task_packets/README.md`
- 任務包索引：`docs/task_packets/INDEX.md`
- 任務包模板：`codex/templates/TASK_PACKET_TEMPLATE.md`
- AI 協作框架：`docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`

---

### 📊 任務記錄文件（Task Records）

**放置位置**：`xuance-commander-core/docs/ops/`

**包含類型**：
- 任務記錄索引（如 `TASK_RECORDS_INDEX.md`）
- 任務記錄摘要（如 `TASK_RECORDS_SUMMARY.md`，用於快照）
- 健康檢查記錄（如 `HEALTH_CHECK_RECORDS.md`）
- 指揮官自我掌控協議（如 `COMMANDER_AUTOPILOT_PROTOCOL.md`）
- 運營相關文件

**禁止放置**：
- ❌ AI 協作框架（應放在 `docs/governance/`）
- ❌ 流程定義（應放在 `docs/process/`）

---

### 🔄 流程文件（Process Files）

**放置位置**：`xuance-commander-core/docs/process/`

**包含類型**：
- 工作流程定義（如 `WORKFLOW.md`）
- 階段流程說明

**禁止放置**：
- ❌ AI 協作框架（應放在 `docs/governance/`）
- ❌ 任務記錄（應放在 `docs/ops/`）

---

### 📝 決策記錄（Architecture Decision Records）

**放置位置**：`xuance-commander-core/docs/adr/`

**命名規則**：
- 格式：`ADR_<序號>_<簡短描述>.md`
- 範例：`ADR_0004_ai_advisory_roles_and_gem_protocol.md`

**規則**：
- 任何結構性變更必須新增 ADR
- ADR 必須經過使用者批准

---

### 📦 階段文件（Phase Files）

**放置位置**：`xuance-commander-core/P0-<編號>/`

**命名範例**：
- `P0-3/`：P0-3 階段文件
- `P0-4/`：P0-4 階段文件
- `P0-4.5/`：P0-4.5 階段文件
- `P0-5/`：P0-5 階段文件

**包含類型**：
- 階段憲章（如 `P0-5_CHARTER.md`）
- **階段任務包**（如 `P0-5_TASK_PACKET.md`）【重要：階段任務包保留在階段資料夾，並在 `docs/task_packets/phase/` 建立索引】
- 階段架構文件（如 `P0-5_UI_ARCHITECTURE.md`）
- 階段規格文件（如 `P0-5_UI_INTEGRATION_SPEC.md`）
- 階段日誌（如 `P0-4_PHASE_LOG.md`）
- 階段檢查清單（如 `P0-4_FINAL_CHECKLIST.md`）
- 階段交接摘要（如 `P0-4_HANDOFF_SUMMARY.md`）

**規則**：
- 階段相關的管理文件放在階段資料夾
- **階段任務包**：保留在階段資料夾（屬於階段管理文件），並在 `docs/task_packets/phase/README.md` 建立索引
- 領域規格相關的文件應放在 `docs/domain/`

**任務包管理**：
- 階段任務包實際位置：`P0-X/P0-X_TASK_PACKET.md`
- 階段任務包索引：`docs/task_packets/phase/README.md`
- 完整任務包索引：`docs/task_packets/INDEX.md`

---

### 💾 記憶文件（Memory Files）

**放置位置**：`xuance-commander-core/memory/`

**子資料夾結構**：
- `briefs/`：簡報文件
  - `CURRENT.md`：當前狀態摘要
  - `COMMAND_BRIEF.md`：指揮官簡報（preflight 生成）
  - `MASTER_MIN_SYNC_PACKET.md`：最小同步包
  - 其他簡報文件
- `changes/`：變更記錄
  - `CHANGELOG.md`：變更日誌
- `index/`：索引文件
  - `INDEX.md`：記憶索引
  - `COMMANDER_ENTRYPOINTS.md`：指揮官入口
- `state/`：狀態文件（如 `master_generation_state.txt`）

**規則**：
- 記憶文件只保留短摘要（<= 300 行）
- 詳細內容一律拆到 domain/ 或 docs/adr/ 或 docs/ops/

---

### 🔧 工具腳本（Tools & Scripts）

**放置位置**：`xuance-commander-core/tools/`

**包含類型**：
- 建置腳本（如 `build_master_sync_packet.sh`）
- 健康檢查腳本（如 `xc_health_check.sh`）
- 預檢腳本（如 `preflight.sh`）
- 其他工具腳本

---

### 📤 輸出文件（Output Files）

**放置位置**：`xuance-commander-core/out/`

**包含類型**：
- 聊天封包（如 `CHAT_PACKET.md`）
- 盤點報告（如 `inventory/`）
- 工具審計報告（如 `tool_audit/`）
- 顧問包（如 `advisor_packs/`）

**規則**：
- 輸出文件不得作為 SSOT（單一真實來源）
- 輸出文件僅供參考
- 輸出文件可以隨時重新生成

---

### 🗑️ 臨時文件（Temporary Files）

**放置位置**：`xuance-commander-core/tmp/`

**子資料夾結構**：
- `audit/`：審計報告
- `health_check/`：健康檢查輸出
- 其他臨時文件

**規則**：
- 臨時文件不得作為證據
- 臨時文件不得被引用為決策依據
- 臨時文件可以隨時清理

---

### 📚 日誌文件（Logs）

**放置位置**：`xuance-commander-core/logs/`

**子資料夾結構**：
- `preflight/`：預檢日誌
- `alerts/`：警示日誌
- `inventory/`：盤點日誌

**規則**：
- 日誌文件不得作為決策依據

---

### 🔬 Legacy 文件（Legacy Files）

**放置位置**：`xuance-commander-core/docs/legacy/`

**子資料夾結構**：
- `115_1_3_my-first-app_failed/`：舊失敗版本（LEGACY_FAILED）
- `archived_old_system_structure/`：**舊制度結構封存**（為迎合 GPT 作為總指揮時的舊制度）

**舊制度結構封存說明**：
- **位置**：`docs/legacy/archived_old_system_structure/`
- **內容**：
  - `full_min_snapshots/`：FULL 和 MIN 快照系統（舊快照系統，已由 MASTER_SYNC 取代）
  - `root_duplicate_structure/`：根目錄重複結構（codex、memory、tools）
- **封存原因**：這些是為了迎合 GPT 作為總指揮時的舊制度，現已採用新架構（Cursor 作為總工程師 + 總指揮）
- **狀態**：ARCHIVED（已封存，僅供參考，暫時不會用到）

**規則**：
- Legacy 僅作反例/零件庫
- Legacy 不得直接作為現行設計依據
- Legacy 需經裁決才可復用
- **舊制度文件已封存**：舊的 FULL/MIN 快照系統和根目錄重複結構已封存，不應再使用

---

## 三、重複文件清理規則

### 識別重複文件的標準

1. **相同標題的文件**：如果在不同位置有相同或非常相似的文件
2. **相同內容的文件**：文件內容完全相同或高度相似
3. **相似主題的文件**：描述同一主題但放在不同位置

### 重複文件的處理規則

1. **保留權威版本**：
   - 治理文件：保留 `docs/governance/` 下的版本
   - 流程文件：保留 `docs/process/` 下的版本
   - 運營文件：保留 `docs/ops/` 下的版本

2. **其他版本處理**：
   - 如果內容完全相同：刪除其他位置的重複版本
   - 如果內容有差異：先比較差異，合併後保留權威版本
   - 如果是舊版本：標記為 legacy 或直接刪除

3. **合併相似文件**：
   - 如果多個文件描述同一主題但角度不同，應合併到一個文件
   - 合併時保留所有有價值的內容

### 當前已知的重複文件清單

#### AI 協作框架相關文件（已清理和待處理）

**權威版本**：`docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`（最終參考制度結案版本 v1.0）

**已清理的重複版本**：
- ✅ `docs/ops/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`（已刪除 - 2026-01-10）
- ✅ `docs/process/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`（已刪除 - 2026-01-10）

**待處理的相似文件**（需進一步檢查）：
- ❓ `docs/governance/CURSOR_GPT_GEMINI_TASK_PACKET_COLLABORATION_FRAMEWORK.md`（353行，8章，可能有獨特內容）
- ❓ `docs/governance/CURSOR_GPT_GEMINI_TASK_PACKET_FRAMEWORK.md`（307行，8章，有「GPT 升華任務包的建議方法」等獨特章節）

**處理建議**：
- 這些文件可能包含一些獨特的範例或說明
- 建議：保留權威版本作為主要參考，其他文件可標記為「DEPRECATED」或合併到權威版本
- 如果需要引用其他版本中的獨特內容，應在權威版本中補充或引用

**狀態**：已記錄，建議在後續整理中統一處理

---

## 四、文件放置決策流程（寫入前必執行）

### 步驟 1：判斷文件性質

1. **治理規則或制度** → `docs/governance/`
2. **領域規格或設計** → `docs/domain/`
3. **領域數據（JSON）** → `domain/`
4. **顧問任務包** → `docs/gem/briefs/`
5. **顧問輸出（建議稿）** → `docs/gem/runs/`
6. **任務記錄** → `docs/ops/`
7. **流程定義** → `docs/process/`
8. **決策記錄** → `docs/adr/`
9. **階段文件** → `P0-<編號>/`
10. **記憶文件** → `memory/`
11. **輸出文件** → `out/`
12. **臨時文件** → `tmp/`
13. **日誌文件** → `logs/`

### 步驟 2：檢查 Canon Path

- ✅ 確認目標路徑是否以 `xuance-commander-core/` 開頭
- ✅ 確認目標路徑是否符合上述 Canon 規則
- ✅ 確認是否使用了相對路徑（如 `out/`, `tmp/`）→ **必須改為完整 Canon 路徑**

### 步驟 3：檢查是否重複

- ✅ 檢查目標位置是否已有相同或相似的文件
- ✅ 如果有重複，先檢查是否需要合併或刪除
- ✅ 如果內容完全相同，應使用現有文件而非創建新文件

### 步驟 4：檢查命名規則

- ✅ 確認文件名是否符合命名規則
- ✅ 確認文件名是否與現有文件衝突
- ✅ 確認文件名是否清楚表達文件內容

### 步驟 5：檢查是否需要登記

- ✅ 新資料夾類型 → 需要登記（見 `ARTIFACT_REGISTRY_RULE.md`）
- ✅ 新資料線 → 需要登記
- ✅ 新證據/記錄型文件 → 需要登記

---

## 五、快速參考表（決策樹）

### 文件分類決策樹

```
1. 是治理規則、制度、協議嗎？
   → 是 → docs/governance/
   → 否 → 繼續

2. 是領域規格、設計、原則嗎？
   → 是 → docs/domain/
   → 否 → 繼續

3. 是領域數據（JSON）嗎？
   → 是 → domain/
   → 否 → 繼續

4. 是階段任務包嗎？（給 GPT/Gemini 的完整任務包）
   → 是 → P0-<編號>/（在 docs/task_packets/phase/ 建立索引）
   → 否 → 繼續

5. 是顧問任務包嗎？（給顧問師的完整任務包，包含完整背景）
   → 是 → docs/task_packets/advisor/task_packages/
   → 否 → 繼續

6. 是顧問 Brief 嗎？（給特定顧問角色的輸入包，更具體）
   → 是 → docs/task_packets/advisor/briefs/
   → 否 → 繼續

7. 是顧問輸出（建議稿）嗎？
   → 是 → docs/gem/runs/
   → 否 → 繼續

6. 是任務記錄、運營文件嗎？
   → 是 → docs/ops/
   → 否 → 繼續

7. 是流程定義嗎？
   → 是 → docs/process/
   → 否 → 繼續

8. 是決策記錄（ADR）嗎？
   → 是 → docs/adr/
   → 否 → 繼續

9. 是階段管理文件嗎？
   → 是 → P0-<編號>/
   → 否 → 繼續

10. 是階段任務包嗎？（給 GPT/Gemini 的完整任務包）
    → 是 → P0-<編號>/（在 docs/task_packets/phase/ 建立索引）
    → 否 → 繼續

11. 是顧問任務包嗎？（給顧問師的完整任務包）
    → 是 → docs/task_packets/advisor/task_packages/
    → 否 → 繼續

12. 是顧問 Brief 嗎？（給特定顧問角色的輸入包）
    → 是 → docs/task_packets/advisor/briefs/
    → 否 → 繼續

13. 是階段管理文件嗎？（非任務包的其他階段文件）
    → 是 → P0-<編號>/
    → 否 → 繼續

14. 是記憶文件嗎？
    → 是 → memory/
    → 否 → 繼續

15. 是輸出文件嗎？
    → 是 → out/
    → 否 → 繼續

12. 是臨時文件嗎？
    → 是 → tmp/
    → 否 → 繼續

13. 是日誌文件嗎？
    → 是 → logs/
    → 否 → 需要明確分類
```

---

## 六、常見混淆情況與處理方式

### 混淆情況 1：AI 協作框架應該放在哪裡？

**正確位置**：`docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`

**錯誤位置**：
- ❌ `docs/ops/`（這是任務記錄，不是治理規則）
- ❌ `docs/process/`（這是流程定義，不是協作框架）

**處理方式**：只保留 `docs/governance/` 下的權威版本，刪除其他位置的重複版本

---

### 混淆情況 2：任務包應該放在哪裡？

**⚠️ 重要更新（2026-01-10）**：任務包已集中管理，避免散落在不同位置。

**階段任務包**：`P0-<編號>/P0-<編號>_TASK_PACKET.md`
- 範例：`P0-5/P0-5_TASK_PACKET.md`
- **實際位置**：保留在階段資料夾（屬於階段管理文件）
- **索引位置**：`docs/task_packets/phase/README.md`

**顧問任務包**：`docs/task_packets/advisor/task_packages/TASK_PACKAGE_<Phase>_<Task>.md`
- 範例：`docs/task_packets/advisor/task_packages/TASK_PACKAGE_P0-5_UI_INTEGRATION.md`
- **舊位置**：`docs/gem/briefs/`（已遷移）

**顧問 Brief**：`docs/task_packets/advisor/briefs/BRIEF_<Phase>_<Task>_<Role>.md`
- 範例：`docs/task_packets/advisor/briefs/BRIEF_P0-5_UI_narrative_R2.md`
- **舊位置**：`docs/gem/briefs/`（已遷移）

**區別**：
- **階段任務包**：給 GPT/Gemini 的主要任務包，放在階段資料夾，在 `docs/task_packets/phase/` 建立索引
- **顧問任務包**：給顧問師的完整任務包（包含完整背景），放在 `docs/task_packets/advisor/task_packages/`
- **顧問 Brief**：給特定顧問角色的輸入包（更具體），放在 `docs/task_packets/advisor/briefs/`

**集中管理**：
- 所有任務包的索引：`docs/task_packets/INDEX.md`
- 任務包集中管理說明：`docs/task_packets/README.md`

---

### 混淆情況 3：流程定義 vs 運營文件 vs 治理文件

**流程定義**（`docs/process/`）：
- 定義「如何執行任務」的流程
- 範例：`WORKFLOW.md`（定義工作流程）

**運營文件**（`docs/ops/`）：
- 記錄「任務執行結果」的文件
- 範例：`TASK_RECORDS_INDEX.md`（任務記錄索引）

**治理文件**（`docs/governance/`）：
- 定義「規則、制度、協議」的文件
- 範例：`CURSOR_TASK_PACKAGE_RULE.md`（任務包規則）

---

### 混淆情況 4：領域規格 vs 階段文件

**領域規格**（`docs/domain/`）：
- 定義領域相關的設計、規格、原則
- 範例：`docs/domain/output/P0-2_OUTPUT_CONTRACT.md`（輸出契約）

**階段文件**（`P0-<編號>/`）：
- 階段相關的管理文件（憲章、日誌、檢查清單等）
- 範例：`P0-5/P0-5_CHARTER.md`（階段憲章）

**區別**：
- 領域規格：描述「什麼」和「為什麼」（設計、規格）
- 階段文件：描述「如何管理階段」（管理文件）

---

## 七、文件命名規範（補充）

### 治理文件命名

**格式**：`UPPERCASE_WITH_UNDERSCORES.md`

**範例**：
- `FILE_WRITE_LOCATION_RULE.md`
- `CURSOR_TASK_PACKAGE_RULE.md`
- `AI_ADVISORY_ROLES.md`

---

### 領域文件命名

**格式**：`PascalCase` 或 `UPPERCASE_WITH_UNDERSCORES.md` 或 `P<數字>-<數字>_<描述>.md`

**範例**：
- `FACET_DESIGN_PRINCIPLES.md`
- `P0-3_NARRATIVE_SHARPNESS.md`
- `P0-2_OUTPUT_CONTRACT.md`

---

### 階段文件命名

**格式**：`P<數字>-<數字>_<類型>.md`

**範例**：
- `P0-5_CHARTER.md`
- `P0-5_TASK_PACKET.md`
- `P0-5_UI_ARCHITECTURE.md`

---

### 顧問文件命名

**任務包格式**：`BRIEF_<Phase>_<Task>_<Role>.md` 或 `TASK_PACKAGE_<Phase>_<Task>.md`

**輸出格式**：`RUN_<Phase>_<Task>_<Role>_<Date>.md` 或 `<Phase>_<ROLE>_<DATE>.md`

**範例**：
- `BRIEF_P0-5_UI_narrative_R2.md`
- `TASK_PACKAGE_P0-5_UI_INTEGRATION.md`
- `RUN_P0-3_R1_20260106.md`
- `P0-5_CHIEF_COMMANDER_REVIEW_20260109.md`

---

### 決策記錄命名

**格式**：`ADR_<序號>_<簡短描述>.md`

**範例**：
- `ADR_0004_ai_advisory_roles_and_gem_protocol.md`
- `ADR_0006_question_modality_scope_lock.md`

---

## 八、任務包生成前檢查清單

### 在生成任務包前，必須檢查：

- [ ] 是否已參考 `CURSOR_FILE_PLACEMENT_RULE.md`（本文件）？
- [ ] 任務包將放在哪個位置？
  - 階段任務包 → `P0-<編號>/P0-<編號>_TASK_PACKET.md`
  - 顧問任務包 → `docs/gem/briefs/TASK_PACKAGE_<Phase>_<Task>.md`
- [ ] 任務包中引用的文件路徑是否為完整 Canon 路徑？
- [ ] 是否檢查了是否有重複的任務包？
- [ ] 任務包命名是否符合規範？

### 在寫入任何文件前，必須檢查：

- [ ] 目標位置是否符合本規範？
- [ ] 是否使用了完整 Canon 路徑？
- [ ] 文件名是否符合命名規範？
- [ ] 是否檢查了是否有重複文件？
- [ ] 是否需要登記新資料夾或資料線？

---

## 九、引用本規範的方式

### 在任務包中引用

在任務包開頭明確引用：

```markdown
**文件放置規範**：請參考 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

**任務包位置**：`xuance-commander-core/P0-5/P0-5_TASK_PACKET.md`
```

### 在系統提示中引用

在 COMMAND_BRIEF 或系統提示中引用：

```markdown
**文件放置規範**：每次寫入文件前，請參考 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
```

### 使用者引用方式

使用者可以說：
- 「請參考你的文件放置規範」
- 「請參考 CURSOR_FILE_PLACEMENT_RULE」
- 「請依照文件組織規範放置文件」

這些都指向本文件。

---

## 十、相關規範文件索引

### 核心規範文件
- `FILE_ORGANIZATION_GUIDE.md`：詳細的文件組織指南
- `FILE_WRITE_LOCATION_RULE.md`：文件寫入位置規則（硬規則）
- `GLOBAL_FILE_CANON.md`：全域檔案憲法（Canon Path 定義）
- `ARTIFACT_REGISTRY_RULE.md`：產物登記制度（新資料夾/資料線登記）
- `ABSOLUTE_REFERENCE_RULE.md`：絕對路徑規則（禁止相對路徑）
- `SHADOW_PATH_REGISTRY.md`：影子路徑登記（允許存在但不可引用）

### 協作框架文件
- `CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`：AI 協作框架（權威版本，位於 `docs/governance/`）
- `CURSOR_TASK_PACKAGE_RULE.md`：任務包規則

### 流程文件
- `WORKFLOW.md`：工作流程定義（位於 `docs/process/`）

---

## 十一、狀態與版本

**版本**：v1.0  
**建立日期**：2026-01-10  
**狀態**：ACTIVE | REFERENCE（每次任務前必引用）  
**適用範圍**：所有文件寫入操作、任務包生成操作

**更新記錄**：
- v1.0（2026-01-10）：初始版本，整合文件組織規則、重複文件清理規則、快速參考表

---

**— 本文件作為 Cursor 文件放置的權威規範，每次執行任務前必引用。**
