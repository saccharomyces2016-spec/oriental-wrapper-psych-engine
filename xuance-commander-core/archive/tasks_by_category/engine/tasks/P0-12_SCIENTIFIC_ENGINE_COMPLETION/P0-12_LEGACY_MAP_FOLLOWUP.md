# P0-12 Legacy Map 追問包

**建立日期**：2026-01-12  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**目的**：針對 Legacy Map 審核中發現的問題進行追問

---

## 一、審核結果總結

### 1.1 符合的部分 ✅

1. **第二個版本的 JSON 結構**：
   - ✅ 結構完全正確（沒有 meta 欄位）
   - ✅ 所有 8 個領域都有完整映射
   - ✅ 所有 56 題都有完整映射（7 題 × 8 領域）
   - ✅ 所有 280 個選項都有完整映射（5 個選項 × 56 題）
   - ✅ 所有映射都包含 `pattern` 和 `legacy_weight`

2. **權重一致性**：
   - ✅ 55 題的權重一致
   - ✅ 大部分領域的權重都正確

---

### 1.2 不符合的部分 ❌

1. **第一個版本的 meta 欄位**：
   - ❌ 包含 `meta` 欄位（不應該存在）
   - ✅ 處理方式：使用第二個版本（不包含 meta）

2. **權重不一致問題**：
   - ❌ `chronic_depletion.cd_q7` 的 `legacy_weight` 是 1.0，但應該是 1.2

---

## 二、需要修正的問題

### 2.1 問題 1：第一個版本的 meta 欄位

**問題說明**：
- 第一個版本包含了 `meta` 欄位，但現有系統的 `legacy_map.v1.0.json` 不應該包含 `meta` 欄位

**正確結構要求**：
- legacy_map 文件應該直接以領域名稱作為頂層 key
- 不應該包含 `meta` 欄位
- 每個領域必須包含 `domainId` 和 `mappings`

**處理方式**：
- ✅ 第二個版本已經正確（不包含 meta）
- ✅ 使用第二個版本的結構

---

### 2.2 問題 2：權重不一致

**問題說明**：
- `chronic_depletion.cd_q7` 的所有選項的 `legacy_weight` 是 1.0
- 但 scoring 文件中的 `weight` 是 1.2
- 需要修正為 1.2

**正確要求**：
- `legacy_weight` 必須與對應的 scoring 文件中的 `weight` 完全一致
- 每個題目的所有選項（choice 0-4）使用相同的 `legacy_weight`（對應題目級別的權重）

**需要修正的內容**：

**當前（錯誤）**：
```json
{
  "chronic_depletion": {
    "mappings": {
      "cd_q7": {
        "0": { "pattern": "energy_leak", "legacy_weight": 1.0 },
        "1": { "pattern": "energy_leak", "legacy_weight": 1.0 },
        "2": { "pattern": "uncontained_drain", "legacy_weight": 1.0 },
        "3": { "pattern": "plugging_leaks", "legacy_weight": 1.0 },
        "4": { "pattern": "energy_retention", "legacy_weight": 1.0 }
      }
    }
  }
}
```

**應該修正為**：
```json
{
  "chronic_depletion": {
    "mappings": {
      "cd_q7": {
        "0": { "pattern": "energy_leak", "legacy_weight": 1.2 },
        "1": { "pattern": "energy_leak", "legacy_weight": 1.2 },
        "2": { "pattern": "uncontained_drain", "legacy_weight": 1.2 },
        "3": { "pattern": "plugging_leaks", "legacy_weight": 1.2 },
        "4": { "pattern": "energy_retention", "legacy_weight": 1.2 }
      }
    }
  }
}
```

---

## 三、完整的權重對應表（參考）

以下為所有 8 個領域的完整權重對應表，用於驗證：

### chronic_depletion

| 題目 ID | Scoring Weight | 應該的 Legacy Weight |
|---------|----------------|---------------------|
| cd_q1 | 1.0 | 1.0 |
| cd_q2 | 1.0 | 1.0 |
| cd_q3 | 1.2 | 1.2 |
| cd_q4 | 1.0 | 1.0 |
| cd_q5 | 1.0 | 1.0 |
| cd_q6 | 1.1 | 1.1 |
| cd_q7 | 1.2 | 1.2 ⚠️ **需要修正** |

