import path from 'node:path'
import { fileURLToPath } from 'node:url'

import esbuild from 'esbuild'
import fsExtra from 'fs-extra'

const pkg = fsExtra.readJsonSync(path.join(process.cwd(), 'package.json'))

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const here = (...s: Array<string>) => path.join(__dirname, ...s)

console.log('building...')

try {
  await esbuild.build({
    entryPoints: [here('../server/index.ts')],
    outdir: here('../server-build'),
    target: [`node${pkg.engines.node}`],
    platform: 'node',
    sourcemap: true,
    format: 'esm',
    logLevel: 'info',
  })
} catch (error: unknown) {
  console.error(error)
  // eslint-disable-next-line unicorn/no-process-exit -- This is a cli script
  process.exit(1)
}
