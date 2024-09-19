import { Outlet } from '@remix-run/react'

import { Separator } from '~/components/ui/separator'

export default function AboutLayout() {
  return (
    <div className="container">
      <h1 className="h0 mb-1 ms-1">About</h1>
      <Separator className="mb-4" />

      <div className="flex flex-row gap-14">
        <div className="flex min-w-max flex-col items-center gap-1">
          <p className="text-3xl font-bold">Jean-Marc Jones</p>
          <p className="text-indigo-300">React Native Developer</p>
        </div>

        <article className="prose max-w-none dark:prose-invert">
          <Outlet />
        </article>
      </div>
    </div>
  )
}
