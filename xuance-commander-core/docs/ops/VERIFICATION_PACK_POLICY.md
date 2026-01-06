# VERIFICATION_PACK Policy

## Repo Tree Snapshot（資料夾全貌快照｜必備條目之一）

目的：
- 在不貼整個 repo、且不靠主觀記憶的前提下，讓指揮官/顧問能「確定」目前 repo 的檔案結構與關鍵路徑是否存在。

何時必做（任一成立）：
- 顧問輸出回報缺件（MISSING / INCOMPLETE / STOP）
- 你要我判斷「資料在哪」「是否已有該檔」「路徑是否正確」
- 你要我做跨資料夾的規範整合（例如：domain + docs/gem + legacy vault）

快照內容（至少包含）：
- repo 內被追蹤檔案清單（tracked files）
- 關鍵路徑是否存在（例如：`docs/gem/briefs/`, `docs/gem/runs/`, `domain/`, `docs/research/`, `memory/briefs/`, `xuance-commander-core/memory/briefs/role_sync_packets/`）

建議做法（擇一即可，依環境可用性）：
1) `git ls-files`
2) `find . -maxdepth <N> -type f`（排除 `.git/`、`node_modules/`、`dist/` 等巨量目錄）
3) `tree -a`（若系統有安裝 tree）

落盤規則：
- Repo Tree Snapshot 必須作為 VERIFICATION_PACK 的一部分被保存（同一輪任務可追溯）。
- 若專案後續新增自動化工具：可以把 Snapshot 另存為 `memory/briefs/REPO_TREE.md`，並在 VERIFICATION_PACK 與 MASTER/MIN 中只保留「路徑指標」。
（證據包管理規範｜硬規則）

目的：
- 避免證據包散落、難以找、難以引用
- 保留“最新可用證據”，並允許定期清理，降低 repo 噪音

## 存放位置（固定）
- docs/ops/verification_packs/

## 命名規則（固定）
- docs/ops/verification_packs/YYYYMMDD_HHMM_<topic>.md

topic 例：
- hook_cleanup
- checkpoint_flow_fix
- golden_tests_run

## LATEST 指標（必須存在）
- docs/ops/verification_packs/LATEST.md
內容至少包含：
- latestPath: <relative path>
- summary: 一句話
- updatedAt: timestamp

## 清理規則（允許）
- 可只保留最近 N 份（例如 20）
- 但 LATEST.md 必須永遠正確指向「最新一次」

---

## Advisor Runs 與 Verification Pack 的邊界
- 顧問輸出（docs/gem/runs/）不是工程證據，不屬於 VERIFICATION_PACK。
- VERIFICATION_PACK 只用於工程正確性：repo 狀態、測試、diff、環境/Hook 診斷。
- 若顧問輸出要被採納落盤到 domain/：
  - 必須在指揮官審核後，額外生成一個 VERIFICATION_PACK（含：變更檔案清單 + golden tests 或可重跑驗證指令）。
