# 完整資料整理任務細節記錄

**建立日期**：2026-01-12  
**狀態**：COMPLETE  
**目的**：詳細記錄任務的執行方式、相關概念、決策邏輯

---

## 📋 任務概述

### 任務目標
對整個專案進行**徹底、全面、深度**的資料整理，確保：
1. ✅ **無衝突**：所有概念只有一個定義，沒有相互矛盾的內容
2. ✅ **無重複**：所有檔案只有一個位置，沒有重複的內容
3. ✅ **無錯位**：所有檔案都在正確的位置，符合 SSOT 原則

### 任務背景
- **前一次任務的不足**：只做了資料夾結構重組，沒有做內容去重
- **發現的問題**：重複檔案、概念分散、缺乏 SSOT 驗證機制
- **解決方案**：建立完整的去重、驗證、SSOT 機制

---

## 🔧 任務執行方式

### 方法論

#### 1. 深度分析（階段 1）
- **檔名去重檢查**：
  - 使用 Python 腳本搜尋所有 .md 檔案
  - 找出所有相同檔名的檔案
  - 記錄每個檔名的所有位置

- **內容去重檢查**：
  - 計算所有檔案的 MD5 雜湊值
  - 找出所有相同內容的檔案
  - 記錄每組重複檔案的位置

- **概念分散檢查**：
  - 使用關鍵字搜尋找出所有提到相同概念的檔案
  - 識別哪些是 SSOT，哪些是重複
  - 記錄概念的分散情況

- **位置驗證檢查**：
  - 基於 `CURSOR_FILE_PLACEMENT_RULE.md` 進行位置驗證
  - 識別錯位的檔案

#### 2. SSOT 建立與驗證（階段 2）
- **SSOT 判斷規則**：
  1. `domain/` 中的檔案優先於 `specs/` 中的檔案
  2. `docs/governance/` 中的檔案優先於其他位置的檔案
  3. 根目錄的基準檔案（如 `P0-4.5/`）優先於 `specs/` 中的檔案
  4. 如果都不符合，以檔案修改時間最新的為準

- **SSOT 索引建立**：
  - 建立 `docs/SSOT_INDEX.md` - 所有 SSOT 的總索引
  - 包含查找指引和維護規則

#### 3. 重複檔案處理（階段 3）
- **內容相同的重複檔案**：
  - 確認 SSOT 位置（基於 SSOT 判斷規則）
  - 刪除重複檔案
  - 在刪除位置建立 README 說明 SSOT 位置

- **內容不同的同名檔案**：
  - 分析內容差異
  - 決定是否合併或保留
  - 記錄決策依據

#### 4. 衝突解決（階段 4）
- **概念定義衝突**：
  - 搜尋關鍵概念（Stage 1/2/3, scoring model, file placement）
  - 檢查是否有相互矛盾的定義
  - 以 SSOT 為準

- **規則衝突**：
  - 以 `docs/governance/` 中的規則為準
  - 重複的規則已歸檔到 `archive/governance_duplicates/`

- **規格衝突**：
  - 以 `specs/` 中的規格為準
  - 重複的規格已處理

#### 5. 位置校正（階段 5）
- **位置驗證**：
  - 基於 `CURSOR_FILE_PLACEMENT_RULE.md` 進行驗證
  - 檢查關鍵檔案的位置

- **檔案移動**：
  - 將錯位的檔案移動到正確位置
  - 更新所有引用

#### 6. 驗證與測試（階段 6）
- **結構驗證**：驗證資料夾結構完整性
- **內容驗證**：驗證沒有重複檔案、沒有衝突內容
- **引用驗證**：驗證所有引用都正確
- **完整性測試**：測試查找特定概念是否容易

---

## 📚 相關概念記錄

### SSOT（單一真相來源）

#### 定義
- 每個概念只有一個 SSOT 檔案
- 其他位置應引用 SSOT，而非複製內容
- SSOT 檔案應在核心位置（`domain/`, `docs/governance/`, `specs/`, `charter/`, `roadmap/`）

#### SSOT 判斷規則
1. **核心資料優先**：`domain/` 中的檔案優先於 `specs/` 中的檔案
2. **治理規則優先**：`docs/governance/` 中的檔案優先於其他位置的檔案
3. **基準檔案優先**：根目錄的基準檔案（如 `P0-4.5/`）優先於 `specs/` 中的檔案
4. **時間優先**：如果都不符合，以檔案修改時間最新的為準

#### SSOT 索引
- **位置**：`docs/SSOT_INDEX.md`
- **內容**：所有核心概念的 SSOT 位置、查找指引、維護規則

