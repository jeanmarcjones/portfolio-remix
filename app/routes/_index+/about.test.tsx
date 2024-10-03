/**
 * @vitest-environment jsdom
 */
import { createRemixStub } from '@remix-run/testing'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { default as About } from './_layout'
import MDX from './index.mdx'

test('Renders mdx content on about page', async () => {
  const App = createRemixStub([
    {
      id: 'root',
      path: '/',
      Component: About,
      children: [
        {
          path: '/',
          Component: MDX,
        },
      ],
    },
  ])

  render(<App />)

  expect(
    await screen.findByRole('heading', { name: /about/i })
  ).toBeInTheDocument()

  expect(
    await screen.findByRole('img', { name: /avatar/i })
  ).toBeInTheDocument()

  expect(
    await screen.findByRole('heading', { name: /who am i/i })
  ).toBeInTheDocument()
})
