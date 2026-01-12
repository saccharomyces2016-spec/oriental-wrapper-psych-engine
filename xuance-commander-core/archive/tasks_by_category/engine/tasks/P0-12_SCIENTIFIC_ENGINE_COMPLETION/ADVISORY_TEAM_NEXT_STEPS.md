# 顧問團隊下一步行動指南

**建立日期**：2026-01-12  
**目的**：回應顧問團隊的盤點結果，明確下一步行動  
**文件狀態**：READY FOR ADVISORY TEAM

---

## ✅ 確認：盤點結果正確

您的盤點結果完全正確，我們確認以下狀態：

1. ✅ **提取包本體完整、分類齊全** - 正確
2. ⚠️ **多個主題仍停在 placeholder / 待填充** - 正確（這是預期的，需要您處理）
3. ⚠️ **INTEGRATION_REQUIREMENTS.md 位置問題** - 已修正（見下方說明）
4. ⚠️ **resultLexicon.v1.json 缺失** - 已確認（見下方說明）
5. ⚠️ **缺新版系統的 domain/ 結構** - 已補充（見下方說明）

---

## 📋 缺口處理說明

### 缺口 A：Placeholder / 待填充內容

**狀態**：✅ **這是預期的，需要您處理**

**需要處理的主題**：

1. **Questions**（2 個主題）
   - `self_erosion`、`unprocessed_loss`
   - **處理方式**：標註缺失或從其他來源提取

2. **Recommendations**（3 個主題）
   - `social_comparison`、`emotional_permeability`、`avoidance_coping`
   - **處理方式**：標註缺失或從其他來源提取

3. **Narratives**（2 個主題）
   - `self_erosion`、`unprocessed_loss`
   - **處理方式**：從 ContentDB 或其他來源提取，或標註缺失

4. **Riskchains**（5 個主題）
   - `suppressed_needs`、`identity_diffusion`、`meaning_vacuum`、`self_erosion`、`unprocessed_loss`
   - **處理方式**：從 buildGuidance.js 或其他來源提取，或標註缺失

**您的任務**：
- 對於無法補齊的內容，明確標註缺失（使用 `_status: "MISSING"` 或類似標記）
- 對於可以補齊的內容，從原始資料或其他來源提取
- **確保不會把 placeholder 當真資料送進新版系統**

---

### 缺口 B：INTEGRATION_REQUIREMENTS.md 位置

**狀態**：✅ **已修正**

**說明**：
- `EXTRACTION_WORKSPACE/INTEGRATION_REQUIREMENTS.md` ✅ 存在（正確位置）
- 根目錄不需要單獨的 `INTEGRATION_REQUIREMENTS.md`（已在 `ADVISORY_TEAM_PACKAGE.md` 中引用）

**確認**：以工作區版本為準，根目錄不需要重複。

---

### 缺口 C：resultLexicon.v1.json 缺失

**狀態**：✅ **已確認，非必要依賴**

**說明**：
- `resultLexicon.v1.json` 確實不在 raw/ 資料夾中
- **但這不是必要依賴**，因為：
  1. 新版系統使用不同的詞彙庫結構
  2. 新版系統的 narratives 和 recommendations 格式已標準化
  3. 不需要 Legacy 的 resultLexicon 來組裝輸出

**處理方式**：
- 不需要 resultLexicon.v1.json
- 直接使用新版系統的標準格式（參考 `domain/narratives/stress_recovery.narr.v1.0.json`）

---

### 缺口 D：新版系統的目標 repo 結構

**狀態**：✅ **已補充（見下方）**

**新版系統結構**：

```
domain/
├── manifests/          # Facet 定義（必須）
│   └── {facetId}.v1.0.json
├── questions/          # 題庫（必須）
│   └── {facetId}.questions.v1.0.json
├── facets/            # 計分邏輯（必須）
│   └── {facetId}.scoring.v1.0.json
├── narratives/        # 敘事（必須）
│   └── {facetId}.narr.v1.0.json
├── recommendations/    # 建議（必須）
│   └── {facetId}.reco.v1.0.json
└── riskchains/        # 風險鏈（必須）
    └── {facetId}.risk.v1.0.json
```

**參考範例**：
- Manifest：`domain/manifests/stress_recovery.v1.0.json`
- Questions：`domain/questions/stress_recovery.questions.v1.0.json`
- Narratives：`domain/narratives/stress_recovery.narr.v1.0.json`
- Recommendations：`domain/recommendations/stress_recovery.reco.v1.0.json`
- Riskchains：`domain/riskchains/stress_recovery.risk.v1.0.json`

**Schema 規範**：
- `schemas/domain_manifest.schema.json` - Manifest Schema
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - 新版架構規範

---

## 🎯 您的下一步行動

### 第一步：補充缺失內容（Gate 1）

**目標**：把「可補的內容」與「必須標註缺失」分流

**行動**：

