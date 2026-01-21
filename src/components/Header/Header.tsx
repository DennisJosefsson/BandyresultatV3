import { useRouter, useSearch } from '@tanstack/react-router'
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
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger />

      <div className="mr-2 flex flex-row items-center gap-6">
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
