# 底層引擎全案掃描報告

**掃描日期**：2026-01-13  
**掃描範圍**：整個專案資料夾  
**掃描目標**：底層引擎相關內容

---

## 📋 一、什麼是底層引擎？

根據 `charter/CHARTER.md` 和 `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`：

**底層引擎（Core Engine）** = **「核心引擎可審計」的部分**

### 核心定義

**內核（Internal）**：
- 基於現代心理學的向量運算（CBT、Big Five、System Dynamics）
- 完整的數學模型和計算邏輯
- 可審計、可重跑、可驗證、可回溯

**外顯（External）**：
- 100% 封裝於「歲時農耕」與「陰陽五行」的象徵體系
- 使用者看到的是玄學敘事，不是數學計算

**鐵律（Iron Rule）**：
- 使用者介面絕不可洩露 `Score`, `Weight`, `Algorithm`, `Psychology`, `Diagnosis` 等術語

---

## 📦 二、底層引擎包含哪些東西？

### 2.1 核心運算邏輯（Calculation Logic）

**位置**：`engine/score_facet.py`
- ✅ 已實作：`weighted_sum`（Legacy V1/V2）
- ✅ 已實作：`vector_state_v3`（V3 新標準）
- ✅ 支援策略模式（根據 `scoring.model` 選擇）
- ✅ 包含：Normalize、Severity、Volatility、Rigidity 計算
- ✅ 包含：Debug Payload (`_meta`)

