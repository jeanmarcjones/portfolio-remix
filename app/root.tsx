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
import * as React from 'react'

import Navigation from '~/components/navigation'
import ThemeSwitch, { useTheme } from '~/routes/theme-switch'
import { ClientHintCheck, getHints } from '~/utils/client-hints'
import { getTheme, type Theme } from '~/utils/theme.server'

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
      userPerfs: {
        theme: getTheme(request),
      },
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
  const data = useLoaderData<typeof loader>()
  const theme = useTheme()

  return (
    <Document theme={theme}>
      <div className="h-screen overflow-x-hidden">
        <header className="flex justify-between border-b px-16 py-1">
          <Navigation />

          <ThemeSwitch userPreference={data.requestInfo.userPerfs.theme} />
        </header>

        <main className="max-w-7xl flex-1">
          <Outlet />
        </main>
      </div>
    </Document>
  )
}
