import {
  json,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import * as React from 'react'

import Navigation from '~/components/navigation'
import { ClientHintCheck, getHints } from '~/utils/client-hints'
import { Theme, useTheme } from '~/utils/theme'

import styles from './tailwind.css?url'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => [
  { title: 'Portfolio' },
  {
    name: 'description',
    content: 'My portfolio website made with the Remix framework',
  },
]

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
    },
  })
}

function Document({
  children,
  theme = 'light',
}: {
  children: React.ReactNode
  theme?: Theme
}) {
  return (
    <html lang="en" className={`${theme} h-full overflow-x-hidden`}>
      <head>
        <ClientHintCheck />
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const theme = useTheme()

  return (
    <Document theme={theme}>
      <div className="h-full overflow-x-hidden">
        <header className="flex justify-center border-b">
          <Navigation />
        </header>

        <main className="mx-auto flex w-full max-w-7xl flex-1">
          <Outlet />
        </main>
      </div>
    </Document>
  )
}
