import { Link } from '@remix-run/react'

import { type PostMeta } from '~/routes/md-blog+/posts.server'

export default function Post({ slug, frontmatter }: PostMeta) {
  return (
    <article className="prose space-y-2 dark:prose-invert">
      <Link
        to={`/md-blog/${slug}`}
        className="decoration-indigo-6 transition hover:decoration-indigo-8"
      >
        <h3 className="text-3xl font-bold">{frontmatter.title}</h3>
      </Link>
      <p className="font-medium">{frontmatter.description}</p>
    </article>
  )
}
