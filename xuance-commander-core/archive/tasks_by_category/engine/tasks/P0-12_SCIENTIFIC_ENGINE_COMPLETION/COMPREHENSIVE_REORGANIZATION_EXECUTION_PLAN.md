# 全面資料夾重組執行計劃

**建立日期**：2026-01-12  
**目的**：以 P0 檔案為基準，識別衝突，按特性重新組織所有資料  
**狀態**：READY FOR EXECUTION

---

## 🎯 重組原則

1. **P0 檔案為基準**：所有衝突以 P0 開頭的檔案為準
2. **P0 系列衝突處理**：以相對完整、專門討論該項目的檔案為準
3. **衝突檔案處理**：直接刪除衝突檔案，避免污染環境
4. **按特性分類**：不依照任務次序，直接依照特性分類（底層引擎、表層引擎、UI等）

---

## 📋 第一步：確定基準檔案

### UI 架構相關

**基準檔案**（最完整、專門討論）：
- ✅ `P0-5/P0-5_UI_ARCHITECTURE.md`（2026-01-12 13:45:34）
  - 專門討論 UI 架構設計
  - 包含完整的 Layer 0-6 設計
  - 狀態：ACTIVE

- ✅ `P0-5/P0-5_UMIP_CLOSURE_REPORT.md`（2026-01-11 10:26:26）
  - P0-5 結案報告
  - 通用玄學介面協議（UMIP）
  - 狀態：CANONIZED

**衝突檔案**（需刪除）：
- ❌ `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`
  - 提到不同的 Stage 2 設計（五行定物象）
  - 狀態：已歸檔，與 P0-4.5 衝突

### 流程設計相關

**基準檔案**（最完整、專門討論）：
- ✅ `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`（2026-01-12 13:45:34）
  - 專門討論 4 階段分流系統設計
  - 包含完整的 Stage 1-4 規格
  - 狀態：ACTIVE

**衝突檔案**（需刪除）：
- ❌ `P0-5/P0-5_HANDOFF_SUMMARY.md`
  - 提到「Stage 2：萬象定物象」，與 P0-4.5 的「六親定物象」衝突
  - 但此文件提到「相對於 P0-4.5 設計，將「萬象羅盤」提前至 Stage 2」
  - **決策**：以 P0-4.5 為準，刪除此衝突說明

- ❌ `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md`
  - 提到「Stage 2 — Radial Compass（五行定物象）」
  - 與 P0-4.5 衝突

### 世界觀相關

**基準檔案**（最完整、專門討論）：
- ✅ `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`（2026-01-11 15:58:59）
  - 專門討論世界觀設計
  - 包含完整的視覺風格定義
  - 狀態：已歸檔，但作為世界觀設計的基準

**注意**：此檔案在 Stage 2 設計上與 P0-4.5 衝突，但世界觀部分可保留

### 終極目標相關

**基準檔案**（SSOT）：
- ✅ `charter/CHARTER.md`
  - 專案憲章（SSOT）
  - 定義終極目標和最高原則

---

## 📁 第二步：設計新的資料夾結構（按特性分類）

### 建議的新結構

```
xuance-commander-core/
├── specs/                           # 規格文件（按特性分類）
│   ├── ui/                          # UI 相關規格
│   │   ├── architecture/            # UI 架構設計
│   │   │   ├── P0-5_UI_ARCHITECTURE.md
│   │   │   ├── P0-5_UMIP_CLOSURE_REPORT.md
│   │   │   └── P0-5_UI_INTEGRATION_SPEC.md
│   │   ├── workflow/                # UI 流程設計
│   │   │   ├── P0-4.5_FUNNEL_SYSTEM_DESIGN.md
│   │   │   └── P0-4.5_INTEGRATION_WITH_P0-5.md
│   │   ├── worldview/               # 世界觀設計
│   │   │   └── P0-5.7_DESIGN_DOC_FINAL.md
│   │   └── interaction/             # 互動設計
│   │       └── P0-5_COMPONENT_SPEC_COMPASS.md
│   ├── engine/                      # 引擎相關規格
│   │   ├── core/                    # 底層引擎（科學計算）
│   │   │   ├── scoring/             # 計分系統
│   │   │   ├── questions/           # 題目系統
│   │   │   └── calculation/         # 計算邏輯
│   │   └── metaphysical/            # 表層引擎（玄學運算）
│   │       ├── hexagram/            # 卦象推導
│   │       ├── bagua/               # 八卦對應
│   │       └── wuxing/              # 五行對應
│   ├── domain/                      # Domain 資料規格
│   │   ├── questions/               # 題目設計規範
│   │   ├── narratives/              # 敘事設計規範
│   │   ├── recommendations/         # 建議設計規範
│   │   └── riskchains/              # 風險鏈設計規範
│   └── integration/                 # 整合規格
│       ├── ui_engine/               # UI 與引擎整合
│       └── data_flow/               # 資料流程
├── domain/                          # Domain 資料（保持不變）
├── engine/                          # 引擎實作（保持不變）
├── ui/                              # UI 實作（保持不變）
├── docs/                            # 文件（保持不變）
├── charter/                         # 專案憲章（保持不變）
└── archive/                         # 歸檔的舊資料
    └── p0_tasks/                    # 舊的 P0 任務資料夾（歸檔）
        ├── P0-3/
        ├── P0-4/
        ├── P0-5/                    # 保留基準檔案，其他歸檔
        ├── P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/
        ├── P0-5.6_ICHING_MATRIX_IMPLEMENTATION/
        ├── P0-5.7_WORLDVIEW_DESIGN/
        ├── P0-8_UI_IMPROVEMENT/
        ├── P0-9_ANIMATION_EFFECTS/
        ├── P0-10_QUESTION_BANK_COMPLETION/
        ├── P0-11_METAPHYSICAL_ENGINE_COMPLETION/
        ├── P0-12_SCIENTIFIC_ENGINE_COMPLETION/
        ├── P0-13_RESULTS_PRESENTATION_DESIGN/
        └── P0-14_AI_INTEGRATION_DESIGN/
```

