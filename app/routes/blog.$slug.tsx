import { invariantResponse } from '@epic-web/invariant'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { prisma } from '~/utils/db.server'

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })

  invariantResponse(post, 'Post not found', { status: 404 })

  return json({ post })
}

export default function ReadPost() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <article className="prose px-7 py-4 dark:prose-invert">
      <h1 className="bold mb-6 text-3xl capitalize">{post.title}</h1>

      <p className="whitespace-pre-wrap">{post.content}</p>
    </article>
  )
}
