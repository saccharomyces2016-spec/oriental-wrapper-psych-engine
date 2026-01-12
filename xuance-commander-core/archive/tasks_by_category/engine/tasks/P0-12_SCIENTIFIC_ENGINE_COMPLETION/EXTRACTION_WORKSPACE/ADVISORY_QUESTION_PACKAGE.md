# 顧問團隊提問包

**建立日期**：2026-01-12  
**目的**：為顧問團隊提供完整的提問包，協助整合刪減昇華 Legacy 資料  
**文件狀態**：READY FOR ADVISORY TEAM

---

## 一、背景說明

### 1.1 任務目標

從 Legacy 資料夾（`docs/legacy/115_1_3_my-first-app_failed/`）完整提取所有科學引擎相關資料，並進行整合刪減昇華，產出符合現有系統規範的最終檔案。

### 1.2 提取完成狀態

**✅ 100% 完成**：
- 所有 Legacy 資料已提取到 `EXTRACTION_WORKSPACE/`
- 所有可提取的內容已提取完成
- 雙向核對已完成
- 原始檔案已備份到 `EXTRACTION_WORKSPACE/raw/`

---

## 二、資料包內容

### 2.1 已提取資料

**位置**：`P0-12_SCIENTIFIC_ENGINE_COMPLETION/EXTRACTION_WORKSPACE/`

**包含內容**：
- ✅ 13 個主題的 questions（11 個有內容，2 個已標註缺失）
- ✅ 13 個主題的 manifests（全部完成）
- ✅ 13 個主題的 recommendations（10 個有內容，3 個已標註缺失）
- ✅ 13 個主題的 narratives（11 個有內容，2 個待填充）
- ✅ 13 個主題的 riskchains（8 個有內容，5 個已標註分析）
- ✅ 所有系統邏輯和規則檔案
- ✅ 所有 ContentDB 檔案（11 個檔案）
- ✅ 所有 narrative 和 guidance 邏輯檔案
- ✅ 所有原始檔案備份

---

### 2.2 報告文件

**主要報告**：
1. **`COMPLETE_EXTRACTION_FINAL_REPORT.md`** - 完整提取最終報告（本文件的上層報告）
2. **`VERIFICATION_COMPARISON_REPORT.md`** - 雙向核對報告
3. **`LEGACY_THEME_MAPPING.md`** - Legacy 主題對應關係表
4. **`EXTRACTION_CONTENT_ANALYSIS.md`** - 內容分析報告

---

## 三、待處理問題

### 3.1 缺失的 Questions（2 個主題）

1. **`self_erosion`** - 自我耗損
   - `p1_question_blueprint_v1.json` 為設計藍圖，內容為 placeholder
   - **問題**：需要實際題目內容或標註缺失

2. **`unprocessed_loss`** - 未處理的失落
   - `p1_question_blueprint_v1.json` 為設計藍圖，內容為 placeholder
   - **問題**：需要實際題目內容或標註缺失

**提問**：
- 這 2 個主題的 questions 應該如何處理？
- 是否需要從其他來源提取？
- 還是應該標註為缺失，交由後續處理？

---

### 3.2 缺失的 Recommendations（3 個主題）

1. **`social_comparison`** - 社會比較壓力
   - guidanceActionTemplates 中沒有
   - **問題**：需要從其他來源提取或標註缺失

2. **`emotional_permeability`** - 情緒滲透
   - guidanceActionTemplates 中沒有
   - **問題**：需要從其他來源提取或標註缺失

3. **`avoidance_coping`** - 逃避型因應
   - guidanceActionTemplates 中沒有
   - **問題**：需要從其他來源提取或標註缺失

**提問**：
- 這 3 個主題的 recommendations 應該如何處理？
- 是否需要從其他來源提取？
- 還是應該標註為缺失，交由後續處理？

---

### 3.3 待填充的 Narratives（2 個主題）

1. **`self_erosion`** - 自我耗損
   - 無 ContentDB 來源
   - **問題**：需要從其他來源提取或標註缺失

2. **`unprocessed_loss`** - 未處理的失落
   - 無 ContentDB 來源
   - **問題**：需要從其他來源提取或標註缺失

**提問**：
- 這 2 個主題的 narratives 應該如何處理？
- 是否需要從其他來源提取？
- 還是應該標註為缺失，交由後續處理？

---

### 3.4 待填充的 Riskchains（5 個主題）

1. **`suppressed_needs`** - 需求壓抑
2. **`identity_diffusion`** - 自我模糊
3. **`meaning_vacuum`** - 意義真空
4. **`self_erosion`** - 自我耗損
5. **`unprocessed_loss`** - 未處理的失落

**狀態**：已標註已分析 buildGuidance.js，需要手動提取具體內容

**提問**：
- 這 5 個主題的 riskchains 應該如何處理？
- 是否需要從 buildGuidance.js 手動提取？
- 還是應該標註為缺失，交由後續處理？

---

## 四、整合刪減昇華任務

### 4.1 整合任務（⚠️ 重要：必須符合新版架構）

**目標**：根據新版系統架構進行整合

**⚠️ 核心要求**：
- **必須依照新版網頁結構、UI結構進行轉化**
- **必須在符合最終目標以及相關子目標的前提下進行轉化**
- **必須變成完整符合新版網頁可用的結構**
- **必須排除 LEGACY 內容，採用新版架構**

