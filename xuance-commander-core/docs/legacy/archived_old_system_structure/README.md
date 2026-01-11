# 舊制度結構封存目錄（Archived Old System Structure）

**封存日期**：2026-01-10  
**封存原因**：為迎合 GPT 作為總指揮時的舊制度，現已採用新架構（Cursor 作為總工程師 + 總指揮）

---

## ⚠️ 重要聲明

**本目錄封存的是舊制度下的文件結構，暫時不會用到，僅作參考。**

這些文件是為了迎合 GPT 作為總指揮時的架構設計，主要用於解決 GPT 上下文長度限制的問題。

**現行制度**：
- Cursor 作為總工程師 + 總指揮
- GPT 作為審核顧問（副指揮官）
- Gemini 作為內容顧問
- 新的快照系統：`MASTER_SYNC_PACKET.md` 和 `MASTER_MIN_SYNC_PACKET.md` 在 `xuance-commander-core/memory/briefs/`

---

## 📦 封存內容說明

### 1. FULL 和 MIN 快照系統（根目錄）

**舊位置**：根目錄的 `FULL/` 和 `MIN/`

**封存位置**：`docs/legacy/archived_old_system_structure/full_min_snapshots/`

**內容**：
- `FULL/NORTH_STAR.md`：完整版 NORTH_STAR（為 GPT 上下文限制設計的完整快照）
- `MIN/NORTH_STAR.md`：精簡版 NORTH_STAR（為 GPT 上下文限制設計的精簡快照）

**用途**（舊制度）：
- FULL：包含完整的 NORTH_STAR 內容，用於給 GPT 提供完整上下文
- MIN：包含精簡的 NORTH_STAR 內容，用於給 GPT 提供快速參考

**現行替代**：
- `xuance-commander-core/charter/CHARTER.md`：專案憲章（SSOT）
- `xuance-commander-core/roadmap/ROADMAP.md`：專案路線圖（SSOT）
- `xuance-commander-core/memory/briefs/MASTER_SYNC_PACKET.md`：同步快照（自動生成）
- `xuance-commander-core/memory/briefs/MASTER_MIN_SYNC_PACKET.md`：最小同步快照（自動生成）

**封存原因**：
- 這些快照是為了解決 GPT 上下文長度限制的問題
- 現在 Cursor 可以直接管理所有文件，不需要分散的快照系統
- 新的 MASTER_SYNC 系統已經整合到 `xuance-commander-core/` 下

---

### 2. 根目錄重複結構

**舊位置**：根目錄的 `codex/`、`memory/`、`tools/`

**封存位置**：`docs/legacy/archived_old_system_structure/root_duplicate_structure/`

**內容**：
- `codex/packs/`：舊的指令包（可能與 `xuance-commander-core/codex/packs/` 重複）
- `memory/briefs/MASTER_SYNC_PACKET.md`：舊的快照文件（可能與新版本不同）
- `tools/export_chat_packet.sh`、`tools/role_packet_coverage_audit.sh`：舊的工具腳本

**封存原因**：
- 根目錄的重複結構不符合新的 Canon Path 原則
- 所有文件應該統一在 `xuance-commander-core/` 下管理
- 新的結構已經在 `xuance-commander-core/` 下建立

---

### 3. P0-3 階段文件（根目錄）

**舊位置**：根目錄的 `P0-3/`

**移動位置**：`xuance-commander-core/P0-3/`

**內容**：
- `P0-3/DECISION_PACKET_P0-3.md`：P0-3 決策封包
- `P0-3/P0-3_COMPLETE_STATUS.md`：P0-3 完成狀態
- `P0-3/P0-3_FINAL_CHECKLIST.md`：P0-3 最終檢查清單
- `P0-3/P0-3_FREEZE_READINESS.md`：P0-3 凍結準備
- `P0-3/P0-3_HANDOFF_SUMMARY.md`：P0-3 交接摘要
- `P0-3/R1_METRICS_V1_EXECUTABLE_SPEC.md`：R1 指標規格
- `P0-3/R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md`：R2 隱喻邊界與禁用詞模板

**移動原因**：
- 其他階段文件（P0-4、P0-4.5、P0-5）都在 `xuance-commander-core/P0-X/` 下
- 應該統一階段文件的位置
- 符合新的文件放置規範

---

## 📋 封存規則

### 封存原則
1. **保留原始文件**：封存時保留原始文件內容，不修改
2. **建立索引**：在封存位置建立 README.md 說明封存內容
3. **記錄遷移**：記錄從舊位置到新位置的遷移情況
4. **保留引用**：如果有其他地方引用這些文件，應更新引用或記錄舊位置

### 封存狀態
- **狀態**：ARCHIVED（已封存）
- **用途**：僅供參考，暫時不會用到
- **恢復**：如果需要恢復，應先評估是否適合現行制度

---

## 🔍 查找方式

### 舊制度文件查找
- **FULL/MIN 快照**：`docs/legacy/archived_old_system_structure/full_min_snapshots/`
- **根目錄重複結構**：`docs/legacy/archived_old_system_structure/root_duplicate_structure/`
- **P0-3 階段文件**：已移動到 `xuance-commander-core/P0-3/`

### 現行制度文件查找
- **專案憲章**：`xuance-commander-core/charter/CHARTER.md`
- **專案路線圖**：`xuance-commander-core/roadmap/ROADMAP.md`
- **同步快照**：`xuance-commander-core/memory/briefs/MASTER_SYNC_PACKET.md`
- **最小快照**：`xuance-commander-core/memory/briefs/MASTER_MIN_SYNC_PACKET.md`

---

## 📝 相關規範文件

- **文件放置規範**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
- **MASTER 同步協議**：`docs/governance/MASTER_SYNC_PROTOCOL.md`
- **MASTER 快照使用指南**：`docs/governance/MASTER_SNAPSHOT_USAGE_GUIDE.md`

---

## 🎯 封存後的資料夾結構

### 封存前（舊制度）
```
./
├── FULL/
│   └── NORTH_STAR.md
├── MIN/
│   └── NORTH_STAR.md
├── codex/
│   └── packs/
├── memory/
│   └── briefs/
├── tools/
├── P0-3/
└── xuance-commander-core/
```

### 封存後（新制度）
```
xuance-commander-core/
├── docs/
│   └── legacy/
│       └── archived_old_system_structure/
│           ├── README.md（本文件）
│           ├── full_min_snapshots/
│           │   ├── FULL/
│           │   │   └── NORTH_STAR.md
│           │   └── MIN/
│           │       └── NORTH_STAR.md
│           └── root_duplicate_structure/
│               ├── codex/
│               ├── memory/
│               └── tools/
├── P0-3/（從根目錄移動）
├── P0-4/
├── P0-5/
└── ...（其他核心文件）
```

---

**本封存目錄版本**：v1.0  
**封存日期**：2026-01-10  
**狀態**：ARCHIVED（已封存，僅供參考）

**— 舊制度文件已封存，資料夾結構已清理。**
