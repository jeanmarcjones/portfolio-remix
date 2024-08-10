import crypto from 'node:crypto'

import { createRequestHandler } from '@remix-run/express'
import { installGlobals } from '@remix-run/node'
import closeWithGrace from 'close-with-grace'
import compression from 'compression'
import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

installGlobals()

const MODE = process.env.NODE_ENV ?? 'development'
const IS_PROD = MODE === 'production'
const IS_DEV = MODE === 'development'

const viteDevServer = IS_PROD
  ? undefined
  : await import('vite').then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    )

const remixHandler = createRequestHandler({
  mode: MODE,
  // @ts-expect-error https://github.com/remix-run/remix/issues/8343
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment -- https://github.com/remix-run/remix/issues/8343
      // @ts-ignore This should exist before running the server
      // eslint-disable-next-line import/no-unresolved -- https://github.com/remix-run/remix/issues/8343
      await import('../build/server/index.js'),
  getLoadContext: (req: Request, res: Response) => ({
    cspNonce: res.locals.cspNonce,
  }),
})

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
app.all('*', remixHandler)

const port = process.env.PORT || 3_000
const server = app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
)

closeWithGrace(async () => {
  await new Promise((resolve, reject) => {
    server.close((e) => (e ? reject(e) : resolve('ok')))
  })
})
