import fs from 'node:fs'
import path from 'node:path'

const round2Path = path.resolve('src/core/ontology/round2FourSymbol.v1.json')
const round2FourSymbol = JSON.parse(fs.readFileSync(round2Path, 'utf8'))

const expectedDomains = [
  'domain_yuan',
  'domain_cai',
  'domain_shen',
  'domain_ye',
  'domain_jia',
  'domain_ju',
  'domain_xin',
  'domain_ming'
]

function main() {
  const domains = Array.isArray(round2FourSymbol?.domains) ? round2FourSymbol.domains : []
  if (domains.length !== expectedDomains.length) {
    throw new Error(`Expected ${expectedDomains.length} domains, got ${domains.length}`)
  }

  const ids = domains.map(d => d.domain_id)
  for (const id of expectedDomains) {
    if (!ids.includes(id)) throw new Error(`Missing domain ${id}`)
  }

  domains.forEach((d) => {
    if (!Array.isArray(d.options) || d.options.length !== 4) {
      throw new Error(`Domain ${d.domain_id} must have 4 options`)
    }
    const symbols = d.options.map(o => o.symbol)
    const expected = ['qi', 'shi', 'jie', 'dong']
    expected.forEach(sym => {
      if (!symbols.includes(sym)) throw new Error(`Domain ${d.domain_id} missing symbol ${sym}`)
    })
  })

  console.log('[verify:round2:datasource] OK')
}

main()
