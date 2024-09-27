import { Outlet } from '@remix-run/react'
import { clsx } from 'clsx'

import { Separator } from '~/components/ui/separator'
import { prose } from '~/utils/misc'

export default function AboutLayout() {
  return (
    <div className="container">
      <h1 className="h0 mb-2 ms-1 text-center max-lg:mt-4 max-md:my-3 lg:text-left">
        About
      </h1>
      <Separator className="mb-8" />

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
        <aside className="flex flex-col items-center gap-1 md:min-w-max">
          <div
            className={clsx(
              'mb-4 h-36 w-36 rounded-full',
              'flex items-center justify-center',
              'bg-gradient-to-b from-indigo-400 to-emerald-400 dark:from-emerald-600 dark:to-indigo-600'
            )}
          >
            <img
              src="/img/avatar.png"
              alt="Avatar"
              className="w-24 -rotate-[7deg] object-contain"
            />
          </div>

          <h2 className="text-center text-xl md:text-2xl lg:text-3xl">
            Jean-Marc Jones
          </h2>

          <p className="text-center text-emerald-600 dark:text-indigo-400">
            Typescript Developer
          </p>
        </aside>

        <article className={prose('max-w-none')}>
          <Outlet />
        </article>
      </div>
    </div>
  )
}
