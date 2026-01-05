#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { scan } from './scanImports.mjs'

const root = process.cwd()
const args = process.argv.slice(2)
const WRITE = args.includes('--write')
const DRY = args.includes('--dry') || !WRITE

const allowPrefixes = [
  'src/core/content',
  'src/core/ontology',
  'src/core/guidance',
  'src/core/psych',
  'src/core/ai',
  'src/core/choiceEngine.js',
  'src/main.js',
  'src/router/'
]

function isAllowed(file) {
  const normalized = file.replace(/\\/g, '/')
  return allowPrefixes.some(p => normalized.startsWith(p))
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function toDeprecatedPath(file) {
  const rel = file.replace(/^src\//, '')
  return path.join('src/_deprecated', rel)
}

function moveFile(srcPath, destPath) {
  ensureDir(path.dirname(destPath))
  execSync(`git mv "${srcPath}" "${destPath}"`, { stdio: 'inherit' })
}

function main() {
  const { unreferencedCandidates } = scan()
  const finalList = unreferencedCandidates.filter(f => !isAllowed(f))

  if (!finalList.length) {
    console.log('No unreferenced candidates to deprecate.')
    return
  }

  if (DRY) {
    console.log('Dry run: the following files would be moved to src/_deprecated/')
    finalList.forEach(f => console.log('-', f))
    return
  }

  if (WRITE) {
    console.log('Moving files to src/_deprecated/ ...')
    for (const f of finalList) {
      const from = path.join(root, f)
      const to = path.join(root, toDeprecatedPath(f))
      moveFile(from, to)
    }
    console.log('Done.')
  }
}

main()
