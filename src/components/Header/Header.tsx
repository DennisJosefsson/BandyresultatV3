import {
  useRouter,
  useSearch,
} from '@tanstack/react-router'
import { SidebarIcon } from 'lucide-react'

import { Button } from '../base/ui/button.tsx'
import { Label } from '../base/ui/label'
import { Switch } from '../base/ui/switch'
import { useSidebar } from '../ui/sidebar'
import { RouterBreadcrumb } from './Breadcrumb.tsx'
import ModeToggle from './ModeToggle'

const Header = () => {
  const { toggleSidebar } = useSidebar()
  const navigate = useRouter().navigate
  const women = useSearch({
    from: '__root__',
    select: (search) => search.women,
  })
  // const matches = useMediaQuery('(min-width: 430px)')
  // const { isLoaded } = useAuth()

  const updateWomen = () => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        women: !prev.women,
        teamId: undefined,
        opponentId: undefined,
      }),
    })
  }

  return (
    <header className="bg-primary-foreground sticky top-0 z-50 flex w-full items-center border-b mb-2">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-4">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </Button>
          <RouterBreadcrumb />
        </div>
        <div className="mr-2 flex flex-row items-center gap-6">
          <div className="flex w-full items-center space-x-2">
            <Switch
              id="women"
              defaultChecked={women}
              checked={women}
              onCheckedChange={updateWomen}
            />
            <Label htmlFor="women">
              {women ? 'Herrar' : 'Damer'}
            </Label>
          </div>
          <div className="mx-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
