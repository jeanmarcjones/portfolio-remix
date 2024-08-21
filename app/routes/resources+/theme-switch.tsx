import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useFetchers } from '@remix-run/react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useHints } from '~/utils/client-hints'
import { useRequestInfo } from '~/utils/request-info'
import { setTheme, type Theme } from '~/utils/theme.server'

const ThemeFormSchema = z.object({
  theme: z.enum(['system', 'light', 'dark']),
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema,
  })

  invariantResponse(submission.status === 'success', 'Invalid theme received')

  const { theme } = submission.value

  const responseInit = {
    headers: { 'set-cookie': setTheme(theme) },
  }
  return json({ result: submission.reply() }, responseInit)
}

export default function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null
}) {
  const fetcher = useFetcher<typeof action>()

  const [form] = useForm({
    id: 'theme-switch',
    lastResult: fetcher.data?.result,
  })

  const optimisticMode = useOptimisticThemeMode()
  const mode = optimisticMode ?? userPreference ?? 'system'
  const modeIcon = {
    light: <Sun />,
    dark: <Moon />,
    system: <Monitor />,
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full drop-shadow"
          color="red"
        >
          {modeIcon[mode]}
          <span className="sr-only">open theme selection menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <fetcher.Form
          method="POST"
          {...getFormProps(form)}
          action="/resources/theme-switch"
        >
          <DropdownMenuItem>
            <Button type="submit" variant="ghost" name="theme" value="light">
              <Sun className="mr-3 h-4 w-4" />
              <span>Light</span>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Button type="submit" variant="ghost" name="theme" value="dark">
              <Moon className="mr-3 h-4 w-4" />
              <span>Dark</span>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Button type="submit" variant="ghost" name="theme" value="system">
              <Monitor className="mr-3 h-4 w-4" />
              <span>System</span>
            </Button>
          </DropdownMenuItem>
        </fetcher.Form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * @description If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
  const fetchers = useFetchers()
  const themeFetcher = fetchers.find((f) => f.formAction === '/theme-switch')

  if (!themeFetcher?.formData) return

  const submission = parseWithZod(themeFetcher.formData, {
    schema: ThemeFormSchema,
  })

  if (submission.status === 'success') {
    return submission.value.theme
  }
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
  const optimisticMode = useOptimisticThemeMode()
  const requestInfo = useRequestInfo()
  const hints = useHints()

  if (optimisticMode) {
    return optimisticMode === 'system' ? hints.theme : optimisticMode
  }

  return requestInfo.userPerfs.theme ?? hints.theme
}
