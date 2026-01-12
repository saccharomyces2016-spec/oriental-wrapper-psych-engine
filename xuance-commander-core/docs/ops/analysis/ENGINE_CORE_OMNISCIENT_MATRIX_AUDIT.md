# ENGINE_CORE_OMNISCIENT_MATRIX_FINAL 審核報告

**審核日期**：2026-01-12  
**審核文件**：`ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md`  
**審核標準**：ENGINE-CORE-FINAL-INTEGRATION-001 任務需求、DIRECTIVE-2026-01-12-02-REV.C+、ENGINE_CORE_LOGIC_MASTER_V3.md

---

## 📋 審核摘要

### 整體評估

**狀態**：⚠️ **部分合格，需要追問**

**合格部分**：
- ✅ 八大領域覆蓋方案（符合 P0-4.5 設計）
- ✅ 跨域擴散概念（五行生剋邏輯）
- ✅ 使用者背景資料策略（Role Archetype）
- ✅ UI/Engine 契約（前後端分離）

**需要追問的部分**：
- ⚠️ 題目數量強制 8 題（與現有規格不一致）
- ⚠️ V3 引擎計算公式不完整（缺少 Rigidity 計算細節）
- ⚠️ 跨域擴散實作細節不明確
- ⚠️ 使用者背景資料與 P0-5 UI 架構不一致
- ⚠️ 缺少 Debug Payload 結構定義
- ⚠️ 缺少與現有 Facet 的向後相容性說明

---

## 🔍 詳細審核結果

### 1. 八大領域覆蓋方案（✅ 合格）

**審核結果**：✅ **符合任務需求**

**符合點**：
- 8 個領域（八卦）+ 中宮/混沌，符合 P0-4.5 設計
- 每個領域 ≥1 Facet (MVP)，≥3 Facets (Full)，符合擴充需求
- 領域映射表清晰，符合「全人類、全年齡、全困擾」目標

**建議**：
- 可直接整合到 `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1

---

### 2. Facet 設計規範（⚠️ 需要追問）

**審核結果**：⚠️ **與現有規格不一致，需要確認**

**衝突點**：
1. **題目數量**：
   - 文件聲稱：「Each Facet = 8 questions exactly」
   - 現有規格（`ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2.2）：建議 6-10 題
   - **問題**：是否要強制 8 題？還是允許 6-10 題的彈性？

2. **題目配比**：
   - 文件：Core State 3, Validation 2, Reaction 2, Resource 1（總計 8 題）
   - 現有規格：Core State 30%, Validation 20%, Reaction 30%, Resources 20%
   - **問題**：8 題制是否符合 30%/20%/30%/20% 的配比？是否需要調整？

3. **驗證題標記**：
   - 文件：Validation Anchor 2 題，標記 `exclude_from_volatility=true`
   - 現有規格（DIRECTIVE REV.C+）：驗證題必須標記 `exclude_from_volatility: true`
   - **符合**：✅ 符合 DIRECTIVE REV.C+

**追問項目**：
- 是否要強制所有 Facet 都必須是 8 題？
- 如果某個 Facet 需要更多題目才能「準到發毛」，是否允許例外？
- 8 題制的配比（3+2+2+1）是否要調整為更符合 30%/20%/30%/20%？

---

### 3. V3 引擎實作（⚠️ 需要追問）

**審核結果**：⚠️ **計算公式不完整，缺少關鍵細節**

**符合點**：
- ✅ 提到 Severity (weighted mean)
- ✅ 提到 Volatility (stddev, exclusions honored)
- ✅ 提到 Rigidity (from priors)
- ✅ 提到 Final Score = Severity × (1 + Rigidity × weight)

**缺少的關鍵細節**：

1. **Rigidity 計算公式**：
   - 文件只說「from priors」，但沒有提供具體計算公式
   - DIRECTIVE REV.B 提供了完整的 3 層計算模型（Layer A/B/C）
   - **問題**：是否要採用 DIRECTIVE REV.B 的計算公式？還是要簡化？

