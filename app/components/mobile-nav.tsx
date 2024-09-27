import { Link, NavLink, type NavLinkProps } from '@remix-run/react'
import { clsx } from 'clsx'
import { EllipsisVertical } from 'lucide-react'
import { type RefAttributes, useState } from 'react'

import { Icons } from '~/components/icons'
import { Button } from '~/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <EllipsisVertical />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <Link to="/">
          <Icons.logo className="m-auto my-12 h-12 w-12" />
        </Link>

        <nav className="flex flex-col gap-7">
          <MobileLink to="/" onClick={close}>
            About
          </MobileLink>

          <MobileLink to="/blog" onClick={close}>
            Blog
          </MobileLink>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function MobileLink({
  className,
  children,
  ...props
}: NavLinkProps & RefAttributes<HTMLAnchorElement>) {
  return (
    <NavLink className={clsx('text-2xl', className)} {...props}>
      {children}
    </NavLink>
  )
}
