# P0-11 階段二任務包：運算邏輯完善

**建立日期**：2026-01-11  
**狀態**：READY FOR EXECUTION  
**階段**：階段二（運算邏輯完善）

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本任務包中的所有設計、規格、決策均為暫時性版本，不得凍結。**

- 所有設計決策均可在後續討論中調整
- 所有規格均可根據實際測試結果修改
- 所有流程均可根據協作經驗優化

**目標**：建立一個**可運作、可測試、可持續調整**的基礎版本，而非完美終版。

---

## 一、任務概述

### 1.1 階段一完成狀態

✅ **階段一已完成**：
- ✅ 64 卦基礎知識庫
- ✅ 五行基礎知識庫
- ✅ 八卦基礎知識庫
- ✅ 基礎對應關係表

**詳細報告**：`P0-11_PHASE1_COMPLETION_SUMMARY.md`

### 1.2 階段二目標

**本次任務包要達成什麼**：

> 完善核心運算邏輯，實作完整的 Hexagram Deriver、Collision Calculator、以及完善的 Root Element Mapper，確保運算邏輯能夠支持完整的系統運作。

### 1.3 任務重要性

**阻塞關係**：
- **阻塞**：階段三（詞彙庫）、階段四（題目設計與結果呈現）、以及後續的功能實作
- **被阻塞**：階段一（基礎知識庫建立）← 已解除

**理由**：
- 運算邏輯是系統的核心基礎，不完善無法進行後續開發
- 運算邏輯需要基於階段一的知識庫資料

---

## 二、任務範圍與目標

### 2.1 Root Element Mapper 完善

**當前狀態**：僅有基礎實作（天干對應五行）

**文件位置**：`engine/root_element_mapper.py`

**需要完善**：

1. **更完整的計算方法**
   - ✅ 天干對應五行（已有基礎實作）
   - ⏳ 地支對應五行（如果需要更精確的計算）
   - ⏳ 其他計算方式（如果需要）
   - ⏳ 容錯處理完善（缺 DOB 時的處理邏輯優化）

2. **與心理學的對應**
   - ⏳ Root Element 對應的心理原型（可從五行 JSON 取得）
   - ⏳ Root Element 對應的行為傾向（可從五行 JSON 取得）

3. **與知識庫的整合**
   - ⏳ 從 `wuxing_5_elements.v1.0.json` 讀取五行資料
   - ⏳ 使用知識庫中的五行定義和對應關係

**交付物**：
- 完善的 `engine/root_element_mapper.py`
- 相關測試文件（如果需要的話）

### 2.2 Hexagram Deriver 完善

**當前狀態**：僅支援部分卦象（8 個八卦基礎映射）

**文件位置**：`engine/hexagram_deriver.py`

**需要完善**：

1. **完整的 64 卦映射邏輯**
   - ⏳ 所有 64 卦的完整映射規則
   - ⏳ Stage 1-3 輸入如何對應到 64 卦
   - ⏳ Facet 與卦象的完整對應關係（使用 `domain/facets/income_expansion_pressure/hexagram_mapping.v1.0.json`）
   - ⏳ 使用知識庫資料（從 `hexagram_64_full.v1.0.json` 和 `mapping_tables.v1.0.json` 讀取）

2. **變爻計算完善**
   - ⏳ 更精確的變爻計算方法
   - ⏳ 變爻觸發條件（基於 Stage 3 輸入）
   - ⏳ 變爻與結果的對應關係

3. **與科學計算的一致性**
   - ⏳ 確保玄學計算結果與科學計算結果一致
   - ⏳ 使用對應關係表進行驗證（使用 `mapping_tables.v1.0.json` 中的風險等級對應）

**交付物**：
- 完善的 `engine/hexagram_deriver.py`
- 相關測試文件（如果需要的話）

### 2.3 Collision Calculator 完善

**當前狀態**：僅有簡化的關係表（部分五行生剋關係）

**文件位置**：`engine/collision_calculator.py`

**需要完善**：

1. **完整的五行生剋邏輯**
   - ⏳ 所有五行生剋關係（從 `wuxing_5_elements.v1.0.json` 讀取）
   - ⏳ 更複雜的關係計算（如果需要：相制、相化等）
   - ⏳ 關係的現代化解釋（從五行 JSON 取得）

2. **與心理學狀態的對應**
   - ⏳ Collision Key 對應的心理狀態（從五行 JSON 和對應關係表取得）
   - ⏳ Collision Key 對應的敘事模板（如果需要）

