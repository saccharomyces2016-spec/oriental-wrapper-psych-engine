# 全面資料夾整合計劃

**建立日期**：2026-01-12  
**目的**：對 `xuance-commander-core` 下的所有資料夾及檔案進行分析和整合  
**狀態**：ANALYSIS COMPLETE, READY FOR INTEGRATION

---

## 📊 分析結果

### 檔案統計
- **總 MD 檔案**：585 個
- **總 JSON 檔案**：208 個
- **主要資料夾**：24 個

### 發現的問題

#### 1. 重複檔名
發現多個重複檔名（不同位置）：
- `CHANGELOG.md` - 多個位置
- `INDEX.md` - 多個位置
- `COMMANDER_AUTOPILOT_PROTOCOL.md` - 多個位置
- `P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 多個位置（已處理）
- 等等...

#### 2. 大量摘要/報告檔案
- 找到大量 `*SUMMARY*.md`, `*COMPLETE*.md`, `*FINAL*.md`, `*AUDIT*.md`, `*REPORT*.md` 檔案
- 這些檔案可能包含重複或過時資訊

#### 3. 根目錄檔案
- 根目錄有多個 `.md` 檔案，應該整理到適當位置

---

## 🎯 整合策略

### 第一階段：清理根目錄
- [ ] 將根目錄的 `.md` 檔案移動到適當位置
- [ ] 合併或刪除重複的報告檔案

### 第二階段：整合 docs/ 資料夾
- [ ] 整理 `docs/governance/` - 可能有重複規則
- [ ] 整理 `docs/ops/` - 可能有重複報告
- [ ] 整理 `docs/domain/` - 確保 SSOT 清晰

### 第三階段：整合重複檔案
- [ ] 識別重複檔名的實際內容差異
- [ ] 合併或刪除重複內容
- [ ] 建立統一索引

### 第四階段：建立統一索引
- [ ] 更新 `專案資料夾說明.md`
- [ ] 建立完整的檔案索引
- [ ] 確保所有 SSOT 清晰標示

---

## 📋 主要資料夾分類

### 核心資料夾（保持不變）
- `charter/` - 專案憲章（SSOT）
- `roadmap/` - 路線圖（SSOT）
- `domain/` - Domain 資料（SSOT）
- `engine/` - 引擎實作
- `ui/` - UI 實作
- `specs/` - 規格文件（新建立）

### 文件資料夾（需要整理）
- `docs/governance/` - 治理規則
- `docs/ops/` - 運營記錄
- `docs/domain/` - Domain 相關文件
- `docs/gem/` - AI 顧問記錄
- `docs/adr/` - 架構決策記錄

### 記憶資料夾（需要整理）
- `memory/briefs/` - 專案摘要
- `memory/changes/` - 變更記錄
- `memory/index/` - 索引文件

### 歸檔資料夾
- `archive/` - 已歸檔內容
- `docs/legacy/` - 舊系統結構

---

**文件狀態**：ANALYSIS COMPLETE  
**下一步**：開始執行整合
