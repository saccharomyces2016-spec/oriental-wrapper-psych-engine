# 前後端計算對齊規範

**建立日期**：2026-01-12  
**狀態**：ACTIVE · REFERENCE · EDITABLE  
**適用範圍**：所有前端計算邏輯與後端引擎的對齊

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本文件中的所有設計、規格、決策均為暫時性版本，不得凍結。**

---

## 1. 核心原則（Canonical Principles）

### 1.1 權威來源（Authority Source）

**後端 = 權威（Backend = Authority）**
- 所有最終計算必須由後端引擎完成
- 後端計算結果為系統的**唯一真相來源（Single Source of Truth）**

**前端 = 預覽（Frontend = Preview）**
- 前端計算僅作為**使用者體驗優化**（即時反饋、互動預覽）
- 前端計算結果**不得**作為最終決策依據
- 前端計算與後端計算的任何分歧都必須視為**阻斷問題（BLOCKER）**

### 1.2 對齊要求（Alignment Requirements）

**必須對齊的項目**：
1. ✅ 計算公式（加權平均、正規化規則）
2. ✅ 題目排除規則（`exclude_from_volatility`）
3. ✅ 分數區間（Band 劃分）
4. ✅ 參數配置（`volatility_thresholds`, `rigidity_weight`）

**允許差異的項目**：
- ❌ 無（所有計算邏輯必須完全一致）

---

## 2. 當前實作狀態

### 2.1 後端實作（Backend Implementation）

**位置**：`engine/score_facet.py`

**當前狀態**：
- ✅ 支援 `weighted_sum` 模型
- ✅ **已實作 V3 模型（`vector_state_v3`）**（2026-01-12 GPT V3 更新，2026-01-13 完成 Rigidity 預設值修正）
- ✅ **已實作 Volatility Index 計算**（使用 sample stddev，SSOT）
- ✅ **已實作 Rigidity Index 計算**（DIRECTIVE REV.B 三層模型，預設值 0.0）
- ✅ **已實作 Debug Payload（`_meta`）**（完整可審計）

**預期升級**：
- 升級為策略模式（支援 `weighted_sum` 和 `vector_state_v3`）
- 實作完整的 V3 計算邏輯（參考 DIRECTIVE REV.B 和 REV.C+）

### 2.2 前端實作（Frontend Implementation）

**位置**：`prototype/app.js`（`sumScore` 函數）

**當前狀態**：
- ✅ 實作加權平均計算
- ✅ 實作正規化邏輯
- ⚠️ 尚未對齊 V3 計算邏輯
- ⚠️ 尚未實作 Volatility Index 計算
- ⚠️ 尚未實作 Rigidity Index 計算

**預期升級**：
- 對齊後端 V3 計算邏輯
- 明確標註為「預覽模式」
- 建立降級策略（當後端計算失敗時）

---

## 3. 對齊規範（Alignment Specification）

### 3.1 計算公式對齊

#### 3.1.1 加權平均（Weighted Mean）

**後端公式**（`engine/score_facet.py`）：
```python
total = 0.0
total_w = 0.0
for inp in scoring["inputs"]:
    qid = inp["questionId"]
    w = float(inp["weight"])
    v = float(answers.get(qid, 0))
    direction = inp["direction"]
    if direction == "higher_is_worse":
        score = v / 4.0
    elif direction == "higher_is_worse_reversed":
        score = (4.0 - v) / 4.0
    total += score * w
    total_w += w
avg = total / total_w if total_w else 0.0
```

**前端公式**（`prototype/app.js`）：
```javascript
// 必須與後端完全一致
let weightedSum = 0;
let totalWeight = 0;
for (const rule of scoring.inputs) {
    const qId = rule.questionId;
    const answer = state.answers.get(qId);
    if (!answer) continue;
    
    const rawValue = Number(answer.value);
    if (Number.isNaN(rawValue)) continue;
    
    const scaleLength = question?.scale?.length || 5;
    const maxValue = scaleLength - 1;
    
    // Normalize to 0-1（必須與後端一致）
    let normalizedValue = maxValue > 0 ? rawValue / maxValue : 0;
    
    // Apply direction（必須與後端一致）
    const weight = rule.weight || 1.0;
    weightedSum += normalizedValue * weight;
    totalWeight += weight;
}
const finalScore = totalWeight > 0 ? weightedSum / totalWeight : 0;
```