2. **Volatility 計算細節**：
   - 文件只說「stddev, exclusions honored」
   - 缺少正規化（Normalization）的說明
   - 缺少排除規則的具體實作
   - **問題**：是否要完全遵循 DIRECTIVE REV.C+ 的排除規則？

3. **Debug Payload 結構**：
   - 文件完全沒有提到 Debug Payload
   - DIRECTIVE REV.B 要求必須包含 `_meta` 欄位
   - **問題**：是否需要包含 Debug Payload？結構如何定義？

4. **參數配置化**：
   - 文件沒有提到 `volatility_thresholds` 和 `rigidity_weight` 的配置
   - DIRECTIVE REV.B 要求這些參數必須可配置
   - **問題**：是否需要支援參數配置化？

**追問項目**：
- Rigidity 的具體計算公式是什麼？（是否採用 DIRECTIVE REV.B 的 3 層模型？）
- Volatility 的正規化規則是什麼？
- Debug Payload 的完整結構是什麼？
- 參數配置化的預設值是什麼？

---

### 4. 跨域擴散引擎（⚠️ 需要追問）

**審核結果**：⚠️ **概念符合，但實作細節不明確**

**符合點**：
- ✅ 使用五行生剋作為傳導邏輯，符合玄學體系
- ✅ 高風險 (>0.8) 觸發跨域警告，符合風險管理需求

**缺少的關鍵細節**：

1. **觸發條件**：
   - 文件只說「>0.8」，但沒有說明是 `final_score` 還是 `raw_score`？
   - 是否需要考慮 Volatility 和 Rigidity？
   - **問題**：觸發條件是否要更精細？

2. **傳導邏輯**：
   - 文件提供了 4 個範例（坤→坎、離→乾、坎→離、巽→坤）
   - 但沒有完整的五行生剋矩陣
   - **問題**：是否需要完整的 8×8 傳導矩陣？還是只針對特定組合？

3. **敘事生成**：
   - 文件提供了範例敘事模板
   - 但沒有說明如何確保敘事符合詞彙白名單/黑名單
   - **問題**：跨域擴散的敘事是否需要通過詞彙檢查？

4. **實作位置**：
   - 文件說「server-side only」
   - 但沒有說明是在 `score_facet.py` 中實作，還是獨立的模組？
   - **問題**：實作架構如何設計？

**追問項目**：
- 觸發條件是 `final_score > 0.8` 還是 `raw_score > 0.8`？
- 是否需要完整的 8×8 五行生剋傳導矩陣？
- 跨域擴散的敘事如何確保符合詞彙規範？
- 實作架構如何設計？（獨立模組 vs 整合到 score_facet.py）

---

### 5. P0-4.5 分流系統整合（✅ 合格）

**審核結果**：✅ **符合任務需求**

**符合點**：
- ✅ Stage 1-4 的對應關係清晰
- ✅ 輸出 Priors 直接餵給 V3 引擎，符合整合需求

**建議**：
- 可直接整合到 `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1

---

### 6. 使用者背景資料策略（⚠️ 需要追問）

**審核結果**：⚠️ **與現有 UI 架構不一致，需要確認**

**衝突點**：
1. **資料收集內容**：
   - 文件：只收集「Role Archetype」（Pioneer, Keeper, Strategist, Artisan）
   - 現有 UI 架構（P0-5 Layer 1）：收集姓名（可選）、性別（可選）、出生年月日（必須）
   - **問題**：是否要修改 P0-5 UI 架構？還是要同時收集兩者？

2. **資料用途**：
   - 文件：Role Archetype 只用於「tune volatility thresholds」
   - 現有架構：出生年月日用於計算根元素（Root Element）
   - **問題**：是否要保留出生年月日的收集？還是完全移除？

3. **資料應用**：
   - 文件：Role Archetype 影響 `volatility_thresholds`
   - 現有架構：出生年月日影響 `root_element`（用於五行碰撞計算）
   - **問題**：兩套系統如何整合？

**追問項目**：
- 是否要修改 P0-5 UI 架構的 Layer 1？
- 是否要保留出生年月日的收集？
- Role Archetype 和 Root Element 如何整合？

---

### 7. UI/Engine 契約（✅ 合格）

**審核結果**：✅ **符合任務需求**

**符合點**：
- ✅ 前端 = 預覽，後端 = 權威
- ✅ 需要對齊規範
- ✅ 任何分歧 = 阻斷

**建議**：
- 可直接整合到 `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`

---

## 📝 追問包

基於以上審核結果，需要追問以下關鍵問題：

### 追問 1：題目數量規範

**問題**：
1. 是否要強制所有 Facet 都必須是 8 題？還是允許 6-10 題的彈性？
2. 如果某個 Facet 需要更多題目才能「準到發毛」，是否允許例外？
3. 8 題制的配比（3+2+2+1）是否要調整為更符合 30%/20%/30%/20%？

**背景資料**：
- 現有規格（`ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2.2）：建議 6-10 題
- 配比要求：Core State 30%, Validation 20%, Reaction 30%, Resources 20%

