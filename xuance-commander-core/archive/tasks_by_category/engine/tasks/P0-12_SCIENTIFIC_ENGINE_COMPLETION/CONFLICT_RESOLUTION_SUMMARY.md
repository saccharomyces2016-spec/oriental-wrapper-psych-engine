# 檔案衝突整理總結報告

**建立日期**：2026-01-12  
**目的**：全面盤點與 P0-4.5 Stage 設計相關的檔案衝突，以後期檔案為準進行整理  
**基準檔案**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`（2026-01-12 13:45:34）

---

## 🎯 整理原則

1. **P0-4.5 為準**：所有與 Stage 1/2/3 設計相關的衝突，以 `P0-4.5_FUNNEL_SYSTEM_DESIGN.md` 為準
2. **後期檔案優先**：相衝突的部分以後期（更新時間較晚）的檔案為準
3. **保留任務包**：`CORE_ENGINE_INTEGRATION_TASK_PACKET.md` 已更新，等此臨時任務完成後再繼續操作

---

## ✅ 已完成的修正

### 1. 核心設計文件修正

**`domain/knowledge_base/question_design_guidelines.v1.0.md`**
- ✅ 修正 Stage 1：八卦錨定 → **八卦定方位**
- ✅ 修正 Stage 2：五行狀態 → **六親定物象（符號雲界面）**
- ✅ 修正 Stage 3：深度剖析 → **萬象定歸因**
- ✅ 已標註以 P0-4.5 為準

### 2. 任務包更新

**`P0-12_SCIENTIFIC_ENGINE_COMPLETION/CORE_ENGINE_INTEGRATION_TASK_PACKET.md`**
- ✅ 更新 Stage 1/2/3 的設計描述，與 P0-4.5 一致
- ✅ 明確標註以 P0-4.5 為準
- ✅ 移除衝突說明，統一為 P0-4.5 設計

---

## 📋 識別到的衝突

### 衝突 1：Stage 2 設計不一致（已解決）

**基準（P0-4.5）**：
- **Stage 2：六親定物象（The Context Lock）**
- 界面類型：符號雲 / 物象群 (Symbol Cloud)
- 互動方式：多選 2–3 項
- 物象分類：Authority (印)、Power (官)、Resource (財)、Peer (比)、Output (食)

**衝突檔案（已修正）**：
1. ✅ `question_design_guidelines.v1.0.md` - 已修正
2. ✅ `CORE_ENGINE_INTEGRATION_TASK_PACKET.md` - 已更新

**衝突檔案（需檢查）**：
3. ⚠️ `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`（2026-01-11 15:58:59）
   - 提到「Stage 2: 五行定物象」
   - 狀態：需確認是否為活躍文件

4. ⚠️ `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`（2026-01-11 15:12:00）
   - 提到「Stage 2 — Radial Compass（五行定物象）」
   - 狀態：需確認是否為活躍文件

5. ⚠️ `P0-5/P0-5_HANDOFF_SUMMARY.md`（2026-01-11 10:26:26）
   - 提到「Stage 2：萬象定物象（The Phenomenon Compass）」
   - 注意：此文件提到「相對於 P0-4.5 設計，將「萬象羅盤」提前至 Stage 2」
   - 狀態：需確認此變更是否被接受，或應以 P0-4.5 為準

### 衝突 2：Stage 1 命名不一致（已解決）

**基準（P0-4.5）**：
- **Stage 1：八卦定方位（The Domain Gate）**

**衝突檔案（已修正）**：
1. ✅ `question_design_guidelines.v1.0.md` - 已修正（八卦錨定 → 八卦定方位）

### 衝突 3：Stage 3 命名不一致（已解決）

**基準（P0-4.5）**：
- **Stage 3：萬象定歸因（The Attribution Matrix）**

**衝突檔案（已修正）**：
1. ✅ `question_design_guidelines.v1.0.md` - 已修正（深度剖析 → 萬象定歸因）

---

## 📊 檔案更新時間對照

| 檔案 | 更新時間 | 狀態 | 修正狀態 |
|------|----------|------|----------|
| `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` | 2026-01-12 13:45:34 | ✅ 基準檔案 | 無需修正 |
| `P0-4.5/P0-4.5_PHASE_LOG.md` | 2026-01-12 13:45:34 | ✅ 一致 | 無需修正 |
| `P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md` | 2026-01-12 13:45:34 | ✅ 一致 | 無需修正 |
| `CORE_ENGINE_INTEGRATION_TASK_PACKET.md` | 2026-01-12 16:40:08 | ✅ 已更新 | 已完成 |
| `question_design_guidelines.v1.0.md` | 2026-01-11 19:43:29 | ✅ 已修正 | 已完成 |
| `P0-5.7_DESIGN_DOC_FINAL.md` | 2026-01-11 15:58:59 | ⚠️ 需檢查 | 待確認 |
| `P0-5.5_ELEMENT_SELECTION_DECISION.md` | 2026-01-11 15:12:00 | ⚠️ 需檢查 | 待確認 |
| `P0-5_HANDOFF_SUMMARY.md` | 2026-01-11 10:26:26 | ⚠️ 需檢查 | 待確認 |

---

## 📝 完整修正記錄

### 修正 1：`domain/knowledge_base/question_design_guidelines.v1.0.md`

**修正前**：
- Stage 1（八卦錨定）
- Stage 2（五行狀態）
- Stage 3（深度剖析）

**修正後**：
- Stage 1（八卦定方位）- 界面類型：八卦轉輪 (Ba Gua Wheel) 或 八門卡片
- Stage 2（六親定物象）- 界面類型：符號雲 / 物象群 (Symbol Cloud)
- Stage 3（萬象定歸因）- 界面類型：萬象羅盤 / 星盤 (Phenomenon Compass)

**修正時間**：2026-01-12

---

### 修正 2：`P0-12_SCIENTIFIC_ENGINE_COMPLETION/CORE_ENGINE_INTEGRATION_TASK_PACKET.md`

**修正內容**：
1. 更新「設計規範要求」段落，明確以 P0-4.5 為準
2. 更新「網頁架構設計結論」段落，統一 Stage 1/2/3 描述
3. 移除衝突說明，統一為 P0-4.5 設計
4. 更新「顧問團隊需要回答的問題」中的 Stage 描述

**修正時間**：2026-01-12

---

## ⚠️ 需要進一步確認的檔案

### 1. P0-5 相關檔案

**`P0-5/P0-5_HANDOFF_SUMMARY.md`**
- 提到「Stage 2：萬象定物象（The Phenomenon Compass）」
- 提到「相對於 P0-4.5 設計，將「萬象羅盤」提前至 Stage 2」
- **問題**：這是 P0-5 的變更決策，還是應該以 P0-4.5 為準？
- **建議**：需要確認 P0-5 的變更是否被接受，或應以 P0-4.5 為準

### 2. P0-5.7 相關檔案

**`P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`**
- 提到「Stage 2: 五行定物象 (The Elemental Labyrinth)」
- **問題**：這是活躍設計文件，還是已歸檔的歷史文件？
- **建議**：如果是活躍文件，需要標註以 P0-4.5 為準

### 3. P0-5.5 相關檔案

**`P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`**
- 提到「Stage 2 — Radial Compass（五行定物象）」
- **問題**：這是活躍設計文件，還是已歸檔的歷史文件？
- **建議**：如果是活躍文件，需要標註以 P0-4.5 為準

---

## 🎯 P0-4.5 最終設計（基準）

### Stage 1：八卦定方位（The Domain Gate）
- 界面類型：八卦轉輪 (Ba Gua Wheel) 或 八門卡片
- 互動方式：單選（強制，必須選擇一個，包含「中宮/混沌」）
- 目的：鎖定大領域，建立付費邊界
- 數據輸出：`domain_id` 對應八卦代碼

### Stage 2：六親定物象（The Context Lock）
- 界面類型：符號雲 / 物象群 (Symbol Cloud)
- 互動方式：多選 2–3 項
- 目的：鎖定具體人事物，避免抽象歸因
- 數據輸出：`context_items[]` 陣列
- 物象分類：Authority (印)、Power (官)、Resource (財)、Peer (比)、Output (食)

### Stage 3：萬象定歸因（The Attribution Matrix）
- 界面類型：萬象羅盤 / 星盤 (Phenomenon Compass)
- 互動方式：投射式選擇（單選或少量多選）
- 目的：診斷歸因模式與能動性
- 數據輸出：`attribution_profile{}` 物件

---

## 📋 整理完成清單

### ✅ 已完成

1. ✅ 識別所有與 P0-4.5 Stage 設計相關的檔案
2. ✅ 識別主要衝突點（Stage 1/2/3 命名和設計不一致）
3. ✅ 建立衝突整理報告
4. ✅ 修正核心設計文件（`question_design_guidelines.v1.0.md`）
5. ✅ 更新任務包（`CORE_ENGINE_INTEGRATION_TASK_PACKET.md`）

### ⏳ 待確認

1. ⏳ 確認 P0-5 相關檔案的變更是否應以 P0-4.5 為準
2. ⏳ 確認 P0-5.7、P0-5.5 相關檔案是否為活躍文件
3. ⏳ 檢查其他提到 Stage 1/2/3 的檔案（如 memory/briefs 等）

---

---

## 📌 重要說明

### P0-5 相關檔案的變更說明

**`P0-5/P0-5_HANDOFF_SUMMARY.md`** 提到：
- 「相對於 P0-4.5 設計，將「萬象羅盤」提前至 Stage 2」
- 「Stage 2：萬象定物象（The Phenomenon Compass）」

**注意**：這是 P0-5 階段的變更決策，但根據用戶要求，**所有衝突以 P0-4.5 為準**。因此：
- P0-4.5 的設計：Stage 2 是「六親定物象（符號雲界面）」
- P0-5 的變更：需要確認是否應以 P0-4.5 為準，或保留 P0-5 的變更

**建議**：需要用戶確認 P0-5 的變更是否應以 P0-4.5 為準。

---

**文件狀態**：核心修正已完成  
**基準檔案**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`（2026-01-12 13:45:34）  
**整理原則**：所有衝突以 P0-4.5 為準  
**任務包狀態**：已保留，等此臨時任務完成後再繼續操作
