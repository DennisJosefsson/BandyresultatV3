import { Link, useSearch } from '@tanstack/react-router'

import ClerkHeader from '../../integrations/clerk/header-user.tsx'

import { Menu } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@clerk/clerk-react'
import { useMediaQuery } from 'usehooks-ts'
import ModeToggle from './ModeToggle'

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  const women = useSearch({
    from: '__root__',
    select: (search) => search.women,
  })
  const matches = useMediaQuery('(min-width: 430px)')
  const { orgRole } = useAuth()
  const isAdmin = orgRole === 'org:admin'

  return (
    <header className="sticky top-0 z-1 mb-4 flex h-16 flex-row items-center justify-between gap-4 border-b bg-background px-2 font-poppins text-foreground dark:bg-slate-950 dark:text-slate-50 md:px-6">
      <div className="flex flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-sm xs:text-base font-bold uppercase -[0.2rem] text-primary md:text-2xl lg:text-4xl xl:pl-0 2xl:text-5xl">
            <Link to="/" search={{ women }}>
              Bandyresultat
            </Link>
          </h1>
        </div>
        <div>
          <nav className="flex-col hidden gap-6 text-lg font-semibold tracking-wider lg:flex lg:flex-row lg:items-center lg:gap-6 lg:text-base 2xl:text-lg lg:ml-20 xl:ml-40">
            <Link
              to="/seasons"
              search={{ women, page: 1 }}
              className="transition-colors text-foreground hover:text-foreground"
            >
              Säsonger
            </Link>
            <Link
              to="/teams"
              search={{ women }}
              className="transition-colors text-foreground hover:text-foreground"
            >
              Lag
            </Link>
            <Link
              to="/search"
              search={{ women }}
              className="transition-colors text-foreground hover:text-foreground"
            >
              Sök
            </Link>
            <Link
              to="/maraton"
              search={{ women }}
              className="transition-colors text-foreground hover:text-foreground"
            >
              Maratontabeller
            </Link>
            {isAdmin && (
              <Link
                to="/dashboard"
                search={{ women }}
                className="transition-colors text-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
            )}

            <Link
              to="/about"
              search={{ women }}
              className="transition-colors text-foreground hover:text-foreground"
            >
              Om sidan
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size={matches ? 'icon' : 'smallicon'}
              className="shrink-0 lg:hidden"
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Öppnar och stänger menyn.</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="grid gap-6 text-lg font-semibold tracking-wider">
              <Link
                to="/"
                search={{ women }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Hem
              </Link>

              <Link
                to="/seasons"
                search={{ women, page: 1 }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Säsonger
              </Link>
              <Link
                to="/teams"
                search={{ women }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Lag
              </Link>
              <Link
                to="/search"
                search={{ women }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Sök
              </Link>
              <Link
                to="/maraton"
                search={{ women }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Maratontabeller
              </Link>
              {isAdmin && (
                <Link
                  to="/dashboard"
                  search={{ women }}
                  className="hover:text-foreground"
                  onClick={() => (open ? setOpen(false) : setOpen(true))}
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/about"
                search={{ women }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Om sidan
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <ClerkHeader />
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
