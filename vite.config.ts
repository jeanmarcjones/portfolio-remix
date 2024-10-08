/// <reference types="vitest/config" />

import path from 'node:path'

import mdx from '@mdx-js/rollup'
import { vitePlugin as remix } from '@remix-run/dev'
import { rehypePrettyCode } from 'rehype-pretty-code'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { flatRoutes } from 'remix-flat-routes'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypePrettyCode],
    }),
    process.env.NODE_ENV === 'test'
      ? null
      : remix({
          ignoredRouteFiles: ['**/*'],
          routes: async (defineRoutes) => {
            return flatRoutes('routes', defineRoutes, {
              ignoredRouteFiles: [
                '.*',
                '**/*.css',
                '**/*.test.{js,jsx,ts,tsx}',
                '**/__*.*',
                // Use the escape brackets like:
                // my-route.[server].tsx
                '**/*.server.*',
                '**/*.client.*',
              ],
            })
          },
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true,
          },
        }),
  ],
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
