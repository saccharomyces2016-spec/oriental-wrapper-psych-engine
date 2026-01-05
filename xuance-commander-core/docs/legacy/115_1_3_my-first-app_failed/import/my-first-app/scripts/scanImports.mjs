#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { globSync } from 'glob'

const root = process.cwd()
const allowPrefixes = [
  'src/core/content',
  'src/core/ontology',
  'src/core/guidance',
  'src/core/psych',
  'src/core/ai',
  'src/core/choiceEngine.js',
  'src/main.js',
  'src/router/'
]

function isAllowed(file) {
  const normalized = file.replace(/\\/g, '/')
  return allowPrefixes.some(p => normalized.startsWith(p))
}

function resolveImport(fromFile, spec) {
  if (!spec.startsWith('.')) return null
  const base = path.resolve(path.dirname(fromFile), spec)
  const candidates = [
    base,
    `${base}.js`,
    `${base}.mjs`,
    `${base}.vue`,
    `${base}.json`,
    path.join(base, 'index.js')
  ]
  for (const c of candidates) {
    if (fs.existsSync(c)) return path.normalize(c)
  }
  return null
}

function collectReferences() {
  const files = globSync('src/**/*.{js,vue,mjs}', { nodir: true })
  const refs = new Set()
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf-8')
    const re = /import\s+[^'"]*\s+from\s+['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g
    let m
    while ((m = re.exec(text))) {
      const spec = m[1] || m[2]
      const resolved = resolveImport(file, spec)
      if (resolved) refs.add(path.relative(root, resolved))
    }
  }
  return refs
}

function scan() {
  const referenced = collectReferences()
  const coreFiles = globSync('src/core/**/*.js', { nodir: true }).map(f => path.relative(root, f))

  const unreferenced = coreFiles.filter(f => !referenced.has(f) && !isAllowed(f))

  return { referencedFiles: Array.from(referenced).sort(), unreferencedCandidates: unreferenced.sort() }
}

function main() {
  const result = scan()
  console.log(JSON.stringify(result, null, 2))
}

if (import.meta.url === `file://${path.resolve(process.argv[1])}`) {
  main()
}

export { scan }
