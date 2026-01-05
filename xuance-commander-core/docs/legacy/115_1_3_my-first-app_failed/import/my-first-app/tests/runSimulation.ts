import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DestinyScoringEngine } from '../src/core/scoring/DestinyScoringEngine.js'
import { buildSystemPrompt } from '../src/core/llm/promptBuilder.js'
import type { DestinyInput, DestinySignature } from '../src/core/types/destiny.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function loadCase(): Promise<any> {
  const p = path.resolve(__dirname, 'simulations/highFriction_overload.case.json')
  const raw = fs.readFileSync(p, 'utf8')
  return JSON.parse(raw)
}

export async function runSimulation(): Promise<void> {
  const fixture = await loadCase()
  const engine = new DestinyScoringEngine()

  const input: DestinyInput = {
    round1: fixture.round1,
    round2: fixture.round2,
    round3: fixture.round3,
    round4: fixture.round4
  }

  const signature: DestinySignature = engine.score(input)

  const prompt = buildSystemPrompt(signature, {
    domain: fixture.context.domain,
    r2_state_text: fixture.context.r2_state_text,
    r3_structure_label: fixture.context.r3_structure_label,
    r3_shadow_label: fixture.context.r3_shadow_label,
    friction: fixture.context.friction,
    intensity: fixture.context.intensity
  })

  console.log('--- Destiny Signature ---')
  console.dir(signature, { depth: null })
  console.log('\n--- System Prompt ---\n')
  console.log(prompt)
}

if (process.argv[1] && process.argv[1].endsWith('runSimulation.ts')) {
  runSimulation().catch(err => {
    console.error(err)
    process.exitCode = 1
  })
}

export default runSimulation
