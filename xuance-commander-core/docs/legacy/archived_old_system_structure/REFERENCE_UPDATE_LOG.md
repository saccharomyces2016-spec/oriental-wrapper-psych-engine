# 引用更新日誌（Reference Update Log）

**建立日期**：2026-01-10  
**目的**：記錄需要更新的 FULL/MIN 引用

---

## ⚠️ 重要說明

**舊的 FULL/MIN 快照系統已封存**，以下文件中仍有對 `FULL/NORTH_STAR.md` 或 `MIN/NORTH_STAR.md` 的引用，應更新為：

- ✅ `xuance-commander-core/charter/CHARTER.md`（專案憲章，SSOT）
- ✅ `xuance-commander-core/roadmap/ROADMAP.md`（專案路線圖，SSOT）

---

## 📋 需要更新的文件清單

### 核心規範文件（優先更新）

1. **`docs/governance/CURSOR_TASK_PACKAGE_RULE.md`**
   - 引用：`FULL/NORTH_STAR.md`
   - 應更新為：`charter/CHARTER.md` 或 `roadmap/ROADMAP.md`

2. **`docs/governance/COMPLETE_TASK_PACKAGE_RULE.md`**
   - 引用：`FULL/NORTH_STAR.md` 核心內容
   - 應更新為：`charter/CHARTER.md` 核心內容

3. **`docs/governance/INFORMATION_CLASSIFICATION_RULE.md`**
   - 引用：`FULL/NORTH_STAR.md` 核心內容
   - 應更新為：`charter/CHARTER.md` 核心內容

4. **`docs/governance/SNAPSHOT_REQUEST_PROTOCOL.md`**
   - 引用：`FULL/` 和 `MIN/` 資料夾
   - 應更新為：說明已封存，引用 `charter/CHARTER.md` 和 `roadmap/ROADMAP.md`

---

### 階段文件（優先更新）

5. **`P0-5/P0-5_TASK_PACKET.md`**
   - 引用：`FULL/NORTH_STAR.md`
   - 應更新為：`charter/CHARTER.md` 或 `roadmap/ROADMAP.md`

6. **`P0-4.5/P0-4.5_CHARTER.md`**
   - 引用：`FULL/NORTH_STAR.md`
   - 應更新為：`charter/CHARTER.md`

7. **`P0-4.5/P0-4.5_PHASE_LOG.md`**
   - 引用：`FULL/NORTH_STAR.md`
   - 應更新為：`charter/CHARTER.md`

8. **`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`**
   - 引用：`FULL/NORTH_STAR.md`
   - 應更新為：`charter/CHARTER.md`

---

### 任務包文件（優先更新）

9. **`docs/task_packets/advisor/task_packages/TASK_PACKAGE_P0-4.5_QUESTION_FLOW_FUNNEL_SYSTEM.md`**
   - 引用：`FULL/NORTH_STAR.md` 和 `MIN/NORTH_STAR.md`
   - 應更新為：`charter/CHARTER.md` 或 `roadmap/ROADMAP.md`

10. **`docs/task_packets/advisor/task_packages/TASK_PACKAGE_P0-5_UI_INTEGRATION.md`**
    - 引用：`FULL/NORTH_STAR.md`
    - 應更新為：`charter/CHARTER.md`

11. **`docs/task_packets/advisor/task_packages/TASK_PACKAGE_P0-4_FACET_PORTABILITY.md`**
    - 引用：`FULL/NORTH_STAR.md`
    - 應更新為：`charter/CHARTER.md`

---

### 路線圖與目標文件（優先更新）

12. **`roadmap/ROADMAP.md`**
    - 引用：`FULL/NORTH_STAR.md`
    - 應更新為：`charter/CHARTER.md`（或保持自我引用）

13. **`roadmap/MASTER_WORK_OBJECTIVES.md`**
    - 引用：`FULL/NORTH_STAR.md`
    - 應更新為：`charter/CHARTER.md`

---

### 記憶與快照文件（視需要更新）

14. **`memory/briefs/COMMAND_BRIEF.md`**（自動生成，可能需要更新生成腳本）
    - 引用：`FULL/NORTH_STAR.md`
    - 應更新：生成腳本應引用 `charter/CHARTER.md`

