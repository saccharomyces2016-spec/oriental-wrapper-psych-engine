# Gate 1 修正與 Gate 2 開始指引

**建立日期**：2026-01-12  
**目的**：修正 Gate 1 處理中的問題，開始 Gate 2  
**文件狀態**：READY FOR GATE 2

---

## ⚠️ Gate 1 問題發現

### 問題：Narratives 處理過於激進

**發現**：
- 部分 narratives 有實際的 `opening` 內容，但被標註為 `_status: "MISSING"`
- 例如：`chronic_depletion`、`hyper_responsibility`、`social_comparison` 等都有實際的 opening 內容
- 只是 `explain` 欄位可能是 placeholder 或空字串

**正確處理方式**：
- 如果 `opening` 有實際內容，應該**保留內容**，只標註 `explain` 為 MISSING（如果需要）
- 只有**完全沒有內容**的才標註整個檔案為 MISSING

---

## ✅ Gate 1 正確處理的部分

**✅ 正確標註為 MISSING**：
- Questions（2 個）：`self_erosion`、`unprocessed_loss` ✅
- Recommendations（3 個）：`social_comparison`、`emotional_permeability`、`avoidance_coping` ✅
- Narratives（2 個）：`self_erosion`、`unprocessed_loss` ✅（完全沒有內容）
- Riskchains（5 個）：`suppressed_needs`、`identity_diffusion`、`meaning_vacuum`、`self_erosion`、`unprocessed_loss` ✅

---

## 🔧 Gate 1 需要修正的部分

### Narratives 需要重新處理

**有實際內容的 Narratives**（需要保留內容）：
1. `chronic_depletion` - 有 opening 內容
2. `hyper_responsibility` - 有 opening 內容
3. `social_comparison` - 有 opening 內容
4. `identity_diffusion` - 有部分 opening 內容
5. `loss_of_agency` - 有 opening 內容
6. `chronic_alertness` - 有 opening 內容
7. `emotional_permeability` - 有 opening 內容
8. `avoidance_coping` - 有 opening 內容
9. `fear_based_stability` - 有 opening 內容
10. `suppressed_needs` - 有 opening 內容

**完全沒有內容的 Narratives**（正確標註為 MISSING）：
1. `self_erosion` - ✅ 正確標註為 MISSING
2. `unprocessed_loss` - ✅ 正確標註為 MISSING
3. `meaning_vacuum` - ✅ 正確標註為 MISSING（如果完全沒有內容）

---

## 🎯 Gate 2 開始指引

### Gate 2 目標

**目標**：把 EXTRACTION_WORKSPACE 從「提取包」推進到「可直接被新版系統載入的資料包」

**核心要求**：
- **必須依照新版網頁結構、UI結構進行轉化**
- **必須排除所有 LEGACY 架構內容**
- **必須符合新版系統的檔案命名和結構規範**

---

### Gate 2 步驟

#### 步驟 1：修正 Narratives（如果需要）

**對於有 opening 內容的 narratives**：
- 保留 `opening` 內容
- 如果 `explain` 是 placeholder，可以留空或從其他來源補充
- **移除 `_status: "MISSING"` 標記**（如果整個檔案不是 MISSING）

**對於完全沒有內容的 narratives**：
- 保留 `_status: "MISSING"` 標記
- 產出符合新版格式但內容為空的檔案

---

#### 步驟 2：轉化為新版架構格式

**轉化順序**：
1. **Manifests** - 先轉化所有 manifest
2. **Questions** - 轉化所有 questions（排除 LEGACY 欄位）
3. **Narratives** - 轉化所有 narratives（排除 LEGACY 欄位，保留有內容的部分）
4. **Recommendations** - 轉化所有 recommendations（排除 LEGACY 欄位）
5. **Riskchains** - 轉化所有 riskchains（排除 LEGACY 欄位）

**轉化要求**：
- 必須符合新版系統的檔案命名和結構規範
- 必須排除所有 LEGACY 欄位（`_extracted_from`、`_note`、`_raw_anchors` 等）
- 必須符合新版網頁 UI 結構

---

#### 步驟 3：處理 MISSING 內容

**處理方式**：
- 對於標註為 `_status: "MISSING"` 的檔案：
  - 產出符合新版格式的檔案
  - 保留 `_status: "MISSING"` 標記（但必須符合新版格式）
  - 在 manifest 中標註缺失的來源

---

#### 步驟 4：建立對照表

**需要建立的對照表**：
1. Legacy → 新版系統對照表
2. 主題對照表
3. 欄位對照表

---

#### 步驟 5：產出最終資料包

**產出位置**：
- 建議產出到 `EXTRACTION_WORKSPACE/domain_output/` 或類似資料夾

**產出內容**：
- 所有轉化後的 domain/ 結構檔案
- 所有 manifest 檔案
- 對照表文件
- 轉化過程記錄

---

## 📋 Gate 2 檢查清單

- [ ] 修正 narratives 處理（保留有內容的部分）
- [ ] 所有資料已轉化為新版架構格式
- [ ] 所有檔案命名符合新版規範
- [ ] 所有 LEGACY 欄位已排除
- [ ] 所有 manifest 正確指向各分檔
- [ ] 所有 MISSING 內容已正確處理
- [ ] 已建立對照表
- [ ] 已產出最終資料包

---

## 🚀 開始 Gate 2

### 建議行動

1. **先修正 narratives**（如果需要）
   - 檢查哪些 narratives 有實際內容
   - 保留有內容的部分，移除錯誤的 MISSING 標記

2. **開始轉化**
   - 從 manifests 開始
   - 然後轉化其他類型

3. **產出最終資料包**
   - 產出所有轉化後的檔案
   - 建立對照表

---

**文件狀態**：READY FOR GATE 2  
**最後更新**：2026-01-12  
**下一步**：開始 Gate 2（轉化為新版架構格式）
