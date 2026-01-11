# 根目錄清理報告（Root Directory Cleanup Report）

**清理日期**：2026-01-10  
**執行日期**：2026-01-10  
**狀態**：✅ 已完成

---

## 📋 清理概述

本次清理將根目錄散落的舊制度文件封存，統一整理到 `xuance-commander-core/` 下管理，讓資料夾結構乾淨整齊。

---

## ✅ 已完成的清理工作

### 1. 根目錄結構清理

**清理前（舊制度）**：
```
./
├── FULL/（舊快照系統）
├── MIN/（舊快照系統）
├── codex/（重複結構）
├── memory/（重複結構）
├── tools/（重複結構）
├── P0-3/（階段文件，不在核心資料夾）
└── xuance-commander-core/（核心資料夾）
```

**清理後（新制度）**：
```
./
└── xuance-commander-core/（所有文件統一在此管理）
    ├── docs/
    │   └── legacy/
    │       └── archived_old_system_structure/（舊制度文件封存）
    ├── P0-3/（從根目錄移動）
    └── ...（其他核心文件）
```

---

### 2. 封存內容詳情

#### 2.1 FULL 和 MIN 快照系統

**封存位置**：`docs/legacy/archived_old_system_structure/full_min_snapshots/`

**封存內容**：
- `FULL/NORTH_STAR.md`：完整版 NORTH_STAR（舊快照系統）
- `MIN/NORTH_STAR.md`：精簡版 NORTH_STAR（舊快照系統）

**封存原因**：
- 這些是為迎合 GPT 作為總指揮時的舊快照系統
- 現在已有新的 MASTER_SYNC 系統在 `xuance-commander-core/memory/briefs/`
- Cursor 作為總工程師 + 總指揮，可以直接管理所有文件，不需要分散的快照系統

**現行替代**：
- `xuance-commander-core/charter/CHARTER.md`：專案憲章（SSOT）
- `xuance-commander-core/roadmap/ROADMAP.md`：專案路線圖（SSOT）
- `xuance-commander-core/memory/briefs/MASTER_SYNC_PACKET.md`：同步快照（自動生成）
- `xuance-commander-core/memory/briefs/MASTER_MIN_SYNC_PACKET.md`：最小同步快照（自動生成）

---

#### 2.2 根目錄重複結構

**封存位置**：`docs/legacy/archived_old_system_structure/root_duplicate_structure/`

**封存內容**：
- `codex/packs/`：舊的指令包（可能與 `xuance-commander-core/codex/packs/` 重複）
- `memory/briefs/MASTER_SYNC_PACKET.md`：舊的快照文件（可能與新版本不同）
- `tools/export_chat_packet.sh`：舊的工具腳本
- `tools/role_packet_coverage_audit.sh`：舊的工具腳本

**封存原因**：
- 根目錄的重複結構不符合新的 Canon Path 原則
- 所有文件應該統一在 `xuance-commander-core/` 下管理
- 新的結構已經在 `xuance-commander-core/` 下建立

**現行替代**：
- `xuance-commander-core/codex/packs/`：Codex 指令包
- `xuance-commander-core/memory/briefs/`：記憶簡報文件
- `xuance-commander-core/tools/`：工具腳本

---

#### 2.3 P0-3 階段文件

**舊位置**：根目錄的 `P0-3/`

**新位置**：`xuance-commander-core/P0-3/`

**移動內容**：
- `DECISION_PACKET_P0-3.md`
- `P0-3_COMPLETE_STATUS.md`
- `P0-3_FINAL_CHECKLIST.md`
- `P0-3_FREEZE_READINESS.md`
- `P0-3_HANDOFF_SUMMARY.md`
- `R1_METRICS_V1_EXECUTABLE_SPEC.md`
- `R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md`

**移動原因**：
- 其他階段文件（P0-4、P0-4.5、P0-5）都在 `xuance-commander-core/P0-X/` 下
- 應該統一階段文件的位置
- 符合新的文件放置規範

---

## 📊 清理統計

| 項目 | 舊位置 | 新位置/封存位置 | 數量 | 狀態 |
|------|--------|----------------|------|------|
| FULL 快照 | `./FULL/` | `docs/legacy/.../full_min_snapshots/FULL/` | 1 個資料夾 | ✅ 已封存 |
| MIN 快照 | `./MIN/` | `docs/legacy/.../full_min_snapshots/MIN/` | 1 個資料夾 | ✅ 已封存 |
| codex | `./codex/` | `docs/legacy/.../root_duplicate_structure/codex/` | 1 個資料夾 | ✅ 已封存 |
| memory | `./memory/` | `docs/legacy/.../root_duplicate_structure/memory/` | 1 個資料夾 | ✅ 已封存 |
| tools | `./tools/` | `docs/legacy/.../root_duplicate_structure/tools/` | 1 個資料夾 | ✅ 已封存 |
| P0-3 | `./P0-3/` | `xuance-commander-core/P0-3/` | 7 個文件 | ✅ 已移動 |
| **總計** | - | - | **11 個項目** | ✅ **已完成** |

