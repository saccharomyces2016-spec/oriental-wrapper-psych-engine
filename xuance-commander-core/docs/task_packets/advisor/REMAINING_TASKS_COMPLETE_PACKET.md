# 剩餘任務完整執行包

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION  
**目標**：完成所有剩餘任務，結束當前所有進行中的工作

---

## 📋 任務總覽

### 當前進行中的任務

1. **ENGINE_CORE_FINAL_INTEGRATION_EXECUTION**（底層引擎最終整合執行）
   - 狀態：等待顧問團隊回饋（4 個關鍵問題）
   - 進度：V4 審核和整合已完成（約 90%）

2. **P0-12 科學運算引擎完善**
   - 狀態：80% 完成
   - 進度：階段二-4 待執行（規則與制度提取）

---

## 🎯 任務 1：解決 V4 追問包問題（PRIORITY: HIGH）

### 1.1 問題 1：缺失 Priors 的 Rigidity 預設值（PRIORITY: HIGH）

**問題**：三個地方對缺失 Priors 的 Rigidity 預設值不一致：
- DIRECTIVE REV.B：`return 0.0`
- CONSTITUTION Section 7.2：`rigidity_default_when_missing = 0.50`
- engine/score_facet.py：`default_when_missing = 0.5`

**裁示**：採用 0.0（符合 DIRECTIVE REV.B 的實際內容）

**需要執行的行動**：
1. 更新 `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` Section 7.2：改為 `rigidity_default_when_missing = 0.0`
2. 更新 `engine/score_facet.py`：改為 `default_when_missing: float = 0.0`
3. 檢查所有 Facet 的 scoring 配置，移除或更新 `rigidity_default_when_missing` 參數（如果存在且不是 0.0）

**驗收標準**：
- 所有文件中的預設值統一為 0.0
- `engine/score_facet.py` 的預設參數為 0.0
- 所有 Facet 配置一致

---

### 1.2 問題 2：Domain Schema 定義（PRIORITY: MEDIUM）

**問題**：只有 JSON 範例，沒有正式的 Schema 定義

**裁示**：建立完整的 Domain Schema

**需要執行的行動**：
1. 建立 `schemas/domain.schema.json`
2. 根據 `domain/domains/bagua.domain_map.v1.0.json` 範例定義完整結構
3. 定義必填和可選欄位

**Schema 結構（根據範例）**：
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Domain Schema",
  "type": "object",
  "required": ["version", "type", "domains"],
  "properties": {
    "version": {
      "type": "string",
      "pattern": "^[0-9]+\\.[0-9]+$"
    },
    "type": {
      "type": "string",
      "enum": ["bagua_domain_map"]
    },
    "domains": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["domainKey", "trigram", "element", "labels"],
        "properties": {
          "domainKey": {
            "type": "string",
            "enum": ["qian", "kun", "zhen", "xun", "kan", "li", "gen", "dui", "center"]
          },
          "trigram": {
            "type": "string"
          },
          "element": {
            "type": ["string", "null"],
            "enum": ["metal", "wood", "water", "fire", "earth", null]
          },
          "labels": {
            "type": "object",
            "required": ["zh", "en"],
            "properties": {
              "zh": { "type": "string" },
              "en": { "type": "string" }
            },
            "additionalProperties": false
          },
          "routing_hints": {
            "type": "array",
            "items": { "type": "string" }
          },
          "default_facets": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "additionalProperties": false
      }
    }
  },
  "additionalProperties": false
}
```

**驗收標準**：
- `schemas/domain.schema.json` 已建立
- Schema 可以驗證 `domain/domains/bagua.domain_map.v1.0.json`
- Schema 定義完整且符合範例結構

---

### 1.3 問題 3：ADR_0005 標準差模式更新（PRIORITY: MEDIUM）

**問題**：需要確認 ADR_0005 是否已更新標準差模式的決策記錄

**裁示**：更新 ADR_0005，新增標準差模式的決策記錄

**需要執行的行動**：
1. 檢查 `docs/adr/ADR_0005_vector_state_scoring_engine.md` 是否包含標準差模式的決策記錄
2. 如果沒有，在 Section "Decision" 中新增「決策 3：Volatility 標準差模式」

**建議新增內容**（插入到 Section "Decision" 中，在「決策 2：風險鏈結構整合」之後）：
```markdown
### 決策 3：Volatility 標準差模式（Volatility StdDev Mode）

**裁示（最終）**：採用 **sample stddev**（樣本標準差）作為 SSOT

**理由**：
- 符合統計學標準（樣本標準差用於樣本數據）
- 與 CONSTITUTION Section 3.2 一致
- 引擎實作預設為 sample stddev

**實作位置**：
- `engine/score_facet.py`：`volatility_stddev_mode` 參數預設為 `"sample"`
- 支援切換為 `"population"`，但預設固定為 `"sample"`

