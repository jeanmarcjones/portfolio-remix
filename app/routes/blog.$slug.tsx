import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ArrowLeft } from 'lucide-react'

import { GeneralErrorBoundary } from '~/components/error-boundary'
import { prisma } from '~/utils/db.server'

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })

  invariantResponse(post, 'Post not found', { status: 404 })

  return json({ post })
}

export default function ReadPost() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <article className="container prose py-6 dark:prose-invert">
      <h1 className="bold mb-6 text-3xl capitalize">{post.title}</h1>

      <p className="whitespace-pre-wrap">{post.content}</p>
    </article>
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <div className="prose flex flex-col gap-6 dark:prose-invert">
            <h1 className="mb-0">We can&apos;t find this post 😅</h1>
            <Link to="/blog" className="flex items-center text-lg underline">
              <ArrowLeft />
              <span>Back to posts</span>
            </Link>
          </div>
        ),
      }}
    />
  )
}