---

### 追問 2：V3 引擎計算公式完整性

**問題**：
1. Rigidity 的具體計算公式是什麼？是否採用 DIRECTIVE REV.B 的 3 層模型（Layer A/B/C）？
2. Volatility 的正規化規則是什麼？是否要完全遵循 DIRECTIVE REV.C+ 的排除規則？
3. Debug Payload 的完整結構是什麼？是否需要包含 `_meta` 欄位？
4. 參數配置化的預設值是什麼？（`volatility_thresholds`, `rigidity_weight`）

**背景資料**：
- DIRECTIVE REV.B 提供了完整的 Rigidity 計算公式（3 層模型）
- DIRECTIVE REV.C+ 提供了 Volatility 的排除規則
- DIRECTIVE REV.B 要求必須包含 Debug Payload

---

### 追問 3：跨域擴散引擎實作細節

**問題**：
1. 觸發條件是 `final_score > 0.8` 還是 `raw_score > 0.8`？是否需要考慮 Volatility 和 Rigidity？
2. 是否需要完整的 8×8 五行生剋傳導矩陣？還是只針對特定組合？
3. 跨域擴散的敘事如何確保符合詞彙白名單/黑名單？
4. 實作架構如何設計？（獨立模組 vs 整合到 score_facet.py）

**背景資料**：
- 現有風險鏈結構（`R4_RISKCHAINS_STRUCTURAL_ASSETS.md`）：Framework A/B，Level 1/2/3
- 詞彙管理（`vocabulary_metaphysical.v1.0.json`, `forbidden_terms.v1.0.json`）

---

### 追問 4：使用者背景資料策略整合

**問題**：
1. 是否要修改 P0-5 UI 架構的 Layer 1？還是要同時收集 Role Archetype 和出生年月日？
2. 是否要保留出生年月日的收集？（用於 Root Element 計算）
3. Role Archetype 和 Root Element 如何整合？兩套系統的優先級是什麼？

**背景資料**：
- P0-5 UI 架構（`P0-5_UI_ARCHITECTURE.md` Layer 1）：收集姓名、性別、出生年月日
- Root Element 計算（`engine/root_element_mapper.py`）：使用出生年月日計算五行

---

### 追問 5：向後相容性

**問題**：
1. 現有的 14 個 Facet（每個只有 2-3 題）如何處理？是否需要立即升級到 8 題？
2. 現有的 `weighted_sum` 模型如何與 V3 模型共存？
3. 是否需要建立遷移策略？

**背景資料**：
- 現有 Facet：14 個，每個只有 2-3 題（MVP 範例）
- 現有模型：`weighted_sum`（`engine/score_facet.py`）

---

## ✅ 可直接整合的部分

以下部分可以直接整合到現有文件：

1. **八大領域覆蓋方案** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1
2. **P0-4.5 分流系統整合** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1
3. **UI/Engine 契約** → `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`

---

## 📦 建議行動

1. **立即整合**：將合格部分寫入對應 SSOT 文件
2. **生成追問包**：建立完整的追問包，包含所有背景資料
3. **等待裁示**：等待使用者對追問包的回應
4. **後續整合**：根據裁示結果，完成剩餘部分的整合

---

**審核者**：Cursor（總指揮）  
**審核日期**：2026-01-12
