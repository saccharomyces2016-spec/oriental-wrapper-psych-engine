# Gate 2 執行指引

**建立日期**：2026-01-12  
**目的**：明確說明 Gate 2 的執行步驟和要求  
**文件狀態**：READY FOR GATE 2 EXECUTION

---

## ⚠️ Gate 1 問題修正說明

### 問題：10 個 Narratives 有內容但被標註為 MISSING

**發現**：
- 以下 10 個 narratives 有實際的 `opening` 內容，但被錯誤標註為 `_status: "MISSING"`：
  1. `avoidance_coping.narr.v1.0.json` - 有 opening 內容
  2. `chronic_alertness.narr.v1.0.json` - 有 opening 內容
  3. `chronic_depletion.narr.v1.0.json` - 有 opening 內容
  4. `emotional_permeability.narr.v1.0.json` - 有 opening 內容
  5. `fear_based_stability.narr.v1.0.json` - 有 opening 內容
  6. `hyper_responsibility.narr.v1.0.json` - 有 opening 內容
  7. `identity_diffusion.narr.v1.0.json` - 有 opening 內容
  8. `loss_of_agency.narr.v1.0.json` - 有 opening 內容
  9. `social_comparison.narr.v1.0.json` - 有 opening 內容
  10. `suppressed_needs.narr.v1.0.json` - 有 opening 內容

**正確處理方式**：
- **在 Gate 2 轉化時，請保留這些有內容的部分**
- **移除錯誤的 `_status: "MISSING"` 標記**
- 如果 `explain` 欄位是 placeholder 或空字串，可以留空

**正確標註為 MISSING 的**（3 個）：
- `meaning_vacuum.narr.v1.0.json` ✅
- `self_erosion.narr.v1.0.json` ✅
- `unprocessed_loss.narr.v1.0.json` ✅

---

## 🎯 Gate 2 執行步驟

### 步驟 1：準備工作

1. **讀取 Gate 1 更新後的工作區**
   - 從 `P0-12_GATE1_UPDATED_WORKSPACE.zip` 或 `EXTRACTION_WORKSPACE_GATE1/` 讀取

2. **確認新版架構規範**
   - 閱讀 `NEW_SYSTEM_STRUCTURE_REFERENCE.md`
   - 參考 `domain/manifests/stress_recovery.v1.0.json` 等範例

---

### 步驟 2：轉化 Manifests（優先）

**目標**：建立所有 13 個主題的 manifest 檔案

**要求**：
- 檔案命名：`{facetId}.v1.0.json`
- 必須符合 `schemas/domain_manifest.schema.json`
- 必須包含：
  ```json
  {
    "domainVersion": "1.0",
    "facetId": "{facetId}",
    "sources": {
      "questions": "domain/questions/{facetId}.questions.v1.0.json",
      "scoring": "domain/facets/{facetId}.scoring.v1.0.json",
      "recommendations": "domain/recommendations/{facetId}.reco.v1.0.json",
      "narratives": "domain/narratives/{facetId}.narr.v1.0.json",
      "riskchains": "domain/riskchains/{facetId}.risk.v1.0.json"
    }
  }
  ```

**範例**：`domain/manifests/stress_recovery.v1.0.json`

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/manifests/`

---

### 步驟 3：轉化 Questions

**目標**：轉化所有 13 個主題的 questions

**要求**：
- 檔案命名：`{facetId}.questions.v1.0.json`
- 必須是陣列格式
- 每個問題必須有：`id`、`text`、`type`、`scale`
- `type` 必須是 `"likert_5"`
- `scale` 必須是 5 個選項的陣列
- **排除所有 LEGACY 欄位**（`_extracted_from`、`_note`、`_status`、`_gate1_*` 等）

**範例**：`domain/questions/stress_recovery.questions.v1.0.json`

**處理 MISSING**：
- 對於 `_status: "MISSING"` 的檔案，產出空陣列 `[]`
- 可以保留 `_status: "MISSING"` 標記（但必須符合新版格式）

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/questions/`

---

### 步驟 4：轉化 Narratives（⚠️ 重要：保留有內容的部分）

