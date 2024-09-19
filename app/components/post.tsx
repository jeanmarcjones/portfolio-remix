import { Link } from '@remix-run/react'

import { type PostMeta } from '~/routes/blog+/posts.server'

export default function Post({ slug, frontmatter }: PostMeta) {
  return (
    <article className="space-y-2">
      <Link
        to={`/blog/${slug}`}
        className="underline decoration-indigo-500 transition hover:decoration-indigo-700"
      >
        <h3 className="mb-2 mt-6 text-3xl font-bold">{frontmatter.title}</h3>
      </Link>
      <p className="font-medium">{frontmatter.description}</p>
    </article>
  )
}
