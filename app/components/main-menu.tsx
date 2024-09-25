import { NavLink } from '@remix-run/react'
import { clsx } from 'clsx'

const linkStyles = clsx(
  'rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors',
  'hover:text-bg-accent/80 hover:bg-accent hover:text-accent-foreground',
  'disabled:pointer-events-none disabled:opacity-50',
  'focus:bg-accent focus:text-accent-foreground focus:outline-none',
  'aria-active:bg-accent/50'
)

export default function MainMenu() {
  return (
    <div className="hidden md:flex">
      <nav className="flex items-center gap-2 text-sm">
        <NavLink to="/" className={linkStyles}>
          About
        </NavLink>

        <NavLink to="/blog" className={linkStyles}>
          Blog
        </NavLink>
      </nav>
    </div>
  )
}
