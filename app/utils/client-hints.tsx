import { getHintUtils } from '@epic-web/client-hints'
import {
  clientHint as colorSchemeHint,
  subscribeToSchemeChange,
} from '@epic-web/client-hints/color-scheme'
import { useRevalidator } from '@remix-run/react'
import { useEffect } from 'react'

import { useRequestInfo } from './request-info'

const hintsUtils = getHintUtils({
  theme: colorSchemeHint,
})

export const { getHints } = hintsUtils

/**
 * @returns An object with the client hints and their values.
 */
export function useHints() {
  const requestInfo = useRequestInfo()
  return requestInfo.hints
}

/**
 * @returns Inline script element that checks for client hints and sets cookies
 * if they aren't set. If any cookie was set to an inaccurate value the page is
 * reloaded.
 */
export function ClientHintCheck({ nonce }: { nonce: string }) {
  const { revalidate } = useRevalidator()
  useEffect(() => subscribeToSchemeChange(() => revalidate()), [revalidate])

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: hintsUtils.getClientHintCheckScript(),
      }}
    />
  )
}
