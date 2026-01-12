# Gate 2 開始指引

**建立日期**：2026-01-12  
**目的**：明確說明 Gate 2 的開始步驟和要求  
**文件狀態**：READY FOR GATE 2

---

## ✅ Gate 1 狀態確認

### 正確處理的部分

**✅ 已正確標註為 MISSING**：
- Questions（2 個）：`self_erosion`、`unprocessed_loss`
- Recommendations（3 個）：`social_comparison`、`emotional_permeability`、`avoidance_coping`
- Narratives（3 個）：`self_erosion`、`unprocessed_loss`、`meaning_vacuum`（如果完全沒有內容）
- Riskchains（5 個）：`suppressed_needs`、`identity_diffusion`、`meaning_vacuum`、`self_erosion`、`unprocessed_loss`

### 需要注意的部分

**⚠️ Narratives 處理**：
- 部分 narratives 有實際的 `opening` 內容，但被標註為 `_status: "MISSING"`
- 在 Gate 2 轉化時，**請保留有內容的部分**，只處理 `explain` 欄位（如果需要）

---

## 🎯 Gate 2 目標

**目標**：把 EXTRACTION_WORKSPACE 從「提取包」推進到「可直接被新版系統載入的資料包」

**核心要求**：
- **必須依照新版網頁結構、UI結構進行轉化**
- **必須排除所有 LEGACY 架構內容**
- **必須符合新版系統的檔案命名和結構規範**

---

## 📋 Gate 2 步驟

### 步驟 1：轉化 Manifests

**目標**：建立所有主題的 manifest 檔案

**要求**：
- 必須符合 `schemas/domain_manifest.schema.json`
- 必須包含 `domainVersion: "1.0"`、`facetId`、`sources`
- `sources` 必須指向正確的檔案路徑（使用 `domain/` 路徑格式）

**範例**：參考 `domain/manifests/stress_recovery.v1.0.json`

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/manifests/`

---

### 步驟 2：轉化 Questions

**目標**：轉化所有 questions 為新版格式

**要求**：
- 必須是陣列格式
- 每個問題必須有 `id`、`text`、`type`、`scale`
- `type` 必須是 `likert_5`
- `scale` 必須是 5 個選項的陣列
- **排除所有 LEGACY 欄位**（`_extracted_from`、`_note`、`_status` 等）

**範例**：參考 `domain/questions/stress_recovery.questions.v1.0.json`

**處理 MISSING**：
- 對於 `_status: "MISSING"` 的檔案，產出空陣列 `[]` 或保留 `_status: "MISSING"` 標記

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/questions/`

---

### 步驟 3：轉化 Narratives

**目標**：轉化所有 narratives 為新版格式

**要求**：
- 必須有 `low`、`mid`、`high` 三個層級
- 每個層級必須有 `opening` 和 `explain` 欄位
- **保留有內容的 `opening`**（即使 `explain` 是 placeholder）
- **排除所有 LEGACY 欄位**（`_extracted_from`、`_raw_anchors`、`_note` 等）

**範例**：參考 `domain/narratives/stress_recovery.narr.v1.0.json`

**處理 MISSING**：
- 對於有 `opening` 內容的，保留內容，`explain` 可以留空
- 對於完全沒有內容的，產出符合格式但內容為空的檔案，保留 `_status: "MISSING"` 標記

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/narratives/`

---

### 步驟 4：轉化 Recommendations

**目標**：轉化所有 recommendations 為新版格式

**要求**：
- 必須有 `low`、`mid`、`high` 三個層級
- 每個層級是陣列，包含多個建議
- 每個建議必須有 `id`、`title`、`steps`
- **排除所有 LEGACY 欄位**

**範例**：參考 `domain/recommendations/stress_recovery.reco.v1.0.json`

**處理 MISSING**：
- 對於 `_status: "MISSING"` 的檔案，產出符合格式但內容為空的檔案，保留 `_status: "MISSING"` 標記

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/recommendations/`

---

### 步驟 5：轉化 Riskchains

**目標**：轉化所有 riskchains 為新版格式

**要求**：
- 必須有 `mid`、`high` 兩個層級（或 `low`、`mid`、`high`）
- 每個層級包含 `if_not_improve` 陣列
- **排除所有 LEGACY 欄位**

**範例**：參考 `domain/riskchains/stress_recovery.risk.v1.0.json`

**處理 MISSING**：
- 對於 `_status: "MISSING"` 的檔案，產出符合格式但內容為空的檔案，保留 `_status: "MISSING"` 標記

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/riskchains/`

---

### 步驟 6：建立對照表

**需要建立的對照表**：
1. Legacy → 新版系統對照表
2. 主題對照表
3. 欄位對照表

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/`

---

### 步驟 7：產出最終資料包

**產出內容**：
- 所有轉化後的 domain/ 結構檔案
- 所有 manifest 檔案
- 對照表文件
- 轉化過程記錄

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/`

---

## 🚫 禁止事項

### 1. 禁止保留 LEGACY 欄位

**禁止保留的欄位**：
- `_extracted_from`
- `_extraction_date`
- `_note`
- `_raw_anchors`
- `_contentdb_sources`
- `_updated_from`
- `_gate1_checked_sources`
- `_gate1_reason`
- `_gate1_marked_at`
- 其他所有以 `_` 開頭的元資料欄位（除了 `_status: "MISSING"`）

---

### 2. 禁止使用 LEGACY 架構

**禁止**：
- 使用任何 LEGACY 架構的結構
- 使用任何 LEGACY 架構的命名
- 使用任何 LEGACY 架構的格式

---

### 3. 禁止不符合新版規範

**禁止**：
- 不符合新版系統規範的檔案命名
- 不符合新版系統規範的資料格式
- 不符合新版網頁 UI 結構的內容

---

## ✅ 檢查清單

### 轉化前檢查

- [ ] 已閱讀新版架構規範文件
- [ ] 已參考新版架構範例
- [ ] 已了解新版網頁 UI 結構

### 轉化時檢查

- [ ] 所有資料已轉化為新版架構格式
- [ ] 所有檔案命名符合新版規範
- [ ] 所有 LEGACY 欄位已排除
- [ ] 所有有內容的 narratives 已保留內容

### 轉化後檢查

- [ ] 所有 manifest 正確指向各分檔
- [ ] 所有 MISSING 內容已正確處理
- [ ] 已建立對照表
- [ ] 已產出最終資料包

---

## 📞 參考資料

### 新版架構規範

- `NEW_SYSTEM_STRUCTURE_REFERENCE.md` - 新版系統結構參考
- `INTEGRATION_REQUIREMENTS.md` - 整合要求說明
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - 新版架構規範

### 新版架構範例

- `domain/manifests/stress_recovery.v1.0.json` - Manifest 範例
- `domain/questions/stress_recovery.questions.v1.0.json` - Questions 範例
- `domain/narratives/stress_recovery.narr.v1.0.json` - Narratives 範例
- `domain/recommendations/stress_recovery.reco.v1.0.json` - Recommendations 範例
- `domain/riskchains/stress_recovery.risk.v1.0.json` - Riskchains 範例

---

**文件狀態**：READY FOR GATE 2  
**最後更新**：2026-01-12  
**下一步**：開始 Gate 2（轉化為新版架構格式）
