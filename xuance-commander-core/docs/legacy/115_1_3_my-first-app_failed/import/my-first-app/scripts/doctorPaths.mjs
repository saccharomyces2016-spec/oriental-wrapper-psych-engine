#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const root = process.cwd()
const args = process.argv.slice(2)
const FIX = args.includes('--fix')

const targets = {
  questionBank: 'src/core/ontology/questionBank.v1.json',
  motherThemes: 'src/core/ontology/motherThemes.v1.json',
  loader: 'src/core/ontology/ontologyLoader.js',
  guidance: 'src/core/guidance/buildGuidance.js',
  resultLexicon: 'src/core/guidance/resultLexicon.v1.json'
}

function checkExists(filePath) {
  const full = path.join(root, filePath)
  return fs.existsSync(full)
}

function readFile(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf-8')
}

function writeFile(filePath, content) {
  fs.writeFileSync(path.join(root, filePath), content, 'utf-8')
}

function checkImports() {
  const issues = []

  // ontologyLoader import motherThemes
  const loaderContent = readFile(targets.loader)
  const expectedLoaderImport = "import motherThemes from './motherThemes.v1.json'"
  if (!loaderContent.includes(expectedLoaderImport)) {
    issues.push({
      file: targets.loader,
      line: findLine(loaderContent, 'motherThemes'),
      message: 'Import motherThemes should be "./motherThemes.v1.json"',
      fix: () => {
        let next = loaderContent
        next = next.replace(
          /import\s+motherThemes\s+from\s+['"].+motherThemes\.v1\.json['"]/,
          expectedLoaderImport
        )
        writeFile(targets.loader, next)
      }
    })
  }

  // buildGuidance imports
  const guidanceContent = readFile(targets.guidance)
  const expectedMotherImport = "import motherThemesDB from '../ontology/motherThemes.v1.json'"
  if (!guidanceContent.includes(expectedMotherImport)) {
    issues.push({
      file: targets.guidance,
      line: findLine(guidanceContent, 'motherThemes'),
      message: 'Import motherThemes.v1.json should be "../ontology/motherThemes.v1.json"',
      fix: () => {
        let next = guidanceContent
        next = next.replace(
          /import\s+motherThemesDB\s+from\s+['"].+motherThemes\.v1\.json['"]/,
          expectedMotherImport
        )
        writeFile(targets.guidance, next)
      }
    })
  }

  const expectedResultImport = "import resultLexicon from './resultLexicon.v1.json'"
  if (!guidanceContent.includes(expectedResultImport)) {
    issues.push({
      file: targets.guidance,
      line: findLine(guidanceContent, 'resultLexicon'),
      message: 'Import resultLexicon.v1.json should be "./resultLexicon.v1.json"',
      fix: () => {
        let next = guidanceContent
        next = next.replace(
          /import\s+resultLexicon\s+from\s+['"].+resultLexicon\.v1\.json['"]/,
          expectedResultImport
        )
        writeFile(targets.guidance, next)
      }
    })
  }

  return issues
}

function findLine(content, needle) {
  const lines = content.split('\n')
  const idx = lines.findIndex(l => l.includes(needle))
  return idx >= 0 ? idx + 1 : -1
}

function main() {
  const missing = Object.entries(targets)
    .filter(([, p]) => !checkExists(p))
    .map(([k, p]) => ({ key: k, path: p }))

  const importIssues = missing.length ? [] : checkImports()

  if (!missing.length && !importIssues.length) {
    console.log('✅ doctor:paths PASS')
    Object.values(targets).forEach(p => console.log(`- OK ${p}`))
    return
  }

  console.log('❌ doctor:paths found issues:')
  missing.forEach(m => console.log(`- Missing file: ${m.path}`))
  importIssues.forEach(i =>
    console.log(`- Import issue: ${i.file}:${i.line} -> ${i.message}`)
  )

  if (FIX && importIssues.length) {
    importIssues.forEach(i => i.fix && i.fix())
    console.log('Applied fixes for import paths.')
  } else if (FIX && !importIssues.length) {
    console.log('No import fixes to apply.')
  } else if (!FIX && importIssues.length) {
    console.log('Run with --fix to auto-correct import paths.')
  }
}

main()
