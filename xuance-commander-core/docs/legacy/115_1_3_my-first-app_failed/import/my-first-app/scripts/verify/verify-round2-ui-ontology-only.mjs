import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const currentPath = fileURLToPath(import.meta.url)
const repoRoot = path.resolve(path.dirname(currentPath), '..', '..')
const panelPath = path.join(repoRoot, 'src', 'views', 'components', 'Round2FourSymbolPanel.v1.vue')
const ontologyPath = path.join(repoRoot, 'src', 'core', 'ontology', 'round2FourSymbol.v1.json')

const ontologyRaw = fs.readFileSync(ontologyPath, 'utf8')
const ontology = JSON.parse(ontologyRaw)

const whiteList = new Set()
const domains = Array.isArray(ontology?.domains) ? ontology.domains : []
domains.forEach(domain => {
  if (typeof domain?.title === 'string') whiteList.add(domain.title)
  const opts = Array.isArray(domain?.options) ? domain.options : []
  opts.forEach(opt => {
    if (typeof opt?.text === 'string') whiteList.add(opt.text)
  })
})

const uiAllowed = new Set([
  '第二回合',
  '四象取象',
  '領域',
  '未知',
  '四步取象',
  '不是心理測驗問卷',
  '不是在做心理學問卷',
  '你是在',
  '此象位暫無題目',
  '請檢查',
  '此題缺少',
  '請確認',
  '資料來源',
  '提示',
  '盤面選象',
  '心理學問卷',
  '選項',
  '每一步只需選一個最貼近的象位',
  '資料缺失'
])

const content = fs.readFileSync(panelPath, 'utf8')

const bannedTokens = /(const\s+TITLE|const\s+QUESTIONS|defaultQuestions|fallback)/i
if (bannedTokens.test(content)) {
  console.error('[verify:round2:ui:ontology] banned token detected in Round2 panel')
  process.exit(1)
}

const chineseRegex = /[\u4e00-\u9fff]{2,}/g
const found = new Set()
let match
while ((match = chineseRegex.exec(content)) !== null) {
  found.add(match[0])
}

const suspicious = [...found].filter(token => !whiteList.has(token) && !uiAllowed.has(token))

if (suspicious.length) {
  console.error('[verify:round2:ui:ontology] found non-ontology strings:', suspicious)
  process.exit(1)
}

console.log('[verify:round2:ui:ontology] Round2 UI strings restricted to ontology/allowed UI')
