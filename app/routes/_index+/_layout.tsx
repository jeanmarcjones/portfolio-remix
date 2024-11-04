import { Outlet } from '@remix-run/react'

import Prose from '~/components/prose'
import { Separator } from '~/components/ui/separator'

function Avatar() {
  return (
    <div className="mb-4 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-indigo-400 to-emerald-400 dark:from-emerald-600 dark:to-indigo-600">
      <img
        src="/img/avatar.png"
        alt="Avatar"
        className="w-24 -rotate-[7deg] object-contain"
      />
    </div>
  )
}

export default function AboutLayout() {
  return (
    <div className="container">
      <h1 className="h0 mb-2 ms-1 text-center max-lg:mt-4 max-md:my-3 lg:text-left">
        About
      </h1>
      <Separator className="mb-8" />

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
        <aside className="flex flex-col items-center gap-1 md:min-w-max">
          <Avatar />

          <h2 className="text-center text-xl md:text-2xl lg:text-3xl">
            Jean-Marc Jones
          </h2>

          <p className="text-center text-emerald-600 dark:text-indigo-400">
            Typescript Developer
          </p>
        </aside>

        <Prose className="max-w-none">
          <Outlet />
        </Prose>
      </div>
    </div>
  )
}
