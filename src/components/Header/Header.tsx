import { SidebarIcon } from 'lucide-react'
import { Button } from '../base/ui/button.tsx'
import { useSidebar } from '../base/ui/sidebar'
import { RouterBreadcrumb } from './Breadcrumb.tsx'
import ModeToggle from './ModeToggle'
import SwitchChoiceCard from './SwitchChoiceCard.tsx'

const Header = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="bg-primary-foreground sticky top-0 z-50 mb-2 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-0.5 xs:gap-2 xs:ml-2">
        <div className="flex flex-row items-center gap-0.5 xs:gap-2 leading-3 xxs:leading-4 xs:leading-5 msm:leading-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon className="size-[1lh]" />
          </Button>

          <RouterBreadcrumb />
        </div>
        <div className="flex flex-row items-center gap-1 xxs:gap-2 md:gap-6 mr-1 xs:mr-2 md:mr-4">
          <SwitchChoiceCard />

          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
