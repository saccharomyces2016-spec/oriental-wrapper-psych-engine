# 顧問團隊完整資料包

**建立日期**：2026-01-12  
**目的**：為顧問團隊提供完整的 Legacy 資料提取包，用於整合刪減昇華  
**文件狀態**：READY FOR ADVISORY TEAM

---

## 📦 資料包位置

**主要資料夾**：
```
P0-12_SCIENTIFIC_ENGINE_COMPLETION/
├── ADVISORY_TEAM_PACKAGE.md          # ⭐ 總入口文件（本文件）
├── ADVISORY_TEAM_NEXT_STEPS.md       # 🎯 下一步行動指南（回應盤點結果）
├── INTEGRATION_REQUIREMENTS.md       # ⚠️ 整合要求說明（必須遵守）
├── NEW_SYSTEM_STRUCTURE_REFERENCE.md # 📋 新版系統結構參考
├── DELIVERY_CHECKLIST.md             # 📋 交付清單
└── EXTRACTION_WORKSPACE/             # 所有提取的資料
```

---

## 📋 資料包內容總覽

### 一、已提取的主題資料（13 個主題）

#### 1.1 Questions（題庫）
- **位置**：`EXTRACTION_WORKSPACE/questions/`
- **狀態**：✅ 13/13 個主題
  - 11 個有實際內容
  - 2 個已標註缺失（`self_erosion`、`unprocessed_loss`）

#### 1.2 Manifests（Facet 定義）
- **位置**：`EXTRACTION_WORKSPACE/manifests/`
- **狀態**：✅ 13/13 個主題（全部完成）

#### 1.3 Recommendations（建議）
- **位置**：`EXTRACTION_WORKSPACE/recommendations/`
- **狀態**：✅ 13/13 個主題
  - 10 個有實際內容
  - 3 個已標註缺失（`social_comparison`、`emotional_permeability`、`avoidance_coping`）

#### 1.4 Narratives（敘事）
- **位置**：`EXTRACTION_WORKSPACE/narratives/`
- **狀態**：✅ 13/13 個主題
  - 11 個有內容（從 anchor_statements 和 ContentDB 提取）
  - 2 個待填充（`self_erosion`、`unprocessed_loss`）

#### 1.5 Riskchains（風險鏈）
- **位置**：`EXTRACTION_WORKSPACE/riskchains/`
- **狀態**：✅ 13/13 個主題
  - 8 個有內容（從 consequence_chain_library 和 chains.json 提取）
  - 5 個已標註分析（已分析 buildGuidance.js，需要手動提取）

---

### 二、原始資料備份

#### 2.1 系統邏輯和規則
- **位置**：`EXTRACTION_WORKSPACE/raw/`
- **包含**：
  - `buildGuidance.js`
  - `guidancePrinciples.v1.0.json`
  - `guidanceActionTemplates.v1.0.json`
  - `intervention_boundary_matrix.v1.0.json`
  - `anchor_statements.v1.json`
  - `five_element_mapping.v1.0.json`
  - `attribution_error_matrix.v1.0.json`
  - `consequence_chain_library.v1.json`
  - `questionBank.v1.json`
  - `p1_question_blueprint_v1.json`

#### 2.2 ContentDB 檔案
- **位置**：`EXTRACTION_WORKSPACE/contentdb/`
- **包含**：11 個 ContentDB 檔案
  - `ContentDB_self.js`
  - `ContentDB_health.js`
  - `ContentDB_relationship.js`
  - `ContentDB_family.js`
  - `ContentDB_career.js`
  - `ContentDB_money.js`
  - `ContentDB_finance.js`
  - `ContentDB_social.js`
  - `ContentDB_study.js`
  - `ContentDB_love.js`

#### 2.3 narrative 邏輯
- **位置**：`EXTRACTION_WORKSPACE/narrative_logic/`
- **包含**：
  - `elementNarrative.v1.js`
  - `hookRules.json`
  - `round2OracularText.v1.js`

#### 2.4 guidance 邏輯
- **位置**：`EXTRACTION_WORKSPACE/guidance_logic/`
- **包含**：
  - `chains.json`
  - `guidance.schema.json`
  - `interventions.json`
  - `modifiers.json`
  - `schema.json`

#### 2.5 模板資料
- **位置**：`EXTRACTION_WORKSPACE/templates/`
- **包含**：
  - `guidanceActionTemplates.v1.0.json`

---

### 三、報告文件

#### 3.1 主要報告
1. **`COMPLETE_EXTRACTION_FINAL_REPORT.md`** - 完整提取最終報告
   - 提取完成度總覽
   - 已提取資料詳細清單
   - 雙向核對結果
   - 重複內容識別

2. **`VERIFICATION_COMPARISON_REPORT.md`** - 雙向核對報告
   - EXTRACTION_WORKSPACE vs domain/ 核對結果
   - 重複內容識別
   - 建議

3. **`ADVISORY_QUESTION_PACKAGE.md`** - 顧問團隊提問包
   - 待處理問題
   - 整合刪減昇華任務
   - 重複內容處理
   - 交付物清單

