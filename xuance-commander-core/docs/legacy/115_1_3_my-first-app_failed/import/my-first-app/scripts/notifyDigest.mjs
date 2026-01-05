#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const root = process.cwd()
const reportsDir = path.join(root, 'reports')
fs.mkdirSync(reportsDir, { recursive: true })

// M-7.5: 門檻常數（需與 analyticsReport.mjs 一致）
const MIN_PURCHASE_FUNNEL_VIEWS = 50

// M-7.6: Thresholds version and key values (需與 analyticsReport.mjs 一致)
const THRESHOLDS_VERSION = 'v1.0'
const THRESHOLDS_CONFIG = {
  tooFast: 2000,
  tooSlow: 15000,
  highChange: 2.0,
  hesitationWarning: 0.35
}

const summary = readJsonIfExists('analytics.summary.json')
const proposalsSummary = readJsonIfExists('proposals.summary.json')
const funnelSummary = readJsonIfExists('analytics.funnel.json')
const proposalsByQuestion = readJsonIfExists('proposals.byQuestion.json')
const proposalsByTheme = readJsonIfExists('proposals.byTheme.json')

const digest = buildDigest({ summary, proposalsSummary, funnelSummary, proposalsByQuestion, proposalsByTheme })
const digestPath = path.join(reportsDir, 'digest.txt')
fs.writeFileSync(digestPath, digest, 'utf-8')
console.log(`[digest] written: ${digestPath}`)

const emailEnabled = String(process.env.DIGEST_EMAIL_ENABLED || 'false').toLowerCase() === 'true'
if (!emailEnabled) {
  console.log('[digest] email disabled (DIGEST_EMAIL_ENABLED=false)')
  process.exit(0)
}

const emailConfig = {
  to: process.env.DIGEST_EMAIL_TO || '',
  from: process.env.DIGEST_EMAIL_FROM || '',
  user: process.env.DIGEST_EMAIL_GMAIL_USER || '',
  appPassword: process.env.DIGEST_EMAIL_GMAIL_APP_PASSWORD || ''
}

if (!emailConfig.to || !emailConfig.from || !emailConfig.user || !emailConfig.appPassword) {
  console.warn('[digest] email enabled but config incomplete; skipping send')
  process.exit(0)
}

sendEmail({ digest, config: emailConfig }).catch(err => {
  console.warn('[digest] send failed:', err?.message || err)
  process.exit(0)
})

function readJsonIfExists(fileName) {
  const filePath = path.join(reportsDir, fileName)
  if (!fs.existsSync(filePath)) return null
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (err) {
    console.warn(`[digest] failed to read ${fileName}:`, err?.message || err)
    return null
  }
}

