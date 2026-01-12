# 全面盤點報告：題庫相關內容

**建立日期**：2026-01-12  
**目的**：全面盤點所有題庫相關內容，為下一階段大升級和大檢討做準備  
**文件狀態**：COMPLETE

---

## 📦 根目錄壓縮檔處理

### 壓縮檔清單

| 檔案名稱 | 大小 | 狀態 | 建議 |
|---------|------|------|------|
| `P0-12_GATE1_UPDATED_WORKSPACE.zip` | - | ✅ 已刪除 | 內容已整合到 domain/ |
| `P0-12_FINAL_DELIVERY.zip` | - | ✅ 已刪除 | 內容已整合到 domain/ |

**說明**：
- 這些壓縮檔是 Gate 1 和 Gate 3 的交付物
- 所有內容已整合到專案中（`domain/` 目錄）
- 備份已保存在 `EXTRACTION_WORKSPACE/` 和 `GATE4_BACKUP/`
- **建議刪除**以保持根目錄整潔

---

## 📊 題庫相關內容盤點

### 1. 題目設計（Questions）

#### 位置

**主要位置**：
- `xuance-commander-core/domain/questions/` - 所有主題的題目檔案

**檔案格式**：
- `{facetId}.questions.v1.0.json`

**檔案數量**：14 個主題

#### 題目結構

**範例結構**（`stress_recovery.questions.v1.0.json`）：
```json
[
  {
    "id": "stress_recovery_q1",
    "text": "題目文字",
    "type": "likert_5",
    "scale": ["選項1", "選項2", "選項3", "選項4", "選項5"]
  }
]
```

**題型設計**：
- **類型**：`likert_5`（5 點李克特量表）
- **結構**：每個題目包含 `id`、`text`、`type`、`scale`
- **選項數量**：5 個選項

#### 設計規範

**參考文件**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

---

### 2. 分數計算方式（Scoring）

#### 位置

**主要位置**：
- `xuance-commander-core/domain/facets/` - 所有主題的分數計算檔案

**檔案格式**：
- `{facetId}.scoring.v1.0.json`

**檔案數量**：10 個主題（5 個主題缺失）

#### 分數計算結構

**範例結構**（`stress_recovery.scoring.v1.0.json`）：
```json
{
  "thresholds": {
    "low": 0,
    "mid": 25,
    "high": 50
  },
  "levels": ["low", "mid", "high"]
}
```

**計算方式**：
- 使用閾值（thresholds）區分不同等級
- 等級：`low`、`mid`、`high`

#### 缺失的 Scoring 檔案

**缺失的主題**（5 個）：
1. `social_comparison.scoring.v1.0.json`
2. `self_erosion.scoring.v1.0.json`
3. `emotional_permeability.scoring.v1.0.json`
4. `avoidance_coping.scoring.v1.0.json`
5. `unprocessed_loss.scoring.v1.0.json`

**狀態**：需要在後續建立

---

### 3. 問答階段設計（Stages）

#### 位置

**主要位置**：
- `xuance-commander-core/domain/narratives/` - 敘述檔案（包含階段設計）

**檔案格式**：
- `{facetId}.narr.v1.0.json`

**檔案數量**：14 個主題

#### 階段結構

**範例結構**（`stress_recovery.narr.v1.0.json`）：
```json
{
  "low": {
    "opening": "開場文字",
    "explain": "解釋文字"
  },
  "mid": {
    "opening": "開場文字",
    "explain": "解釋文字"
  },
  "high": {
    "opening": "開場文字",
    "explain": "解釋文字"
  }
}
```

**階段設計**：
- **階段**：`low`、`mid`、`high`（對應分數等級）
- **內容**：每個階段包含 `opening`（開場）和 `explain`（解釋）

**注意**：
- 目前設計使用 3 階段（low/mid/high）
- 未發現 `round1`、`round2`、`round3` 的設計

---

### 4. 底層運算引擎（Engine）

#### 位置

**主要位置**：
- `xuance-commander-core/engine/` - 引擎核心程式碼

#### 引擎組件

**主要檔案**：
- `compile_domain.py` - 編譯 domain 資料
- （其他引擎檔案待進一步分析）

**功能**：
- 編譯 domain 資料為 compiled facet
- 處理 questions、scoring、recommendations、narratives、riskchains

#### 引擎架構

**根據 ADR_0001**：
- 引擎 code 固定且精簡
- 內容（questions/scoring/reco/narr/risk）全部外置化到 domain/
- 用 manifest 指向各分檔
- build 時 compile 成 compiled facet

---

## 📁 完整檔案結構

### Domain 目錄結構

```
domain/
├── manifests/          # 14 個 manifest 檔案
├── questions/          # 14 個 questions 檔案
├── narratives/         # 14 個 narratives 檔案
├── recommendations/     # 14 個 recommendations 檔案
├── riskchains/         # 14 個 riskchains 檔案
├── facets/             # 10 個 scoring 檔案（5 個缺失）
├── compiled/           # 編譯後的檔案
└── knowledge_base/     # 知識庫和設計指南
    ├── question_design_guidelines.v1.0.md
    └── ...
```

### 檔案統計

