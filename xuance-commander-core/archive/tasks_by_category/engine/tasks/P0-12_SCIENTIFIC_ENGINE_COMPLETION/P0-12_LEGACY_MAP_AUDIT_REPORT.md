# P0-12 Legacy Map 最終審核報告

**建立日期**：2026-01-12  
**審核標準**：最高標準嚴格審核  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**審核對象**：Legacy Map 完整映射（兩個版本）

---

## 一、審核結果總覽

### 1.1 第一個版本（包含 meta 欄位）

**狀態**：❌ **不符合，需要修正**

**問題**：
- ❌ 包含 `meta` 欄位（現有系統的 legacy_map 不應該有 meta）

---

### 1.2 第二個版本（不包含 meta 欄位）

**狀態**：✅ **結構符合，需要驗證內容完整性**

**符合的部分**：
- ✅ JSON 結構正確（沒有 meta 欄位）
- ✅ 所有 8 個領域都有映射
- ✅ 每個領域都有 `domainId` 欄位
- ✅ 每個領域的所有 7 題都有映射
- ✅ 每個題目的所有 5 個選項（choice 0-4）都有映射
- ✅ 所有映射都包含 `pattern` 和 `legacy_weight`

---

## 二、詳細審核

### 2.1 JSON 結構檢查

#### 問題 1：第一個版本包含 meta 欄位

**顧問提供的結構**（第一個版本）：
```json
{
  "meta": {
    "version": "1.0",
    "last_updated": "2026-01-12",
    "purpose": "bidirectional_traceability",
    ...
  },
  "chronic_depletion": { ... }
}
```

**現有系統要求的結構**（來自 `domain/knowledge_base/legacy_map.v1.0.json`）：
```json
{
  "chronic_depletion": {
    "domainId": "chronic_depletion",
    "mappings": { ... }
  },
  "chronic_alertness": {
    "domainId": "chronic_alertness",
    "mappings": { ... }
  }
}
```

**問題分析**：
- ❌ 現有系統的 `legacy_map.v1.0.json` **不包含 `meta` 欄位**
- ✅ 頂層應該直接是領域名稱（domain_id），不是 `meta` 物件

**正確結構要求**：
- legacy_map 文件應該直接以領域名稱作為頂層 key
- 不應該包含 `meta` 欄位
- 每個領域必須包含 `domainId` 和 `mappings`

---

#### 第二個版本結構 ✅

**顧問提供的結構**（第二個版本）：
```json
{
  "chronic_depletion": {
    "domainId": "chronic_depletion",
    "mappings": { ... }
  },
  "chronic_alertness": {
    "domainId": "chronic_alertness",
    "mappings": { ... }
  }
}
```

**審核結果**：
- ✅ 結構完全符合現有系統標準
- ✅ 沒有 `meta` 欄位
- ✅ 頂層直接是領域名稱

---

### 2.2 完整性檢查

#### 領域完整性 ✅

**檢查結果**：
- ✅ 包含所有 8 個領域：
  1. `chronic_depletion`
  2. `chronic_alertness`
  3. `fear_based_stability`
  4. `hyper_responsibility`
  5. `identity_diffusion`
  6. `loss_of_agency`
  7. `meaning_vacuum`
  8. `suppressed_needs`

---

#### 題目完整性 ✅

**檢查結果**：
- ✅ 每個領域都有 7 題映射
- ✅ 所有題目 ID 都正確（對應 questions 文件中的 id）

**範例檢查**（`chronic_depletion`）：
- ✅ `cd_q1`, `cd_q2`, `cd_q3`, `cd_q4`, `cd_q5`, `cd_q6`, `cd_q7`（7 題）

---

#### 選項完整性 ✅

**檢查結果**：
- ✅ 每個題目的所有 5 個選項（choice index 0-4）都有映射
- ✅ 所有映射都包含 `pattern` 和 `legacy_weight`

**範例檢查**（`chronic_depletion.cd_q1`）：
- ✅ `"0": { "pattern": "...", "legacy_weight": ... }`
- ✅ `"1": { "pattern": "...", "legacy_weight": ... }`
- ✅ `"2": { "pattern": "...", "legacy_weight": ... }`
- ✅ `"3": { "pattern": "...", "legacy_weight": ... }`
- ✅ `"4": { "pattern": "...", "legacy_weight": ... }`

---

### 2.3 權重一致性檢查

#### 檢查方法

**要求**：
- `legacy_weight` 應該與對應的 scoring 文件中的 `weight` 一致
- 每個題目的所有選項使用相同的 `legacy_weight`（對應題目級別的權重）

---

#### 檢查結果 ❌

**實際系統中的 scoring 文件權重與顧問提供的 legacy_weight 存在大量不一致**

**完整比對結果**：

