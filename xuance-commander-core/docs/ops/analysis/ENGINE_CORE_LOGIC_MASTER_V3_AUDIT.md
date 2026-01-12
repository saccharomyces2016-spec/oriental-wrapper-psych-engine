# ENGINE_CORE_LOGIC_MASTER_V3 審核報告

**審核日期**：2026-01-12  
**審核文件**：ENGINE_CORE_LOGIC_MASTER_V3_FULL.md  
**審核狀態**：部分符合，部分需追問

---

## 📋 審核摘要

### 整體評估

新文件（ENGINE_CORE_LOGIC_MASTER_V3）提供了更詳細、更技術化的引擎規格，包含：
- 向量狀態評估（Vector State Evaluation）
- Context Schema / Priors 整合
- 動態權重調整
- 特徵錨點（Feature Anchors）
- 三層風險鏈結構
- 動態敘事組裝

**符合度**：約 70% 可直接寫入，30% 需要追問確認

---

## ✅ 符合任務需求的部分（可直接寫入）

### 1. 核心憲章（Section 0）

**內容**：
- 雙層運作原則（科學內核 + 玄學外殼）
- 「準到發毛」的定義（多維度三角定位）
- 鐵律（使用者介面絕不可洩露技術術語）

**符合度**：✅ **100% 符合**
- 與 `charter/CHARTER.md` 完全一致
- 與 `domain/knowledge_base/presentation_guidelines.v1.0.md` 一致

**寫入位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`（新增文件）

---

### 2. 題目系統設計（Section 2）

**內容**：
- 去問卷化設計（象徵性極端選擇）
- 題目類型配比（Core State 30%, Symptom/Validation 20%, Reaction 30%, Resources 20%）

**符合度**：✅ **100% 符合**
- 與 `domain/knowledge_base/question_design_guidelines.v1.0.md` 的「去問卷化」原則一致
- 題目類型配比是新增的詳細說明，可以補充

**寫入位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`

---

### 3. 詞彙與安全治理（Section 6）

**內容**：
- 嚴格白名單機制
- 命定論防禦（Anti-Fatalism Protocol）

**符合度**：✅ **100% 符合**
- 與 `domain/knowledge_base/forbidden_terms.v1.0.json` 一致
- 與 `domain/knowledge_base/presentation_guidelines.v1.0.md` 一致
- 命定論防禦是新增的詳細說明，可以補充

**寫入位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`

---

### 4. 結果呈現與敘事架構（Section 5）

**內容**：
- 動態敘事組裝（Opening, Validation, Diagnosis, Prophecy）
- 建議系統（止損、養護、轉勢）

**符合度**：✅ **90% 符合**
- 可以整合到現有的 L1-L4 分層架構
- 動態敘事組裝是對現有架構的詳細說明
- 建議系統與現有的 recommendations 結構一致

**寫入位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`

**注意**：需要確認動態敘事組裝與 L1-L4 的對應關係

---

## ⚠️ 需要追問的部分

### 1. 核心運算引擎升級（Section 3）

**新內容**：
- 向量狀態評估（Vector State Evaluation）
- Volatility Index（波動指數）
- Rigidity Index（固著指數）
- 運算公式（Python Pseudocode）

**現有系統**：
- 當前使用 `weighted_sum` 模型（`engine/score_facet.py`）
- 只支援簡單的加權總和計算

**衝突點**：
- 新文件提出的是**重大架構升級**，從簡單加權總和升級到向量狀態評估
- 這需要修改 `engine/score_facet.py` 的實作
- 這需要修改 `domain/facets/*.scoring.v1.0.json` 的 schema

**追問問題**：
1. 是否要**取代**現有的 `weighted_sum` 模型，還是作為**擴充**（支援兩種模型）？
2. 是否需要建立 ADR（Architecture Decision Record）來記錄這個架構變更？
3. Volatility Index 和 Rigidity Index 的計算方式是否需要更多細節？
4. 如何處理現有 Facet（如 `stress_recovery`）的遷移？

**建議**：建立追問包，確認架構升級策略

---

### 2. 風險鏈結構（Section 4）

**新內容**：
- 三層連鎖結構：
  - Level 1: Physiological (身) / Soil/Water (土壤與水文)
  - Level 2: Behavioral (事) / Crop/Root (作物與根系)
  - Level 3: Systemic (局) / Climate/Harvest (氣候與收成)

