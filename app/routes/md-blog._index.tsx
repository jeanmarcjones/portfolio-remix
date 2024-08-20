import { json, type MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { prisma } from '~/utils/db.server'
import { truncate } from '~/utils/text'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blog' },
    { name: 'description', content: 'My technical blog' },
  ]
}

export async function loader() {
  const posts = await prisma.post.findMany()

  return json({ posts })
}

// TODO Show list of posts from the routes md{x} files

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div className="container prose py-6 dark:prose-invert">
      <h1>Blog</h1>

      <div className="flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post) => {
            const content = truncate(post.content)

            return (
              <Link
                key={`post-${post.id}`}
                className="not-prose flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                to={post.slug}
              >
                <div className="text-xl font-semibold">{post.title}</div>
                <div className="text-m">{content}</div>
              </Link>
            )
          })
        ) : (
          <div className="text-xl">No posts found</div>
        )}
      </div>
    </div>
  )
}
