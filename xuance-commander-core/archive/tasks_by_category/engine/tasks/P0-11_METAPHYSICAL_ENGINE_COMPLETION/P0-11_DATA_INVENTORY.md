# P0-11 玄學運算系統資料盤點

**建立日期**：2026-01-11  
**狀態**：IN_PROGRESS  
**目的**：盤點所有與玄學運算系統相關的資料

---

## 一、現有系統資料

### 1.1 易經矩陣系統決策文件

**文件位置**：`P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`

**關鍵內容**：
- 系統採用：易經矩陣系統（I Ching Matrix System）
- 結構層：八卦 / 六十四卦（State Space, Facet Space, Hexagram）
- 動態層：五行生剋（Dynamics, Interpretation）
- 運算層：雙軌制（Root × Flow）

### 1.2 易經矩陣系統實作

**文件位置**：
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/P0-5.6_COMPLETE_TASK_PACKAGE.md`
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/P0-5.6_ENGINEER_BRIEF.md`

**實作文件**：
- `engine/root_element_mapper.py` - DOB → Root Element
- `engine/hexagram_deriver.py` - Stage 1-3 → Hexagram
- `engine/collision_calculator.py` - Root × Flow → Collision Key
- `domain/facets/income_expansion_pressure/hexagram_mapping.v1.0.json` - Facet 錨定對照表
- `docs/HEXAGRAM_ID_POLICY.md` - Hexagram ID 規範（0-63）

### 1.3 世界觀設計文件

**文件位置**：
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGNER_BRIEF.md`

**關鍵內容**：
- 雙重計算機制（科學 + 玄學）
- Stage 1-4 互動方式定義
- AI 敘事生成層規範
- 視覺風格指南

---

## 二、研究資料（Research）

**資料夾位置**：`docs/domain/research/`

**待盤點內容**：
- 需要檢查 research 資料夾中的所有文件
- 查找與易經、五行、八卦相關的背景知識
- 查找與心理學對應相關的資料

---

## 三、舊版本資料（Legacy）

**資料夾位置**：`docs/legacy/`

**待盤點內容**：
- 需要檢查 legacy 資料夾中過去失敗版本的玄學相關資料
- 查找過去使用的玄學系統、詞彙、對應關係等

---

## 四、現有演算法邏輯

### 4.1 Root Element Mapper

**文件**：`engine/root_element_mapper.py`

**功能**：
- 從 DOB 計算 Root Element（五行）
- 使用天干對應五行
- 目前僅有基礎實作

**需要擴充**：
- 更完整的五行對應邏輯
- 地支對應
- 其他計算方式

### 4.2 Hexagram Deriver

**文件**：`engine/hexagram_deriver.py`

**功能**：
- 從 Stage 1-3 輸入推導 Hexagram ID
- 計算 Changing Line
- 目前僅有基礎實作（僅支援部分卦象）

**需要擴充**：
- 完整的 64 卦映射邏輯
- 更完整的變爻計算
- 與 Facet 的完整對應

### 4.3 Collision Calculator

**文件**：`engine/collision_calculator.py`

**功能**：
- 計算 Root × Flow 的碰撞鍵
- 五行生剋關係
- 目前僅有簡化的關係表

**需要擴充**：
- 完整的五行生剋邏輯
- 更複雜的關係計算
- 與心理學狀態的對應

---

## 五、資料收集目標

### 5.1 背景知識與資料

1. **易經系統**：
   - 64 卦的完整定義
   - 卦象的意義與解釋
   - 變爻的計算與解釋
   - 卦象之間的關係

2. **五行系統**：
   - 五行的完整定義
   - 五行生剋關係
   - 五行與其他系統的對應
   - 五行在命理中的應用

3. **八卦系統**：
   - 八卦的定義與意義
   - 八卦與 64 卦的關係
   - 八卦在系統中的應用

### 5.2 運算邏輯

1. **計算方法**：
   - Root Element 的計算方法
   - Hexagram 的推導方法
   - Changing Line 的計算方法
   - Collision 的計算方法

2. **對應關係**：
   - 玄學系統與心理學的對應
   - 玄學系統與科學計算的對應
   - 詞彙與概念的對應

### 5.3 詞彙與呈現

1. **詞彙庫**：
   - 玄學詞彙
   - 形容詞
   - 敘事用語
   - 對應的心理學詞彙（僅內部使用，不呈現給使用者）

2. **呈現方式**：
   - 如何將玄學概念呈現給使用者
   - 如何將科學結果轉換為玄學敘事
   - 語境與語氣

### 5.4 題目設計對應

1. **題目設計**：
   - 如何用玄學語境設計題目
   - 題目與玄學系統的對應
   - 題目與科學系統的對應

2. **結果呈現對應**：
   - 結果如何對應到玄學系統
   - 結果如何對應到科學系統
   - 結果的呈現方式

---

## 六、待完成項目

- [ ] 盤點 research 資料夾
- [ ] 盤點 legacy 資料夾
- [ ] 整理現有演算法邏輯
- [ ] 整理現有對應關係
- [ ] 識別缺失的資料
- [ ] 建立資料收集計劃

---

**狀態**：IN_PROGRESS  
**建立日期**：2026-01-11
