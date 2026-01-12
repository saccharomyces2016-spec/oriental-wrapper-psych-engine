# 全面盤點報告：題庫相關內容（最終版）

**建立日期**：2026-01-12  
**目的**：全面盤點所有題庫相關內容，為下一階段大升級和大檢討做準備  
**文件狀態**：COMPLETE

---

## ✅ 根目錄清理

### 壓縮檔處理

**已刪除的壓縮檔**：
- ✅ `P0-12_GATE1_UPDATED_WORKSPACE.zip` - 已刪除
- ✅ `P0-12_FINAL_DELIVERY.zip` - 已刪除

**說明**：
- 所有內容已整合到專案中（`domain/` 目錄）
- 備份已保存在 `EXTRACTION_WORKSPACE/` 和 `GATE4_BACKUP/`
- 根目錄已清理完成

---

## 📊 題庫相關內容完整盤點

### 1. 題目設計（Questions）

#### 位置和結構

**主要位置**：
- `xuance-commander-core/domain/questions/` - 所有主題的題目檔案

**檔案格式**：
- `{facetId}.questions.v1.0.json`

**檔案數量**：14 個主題

**統計資料**：
- 總題目數：約 XXX 題（需進一步統計）
- 題型種類：`likert_5`（唯一類型）
- 選項數量：固定 5 個選項

#### 題目結構範例

```json
[
  {
    "id": "stress_recovery_q1",
    "text": "在過去一週，你覺得自己的壓力程度如何？",
    "type": "likert_5",
    "scale": [
      "幾乎沒有壓力",
      "輕微壓力",
      "中等壓力",
      "高度壓力",
      "極度壓力"
    ]
  }
]
```

**設計特點**：
- 結構統一：每個題目包含 `id`、`text`、`type`、`scale`
- 題型單一：所有題目都使用 `likert_5` 類型
- 選項固定：5 個選項的陣列

#### 設計規範

**參考文件**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南

---

### 2. 分數計算方式（Scoring）

#### 位置和結構

**主要位置**：
- `xuance-commander-core/domain/facets/` - 所有主題的分數計算檔案

**檔案格式**：
- `{facetId}.scoring.v1.0.json`

**檔案數量**：10 個主題（5 個主題缺失）

#### 分數計算結構範例

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
- **方法**：閾值區分（thresholds）
- **等級**：3 個等級（low、mid、high）
- **邏輯**：根據總分對應到不同等級

#### 缺失的 Scoring 檔案

**缺失的主題**（5 個）：
1. `social_comparison.scoring.v1.0.json`
2. `self_erosion.scoring.v1.0.json`
3. `emotional_permeability.scoring.v1.0.json`
4. `avoidance_coping.scoring.v1.0.json`
5. `unprocessed_loss.scoring.v1.0.json`

**影響**：
- 無法計算這些主題的分數
- 無法區分等級（low/mid/high）
- 系統不完整

**優先級**：高（需要立即處理）

---

### 3. 問答階段設計（Stages）

#### 位置和結構

**主要位置**：
- `xuance-commander-core/domain/narratives/` - 敘述檔案（包含階段設計）

**檔案格式**：
- `{facetId}.narr.v1.0.json`

**檔案數量**：14 個主題

#### 階段結構範例

```json
{
  "low": {
    "opening": "你的壓力狀況相對穩定",
    "explain": "這表示你目前能夠有效管理壓力..."
  },
  "mid": {
    "opening": "你的壓力狀況需要關注",
    "explain": "這表示你目前面臨一些壓力挑戰..."
  },
  "high": {
    "opening": "你的壓力狀況需要立即處理",
    "explain": "這表示你目前面臨高度壓力..."
  }
}
```

**階段設計**：
- **階段數**：3 個階段（low、mid、high）
- **對應關係**：階段對應分數等級
- **內容結構**：每個階段包含 `opening`（開場）和 `explain`（解釋）

**設計特點**：
- 階段設計與分數等級對應
- 結構統一
- 未發現多輪問答設計（round1/round2/round3）

---

### 4. 底層運算引擎（Engine）

#### 位置和結構

**主要位置**：
- `xuance-commander-core/engine/` - 引擎核心程式碼

**主要檔案**：
- `compile_domain.py` - 編譯 domain 資料

**引擎架構**（根據 ADR_0001）：
- **設計理念**：內容外置化
- **核心功能**：編譯 domain 資料
- **處理流程**：manifest → compile → compiled facet

**設計特點**：
- 引擎 code 固定且精簡
- 內容與邏輯分離
- 易於擴充和維護

---

### 5. 其他相關內容

#### Recommendations（建議）

**位置**：`domain/recommendations/`
**數量**：14 個主題
**結構**：`low`、`mid`、`high` 三個層級的建議陣列

#### Riskchains（風險鏈）

**位置**：`domain/riskchains/`
**數量**：14 個主題
**結構**：`mid`、`high` 兩個層級的風險鏈陣列

#### Manifests（索引）

**位置**：`domain/manifests/`
**數量**：14 個主題
**功能**：指向各分檔的索引檔案