| 類別 | 數量 | 狀態 |
|------|------|------|
| Manifests | 14 | ✅ 完整 |
| Questions | 14 | ✅ 完整 |
| Narratives | 14 | ✅ 完整 |
| Recommendations | 14 | ✅ 完整 |
| Riskchains | 14 | ✅ 完整 |
| Scoring | 10 | ⚠️ 5 個缺失 |

---

## 🔍 詳細分析

### 題型設計分析

**當前題型**：
- **唯一類型**：`likert_5`（5 點李克特量表）
- **選項數量**：固定 5 個選項
- **題目結構**：統一格式（id、text、type、scale）

**設計特點**：
- 結構統一，易於處理
- 所有主題使用相同題型
- 缺乏題型多樣性

---

### 分數計算分析

**當前計算方式**：
- **方法**：閾值區分（thresholds）
- **等級**：3 個等級（low、mid、high）
- **結構**：簡單的閾值設定

**設計特點**：
- 計算方式簡單直接
- 所有主題使用相同計算邏輯
- 5 個主題缺失 scoring 檔案

---

### 問答階段分析

**當前階段設計**：
- **階段數**：3 個階段（low、mid、high）
- **內容結構**：opening + explain
- **對應關係**：階段對應分數等級

**設計特點**：
- 階段設計與分數等級對應
- 結構統一
- 未發現多輪問答設計（round1/round2/round3）

---

### 底層運算引擎分析

**當前引擎架構**：
- **設計理念**：內容外置化（ADR_0001）
- **核心功能**：編譯 domain 資料
- **處理流程**：manifest → compile → compiled facet

**設計特點**：
- 引擎 code 固定且精簡
- 內容與邏輯分離
- 易於擴充和維護

---

## ⚠️ 發現的問題

### 1. 缺失的 Scoring 檔案

**問題**：5 個主題缺少 scoring 檔案

**影響**：
- 無法計算這些主題的分數
- 無法區分等級（low/mid/high）

**建議**：
- 優先建立缺失的 scoring 檔案
- 統一 scoring 設計規範

---

### 2. 題型單一

**問題**：所有題目都使用 `likert_5` 類型

**影響**：
- 缺乏題型多樣性
- 可能限制題目設計靈活性

**建議**：
- 評估是否需要其他題型
- 設計多樣化的題型系統

---

### 3. 階段設計簡單

**問題**：只有 3 階段設計，未發現多輪問答

**影響**：
- 問答流程可能較為簡單
- 缺乏動態調整機制

**建議**：
- 評估是否需要多輪問答設計
- 設計更靈活的階段系統

---

## 🎯 下一階段任務規劃

### 任務 1：補齊缺失的 Scoring 檔案

**目標**：建立 5 個缺失的 scoring 檔案

**步驟**：
1. 分析現有 scoring 檔案的設計模式
2. 為缺失的主題建立 scoring 檔案
3. 驗證 scoring 邏輯正確性

**優先級**：高

---

### 任務 2：題型系統升級

**目標**：設計和實作多樣化的題型系統

**步驟**：
1. 需求分析：評估需要哪些題型
2. 設計題型系統架構
3. 實作新題型支援
4. 遷移現有題目（如需要）

**優先級**：中

---

### 任務 3：階段系統升級

**目標**：設計和實作更靈活的階段系統

**步驟**：
1. 需求分析：評估是否需要多輪問答
2. 設計階段系統架構
3. 實作新階段支援
4. 遷移現有階段設計（如需要）

**優先級**：中

---

### 任務 4：分數計算系統升級

**目標**：設計和實作更靈活的分數計算系統

**步驟**：
1. 需求分析：評估當前計算方式的限制
2. 設計新的計算系統架構
3. 實作新計算邏輯
4. 遷移現有計算方式（如需要）

**優先級**：中

---

### 任務 5：引擎優化

**目標**：優化底層運算引擎

**步驟**：
1. 效能分析：評估當前引擎效能
2. 設計優化方案
3. 實作優化
4. 測試和驗證

**優先級**：低

---

## 📋 任務優先級總覽

| 任務 | 優先級 | 狀態 | 預估工作量 |
|------|--------|------|-----------|
| 補齊缺失的 Scoring 檔案 | 高 | 待執行 | 小 |
| 題型系統升級 | 中 | 待規劃 | 大 |
| 階段系統升級 | 中 | 待規劃 | 大 |
| 分數計算系統升級 | 中 | 待規劃 | 中 |
| 引擎優化 | 低 | 待規劃 | 中 |

---

## 📝 建議

### 短期（1-2 週）

1. **補齊缺失的 Scoring 檔案**
   - 優先處理，影響系統完整性

2. **清理根目錄壓縮檔**
   - 刪除已整合的壓縮檔

---

### 中期（1-2 個月）

1. **題型系統升級**
   - 設計和實作多樣化題型

2. **階段系統升級**
   - 設計和實作更靈活的階段系統

---

### 長期（3-6 個月）

1. **分數計算系統升級**
   - 設計和實作更靈活的計算系統

2. **引擎優化**
   - 效能優化和架構改進

---

**文件狀態**：COMPLETE  
**最後更新**：2026-01-12  
**下一步**：根據任務規劃開始執行
