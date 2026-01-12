# 資料夾重組執行記錄

**執行日期**：2026-01-12  
**狀態**：IN PROGRESS

---

## ✅ 已完成步驟

### 1. 建立新資料夾結構
- ✅ 創建 `specs/ui/{architecture,workflow,worldview,interaction}`
- ✅ 創建 `specs/engine/{core,metaphysical}`
- ✅ 創建 `specs/domain/{questions,narratives,recommendations,riskchains}`
- ✅ 創建 `specs/integration/{ui_engine,data_flow}`
- ✅ 創建 `archive/p0_tasks`

### 2. 提取世界觀設計內容
- ✅ 從 `P0-5.7_DESIGN_DOC_FINAL.md` 提取視覺風格定義
- ✅ 創建 `specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md`
- ✅ 移除 Stage 設計衝突內容

### 3. 移動基準檔案
- ✅ `P0-5/P0-5_UI_ARCHITECTURE.md` → `specs/ui/architecture/`
- ✅ `P0-5/P0-5_UMIP_CLOSURE_REPORT.md` → `specs/ui/architecture/`
- ✅ `P0-5/P0-5_UI_INTEGRATION_SPEC.md` → `specs/ui/architecture/`
- ✅ `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` → `specs/ui/workflow/`
- ✅ `P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md` → `specs/ui/workflow/`

### 4. 刪除衝突檔案
- ✅ 刪除 `P0-5/P0-5_HANDOFF_SUMMARY.md`（Stage 2 設計衝突）
- ✅ 刪除 `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`（Stage 2 設計衝突）
- ⚠️ `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`（已提取世界觀內容，待確認是否刪除）

---

## 📋 待執行步驟

### 1. 移動引擎相關檔案
- [ ] 移動底層引擎規格到 `specs/engine/core/`
- [ ] 移動表層引擎規格到 `specs/engine/metaphysical/`

### 2. 移動 Domain 規格檔案
- [ ] 移動題目設計規範到 `specs/domain/questions/`
- [ ] 移動敘事設計規範到 `specs/domain/narratives/`
- [ ] 移動建議設計規範到 `specs/domain/recommendations/`
- [ ] 移動風險鏈設計規範到 `specs/domain/riskchains/`

### 3. 歸檔舊 P0 任務資料夾
- [ ] 移動舊的 P0 任務資料夾到 `archive/p0_tasks/`

### 4. 更新引用
- [ ] 更新所有引用這些檔案的文件
- [ ] 更新索引文件

---

**最後更新**：2026-01-12
