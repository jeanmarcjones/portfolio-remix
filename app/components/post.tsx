import { Link } from '@remix-run/react'
import { clsx } from 'clsx'

import { type PostMeta } from '~/routes/blog+/posts.server'

export default function Post({ slug, frontmatter }: PostMeta) {
  return (
    <article className="space-y-2">
      <Link
        to={`/blog/${slug}`}
        className={clsx(
          'underline transition',
          'decoration-emerald-600 hover:decoration-emerald-800',
          'dark:decoration-indigo-400 dark:hover:decoration-indigo-500'
        )}
      >
        <h3 className="mb-2 mt-6 text-3xl font-bold">{frontmatter.title}</h3>
      </Link>
      <p className="font-medium">{frontmatter.description}</p>
    </article>
  )
}