**對齊檢查點**：
- ✅ 正規化公式必須一致（`v / maxValue`）
- ✅ Direction 處理必須一致
- ✅ 權重計算必須一致

---

#### 3.1.2 Volatility Index 計算（V3）

**後端公式**（參考 DIRECTIVE REV.C+）：
```python
def calculate_volatility(answers, inputs):
    vol_values = [
        normalize(answers[inp.id], inp.direction) 
        for inp in inputs 
        if not inp.get("exclude_from_volatility", False)
    ]
    volatility = stdev(vol_values) if len(vol_values) >= 2 else 0
    return volatility
```

**前端公式**（必須與後端一致）：
```javascript
// 必須與後端完全一致
const volValues = scoring.inputs
    .filter(inp => !inp.exclude_from_volatility)
    .map(inp => {
        const answer = state.answers.get(inp.questionId);
        if (!answer) return null;
        return normalizeAnswer(answer.value, inp.direction, question.scale.length);
    })
    .filter(v => v !== null);

const volatility = volValues.length >= 2 
    ? calculateStdDev(volValues) 
    : 0;
```

**對齊檢查點**：
- ✅ 排除規則必須一致（`exclude_from_volatility`）
- ✅ 正規化規則必須一致
- ✅ 標準差計算必須一致

---

#### 3.1.3 Rigidity Index 計算（V3）

**後端公式**（參考 DIRECTIVE REV.B）：
```python
def calculate_rigidity(profile: dict) -> float:
    # Layer A: Base Rigidity
    if locus == "EXTERNAL" and subtype == "FATE":
        base = 1.0
    elif locus == "EXTERNAL" and subtype == "CONTEXT":
        base = 0.6
    elif locus == "MIXED":
        base = 0.5
    elif locus == "INTERNAL" and subtype == "OVERLOAD":
        base = 0.3
    else:
        base = 0.1
    
    # Layer B: Agency Modifier
    if agency == "HIGH":
        modifier = 0.8
    elif agency == "MEDIUM":
        modifier = 0.9
    else:
        modifier = 1.0
    
    return round(min(base * modifier, 1.0), 2)
```

**前端公式**（必須與後端一致）：
```javascript
// 必須與後端完全一致
function calculateRigidity(priors) {
    if (!priors || !priors.attribution_profile) return 0.0;
    
    const { locus, subtype, agency_level } = priors.attribution_profile;
    
    // Layer A: Base Rigidity（必須與後端一致）
    let base = 0.1;
    if (locus === "EXTERNAL" && subtype === "FATE") {
        base = 1.0;
    } else if (locus === "EXTERNAL" && subtype === "CONTEXT") {
        base = 0.6;
    } else if (locus === "MIXED") {
        base = 0.5;
    } else if (locus === "INTERNAL" && subtype === "OVERLOAD") {
        base = 0.3;
    }
    
    // Layer B: Agency Modifier（必須與後端一致）
    let modifier = 1.0;
    if (agency_level === "HIGH") {
        modifier = 0.8;
    } else if (agency_level === "MEDIUM") {
        modifier = 0.9;
    }
    
    return Math.round(Math.min(base * modifier, 1.0) * 100) / 100;
}
```

**對齊檢查點**：
- ✅ Base Rigidity 映射表必須一致
- ✅ Agency Modifier 必須一致
- ✅ 最終計算公式必須一致

---

### 3.2 參數配置對齊

#### 3.2.1 Volatility Thresholds

**後端配置**（參考 DIRECTIVE REV.B）：
```json
{
  "params": {
    "volatility_thresholds": [0.15, 0.35]
  }
}
```

**前端配置**（必須與後端一致）：
```javascript
const VOLATILITY_THRESHOLDS = [0.15, 0.35]; // 必須與後端一致
```

**對齊檢查點**：
- ✅ 閾值數值必須一致
- ✅ 閾值數量必須一致

---

#### 3.2.2 Rigidity Weight

**後端配置**（參考 DIRECTIVE REV.B）：
```json
{
  "params": {
    "rigidity_weight": 0.1
  }
}
```

