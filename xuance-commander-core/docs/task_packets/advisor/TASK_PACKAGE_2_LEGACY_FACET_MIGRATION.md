# 任務包 2：Legacy Facet 遷移包

**建立日期**：2026-01-13  
**執行對象**：GPT / GEMINI（任務執行者）  
**狀態**：READY FOR EXECUTION  
**優先級**：MEDIUM

---

## 📋 任務目標

將 9 個 Legacy Facet 從 `weighted_sum` 遷移到 `vector_state_v3`，並確保所有 Facet 符合 V3 規範。

---

## 🎯 待遷移的 Facet（9 個）

| Facet | 檔案 | 模型 | 題數 | 狀態 |
|-------|------|------|------|------|
| `stress_recovery` | `stress_recovery.scoring.v1.0.json` | `weighted_sum` | 2 | ⚠️ **需遷移 + 擴充**（2 題 → 8 題） |
| `chronic_depletion` | `chronic_depletion.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `identity_diffusion` | `identity_diffusion.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `fear_based_stability` | `fear_based_stability.scoring.v1.0.json` | `weighted_sum` | 3 | ⚠️ **需遷移 + 擴充**（3 題 → 8 題） |
| `meaning_vacuum` | `meaning_vacuum.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `suppressed_needs` | `suppressed_needs.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `chronic_alertness` | `chronic_alertness.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `hyper_responsibility` | `hyper_responsibility.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `loss_of_agency` | `loss_of_agency.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |

---

## 📚 背景資料

### V3 引擎核心規格

**檔案位置**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - V3 引擎核心規格
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示
- `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策

**核心概念**：
- **Raw Score**：加權平均（與 weighted_sum 相同）
- **Volatility**：Sample StdDev（排除 Validation/Resource 題）
- **Rigidity**：三層模型（Locus × Subtype × Agency），預設值為 0.0
- **Final Score**：`clamp(raw_score * (1 + rigidity * rigidity_weight), 0, 1)`

### V3 Facet 範例

**檔案位置**：
- `domain/facets/burnout_syndrome.scoring.v1.0.json` - V3 Facet 範例

