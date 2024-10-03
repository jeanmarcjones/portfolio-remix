/**
 * @vitest-environment jsdom
 */
import { createRemixStub } from '@remix-run/testing'
import { render, screen } from '@testing-library/react'
import * as cookie from 'cookie'
import { expect, test, vi } from 'vitest'

import SiteFooter from '~/components/site-footer'
import SiteHeader from '~/components/site-header'
import { loader as rootLoader } from '~/root'
import ThemeSwitch, { action, useTheme } from '~/routes/resources+/theme-switch'
import { cookieName } from '~/utils/theme.server'

function Layout() {
  const theme = useTheme()
  return (
    <>
      <SiteHeader theme={theme} />
      <SiteFooter />
    </>
  )
}

vi.mock('~/utils/client-hints.tsx', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('~/utils/client-hints.tsx')>()),
    getHints: vi.fn((request: Request) => {
      const cookieHeader = request.headers.get('cookie')
      const theme = cookieHeader
        ? cookie.parse(cookieHeader)['CH-prefers-color-scheme']
        : ''
      return {
        theme,
      }
    }),
  }
})

test('No theme cookies are set', async () => {
  const App = createRemixStub([
    {
      id: 'root',
      path: '/',
      loader: rootLoader,
      children: [
        {
          path: '/resources/theme-switch',
          Component: ThemeSwitch,
          action,
        },
      ],
    },
  ])

  const routeUrl = `/resources/theme-switch`
  render(<App initialEntries={[routeUrl]} />)

  expect(
    await screen.findByLabelText(/system theme active/i)
  ).toBeInTheDocument()
})

test('Should use prefers color cookie when no theme cookie is set', async () => {
  const App = createRemixStub([
    {
      id: 'root',
      path: '/',
      loader: async (args) => {
        args.request.headers.set('cookie', 'CH-prefers-color-scheme=light;')
        return rootLoader(args)
      },
      children: [
        {
          path: '/resources/theme-switch',
          Component: Layout,
          action,
        },
      ],
    },
  ])

  const routeUrl = `/resources/theme-switch`
  render(<App initialEntries={[routeUrl]} />)

  expect(
    await screen.findByLabelText(/light theme active/i)
  ).toBeInTheDocument()
})

test('Should use theme cookie when both are set', async () => {
  const App = createRemixStub([
    {
      id: 'root',
      path: '/',
      loader: async (args) => {
        args.request.headers.set(
          'cookie',
          `CH-prefers-color-scheme=light; ${cookieName}=dark`
        )
        return rootLoader(args)
      },
      children: [
        {
          path: '/resources/theme-switch',
          Component: Layout,
          action,
        },
      ],
    },
  ])

  const routeUrl = `/resources/theme-switch`
  render(<App initialEntries={[routeUrl]} />)

  expect(await screen.findByLabelText(/dark theme active/i)).toBeInTheDocument()
})

test.todo('Changing the sites theme (probably needs e2e)')