**目標**：轉化所有 13 個主題的 narratives

**要求**：
- 檔案命名：`{facetId}.narr.v1.0.json`
- 必須有 `low`、`mid`、`high` 三個層級
- 每個層級必須有 `opening` 和 `explain` 欄位
- **⚠️ 必須保留有內容的 `opening`**（即使 `explain` 是 placeholder）
- **排除所有 LEGACY 欄位**（`_extracted_from`、`_raw_anchors`、`_note`、`_gate1_*` 等）

**範例**：`domain/narratives/stress_recovery.narr.v1.0.json`

**處理方式**：
- **對於有 `opening` 內容的**（10 個）：
  - 保留 `opening` 內容
  - `explain` 可以留空（如果原本是 placeholder）
  - **移除錯誤的 `_status: "MISSING"` 標記**

- **對於完全沒有內容的**（3 個）：
  - 產出符合格式但內容為空的檔案
  - 保留 `_status: "MISSING"` 標記

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/narratives/`

---

### 步驟 5：轉化 Recommendations

**目標**：轉化所有 13 個主題的 recommendations

**要求**：
- 檔案命名：`{facetId}.reco.v1.0.json`
- 必須有 `low`、`mid`、`high` 三個層級
- 每個層級是陣列，包含多個建議
- 每個建議必須有 `id`、`title`、`steps`
- **排除所有 LEGACY 欄位**

**範例**：`domain/recommendations/stress_recovery.reco.v1.0.json`

**處理 MISSING**：
- 對於 `_status: "MISSING"` 的檔案，產出符合格式但內容為空的檔案
- 可以保留 `_status: "MISSING"` 標記

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/recommendations/`

---

### 步驟 6：轉化 Riskchains

**目標**：轉化所有 13 個主題的 riskchains

**要求**：
- 檔案命名：`{facetId}.risk.v1.0.json`
- 必須有 `mid`、`high` 兩個層級（或 `low`、`mid`、`high`）
- 每個層級包含 `if_not_improve` 陣列
- **排除所有 LEGACY 欄位**

**範例**：`domain/riskchains/stress_recovery.risk.v1.0.json`

**處理 MISSING**：
- 對於 `_status: "MISSING"` 的檔案，產出符合格式但內容為空的檔案
- 可以保留 `_status: "MISSING"` 標記

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/riskchains/`

---

### 步驟 7：建立對照表

**需要建立的對照表**：
1. Legacy → 新版系統對照表
2. 主題對照表
3. 欄位對照表

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/`

---

### 步驟 8：產出最終資料包

**產出內容**：
- 所有轉化後的 domain/ 結構檔案
- 所有 manifest 檔案
- 對照表文件
- 轉化過程記錄

**產出位置**：`EXTRACTION_WORKSPACE/domain_output/`

---

## 🚫 必須排除的 LEGACY 欄位

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

## ✅ Gate 2 檢查清單

### 轉化前檢查

- [ ] 已讀取 Gate 1 更新後的工作區
- [ ] 已閱讀新版架構規範文件
- [ ] 已參考新版架構範例

### 轉化時檢查

- [ ] 所有資料已轉化為新版架構格式
- [ ] 所有檔案命名符合新版規範
- [ ] 所有 LEGACY 欄位已排除
- [ ] **所有有內容的 narratives 已保留內容**
- [ ] **已移除錯誤的 MISSING 標記**

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
- `schemas/domain_manifest.schema.json` - Manifest Schema
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - 新版架構規範

### 新版架構範例

- `domain/manifests/stress_recovery.v1.0.json` - Manifest 範例
- `domain/questions/stress_recovery.questions.v1.0.json` - Questions 範例
- `domain/narratives/stress_recovery.narr.v1.0.json` - Narratives 範例
- `domain/recommendations/stress_recovery.reco.v1.0.json` - Recommendations 範例
- `domain/riskchains/stress_recovery.risk.v1.0.json` - Riskchains 範例

---

**文件狀態**：READY FOR GATE 2 EXECUTION  
**最後更新**：2026-01-12  
**下一步**：開始 Gate 2（轉化為新版架構格式）
