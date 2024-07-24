import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import * as React from 'react'

import Navigation from '~/components/navigation'

import styles from './tailwind.css?url'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-x-hidden">
      <header className="flex justify-center border-b">
        <Navigation />
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1">{children}</main>
    </div>
  )
}

export const meta: MetaFunction = () => [
  { title: 'Portfolio' },
  {
    name: 'description',
    content: 'My portfolio website made with the Remix framework',
  },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
