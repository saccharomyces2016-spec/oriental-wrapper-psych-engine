# P0-11 Legacy 資料盤點報告

**建立日期**：2026-01-11  
**目的**：盤點 docs/legacy 資料夾中的舊版本玄學相關資料，評估是否可用於升級現有系統

---

## 一、P0-11 完成範圍確認

### 1.1 已完成內容

**✅ 階段一：基礎知識庫建立**
- `domain/knowledge_base/hexagram_64_full.v1.0.json` - 64 卦基礎知識庫（30KB）
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行基礎知識庫（3.8KB）
- `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦基礎知識庫（2.3KB）
- `domain/knowledge_base/mapping_tables.v1.0.json` - 基礎對應關係表（2.0KB）

**✅ 階段二：運算邏輯完善**
- `engine/root_element_mapper.py` - Root Element Mapper
- `engine/hexagram_deriver.py` - Hexagram Deriver
- `engine/collision_calculator.py` - Collision Calculator

**✅ 階段三：詞彙庫與對應關係**
- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫（CN/EN，5.1KB）
- `domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json` - 心理學對應詞彙表（1.5KB）
- `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範（5.7KB）
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞清單（2.3KB）

**✅ 階段四：題目設計與結果呈現對應**
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計對應指南（3.6KB）
- `domain/knowledge_base/result_presentation_design.v1.0.md` - 結果呈現對應設計（2.4KB）
- `domain/knowledge_base/ai_narrative_spec.v1.0.md` - AI 敘事生成對應規範（2.6KB）

### 1.2 完成狀態總結

**✅ P0-11 已完成的內容**：
- ✅ 完整的玄學知識庫系統（64 卦、五行、八卦、對應關係表）
- ✅ 完整的運算引擎系統（Root Element Mapper、Hexagram Deriver、Collision Calculator）
- ✅ 完整的詞彙庫系統（玄學詞彙、心理學對應、呈現規範、禁用詞）
- ✅ 完整的設計規範系統（題目設計、結果呈現、AI 敘事）

**結論**：✅ **是的，P0-11 已經把玄學相關的所有背景資料以及運算邏輯都處理好了**

---

## 二、Legacy 資料位置盤點

### 2.1 Legacy 資料夾位置

**主要位置**：`docs/legacy/115_1_3_my-first-app_failed/`

**資料夾規模**：
- 總大小：約 16MB
- 檔案數量：約 499 個檔案
- 主要資料夾：
  - `_meta/` - 元資料
  - `extract/` - 萃取報告
  - `import/my-first-app/` - 舊版本應用程式代碼

### 2.2 關鍵資料位置

#### 2.2.1 玄學相關資料

**五行對應資料**：
- `import/my-first-app/archive/legacy/core-content/resultTemplates/five_element_mapping.v1.json` - 五行對應表（3.5KB）

**題庫資料**：
- `import/my-first-app/archive/legacy/questionBank.v1.json` - 舊題庫（78KB）
- `import/my-first-app/archive/legacy/round2Situations.v1.json` - 情境資料（34KB）

**結果模板**：
- `import/my-first-app/archive/legacy/core-content/resultTemplates/` - 結果模板資料夾
  - `anchor_statements.v1.json` - 錨定語句（50KB）
  - `intervention_boundary_matrix.v1.json` - 介入邊界矩陣（2.2KB）
  - `attribution_error_matrix.v1.json` - 歸因錯誤矩陣（2.1KB）
  - `consequence_chain_library.v1.json` - 後果鏈庫（2.1KB）

**玄學文檔**：
- `import/my-first-app/docs/metaphysics/ELEMENT_PRIOR_SPEC.md` - 元素優先規格
- `import/my-first-app/docs/metaphysics/NARRATIVE_BINDING_SPEC.md` - 敘事綁定規格

**玄學核心代碼**：
- `import/my-first-app/src/metaphysics/` - 玄學相關源代碼資料夾
- `import/my-first-app/packages/core/src/metaphysics/` - 玄學核心包

**舊版本引擎**：
- `import/my-first-app/archive/legacy_question_bank/2025-12-31/src/_deprecated/core/WuXingEngine.js` - 五行引擎（需進一步確認）

#### 2.2.2 萃取報告

**可重用資產報告**：
- `extract/REUSABLE_ASSETS.md` - 可重用資產清單

**資料盤點報告**：
- `extract/INVENTORY.md` - 資料盤點清單

