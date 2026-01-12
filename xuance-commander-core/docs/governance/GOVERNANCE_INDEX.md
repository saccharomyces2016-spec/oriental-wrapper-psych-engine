# GOVERNANCE_INDEX

<!-- XUANCE_GOV_INVENTORY_SPRINT_BEGIN -->
## Governance Inventory Sprint（階段性盤點任務）— 提案

### 目標
在不追求一次性完美的前提下，建立「可維護、可稽核、可自動檢查」的制度結構，降低後期返工。

### 角色分工
- Cursor（總工程師）：負責 Repo 盤點稽核與報表輸出（檔案樹/分類/重複/衝突/過期/缺索引/owner 缺失）
- GPT（治理裁決者）：根據報表決定制度結構調整方案與取捨
- Codex（落地實作者）：依裁決修改檔案結構、補齊索引、加 CI 檢查、產出可重跑工具
- 人（最終決策者）：確認重大取捨與主線優先序

### Done Definition（完成定義）
1. 所有治理/同步/規則文件都有：分類、用途、讀者、更新頻率、Owner
2. GOVERNANCE_INDEX.md 成為唯一入口：不漏任何治理文件
3. MIN/FULL 分層完成：MIN 僅保留每日硬門檻；FULL 收錄完整規則與範例
4. 至少一個自動化 Gate：新增/變更治理文件若未更新 INDEX 或未標 Owner 則 fail

### 輸出物
- Inventory Report（Markdown + JSON）
- 改版後的檔案結構與 Index
- 自動化檢查（本機 preflight 或 CI）

### 執行者選擇（硬規則）
- 預設：Cursor 先做盤點與報表（只讀）
- GPT：只根據報表做裁決（不猜 repo 狀態）
- Codex：只在「落點/路徑/修改點」被報表與規則確認後，才做一次性落地修補
<!-- XUANCE_GOV_INVENTORY_SPRINT_END -->



## Cursor Audit Gap List（階段性目標：GOV-0）

來源：xuance-commander-core/tmp/audit/CURSOR_FULL_SYSTEM_SCAN.md（取證用，非 SSOT）

### Missing (Cursor audit) — 必須補齊（17）
> 規則：本清單未歸零前，視為「治理未封板」，主線可做但不得引入新治理負債。

- AUTOMATED_CANON_AUDIT_RULE.md
- FILENAME_COLLISION_RULE.md
- TIMESTAMP_DIRECTORY_AUTOMATION.md
- EVIDENCE_REFERENCE_TRACKING.md
- LEGACY_UPGRADE_PROTOCOL.md
- GOVERNANCE_RULE_VERSIONING.md
- GOVERNANCE_CI_CD_RULE.md
- GOVERNANCE_VIOLATION_SEVERITY.md
- GOVERNANCE_RULE_TESTING.md
- GOVERNANCE_ENFORCEMENT_TRACKING.md
- GOVERNANCE_INHERITANCE.md
- GOVERNANCE_AUTO_FIX_RULE.md
- RULE_CONFLICT_RESOLUTION.md
- RULE_EXECUTION_ORDER.md
- ONBOARDING_GOVERNANCE_GUIDE.md
- VIOLATION_REPAIR_GUIDE.md
- RULE_UPDATE_NOTIFICATION.md

### Present (Cursor audit) — 已存在（6）
- GLOBAL_PATH_CANON.md
- SINGLE_SOURCE_RULES.md
- ABSOLUTE_REFERENCE_RULE.md
- ARTIFACT_REGISTRY_RULE.md
- SHADOW_PATH_REGISTRY.md
- GOVERNANCE_INDEX.md
- CURSOR_USAGE_RULE.md

### 最小落盤格式（所有 Missing 文件一律遵守）
每份治理文件至少要包含：
1) Purpose（這條規則解決什麼問題）
2) Scope（適用範圍 / 不適用範圍）
3) Do / Don’t（可做 / 禁止）
4) Procedure（如何執行；含「出錯怎麼修」）
5) Evidence（要留下什麼證據；指向哪個檔案）
6) Acceptance（怎樣算完成；可重跑驗收點）

