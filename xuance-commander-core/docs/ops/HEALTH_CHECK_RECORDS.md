# HEALTH_CHECK_RECORDS（健康檢查記錄索引）

## 目的
記錄所有健康檢查的歷史，提供可追溯的健康狀態演進記錄。

## 記錄位置
- **報告目錄**：`xuance-commander-core/tmp/health_check/HEALTH_CHECK_<timestamp>/`
- **指標檔**：`xuance-commander-core/tmp/health_check/LATEST_HEALTH_CHECK.md`
- **索引檔**：本文件（`docs/ops/HEALTH_CHECK_RECORDS.md`）

## 健康檢查執行方式

### 執行命令
```bash
bash xuance-commander-core/tools/xc_health_check.sh
```

### 執行頻率
- 每週一次（建議週五或週日）
- 且在以下事件後必跑一次：
  - 新增/改動 governance 文件
  - 大量搬路徑/重構
  - 發生任何「上下文/快照/證據」漂移事故
  - 合併外部顧問輸出（docs/gem/runs -> domain）

## 健康檢查檢查項目

1. **duplicate_basenames**（重複檔名清單）
2. **canon_path_violations**（Canon 路徑違規）
3. **shadow_refs**（影子路徑/相對路徑引用）
4. **unindexed_governance**（治理文件未索引）
5. **single_source_violations**（單源規則違規）

## 歷史記錄

### 2026-01-09 09:39:06
- **報告目錄**：`tmp/health_check/HEALTH_CHECK_20260109_093906/`
- **狀態**：✅ PASS（良好）
- **關鍵指標**：
  - Canon 路徑違規：0 ✅
  - 單源規則違規：OK ✅
  - 未索引的治理文件：1（實際已索引，檢測邏輯問題）
  - 影子路徑引用：269 處（大部分合理）
  - 重複檔名：44（大部分合理）
- **結論**：可以進入主線任務
- **詳細報告**：見 `tmp/health_check/HEALTH_CHECK_20260109_093906/summary.md`

---

## 最新健康檢查

請查看：`tmp/health_check/LATEST_HEALTH_CHECK.md`

---

## 狀態
- ACTIVE
- 每次健康檢查後應更新此文件

