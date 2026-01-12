# 核心制度（Essential Rules）

**目的**：讓 AI 快速了解必須遵守的核心制度，不需要讀完 70+ 個治理文件。

**使用時機**：
- 每次開始工作前
- 遇到不確定應該遵守什麼規則時
- 需要快速確認核心規則時

**更新原則**：當有新的核心制度時，更新此文件。定期（每月）檢視，確保核心制度是最新的。

---

## P0（最高優先級，每次工作前必須確認）

### 1. 文本主控硬規則（TEXT_ONLY_EXECUTION_RULES）

**文件**：`docs/governance/TEXT_ONLY_EXECUTION_RULES.md`

**核心原則**：
- 對話上下文只能作為參考，不得作為主目標與主進度依據
- 主目標與主進度只允許引用：
  - `charter/CHARTER.md`
  - `roadmap/ROADMAP.md`
  - `memory/briefs/CURRENT.md`
  - `docs/adr/*`

**必須遵守**：
- 未寫入文本的結論視為不存在
- 所有決策以文本為準，不以對話上下文為準

---

### 2. 文件放置規範（CURSOR_FILE_PLACEMENT_RULE）

**文件**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

**核心原則**：
- 每個文件類型都有明確的放置位置
- 不得隨意放置文件
- 每次寫入文件前，必須檢查此規範

**必須遵守**：
- 治理文件 → `docs/governance/`
- 任務狀態 → `docs/ops/TASK_STATUS.md`（統一入口，不帶時間戳記）
- 階段任務 → `P0-X/`
- 領域規格 → `docs/domain/`
- 領域數據 → `domain/`

**詳細規則**：見 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

---

### 3. 寫入前現況確認規則（PREWRITE_STATE_CONFIRMATION）

**文件**：`docs/governance/PREWRITE_STATE_CONFIRMATION.md`

**核心原則**：
- 任何「寫入行為」都不得基於推測、記憶或假設
- 寫入前必須明確列出「目前理解的既有狀態」

**必須遵守**：
1. 明確列出既有目標（以 `charter/CHARTER.md` 為準）
2. 明確列出既有進度（以 `roadmap/ROADMAP.md` 為準）
3. 明確列出既有已完成事項（以 `memory/briefs/CURRENT.md` 與 `CHANGELOG` 為準）
4. 將上述理解以白話方式呈現給使用者確認
5. 僅在使用者明確確認後，寫入行為才視為有效

---

### 4. 進度重新校準規則（PROGRESS_RECALIBRATION）

**文件**：`docs/governance/PROGRESS_RECALIBRATION.md`

**核心原則**：
- 主動偵測並阻斷進度漂移，確保主線一致

**觸發條件**（任一條件滿足時必須重新校準）：
- Active Focus 連續兩個工作循環未更新
- 正在做的工作不在 `ROADMAP.md` 上
- COMMAND_BRIEF 與 `ROADMAP.md` 內容衝突
- 長時間處於 OPS 工作且未回到主線

**必須遵守**：
- Commander 不得自行校正進度，須由使用者批准

---

## P1（高優先級，執行任務時必須遵守）

### 5. AI 角色架構（AI_ROLES_CURSOR_ARCHITECTURE）

**文件**：`docs/governance/AI_ROLES_CURSOR_ARCHITECTURE.md`

**核心原則**：
- Cursor 作為總指揮和總工程師，擁有完整代碼庫可見性和決策權
- GPT/GEM/GEMINI 作為單純任務執行者，負責執行任務包

**必須遵守**：
- 所有決策必須由 Cursor 負責
- 任務執行者不得擁有決策權
- 任務執行者不得直接寫入正式文件

---

### 6. 任務包規則（CURSOR_TASK_PACKAGE_RULE）

**文件**：`docs/governance/CURSOR_TASK_PACKAGE_RULE.md`

**核心原則**：
- 任務包必須包含所有必要的背景資料
- 任務執行者能夠僅憑任務包內容完成任務

**必須遵守**：
- 任務包必須包含：專案背景、過往任務回顧、已完成結果、下一步目標
- 任務包必須包含所有必要的規範引用
- 任務包必須明確標註執行對象

---

### 7. 任務完成報告協議（TASK_COMPLETION_REPORT_PROTOCOL）

**文件**：`docs/governance/TASK_COMPLETION_REPORT_PROTOCOL.md`

**核心原則**：
- 所有任務完成後必須更新任務狀態
- 任務狀態統一追蹤在 `docs/ops/TASK_STATUS.md`

**必須遵守**：
- 任務完成後更新 `docs/ops/TASK_STATUS.md`
- 不要建立新的時間戳記檔案
- 詳細記錄保留在任務資料夾中

---

## P2（中優先級，需要時查閱）

### 8. 其他重要制度

**文件**：見 `docs/governance/GOVERNANCE_INDEX.md`

**包含類型**：
- 顧問升級制度
- 產品經營制度
- 文件組織指南
- 其他治理規則

**使用方式**：需要時查閱 `GOVERNANCE_INDEX.md` 找到對應文件

---

## 📋 快速檢查清單

### 每次工作前

- [ ] 已讀取 `charter/CHARTER.md`（終極目標）
- [ ] 已讀取 `docs/ops/TASK_STATUS.md`（當前狀態）
- [ ] 已讀取 `docs/governance/ESSENTIAL_RULES.md`（核心規則）
- [ ] 已讀取 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`（文件放置規範）
- [ ] 已執行 `bash tools/preflight.sh`
- [ ] 已讀取 `memory/briefs/COMMAND_BRIEF.md`

### 每次寫入文件前

- [ ] 已確認文件放置位置（參考 `CURSOR_FILE_PLACEMENT_RULE.md`）
- [ ] 已確認現有狀態（參考 `PREWRITE_STATE_CONFIRMATION.md`）
- [ ] 已確認不會與現有文件衝突

### 每次任務完成後

- [ ] 已更新 `docs/ops/TASK_STATUS.md`
- [ ] 已更新 `memory/briefs/CURRENT.md`（如需要）
- [ ] 已更新 `memory/changes/CHANGELOG.md`（如需要）

---

## 🔗 相關文件

- **完整治理索引**：`docs/governance/GOVERNANCE_INDEX.md`
- **文件放置規範**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
- **AI 上手指南**：`docs/ONBOARDING.md`

---

**最後更新**：2026-01-12  
**狀態**：ACTIVE  
**維護者**：Cursor（總指揮）
