# Gate 1 審核與 Gate 2 指引

**建立日期**：2026-01-12  
**目的**：審核 Gate 1 處理結果，提供 Gate 2 指引  
**文件狀態**：READY FOR GATE 2

---

## ✅ Gate 1 審核結果

### 1.1 處理正確的部分

**✅ 正確標註為 MISSING**：
- Questions（2 個）：`self_erosion`、`unprocessed_loss` ✅
- Recommendations（3 個）：`social_comparison`、`emotional_permeability`、`avoidance_coping` ✅
- Narratives（2 個）：`self_erosion`、`unprocessed_loss` ✅
- Riskchains（5 個）：`suppressed_needs`、`identity_diffusion`、`meaning_vacuum`、`self_erosion`、`unprocessed_loss` ✅

**✅ 處理方式正確**：
- 所有 MISSING 檔案都已標註 `_status: "MISSING"`
- Placeholder 內容已清空
- 已記錄檢查來源和原因

---

### 1.2 需要確認的部分

**⚠️ Narratives 處理需要確認**：

根據 Gate 1 報告，有 13 個 narratives 被標註為 MISSING，但根據之前的提取記錄：
- 部分 narratives 有實際內容（從 anchor_statements 和 ContentDB 提取）
- 只是 `explain` 欄位可能是 placeholder

**需要確認**：
- 如果 `opening` 有實際內容，應該保留並標註 `explain` 為 MISSING
- 如果整個檔案都是 placeholder，才標註整個檔案為 MISSING

**建議**：
- 檢查 narratives 檔案，確認哪些有實際 `opening` 內容
- 對於有 `opening` 內容但 `explain` 是 placeholder 的，保留 `opening`，只標註 `explain` 為 MISSING

---

## 🎯 Gate 2 指引

### 2.1 Gate 2 目標

**目標**：把 EXTRACTION_WORKSPACE 從「提取包」推進到「可直接被新版系統載入的資料包」

**核心要求**：
- **必須依照新版網頁結構、UI結構進行轉化**
- **必須排除所有 LEGACY 架構內容**
- **必須符合新版系統的檔案命名和結構規範**

---

### 2.2 Gate 2 步驟

#### 步驟 1：轉化所有資料為新版架構格式

**參考範例**：
- Manifest：`domain/manifests/stress_recovery.v1.0.json`
- Questions：`domain/questions/stress_recovery.questions.v1.0.json`
- Narratives：`domain/narratives/stress_recovery.narr.v1.0.json`
- Recommendations：`domain/recommendations/stress_recovery.reco.v1.0.json`
- Riskchains：`domain/riskchains/stress_recovery.risk.v1.0.json`

**轉化要求**：
1. **Manifests**
   - 必須符合 `schemas/domain_manifest.schema.json`
   - 必須包含 `domainVersion`、`facetId`、`sources`
   - `sources` 必須指向正確的檔案路徑

2. **Questions**
   - 必須是陣列格式
   - 每個問題必須有 `id`、`text`、`type`、`scale`
   - `type` 必須是 `likert_5`
   - `scale` 必須是 5 個選項的陣列
   - **排除所有 LEGACY 欄位**（如 `_extracted_from`、`_note` 等）

3. **Narratives**
   - 必須有 `low`、`mid`、`high` 三個層級
   - 每個層級必須有 `opening` 和 `explain` 欄位
   - **排除所有 LEGACY 欄位**（如 `_extracted_from`、`_raw_anchors` 等）
   - 如果 `explain` 是 MISSING，可以留空或標註

4. **Recommendations**
   - 必須有 `low`、`mid`、`high` 三個層級
   - 每個層級是陣列，包含多個建議
   - 每個建議必須有 `id`、`title`、`steps`
   - **排除所有 LEGACY 欄位**

5. **Riskchains**
   - 必須有 `mid`、`high` 兩個層級（或 `low`、`mid`、`high`）
   - 每個層級包含 `if_not_improve` 陣列
   - **排除所有 LEGACY 欄位**

---

#### 步驟 2：處理 MISSING 內容

**處理方式**：
- 對於標註為 `_status: "MISSING"` 的檔案：
  - 如果整個檔案都是 MISSING，產出符合新版格式但內容為空的檔案
  - 在 manifest 中標註該來源為 MISSING
  - 或在檔案中保留 `_status: "MISSING"` 標記（但必須符合新版格式）

**建議**：
- 產出符合新版格式的檔案
- 在檔案中保留 `_status: "MISSING"` 標記
- 在 manifest 中標註缺失的來源

---

#### 步驟 3：建立對照表

**需要建立的對照表**：
1. Legacy → 新版系統對照表
2. 主題對照表
3. 欄位對照表

---

#### 步驟 4：產出最終資料包

**產出位置**：
- 建議產出到 `EXTRACTION_WORKSPACE/domain_output/` 或類似資料夾
- 或直接產出到 `domain/` 結構（如果確定可以）

**產出內容**：
- 所有轉化後的 domain/ 結構檔案
- 所有 manifest 檔案
- 對照表文件
- 轉化過程記錄

---

### 2.3 Gate 2 檢查清單

- [ ] 所有資料已轉化為新版架構格式
- [ ] 所有檔案命名符合新版規範
- [ ] 所有 LEGACY 欄位已排除
- [ ] 所有 manifest 正確指向各分檔
- [ ] 所有 MISSING 內容已正確處理
- [ ] 已建立對照表
- [ ] 已產出最終資料包

---

## 📋 重要提醒

### 1. 必須排除 LEGACY 欄位

**禁止保留的欄位**：
- `_extracted_from`
- `_extraction_date`
- `_note`
- `_raw_anchors`
- `_contentdb_sources`
- `_updated_from`
- 其他所有以 `_` 開頭的元資料欄位

**允許保留的欄位**（如果需要）：
- `_status: "MISSING"`（如果需要標註缺失）

---

### 2. 必須符合新版格式

**必須遵守**：
- 檔案命名：`{facetId}.{type}.v1.0.json`
- 資料格式：必須符合新版系統規範
- 內容結構：必須符合新版網頁 UI 結構

---

### 3. 必須排除 LEGACY 架構

**禁止**：
- 使用任何 LEGACY 架構的結構
- 使用任何 LEGACY 架構的命名
- 使用任何 LEGACY 架構的格式

---

## 🚀 開始 Gate 2

### 第一步：確認 Gate 1 處理結果

1. 檢查 narratives 檔案，確認哪些有實際內容
2. 對於有內容但部分欄位是 placeholder 的，保留內容，只標註缺失欄位

### 第二步：開始轉化

1. 從 manifests 開始轉化
2. 然後轉化 questions、narratives、recommendations、riskchains
3. 確保所有檔案符合新版格式

### 第三步：產出最終資料包

1. 產出所有轉化後的檔案
2. 建立對照表
3. 產出轉化過程記錄

---

**文件狀態**：READY FOR GATE 2  
**最後更新**：2026-01-12  
**下一步**：開始 Gate 2（轉化為新版架構格式）
