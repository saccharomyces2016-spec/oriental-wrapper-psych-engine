# ENGINE_CORE_OMNISCIENT_MATRIX 追問包

**建立日期**：2026-01-12  
**狀態**：OPEN  
**關聯文件**：`ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md`  
**審核報告**：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_MATRIX_AUDIT.md`

---

## 📋 追問包說明

本追問包針對 `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md` 中需要進一步確認的關鍵問題，提供完整的背景資料，供顧問團隊進行決策。

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
3. ✅ `docs/adr/ADR_0005_vector_state_scoring_engine.md` - 架構決策文件
4. ✅ `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計

#### 當前實作狀態
- `engine/score_facet.py`：只支援 `weighted_sum` 模型，尚未實作 V3
- `domain/facets/*.scoring.v1.0.json`：9 個 Facet 的評分配置（使用 `weighted_sum`）
- `domain/questions/*.questions.v1.0.json`：14 個 Facet 的題目定義（每個只有 2-3 題，MVP 範例）

---

### 1.3 關鍵技術裁示（DIRECTIVE REV.C+）

**SSOT**：`docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`

#### 裁示 1：Schema 擴充與排除邏輯
- **唯一允許的方案**：選項 A（顯式宣告）
- **禁止**：自動推導 / 隱性判斷
- **Schema 擴充**：在 `scoring.inputs[]` 中新增 `exclude_from_volatility` 欄位

#### 裁示 2：驗證題定義
- **驗證題**：是一種敘事與信任建構元件，而不是心理狀態測量元件
- **工程識別方式**：一律透過 `exclude_from_volatility: true` 明確標記
- **運算地位**：
  - Severity：✅ 參與
  - Volatility：❌ 排除
  - Rigidity：❌ 不直接影響

---

### 1.4 Rigidity Index 計算公式（DIRECTIVE REV.B）

**SSOT**：`docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`

#### 三層計算模型

**Layer A — 歸因結構基底**：
| Locus | Subtype | Base Rigidity |
|-------|---------|---------------|
| EXTERNAL | FATE | 1.0 |
| EXTERNAL | CONTEXT | 0.6 |
| MIXED | (Any) | 0.5 |
| INTERNAL | OVERLOAD | 0.3 |
| INTERNAL | DEFICIT | 0.1 |

**Layer B — 能動性修正**：
| Agency Level | Modifier |
|--------------|----------|
| HIGH | × 0.8 |
| MEDIUM | × 0.9 |
| LOW | × 1.0 |

**Layer C — 最終計算公式**：
```python
def calculate_rigidity(profile: dict) -> float:
    base = get_base_rigidity(profile["locus"], profile["subtype"])
    modifier = get_agency_modifier(profile["agency_level"])
    return round(min(base * modifier, 1.0), 2)
```

---

### 1.5 題目設計規範（ENGINE_CORE_LOGIC_MASTER_V3）

**SSOT**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2.2

#### 題目類型配比
每個 Facet 建議 6-10 題，結構如下：
- **Core State (30%)**：直接測量核心變數
- **Symptom/Validation (20%)**：驗證題，詢問具體生理/行為徵兆
- **Reaction (30%)**：測量面對壓力的直覺反應
- **Resources (20%)**：測量外部支持系統

---

### 1.6 P0-5 UI 架構（使用者背景資料收集）