4. **`DELETE_LEGACY_FOLDER_PLAN.md`** - Legacy 資料夾刪除計劃
   - 刪除前檢查清單
   - 刪除條件確認
   - 刪除計劃
   - 風險評估

5. **`EXTRACTION_COMPLETE_LOG.md`** - 完整提取記錄
   - 提取工作時間線
   - 提取檔案清單
   - 提取原則遵守記錄
   - 已知問題記錄

#### 3.2 輔助報告
6. **`LEGACY_THEME_MAPPING.md`** - Legacy 主題對應關係表
7. **`EXTRACTION_CONTENT_ANALYSIS.md`** - 內容分析報告
8. **`EXTRACTION_INDEX.md`** - 提取索引
9. **`EXTRACTION_PROGRESS.md`** - 提取進度

---

### 四、提取腳本

- **位置**：`EXTRACTION_WORKSPACE/`
- **包含**：
  - `extract_themes.py` - 主題資料提取腳本
  - `extract_remaining.py` - 剩餘資料提取腳本
  - `extract_content.py` - 內容提取腳本
  - `extract_final.py` - 最終內容提取腳本
  - `complete_remaining_extraction.py` - 完成剩餘提取腳本
  - `verify_and_compare.py` - 雙向核對腳本

---

## 🎯 顧問團隊任務

### 任務一：補充缺失內容

1. **Questions**（2 個主題）
   - `self_erosion` - 需要實際題目內容或標註缺失
   - `unprocessed_loss` - 需要實際題目內容或標註缺失

2. **Recommendations**（3 個主題）
   - `social_comparison` - 需要從其他來源提取或標註缺失
   - `emotional_permeability` - 需要從其他來源提取或標註缺失
   - `avoidance_coping` - 需要從其他來源提取或標註缺失

3. **Narratives**（2 個主題）
   - `self_erosion` - 需要從其他來源提取或標註缺失
   - `unprocessed_loss` - 需要從其他來源提取或標註缺失

4. **Riskchains**（5 個主題）
   - `suppressed_needs`、`identity_diffusion`、`meaning_vacuum`、`self_erosion`、`unprocessed_loss`
   - 已標註已分析 buildGuidance.js，需要手動提取具體內容

---

### 任務二：整合刪減昇華（⚠️ 重要：必須符合新版架構）

**⚠️ 核心要求**：
- **必須依照新版網頁結構、UI結構進行轉化**
- **必須在符合最終目標以及相關子目標的前提下進行轉化**
- **必須變成完整符合新版網頁可用的結構**
- **必須排除 LEGACY 內容，採用新版架構**

**參考範例**：
- 新版架構範例：`domain/manifests/stress_recovery.v1.0.json`
- 新版 narratives 範例：`domain/narratives/stress_recovery.narr.v1.0.json`
- 新版結構規範：`docs/adr/ADR_0001_externalize_domain_and_version_schema.md`

1. **整合**
   - 將 EXTRACTION_WORKSPACE 中的資料整合到 domain/ 結構
   - **必須符合新版網頁結構和 UI 結構**
   - **必須符合新版系統的檔案命名和結構規範**（參考 `domain/` 資料夾結構）
   - **必須排除所有 LEGACY 架構內容，採用新版架構**
   - 建立主題對照表和欄位對照表

2. **刪減**
   - 識別重複資料
   - 識別不需要的內容
   - **刪減所有不符合新版系統規範的內容**
   - **刪減所有 LEGACY 架構相關內容**

3. **昇華**
   - **依照新版網頁 UI 結構進行內容轉化**
   - **確保符合最終目標和相關子目標**
   - 優化 narratives 的語言和表達（符合新版 UI 呈現需求）
   - 優化 recommendations 的實用性（符合新版網頁互動需求）
   - 優化 riskchains 的準確性（符合新版系統邏輯）

---

### 任務三：重複內容處理

**根據核對報告**：
- 3 個 questions 檔案完全相同（`fear_based_stability`、`chronic_alertness`、`meaning_vacuum`）
- 建議：可以考慮刪除 domain/ 中的版本（在整合完成後）

**其他檔案**：
- 需要進一步分析差異
- 決定保留哪個版本

---

## 📊 提取完成度

**✅ 100%**（所有檔案結構已完成，所有可提取內容已提取）

### 詳細統計

| 類別 | 總數 | 已提取 | 完成度 |
|------|------|--------|--------|
| 系統邏輯和規則 | 7 | 7 | ✅ 100% |
| ContentDB 檔案 | 11 | 11 | ✅ 100% |
| narrative 邏輯 | 3 | 3 | ✅ 100% |
| guidance 邏輯 | 5 | 5 | ✅ 100% |
| 題庫資料 | 2 | 2 | ✅ 100% |
| Questions | 13 | 13 | ✅ 100% |
| Manifests | 13 | 13 | ✅ 100% |
| Recommendations | 13 | 13 | ✅ 100% |
| Narratives | 13 | 13 | ✅ 100% |
| Riskchains | 13 | 13 | ✅ 100% |

---

## 📝 重要提醒

### ⚠️ 0. 整合要求（必須遵守）

