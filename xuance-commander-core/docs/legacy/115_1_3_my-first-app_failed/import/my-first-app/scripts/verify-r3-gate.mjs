import fs from 'fs'

const content = fs.readFileSync('src/views/03_Resonance.vue', 'utf8')
const normalized = content.replace(/\s+/g, ' ')

const hasDelayGate = /setTimeout\s*\(\s*async\s*\(\s*\)\s*=>\s*{[^}]*transitionToRound\(4\)/.test(normalized) ||
  /setTimeout\s*\(\s*\(\s*\)\s*=>\s*transitionToRound\(4\)\s*,\s*350\s*\)/.test(normalized)
const hasSelectedRejected = /selected_option/.test(content) && /rejected_option/.test(content)

if (!hasDelayGate || !hasSelectedRejected) {
  if (!hasDelayGate) console.error('[verify-r3-gate] missing 350ms auto-advance to Round4 after Round3 completion')
  if (!hasSelectedRejected) console.error('[verify-r3-gate] missing selected/rejected recording for Round3 answers')
  process.exit(1)
}

console.log('[verify-r3-gate] OK')
