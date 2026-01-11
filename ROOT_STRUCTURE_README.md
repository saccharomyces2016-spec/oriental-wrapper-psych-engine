# 根目錄結構說明（Root Directory Structure）

**建立日期**：2026-01-10  
**版本**：v1.0

---

## ⚠️ 重要更新

**根目錄已清理**，所有文件統一在 `xuance-commander-core/` 下管理。

**舊制度文件已封存**：為迎合 GPT 作為總指揮時的舊制度文件已封存至 `xuance-commander-core/docs/legacy/archived_old_system_structure/`

---

## 📋 根目錄結構（清理後）

```
./
└── xuance-commander-core/（所有文件統一在此管理）
    ├── charter/（專案憲章）
    ├── roadmap/（專案路線圖）
    ├── docs/（文件）
    │   ├── governance/（治理文件）
    │   ├── domain/（領域文件）
    │   ├── legacy/（舊制度文件封存）
    │   │   └── archived_old_system_structure/（舊制度結構封存）
    │   └── task_packets/（任務包集中管理）
    ├── memory/（記憶文件）
    ├── P0-X/（階段文件）
    ├── tools/（工具腳本）
    └── ...（其他核心文件）
```

---

## 🔍 快速查找

### 專案核心文件
- **專案憲章**：`xuance-commander-core/charter/CHARTER.md`（取代舊的 `FULL/NORTH_STAR.md`）
- **專案路線圖**：`xuance-commander-core/roadmap/ROADMAP.md`
- **同步快照**：`xuance-commander-core/memory/briefs/MASTER_SYNC_PACKET.md`

### 文件放置規範
- **文件放置規範**：`xuance-commander-core/docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

### 任務包管理
- **任務包索引**：`xuance-commander-core/docs/task_packets/INDEX.md`

---

## 📝 舊制度文件封存位置

### 已封存的舊制度文件
- **FULL/MIN 快照**：`xuance-commander-core/docs/legacy/archived_old_system_structure/full_min_snapshots/`
- **根目錄重複結構**：`xuance-commander-core/docs/legacy/archived_old_system_structure/root_duplicate_structure/`

**封存說明**：見 `xuance-commander-core/docs/legacy/archived_old_system_structure/README.md`

---

## 🎯 現在的工作模式

**角色定位**：
- **Cursor**：總工程師 + 總指揮（可以管理所有資料夾、發派任務、執行任務）
- **GPT**：審核顧問（副指揮官）
- **Gemini**：內容顧問

**文件管理**：
- 所有文件統一在 `xuance-commander-core/` 下管理
- 遵循 `CURSOR_FILE_PLACEMENT_RULE.md` 規範
- 不再使用分散的快照系統

---

## 📝 相關文件

- **專案資料夾說明**：`xuance-commander-core/專案資料夾說明.md`
- **根目錄清理報告**：`xuance-commander-core/docs/legacy/archived_old_system_structure/ROOT_CLEANUP_REPORT.md`
- **引用更新日誌**：`xuance-commander-core/docs/legacy/archived_old_system_structure/REFERENCE_UPDATE_LOG.md`

---

**本文件版本**：v1.0  
**建立日期**：2026-01-10  
**狀態**：ACTIVE | EDITABLE

**— 根目錄已清理，資料夾結構已乾淨整齊。**
