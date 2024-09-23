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
  const { pathname } = useLocation()

  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <div className="flex flex-col gap-6">
            <h1>We can&apos;t find this page 😅</h1>
            <pre className="text-body-lg whitespace-pre-wrap break-all">
              {pathname}
            </pre>
            <Link to="/" className="flex items-center text-lg underline">
              <ArrowLeft />
              <span>Back to home</span>
            </Link>
          </div>
        ),
      }}
    />
  )
}
