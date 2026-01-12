# 新版系統結構參考文件

**建立日期**：2026-01-12  
**目的**：為顧問團隊提供新版系統的完整結構參考  
**文件狀態**：REFERENCE DOCUMENT

---

## 📁 新版系統結構

### 1. 資料夾結構

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

---

## 📄 檔案格式規範

### 1. Manifest 格式

**檔案命名**：`{facetId}.v1.0.json`

**範例**：`domain/manifests/stress_recovery.v1.0.json`

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

**Schema**：`schemas/domain_manifest.schema.json`

---

### 2. Questions 格式

**檔案命名**：`{facetId}.questions.v1.0.json`

**範例**：`domain/questions/stress_recovery.questions.v1.0.json`

```json
[
  {
    "id": "sr_q1",
    "text": "最近 7 天，你覺得自己大多時候是在「撐著」嗎？",
    "type": "likert_5",
    "scale": ["完全沒有", "很少", "有時", "常常", "幾乎一直"]
  },
  {
    "id": "sr_q2",
    "text": "最近 7 天，你的睡眠恢復感如何？",
    "type": "likert_5",
    "scale": ["很好", "還不錯", "普通", "偏差", "很差"]
  }
]
```

**要求**：
- 必須是陣列格式
- 每個問題必須有 `id`、`text`、`type`、`scale`
- `type` 必須是 `likert_5`
- `scale` 必須是 5 個選項的陣列

---

### 3. Scoring 格式

**檔案命名**：`{facetId}.scoring.v1.0.json`

**範例**：`domain/facets/stress_recovery.scoring.v1.0.json`

**要求**：
- 必須符合新版系統的計分邏輯格式
- 參考現有 `domain/facets/` 中的檔案

---

### 4. Narratives 格式

**檔案命名**：`{facetId}.narr.v1.0.json`

**範例**：`domain/narratives/stress_recovery.narr.v1.0.json`

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

**要求**：
- 必須有 `low`、`mid`、`high` 三個層級
- 每個層級必須有 `opening` 和 `explain` 欄位
- 內容必須符合新版網頁 UI 的呈現需求

---

### 5. Recommendations 格式

**檔案命名**：`{facetId}.reco.v1.0.json`

**範例**：`domain/recommendations/stress_recovery.reco.v1.0.json`

```json
{
  "low": [
    {
      "id": "sr_low_1",
      "title": "維持節奏",
      "steps": [
        "每天固定一個 10 分鐘放鬆段落",
        "睡前 30 分鐘不做高刺激內容"
      ]
    }
  ],
  "mid": [
    {
      "id": "sr_mid_1",
      "title": "先把恢復拉回來",
      "steps": [
        "連續 3 天，固定起床時間",
        "下午兩點後避免含咖啡因飲品",
        "每天 15 分鐘輕度走路"
      ]
    }
  ],
  "high": [
    {
      "id": "sr_high_1",
      "title": "先止血再談提升",
      "steps": [
        "把今天要做的事砍到 3 件",
        "晚上只做低耗能活動",
        "明天安排一段可被打斷也沒關係的休息"
      ]
    }
  ]
}
```

**要求**：
- 必須有 `low`、`mid`、`high` 三個層級
- 每個層級是陣列，包含多個建議
- 每個建議必須有 `id`、`title`、`steps`
- 內容必須符合新版網頁 UI 的互動需求

---

### 6. Riskchains 格式

**檔案命名**：`{facetId}.risk.v1.0.json`

**範例**：`domain/riskchains/stress_recovery.risk.v1.0.json`

**要求**：
- 必須符合新版系統的風險鏈格式
- 參考現有 `domain/riskchains/` 中的檔案

---

## 🔍 現有系統狀態

### 已存在的 Facet

**目前 `domain/` 中已有的 Facet**：
- `stress_recovery` - 完整（有 questions、scoring、narratives、recommendations、riskchains、manifest）

**參考範例**：
- Manifest：`domain/manifests/stress_recovery.v1.0.json`
- Questions：`domain/questions/stress_recovery.questions.v1.0.json`
- Scoring：`domain/facets/stress_recovery.scoring.v1.0.json`
- Narratives：`domain/narratives/stress_recovery.narr.v1.0.json`
- Recommendations：`domain/recommendations/stress_recovery.reco.v1.0.json`
- Riskchains：`domain/riskchains/stress_recovery.risk.v1.0.json`

---

## 📋 轉化要求

### 1. 必須遵守的規範

- ✅ **檔案命名**：必須符合 `{facetId}.{type}.v1.0.json` 格式
- ✅ **資料格式**：必須符合新版系統的格式規範
- ✅ **內容結構**：必須符合新版網頁 UI 結構
- ✅ **排除 LEGACY**：必須排除所有 LEGACY 架構內容

### 2. 轉化步驟

1. **讀取 EXTRACTION_WORKSPACE 中的資料**
2. **轉化為新版架構格式**（參考上述範例）
3. **驗證格式正確性**（使用 Schema）
4. **產出到 domain/ 結構**

---

## 🚫 禁止事項

### 1. 禁止使用 LEGACY 架構

- ❌ 不得使用任何 LEGACY 架構的結構
- ❌ 不得使用任何 LEGACY 架構的命名
- ❌ 不得使用任何 LEGACY 架構的格式

### 2. 禁止不符合新版規範

- ❌ 不得使用不符合新版系統規範的檔案命名
- ❌ 不得使用不符合新版系統規範的資料格式
- ❌ 不得使用不符合新版網頁 UI 結構的內容

---

## 📞 參考資料

### 新版架構規範

- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - 新版架構規範
- `schemas/domain_manifest.schema.json` - Manifest Schema

### 現有範例

- `domain/manifests/stress_recovery.v1.0.json` - Manifest 範例
- `domain/questions/stress_recovery.questions.v1.0.json` - Questions 範例
- `domain/narratives/stress_recovery.narr.v1.0.json` - Narratives 範例
- `domain/recommendations/stress_recovery.reco.v1.0.json` - Recommendations 範例
- `domain/riskchains/stress_recovery.risk.v1.0.json` - Riskchains 範例

---

**文件狀態**：REFERENCE DOCUMENT  
**最後更新**：2026-01-12  
**用途**：顧問團隊轉化時的參考文件