### chronic_alertness

| 題目 ID | Scoring Weight | 應該的 Legacy Weight |
|---------|----------------|---------------------|
| ca_q1 | 1.2 | 1.2 |
| ca_q2 | 1.0 | 1.0 |
| ca_q3 | 1.1 | 1.1 |
| ca_q4 | 1.0 | 1.0 |
| ca_q5 | 1.0 | 1.0 |
| ca_q6 | 1.0 | 1.0 |
| ca_q7 | 0.9 | 0.9 |

### fear_based_stability

| 題目 ID | Scoring Weight | 應該的 Legacy Weight |
|---------|----------------|---------------------|
| fbs_q1 | 1.2 | 1.2 |
| fbs_q2 | 1.1 | 1.1 |
| fbs_q3 | 1.0 | 1.0 |
| fbs_q4 | 1.0 | 1.0 |
| fbs_q5 | 1.1 | 1.1 |
| fbs_q6 | 1.0 | 1.0 |
| fbs_q7 | 1.0 | 1.0 |

### hyper_responsibility

| 題目 ID | Scoring Weight | 應該的 Legacy Weight |
|---------|----------------|---------------------|
| hr_q1 | 1.2 | 1.2 |
| hr_q2 | 1.1 | 1.1 |
| hr_q3 | 1.0 | 1.0 |
| hr_q4 | 1.0 | 1.0 |
| hr_q5 | 1.0 | 1.0 |
| hr_q6 | 1.1 | 1.1 |
| hr_q7 | 0.9 | 0.9 |

### identity_diffusion

| 題目 ID | Scoring Weight | 應該的 Legacy Weight |
|---------|----------------|---------------------|
| id_q1 | 1.2 | 1.2 |
| id_q2 | 1.1 | 1.1 |
| id_q3 | 1.0 | 1.0 |
| id_q4 | 1.0 | 1.0 |
| id_q5 | 1.0 | 1.0 |
| id_q6 | 1.0 | 1.0 |
| id_q7 | 1.1 | 1.1 |

### loss_of_agency

| 題目 ID | Scoring Weight | 應該的 Legacy Weight |
|---------|----------------|---------------------|
| la_q1 | 1.2 | 1.2 |
| la_q2 | 1.1 | 1.1 |
| la_q3 | 1.0 | 1.0 |
| la_q4 | 1.2 | 1.2 |
| la_q5 | 1.0 | 1.0 |
| la_q6 | 1.0 | 1.0 |
| la_q7 | 0.9 | 0.9 |

### meaning_vacuum

| 題目 ID | Scoring Weight | 應該的 Legacy Weight |
|---------|----------------|---------------------|
| mv_q1 | 1.2 | 1.2 |
| mv_q2 | 1.1 | 1.1 |
| mv_q3 | 1.0 | 1.0 |
| mv_q4 | 1.0 | 1.0 |
| mv_q5 | 1.1 | 1.1 |
| mv_q6 | 1.0 | 1.0 |
| mv_q7 | 1.0 | 1.0 |

### suppressed_needs

| 題目 ID | Scoring Weight | 應該的 Legacy Weight |
|---------|----------------|---------------------|
| sn_q1 | 1.2 | 1.2 |
| sn_q2 | 1.1 | 1.1 |
| sn_q3 | 1.0 | 1.0 |
| sn_q4 | 1.1 | 1.1 |
| sn_q5 | 1.0 | 1.0 |
| sn_q6 | 1.0 | 1.0 |
| sn_q7 | 1.1 | 1.1 |

---

## 四、關鍵背景資料

### 4.1 現有系統的 legacy_map 標準結構

**文件位置**：`domain/knowledge_base/legacy_map.v1.0.json`

**標準結構**：
```json
{
  "chronic_depletion": {
    "domainId": "chronic_depletion",
    "mappings": {
      "cd_q1": {
        "0": { "pattern": "...", "legacy_weight": 1.0 },
        "1": { "pattern": "...", "legacy_weight": 1.0 },
        "2": { "pattern": "...", "legacy_weight": 1.0 },
        "3": { "pattern": "...", "legacy_weight": 1.0 },
        "4": { "pattern": "...", "legacy_weight": 1.0 }
      }
    }
  }
}
```

