# 底層引擎全面整合分析報告

**分析日期**：2026-01-12  
**分析範圍**：全專案所有資料夾和檔案  
**分析目標**：識別所有底層引擎相關內容，整合到統一位置，分析距離終極目標的差距

---

## 📋 執行摘要

### 分析結果

經過全面搜尋，發現底層引擎相關內容主要分佈在以下位置：

1. **已整合位置**（符合預期）：
   - `specs/engine/core/` - 引擎核心規格
   - `engine/` - 引擎實作（Python）
   - `domain/facets/` - Facet 評分配置
   - `domain/questions/` - 題目定義
   - `domain/compiled/` - 編譯後的 Facet

2. **部分散落位置**（需要整合）：
   - `prototype/app.js` - 前端計算邏輯（JavaScript）
   - `ui/src/adapters/` - UI 適配層（包含計算邏輯）
   - `ui/src/engine/` - UI 引擎層（risk, theme）
   - `domain/facets/income_expansion_pressure/` - Facet 特定配置（hexagram_mapping）

3. **相關但非核心**（保持現狀）：
   - `domain/knowledge_base/` - 知識庫（詞彙、規範）
   - `docs/directives/` - 技術裁示
   - `docs/adr/` - 架構決策

---

## 🔍 詳細分析

### 1. 題目相關內容分佈

