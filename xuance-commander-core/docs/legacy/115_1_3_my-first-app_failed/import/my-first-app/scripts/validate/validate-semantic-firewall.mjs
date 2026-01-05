import fs from 'fs'
import { scanText, loadDenylist } from '../semantic/semanticFirewall.mjs'

function readInput() {
  const argText = process.argv.slice(2).join(' ').trim()
  if (argText) return argText
  return fs.readFileSync(0, 'utf8').trim()
}

try {
  const denylist = loadDenylist()
  const text = readInput()
  const { ok, violations } = scanText(text, denylist)
  if (ok) {
    console.log('PASS')
    process.exit(0)
  }
  console.log('CRITICAL_VIOLATION')
  violations.forEach(v => console.log(`- term: ${v.term} @ index ${v.index}`))
  process.exit(1)
} catch (err) {
  console.error('ERROR:', err.message)
  process.exit(1)
}
