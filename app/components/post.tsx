import { Link } from '@remix-run/react'

import { type PostMeta } from '~/routes/blog+/posts.server'

export default function Post({ slug, frontmatter }: PostMeta) {
  return (
    <Link to={`/blog/${slug}`} className="group space-y-2">
      <span className="h3 mb-2 mt-6 block text-3xl font-bold underline decoration-emerald-600 transition group-hover:decoration-emerald-800 dark:decoration-indigo-400 dark:group-hover:decoration-indigo-500">
        {frontmatter.title}
      </span>

      <span className="block font-medium text-gray-600 transition group-hover:opacity-65 dark:text-neutral-300 dark:group-hover:opacity-70">
        {frontmatter.description}
      </span>

      <time
        dateTime={frontmatter.published}
        className="block text-sm text-emerald-600 transition group-hover:opacity-65 dark:text-indigo-400 dark:group-hover:opacity-70"
      >
        {frontmatter.published}
      </time>
    </Link>
  )
}
