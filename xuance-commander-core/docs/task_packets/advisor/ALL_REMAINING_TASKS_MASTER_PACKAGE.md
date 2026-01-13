# 所有剩餘任務主包（Master Package）

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION  
**目標**：完成所有剩餘任務，包含完整背景資料和執行指南

---

## 📋 快速總覽

### 任務分類與執行對象

| 任務包 | 執行對象 | 難易度 | 狀態 |
|--------|----------|--------|------|
| **任務包 1** | Cursor（直接解決） | ⭐ 簡單 | ✅ **已完成** |
| **任務包 2** | GPT / GEMINI（任務執行者） | ⭐⭐⭐ 中等 | ⏳ **等待執行** |
| **任務包 3** | GPT / GEMINI（任務執行者） | ⭐⭐⭐ 中等 | ⏳ **等待執行（受阻）** |
| **任務包 4** | Gemini（顧問） | ⭐⭐⭐⭐ 困難 | ⏳ **等待裁示** |
| **任務包 5** | Gemini（顧問） | ⭐⭐⭐⭐ 困難 | ⏳ **等待裁示** |

---

## ✅ 任務包 1：Cursor 直接解決包（已完成）

**狀態**：✅ **已完成**

**完成項目**：
1. ✅ Rigidity 預設值修正（0.5 → 0.0）
2. ✅ ADR_0005 標準差模式更新
3. ✅ CONSTITUTION 文件更新（Rigidity 預設值）
4. ⏳ CONSTITUTION 文件整合（通過項目）— 進行中
5. ⏳ 其他相關文件更新 — 待完成

**詳細內容**：見 `docs/task_packets/advisor/ALL_REMAINING_TASKS_EXECUTION_PLAN.md` Section "任務包 1"

---

## 📦 任務包 2：Legacy Facet 遷移包

**執行對象**：GPT / GEMINI（任務執行者）  
**狀態**：⏳ **等待執行**  
**優先級**：MEDIUM

### 任務目標

將 9 個 Legacy Facet 從 `weighted_sum` 遷移到 `vector_state_v3`，並確保所有 Facet 符合 V3 規範。

### 待遷移的 Facet（9 個）

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

### 完整背景資料

#### V3 引擎核心規格

**檔案位置**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - V3 引擎核心規格（579 行）
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示
- `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策

**核心概念**：
- **Raw Score**：加權平均（與 weighted_sum 相同）
- **Volatility**：Sample StdDev（排除 Validation/Resource 題）
- **Rigidity**：三層模型（Locus × Subtype × Agency），預設值為 **0.0**
- **Final Score**：`clamp(raw_score * (1 + rigidity * rigidity_weight), 0, 1)`

#### V3 Facet 範例

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

#### 題目設計指南

**檔案位置**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南（149 行）

**關鍵規則**：
- 題目數量：6-10 題彈性，預設 8 題
- 題目類型配比（OCTET_8）：
  - Core State：3 題（權重 1.0，`exclude_from_volatility: false`）
  - Validation：2 題（權重 1.0，`exclude_from_volatility: true`）
  - Reaction：2 題（權重 1.25，`exclude_from_volatility: false`）
  - Resource：1 題（權重 0.75，`exclude_from_volatility: true`）

#### Domain 映射

**檔案位置**：
- `domain/domains/bagua.domain_map.v1.0.json` - Domain 映射配置

**需要為每個 Facet 指定**：
- `domainKey`：八大領域之一（qian, kun, zhen, xun, kan, li, gen, dui, center）
- `questionSet`：題目集合類型（OCTET_8 或 DECET_10）

**Domain 映射建議**：
- `stress_recovery` → `kan`（坎，水，情緒/恢復）
- `chronic_depletion` → `li`（離，火，過勞/耗竭）
- `identity_diffusion` → `qian`（乾，金，自我/身份）
- `fear_based_stability` → `gen`（艮，土，穩定/阻滯）
- `meaning_vacuum` → `kun`（坤，土，意義/空虛）
- `suppressed_needs` → `xun`（巽，木，關係/需求）
- `chronic_alertness` → `zhen`（震，木，行動/焦慮）
- `hyper_responsibility` → `kun`（坤，土，責任/負擔）
- `loss_of_agency` → `qian`（乾，金，自我/控制）

### 需要執行的行動

**步驟 1：檢查每個 Facet**
- 讀取每個 Facet 的 `scoring.v1.0.json`
- 確認題目數量（是否符合 6-10 題規範）
- 確認是否有 `exclude_from_volatility` 標記
- 確認是否有 `domainKey` 和 `questionSet`

**步驟 2：更新 Facet 配置**
- 更新 `scoring.model` 為 `"vector_state_v3"`
- 更新 `scoring.params` 包含 V3 參數（見範例）
- 確保所有題目都有 `exclude_from_volatility` 標記
- 更新 `domainKey` 和 `questionSet`

**步驟 3：題目擴充（僅限 2 個 Facet）**
- `stress_recovery`：從 2 題擴充到 8 題
- `fear_based_stability`：從 3 題擴充到 8 題
- 需要參考 `domain/knowledge_base/question_design_guidelines.v1.0.md`
- 需要符合「去問卷化」原則和語境純粹性要求

**步驟 4：更新 Manifest**
- 檢查每個 Facet 的 manifest 文件
- 確保 manifest 包含 `domainKey` 和 `questionSet`
- 確保 manifest 的 `scoringModel` 為 `"vector_state_v3"`

**步驟 5：驗證遷移**
- 執行編譯流程
- 驗證編譯後的 Facet 可以正常運作
- 驗證計算結果的合理性

### 驗收標準

- ✅ 所有 9 個 Legacy Facet 已遷移到 `vector_state_v3`
- ✅ 所有 Facet 配置符合 V3 規範
- ✅ 2 個 Facet 題數已擴充到 8 題
- ✅ 所有 Facet 都有 `domainKey` 和 `questionSet`
- ✅ 編譯流程通過
- ✅ 計算結果合理

**詳細內容**：見 `docs/task_packets/advisor/TASK_PACKAGE_2_LEGACY_FACET_MIGRATION.md`

---

## 📦 任務包 3：P0-12 階段二-4 規則提取包

**執行對象**：GPT / GEMINI（任務執行者）  
**狀態**：⏳ **等待執行（受阻）**  
**優先級**：MEDIUM

### 任務目標

分析 Legacy 系統中的規則與制度，提取並整合到現有系統。

### ⚠️ 重要發現

**Legacy 檔案未找到**：
- Legacy 資料夾 `docs/legacy/115_1_3_my-first-app_failed/` 不存在
- 無法找到 `intervention_boundary_matrix`, `guidancePrinciples`, `buildGuidance.js` 檔案

### 需要執行的行動

**步驟 1：確認 Legacy 檔案位置**
- 搜尋整個專案，確認 Legacy 檔案是否存在
- 如果找不到，標記為「無法定位，待後續處理」

**步驟 2：分析規則邏輯**（如果找到檔案）
- 分析 `intervention_boundary_matrix` 的規則結構
- 提取 `guidancePrinciples` 的邏輯
- 分析 `buildGuidance.js` 的決策邏輯

**步驟 3：建立呈現規則文件**（如果找到檔案）
- 建立 `domain/knowledge_base/presentation_rules.v1.0.md`
- 整合規則邏輯到現有系統
- 確保規則符合現有 Schema 和架構

### 背景資料

**現有系統架構**：
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` - 現有系統架構
- `specs/integration/ui_engine/P0-12_LEGACY_INTEGRATION_TASK_PACKET.md` - Legacy 整合任務包
- `docs/governance/LEGACY_REFERENCE_RULES.md` - Legacy 參考規則