### 優先順序（先補最會造成返工的）
P0（先做）：
- GOVERNANCE_VIOLATION_SEVERITY.md
- VIOLATION_REPAIR_GUIDE.md
- RULE_EXECUTION_ORDER.md
- AUTOMATED_CANON_AUDIT_RULE.md

P1（接著做）：
- GOVERNANCE_CI_CD_RULE.md
- TIMESTAMP_DIRECTORY_AUTOMATION.md
- FILENAME_COLLISION_RULE.md
- EVIDENCE_REFERENCE_TRACKING.md

P2（最後補齊）：
- GOVERNANCE_RULE_VERSIONING.md
- GOVERNANCE_RULE_TESTING.md
- GOVERNANCE_ENFORCEMENT_TRACKING.md
- GOVERNANCE_INHERITANCE.md
- GOVERNANCE_AUTO_FIX_RULE.md
- RULE_CONFLICT_RESOLUTION.md
- ONBOARDING_GOVERNANCE_GUIDE.md
- RULE_UPDATE_NOTIFICATION.md
- LEGACY_UPGRADE_PROTOCOL.md

## HEALTH_CHECK
- HEALTH_CHECK_PLAN.md
- (Tool) tools/xc_health_check.sh
- (Records) docs/ops/HEALTH_CHECK_RECORDS.md
- Status: ACTIVE | GOVERNANCE_CRITICAL
- Note: 健康檢查 = 治理結構全面盤點（Governance Inventory）
- Note: 健康檢查記錄索引在 docs/ops/HEALTH_CHECK_RECORDS.md

## FULL_SNAPSHOT_RULES
- Status: DELETED（已刪除，自 2026-01-10 起）
- Note: 已轉換為 Cursor 架構，不再使用快照系統

## GOVERNANCE_IMPROVEMENT_PROPOSAL_01
- proposals/GOVERNANCE_IMPROVEMENT_PROPOSAL_01.md
- Status: IN_PROGRESS
- Note: 總工程師（Cursor）制度改進提案

## AI_ROLES_CURSOR_ARCHITECTURE（新增）
- Status: ACTIVE（自 2026-01-10 起生效）
- Priority: CRITICAL
- Path: docs/governance/AI_ROLES_CURSOR_ARCHITECTURE.md
- Scope: AI 角色架構（Cursor 架構版本）
- Note: **核心角色定義文件**，明確 Cursor 為總指揮和總工程師，GPT/GEM/GEMINI 為任務執行者
- Note: 取代已刪除的 CURSOR_GPT_GEMINI_* 框架文件

## FOLDER_STRUCTURE_INTEGRATION_GUIDE（新增）
- Status: ACTIVE（自 2026-01-10 起生效）
- Priority: HIGH
- Path: docs/governance/CURSOR_FILE_PLACEMENT_RULE.md
- Scope: 資料夾結構整合指南（雙重保障規範）
- Note: **雙重保障規範**，與 CURSOR_FILE_PLACEMENT_RULE.md 配合使用，防止長期工作後資料散落
- Note: 包含完整的資料夾結構對照表和決策流程

## DATA_REORGANIZATION_FINAL_REPORT（新增）
- Status: COMPLETED（自 2026-01-10 起）
- Priority: REFERENCE
- Path: docs/governance/DATA_REORGANIZATION_FINAL_REPORT.md
- Scope: 資料重組最終報告
- Note: 記錄 2026-01-10 的資料重組執行結果，包括已刪除文件、已更新文件、架構變更總結