---

### 檔案放置規範

#### SSOT
- **位置**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
- **內容**：每個檔案類型都有明確的放置位置

#### 查找指引
- **位置**：`docs/FILE_PLACEMENT_AND_SEARCH_GUIDE.md`
- **內容**：從零開始的查找流程、檔案寫入指引、SSOT 總覽

---

### 重複檔案處理

#### 方法
- **檔名去重**：找出所有相同檔名的檔案
- **內容去重**：使用 MD5 雜湊值比對找出相同內容的檔案

#### 處理規則
1. **內容相同**：刪除重複，保留 SSOT
2. **內容不同**：分析差異，決定合併或保留
3. **規格文件與核心資料**：刪除規格文件中的重複，建立引用說明

---

### 衝突解決

#### 方法
- **概念定義衝突**：搜尋關鍵概念，檢查是否有相互矛盾的定義
- **規則衝突**：以 `docs/governance/` 中的規則為準
- **規格衝突**：以 `specs/` 中的規格為準

#### 處理規則
- 以 SSOT 為準
- 如果 SSOT 不明確，以最新或最完整的版本為準
- 記錄所有衝突和解決方案

---

## 🎯 決策記錄

### 重複檔案處理決策

#### 決策 1：P0-4.5_FUNNEL_SYSTEM_DESIGN.md
- **位置 1**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` ⭐ 基準檔案
- **位置 2**：`specs/ui/workflow/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` ❌ 重複
- **決策**：保留 `P0-4.5/` 中的檔案為 SSOT（基準檔案來源），刪除 `specs/` 中的重複
- **依據**：根目錄的基準檔案優先於 `specs/` 中的檔案
- **處理**：刪除重複檔案，建立 `specs/ui/workflow/README.md` 說明 SSOT 位置

#### 決策 2：result_presentation_design.v1.0.md
- **位置 1**：`domain/knowledge_base/result_presentation_design.v1.0.md` ⭐ SSOT
- **位置 2**：`specs/domain/narratives/result_presentation_design.v1.0.md` ❌ 重複
- **決策**：保留 `domain/knowledge_base/` 中的檔案為 SSOT，刪除 `specs/` 中的重複
- **依據**：`domain/` 優先於 `specs/`
- **處理**：刪除重複檔案，建立 `specs/domain/narratives/README.md` 說明 SSOT 位置

#### 決策 3：P0-4.5_INTEGRATION_WITH_P0-5.md
- **位置 1**：`P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md` ⭐ 基準檔案
- **位置 2**：`specs/ui/workflow/P0-4.5_INTEGRATION_WITH_P0-5.md` ❌ 重複
- **決策**：保留 `P0-4.5/` 中的檔案為 SSOT（基準檔案來源），刪除 `specs/` 中的重複
- **依據**：根目錄的基準檔案優先於 `specs/` 中的檔案
- **處理**：刪除重複檔案，更新 `specs/ui/workflow/README.md` 說明 SSOT 位置

---

### 不需要處理的檔案決策

#### 決策 4：INDEX.md
- **位置 1**：`docs/task_packets/INDEX.md` - 任務包索引
- **位置 2**：`memory/index/INDEX.md` - 記憶索引
- **決策**：內容不同，用途不同，保留兩個 ✅
- **依據**：兩個檔案有不同的用途，不是重複

#### 決策 5：README.md
- **多個位置**：16 個資料夾中的 README.md
- **決策**：正常，每個資料夾可以有 README，保留所有 ✅
- **依據**：README.md 是標準的資料夾說明檔案，可以有多個

#### 決策 6：MASTER_SYNC_PACKET.md
- **位置 1**：`docs/legacy/.../MASTER_SYNC_PACKET.md` - legacy 版本（1471 bytes）
- **位置 2**：`memory/briefs/MASTER_SYNC_PACKET.md` - 當前版本（171225 bytes）
- **決策**：legacy 資料夾中的是舊版本，可忽略 ✅
- **依據**：legacy 資料夾中的檔案是舊版本，不影響當前系統

#### 決策 7：NORTH_STAR.md
- **位置 1**：`docs/legacy/.../FULL/NORTH_STAR.md` - FULL 版本
- **位置 2**：`docs/legacy/.../MIN/NORTH_STAR.md` - MIN 版本
- **決策**：都在 legacy 資料夾中，是不同版本的快照，可忽略 ✅
- **依據**：legacy 資料夾中的檔案是舊版本，不影響當前系統

---

## 📝 文本化任務內容

### 任務包
- **位置**：`docs/task_packets/COMPLETE_DATA_CONSOLIDATION_TASK_PACKET.md`
- **內容**：
  - 任務概述
  - 問題分析（基於前一次任務的不足）
  - 完整整理計劃（6 個階段）
  - 執行細節（處理規則、衝突解決規則、位置校正規則）
  - 驗收標準
  - 執行計劃
  - 風險控制
  - 參考文件

### 執行日誌
- **位置**：`docs/ops/analysis/COMPLETE_DATA_CONSOLIDATION_EXECUTION_LOG.md`
- **內容**：
  - 執行摘要
  - 執行階段詳細記錄（6 個階段）
  - 發現與決策記錄
  - 衝突與無法決定的情況
  - 最終統計

### 最終報告
- **位置**：`docs/ops/analysis/COMPLETE_DATA_CONSOLIDATION_FINAL_REPORT.md`
- **內容**：
  - 執行摘要
  - 執行階段詳細記錄
  - 處理統計
  - 驗收標準檢查
  - 任務細節記錄
  - 相關概念記錄
  - 後續建議

### 審計報告
- **位置**：`docs/ops/analysis/COMPLETE_DUPLICATION_AUDIT.md`
- **內容**：
  - 檔名去重檢查結果
  - 內容去重檢查結果
  - 處理決策
  - 不需要處理的檔案

---

## 🔍 任務執行邏輯

### 從零開始的思考流程

```
開始執行任務
    ↓
