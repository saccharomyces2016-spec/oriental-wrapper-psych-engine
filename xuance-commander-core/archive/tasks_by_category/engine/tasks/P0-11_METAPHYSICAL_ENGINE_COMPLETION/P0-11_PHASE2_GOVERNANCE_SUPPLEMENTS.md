# P0-11 階段二治理補強聲明

**建立日期**：2026-01-11  
**狀態**：ACTIVE · REFERENCE  
**目的**：補充階段二交付物的治理聲明，確保符合「可回滾、不凍結」原則

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本文件中的所有設計、規格、決策均為暫時性版本，不得凍結。**

- 所有設計決策均可在後續討論中調整
- 所有規格均可根據實際測試結果修改
- 所有流程均可根據協作經驗優化

---

## 一、Root Element Mapper 治理聲明

### 1.1 演算法非權威性聲明

**聲明**：

> 本模組中實作的天干演算法（年份尾數法）僅為 **Phase 2 Placeholder / Reference Implementation**。
>
> - **不具權威性**：此演算法不應被視為「標準」或「唯一正確」的計算方式
> - **不具唯一性**：Phase 3 或後續階段可完全替換此演算法，不影響系統 Canon
> - **可擴展性**：未來可加入地支、其他計算方式，或完全不同的演算法
> - **向後兼容**：即使演算法變更，輸出格式（`root_element` ID）保持穩定

**應用範圍**：此聲明適用於 `engine/root_element_mapper.py` 中的所有計算邏輯。

---

## 二、Hexagram Deriver 治理聲明

### 2.1 變爻結果結構定義

**聲明**：

> Phase 2 的變爻計算**僅計算變爻位置，不計算結果卦**。
>
> **結構定義**：
> ```python
> {
>   "base_hexagram_id": int,      # 基礎卦 ID (0-63)
>   "changing_line": int,          # 變爻位置 (1-6)
>   "result_hexagram_id": None     # 結果卦 ID (Phase 2 保留為 None)
> }
> ```
>
> **責任劃分**：
> - **Phase 2 責任**：計算變爻位置、保留結構欄位
> - **Phase 3 責任**：實作結果卦計算邏輯（如需要）

**應用範圍**：`engine/hexagram_deriver.py` 中的 `calculate_variable_line()` 方法。

### 2.2 Facet 預設值非業務語義聲明

**聲明**：

> `load_facet_mapping()` 方法中的預設 Facet 路徑（`income_expansion_pressure`）僅為 **Example / Dev Default**。
>
> - **不具業務優先順序**：此預設值不表示該 Facet 是系統的核心或優先 Facet
> - **不具語義優先性**：此預設值僅用於開發和測試，不影響生產環境的業務邏輯
> - **可替換性**：正式 Facet 必須由 Phase 3 / Phase 4 的業務邏輯注入
> - **向後兼容**：即使預設值變更，方法接口保持穩定

**應用範圍**：`engine/hexagram_deriver.py` 中的 `load_facet_mapping()` 方法。

---

## 三、Collision Calculator 治理聲明

### 3.1 輸出為 Symbolic Key 聲明

**聲明**：

> `calculate_collision()` 方法返回的 `archetype` 和 `flow` 欄位**不是語義**，而是 **Symbolic Key**。
>
> **定義**：
> - **Symbolic Key**：僅作為 Phase 3 Narrative Resolver 的 lookup key，不應被直接解讀為心理狀態描述
> - **非語義性**：這些 Key 不包含任何可被使用者直接閱讀的心理語義
> - **可替換性**：Phase 3 可以完全重新定義這些 Key 的映射關係
> - **向後兼容**：即使 Key 名稱變更，`collision_key` 欄位保持穩定

**應用範圍**：`engine/collision_calculator.py` 中的 `_get_context_key()` 方法。

**替代命名建議**（如需要更明確）：
- `archetype` → `collision_symbol`
- `flow` → `flow_direction_key`

---

## 四、通用治理原則

### 4.1 所有演算法均為 Placeholder

**原則**：

> Phase 2 中的所有演算法、計算邏輯、映射規則均為 **Placeholder Implementation**。
>
> - 不應被視為「最終版本」或「權威實作」
> - 所有邏輯均可被 Phase 3 或後續階段完全替換
> - 只有接口契約（輸入輸出格式）需要保持穩定

### 4.2 所有預設值均為 Development Default

**原則**：

> Phase 2 中的所有預設值、範例路徑、測試資料均為 **Development Default**。
>
> - 不應被解讀為業務邏輯或優先順序
> - 所有預設值均可被業務邏輯覆蓋
> - 只有方法接口需要保持穩定

### 4.3 所有輸出均為結構化資料，非語義

**原則**：

> Phase 2 中的所有輸出欄位均為 **結構化資料 / Symbolic Key**，不包含可被直接閱讀的語義。
>
> - 所有語義轉換責任屬於 Phase 3 / Phase 4
> - Phase 2 只負責產出結構化資料
> - 只有資料結構（Schema）需要保持穩定

---

## 五、文件狀態

**狀態**：ACTIVE · REFERENCE · EDITABLE

**版本**：v1.0（可隨時修正）

**適用範圍**：P0-11 Phase 2 所有交付物

**後續維護**：此聲明可根據 Phase 3 實際需求調整或擴充

---

**建立日期**：2026-01-11  
**最後更新**：2026-01-11
