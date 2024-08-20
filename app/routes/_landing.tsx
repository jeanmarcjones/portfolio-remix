import { Outlet } from '@remix-run/react'

export default function LandingLayout() {
  return (
    <article className="container prose py-6 dark:prose-invert">
      <Outlet />
    </article>
  )
}
