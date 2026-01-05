#!/usr/bin/env node
/**
 * M-8.1: 驗證代理設定
 * 1. 檢查前端 bundle 不再引用 VITE_GEMINI_API_KEY
 * 2. 可選：打一次 API smoke test
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.join(__dirname, '..')
const distDir = path.join(root, 'dist')

let errors = []
let warnings = []

// 1. 檢查 dist 目錄是否存在
if (!fs.existsSync(distDir)) {
  console.log('⚠️  dist/ 不存在，請先執行 npm run build')
  console.log('   跳過 bundle 檢查，僅檢查原始碼...')
} else {
  // 2. 檢查 dist 中的 JS 檔案是否包含 VITE_GEMINI_API_KEY
  const jsFiles = []
  function findJsFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        findJsFiles(fullPath)
      } else if (entry.name.endsWith('.js')) {
        jsFiles.push(fullPath)
      }
    }
  }
  findJsFiles(distDir)

  for (const file of jsFiles) {
    const content = fs.readFileSync(file, 'utf-8')
    if (content.includes('VITE_GEMINI_API_KEY')) {
      errors.push(`❌ ${path.relative(root, file)} 仍包含 VITE_GEMINI_API_KEY`)
    }
    if (content.includes('generativelanguage.googleapis.com')) {
      warnings.push(`⚠️  ${path.relative(root, file)} 仍包含直接 Gemini API 呼叫（應改為代理）`)
    }
  }
}

// 3. 檢查原始碼中是否仍直接使用 VITE_GEMINI_API_KEY
const srcAiNarrative = path.join(root, 'src/core/ai/aiNarrative.js')
if (fs.existsSync(srcAiNarrative)) {
  const content = fs.readFileSync(srcAiNarrative, 'utf-8')
  if (content.includes('VITE_GEMINI_API_KEY')) {
    errors.push(`❌ src/core/ai/aiNarrative.js 仍引用 VITE_GEMINI_API_KEY`)
  }
  if (content.includes('generativelanguage.googleapis.com')) {
    errors.push(`❌ src/core/ai/aiNarrative.js 仍直接呼叫 Gemini API`)
  }
  if (!content.includes('PROXY_ENDPOINT') && !content.includes('/api/narrative')) {
    warnings.push(`⚠️  src/core/ai/aiNarrative.js 可能未使用代理端點`)
  }
}

// 4. 檢查 server/index.mjs 是否存在
const serverFile = path.join(root, 'server/index.mjs')
if (!fs.existsSync(serverFile)) {
  errors.push(`❌ server/index.mjs 不存在`)
} else {
  const content = fs.readFileSync(serverFile, 'utf-8')
  if (!content.includes('GEMINI_API_KEY')) {
    warnings.push(`⚠️  server/index.mjs 可能未正確讀取 GEMINI_API_KEY`)
  }
  if (!content.includes('/api/narrative')) {
    errors.push(`❌ server/index.mjs 未定義 /api/narrative 端點`)
  }
}

// 5. 可選：API smoke test（需要 server 運行中）
const doSmokeTest = process.argv.includes('--test')
if (doSmokeTest) {
  try {
    const res = await fetch('http://localhost:8787/api/narrative', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'test',
        schema: { contract: '', schema: {}, facts: {} }
      })
    })
    const data = await res.json()
    if (res.ok) {
      console.log('✅ API smoke test: 代理伺服器回應正常')
    } else {
      warnings.push(`⚠️  API smoke test: 伺服器回應 ${res.status} (${data.error?.message || 'unknown'})`)
    }
  } catch (err) {
    warnings.push(`⚠️  API smoke test: 無法連線到代理伺服器 (${err.message})`)
    warnings.push(`    提示：請先執行 npm run server:dev`)
  }
}

// 輸出結果
console.log('\n=== M-8.1 代理驗證結果 ===\n')

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ 所有檢查通過！')
  console.log('   - 前端不再引用 VITE_GEMINI_API_KEY')
  console.log('   - 已改用後端代理')
} else {
  if (errors.length > 0) {
    console.log('❌ 錯誤：')
    errors.forEach(e => console.log(`   ${e}`))
  }
  if (warnings.length > 0) {
    console.log('\n⚠️  警告：')
    warnings.forEach(w => console.log(`   ${w}`))
  }
}

if (doSmokeTest && errors.length === 0) {
  console.log('\n💡 提示：執行 --test 時請確保 server 正在運行')
}

console.log('\n')

process.exit(errors.length > 0 ? 1 : 0)





















