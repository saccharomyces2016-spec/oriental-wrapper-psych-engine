# P0-5｜Minimal UI Integration（最小 UI 串接）

- Phase: P0-5
- Status: OPEN（任務包待批准）
- Target: 建立最小 UI 串接，讀取 compiled facet 並顯示敘事+建議+風險鏈
- Edit Policy: EDITABLE（skeleton-first；保留未來修改權）

---

## Goal (One sentence)
建立最小 UI 串接，能夠讀取 compiled facet（`income_expansion_pressure` 和 `relationship_imbalance`），並顯示敘事、建議與風險鏈，驗證端到端流程可運作。

---

## Non-goals (Hard)
- ❌ No visual design / polish（不優化視覺設計）
- ❌ No responsive design（不優化響應式設計）
- ❌ No animation / transitions（不優化動畫效果）
- ❌ No user authentication（不實作用戶認證）
- ❌ No payment integration（不實作付費功能，P0-5 僅占位）
- ❌ No cross-facet selection UI（不實作跨 Facet 選擇介面）
- ❌ No advanced UX features（不實作進階 UX 功能）

---

## Deliverables (MVP)

### 1. UI 串接規格文件
- **文件**：`P0-5/P0-5_UI_INTEGRATION_SPEC.md`
- **內容**：
  - 輸入格式（compiled facet JSON 結構）
  - 輸出格式（UI 顯示結構）
  - 數據流（從 compiled facet 到 UI 顯示的完整流程）
  - 錯誤處理（無法讀取或解析失敗時的處理方式）

### 2. 最小 UI 實作
- **文件**：`P0-5/P0-5_UI_IMPLEMENTATION.md`
- **內容**：
  - UI 架構（HTML/CSS/JS 結構）
  - 組件清單（問題顯示、結果顯示、敘事顯示、風險鏈顯示）
  - 數據綁定（如何將 compiled facet 數據綁定到 UI）
  - 測試方法（如何驗證 UI 正確顯示）

### 3. 端到端測試規格
- **文件**：`P0-5/P0-5_E2E_TEST_SPEC.md`
- **內容**：
  - 測試場景（正常流程、錯誤處理、邊界情況）
  - 測試數據（使用 P0-3 和 P0-4 的 golden test 數據）
  - 驗收標準（UI 必須正確顯示的內容）

### 4. 階段日誌
- **文件**：`P0-5/P0-5_PHASE_LOG.md`
- **內容**：記錄每次變更和決策

---

## Success Criteria (MVP) - 成功定義（不可模糊）

### 必須達成
- ✅ 能夠讀取 compiled facet JSON（`income_expansion_pressure` 和 `relationship_imbalance`）
- ✅ 能夠正確顯示問題（questions）
- ✅ 能夠正確顯示結果（narrative、recommendations、risk chains）
- ✅ 能夠正確處理錯誤情況（無法讀取、解析失敗）
- ✅ 端到端流程可運作（從輸入到顯示完整流程）

### 品質要求
- ✅ UI 必須能正確顯示 P0-3 和 P0-4 的輸出
- ✅ UI 必須符合「純玄學體驗」要求（不暴露內部結構）
- ✅ UI 必須可切換 CN/EN（如果時間允許，否則僅 CN）

---

## 任務性質
**技術實作任務**（非內容創作、非設計優化）

---

## 依賴關係
- **前置任務**：
  - ✅ P0-3：Narrative Sharpness（已完成，提供 `income_expansion_pressure` 的完整輸出）
  - ✅ P0-4：Facet Portability（已完成，提供 `relationship_imbalance` 的完整輸出）
- **後續任務**：
  - P0-6：最小付費/權限策略（占位，不優化）

---

## 技術棧（建議）
- **前端**：HTML/CSS/JavaScript（Vanilla JS，不引入框架）
- **數據格式**：JSON（compiled facet）
- **測試**：手動測試 + 簡單自動化測試（如果時間允許）

---

## 狀態
- OPEN（任務包待批准）
- 建立日期：2026-01-09



