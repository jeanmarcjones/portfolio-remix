import { Outlet } from '@remix-run/react'

import { prose } from '~/utils/misc'

export default function BlogPostLayout() {
  return (
    <article className={prose('container pt-8')}>
      <Outlet />
    </article>
  )
}