**結構範例**：
```json
{
  "model": "vector_state_v3",
  "params": {
    "volatility_thresholds": [0.15, 0.35],
    "rigidity_weight": 0.10,
    "rigidity_frozen_threshold": 0.70,
    "volatility_stddev_mode": "sample",
    "rigidity_default_when_missing": 0.0
  },
  "inputs": [
    {
      "question_id": "bs_q1",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": false
    },
    {
      "question_id": "bs_q2",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": true
    }
  ],
  "bands": [
    { "id": "low", "min": 0.0, "max": 0.33 },
    { "id": "mid", "min": 0.33, "max": 0.66 },
    { "id": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

### 題目設計指南

**檔案位置**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

**關鍵規則**：
- 題目數量：6-10 題彈性，預設 8 題
- 題目類型配比：
  - Core State：3 題（權重 1.0）
  - Validation：2 題（權重 1.0，`exclude_from_volatility: true`）
  - Reaction：2 題（權重 1.25）
  - Resource：1 題（權重 0.75，`exclude_from_volatility: true`）
- `exclude_from_volatility` 標記：
  - Validation 題：`true`
  - Resource 題：`true`
  - Core State 題：`false`
  - Reaction 題：`false`

### Domain 映射

**檔案位置**：
- `domain/domains/bagua.domain_map.v1.0.json` - Domain 映射配置

**需要為每個 Facet 指定**：
- `domainKey`：八大領域之一（qian, kun, zhen, xun, kan, li, gen, dui, center）
- `questionSet`：題目集合類型（OCTET_8 或 DECET_10）

---

## 🔧 需要執行的行動

### 步驟 1：檢查每個 Facet

**行動**：
1. 讀取每個 Facet 的 `scoring.v1.0.json`
2. 確認題目數量（是否符合 6-10 題規範）
3. 確認是否有 `exclude_from_volatility` 標記
4. 確認是否有 `domainKey` 和 `questionSet`

**發現**（已確認）：
- ✅ 所有 9 個 Facet 都使用 `weighted_sum` 模型
- ❌ 所有 Facet 都缺少 `exclude_from_volatility` 標記
- ❌ 所有 Facet 都缺少 `domainKey` 和 `questionSet`
- ⚠️ 2 個 Facet 題數不足（`stress_recovery`: 2 題，`fear_based_stability`: 3 題）

---

### 步驟 2：更新 Facet 配置

**行動**：
1. 更新 `scoring.model` 為 `"vector_state_v3"`
2. 更新 `scoring.params` 包含 V3 參數：
   ```json
   "params": {
     "volatility_thresholds": [0.15, 0.35],
     "rigidity_weight": 0.10,
     "rigidity_frozen_threshold": 0.70,
     "volatility_stddev_mode": "sample",
     "rigidity_default_when_missing": 0.0
   }
   ```
3. 確保所有題目都有 `exclude_from_volatility` 標記：
   - 根據題目類型判斷（需要讀取 questions 檔案）
   - Validation/Resource 題：`true`
   - Core State/Reaction 題：`false`
4. 更新 `domainKey` 和 `questionSet`（如果缺失）：
   - 需要根據 Facet 的內容判斷應該屬於哪個 Domain
   - `questionSet` 根據題目數量決定（8 題 = OCTET_8，10 題 = DECET_10）

**注意事項**：
- 如果 Facet 沒有對應的 questions 檔案，需要先建立或確認題目類型
- `domainKey` 的選擇需要參考 `bagua.domain_map.v1.0.json` 的定義

---

### 步驟 3：題目擴充（僅限 2 個 Facet）

**需要擴充的 Facet**：
1. `stress_recovery`：從 2 題擴充到 8 題
2. `fear_based_stability`：從 3 題擴充到 8 題

**行動**：
1. 參考 `domain/knowledge_base/question_design_guidelines.v1.0.md`
2. 設計符合「去問卷化」原則和語境純粹性要求的題目
3. 確保題目類型配比符合規範（3 Core State + 2 Validation + 2 Reaction + 1 Resource）
4. 建立或更新 `domain/questions/<facet_id>.questions.v1.0.json`

**注意事項**：
- 題目必須使用玄學語境，不得出現心理學名詞
- 題目必須符合「歲時農耕・倉廩觀」主隱喻
- 需要參考現有題目範例（例如：`burnout_syndrome` 的題目）

---

### 步驟 4：更新 Manifest

**行動**：
1. 檢查每個 Facet 的 manifest 文件（`domain/manifests/<facet_id>.v1.0.json`）
2. 確保 manifest 包含 `domainKey` 和 `questionSet`
3. 確保 manifest 的 `scoringModel` 為 `"vector_state_v3"`

**注意事項**：
- 如果 manifest 不存在，需要建立
- Manifest 的結構需要符合 `schemas/domain_manifest.schema.json`

---

### 步驟 5：驗證遷移

**行動**：
1. 執行編譯流程（`build/compile_all.sh` 或類似工具）
2. 驗證編譯後的 Facet 可以正常運作
3. 驗證計算結果的合理性（與 weighted_sum 的結果對比）

**驗收標準**：
- ✅ 所有 Legacy Facet 已遷移到 `vector_state_v3`
- ✅ 所有 Facet 配置符合 V3 規範
- ✅ 2 個 Facet 題數已擴充到 8 題
- ✅ 編譯流程通過
- ✅ 計算結果合理

---

## 📝 詳細執行指南

### Facet 配置更新範例

**Legacy 配置**（`stress_recovery.scoring.v1.0.json`）：
```json
{
  "model": "weighted_sum",
  "inputs": [
    { "questionId": "sr_q1", "weight": 1.0, "direction": "higher_is_worse" },
    { "questionId": "sr_q2", "weight": 1.0, "direction": "higher_is_worse" }
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

**V3 配置**（更新後）：
```json
{
  "model": "vector_state_v3",
  "params": {
    "volatility_thresholds": [0.15, 0.35],
    "rigidity_weight": 0.10,
    "rigidity_frozen_threshold": 0.70,
    "volatility_stddev_mode": "sample",
    "rigidity_default_when_missing": 0.0
  },
  "inputs": [
    {
      "question_id": "sr_q1",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": false
    },
    {
      "question_id": "sr_q2",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": false
    },
    {
      "question_id": "sr_q3",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": false
    },
    {
      "question_id": "sr_q4",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": false
    },
    {
      "question_id": "sr_q5",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": true
    },
    {
      "question_id": "sr_q6",
      "weight": 1.0,
      "direction": "higher_is_worse",
      "exclude_from_volatility": true
    },
    {
      "question_id": "sr_q7",
      "weight": 1.25,
      "direction": "higher_is_worse",
      "exclude_from_volatility": false
    },
    {
      "question_id": "sr_q8",
      "weight": 0.75,
      "direction": "higher_is_worse",
      "exclude_from_volatility": true
    }
  ],
  "bands": [
    { "id": "low", "min": 0.0, "max": 0.33 },
    { "id": "mid", "min": 0.33, "max": 0.66 },
    { "id": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

**關鍵變更**：
1. `model`: `"weighted_sum"` → `"vector_state_v3"`
2. 新增 `params` 區塊（V3 參數）
3. `questionId` → `question_id`（欄位名稱統一）
4. `band` → `id`（bands 結構統一）
5. 新增 `exclude_from_volatility` 標記
6. 題目數量從 2 題擴充到 8 題（符合 OCTET_8 規範）

---

### Domain 映射指南

**需要為每個 Facet 指定 `domainKey`**：

| Facet | 建議 Domain | 理由 |
|-------|-------------|------|
| `stress_recovery` | `kan`（坎，水） | 與情緒/恢復相關 |
| `chronic_depletion` | `li`（離，火） | 與過勞/耗竭相關 |
| `identity_diffusion` | `qian`（乾，金） | 與自我/身份相關 |
| `fear_based_stability` | `gen`（艮，土） | 與穩定/阻滯相關 |
| `meaning_vacuum` | `kun`（坤，土） | 與意義/空虛相關 |
| `suppressed_needs` | `xun`（巽，木） | 與關係/需求相關 |
| `chronic_alertness` | `zhen`（震，木） | 與行動/焦慮相關 |
| `hyper_responsibility` | `kun`（坤，土） | 與責任/負擔相關 |
| `loss_of_agency` | `qian`（乾，金） | 與自我/控制相關 |

**注意事項**：
- 如果 Facet 的內容與多個 Domain 相關，選擇最相關的一個
- 如果不確定，可以選擇 `center`（中宮）作為兜底路由

---

## ✅ 驗收標準

### 必須完成

1. ✅ 所有 9 個 Legacy Facet 已遷移到 `vector_state_v3`
2. ✅ 所有 Facet 配置符合 V3 規範（包含 `params`、`exclude_from_volatility` 等）
3. ✅ 2 個 Facet 題數已擴充到 8 題（`stress_recovery`, `fear_based_stability`）
4. ✅ 所有 Facet 都有 `domainKey` 和 `questionSet`
5. ✅ 編譯流程通過
6. ✅ 計算結果合理

### 建議完成

7. ✅ 所有 Facet 的 manifest 已更新
8. ✅ 所有 Facet 的題目檔案已建立或更新

---

## 📦 交付物

完成後應產出：
1. ✅ 更新的 9 個 Facet 配置（`domain/facets/*.scoring.v1.0.json`）
2. ✅ 新建或更新的題目檔案（`domain/questions/*.questions.v1.0.json`，至少 2 個）
3. ✅ 更新的 Manifest 檔案（`domain/manifests/*.v1.0.json`，如果存在）
4. ✅ 遷移報告（記錄每個 Facet 的變更）

---

**建立日期**：2026-01-13  
**執行對象**：GPT / GEMINI（任務執行者）  
**狀態**：READY FOR EXECUTION
