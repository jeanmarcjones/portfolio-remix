import { Icons, navIconStyles } from '~/components/icons'
import MainNav from '~/components/main-nav'
import MobileNav from '~/components/mobile-nav'
import { Button } from '~/components/ui/button'
import ThemeSwitch from '~/routes/resources+/theme-switch'
import { Theme } from '~/utils/theme.server'

interface Props {
  theme?: Theme | null
}

export default function SiteHeader({ theme }: Props) {
  return (
    <header className="sticky top-0 border-b bg-background py-1">
      <div className="container flex items-center justify-between xl:max-w-screen-2xl 2xl:max-w-3xl">
        <MainNav />
        <MobileNav />

        <nav className="flex items-center gap-1">
          <ThemeSwitch userPreference={theme} />

          <Button asChild variant="ghost" size="icon">
            <a
              href="https://github.com/jeanmarcjones"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.gitHub className={navIconStyles} />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
