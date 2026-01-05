#!/usr/bin/env node
/**
 * Scan for missing file references in imports/requires
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

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
        context: line.trim(),
        type: 'import'
      });
    }
    
    // require: require('path')
    const requireMatch = line.match(/require\(['"]([^'"]+)['"]\)/);
    if (requireMatch) {
      imports.push({
        path: requireMatch[1],
        line: idx + 1,
        context: line.trim(),
        type: 'require'
      });
    }
    
    // Dynamic import: import('path')
    const dynamicMatch = line.match(/import\(['"]([^'"]+)['"]\)/);
    if (dynamicMatch) {
      imports.push({
        path: dynamicMatch[1],
        line: idx + 1,
        context: line.trim(),
        type: 'dynamic_import'
      });
    }
    
    // fs.readFile/readFileSync
    const fsMatch = line.match(/readFile(?:Sync)?\(['"]([^'"]+)['"]/);
    if (fsMatch) {
      imports.push({
        path: fsMatch[1],
        line: idx + 1,
        context: line.trim(),
        type: 'fs_read'
      });
    }
  });
  
  return imports;
}

function resolveImport(fromFile, importPath) {
  // Skip external packages
  if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
    return null; // External package, skip
  }
  
  const dir = path.dirname(fromFile);
  let resolved = path.resolve(dir, importPath);
  
  // Try with extensions
  const extensions = ['.js', '.ts', '.vue', '.json', ''];
  for (const ext of extensions) {
    const candidate = resolved + ext;
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  
  // Try as directory with index
  for (const ext of ['.js', '.ts', '.mjs']) {
    const candidate = path.join(resolved, `index${ext}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  
  // Check if it's a directory
  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    return resolved; // Directory exists
  }
  
  return null;
}

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.startsWith('.')) {
        walkDir(filePath, fileList);
      }
    } else if (file.match(/\.(js|ts|vue|mjs)$/)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main
const srcDir = path.join(ROOT, 'src');
const scriptsDir = path.join(ROOT, 'scripts');

const allFiles = [
  ...walkDir(srcDir),
  ...walkDir(scriptsDir)
];

const missingRefs = [];

allFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = findImports(content, filePath);
    
    imports.forEach(imp => {
      const resolved = resolveImport(filePath, imp.path);
      if (!resolved) {
        missingRefs.push({
          referrer_path: path.relative(ROOT, filePath),
          missing_target: imp.path,
          line: imp.line,
          type: imp.type,
          context: imp.context
        });
      }
    });
  } catch (err) {
    // Skip files that can't be read
  }
});

// Output TSV
const tsv = ['referrer_path\tmissing_target\tline\ttype\tcontext'];
missingRefs.forEach(ref => {
  tsv.push(`${ref.referrer_path}\t${ref.missing_target}\t${ref.line}\t${ref.type}\t${ref.context.replace(/\t/g, ' ')}`);
});

const outputPath = path.join(__dirname, 'missing_refs.tsv');
fs.writeFileSync(outputPath, tsv.join('\n'));
console.log(`Found ${missingRefs.length} missing references`);
console.log(`Output: ${outputPath}`);

// Also output JSON
const jsonPath = path.join(__dirname, 'missing_refs.json');
fs.writeFileSync(jsonPath, JSON.stringify(missingRefs, null, 2));
console.log(`JSON output: ${jsonPath}`);

