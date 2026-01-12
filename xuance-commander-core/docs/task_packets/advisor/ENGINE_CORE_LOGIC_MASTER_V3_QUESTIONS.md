# ENGINE_CORE_LOGIC_MASTER_V3 追問包

**建立日期**：2026-01-12  
**狀態**：OPEN（等待指揮官確認）  
**目的**：針對 ENGINE_CORE_LOGIC_MASTER_V3 中需要確認的部分進行追問

---

## 📋 追問概述

ENGINE_CORE_LOGIC_MASTER_V3 文件已部分寫入 `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`，但以下部分需要指揮官確認後才能完全整合：

1. **運算模型升級**：從 `weighted_sum` 升級到向量狀態評估
2. **風險鏈結構整合**：三層結構與 A/B Framework 的關係

---

## ⚠️ 追問項目 1：運算模型升級

### 背景

**新提案**：向量狀態評估（Vector State Evaluation）
- 包含 Raw Score、Volatility Index、Rigidity Index
- 支援波動懲罰和歸因慣性修正

**現有系統**：
- 使用 `weighted_sum` 模型（`engine/score_facet.py`）
- 只支援簡單的加權總和計算

### 追問問題

1. **架構升級策略**：
   - 是否要**取代**現有的 `weighted_sum` 模型？
   - 還是作為**擴充**（支援兩種模型，根據 Facet 選擇）？

2. **ADR 需求**：
   - 是否需要建立 ADR（Architecture Decision Record）來記錄這個架構變更？
   - 如果取代現有模型，是否需要版本遷移計劃？

3. **計算細節**：
   - Volatility Index 的計算方式（標準差閾值 0.35）是否需要調整？
   - Rigidity Index 的計算方式是否需要更多細節？
   - 波動懲罰係數（1.25）和歸因慣性修正係數（1.15）是否需要可配置？

4. **遷移計劃**：
   - 如何處理現有 Facet（如 `stress_recovery`）的遷移？
   - 是否需要保持向後相容性？

### 建議選項

**選項 A：完全取代**
- 優點：架構統一，易於維護
- 缺點：需要遷移現有 Facet，可能影響已測試的結果

**選項 B：擴充支援**
- 優點：保持向後相容，可以逐步遷移
- 缺點：需要維護兩套計算邏輯

**選項 C：分階段升級**
- 階段 1：擴充支援向量狀態評估（新 Facet 使用）
- 階段 2：逐步遷移現有 Facet
- 階段 3：移除 `weighted_sum` 模型

---

## ⚠️ 追問項目 2：風險鏈結構整合

### 背景

**新提案**：三層連鎖結構
- Level 1: Physiological (身) / Soil/Water (土壤與水文)
- Level 2: Behavioral (事) / Crop/Root (作物與根系)
- Level 3: Systemic (局) / Climate/Harvest (氣候與收成)

**現有系統**：
- 使用 A/B Framework（`docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md`）
- Framework A: Passive Pressure Accumulation
- Framework B: Active Expansion Overload

### 追問問題

1. **結構關係**：
   - 三層結構與 A/B Framework 的關係是什麼？
   - 是否要將 A/B Framework **映射**到三層結構？
   - 還是三層結構**取代** A/B Framework？

2. **整合策略**：
   - 如果映射，如何將 Framework A/B 的風險鏈映射到 Level 1/2/3？
   - 如果取代，如何處理現有 Facet（如 `income_expansion_pressure`）的風險鏈遷移？

3. **呈現方式**：
   - 三層結構的風險鏈如何呈現給使用者？
   - 是否會與現有的 L1-L4 分層架構衝突？

### 建議選項

**選項 A：映射整合**
- 將 A/B Framework 映射到三層結構
- Framework A → Level 1/2/3 的對應關係
- Framework B → Level 1/2/3 的對應關係

**選項 B：完全取代**
- 移除 A/B Framework
- 所有 Facet 使用三層結構

**選項 C：並存使用**
- A/B Framework 用於內部結構
- 三層結構用於對外呈現
- 需要建立轉譯機制

---

## 📝 等待指揮官確認

請指揮官確認以上追問問題，以便：
1. 完成 ENGINE_CORE_LOGIC_MASTER_V3 的整合
2. 更新相關的實作文件
3. 建立必要的 ADR 或技術規格

---

**建立日期**：2026-01-12  
**狀態**：OPEN（等待指揮官確認）
