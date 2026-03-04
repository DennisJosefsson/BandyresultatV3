import { Link, useSearch } from '@tanstack/react-router'

import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/base/ui/sidebar'

export function SearchSidebar() {
  const women = useSearch({
    from: '__root__',
    select: (s) => s.women,
  })
  const { open } = useSidebar()

  if (!open) return null
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          render={
            <Link
              to="/search"
              search={{ women }}
              activeOptions={{
                includeSearch: false,
                exact: true,
              }}
              activeProps={{ className: `font-bold` }}
            >
              <span>Sök</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          render={
            <Link
              to="/search/help"
              search={{ women }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span>Hjälp</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  )
}
