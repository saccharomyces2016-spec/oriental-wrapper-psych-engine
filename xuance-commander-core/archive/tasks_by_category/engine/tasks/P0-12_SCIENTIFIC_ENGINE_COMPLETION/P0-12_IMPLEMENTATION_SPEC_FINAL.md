# P0-12 Legacy 整合工程實作規格書（最終版）

**建立日期**：2026-01-11  
**文件狀態**：WORKING BASELINE（不鎖定，可回滾）  
**適用階段**：Stage 1–4 (MVP)  
**來源**：顧問團最終提交（經嚴格審核後篩選組合）

---

## 說明

本文件記錄了 P0-12 任務中經過嚴格審核後符合要求的設計決策和實作規格。這些內容標記為 **WORKING BASELINE**，表示：

- ✅ 設計方向正確，符合系統架構要求
- ✅ 結構完全符合現有系統 schema
- ⚠️ 可演化、不鎖定，可根據後續實作調整
- ⚠️ 可回滾，如果後續實作發現問題可以修改

**審核依據**：
- 嚴格比對 `domain/questions/stress_recovery.questions.v1.0.json`
- 嚴格比對 `domain/facets/stress_recovery.scoring.v1.0.json`
- 嚴格比對 `domain/manifests/stress_recovery.v1.0.json`
- 嚴格比對現有系統的實際結構和 schema

---

## 一、人生八大領域定義（Stage 1 入口）

### 1.1 領域定義

以下為本階段正式採用之 **人生八大領域（Domains）**，作為 Stage 1 的入口選擇。

| Domain ID | 領域核心 | 系統定位 |
|-----------|---------|---------|
| D1 | `chronic_depletion` | 能量與承載狀態 |
| D2 | `chronic_alertness` | 生存警戒與安全 |
| D3 | `fear_based_stability` | 停滯與改變阻力 |
| D4 | `hyper_responsibility` | 角色與責任過載 |
| D5 | `identity_diffusion` | 自我認同與方向 |
| D6 | `loss_of_agency` | 行動力與主控感 |
| D7 | `meaning_vacuum` | 價值與動機 |
| D8 | `suppressed_needs` | 需求與情感表達 |

### 1.2 補充說明

- `self_erosion`、`unprocessed_loss` 本階段不作為第一關領域
- 保留為母題層（motherThemes）或後續六十四卦敘事延伸

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 二、JSON 結構定義（完全符合現有系統 Schema）

以下所有結構已嚴格對照現有系統的實際結構，確保 100% 符合 schema 要求。

### 2.1 Manifest 結構

**檔案位置**：`domain/manifests/chronic_depletion.v1.0.json`

```json
{
  "domainVersion": "1.0",
  "facetId": "chronic_depletion",
  "sources": {
    "questions": "domain/questions/chronic_depletion.questions.v1.0.json",
    "scoring": "domain/facets/chronic_depletion.scoring.v1.0.json",
    "recommendations": "domain/recommendations/chronic_depletion.reco.v1.0.json",
    "narratives": "domain/narratives/chronic_depletion.narr.v1.0.json",
    "riskchains": "domain/riskchains/chronic_depletion.risk.v1.0.json"
  }
}
```

**符合性**：✅ 完全符合 `domain_manifest.schema.json`

---

### 2.2 Questions 結構

**檔案位置**：`domain/questions/chronic_depletion.questions.v1.0.json`

```json
[
  {
    "id": "cd_q1",
    "text": "在需要休息的時候，你最常出現的狀態是？",
    "type": "likert_5",
    "scale": [
      "巨石壓身，難以動彈",
      "燈火微弱，仍勉強撐著",
      "警鈴不斷，無法真正放鬆",
      "水面平穩，能自然恢復",
      "精神充沛，能快速回復"
    ]
  }
]
```

**關鍵特點**：
- ✅ `scale` 是**字串陣列**（array of strings），完全符合現有系統要求
- ✅ `type` 使用 `"likert_5"`（5 點量表），符合現有系統
- ✅ 結構與 `domain/questions/stress_recovery.questions.v1.0.json` 完全一致

**符合性**：✅ 完全符合現有系統結構

---

### 2.3 Scoring 結構

**檔案位置**：`domain/facets/chronic_depletion.scoring.v1.0.json`

