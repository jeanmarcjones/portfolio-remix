import { getHintUtils } from '@epic-web/client-hints'
import {
  clientHint as colorSchemeHint,
  subscribeToSchemeChange,
} from '@epic-web/client-hints/color-scheme'
import { useRevalidator } from '@remix-run/react'
import * as React from 'react'

import { useRequestInfo } from './request-info'

const hintsUtils = getHintUtils({
  theme: colorSchemeHint,
})

export const { getHints } = hintsUtils

export function useHints() {
  const requestInfo = useRequestInfo()
  return requestInfo.hints
}

// TODO implement CPS and add nonce to script

export function ClientHintCheck() {
  const { revalidate } = useRevalidator()
  React.useEffect(
    () => subscribeToSchemeChange(() => revalidate()),
    [revalidate]
  )

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: hintsUtils.getClientHintCheckScript(),
      }}
    />
  )
}
