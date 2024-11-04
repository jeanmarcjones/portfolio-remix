import { Link, NavLink } from '@remix-run/react'

import { Icons } from '~/components/icons'

const navigationLinkItems = [
  { title: 'about', url: '/' },
  { title: 'Blog', url: '/blog' },
] as const

export default function MainNav() {
  return (
    <div className="hidden items-center gap-4 md:flex lg:gap-5 2xl:gap-7">
      <Link to="/">
        <Icons.logo className="h-6 w-6 2xl:h-8 2xl:w-8" />
      </Link>

      <nav className="flex items-center gap-2 text-sm">
        {navigationLinkItems.map((link) => (
          <NavLink
            key={`nav-link-${link.title}`}
            to={link.url}
            className="hover:text-bg-accent/80 rounded-md bg-background px-4 py-2 text-sm font-medium capitalize transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 aria-active:bg-accent/50"
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
