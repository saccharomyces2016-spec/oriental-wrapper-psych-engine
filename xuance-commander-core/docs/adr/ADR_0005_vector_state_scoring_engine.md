# ADR 0005 - Vector State Scoring Engine (V3)

## Status
Accepted (Most details resolved - See DIRECTIVE-2026-01-12-02-REV.B for final technical directives)

## Context

V3 引擎的核心目標已不再是「能算出分數」，而是：

> **能精準定位「狀態型態（State Pattern）」、**  
> **能推演「未處理的未來（Untreated Future）」、**  
> **且在不中斷既有服務的前提下，持續演化。**

本次決策觸及兩個**不可逆的架構轉折點**：
1. 計分模型是否仍停留在線性尺度（Scoring）
2. 風險鏈是否只是敘事，而非推演結構（Risk Chain）

**關聯文件**：
- `docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md` - 追問包
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - V3 規格文件

---

## Decision

### 決策 1：運算模型升級策略（Scoring Model Upgrade）

**採用「擴充支援（Extension）」作為當前解，並在架構上正式為「全面向量化（Vector-Native）」鋪路。**

此為「不中斷 × 可演化 × 可驗證」的唯一可行路徑。

#### 1.1 架構原則（不可違反）

**原則 A：向後相容（Backward Compatible）**
- V1 / V2 Facets **不得被迫升級**
- 任何既有 Facet 若未標示 model，預設走 `weighted_sum`

**原則 B：向前開放（Forward Extensible）**
- V3 Facet **必須**明確聲明其運算模型
- 參數應盡量配置化（Configurable），而非寫死在程式碼中

#### 1.2 模型選擇機制（Runtime Strategy）

在 Facet 的 `scoring` 區塊中，正式鎖定以下 Schema 語意：

```json
"scoring": {
  "model": "weighted_sum | vector_state_v3",
  "params": {
    "volatility_thresholds": [0.15, 0.35],  // [Low, High] 邊界可微調
    "rigidity_weight": 0.1                   // 固著係數可微調
  }
}
```

- **`weighted_sum`** → 穩定、低成本、適用 MVP 與歷史資料
- **`vector_state_v3`** → 高精度、狀態感知、支援行為與風險推演

⚠️ **禁止在程式碼中以 Facet 名稱判斷模型，模型只能由 `scoring.model` 決定。**

#### 1.3 V3 核心計算構件（強化版）

V3 不再只產出「一個分數」，而是產出 **一組狀態描述子（State Descriptors）**，並需記錄於隱藏的 Debug Payload 中。

**（1）Severity Score｜嚴重度**
- **來源**：加權後的標準化回答
- **意義**：問題「深度」

**（2）Volatility Index｜波動指數**
- **公式**：`StdDev(normalized_answers)`
- **參數化區間**（預設）：
  - `< 0.15` → 平穩（陰晴有序）
  - `0.15 – 0.35` → 不穩（陣雨）
  - `> 0.35` → 高風險（風暴）

**敘事硬規則**：
> 若 `Volatility` ≥ 不穩，L3 敘事 **必須** 反映「忽冷忽熱 / 反覆失序」，即使 Severity 不高。

**（3）Rigidity Index｜固著指數（關鍵升級）**
- **來源**：僅來自 P0-4.5 Stage 3 的 `attribution_profile`
- **缺失值防禦**：若 `priors` 為空或無資料，預設 `Rigidity = 0`（即不進行加權）
- **映射邏輯**：
  - `attribution_profile.locus` == `INTERNAL` / `MIXED` → `Low` / `Medium`
  - `attribution_profile.locus` == `EXTERNAL_FATE` → `High`

**數學影響（鎖定）**：
```
Final_Score = Raw_Score × (1 + Rigidity × rigidity_weight)
```

**解釋**：固著不是「更嚴重」，而是「更難被現有建議改變」。

⚠️ **待確認**：Rigidity Index 的具體數值範圍和計算方式（見追問包）

#### 1.4 程式實作指示（不可省略）

`engine/score_facet.py` 必須升級為策略模式，並包含審計日誌：

```python
def calculate(facet_data, answers, priors):
    model = facet_data["scoring"].get("model", "weighted_sum")

    # Result Tuple: (final_score, band, debug_info)
    if model == "weighted_sum":
        return run_v1_logic(facet_data, answers)

    if model == "vector_state_v3":
        # 傳入 scoring.params 以支持參數微調
        params = facet_data["scoring"].get("params", {})
        return run_v3_logic(facet_data, answers, priors, params)

    raise ValueError("Unknown scoring model")
```

📌 **禁止在任何地方 hardcode V3 邏輯。**  
📌 **Output JSON 必須包含 `_meta` 欄位記錄 Raw Score, Volatility, Rigidity 供測試校準。**

⚠️ **待確認**：Debug Payload 的完整結構定義（見追問包）

---

### 決策 2：風險鏈結構整合（Risk Chain Integration）

**採用「映射整合（Mapping Integration）」策略，並強制所有輸出統一為「三層農耕結構」。**

> **A/B Framework 是「病理分類」，**  
> **三層結構是「時間 × 因果 × 呈現語法」。**