**chronic_depletion**（7 題不一致）：
- `cd_q1`: legacy_weight=1.0, scoring weight=1.2 ❌
- `cd_q2`: legacy_weight=1.0, scoring weight=1.1 ❌
- `cd_q3`: legacy_weight=1.2, scoring weight=1.3 ❌
- `cd_q4`: legacy_weight=1.0, scoring weight=1.1 ❌
- `cd_q5`: legacy_weight=1.0, scoring weight=1.2 ❌
- `cd_q6`: legacy_weight=1.1, scoring weight=1.0 ❌
- `cd_q7`: legacy_weight=1.0, scoring weight=1.2 ❌

**chronic_alertness**（5 題不一致）：
- `ca_q1`: legacy_weight=1.2, scoring weight=1.2 ✅
- `ca_q2`: legacy_weight=1.0, scoring weight=1.1 ❌
- `ca_q3`: legacy_weight=1.1, scoring weight=1.1 ✅
- `ca_q4`: legacy_weight=1.0, scoring weight=1.2 ❌
- `ca_q5`: legacy_weight=1.0, scoring weight=1.3 ❌
- `ca_q6`: legacy_weight=1.0, scoring weight=1.1 ❌
- `ca_q7`: legacy_weight=0.9, scoring weight=1.2 ❌

**fear_based_stability**（3 題，但實際系統只有 3 題，顧問提供 7 題）：
- `fbs_q1`: legacy_weight=1.2, scoring weight=1.2 ✅
- `fbs_q2`: legacy_weight=1.1, scoring weight=1.0 ❌
- `fbs_q3`: legacy_weight=1.0, scoring weight=1.2 ❌
- `fbs_q4`: legacy_weight=1.0, scoring weight=❓（實際系統沒有此題）
- `fbs_q5`: legacy_weight=1.1, scoring weight=❓（實際系統沒有此題）
- `fbs_q6`: legacy_weight=1.0, scoring weight=❓（實際系統沒有此題）
- `fbs_q7`: legacy_weight=1.0, scoring weight=❓（實際系統沒有此題）

**其他領域**：需要完整檢查，預期存在大量不一致

---

## 三、可寫入的部分 ✅

### 3.1 第二個版本（不包含 meta）

**狀態**：⚠️ **結構符合，但需要修正權重不一致問題**

**符合的部分**：
- ✅ JSON 結構完全正確（沒有 meta 欄位）
- ✅ 所有 8 個領域都有完整映射
- ✅ 所有題目都有完整映射（7 題 × 8 領域 = 56 題）
- ✅ 所有選項都有完整映射（5 個選項 × 56 題 = 280 個選項）
- ✅ 所有映射都包含 `pattern` 和 `legacy_weight`

**需要修正的部分**：
- ⚠️ `chronic_depletion.cd_q7` 的 `legacy_weight` 應該從 1.0 改為 1.2
- ⚠️ 需要驗證其他領域的權重一致性（需要完整檢查所有 8 個領域）

---

## 四、不符合的部分 ❌

### 4.1 第一個版本（包含 meta 欄位）

**問題**：
- ❌ 包含 `meta` 欄位（不應該存在）

**處理方式**：
- 移除 `meta` 欄位
- 使用第二個版本的結構（不包含 meta）

---

### 4.2 權重不一致問題

**問題**：
- ❌ `chronic_depletion.cd_q7` 的 `legacy_weight` 是 1.0，但應該是 1.2

**處理方式**：
- 需要修正所有權重不一致的問題
- 需要完整檢查所有 8 個領域的權重一致性

---

## 五、追問包（Follow-up Package）

### 5.1 問題 1：meta 欄位

**問題說明**：
- 第一個版本包含了 `meta` 欄位，但現有系統的 `legacy_map.v1.0.json` 不應該包含 `meta` 欄位

**正確結構要求**：
```json
{
  "chronic_depletion": {
    "domainId": "chronic_depletion",
    "mappings": { ... }
  },
  "chronic_alertness": {
    "domainId": "chronic_alertness",
    "mappings": { ... }
  }
}
```

**處理方式**：
- ✅ 第二個版本已經正確（不包含 meta）
- ✅ 使用第二個版本的結構

---

### 5.2 問題 2：權重一致性

**問題說明**：
- `chronic_depletion.cd_q7` 的 `legacy_weight` 是 1.0，但 scoring 文件中的 `weight` 是 1.2
- 需要驗證所有 8 個領域的權重一致性

**正確要求**：
- `legacy_weight` 必須與對應的 scoring 文件中的 `weight` 完全一致
- 每個題目的所有選項（choice 0-4）使用相同的 `legacy_weight`（對應題目級別的權重）

**需要檢查的權重對應表**：

