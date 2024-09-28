/**
 * @vitest-environment jsdom
 */
import { createRemixStub } from '@remix-run/testing'
import { render, screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'

import { default as Blog, loader } from './index'

test('List of published blog posts', async () => {
  const App = createRemixStub([
    {
      path: '/',
      Component: Blog,
      loader,
    },
  ])

  render(<App />)

  expect(
    await screen.findByRole('heading', { name: /blog/i })
  ).toBeInTheDocument()

  const list = within(await screen.findByRole('list'))

  expect(list.getAllByRole('listitem')).toHaveLength(1)
})

test('Post frontmatter', async () => {
  const App = createRemixStub([
    {
      path: '/',
      Component: Blog,
      loader,
    },
  ])

  render(<App />)

  const list = within(await screen.findByRole('list'))

  expect(
    await list.findByText(/installing yarn berry with asdf/i)
  ).toBeInTheDocument()

  expect(
    await list.findByText(/how you actually enable corepack for node on macos/i)
  ).toBeInTheDocument()

  expect(await list.findByText(/2024-09-07/i)).toBeInTheDocument()
})

test('No posts message', async () => {
  const App = createRemixStub([
    {
      path: '/',
      Component: Blog,
      loader: async () => {
        return { posts: [] }
      },
    },
  ])

  render(<App />)

  expect(
    await screen.findByRole('heading', { name: /no posts found/i })
  ).toBeInTheDocument()
})
