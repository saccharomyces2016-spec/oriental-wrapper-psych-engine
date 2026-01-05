import fs from 'fs'

const round2Path = new URL('../src/core/ontology/round2FourSymbol.v1.json', import.meta.url)
const round2 = JSON.parse(fs.readFileSync(round2Path, 'utf8'))

const allowedValues = new Set(['LOW', 'HIGH', 'OVERFLOW', 'BALANCED', 'OVERLOAD'])
const requiredSignalKeys = ['qi', 'shi', 'jie', 'dong']
const expectedDomains = 8
const errors = []

function fail(msg) {
  errors.push(msg)
}

const domains = Array.isArray(round2?.domains) ? round2.domains : []
if (domains.length !== expectedDomains) {
  fail(`expected ${expectedDomains} domains, got ${domains.length}`)
}

domains.forEach(d => {
  const opts = Array.isArray(d?.options) ? d.options : []
  if (opts.length !== 4) fail(`domain ${d?.domain_id || 'unknown'} expected 4 options, got ${opts.length}`)
  opts.forEach(opt => {
    const map = opt?.decoder?.signal_map
    if (!map || typeof map !== 'object') {
      fail(`domain ${d?.domain_id} option ${opt?.symbol} missing decoder.signal_map`)
      return
    }
    requiredSignalKeys.forEach(k => {
      if (!(k in map)) fail(`domain ${d?.domain_id} option ${opt?.symbol} missing signal_map.${k}`)
      else if (!allowedValues.has(map[k])) fail(`domain ${d?.domain_id} option ${opt?.symbol} has invalid value ${map[k]} for ${k}`)
    })
  })
})

if (errors.length) {
  errors.forEach(e => console.error('[verify-round2-schema]', e))
  process.exit(1)
}

console.log('[verify-round2-schema] OK')
