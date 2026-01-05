#!/usr/bin/env node
import http from 'http'
import fs from 'fs'
import path from 'path'

const PORT = process.env.PORT || 8787
const logPath = path.join(process.cwd(), 'scripts/_telemetry.log')

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/ingest') {
    let body = ''
    req.on('data', chunk => (body += chunk))
    req.on('end', () => {
      try {
        fs.appendFileSync(logPath, body + '\n', 'utf-8')
      } catch (err) {
        console.error('log write failed', err)
      }
      res.statusCode = 204
      res.end()
    })
    return
  }
  res.statusCode = 404
  res.end()
})

server.listen(PORT, () => {
  console.log(`telemetry server listening on ${PORT}`)
})
