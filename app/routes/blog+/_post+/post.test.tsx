/**
 * @vitest-environment jsdom
 */
import { createRemixStub } from '@remix-run/testing'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { default as Post } from './_layout'
import MDX from './yarn-four-install.mdx'

test('Renders mdx content on post page', async () => {
  const App = createRemixStub([
    {
      id: 'root',
      path: '/',
      Component: Post,
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
    await screen.findByRole('heading', {
      name: /installing yarn berry with asdf/i,
    })
  ).toBeInTheDocument()
})
