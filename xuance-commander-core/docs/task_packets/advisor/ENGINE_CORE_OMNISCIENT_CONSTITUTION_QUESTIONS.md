# ENGINE_CORE_OMNISCIENT_CONSTITUTION 追問包

**建立日期**：2026-01-12  
**狀態**：OPEN  
**關聯文件**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`  
**審核報告**：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_AUDIT.md`

---

## 📋 追問包說明

本追問包針對 `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` 中需要進一步確認的關鍵問題，提供完整的背景資料，供顧問團隊進行決策。

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
- `domain/manifests/*.v1.0.json`：Facet manifest 文件（沒有獨立的 domain 配置文件）

#### 當前 Schema 結構
- `schemas/domain_manifest.schema.json`：Facet manifest schema
- `schemas/compiled_facet.schema.json`：Compiled facet schema
- **沒有**獨立的 domain 配置文件 schema

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
"rigidity": 0.50  // MIXED default
```

**衝突**：兩個文件對缺失 Priors 的 Rigidity 預設值不一致。

---

### 1.4 當前 Domain 結構

**現有系統**：
- 只有 Facet manifest（`domain/manifests/*.v1.0.json`）
- 沒有獨立的 domain 配置文件
- Facet manifest 只包含：`domainVersion`, `facetId`, `sources`

**CONSTITUTION 要求**：
- 每個 Domain 必須配置 `domain.element`（金木水火土），且為 SSOT
- 需要建立 `domain/domains/*.domain.v1.0.json` 結構

---

## ❓ 第二部分：關鍵追問問題

### 追問 1：Domain Element 儲存結構（PRIORITY: HIGH）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` 要求：每個 Domain 必須配置 `domain.element`（金木水火土），且為 SSOT
- 現有系統：沒有獨立的 domain 配置文件，只有 facet manifest

**問題**：
1. **是否需要建立新的 `domain/domains/*.domain.v1.0.json` 結構？**
   - 選項 A：建立獨立的 domain 配置文件
   - 選項 B：在 Facet manifest 中新增 `domainKey` 和 `element` 欄位
   - 選項 C：在 compiled facet 中新增 `domain` 欄位

2. **如何在 Facet manifest 中引用 Domain Key？**
   - 選項 A：在 Facet manifest 中新增 `domainKey` 欄位（如 `"domainKey": "kun"`）
   - 選項 B：透過 Facet ID 推導（如 `income_expansion_pressure` → `kun`）
   - 選項 C：建立獨立的 domain 配置文件，Facet manifest 引用 domain ID

3. **Domain element 的 Schema 如何定義？**
   - 選項 A：建立新的 `schemas/domain.schema.json`
   - 選項 B：擴充現有的 `schemas/domain_manifest.schema.json`
   - 選項 C：在 compiled facet schema 中新增 `domain` 欄位

**相關文件**：
- `schemas/domain_manifest.schema.json` - 現有 Facet manifest schema
- `domain/manifests/stress_recovery.v1.0.json` - 現有 Facet manifest 範例
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - Domain 外置化決策

---

### 追問 2：缺失 Priors 的 Rigidity 預設值（PRIORITY: MEDIUM）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 7.2：`rigidity=0.50`（MIXED default）
- `DIRECTIVE-2026-01-12-02-REV.B.md` Section 1.2：缺失時預設 `Rigidity = 0`

**問題**：
1. **缺失 Priors 時，Rigidity 的預設值應該是 0 還是 0.50？**
   - 選項 A：採用 0（符合 DIRECTIVE REV.B）
   - 選項 B：採用 0.50（符合 CONSTITUTION，視為 MIXED default）
   - 選項 C：採用其他值（請說明理由）

2. **如果採用 0.50，是否需要建立 ADR 說明原因？**
   - 選項 A：需要建立 ADR 說明為何改為 0.50
   - 選項 B：不需要，直接更新 DIRECTIVE REV.B
   - 選項 C：兩個值都支援，透過配置選擇

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` Section 1.2
- `docs/adr/ADR_0005_vector_state_scoring_engine.md`

---

### 追問 3：10 題擴展模板的 Schema 擴充（PRIORITY: MEDIUM）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 2.2.2：`scoring.question_set = "DECET_10"` 用於 10 題擴展模板
- 現有 schema：`compiled_facet.schema.json` 和 `domain_manifest.schema.json` 沒有這個欄位

**問題**：
1. **是否需要更新 `compiled_facet.schema.json` 和 `domain_manifest.schema.json`？**
   - 選項 A：更新兩個 schema，新增 `question_set` 欄位
   - 選項 B：只在 `scoring` 物件中新增 `question_set` 欄位
   - 選項 C：不需要，透過題目數量自動推導

2. **`scoring.question_set` 欄位的預設值是什麼？**
   - 選項 A：預設 `"OCTET_8"`（8 題標準模板）
   - 選項 B：預設 `null`（未指定時使用 8 題模板）
   - 選項 C：必須顯式指定（不允許預設值）

**相關文件**：
- `schemas/compiled_facet.schema.json` - Compiled facet schema
- `schemas/domain_manifest.schema.json` - Domain manifest schema
- `docs/adr/ADR_0001_externalize_domain_and_version_schema.md` - Schema 版本化決策

---

### 追問 4：標準差模式的 ADR 更新（PRIORITY: LOW）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 3.3：`volatility_stddev_mode: "sample"`，並要求「一經決定寫入 ADR_0005 附錄」
- 現有 ADR_0005：沒有提到標準差模式

**問題**：
1. **是否需要更新 ADR_0005，新增標準差模式的決策記錄？**
   - 選項 A：更新 ADR_0005，新增標準差模式的決策記錄
   - 選項 B：建立新的 ADR（如 ADR_0006）
   - 選項 C：不需要，只在 CONSTITUTION 中記錄即可

**相關文件**：
- `docs/adr/ADR_0005_vector_state_scoring_engine.md` - V3 引擎架構決策

---

### 追問 5：世界級水準增強建議（PRIORITY: MEDIUM）

**問題背景**：
- 專案目標：世界級水準、國際市場、全文化、全年齡
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`：沒有詳細的增強策略

**問題**：

#### 5.1 多語言本地化策略

1. **是否需要建立多語言本地化策略？**
   - 選項 A：建立完整的多語言本地化策略文件
   - 選項 B：在現有文件中補強多語言相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保不同語言版本的「準到發毛」體驗？**
   - 選項 A：建立多語言詞彙映射表
   - 選項 B：建立多語言敘事模板庫
   - 選項 C：兩者都需要

#### 5.2 文化適應性策略

1. **是否需要建立文化適應性策略？**
   - 選項 A：建立完整的文化適應性策略文件
   - 選項 B：在現有文件中補強文化相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保不同文化背景的使用者都能理解和使用系統？**
   - 選項 A：建立文化背景的隱喻映射表
   - 選項 B：建立文化適應的敘事模板
   - 選項 C：兩者都需要

#### 5.3 可訪問性規範

1. **是否需要建立可訪問性規範？**
   - 選項 A：建立完整的可訪問性規範文件
   - 選項 B：在現有文件中補強可訪問性相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保視覺、聽覺、認知障礙的使用者都能使用系統？**
   - 選項 A：符合 WCAG 2.1 AA 標準
   - 選項 B：建立自定義的可訪問性標準
   - 選項 C：兩者都需要

#### 5.4 效能與擴展性策略

1. **是否需要建立效能與擴展性策略？**
   - 選項 A：建立完整的效能與擴展性策略文件
   - 選項 B：在現有文件中補強效能相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保系統在大量使用者同時使用時仍能保持「準到發毛」的體驗？**
   - 選項 A：建立效能基準和負載測試標準
   - 選項 B：建立擴展性架構設計
   - 選項 C：兩者都需要

#### 5.5 數據隱私與合規策略

1. **是否需要建立數據隱私與合規策略？**
   - 選項 A：建立完整的數據隱私與合規策略文件
   - 選項 B：在現有文件中補強隱私相關內容
   - 選項 C：暫時不需要，後續再考慮

2. **如何確保系統符合 GDPR、CCPA 等隱私法規？**
   - 選項 A：建立隱私政策實施標準
   - 選項 B：建立數據處理合規檢查清單
   - 選項 C：兩者都需要

**相關文件**：
- `charter/CHARTER.md` - 專案憲章（世界級水準、國際市場）
- `docs/adr/ADR_0003_world_class_bilingual_global_market.md` - 世界級 + CN/EN 決策

---

## 📊 第三部分：建議的裁示選項

### 建議 1：Domain Element 儲存結構

**建議選項**：選項 A + 選項 A（建立獨立的 domain 配置文件 + 在 Facet manifest 中新增 `domainKey` 欄位）

**理由**：
- 符合 SSOT 原則（Domain element 作為獨立配置）
- 便於管理和擴充
- Facet manifest 引用 domain ID，保持清晰的對應關係

---

### 建議 2：缺失 Priors 的 Rigidity 預設值

**建議選項**：選項 A（採用 0，符合 DIRECTIVE REV.B）

**理由**：
- DIRECTIVE REV.B 已經明確裁示
- 缺失 Priors 時，不應該假設使用者的歸因模式
- 如果需要改為 0.50，應該建立 ADR 說明原因

---

### 建議 3：10 題擴展模板的 Schema 擴充

**建議選項**：選項 B（只在 `scoring` 物件中新增 `question_set` 欄位）+ 選項 A（預設 `"OCTET_8"`）

**理由**：
- 保持向後相容（現有 Facet 不需要修改）
- 預設值確保現有系統正常運作

---

### 建議 4：標準差模式的 ADR 更新

**建議選項**：選項 A（更新 ADR_0005，新增標準差模式的決策記錄）

**理由**：
- 符合文件要求（「一經決定寫入 ADR_0005 附錄」）
- 保持決策記錄的完整性

---

### 建議 5：世界級水準增強建議

**建議選項**：所有增強建議都應該建立（選項 A）

**理由**：
- 符合專案目標（世界級水準、國際市場、全文化、全年齡）
- 這些增強建議可以讓系統超脫最終目標，達到真正的世界級水準

---

## 📋 第四部分：待裁示問題清單

### 必須裁示的問題（PRIORITY: HIGH）

1. ⭐⭐⭐ **Domain Element 儲存結構**：是否需要建立新的 domain 配置文件？
2. ⭐⭐ **缺失 Priors 的 Rigidity 預設值**：應該是 0 還是 0.50？
3. ⭐⭐ **10 題擴展模板的 Schema 擴充**：是否需要更新 schema？

### 建議裁示的問題（PRIORITY: MEDIUM）

4. ⭐ **標準差模式的 ADR 更新**：是否需要更新 ADR_0005？
5. ⭐⭐ **世界級水準增強建議**：是否需要建立多語言本地化、文化適應性、可訪問性、效能與擴展性、數據隱私與合規策略？

---

## ✅ 第五部分：可直接整合的部分

以下部分已經過審核，可以直接整合到現有文件：

1. ✅ **八大領域覆蓋方案** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 0.3（更新）
2. ✅ **題目設計聖典** → `domain/knowledge_base/question_design_guidelines.v1.0.md`（補強）
3. ✅ **V3 運算引擎核心** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 3（補強）
4. ✅ **跨域擴散引擎** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.2（補強）
5. ✅ **使用者背景資料策略** → `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1（補強）
6. ✅ **向後相容與遷移** → `docs/ops/TASK_STATUS.md`（補強）
7. ✅ **P0-4.5 Funnel 整合** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1（補強）
8. ✅ **UI/Engine 契約** → `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`（補強）
9. ✅ **風險鏈結構** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 4.1（補強）
10. ✅ **驗收標準** → 可建立獨立的驗收文件

---

**建立日期**：2026-01-12  
**狀態**：OPEN  
**等待裁示**：使用者對追問問題的回應
