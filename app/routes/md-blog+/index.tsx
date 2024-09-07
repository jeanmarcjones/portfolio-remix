import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import Post from '~/components/post'
import { getPosts } from '~/routes/md-blog+/posts.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blog' },
    { name: 'description', content: 'My technical blog' },
  ]
}

export async function loader() {
  const posts = await getPosts()
  return json({ posts })
}

// TODO Styling for no posts found

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div className="container py-6">
      <h1 className="text-5xl font-bold">Blog</h1>

      {posts.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => {
            return (
              <li
                key={`post-${post.slug}`}
                className="flex flex-col items-start gap-4 text-left"
              >
                <Post {...post} />
              </li>
            )
          })}
        </ul>
      ) : (
        <h3 className="text-xl">No posts found</h3>
      )}
    </div>
  )
}
