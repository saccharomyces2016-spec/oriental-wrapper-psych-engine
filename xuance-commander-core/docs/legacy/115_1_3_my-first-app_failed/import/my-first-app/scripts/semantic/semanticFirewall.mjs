import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

function escapeRegex(term) {
  return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function scanText(text = '', denylist = []) {
  const results = []
  const source = String(text)
  const terms = Array.isArray(denylist) ? denylist : []
  terms.forEach(term => {
    if (!term) return
    const pattern = new RegExp(`\\b${escapeRegex(term)}\\b`, 'gi')
    let match
    while ((match = pattern.exec(source)) !== null) {
      results.push({ term, index: match.index })
    }
  })
  results.sort((a, b) => a.index - b.index || a.term.localeCompare(b.term))
  return { ok: results.length === 0, violations: results }
}

export function loadDenylist() {
  const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'denylist.v1.json')
  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed?.banned_terms)) throw new Error('Invalid denylist')
  return parsed.banned_terms
}

export default { scanText, loadDenylist }
