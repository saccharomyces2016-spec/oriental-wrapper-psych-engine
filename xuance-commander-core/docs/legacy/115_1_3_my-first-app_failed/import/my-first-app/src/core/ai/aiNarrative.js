// src/core/ai/aiNarrative.js
import { NARRATIVE_JSON_SCHEMA, renderNarrativeFromJson } from './narrativeSchema.js'

// ✅ 可用 .env 控制是否啟用 AI 敘事（避免開發時一直噴錯 / 一直打 API）
// VITE_ENABLE_AI_NARRATIVE=true 才會真的去呼叫 Gemini
const ENABLE_AI = String(import.meta.env.VITE_ENABLE_AI_NARRATIVE || '').toLowerCase() === 'true'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const TIMEOUT_MS_RAW = Number(import.meta.env.VITE_AI_TIMEOUT_MS || 10000)
const TIMEOUT_MS = Number.isFinite(TIMEOUT_MS_RAW) ? TIMEOUT_MS_RAW : 10000

// ✅ 先用 v1（較新），失敗再 fallback v1beta
const API_URLS = [
  'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
]

function safeJsonParse(text) {
  try {
    // 有些模型會包 ```json ... ``` 或 ``` ... ```
    const cleaned = String(text || '')
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim()
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}

function buildSystemContract() {
  return `
你是「文字改寫器」，不是占卜師，不得新增事實，不得編造背景。
你只能根據提供的 facts，重寫成更像命理口吻的中文報告（白話為骨、玄學為皮）。
⚠️ 必須輸出「純 JSON」，不得包含任何多餘文字、不得使用 Markdown、不得用三引號。
輸出 JSON 必須符合這份 schema 的欄位結構（version/language/report/sections...）。
`
}

function buildMeta({ errorType = null, status = null, timeoutMs = TIMEOUT_MS, retried = false, time } = {}) {
  return {
    errorType: errorType || null,
    status: typeof status === 'number' ? status : null,
    timeoutMs: Number.isFinite(timeoutMs) ? timeoutMs : null,
    retried: !!retried,
    time: time || new Date().toISOString()
  }
}

const fallbackResponse = ({ narrativePrompt, fallbackText, mode = 'fallback', meta = {} }) => ({
  mode,
  prompt: narrativePrompt || '',
  json: null,
  text: fallbackText || '',
  meta: buildMeta(meta)
})

async function fetchWithRetry(doFetch, retries = 1) {
  let retried = false
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await doFetch()
      return { result, retried }
    } catch (err) {
      const isAbort = err?.name === 'AbortError'
      const status = err?.status
      const isTransient = isAbort || status === 429 || status === 503 || status === 500
      if (isTransient && attempt < retries) {
        retried = true
        continue
      }
      if (retried) err.retried = true
      throw err
    }
  }
}

async function postGemini({ apiUrl, apiKey, input }) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  let res
  try {
    res = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: JSON.stringify(input) }]
          }
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 1400
        }
      }),
      signal: controller.signal
    })
  } finally {
    clearTimeout(timeoutId)
  }

  // 若失敗，把 body 一併讀出來（方便你在主控台看原因）
  if (!res.ok) {
    let detail = ''
    try {
      detail = await res.text()
    } catch {
      detail = ''
    }
    const err = new Error(`Gemini HTTP ${res.status}${detail ? `: ${detail}` : ''}`)
    err.status = res.status
    throw err
  }

  return res.json()
}

export async function generateAiNarrative({ narrativePrompt, facts, fallbackText }) {
  // ✅ 未啟用 / 沒 key：直接 fallback（也不噴錯）
  if (!ENABLE_AI || !API_KEY) {
    return {
      mode: 'local',
      prompt: narrativePrompt || '',
      json: null,
      text: fallbackText || '',
      meta: buildMeta({ errorType: 'disabled' })
    }
  }

  const contract = buildSystemContract()

  // ✅ 把「可用事實」餵給 AI，避免亂寫
  const input = {
    contract,
    schema: NARRATIVE_JSON_SCHEMA,
    facts,
    prompt: narrativePrompt
  }

  try {
    // ✅ 依序嘗試 v1 -> v1beta（避免你遇到 404 就整個掛掉）
    let data = null
    let lastErr = null
    let retried = false
    const debugHealth = {
      enableAI: ENABLE_AI,
      timeoutMs: TIMEOUT_MS,
      cacheHit: false
    }
    if (String(import.meta.env.VITE_DEBUG_NARRATIVE || '').toLowerCase() === 'true') {
      console.log('[aiNarrative] healthcheck', debugHealth)
    }

    for (const apiUrl of API_URLS) {
      try {
        const { result, retried: didRetry } = await fetchWithRetry(
          () => postGemini({ apiUrl, apiKey: API_KEY, input }),
          1
        )
        data = result
        retried = retried || didRetry
        lastErr = null
        break
      } catch (e) {
        lastErr = e
        retried = retried || !!e?.retried
        // 404 / 400 可能是路徑或模型問題；繼續嘗試下一個 endpoint
        continue
      }
    }

    if (!data) throw lastErr || new Error('Gemini request failed')

    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') || ''

    const json = safeJsonParse(text)
    const rendered = json ? renderNarrativeFromJson(json) : ''

    if (!json || !rendered) {
      return fallbackResponse({
        narrativePrompt,
        fallbackText,
        meta: buildMeta({ errorType: 'parse', retried })
      })
    }

    return {
      mode: 'ai',
      prompt: narrativePrompt || '',
      json,
      text: rendered,
      meta: buildMeta({ retried })
    }
  } catch (err) {
    console.error('[aiNarrative] error:', err)
    let meta
    if (err?.name === 'AbortError') {
      meta = buildMeta({ errorType: 'timeout', timeoutMs: TIMEOUT_MS, retried: err?.retried })
    } else if (typeof err?.status === 'number') {
      meta = buildMeta({ errorType: 'http', status: err.status, retried: err?.retried })
    } else {
      meta = buildMeta({ errorType: 'other', retried: err?.retried })
    }

    return fallbackResponse({ narrativePrompt, fallbackText, meta })
  }
}
