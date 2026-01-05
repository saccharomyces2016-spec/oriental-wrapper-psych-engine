#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const result = spawnSync("pnpm", ["-C", "packages/core", "smoke"], {
  stdio: "inherit",
  shell: false
});

process.exit(result.status ?? 1);