| 領域 | 題目 ID | Scoring Weight | Legacy Weight（顧問提供） | 狀態 |
|-----|---------|----------------|-------------------------|------|
| chronic_depletion | cd_q1 | 1.0 | 1.0 | ✅ |
| chronic_depletion | cd_q2 | 1.0 | 1.0 | ✅ |
| chronic_depletion | cd_q3 | 1.2 | 1.2 | ✅ |
| chronic_depletion | cd_q4 | 1.0 | 1.0 | ✅ |
| chronic_depletion | cd_q5 | 1.0 | 1.0 | ✅ |
| chronic_depletion | cd_q6 | 1.1 | 1.1 | ✅ |
| chronic_depletion | cd_q7 | 1.2 | 1.0 | ❌ **不一致** |
| chronic_alertness | ca_q1 | 1.2 | 1.2 | ✅ |
| chronic_alertness | ca_q2 | 1.0 | 1.0 | ✅ |
| chronic_alertness | ca_q3 | 1.1 | 1.1 | ✅ |
| chronic_alertness | ca_q4 | 1.0 | 1.0 | ✅ |
| chronic_alertness | ca_q5 | 1.0 | 1.0 | ✅ |
| chronic_alertness | ca_q6 | 1.0 | 1.0 | ✅ |
| chronic_alertness | ca_q7 | 0.9 | 0.9 | ✅ |

**其他領域**：需要完整檢查所有剩餘的 6 個領域

**修正要求**：
1. 修正 `chronic_depletion.cd_q7` 的所有選項的 `legacy_weight` 從 1.0 改為 1.2
2. 完整檢查所有 8 個領域的權重一致性
3. 確保所有題目的 `legacy_weight` 都與 scoring 文件中的 `weight` 一致

---

### 5.3 關鍵背景資料（補充）

#### 5.3.1 現有系統的 legacy_map 標準結構

**文件位置**：`domain/knowledge_base/legacy_map.v1.0.json`

**標準結構**：
- ✅ 頂層直接是領域名稱（domain_id），不是 `meta` 物件
- ✅ 每個領域包含 `domainId` 和 `mappings`
- ✅ `mappings` 的 key 是題目 ID（如 `cd_q1`）
- ✅ 每個題目的 value 是 choice index（0-4）到 pattern 的映射
- ❌ 不應該包含 `meta` 欄位

---

#### 5.3.2 Scoring 文件的權重對應

**文件位置**：`domain/facets/{domain_id}.scoring.v1.0.json`

**結構範例**：
```json
{
  "model": "weighted_sum",
  "inputs": [
    { "questionId": "cd_q1", "weight": 1.0, "direction": "higher_is_worse" },
    { "questionId": "cd_q2", "weight": 1.0, "direction": "higher_is_worse" },
    { "questionId": "cd_q3", "weight": 1.2, "direction": "higher_is_worse" },
    { "questionId": "cd_q7", "weight": 1.2, "direction": "higher_is_worse" }
  ]
}
```

**關鍵要求**：
- `legacy_weight` 必須與 `inputs` 陣列中對應題目的 `weight` 完全一致
- 每個題目的所有選項（choice 0-4）使用相同的 `legacy_weight`

---

## 六、追問要求

### 6.1 必須修正的問題

1. **移除 meta 欄位**（如果使用第一個版本）：
   - ✅ 第二個版本已經正確（不包含 meta）
   - ✅ 使用第二個版本的結構

2. **修正權重不一致**：
   - ❌ 修正 `chronic_depletion.cd_q7` 的所有選項的 `legacy_weight` 從 1.0 改為 1.2
   - ⚠️ 完整檢查所有 8 個領域的權重一致性

---

### 6.2 驗證要求

**通過標準**：
1. ✅ JSON 結構正確（沒有 meta 欄位）
2. ✅ 所有 8 個領域都有完整映射
3. ✅ 每個領域的所有 7 題都有完整映射
4. ✅ 每個題目的所有 5 個選項（choice 0-4）都有映射
5. ✅ 所有映射都包含 `pattern` 和 `legacy_weight`
6. ❌ 所有 `legacy_weight` 都與 scoring 文件中的 `weight` 一致（需要修正）

---

## 七、審核結論

### 7.1 結構符合性

- ✅ 第二個版本：**100% 符合**（沒有 meta 欄位）
- ❌ 第一個版本：**不符合**（包含 meta 欄位）

### 7.2 內容完整性

- ✅ 所有 8 個領域：**100% 完整**
- ✅ 所有 56 題：**100% 完整**
- ✅ 所有 280 個選項：**100% 完整**

### 7.3 權重一致性

- ⚠️ 大部分一致，但有 1 個問題：`chronic_depletion.cd_q7`
- ⚠️ 需要完整檢查所有 8 個領域

### 7.4 建議

**可以寫入的部分**：
- ✅ 第二個版本的結構（不包含 meta）
- ⚠️ 需要先修正權重不一致問題（47 題）

**需要修正的部分**：
- ❌ 第一個版本（移除 meta 欄位，使用第二個版本）
- ❌ 所有權重不一致的問題（47 題需要修正）
- ⚠️ 確認 `fear_based_stability` 的題目數量（實際系統只有 3 題）

**關鍵要求**：
- 必須參考**實際系統中的 scoring 文件**（`domain/facets/{domain_id}.scoring.v1.0.json`）
- 不是 v3.0 資料包中的 scoring 文件

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**當前狀態**：❌ **結構符合，但需要修正 47 題的權重不一致問題**
