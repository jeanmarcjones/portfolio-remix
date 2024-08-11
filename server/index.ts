import crypto from 'node:crypto'
import path from 'node:path'
import url, { fileURLToPath } from 'node:url'

import { createRequestHandler } from '@remix-run/express'
import { installGlobals, type ServerBuild } from '@remix-run/node'
import closeWithGrace from 'close-with-grace'
import compression from 'compression'
import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

installGlobals()

const MODE = process.env.NODE_ENV ?? 'development'
const IS_PROD = MODE === 'production'
const IS_DEV = MODE === 'development'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const viteDevServer = IS_PROD
  ? undefined
  : await import('vite').then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    )

async function importServer(): Promise<ServerBuild> {
  const buildPath = path.join(__dirname, '../build/server/index.js')
  return import(url.pathToFileURL(buildPath).href)
}

async function getServerBuild() {
  return viteDevServer
    ? // Can't see how to fix this without a type assertion
      (viteDevServer?.ssrLoadModule(
        'virtual:remix/server-build'
      ) as unknown as ServerBuild)
    : importServer()
}

const app = express()

app.use(compression())

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares)
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    '/assets',
    express.static('build/client/assets', { immutable: true, maxAge: '1y' })
  )

  // Everything else (like favicon.ico) is cached for an hour. You may want to be
  // more aggressive with this caching.
  app.use(express.static('build/client', { maxAge: '1h' }))
}

app.use(morgan('tiny'))

app.use((_, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString('hex')
  next()
})

app.use(
  helmet({
    xPoweredBy: false,
    contentSecurityPolicy: {
      reportOnly: IS_DEV,
      directives: {
        'connect-src': [`'self'`, IS_DEV ? 'ws:' : null].filter(Boolean),
        'font-src': [`'self'`],
        'frame-src': [`'self'`],
        'script-src': [
          `'strict-dynamic'`,
          `'self'`,
          (_, res) => `'nonce-${(res as Response)?.locals?.cspNonce}'`,
        ],
        'script-src-attr': [
          (_, res) => `'nonce-${(res as Response)?.locals?.cspNonce}'`,
        ],
      },
    },
  })
)

// handle SSR requests
app.all(
  '*',
  createRequestHandler({
    mode: MODE,
    build: getServerBuild,
    getLoadContext: (req: Request, res: Response) => ({
      cspNonce: res.locals.cspNonce,
    }),
  })
)

const port = process.env.PORT || 3_000
const server = app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
)

closeWithGrace(async () => {
  await new Promise((resolve, reject) => {
    server.close((e) => (e ? reject(e) : resolve('ok')))
  })
})
