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
import { Icons, navIconSize } from '~/components/icons'
import MainNav from '~/components/main-nav'
import MobileNav from '~/components/mobile-nav'
import { Button } from '~/components/ui/button'
import ThemeSwitch, { useTheme } from '~/routes/resources+/theme-switch'
import { ClientHintCheck, getHints } from '~/utils/client-hints'
import { useNonce } from '~/utils/nonce-provider'
import { getTheme, type Theme } from '~/utils/theme.server'

import styles from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles, as: 'styles' },
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
      <div className="h-screen overflow-x-hidden">
        <header className="container flex justify-between border-b py-1 sm:max-w-none">
          <MainNav />
          <MobileNav />

          <nav className="flex items-center gap-1">
            <ThemeSwitch userPreference={data.requestInfo.userPerfs.theme} />

            <Button asChild variant="ghost" size="icon">
              <a
                href="https://github.com/jeanmarcjones"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.gitHub className={navIconSize} />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </nav>
        </header>

        <main className="w-full">
          <Outlet />
        </main>
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
