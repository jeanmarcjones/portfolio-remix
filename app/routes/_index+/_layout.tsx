import { Outlet } from '@remix-run/react'

import { Separator } from '~/components/ui/separator'
import { prose } from '~/utils/misc'

export default function AboutLayout() {
  return (
    <div className="container">
      <h1 className="h0 mb-2 ms-1">About</h1>
      <Separator className="mb-8" />

      <div className="flex flex-row gap-[5rem]">
        <div className="flex min-w-max flex-col items-center gap-1">
          <p className="text-3xl font-bold">Jean-Marc Jones</p>

          <p className="text-emerald-700 dark:text-indigo-400">
            Typescript Developer
          </p>
        </div>

        <article className={prose('max-w-none')}>
          <Outlet />
        </article>
      </div>
    </div>
  )
}
