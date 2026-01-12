# ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2 追問包

**建立日期**：2026-01-12  
**狀態**：OPEN  
**關聯文件**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`（GPT 處理後版本）  
**審核報告**：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V2_AUDIT.md`

---

## 📋 追問包說明

本追問包針對 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`（GPT 處理後版本）中需要進一步確認的關鍵問題，提供完整的背景資料，供顧問團隊進行決策。

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
- `engine/score_facet.py`：只支援 `weighted_sum` 模型，尚未實作 V3
- `domain/facets/*.scoring.v1.0.json`：9 個 Facet 的評分配置（使用 `weighted_sum`）
- `domain/questions/*.questions.v1.0.json`：14 個 Facet 的題目定義（每個只有 2-3 題，MVP 範例）
- `domain/manifests/*.v1.0.json`：Facet manifest 文件（沒有 `domainId` 欄位）

#### 當前 Schema 結構
- `schemas/domain_manifest.schema.json`：Facet manifest schema（沒有 `domainId` 欄位）
- `schemas/compiled_facet.schema.json`：Compiled facet schema
- **沒有**獨立的 domain schema

---

### 1.3 關鍵技術裁示（DIRECTIVE REV.B）

**SSOT**：`docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`

#### 缺失 Priors 的 Rigidity 預設值

**DIRECTIVE REV.B Section 1.2**：
```python
if not profile:
    return 0.0  # 缺失時預設 Rigidity = 0
```

**CONSTITUTION Section 3.2**：
```python
# 決策：缺失 Priors 時，Rigidity 預設為 0.0 (最安全/無假設)
attribution_profile = priors.get("attribution_profile") if priors else None
rigidity = _calculate_rigidity_3_layer(attribution_profile)
```

**CONSTITUTION Section 7.2**：
```json
"rigidity": 0.0  // 明確為 0.0
```

**狀態**：✅ 已統一為 0.0

---

### 1.4 當前 Domain 結構

**現有系統**：
- 只有 Facet manifest（`domain/manifests/*.v1.0.json`）
- 沒有獨立的 domain 配置文件
- Facet manifest 只包含：`domainVersion`, `facetId`, `sources`

**CONSTITUTION 要求**：
- 建立獨立的 Domain 設定檔（`domain/domains/{domain_id}.domain.v1.0.json`）
- 在 Facet Manifest 中新增 `domainId` 欄位進行連結

**GPT 處理後的成果**：
- ✅ 已建立 `domain/domains/bagua.domain_map.v1.0.json`（在 ZIP 包中）
- ✅ 已提供 Domain Schema 範例

---

## ❓ 第二部分：關鍵追問問題

### 追問 1：Domain Schema 定義（PRIORITY: HIGH）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` 提供了 Domain JSON 範例，但沒有提供完整的 Schema 定義
- GPT 處理後的 ZIP 包中已有 `domain/domains/bagua.domain_map.v1.0.json` 範例

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
- `domain/domains/bagua.domain_map.v1.0.json` - GPT 處理後的範例
- `schemas/domain_manifest.schema.json` - 現有 Facet manifest schema
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - Domain 外置化決策

---

### 追問 2：Facet Manifest Schema 更新（PRIORITY: HIGH）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` 要求 Facet Manifest 中新增 `domainId` 欄位
- 現有 `schemas/domain_manifest.schema.json` 沒有這個欄位
- 現有 Facet Manifest（如 `stress_recovery.v1.0.json`）沒有 `domainId` 欄位

**問題**：
1. **是否需要更新 `schemas/domain_manifest.schema.json`，新增 `domainId` 欄位（必填）？**
   - 選項 A：更新 schema，新增 `domainId` 欄位（必填）
   - 選項 B：更新 schema，新增 `domainId` 欄位（可選，但建議必填）
   - 選項 C：不需要更新 schema，只在文檔中說明

2. **現有 Facet Manifest 如何處理？**
   - 選項 A：批次更新所有現有 Facet Manifest，新增 `domainId` 欄位
   - 選項 B：新 Facet 必須有 `domainId`，舊 Facet 暫時允許缺失
   - 選項 C：建立遷移計劃，逐步更新

3. **`domainId` 欄位的驗證規則是什麼？**
   - 選項 A：必須對應到 `domain/domains/bagua.domain_map.v1.0.json` 中的 `domainKey`
   - 選項 B：允許任意字串，但建議使用標準 Domain Key
   - 選項 C：必須是預定義的 Domain Key 列表

**相關文件**：
- `schemas/domain_manifest.schema.json` - 現有 Facet manifest schema
- `domain/manifests/stress_recovery.v1.0.json` - 現有 Facet manifest 範例
- `domain/domains/bagua.domain_map.v1.0.json` - Domain 配置文件範例

---

### 追問 3：10 題擴展模板的 Schema 擴充（PRIORITY: MEDIUM）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 2.2.2：`scoring.question_set = "DECET_10"` 用於 10 題擴展模板
- 現有 schema：`compiled_facet.schema.json` 和 `domain_manifest.schema.json` 沒有這個欄位

**問題**：
1. **是否需要更新 `schemas/compiled_facet.schema.json` 和 `schemas/domain_manifest.schema.json`？**
   - 選項 A：更新兩個 schema，新增 `question_set` 欄位（可選，預設 `"OCTET_8"`）
   - 選項 B：只在 `scoring` 物件中新增 `question_set` 欄位
   - 選項 C：不需要，透過題目數量自動推導

2. **`scoring.question_set` 欄位的預設值是什麼？**
   - 選項 A：預設 `"OCTET_8"`（8 題標準模板）
   - 選項 B：預設 `null`（未指定時使用 8 題模板）
   - 選項 C：必須顯式指定（不允許預設值）

3. **題數驗證應該在哪個階段進行？**
   - 選項 A：在 compiled 階段進行驗證（避免在 runtime 判斷）
   - 選項 B：在 runtime 進行驗證
   - 選項 C：兩者都需要

**相關文件**：
- `schemas/compiled_facet.schema.json` - Compiled facet schema
- `schemas/domain_manifest.schema.json` - Domain manifest schema
- `engine/compile_domain.py` - Domain 編譯腳本

---

### 追問 4：Role Archetype 的必選性（PRIORITY: MEDIUM）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 5.1：Role Archetype 標記為「必選」
- 之前的裁示（CONSTITUTION Section 5.1）：Role Archetype 為「可選或弱必填（產品策略可調）」
- P0-5 UI 架構目前沒有 Role Archetype 的收集

**問題**：
1. **Role Archetype 是否為必選？還是保持可選或弱必填？**
   - 選項 A：必選（符合新文件要求）
   - 選項 B：可選或弱必填（符合之前裁示）
   - 選項 C：產品策略可調（允許後續調整）

2. **如果需要改為必選，是否需要更新 P0-5 UI 架構？**
   - 選項 A：需要更新 P0-5 UI 架構，將 Role Archetype 設為必填
   - 選項 B：不需要，保持可選，但建議填寫
   - 選項 C：建立 ADR 說明為何改為必選

3. **Role Archetype 的預設值是什麼？**
   - 選項 A：不允許預設值，必須選擇
   - 選項 B：允許預設值（如「未指定」），但會影響計算精度
   - 選項 C：允許預設值，使用標準 volatility_thresholds

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1 - 使用者錨定層
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 5.1 - 使用者背景資料策略

---

### 追問 5：世界級增強建議的實作細節（PRIORITY: MEDIUM）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 7 提到了 i18n、A11y、Compliance，但沒有詳細的實作規格
- 專案目標：世界級水準、國際市場、全文化、全年齡

**問題**：

#### 5.1 多語言本地化策略（i18n）

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

#### 5.2 可訪問性規範（A11y）

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

#### 5.3 數據隱私與合規策略

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

#### 5.4 效能與擴展性策略

1. **是否需要建立效能與擴展性策略？**
   - 選項 A：建立完整的效能與擴展性策略文件
   - 選項 B：在現有文件中補強效能相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保系統在大量使用者同時使用時仍能保持「準到發毛」的體驗？**
   - 選項 A：建立效能基準和負載測試標準
   - 選項 B：建立擴展性架構設計
   - 選項 C：兩者都需要

#### 5.5 文化適應性策略

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

### 建議 1：Domain Schema 定義

**建議選項**：選項 A（建立完整的 Domain Schema）+ 選項 A（所有欄位都必填，除了 `default_facets` 可選）

**理由**：
- 符合 SSOT 原則（Domain element 作為獨立配置）
- 完整的 Schema 定義可以確保數據一致性
- 必填欄位可以確保 Domain 配置的完整性

---

### 建議 2：Facet Manifest Schema 更新

**建議選項**：選項 A（更新 schema，新增 `domainId` 欄位，必填）+ 選項 B（新 Facet 必須有 `domainId`，舊 Facet 暫時允許缺失）

**理由**：
- 保持向後相容（舊 Facet 不需要立即更新）
- 新 Facet 必須符合新規範
- 建立遷移計劃，逐步更新舊 Facet

---

### 建議 3：10 題擴展模板的 Schema 擴充

**建議選項**：選項 B（只在 `scoring` 物件中新增 `question_set` 欄位）+ 選項 A（預設 `"OCTET_8"`）+ 選項 A（在 compiled 階段進行驗證）

**理由**：
- 保持向後相容（現有 Facet 不需要修改）
- 預設值確保現有系統正常運作
- 在 compiled 階段驗證可以提前發現問題

---

### 建議 4：Role Archetype 的必選性

**建議選項**：選項 C（產品策略可調，但建議必填）

**理由**：
- 保持靈活性（允許產品策略調整）
- 建議必填可以確保計算精度
- 如果需要改為必選，可以透過產品策略調整，不需要立即更新架構

---

### 建議 5：世界級增強建議

**建議選項**：所有增強建議都應該建立（選項 A）

**理由**：
- 符合專案目標（世界級水準、國際市場、全文化、全年齡）
- 這些增強建議可以讓系統超脫最終目標，達到真正的世界級水準
- 提前規劃可以避免後續重構

---

## 📋 第四部分：待裁示問題清單

### 必須裁示的問題（PRIORITY: HIGH）

1. ⭐⭐⭐ **Domain Schema 定義**：是否需要建立完整的 Domain Schema？
2. ⭐⭐⭐ **Facet Manifest Schema 更新**：是否需要更新 schema，新增 `domainId` 欄位？

### 建議裁示的問題（PRIORITY: MEDIUM）

3. ⭐⭐ **10 題擴展模板的 Schema 擴充**：是否需要更新 schema？
4. ⭐⭐ **Role Archetype 的必選性**：是否為必選？還是保持可選？
5. ⭐⭐ **世界級增強建議的實作細節**：是否需要建立詳細的實作規格？

---

## ✅ 第五部分：可直接整合的部分

以下部分已經過審核，可以直接整合到現有文件：

1. ✅ **八大領域標準映射** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 0.3（更新）
2. ✅ **Domain 數據儲存決策** → 可建立新的 Domain 配置文件結構
3. ✅ **題目設計聖典** → `domain/knowledge_base/question_design_guidelines.v1.0.md`（補強）
4. ✅ **V3 運算引擎核心** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 3（補強）
5. ✅ **跨域擴散引擎** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.2（補強）
6. ✅ **使用者背景資料策略** → `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1（補強）
7. ✅ **向後相容與遷移** → `docs/ops/TASK_STATUS.md`（補強）
8. ✅ **世界級增強建議** → 可建立獨立的增強策略文件

---

**建立日期**：2026-01-12  
**狀態**：OPEN  
**等待裁示**：使用者對追問問題的回應
