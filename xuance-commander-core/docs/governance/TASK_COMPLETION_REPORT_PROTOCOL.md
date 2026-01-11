# TASK_COMPLETION_REPORT_PROTOCOL（任務完成回報協議）

## 目的
定義 Cursor（總工程師）執行任務完成後，如何回報給總指揮 GPT，確保總指揮能夠通過 MIN 快照看到任務結果，無需額外複製貼上。

---

## 任務完成後的標準流程

### Cursor 必須執行的步驟

1. **更新任務記錄**
   - 更新 `docs/ops/TASK_RECORDS_SUMMARY.md`：
     - 標記任務狀態（OPEN / IN_PROGRESS / DONE）
     - 寫出驗收結果（是否通過、缺哪個）
     - 更新完成條件

2. **更新當前狀態**
   - 更新 `memory/briefs/CURRENT_SUMMARY.md`：
     - 更新「下一檢查點」
     - 更新任務進度

3. **記錄執行結果**
   - 更新 `memory/briefs/LAST_COMMAND_STATUS.md`：
     - 記錄執行的指令
     - 記錄執行結果（成功/失敗）
     - 記錄關鍵輸出摘要

4. **如有問題，寫入提醒**
   - 更新 `docs/ops/CURSOR_COMMANDER_ALERTS.md`：
     - 標記優先級（P0/P1/P2）
     - 標記狀態（OPEN/IN_PROGRESS/RESOLVED）
     - 說明問題和建議

5. **重建 MIN 快照**
   - 執行 `bash xuance-commander-core/tools/build_master_sync_packet_min.sh`
   - 確保所有更新出現在 MIN 快照中

---

## 總指揮 GPT 如何查看任務結果

### 方式 1：直接查看 MIN 快照（推薦）

**總指揮 GPT 只需開啟**：
- `xuance-commander-core/memory/briefs/MASTER_MIN_SYNC_PACKET.md`

**MIN 快照包含的任務結果資訊**：

1. **任務狀態摘要**（來自 `TASK_RECORDS_SUMMARY.md`）
   - 任務是否完成
   - 任務狀態（OPEN / IN_PROGRESS / DONE）
   - 驗收結果（是否通過、缺哪個）
   - 完成條件

2. **執行結果摘要**（來自 `LAST_COMMAND_STATUS.md`）
   - 最後執行的指令
   - 執行結果（成功/失敗）
   - 關鍵輸出摘要

3. **當前狀態**（來自 `CURRENT_SUMMARY.md`）
   - 下一檢查點
   - 任務進度

4. **提醒事項**（來自 `CURSOR_COMMANDER_ALERTS.md`）
   - 如有問題，會看到優先級和狀態
   - 問題描述和建議

### 方式 2：需要詳細資訊時，根據路徑引用查看

**當 MIN 快照中的摘要不夠時**：
- 總指揮 GPT 可以根據 MIN 快照中的「詳細記錄路徑」引用，開啟對應的詳細文件
- 例如：查看完整的 `TASK_RECORDS_INDEX.md` 獲取詳細記錄

---

## 用戶（你）需要做的事

### 選項 1：只告訴總指揮「任務執行完畢」（推薦）

**你只需要說**：
- 「總工程師這邊任務執行完畢，請查看 MIN 快照了解詳細結果」

**總指揮 GPT 會**：
- 開啟 `MASTER_MIN_SYNC_PACKET.md`
- 查看 `TASK_RECORDS_SUMMARY` 區塊，了解任務狀態
- 查看 `LAST_COMMAND_STATUS` 區塊，了解執行結果
- 查看 `CURSOR_COMMANDER_ALERTS` 區塊（如有），了解問題和建議

### 選項 2：提供簡短摘要（可選）

**如果你想要提供簡短摘要**：
- 「總工程師這邊任務執行完畢：
  - B1 brief 已創建
  - B2 brief 已創建
  - B3 brief 已創建
  - B4 brief 已創建
  - 所有文件已符合 Canon 路徑規範
  - 詳細結果請查看 MIN 快照」

**但這不是必須的**，因為總指揮 GPT 可以通過 MIN 快照看到所有資訊。

---

## 為什麼不需要複製貼上任務結果

### 原因 1：MIN 快照已包含所有關鍵資訊
- ✅ 任務狀態摘要
- ✅ 執行結果摘要
- ✅ 當前狀態
- ✅ 提醒事項

### 原因 2：符合「文本主控」原則
- ✅ 所有資訊都寫在文本中
- ✅ 總指揮 GPT 可以通過文本獲取資訊
- ✅ 不需要依賴對話上下文

### 原因 3：避免資訊重複和不一致
- ✅ 單一真相來源（MIN 快照）
- ✅ 避免複製貼上導致資訊不一致
- ✅ 總指揮 GPT 看到的永遠是最新的資訊

---

## 例外情況（需要額外說明）

### 如果任務執行失敗

**Cursor 會**：
- 寫入 `CURSOR_COMMANDER_ALERTS.md`（優先級 P0）
- 說明失敗原因和建議
- 重建 MIN 快照

**你應該**：
- 告訴總指揮：「總工程師這邊任務執行遇到問題，請查看 MIN 快照中的 CURSOR_COMMANDER_ALERTS」
- 或者直接複製 `CURSOR_COMMANDER_ALERTS.md` 的內容給總指揮

### 如果需要立即決策

**如果任務結果需要總指揮立即決策**：
- Cursor 會寫入 `CURSOR_COMMANDER_ALERTS.md`（優先級 P0）
- 你應該告訴總指揮：「總工程師這邊有需要立即決策的事項，請查看 MIN 快照中的 CURSOR_COMMANDER_ALERTS」

---

## 驗證機制

### Cursor 執行任務後必須驗證

- [ ] `TASK_RECORDS_SUMMARY.md` 已更新
- [ ] `CURRENT_SUMMARY.md` 已更新
- [ ] `LAST_COMMAND_STATUS.md` 已更新
- [ ] `CURSOR_COMMANDER_ALERTS.md` 已更新（如有問題）
- [ ] MIN 快照已重建
- [ ] 驗證：MIN 快照中能找到任務結果

---

## 狀態
- ACTIVE
- 必須納入 MIN 快照
- 幫助用戶和總指揮 GPT 了解如何查看任務結果



