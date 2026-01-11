# CURSOR_PROACTIVE_SUGGESTION_RULE（Cursor 主動建議規則）

## 目的
允許 Cursor（總工程師）基於專業判斷和完整文件了解，對總指揮 GPT 的提案主動提出改進建議，確保決策更周全，避免因總指揮無法看到完整文件而導致決策不夠周全。

---

## 核心原則

### Cursor 可以主動提出建議
- ✅ **基於專業判斷**：基於對完整代碼庫的了解
- ✅ **基於文件核對**：發現指揮官提案可能與現有文件衝突或可以改進
- ✅ **基於最佳實踐**：發現更好的實施方案
- ✅ **基於風險預防**：發現潛在問題或風險

### 建議必須寫入文本
- ✅ **必須寫入** `docs/ops/CURSOR_COMMANDER_ALERTS.md` 或專門的建議文件
- ✅ **必須納入 MIN 快照**：讓總指揮 GPT 可以看到
- ✅ **必須標記優先級和狀態**：P0/P1/P2，OPEN/RESOLVED

---

## 建議的類型

### 類型 1：決策改進建議
**觸發條件**：
- 指揮官提案可能與現有文件衝突
- 指揮官提案可以採用更好的方案
- 指揮官提案可能導致後續問題

**建議格式**：
- 問題描述（1-2 行）
- 建議改進方案（1-3 行）
- 理由（基於哪些文件或專業判斷）
- 優先級（P0/P1/P2）

### 類型 2：實施優化建議
**觸發條件**：
- 發現更高效的實施方案
- 發現可以複用現有資源
- 發現可以避免重複工作

**建議格式**：
- 當前方案的問題（1 行）
- 優化方案（1-2 行）
- 預期效果（1 行）
- 優先級（P1/P2）

### 類型 3：風險預警
**觸發條件**：
- 發現潛在技術風險
- 發現可能違反治理規則
- 發現可能導致維護困難

**建議格式**：
- 風險描述（1-2 行）
- 影響範圍（1 行）
- 建議對策（1-2 行）
- 優先級（P0/P1）

---

## 工作流程

### 步驟 1：Cursor 發現可改進之處
- Cursor 基於完整文件了解，發現指揮官提案可以改進
- Cursor 基於專業判斷，發現更好的方案

### 步驟 2：Cursor 寫入建議
- 寫入 `docs/ops/CURSOR_COMMANDER_ALERTS.md`（優先級 P0/P1）或
- 寫入專門的建議文件（如果建議較長或需要詳細說明）
- 標記優先級（P0/P1/P2）和狀態（OPEN）

### 步驟 3：Cursor 更新 MIN 快照
- 執行 `bash xuance-commander-core/tools/build_master_sync_packet_min.sh`
- 確保建議出現在 MIN 快照中

### 步驟 4：總指揮 GPT 查看建議
- 總指揮 GPT 開啟 MIN 快照
- 查看 `CURSOR_COMMANDER_ALERTS.md` 區塊
- 根據優先級判斷是否需要處理

### 步驟 5：總指揮 GPT 決策
- 採納建議：執行改進方案，標記狀態為 RESOLVED
- 拒絕建議：說明理由，標記狀態為 REJECTED 或 DEFERRED
- 需要更多資訊：向 Cursor 詢問詳細資訊

---

## 建議的格式要求

### 必須包含
- **標題**：簡短描述建議內容
- **優先級**：P0（立即處理）/ P1（建議處理）/ P2（可選處理）
- **狀態**：OPEN / IN_PROGRESS / RESOLVED / REJECTED / DEFERRED
- **問題描述**：1-3 行，說明發現的問題或可改進之處
- **建議方案**：1-3 行，說明建議的改進方案
- **理由**：1-2 行，說明基於哪些文件或專業判斷
- **詳細記錄路徑**：（如有）指向詳細說明文件

### 建議簡潔
- 每個建議 ≤ 10 行（摘要）
- 詳細說明寫在專門文件，通過路徑引用
- 避免冗長論述

---

## 快照容量控制

### 快照大小限制
- **MIN 快照目標**：≤ 3000 行
- **單個建議**：≤ 10 行（摘要）
- **建議總計**：≤ 100 行

### 定期清理規則
- **OPEN 狀態建議**：保留在 MIN 快照中
- **RESOLVED 狀態建議**：
  - 保留 7 天後移到歷史記錄或移除
  - 只保留路徑引用
- **REJECTED/DEFERRED 狀態建議**：
  - 保留 30 天後移到歷史記錄或移除

### 自動清理機制
- Cursor 在每次重建 MIN 快照時檢查
- 自動清理超過保留期限的已解決/已拒絕建議
- 確保 MIN 快照不會無限增長

---

## 總指揮 GPT 如何處理建議

### 查看建議
1. **開啟 MIN 快照**：`memory/briefs/MASTER_MIN_SYNC_PACKET.md`
2. **查看 CURSOR_COMMANDER_ALERTS 區塊**：搜索 "CURSOR_COMMANDER_ALERTS"
3. **根據優先級判斷**：
   - P0：立即處理
   - P1：建議處理（不阻斷主線）
   - P2：可選處理（可在主線任務間隙處理）

### 決策處理
- **採納建議**：執行改進方案，通知 Cursor 更新狀態為 RESOLVED
- **拒絕建議**：說明理由，通知 Cursor 更新狀態為 REJECTED 或 DEFERRED
- **需要更多資訊**：要求 Cursor 提供詳細說明或開啟相關文件

---

## 範例

### 範例 1：決策改進建議

```markdown
### 1. 建議：使用現有文件而非新建
- **優先級**：P1（建議處理）
- **狀態**：OPEN
- **問題描述**：指揮官提案新建 `P0-3_SECONDARY_METAPHOR_RULES.md`，但已存在 `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`，建議更新現有文件而非新建。
- **建議方案**：更新現有文件，補齊白名單和機器化檢查規則。
- **理由**：基於 `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md` 已存在，符合單源規則。
- **詳細記錄**：見 `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`
```

### 範例 2：實施優化建議

```markdown
### 2. 建議：複用現有 JSON 結構
- **優先級**：P1（建議處理）
- **狀態**：OPEN
- **問題描述**：B2 任務要求更新 `P0-3_NARRATIVE_BLACKLIST_SSOT.json`，現有 JSON 已包含基本結構，建議擴充而非重建。
- **建議方案**：在現有 JSON 結構基礎上擴充禁用詞，保持結構一致性。
- **理由**：基於 `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json` 已有結構，擴充更高效且避免結構不一致。
```

---

## 與其他規則的關係

### 與 CURSOR_COMMANDER_INTERFACE_RULE.md 的關係
- **CURSOR_COMMANDER_INTERFACE_RULE.md**：定義 Cursor 與總指揮 GPT 的對口規則
- **本規則**：補充說明 Cursor 可以主動提出建議

### 與 CURSOR_COMMANDER_ALERTS.md 的關係
- **CURSOR_COMMANDER_ALERTS.md**：存放建議的具體文件
- **本規則**：定義如何提出建議和使用該文件

### 與 BASIC_NORMS_ALWAYS_VISIBLE_RULE.md 的關係
- **BASIC_NORMS_ALWAYS_VISIBLE_RULE.md**：確保基本規範始終可見
- **本規則**：允許 Cursor 主動提出改進基本規範的建議

---

## 狀態
- ACTIVE
- 必須納入 MIN 快照
- Cursor 應基於專業判斷主動提出建議，確保決策更周全