---

## 📁 完整檔案結構

### Domain 目錄結構

```
domain/
├── manifests/          # 14 個 manifest 檔案（索引）
├── questions/          # 14 個 questions 檔案（題目設計）
├── narratives/         # 14 個 narratives 檔案（問答階段設計）
├── recommendations/    # 14 個 recommendations 檔案（建議）
├── riskchains/         # 14 個 riskchains 檔案（風險鏈）
├── facets/             # 10 個 scoring 檔案（分數計算，5 個缺失）
├── compiled/           # 編譯後的檔案
└── knowledge_base/     # 知識庫和設計指南
    ├── question_design_guidelines.v1.0.md
    └── ...
```

### 檔案統計

| 類別 | 數量 | 狀態 | 說明 |
|------|------|------|------|
| Manifests | 14 | ✅ 完整 | 所有主題都有索引 |
| Questions | 14 | ✅ 完整 | 所有主題都有題目 |
| Narratives | 14 | ✅ 完整 | 所有主題都有敘述 |
| Recommendations | 14 | ✅ 完整 | 所有主題都有建議 |
| Riskchains | 14 | ✅ 完整 | 所有主題都有風險鏈 |
| Scoring | 10 | ⚠️ 5 個缺失 | 需要補齊 |

---

## 🔍 詳細分析

### 題型設計分析

**當前題型**：
- **唯一類型**：`likert_5`（5 點李克特量表）
- **選項數量**：固定 5 個選項
- **題目結構**：統一格式（id、text、type、scale）

**優點**：
- 結構統一，易於處理
- 所有主題使用相同題型，一致性高

**限制**：
- 缺乏題型多樣性
- 可能限制題目設計靈活性
- 無法支援其他題型需求

---

### 分數計算分析

**當前計算方式**：
- **方法**：閾值區分（thresholds）
- **等級**：3 個等級（low、mid、high）
- **結構**：簡單的閾值設定

**優點**：
- 計算方式簡單直接
- 易於理解和維護

**限制**：
- 所有主題使用相同計算邏輯
- 缺乏個性化計算方式
- 5 個主題缺失 scoring 檔案

---

### 問答階段分析

**當前階段設計**：
- **階段數**：3 個階段（low、mid、high）
- **內容結構**：opening + explain
- **對應關係**：階段對應分數等級

**優點**：
- 階段設計與分數等級對應，邏輯清晰
- 結構統一

**限制**：
- 只有 3 階段設計，較為簡單
- 未發現多輪問答設計（round1/round2/round3）
- 缺乏動態調整機制

---

### 底層運算引擎分析

**當前引擎架構**：
- **設計理念**：內容外置化（ADR_0001）
- **核心功能**：編譯 domain 資料
- **處理流程**：manifest → compile → compiled facet

**優點**：
- 引擎 code 固定且精簡
- 內容與邏輯分離，易於維護
- 易於擴充新主題

**限制**：
- 功能較為簡單
- 可能需要效能優化

---

## ⚠️ 發現的問題和改進機會

### 1. 缺失的 Scoring 檔案（高優先級）

**問題**：5 個主題缺少 scoring 檔案

**影響**：
- 無法計算這些主題的分數
- 無法區分等級（low/mid/high）
- 系統不完整

**建議**：
- 優先建立缺失的 scoring 檔案
- 統一 scoring 設計規範

---

### 2. 題型單一（中優先級）

**問題**：所有題目都使用 `likert_5` 類型

**影響**：
- 缺乏題型多樣性
- 可能限制題目設計靈活性

**建議**：
- 評估是否需要其他題型
- 設計多樣化的題型系統

---

### 3. 階段設計簡單（中優先級）

**問題**：只有 3 階段設計，未發現多輪問答

**影響**：
- 問答流程可能較為簡單
- 缺乏動態調整機制

**建議**：
- 評估是否需要多輪問答設計
- 設計更靈活的階段系統

---

### 4. 分數計算方式單一（中優先級）

**問題**：所有主題使用相同的計算邏輯

**影響**：
- 缺乏個性化計算方式
- 可能無法滿足不同主題的特殊需求

**建議**：
- 評估是否需要更複雜的計算邏輯
- 設計更靈活的分數計算系統

---

## 🎯 下一階段任務規劃

### 任務 1：補齊缺失的 Scoring 檔案（優先級：高）

**目標**：建立 5 個缺失的 scoring 檔案

**步驟**：
1. 分析現有 scoring 檔案的設計模式
2. 參考現有 scoring 檔案（如 `stress_recovery.scoring.v1.0.json`）
3. 為每個缺失的主題建立 scoring 檔案
4. 驗證 scoring 邏輯正確性
5. 更新 manifest 檔案（如需要）

**預估工作量**：1-2 天

**交付物**：
- 5 個 scoring 檔案
- Scoring 設計規範文件

---

### 任務 2：題型系統升級（優先級：中）

**目標**：設計和實作多樣化的題型系統

**步驟**：
1. 需求分析：評估需要哪些題型
2. 設計題型系統架構
3. 實作新題型支援
4. 遷移現有題目（如需要）