```json
{
  "model": "weighted_sum",
  "inputs": [
    {
      "questionId": "cd_q1",
      "weight": 1.0,
      "direction": "higher_is_worse"
    }
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

**關鍵特點**：
- ✅ `inputs` 陣列，每個項目包含：`questionId`, `weight`, `direction`
- ✅ **不包含**任何額外欄位（如 `legacy_mapping`），完全符合現有系統
- ✅ 結構與 `domain/facets/stress_recovery.scoring.v1.0.json` 完全一致

**符合性**：✅ 完全符合現有系統結構

---

### 2.4 Narratives 結構

**檔案位置**：`domain/narratives/chronic_depletion.narr.v1.0.json`

```json
{
  "low": {
    "opening": "你的狀態目前仍有餘裕。",
    "explain": "節奏與承載大致平衡，能支撐日常運轉。"
  },
  "mid": {
    "opening": "你正在消耗中前行。",
    "explain": "雖然還能撐住，但補給已開始落後。"
  },
  "high": {
    "opening": "你的承載已逼近極限。",
    "explain": "若繼續硬撐，將引發長期反彈。"
  }
}
```

**符合性**：✅ 完全符合現有系統結構

---

### 2.5 Recommendations 結構

**檔案位置**：`domain/recommendations/chronic_depletion.reco.v1.0.json`

```json
{
  "low": [
    {
      "id": "cd_low_1",
      "title": "維持節奏",
      "steps": [
        "每天保留固定的低耗能時段",
        "睡前 30 分鐘避免高刺激活動"
      ]
    }
  ],
  "mid": [
    {
      "id": "cd_mid_1",
      "title": "優先恢復",
      "steps": [
        "連續三天固定作息",
        "減少一項非必要承擔"
      ]
    }
  ],
  "high": [
    {
      "id": "cd_high_1",
      "title": "先止血再談前進",
      "steps": [
        "將今天的任務減至三件",
        "晚上只安排可隨時中斷的休息"
      ]
    }
  ]
}
```

**符合性**：✅ 完全符合現有系統結構

---

### 2.6 Riskchains 結構

**檔案位置**：`domain/riskchains/chronic_depletion.risk.v1.0.json`

```json
{
  "mid": {
    "if_not_improve": [
      "疲勞累積 → 專注力下降 → 決策品質變差"
    ]
  },
  "high": {
    "if_not_improve": [
      "長期透支 → 情緒鈍化 → 行動力持續下降",
      "恢復失衡 → 關係摩擦增加 → 壓力再上升"
    ]
  }
}
```

**符合性**：✅ 完全符合現有系統結構

---

## 三、Legacy Metadata 處理方案（分離策略）

由於現有系統的 JSON 結構不支持在 `questions` 或 `scoring` 中嵌入 metadata，我們採用**分離策略**：

### 3.1 策略說明

- **現有系統（Layer B）**：使用標準的 JSON 結構（questions, scoring），不包含 metadata
- **Legacy 系統（Layer A）**：使用獨立的映射檔案（`legacy_map.v1.0.json`）來存儲 metadata
- **運行時處理**：Layer A (Python) 在運行時讀取映射檔案，根據用戶選擇的索引查找 Pattern 和 Weight

### 3.2 Legacy Mapping 檔案結構

**檔案位置**：`domain/legacy_maps/chronic_depletion.legacy_map.v1.0.json`

```json
{
  "domainId": "chronic_depletion",
  "mappings": {
    "cd_q1": {
      "0": { "pattern": "withdraw_and_protect", "legacy_weight": 1.2 },
      "1": { "pattern": "push_through", "legacy_weight": 1.1 },
      "2": { "pattern": "routine_fatigue", "legacy_weight": 1.0 },
      "3": { "pattern": "baseline_recovery", "legacy_weight": 0.6 },
      "4": { "pattern": "well_regulated", "legacy_weight": 0.3 }
    }
  }
}
```

**說明**：
- 此檔案不參與 `compile_domain.py` 編譯流程
- 僅供 Layer A (Python Scorer) 運行時讀取
- Key 為問題 ID，Value 為選擇索引到 metadata 的映射

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 四、欄位對應表（Legacy → 現有系統）

### 4.1 題庫結構對應

| Legacy 欄位 | 現有系統欄位 | 轉換規則 |
|------------|------------|---------|
| `theme_id` | `facetId` (manifest) | 直接映射 |
| `question_text` | `text` | 去問卷化＋語境轉換 |
| `choices` | `scale` | 轉為字串陣列（象徵語境選項） |
| `pattern_tags` | `legacy_map.v1.0.json` | 分離到映射檔案 |
| `confidence_weight` | `scoring.inputs.weight` + `legacy_map.v1.0.json` | 分數權重在 scoring，詳細權重在映射檔案 |
| `choice_meta.behavior_facet` | `legacy_map.v1.0.json` | 分離到映射檔案 |

### 4.2 結果呈現對應

| Legacy 欄位 | 現有系統欄位 | 轉換規則 |
|------------|------------|---------|
| `interventions.byTheme[].actions` | `recommendations[].steps` | 過濾與改寫（語境轉換） |
| `chains.byTheme[].long` | `riskchains[].if_not_improve` | 語境重寫（心理後果 → 運勢/狀態後果） |

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 五、buildGuidance.js 整合方案

### 5.1 舊系統邏輯 → 新系統對應

| buildGuidance.js | 新系統 |
|-----------------|--------|
| motherThemes 前三名 | 後端 Insight Layer |
| interventions.byTheme | recommendations.v1.0.json |
| chains.byTheme | riskchains.v1.0.json |
| guidancePrinciples | 融合至 recommendations.title |
| guidanceActionTemplates | 拆解為 steps |
| resultLexicon | ETL 階段詞彙替換 |

### 5.2 整合原則

- **byTheme 優先**：優先使用 `interventions.byTheme[themeId]` 和 `chains.byTheme[themeId]`
- **Fallback 機制**：無對應時 fallback 至 Domain
- **語境轉換**：所有心理學詞彙於 ETL 階段轉換為玄學語境

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 六、Python 計算核心（Layer A）

### 6.1 模組結構

**檔案位置**：`engine/legacy_core/scorer.py`

完整的 Python 模組結構（參考顧問團提供的實現，但需要配合分離策略進行調整）：

- 讀取 `legacy_map.v1.0.json` 獲取 metadata
- 根據用戶選擇的索引查找 Pattern 和 Weight
- 執行 Legacy 計算邏輯（traits, axes, elements, motherThemes）

**狀態**：WORKING BASELINE（可演化、不鎖定）

**注意**：具體的實現代碼需要根據分離策略進行調整，確保能正確讀取映射檔案。

---

## 七、編譯流程

### 7.1 編譯指令

```bash
python3 engine/compile_domain.py \
  domain/manifests/chronic_depletion.v1.0.json \
  domain/compiled/chronic_depletion.compiled.v1.0.json
