# VERIFICATION_PACK Policy（證據包管理規範｜硬規則）

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
