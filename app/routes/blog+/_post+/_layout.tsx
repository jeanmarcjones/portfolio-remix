import { Outlet } from '@remix-run/react'

import Prose from '~/components/prose'

export default function BlogPostLayout() {
  return (
    <Prose className="container pt-8">
      <Outlet />
    </Prose>
  )
}