3. **與知識庫的整合**
   - ⏳ 從 `wuxing_5_elements.v1.0.json` 讀取五行生剋關係
   - ⏳ 從 `mapping_tables.v1.0.json` 讀取對應關係

**交付物**：
- 完善的 `engine/collision_calculator.py`
- 相關測試文件（如果需要的話）

---

## 三、參考資料

### 3.1 階段一交付物（知識庫）

- `domain/knowledge_base/hexagram_64_full.v1.0.json` - 64 卦基礎知識庫
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行基礎知識庫
- `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦基礎知識庫
- `domain/knowledge_base/mapping_tables.v1.0.json` - 基礎對應關係表

### 3.2 現有實作文件

- `engine/root_element_mapper.py` - Root Element Mapper（基礎實作）
- `engine/hexagram_deriver.py` - Hexagram Deriver（基礎實作）
- `engine/collision_calculator.py` - Collision Calculator（基礎實作）

### 3.3 Facet 錨定文件

- `domain/facets/income_expansion_pressure/hexagram_mapping.v1.0.json` - Facet 錨定對照表

### 3.4 系統設計文件

- `P0-5.5_ELEMENT_SELECTION_DECISION.md` - 易經矩陣系統決策
- `P0-5.6_COMPLETE_TASK_PACKAGE.md` - 易經矩陣系統實作包
- `P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文檔
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

---

## 四、執行要求

### 4.1 格式要求

- ✅ Python 代碼（.py 文件）
- ✅ 符合專案代碼規範
- ✅ 結構清晰、易於維護
- ✅ 使用知識庫資料（從 JSON 文件讀取，而非硬編碼）

### 4.2 品質要求

- ✅ 代碼品質良好（可讀性、可維護性）
- ✅ 邏輯正確（符合系統設計要求）
- ✅ 與知識庫整合（使用階段一的知識庫資料）
- ✅ 與現有實作兼容（保持向後兼容，或提供遷移方案）

### 4.3 驗收標準

- ✅ 功能驗收：
  - Root Element Mapper 正確處理有效/無效 DOB
  - Hexagram Deriver 正確推導卦象和變爻（64 卦完整支持）
  - Collision Calculator 正確生成碰撞鍵（完整五行生剋關係）
- ✅ 一致性驗收：
  - 運算結果與知識庫資料一致
  - 運算結果與科學計算結果一致（通過驗證測試）
- ✅ 整合驗收：
  - 與階段一知識庫整合正常
  - 與現有實作整合正常

---

## 五、交付物清單

1. ⏳ `engine/root_element_mapper.py`（完善版）
2. ⏳ `engine/hexagram_deriver.py`（完善版）
3. ⏳ `engine/collision_calculator.py`（完善版）
4. ⏳ 相關測試文件（如果需要）

---

## 六、執行建議

### 6.1 執行順序

建議按以下順序執行：
1. **第一步**：完善 Collision Calculator（因為它依賴五行知識庫，且邏輯相對簡單）
2. **第二步**：完善 Root Element Mapper（因為它相對獨立）
3. **第三步**：完善 Hexagram Deriver（因為它最複雜，需要整合多個知識庫）

### 6.2 整合策略

**使用知識庫資料**：
- 所有運算邏輯應該從 JSON 文件讀取資料，而非硬編碼
- 使用 Python 的 `json` 模組讀取知識庫文件
- 建立資料載入函數，統一處理知識庫資料的讀取

**保持向後兼容**：
- 現有的基礎實作邏輯可以保留
- 新增的功能應該擴展現有邏輯，而非完全重寫
- 如果需要重大變更，應該提供遷移方案

---

## 七、成功標準

### 7.1 功能完整性

- [ ] Root Element Mapper 支持完整的 DOB 計算（可選：支持更精確的計算方法）
- [ ] Hexagram Deriver 支持所有 64 卦的推導
- [ ] Collision Calculator 支持完整的五行生剋關係

### 7.2 一致性

- [ ] 運算結果與知識庫資料一致
- [ ] 運算結果與科學計算結果一致（通過驗證測試）

### 7.3 整合性

- [ ] 與階段一知識庫整合正常
- [ ] 與現有實作整合正常
- [ ] 所有測試通過

---

**任務狀態**：READY FOR EXECUTION  
**建立日期**：2026-01-11
