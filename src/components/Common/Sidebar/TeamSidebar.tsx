import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Link, useSearch } from '@tanstack/react-router'

export function TeamSidebar() {
  const women = useSearch({ from: '__root__', select: (s) => s.women })
  const { open } = useSidebar()

  if (!open) return null
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/teams"
            search={{ women }}
            activeOptions={{ includeSearch: false, exact: true }}
            activeProps={{ className: `font-bold` }}
          >
            <span>Laglista</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/teams/map"
            search={{ women }}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: `font-bold` }}
          >
            <span>Karta</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  )
}