**前端配置**（必須與後端一致）：
```javascript
const RIGIDITY_WEIGHT = 0.1; // 必須與後端一致
```

**對齊檢查點**：
- ✅ 權重數值必須一致

---

### 3.3 排除規則對齊

#### 3.3.1 exclude_from_volatility

**後端規則**（參考 DIRECTIVE REV.C+）：
```python
def include_in_volatility(input_cfg: dict) -> bool:
    return not input_cfg.get("exclude_from_volatility", False)
```

**前端規則**（必須與後端一致）：
```javascript
function includeInVolatility(inputCfg) {
    return !inputCfg.exclude_from_volatility; // 預設為 false
}
```

**對齊檢查點**：
- ✅ 排除邏輯必須一致
- ✅ 預設值處理必須一致

---

## 4. 降級策略（Fallback Strategy）

### 4.1 前端計算失敗

**情境**：前端計算邏輯出現錯誤或無法執行

**策略**：
1. 顯示「計算中...」狀態
2. 等待後端計算結果
3. 不顯示任何前端計算結果

### 4.2 後端計算失敗

**情境**：後端 API 調用失敗或返回錯誤

**策略**：
1. 顯示錯誤訊息（玄學語境版：「卦象未成，暫不可觀」）
2. 不顯示任何計算結果
3. 提供重試機制

### 4.3 前後端結果不一致

**情境**：前端計算結果與後端計算結果不一致

**策略**：
1. **立即阻斷（BLOCKER）**：不允許發布
2. 記錄不一致的詳細資訊（Debug Payload）
3. 修正前端計算邏輯，確保與後端一致
4. 重新驗證對齊

---

## 5. 驗收標準（Acceptance Criteria）

### 5.1 對齊驗收

**必須通過的測試**：
1. ✅ 相同輸入下，前端和後端計算結果完全一致（誤差 < 0.001）
2. ✅ Volatility Index 計算結果一致
3. ✅ Rigidity Index 計算結果一致
4. ✅ Band 劃分結果一致
5. ✅ 排除規則處理一致

### 5.2 測試方法

**建議測試流程**：
1. 使用相同的測試用例（Golden Tests）
2. 分別執行前端和後端計算
3. 比較計算結果
4. 記錄任何不一致的地方
5. 修正不一致後重新測試

---

## 6. 實作指南（Implementation Guide）

### 6.1 前端實作建議

**建議架構**：
```javascript
// 前端計算模組（僅作為預覽）
class FrontendCalculator {
    constructor(backendConfig) {
        // 從後端配置同步參數
        this.volatilityThresholds = backendConfig.params.volatility_thresholds;
        this.rigidityWeight = backendConfig.params.rigidity_weight;
    }
    
    // 預覽計算（必須與後端邏輯完全一致）
    previewCalculation(answers, priors) {
        // 實作與後端完全一致的計算邏輯
    }
    
    // 標記為預覽模式
    isPreview() {
        return true;
    }
}
```

### 6.2 後端實作建議

**建議架構**：
```python
# 後端計算模組（權威來源）
class BackendCalculator:
    def __init__(self, facet_data, params):
        self.facet_data = facet_data
        self.params = params
    
    # 權威計算
    def calculate(self, answers, priors):
        # 實作完整的 V3 計算邏輯
        # 包含 Debug Payload
        return {
            "score": final_score,
            "band": band,
            "_meta": {
                "raw_score": raw_score,
                "final_score": final_score,
                "volatility": volatility,
                "rigidity": rigidity,
                "params": self.params,
                "intermediate": {...}
            }
        }
```

---

## 7. 文件狀態

**狀態**：ACTIVE · REFERENCE · EDITABLE

**版本**：v1.0（可隨時修正）

**適用範圍**：所有前端計算邏輯與後端引擎的對齊

**後續維護**：此規範可根據實際使用情況調整或擴充

---

**建立日期**：2026-01-12  
**最後更新**：2026-01-12（補強 V3 引擎對齊規範）  
**來源**：
- `ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md` 審核通過部分
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 8（2026-01-12 審核通過）

**對應 SSOT**：
- `engine/score_facet.py` - 後端實作
- `prototype/app.js` - 前端實作
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - 技術裁示
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 8 - UI/Engine 契約
