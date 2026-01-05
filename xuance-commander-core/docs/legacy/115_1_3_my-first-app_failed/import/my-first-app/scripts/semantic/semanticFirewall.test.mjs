import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { scanText, loadDenylist } from './semanticFirewall.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const denylist = loadDenylist()

describe('semantic firewall', () => {
  it('fails on psychology term', () => {
    const res = scanText('This is strictly psychology.', denylist)
    expect(res.ok).toBe(false)
    expect(res.violations.some(v => v.term.toLowerCase() === 'psychology')).toBe(true)
  })

  it('passes on neutral text', () => {
    const res = scanText('The void stares back.', denylist)
    expect(res.ok).toBe(true)
    expect(res.violations.length).toBe(0)
  })

  it('fails with deterministic ordering for multiple terms', () => {
    const res = scanText('Mental stress and advice collide.', denylist)
    expect(res.ok).toBe(false)
    const terms = res.violations.map(v => v.term.toLowerCase())
    expect(terms).toEqual(['mental', 'stress', 'advice'])
  })
})
