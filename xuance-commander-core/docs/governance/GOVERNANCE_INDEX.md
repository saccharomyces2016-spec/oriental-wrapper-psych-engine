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

來源：tmp/audit/CURSOR_FULL_SYSTEM_SCAN.md（取證用，非 SSOT）

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