import { useHints } from '~/utils/client-hints'

export type Theme = 'light' | 'dark'

export function useTheme(): Theme {
  const hints = useHints()

  return hints.theme
}
