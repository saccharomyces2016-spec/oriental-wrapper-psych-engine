#!/usr/bin/env node
/**
 * M-8.1: 輕量 Gemini API 代理伺服器
 * 避免 API Key 暴露在前端 bundle
 */
import http from 'http'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 載入 .env（若存在）- 手動解析避免 dotenv 的 ESM 問題
const envPath = join(__dirname, '.env')
if (existsSync(envPath)) {
  try {
    const envContent = readFileSync(envPath, 'utf-8')
    const lines = envContent.split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const [key, ...valueParts] = trimmed.split('=')
      if (key && valueParts.length) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '')
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    }
  } catch (err) {
    console.warn('[server] failed to load .env:', err.message)
  }
}

const PORT = Number(process.env.PORT || 8787)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'
const RATE_LIMIT_PER_MIN = Number(process.env.RATE_LIMIT_PER_MIN || 10)

// Gemini API URLs（v1 -> v1beta fallback）
const GEMINI_API_URLS = [
  'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
]

// Rate limiting: 簡單的 token bucket（記憶體）
const rateLimitMap = new Map()

function getClientId(req) {
  // 簡單用 IP 當識別（生產環境建議用更安全的方式）
  return req.socket.remoteAddress || 'unknown'
}

function checkRateLimit(clientId) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 分鐘
  const record = rateLimitMap.get(clientId) || { count: 0, resetAt: now + windowMs }

  if (now > record.resetAt) {
    record.count = 0
    record.resetAt = now + windowMs
  }

  if (record.count >= RATE_LIMIT_PER_MIN) {
    return false
  }

  record.count += 1
  rateLimitMap.set(clientId, record)
  return true
}

function setCORSHeaders(res, origin) {
  // 開發環境允許 localhost
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
  ]
  if (allowedOrigins.includes(origin) || CORS_ORIGIN === '*') {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }
}

async function handleNarrative(req, res) {
  const origin = req.headers.origin || ''
  setCORSHeaders(res, origin)

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: { message: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' } }))
    return
  }

  // Rate limiting
  const clientId = getClientId(req)
  if (!checkRateLimit(clientId)) {
    res.writeHead(429, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: { message: 'Rate limit exceeded', code: 'RATE_LIMIT' } }))
    return
  }

  // 檢查 API Key
  if (!GEMINI_API_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: { message: 'Server configuration error', code: 'NO_API_KEY' } }))
    return
  }

  // 讀取 body
  let body = ''
  try {
    for await (const chunk of req) {
      body += chunk
    }
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: { message: 'Invalid request body', code: 'INVALID_BODY' } }))
    return
  }

  let payload
  try {
    payload = JSON.parse(body)
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: { message: 'Invalid JSON', code: 'INVALID_JSON' } }))
    return
  }

  // Allowlist 檢查（只允許特定欄位）
  const { prompt, schema, temperature, model } = payload
  if (!prompt) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: { message: 'Missing required field: prompt', code: 'MISSING_PROMPT' } }))
    return
  }

  // 構建 Gemini 請求
  const input = {
    contract: schema?.contract || '',
    schema: schema?.schema || schema,
    facts: schema?.facts || {},
    prompt: prompt
  }

  const geminiPayload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: JSON.stringify(input) }]
      }
    ],
    generationConfig: {
      temperature: typeof temperature === 'number' ? temperature : 0.5,
      maxOutputTokens: 1400
    }
  }

  // 嘗試呼叫 Gemini（v1 -> v1beta fallback）
  let lastError = null
  for (const apiUrl of GEMINI_API_URLS) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const geminiRes = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!geminiRes.ok) {
        const errorText = await geminiRes.text().catch(() => '')
        lastError = new Error(`Gemini HTTP ${geminiRes.status}: ${errorText}`)
        lastError.status = geminiRes.status
        continue
      }

      const geminiData = await geminiRes.json()
      const text = geminiData?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') || ''

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: true, data: text }))
      return
    } catch (err) {
      lastError = err
      if (err.name === 'AbortError') {
        lastError.status = 408
      }
      continue
    }
  }

  // 所有端點都失敗
  const status = lastError?.status || 500
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({
    ok: false,
    error: {
      message: lastError?.message || 'Gemini API request failed',
      code: status === 408 ? 'TIMEOUT' : 'GEMINI_ERROR'
    }
  }))
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/narrative' || req.url === '/api/narrative/') {
    handleNarrative(req, res).catch(err => {
      console.error('[server] unhandled error:', err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: false, error: { message: 'Internal server error', code: 'INTERNAL_ERROR' } }))
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: { message: 'Not found', code: 'NOT_FOUND' } }))
  }
})

server.listen(PORT, () => {
  console.log(`[server] Gemini proxy listening on http://localhost:${PORT}`)
  console.log(`[server] API endpoint: http://localhost:${PORT}/api/narrative`)
  if (!GEMINI_API_KEY) {
    console.warn('[server] ⚠️  GEMINI_API_KEY not set, requests will fail')
  }
})