**可能位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

### 驗收標準

- ✅ Legacy 檔案位置已確認（或標記為「無法定位」）
- ✅ 如果找到檔案，規則邏輯已分析
- ✅ 如果找到檔案，呈現規則文件已建立
- ✅ 如果找不到檔案，已標記為「無法定位，待後續處理」

**詳細內容**：見 `docs/task_packets/advisor/TASK_PACKAGE_3_P0-12_PHASE2-4_RULES_EXTRACTION.md`

---

## 📦 任務包 4：五行「洩」關係決策包

**執行對象**：Gemini（顧問）  
**狀態**：⏳ **等待裁示**  
**優先級**：MEDIUM

### 任務目標

評估是否需要引入「洩（Exhaustion）」路徑，擴充為雙向傳導。

### 問題描述

**現狀**：
- 現有實作只有「剋（Overcomes）」路徑（`engine/cascade_calculator.py`）
- Gemini 方案引入「洩（Exhaustion）」路徑，提供完整的 5-Element 全循環矩陣
- 需要決定是否實作「洩」關係

### 選項分析

- **選項 A**：採納「洩」路徑，建立 ADR，更新實作
- **選項 B**：暫時不採納，先驗證「剋」路徑是否足夠
- **選項 C**：採納但簡化（例如：只在特定條件下觸發「洩」路徑）

### 完整背景資料

**現有 Cascade 實作**：
- `engine/cascade_calculator.py` - Cascade 引擎實作（77 行）
- `domain/cascade/cascade_overrides.v1.0.json` - Cascade 覆寫表

**現有「剋」關係**：
```python
OVERCOMES = {
    "WOOD": "EARTH",
    "EARTH": "WATER",
    "WATER": "FIRE",
    "FIRE": "METAL",
    "METAL": "WOOD",
}
```

**五行知識庫**：
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行知識庫
- 現有關係定義：`generates`（生）、`controlled_by`（被剋）、`controls`（剋）、`generated_by`（被生）
- **注意**：知識庫中沒有「洩」關係的定義

