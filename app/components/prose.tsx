import { type ReactNode } from 'react'

import { cn } from '~/utils/misc'

interface Props {
  className?: string
  children: ReactNode
}

export default function Prose({ className, children }: Props) {
  return (
    <article
      className={cn(
        'prose dark:prose-invert prose-a:text-emerald-600 prose-a:transition-colors hover:prose-a:text-emerald-800 dark:prose-a:text-indigo-300 dark:hover:prose-a:text-indigo-400',
        className
      )}
    >
      {children}
    </article>
  )
}
