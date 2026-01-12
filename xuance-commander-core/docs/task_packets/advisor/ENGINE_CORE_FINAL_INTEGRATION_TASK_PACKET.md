# 底層引擎最終整合任務包（顧問群完整背景資料）

**任務編號**：ENGINE-CORE-FINAL-INTEGRATION-001  
**建立日期**：2026-01-12  
**狀態**：READY_FOR_ADVISOR_CONSULTATION  
**目標**：基於最終版本，與顧問團隊進行最終整合討論，達成「全人類、全年齡、全困擾、全解決策略、全連鎖反應」的終極目標

---

## 📋 任務概述

### 任務背景

經過多輪整合和顧問團隊交互修改，底層引擎的核心規格已經達到「工程定錨級」水準：
- ✅ ENGINE_CORE_LOGIC_MASTER_V3.md - 完整規格
- ✅ ADR_0005_vector_state_scoring_engine.md - 架構決策
- ✅ DIRECTIVE-2026-01-12-02-REV.C+.md - 最終技術裁示（工程定錨級）

現在需要：
1. **全面整合**：確保所有底層引擎相關內容都在統一位置
2. **差距分析**：分析距離終極目標還差多少項目
3. **任務計劃**：建立最完整、最詳細的任務計劃包
4. **顧問討論**：基於最終版本，與顧問團隊進行最終整合討論

### 終極目標

根據 `charter/CHARTER.md` 和專案目標：

> **對全世界所有年齡所有人都可以非常準確**，準到發毛的那一種感覺  
> **基於準確的分析結果，提出有效的解決方案以及未解決的連鎖反應**  
> **需要龐大的資料庫和強大的運算能力**

---

## 🎯 第一部分：專案核心目標與限制

### 1.1 專案憲章（CHARTER）

**SSOT**：`charter/CHARTER.md`

#### 最高目標
- 打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- 核心策略：核心引擎可審計；外層以東方命理敘事呈現；對使用者提供可執行建議與風險鏈

#### 不可觸碰限制
1. 主進度/主目標以文本為準，不以對話上下文為準
2. 未寫入文本的結論視為不存在
3. 任何結構性變更（schema/domain/governance/charter）必須 ADR + 使用者批准
4. 指揮官必須白話回報、短句直白

#### 成功定義
- 本專案在使用者的認知與體驗中，是一個**完整的玄學系統**
- 使用者只會、也只需要感知到：這是一個玄學網站、這是一套命理/神秘系統、這個系統非常準、這個系統對自己很有幫助
- 使用者**不需要、也不應該**被告知：任何心理學名詞、任何現代科學背景、任何「其實這不是玄學」的說明

---

### 1.2 世界級水準與國際市場（CN/EN）

**SSOT**：`charter/CHARTER.md`

- 本產品必須做到世界級水準（質感、互動、敘事、穩定、可維護）
- 本產品必須可切換成英文版（CN/EN），可直接接軌國際市場
- 不管中文或英文，使用者都要普遍覺得：很準、看得懂、真的有幫助
- 英文版不得只是翻譯；英文敘事要像原生英文玄學系統一樣自然

---

## 🔧 第二部分：當前底層引擎狀態總覽

### 2.1 已整合的核心規格文件

**位置**：`specs/engine/core/`

1. ✅ **ENGINE_CORE_LOGIC_MASTER_V3.md** - 引擎核心邏輯規格（V3.0）
   - 核心憲章、數據注入、題目系統、運算引擎、風險鏈、結果呈現、詞彙治理
   - 狀態：ACTIVE · REFERENCE · EDITABLE

2. ✅ **DIRECTIVE-2026-01-12-02-REV.C+.md** - 最終技術裁示（工程定錨級）
   - Schema 擴充、驗證題定義、Volatility 排除規則
   - 狀態：EXECUTABLE / SCHEMA-LOCKED / NO-IMPLICIT-LOGIC

3. ✅ **ADR_0005_vector_state_scoring_engine.md** - 架構決策文件
   - 運算模型升級策略、風險鏈結構整合
   - 狀態：Accepted (Most details resolved)

---

### 2.2 已整合的實作文件

**位置**：`engine/`

1. ✅ **score_facet.py** - 分數計算引擎（當前只支援 `weighted_sum`，需升級到 V3）
2. ✅ **compile_domain.py** - 領域編譯邏輯
3. ✅ **hexagram_deriver.py** - 卦象推導邏輯
4. ✅ **collision_calculator.py** - 五行碰撞計算
5. ✅ **root_element_mapper.py** - 根元素映射

---

### 2.3 已整合的配置文件

**位置**：`domain/`