#### 已整合位置
- ✅ `domain/questions/*.questions.v1.0.json` - 14 個 Facet 的題目定義
- ✅ `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

#### 散落位置
- ⚠️ `prototype/app.js` - 包含題目渲染和答案收集邏輯（`renderQuestions`, `normalizeQuestion`）
- ⚠️ `ui/src/adapters/facetAdapter.ts` - 包含題目適配邏輯（`adaptProjection`）

**建議**：前端邏輯保持現狀（UI 層），但需確保與底層引擎規格一致

---

### 2. 計算分數相關內容分佈

#### 已整合位置
- ✅ `engine/score_facet.py` - 核心計算引擎（Python）
- ✅ `domain/facets/*.scoring.v1.0.json` - 9 個 Facet 的評分配置
- ✅ `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 計算邏輯規格
- ✅ `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示

#### 散落位置
- ⚠️ `prototype/app.js` - 包含前端計算邏輯（`sumScore` 函數）
- ⚠️ `ui/src/adapters/facetAdapter.ts` - 包含資料適配邏輯

**問題**：
- 前端 `sumScore` 與後端 `score_facet.py` 的計算邏輯可能不一致
- 前端計算邏輯應該只作為預覽，最終計算應由後端完成

**建議**：明確前端計算僅為預覽，後端計算為權威來源

---

### 3. 加權積分相關內容分佈

#### 已整合位置
- ✅ `engine/score_facet.py` - 加權計算邏輯
- ✅ `domain/facets/*.scoring.v1.0.json` - 權重配置（`weight` 欄位）
- ✅ `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 加權邏輯規格
- ✅ `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 加權規則裁示

#### 散落位置
- ⚠️ `prototype/app.js` - 包含前端加權計算（`sumScore` 函數中的 `weight` 處理）

**建議**：確保前端與後端加權邏輯一致

---

### 4. 母題/模板相關內容分佈

#### 已整合位置
- ✅ `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南（包含模板原則）
- ✅ `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙白名單（可作為母題參考）

#### 散落位置
- ⚠️ `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md` - Facet 特定隱喻白名單
- ⚠️ `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_WHITELIST.md` - Facet 特定隱喻白名單

**建議**：這些是 Facet 特定的設計資產，保持現狀，但需確保與底層引擎規格一致

---

### 5. 其他引擎相關內容

#### 已整合位置
- ✅ `engine/hexagram_deriver.py` - 卦象推導邏輯
- ✅ `engine/collision_calculator.py` - 五行碰撞計算
- ✅ `engine/root_element_mapper.py` - 根元素映射
- ✅ `engine/compile_domain.py` - 領域編譯邏輯

#### 散落位置
- ⚠️ `domain/facets/income_expansion_pressure/hexagram_mapping.v1.0.json` - Facet 特定的卦象映射

**建議**：Facet 特定配置保持現狀，但需確保與引擎規格一致

---

## 📊 整合建議

### 建議 1：建立底層引擎統一資料夾結構

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

---

### 建議 2：建立前端計算邏輯對照表

**問題**：前端 `prototype/app.js` 和 `ui/src/adapters/` 中的計算邏輯需要與後端對齊

**建議**：
- 建立 `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`
- 明確標註：前端計算僅為預覽，後端計算為權威來源
- 定義前端計算的降級策略（當後端計算失敗時）

---

### 建議 3：整合 Facet 特定配置

**問題**：`domain/facets/income_expansion_pressure/hexagram_mapping.v1.0.json` 是 Facet 特定配置

**建議**：
- 保持 Facet 特定配置在 `domain/facets/` 下
- 但在 `specs/engine/core/` 中建立「Facet 配置規範」文件
- 確保所有 Facet 配置都符合統一規範

---

## 🎯 距離終極目標的差距分析

### 終極目標定義

根據 `charter/CHARTER.md` 和 `docs/task_packets/advisor/ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md`：

> **對全世界所有年齡所有人都可以非常準確**，準到發毛的那一種感覺  
> **基於準確的分析結果，提出有效的解決方案以及未解決的連鎖反應**  
> **需要龐大的資料庫和強大的運算能力**

---

### 差距分析

#### 1. 題庫豐富度（Gap: HIGH）

**現狀**：
- 只有 14 個 Facet 的題目定義
- 每個 Facet 只有 2-3 題（MVP 範例）
- 缺少完整的題目分類和組織

**差距**：
- ❌ 缺少「全人類、全年齡、全困擾」的題庫覆蓋
- ❌ 缺少題目分類系統（Core State, Validation, Reaction, Resources）
- ❌ 缺少題目難度分級
- ❌ 缺少題目適配不同年齡/文化背景的策略

**需要**：
- 建立完整的題庫分類系統
- 擴充每個 Facet 的題目數量（從 2-3 題擴充到 6-10 題）
- 建立題目適配策略（年齡、文化、語言）

---

#### 2. 計算模型完整性（Gap: MEDIUM）

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
- 升級 `engine/score_facet.py` 支援 V3 模型
- 實作 Volatility Index 計算
- 實作 Rigidity Index 計算
- 實作 Debug Payload 輸出

---

#### 3. 分流系統整合（Gap: MEDIUM）

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

---

#### 4. UI 整合完整性（Gap: MEDIUM）

**現狀**：
- ✅ P0-5 UI 架構設計已完成
- ✅ Layer 0-6 的結構已定義
- ⚠️ 但與底層引擎的整合尚未完成

**差距**：
- ❌ UI 尚未整合 P0-4.5 分流系統（Stage 1-4）
- ❌ UI 尚未整合 V3 計算結果（Volatility, Rigidity）
- ❌ UI 尚未整合風險鏈三層結構（Level 1/2/3）

**需要**：
- 整合 P0-4.5 分流系統到 UI
- 整合 V3 計算結果到 UI
- 整合風險鏈三層結構到 UI

---

#### 5. 使用者背景資料收集（Gap: HIGH）

**現狀**：
- ✅ P0-5 UI 架構中定義了 Layer 1（使用者錨定層）
- ⚠️ 但背景資料收集系統尚未完整設計

**差距**：
- ❌ 缺少完整的背景資料收集策略
- ❌ 缺少背景資料與計算邏輯的整合
- ❌ 缺少背景資料的儲存和管理機制

**需要**：
- 設計完整的背景資料收集系統
- 整合背景資料到計算邏輯
- 建立背景資料的儲存和管理機制

---

#### 6. 八大領域覆蓋（Gap: HIGH）

**現狀**：
- ✅ P0-4.5 分流系統設計了 Stage 1（八卦定方位）
- ✅ 定義了 8 個領域（八卦）+ 中宮/混沌
- ⚠️ 但只有 2 個 Facet 已實作（`income_expansion_pressure`, `relationship_imbalance`）

**差距**：
- ❌ 缺少其他 6 個領域的 Facet 實作
- ❌ 缺少領域到 Facet 的路由規則實作
- ❌ 缺少「中宮/混沌」的處理邏輯

**需要**：
- 實作其他 6 個領域的 Facet
- 實作領域到 Facet 的路由規則
- 實作「中宮/混沌」的處理邏輯

---

## 📝 完整任務計劃包

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

---

### 任務 2：V3 引擎實作（PRIORITY: HIGH）

**目標**：實作 V3 向量狀態評估模型

**子任務**：
1. ⏳ 升級 `engine/score_facet.py` 支援策略模式
2. ⏳ 實作 `run_v3_logic` 函數（包含 Volatility, Rigidity 計算）
3. ⏳ 實作 Debug Payload 輸出
4. ⏳ 建立單元測試

**交付物**：
- 升級後的 `engine/score_facet.py`
- 單元測試套件

---

### 任務 3：題庫擴充與分類（PRIORITY: HIGH）

**目標**：建立完整的題庫分類系統，擴充題目數量

**子任務**：
1. ⏳ 建立題庫分類系統（Core State, Validation, Reaction, Resources）
2. ⏳ 為每個 Facet 擴充題目（從 2-3 題擴充到 6-10 題）
3. ⏳ 建立題目適配策略（年齡、文化、語言）
4. ⏳ 建立題目難度分級

**交付物**：
- 題庫分類系統文件
- 擴充後的題目定義
- 題目適配策略文件

---

### 任務 4：P0-4.5 分流系統整合（PRIORITY: MEDIUM）

**目標**：整合 P0-4.5 分流系統到底層引擎

**子任務**：
1. ⏳ 實作 Priors 接收機制
2. ⏳ 實作動態權重調整
3. ⏳ 實作跨域擴散邏輯
4. ⏳ 建立整合測試

**交付物**：
- 整合後的計算引擎
- 整合測試套件

---

### 任務 5：UI 整合（PRIORITY: MEDIUM）

**目標**：整合底層引擎到 UI

**子任務**：
1. ⏳ 整合 P0-4.5 分流系統到 UI（Stage 1-4）
2. ⏳ 整合 V3 計算結果到 UI（Volatility, Rigidity）
3. ⏳ 整合風險鏈三層結構到 UI（Level 1/2/3）
4. ⏳ 確保前端計算與後端對齊

**交付物**：
- 整合後的 UI 組件
- UI 整合測試

---

### 任務 6：使用者背景資料收集系統（PRIORITY: MEDIUM）

**目標**：設計和實作完整的背景資料收集系統

**子任務**：
1. ⏳ 設計背景資料收集策略
2. ⏳ 整合背景資料到計算邏輯
3. ⏳ 建立背景資料的儲存和管理機制
4. ⏳ 建立背景資料的隱私保護機制

**交付物**：
- 背景資料收集系統設計文件
- 背景資料儲存和管理機制
- 隱私保護機制

---

### 任務 7：八大領域覆蓋（PRIORITY: HIGH）

**目標**：實作所有 8 個領域的 Facet

**子任務**：
1. ⏳ 識別其他 6 個領域的核心 Facet
2. ⏳ 為每個領域建立至少 1 個 Facet
3. ⏳ 實作領域到 Facet 的路由規則
4. ⏳ 實作「中宮/混沌」的處理邏輯

**交付物**：
- 8 個領域的 Facet 定義
- 路由規則實作
- 「中宮/混沌」處理邏輯

---

## 🎯 核心問題總結（供顧問團討論）

### 問題 1：題庫豐富度與分類

**問題**：
- 如何建立「全人類、全年齡、全困擾」的題庫分類系統？
- 如何確保題目能夠適配不同年齡、文化、語言背景？
- 如何平衡題目數量與使用者體驗（不會太長）？

**相關文件**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2

---

### 問題 2：計算模型實作

**問題**：
- V3 向量狀態評估模型的實作細節（Volatility, Rigidity 的具體計算）？
- 如何確保前端計算與後端計算的一致性？
- Debug Payload 的完整結構和用途？

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`
- `engine/score_facet.py`

---

### 問題 3：分流系統整合

**問題**：
- 如何將 P0-4.5 分流系統的輸出（Priors）整合到 Facet 計算？
- 動態權重調整的具體規則和實作方式？
- 跨域擴散的觸發條件和呈現方式？

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1

---

### 問題 4：UI 整合策略

**問題**：
- 如何將 P0-4.5 分流系統整合到 UI（Stage 1-4 的互動設計）？
- 如何呈現 V3 計算結果（Volatility, Rigidity）而不暴露技術細節？
- 如何呈現風險鏈三層結構（Level 1/2/3）而不與 L1-L4 混淆？

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- `domain/knowledge_base/result_presentation_design.v1.0.md`

---

### 問題 5：八大領域覆蓋

**問題**：
- 如何識別每個領域的核心 Facet？
- 如何確保領域到 Facet 的路由規則能夠覆蓋「全人類、全年齡、全困擾」？
- 如何處理「中宮/混沌」的情況？

**相關文件**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- `roadmap/ROADMAP.md`

---

### 問題 6：使用者背景資料收集

**問題**：
- 需要收集哪些背景資料？
- 背景資料如何影響計算結果？
- 如何保護使用者隱私？

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1

---

## 📦 完整任務計劃包結構

### 第一部分：當前狀態總覽

1. **專案核心目標與限制**
2. **當前實作狀態**
3. **已完成的整合**
4. **待完成的整合**

### 第二部分：底層引擎核心規格

1. **運算模型規格**（V3 向量狀態評估）
2. **題目系統規格**（題目類型、分類、設計原則）
3. **評分系統規格**（加權、Volatility、Rigidity）
4. **風險鏈系統規格**（三層結構、A/B Framework）
5. **結果呈現規格**（L1-L4、動態敘事組裝）

### 第三部分：整合系統規格

1. **P0-4.5 分流系統整合**（Priors、動態權重、跨域擴散）
2. **UI 整合規格**（Layer 0-6、互動設計）
3. **使用者背景資料收集**（資料收集、隱私保護）

### 第四部分：差距分析與任務計劃

1. **差距分析**（7 個主要差距）
2. **任務計劃**（7 個主要任務，每個任務包含子任務）
3. **優先級排序**（HIGH / MEDIUM / LOW）

### 第五部分：核心問題總結

1. **6 個核心問題**（供顧問團討論）
2. **每個問題的相關文件清單**

---

**分析完成時間**：2026-01-12  
**分析者**：Cursor（總指揮）
