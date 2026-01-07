[FULL_ONLY]

# LEGACY_VAULTS（舊版封存入口）

目的：
- 永久保存「失敗/成功」的歷史資產（題型、命題手法、UI、流程、資料結構、腳本）。
- 避免只保存摘要導致價值流失。
- 同時避免 MASTER 爆肥：MASTER 只需要指到 vault 路徑。

硬規則：
- legacy vault 一律只讀，不直接貼到 user-visible domain。
- 任何採用必須走：Research -> Brief -> Advisor -> Domain gate。

- 115_1_3_my-first-app_failed
  - index: docs/legacy/115_1_3_my-first-app_failed/_meta/INDEX.md
  - inventory: docs/legacy/115_1_3_my-first-app_failed/extract/INVENTORY.md
  - brief: docs/gem/briefs/BRIEF_legacy_115_1_3_my-first-app_failed_extraction.zh.md
