import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['tests/mobile.test.js', 'tests/server.test.js', 'node_modules/**', '.worktrees/**'],
  },
})
