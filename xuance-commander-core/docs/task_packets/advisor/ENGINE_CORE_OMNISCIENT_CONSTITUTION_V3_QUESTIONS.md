# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3 追問包

**建立日期**：2026-01-12  
**狀態**：OPEN  
**關聯文件**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`（GPT V3 處理後版本）  
**審核報告**：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_AUDIT.md`

---

## 📋 追問包說明

本追問包針對 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`（GPT V3 處理後版本）中需要進一步確認的關鍵問題，提供完整的背景資料，供顧問團隊進行決策。

**使用方式**：
- 顧問團隊應基於本追問包提供的背景資料，針對每個問題提供明確的裁示
- 裁示結果將直接影響系統實作，請務必謹慎考慮

---

## 🎯 第一部分：完整背景資料

### 1.1 專案核心目標與限制

**SSOT**：`charter/CHARTER.md`

#### 最高目標
- 打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- 核心策略：核心引擎可審計；外層以東方命理敘事呈現；對使用者提供可執行建議與風險鏈
- **世界級水準**：質感、互動、敘事、穩定、可維護
- **國際市場**：CN/EN 雙語，可直接接軌國際市場
- **全覆蓋**：全世界、全年齡、全文化、全性別、全困擾、全問題場景

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

### 1.2 當前系統狀態

#### 已完成的規格文件
1. ✅ `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 引擎核心邏輯規格（V3.0）
2. ✅ `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 最終技術裁示（工程定錨級）
3. ✅ `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
4. ✅ `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策文件
5. ✅ `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計

#### 當前實作狀態
- `engine/score_facet.py`：GPT V3 已提供完整實作（支援 weighted_sum 和 vector_state_v3）
- `engine/cascade_calculator.py`：GPT V3 已提供完整實作
- `engine/narrative_guard.py`：GPT V3 已提供完整實作
- `tests/test_v3_scoring.py`：GPT V3 已提供測試
- `domain/facets/*.scoring.v1.0.json`：GPT V3 已提供兩個新 Facet 範例（burnout_syndrome, deep_depression）

#### 當前 Schema 結構
- `schemas/domain_manifest.schema.json`：GPT V3 已更新（新增 domainKey, questionSet, scoringModel）
- `schemas/compiled_facet.schema.json`：GPT V3 已更新（新增 domainKey, questionSet）
- `domain/domains/bagua.domain_map.v1.0.json`：GPT V3 已提供 Domain 配置文件範例

---

### 1.3 關鍵技術裁示（DIRECTIVE REV.B）

**SSOT**：`docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`

#### 缺失 Priors 的 Rigidity 預設值

**DIRECTIVE REV.B Section 1.2**：
```python
if not profile:
    return 0.0  # 缺失時預設 Rigidity = 0
```

**CONSTITUTION Section 7.2**：
```json
"rigidity_default_when_missing": 0.50  // MIXED default
```

**engine/score_facet.py**：
```python
def calculate_rigidity(profile: Optional[Dict[str, Any]], default_when_missing: float = 0.5) -> float:
    if not profile:
        return float(default_when_missing)
```

**衝突**：三個地方對缺失 Priors 的 Rigidity 預設值不一致。

---

### 1.4 GPT V3 處理後的成果

**已完成的項目**：
- ✅ 修補了 CONSTITUTION 文件中的 placeholder
- ✅ 更新了 schemas（新增 domainKey/questionSet/scoringModel）
- ✅ 補齊了 V3 引擎最小實作與測試
- ✅ 提供了兩個新的 Facet 範例（burnout_syndrome, deep_depression）
- ✅ 提供了 i18n 範例（中英文題目）
- ✅ 提供了完整的實作文件（engine/, tests/）

---

## ❓ 第二部分：關鍵追問問題

### 追問 1：缺失 Priors 的 Rigidity 預設值（PRIORITY: HIGH）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 7.2：`rigidity_default_when_missing = 0.50`（MIXED default）
- `DIRECTIVE-2026-01-12-02-REV.B.md` Section 1.2：缺失時預設 `Rigidity = 0.0`
- `engine/score_facet.py`：`calculate_rigidity` 函數的 `default_when_missing` 參數預設值是 0.5

**問題**：
1. **缺失 Priors 時，Rigidity 的預設值應該是 0 還是 0.50？**
   - 選項 A：採用 0.0（符合 DIRECTIVE REV.B）
     - **理由**：DIRECTIVE REV.B 是技術裁示文件，具有更高的權威性；缺失 Priors 時，不應該假設使用者的歸因模式；0.0 是最安全的預設值（避免誤判）
   - 選項 B：採用 0.50（符合 CONSTITUTION，視為 MIXED default）
     - **理由**：CONSTITUTION 是最新的整合規格；0.50 代表「混合歸因」，是一個中性的假設；符合「缺失資訊時使用中等風險」的保守策略
   - 選項 C：採用其他值（請說明理由）

