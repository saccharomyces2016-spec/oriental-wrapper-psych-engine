# BASIC_NORMS_ALWAYS_VISIBLE_RULE（基本規範始終可見規則）

## 目的
確保最關鍵、最基本的規範始終存在於 MIN 快照中，讓程序端 GPT 可以隨時看到並遵守，同時也可以引導 Cursor 回想起基本制度。

---

## 核心原則

### 1. 基本規範必須始終可見
**規則**：最關鍵、最基本的規範必須始終存在於 MIN 快照中，不管任何情況下都不能移除。

**原因**：
- 程序端 GPT 只能看到快照，需要基本規範才能遵守規則
- 程序端 GPT 可以根據這些基本規範，向 Cursor 提出提案或建議
- 這樣可以引導 Cursor 回想起基本制度，即使 Cursor 的上下文可能有限制

### 2. 基本規範的定義
**基本規範**是指那些「無時無刻都不可以忘記」的關鍵規則：

1. **文件寫入位置規則**（FILE_WRITE_LOCATION_RULE）
   - 所有文件必須寫入 `xuance-commander-core/` 下的 Canon 路徑
   - 禁止使用相對路徑

2. **Canon 路徑定義**（GLOBAL_PATH_CANON）
   - 治理文件：`xuance-commander-core/docs/governance/`
   - 輸出文件：`xuance-commander-core/out/`
   - 臨時文件：`xuance-commander-core/tmp/`

3. **角色職責定義**（AI_ADVISORY_ROLES）
   - Cursor（總工程師）的職責
   - 程序端 GPT 的限制
   - 互動流程

4. **執行規則**（TEXT_ONLY_EXECUTION_RULES）
   - 文本主控原則
   - 必須基於提供的文本執行，不能依賴記憶

5. **當前任務狀態**（TASK_RECORDS_SUMMARY）
   - 當前進行中的任務
   - 任務是否可以收尾

---

## Cursor 工作原則

### 我不依賴快照，但我需要基本規範可見
- ✅ **我可以看到完整代碼庫**：不需要快照，可以直接讀取任何文件
- ✅ **我應該主動檢查**：發現問題後寫入提醒事項，而非等待快照更新
- ✅ **我應該直接讀取文件驗證**：不需要依賴快照中的內容

### 但基本規範必須在快照中
- ✅ **讓程序端 GPT 可以隨時看到並遵守**
- ✅ **程序端 GPT 可以引導我**：當程序端 GPT 看到基本規範後，可以向我提出提案或建議，引導我回想起基本制度
- ✅ **即使我的上下文可能有限制**，程序端 GPT 可以主動提醒我

### 我不應該做的事
- ❌ 不應該依賴快照進行檢查（應該直接讀取文件）
- ❌ 不應該假設程序端 GPT 會記住規範（應該寫在快照中）
- ❌ 不應該依賴記憶（規範仍要寫在文本中，我通過讀取文件檢查）

---

## 程序端 GPT 的引導機制

### 程序端 GPT 可以主動引導 Cursor
**機制**：
1. 程序端 GPT 在 MIN 快照中看到基本規範
2. 根據這些基本規範，向 Cursor 提出提案或建議
3. 這樣可以引導 Cursor 回想起基本制度

**例子**：
- 程序端 GPT 看到 FILE_WRITE_LOCATION_RULE，發現某個操作可能違規
- 主動提醒：「根據 MIN 快照中的 FILE_WRITE_LOCATION_RULE，這個文件應該寫在 xuance-commander-core/ 下，請 Cursor 確認」

### 程序端 GPT 的責任
- ✅ **不是只被動遵守規範**，可以主動檢查並提醒
- ✅ **看到基本規範後**，可以主動提醒 Cursor 確保規範被遵守
- ✅ **引導 Cursor**：即使 Cursor 的上下文可能有限制，可以通過提醒引導 Cursor 回想起基本制度

---

## MIN 快照必須包含的基本規範（不可移除）

### 必須始終包含
1. **FILE_WRITE_LOCATION_RULE.md**（文件寫入位置規則）
2. **GLOBAL_PATH_CANON.md**（Canon 路徑定義）
3. **ABSOLUTE_REFERENCE_RULE.md**（禁止相對路徑）
4. **AI_ADVISORY_ROLES.md**（角色職責定義，關鍵部分）
5. **TEXT_ONLY_EXECUTION_RULES.md**（執行規則，核心部分）
6. **TASK_RECORDS_SUMMARY.md**（當前任務狀態）

### 可以精簡但必須包含的
1. **CHARTER.md**（摘要版，≤ 50 行）
2. **ROADMAP.md**（摘要版，≤ 30 行）
3. **CURRENT_SUMMARY.md**（當前狀態摘要，≤ 100 行）

---

## 工作分配

### Cursor（總工程師）的職責
1. **主動檢查**：不依賴快照，直接讀取文件檢查
2. **發現問題**：寫入 CURSOR_COMMANDER_ALERTS
3. **維護規範**：確保規範文件是最新的
4. **實時驗證**：直接讀取文件驗證規則遵守情況

### 程序端 GPT 的職責
1. **遵守基本規範**：根據 MIN 快照中的基本規範執行任務
2. **主動引導**：根據基本規範，向 Cursor 提出提案或建議
3. **提醒 Cursor**：發現可能違規時，主動提醒 Cursor 確認
4. **引導回想**：即使 Cursor 的上下文可能有限制，可以通過提醒引導 Cursor 回想起基本制度

---

## 狀態
- ACTIVE
- 必須納入 MIN 快照
- 這是硬規則，不能違反