## Additional Governance Files (Auto-indexed)
- ADVISOR_ITERATION_PROTOCOL.md
- ADVISOR_PACK_VERSIONING.md
- AI_ADVISORY_ROLES.md
- AI_PARTNERSHIP_PROTOCOL.md
- AUTONOMOUS_STOP_PROTOCOL.md
- BOOT_RULE.md
- CODEBOOK.md
- COMMAND_BRIEF_VALIDITY.md
- CURSOR_AUDIT_GOVERNANCE_RULE.md
- CURSOR_GIT_TREE_AUDIT_TASK.md
- CURSOR_LIMITATION_REVIEW_RULE.md
- DOCS_GEM_CANON_RULE.md（已刪除，自 2026-01-10 起）
- EXECUTION_ASSIGNMENT_RULE.md
- EXECUTIVE_RESPONSE_MODE.md
- CURSOR_FILE_PLACEMENT_RULE.md
- CURSOR_FILE_PLACEMENT_RULE.md
- CURSOR_FILE_PLACEMENT_RULE.md（文件放置規範，每次任務前必引用）
- GOVERNANCE_GAPS.md
- IDEA_GOVERNANCE.md
- INCIDENT_2026-01-06_docs_gem_drift.md
- LEGACY_REFERENCE_RULES.md
- LEGACY_REFERENCE_STRATEGY.md（Legacy 參考資料使用策略，定義何時、如何向副指揮官和顧問師提供 legacy 參考資料）
- LEGACY_VAULTS.md
- LESSONS_LEARNED.md
- MANDATORY_ADVISORY_ESCALATION.md
- MANDATORY_ALERTS.md
- MANDATORY_MILESTONE_RECORDING_RULE.md
- MASTER_SYNC_PROTOCOL.md（已刪除，自 2026-01-10 起）
- MODE_SWITCHES.md
- OVERRIDE_POLICY.md
- PHASE_GATES.md
- PREWRITE_STATE_CONFIRMATION.md
- PRODUCT_STEWARDSHIP.md
- PROGRESS_RECALIBRATION.md
- QUESTION_QUALITY_ACCEPTANCE_RULE.md
- REMEMBER_MEANS_COMMAND_PACK_RULE.md
- REQUIRED_TEXT_SET.md
- RESEARCH_LEGACY_SEPARATION_RULE.md
- SMART_CONTEXT_SHARDING_RULE.md
- STATELESS_CONTINUITY_RULE.md
- SUPREME_AUTHORITY.md
- SYSTEM_CAPABILITIES.md
- TEXT_ONLY_EXECUTION_RULES.md
- USER_OVERRIDE_PROTOCOL.md
- ZERO_MEMORY_EXECUTION_PROTOCOL.md

## FULL_SNAPSHOT_RULES
- FULL_SNAPSHOT_RULES.md

## SNAPSHOT_REQUEST_PROTOCOL
- Status: DELETED（已刪除，自 2026-01-10 起）
- Note: 已轉換為 Cursor 架構，不再使用快照系統

## FILE_WRITE_LOCATION_RULE
- Status: ACTIVE
- Priority: CRITICAL
- Path: docs/governance/CURSOR_FILE_PLACEMENT_RULE.md
- Scope: All file write operations
- Note: 必須納入 MIN 快照，防止文件寫錯位置

## CURSOR_FILE_PLACEMENT_RULE
- Status: ACTIVE | REFERENCE（每次任務前必引用）
- Priority: CRITICAL
- Path: docs/governance/CURSOR_FILE_PLACEMENT_RULE.md
- Scope: 所有文件寫入操作、任務包生成操作
- Note: **Cursor 文件放置的權威規範，每次執行任務前必引用**
- Note: 包含完整的文件分類對照表、文件放置決策流程、重複文件清理規則
- Note: 使用者說「請參考你的規範」時，即指此文件
- Related: CURSOR_FILE_PLACEMENT_RULE.md, CURSOR_FILE_PLACEMENT_RULE.md, CURSOR_FILE_PLACEMENT_RULE.md

## MASTER_SNAPSHOT_USAGE_GUIDE
- Status: DELETED（已刪除，自 2026-01-10 起）
- Note: 已轉換為 Cursor 架構，不再使用快照系統，Cursor 直接讀取文件

## TASK_RECORDS_INDEX
- Status: ACTIVE
- Priority: HIGH
- Path: docs/ops/TASK_RECORDS_INDEX.md
- Scope: Task progress tracking and records
- Note: 統一記錄所有任務的進展與完成狀態

## TASK_RECORDS_SUMMARY
- Status: ACTIVE
- Priority: HIGH
- Path: docs/ops/TASK_RECORDS_SUMMARY.md
- Scope: Task summary for Commander and Deputy Commander（更新：自 2026-01-09 起）
- Note: 任務記錄摘要，給總指揮（Cursor）和副指揮官（GPT）參考，不再使用 MIN 快照

