# 檔案衝突整理報告

**建立日期**：2026-01-12  
**目的**：全面盤點與 P0-4.5 Stage 設計相關的檔案衝突，以後期檔案為準進行整理  
**基準檔案**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`（2026-01-12 13:45:34）

---

## 🎯 整理原則

1. **P0-4.5 為準**：所有與 Stage 1/2/3 設計相關的衝突，以 `P0-4.5_FUNNEL_SYSTEM_DESIGN.md` 為準
2. **後期檔案優先**：相衝突的部分以後期（更新時間較晚）的檔案為準
3. **保留任務包**：`CORE_ENGINE_INTEGRATION_TASK_PACKET.md` 先保留，等此臨時任務完成後再繼續操作

---

## 📋 識別到的衝突

### 衝突 1：Stage 2 設計不一致

**基準（P0-4.5，2026-01-12 13:45:34）**：
- **Stage 2：六親定物象（The Context Lock）**
- 界面類型：符號雲 / 物象群 (Symbol Cloud)
- 互動方式：多選 2–3 項
- 物象分類：Authority (印)、Power (官)、Resource (財)、Peer (比)、Output (食)

**衝突檔案**：
1. `domain/knowledge_base/question_design_guidelines.v1.0.md`（2026-01-11 19:43:29）
   - 說 Stage 2 是「五行狀態」
   - 描述五種能量狀態（生長、顯化、穩定、收斂、流動）
   - 對應 `wuxing_5_elements.v1.0.json`

2. `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`
   - 提到「Stage 2: 五行定物象 (The Elemental Labyrinth)」
   - 使用五行羅盤

3. `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`
   - 提到「Stage 2 — Radial Compass（五行定物象 / Symbol Selection）」

4. `P0-5/P0-5_HANDOFF_SUMMARY.md`
   - 提到「Stage 2：萬象定物象（The Phenomenon Compass）」
   - 提到「萬象羅盤（Radial Compass）」

**決策**：以 P0-4.5 為準，Stage 2 是「六親定物象（符號雲界面）」，不是五行狀態

---

### 衝突 2：Stage 1 命名不一致

**基準（P0-4.5）**：
- **Stage 1：八卦定方位（The Domain Gate）**

**衝突檔案**：
1. `domain/knowledge_base/question_design_guidelines.v1.0.md`
   - 說 Stage 1 是「八卦錨定」

**決策**：以 P0-4.5 為準，Stage 1 是「八卦定方位」

---

### 衝突 3：Stage 3 命名不一致

**基準（P0-4.5）**：
- **Stage 3：萬象定歸因（The Attribution Matrix）**

**衝突檔案**：
1. `domain/knowledge_base/question_design_guidelines.v1.0.md`
   - 說 Stage 3 是「深度剖析」

**決策**：以 P0-4.5 為準，Stage 3 是「萬象定歸因」

---

## 📝 需要修正的檔案清單

### 高優先級（核心設計文件）

1. **`domain/knowledge_base/question_design_guidelines.v1.0.md`**
   - 衝突內容：Stage 1/2/3 的命名和設計描述
   - 需要修正：
     - Stage 1：改為「八卦定方位」（不是「八卦錨定」）
     - Stage 2：改為「六親定物象（符號雲界面）」（不是「五行狀態」）
     - Stage 3：改為「萬象定歸因」（不是「深度剖析」）
   - 更新時間：2026-01-11 19:43:29（早於 P0-4.5）

2. **`P0-12_SCIENTIFIC_ENGINE_COMPLETION/CORE_ENGINE_INTEGRATION_TASK_PACKET.md`**
   - 衝突內容：任務包中提到的 Stage 2 設計
   - 需要修正：明確 Stage 2 是「符號雲界面」，不是五行盤
   - 更新時間：2026-01-12 16:40:08（晚於 P0-4.5，但需要確認一致性）

### 中優先級（其他設計文件）

3. **`P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`**
   - 衝突內容：提到「Stage 2: 五行定物象」
   - 需要修正：改為「Stage 2: 六親定物象（符號雲界面）」

4. **`P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`**
   - 衝突內容：提到「Stage 2 — Radial Compass（五行定物象）」
   - 需要修正：改為「Stage 2：六親定物象（符號雲界面）」

5. **`P0-5/P0-5_HANDOFF_SUMMARY.md`**
   - 衝突內容：提到「Stage 2：萬象定物象（The Phenomenon Compass）」
   - 需要修正：改為「Stage 2：六親定物象（符號雲界面）」

### 低優先級（參考文件，可能不需要修正）

6. 其他提到 Stage 1/2/3 的檔案（如 P0-11、P0-12 相關檔案）
   - 這些可能是歷史記錄或備份檔案
   - 需要逐一檢查是否為活躍文件

---

## 🔧 修正執行計劃

### 步驟 1：修正核心設計文件

**優先級 1**：`domain/knowledge_base/question_design_guidelines.v1.0.md`
- 這是核心設計指南，必須與 P0-4.5 一致
- 修正 Stage 1/2/3 的命名和描述

### 步驟 2：更新任務包

**優先級 2**：`P0-12_SCIENTIFIC_ENGINE_COMPLETION/CORE_ENGINE_INTEGRATION_TASK_PACKET.md`
- 確保任務包中的 Stage 設計描述與 P0-4.5 一致
- 明確標註以 P0-4.5 為準

### 步驟 3：檢查其他文件

**優先級 3**：其他設計文件
- 檢查是否為活躍文件
- 如果是活躍文件，需要修正
- 如果是歷史記錄，可以標註為「已過時，以 P0-4.5 為準」

---

## 📊 檔案更新時間對照

| 檔案 | 更新時間 | 狀態 | 需要修正 |
|------|----------|------|----------|
| `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` | 2026-01-12 13:45:34 | ✅ 基準檔案 | 否 |
| `P0-4.5/P0-4.5_PHASE_LOG.md` | 2026-01-12 13:45:34 | ✅ 一致 | 否 |
| `P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md` | 2026-01-12 13:45:34 | ✅ 一致 | 否 |
| `CORE_ENGINE_INTEGRATION_TASK_PACKET.md` | 2026-01-12 16:40:08 | ⚠️ 需確認 | 是（需確認一致性） |
| `question_design_guidelines.v1.0.md` | 2026-01-11 19:43:29 | ❌ 衝突 | 是（必須修正） |
| `P0-5.7_DESIGN_DOC_FINAL.md` | 未知 | ⚠️ 需檢查 | 需檢查 |
| `P0-5.5_ELEMENT_SELECTION_DECISION.md` | 未知 | ⚠️ 需檢查 | 需檢查 |
| `P0-5_HANDOFF_SUMMARY.md` | 未知 | ⚠️ 需檢查 | 需檢查 |

---

## ✅ 整理記錄

### 已完成的整理

1. ✅ 識別所有與 P0-4.5 Stage 設計相關的檔案
2. ✅ 識別主要衝突點（Stage 2 設計不一致）
3. ✅ 建立衝突整理報告

### 已執行的整理

1. ✅ 修正 `question_design_guidelines.v1.0.md`
   - Stage 1：改為「八卦定方位」（不是「八卦錨定」）
   - Stage 2：改為「六親定物象（符號雲界面）」（不是「五行狀態」）
   - Stage 3：改為「萬象定歸因」（不是「深度剖析」）
   - 已標註以 P0-4.5 為準

2. ✅ 更新 `CORE_ENGINE_INTEGRATION_TASK_PACKET.md`
   - 明確標註以 P0-4.5 為準
   - 更新 Stage 1/2/3 的設計描述
   - 移除衝突說明，統一為 P0-4.5 設計

### 待執行的整理

3. ⏳ 檢查其他設計文件（P0-5.7、P0-5.5、P0-5_HANDOFF）
   - 需要確認這些文件是否為活躍文件
   - 如果是活躍文件，需要標註以 P0-4.5 為準
   - 如果是歷史記錄，可以標註為「已過時，以 P0-4.5 為準」

---

## 📋 完整修正清單

### 已修正的檔案

1. ✅ **`domain/knowledge_base/question_design_guidelines.v1.0.md`**
   - 修正內容：
     - Stage 1：八卦錨定 → 八卦定方位
     - Stage 2：五行狀態 → 六親定物象（符號雲界面）
     - Stage 3：深度剖析 → 萬象定歸因
   - 已標註以 P0-4.5 為準

2. ✅ **`P0-12_SCIENTIFIC_ENGINE_COMPLETION/CORE_ENGINE_INTEGRATION_TASK_PACKET.md`**
   - 修正內容：
     - 更新 Stage 1/2/3 的設計描述，與 P0-4.5 一致
     - 明確標註以 P0-4.5 為準
     - 移除衝突說明

### 需要檢查的檔案

3. ⚠️ **`P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`**（2026-01-11 15:58:59）
   - 衝突內容：提到「Stage 2: 五行定物象」
   - 狀態：需要確認是否為活躍文件
   - 建議：如果是活躍文件，需要標註以 P0-4.5 為準

4. ⚠️ **`P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`**（2026-01-11 15:12:00）
   - 衝突內容：提到「Stage 2 — Radial Compass（五行定物象）」
   - 狀態：需要確認是否為活躍文件
   - 建議：如果是活躍文件，需要標註以 P0-4.5 為準

5. ⚠️ **`P0-5/P0-5_HANDOFF_SUMMARY.md`**（2026-01-11 10:26:26）
   - 衝突內容：提到「Stage 2：萬象定物象（The Phenomenon Compass）」
   - 狀態：需要確認是否為活躍文件
   - 注意：此文件提到「相對於 P0-4.5 設計，將「萬象羅盤」提前至 Stage 2」，這是一個變更說明，需要確認是否被接受
   - 建議：如果是活躍文件，需要標註以 P0-4.5 為準

### 其他檔案

6. 其他提到 Stage 1/2/3 的檔案（如 P0-11、P0-12 相關檔案、memory/briefs 等）
   - 這些可能是歷史記錄或備份檔案
   - 建議：逐一檢查是否為活躍文件，如果是活躍文件，需要標註以 P0-4.5 為準

---

**文件狀態**：IN PROGRESS  
**下一步**：檢查其他設計文件，確認是否為活躍文件
