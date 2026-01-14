import { Link, useRouter, useSearch } from '@tanstack/react-router'
import { Label } from '../ui/label'
import { SidebarTrigger } from '../ui/sidebar'
import { Switch } from '../ui/switch'

import ClerkHeader from '../../integrations/clerk/header-user.tsx'

import { LoaderPinwheelIcon } from 'lucide-react'
// import { useState } from 'react'

// import { Button } from '@/components/ui/button'
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@clerk/clerk-react'
import { useMediaQuery } from 'usehooks-ts'
import { Button } from '../ui/button.tsx'
import ModeToggle from './ModeToggle'

const Header = () => {
  // const [open, setOpen] = useState<boolean>(false)
  const navigate = useRouter().navigate
  const women = useSearch({
    from: '__root__',
    select: (search) => search.women,
  })
  const matches = useMediaQuery('(min-width: 430px)')
  const { isLoaded } = useAuth()
  // const isAdmin = orgRole === 'org:admin'

  const updateWomen = () => {
    navigate({ to: '.', search: (prev) => ({ ...prev, women: !prev.women }) })
  }

  return (
    <header className="bg-background font-poppins text-foreground sticky top-0 z-1 mb-4 flex h-12 flex-row items-center justify-between gap-4 border-b px-2 md:px-6 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex flex-row items-center justify-between gap-8">
        <SidebarTrigger />
        <div>
          <h1 className="xs:text-base -[0.2rem] text-primary text-sm font-bold uppercase md:text-2xl xl:pl-0 2xl:text-5xl">
            <Link to="/" search={{ women }}>
              Bandyresultat
            </Link>
          </h1>
        </div>

        {/* <div>
          <nav className="hidden flex-col gap-6 text-lg font-semibold tracking-wider lg:ml-20 lg:flex lg:flex-row lg:items-center lg:gap-6 lg:text-base xl:ml-40 2xl:text-lg">
            <Link
              to="/seasons"
              search={{ women, page: 1 }}
              className="text-foreground hover:text-foreground transition-colors"
            >
              Säsonger
            </Link>
            <Link
              to="/teams"
              search={{ women }}
              className="text-foreground hover:text-foreground transition-colors"
            >
              Lag
            </Link>
            <Link
              to="/search"
              search={{ women }}
              className="text-foreground hover:text-foreground transition-colors"
            >
              Sök
            </Link>
            <Link
              to="/maraton"
              search={{ women }}
              className="text-foreground hover:text-foreground transition-colors"
            >
              Maratontabeller
            </Link>
            {isAdmin && (
              <Link
                to="/dashboard"
                search={{ women }}
                className="text-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            )}

            <Link
              to="/about"
              search={{ women }}
              className="text-foreground hover:text-foreground transition-colors"
            >
              Om sidan
            </Link>
          </nav>
        </div> */}
      </div>
      <div className="flex flex-row items-center gap-6">
        {/* <div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size={matches ? 'icon' : 'smallicon'}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Öppnar och stänger menyn.</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="mt-12 grid justify-items-center gap-6 text-lg font-semibold tracking-wider">
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
        </div> */}
        <div className="flex w-full items-center space-x-2">
          <Switch
            id="women"
            defaultChecked={women}
            checked={women}
            onCheckedChange={updateWomen}
          />
          <Label htmlFor="women">{women ? 'Herrar' : 'Damer'}</Label>
        </div>
        {isLoaded && (
          <>
            <ClerkHeader />
            <div>
              <ModeToggle />
            </div>
          </>
        )}
        {!isLoaded && (
          <div>
            <Button variant="outline" size={matches ? 'icon' : 'smallicon'}>
              <LoaderPinwheelIcon className="size-[1.2rem] animate-spin" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