1. **處理 Placeholder Questions**（2 個主題）
   - 檢查是否有其他來源可以提取
   - 如果沒有，明確標註 `_status: "MISSING"`

2. **處理缺失的 Recommendations**（3 個主題）
   - 檢查是否有其他來源可以提取
   - 如果沒有，明確標註 `_status: "MISSING"`

3. **填充待填充的 Narratives**（2 個主題）
   - 從 ContentDB 或其他來源提取
   - 如果沒有，明確標註 `_status: "MISSING"`

4. **填充待填充的 Riskchains**（5 個主題）
   - 從 buildGuidance.js 或其他來源提取
   - 如果沒有，明確標註 `_status: "MISSING"`

**產出**：
- 更新後的檔案（已補齊或已標註缺失）
- 缺失內容清單（記錄哪些主題的哪些類型缺失）

---

### 第二步：轉化為新版架構格式（Gate 2）

**目標**：把 EXTRACTION_WORKSPACE 從「提取包」推進到「可直接被新版系統載入的資料包」

**行動**：

1. **轉化所有資料為新版架構格式**
   - 參考 `domain/manifests/stress_recovery.v1.0.json` 等範例
   - 確保所有檔案符合新版系統的檔案命名和結構規範
   - **必須排除所有 LEGACY 架構內容**

2. **建立對照表**
   - Legacy → 新版系統對照表
   - 主題對照表
   - 欄位對照表

3. **產出最終資料包**
   - 所有資料轉化為新版架構格式
   - 所有檔案放置在正確的位置
   - 所有 manifest 正確指向各分檔

**產出**：
- 轉化後的 domain/ 結構資料
- 對照表文件
- 轉化過程記錄

---

### 第三步：品質檢查與驗證（Gate 3）

**目標**：確保所有資料符合新版系統規範，可以安全載入

**行動**：

1. **Schema 驗證**
   - 驗證所有 manifest 符合 `schemas/domain_manifest.schema.json`
   - 驗證所有檔案符合新版系統規範

2. **內容檢查**
   - 確認沒有 placeholder 內容被當作真資料
   - 確認所有缺失內容已明確標註
   - 確認所有 LEGACY 架構內容已排除

3. **完整性檢查**
   - 確認所有主題的 5 種類型資料都已處理（questions、scoring、narratives、recommendations、riskchains）
   - 確認所有 manifest 正確指向各分檔

**產出**：
- 品質檢查報告
- 驗證結果報告

---

### 第四步：產出最終交付物（Gate 4）

**目標**：產出可直接交付給新版系統的最終資料包

**行動**：

1. **整理最終資料包**
   - 所有轉化後的資料
   - 所有對照表
   - 所有報告文件

2. **產出交付報告**
   - 整合完成報告
   - 缺失內容清單
   - 轉化過程記錄

**產出**：
- 最終資料包（符合新版架構）
- 交付報告

---

## 📋 檢查清單

### Gate 1：補充缺失內容

- [ ] 處理所有 Placeholder Questions（2 個主題）
- [ ] 處理所有缺失的 Recommendations（3 個主題）
- [ ] 填充所有待填充的 Narratives（2 個主題）
- [ ] 填充所有待填充的 Riskchains（5 個主題）
- [ ] 產出缺失內容清單

### Gate 2：轉化為新版架構

- [ ] 轉化所有資料為新版架構格式
- [ ] 建立對照表
- [ ] 產出最終資料包

### Gate 3：品質檢查

- [ ] Schema 驗證
- [ ] 內容檢查
- [ ] 完整性檢查

### Gate 4：最終交付

- [ ] 整理最終資料包
- [ ] 產出交付報告

---

## 📞 需要協助時

如有任何問題，請：
1. 記錄在 `EXTRACTION_WORKSPACE/ADVISORY_QUESTION_LOG.md`
2. 標註問題類別和優先級
3. 提供相關檔案路徑和內容

---

## 🎯 總結

**您的任務**：
1. ✅ 補充缺失內容（Gate 1）
2. ✅ 轉化為新版架構格式（Gate 2）
3. ✅ 品質檢查與驗證（Gate 3）
4. ✅ 產出最終交付物（Gate 4）

**核心要求**：
- **必須依照新版網頁結構、UI結構進行轉化**
- **必須排除所有 LEGACY 架構內容**
- **必須確保不會把 placeholder 當真資料送進新版系統**

**參考資料**：
- 新版架構範例：`domain/manifests/stress_recovery.v1.0.json` 等
- 新版架構規範：`docs/adr/ADR_0001_externalize_domain_and_version_schema.md`
- 整合要求：`EXTRACTION_WORKSPACE/INTEGRATION_REQUIREMENTS.md`

---

**文件狀態**：READY FOR ADVISORY TEAM  
**最後更新**：2026-01-12  
**下一步**：開始 Gate 1（補充缺失內容）