---

## 🎯 清理原則

### 清理標準
1. **舊制度文件**：為迎合 GPT 作為總指揮時的舊制度文件，應封存
2. **重複結構**：根目錄與 `xuance-commander-core/` 重複的結構，應封存
3. **階段文件**：階段文件應統一在 `xuance-commander-core/P0-X/` 下

### 封存原則
1. **保留原始文件**：封存時保留原始文件內容，不修改
2. **建立索引**：在封存位置建立 README.md 說明封存內容
3. **記錄遷移**：記錄從舊位置到新位置的遷移情況
4. **保留引用**：如果有其他地方引用這些文件，應更新引用或記錄舊位置

---

## 📝 引用更新狀態

### 已更新
- ✅ `專案資料夾說明.md`：更新 FULL/ 資料夾說明
- ✅ `docs/governance/MASTER_SNAPSHOT_USAGE_GUIDE.md`：更新 FULL/MIN 引用
- ✅ `docs/domain/SSOT_INDEX.md`：更新 NORTH_STAR_CANON 引用
- ✅ `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`：加入封存規則

### 待更新（記錄在 REFERENCE_UPDATE_LOG.md）
- ⏳ 多個任務包文件仍引用 `FULL/NORTH_STAR.md`
- ⏳ 多個階段文件仍引用 `FULL/NORTH_STAR.md`
- ⏳ 多個記憶與快照文件仍引用 `FULL/NORTH_STAR.md`

**詳細清單**：見 `docs/legacy/archived_old_system_structure/REFERENCE_UPDATE_LOG.md`

---

## 🔍 查找方式

### 封存文件查找
- **FULL/MIN 快照**：`docs/legacy/archived_old_system_structure/full_min_snapshots/`
- **根目錄重複結構**：`docs/legacy/archived_old_system_structure/root_duplicate_structure/`
- **P0-3 階段文件**：已移動到 `xuance-commander-core/P0-3/`

### 現行文件查找
- **專案憲章**：`xuance-commander-core/charter/CHARTER.md`
- **專案路線圖**：`xuance-commander-core/roadmap/ROADMAP.md`
- **同步快照**：`xuance-commander-core/memory/briefs/MASTER_SYNC_PACKET.md`
- **最小快照**：`xuance-commander-core/memory/briefs/MASTER_MIN_SYNC_PACKET.md`

---

## 📋 相關規範文件

- **文件放置規範**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`（已更新封存規則）
- **MASTER 同步協議**：`docs/governance/MASTER_SYNC_PROTOCOL.md`
- **MASTER 快照使用指南**：`docs/governance/MASTER_SNAPSHOT_USAGE_GUIDE.md`（已更新）
- **引用更新日誌**：`docs/legacy/archived_old_system_structure/REFERENCE_UPDATE_LOG.md`

---

## ✅ 驗收檢查

- [x] 根目錄只保留 `xuance-commander-core/`（乾淨整齊）
- [x] FULL 和 MIN 資料夾已封存
- [x] 根目錄重複結構已封存
- [x] P0-3 階段文件已移動到正確位置
- [x] 封存位置已建立說明文件
- [x] 文件放置規範已更新封存規則
- [x] 關鍵引用已更新
- [x] 引用更新日誌已建立

---

## 🎯 後續建議

1. **持續更新引用**：
   - 優先更新核心規範文件和階段文件中的 FULL/MIN 引用
   - 參考 `REFERENCE_UPDATE_LOG.md` 進行批量更新

2. **更新生成腳本**：
   - 檢查並更新所有自動生成的文件腳本（如 `preflight.py`、`generate_master_sync_packet.sh`）
   - 確保生成的文件不再引用舊的 FULL/MIN 路徑

3. **定期檢查**：
   - 定期檢查是否有新文件引用了舊路徑
   - 確保所有新生成的文件都遵循新的文件放置規範

---

**本報告版本**：v1.0  
**清理日期**：2026-01-10  
**執行日期**：2026-01-10  
**狀態**：✅ 已完成

**— 根目錄清理已完成，資料夾結構已乾淨整齊。**
