import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/base/ui/sidebar'
import ModeToggle from '@/components/Header/ModeToggle'
import { Show, UserButton } from '@clerk/react'
import { Link, useSearch } from '@tanstack/react-router'
import { User } from 'lucide-react'

const FooterForSidebar = () => {
  const women = useSearch({
    from: '__root__',
    select: (search) => search.women,
  })
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <ModeToggle />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Show when="signed-in">
            <SidebarMenuButton
              tooltip="Logga ut"
              render={
                <Link
                  to="/logout"
                  search={{ women }}
                >
                  <UserButton />

                  <span className="md:text-sm">
                    Logga ut
                  </span>
                </Link>
              }
            />
          </Show>

          <Show when="signed-out">
            <SidebarMenuButton
              tooltip="Inloggning"
              render={
                <Link
                  to="/login"
                  search={{ women }}
                >
                  <User />

                  <span className="md:text-sm">
                    Inloggning
                  </span>
                </Link>
              }
            />
          </Show>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export default FooterForSidebar
