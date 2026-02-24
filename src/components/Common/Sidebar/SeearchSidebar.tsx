import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Link, useSearch } from '@tanstack/react-router'

export function SearchSidebar() {
  const women = useSearch({ from: '__root__', select: (s) => s.women })
  const { open } = useSidebar()

  if (!open) return null
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/search"
            search={{ women }}
            activeOptions={{ includeSearch: false, exact: true }}
            activeProps={{ className: `font-bold` }}
          >
            <span>Sök</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link
            to="/search/help"
            search={{ women }}
            activeOptions={{ includeSearch: false }}
            activeProps={{ className: `font-bold` }}
          >
            <span>Hjälp</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  )
}