**SSOT**：`specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1

#### Layer 1：使用者錨定層
**資料輸入**：
- 姓名（顯示用，可選）
- 性別（語氣與隱喻微調，可選）
- 出生年月日（目前僅收集，不解讀，必須）

**資料處理**：
- 儲存使用者資訊
- 供後續 Layer 使用（個人化稱呼）

**注意**：出生年月日用於計算 Root Element（`engine/root_element_mapper.py`），用於五行碰撞計算。

---

## ❓ 第二部分：關鍵追問問題

### 追問 1：題目數量規範（PRIORITY: HIGH）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md` 聲稱：「Each Facet = 8 questions exactly」
- 現有規格（`ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2.2）：建議 6-10 題
- 現有實作：14 個 Facet，每個只有 2-3 題（MVP 範例）

**問題**：
1. **是否要強制所有 Facet 都必須是 8 題？**
   - 選項 A：強制 8 題，不允許例外
   - 選項 B：允許 6-10 題的彈性，但建議 8 題
   - 選項 C：根據 Facet 複雜度決定題數，但必須符合配比

2. **如果某個 Facet 需要更多題目才能「準到發毛」，是否允許例外？**
   - 選項 A：不允許，所有 Facet 必須是 8 題
   - 選項 B：允許，但需要 ADR 批准
   - 選項 C：允許，只要符合配比即可

3. **8 題制的配比（3+2+2+1）是否要調整為更符合 30%/20%/30%/20%？**
   - 當前配比：Core State 3 (37.5%), Validation 2 (25%), Reaction 2 (25%), Resource 1 (12.5%)
   - 目標配比：Core State 30%, Validation 20%, Reaction 30%, Resources 20%
   - 選項 A：調整為 3+2+2+1（最接近目標配比）
   - 選項 B：調整為 3+2+2+1（但允許微調）
   - 選項 C：保持 8 題制，但允許其他題數（如 10 題：3+2+3+2）

**相關文件**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 2.2
- `domain/knowledge_base/question_design_guidelines.v1.0.md`

---

### 追問 2：V3 引擎計算公式完整性（PRIORITY: HIGH）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md` 只提供了簡化的計算公式
- DIRECTIVE REV.B 提供了完整的 Rigidity 計算公式（3 層模型）
- DIRECTIVE REV.C+ 提供了 Volatility 的排除規則

**問題**：
1. **Rigidity 的具體計算公式是什麼？**
   - 選項 A：採用 DIRECTIVE REV.B 的 3 層模型（Layer A/B/C）
   - 選項 B：簡化為單一公式（如：`EXTERNAL_FATE = 1.0, others = 0.5`）
   - 選項 C：採用其他計算方式

2. **Volatility 的正規化規則是什麼？**
   - DIRECTIVE REV.B 要求：所有答案必須先轉為「語義一致」的 0–1 值
   - 正規化公式：
     - 0–4, `higher_is_worse` → `v / 4.0`
     - 0–4, `higher_is_worse_reversed` → `(4 - v) / 4.0`
   - **問題**：是否要完全遵循 DIRECTIVE REV.B 的正規化規則？

3. **Debug Payload 的完整結構是什麼？**
   - DIRECTIVE REV.B 要求必須包含 `_meta` 欄位
   - 預期結構：
     ```json
     {
       "_meta": {
         "raw_score": 0.65,
         "final_score": 0.68,
         "volatility": 0.25,
         "rigidity": 0.45,
         "params": {...},
         "intermediate": {...}
       }
     }
     ```
   - **問題**：是否需要包含完整的 Debug Payload？結構如何定義？

4. **參數配置化的預設值是什麼？**
   - DIRECTIVE REV.B 要求：`volatility_thresholds` 和 `rigidity_weight` 必須可配置
   - **問題**：預設值是什麼？
     - `volatility_thresholds`: [0.15, 0.35]？
     - `rigidity_weight`: 0.1？

**相關文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md`
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md`
- `docs/adr/ADR_0005_vector_state_scoring_engine.md`

---

### 追問 3：跨域擴散引擎實作細節（PRIORITY: MEDIUM）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md` 提供了跨域擴散的概念和 4 個範例
- 但缺少完整的實作細節

**問題**：
1. **觸發條件是 `final_score > 0.8` 還是 `raw_score > 0.8`？**
   - 選項 A：使用 `final_score`（已考慮 Rigidity）
   - 選項 B：使用 `raw_score`（未考慮 Rigidity）
   - 選項 C：同時考慮 `final_score` 和 `volatility`

