# P0-3 更新協議（P0-3 Update Protocol）

## 目的
定義 P0-3 任務狀態更新時，如何確保總指揮 GPT 能通過 MIN 快照獲取所有必要資訊，避免上下文不對齊。

---

## 更新流程

### 1. 任務狀態更新時必須同步更新的文件

#### 必須更新的文件（至少 2 個會被 MIN 收到）
1. **`docs/ops/TASK_RECORDS_SUMMARY.md`**
   - 更新 P0-3 條目：包含三個阻斷點（B1/B2/B3）的具體交付物和驗收點
   - **會被 MIN 快照納入**：總指揮 GPT 開啟 MIN 快照時可直接看到

2. **`memory/briefs/CURRENT_SUMMARY.md`**
   - 寫入：本回合開始做 B1/B2/B3；完成條件；下一檢查點（CI/Golden tests）
   - **會被 MIN 快照納入**：總指揮 GPT 開啟 MIN 快照時可直接看到

3. **`P0-3/DECISION_PACKET_P0-3.md`**（若規則是決策包做裁決）
   - 將「次隱喻允許/禁止」等關鍵裁決寫入明確裁決段
   - 避免下次漂移
   - **不會直接納入 MIN 快照**：但 MIN 快照會引用此文件路徑

### 2. 更新後必須重建 MIN 快照

**執行指令**：
```bash
bash xuance-commander-core/tools/build_master_sync_packet_min.sh
```

**確保**：
- `TASK_RECORDS_SUMMARY.md` 的最新內容出現在 MIN 快照中
- `CURRENT_SUMMARY.md` 的最新內容出現在 MIN 快照中
- 所有更新的文件路徑在 MIN 快照中被正確引用

---

## 總指揮 GPT 獲取資訊的方式

### 方式 1：直接查看 MIN 快照（推薦）

**總指揮 GPT 只需開啟**：
- `xuance-commander-core/memory/briefs/MASTER_MIN_SYNC_PACKET.md`

**MIN 快照包含**：
- ✅ 當前任務狀態摘要（來自 `TASK_RECORDS_SUMMARY.md`）
- ✅ 當前狀態摘要（來自 `CURRENT_SUMMARY.md`）
- ✅ 三個阻斷點（B1/B2/B3）的詳細要求
- ✅ 驗收點和完成條件
- ✅ 所有相關文件的路徑引用

**優點**：
- 總指揮 GPT 只需開啟一份文件即可看到所有關鍵資訊
- 不需要主動查找其他文件
- 上下文完整，不會遺漏重要資訊

### 方式 2：需要詳細資訊時，根據路徑引用查看

**當 MIN 快照中的摘要不夠時**：
- 總指揮 GPT 可以根據 MIN 快照中的「詳細記錄路徑」引用，開啟對應的詳細文件
- 例如：查看 `P0-3/DECISION_PACKET_P0-3.md` 獲取完整決策包

---

## 資訊更新追蹤機制

### 自動更新觸發條件

以下事件發生時，必須更新相關文件並重建 MIN 快照：

1. **任務狀態變更**：
   - 新阻斷點確認
   - 阻斷點完成
   - 任務完成/封板

2. **交付物產出**：
   - B1/B2/B3 的輸出物完成時
   - 驗收點更新時

3. **決策裁決**：
   - 次隱喻允許/禁止裁決確定
   - 其他關鍵決策確定

### 更新檢查清單

更新時必須檢查：

- [ ] `TASK_RECORDS_SUMMARY.md` 已更新（包含最新三個阻斷點）
- [ ] `CURRENT_SUMMARY.md` 已更新（包含本回合任務和下一檢查點）
- [ ] `P0-3/DECISION_PACKET_P0-3.md` 已更新（如有關鍵裁決）
- [ ] MIN 快照已重建（`build_master_sync_packet_min.sh` 已執行）
- [ ] 驗證：MIN 快照中能找到三個阻斷點的內容

---

## 確保上下文對齊的建議

### 給總指揮 GPT 的建議

1. **優先查看 MIN 快照**：
   - 每次開始工作時，先開啟 `MASTER_MIN_SYNC_PACKET.md`
   - 查看「當前進行中的任務」部分，確認 P0-3 的最新狀態

2. **查看詳細記錄**：
   - 當 MIN 快照中的摘要不足以做決策時
   - 根據「詳細記錄路徑」開啟對應文件

3. **主動要求更新**：
   - 如果發現 MIN 快照中的資訊過時
   - 可以要求 Cursor 更新相關文件並重建 MIN 快照

### 給 Cursor 的建議

1. **主動更新**：
   - 任務狀態變更時，立即更新 `TASK_RECORDS_SUMMARY.md` 和 `CURRENT_SUMMARY.md`
   - 更新後立即重建 MIN 快照

2. **驗證更新**：
   - 重建 MIN 快照後，驗證關鍵資訊是否正確出現在快照中
   - 確認所有路徑引用是否正確

3. **提醒機制**：
   - 如果發現重要更新但總指揮 GPT 可能不知道
   - 可以寫入 `CURSOR_COMMANDER_ALERTS.md`（會被納入 MIN 快照）

---

## 封板完成定義

### 當 B1 + B2 + B3 全部 PASS 時：

1. **更新任務記錄**：
   - `docs/ops/TASK_RECORDS_SUMMARY.md`：將「是否可收尾」改成 ✅ 是
   - 寫清楚 freeze/封板下一步

2. **更新 CI 規則**：
   - 更新 `docs/domain/ci/P0-3_CI_GATE_RULES.md`（如需）

3. **執行驗收**：
   - 跑 TC-01~TC-05（既有 Golden tests）

4. **更新狀態**：
   - 將 P0-3 狀態改為：READY_TO_FREEZE

5. **重建 MIN 快照**：
   - 執行 `build_master_sync_packet_min.sh`
   - 確保最新狀態出現在 MIN 快照中

---

## 狀態
- ACTIVE
- 必須納入 MIN 快照（在 `MASTER_SNAPSHOT_USAGE_GUIDE.md` 中引用）



