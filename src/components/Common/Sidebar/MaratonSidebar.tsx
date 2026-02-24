import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Link, useSearch } from '@tanstack/react-router'

export function MaratonSidebar() {
  const women = useSearch({ from: '__root__', select: (s) => s.women })
  const { open } = useSidebar()

  if (!open) return null
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Tabeller</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/table/$maratonTable"
                  params={{
                    maratonTable: 'all',
                  }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Alla</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/table/$maratonTable"
                  params={{
                    maratonTable: 'home',
                  }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Hemma</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/table/$maratonTable"
                  params={{
                    maratonTable: 'away',
                  }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Borta</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Rekord</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/records/stats"
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Statistik</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/records/points"
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Poäng</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/records/scored"
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Gjorda mål</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/records/conceded"
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Insläppta mål</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/records/streaks"
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Rekordsviter</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Övrigt</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link
                  to="/maraton/help"
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>Hjälp</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
