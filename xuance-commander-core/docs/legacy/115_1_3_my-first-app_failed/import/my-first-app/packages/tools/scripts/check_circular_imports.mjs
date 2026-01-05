#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const [, , targetDir] = process.argv;

if (!targetDir) {
  console.error("Usage: node packages/tools/scripts/check_circular_imports.mjs <directory>");
  process.exit(1);
}

const visitedFiles = new Set();
const graph = new Map();

function isRelativeImport(specifier) {
  return specifier.startsWith("./") || specifier.startsWith("../");
}

function resolveTsImport(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    base,
    `${base}.ts`,
    path.join(base, "index.ts")
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function collectTsFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectTsFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".ts")) {
      visitedFiles.add(path.resolve(fullPath));
    }
  }
}

function parseImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const importRegex = /\b(?:import|export)\b[^'"]*['"]([^'"]+)['"]/g;
  const imports = [];

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const specifier = match[1];
    if (isRelativeImport(specifier)) {
      const resolved = resolveTsImport(filePath, specifier);
      if (resolved) {
        imports.push(resolved);
      }
    }
  }
  return imports;
}

function buildGraph() {
  for (const file of visitedFiles) {
    const deps = parseImports(file);
    graph.set(file, deps);
  }
}

function detectCycles() {
  const state = new Map(); // file -> "visiting" | "visited"
  const stack = [];
  const cycles = [];

  function dfs(node) {
    state.set(node, "visiting");
    stack.push(node);

    for (const neighbor of graph.get(node) || []) {
      if (state.get(neighbor) === "visiting") {
        const idx = stack.indexOf(neighbor);
        const cyclePath = stack.slice(idx).concat(neighbor);
        cycles.push(cyclePath);
      } else if (state.get(neighbor) !== "visited") {
        dfs(neighbor);
      }
    }

    stack.pop();
    state.set(node, "visited");
  }

  for (const node of graph.keys()) {
    if (!state.get(node)) {
      dfs(node);
    }
  }

  return cycles;
}

const resolvedTarget = path.resolve(targetDir);
if (!fs.existsSync(resolvedTarget) || !fs.statSync(resolvedTarget).isDirectory()) {
  console.error(`ERROR: directory not found: ${resolvedTarget}`);
  process.exit(1);
}

collectTsFiles(resolvedTarget);
buildGraph();
const cycles = detectCycles();

if (cycles.length === 0) {
  console.log("No circular dependency found (offline scan)");
  process.exit(0);
} else {
  console.error("Circular dependencies detected:");
  for (const cycle of cycles) {
    console.error(" - " + cycle.join(" -> "));
  }
  process.exit(1);
}
