#!/usr/bin/env node
/**
 * Import dependency analyzer for governance cleanup
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SRC_DIR = 'src';
const ENTRYPOINTS = [
  'src/main.js',
  'src/App.vue',
  'src/router/index.js',
  'src/views/01_Origin.vue',
  'src/views/02_Input.vue',
  'src/views/03_Resonance.vue',
  'src/views/04_Computation.vue',
  'src/views/04_Interpretation.vue',
  'src/views/05_Dashboard.vue'
];

function findImports(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const imports = [];
  
  // ES6 import
  const es6Regex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  while ((match = es6Regex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.') || importPath.startsWith('/')) {
      const resolved = resolveImport(filePath, importPath);
      if (resolved) imports.push(resolved);
    }
  }
  
  // require
  const requireRegex = /require\(['"]([^'"]+)['"]\)/g;
  while ((match = requireRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.') || importPath.startsWith('/')) {
      const resolved = resolveImport(filePath, importPath);
      if (resolved) imports.push(resolved);
    }
  }
  
  return imports;
}

function resolveImport(fromFile, importPath) {
  const dir = path.dirname(fromFile);
  let resolved = path.resolve(dir, importPath);
  
  // Try with extensions
  const extensions = ['.js', '.ts', '.vue', '.json', ''];
  for (const ext of extensions) {
    const candidate = resolved + ext;
    if (fs.existsSync(candidate)) {
      return path.relative(process.cwd(), candidate);
    }
  }
  
  // Try as directory with index
  for (const ext of ['.js', '.ts']) {
    const candidate = path.join(resolved, `index${ext}`);
    if (fs.existsSync(candidate)) {
      return path.relative(process.cwd(), candidate);
    }
  }
  
  return null;
}

function classifyImport(importPath) {
  if (importPath.includes('node_modules')) return 'EXTERNAL';
  if (importPath.includes('_deprecated')) return 'LEGACY';
  if (importPath.includes('ContentDB_')) return 'LEGACY';
  if (importPath.includes('questionBank') && !importPath.includes('v1.json')) return 'LEGACY';
  if (importPath.includes('scripts/')) return 'DEV_TOOLING';
  if (importPath.includes('tests/')) return 'DEV_TOOLING';
  if (importPath.includes('reports/')) return 'DEV_TOOLING';
  if (importPath.includes('archive/')) return 'ARCHIVE';
  return 'RUNTIME';
}

const graph = [];
const visited = new Set();

function analyzeFile(filePath, depth = 0) {
  if (visited.has(filePath) || depth > 10) return;
  visited.add(filePath);
  
  if (!fs.existsSync(filePath)) return;
  
  const imports = findImports(filePath);
  const kind = classifyImport(filePath);
  
  imports.forEach(imp => {
    if (!imp) return;
    const impKind = classifyImport(imp);
    graph.push({
      from: filePath,
      to: imp,
      kind: kind === 'RUNTIME' && impKind === 'RUNTIME' ? 'RUNTIME_HARD' : 
            kind === 'RUNTIME' && impKind !== 'RUNTIME' ? 'RUNTIME_SOFT' :
            kind === 'DEV_TOOLING' ? 'DEV_TOOLING' : 'OTHER',
      notes: `${kind} → ${impKind}`
    });
    
    if (impKind === 'RUNTIME' && !imp.includes('node_modules')) {
      analyzeFile(imp, depth + 1);
    }
  });
}

// Analyze entrypoints
ENTRYPOINTS.forEach(ep => {
  if (fs.existsSync(ep)) {
    analyzeFile(ep);
  }
});

// Output TSV
const tsv = ['from\tto\tkind\tnotes'];
graph.forEach(edge => {
  tsv.push(`${edge.from}\t${edge.to}\t${edge.kind}\t${edge.notes}`);
});

fs.writeFileSync('_governance/state_snapshot/import_graph_summary.tsv', tsv.join('\n'));
console.log(`Generated import graph with ${graph.length} edges`);