2. **如果採用 0.50，是否需要建立 ADR 說明原因？**
   - 選項 A：需要建立 ADR 說明為何改為 0.50
   - 選項 B：不需要，直接更新 DIRECTIVE REV.B
   - 選項 C：兩個值都支援，透過配置選擇

3. **如何處理現有實作中的不一致？**
   - 選項 A：統一為 0.0，更新 CONSTITUTION 和 engine/score_facet.py
   - 選項 B：統一為 0.50，更新 DIRECTIVE REV.B
   - 選項 C：保持可配置，但需要明確預設值

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` Section 1.2
- `engine/score_facet.py` - `calculate_rigidity` 函數
- `docs/adr/ADR_0005_vector_state_scoring_engine.md`

---

### 追問 2：Domain Schema 定義（PRIORITY: MEDIUM）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` 提供了 Domain JSON 範例，但沒有提供完整的 Schema 定義
- GPT V3 處理後的 ZIP 包中已有 `domain/domains/bagua.domain_map.v1.0.json` 範例

**問題**：
1. **是否需要建立 `schemas/domain.schema.json` 來定義 Domain 配置文件的結構？**
   - 選項 A：建立完整的 Domain Schema
   - 選項 B：不需要，使用 JSON 範例作為參考即可
   - 選項 C：建立簡化的 Schema（只定義必填欄位）

2. **Domain Schema 應該包含哪些必填欄位？**
   - 根據範例：`domainKey`, `trigram`, `element`, `labels`, `routing_hints`, `default_facets`
   - **問題**：哪些是必填？哪些是可選？

3. **Domain 配置文件的命名規範是什麼？**
   - 範例：`bagua.domain_map.v1.0.json`
   - **問題**：是否所有 Domain 都放在同一個文件中？還是每個 Domain 一個文件？

**相關文件**：
- `domain/domains/bagua.domain_map.v1.0.json` - GPT V3 處理後的範例
- `schemas/domain_manifest.schema.json` - 現有 Facet manifest schema
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - Domain 外置化決策

---

### 追問 3：世界級增強建議的實作細節（PRIORITY: MEDIUM）

**問題背景**：
- 專案目標：世界級水準、國際市場、全文化、全年齡
- GPT V3 提供了 i18n 範例，但沒有詳細的實作規格

**問題**：

#### 3.1 多語言本地化策略（i18n）

1. **是否需要建立詳細的 i18n 實作規格？**
   - 選項 A：建立完整的 i18n 實作規格文件
   - 選項 B：在現有文件中補強 i18n 相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **哪些欄位需要多語言？**
   - 選項 A：所有使用者可見的文字（題目、選項、敘事、建議、風險鏈）
   - 選項 B：只針對關鍵欄位（敘事、建議）
   - 選項 C：逐步擴充（先從敘事開始）

3. **如何處理現有欄位？**
   - 選項 A：批次遷移所有現有欄位為多語言結構
   - 選項 B：新欄位使用多語言結構，舊欄位保持單一語言
   - 選項 C：建立遷移計劃，逐步更新

#### 3.2 可訪問性規範（A11y）

1. **是否需要建立詳細的 A11y 規範？**
   - 選項 A：建立完整的 A11y 規範文件
   - 選項 B：在現有文件中補強 A11y 相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保符合 WCAG 2.1 AA 標準？**
   - 選項 A：建立完整的 WCAG 2.1 AA 檢查清單
   - 選項 B：建立自定義的 A11y 標準
   - 選項 C：兩者都需要

3. **哪些元件需要 ARIA labels？**
   - 選項 A：所有互動元件（八卦轉輪、符號雲、萬象羅盤等）
   - 選項 B：只針對關鍵互動元件
   - 選項 C：逐步擴充

#### 3.3 數據隱私與合規策略

1. **是否需要建立詳細的數據隱私與合規策略？**
   - 選項 A：建立完整的數據隱私與合規策略文件
   - 選項 B：在現有文件中補強隱私相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保符合 GDPR、CCPA 等隱私法規？**
   - 選項 A：建立隱私政策實施標準
   - 選項 B：建立數據處理合規檢查清單
   - 選項 C：兩者都需要

3. **Birth Data 的處理策略是什麼？**
   - 選項 A：Server 端處理，短期存留後清除
   - 選項 B：Client 端處理，只上傳 Root Element
   - 選項 C：兩者都支援，由產品策略決定

