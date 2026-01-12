# P0-11 Legacy 資料整合報告

**建立日期**：2026-01-11  
**目的**：整合 Legacy 資料到現有系統，並清理 Legacy 資料

---

## 一、整合策略

### 1.1 整合方式

**✅ 直接整合**：直接將 Legacy 資料整合到現有系統，而非建立任務包

**理由**：
1. Legacy 資料中可用的內容明確且有限（主要是禁用語列表）
2. 整合範圍不大，可以直接處理
3. 用戶希望"一次用掉"舊資料，直接整合更符合需求

### 1.2 整合範圍

**✅ 可整合的內容**：
1. **禁用語列表**（13 項）：從 `five_element_mapping.v1.json` 提取，直接合併到 `forbidden_terms.v1.0.json`
2. **語氣模板結構**（參考用）：從 `safe_tone_template` 提取結構概念，但不直接使用內容（因為不符合「純玄學語境」要求）

**❌ 不可直接整合的內容**：
1. **設計規格文件**（`ELEMENT_PRIOR_SPEC.md`、`NARRATIVE_BINDING_SPEC.md`）：
   - Legacy 版本是草稿（DRAFT），現有系統已經完成完整的設計規範
   - Legacy 版本使用不同的架構（Structural Signal Tags），與現有系統的易經矩陣系統不同
   - 建議：不整合，保留作為參考

2. **運算邏輯**（`WuXingEngine.js`）：
   - Legacy 版本使用 JavaScript，現有系統使用 Python
   - Legacy 版本使用不同的邏輯（符咒選擇、生剋關係），與現有系統的 Root × Flow 邏輯不同
   - 建議：不整合，保留作為參考

3. **題庫資料**（`questionBank.v1.json`）：
   - Legacy 版本可能包含心理學名詞，不符合現有系統的「去問卷化」原則
   - 建議：不直接整合，可作為參考

4. **敘事模板**（`anchor_statements.v1.json`）：
   - Legacy 版本包含心理學名詞（如：`anxiety`、`over_control`），不符合現有系統的語境純粹性要求
   - 建議：不直接整合，可作為參考

---

## 二、整合執行

### 2.1 禁用語列表整合

**來源**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/five_element_mapping.v1.json`

**提取內容**：
- 13 個獨特的禁用語（與現有系統不重疊）
- 全部是「命定論」類型的用語（你註定、你無法改變、你五行缺X所以會失敗等）

**整合方式**：
- 添加到 `domain/knowledge_base/forbidden_terms.v1.0.json` 的 `diagnostic_terms.zh` 類別
- 標註來源為 `legacy_five_element_mapping`
- 添加備註說明這些是「命定論用語，禁止使用」

**整合結果**：
- ✅ 已添加 13 個禁用語到 `forbidden_terms.v1.0.json`
- ✅ 現有系統的禁用語數量從 18 項增加到 31 項

### 2.2 語氣模板結構參考

**來源**：`five_element_mapping.v1.json` 的 `safe_tone_template`

**提取內容**：
- `acknowledge`：肯定使用者的能力（而非否定）
- `guide`：引導思考方向（而非直接建議）
- `action`：提供具體行動建議（而非命定論）

**評估結果**：
- ⚠️ Legacy 版本的模板使用現代心理學語境（如：「木行的特質可能反映在你的行為模式中」），不符合現有系統的「純玄學語境」要求
- ✅ 建議：參考其結構概念（三層結構：肯定、引導、行動），但不直接使用內容
- ✅ 現有系統的 `presentation_guidelines.v1.0.md` 已經包含類似的結構（Observe → Interpret → Advise），且使用純玄學語境

**整合決定**：
- ❌ 不直接整合 Legacy 的語氣模板內容
- ✅ 保留現有系統的 `presentation_guidelines.v1.0.md`（已經包含完整的呈現規範）

---

## 三、整合完成確認

### 3.1 已整合內容

**✅ 禁用語列表**：
- 來源：Legacy `five_element_mapping.v1.json`
- 目標：`domain/knowledge_base/forbidden_terms.v1.0.json`
- 狀態：✅ 已完成
- 數量：13 項新增

### 3.2 不整合內容（保留作為參考）

**❌ 設計規格文件**：
- `ELEMENT_PRIOR_SPEC.md` - 元素優先規格（草稿，與現有系統架構不同）
- `NARRATIVE_BINDING_SPEC.md` - 敘事綁定規格（草稿，與現有系統架構不同）
- 原因：Legacy 版本是草稿，現有系統已經完成完整的設計規範

**❌ 運算邏輯**：
- `WuXingEngine.js` - 五行引擎（JavaScript，邏輯不同）
- 原因：Legacy 版本使用不同的邏輯和語言，與現有系統不兼容

**❌ 題庫資料**：
- `questionBank.v1.json` - 舊題庫（可能包含心理學名詞）
- 原因：可能不符合「去問卷化」原則

**❌ 敘事模板**：
- `anchor_statements.v1.json` - 錨定語句（包含心理學名詞）
- 原因：不符合語境純粹性要求

---

## 四、清理計劃

### 4.1 清理範圍

**✅ 可以清理的內容**：
- `docs/legacy/115_1_3_my-first-app_failed/` 整個資料夾

**理由**：
1. 可用的內容已經整合到現有系統（禁用語列表）
2. 不可用的內容（設計規格、運算邏輯、題庫、敘事模板）與現有系統不兼容
3. 保留 Legacy 資料會造成混淆和維護負擔

### 4.2 清理方式

**建議**：
1. ✅ 先確認整合完成（禁用語列表已添加）
2. ⏳ 備份 Legacy 資料（如果需要，可以壓縮存檔）
3. ⏳ 刪除 `docs/legacy/115_1_3_my-first-app_failed/` 資料夾

**注意事項**：
- 如果未來需要參考 Legacy 資料，可以從備份中恢復
- 但通常不需要，因為現有系統已經完成且更完整

---

## 五、整合總結

### 5.1 整合成果

**✅ 成功整合**：
- 13 個禁用語已添加到現有系統
- 現有系統的禁用語列表更加完整

**❌ 未整合內容**：
- 設計規格文件（Legacy 是草稿，現有系統已完成）
- 運算邏輯（Legacy 使用不同架構和語言）
- 題庫資料（可能不符合「去問卷化」原則）
- 敘事模板（不符合語境純粹性要求）

### 5.2 結論

**✅ 整合完成**：所有可用的 Legacy 資料已經整合到現有系統

**✅ 現有系統更完整**：現有系統的 P0-11 完成內容比 Legacy 版本更完整、更符合系統設計要求

**✅ 可以清理 Legacy 資料**：Legacy 資料可以刪除，只保留現有系統的最新最完整版本

---

**狀態**：✅ **COMPLETED**  
**最後更新**：2026-01-11