function buildDigest({ summary, proposalsSummary, funnelSummary, proposalsByQuestion, proposalsByTheme }) {
  const lines = []
  lines.push(`# Analytics Digest`)
  lines.push(`Generated at: ${new Date().toISOString()}`)
  lines.push('')

  // 0) Thresholds Configuration
  lines.push('## 0. Thresholds Configuration')
  lines.push(`Version: ${THRESHOLDS_VERSION}`)
  lines.push(`Too Fast: < ${THRESHOLDS_CONFIG.tooFast}ms`)
  lines.push(`Too Slow: > ${THRESHOLDS_CONFIG.tooSlow}ms`)
  lines.push(`High Change Count: >= ${THRESHOLDS_CONFIG.highChange}`)
  lines.push(`Hesitation Warning: >= ${THRESHOLDS_CONFIG.hesitationWarning}`)
  lines.push('')

  // 1) System Health
  lines.push('## 1. System Health')
  if (summary) {
    const errors = summary.totals?.errors ?? 0
    const parseErrors = summary.totals?.parseErrors ?? 0
    const eventsTotal = summary.totals?.eventsTotal ?? 0
    lines.push(`Errors: ${errors} (parse errors: ${parseErrors})`)
    lines.push(`Total events: ${eventsTotal}`)
    if (parseErrors > 0 && eventsTotal > 0) {
      const errorRate = Number((parseErrors / eventsTotal).toFixed(3))
      if (errorRate > 0.1) {
        lines.push(`⚠️  Parse error rate high: ${errorRate}`)
      }
    }
  } else {
    lines.push('No data yet')
  }
  lines.push('')

  // 2) Funnel
  lines.push('## 2. Funnel')
  if (funnelSummary) {
    const views = funnelSummary.paywall_view_count ?? 0
    const clicks = funnelSummary.paywall_click_count ?? 0
    const checkouts = funnelSummary.checkout_start_count ?? 0
    const purchases = funnelSummary.purchase_success_count ?? 0
    const conv = funnelSummary.conversion || {}

    lines.push(`Views: ${views}, Clicks: ${clicks}, Checkouts: ${checkouts}, Purchases: ${purchases}`)
    lines.push(`Conversion rates: click/view=${conv.click_per_view ?? 0}, checkout/click=${conv.checkout_per_click ?? 0}, success/checkout=${conv.success_per_checkout ?? 0}`)

    if (views < MIN_PURCHASE_FUNNEL_VIEWS) {
      lines.push(`⚠️  資料不足：views (${views}) < 門檻 (${MIN_PURCHASE_FUNNEL_VIEWS})`)
    }
  } else {
    lines.push('No data yet')
  }
  lines.push('')

  // 3) Top 5 Pending Proposals
  lines.push('## 3. Top 5 Pending Proposals')
  const allProposals = [
    ...(Array.isArray(proposalsByQuestion) ? proposalsByQuestion : []),
    ...(Array.isArray(proposalsByTheme) ? proposalsByTheme : [])
  ]

  if (allProposals.length === 0) {
    lines.push('Nothing to review')
  } else {
    // 依 confidence + impact 排序
    const sorted = allProposals
      .filter(p => p.status === 'pending')
      .sort((a, b) => {
        const confOrder = { high: 3, medium: 2, low: 1 }
        const confDiff = (confOrder[b.confidence] || 0) - (confOrder[a.confidence] || 0)
        if (confDiff !== 0) return confDiff
        // 同 confidence 時，依 events 排序
        const eventsA = a.metricsSnapshot?.events || 0
        const eventsB = b.metricsSnapshot?.events || 0
        return eventsB - eventsA
      })
      .slice(0, 5)

    if (sorted.length === 0) {
      lines.push('No pending proposals')
    } else {
      sorted.forEach((p, idx) => {
        const conf = (p.confidence || 'low').toUpperCase()
        const targetType = p.targetType === 'question' ? 'Q' : 'T'
        const targetId = p.targetId || 'unknown'
        const themeId = p.themeId || (p.targetType === 'question' ? 'unknown' : targetId)
        const action = p.suggestedAction || 'unknown'
        const why = p.explanation ? truncate(p.explanation, 40) : 'no explanation'
        const metrics = p.metricsSnapshot || {}
        const metricsStr = `events:${metrics.events || 0},dwell:${metrics.avgDwellMs || 0}ms,hesitant:${metrics.hesitantRate || 0},change:${metrics.avgChangeCount || 0}`

        lines.push(`[CONF=${conf}] ${targetType}:<${targetId}> theme:<${themeId}> action:<${action}> why:<${why}> metrics:<${metricsStr}>`)
      })
    }
  }
  lines.push('')

  // 4) Summary (if available)
  if (proposalsSummary) {
    lines.push('## 4. Summary')
    const totals = proposalsSummary.totals || {}
    lines.push(`Total proposals: ${totals.proposals ?? 0} (high: ${totals.high ?? 0}, medium: ${totals.medium ?? 0}, low: ${totals.low ?? 0})`)
    
    const gating = proposalsSummary.gating || {}
    if (gating.minSessionsMet === false) {
      lines.push(`⚠️  Session 數未達門檻`)
    }
    if (gating.minEventsPerQuestionMetRatio !== undefined) {
      lines.push(`Questions with enough data: ${Number((gating.minEventsPerQuestionMetRatio * 100).toFixed(1))}%`)
    }

    const warnings = proposalsSummary.warnings || []
    if (warnings.length > 0) {
      lines.push('Warnings:')
      warnings.forEach(w => lines.push(`  - ${w}`))
    }
  }

  return lines.join('\n')
}

function truncate(str, max) {
  const s = String(str || '')
  if (s.length <= max) return s
  return s.slice(0, max - 3) + '...'
}

async function sendEmail({ digest, config }) {
  let nodemailer
  try {
    nodemailer = await import('nodemailer')
  } catch (err) {
    console.warn('[digest] nodemailer not installed; skipping email send')
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.appPassword
    }
  })

  const info = await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject: `[analytics digest] ${new Date().toISOString().slice(0, 10)}`,
    text: digest
  })

  if (info?.messageId) {
    console.log('[digest] email sent')
  } else {
    console.warn('[digest] email send attempted but no messageId returned')
  }
}
