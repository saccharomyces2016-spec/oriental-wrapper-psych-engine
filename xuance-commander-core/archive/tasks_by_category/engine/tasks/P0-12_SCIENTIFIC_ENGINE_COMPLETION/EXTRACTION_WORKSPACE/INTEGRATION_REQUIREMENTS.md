# 整合要求說明（⚠️ 顧問團隊必讀）

**建立日期**：2026-01-12  
**目的**：明確說明整合時必須遵守的要求  
**文件狀態**：MANDATORY（必須遵守）

---

## ⚠️ 核心要求（必須遵守）

### 1. 必須依照新版網頁結構、UI結構進行轉化

**要求**：
- 所有資料必須轉化為符合新版網頁結構的格式
- 所有資料必須符合新版 UI 結構的呈現需求
- 不得使用任何 LEGACY 架構的結構

**參考**：
- 新版架構範例：`domain/manifests/stress_recovery.v1.0.json`
- 新版 narratives 範例：`domain/narratives/stress_recovery.narr.v1.0.json`
- 新版結構規範：`docs/adr/ADR_0001_externalize_domain_and_version_schema.md`

---

### 2. 必須在符合最終目標以及相關子目標的前提下進行轉化

**要求**：
- 所有轉化必須符合專案的最終目標
- 所有轉化必須符合相關子目標
- 不得偏離專案目標

**參考**：
- 專案目標：`memory/briefs/CURRENT.md`
- 專案路線圖：`roadmap/ROADMAP.md`

---

### 3. 必須變成完整符合新版網頁可用的結構

**要求**：
- 所有資料必須轉化為新版網頁可以直接使用的格式
- 所有資料必須符合新版系統的檔案命名和結構規範
- 不得包含任何無法在新版網頁中使用的內容

**參考**：
- 新版系統結構：`domain/` 資料夾結構
- 新版檔案命名規範：參考 `domain/manifests/`、`domain/questions/`、`domain/narratives/` 等

---

### 4. 必須排除 LEGACY 內容，採用新版架構

**要求**：
- **必須排除所有 LEGACY 架構相關內容**
- **必須採用新版架構**
- 不得使用任何 LEGACY 架構的結構、命名、格式

**參考**：
- LEGACY 架構：`docs/legacy/115_1_3_my-first-app_failed/`（僅供參考，不得採用）
- 新版架構：`domain/` 資料夾結構（必須採用）

---

## 📋 新版架構規範

### 1. 檔案結構

**新版結構**：
```
domain/
├── manifests/          # Facet 定義（必須）
├── questions/          # 題庫（必須）
├── facets/            # 計分邏輯（必須）
├── narratives/        # 敘事（必須）
├── recommendations/    # 建議（必須）
└── riskchains/        # 風險鏈（必須）
```

**不得使用**：
- LEGACY 架構的任何結構
- 不符合新版規範的檔案命名
- 不符合新版規範的資料格式

---

### 2. Manifest 結構

**新版 Manifest 範例**：
```json
{
  "domainVersion": "1.0",
  "facetId": "stress_recovery",
  "sources": {
    "questions": "domain/questions/stress_recovery.questions.v1.0.json",
    "scoring": "domain/facets/stress_recovery.scoring.v1.0.json",
    "recommendations": "domain/recommendations/stress_recovery.reco.v1.0.json",
    "narratives": "domain/narratives/stress_recovery.narr.v1.0.json",
    "riskchains": "domain/riskchains/stress_recovery.risk.v1.0.json"
  }
}
```

**必須遵守**：
- 使用 `domainVersion` 欄位
- 使用 `facetId` 欄位
- 使用 `sources` 欄位指向各分檔
- 檔案命名格式：`{facetId}.{type}.v{version}.json`

---

### 3. Narratives 結構

**新版 Narratives 範例**：
```json
{
  "low": {
    "opening": "你現在的氣場比較穩，像是五行之中「土」有根。",
    "explain": "土穩代表你有基本節奏，身心不容易被外界帶著跑。"
  },
  "mid": {
    "opening": "你最近像是「木」被風拉扯，能長但也容易累。",
    "explain": "木主伸展，代表你在撐著往前，但恢復沒跟上。"
  },
  "high": {
    "opening": "你目前像是「火」過旺，亮但消耗很快。",
    "explain": "火旺常見於壓力堆疊，短期能衝，長期容易透支。"
  }
}
```

**必須遵守**：
- 使用 `low`、`mid`、`high` 三個層級
- 每個層級包含 `opening` 和 `explain` 欄位
- 符合新版網頁 UI 的呈現需求

---

### 4. Questions 結構

**新版 Questions 範例**：參考 `domain/questions/stress_recovery.questions.v1.0.json`

**必須遵守**：
- 符合新版系統的題目格式
- 符合新版網頁 UI 的呈現需求
- 不得使用 LEGACY 題目格式

---

### 5. Recommendations 結構

**新版 Recommendations 範例**：參考 `domain/recommendations/stress_recovery.reco.v1.0.json`

**必須遵守**：
- 符合新版系統的建議格式
- 符合新版網頁 UI 的互動需求
- 不得使用 LEGACY 建議格式

---

### 6. Riskchains 結構

**新版 Riskchains 範例**：參考 `domain/riskchains/stress_recovery.risk.v1.0.json`

**必須遵守**：
- 符合新版系統的風險鏈格式
- 符合新版網頁 UI 的呈現需求
- 不得使用 LEGACY 風險鏈格式

---

## 🚫 禁止事項

### 1. 禁止使用 LEGACY 架構

**禁止**：
- 使用任何 LEGACY 架構的結構
- 使用任何 LEGACY 架構的命名
- 使用任何 LEGACY 架構的格式
- 直接複製 LEGACY 內容而不轉化

---

### 2. 禁止不符合新版規範

**禁止**：
- 不符合新版系統規範的檔案命名
- 不符合新版系統規範的資料格式
- 不符合新版網頁 UI 結構的內容

---

### 3. 禁止偏離專案目標

**禁止**：
- 偏離專案最終目標
- 偏離相關子目標
- 不符合專案路線圖

---

## ✅ 檢查清單

### 整合前檢查

- [ ] 已閱讀新版架構規範文件
- [ ] 已參考新版架構範例
- [ ] 已了解新版網頁 UI 結構
- [ ] 已了解專案最終目標和子目標

### 整合時檢查

- [ ] 所有資料已轉化為新版架構格式
- [ ] 所有資料符合新版網頁 UI 結構
- [ ] 已排除所有 LEGACY 架構內容
- [ ] 所有檔案命名符合新版規範
- [ ] 所有資料格式符合新版規範

### 整合後檢查

- [ ] 所有資料可以在新版網頁中使用
- [ ] 所有資料符合專案目標
- [ ] 所有資料符合新版系統規範
- [ ] 已建立對照表
- [ ] 已記錄整合過程

---

## 📞 問題回報

如有任何問題，請：
1. 記錄在 `ADVISORY_QUESTION_LOG.md`
2. 標註問題類別和優先級
3. 提供相關檔案路徑和內容

---

**文件狀態**：MANDATORY（必須遵守）  
**最後更新**：2026-01-12  
**下一步**：顧問團隊開始整合時必須遵守這些要求
