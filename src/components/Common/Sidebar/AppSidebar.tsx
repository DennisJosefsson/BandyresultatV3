import {
  DefaultSeasonSidebar,
  SeasonSidebar,
} from '@/components/Common/Sidebar/SeasonSidebar'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useGetFirstAndLastSeason } from '@/routes/_layout/seasons/$year/-hooks/useGetFirstAndLastSeason'

import { Link, useMatches, useSearch } from '@tanstack/react-router'
import {
  CalendarSearchIcon,
  InfoIcon,
  LayoutDashboardIcon,
  SearchIcon,
  ShieldUserIcon,
  TableOfContentsIcon,
} from 'lucide-react'
import { useState } from 'react'
import { MaratonSidebar } from './MaratonSidebar'
import { SearchSidebar } from './SeearchSidebar'
import { TeamSidebar } from './TeamSidebar'

const AppSidebar = () => {
  const women = useSearch({
    from: '__root__',
    select: (search) => search.women,
  })
  const seasonRoute = useMatches().some(
    (m) => m.routeId === '/_layout/seasons/$year',
  )

  const seasonListRoute = useMatches().some(
    (m) => m.routeId === '/_layout/seasons/',
  )

  const maratonRoute = useMatches().some((m) => m.routeId.includes('maraton'))
  const teamsRoute = useMatches().some((m) => m.routeId.includes('/teams'))
  const searchRoute = useMatches().some((m) => m.routeId.includes('/search'))
  const defaultOpen = maratonRoute
    ? 'maraton'
    : seasonRoute || seasonListRoute
      ? 'season'
      : teamsRoute
        ? 'teams'
        : null

  const [openCollapse, setOpenCollapse] = useState<
    'season' | 'maraton' | 'teams' | 'search' | null
  >(defaultOpen)

  const { lastSeason } = useGetFirstAndLastSeason()

  const openSeason = (fromLink: boolean) => {
    if (
      openCollapse === 'season' &&
      (seasonRoute || seasonListRoute) &&
      fromLink
    ) {
      return
    } else if (openCollapse === 'season' && (seasonRoute || seasonListRoute)) {
      setOpenCollapse(null)
    } else {
      setOpenCollapse('season')
    }
  }

  const openMaraton = (fromLink: boolean) => {
    if (openCollapse === 'maraton' && maratonRoute && fromLink) {
      return
    } else if (openCollapse === 'maraton' && maratonRoute) {
      setOpenCollapse(null)
    } else {
      setOpenCollapse('maraton')
    }
  }

  const openTeams = (fromLink: boolean) => {
    if (openCollapse === 'teams' && teamsRoute && fromLink) {
      return
    } else if (openCollapse === 'teams' && teamsRoute) {
      setOpenCollapse(null)
    } else {
      setOpenCollapse('teams')
    }
  }

  const openSearch = (fromLink: boolean) => {
    if (openCollapse === 'search' && searchRoute && fromLink) {
      return
    } else if (openCollapse === 'search' && searchRoute) {
      setOpenCollapse(null)
    } else {
      setOpenCollapse('search')
    }
  }

  return (
    <Sidebar
      className="font-poppins top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarMenu>
          <Collapsible
            open={openCollapse === 'season'}
            onOpenChange={() => openSeason(false)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/seasons"
                  search={{ women, page: 1 }}
                  className="text-foreground hover:text-foreground transition-colors"
                  onClick={() => openSeason(true)}
                  activeProps={{ className: `font-bold` }}
                >
                  <span>
                    <CalendarSearchIcon className="size-4" />
                  </span>
                  <span className="text-base">Säsonger</span>
                  <span></span>
                </Link>
              </SidebarMenuButton>

              {/* <CollapsibleTrigger asChild>
                <SidebarMenuAction>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuAction>
              </CollapsibleTrigger> */}

              <CollapsibleContent>
                {!seasonRoute && (
                  <DefaultSeasonSidebar
                    women={women}
                    group="elitserien"
                    year={lastSeason}
                  />
                )}
                {seasonRoute && <SeasonSidebar />}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <Collapsible
            open={openCollapse === 'teams'}
            onOpenChange={() => openTeams(false)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/teams"
                  search={{ women }}
                  className="text-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: `font-bold` }}
                  onClick={() => openTeams(true)}
                >
                  <span>
                    <ShieldUserIcon className="size-4" />
                  </span>
                  <span className="text-base">Lag</span>
                </Link>
              </SidebarMenuButton>
              {/* <CollapsibleTrigger asChild>
                <SidebarMenuAction>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuAction>
              </CollapsibleTrigger> */}
              <CollapsibleContent>
                <TeamSidebar />
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <Collapsible
            open={openCollapse === 'search'}
            onOpenChange={() => openSearch(false)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/search"
                  search={{ women }}
                  className="text-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: `font-bold` }}
                >
                  <span>
                    <SearchIcon className="size-4" />
                  </span>
                  <span className="text-base">Sök</span>
                </Link>
              </SidebarMenuButton>
              {/* <CollapsibleTrigger asChild>
                <SidebarMenuAction>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuAction>
              </CollapsibleTrigger> */}
              <CollapsibleContent>
                <SearchSidebar />
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <Collapsible
            open={openCollapse === 'maraton'}
            onOpenChange={() => openMaraton(false)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/maraton/table/$maratonTable"
                  params={{ maratonTable: 'all' }}
                  search={{ women }}
                  className="text-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: `font-bold` }}
                  onClick={() => openMaraton(true)}
                >
                  <span>
                    <TableOfContentsIcon className="size-4" />
                  </span>
                  <span className="text-base">Maratontabeller</span>
                </Link>
              </SidebarMenuButton>
              {/* <CollapsibleTrigger asChild>
                <SidebarMenuAction>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuAction>
              </CollapsibleTrigger> */}
              <CollapsibleContent>
                <MaratonSidebar />
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/about"
                search={{ women }}
                className="text-foreground hover:text-foreground transition-colors"
                activeProps={{ className: `font-bold` }}
              >
                <span>
                  <InfoIcon className="size-4" />
                </span>
                <span className="text-base">Om sidan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <SignedIn> */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/dashboard"
                search={{ women }}
                className="text-foreground hover:text-foreground transition-colors"
                activeProps={{ className: `font-bold` }}
              >
                <span>
                  <LayoutDashboardIcon className="size-4" />
                </span>
                <span className="text-base">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* </SignedIn> */}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