**失敗模式報告**：
- `extract/FAILURE_PATTERNS.md` - 失敗模式分析

---

## 三、初步發現

### 3.1 可能有用的資料

**✅ 可直接參考**：
1. **五行對應表** (`five_element_mapping.v1.json`)
   - 可能包含與現有 `wuxing_5_elements.v1.0.json` 不同的對應關係
   - 需要比對結構和內容

2. **題庫資料** (`questionBank.v1.json`, `round2Situations.v1.json`)
   - 可能包含有用的題目範例
   - 需要檢查是否符合現有的「去問卷化」原則

3. **結果模板** (`resultTemplates/`)
   - 可能包含有用的敘事模板
   - 需要檢查是否符合現有的語境純粹性要求

4. **玄學文檔** (`docs/metaphysics/`)
   - 可能包含設計思路和規格
   - 需要檢查是否符合現有系統設計

### 3.2 需要注意的事項

**⚠️ 可能不符合現有設計**：
1. **語境純粹性**：舊版本可能包含心理學名詞或科學術語
2. **系統架構**：舊版本可能使用不同的系統架構（如「歲時農耕」隱喻）
3. **資料格式**：舊版本可能使用不同的 JSON 結構

---

## 四、建議的評估步驟

### 4.1 第一步：詳細內容檢查

1. **檢查五行對應表**：
   - 讀取 `five_element_mapping.v1.json` 的完整內容
   - 比對與現有 `wuxing_5_elements.v1.0.json` 的差異
   - 評估是否有可用的對應關係需要整合

2. **檢查題庫資料**：
   - 讀取 `questionBank.v1.json` 的部分內容
   - 檢查題目是否符合「去問卷化」原則
   - 評估是否有可用的題目範例

3. **檢查結果模板**：
   - 讀取結果模板的內容
   - 檢查敘事是否符合語境純粹性要求
   - 評估是否有可用的敘事模板

4. **檢查玄學文檔**：
   - 讀取玄學相關規格文件
   - 比對與現有系統設計的差異
   - 評估是否有可用的設計思路

### 4.2 第二步：比對與整合評估

1. **比對結構**：比較 Legacy 資料與現有系統的資料結構
2. **比對內容**：比較 Legacy 資料與現有系統的內容差異
3. **識別可用部分**：識別哪些資料可以直接使用或需要轉換
4. **制定整合計劃**：制定整合 Legacy 資料的計劃

---

## 五、下一步行動

### 5.1 立即行動

1. ⏳ **詳細檢查 Legacy 資料內容**：讀取關鍵檔案，了解其結構和內容
2. ⏳ **比對現有系統**：比較 Legacy 資料與現有 P0-11 完成內容
3. ⏳ **評估可用性**：判斷哪些 Legacy 資料可以直接使用或需要整合

### 5.2 評估標準

**可用性評估標準**：
- ✅ **可直接使用**：內容完整、格式正確、與現有系統相容
- ⚠️ **需要整合**：內容有用但需要轉換格式或調整結構
- ❌ **不可使用**：內容過時、格式不兼容、或與現有系統衝突

---

## 六、關鍵檔案清單

### 6.1 高優先級檔案（需優先檢查）

1. `import/my-first-app/archive/legacy/core-content/resultTemplates/five_element_mapping.v1.json` - 五行對應表
2. `import/my-first-app/docs/metaphysics/ELEMENT_PRIOR_SPEC.md` - 元素優先規格
3. `import/my-first-app/docs/metaphysics/NARRATIVE_BINDING_SPEC.md` - 敘事綁定規格
4. `extract/REUSABLE_ASSETS.md` - 可重用資產清單
5. `extract/INVENTORY.md` - 資料盤點清單

### 6.2 中優先級檔案（可參考）

1. `import/my-first-app/archive/legacy/questionBank.v1.json` - 舊題庫
2. `import/my-first-app/archive/legacy/core-content/resultTemplates/anchor_statements.v1.json` - 錨定語句
3. `import/my-first-app/src/metaphysics/` - 玄學相關源代碼

### 6.3 低優先級檔案（次要參考）

1. `import/my-first-app/archive/legacy_question_bank/` - 舊題庫資料夾
2. `import/my-first-app/packages/core/src/metaphysics/` - 玄學核心包

---

**狀態**：IN_PROGRESS  
**最後更新**：2026-01-11
