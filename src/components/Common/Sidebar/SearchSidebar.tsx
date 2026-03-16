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
  const { open, isMobile, setOpenMobile } = useSidebar()

  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  if (!open) return null
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
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
              <span className="md:text-sm">Sök</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          onClick={toggleOnMobile}
          render={
            <Link
              to="/search/help"
              search={{ women }}
              activeOptions={{ includeSearch: false }}
              activeProps={{ className: `font-bold` }}
            >
              <span className="md:text-sm">Hjälp</span>
            </Link>
          }
        />
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  )
}
