# ENGINE_CORE_LOGIC_V3 ADR 追問包

**建立日期**：2026-01-12  
**狀態**：OPEN（等待指揮官確認）  
**目的**：針對 ENGINE_CORE_LOGIC_V3 ADR 中需要確認的技術細節進行追問

---

## 📋 追問概述

ENGINE_CORE_LOGIC_V3 ADR（`docs/adr/ADR_0005_vector_state_scoring_engine.md`）已寫入，但以下技術細節需要指揮官確認後才能完全實作：

1. **Rigidity Index 的具體計算公式**
2. **Volatility Index 的計算細節**
3. **Debug Payload 的完整結構定義**
4. **與現有 L1-L4 分層架構的整合說明**
5. **參數配置化的預設值處理**

---

## 📚 完整背景資料

### 背景 1：ENGINE_CORE_LOGIC_V3 ADR 決策

**文件位置**：`docs/adr/ADR_0005_vector_state_scoring_engine.md`

**核心決策**：
1. **運算模型升級**：採用「擴充支援」策略，支援 `weighted_sum` 和 `vector_state_v3` 兩種模型
2. **風險鏈結構整合**：採用「映射整合」策略，A/B Framework 映射到三層結構（Level 1/2/3）

**關鍵技術點**：
- V3 模型產出 Severity Score、Volatility Index、Rigidity Index
- Volatility Index 使用標準差計算：`StdDev(normalized_answers)`
- Rigidity Index 來自 P0-4.5 Stage 3 的 `attribution_profile`
- 數學公式：`Final_Score = Raw_Score × (1 + Rigidity × rigidity_weight)`

---

### 背景 2：P0-4.5 分流系統設計

**文件位置**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`

**Stage 3 輸出格式**：
```json
{
  "attribution_profile": {
    "locus": "INTERNAL | EXTERNAL | MIXED",
    "subtype": "OVERLOAD | DEFICIT | CONTEXT | FATE",
    "agency_level": "LOW | MEDIUM | HIGH"
  }
}
```

**對應關係**：
- `locus == "EXTERNAL"` 且 `subtype == "FATE"` → `EXTERNAL_FATE`
- `locus == "INTERNAL"` → `INTERNAL`
- `locus == "MIXED"` → `MIXED`

---

### 背景 3：現有 L1-L4 分層架構

**文件位置**：`domain/knowledge_base/result_presentation_design.v1.0.md`

**L1-L4 定義**：
- **L1（Hexagram Visual）**：卦象視覺、卦名（中 / 英）、核心關鍵詞
- **L2（Root Narrative）**：Root Element 個性化切入敘事
- **L3（Flow Analysis）**：上下卦互動、五行生剋、Collision 敘事
- **L4（Action & Risk）**：風險狀態、宜忌指引、行動建議

**注意**：這是結果呈現的分層架構，與風險鏈的三層結構（Level 1/2/3）不同

---

### 背景 4：現有運算模型

**文件位置**：`engine/score_facet.py`

**當前實作**：
- 只支援 `weighted_sum` 模型
- 計算方式：加權總和後除以總權重
- 輸出格式：`{ facetId, domainVersion, score, band, narrative, recommendations, riskchains }`

**現有 Facet 範例**：
- `domain/facets/stress_recovery.scoring.v1.0.json` 使用 `weighted_sum` 模型

---

### 背景 5：A/B Framework 風險鏈結構

**文件位置**：`docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md`

**Framework A（Passive Pressure Accumulation）**：
- Mid: 氣滯流塞（中｜悶壓上涌）
- High: 基石掏空（高｜暗耗存糧）

**Framework B（Active Expansion Overload）**：
- Mid: 雙力相衝（中｜火燥失序）
- High: 逐幻斷航（高｜離實墜勢）

---

## ⚠️ 追問項目 1：Rigidity Index 的具體計算公式

### 問題描述

ADR 中提到：
- Rigidity Index 來自 `attribution_profile.locus`
- 映射邏輯：`INTERNAL/MIXED → Low/Medium`，`EXTERNAL_FATE → High`
- 數學公式：`Final_Score = Raw_Score × (1 + Rigidity × rigidity_weight)`

但沒有明確說明：
1. Rigidity Index 的數值範圍是什麼？（0.0-1.0？還是 0/1/2？）
2. `Low/Medium/High` 如何映射到具體數值？
3. 是否需要考慮 `attribution_profile.subtype`（如 OVERLOAD vs DEFICIT）？

### 追問問題

1. **數值範圍**：
   - Rigidity Index 應該是 0.0-1.0 的浮點數，還是離散值（如 0, 0.5, 1.0）？
   - 如果使用離散值，`Low/Medium/High` 對應的具體數值是什麼？

2. **映射邏輯**：
   - `INTERNAL` → `Low`（數值？）還是 `Medium`（數值？）？
   - `MIXED` → `Medium`（數值？）還是 `Low`（數值？）？
   - `EXTERNAL_FATE` → `High`（數值？）

3. **Subtype 影響**：
   - `INTERNAL + OVERLOAD` 和 `INTERNAL + DEFICIT` 的 Rigidity 是否相同？
   - 是否需要根據 `subtype` 調整 Rigidity 數值？

4. **Agency Level 影響**：
   - `agency_level`（LOW/MEDIUM/HIGH）是否影響 Rigidity？
   - 例如：`EXTERNAL_FATE + HIGH agency` 是否應該降低 Rigidity？

### 建議選項

**選項 A：簡單映射（推薦）**
```python
if attribution_profile.locus == "EXTERNAL_FATE":
    rigidity = 1.0  # High
