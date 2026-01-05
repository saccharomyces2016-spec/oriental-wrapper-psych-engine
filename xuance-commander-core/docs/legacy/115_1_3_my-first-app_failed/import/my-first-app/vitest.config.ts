import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.verification.test.ts', 'packages/core/tests/**/*.test.ts'],
    globals: true,
    environment: 'node'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