#### 2.1 內外結構關係（正式定義）

- **Framework A / B**：
  - 僅存在於內容設計與內部邏輯
  - 用於區分「停滯型崩壞」與「透支型崩壞」

- **Level 1 / 2 / 3**：
  - 唯一允許輸出給 UI 的結構
  - 對應：身 → 事 → 局

#### 2.2 三層結構 × A/B 映射表（強化版）

| 層級 | Framework A（Passive / Stagnation） | Framework B（Active / Burnout） |
| --- | --- | --- |
| **Level 1**<br>身 / 土 | **濕、冷、塞、重**<br>水滯土悶 | **燥、熱、裂、耗**<br>地力蒸散 |
| **Level 2**<br>事 / 根 | **拖延、麻木、逃避**<br>根系腐化 | **衝動、躁進、過勞**<br>根系枯竭 |
| **Level 3**<br>局 / 收 | **錯失節氣、結構塌陷** | **虛長後崩、斷崖失收** |

#### 2.3 Facet JSON 強制格式（鎖定）

```json
"riskchains": {
  "framework_type": "A_PASSIVE | B_ACTIVE",
  "levels": {
    "L1_soil": { "narrative": "..." },
    "L2_root": { "narrative": "..." },
    "L3_harvest": { "narrative": "..." }
  }
}
```

- UI 僅讀取 `levels`
- Framework 僅用於內容生成，不得暴露

#### 2.4 呈現序列（UI 不可調整）

1. **當下警訊（身）**：已經發生
2. **近期隱憂（事）**：高機率即將發生
3. **遠期風險（局）**：若維持現狀的結構後果

⚠️ **待確認**：與現有 L1-L4 分層架構的整合說明（見追問包）

---

## Consequences

### 正面影響

1. **向後相容**：現有 Facet 無需修改即可繼續運作
2. **可演化**：新 Facet 可以使用更精確的向量狀態評估
3. **可驗證**：Debug Payload 提供完整的審計追蹤
4. **可配置**：參數配置化允許不同 Facet 微調計算邏輯

### 負面影響 / 風險

1. **複雜度增加**：需要維護兩套計算邏輯
2. **測試成本**：需要為兩種模型建立測試套件
3. **遷移成本**：現有 Facet 若要升級，需要重新驗證結果

### 待解決問題

1. ✅ Rigidity Index 的具體計算公式（已解決，見 DIRECTIVE-2026-01-12-02-REV.B）
2. ✅ Volatility Index 的計算細節（已解決，見 DIRECTIVE-2026-01-12-02-REV.B）
3. ✅ Debug Payload 的完整結構定義（已解決，見 DIRECTIVE-2026-01-12-02-REV.B）
4. ✅ 與現有 L1-L4 分層架構的整合說明（已解決，見 DIRECTIVE-2026-01-12-02-REV.B）
5. ✅ 參數配置化的預設值處理（已解決，見 DIRECTIVE-2026-01-12-02-REV.B）

**剩餘待確認**：
- ⚠️ `exclude_from_volatility` 欄位的 Schema 擴充（見 DIRECTIVE 追問包）
- ⚠️ 驗證題（Validation/Barnum）的定義（見 DIRECTIVE 追問包）

---

## Verification

### 驗收標準

1. ✅ `engine/score_facet.py` 支援策略模式，可根據 `scoring.model` 選擇計算邏輯
2. ✅ V1 Facet（如 `stress_recovery`）使用 `weighted_sum` 模型，結果與現有系統一致
3. ✅ V3 Facet 使用 `vector_state_v3` 模型，產出包含 Severity, Volatility, Rigidity
4. ✅ 風險鏈輸出統一為三層結構（Level 1/2/3），不暴露 Framework A/B
5. ✅ Debug Payload 包含完整的審計追蹤數據

### 測試計劃

1. **單元測試**：驗證兩種模型的計算邏輯
2. **整合測試**：驗證 Facet 編譯和計算流程
3. **回歸測試**：驗證現有 Facet 的結果一致性
4. **審計測試**：驗證 Debug Payload 的完整性

---

## 後續行動

基於本決策，**V3 引擎即刻進入實作階段**：

1. ✅ **更新 `ENGINE_CORE_LOGIC_MASTER_V3.md`**（已完成）
2. ✅ **建立 `ADR_0005_vector_state_scoring_engine.md`**（本文件）
3. ⏳ **升級 `score_facet.py`（策略模式 + Debug Payload）**（待實作）
4. ⏳ **鎖定 P0-4.5 priors schema（Rigidity 專用）**（待確認）
5. ⏳ **建立追問包，確認待解決問題**（進行中）

---

## Commander 補充裁示

> **V3 的「準」，不是算得多，而是「知道哪一種壞，正在以哪一種速度發生」。**

此決策即刻生效。

**Commander**  
2026-01-12

---

**建立日期**：2026-01-12  
**狀態**：Accepted (Most details resolved - See DIRECTIVE-2026-01-12-02-REV.B)  
**關聯文件**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - 最終技術裁示（工程級強化版）
- `docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md` - 原始追問包
- `docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md` - DIRECTIVE 追問包
