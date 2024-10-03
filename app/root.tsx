import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { type ReactNode } from 'react'

import { GeneralErrorBoundary } from '~/components/error-boundary'
import SiteFooter from '~/components/site-footer'
import SiteHeader from '~/components/site-header'
import { useTheme } from '~/routes/resources+/theme-switch'
import { ClientHintCheck, getHints } from '~/utils/client-hints'
import { useNonce } from '~/utils/nonce-provider'
import { getTheme, type Theme } from '~/utils/theme.server'

import appleTouchIconAssetUrl from './assets/favicons/apple-touch-icon.png'
import faviconAssetUrl from './assets/favicons/favicon.svg'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.ico',
    sizes: '48x48',
  },
  { rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
  { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIconAssetUrl },
  {
    rel: 'manifest',
    href: '/site.webmanifest',
    crossOrigin: 'use-credentials',
  },
  { rel: 'stylesheet', href: tailwindStyleSheetUrl, as: 'styles' },
]

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data ? `Jean-Marc's Portfolio` : `Error | Jean-Marc's Portfolio` },
  {
    name: 'description',
    content: 'My portfolio website made with the Remix framework',
  },
]

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
      userPerfs: {
        theme: getTheme(request),
      },
    },
  })
}

function Document({
  children,
  nonce,
  theme = 'light',
}: {
  children: ReactNode
  nonce: string
  theme?: Theme
}) {
  return (
    <html lang="en" className={`${theme} h-full overflow-x-hidden`}>
      <head>
        <ClientHintCheck nonce={nonce} />
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  const nonce = useNonce()
  const theme = useTheme()

  return (
    <Document nonce={nonce} theme={theme}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader theme={data.requestInfo.userPerfs.theme} />

        <main className="w-full flex-1">
          <Outlet />
        </main>

        <SiteFooter />
      </div>
    </Document>
  )
}

export function ErrorBoundary() {
  const nonce = useNonce()

  return (
    <Document nonce={nonce}>
      <GeneralErrorBoundary />
    </Document>
  )
}
