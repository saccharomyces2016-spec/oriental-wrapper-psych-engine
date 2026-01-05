const ENV_FLAG = String(import.meta.env?.VITE_USE_QUESTION_BANK || '').toLowerCase() === 'true'

export function getQuestionMode() {
  return ENV_FLAG ? 'bank' : 'legacy'
}

export default getQuestionMode