**需要處理**：
1. 將 EXTRACTION_WORKSPACE 中的資料整合到 domain/ 結構
2. **必須符合新版系統的檔案命名和結構規範**（參考 `domain/` 資料夾結構）
3. **必須排除所有 LEGACY 架構內容，採用新版架構**
4. 建立主題對照表和欄位對照表

**參考範例**：
- 新版架構範例：`domain/manifests/stress_recovery.v1.0.json`
- 新版 narratives 範例：`domain/narratives/stress_recovery.narr.v1.0.json`
- 新版結構規範：`docs/adr/ADR_0001_externalize_domain_and_version_schema.md`

**提問**：
- 整合時應該遵循哪些新版架構規範？
- 如何確保符合新版網頁結構和 UI 結構？
- 如何排除 LEGACY 架構內容？
- 是否需要建立對照表？
- 如何處理與現有 domain/ 資料的衝突？

---

### 4.2 刪減任務（⚠️ 重要：必須排除 LEGACY 內容）

**目標**：刪減不需要的內容，排除 LEGACY 架構

**⚠️ 核心要求**：
- **必須排除所有 LEGACY 架構相關內容**
- **必須刪減不符合新版系統規範的內容**

**需要處理**：
1. 識別重複資料
2. 識別不需要的內容
3. **識別並刪減所有 LEGACY 架構相關內容**
4. **刪減不符合新版系統規範的內容**

**提問**：
- 哪些內容應該刪減？
- 如何識別 LEGACY 架構內容？
- 如何識別重複資料？
- 刪減的標準是什麼？
- 如何確保不遺漏重要內容？

---

### 4.3 昇華任務（⚠️ 重要：必須符合新版網頁 UI 結構）

**目標**：昇華和優化內容，符合新版網頁 UI 結構

**⚠️ 核心要求**：
- **必須依照新版網頁結構、UI結構進行轉化**
- **必須在符合最終目標以及相關子目標的前提下進行轉化**
- **必須變成完整符合新版網頁可用的結構**

**需要處理**：
1. **依照新版網頁 UI 結構進行內容轉化**
2. **確保符合最終目標和相關子目標**
3. 優化 narratives 的語言和表達（符合新版 UI 呈現需求）
4. 優化 recommendations 的實用性（符合新版網頁互動需求）
5. 優化 riskchains 的準確性（符合新版系統邏輯）

**提問**：
- 昇華的標準是什麼？
- 如何確保符合新版網頁 UI 結構？
- 如何確保符合最終目標和相關子目標？
- 如何確保內容的品質？
- 是否需要進行內容審核？

---

## 五、重複內容處理

### 5.1 重複內容識別

**核對結果**：請參閱 `VERIFICATION_COMPARISON_REPORT.md`

**主要發現**：
- 部分主題在 domain/ 中已有檔案
- 需要進一步分析是否重複

**提問**：
- 如何處理 EXTRACTION_WORKSPACE 和 domain/ 中的重複內容？
- 應該保留哪個版本？
- 如何確保不會遺失重要內容？

---

### 5.2 衝突處理

**需要處理**：
1. 識別衝突資料
2. 分析衝突原因
3. 決定保留哪個版本

**提問**：
- 如何識別衝突資料？
- 衝突處理的標準是什麼？
- 如何確保處理後的資料一致性？

---

## 六、Legacy 資料夾刪除

### 6.1 刪除條件

**已滿足條件**：
- ✅ 所有 Legacy 資料已提取到 EXTRACTION_WORKSPACE
- ✅ 所有可提取的內容已提取完成
- ✅ 雙向核對已完成
- ✅ 原始檔案已備份到 EXTRACTION_WORKSPACE/raw/

**待確認條件**：
- ⏳ 重複內容確認完成
- ⏳ 顧問團隊整合刪減昇華完成

**提問**：
- 是否可以在整合刪減昇華完成後刪除 Legacy 資料夾？
- 刪除前需要做哪些確認？
- 是否需要保留某些檔案作為參考？

---

## 七、交付物清單

### 7.1 必須交付

1. **整合後的 domain/ 檔案**
   - 所有主題的 questions、narratives、recommendations、riskchains
   - 符合現有系統規範

2. **資料對照表**
   - Legacy → 現有系統對照表
   - 主題對照表
   - 欄位對照表

3. **重複和衝突識別報告**
   - 重複資料清單
   - 衝突資料清單
   - 處理方案

---

### 7.2 建議交付

1. **整合過程記錄**
   - 整合過程中的決策記錄
   - 遇到的問題和解決方案

2. **品質保證報告**
   - 內容品質檢查結果
   - 符合規範檢查結果

---

## 八、時間表

### 8.1 建議時間表

1. **第一週**：補充缺失內容、填充待填充內容
2. **第二週**：整合刪減昇華
3. **第三週**：建立對照表、識別重複和衝突
4. **第四週**：最終審核、交付

**提問**：
- 這個時間表是否合理？
- 是否需要調整？
- 有哪些關鍵里程碑？

---

## 九、聯繫方式

### 9.1 問題回報

如有任何問題，請：
1. 記錄在 `ADVISORY_QUESTION_LOG.md`
2. 標註問題類別和優先級
3. 提供相關檔案路徑和內容

---

### 9.2 進度報告

請定期更新：
1. `ADVISORY_PROGRESS_REPORT.md` - 進度報告
2. `ADVISORY_DECISION_LOG.md` - 決策記錄

---

**文件狀態**：READY FOR ADVISORY TEAM  
**最後更新**：2026-01-12  
**下一步**：顧問團隊開始處理
