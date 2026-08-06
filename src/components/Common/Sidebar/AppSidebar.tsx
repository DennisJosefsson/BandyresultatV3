import {
  DefaultSeasonSidebar,
  SeasonSidebar,
} from '@/components/Common/Sidebar/SeasonSidebar'
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/base/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/base/ui/sidebar'
import { useGetFirstAndLastSeason } from '@/routes/_layout/seasons/$year/-hooks/useGetFirstAndLastSeason'
import { Show } from '@clerk/react'
import {
  Link,
  useMatches,
  useSearch,
} from '@tanstack/react-router'
import {
  CalendarSearchIcon,
  InfoIcon,
  LayoutDashboardIcon,
  SearchIcon,
  ShieldUserIcon,
  TableOfContentsIcon,
} from 'lucide-react'
import FooterForSidebar from './FooterForSidebar'
import HeaderForSidebar from './HeaderForSidebar'
import { MaratonSidebar } from './MaratonSidebar'
import { SearchSidebar } from './SearchSidebar'
import { TeamSidebar } from './TeamSidebar'

const AppSidebar = () => {
  const women = useSearch({
    from: '__root__',
    select: (search) => search.women,
  })

  const { isMobile, setOpenMobile } = useSidebar()

  const sidebarSections = useMatches().map(
    (m) => m.context.sidebarSection,
  )

  const { lastSeason } = useGetFirstAndLastSeason()

  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar
      className="font-header font-medium top-(--header-height) h-[calc(100svh-var(--header-height))]! mt-2"
      collapsible="icon"
    >
      <HeaderForSidebar />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible
              open={sidebarSections.some(
                (s) => s === 'seasons',
              )}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Säsonger"
                  render={
                    <Link
                      to="/seasons"
                      search={{ women, page: 1 }}
                    >
                      <CalendarSearchIcon />

                      <span className="md:text-sm">
                        Säsonger
                      </span>
                    </Link>
                  }
                />

                <CollapsibleContent>
                  {sidebarSections.some(
                    (s) => s === 'year',
                  ) ? (
                    <SeasonSidebar />
                  ) : (
                    <DefaultSeasonSidebar
                      women={women}
                      group="elitserien"
                      year={lastSeason}
                    />
                  )}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <Collapsible
              open={sidebarSections.some(
                (s) => s === 'teams',
              )}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Laglista"
                  onClick={toggleOnMobile}
                  render={
                    <Link
                      to="/teams/list"
                      search={(prev) => ({
                        women,
                        teamArray: prev.teamArray
                          ? prev.teamArray
                          : undefined,
                      })}
                    >
                      <ShieldUserIcon />

                      <span className="md:text-sm">
                        Lag
                      </span>
                    </Link>
                  }
                />

                <CollapsibleContent>
                  <TeamSidebar />
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <Collapsible
              open={sidebarSections.some(
                (s) => s === 'search',
              )}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Sök"
                  onClick={toggleOnMobile}
                  render={
                    <Link
                      to="/search"
                      search={{ women }}
                      resetScroll={true}
                    >
                      <SearchIcon />

                      <span className="md:text-sm">
                        Sök
                      </span>
                    </Link>
                  }
                />

                <CollapsibleContent>
                  <SearchSidebar />
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible
              open={sidebarSections.some(
                (s) => s === 'maraton',
              )}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Maratontabeller"
                  onClick={toggleOnMobile}
                  render={
                    <Link
                      to="/maraton/table/$maratonTable"
                      params={{ maratonTable: 'all' }}
                      search={{ women }}
                    >
                      <TableOfContentsIcon />

                      <span className="md:text-sm">
                        Maratontabeller
                      </span>
                    </Link>
                  }
                />

                <CollapsibleContent>
                  <MaratonSidebar />
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Om sidan"
                onClick={toggleOnMobile}
                render={
                  <Link
                    to="/about"
                    search={{ women }}
                    activeProps={{
                      className: `underline underline-offset-auto`,
                    }}
                  >
                    <InfoIcon />

                    <span className="md:text-sm">
                      Om sidan
                    </span>
                  </Link>
                }
              />
            </SidebarMenuItem>
            <Show when="signed-in">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  onClick={toggleOnMobile}
                  render={
                    <Link
                      to="/dashboard"
                      search={{ women }}
                    >
                      <LayoutDashboardIcon />

                      <span className="md:text-sm">
                        Dashboard
                      </span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </Show>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <FooterForSidebar />
    </Sidebar>
  )
}

export default AppSidebar