## CURSOR_COMMANDER_INTERFACE_RULE
- Status: SUPERSEDED（已取代，自 2026-01-09 起）
- Priority: ARCHIVED
- Path: docs/governance/CURSOR_COMMANDER_INTERFACE_RULE.md
- Scope: ~~Interface rules between Cursor and Commander GPT~~（舊架構）
- Note: ~~已由 CURSOR_DEPUTY_COMMANDER_INTERFACE_RULE.md 取代~~（新架構：Cursor 兼任總指揮，GPT 為副指揮官）

## CURSOR_DEPUTY_COMMANDER_INTERFACE_RULE
- Status: DELETED（已刪除，自 2026-01-10 起）
- Note: 已轉換為 Cursor 架構：Cursor 為總指揮和總工程師，GPT/GEM/GEMINI 為任務執行者，不再使用副指揮官架構
- 替代文件：`docs/governance/AI_ROLES_CURSOR_ARCHITECTURE.md`

## CURSOR_COMMANDER_ALERTS
- Status: SUPERSEDED（已取代，自 2026-01-09 起）
- Priority: ARCHIVED
- Path: docs/ops/CURSOR_COMMANDER_ALERTS.md
- Scope: ~~Alerts from Cursor to Commander GPT~~（舊架構）
- Note: ~~已由任務包模式取代~~（新架構：Cursor 兼任總指揮，任務包直接傳遞）

## SNAPSHOT_SLIMMING_PROPOSAL
- Status: PROPOSAL (部分已實施)
- Priority: HIGH
- Path: docs/governance/proposals/SNAPSHOT_SLIMNING_PROPOSAL.md
- Scope: Snapshot optimization and slimming strategy
- Note: 快照瘦身提案，已實施 CURRENT_SUMMARY，MIN 快照從 3102 行降至 1569 行

## CURSOR_GPT_COORDINATION_STRATEGY
- Status: PROPOSAL
- Priority: HIGH
- Path: docs/governance/proposals/CURSOR_GPT_COORDINATION_STRATEGY.md
- Scope: Coordination strategy between Cursor and GPT
- Note: Cursor 與 GPT 協調策略提案，說明混合控管模式

## BASIC_NORMS_ALWAYS_VISIBLE_RULE
- Status: ACTIVE（已更新，自 2026-01-10 起）
- Priority: HIGH
- Path: docs/governance/BASIC_NORMS_ALWAYS_VISIBLE_RULE.md
- Scope: 規範可見性規則（已更新為 Cursor 架構版本）
- Note: **重要變更**：不再使用 MIN 快照，改為規範必須寫在 `docs/governance/` 下，讓 Cursor 可以隨時讀取
- Note: 任務包中必須包含所有必要的規範引用，讓任務執行者可以根據任務包執行任務

## ADVISOR_QUESTION_OWNERSHIP_RULE
- Status: ACTIVE
- Priority: CRITICAL
- Path: docs/governance/ADVISOR_QUESTION_OWNERSHIP_RULE.md
- Scope: Rules for ownership and division of advisor question creation
- Note: 顧問提問分工規則，明確指揮官負責問題內容，總工程師負責封包和執行

## CURSOR_PROACTIVE_SUGGESTION_RULE
- Status: ACTIVE（更新：自 2026-01-09 起）
- Priority: HIGH
- Path: docs/governance/CURSOR_PROACTIVE_SUGGESTION_RULE.md
- Scope: Rules for Cursor to proactively suggest improvements to Deputy Commander's proposals
- Note: 允許總指揮（Cursor）基於專業判斷主動提出建議，副指揮官（GPT）可以提出建議，總指揮可以採納並執行

## GOVERNANCE_METAPHOR_COMPATIBILITY_RULE
- Status: ACTIVE
- Priority: HIGH
- Path: docs/domain/advisory/GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md
- Scope: Cross-Facet metaphor compatibility rule based on civilizational consistency
- Note: 定義基於文明原型一致性的隱喻相容性判準，明確詞彙可用性基於 Facet 主文明隱喻，不構成全域禁詞

## AI_COLLABORATION_ARCHITECTURE
- Status: ACTIVE（更新：自 2026-01-09 起）
- Priority: HIGH
- Path: docs/governance/AI_COLLABORATION_ARCHITECTURE.md
- Scope: AI 協作架構的治理層級文件，定義各 AI 角色的能力、限制、責任、權限
- Note: 總指揮（Cursor）的專業判斷和建議，評估現有制度並提出改善建議（已實施架構角色反轉：Cursor 兼任總指揮，GPT 為副指揮官）