**對應 SSOT**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 3.2
- `engine/score_facet.py` - `run_vector_state_v3` 函數
```

**驗收標準**：
- ADR_0005 包含標準差模式的決策記錄
- 決策記錄與 CONSTITUTION 和實作一致

---

### 1.4 問題 4：世界級增強建議的實作細節（PRIORITY: MEDIUM）

**問題**：需要確認是否建立詳細的實作規格

**裁示**：建立完整的實作規格文件（每個項目一個文件）

**需要執行的行動**：
1. 建立 `specs/integration/i18n/I18N_IMPLEMENTATION_SPEC.md` - 多語言本地化策略
2. 建立 `specs/ui/accessibility/A11Y_SPECIFICATION.md` - 可訪問性規範
3. 建立 `docs/governance/DATA_PRIVACY_COMPLIANCE_STRATEGY.md` - 數據隱私與合規策略
4. 建立 `specs/integration/performance/PERFORMANCE_SCALABILITY_STRATEGY.md` - 效能與擴展性策略
5. 建立 `specs/integration/cultural/CULTURAL_ADAPTATION_STRATEGY.md` - 文化適應性策略

**每個文件的建議內容**：

#### 1.4.1 I18N 實作規格
- 需要多語言的欄位清單（題目、選項、敘事、建議、風險鏈）
- 多語言欄位的 Schema 結構（`{"zh-TW": "...", "en": "..."}`）
- 現有欄位的遷移策略（批次遷移 vs 逐步更新）
- i18n 實作範例（已有 `burnout_syndrome` 和 `deep_depression` 的題目範例）

#### 1.4.2 A11y 規範
- WCAG 2.1 AA 檢查清單
- 需要 ARIA labels 的元件清單（八卦轉輪、符號雲、萬象羅盤等）
- 鍵盤導航規範
- 螢幕閱讀器支援規範

#### 1.4.3 數據隱私與合規策略
- PII 處理策略（DOB 短期存留/可刪除）
- 數據處理合規檢查清單（GDPR、CCPA）
- 用戶權利實作規範（刪除、導出等）

#### 1.4.4 效能與擴展性策略
- 效能基準（響應時間、吞吐量等）
- 擴展性架構（水平擴展、快取策略等）
- 負載測試標準

#### 1.4.5 文化適應性策略
- 文化背景的隱喻映射表
- 文化適應的敘事模板
- 不同文化版本的測試策略

**驗收標準**：
- 5 個規格文件已建立
- 每個文件包含完整的實作細節
- 文件內容符合專案目標（世界級水準、國際市場、全文化、全年齡）

---

## 🎯 任務 2：完成 P0-12 階段二-4（規則與制度提取）

### 2.1 任務描述

**目標**：分析 Legacy 系統中的規則與制度，提取並整合到現有系統

**待完成工作**：
1. 分析 `intervention_boundary_matrix` 的規則
2. 提取 `guidancePrinciples` 的邏輯
3. 分析 `buildGuidance.js` 的決策邏輯
4. 建立呈現規則文件

### 2.2 需要執行的行動

**步驟 1：定位 Legacy 文件**
- 搜尋 Legacy 資料夾中的相關文件
- 如果找不到，標記為「無法定位，待後續處理」

**步驟 2：分析規則邏輯**
- 分析規則結構
- 提取邏輯
- 分析決策邏輯

**步驟 3：建立呈現規則文件**
- 建立 `domain/knowledge_base/presentation_rules.v1.0.md` 或類似文件
- 整合規則邏輯到現有系統
- 確保規則符合現有 Schema 和架構

**步驟 4：驗證整合**
- 驗證規則邏輯與現有系統的一致性
- 確保規則可以正常運作

**驗收標準**：
- 規則與制度已提取並整合（或標記為「無法定位，待後續處理」）
- 呈現規則文件已建立（或標記為「待 Legacy 文件定位後處理」）
- 規則邏輯與現有系統一致

---

## 🎯 任務 3：Legacy Facet 遷移（PRIORITY: MEDIUM）

### 3.1 任務描述

**目標**：將 Legacy Facet 從 `weighted_sum` 遷移到 `vector_state_v3`

**待遷移的 Facet**（9 個）：
1. `stress_recovery`（2 題，需擴充到 6-10 題）
2. `chronic_depletion`（7 題，符合規範）
3. `identity_diffusion`（7 題，符合規範）
4. `fear_based_stability`（3 題，需擴充到 6-10 題）
5. `meaning_vacuum`（7 題，符合規範）
6. `suppressed_needs`（7 題，符合規範）
7. `chronic_alertness`（7 題，符合規範）
8. `hyper_responsibility`（7 題，符合規範）
9. `loss_of_agency`（7 題，符合規範）

### 3.2 需要執行的行動

**步驟 1：檢查每個 Facet**
- 讀取每個 Facet 的 `scoring.v1.0.json`
- 確認題目數量（是否符合 6-10 題規範）
- 確認是否有 `exclude_from_volatility` 標記
- 確認是否有 `domainKey` 和 `questionSet`

**步驟 2：更新 Facet 配置**
- 更新 `scoring.model` 為 `"vector_state_v3"`
- 更新 `scoring.params` 包含 V3 參數：
  ```json
  "params": {
    "volatility_thresholds": [0.15, 0.35],
    "rigidity_weight": 0.10,
    "rigidity_frozen_threshold": 0.70,
    "volatility_stddev_mode": "sample",
    "rigidity_default_when_missing": 0.0
  }
  ```
- 確保所有題目都有 `exclude_from_volatility` 標記（根據題目類型：Validation/Resource 為 true，其他為 false）
- 更新 `domainKey` 和 `questionSet`（如果缺失）

**步驟 3：更新 Manifest**
- 檢查每個 Facet 的 manifest 文件
- 確保 manifest 包含 `domainKey` 和 `questionSet`

**步驟 4：驗證遷移**
- 執行測試確保遷移後的 Facet 可以正常運作
- 驗證計算結果的合理性

**驗收標準**：
- 所有 Legacy Facet 已遷移到 `vector_state_v3`
- 所有 Facet 配置符合 V3 規範
- 測試通過

---

## 🎯 任務 4：更新相關文件（PRIORITY: LOW）

### 4.1 需要更新的文件

1. **更新 `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`**
   - 更新 Section 3.2（Rigidity 預設值為 0.0）
   - 更新 Section 3.7（Params 預設值，`rigidity_default_when_missing: 0.0`）
   - 確認所有 V3 實作狀態標記為已完成

2. **更新 `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`**
   - 確認所有 V3 實作狀態標記為已完成
   - 更新實作狀態說明

3. **更新任務追蹤文件**
   - `docs/ops/TASK_RECORDS_SUMMARY.md`
   - `docs/ops/TASK_STATUS.md`
   - `memory/changes/CHANGELOG.md`
   - `memory/briefs/CURRENT.md`

**驗收標準**：
- 所有相關文件已更新
- 文件內容與實作一致

---

## 📋 執行順序建議

### 第一階段：解決 V4 追問包問題（必須先完成）

1. ✅ 問題 1：Rigidity 預設值統一為 0.0
2. ✅ 問題 2：建立 Domain Schema
3. ✅ 問題 3：更新 ADR_0005 標準差模式
4. ✅ 問題 4：建立世界級增強建議的實作規格（5 個文件）

### 第二階段：完成 P0-12 階段二-4

5. ✅ 分析 Legacy 規則與制度（如果找不到文件，標記為「待後續處理」）
6. ✅ 建立呈現規則文件（或標記為「待 Legacy 文件定位後處理」）

### 第三階段：Legacy Facet 遷移

7. ✅ 遷移 9 個 Legacy Facet 到 V3

### 第四階段：更新文件

8. ✅ 更新所有相關文件

---

## ✅ 驗收標準（總體）

### 必須完成（PRIORITY: HIGH）

1. ✅ Rigidity 預設值統一為 0.0（所有文件一致）
2. ✅ Domain Schema 已建立（`schemas/domain.schema.json`）
3. ✅ ADR_0005 已更新（包含標準差模式決策記錄）

### 建議完成（PRIORITY: MEDIUM）

4. ✅ 世界級增強建議的實作規格已建立（5 個文件）
5. ✅ P0-12 階段二-4 已完成（規則與制度提取，或標記為「待後續處理」）
6. ✅ Legacy Facet 已遷移（9 個 Facet 遷移到 V3）

### 收尾工作（PRIORITY: LOW）

7. ✅ 所有相關文件已更新
8. ✅ 任務追蹤文件已更新

---

## 📦 交付物

完成後應產出：
1. ✅ 更新的 `engine/score_facet.py`（Rigidity 預設值為 0.0）
2. ✅ 更新的 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`（Rigidity 預設值為 0.0）
3. ✅ 新建的 `schemas/domain.schema.json`
4. ✅ 更新的 `docs/adr/ADR_0005_vector_state_scoring_engine.md`（標準差模式決策記錄）
5. ✅ 新建的 5 個世界級增強建議規格文件
6. ✅ 新建的呈現規則文件（P0-12 階段二-4，或標記為「待後續處理」）
7. ✅ 更新的 9 個 Legacy Facet 配置（遷移到 V3）
8. ✅ 更新的所有相關文件

---

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION  
**執行者**：GPT / GEM / GEMINI（任務執行者）