elif attribution_profile.locus == "MIXED":
    rigidity = 0.5  # Medium
else:  # INTERNAL
    rigidity = 0.0  # Low
```

**選項 B：考慮 Subtype**
```python
if attribution_profile.locus == "EXTERNAL_FATE":
    rigidity = 1.0
elif attribution_profile.locus == "MIXED":
    rigidity = 0.5
elif attribution_profile.subtype == "OVERLOAD":
    rigidity = 0.3  # 內部過載，有一定固著
else:  # INTERNAL + DEFICIT
    rigidity = 0.0
```

**選項 C：考慮 Agency Level**
```python
base_rigidity = {
    "EXTERNAL_FATE": 1.0,
    "MIXED": 0.5,
    "INTERNAL": 0.0
}[attribution_profile.locus]

# Agency Level 調整（能動性高 → 降低固著）
if attribution_profile.agency_level == "HIGH":
    rigidity = base_rigidity * 0.7
elif attribution_profile.agency_level == "MEDIUM":
    rigidity = base_rigidity * 0.85
else:  # LOW
    rigidity = base_rigidity
```

---

## ⚠️ 追問項目 2：Volatility Index 的計算細節

### 問題描述

ADR 中提到：
- 公式：`StdDev(normalized_answers)`
- 參數化區間：`< 0.15`（平穩），`0.15-0.35`（不穩），`> 0.35`（高風險）

但沒有明確說明：
1. `normalized_answers` 的具體定義是什麼？
2. 標準化的方式是什麼？
3. 是否需要考慮不同題目的權重？

### 追問問題

1. **Normalized Answers 定義**：
   - 是每個答案的標準化值（0.0-1.0）？
   - 標準化的方式是什麼？
     - 如果是 5 點量表（0-4），是否為 `value / 4.0`？
     - 是否需要考慮 `direction`（higher_is_worse vs higher_is_worse_reversed）？

2. **權重考慮**：
   - 標準差計算是否需要考慮題目的權重？
   - 例如：權重高的題目答案波動是否應該有更大的影響？

3. **計算範圍**：
   - 標準差是否包含所有題目，還是只包含特定類型的題目？
   - 是否需要排除某些題目（如驗證題）？

### 建議選項

**選項 A：簡單標準差（推薦）**
```python
# 1. 標準化所有答案（考慮 direction）
normalized = []
for inp in scoring["inputs"]:
    value = answers[inp["questionId"]]
    if inp["direction"] == "higher_is_worse":
        normalized.append(value / 4.0)
    else:  # higher_is_worse_reversed
        normalized.append((4.0 - value) / 4.0)

# 2. 計算標準差
volatility = std_dev(normalized)
```

**選項 B：加權標準差**
```python
# 考慮權重的標準差計算
weighted_values = []
total_weight = 0
for inp in scoring["inputs"]:
    value = answers[inp["questionId"]]
    weight = inp["weight"]
    normalized = (value / 4.0) if inp["direction"] == "higher_is_worse" else ((4.0 - value) / 4.0)
    weighted_values.append(normalized * weight)
    total_weight += weight

