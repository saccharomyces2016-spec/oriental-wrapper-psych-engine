# M-7.5 實作完成報告

## 📋 實作目標

強化 analytics/proposals/digest 的可用性，讓報表「有門檻、可讀、可決策」：
- 資料不足時不產生高信心提案
- Digest 變成可執行清單格式
- 保持匿名/無 PII，不新增重型套件

## ✅ 實作內容

### A) analyticsReport.mjs：加入資料量門檻與信心分級

#### 1. 新增門檻常數

在檔案頂部新增：

```javascript
// M-7.5: 資料量門檻
const MIN_EVENTS_PER_QUESTION = 20
const MIN_SESSIONS = 30
const MIN_PURCHASE_FUNNEL_VIEWS = 50
```

#### 2. Proposal Generation 強化

**buildQuestionProposals() 變更：**
- 若該題 event count < MIN_EVENTS_PER_QUESTION → `confidence = "low"` 且標記 `reason: "insufficient_data"`
- 每個 proposal 新增欄位：
  - `metricsSnapshot`: { events, avgDwellMs, hesitantRate, avgChangeCount, topChoiceRate }
  - `suggestedChange`: 白話短句（非臨床用語）
  - `themeId`: 題目所屬主題 ID
  - `reason`: 資料不足時標記原因

**buildThemeProposals() 變更：**
- 加入資料量檢查（theme 需要 MIN_EVENTS_PER_QUESTION * 2）
- 同樣新增 `metricsSnapshot` 和 `suggestedChange` 欄位

**buildProposalSummary() 變更：**
- 新增完整欄位結構：
  ```json
  {
    "totals": {
      "proposals": 8,
      "high": 2,
      "medium": 3,
      "low": 3
    },
    "gating": {
      "minSessionsMet": true,
      "minEventsPerQuestionMetRatio": 0.625
    },
    "warnings": [
      "整體 session 數 (25) 低於門檻 (30)，不建議產生 high-confidence proposals",
      "超過半數題目資料量不足 (5/8 達標)"
    ],
    "bySuggestedAction": {
      "split": 3,
      "rewrite": 4,
      "rebalance": 1
    }
  }
  ```
- 若整體 session count < MIN_SESSIONS → 移除所有 high-confidence proposals（降為 medium）

### B) notifyDigest.mjs：把 digest 變成「可執行清單」

#### 1. 新格式結構

```
# Analytics Digest
Generated at: 2025-12-29T03:30:00.000Z

## 1. System Health
Errors: 5 (parse errors: 2)
Total events: 1250
⚠️  Parse error rate high: 0.002

## 2. Funnel
Views: 45, Clicks: 12, Checkouts: 3, Purchases: 1
Conversion rates: click/view=0.267, checkout/click=0.250, success/checkout=0.333
⚠️  資料不足：views (45) < 門檻 (50)

## 3. Top 5 Pending Proposals
[CONF=HIGH] Q:<q-theme1-0> theme:<theme1> action:<split> why:<長停留且猶豫率偏高，疑似題幹或選項資訊量過重...> metrics:<events:45,dwell:15200ms,hesitant:0.42,change:1.8>
[CONF=HIGH] Q:<q-theme2-1> theme:<theme2> action:<rewrite> why:<改選次數偏高且選項分布極端，疑似措辭模糊...> metrics:<events:38,dwell:9800ms,hesitant:0.28,change:2.1>
[CONF=MEDIUM] Q:<q-theme3-2> theme:<theme3> action:<split> why:<長停留且猶豫率偏高，疑似題幹或選項資訊量過重...> metrics:<events:22,dwell:13500ms,hesitant:0.38,change:1.5>
[CONF=MEDIUM] T:<theme4> theme:<theme4> action:<rebalance> why:<同一主題有多題同時出現負荷或歧義跡象...> metrics:<events:67,dwell:11200ms,hesitant:0.35,change:1.9>
[CONF=LOW] Q:<q-theme5-0> theme:<theme5> action:<rewrite> why:<改選次數偏高且選項分布極端，疑似措辭模糊...> metrics:<events:15,dwell:8900ms,hesitant:0.31,change:1.7>

## 4. Summary
Total proposals: 8 (high: 2, medium: 3, low: 3)
Questions with enough data: 62.5%
Warnings:
  - 超過半數題目資料量不足 (5/8 達標)
```

#### 2. 功能說明

- **System Health**: 顯示錯誤統計、parse error rate 警告
- **Funnel**: 顯示付費漏斗數據，資料不足時標註警告
- **Top 5 Pending Proposals**: 依 confidence + impact 排序，單行格式包含所有關鍵資訊
- **Summary**: 顯示 totals、gating 狀態、warnings

#### 3. Proposal 條目格式

```
[CONF=LEVEL] Q/T:<id> theme:<themeId> action:<rewrite/split/rebalance> why:<short> metrics:<events,dwell,hesitant,change>
```

### C) package.json

新增 script：

```json
"analytics:full:open": "npm run analytics:full && open reports/digest.txt || true"
```

## 📊 門檻常數數值

