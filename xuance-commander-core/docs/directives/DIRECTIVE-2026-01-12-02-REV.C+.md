# ENGINE CORE LOGIC V3 — FINAL TECHNICAL DIRECTIVES (REV.C+)

**文件編號**：DIRECTIVE-2026-01-12-02-REV.C+  
**關聯文件**：ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md  
**裁示者**：Commander  
**狀態**：EXECUTABLE / SCHEMA-LOCKED / NO-IMPLICIT-LOGIC  

---

## 🎯 本 REV.C+ 的角色定位（Why REV.C+ Exists）

REV.B 已經解決「怎麼算」。

REV.C 的任務是解決「**怎麼標、怎麼排除、怎麼不誤用**」。

REV.C+ 的裁示目標是：

> **任何工程師，在沒有讀過設計會議紀錄的情況下，**  
> **只靠 Schema 與 Directive，就不可能實作出錯誤行為。**

---

## 🛑 裁示 1（定錨）：Schema 擴充與排除邏輯（Explicit over Implicit）

### 最終裁定

**唯一允許的方案：選項 A（顯式宣告）**  
其餘方案（自動推導 / 隱性判斷）**正式禁止**。

### 1.1 為何禁止「自動判斷」？

* 題目語義會變
* 同一題型在不同 Facet 可能有不同功能
* Volatility 是**統計行為**，不是語意判斷

> **結論**：  
> 「是否納入 Volatility」是**設計決策**，不是引擎該猜的事。

### 1.2 Facet Scoring Schema（最終鎖定版）

在 `scoring.inputs[]` 中，**正式定義以下欄位語意**：

```json
{
  "questionId": "q_id",
  "weight": 1.0,
  "direction": "higher_is_worse",
  "exclude_from_volatility": true
}
```

#### 欄位語意（Canonical Meaning）

* **`exclude_from_volatility: true`**
  * 明確宣告：此題目「不構成心理狀態波動來源」
  * 引擎 **不得** 嘗試推論或覆寫

* **`exclude_from_volatility: false` 或缺省**
  * 題目視為「狀態量測題」
  * 預設 **參與** Volatility 計算

### 1.3 向後相容性（Backward Compatibility）

此 Schema 擴充 **不會破壞** 任何既有 Facet：

* 舊 Facet 未含此欄位 → 視為 `false`
* 舊 Facet 多為強度題 → 合理參與 Volatility
* 無需立即批次更新歷史 Facet

### 1.4 引擎實作（最終允許邏輯）

```python
def include_in_volatility(input_cfg: dict) -> bool:
    """
    Canonical V3 rule:
    Volatility inclusion is EXPLICIT.
    """
    return not input_cfg.get("exclude_from_volatility", False)
```

⚠️ **禁止任何基於題目文字、題型、ID pattern 的判斷。**

**對應 SSOT**：
- `domain/facets/*.scoring.v1.0.json` - Facet Scoring Schema（需更新）

---

## 🛑 裁示 2（升級）：驗證題（Validation / Barnum）— 正式工程定義

### 2.1 驗證題的「系統級」定義（Write-in Canon）

**驗證題（Validation / Trust Anchor）**  
是一種 **敘事與信任建構元件**，  
而不是 **心理狀態測量元件**。

### 2.2 驗證題的三個不可混淆屬性

| 屬性 | 是否成立 | 說明 |
| --- | --- | --- |
| **反映壓力或負荷** | ✅ 是 | 生理症狀與行為確實反映長期壓力 |
| **反映心理波動** | ❌ 否 | 症狀可能長期穩定 |
| **可作為信任錨點** | ✅ 是 | 命中率高，提升「準確感」 |

### 2.3 驗證題在運算中的地位（鎖定）

| 指標 | 是否參與 | 原因 |
| --- | --- | --- |
| **Severity** | ✅ 參與 | 症狀強度 = 狀態深度 |
| **Volatility** | ❌ 排除 | 症狀 ≠ 波動來源 |
| **Rigidity** | ❌ 不直接影響 | Rigidity 僅來自 Priors |

### 2.4 驗證題的工程識別方式（唯一合法）

驗證題不是一種結構類型，而是一種「用途標記」。  
因此：

* ❌ **不新增** `question_type = validation` 作為運算依據
* ✅ **一律透過** `exclude_from_volatility: true` 明確標記

驗證題的「身分」，  
只在 **設計文件與內容語意層** 存在，  
在 **引擎層只剩一個效果**：排除 Volatility。

**對應 SSOT**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 需新增「驗證題」章節

---

## 🛑 裁示 3（整合）：Volatility 排除題型的完整分類表

以下題型 **必須** 標記 `exclude_from_volatility: true`：

### 3.1 驗證題（Validation / Barnum）

* 生理徵象（睡眠、肩頸、心悸）
* 高共通性行為（拖延、疲倦感）
* **原因**：結果型指標

### 3.2 情境鎖定題（Context Lock / Binary Choice）

* 戰 vs 逃
* 面對衝突：硬碰 or 退避
* **原因**：
  * 類別選擇 ≠ 強度波動
  * 標準差在此無心理意義

### 3.3 資源盤點題（Resource / Environment Check）

* 是否有人支持
* 是否有休息時間
* 是否有經濟緩衝
* **原因**：
  * 外部條件 ≠ 內在狀態波動

---

## 🛑 裁示 4（補強）：文件與 Schema 同步責任

### 4.1 必須同步更新的文件

1. **Facet Scoring Schema**
   * 新增 `exclude_from_volatility` 欄位說明

2. **Question Design Guidelines**
   * 新增「驗證題」章節
   * 明確說明：驗證題 ≠ 波動測量

3. **ENGINE_CORE_LOGIC_MASTER_V3**
   * 將「Symptom / Validation (20%)」明確註解為：
     * *Contributes to Severity*
     * *Excluded from Volatility*

**對應 SSOT**：
- `schemas/compiled_facet.schema.json` - 需更新（新增 `exclude_from_volatility` 欄位）
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 需新增「驗證題」章節
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 需更新題目類型配比說明

---

## 🛑 裁示 5（治理級）：禁止事項（Hard No）

以下行為一律視為違反 V3 Engine Canon：

* ❌ 根據題目文字自動判斷是否驗證題
* ❌ 根據量表型式（Likert / Binary）自動排除
* ❌ 在引擎層引入 `question_type` 分支邏輯
* ❌ 在未新增 ADR 的情況下修改排除規則

---

## ✅ 最終狀態聲明（REV.C+ Lock）

1. Schema 擴充方式：**已鎖定**
2. 驗證題定義：**工程與敘事分離，已鎖定**
3. Volatility 排除規則：**顯式、可審計、不可誤解**
4. 未來擴充方式：**只能新增欄位，不可改語意**

本文件生效後，  
`ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md`  
狀態正式由 **OPEN → RESOLVED**。

**Commander**  
2026-01-12

---

**建立日期**：2026-01-12  
**狀態**：EXECUTABLE / SCHEMA-LOCKED / NO-IMPLICIT-LOGIC  
**關聯追問包**：`docs/task_packets/advisor/ENGINE_CORE_LOGIC_V3_DIRECTIVE_QUESTIONS.md`（狀態：RESOLVED）