1. ✅ **facets/*.scoring.v1.0.json** - 9 個 Facet 的評分配置
2. ✅ **questions/*.questions.v1.0.json** - 14 個 Facet 的題目定義
3. ✅ **compiled/*.compiled.v1.0.json** - 編譯後的 Facet
4. ✅ **manifests/*.v1.0.json** - Facet 清單

---

### 2.4 已整合的知識庫文件

**位置**：`domain/knowledge_base/`

1. ✅ **question_design_guidelines.v1.0.md** - 題目設計指南
2. ✅ **result_presentation_design.v1.0.md** - 結果呈現設計
3. ✅ **vocabulary_metaphysical.v1.0.json** - 玄學詞彙白名單
4. ✅ **forbidden_terms.v1.0.json** - 全域禁用詞表
5. ✅ **presentation_guidelines.v1.0.md** - 呈現用語規範
6. ✅ **ai_narrative_spec.v1.0.md** - AI 敘事生成規範

---

### 2.5 部分散落的內容（需要整合或對齊）

**位置**：`prototype/`, `ui/src/`

1. ⚠️ **prototype/app.js** - 前端計算邏輯（`sumScore` 函數）
   - 需要確保與後端 `score_facet.py` 一致
   - 建議：前端計算僅作為預覽，後端計算為權威來源

2. ⚠️ **ui/src/adapters/facetAdapter.ts** - UI 適配層
   - 包含題目適配邏輯（`adaptProjection`）
   - 需要確保與底層引擎規格一致

3. ⚠️ **ui/src/engine/risk/** - UI 風險引擎
   - 需要確保與底層風險鏈規格一致

4. ⚠️ **ui/src/engine/theme/** - UI 主題引擎
   - 需要確保與底層主題規格一致

---

## 🔍 第三部分：全面整合分析結果

### 3.1 內容分佈總覽

經過全面搜尋，底層引擎相關內容主要分佈在：

| 類別 | 已整合位置 | 散落位置 | 狀態 |
|------|-----------|---------|------|
| **題目** | `domain/questions/` | `prototype/app.js`, `ui/src/adapters/` | ✅ 核心已整合，前端邏輯需對齊 |
| **計算分數** | `engine/score_facet.py` | `prototype/app.js` | ⚠️ 需確保前後端一致 |
| **加權積分** | `domain/facets/*.scoring.v1.0.json` | `prototype/app.js` | ⚠️ 需確保前後端一致 |
| **母題/模板** | `domain/knowledge_base/` | `docs/domain/advisory/R2/` | ✅ 核心已整合，Facet 特定保持現狀 |
| **運算邏輯** | `specs/engine/core/` | - | ✅ 已整合 |
| **實作邏輯** | `engine/*.py` | - | ✅ 已整合 |

---

### 3.2 整合建議

#### 建議 1：建立底層引擎統一資料夾結構

**目標位置**：`specs/engine/core/`

**建議結構**：
```
specs/engine/core/
├── ENGINE_CORE_LOGIC_MASTER_V3.md          # 主規格文件（已有）
├── calculation/
│   ├── README.md                           # 計算邏輯總覽（需更新）
│   ├── scoring_models.md                   # 評分模型規格（需新增）
│   └── volatility_rigidity.md              # Volatility/Rigidity 規格（需新增）
├── questions/
│   ├── README.md                           # 題目設計總覽（需更新）
│   ├── question_types.md                   # 題目類型規格（需新增）
│   └── validation_questions.md             # 驗證題規格（需新增）
└── integration/
    ├── priors_integration.md                # Priors 整合規格（需新增）
    └── ui_integration.md                    # UI 整合規格（需新增）
```

#### 建議 2：建立前後端計算對齊文件

**目標位置**：`specs/integration/ui_engine/`

**建議文件**：
- `FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - 前後端計算對齊規範

---

## 📊 第四部分：距離終極目標的差距分析

### 4.1 差距總覽

| 差距類別 | 優先級 | 差距程度 | 影響 |
|---------|--------|---------|------|
| **題庫豐富度** | HIGH | 大 | 無法覆蓋「全人類、全年齡、全困擾」 |
| **八大領域覆蓋** | HIGH | 大 | 只有 2/8 領域有 Facet |
| **V3 引擎實作** | HIGH | 中 | 規格已定，但實作未完成 |
| **使用者背景資料收集** | MEDIUM | 中 | 系統設計不完整 |
| **P0-4.5 分流系統整合** | MEDIUM | 中 | 設計完成，但整合未完成 |
| **UI 整合** | MEDIUM | 中 | 架構完成，但整合未完成 |
| **計算模型完整性** | MEDIUM | 小 | 規格完整，實作待完成 |

---

### 4.2 詳細差距分析

#### 差距 1：題庫豐富度（Gap: HIGH）

**現狀**：
- 只有 14 個 Facet 的題目定義
- 每個 Facet 只有 2-3 題（MVP 範例）
- 缺少完整的題目分類和組織

**差距**：
- ❌ 缺少「全人類、全年齡、全困擾」的題庫覆蓋
- ❌ 缺少題目分類系統（Core State 30%, Validation 20%, Reaction 30%, Resources 20%）
- ❌ 缺少題目難度分級
- ❌ 缺少題目適配不同年齡/文化背景的策略

**需要**：
- 建立完整的題庫分類系統
- 擴充每個 Facet 的題目數量（從 2-3 題擴充到 6-10 題）
- 建立題目適配策略（年齡、文化、語言）

**相關文件**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2.2
- `domain/knowledge_base/question_design_guidelines.v1.0.md`

---

#### 差距 2：八大領域覆蓋（Gap: HIGH）

**現狀**：
- ✅ P0-4.5 分流系統設計了 Stage 1（八卦定方位）
- ✅ 定義了 8 個領域（八卦）+ 中宮/混沌
- ⚠️ 但只有 2 個 Facet 已實作（`income_expansion_pressure`, `relationship_imbalance`）

**差距**：
- ❌ 缺少其他 6 個領域的 Facet 實作
- ❌ 缺少領域到 Facet 的路由規則實作
- ❌ 缺少「中宮/混沌」的處理邏輯

**需要**：
- 識別其他 6 個領域的核心 Facet
- 為每個領域建立至少 1 個 Facet
- 實作領域到 Facet 的路由規則
- 實作「中宮/混沌」的處理邏輯

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `roadmap/ROADMAP.md`

---

#### 差距 3：V3 引擎實作（Gap: HIGH）

**現狀**：
- ✅ 已定義 V3 向量狀態評估模型
- ✅ 已定義 Volatility Index 和 Rigidity Index
- ⚠️ 但實作尚未完成（`engine/score_facet.py` 仍只支援 `weighted_sum`）

**差距**：
- ❌ `engine/score_facet.py` 尚未實作 V3 模型
- ❌ 缺少 Volatility Index 的實作
- ❌ 缺少 Rigidity Index 的實作
- ❌ 缺少 Debug Payload 的實作

**需要**：
- 升級 `engine/score_facet.py` 支援策略模式
- 實作 `run_v3_logic` 函數（包含 Volatility, Rigidity 計算）
- 實作 Debug Payload 輸出
- 建立單元測試

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`
- `engine/score_facet.py`

---

#### 差距 4：P0-4.5 分流系統整合（Gap: MEDIUM）

**現狀**：
- ✅ P0-4.5 分流系統設計已完成
- ✅ Stage 1-4 的輸出格式已定義
- ⚠️ 但與 Facet 計算的整合尚未完成

**差距**：
- ❌ Facet 計算尚未接收 Priors（來自 P0-4.5）
- ❌ 動態權重調整尚未實作
- ❌ 跨域擴散（Cross-Domain Cascade）尚未實作

**需要**：
- 實作 Priors 接收機制
- 實作動態權重調整
- 實作跨域擴散邏輯
- 建立整合測試

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1

---

#### 差距 5：UI 整合完整性（Gap: MEDIUM）

**現狀**：
- ✅ P0-5 UI 架構設計已完成
- ✅ Layer 0-6 的結構已定義
- ⚠️ 但與底層引擎的整合尚未完成

**差距**：
- ❌ UI 尚未整合 P0-4.5 分流系統（Stage 1-4）
- ❌ UI 尚未整合 V3 計算結果（Volatility, Rigidity）
- ❌ UI 尚未整合風險鏈三層結構（Level 1/2/3）

**需要**：
- 整合 P0-4.5 分流系統到 UI（Stage 1-4 的互動設計）
- 整合 V3 計算結果到 UI（不暴露技術細節）
- 整合風險鏈三層結構到 UI（不與 L1-L4 混淆）

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `domain/knowledge_base/result_presentation_design.v1.0.md`

---

#### 差距 6：使用者背景資料收集（Gap: MEDIUM）

**現狀**：
- ✅ P0-5 UI 架構中定義了 Layer 1（使用者錨定層）
- ⚠️ 但背景資料收集系統尚未完整設計

**差距**：
- ❌ 缺少完整的背景資料收集策略
- ❌ 缺少背景資料與計算邏輯的整合
- ❌ 缺少背景資料的儲存和管理機制
- ❌ 缺少背景資料的隱私保護機制

**需要**：
- 設計完整的背景資料收集系統
- 整合背景資料到計算邏輯
- 建立背景資料的儲存和管理機制
- 建立背景資料的隱私保護機制

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1

---

#### 差距 7：計算模型完整性（Gap: MEDIUM）

**現狀**：
- ✅ 已定義 V3 向量狀態評估模型
- ✅ 已定義 Volatility Index 和 Rigidity Index
- ✅ 已定義 Debug Payload 結構
- ⚠️ 但實作尚未完成

**差距**：
- ❌ 缺少 V3 模型的完整實作
- ❌ 缺少前後端計算對齊機制
- ❌ 缺少計算結果的驗證機制

**需要**：
- 完成 V3 模型的實作
- 建立前後端計算對齊機制
- 建立計算結果的驗證機制

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`
- `engine/score_facet.py`

---

## 📝 第五部分：完整任務計劃

### 任務 1：底層引擎內容整合（PRIORITY: HIGH）

**目標**：確保所有底層引擎相關內容都在統一位置

**子任務**：
1. ✅ 確認 `specs/engine/core/` 為底層引擎規格的 SSOT
2. ⏳ 更新 `specs/engine/core/calculation/README.md` - 補充 V3 模型規格
3. ⏳ 更新 `specs/engine/core/questions/README.md` - 補充題目類型規格
4. ⏳ 建立 `specs/engine/core/integration/priors_integration.md` - Priors 整合規格
5. ⏳ 建立 `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - 前後端計算對齊

**交付物**：
- 更新後的規格文件
- 前後端計算對齊文件

**預估時間**：2-3 天

---

### 任務 2：V3 引擎實作（PRIORITY: HIGH）

**目標**：實作 V3 向量狀態評估模型

**子任務**：
1. ⏳ 升級 `engine/score_facet.py` 支援策略模式
2. ⏳ 實作 `run_v3_logic` 函數（包含 Volatility, Rigidity 計算）
3. ⏳ 實作 Debug Payload 輸出
4. ⏳ 建立單元測試
5. ⏳ 建立整合測試

**交付物**：
- 升級後的 `engine/score_facet.py`
- 單元測試套件
- 整合測試套件

**預估時間**：5-7 天

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`
- `engine/score_facet.py`

---

### 任務 3：題庫擴充與分類（PRIORITY: HIGH）

**目標**：建立完整的題庫分類系統，擴充題目數量

**子任務**：
1. ⏳ 建立題庫分類系統（Core State 30%, Validation 20%, Reaction 30%, Resources 20%）
2. ⏳ 為每個 Facet 擴充題目（從 2-3 題擴充到 6-10 題）
3. ⏳ 建立題目適配策略（年齡、文化、語言）
4. ⏳ 建立題目難度分級
5. ⏳ 建立題目品質驗收標準

**交付物**：
- 題庫分類系統文件
- 擴充後的題目定義（14 個 Facet × 6-10 題 = 84-140 題）
- 題目適配策略文件
- 題目難度分級文件

**預估時間**：10-14 天（需要顧問團隊協助）

**相關文件**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2.2

---

### 任務 4：P0-4.5 分流系統整合（PRIORITY: MEDIUM）

**目標**：整合 P0-4.5 分流系統到底層引擎

**子任務**：
1. ⏳ 實作 Priors 接收機制（在 `engine/score_facet.py` 中）
2. ⏳ 實作動態權重調整（根據 `priors` 調整題目權重）
3. ⏳ 實作跨域擴散邏輯（一個 Facet 高風險 → 觸發其他 Facet 警示）
4. ⏳ 建立整合測試（測試 Priors → Facet 計算的完整流程）

**交付物**：
- 整合後的計算引擎
- 整合測試套件
- Priors 整合規格文件

**預估時間**：5-7 天

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1

---

### 任務 5：UI 整合（PRIORITY: MEDIUM）

**目標**：整合底層引擎到 UI

**子任務**：
1. ⏳ 整合 P0-4.5 分流系統到 UI（Stage 1-4 的互動設計）
   - Stage 1：八卦轉輪/八門卡片
   - Stage 2：符號雲/物象群
   - Stage 3：萬象羅盤/星盤
   - Stage 4：綜合斷語
2. ⏳ 整合 V3 計算結果到 UI（Volatility, Rigidity，不暴露技術細節）
3. ⏳ 整合風險鏈三層結構到 UI（Level 1/2/3，不與 L1-L4 混淆）
4. ⏳ 確保前端計算與後端對齊（前端僅預覽，後端為權威）

**交付物**：
- 整合後的 UI 組件
- UI 整合測試
- UI 整合規格文件

**預估時間**：7-10 天

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `domain/knowledge_base/result_presentation_design.v1.0.md`

---

### 任務 6：使用者背景資料收集系統（PRIORITY: MEDIUM）

**目標**：設計和實作完整的背景資料收集系統

**子任務**：
1. ⏳ 設計背景資料收集策略（需要收集哪些資料？）
2. ⏳ 整合背景資料到計算邏輯（如何影響計算結果？）
3. ⏳ 建立背景資料的儲存和管理機制
4. ⏳ 建立背景資料的隱私保護機制
5. ⏳ 建立背景資料的資料清理機制（GDPR 合規）

**交付物**：
- 背景資料收集系統設計文件
- 背景資料儲存和管理機制
- 隱私保護機制
- 資料清理機制

**預估時間**：5-7 天

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1

---

### 任務 7：八大領域覆蓋（PRIORITY: HIGH）

**目標**：實作所有 8 個領域的 Facet

**子任務**：
1. ⏳ 識別其他 6 個領域的核心 Facet（需要顧問團隊協助）
2. ⏳ 為每個領域建立至少 1 個 Facet（6 個新 Facet）
3. ⏳ 實作領域到 Facet 的路由規則（精確路由 + 模糊路由）
4. ⏳ 實作「中宮/混沌」的處理邏輯（兜底策略）

**交付物**：
- 8 個領域的 Facet 定義（6 個新 Facet）
- 路由規則實作
- 「中宮/混沌」處理邏輯
- 路由規則測試

**預估時間**：14-21 天（需要顧問團隊協助）

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `roadmap/ROADMAP.md`

---

## 🎯 第六部分：核心問題總結（供顧問團討論）

### 問題 1：八大領域覆蓋度評估與題庫設計

**核心問題**：
1. **八大領域是否足夠涵蓋全人類煩惱？**
   - 當前設計：8 個領域（八卦）+ 中宮/混沌
   - 是否還有遺漏的領域？
   - 是否需要細分現有領域？

2. **每個領域應該有多少題目才能涵蓋該領域的所有煩惱？**
   - 當前狀態：只有 2 個領域有 Facet（`income_expansion_pressure`, `relationship_imbalance`）
   - 每個 Facet 目前只有 2-3 題（MVP 範例）
   - 目標：每個領域需要多少題目才能「準到發毛」？
   - 考慮因素：不同年齡、文化、背景的使用者

3. **提醒設計：在一個領域內應該選幾個項目？**
   - Stage 1（八卦定方位）：單選 1 個領域
   - Stage 2（六親定物象）：多選 2-3 項（符號雲/物象群）
   - **問題**：2-3 項是否足夠？是否需要調整？
   - **問題**：不同領域是否需要不同的選擇數量？

4. **選了項目後，下一道題目應該是什麼樣的提醒？**
   - Stage 2 完成後 → Stage 3（萬象定歸因）
   - Stage 3 的題目設計應該如何根據 Stage 2 的選擇動態調整？
   - 如何確保提醒「準到發毛」？

5. **需要選幾個項目才能完美涵蓋人類所有的煩惱和問題？**
   - 當前設計：Stage 1（1 個領域）+ Stage 2（2-3 項）+ Stage 3（歸因選擇）
   - 是否足夠？是否需要增加階段？
   - 如何確保不遺漏任何重要資訊？

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `domain/knowledge_base/question_design_guidelines.v1.0.md`

---

### 問題 2：解決方案與連鎖反應資料庫完整性

**核心問題**：
1. **解決方案資料庫是否足夠解決全天下人的問題？**
   - 當前狀態：每個 Facet 有 `recommendations`（建議）
   - 問題：建議的數量和深度是否足夠？
   - 問題：是否需要針對不同風險等級（low/mid/high）提供不同的解決方案？

2. **連鎖反應資料庫是否足夠？**
   - 當前狀態：每個 Facet 有 `riskchains`（風險鏈）
   - 問題：風險鏈的覆蓋度是否足夠？
   - 問題：是否需要跨 Facet 的連鎖反應資料？
   - 問題：如何確保「算到他皮包裡面沒錢了我們都要知道」的詳細度？

3. **底層引擎 vs 表層引擎的平衡**
   - **底層引擎**：要盡可能算得詳細（「算到他皮包裡面沒錢了我們都要知道」）
   - **表層引擎**：可以用的比較沒那麼細緻，但要讓人覺得「準到發毛」
   - **問題**：如何設計這兩套系統的結合？
   - **問題**：底層引擎的詳細度要到什麼程度？
   - **問題**：表層引擎的呈現要如何「準到發毛」而不暴露技術細節？

**相關文件**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`
- `docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md`
- `domain/knowledge_base/result_presentation_design.v1.0.md`

---

### 問題 3：UI 互動設計的四個回合明確化

**核心問題**：
1. **第一回合（Stage 1）的設計是否明確？**
   - 當前設計：八卦定方位（單選 1 個領域）
   - UI 表現：八卦轉輪 (Ba Gua Wheel) 或 八門卡片
   - **問題**：設計是否足夠明確？是否需要調整？
   - **問題**：是否有更好的設計方案？

2. **第二回合（Stage 2）的設計是否明確？**
   - 當前設計：六親定物象（多選 2-3 項）
   - UI 表現：符號雲 / 物象群 (Symbol Cloud)
   - **問題**：2-3 項的選擇數量是否足夠？
   - **問題**：符號雲的設計是否足夠直覺？
   - **問題**：是否有更好的設計方案？

3. **第三回合（Stage 3）的設計是否明確？**
   - 當前設計：萬象定歸因（投射式選擇）
   - UI 表現：萬象羅盤 / 星盤 (Phenomenon Compass)
   - **問題**：歸因軸向的設計是否足夠清晰？
   - **問題**：如何確保使用者理解但不覺得像問卷？
   - **問題**：是否有更好的設計方案？

4. **第四回合（Stage 4）的設計是否明確？**
   - 當前設計：命盤綜合與斷語（生成洞察並導向 Facet）
   - **問題**：斷語的生成規則是否足夠明確？
   - **問題**：如何確保斷語「準到發毛」？
   - **問題**：是否有更好的設計方案？

5. **整體流程是否有調整空間？**
   - 當前設計：Stage 1 → Stage 2 → Stage 3 → Stage 4 → Facet 題目 → 結果呈現
   - **問題**：流程是否順暢？是否有斷點？
   - **問題**：是否需要增加或減少階段？
   - **問題**：是否有更好的流程設計？

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `ui/src/state/flowState.tsx`

---

### 問題 4：題庫豐富度與分類

**問題**：
1. 如何建立「全人類、全年齡、全困擾」的題庫分類系統？
2. 如何確保題目能夠適配不同年齡、文化、語言背景？
3. 如何平衡題目數量與使用者體驗（不會太長）？
4. 如何確保題目內容符合詞彙白名單/黑名單？
5. 如何避免題目中使用命定論用語（「你是怎樣」、「你就怎樣」）？

**相關文件**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2
- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json`
- `domain/knowledge_base/forbidden_terms.v1.0.json`

---

### 問題 5：計算模型實作

**問題**：
1. V3 向量狀態評估模型的實作細節（Volatility, Rigidity 的具體計算）？
2. 如何確保前端計算與後端計算的一致性？
3. Debug Payload 的完整結構和用途？
4. 如何處理缺失的 Priors（使用者直接進入 Facet，跳過 P0-4.5）？

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`
- `engine/score_facet.py`
- `docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md`

---

### 問題 6：分流系統整合

**問題**：
1. 如何將 P0-4.5 分流系統的輸出（Priors）整合到 Facet 計算？
2. 動態權重調整的具體規則和實作方式？
3. 跨域擴散的觸發條件和呈現方式？
4. 如何避免過度觸發（避免每個 Facet 都觸發其他 Facet）？

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1

---

### 問題 7：UI 整合策略

**問題**：
1. 如何將 P0-4.5 分流系統整合到 UI（Stage 1-4 的互動設計）？
2. 如何呈現 V3 計算結果（Volatility, Rigidity）而不暴露技術細節？
3. 如何呈現風險鏈三層結構（Level 1/2/3）而不與 L1-L4 混淆？
4. 如何確保 UI 互動符合「純玄學體驗」原則？

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `domain/knowledge_base/result_presentation_design.v1.0.md`
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` Section 4

---


---

### 問題 6：使用者背景資料收集

**問題**：
1. 需要收集哪些背景資料？（姓名、性別、出生年月日？還有其他？）
2. 背景資料如何影響計算結果？
3. 如何保護使用者隱私？
4. 如何處理背景資料的缺失（使用者不提供）？

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1

---

## 📚 第七部分：完整背景資料清單

### 7.1 必須閱讀的檔案（SSOT）

#### 核心規格文件
1. ⭐⭐⭐ `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格
2. ⭐⭐⭐ `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示（工程定錨級）
3. ⭐⭐ `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策文件

#### 分流系統設計
4. ⭐⭐ `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計

#### 題目設計
5. ⭐⭐ `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

#### 結果呈現
6. ⭐⭐ `domain/knowledge_base/result_presentation_design.v1.0.md` - 結果呈現設計

#### 詞彙管理
7. ⭐⭐⭐ `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙白名單
8. ⭐⭐⭐ `domain/knowledge_base/forbidden_terms.v1.0.json` - 全域禁用詞表
9. ⭐⭐ `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範
10. ⭐⭐ `domain/knowledge_base/ai_narrative_spec.v1.0.md` - AI 敘事生成規範

#### UI 架構
11. ⭐⭐ `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` - UI 架構設計

#### 風險鏈結構
12. ⭐⭐ `docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md` - 風險鏈結構（A/B Framework）

#### 專案憲章
13. ⭐ `charter/CHARTER.md` - 專案憲章

---

### 7.2 建議閱讀的檔案（參考）

#### 實作範例
1. `engine/score_facet.py` - 當前實作（需要升級）
2. `domain/facets/stress_recovery.scoring.v1.0.json` - Facet 評分配置範例
3. `domain/questions/stress_recovery.questions.v1.0.json` - 題目定義範例
4. `domain/compiled/stress_recovery.compiled.v1.0.json` - 編譯後的 Facet 範例

#### 審核報告
5. `docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md` - V3 審核報告
6. `docs/ops/analysis/ENGINE_CORE_LOGIC_V3_DIRECTIVE_REVC_AUDIT.md` - REV.C+ 審核報告

---

## 📊 第八部分：資料位置總覽

### 8.1 底層引擎核心規格

| 類別 | 檔案位置 | 狀態 |
|------|---------|------|
| **主規格文件** | `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` | ✅ SSOT |
| **最終技術裁示** | `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` | ✅ SSOT |
| **架構決策** | `docs/adr/ADR_0005_vector_state_scoring_engine.md` | ✅ SSOT |

---

### 8.2 實作文件

| 類別 | 檔案位置 | 狀態 |
|------|---------|------|
| **分數計算** | `engine/score_facet.py` | ⚠️ 需升級到 V3 |
| **領域編譯** | `engine/compile_domain.py` | ✅ 完成 |
| **卦象推導** | `engine/hexagram_deriver.py` | ✅ 完成 |
| **五行碰撞** | `engine/collision_calculator.py` | ✅ 完成 |
| **根元素映射** | `engine/root_element_mapper.py` | ✅ 完成 |

---

### 8.3 配置文件

| 類別 | 檔案位置 | 狀態 |
|------|---------|------|
| **Facet 評分配置** | `domain/facets/*.scoring.v1.0.json` | ✅ 9 個 Facet |
| **題目定義** | `domain/questions/*.questions.v1.0.json` | ✅ 14 個 Facet |
| **編譯後的 Facet** | `domain/compiled/*.compiled.v1.0.json` | ✅ 完成 |
| **Facet 清單** | `domain/manifests/*.v1.0.json` | ✅ 14 個 Facet |

---

### 8.4 知識庫文件

| 類別 | 檔案位置 | 狀態 |
|------|---------|------|
| **題目設計指南** | `domain/knowledge_base/question_design_guidelines.v1.0.md` | ✅ SSOT |
| **結果呈現設計** | `domain/knowledge_base/result_presentation_design.v1.0.md` | ✅ SSOT |
| **詞彙白名單** | `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` | ✅ SSOT |
| **禁用詞表** | `domain/knowledge_base/forbidden_terms.v1.0.json` | ✅ SSOT |
| **呈現規範** | `domain/knowledge_base/presentation_guidelines.v1.0.md` | ✅ SSOT |
| **AI 敘事規範** | `domain/knowledge_base/ai_narrative_spec.v1.0.md` | ✅ SSOT |

---

## 🎯 第九部分：顧問群討論重點

### 9.1 八大領域覆蓋度評估與題庫設計（最高優先級）

**討論重點**：
1. **八大領域是否足夠涵蓋全人類煩惱？**
   - 是否需要增加或細分領域？
   - 如何確保不遺漏任何重要領域？

2. **每個領域應該有多少題目？**
   - 目標：每個領域需要多少題目才能「準到發毛」？
   - 考慮因素：不同年齡、文化、背景的使用者
   - 如何平衡題目數量與使用者體驗？

3. **提醒設計：在一個領域內應該選幾個項目？**
   - Stage 2（六親定物象）：2-3 項是否足夠？
   - 不同領域是否需要不同的選擇數量？
   - 如何確保選擇數量能夠完美涵蓋所有煩惱？

4. **選了項目後，下一道題目應該是什麼樣的提醒？**
   - Stage 3（萬象定歸因）的題目設計應該如何根據 Stage 2 的選擇動態調整？
   - 如何確保提醒「準到發毛」？

5. **需要選幾個項目才能完美涵蓋人類所有的煩惱和問題？**
   - 當前設計是否足夠？
   - 是否需要增加階段或調整流程？

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `domain/knowledge_base/question_design_guidelines.v1.0.md`

---

### 9.2 解決方案與連鎖反應資料庫完整性（最高優先級）

**討論重點**：
1. **解決方案資料庫是否足夠解決全天下人的問題？**
   - 建議的數量和深度是否足夠？
   - 是否需要針對不同風險等級提供不同的解決方案？

2. **連鎖反應資料庫是否足夠？**
   - 風險鏈的覆蓋度是否足夠？
   - 是否需要跨 Facet 的連鎖反應資料？
   - 如何確保「算到他皮包裡面沒錢了我們都要知道」的詳細度？

3. **底層引擎 vs 表層引擎的平衡**
   - 底層引擎的詳細度要到什麼程度？
   - 表層引擎的呈現要如何「準到發毛」而不暴露技術細節？
   - 如何設計這兩套系統的結合？

**相關文件**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`
- `docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md`
- `domain/knowledge_base/result_presentation_design.v1.0.md`

---

### 9.3 UI 互動設計的四個回合明確化（最高優先級）

**討論重點**：
1. **第一回合（Stage 1：八卦定方位）的設計是否明確？**
   - 設計是否足夠明確？是否需要調整？
   - 是否有更好的設計方案？

2. **第二回合（Stage 2：六親定物象）的設計是否明確？**
   - 2-3 項的選擇數量是否足夠？
   - 符號雲的設計是否足夠直覺？
   - 是否有更好的設計方案？

3. **第三回合（Stage 3：萬象定歸因）的設計是否明確？**
   - 歸因軸向的設計是否足夠清晰？
   - 如何確保使用者理解但不覺得像問卷？
   - 是否有更好的設計方案？

4. **第四回合（Stage 4：命盤綜合與斷語）的設計是否明確？**
   - 斷語的生成規則是否足夠明確？
   - 如何確保斷語「準到發毛」？
   - 是否有更好的設計方案？

5. **整體流程是否有調整空間？**
   - 流程是否順暢？是否有斷點？
   - 是否需要增加或減少階段？
   - 是否有更好的流程設計？

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `ui/src/state/flowState.tsx`

---

### 9.4 題庫豐富度與分類

**討論重點**：
1. 如何建立「全人類、全年齡、全困擾」的題庫分類系統？
2. 如何確保題目能夠適配不同年齡、文化、語言背景？
3. 如何平衡題目數量與使用者體驗？
4. 如何確保題目內容符合詞彙白名單/黑名單？
5. 如何避免題目中使用命定論用語？

**相關文件**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2

---

### 9.2 計算模型實作

**討論重點**：
1. V3 向量狀態評估模型的實作細節確認
2. 前後端計算一致性的確保機制
3. Debug Payload 的完整結構和用途
4. 缺失 Priors 的處理策略

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`
- `engine/score_facet.py`

---

### 9.3 分流系統整合

**討論重點**：
1. Priors 整合到 Facet 計算的具體實作方式
2. 動態權重調整的具體規則
3. 跨域擴散的觸發條件和呈現方式
4. 如何避免過度觸發

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1

---

### 9.4 UI 整合策略

**討論重點**：
1. P0-4.5 分流系統整合到 UI 的互動設計
2. V3 計算結果的呈現方式（不暴露技術細節）
3. 風險鏈三層結構的呈現方式（不與 L1-L4 混淆）
4. 如何確保 UI 互動符合「純玄學體驗」原則

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `domain/knowledge_base/result_presentation_design.v1.0.md`

---

### 9.5 八大領域覆蓋

**討論重點**：
1. 如何識別每個領域的核心 Facet？
2. 如何確保領域到 Facet 的路由規則能夠覆蓋「全人類、全年齡、全困擾」？
3. 如何處理「中宮/混沌」的情況？
4. 如何確保每個領域都有足夠的 Facet 覆蓋？

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `roadmap/ROADMAP.md`

---

### 9.6 使用者背景資料收集

**討論重點**：
1. 需要收集哪些背景資料？
2. 背景資料如何影響計算結果？
3. 如何保護使用者隱私？
4. 如何處理背景資料的缺失？

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1

---

## 📋 第十部分：任務執行檢查清單

### 檢查清單 1：底層引擎內容整合

- [ ] 確認 `specs/engine/core/` 為底層引擎規格的 SSOT
- [ ] 更新 `specs/engine/core/calculation/README.md`
- [ ] 更新 `specs/engine/core/questions/README.md`
- [ ] 建立 `specs/engine/core/integration/priors_integration.md`
- [ ] 建立 `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`

---

### 檢查清單 2：V3 引擎實作

- [ ] 升級 `engine/score_facet.py` 支援策略模式
- [ ] 實作 `run_v3_logic` 函數
- [ ] 實作 Volatility Index 計算
- [ ] 實作 Rigidity Index 計算
- [ ] 實作 Debug Payload 輸出
- [ ] 建立單元測試
- [ ] 建立整合測試

---

### 檢查清單 3：題庫擴充與分類

- [ ] 建立題庫分類系統
- [ ] 為每個 Facet 擴充題目（6-10 題）
- [ ] 建立題目適配策略
- [ ] 建立題目難度分級
- [ ] 建立題目品質驗收標準

---

### 檢查清單 4：P0-4.5 分流系統整合

- [ ] 實作 Priors 接收機制
- [ ] 實作動態權重調整
- [ ] 實作跨域擴散邏輯
- [ ] 建立整合測試

---

### 檢查清單 5：UI 整合

- [ ] 整合 P0-4.5 分流系統到 UI
- [ ] 整合 V3 計算結果到 UI
- [ ] 整合風險鏈三層結構到 UI
- [ ] 確保前端計算與後端對齊

---

### 檢查清單 6：使用者背景資料收集

- [ ] 設計背景資料收集策略
- [ ] 整合背景資料到計算邏輯
- [ ] 建立背景資料的儲存和管理機制
- [ ] 建立背景資料的隱私保護機制

---

### 檢查清單 7：八大領域覆蓋

- [ ] 識別其他 6 個領域的核心 Facet
- [ ] 為每個領域建立至少 1 個 Facet
- [ ] 實作領域到 Facet 的路由規則
- [ ] 實作「中宮/混沌」的處理邏輯

---

## ✅ 第十一部分：顧問群使用指南

### 11.1 如何使用本任務包

1. **先閱讀核心 SSOT 檔案**（必須讀）：
   - `charter/CHARTER.md` - 了解專案終極目標
   - `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 了解引擎核心規格
   - `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 了解最終技術裁示
   - `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 了解分流系統設計

2. **閱讀差距分析**（建議讀）：
   - 本文件的「第四部分：距離終極目標的差距分析」
   - 了解當前狀態與終極目標的差距

3. **閱讀任務計劃**（建議讀）：
   - 本文件的「第五部分：完整任務計劃」
   - 了解需要完成的任務和優先級

4. **針對核心問題提供建議**：
   - 本文件的「第六部分：核心問題總結」
   - 針對每個問題提供具體建議

---

### 11.2 輸出要求

顧問群應該提供：
1. **完整的設計建議**：基於本任務包提供的背景資料
2. **具體的實作方案**：考慮「準到發毛」的終極目標
3. **UI 整合方案**：考慮 UI 架構和互動功能
4. **八大領域覆蓋方案**：考慮「全人類、全年齡、全困擾」的目標
5. **題庫擴充方案**：考慮題庫豐富度和分類系統

---

**建立日期**：2026-01-12  
**狀態**：READY_FOR_ADVISOR_CONSULTATION  
**目標**：基於最終版本，與顧問團隊進行最終整合討論
