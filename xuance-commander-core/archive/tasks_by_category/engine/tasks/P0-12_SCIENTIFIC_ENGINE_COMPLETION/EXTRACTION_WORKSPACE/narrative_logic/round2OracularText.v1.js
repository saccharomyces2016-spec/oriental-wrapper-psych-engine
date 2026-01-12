/**
 * round2OracularText.v1.js
 * UI-only: Convert Round2 prompt into a more "命理盤面/取象" style.
 * - Does NOT change scoring, ids, options, or meta.
 * - Keeps original prompt available for debug/tooltip if needed.
 */

export function symbolTitleZh(symbol) {
  switch (symbol) {
    case 'qi': return '氣'
    case 'shi': return '勢'
    case 'jie': return '界'
    case 'dong': return '動'
    default: return '象'
  }
}

export function symbolFrameLineZh(symbol) {
  switch (symbol) {
    case 'qi': return '此象取「通滯」：看氣是否順行。'
    case 'shi': return '此象取「推移」：看你是主動或被動。'
    case 'jie': return '此象取「界限」：看結界如何成形。'
    case 'dong': return '此象取「起伏」：看能量如何運轉。'
    default: return '此象取意：觀其所向。'
  }
}

export function toOracularPromptZh(rawPrompt, symbol) {
  const p = String(rawPrompt || '').trim()
  if (!p) return ''

  let out = p

  out = out.replace(/你更像[？?]\s*$/g, '請取其一象。')
  out = out.replace(/你此刻最像[？?]\s*$/g, '請取其一象。')
  out = out.replace(/你心裡會先冒出哪種感覺[？?]\s*$/g, '請取其一象。')
  out = out.replace(/你更接近[？?]\s*$/g, '請取其一象。')
  out = out.replace(/你更像哪一種[？?]\s*$/g, '請取其一象。')

  if (/^你/.test(out)) out = '盤面顯示：' + out

  out = out.replace(/（/g, '〔').replace(/）/g, '〕')

  const prefix = symbolTitleZh(symbol)
  if (!out.startsWith(prefix + '象')) {
    out = `${prefix}象：` + out
  }

  return out
}

export function domainHintZh(domainChar) {
  if (!domainChar) return '盤面起局：請依直覺取象。'
  return `盤面起局：以「${domainChar}」為局，四象取其勢。`
}

export default {
  symbolTitleZh,
  symbolFrameLineZh,
  toOracularPromptZh,
  domainHintZh
}
