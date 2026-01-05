# Toolchain Offline Blocker — 2026-01-02

- **Blocker 摘要：** pnpm 不存在；corepack 下載 pnpm 失敗（EPERM / ENOTFOUND）；npx madge 無法下載（ENOTFOUND）。
- **影響範圍：** Phase 2 Step 2.9 的 pnpm install / typecheck / madge 執行受阻。
- **可接受替代：** 使用離線循環掃描腳本（僅針對 TS import graph）。
- **待使用者本機補驗證命令：**
  1) `pnpm -v`
  2) `pnpm install`
  3) `pnpm -C packages/core typecheck`
  4) `npx madge --circular --extensions ts packages/core/src`
- **結案條件：** 使用者在可用環境執行上述命令並貼回輸出，經確認後將此 Blocker 標記為 RESOLVED。
