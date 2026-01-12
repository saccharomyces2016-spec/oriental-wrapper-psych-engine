# HEALTH_CHECK_PLAN（健康檢查計劃｜臨時目標｜可持續）

## 目的
避免「累積型返工」：把治理合規性問題（重複/漂移/散落/引用錯誤）提早發現，讓修復成本維持在可控範圍。

## 觸發頻率（建議）
- 每週一次（建議週五或週日）
- 且在以下事件後必跑一次：
  - 新增/改動 governance 文件
  - 大量搬路徑/重構
  - 發生任何「上下文/快照/證據」漂移事故
  - 合併外部顧問輸出（docs/gem/runs -> domain）

## 執行者（硬規則）
- 預設：Cursor + Terminal（本機）執行健康檢查腳本並產出報告
- 指揮官（GPT）只做：判讀報告 -> 決定修復優先序 -> 下達修復包
- Codex：只在「修復範圍已明確」時做一次性修補

## 輸出物（硬規則）
每次健康檢查必產出：
- 報告目錄：`xuance-commander-core/tmp/health_check/HEALTH_CHECK_<timestamp>/`
- 指標檔：`xuance-commander-core/tmp/health_check/LATEST_HEALTH_CHECK.md`
- 記錄索引：更新 `docs/ops/HEALTH_CHECK_RECORDS.md`（記錄歷史）

## 記錄索引文件（硬規則）
所有健康檢查記錄都應記錄在：
- **索引檔**：`docs/ops/HEALTH_CHECK_RECORDS.md`
- **目的**：提供可追溯的健康狀態演進記錄
- **更新頻率**：每次健康檢查後更新

報告至少包含：
1) duplicate_basenames（重複檔名清單）
2) canon_path_violations（Canon 路徑違規）
3) shadow_refs（影子路徑/相對路徑引用）
4) unindexed_governance（治理文件未索引）
5) single_source_violations（單源規則違規）
6) 專案資料夾說明.md 自動更新（更新最後更新日期）

## 判讀與下一步（最小）
- 若 canon_path_violations > 0：優先修（避免路徑引用與證據失真）
- 若 shadow_refs > 0：次優先修（避免引用歧義與漂移）
- 若 unindexed_governance > 0：補索引（避免制度文件變孤兒）
- 若 single_source_violations > 0：立刻裁決 single source（避免「同名多份」）
- duplicate_basenames：分類為「合理重複」與「需合併/清理」

## 升級規則（重要）
若健康檢查顯示：
- canon_path_violations > 0 或 single_source_violations > 0
則進入：治理修繕模式（Governance Hardening）
- 功能主線暫停
- 先補制度/索引/檢查點 -> 再修檔 -> 再重跑健康檢查 PASS

---

## 健康檢查 = 治理結構全面盤點（Governance Inventory）

### 定位升級
健康檢查 ≠ 技術掃描  
健康檢查 = **治理結構全面盤點（Governance Inventory）**

### 必須盤點的 5 類問題

1. **Canon 路徑一致性**
   - 所有治理、制度、規範文件是否在正確的 Canon 路徑
   - 是否存在違規的 repo-root 層級目錄

2. **單源規則（Single Source of Truth）**
   - 關鍵文件（如 COMMON_PACKET.md, CHAT_PACKET.md）是否唯一
   - 是否存在同名多份的違規情況

3. **索引完整性（Index Coverage）**
   - 所有治理文件是否在 GOVERNANCE_INDEX.md 中索引
   - 是否存在未索引的孤兒文件

4. **引用確定性（No Shadow Refs）**
   - 是否使用相對路徑（out/, tmp/, logs/）造成歧義
   - 所有引用是否使用完整 Canon 路徑

5. **歷史/Legacy 邊界是否清楚**
   - Legacy 文件是否明確標記且不可引用
   - 歷史包與現行結構是否清楚分離

### 狀態
- ACTIVE | EDITABLE