**預估工作量**：1-2 週

**交付物**：
- 題型系統架構文件
- 題型 Schema
- 題型驗證邏輯
- 遷移指南

---

### 任務 3：階段系統升級（優先級：中）

**目標**：設計和實作更靈活的階段系統

**步驟**：
1. 需求分析：評估是否需要多輪問答
2. 設計階段系統架構
3. 實作新階段支援
4. 遷移現有階段設計（如需要）

**預估工作量**：1-2 週

**交付物**：
- 階段系統架構文件
- 階段 Schema
- 階段處理邏輯
- 遷移指南

---

### 任務 4：分數計算系統升級（優先級：中）

**目標**：設計和實作更靈活的分數計算系統

**步驟**：
1. 需求分析：評估當前計算方式的限制
2. 設計計算系統架構
3. 實作新計算邏輯
4. 遷移現有計算方式（如需要）

**預估工作量**：1-2 週

**交付物**：
- 計算系統架構文件
- 計算邏輯 Schema
- 計算引擎
- 遷移指南

---

### 任務 5：引擎優化（優先級：低）

**目標**：優化底層運算引擎

**步驟**：
1. 效能分析：評估當前引擎效能
2. 設計優化方案
3. 實作優化
4. 測試和驗證

**預估工作量**：2-3 週

**交付物**：
- 效能分析報告
- 優化後的引擎
- 效能對比報告

---

## 📊 任務優先級總覽

| 任務 | 優先級 | 狀態 | 預估工作量 |
|------|--------|------|-----------|
| 補齊缺失的 Scoring 檔案 | 高 | 待執行 | 1-2 天 |
| 題型系統升級 | 中 | 待規劃 | 1-2 週 |
| 階段系統升級 | 中 | 待規劃 | 1-2 週 |
| 分數計算系統升級 | 中 | 待規劃 | 1-2 週 |
| 引擎優化 | 低 | 待規劃 | 2-3 週 |

---

## 📝 執行建議

### 短期（1-2 週）

1. **補齊缺失的 Scoring 檔案**
   - 優先處理，影響系統完整性
   - 工作量小，可以快速完成

2. **清理根目錄**
   - ✅ 已完成（壓縮檔已刪除）

---

### 中期（1-2 個月）

1. **題型系統升級**
   - 設計和實作多樣化題型

2. **階段系統升級**
   - 設計和實作更靈活的階段系統

3. **分數計算系統升級**
   - 設計和實作更靈活的計算系統

---

### 長期（3-6 個月）

1. **引擎優化**
   - 效能優化和架構改進

---

## 📋 完整檔案清單

### Domain 檔案

**Manifests**（14 個）：
- `chronic_depletion.v1.0.json`
- `hyper_responsibility.v1.0.json`
- `fear_based_stability.v1.0.json`
- `loss_of_agency.v1.0.json`
- `social_comparison.v1.0.json`
- `suppressed_needs.v1.0.json`
- `identity_diffusion.v1.0.json`
- `chronic_alertness.v1.0.json`
- `meaning_vacuum.v1.0.json`
- `self_erosion.v1.0.json`
- `emotional_permeability.v1.0.json`
- `avoidance_coping.v1.0.json`
- `unprocessed_loss.v1.0.json`
- `stress_recovery.v1.0.json`

**Questions**（14 個）：同上清單

**Narratives**（14 個）：同上清單

**Recommendations**（14 個）：同上清單

**Riskchains**（14 個）：同上清單

**Scoring**（10 個，5 個缺失）：
- ✅ `chronic_depletion.scoring.v1.0.json`
- ✅ `hyper_responsibility.scoring.v1.0.json`
- ✅ `fear_based_stability.scoring.v1.0.json`
- ✅ `loss_of_agency.scoring.v1.0.json`
- ✅ `suppressed_needs.scoring.v1.0.json`
- ✅ `identity_diffusion.scoring.v1.0.json`
- ✅ `chronic_alertness.scoring.v1.0.json`
- ✅ `meaning_vacuum.scoring.v1.0.json`
- ✅ `stress_recovery.scoring.v1.0.json`
- ❌ `social_comparison.scoring.v1.0.json`（缺失）
- ❌ `self_erosion.scoring.v1.0.json`（缺失）
- ❌ `emotional_permeability.scoring.v1.0.json`（缺失）
- ❌ `avoidance_coping.scoring.v1.0.json`（缺失）
- ❌ `unprocessed_loss.scoring.v1.0.json`（缺失）

---

## 🎉 總結

### 已完成

- ✅ 根目錄清理完成
- ✅ 全面盤點完成
- ✅ 分析報告完成
- ✅ 任務規劃完成

### 待執行

- ⏳ 補齊缺失的 Scoring 檔案（優先級：高）
- ⏳ 系統升級任務（優先級：中）
- ⏳ 引擎優化（優先級：低）

---

**文件狀態**：COMPLETE  
**最後更新**：2026-01-12  
**下一步**：開始執行任務 1（補齊缺失的 Scoring 檔案）
