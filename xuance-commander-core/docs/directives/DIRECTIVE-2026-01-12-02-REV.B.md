# ENGINE CORE LOGIC V3 — FINAL TECHNICAL DIRECTIVES (HARDENED)

**文件編號**：DIRECTIVE-2026-01-12-02-REV.B  
**關聯文件**：ENGINE_CORE_LOGIC_V3_ADR_QUESTIONS.md  
**裁示者**：Commander  
**狀態**：EXECUTABLE / AUDIT-SAFE / CODE-FREEZE  

---

## 🎯 本文件定位（Engineering Intent）

本文件的目標不是「回答追問」，而是**消除所有可能在以下場景出現的歧義**：

- 工程師各自理解、各自實作  
- 未來 Facet / Domain 擴充時出現行為漂移  
- Debug、調參、A/B 測試時無法回溯決策來源  
- 被質疑「你這個分數怎麼算出來的？」

**結論先行：**
> V3 Engine 的所有核心指標（Score / Volatility / Rigidity）  
> **必須是：可重算、可追溯、可比較、可回放的。**

---

## 🛑 裁示 1（強化）：Rigidity Index（固著指數）— 結構化多維模型

### 為何必須升級？

單純用 `EXTERNAL_FATE = 1.0` 是**理論正確但工程粗糙**。  
V3 的定位是「行為結構引擎」，不是人格貼標器。

> **Rigidity =「觀點是否僵化」×「是否還願意動」**

### 1.1 Rigidity 的正式定義（Canonical Definition）

**Rigidity Index ∈ [0.0, 1.0]**

代表的是：

> 「在既有歸因框架下，個體改變行為與認知結構的阻力大小」

它**不是**：
- 情緒強度  
- 痛苦程度  
- 風險本身  

它是**風險放大器（Risk Amplifier）**。

### 1.2 三層計算模型（不可拆）

#### Layer A — 歸因結構基底（Structural Base）

| Locus | Subtype | Base Rigidity | 結構解釋 |
| --- | --- | --- | --- |
| **EXTERNAL** | **FATE** | **1.0** | 世界不可改、我不可動 |
| **EXTERNAL** | **CONTEXT** | **0.6** | 環境可變但非我能控 |
| **MIXED** | *(Any)* | **0.5** | 一半推外，一半推己 |
| **INTERNAL** | **OVERLOAD** | **0.3** | 全責在己但陷入過載 |
| **INTERNAL** | **DEFICIT** | **0.1** | 無力但未僵化 |
| *(Default)* | *(Any)* | **0.0** | 保留值 |

> **設計原則**：  
> INTERNAL 不等於低風險，但等於「可塑性仍在」。

#### Layer B — 能動性修正（Agency Softening）

Agency 不是加分項，是**鬆動係數（Plasticity Modifier）**。

| Agency Level | Modifier | 工程含義 |
| --- | --- | --- |
| **HIGH** | **× 0.8** | 仍相信「我能做點什麼」 |
| **MEDIUM** | **× 0.9** | 可被引導 |
| **LOW** | **× 1.0** | 完全無緩衝 |

#### Layer C — 最終 Rigidity 計算公式（Canonical）

```python
def calculate_rigidity(profile: dict) -> float:
    """
    Rigidity Index ∈ [0.0, 1.0]
    Canonical V3 Implementation
    """

    if not profile:
        return 0.0

    locus = profile.get("locus", "INTERNAL")
    subtype = profile.get("subtype", "DEFICIT")
    agency = profile.get("agency_level", "LOW")

    # Base Rigidity Logic
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

    # Agency Modifier Logic
    if agency == "HIGH":
        modifier = 0.8
    elif agency == "MEDIUM":
        modifier = 0.9
    else:
        modifier = 1.0

    return round(min(base * modifier, 1.0), 2)
```

**對應 SSOT**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - Stage 3 輸出格式

---

## 🛑 裁示 2（強化）：Volatility Index — 心理不穩定性指標

### 核心裁定（再次鎖定）

> **Volatility = Answer Pattern 的離散度**  
> **不是風險，不是嚴重度，是「狀態不穩定性」**

### 2.1 正規化（Normalization）— 不可省略

**所有答案必須先轉為「語義一致」的 0–1 值**

| 原始量表 | Direction | 正規化公式 |
| --- | --- | --- |
| 0–4 | `higher_is_worse` | `v / 4.0` |
| 0–4 | `higher_is_worse_reversed` | `(4 - v) / 4.0` |

> **重要**：  
> 若 Direction 未正確處理，Volatility 將毫無意義。

### 2.2 排除規則（必須實作）

以下題型 **不得納入** Volatility 計算：

