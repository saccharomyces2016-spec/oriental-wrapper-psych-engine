#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const LEGACY_TOKENS = ['questionBank', 'round2Situations', 'ContentDB', 'anchorSelector']
const SEARCH_ROOTS = ['src/views', 'src/components', 'src/App.vue']

function listFiles(target) {
  const entries = []
  const stat = fs.statSync(target)
  if (stat.isFile()) return [target]
  for (const entry of fs.readdirSync(target)) {
    const fp = path.join(target, entry)
    const st = fs.statSync(fp)
    if (st.isDirectory()) entries.push(...listFiles(fp))
    else entries.push(fp)
  }
  return entries
}

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/)
  const hits = []
  lines.forEach((line, idx) => {
    if (!line.includes('import')) return
    if (LEGACY_TOKENS.some(t => line.includes(t))) {
      hits.push({ line: idx + 1, text: line.trim() })
    }
  })
  return hits.length ? { file, hits } : null
}

const results = []
for (const root of SEARCH_ROOTS) {
  if (!fs.existsSync(root)) continue
  for (const file of listFiles(root)) {
    if (!/\.(vue|js|ts|mjs|cjs)$/.test(file)) continue
    const res = scanFile(file)
    if (res) results.push(res)
  }
}

if (results.length) {
  console.error('[verify-ui-nolegacy] FAIL: legacy imports found')
  results.forEach(r => {
    r.hits.forEach(h => {
      console.error(` - ${r.file}:${h.line}: ${h.text}`)
    })
  })
  process.exit(1)
}

console.log('[verify-ui-nolegacy] OK')