volatility = weighted_std_dev(weighted_values, total_weight)
```

---

## ⚠️ 追問項目 3：Debug Payload 的完整結構定義

### 問題描述

ADR 中提到：
- 「Output JSON 必須包含 `_meta` 欄位記錄 Raw Score, Volatility, Rigidity 供測試校準」

但沒有提供完整的 JSON Schema 定義。

### 追問問題

1. **`_meta` 欄位結構**：
   - 完整的 JSON Schema 是什麼？
   - 是否需要記錄其他中間態數據（如每個題目的分數、權重調整後的數值等）？

2. **使用者可見性**：
   - `_meta` 欄位是否應該對使用者隱藏（僅供開發者調試）？
   - 還是應該包含在 API 回應中，但標記為「內部使用」？

3. **數據完整性**：
   - 是否需要記錄計算過程的每個步驟？
   - 例如：Raw Score、Volatility 計算前的原始數據、Rigidity 的來源等？

### 建議選項

**選項 A：最小 Debug Payload（推薦）**
```json
{
  "facetId": "stress_recovery",
  "score": 0.75,
  "band": "high",
  "_meta": {
    "raw_score": 0.65,
    "volatility": 0.42,
    "rigidity": 0.0,
    "model": "vector_state_v3",
    "calculated_at": "2026-01-12T20:00:00Z"
  }
}
```

**選項 B：完整 Debug Payload**
```json
{
  "facetId": "stress_recovery",
  "score": 0.75,
  "band": "high",
  "_meta": {
    "raw_score": 0.65,
    "volatility": 0.42,
    "rigidity": 0.0,
    "model": "vector_state_v3",
    "params": {
      "volatility_thresholds": [0.15, 0.35],
      "rigidity_weight": 0.1
    },
    "intermediate": {
      "normalized_answers": [0.5, 0.75, 0.25, 0.9, 0.6],
      "weighted_sum": 0.65,
      "volatility_penalty": 1.25,
      "rigidity_adjustment": 1.0
    },
    "calculated_at": "2026-01-12T20:00:00Z"
  }
}
```

---

## ⚠️ 追問項目 4：與現有 L1-L4 分層架構的整合說明

### 問題描述

ADR 中提到：
- 風險鏈的三層結構（Level 1/2/3）對應：身 → 事 → 局
- 呈現序列：當下警訊（身）→ 近期隱憂（事）→ 遠期風險（局）

但現有系統有 L1-L4 分層架構（結果呈現），兩者的關係不明確。

### 追問問題

1. **對應關係**：
   - 風險鏈的 Level 1/2/3 如何對應到結果呈現的 L1-L4？
   - 風險鏈的內容應該放在 L4（Action & Risk）中嗎？

2. **呈現方式**：
   - 是否需要在 L4 中明確標示「當下警訊 / 近期隱憂 / 遠期風險」？
   - 還是直接呈現三層風險鏈的內容？

3. **結構調整**：
   - 是否需要調整現有的 L1-L4 結構來容納三層風險鏈？
   - 還是三層風險鏈是 L4 的子結構？

### 建議選項

**選項 A：風險鏈作為 L4 的子結構（推薦）**
```
L4 (Action & Risk)
  ├─ 當下警訊（Level 1: 身 / 土）
  ├─ 近期隱憂（Level 2: 事 / 根）
  └─ 遠期風險（Level 3: 局 / 收）
```

**選項 B：風險鏈獨立呈現**
```
L1-L3: 現有結構（不變）
L4: 行動建議（不變）
風險鏈：獨立呈現（三層結構）
```

---

## ⚠️ 追問項目 5：參數配置化的預設值處理

### 問題描述

ADR 中提到：
- `volatility_thresholds: [0.15, 0.35]` 和 `rigidity_weight: 0.1` 可配置
- 但沒有說明如果 Facet 沒有提供 `params` 時，應該使用什麼預設值。

### 追問問題

1. **預設值來源**：
   - 如果 Facet 沒有提供 `params`，是否使用文件中提到的預設值？
   - 預設值是否應該定義在引擎層級（而非 Facet 層級）？

2. **全局配置**：
   - 是否需要建立一個「全局預設參數」的配置文件？
   - 還是預設值直接寫死在引擎程式碼中？

3. **部分參數缺失**：
   - 如果 Facet 只提供了部分參數（如只有 `volatility_thresholds`，沒有 `rigidity_weight`），應該如何處理？

### 建議選項

**選項 A：引擎層級預設值（推薦）**
```python
# 在引擎中定義預設值
DEFAULT_V3_PARAMS = {
    "volatility_thresholds": [0.15, 0.35],
    "rigidity_weight": 0.1
}

# 使用時合併
params = {**DEFAULT_V3_PARAMS, **facet_data["scoring"].get("params", {})}
```

**選項 B：配置文件**
```json
// engine/v3_default_params.json
{
  "volatility_thresholds": [0.15, 0.35],
  "rigidity_weight": 0.1
}
```

---

## 📝 等待指揮官確認

請指揮官確認以上追問問題，以便：
1. 完成 ENGINE_CORE_LOGIC_V3 ADR 的技術細節
2. 更新 `engine/score_facet.py` 的實作
3. 建立完整的測試套件

---

**建立日期**：2026-01-12  
**狀態**：OPEN（等待指揮官確認）  
**關聯 ADR**：`docs/adr/ADR_0005_vector_state_scoring_engine.md`