---

## 🔍 第三步：識別衝突檔案清單

### UI 架構衝突

**基準**：`P0-5/P0-5_UI_ARCHITECTURE.md`

**衝突檔案**（需刪除）：
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - Stage 2 設計衝突

### 流程設計衝突

**基準**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`

**衝突檔案**（需刪除）：
- `P0-5/P0-5_HANDOFF_SUMMARY.md` - Stage 2 設計衝突
- `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md` - Stage 2 設計衝突
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - Stage 2 設計衝突

### 已修正的檔案

- ✅ `domain/knowledge_base/question_design_guidelines.v1.0.md` - 已修正
- ✅ `P0-12_SCIENTIFIC_ENGINE_COMPLETION/CORE_ENGINE_INTEGRATION_TASK_PACKET.md` - 已更新

---

## 📝 第四步：確定最終方案

### 網頁 UI 架構

**基準檔案**：`P0-5/P0-5_UI_ARCHITECTURE.md`
- Layer 0：世界觀與氣氛層
- Layer 1：使用者錨定層
- Layer 2：困擾領域選擇層（對應 P0-4.5 的 Stage 1-3）
- Layer 3：問題行走層
- Layer 4：轉譯儀式層
- Layer 5：結果敘事層
- Layer 6：指引與收尾層

### 流程設計

**基準檔案**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- Stage 1：八卦定方位（八卦轉輪界面）
- Stage 2：六親定物象（符號雲界面）
- Stage 3：萬象定歸因（萬象羅盤界面）
- Stage 4：綜合斷語（路由到 Facet）

### 世界觀設計

**基準檔案**：`P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`
- 視覺定調：墨流運算 (Computational Ink)
- 色彩系統：文人畫與金石學色調
- 字體排印：宋體/明體 + 無襯線黑體

### 終極目標

**基準檔案**：`charter/CHARTER.md`
- 主目標：打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- 核心策略：核心引擎可審計；外層以東方命理敘事呈現

---

## 🗑️ 第五步：刪除衝突檔案

### 需刪除的檔案清單

1. `P0-5/P0-5_HANDOFF_SUMMARY.md` - Stage 2 設計衝突
2. `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md` - Stage 2 設計衝突
3. `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - Stage 2 設計衝突（但世界觀部分可提取）

**注意**：刪除前需確認這些檔案沒有其他重要內容需要保留

---

## 📦 第六步：重新組織檔案

### 移動計劃

1. **UI 架構檔案** → `specs/ui/architecture/`
   - `P0-5/P0-5_UI_ARCHITECTURE.md`
   - `P0-5/P0-5_UMIP_CLOSURE_REPORT.md`
   - `P0-5/P0-5_UI_INTEGRATION_SPEC.md`

2. **流程設計檔案** → `specs/ui/workflow/`
   - `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
   - `P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md`

3. **世界觀設計檔案** → `specs/ui/worldview/`
   - 從 `P0-5.7_DESIGN_DOC_FINAL.md` 提取世界觀相關內容

4. **引擎規格檔案** → `specs/engine/`
   - 底層引擎：`P0-12_SCIENTIFIC_ENGINE_COMPLETION/` 相關檔案
   - 表層引擎：`P0-11_METAPHYSICAL_ENGINE_COMPLETION/` 相關檔案

5. **Domain 規格檔案** → `specs/domain/`
   - 題目設計規範
   - 敘事設計規範
   - 建議設計規範
   - 風險鏈設計規範

---

**文件狀態**：PLANNING  
**下一步**：開始執行盤點和衝突識別
