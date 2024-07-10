import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blog' },
    { name: 'description', content: 'My technical blog' },
  ]
}

function Blog() {
  return (
    <div className="p-4 font-sans">
      <h1 className="text-3xl">Blog</h1>
      <br />

      <h2>Popular Posts</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <Link
            className="text-blue-700 underline visited:text-purple-900"
            to="blog/one"
          >
            Post One
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-700 underline visited:text-purple-900"
            to="blog/two"
          >
            Post Two
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-700 underline visited:text-purple-900"
            to="blog/three"
          >
            Post Three
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Blog