15. **`memory/briefs/MASTER_MIN_SYNC_PACKET.md`**（自動生成，可能需要更新生成腳本）
    - 引用：`FULL/NORTH_STAR.md` 和 `MIN/NORTH_STAR.md`
    - 應更新：生成腳本應引用 `charter/CHARTER.md`

16. **`memory/briefs/DEPUTY_COMMANDER_BRIEF.md`**
    - 引用：`FULL/NORTH_STAR.md`
    - 應更新為：`charter/CHARTER.md`

17. **`memory/briefs/DEPUTY_COMMANDER_SNAPSHOT.md`**
    - 引用：`FULL/NORTH_STAR.md`
    - 應更新為：`charter/CHARTER.md`

---

### 索引文件（優先更新）

18. **`docs/domain/SSOT_INDEX.md`**
    - 引用：`FULL/NORTH_STAR.md` 和 `MIN/NORTH_STAR.md`
    - 應更新為：移除或標記為 ARCHIVED

19. **`專案資料夾說明.md`**
    - 引用：`FULL/` 資料夾說明
    - 應更新為：標記為 ARCHIVED，指向封存位置

---

### 輸出文件（可延後更新）

20. **`out/advisor_packs/**/*.md`**（輸出文件，可延後）
    - 引用：`FULL/NORTH_STAR.md` 和 `MIN/NORTH_STAR.md`
    - 狀態：輸出文件，可延後更新

21. **`memory/briefs/role_sync_packets/**/*.md`**（自動生成，可能需要更新生成腳本）
    - 引用：`MIN/FULL`
    - 應更新：生成腳本應更新

---

### 治理文件（視需要更新）

22. **`docs/governance/SNAPSHOT_REQUEST_PROTOCOL.md`**
    - 引用：`FULL/` 和 `MIN/` 資料夾
    - 應更新：說明已封存，引用新的快照系統

23. **`docs/governance/REMEMBER_MEANS_COMMAND_PACK_RULE.md`**
    - 引用：`MIN/FULL` 快照檔
    - 應更新：引用 `MASTER_SYNC_PACKET.md` 和 `MASTER_MIN_SYNC_PACKET.md`

24. **`docs/ops/SYNC_TRIGGERS.md`**
    - 引用：`MIN/FULL`（作為快照類型）
    - 應更新：說明已封存舊的 FULL/MIN 資料夾，現使用 MASTER_SYNC 系統

25. **`docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md`**
    - 引用：`MIN/FULL/VERIFICATION_PACK`（作為同步策略類型）
    - 應更新：說明已封存舊的 FULL/MIN 資料夾，現使用 MASTER_SYNC 系統

---

## 📝 更新規則

### 更新原則
1. **優先更新**：核心規範文件、階段文件、任務包文件、路線圖文件
2. **視需要更新**：記憶與快照文件（自動生成的文件可能需要更新生成腳本）
3. **可延後更新**：輸出文件（out/ 下的文件）

### 更新方式
1. **直接引用**：`FULL/NORTH_STAR.md` → `charter/CHARTER.md`
2. **說明封存**：如果文件提到 FULL/MIN 資料夾，應說明已封存至 `docs/legacy/archived_old_system_structure/`
3. **更新腳本**：如果文件是自動生成的，應更新生成腳本

### 更新狀態追蹤
- [ ] 核心規範文件（4 個）
- [ ] 階段文件（4 個）
- [ ] 任務包文件（3 個）
- [ ] 路線圖與目標文件（2 個）
- [ ] 記憶與快照文件（4 個）
- [ ] 索引文件（2 個）
- [ ] 輸出文件（可延後）
- [ ] 治理文件（4 個）

---

## 🔍 查找引用的命令

```bash
# 查找所有引用 FULL/NORTH_STAR 的文件
grep -r "FULL/NORTH_STAR" xuance-commander-core/ --include="*.md"

# 查找所有引用 MIN/NORTH_STAR 的文件
grep -r "MIN/NORTH_STAR" xuance-commander-core/ --include="*.md"

# 查找所有引用 FULL/ 或 MIN/ 資料夾的文件
grep -r -E "(FULL/|MIN/)" xuance-commander-core/ --include="*.md"
```

---

**本日誌版本**：v1.0  
**建立日期**：2026-01-10  
**狀態**：ACTIVE | EDITABLE

**— 本日誌記錄需要更新的 FULL/MIN 引用，優先更新核心文件。**
