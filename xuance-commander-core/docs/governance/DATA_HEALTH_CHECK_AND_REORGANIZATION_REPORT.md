# 資料健康檢查與重組報告（Data Health Check and Reorganization Report）

**檢查日期**：2026-01-10  
**執行者**：Cursor（Auto）  
**狀態**：`IN PROGRESS`

---

## 一、檢查總結（Executive Summary）

**檢查範圍**：
1. 散落的資料夾和文件
2. 制度規範文件的分佈
3. 過時的 GPT/GEM 相關規範
4. 快照/同步相關規範和文件
5. 角色定義的一致性

**檢查結果**：發現多處需要整理的地方

---

## 二、發現的問題（Issues Found）

### 2.1 過時的 GPT/GEM 相關規範文件（需刪除）

| 文件路徑 | 問題 | 處理方式 |
| --- | --- | --- |
| `docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md` | 過時的協作框架 | ❌ 刪除 |
| `docs/governance/CURSOR_GPT_GEMINI_TASK_PACKET_COLLABORATION_FRAMEWORK.md` | 過時的任務包框架 | ❌ 刪除 |
| `docs/governance/CURSOR_GPT_GEMINI_TASK_PACKET_FRAMEWORK.md` | 過時的任務包框架 | ❌ 刪除 |
| `docs/governance/DOCS_GEM_CANON_RULE.md` | 過時的 GEM 規範 | ❌ 刪除 |
| `docs/governance/proposals/CURSOR_GPT_COORDINATION_STRATEGY.md` | 過時的協調策略 | ❌ 刪除 |
| `docs/governance/CURSOR_DEPUTY_COMMANDER_INTERFACE_RULE.md` | 副指揮官相關（已改為任務執行者） | ❌ 刪除或更新 |

### 2.2 快照/同步相關規範和文件（需刪除）

| 文件路徑 | 問題 | 處理方式 |
| --- | --- | --- |
| `docs/governance/MASTER_SNAPSHOT_USAGE_GUIDE.md` | GPT 快照使用指南 | ❌ 刪除 |
| `docs/governance/MASTER_SYNC_PROTOCOL.md` | 快照同步協議 | ❌ 刪除 |
| `docs/governance/FULL_SNAPSHOT_RULES.md` | 完整快照規則 | ❌ 刪除 |
| `docs/governance/SNAPSHOT_REQUEST_PROTOCOL.md` | 快照請求協議 | ❌ 刪除 |
| `memory/briefs/MASTER_SYNC_PACKET.md` | GPT 快照包 | ❌ 刪除 |
| `memory/briefs/MASTER_MIN_SYNC_PACKET.md` | GPT 最小快照包 | ❌ 刪除 |
| `memory/briefs/MASTER_MIN_SYNC_PACKET_ARCHIVED_20260109_151909.md` | 已歸檔的快照包 | ❌ 刪除 |
| `memory/briefs/DEPUTY_COMMANDER_SNAPSHOT.md` | 副指揮官快照 | ❌ 刪除 |
| `tools/generate_master_sync_packet.sh` | 快照生成工具 | ❌ 刪除 |
| `tools/build_master_sync_packet.sh` | 快照建構工具 | ❌ 刪除 |
| `codex/packs/20260104_master_sync_v1.sh` | 快照同步腳本 | ❌ 刪除 |

### 2.3 需要整合的制度規範文件（需整合）

| 文件路徑 | 性質 | 處理方式 |
| --- | --- | --- |
| `docs/governance/AI_ADVISORY_ROLES.md` | 角色定義 | ✅ 更新（反映新架構：Cursor 為指揮官） |
| `docs/governance/AI_COLLABORATION_ARCHITECTURE.md` | 協作架構 | ✅ 更新或刪除（若與新架構衝突） |
| `docs/governance/AI_PARTNERSHIP_PROTOCOL.md` | 合作協議 | ✅ 更新（反映新架構） |
| `docs/governance/CURSOR_TASK_PACKAGE_RULE.md` | 任務包規則 | ✅ 保留（已更新） |
| `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md` | 文件放置規則 | ✅ 保留（已更新） |
| `docs/governance/COMPLETE_TASK_PACKAGE_RULE.md` | 完整任務包規則 | ✅ 整合（可能與 CURSOR_TASK_PACKAGE_RULE 重複） |

### 2.4 散落的文件（需整理）

| 文件路徑 | 問題 | 處理方式 |
| --- | --- | --- |
| `docs/task_packets/advisor/briefs/BRIEF_P0-2_income_expansion_pressure_MASTER_PROPOSAL.zh.md` | 包含 MASTER 字樣（快照相關） | ✅ 檢查並整理 |
| `docs/domain/snapshots/` | 快照資料夾 | ✅ 檢查並整理 |

---

## 三、處理計劃（Action Plan）

### 3.1 第一階段：刪除過時文件

1. 刪除所有 GPT/GEM 相關的過時規範文件
2. 刪除所有快照/同步相關的規範和文件
3. 刪除快照生成工具腳本

### 3.2 第二階段：更新角色定義

1. 更新 `AI_ADVISORY_ROLES.md`：明確 Cursor 為指揮官和總工程師，GPT/GEM/GEMINI 為任務執行者
2. 更新 `ROLE_XUANCE_COMMANDER.md`：反映新架構
3. 更新相關的協作協議文件

### 3.3 第三階段：整合制度規範

1. 檢查是否有重複的規範文件
2. 整合衝突的規範（以後面添加的資料取代前面的）
3. 建立統一的制度規範索引

### 3.4 第四階段：整理散落文件

1. 檢查散落的文件
2. 將相同性質的文件集中到同一資料夾
3. 建立清晰的文件結構

---

**End of Health Check Report**

