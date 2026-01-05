// src/core/guidance/validateGuidance.js
export function validateGuidance(raw) {
  const safe = raw && typeof raw === 'object' ? raw : {}

  const out = {
    version: String(safe.version || '0.1.0'),
    domain: String(safe.domain || ''),
    elementBias: Array.isArray(safe.elementBias) ? safe.elementBias.slice(0, 3) : [],
    recommendations: Array.isArray(safe.recommendations) ? safe.recommendations : [],
    chains: Array.isArray(safe.chains) ? safe.chains : [],
    cautions: Array.isArray(safe.cautions) ? safe.cautions : [],
    meta: {
      generatedAt: safe.meta?.generatedAt || new Date().toISOString(),
      note: String(safe.meta?.note || '')
    }
  }

  // 清理每個區塊格式，避免 05 render 時噴錯
  out.recommendations = out.recommendations
    .map(x => ({
      id: String(x?.id || ''),
      title: String(x?.title || ''),
      why: String(x?.why || ''),
      steps: Array.isArray(x?.steps) ? x.steps.map(s => String(s)).filter(Boolean).slice(0, 8) : [],
      tags: Array.isArray(x?.tags) ? x.tags.map(t => String(t)).filter(Boolean).slice(0, 6) : []
    }))
    .filter(x => x.title)

  out.chains = out.chains
    .map(x => ({
      id: String(x?.id || ''),
      title: String(x?.title || ''),
      probability: clamp01(Number(x?.probability ?? 0.5)),
      timeline: String(x?.timeline || ''),
      signals: Array.isArray(x?.signals) ? x.signals.map(s => String(s)).filter(Boolean).slice(0, 6) : [],
      nextMoves: Array.isArray(x?.nextMoves) ? x.nextMoves.map(s => String(s)).filter(Boolean).slice(0, 6) : []
    }))
    .filter(x => x.title)

  out.cautions = out.cautions
    .map(x => String(x))
    .filter(Boolean)
    .slice(0, 8)

  out.elementBias = out.elementBias
    .map(x => String(x))
    .filter(Boolean)
    .slice(0, 3)

  return out
}

function clamp01(n) {
  if (!Number.isFinite(n)) return 0.5
  return Math.max(0, Math.min(1, n))
}