1. **驗證題**（Barnum / Physiological Anchors）
2. **二選一的情境鎖定題**
3. **非強度量測題**（分類題）

**理由**：  
Volatility 只關心「同類型心理量測的內在震盪」。

⚠️ **待確認**：`exclude_from_volatility` 欄位的 Schema 擴充方式（見追問包）

### 2.3 Canonical Implementation

```python
import statistics

def calculate_volatility(answers, inputs_config):
    values = []

    for inp in inputs_config:
        # Check exclusion flag defined in Facet config
        if inp.get("exclude_from_volatility"):
            continue

        raw = answers.get(inp["questionId"])
        if raw is None:
            continue

        # Normalization
        if inp["direction"] == "higher_is_worse":
            norm = raw / 4.0
        else:
            norm = (4.0 - raw) / 4.0

        values.append(norm)

    # Need at least 2 data points to calculate Stdev
    if len(values) < 2:
        return 0.0

    return round(statistics.stdev(values), 4)
```

### 2.4 解讀區間（Narrative Binding）

| Volatility | 狀態 | 敘事必須出現 |
| --- | --- | --- |
| **< 0.15** | 穩定 | 平穩、節氣正常 |
| **0.15 – 0.35** | 不穩 | 陣雨、反覆、忽冷忽熱 |
| **> 0.35** | 高危 | 風災、失序、暴起暴落 |

---

## 🛑 裁示 3（升級）：Debug Payload — 審計級資料鏈

### 核心原則

> **任何一個分數，都必須能被第三方工程師重新算出來。**

### 3.1 `_meta` 的正式定位

* **必須存在於 API Response**
* **UI 預設不顯示**
* **Log / QA / Calibration 必須保留**

### 3.2 Canonical Debug Payload Schema（完整版）

```json
"_meta": {
  "engine": {
    "version": "v3.0",
    "model": "vector_state_v3",
    "calculated_at": "ISO8601_TIMESTAMP"
  },
  "metrics": {
    "raw_score": 0.64,
    "final_score": 0.71,
    "band": "high",
    "volatility": 0.38,
    "rigidity": 0.45
  },
  "params": {
    "volatility_thresholds": [0.15, 0.35],
    "rigidity_weight": 0.1
  },
  "intermediate": {
    "normalized_answers": [0.25, 0.75, 0.5, 0.9],
    "base_weighted_sum": 0.64,
    "rigidity_multiplier": 1.045,
    "volatility_flag": "HIGH"
  },
  "audit": {
    "priors_used": true,
    "rigidity_applied": true,
    "volatility_applied": true
  }
}
```

---

## 🛑 裁示 4（補強）：L1–L4 與風險鏈的嚴格分工

### 結構裁定（不可再爭）

* **風險鏈三層（身 / 事 / 局）只存在於 L4**
* L1–L3 完全不感知 Risk Chain

### 4.1 L4 的最終結構（鎖定）

```text
L4 Action & Risk
 ├─ Risk Block (來源: riskchains.levels)
 │   ├─ 當下警訊（Level 1 / 身）：已經發生
 │   ├─ 近期隱憂（Level 2 / 事）：高機率即將發生
 │   └─ 遠期結構（Level 3 / 局）：若維持現狀的結構後果
 └─ Action Block (來源: recommendations)
     ├─ Stop (止損)
     ├─ Nourish (養護)
     └─ Pivot (轉勢)
```

**對應 SSOT**：
- `domain/knowledge_base/result_presentation_design.v1.0.md` - L1-L4 分層架構

---

## 🛑 裁示 5（工程強化）：參數預設值治理

### 統一原則

> **Facet 可覆寫，但引擎永遠負責提供預設值的完整性。**

### 5.1 Engine-Level Canonical Defaults

```python
DEFAULT_V3_PARAMS = {
    "volatility_thresholds": [0.15, 0.35],
    "rigidity_weight": 0.1
}
```

### 5.2 合併規則（不可變）

```python
def resolve_params(facet_data):
    # 優先讀取 Facet config，缺失值由 DEFAULT 補齊
    facet_params = facet_data.get("scoring", {}).get("params", {})
    return {**DEFAULT_V3_PARAMS, **facet_params}
```

---

## ✅ 最終狀態聲明（Final Lock）

1. 所有追問已 **結構性解決**。
2. V3 Engine 已達 **可實作 / 可審計 / 可擴充** 標準。
3. 任何未來變更 **必須新增 ADR，不可覆寫本文件**。

**Commander**  
2026-01-12

---

**建立日期**：2026-01-12  
**狀態**：EXECUTABLE / AUDIT-SAFE / CODE-FREEZE  
**關聯追問包**：`docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md`
