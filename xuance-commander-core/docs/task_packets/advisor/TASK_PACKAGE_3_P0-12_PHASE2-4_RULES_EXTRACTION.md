# 任務包 3：P0-12 階段二-4 規則提取包

**建立日期**：2026-01-13  
**執行對象**：GPT / GEMINI（任務執行者）  
**狀態**：READY FOR EXECUTION（受阻）  
**優先級**：MEDIUM

---

## 📋 任務目標

分析 Legacy 系統中的規則與制度，提取並整合到現有系統。

---

## ⚠️ 重要發現

**Legacy 檔案未找到**：
- Legacy 資料夾 `docs/legacy/115_1_3_my-first-app_failed/` 不存在
- 無法找到 `intervention_boundary_matrix`, `guidancePrinciples`, `buildGuidance.js` 檔案

**需要執行的行動**：
1. 搜尋整個專案，確認 Legacy 檔案是否存在
2. 如果找不到，標記為「無法定位，待後續處理」
3. 如果找到，進行規則提取和分析

---

## 🎯 待完成工作

1. 分析 `intervention_boundary_matrix` 的規則
2. 提取 `guidancePrinciples` 的邏輯
3. 分析 `buildGuidance.js` 的決策邏輯
4. 建立呈現規則文件

---

## 📚 背景資料

### 現有系統架構

**檔案位置**：
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` - 現有系統架構
- `specs/integration/ui_engine/P0-12_LEGACY_INTEGRATION_TASK_PACKET.md` - Legacy 整合任務包
- `docs/governance/LEGACY_REFERENCE_RULES.md` - Legacy 參考規則

**核心概念**：
- 現有系統使用 JSON 結構（narratives, recommendations, riskchains）
- 結果呈現使用 L1-L4 分層架構
- 規則必須符合現有 Schema 和架構

### Legacy 系統描述

**根據任務包描述**：
- Legacy 系統使用 JavaScript 模組（`buildGuidance.js`）
- Legacy 系統使用模板系統（`anchor_statements`, `intervention_boundary_matrix` 等）
- Legacy 系統的規則邏輯可能比現有系統複雜

**可能位置**：
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/`

---

## 🔧 需要執行的行動

### 步驟 1：確認 Legacy 檔案位置

**行動**：
1. 搜尋整個專案，確認 Legacy 檔案是否存在
2. 檢查以下可能位置：
   - `docs/legacy/115_1_3_my-first-app_failed/import/`
   - `docs/research/legacy_analysis/`
   - `docs/governance/LEGACY_REFERENCE_RULES.md`（參考規則文件）
3. 如果找不到，標記為「無法定位，待後續處理」

**驗收標準**：
- ✅ Legacy 檔案位置已確認（或標記為「無法定位」）

---

### 步驟 2：分析規則邏輯（如果找到檔案）

**行動**：
1. 分析 `intervention_boundary_matrix` 的規則結構
2. 提取 `guidancePrinciples` 的邏輯
3. 分析 `buildGuidance.js` 的決策邏輯
4. 識別可用的規則和邏輯
5. 識別需要過濾的內容（不符合現有系統架構的部分）

**驗收標準**：
- ✅ 規則邏輯已分析
- ✅ 可用的規則已識別
- ✅ 需要過濾的內容已識別

---

### 步驟 3：建立呈現規則文件（如果找到檔案）

**行動**：
1. 建立 `domain/knowledge_base/presentation_rules.v1.0.md` 或類似文件
2. 整合規則邏輯到現有系統
3. 確保規則符合現有 Schema 和架構
4. 確保規則符合「去問卷化」原則和語境純粹性要求

**驗收標準**：
- ✅ 呈現規則文件已建立
- ✅ 規則邏輯與現有系統一致
- ✅ 規則符合現有 Schema 和架構

---

### 步驟 4：驗證整合（如果找到檔案）

**行動**：
1. 驗證規則邏輯與現有系統的一致性
2. 確保規則可以正常運作
3. 測試規則的合理性

**驗收標準**：
- ✅ 規則邏輯與現有系統一致
- ✅ 規則可以正常運作
- ✅ 規則的合理性已驗證

---

## 📝 詳細執行指南

### 如果找到 Legacy 檔案

**分析重點**：
1. **`intervention_boundary_matrix`**：
   - 規則結構
   - 決策邏輯
   - 如何映射到現有系統的 L1-L4 分層架構

2. **`guidancePrinciples`**：
   - 指導原則的邏輯
   - 如何映射到現有系統的 recommendations

3. **`buildGuidance.js`**：
   - 決策邏輯
   - 如何映射到現有系統的結果呈現

**整合策略**：
- 保留所有可用資訊
- 調整符合現有需求
- 確保規則符合現有 Schema 和架構

---

### 如果找不到 Legacy 檔案

**行動**：
1. 標記為「無法定位，待後續處理」
2. 記錄搜尋過程和結果
3. 提供後續處理建議

**驗收標準**：
- ✅ 已標記為「無法定位，待後續處理」
- ✅ 搜尋過程和結果已記錄
- ✅ 後續處理建議已提供

---

## ✅ 驗收標準

### 必須完成

1. ✅ Legacy 檔案位置已確認（或標記為「無法定位」）
2. ✅ 如果找到檔案，規則邏輯已分析
3. ✅ 如果找到檔案，呈現規則文件已建立
4. ✅ 如果找不到檔案，已標記為「無法定位，待後續處理」

### 建議完成

5. ✅ 如果找到檔案，規則邏輯與現有系統一致
6. ✅ 如果找到檔案，規則可以正常運作

---

## 📦 交付物

完成後應產出：
1. ✅ 搜尋報告（記錄 Legacy 檔案位置或「無法定位」）
2. ✅ 如果找到檔案：
   - 規則分析報告
   - 呈現規則文件（`domain/knowledge_base/presentation_rules.v1.0.md`）
3. ✅ 如果找不到檔案：
   - 「無法定位」標記文件
   - 後續處理建議

---

**建立日期**：2026-01-13  
**執行對象**：GPT / GEMINI（任務執行者）  
**狀態**：READY FOR EXECUTION（受阻）
