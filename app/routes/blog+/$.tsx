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
          <div className="flex flex-col gap-6">
            <h1>We can&apos;t find this post 😅</h1>
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