**相關規格**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示
- `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策

### 2.2 題目設計規範（Question Design）

**位置**：`domain/knowledge_base/question_design_guidelines.v1.0.md`
- 題目數量規範（6-10 題彈性，預設 8 題）
- 題目類型配比（Core State / Validation / Reaction / Resource）
- 權重基準（1.0 / 1.0 / 1.25 / 0.75）
- `exclude_from_volatility` 標記規則

**相關規格**：
- `specs/engine/core/questions/README.md`
- `docs/adr/ADR_0006_question_modality_scope_lock.md`

### 2.3 加權積分方式（Scoring Methods）

**已實作的模型**：
1. **`weighted_sum`**（Legacy）：
   - 簡單加權平均
   - 適用於 V1/V2 Facet

2. **`vector_state_v3`**（新標準）：
   - Raw Score（加權平均）
   - Volatility（Sample StdDev，排除 Validation/Resource 題）
   - Rigidity（三層模型：Locus × Subtype × Agency）
   - Final Score（`clamp(raw_score * (1 + rigidity * rigidity_weight), 0, 1)`）

**實作位置**：`engine/score_facet.py`

### 2.4 母題/題目模板（Question Templates）

**標準模板**：
- **OCTET_8**（預設）：`3 Core State + 2 Validation + 2 Reaction + 1 Resource`
- **DECET_10**（可選）：`3 Core State + 2 Validation + 3 Reaction + 2 Resource`

**實作位置**：
- Schema：`schemas/domain_manifest.schema.json`（`questionSet` 欄位）
- 範例：`domain/facets/*.scoring.v1.0.json`

### 2.5 跨域擴散引擎（Cascade Engine）

**位置**：`engine/cascade_calculator.py`
- ✅ 已實作：動態五行生剋計算
- ✅ 已實作：顯式覆寫表（`domain/cascade/cascade_overrides.v1.0.json`）
- ✅ 已實作：Anti-spam 規則（最多 3 條 warning）
- ✅ 已實作：詞彙治理（`engine/narrative_guard.py`）

**觸發條件**：`final_score > 0.80`

### 2.6 八大領域映射（Domain Map）

**位置**：
- 規格：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 0.3
- 配置：`domain/domains/bagua.domain_map.v1.0.json`

**8 個領域 + 中宮**：
1. 乾 (qian) - 金 - 自我/權威/方向
2. 坤 (kun) - 土 - 事業/資源/財務
3. 震 (zhen) - 木 - 行動/變動/焦慮
4. 巽 (xun) - 木 - 關係/溝通/社交
5. 坎 (kan) - 水 - 情緒/抑鬱/成癮
6. 離 (li) - 火 - 過勞/形象/認知
7. 艮 (gen) - 土 - 健康/家庭/阻滯
8. 兌 (dui) - 金 - 口舌/衝突/慾望
9. 中宮 (center) - NONE - 兜底路由

### 2.7 Schema 定義（Data Schema）

**位置**：`schemas/`
- ✅ `domain_manifest.schema.json` - Facet Manifest Schema（已更新，包含 `domainKey`, `questionSet`, `scoringModel`）
- ✅ `compiled_facet.schema.json` - Compiled Facet Schema（已更新，包含 `domainKey`, `questionSet`）
- ⚠️ `domain.schema.json` - Domain Schema（**缺少**，只有 JSON 範例）

### 2.8 整合系統（Integration Systems）

**P0-4.5 分流系統**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計
- 提供 `priors` 參數給引擎（`attribution_profile` 用於 Rigidity 計算）

**UI/Engine 契約**：
- `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - 前後端計算對齊規範

---

## 🔍 三、掃描到的內容清單

### 3.1 核心規格文件

1. ✅ `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格（579 行）
2. ✅ `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
3. ✅ `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示（工程定錨級）
4. ✅ `docs/adr/ADR_0005_vector_state_scoring_engine.md` - V3 引擎架構決策
5. ✅ `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - Domain 外置化決策
6. ✅ `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` - 最終憲法（GPT V4 處理後版本）

### 3.2 實作文件

1. ✅ `engine/score_facet.py` - 計分引擎實作（194 行，支援 weighted_sum 和 vector_state_v3）
2. ✅ `engine/cascade_calculator.py` - 跨域擴散引擎（77 行）
3. ✅ `engine/narrative_guard.py` - 詞彙治理（18 行）
4. ✅ `engine/collision_calculator.py` - 五行碰撞計算
5. ✅ `engine/root_element_mapper.py` - 本命元神映射
6. ✅ `engine/hexagram_deriver.py` - 六十四卦推導
7. ✅ `engine/compile_domain.py` - Domain 編譯工具

### 3.3 測試文件

1. ✅ `tests/test_v3_scoring.py` - V3 計分測試

### 3.4 題目設計文件

1. ✅ `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南（149 行）
2. ✅ `specs/engine/core/questions/README.md`

### 3.5 配置文件

1. ✅ `domain/domains/bagua.domain_map.v1.0.json` - 八大領域映射配置
2. ✅ `domain/cascade/cascade_overrides.v1.0.json` - Cascade 覆寫表範例
3. ✅ `schemas/domain_manifest.schema.json` - Facet Manifest Schema（已更新）
4. ✅ `schemas/compiled_facet.schema.json` - Compiled Facet Schema（已更新）
5. ✅ `domain/facets/*.scoring.v1.0.json` - 各 Facet 的計分配置（多個文件）

### 3.6 審核報告和追問包

1. ✅ `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_AUDIT.md` - V4 審核報告
2. ✅ `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_QUESTIONS.md` - V4 完整追問包
3. ✅ `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_QUESTIONS_COMPACT.md` - V4 精簡追問包

---

## 📊 四、目前正在進行的任務

### 任務 1：ENGINE_CORE_FINAL_INTEGRATION_EXECUTION（底層引擎最終整合執行）

**狀態**：🔄 **進行中（等待顧問團隊回饋）**  
**開始日期**：2026-01-12

**目標**：
- 達成「全人類、全年齡、全困擾、全解決策略、全連鎖反應」的終極目標
- 執行 7 個主要任務

**當前進度**：
- ✅ 任務包已建立並打包完成
- ✅ V4 審核完成並整合
- ✅ V4 實作已整合
- ⏳ **等待顧問團隊回饋**（追問包：4 個關鍵問題）

**關鍵問題**（4 個）：
1. ⭐⭐⭐ 缺失 Priors 的 Rigidity 預設值（應該是 0 還是 0.50？）
2. ⭐⭐ Domain Schema 定義（是否需要建立完整的 Domain Schema？）
3. ⭐⭐ ADR_0005 標準差模式更新（是否需要更新 ADR_0005？）
4. ⭐⭐ 世界級增強建議的實作細節（是否需要建立詳細的實作規格？）

**7 個主要任務**（待執行）：
1. 底層引擎內容整合（PRIORITY: HIGH）
2. V3 引擎實作（PRIORITY: HIGH）- ✅ **已完成**
3. 題庫擴充與分類（PRIORITY: HIGH）
4. P0-4.5 分流系統整合（PRIORITY: MEDIUM）
5. UI 整合（PRIORITY: MEDIUM）
6. 使用者背景資料收集系統（PRIORITY: MEDIUM）
7. 八大領域覆蓋（PRIORITY: HIGH）

---

### 任務 2：P0-12 科學運算引擎完善

**狀態**：🔄 **進行中（80% 完成）**  
**開始日期**：2026-01-11

**目標**：
- 整合所有資料中有關於現代科學（心理學、人類學、社會學等）的背景資料、學科資料、題型設計、分數計算、結果呈現

**當前進度**：
- ✅ 階段一：現代科學資料整合（100%）
- ✅ 階段二-1：資料提取與分析（100%）
- ✅ 階段二-2：內容映射與轉換（100%）
- ✅ 階段二-3：分層架構整合（100%）
- ⏳ **階段二-4**：規則與制度提取（待執行）

**待完成工作**：
- ⏳ 分析 `intervention_boundary_matrix` 的規則
- ⏳ 提取 `guidancePrinciples` 的邏輯
- ⏳ 分析 `buildGuidance.js` 的決策邏輯
- ⏳ 建立呈現規則文件

---

## 📝 五、底層引擎內容總覽

### 核心文件位置

| 類別 | 文件路徑 | 狀態 |
|------|----------|------|
| **規格** | `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` | ✅ 已更新 |
| **DIRECTIVE** | `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` | ✅ 已完成 |
| **DIRECTIVE** | `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` | ✅ 已完成 |
| **ADR** | `docs/adr/ADR_0005_vector_state_scoring_engine.md` | ✅ 已完成 |
| **實作** | `engine/score_facet.py` | ✅ V4 已整合 |
| **實作** | `engine/cascade_calculator.py` | ✅ V4 已整合 |
| **實作** | `engine/narrative_guard.py` | ✅ V4 已整合 |
| **測試** | `tests/test_v3_scoring.py` | ✅ V4 已整合 |
| **題目設計** | `domain/knowledge_base/question_design_guidelines.v1.0.md` | ✅ 已更新 |
| **Schema** | `schemas/domain_manifest.schema.json` | ✅ V4 已更新 |
| **Schema** | `schemas/compiled_facet.schema.json` | ✅ V4 已更新 |
| **Domain 配置** | `domain/domains/bagua.domain_map.v1.0.json` | ✅ V4 已整合 |
| **Cascade** | `domain/cascade/cascade_overrides.v1.0.json` | ✅ V4 已整合 |

### Facet 計分配置

**掃描到的 Facet**（`domain/facets/*.scoring.v1.0.json`）：
1. `stress_recovery.scoring.v1.0.json`（Legacy，使用 `weighted_sum`）
2. `burnout_syndrome.scoring.v1.0.json`（V4 新範例，使用 `vector_state_v3`）
3. `deep_depression.scoring.v1.0.json`（V4 新範例，使用 `vector_state_v3`）
4. 其他 Legacy Facet（`chronic_depletion`, `identity_diffusion`, `fear_based_stability`, `meaning_vacuum`, `suppressed_needs`, `chronic_alertness`, `hyper_responsibility`, `loss_of_agency`）

---

## ⚠️ 六、發現的問題

### 問題 1：Domain Schema 定義缺失

**問題**：
- 只有 JSON 範例（`domain/domains/bagua.domain_map.v1.0.json`）
- 沒有正式的 Schema 定義（`schemas/domain.schema.json`）

**影響**：
- 無法驗證 Domain 配置文件的結構
- 不符合 SSOT 原則

**狀態**：⏳ 待裁示（追問包問題 2）

---

### 問題 2：Rigidity 預設值不一致

**問題**：
- DIRECTIVE REV.B：`return 0.0`
- CONSTITUTION Section 7.2：`rigidity_default_when_missing = 0.50`
- engine/score_facet.py：`default_when_missing = 0.5`
- GPT V4 聲稱與 REV.B 一致，但實際檢查結果不一致

**影響**：
- 計算結果可能不一致
- 需要確認正確的預設值

**狀態**：⏳ 待裁示（追問包問題 1，PRIORITY: HIGH）

---

### 問題 3：ADR_0005 標準差模式未更新

**問題**：
- CONSTITUTION 已明確寫入 sample stddev（SSOT）
- GPT V4 聲稱已寫入 ADR_0005
- 需要確認 ADR_0005 是否真的已更新

**影響**：
- 決策記錄不完整

**狀態**：⏳ 待裁示（追問包問題 3）

---

### 問題 4：Legacy Facet 尚未遷移

**問題**：
- 多個 Legacy Facet 仍使用 `weighted_sum` 模型
- 尚未遷移到 `vector_state_v3`

**影響**：
- 無法使用新的 V3 功能（Volatility、Rigidity、Cascade）

**狀態**：⏳ 待執行（任務 3：題庫擴充與分類）

---

## ✅ 七、已完成的部分

1. ✅ **V4 引擎實作**：`engine/score_facet.py`（支援兩種模型）
2. ✅ **Cascade 引擎**：`engine/cascade_calculator.py`
3. ✅ **詞彙治理**：`engine/narrative_guard.py`
4. ✅ **測試**：`tests/test_v3_scoring.py`
5. ✅ **Schema 更新**：`domain_manifest.schema.json`、`compiled_facet.schema.json`
6. ✅ **Domain 配置**：`bagua.domain_map.v1.0.json`
7. ✅ **Cascade 覆寫表**：`cascade_overrides.v1.0.json`
8. ✅ **規格文件**：`ENGINE_CORE_LOGIC_MASTER_V3.md`、DIRECTIVE REV.B/C+、ADR_0005
9. ✅ **審核報告和追問包**：V2/V3/V4 審核報告和追問包

---

## 📋 八、總結

### 底層引擎定義

**底層引擎** = 所有關於「題目設計、計算分數、加權積分、母題/模板」的核心邏輯和實作

### 包含的內容

1. **運算邏輯**：計分公式、正規化、Volatility、Rigidity 計算
2. **題目設計**：題目數量、類型配比、權重基準、模板定義
3. **加權方式**：weighted_sum（Legacy）、vector_state_v3（新標準）
4. **母題/模板**：OCTET_8（預設）、DECET_10（可選）
5. **跨域擴散**：五行生剋、Cascade 警告、Anti-spam
6. **八大領域**：Domain 映射、5-Element 屬性、路由邏輯
7. **Schema 定義**：資料結構驗證、版本控制
8. **整合系統**：P0-4.5 分流、UI/Engine 契約

### 目前正在進行的任務

1. **ENGINE_CORE_FINAL_INTEGRATION_EXECUTION**（底層引擎最終整合執行）
   - 狀態：等待顧問團隊回饋（4 個關鍵問題）
   - 進度：V4 審核和整合已完成，等待裁示

2. **P0-12 科學運算引擎完善**
   - 狀態：80% 完成
   - 進度：階段二-4 待執行

---

**掃描者**：Cursor（總指揮）  
**掃描日期**：2026-01-13
