import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/base/ui/sidebar'
import {
  Link,
  getRouteApi,
  useMatches,
} from '@tanstack/react-router'

const singleTeamRoute = getRouteApi(
  '/_layout/teams/$teamId',
)

export function TeamSidebar() {
  const isSingleTeamRoute = useMatches()
    .map((s) => s.context.sidebarSection)
    .some((r) => r === 'singleTeam')
  const { open, isMobile, setOpenMobile } = useSidebar()
  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  if (!open) return null
  return (
    <>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton
            onClick={toggleOnMobile}
            render={
              <Link
                from="/teams"
                to="/teams"
                search={(prev) => ({ ...prev })}
                activeOptions={{
                  includeSearch: false,
                  exact: true,
                }}
                activeProps={{
                  className: `underline underline-offset-auto`,
                }}
              >
                <span className="md:text-sm">Laglista</span>
              </Link>
            }
          />
        </SidebarMenuSubItem>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton
            onClick={toggleOnMobile}
            render={
              <Link
                from="/teams"
                to="/teams/map"
                search={(prev) => ({ ...prev })}
                activeOptions={{ includeSearch: false }}
                activeProps={{
                  className: `underline underline-offset-auto`,
                }}
              >
                <span className="md:text-sm">Karta</span>
              </Link>
            }
          />
        </SidebarMenuSubItem>
      </SidebarMenuSub>
      {isSingleTeamRoute ? <SingleTeamSidebar /> : null}
    </>
  )
}

function SingleTeamSidebar() {
  const data = singleTeamRoute.useLoaderData()
  const { open, isMobile, setOpenMobile } = useSidebar()
  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  if (data.status === 404 || !open) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="truncate">
        {data.team.casualName}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <singleTeamRoute.Link
                  to="/teams/$teamId/tables"
                  params={{ teamId: data.team.teamId }}
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    className: `underline underline-offset-auto`,
                  }}
                >
                  <span className="truncate md:text-sm">
                    Tabeller
                  </span>
                </singleTeamRoute.Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <singleTeamRoute.Link
                  to="/teams/$teamId/latest"
                  params={{ teamId: data.team.teamId }}
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    className: `underline underline-offset-auto`,
                  }}
                >
                  <span className="xs:max-w-fit max-w-12 truncate md:text-sm">
                    5 senaste säsongerna
                  </span>
                </singleTeamRoute.Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <singleTeamRoute.Link
                  to="/teams/$teamId/seasons"
                  params={{ teamId: data.team.teamId }}
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    className: `underline underline-offset-auto`,
                  }}
                >
                  <span className="xs:max-w-fit max-w-12 truncate md:text-sm">
                    Alla säsonger
                  </span>
                </singleTeamRoute.Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <singleTeamRoute.Link
                  to="/teams/$teamId/stats"
                  params={{ teamId: data.team.teamId }}
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    className: `underline underline-offset-auto`,
                  }}
                >
                  <span className="truncate md:text-sm">
                    Statistik
                  </span>
                </singleTeamRoute.Link>
              }
            />
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