```

### 7.2 預期輸出

- 編譯後的 JSON 檔案符合 `compiled_facet.schema.json`
- 不包含任何 metadata 欄位
- 完全符合現有系統的結構要求

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 八、測試方案

### 8.1 測試標準

| 類型 | 標準 |
|------|------|
| Schema | 全 JSON 通過 |
| 計算 | 誤差 < 0.01 |
| 一致性 | Layer A / B 無衝突 |
| 語境 | 無 forbidden_terms |
| 編譯 | 8 Domains 全通過 |

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 九、文件狀態說明

### 9.1 不鎖定原則

本文件中的所有設計決策均為 **WORKING BASELINE**，表示：

- ✅ 設計方向正確，可以作為實作的指導
- ⚠️ 可根據後續實作情況調整
- ⚠️ 不會鎖定為最終版本，保留修改空間

### 9.2 可回滾原則

所有設計決策都可以在後續階段調整或回滾，如果：

- 實作過程中發現技術問題
- 實作過程中發現設計缺陷
- 需要根據實際測試結果調整

### 9.3 審核來源

本文件內容來自顧問團的最終提交，經過以下嚴格審核：

1. 嚴格比對現有系統的實際結構
2. 嚴格比對現有系統的 schema
3. 篩選出符合要求的內容
4. 重組組合為一致的規格

---

**文件狀態**：WORKING BASELINE（不鎖定，可回滾）  
**最後更新**：2026-01-11  
**審核依據**：嚴格比對 `domain/` 資料夾中的實際檔案結構