## CURRENT_TASK_DETAILED_SUMMARY_RULE
- Status: SUPERSEDED（已取代，自 2026-01-09 起）
- Priority: ARCHIVED
- Path: docs/governance/CURRENT_TASK_DETAILED_SUMMARY_RULE.md
- Scope: ~~當前任務詳細摘要規則，確保總指揮 GPT 可以看到當前任務的完整關鍵信息~~（舊架構）
- Note: ~~已由任務包模式取代~~（新架構：總指揮直接產出包含完整信息的任務包）

## ARCHITECTURE_ROLE_REVERSAL_PROPOSAL
- Status: IMPLEMENTED（已實施，自 2026-01-09 起）
- Priority: HIGH
- Path: docs/governance/proposals/ARCHITECTURE_ROLE_REVERSAL_PROPOSAL.md
- Scope: 架構角色反轉提案，已實施：Cursor 兼任總指揮，GPT 為副指揮官
- Note: 已實施架構角色反轉：Cursor 兼任總指揮 + 總工程師，GPT 為副指揮官（執行任務包），Gemini 保持顧問師角色

## TASK_PACKAGE_INFORMATION_SUFFICIENCY_ANALYSIS
- Status: ACTIVE（自 2026-01-09 起生效）
- Priority: HIGH
- Path: docs/governance/TASK_PACKAGE_INFORMATION_SUFFICIENCY_ANALYSIS.md
- Scope: 任務包資訊充足性分析，確保副指揮官和顧問師能夠掌握95%以上的充足資訊
- Note: 分析當前任務包模式的資訊缺口，提出改進建議（已實施：增加「專案歷史摘要」部分）

## INFORMATION_CLASSIFICATION_RULE
- Status: ACTIVE（已更新，自 2026-01-10 起）
- Priority: HIGH
- Path: docs/governance/INFORMATION_CLASSIFICATION_RULE.md
- Scope: 資訊分類規則（已更新為 Cursor 架構版本）
- Note: **重要變更**：不再使用快照系統，改為規範必須寫在文件中，任務包中包含所有必要的背景資料
- Note: 明確規定哪些資訊應該寫在規範文件中（Cursor 直接讀取），哪些資訊應該放在任務包中（任務執行者使用）

## COMPLETE_TASK_PACKAGE_RULE
- Status: SUPERSEDED（已整合到 CURSOR_TASK_PACKAGE_RULE.md，自 2026-01-10 起）
- Priority: ARCHIVED
- Path: docs/governance/COMPLETE_TASK_PACKAGE_RULE.md
- Note: 本文件的獨特內容已整合到 `CURSOR_TASK_PACKAGE_RULE.md`，快照相關內容已刪除（已轉換為 Cursor 架構）
- 替代文件：`docs/governance/CURSOR_TASK_PACKAGE_RULE.md`

## MASTER_WORK_OBJECTIVES
- Status: ACTIVE | IMMUTABLE_REFERENCE（附屬於 NORTH_STAR，自 2026-01-09 起生效）
- Priority: CRITICAL
- Path: roadmap/MASTER_WORK_OBJECTIVES.md
- Scope: 定義所有主線工作目標，作為任務包發派的依據
- Note: 所有工作目標必須附屬於 NORTH_STAR，不得違背終極目標的三個核心要求（真的能賺錢、真的可以上國際、真的可以幫到人）
- Note: 文件名中的 "MASTER" 僅表示「主要工作目標」，與已廢棄的快照系統無關

## NORTH_STAR_GAP_ANALYSIS
- Status: ACTIVE | EDITABLE（自 2026-01-09 起生效）
- Priority: HIGH
- Path: docs/governance/NORTH_STAR_GAP_ANALYSIS.md
- Scope: 識別終極目標中缺失的關鍵要素，確保產品能「真的賺錢、真的上國際、真的幫到人」
- Note: 作為 MASTER_WORK_OBJECTIVES 的輸入來源，分析商業可行性、國際化與市場擴展、使用者價值與效果驗證、技術基礎設施的缺口