階段 1：全面盤點
    ├─> 檔名去重檢查
    ├─> 內容去重檢查（MD5 雜湊值）
    ├─> 概念分散檢查
    └─> 位置驗證檢查
    ↓
階段 2：SSOT 建立與驗證
    ├─> 核心概念 SSOT 清單
    ├─> SSOT 驗證
    └─> SSOT 索引建立
    ↓
階段 3：重複檔案處理
    ├─> 內容相同的重複檔案處理
    ├─> 內容不同的同名檔案處理
    └─> 規格文件與核心資料的重複處理
    ↓
階段 4：衝突解決
    ├─> 概念定義衝突檢查
    ├─> 規則衝突檢查
    └─> 規格衝突檢查
    ↓
階段 5：位置校正
    ├─> 位置驗證
    ├─> 檔案移動
    └─> 引用更新
    ↓
階段 6：驗證與測試
    ├─> 結構驗證
    ├─> 內容驗證
    ├─> 引用驗證
    └─> 完整性測試
    ↓
任務完成
```

---

## ⚠️ 衝突與無法決定的情況

### 沒有發現衝突或無法決定的情況 ✅

所有決策都基於明確的規則：
- **重複檔案**：基於 SSOT 判斷規則（domain/ > docs/governance/ > 基準檔案 > specs/）
- **衝突檢查**：沒有發現衝突
- **位置驗證**：所有檔案位置都正確

---

## 📊 執行統計

### 處理的檔案
- **刪除重複檔案**：3 個
- **建立 README 說明**：3 個
- **建立 SSOT 索引**：1 個

### 建立的檔案
- `docs/SSOT_INDEX.md` - SSOT 總索引
- `specs/ui/workflow/README.md` - UI 工作流程說明
- `specs/domain/narratives/README.md` - Domain 敘事說明
- `docs/ops/analysis/COMPLETE_DUPLICATION_AUDIT.md` - 完整重複審計報告
- `docs/ops/analysis/COMPLETE_DATA_CONSOLIDATION_EXECUTION_LOG.md` - 執行日誌
- `docs/ops/analysis/COMPLETE_DATA_CONSOLIDATION_FINAL_REPORT.md` - 最終報告
- `docs/ops/analysis/COMPLETE_DATA_CONSOLIDATION_TASK_DETAILS.md` - 任務細節記錄（本檔案）

---

## ✅ 驗收標準

### 無衝突標準 ✅
- ✅ 所有概念只有一個定義
- ✅ 所有規則沒有相互矛盾
- ✅ 所有規格沒有相互衝突

### 無重複標準 ✅
- ✅ 沒有內容相同的重複檔案
- ✅ 沒有不必要的同名檔案
- ✅ 所有檔案都有明確的用途

### 無錯位標準 ✅
- ✅ 所有檔案都在正確的位置
- ✅ 所有檔案都符合 `CURSOR_FILE_PLACEMENT_RULE.md`
- ✅ 所有引用都正確

### 完整性標準 ✅
- ✅ 所有 SSOT 都存在
- ✅ 所有 SSOT 都被正確引用
- ✅ 所有索引都完整

---

**最後更新**：2026-01-12  
**狀態**：COMPLETE
