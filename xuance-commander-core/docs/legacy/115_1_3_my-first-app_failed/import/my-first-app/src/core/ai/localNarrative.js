// src/core/ai/localNarrative.js

/**
 * 本地敘事生成器（M-3-E-2）
 * 目標：把母題命中 + 建議 + 連鎖預測，寫成一份「完整報告」文字
 * 注意：這不是 AI；只是穩定、可控的模板，方便你後續串 AI 時做對照與回退
 */

function s(x) {
  return String(x ?? '').trim()
}

function arr(x) {
  return Array.isArray(x) ? x : []
}

function joinLines(lines) {
  return lines.filter(Boolean).join('\n')
}

function bulletList(items, prefix = '• ') {
  const list = arr(items).map(x => s(x)).filter(Boolean)
  if (!list.length) return ''
  return list.map(x => `${prefix}${x}`).join('\n')
}

function pickTopThemes(psych) {
  const mt = psych?.motherThemes
  const top = arr(mt?.top)
  const hits = arr(mt?.hits)

  const src = top.length ? top : hits
  return src.slice(0, 3).map((t, idx) => ({
    idx,
    label: s(t?.label || t?.name || t?.key || `母題${idx + 1}`),
    score:
      typeof t?.score === 'number'
        ? `${Math.round(t.score * 100)}%`
        : s(t?.score || '命中'),
    desc: s(t?.desc)
  }))
}

function pickRecommendations(guidance) {
  const recs =
    (Array.isArray(guidance?.recommendations) && guidance.recommendations.length
      ? guidance.recommendations
      : Array.isArray(guidance?.interventions)
        ? guidance.interventions
        : [])

  return arr(recs).slice(0, 3).map((r, idx) => ({
    idx,
    title: s(r?.title || `建議${idx + 1}`),
    whatItMeans: s(r?.whatItMeans),
    actions: arr(r?.actions).slice(0, 5).map(s).filter(Boolean),
    avoid: arr(r?.avoid).slice(0, 4).map(s).filter(Boolean)
  }))
}

function pickChains(guidance) {
  const chains = arr(guidance?.chains).slice(0, 2) // 先最多 2 條，避免太長
  return chains.map((c, idx) => ({
    idx,
    title: s(c?.title || `可能走向${idx + 1}`),
    short: arr(c?.short).slice(0, 3).map(s).filter(Boolean),
    mid: arr(c?.mid).slice(0, 3).map(s).filter(Boolean),
    long: arr(c?.long).slice(0, 3).map(s).filter(Boolean)
  }))
}

function buildPathEcho(resonance, psych) {
  const domainLabel = s(resonance?.domainLabel || psych?.input?.domainLabel || resonance?.domain)
  const r2Label = s(psych?.input?.r2Label)
  const r3Labels = arr(psych?.input?.r3Labels).map(s).filter(Boolean).slice(0, 3)

  const lines = []
  if (domainLabel) lines.push(`所問：${domainLabel}`)
  if (r2Label) lines.push(`矛盾：${r2Label}`)
  if (r3Labels.length) lines.push(`細象：${r3Labels.join('、')}`)
  return lines.length ? lines.join(' / ') : ''
}

export function generateLocalNarrative({ psych, insights, guidance, resonance }) {
  const title = s(insights?.title) || '敘事報告'
  const label = s(insights?.label)

  const mainText = s(insights?.text)
  const highlights = arr(insights?.highlights).map(s).filter(Boolean).slice(0, 5)

  const pathEcho = buildPathEcho(resonance, psych)

  const themes = pickTopThemes(psych)
  const recs = pickRecommendations(guidance)
  const chains = pickChains(guidance)

  const warnings = arr(guidance?.warnings).map(s).filter(Boolean)

  const out = []

  // 0) 標頭
  out.push(`【${title}${label ? `｜${label}` : ''}】`)
  if (pathEcho) out.push(pathEcho)
  out.push('')

  // 1) 核心結論（L4）
  if (mainText) {
    out.push('【核心結論】')
    out.push(mainText)
    out.push('')
  }

  // 2) 要點
  if (highlights.length) {
    out.push('【斷語要點】')
    out.push(bulletList(highlights))
    out.push('')
  }

  // 3) 母題命中
  if (themes.length) {
    out.push('【母題命中（底層劇本）】')
    themes.forEach(t => {
      out.push(`• ${t.label}（${t.score}）${t.desc ? `：${t.desc}` : ''}`)
    })
    out.push('')
  }

  // 4) 解決建議（L6）
  if (recs.length) {
    out.push('【解決建議（可執行）】')
    recs.forEach((r, i) => {
      out.push(`${i + 1}. ${r.title}${r.whatItMeans ? `：${r.whatItMeans}` : ''}`)
      if (r.actions.length) out.push(bulletList(r.actions, '   - '))
      if (r.avoid.length) {
        out.push('   注意避免：')
        out.push(bulletList(r.avoid, '   - '))
      }
      out.push('')
    })
  }

  // 5) 連鎖預測（L6）
  if (chains.length) {
    out.push('【連鎖預測（若不處理，可能走向）】')
    chains.forEach((c) => {
      out.push(`• ${c.title}`)
      if (c.short.length) {
        out.push('  短期：')
        out.push(bulletList(c.short, '   - '))
      }
      if (c.mid.length) {
        out.push('  中期：')
        out.push(bulletList(c.mid, '   - '))
      }
      if (c.long.length) {
        out.push('  長期：')
        out.push(bulletList(c.long, '   - '))
      }
      out.push('')
    })
  }

  // 6) 警語
  if (warnings.length) {
    out.push('【提醒】')
    out.push(bulletList(warnings))
    out.push('')
  }

  return joinLines(out).trim()
}