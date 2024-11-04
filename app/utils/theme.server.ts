import * as cookie from 'cookie'

export type Theme = 'light' | 'dark'

export const cookieName = 'co.jean-marc.theme'

/**
 * @description Retrieves the users theme preference from the current request's
 * cookie header.
 */
export function getTheme(request: Request): Theme | null {
  const cookieHeader = request.headers.get('cookie')
  const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : 'light'

  if (parsed === 'light' || parsed === 'dark') return parsed

  return null
}

/**
 * @description Generates a set cookie header string based of the user's theme
 * preference.
 */
export function setTheme(theme: Theme | 'system'): string {
  if (theme === 'system')
    return cookie.serialize(cookieName, '', { path: '/', maxAge: -1 })

  return cookie.serialize(cookieName, theme, { path: '/', maxAge: 43_200_000 })
}
