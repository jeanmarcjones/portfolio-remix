import { Link } from '@remix-run/react'
import { ArrowLeft } from 'lucide-react'

import { GeneralErrorBoundary } from '~/components/error-boundary'

export async function loader() {
  throw new Response('Not found', { status: 404 })
}

export default function NotFound() {
  return <ErrorBoundary />
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <div className="prose flex flex-col gap-6 dark:prose-invert">
            <h1 className="mb-0">We can&apos;t find this post 😅</h1>
            <Link to="/md-blog" className="flex items-center text-lg underline">
              <ArrowLeft />
              <span>Back to posts</span>
            </Link>
          </div>
        ),
      }}
    />
  )
}
