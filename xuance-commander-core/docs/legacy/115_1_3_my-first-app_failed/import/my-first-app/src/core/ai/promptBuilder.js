// src/core/ai/promptBuilder.js

export function buildNarrativePrompt({ psych, insights, guidance }) {
  const domain = psych?.input?.domainLabel || psych?.input?.domain || '命盤'
  const title = insights?.title || '整體報告'

  return `
請將 facts 整理成一份「命理口吻、白話可執行」的報告。
風格：不文言、但有「象/局/勢」的味道；避免誇大；避免醫療法律投資斷言。
結構要求：
- hook：一句話命中 + 2~4 bullet
- core：核心矛盾、觸發器、決策模式
- motherThemes：把母題翻成可理解的人生劇本
- guidance：給 3 條可執行動作（以 bullet）
- chains：短/中/長期可能走向（以 bullet）
- nextStep：下一步最小行動（1~3 bullet）
語言：zh-TW

報告主題：${domain}
報告標題：${title}
`.trim()
}