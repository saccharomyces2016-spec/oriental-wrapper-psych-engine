#!/usr/bin/env node
/**
 * Build runtime import graph from entrypoints
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

const ENTRYPOINTS = [
  'src/main.js',
  'src/App.vue',
  'src/router/index.js'
];

// Also scan all views
const viewsDir = path.join(ROOT, 'src/views');
if (fs.existsSync(viewsDir)) {
  const views = fs.readdirSync(viewsDir).filter(f => f.endsWith('.vue'));
  views.forEach(v => ENTRYPOINTS.push(`src/views/${v}`));
}

function findImports(content, filePath) {
  const imports = [];
  const lines = content.split('\n');
  
  lines.forEach((line, idx) => {
    // ES6 import: import ... from 'path'
    const es6Match = line.match(/import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/);
    if (es6Match) {
      imports.push({
        path: es6Match[1],
        line: idx + 1,
        kind: 'static',
        context: line.trim()
      });
    }
    
    // Dynamic import: import('path')
    const dynamicMatch = line.match(/import\(['"]([^'"]+)['"]\)/);
    if (dynamicMatch) {
      imports.push({
        path: dynamicMatch[1],
        line: idx + 1,
        kind: 'dynamic',
        context: line.trim()
      });
    }
  });
  
  return imports;
}

function resolveImport(fromFile, importPath) {
  // Skip external packages
  if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
    return null;
  }
  
  const dir = path.dirname(fromFile);
  let resolved = path.resolve(dir, importPath);
  
  // Try with extensions
  const extensions = ['.js', '.ts', '.vue', '.json', ''];
  for (const ext of extensions) {
    const candidate = resolved + ext;
    if (fs.existsSync(candidate)) {
      return path.relative(ROOT, candidate);
    }
  }
  
  // Try as directory with index
  for (const ext of ['.js', '.ts', '.mjs']) {
    const candidate = path.join(resolved, `index${ext}`);
    if (fs.existsSync(candidate)) {
      return path.relative(ROOT, candidate);
    }
  }
  
  return null;
}

const graph = [];
const visited = new Set();

function analyzeFile(filePath, depth = 0) {
  if (depth > 20 || visited.has(filePath)) return;
  visited.add(filePath);
  
  const fullPath = path.join(ROOT, filePath);
  if (!fs.existsSync(fullPath)) return;
  
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const imports = findImports(content, fullPath);
    
    imports.forEach(imp => {
      const resolved = resolveImport(fullPath, imp.path);
      if (resolved) {
        graph.push({
          from: filePath,
          to: resolved,
          kind: imp.kind,
          line: imp.line
        });
        
        // Recursively analyze if it's a source file
        if (resolved.startsWith('src/') && !resolved.includes('node_modules')) {
          analyzeFile(resolved, depth + 1);
        }
      }
    });
  } catch (err) {
    // Skip files that can't be read
  }
}

// Analyze from entrypoints
ENTRYPOINTS.forEach(ep => {
  const fullPath = path.join(ROOT, ep);
  if (fs.existsSync(fullPath)) {
    analyzeFile(ep);
  }
});

// Output TSV
const tsv = ['from\tto\tkind'];
graph.forEach(edge => {
  tsv.push(`${edge.from}\t${edge.to}\t${edge.kind}`);
});

const outputPath = path.join(__dirname, 'runtime_import_graph.tsv');
fs.writeFileSync(outputPath, tsv.join('\n'));
console.log(`Generated runtime import graph with ${graph.length} edges`);
console.log(`Output: ${outputPath}`);

