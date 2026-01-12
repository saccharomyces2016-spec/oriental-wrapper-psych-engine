# SSOT（單一真相來源）總索引

**建立日期**：2026-01-12  
**狀態**：ACTIVE ⭐ **SSOT**  
**目的**：索引所有核心概念的 SSOT 檔案位置

---

## 📋 核心原則

### SSOT 原則
- 每個概念只有一個 SSOT 檔案
- 其他位置應引用 SSOT，而非複製內容
- SSOT 檔案應在核心位置（`domain/`, `docs/governance/`, `specs/`, `charter/`, `roadmap/`）

---

## 🎯 核心概念 SSOT 清單

### 專案核心

| 概念 | SSOT 位置 | 狀態 |
|------|----------|------|
| **專案憲章** | `charter/CHARTER.md` | ✅ SSOT |
| **路線圖** | `roadmap/ROADMAP.md` | ✅ SSOT |
| **任務狀態** | `docs/ops/TASK_STATUS.md` | ✅ SSOT |

---

### 治理與規則

| 概念 | SSOT 位置 | 狀態 |
|------|----------|------|
| **文件放置規範** | `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md` | ✅ SSOT |
| **核心制度** | `docs/governance/ESSENTIAL_RULES.md` | ✅ SSOT |
| **檔案放置與查找指引** | `docs/FILE_PLACEMENT_AND_SEARCH_GUIDE.md` | ✅ SSOT |

---

### UI 設計

| 概念 | SSOT 位置 | 狀態 |
|------|----------|------|
| **UI 架構** | `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` | ✅ SSOT |
| **UI 工作流程（4 階段分流系統）** | `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` | ✅ SSOT（基準檔案） |
| **UI 整合文件** | `P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md` | ✅ SSOT（基準檔案） |
| **UI 世界觀** | `specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md` | ✅ SSOT |

---

### Domain 設計

| 概念 | SSOT 位置 | 狀態 |
|------|----------|------|
| **題目設計指南** | `domain/knowledge_base/question_design_guidelines.v1.0.md` | ✅ SSOT |
| **結果呈現設計** | `domain/knowledge_base/result_presentation_design.v1.0.md` | ✅ SSOT |
| **分數計算定義** | `domain/facets/*.scoring.v1.0.json` | ✅ SSOT |
| **分數計算實作** | `engine/score_facet.py` | ✅ SSOT |

---

### 引擎規格

| 概念 | SSOT 位置 | 狀態 |
|------|----------|------|
| **引擎規格** | `specs/engine/` | ✅ SSOT |
| **引擎實作** | `engine/` | ✅ SSOT |

---

## 📚 其他重要索引

### 索引檔案
- `memory/index/INDEX.md` - 記憶索引
- `docs/task_packets/INDEX.md` - 任務包索引
- `docs/governance/GOVERNANCE_INDEX.md` - 治理索引

### 任務報告
- `archive/tasks_by_category/ui/TASK_REPORTS.md` - UI 類別任務報告
- `archive/tasks_by_category/engine/TASK_REPORTS.md` - 引擎類別任務報告
- `archive/tasks_by_category/core_development/TASK_REPORTS.md` - 核心開發類別任務報告

---

## 🔍 查找指引

### 如何查找 SSOT？

1. **先查本索引**：`docs/SSOT_INDEX.md`
2. **再查查找指引**：`docs/FILE_PLACEMENT_AND_SEARCH_GUIDE.md`
3. **最後查具體索引**：
   - 治理規則 → `docs/governance/GOVERNANCE_INDEX.md`
   - 任務相關 → `docs/task_packets/INDEX.md`
   - 記憶相關 → `memory/index/INDEX.md`

---

## ⚠️ 重要提醒

### SSOT 維護規則

1. **只有一個 SSOT**：每個概念只能有一個 SSOT 檔案
2. **引用而非複製**：其他位置應引用 SSOT，而非複製內容
3. **更新 SSOT**：更新概念時，只更新 SSOT 檔案
4. **更新索引**：更新 SSOT 後，更新本索引

### 發現重複 SSOT 時

1. 檢查兩個檔案的內容是否相同
2. 如果相同：刪除重複，保留 SSOT
3. 如果不同：分析差異，決定合併或保留
4. 更新本索引

---

**最後更新**：2026-01-12  
**狀態**：ACTIVE ⭐ **SSOT**
