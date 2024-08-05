import * as cookie from 'cookie'

export type Theme = 'light' | 'dark'

const cookieName = 'co.jean-marc.theme'

export function getTheme(request: Request): Theme | null {
  const cookieHeader = request.headers.get('cookie')
  const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : 'light'

  if (parsed === 'light' || parsed === 'dark') return parsed

  return null
}

export function setTheme(theme: Theme | 'system') {
  if (theme === 'system')
    return cookie.serialize(cookieName, '', { path: '/', maxAge: -1 })

  return cookie.serialize(cookieName, theme, { path: '/', maxAge: 43_200_000 })
}