2. **是否需要完整的 8×8 五行生剋傳導矩陣？**
   - 文件只提供了 4 個範例（坤→坎、離→乾、坎→離、巽→坤）
   - **問題**：是否需要完整的 8×8 矩陣？還是只針對特定組合？
   - 選項 A：完整的 8×8 矩陣（所有可能的傳導路徑）
   - 選項 B：只針對高風險組合（如：財運→情緒、過勞→頭痛）
   - 選項 C：動態計算（根據五行生剋規則即時計算）

3. **跨域擴散的敘事如何確保符合詞彙白名單/黑名單？**
   - 現有詞彙管理：
     - `vocabulary_metaphysical.v1.0.json` - 白名單
     - `forbidden_terms.v1.0.json` - 黑名單
   - **問題**：跨域擴散的敘事是否需要通過詞彙檢查？
   - 選項 A：必須通過詞彙檢查（與 Facet 敘事相同）
   - 選項 B：允許使用擴展詞彙（但需符合玄學語境）
   - 選項 C：使用預定義的敘事模板（確保符合規範）

4. **實作架構如何設計？**
   - 文件說「server-side only」
   - **問題**：是在 `score_facet.py` 中實作，還是獨立的模組？
   - 選項 A：整合到 `score_facet.py`（在計算完成後觸發）
   - 選項 B：獨立模組（`engine/cascade_calculator.py`）
   - 選項 C：整合到 Facet 的 `riskchains` 結構中

