// src/core/ai/narrativeSchema.js

export const NARRATIVE_JSON_SCHEMA = {
  name: 'OracleNarrativeV1',
  version: 'm3e3-a',
  type: 'object',
  additionalProperties: false,
  required: ['version', 'language', 'report'],
  properties: {
    version: { type: 'string', const: 'v1' },
    language: { type: 'string', enum: ['zh-TW'] },

    report: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'subtitle', 'sections', 'finalNote'],
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },

        // sections：固定結構，避免 AI 發散
        sections: {
          type: 'array',
          minItems: 3,
          maxItems: 8,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['key', 'heading', 'bullets'],
            properties: {
              key: {
                type: 'string',
                enum: [
                  'hook',
                  'core',
                  'motherThemes',
                  'guidance',
                  'chains',
                  'nextStep'
                ]
              },
              heading: { type: 'string' },
              bullets: {
                type: 'array',
                minItems: 2,
                maxItems: 8,
                items: { type: 'string' }
              }
            }
          }
        },

        // 最終警語（你系統固定的）
        finalNote: { type: 'string' }
      }
    }
  }
}

// ✅ 將 AI 回傳轉成 05 直接能顯示的純文字
export function renderNarrativeFromJson(payload) {
  try {
    const r = payload?.report
    if (!r) return ''

    const lines = []
    lines.push(`【${r.title || '整體報告'}】`)
    if (r.subtitle) lines.push(r.subtitle)
    lines.push('')

    const sections = Array.isArray(r.sections) ? r.sections : []
    for (const s of sections) {
      lines.push(`◆ ${s.heading || s.key}`)
      const bullets = Array.isArray(s.bullets) ? s.bullets : []
      for (const b of bullets) lines.push(`- ${b}`)
      lines.push('')
    }

    if (r.finalNote) {
      lines.push('—')
      lines.push(r.finalNote)
    }

    return lines.join('\n')
  } catch (e) {
    return ''
  }
}