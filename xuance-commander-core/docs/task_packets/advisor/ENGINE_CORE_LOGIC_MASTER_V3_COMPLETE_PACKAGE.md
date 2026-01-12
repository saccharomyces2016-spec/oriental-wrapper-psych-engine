# ENGINE_CORE_LOGIC_MASTER_V3 完整檔案包

**建立日期**：2026-01-12  
**狀態**：READY_FOR_TRANSMISSION  
**目的**：提供最完整的檔案清單，供傳送或討論使用

---

## 📦 核心檔案（必傳）

### 1. 引擎核心邏輯規格（主要文件）

**檔案**：`specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`

**說明**：
- 這是整合後的引擎核心邏輯規格（V3.0）
- 包含：核心憲章、數據注入、題目系統、運算引擎、風險鏈、結果呈現、詞彙治理
- 狀態：ACTIVE · REFERENCE · EDITABLE（可修改，保留後續調整權）

**路徑**：
```
xuance-commander-core/specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md
```

---

### 2. 審核報告（理解整合狀態）

**檔案**：`docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md`

**說明**：
- 詳細的審核報告，說明哪些部分符合、哪些需要追問
- 包含符合度評估、衝突點分析、寫入策略

**路徑**：
```
xuance-commander-core/docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md
```

---

### 3. 追問包（待確認項目）

**檔案**：`docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md`

**說明**：
- 包含兩個需要確認的追問項目：
  1. 運算模型升級（weighted_sum → 向量狀態評估）
  2. 風險鏈結構整合（三層結構 vs A/B Framework）

**路徑**：
```
xuance-commander-core/docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md
```

---

## 📚 背景資料檔案（建議一併傳送）

### 4. 現有任務包（完整背景資料）

**檔案**：`docs/task_packets/advisor/ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md`

**說明**：
- 這是之前建立的完整任務包，包含所有背景資料
- 包含：專案目標、當前實作、題目設計、分數計算、結果呈現、詞彙管理、UI 整合
- 狀態：READY_FOR_ADVISOR_CONSULTATION

**路徑**：
```
xuance-commander-core/docs/task_packets/advisor/ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md
```

---

### 5. 專案憲章（終極目標）

**檔案**：`charter/CHARTER.md`

**說明**：
- 專案的終極目標和不可觸碰限制
- 理解「純玄學體驗」的核心原則

**路徑**：
```
xuance-commander-core/charter/CHARTER.md
```

---

### 6. P0-4.5 分流系統設計（Context Schema 來源）

**檔案**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`

**說明**：
- 4 階段分流系統設計
- 包含 Stage 1-4 的輸出格式，與 ENGINE_CORE_LOGIC_MASTER_V3 的 Context Schema 對應

**路徑**：
```
xuance-commander-core/P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md
```

---

### 7. 風險鏈結構資產（現有 A/B Framework）

**檔案**：`docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md`

**說明**：
- 現有的 A/B Framework 風險鏈結構
- 需要與 ENGINE_CORE_LOGIC_MASTER_V3 的三層結構整合

**路徑**：
```
xuance-commander-core/docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md
```

---

### 8. 當前實作（運算模型）

**檔案**：`engine/score_facet.py`

**說明**：
- 當前使用的 `weighted_sum` 模型實作
- 需要確認是否要升級到向量狀態評估

**路徑**：
```
xuance-commander-core/engine/score_facet.py
```

---

### 9. 詞彙管理 SSOT（白名單/黑名單）

**檔案**：
- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙白名單
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 全域禁用詞表（包含命定論用語）
- `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範

**說明**：
- ENGINE_CORE_LOGIC_MASTER_V3 的詞彙治理部分對應這些 SSOT

**路徑**：
```
xuance-commander-core/domain/knowledge_base/vocabulary_metaphysical.v1.0.json
xuance-commander-core/domain/knowledge_base/forbidden_terms.v1.0.json
xuance-commander-core/domain/knowledge_base/presentation_guidelines.v1.0.md
```

---

## 🎯 傳送建議

### 方案 A：最精簡（核心檔案）

**適合**：快速了解 ENGINE_CORE_LOGIC_MASTER_V3 的內容

1. `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` ⭐⭐⭐
2. `docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md` ⭐⭐
3. `docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md` ⭐⭐

---

### 方案 B：完整背景（推薦）

**適合**：需要完整理解整合狀態和背景

**核心檔案**（必傳）：
1. `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` ⭐⭐⭐
2. `docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md` ⭐⭐
3. `docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md` ⭐⭐

**背景資料**（建議傳）：
4. `docs/task_packets/advisor/ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md` ⭐⭐
5. `charter/CHARTER.md` ⭐
6. `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` ⭐
7. `docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md` ⭐
8. `engine/score_facet.py` ⭐

---

### 方案 C：最完整（包含所有 SSOT）

**適合**：需要完整理解整個專案架構

**包含方案 B 的所有檔案，再加上**：
9. `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` ⭐
10. `domain/knowledge_base/forbidden_terms.v1.0.json` ⭐
11. `domain/knowledge_base/presentation_guidelines.v1.0.md` ⭐

---

## 📋 檔案清單總覽

| 優先級 | 檔案名稱 | 路徑 | 說明 |
|--------|---------|------|------|
| ⭐⭐⭐ | ENGINE_CORE_LOGIC_MASTER_V3.md | `specs/engine/core/` | 主要規格文件 |
| ⭐⭐ | ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md | `docs/ops/analysis/` | 審核報告 |
| ⭐⭐ | ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md | `docs/task_packets/advisor/` | 追問包 |
| ⭐⭐ | ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md | `docs/task_packets/advisor/` | 完整背景資料 |
| ⭐ | CHARTER.md | `charter/` | 專案憲章 |
| ⭐ | P0-4.5_FUNNEL_SYSTEM_DESIGN.md | `P0-4.5/` | 分流系統設計 |
| ⭐ | R4_RISKCHAINS_STRUCTURAL_ASSETS.md | `docs/domain/advisory/R4/` | 風險鏈結構 |
| ⭐ | score_facet.py | `engine/` | 當前實作 |
| ⭐ | vocabulary_metaphysical.v1.0.json | `domain/knowledge_base/` | 詞彙白名單 |
| ⭐ | forbidden_terms.v1.0.json | `domain/knowledge_base/` | 禁用詞表 |
| ⭐ | presentation_guidelines.v1.0.md | `domain/knowledge_base/` | 呈現規範 |

---

## 🚀 快速傳送指令

### 方案 A（最精簡）
```bash
# 核心檔案
specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md
docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md
docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md
```

### 方案 B（完整背景，推薦）
```bash
# 核心檔案
specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md
docs/ops/analysis/ENGINE_CORE_LOGIC_MASTER_V3_AUDIT.md
docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md

# 背景資料
docs/task_packets/advisor/ENGINE_CORE_LOGIC_COMPREHENSIVE_TASK_PACKET.md
charter/CHARTER.md
P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md
docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md
engine/score_facet.py
```

---

**建立日期**：2026-01-12  
**狀態**：READY_FOR_TRANSMISSION