#### 3.4 效能與擴展性策略

1. **是否需要建立效能與擴展性策略？**
   - 選項 A：建立完整的效能與擴展性策略文件
   - 選項 B：在現有文件中補強效能相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保系統在大量使用者同時使用時仍能保持「準到發毛」的體驗？**
   - 選項 A：建立效能基準和負載測試標準
   - 選項 B：建立擴展性架構設計
   - 選項 C：兩者都需要

#### 3.5 文化適應性策略

1. **是否需要建立文化適應性策略？**
   - 選項 A：建立完整的文化適應性策略文件
   - 選項 B：在現有文件中補強文化相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保不同文化背景的使用者都能理解和使用系統？**
   - 選項 A：建立文化背景的隱喻映射表
   - 選項 B：建立文化適應的敘事模板
   - 選項 C：兩者都需要

**相關文件**：
- `charter/CHARTER.md` - 專案憲章（世界級水準、國際市場）
- `docs/adr/ADR_0003_world_class_bilingual_global_market.md` - 世界級 + CN/EN 決策

---

## 📊 第三部分：建議的裁示選項

### 建議 1：缺失 Priors 的 Rigidity 預設值

**建議選項**：選項 A（採用 0.0，符合 DIRECTIVE REV.B）

**理由**：
- DIRECTIVE REV.B 是技術裁示文件，具有更高的權威性
- 缺失 Priors 時，不應該假設使用者的歸因模式
- 0.0 是最安全的預設值（避免誤判）
- 如果需要改為 0.50，應該建立 ADR 說明原因

**需要執行的行動**：
- 更新 CONSTITUTION Section 7.2：改為 `rigidity_default_when_missing = 0.0`
- 更新 engine/score_facet.py：改為 `default_when_missing: float = 0.0`
- 更新所有 Facet 的 scoring 配置：移除或更新 `rigidity_default_when_missing` 參數

---

### 建議 2：Domain Schema 定義

**建議選項**：選項 A（建立完整的 Domain Schema）

**理由**：
- 符合 SSOT 原則（Domain element 作為獨立配置）
- 完整的 Schema 定義可以確保數據一致性
- 便於驗證和維護

---

### 建議 3：世界級增強建議

**建議選項**：所有增強建議都應該建立（選項 A）

**理由**：
- 符合專案目標（世界級水準、國際市場、全文化、全年齡）
- 這些增強建議可以讓系統超脫最終目標，達到真正的世界級水準
- 提前規劃可以避免後續重構

---

## 📋 第四部分：待裁示問題清單

### 必須裁示的問題（PRIORITY: HIGH）

1. ⭐⭐⭐ **缺失 Priors 的 Rigidity 預設值**：應該是 0 還是 0.50？

### 建議裁示的問題（PRIORITY: MEDIUM）

2. ⭐⭐ **Domain Schema 定義**：是否需要建立完整的 Domain Schema？
3. ⭐⭐ **世界級增強建議的實作細節**：是否需要建立詳細的實作規格？

---

## ✅ 第五部分：可直接整合的部分

以下部分已經過審核，可以直接整合到現有文件：

1. ✅ **八大領域標準映射** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 0.3（更新）
2. ✅ **Domain 數據儲存決策** → 已建立 `domain/domains/bagua.domain_map.v1.0.json`
3. ✅ **題目設計聖典** → `domain/knowledge_base/question_design_guidelines.v1.0.md`（補強）
4. ✅ **V3 運算引擎核心** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 3（補強）
5. ✅ **V3 引擎實作** → `engine/score_facet.py`（可直接使用）
6. ✅ **V3 測試** → `tests/test_v3_scoring.py`（可直接使用）
7. ✅ **跨域擴散引擎** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.2（補強）
8. ✅ **Cascade 實作** → `engine/cascade_calculator.py`（可直接使用）
9. ✅ **Cascade 覆寫表** → `domain/cascade/cascade_overrides.v1.0.json`（可直接使用）
10. ✅ **詞彙治理** → `engine/narrative_guard.py`（可直接使用）
11. ✅ **使用者背景資料策略** → `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1（補強）
12. ✅ **向後相容與遷移** → `docs/ops/TASK_STATUS.md`（補強）
13. ✅ **Schema 更新** → 可直接使用更新後的 schema
14. ✅ **新 Facet 範例** → 可直接作為其他 Facet 的參考範例

---

**建立日期**：2026-01-12  
**狀態**：OPEN  
**等待裁示**：使用者對追問問題的回應
