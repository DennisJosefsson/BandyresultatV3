import { SidebarIcon } from 'lucide-react'
import { Button } from '../base/ui/button.tsx'
import { useSidebar } from '../base/ui/sidebar'
import { RouterBreadcrumb } from './Breadcrumb.tsx'

const Header = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="font-header bg-primary-foreground sticky top-0 z-50 mb-1 flex w-full items-center border-b md:mb-2">
      <div className="xs:gap-2 ml-2 md:ml-4 flex h-(--header-height) w-full items-center justify-between gap-0.5">
        <div className="xs:gap-2 flex flex-row items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </Button>

          <RouterBreadcrumb />
        </div>
      </div>
    </header>
  )
}

export default Header
