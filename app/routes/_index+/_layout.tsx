import { Outlet } from '@remix-run/react'

import { Separator } from '~/components/ui/separator'
import { prose } from '~/utils/misc'

export default function AboutLayout() {
  return (
    <div className="container">
      <h1 className="h0 mb-2 ms-1 text-center max-lg:mt-4 max-md:my-3 lg:text-left">
        About
      </h1>
      <Separator className="mb-8" />

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        <section className="flex min-w-max flex-col items-center gap-1">
          <h2 className="text-3xl">Jean-Marc Jones</h2>

          <p className="text-emerald-700 dark:text-indigo-400">
            Typescript Developer
          </p>
        </section>

        <article className={prose('max-w-none')}>
          <Outlet />
        </article>
      </div>
    </div>
  )
}
