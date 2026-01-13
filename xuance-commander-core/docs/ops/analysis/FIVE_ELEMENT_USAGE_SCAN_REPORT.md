# 五行使用情況全案掃描報告

**建立日期**：2026-01-13  
**掃描範圍**：全專案  
**目的**：確認系統中是否真的使用五行，以及使用程度

---

## 📋 掃描結果總覽

### 五行使用情況

| 位置 | 使用程度 | 說明 |
|------|----------|------|
| **Domain 配置** | ✅ **已使用** | `bagua.domain_map.v1.0.json` 中每個 Domain 都有 `element` 欄位 |
| **Cascade 引擎** | ✅ **已使用** | `cascade_calculator.py` 使用五行「剋」關係進行跨域擴散 |
| **CONSTITUTION** | ✅ **已使用** | CONSTITUTION V4 Section 4 明確提到「五行生剋」 |
| **Schema** | ✅ **已使用** | `compiled_facet.schema.json` 包含 `element` 欄位 |
| **實作代碼** | ✅ **已使用** | `cascade_calculator.py` 實作了五行「剋」關係的計算 |

---

## 🔍 詳細掃描結果

### 1. Domain 配置中的五行

**檔案**：`domain/domains/bagua.domain_map.v1.0.json`

**發現**：
- 每個 Domain 都有 `element` 欄位
- 值為：`"metal"`, `"wood"`, `"water"`, `"fire"`, `"earth"`, `null`（center）
- 對應關係：
  - `qian`, `dui` → `metal`（金）
  - `zhen`, `xun` → `wood`（木）
  - `kan` → `water`（水）
  - `li` → `fire`（火）
  - `kun`, `gen` → `earth`（土）
  - `center` → `null`

**結論**：✅ **已使用五行**

---

### 2. Cascade 引擎中的五行

**檔案**：`engine/cascade_calculator.py`

**發現**：
- 定義了 `OVERCOMES` 映射（五行「剋」關係）：
  ```python
  OVERCOMES = {
      "WOOD": "EARTH",
      "EARTH": "WATER",
      "WATER": "FIRE",
      "FIRE": "METAL",
      "METAL": "WOOD",
  }
  ```
- 使用 `relation()` 函數判斷兩個元素之間的「剋」關係
- 使用 `cascade_warnings()` 函數根據五行「剋」關係產生跨域警告

**結論**：✅ **已使用五行「剋」關係**

---

### 3. CONSTITUTION 中的五行

**檔案**：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`

**發現**：
- Section 1.1：明確列出每個 Domain 的五行屬性
- Section 4：明確提到「跨域擴散引擎」使用「五行生剋」進行傳導
- Section 4.2：提到「動態計算（五行生剋） + 顯式覆寫表」

**結論**：✅ **已使用五行**

---

### 4. Schema 中的五行

**檔案**：`schemas/compiled_facet.schema.json`

**發現**：
- 包含 `element` 欄位：
  ```json
  "element": {
    "type": "string",
    "enum": ["METAL", "WOOD", "WATER", "FIRE", "EARTH", "NONE"]
  }
  ```

**結論**：✅ **已使用五行**

---

### 5. Cascade Overrides 中的五行

**檔案**：`domain/cascade/cascade_overrides.v1.0.json`

**發現**：
- 使用 `sourceElement` 和 `targetElement` 定義五行關係
- 例如：`"EARTH_OVERCOMES_WATER"`（土剋水）

**結論**：✅ **已使用五行「剋」關係**

---

## 📊 五行使用程度分析

### 已實作的部分

1. ✅ **Domain Element 定義**：每個 Domain 都有五行屬性
2. ✅ **Cascade 計算**：使用五行「剋」關係進行跨域擴散
3. ✅ **Schema 支援**：Schema 包含 `element` 欄位
4. ✅ **覆寫表**：有五行關係的覆寫模板

### 未實作的部分

1. ❌ **五行「生」關係**：目前只有「剋」關係，沒有「生」關係
2. ❌ **五行「洩」關係**：Gemini 方案提到「洩」路徑，但尚未實作
3. ❌ **Root Element 計算**：CONSTITUTION 提到「Root Element（本命元神）」，但尚未實作
4. ❌ **五行碰撞計算**：提到「五行碰撞計算」，但尚未實作

---

## 🎯 結論

### 五行使用情況

**結論**：✅ **系統確實使用五行**

**使用範圍**：
1. **Domain 配置**：每個 Domain 都有五行屬性
2. **Cascade 引擎**：使用五行「剋」關係進行跨域擴散
3. **CONSTITUTION**：明確提到「五行生剋」
4. **Schema**：支援 `element` 欄位

**使用程度**：
- **已實作**：五行「剋」關係（用於跨域擴散）
- **未實作**：五行「生」關係、「洩」關係、Root Element 計算、五行碰撞計算

---

## ⚠️ 發現的問題

### 問題 1：五行「生」關係未實作

**現狀**：
- 只有「剋」關係（`OVERCOMES`）
- 沒有「生」關係（例如：木生火、火生土）

**影響**：
- 無法解釋「資源補充」類型的連鎖反應
- 可能無法完整解釋五行理論

**建議**：
- 如果需要完整的五行理論，應該實作「生」關係
- 如果只需要「剋」關係，可以維持現狀

---

### 問題 2：Gemini 方案提到的「洩」關係

**現狀**：
- Gemini 方案提到「洩（Exhaustion）」路徑
- 但現有實作只有「剋」關係

**影響**：
- 如果採納 Gemini 方案，需要實作「洩」關係
- 這會增加實作複雜度

**建議**：
- 需要裁示：是否需要「洩」關係？
- 如果不需要，可以維持現有的「剋」關係

---

## 📝 建議

### 建議 1：確認五行使用範圍

**問題**：系統是否真的需要完整的五行理論？

**選項**：
- **選項 A**：維持現狀（只有「剋」關係）
  - 理由：已能解釋大部分連鎖反應；避免過度複雜化
- **選項 B**：實作完整的五行理論（包含「生」「剋」「洩」）
  - 理由：更完整的五行理論；符合「準到發毛」的目標
  - 代價：需要更新 `cascade_calculator.py`；需要定義「生」和「洩」關係

---

### 建議 2：確認 Gemini 方案的「洩」關係

**問題**：是否需要「洩」關係？

**選項**：
- **選項 A**：採納「洩」關係（Gemini 方案）
  - 理由：更完整的五行理論；能解釋「資源耗盡」類型的連鎖反應
  - 代價：需要更新實作；可能產生更多警告
- **選項 B**：維持現狀（只有「剋」關係）
  - 理由：已能運作；避免過度複雜化

---

**建立日期**：2026-01-13  
**掃描者**：Cursor（總指揮）  
**狀態**：完成掃描，等待裁示
