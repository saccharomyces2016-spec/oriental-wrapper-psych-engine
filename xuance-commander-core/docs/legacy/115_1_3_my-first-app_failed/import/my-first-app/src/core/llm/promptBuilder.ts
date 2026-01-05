import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DestinySignature } from '../types/destiny.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TEMPLATE_PATH = path.resolve(__dirname, 'masterPrompt.v1.1.md')

let cachedTemplate: string | null = null

function loadTemplate(): string {
  if (cachedTemplate !== null) return cachedTemplate
  const content = fs.readFileSync(TEMPLATE_PATH, 'utf8')
  if (!content || !content.trim()) {
    throw new Error('masterPrompt.v1.1.md is empty or missing required content')
  }
  cachedTemplate = content
  return content
}

function replacePlaceholder(src: string, key: string, value: string): string {
  if (value === undefined || value === null) {
    throw new Error(`Missing required placeholder value for ${key}`)
  }
  const placeholder = `{{${key}}}`
  return src.split(placeholder).join(value)
}

export function buildSystemPrompt(
  signature: DestinySignature,
  context: {
    domain: string
    r2_state_text: string
    r3_structure_label: string
    r3_shadow_label: string
    friction: 'HIGH' | 'LOW'
    intensity: 'OVERLOAD' | 'BALANCED'
  }
): string {
  const template = loadTemplate()

  const friction = context.friction || signature.friction
  const intensity = context.intensity || signature.intensity

  if (friction !== 'HIGH' && friction !== 'LOW') {
    throw new Error('Invalid friction level')
  }
  if (intensity !== 'OVERLOAD' && intensity !== 'BALANCED') {
    throw new Error('Invalid intensity level')
  }

  const frictionValue =
    friction === 'HIGH' ? `${friction}｜自我背叛 / 對抗大勢` : friction
  const intensityValue = intensity

  let prompt = template
  prompt = replacePlaceholder(prompt, 'DOMAIN', String(context.domain || ''))
  prompt = replacePlaceholder(prompt, 'R2_STATE_TEXT', String(context.r2_state_text || ''))
  prompt = replacePlaceholder(prompt, 'R3_STRUCTURE_LABEL', String(context.r3_structure_label || ''))
  prompt = replacePlaceholder(prompt, 'R3_SHADOW_LABEL', String(context.r3_shadow_label || ''))
  prompt = replacePlaceholder(prompt, 'FRICTION_LEVEL', frictionValue)
  prompt = replacePlaceholder(prompt, 'INTENSITY_LEVEL', intensityValue)

  if (intensity === 'OVERLOAD') {
    const banned = ['加油', '努力', '突破', '更上一層', '衝刺']
    for (const w of banned) {
      if (prompt.includes(w)) {
        throw new Error(`Intensity OVERLOAD prompt contains banned term: ${w}`)
      }
    }
  }

  return prompt
}

export default buildSystemPrompt