**CONSTITUTION 規格**：
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` Section 4.2：跨域擴散引擎
- 明確提到「動態計算（五行生剋）」，但只有「剋」關係的實作

**Gemini 追問包**：
- `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md` - Gemini 追問包
- 追問 1：五行全循環矩陣（剋/洩雙向傳導）

### 驗收標準

- ✅ 決策已做出（選項 A/B/C）
- ✅ 如果採用選項 A 或 C，ADR 已建立，實作已更新
- ✅ 如果採用選項 B，決策已記錄

**詳細內容**：見 `docs/task_packets/advisor/TASK_PACKAGE_4_WUXING_EXHAUSTION_DECISION.md`

---

## 📦 任務包 5：角色原型參數矩陣決策包

**執行對象**：Gemini（顧問）  
**狀態**：⏳ **等待裁示**  
**優先級**：MEDIUM

### 任務目標

評估是否需要引入完整的角色原型參數矩陣。

### 問題描述

**現狀**：
- CONSTITUTION V4 Section 5.1 提到「Role Archetype（可選或弱必填）：用於調整 `volatility_thresholds`」
- 但沒有具體的角色定義和參數矩陣
- Gemini 方案提供完整的 4 個角色原型（開拓者、守成者、謀略者、工匠）和參數矩陣

### 選項分析

- **選項 A**：採納 4 個角色原型，建立 ADR，更新實作
- **選項 B**：暫時不採納，先驗證是否需要角色原型
- **選項 C**：採納但簡化（例如：只調整 `volatility_thresholds`，不調整 `rigidity_weight`）

### 完整背景資料

**CONSTITUTION V4 規格**：
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` Section 5.1：Role Archetype

**V3 引擎實作**：
- `engine/score_facet.py` - V3 引擎實作
- 現有參數：`volatility_thresholds: [0.15, 0.35]`（預設）、`rigidity_weight: 0.10`（預設）
- **注意**：現有實作沒有角色參數矩陣

**UI 整合規範**：
- `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - UI 整合規範
- **注意**：現有設計沒有角色選擇器

**Gemini 追問包**：
- `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md` - Gemini 追問包
- 追問 2：角色原型參數矩陣

### 驗收標準

- ✅ 決策已做出（選項 A/B/C）
- ✅ 如果採用選項 A 或 C，ADR 已建立，角色原型已定義，參數矩陣已建立，引擎實作已更新
- ✅ 如果採用選項 B，決策已記錄

**詳細內容**：見 `docs/task_packets/advisor/TASK_PACKAGE_5_ROLE_ARCHETYPE_DECISION.md`

---

## 📋 執行順序建議

### 第一階段：Cursor 直接解決（已完成）

1. ✅ 任務包 1：Cursor 直接解決包
   - 預估時間：30 分鐘
   - 狀態：✅ **已完成**

### 第二階段：任務執行者批量處理（等待執行）

2. ⏳ 任務包 2：Legacy Facet 遷移包
   - 預估時間：2-3 小時
   - 狀態：⏳ **等待執行**

3. ⏳ 任務包 3：P0-12 階段二-4 規則提取包
   - 預估時間：1-2 小時（如果找到 Legacy 檔案）
   - 狀態：⏳ **等待執行（受阻）**

### 第三階段：顧問團隊專業評估（等待裁示）

4. ⏳ 任務包 4：五行「洩」關係決策包
   - 預估時間：等待裁示後實作
   - 狀態：⏳ **等待裁示**

5. ⏳ 任務包 5：角色原型參數矩陣決策包
   - 預估時間：等待裁示後實作
   - 狀態：⏳ **等待裁示**

---

## ✅ 驗收標準（總體）

### 必須完成（PRIORITY: HIGH）

1. ✅ Rigidity 預設值統一為 0.0（所有文件一致）— **已完成**
2. ✅ ADR_0005 已更新（包含標準差模式決策記錄）— **已完成**
3. ✅ CONSTITUTION 文件已更新（Rigidity 預設值）— **已完成**

### 建議完成（PRIORITY: MEDIUM）

4. ⏳ Legacy Facet 已遷移（9 個 Facet 遷移到 V3）
5. ⏳ P0-12 階段二-4 已完成（規則與制度提取，或標記為「待後續處理」）

### 等待裁示（PRIORITY: MEDIUM）

6. ⏳ 五行「洩」關係決策已做出
7. ⏳ 角色原型參數矩陣決策已做出

---

## 📦 交付物清單

### 已完成

1. ✅ 更新的 `engine/score_facet.py`（Rigidity 預設值為 0.0）
2. ✅ 更新的 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`（Rigidity 預設值為 0.0）
3. ✅ 更新的 `docs/adr/ADR_0005_vector_state_scoring_engine.md`（標準差模式決策記錄）
4. ✅ 建立的執行計劃和任務包文件

### 待完成

5. ⏳ 更新的 9 個 Legacy Facet 配置（遷移到 V3）
6. ⏳ 新建的呈現規則文件（P0-12 階段二-4，或標記為「待後續處理」）
7. ⏳ 決策報告（任務包 4 和 5）

---

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION  
**執行者**：Cursor（任務包 1，已完成）+ GPT/GEMINI（任務包 2-3）+ Gemini（任務包 4-5）
