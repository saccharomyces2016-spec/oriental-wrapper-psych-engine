# Legacy 資料提取工作區

**建立日期**：2026-01-12  
**目的**：存放所有從 Legacy 資料夾提取的資料  
**狀態**：✅ 提取完成，待顧問團隊整合刪減昇華

---

## 📁 資料夾結構

```
EXTRACTION_WORKSPACE/
├── questions/              # 題庫資料（13 個主題）
├── manifests/              # Facet 定義（13 個主題）
├── recommendations/         # 建議資料（13 個主題）
├── narratives/             # 敘事資料（13 個主題）
├── riskchains/             # 風險鏈資料（13 個主題）
├── raw/                    # 原始檔案備份
├── contentdb/              # ContentDB 檔案（11 個檔案）
├── narrative_logic/        # narrative 相關邏輯
├── guidance_logic/         # guidance 相關邏輯
├── templates/              # 模板資料
└── [報告文件]              # 各種報告文件
```

---

## 📋 快速開始

### 1. 閱讀主要報告

**必讀**：
1. `../ADVISORY_TEAM_PACKAGE.md` - **顧問團隊完整資料包**（總入口）
2. `COMPLETE_EXTRACTION_FINAL_REPORT.md` - 完整提取最終報告
3. `ADVISORY_QUESTION_PACKAGE.md` - 顧問團隊提問包

**建議讀**：
4. `VERIFICATION_COMPARISON_REPORT.md` - 雙向核對報告
5. `LEGACY_THEME_MAPPING.md` - Legacy 主題對應關係表

---

### 2. 了解資料結構

**主題資料**：
- `questions/` - 13 個主題的題庫
- `manifests/` - 13 個主題的 Facet 定義
- `recommendations/` - 13 個主題的建議
- `narratives/` - 13 個主題的敘事
- `riskchains/` - 13 個主題的風險鏈

**原始資料**：
- `raw/` - 所有原始檔案備份
- `contentdb/` - ContentDB 檔案
- `narrative_logic/` - narrative 相關邏輯
- `guidance_logic/` - guidance 相關邏輯

---

### 3. 開始整合

1. 從 `questions/`、`narratives/`、`recommendations/`、`riskchains/` 開始
2. 參考 `LEGACY_THEME_MAPPING.md` 了解主題對應關係
3. 根據現有系統規範進行整合

---

## 📊 提取完成度

**✅ 100%**（所有檔案結構已完成，所有可提取內容已提取）

### 詳細統計

- **Questions**：13/13（11 個有內容，2 個已標註缺失）
- **Manifests**：13/13（全部完成）
- **Recommendations**：13/13（10 個有內容，3 個已標註缺失）
- **Narratives**：13/13（11 個有內容，2 個待填充）
- **Riskchains**：13/13（8 個有內容，5 個已標註分析）

---

## ⚠️ 重要提醒

### 已知問題

1. **缺失的 Questions**（2 個主題）
   - `self_erosion`、`unprocessed_loss`
   - 已標註缺失

2. **缺失的 Recommendations**（3 個主題）
   - `social_comparison`、`emotional_permeability`、`avoidance_coping`
   - 已標註缺失

3. **待填充的 Narratives**（2 個主題）
   - `self_erosion`、`unprocessed_loss`
   - 待填充

4. **待填充的 Riskchains**（5 個主題）
   - `suppressed_needs`、`identity_diffusion`、`meaning_vacuum`、`self_erosion`、`unprocessed_loss`
   - 已標註分析，需要手動提取

---

### 重複內容

根據核對報告：
- 3 個 questions 檔案完全相同（`fear_based_stability`、`chronic_alertness`、`meaning_vacuum`）
- 建議：可以考慮刪除 domain/ 中的版本（在整合完成後）

---

## 📞 問題回報

如有任何問題，請：
1. 記錄在 `ADVISORY_QUESTION_LOG.md`（如需要，請建立）
2. 標註問題類別和優先級
3. 提供相關檔案路徑和內容

---

**文件狀態**：READY FOR ADVISORY TEAM  
**最後更新**：2026-01-12