**核心要求**：
- **必須依照新版網頁結構、UI結構進行轉化**
- **必須在符合最終目標以及相關子目標的前提下進行轉化**
- **必須變成完整符合新版網頁可用的結構**
- **必須排除 LEGACY 內容，採用新版架構**

**詳細說明**：請參閱 `INTEGRATION_REQUIREMENTS.md`

---

### 1. 提取原則

所有資料提取時遵循以下原則：
- ✅ 不進行刪減：保持原始結構
- ✅ 標註來源：所有資料都標註了來源和提取日期
- ✅ 備份原始檔案：所有原始檔案已備份

**注意**：提取時保持原始結構，但整合時必須轉化為新版架構

### 2. 已知問題

- 2 個主題缺少 Questions（已標註缺失）
- 3 個主題缺少 Recommendations（已標註缺失）
- 2 個主題的 Narratives 待填充
- 5 個主題的 Riskchains 已標註分析，需要手動提取

### 3. 重複內容

- 3 個 questions 檔案完全相同（可考慮刪除 domain/ 中的版本）
- 其他檔案需要進一步分析差異

---

## 🚀 開始工作

### ⚠️ 第一步：閱讀整合要求（必須先讀）

**⚠️ 重要**：在開始任何工作前，必須先閱讀以下文件：

1. **`ADVISORY_TEAM_NEXT_STEPS.md`** ⭐ **下一步行動指南（必須先讀）**
   - 回應您的盤點結果
   - 明確說明下一步行動
   - 提供 Gate 檢查清單

2. **`INTEGRATION_REQUIREMENTS.md`** ⚠️ **整合要求說明（必須遵守）**
   - 明確說明必須依照新版網頁結構、UI結構進行轉化
   - 明確說明必須排除 LEGACY 內容，採用新版架構
   - 明確說明必須符合最終目標和相關子目標

3. **`NEW_SYSTEM_STRUCTURE_REFERENCE.md`** 📋 **新版系統結構參考**
   - 新版系統的完整結構說明
   - 所有檔案格式規範
   - 現有系統狀態

4. **新版架構範例**：
   - `domain/manifests/stress_recovery.v1.0.json` - Manifest 範例
   - `domain/narratives/stress_recovery.narr.v1.0.json` - Narratives 範例
   - `domain/questions/stress_recovery.questions.v1.0.json` - Questions 範例
   - `domain/recommendations/stress_recovery.reco.v1.0.json` - Recommendations 範例

5. **新版結構規範**：
   - `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - 新版架構規範

### 第二步：閱讀主要報告

1. 閱讀 `COMPLETE_EXTRACTION_FINAL_REPORT.md` 了解整體情況
2. 閱讀 `ADVISORY_QUESTION_PACKAGE.md` 了解待處理問題
3. 閱讀 `VERIFICATION_COMPARISON_REPORT.md` 了解重複內容

### 第二步：開始整合（⚠️ 重要：必須符合新版架構）

1. **先閱讀新版架構規範**
   - 閱讀 `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` 了解新版架構
   - 參考 `domain/manifests/stress_recovery.v1.0.json` 了解新版 manifest 結構
   - 參考 `domain/narratives/stress_recovery.narr.v1.0.json` 了解新版 narratives 結構
   - 參考 `domain/questions/stress_recovery.questions.v1.0.json` 了解新版 questions 結構
   - 參考 `domain/recommendations/stress_recovery.reco.v1.0.json` 了解新版 recommendations 結構

2. **從 `EXTRACTION_WORKSPACE/` 開始整合資料**
   - **必須依照新版網頁結構、UI結構進行轉化**
   - **必須排除所有 LEGACY 架構內容**
   - **必須符合新版系統的檔案命名和結構規範**

3. **參考對照資料**
   - 參考 `LEGACY_THEME_MAPPING.md` 了解主題對應關係
   - 參考 `VERIFICATION_COMPARISON_REPORT.md` 了解重複內容
   - **確保所有轉化都符合新版架構要求**

### 第三步：補充缺失內容

1. 處理缺失的 Questions（2 個主題）
2. 處理缺失的 Recommendations（3 個主題）
3. 填充待填充的 Narratives（2 個主題）
4. 填充待填充的 Riskchains（5 個主題）

### 第四步：整合刪減昇華（⚠️ 重要：必須符合新版架構）

1. **整合所有資料到 domain/ 結構**
   - **必須依照新版網頁結構、UI結構進行轉化**
   - **必須符合新版系統的檔案命名和結構規範**
   - **必須排除所有 LEGACY 架構內容**

2. **刪減不需要的內容**
   - 刪減不符合新版系統規範的內容
   - **刪減所有 LEGACY 架構相關內容**

3. **昇華和優化內容**
   - **確保符合最終目標和相關子目標**
   - **確保符合新版網頁 UI 結構和互動需求**
   - 優化內容品質和實用性

---

## 📞 問題回報

如有任何問題，請記錄在：
- `ADVISORY_QUESTION_LOG.md`（如需要，請建立）

---

**文件狀態**：READY FOR ADVISORY TEAM  
**最後更新**：2026-01-12  
**下一步**：顧問團隊開始處理
