import { Link, useLocation } from '@remix-run/react'
import { ArrowLeft } from 'lucide-react'

import { GeneralErrorBoundary } from '~/components/error-boundary'

export async function loader() {
  throw new Response('Not found', { status: 404 })
}

export default function NotFound() {
  return <ErrorBoundary />
}

export function ErrorBoundary() {
  const location = useLocation()

  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <div className="prose flex flex-col gap-6 dark:prose-invert">
            <h1 className="mb-0">We can&apos;t find this page:</h1>
            <pre className="text-body-lg not-prose whitespace-pre-wrap break-all">
              {location.pathname}
            </pre>
            <Link to="/" className="text-body-md flex items-center underline">
              <ArrowLeft />
              <span>Back to home</span>
            </Link>
          </div>
        ),
      }}
    />
  )
}