**現有系統**：
- 使用 A/B Framework（`docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md`）
- Framework A: Passive Pressure Accumulation
- Framework B: Active Expansion Overload

**衝突點**：
- 新文件的三層結構與現有的 A/B Framework **結構不同**
- 需要確認：三層結構是**取代** A/B，還是**補充** A/B？
- 兩者如何整合？

**追問問題**：
1. 三層結構與 A/B Framework 的關係是什麼？
2. 是否要將 A/B Framework 映射到三層結構？
3. 如何處理現有 Facet（如 `income_expansion_pressure`）的風險鏈遷移？

**建議**：建立追問包，確認風險鏈結構整合策略

---

### 3. Context Schema / Priors（Section 1）

**新內容**：
- Context Schema 定義：
  ```json
  {
    "priors": {
      "domain_lock": "BAGUA_KUN",
      "object_lock": ["SYMBOL_WALL", "SYMBOL_RAIN"],
      "attribution_mode": "EXTERNAL_FATE",
      "agency_level": 0.3
    }
  }
  ```
- 動態權重調整邏輯

**現有系統**：
- P0-4.5 分流系統有 Stage 1-4 的輸出
- 但沒有明確的 priors schema 定義

**符合度**：✅ **80% 符合**
- Context Schema 可以補充 P0-4.5 的數據格式定義
- 動態權重調整是新功能，需要確認實作細節

**追問問題**：
1. Context Schema 是否要作為 P0-4.5 輸出格式的正式定義？
2. 動態權重調整的具體規則是否需要更多範例？
3. 如何處理沒有 priors 的情況（直接進入 Facet，跳過 P0-4.5）？

**建議**：可以寫入，但需要補充與 P0-4.5 的整合說明

---

### 4. 特徵錨點（Feature Anchors / Combos）（Section 3.3）

**新內容**：
- Combo: [Empty Granary]
- Combo: [Flooded Root]
- 觸發「精準敘事」的特定組合

**現有系統**：
- 沒有特徵錨點的定義

**符合度**：✅ **100% 符合**（新功能）
- 這是新增功能，可以補充

**追問問題**：
1. 特徵錨點是否需要定義在 `domain/facets/*.scoring.v1.0.json` 中？
2. 是否需要更多範例來確保覆蓋面完整？
3. 如何確保特徵錨點與敘事的一致性？

**建議**：可以寫入，但需要補充更多範例和實作細節

---

### 5. 跨域擴散（Cross-Domain Cascade）（Section 4.2）

**新內容**：
- 自動觸發跨 Facet 的警示
- 範例：`income_pressure` 高風險 → 自動觸發 `relationship` 的警示

**現有系統**：
- 沒有跨域擴散機制

**符合度**：✅ **100% 符合**（新功能）
- 這是新增功能，符合「準到發毛」的目標

**追問問題**：
1. 跨域擴散的觸發條件是否需要明確定義？
2. 如何避免過度觸發（避免每個 Facet 都觸發其他 Facet）？
3. 跨域擴散的敘事如何呈現（是否會讓使用者困惑）？

**建議**：可以寫入，但需要補充觸發條件和呈現方式的詳細說明

---

## 📝 寫入策略

### 策略 1：直接寫入符合的部分

**寫入位置**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`

**寫入內容**：
1. ✅ 核心憲章（Section 0）
2. ✅ 題目系統設計（Section 2）
3. ✅ 詞彙與安全治理（Section 6）
4. ✅ 結果呈現與敘事架構（Section 5）- 需補充與 L1-L4 的對應關係
5. ✅ Context Schema / Priors（Section 1）- 需補充與 P0-4.5 的整合說明
6. ✅ 特徵錨點（Section 3.3）- 需補充更多範例
7. ✅ 跨域擴散（Section 4.2）- 需補充觸發條件

**狀態標記**：
- 所有內容標記為 `ACTIVE · REFERENCE · EDITABLE`（可修改，保留後續調整權）
- 明確標註哪些部分需要後續確認

---

### 策略 2：建立追問包（需追問的部分）

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md`

**追問內容**：
1. ⚠️ 運算模型升級（Section 3）
2. ⚠️ 風險鏈結構整合（Section 4）

---

## 🎯 建議執行順序

1. **立即執行**：寫入符合的部分到 `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`
2. **建立追問包**：為需追問的部分建立追問包
3. **更新任務記錄**：記錄審核結果和後續行動

---

**審核完成時間**：2026-01-12  
**審核者**：Cursor（總指揮）