| 常數名稱 | 數值 | 用途 |
|---------|------|------|
| `MIN_EVENTS_PER_QUESTION` | 20 | 單題最少事件數，低於此值 confidence 降為 low |
| `MIN_SESSIONS` | 30 | 整體最少 session 數，低於此值不產生 high-confidence proposals |
| `MIN_PURCHASE_FUNNEL_VIEWS` | 50 | 付費漏斗最少 view 數，低於此值在 digest 中標註警告 |

## 📄 範例輸出

### proposals.summary.json 新 Schema

```json
{
  "totals": {
    "proposals": 8,
    "high": 2,
    "medium": 3,
    "low": 3
  },
  "gating": {
    "minSessionsMet": true,
    "minEventsPerQuestionMetRatio": 0.625
  },
  "warnings": [
    "超過半數題目資料量不足 (5/8 達標)"
  ],
  "bySuggestedAction": {
    "split": 3,
    "rewrite": 4,
    "rebalance": 1
  }
}
```

### proposals.byQuestion.json 新增欄位

每個 proposal 物件新增：

```json
{
  "id": "q:q-theme1-0:cognitive_overload:0",
  "targetType": "question",
  "targetId": "q-theme1-0",
  "themeId": "theme1",
  "confidence": "high",
  "reason": null,
  "status": "pending",
  "metricsSnapshot": {
    "events": 45,
    "avgDwellMs": 15200,
    "hesitantRate": 0.42,
    "avgChangeCount": 1.8,
    "topChoiceRate": 0.75
  },
  "suggestedChange": "將題目拆成較小的子題，或簡化題幹與選項的資訊量"
}
```

### digest.txt 完整範例

```
# Analytics Digest
Generated at: 2025-12-29T03:30:00.000Z

## 1. System Health
Errors: 5 (parse errors: 2)
Total events: 1250
⚠️  Parse error rate high: 0.002

## 2. Funnel
Views: 45, Clicks: 12, Checkouts: 3, Purchases: 1
Conversion rates: click/view=0.267, checkout/click=0.250, success/checkout=0.333
⚠️  資料不足：views (45) < 門檻 (50)

## 3. Top 5 Pending Proposals
[CONF=HIGH] Q:<q-theme1-0> theme:<theme1> action:<split> why:<長停留且猶豫率偏高，疑似題幹或選項資訊量過重...> metrics:<events:45,dwell:15200ms,hesitant:0.42,change:1.8>
[CONF=HIGH] Q:<q-theme2-1> theme:<theme2> action:<rewrite> why:<改選次數偏高且選項分布極端，疑似措辭模糊...> metrics:<events:38,dwell:9800ms,hesitant:0.28,change:2.1>
[CONF=MEDIUM] Q:<q-theme3-2> theme:<theme3> action:<split> why:<長停留且猶豫率偏高，疑似題幹或選項資訊量過重...> metrics:<events:22,dwell:13500ms,hesitant:0.38,change:1.5>
[CONF=MEDIUM] T:<theme4> theme:<theme4> action:<rebalance> why:<同一主題有多題同時出現負荷或歧義跡象...> metrics:<events:67,dwell:11200ms,hesitant:0.35,change:1.9>
[CONF=LOW] Q:<q-theme5-0> theme:<theme5> action:<rewrite> why:<改選次數偏高且選項分布極端，疑似措辭模糊...> metrics:<events:15,dwell:8900ms,hesitant:0.31,change:1.7>

## 4. Summary
Total proposals: 8 (high: 2, medium: 3, low: 3)
Questions with enough data: 62.5%
Warnings:
  - 超過半數題目資料量不足 (5/8 達標)
```

## 🔍 修改檔案清單

1. `scripts/analyticsReport.mjs`
   - 新增門檻常數（3 個）
   - 修改 `buildQuestionProposals()`：資料量檢查、新增欄位
   - 修改 `buildThemeProposals()`：資料量檢查、新增欄位
   - 修改 `buildProposalSummary()`：完整 schema、gating 邏輯

2. `scripts/notifyDigest.mjs`
   - 重構 `buildDigest()`：可執行清單格式
   - 新增 System Health、Funnel、Top 5 Proposals、Summary 分段
   - 新增 `truncate()` 輔助函數

3. `package.json`
   - 新增 `analytics:full:open` script

## ✅ 測試結果

- ✅ Build: PASS (609ms)
- ✅ 無 log 時：安全退出，不 throw
- ✅ Digest 生成：成功（格式正確）
- ✅ 所有修改僅限 scripts 層，不影響 runtime 行為

## 📝 注意事項

1. **資料量門檻**：所有門檻值可在 `analyticsReport.mjs` 頂部調整
2. **Proposal 排序**：Top 5 依 confidence（high > medium > low）和 events 數量排序
3. **Gating 邏輯**：session 不足時，所有 high-confidence proposals 自動降為 medium
4. **無數據處理**：各分段在無數據時顯示 "No data yet" 或 "Nothing to review"

## 🎯 達成目標

- ✅ 報表「有門檻」：資料不足時不產生高信心提案
- ✅ 報表「可讀」：digest 變成結構化清單，一目了然
- ✅ 報表「可決策」：每個 proposal 包含 metrics 和 suggestedChange，可直接行動
- ✅ 保持匿名：不收集 PII，只處理匿名事件數據
- ✅ 不新增重型套件：僅使用現有依賴

---

**實作日期**: 2025-12-29  
**版本**: M-7.5  
**狀態**: ✅ 完成並測試通過

