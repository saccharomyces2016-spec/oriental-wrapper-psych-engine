# FILE_WRITE_LOCATION_RULE（文件寫入位置規則｜硬規則）

**狀態**：ACTIVE | INTEGRATED（已整合到 CURSOR_FILE_PLACEMENT_RULE.md）  
**建立日期**：2026-01-10  
**版本**：v1.0-Integrated  

---

## ⚠️ 重要聲明：本規範已整合

**本規範已整合到 `CURSOR_FILE_PLACEMENT_RULE.md`。**

**雙重保障機制**：
1. **主要規範**：`CURSOR_FILE_PLACEMENT_RULE.md`（詳細規範，包含完整對照表）
2. **整合指南**：`FOLDER_STRUCTURE_INTEGRATION_GUIDE.md`（快速參考）
3. **本文件**：保留作為快速參考（基本規則）

**使用建議**：
- ✅ 詳細規範請參考 `CURSOR_FILE_PLACEMENT_RULE.md`
- ✅ 快速參考請使用本文件或 `FOLDER_STRUCTURE_INTEGRATION_GUIDE.md`
- ✅ 不確定時，請查閱主要規範

---

## 目的
防止文件寫入錯誤位置，導致 Canon Path 違規、路徑混亂、引用錯誤。

## 硬規則（寫入前必檢查）

### 1. 治理文件（Governance）
**必須寫入：** `xuance-commander-core/docs/governance/`
**禁止：** 
- ❌ repo-root 的 `./docs/governance`
- ❌ `./docs/governance`（相對路徑）
- ❌ 任何其他位置的 `docs/governance/`

**檢查方法：**
- 絕對路徑必須包含 `xuance-commander-core/docs/governance/`
- 相對路徑必須從 `xuance-commander-core/` 開始

### 2. 輸出文件（Output）
**必須寫入：** `xuance-commander-core/out/`
**禁止：**
- ❌ repo-root 的 `./out`
- ❌ 任何其他位置的 `out/`

### 3. 臨時文件（Temporary）
**必須寫入：** `xuance-commander-core/tmp/`
**禁止：**
- ❌ repo-root 的 `./tmp`
- ❌ 任何其他位置的 `tmp/`

### 4. 日誌文件（Logs）
**必須寫入：** `xuance-commander-core/logs/`
**禁止：**
- ❌ repo-root 的 `./logs`
- ❌ 任何其他位置的 `logs/`

### 5. Domain 文件
**必須寫入：** `xuance-commander-core/docs/domain/`
**禁止：**
- ❌ repo-root 的 `./docs/domain`
- ❌ 任何其他位置的 `docs/domain/`

---

## 寫入前檢查清單（必執行）

在寫入任何文件前，必須確認：

1. ✅ 目標路徑是否以 `xuance-commander-core/` 開頭？
2. ✅ 目標路徑是否符合上述 Canon 規則？
3. ✅ 是否使用了相對路徑（如 `out/`, `tmp/`, `docs/`）？ → **必須改為完整 Canon 路徑**

---

## 引用路徑規則

**禁止使用相對路徑：**
- ❌ `out/CHAT_PACKET.md`
- ❌ `tmp/audit/xxx.md`
- ❌ `docs/governance/xxx.md`

**必須使用完整 Canon 路徑：**
- ✅ `xuance-commander-core/out/CHAT_PACKET.md`
- ✅ `xuance-commander-core/tmp/audit/xxx.md`
- ✅ `xuance-commander-core/docs/governance/xxx.md`

---

## 違規後果

任何違反本規則的文件寫入：
- ❌ 視為 Canon 違規
- ❌ 不得被引用為證據
- ❌ 必須立即移動或刪除

---

## 特殊情況

### Legacy 文件
- 已存在的 legacy 文件維持現狀
- 新文件不得寫入 legacy 目錄（除非明確標記為 legacy）

### 生成腳本
- 生成腳本必須使用完整 Canon 路徑
- 禁止使用相對路徑生成文件

---

## 狀態
- ACTIVE
- EDITABLE
- 必須納入 MIN 快照



