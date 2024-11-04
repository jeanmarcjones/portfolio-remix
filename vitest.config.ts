import path from 'node:path'

import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['./app/**/*.test.{ts,tsx}'],
      restoreMocks: true,
      setupFiles: ['./test/vitest-setup.ts'],
      coverage: {
        include: ['app/**/*.{ts,tsx}'],
        exclude: ['**/types/**/*', '**/*.test.{ts,tsx}', 'app/*.tsx'],
        all: true,
      },
      alias: {
        'virtual:remix/server-build': path.resolve('./build/server/index.js'),
      },
    },
  })
)
