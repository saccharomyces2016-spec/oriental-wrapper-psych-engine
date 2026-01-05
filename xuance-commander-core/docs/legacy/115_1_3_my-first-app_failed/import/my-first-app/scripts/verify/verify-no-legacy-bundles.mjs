#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const DIST = path.join(process.cwd(), 'dist', 'assets')
const banned = [/questionBank/i, /round2Situations/i]

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('[verify:bundles:nolegacy] dist/assets not found, run build first')
    process.exit(1)
  }

  const files = fs.readdirSync(DIST)
  const offenders = files.filter(f => banned.some(rx => rx.test(f)))
  if (offenders.length) {
    console.error('[verify:bundles:nolegacy] FAIL: legacy bundles found:', offenders.join(', '))
    process.exit(1)
  }

  console.log('[verify:bundles:nolegacy] OK')
}

try {
  main()
} catch (err) {
  console.error('[verify:bundles:nolegacy] FAIL', err?.message || err)
  process.exit(1)
}