**關鍵要求**：
- ✅ 頂層直接是領域名稱（domain_id），不是 `meta` 物件
- ✅ 每個領域包含 `domainId` 和 `mappings`
- ❌ 不應該包含 `meta` 欄位

---

### 4.2 Scoring 文件的權重對應

**文件位置**：`domain/facets/{domain_id}.scoring.v1.0.json`

**結構範例**（`chronic_depletion.scoring.v1.0.json`）：
```json
{
  "model": "weighted_sum",
  "inputs": [
    { "questionId": "cd_q1", "weight": 1.0, "direction": "higher_is_worse" },
    { "questionId": "cd_q2", "weight": 1.0, "direction": "higher_is_worse" },
    { "questionId": "cd_q3", "weight": 1.2, "direction": "higher_is_worse" },
    { "questionId": "cd_q7", "weight": 1.2, "direction": "higher_is_worse" }
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

**關鍵要求**：
- `legacy_weight` 必須與 `inputs` 陣列中對應題目的 `weight` 完全一致
- 每個題目的所有選項（choice 0-4）使用相同的 `legacy_weight`（對應題目級別的權重）

---

## 五、追問要求

### 5.1 必須修正的問題

1. **使用第二個版本的結構**（不包含 meta 欄位）：
   - ✅ 第二個版本已經正確
   - ✅ 使用第二個版本的結構

2. **修正權重不一致**：
   - ❌ 修正 `chronic_depletion.cd_q7` 的所有選項的 `legacy_weight` 從 1.0 改為 1.2
   - 具體修正：所有 `cd_q7` 的 5 個選項（choice 0-4）的 `legacy_weight` 都應該從 1.0 改為 1.2

---

### 5.2 驗證要求

**通過標準**：
1. ✅ JSON 結構正確（沒有 meta 欄位）
2. ✅ 所有 8 個領域都有完整映射
3. ✅ 每個領域的所有 7 題都有完整映射
4. ✅ 每個題目的所有 5 個選項（choice 0-4）都有映射
5. ✅ 所有映射都包含 `pattern` 和 `legacy_weight`
6. ✅ 所有 `legacy_weight` 都與 scoring 文件中的 `weight` 一致

---

### 5.3 修正後的預期輸出

**修正後的 `chronic_depletion.cd_q7` 應該為**：
```json
{
  "chronic_depletion": {
    "domainId": "chronic_depletion",
    "mappings": {
      "cd_q7": {
        "0": { "pattern": "energy_leak", "legacy_weight": 1.2 },
        "1": { "pattern": "energy_leak", "legacy_weight": 1.2 },
        "2": { "pattern": "uncontained_drain", "legacy_weight": 1.2 },
        "3": { "pattern": "plugging_leaks", "legacy_weight": 1.2 },
        "4": { "pattern": "energy_retention", "legacy_weight": 1.2 }
      }
    }
  }
}
```

---

---

## 六、關鍵說明

### 6.1 權威來源

**重要**：`legacy_weight` 必須與**實際系統中的 scoring 文件**一致。

**實際系統中的 scoring 文件位置**：
- `domain/facets/{domain_id}.scoring.v1.0.json`

**不是**：
- ❌ v3.0 資料包中的 scoring 文件
- ❌ 其他版本的 scoring 文件

**原因**：
- 實際系統中的 scoring 文件是當前系統的權威來源
- 這些文件已經被寫入系統並使用
- `legacy_weight` 必須與這些文件的權重一致

---

### 6.2 修正步驟

1. **讀取實際系統中的 scoring 文件**：
   - 從 `domain/facets/` 目錄讀取所有領域的 scoring 文件

2. **提取權重**：
   - 從 `inputs` 陣列中提取每個題目的 `weight`

3. **更新 legacy_map**：
   - 將所有題目的所有選項（choice 0-4）的 `legacy_weight` 更新為對應的權重

4. **驗證**：
   - 確保所有權重都與實際系統中的 scoring 文件一致

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**當前狀態**：❌ **需要修正 47 題的權重不一致問題**
