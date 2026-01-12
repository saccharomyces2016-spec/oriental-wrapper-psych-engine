# 全面資料夾重組計劃

**建立日期**：2026-01-12  
**目的**：以 P0 檔案為基準，識別衝突，按特性重新組織所有資料  
**狀態**：PLANNING

---

## 🎯 重組原則

1. **P0 檔案為基準**：所有衝突以 P0 開頭的檔案為準
2. **P0 系列衝突處理**：以相對完整、專門討論該項目的檔案為準
3. **衝突檔案處理**：直接刪除衝突檔案，避免污染環境
4. **按特性分類**：不依照任務次序，直接依照特性分類（底層引擎、表層引擎、UI等）

---

## 📋 第一步：全面盤點 P0 檔案

### P0 資料夾清單

1. `P0-3/` - 第三階段任務
2. `P0-4/` - 第四階段任務
3. `P0-4.5/` - 題目流程與分流系統設計
4. `P0-5/` - UI 整合與結果呈現設計
5. `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/` - 東方元素諮詢
6. `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣實作
7. `P0-5.7_WORLDVIEW_DESIGN/` - 世界觀設計
8. `P0-8_UI_IMPROVEMENT/` - UI 改進
9. `P0-9_ANIMATION_EFFECTS/` - 動畫效果
10. `P0-10_QUESTION_BANK_COMPLETION/` - 題庫完成
11. `P0-11_METAPHYSICAL_ENGINE_COMPLETION/` - 玄學引擎完成
12. `P0-12_SCIENTIFIC_ENGINE_COMPLETION/` - 科學引擎完成
13. `P0-13_RESULTS_PRESENTATION_DESIGN/` - 結果呈現設計
14. `P0-14_AI_INTEGRATION_DESIGN/` - AI 整合設計

---

## 🔍 第二步：識別基準檔案

### UI 架構相關

**基準檔案**：
- `P0-5/P0-5_UI_ARCHITECTURE.md` - UI 架構設計（2026-01-12 13:45:34）
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 分流系統設計（2026-01-12 13:45:34）

**衝突檔案**：
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 提到不同的 Stage 2 設計
- `P0-5/P0-5_HANDOFF_SUMMARY.md` - 提到不同的 Stage 2 設計

**決策**：以 `P0-4.5_FUNNEL_SYSTEM_DESIGN.md` 為準（最完整、專門討論分流系統）

### 世界觀相關

**基準檔案**：
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計（2026-01-11 15:58:59）

**衝突檔案**：待確認

### 流程相關

**基準檔案**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統（2026-01-12 13:45:34）

**衝突檔案**：待確認

### 終極目標相關

**基準檔案**：
- `charter/CHARTER.md` - 專案憲章（SSOT）

**衝突檔案**：待確認

---

## 📁 第三步：設計新的資料夾結構（按特性分類）

### 建議的新結構

```
xuance-commander-core/
├── specs/                    # 規格文件（按特性分類）
│   ├── ui/                   # UI 相關規格
│   │   ├── architecture/     # UI 架構設計
│   │   ├── workflow/         # UI 流程設計
│   │   ├── worldview/        # 世界觀設計
│   │   └── interaction/      # 互動設計
│   ├── engine/               # 引擎相關規格
│   │   ├── core/             # 底層引擎（科學計算）
│   │   │   ├── scoring/      # 計分系統
│   │   │   ├── questions/    # 題目系統
│   │   │   └── calculation/  # 計算邏輯
│   │   └── metaphysical/      # 表層引擎（玄學運算）
│   │       ├── hexagram/     # 卦象推導
│   │       ├── bagua/        # 八卦對應
│   │       └── wuxing/       # 五行對應
│   ├── domain/               # Domain 資料規格
│   │   ├── questions/        # 題目設計規範
│   │   ├── narratives/       # 敘事設計規範
│   │   ├── recommendations/ # 建議設計規範
│   │   └── riskchains/       # 風險鏈設計規範
│   └── integration/          # 整合規格
│       ├── ui_engine/        # UI 與引擎整合
│       └── data_flow/        # 資料流程
├── domain/                   # Domain 資料（保持不變）
├── engine/                   # 引擎實作（保持不變）
├── ui/                       # UI 實作（保持不變）
├── docs/                     # 文件（保持不變）
└── archive/                  # 歸檔的舊資料
    └── p0_tasks/             # 舊的 P0 任務資料夾（歸檔）
```

---

## 🔧 第四步：執行重組

### 階段 1：識別和刪除衝突檔案

1. 識別所有衝突檔案
2. 確認基準檔案
3. 刪除衝突檔案

### 階段 2：移動檔案到新結構

1. 將 P0 檔案按特性分類移動到 `specs/` 下
2. 保留重要的基準檔案
3. 歸檔舊的任務資料夾

---

**文件狀態**：PLANNING  
**下一步**：開始執行盤點和衝突識別
