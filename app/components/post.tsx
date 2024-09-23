import { Link } from '@remix-run/react'
import { type ClassValue, clsx } from 'clsx'

import { type PostMeta } from '~/routes/blog+/posts.server'

const span = (classValue?: ClassValue): string =>
  clsx(
    'block transition',
    'group-hover:opacity-65 dark:group-hover:opacity-70',
    classValue
  )

export default function Post({ slug, frontmatter }: PostMeta) {
  return (
    <Link to={`/blog/${slug}`} className="group space-y-2">
      <span
        className={clsx(
          'h3 block text-3xl font-bold underline',
          'mb-2 mt-6 transition',
          'decoration-emerald-600 group-hover:decoration-emerald-800',
          'dark:decoration-indigo-400 dark:group-hover:decoration-indigo-500'
        )}
      >
        {frontmatter.title}
      </span>

      <span className={span('font-medium text-gray-600 dark:text-neutral-300')}>
        {frontmatter.description}
      </span>

      <time
        dateTime={frontmatter.published}
        className={span('text-sm text-emerald-600 dark:text-indigo-400')}
      >
        {frontmatter.published}
      </time>
    </Link>
  )
}