**相關文件**：
- `docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md`
- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json`
- `domain/knowledge_base/forbidden_terms.v1.0.json`

---

### 追問 4：使用者背景資料策略整合（PRIORITY: MEDIUM）

**問題背景**：
- `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md` 提出「Role Archetype」策略
- 現有 P0-5 UI 架構要求收集出生年月日（用於 Root Element 計算）

**問題**：
1. **是否要修改 P0-5 UI 架構的 Layer 1？**
   - 選項 A：完全替換為 Role Archetype（移除出生年月日）
   - 選項 B：同時收集 Role Archetype 和出生年月日
   - 選項 C：保留出生年月日，新增 Role Archetype 作為可選項

2. **是否要保留出生年月日的收集？**
   - 出生年月日用於計算 Root Element（`engine/root_element_mapper.py`）
   - Root Element 用於五行碰撞計算（`engine/collision_calculator.py`）
   - **問題**：如果移除出生年月日，Root Element 如何計算？
   - 選項 A：保留出生年月日，Role Archetype 作為補充
   - 選項 B：移除出生年月日，改用 Role Archetype 推導 Root Element
   - 選項 C：兩者並存，但 Role Archetype 優先

3. **Role Archetype 和 Root Element 如何整合？**
   - Role Archetype：影響 `volatility_thresholds`
   - Root Element：影響五行碰撞計算
   - **問題**：兩套系統的優先級是什麼？
   - 選項 A：Role Archetype 優先，Root Element 作為補充
   - 選項 B：Root Element 優先，Role Archetype 作為補充
   - 選項 C：兩者獨立，互不影響

**相關文件**：
- `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` Layer 1
- `engine/root_element_mapper.py`
- `engine/collision_calculator.py`

---

### 追問 5：向後相容性（PRIORITY: MEDIUM）

**問題背景**：
- 現有 14 個 Facet，每個只有 2-3 題（MVP 範例）
- 現有模型：`weighted_sum`（`engine/score_facet.py`）
- 新方案要求：8 題制 + V3 模型

**問題**：
1. **現有的 14 個 Facet 如何處理？**
   - 選項 A：立即升級到 8 題（需要大量內容工作）
   - 選項 B：保持現狀，新 Facet 使用 8 題制
   - 選項 C：逐步遷移（先升級高優先級 Facet）

2. **現有的 `weighted_sum` 模型如何與 V3 模型共存？**
   - ADR_0005 要求：向後相容，V1/V2 Facet 不得被迫升級
   - **問題**：是否需要同時支援兩種模型？
   - 選項 A：同時支援（策略模式，根據 `scoring.model` 選擇）
   - 選項 B：只支援 V3（強制所有 Facet 升級）
   - 選項 C：V3 作為擴充，但 `weighted_sum` 仍為預設

3. **是否需要建立遷移策略？**
   - 選項 A：建立完整的遷移計劃（時間表、優先級、驗收標準）
   - 選項 B：不建立遷移計劃（讓 Facet 自然演進）
   - 選項 C：建立部分遷移計劃（只針對關鍵 Facet）

**相關文件**：
- `docs/adr/ADR_0005_vector_state_scoring_engine.md`
- `engine/score_facet.py`
- `domain/facets/*.scoring.v1.0.json`

---

## 📊 第三部分：建議的裁示選項

### 建議 1：題目數量規範

**建議選項**：選項 B（允許 6-10 題的彈性，但建議 8 題）

**理由**：
- 符合現有規格（6-10 題）
- 8 題制是一個好的基準，但不應過於僵化
- 允許根據 Facet 複雜度調整

---

### 建議 2：V3 引擎計算公式

**建議選項**：完全採用 DIRECTIVE REV.B 和 REV.C+ 的規格

**理由**：
- DIRECTIVE REV.B 和 REV.C+ 已經過完整審核和裁示
- 提供了完整的計算公式和實作細節
- 符合「工程定錨級」的要求

---

### 建議 3：跨域擴散引擎

**建議選項**：
- 觸發條件：使用 `final_score > 0.8`
- 傳導矩陣：完整的 8×8 五行生剋矩陣
- 敘事檢查：必須通過詞彙檢查
- 實作架構：獨立模組（`engine/cascade_calculator.py`）

**理由**：
- `final_score` 已考慮 Rigidity，更能反映真實風險
- 完整矩陣確保覆蓋所有可能的傳導路徑
- 詞彙檢查確保符合玄學語境
- 獨立模組便於維護和測試

---

### 建議 4：使用者背景資料策略

**建議選項**：選項 B（同時收集 Role Archetype 和出生年月日）

**理由**：
- 保留現有功能（Root Element 計算）
- 新增 Role Archetype 功能（Volatility 調整）
- 兩者可以並存，互不衝突

---

### 建議 5：向後相容性

**建議選項**：
- Facet 處理：選項 C（逐步遷移）
- 模型共存：選項 A（同時支援）
- 遷移策略：選項 A（建立完整遷移計劃）

**理由**：
- 符合 ADR_0005 的向後相容要求
- 降低遷移風險
- 確保系統穩定性

---

## 📋 第四部分：待裁示問題清單

### 必須裁示的問題（PRIORITY: HIGH）

1. ⭐⭐⭐ **題目數量規範**：是否強制 8 題？還是允許 6-10 題？
2. ⭐⭐⭐ **V3 引擎計算公式**：是否採用 DIRECTIVE REV.B 的完整公式？
3. ⭐⭐ **Debug Payload**：是否需要包含完整的 `_meta` 欄位？

### 建議裁示的問題（PRIORITY: MEDIUM）

4. ⭐⭐ **跨域擴散觸發條件**：使用 `final_score` 還是 `raw_score`？
5. ⭐⭐ **跨域擴散傳導矩陣**：是否需要完整的 8×8 矩陣？
6. ⭐⭐ **使用者背景資料整合**：Role Archetype 和出生年月日如何整合？
7. ⭐ **向後相容性策略**：現有 Facet 如何處理？

---

## ✅ 第五部分：可直接整合的部分

以下部分已經過審核，可以直接整合到現有文件：

1. ✅ **八大領域覆蓋方案** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1
2. ✅ **P0-4.5 分流系統整合** → `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` Section 1
3. ✅ **UI/Engine 契約** → `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`

---

**建立日期**：2026-01-12  
**狀態**：OPEN  
**等待裁示**：使用者對追問問題的回應
