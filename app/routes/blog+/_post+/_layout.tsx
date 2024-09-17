import { Outlet } from '@remix-run/react'

export default function BlogPostLayout() {
  return (
    <article className="container prose py-6 dark:prose-invert">
      <Outlet />
    </article>
  )
}
