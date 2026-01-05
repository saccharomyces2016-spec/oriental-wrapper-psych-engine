import motherThemes from './motherThemes.v1.json'
import behaviorFacetLexicon from './behaviorFacetLexicon.v1.json'

const safeThemes = Array.isArray(motherThemes?.items) ? motherThemes.items : []

export function validateQuestionBankPhrasing() {
  // Legacy question bank removed under governance mode.
  return { errors: [], warnings: [] }
}

function measureText(text) {
  let zhLen = 0
  let asciiLen = 0
  for (const ch of String(text || '')) {
    if (/[\u4e00-\u9fff]/.test(ch)) zhLen += 1
    else asciiLen += 1
  }
  return { zhLen, asciiLen }
}

export function getAllThemes() {
  return safeThemes.map(t => ({
    id: t.id,
    enLabel: t.enLabel,
    zhLabel: t.zhLabel,
    description: t.description,
    synonyms: Array.isArray(t.synonyms) ? t.synonyms : []
  }))
}

export async function getQuestionsByThemeId() {
  return []
}

export async function getRandomQuestions() {
  return []
}

export function getFacetForChoice() {
  return ''
}

export default {
  getAllThemes,
  getQuestionsByThemeId,
  getRandomQuestions,
  getFacetForChoice,
  validateQuestionBankPhrasing,
  behaviorFacetLexicon,
  measureText
}
