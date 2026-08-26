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
  useParams,
  useSearch,
} from '@tanstack/react-router'
import { useGetFirstAndLastSeason } from '../../../routes/_layout/seasons/$year/-hooks/useGetFirstAndLastSeason'

const route = getRouteApi('/_layout/seasons/$year')

export function SeasonSidebar() {
  const women = route.useSearch({
    select: (search) => search.women,
  })
  const { open, isMobile, setOpenMobile } = useSidebar()

  const { lastSeason } = useGetFirstAndLastSeason()
  const params = useParams({ strict: false })

  const data = route.useLoaderData()

  const sidebarSections = useMatches().map(
    (m) => m.context.sidebarSection,
  )

  const playoffRoute = sidebarSections.some(
    (r) => r === 'playoff',
  )

  const cupRoute = sidebarSections.some((r) => r === 'cup')

  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  if (data.status === 200) {
    if (!open) return null
    const groupFromData = data.groups[0].group

    const group = params.group ?? groupFromData
    const year = params.year ?? lastSeason
    return (
      <>
        <DefaultSeasonSidebar
          year={year}
          women={women}
          group={group}
        />
        {data.status === 200 ? (
          <SidebarGroup>
            <SidebarGroupLabel>Serier</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuSub>
                {data.groups.map((item) => {
                  return (
                    <SidebarMenuSubItem
                      key={item.serieId.toString()}
                    >
                      {playoffRoute || cupRoute ? (
                        <SidebarMenuSubButton
                          onClick={toggleOnMobile}
                          render={
                            <Link
                              title={item.name}
                              to="/seasons/$year/$group/tables/$table"
                              params={{
                                year,
                                group: item.group,
                                table: 'all',
                              }}
                              search={{
                                women: women,
                              }}
                            >
                              <span className="truncate md:text-sm">
                                {item.name}
                              </span>
                            </Link>
                          }
                        />
                      ) : (
                        <SidebarMenuSubButton
                          onClick={toggleOnMobile}
                          render={
                            <Link
                              title={item.name}
                              to="."
                              params={(prev) => ({
                                ...prev,
                                group: item.group,
                              })}
                              search={(prev) => ({
                                women: prev.women,
                              })}
                            >
                              <span className="truncate md:text-sm">
                                {item.name}
                              </span>
                            </Link>
                          }
                        />
                      )}
                    </SidebarMenuSubItem>
                  )
                })}
              </SidebarMenuSub>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
        {data.status === 200 && data.cups.length > 0 ? (
          <SidebarGroup>
            <SidebarGroupLabel>Cuper</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuSub>
                {data.cups.map((cup) => {
                  return (
                    <SidebarMenuSubItem
                      key={cup.competitionId.toString()}
                    >
                      <SidebarMenuSubButton
                        onClick={toggleOnMobile}
                        render={
                          <Link
                            title={cup.competitionName}
                            to="/seasons/$year/cup/$competitionName/games"
                            params={{
                              year,
                              competitionName:
                                cup.competitionName,
                            }}
                            search={{
                              women: women,
                            }}
                          >
                            <span className="truncate md:text-sm">
                              {cup.competitionName}
                            </span>
                          </Link>
                        }
                      />
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            onClick={toggleOnMobile}
                            render={
                              <Link
                                title="Slutspel"
                                to="/seasons/$year/cup/$competitionName/playoff"
                                params={{
                                  year,
                                  competitionName:
                                    cup.competitionName,
                                }}
                                search={{
                                  women: women,
                                }}
                              >
                                <span className="truncate md:text-sm">
                                  Slutspel
                                </span>
                              </Link>
                            }
                          />
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            onClick={toggleOnMobile}
                            render={
                              <Link
                                title="Tabeller"
                                to="/seasons/$year/cup/$competitionName/tables"
                                params={{
                                  year,
                                  competitionName:
                                    cup.competitionName,
                                }}
                                search={{
                                  women: women,
                                }}
                              >
                                <span className="truncate md:text-sm">
                                  Tabeller
                                </span>
                              </Link>
                            }
                          />
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            onClick={toggleOnMobile}
                            render={
                              <Link
                                title="Matcher"
                                to="/seasons/$year/cup/$competitionName/games"
                                params={{
                                  year,
                                  competitionName:
                                    cup.competitionName,
                                }}
                                search={{
                                  women: women,
                                }}
                              >
                                <span className="truncate md:text-sm">
                                  Matcher
                                </span>
                              </Link>
                            }
                          />
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuSubItem>
                  )
                })}
              </SidebarMenuSub>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </>
    )
  }

  if (data.status === 404 || data.status === 204) {
    return <PlayoffSidebar />
  }
}

export function DefaultSeasonSidebar({
  year,
  women,
  group,
}: {
  year: number
  women: boolean
  group: string
}) {
  const { open, isMobile, setOpenMobile } = useSidebar()
  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  if (!open) return null
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Grundserie</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                onClick={toggleOnMobile}
                render={
                  <Link
                    to="/seasons/$year/$group/tables/$table"
                    params={{
                      year,
                      group,
                      table: 'all',
                    }}
                    search={{ women }}
                    activeOptions={{ includeSearch: false }}
                    activeProps={{
                      className: `underline underline-offset-auto`,
                    }}
                  >
                    <span className="md:text-sm">
                      Tabell
                    </span>
                  </Link>
                }
              />

              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    onClick={toggleOnMobile}
                    render={
                      <Link
                        to="/seasons/$year/$group/tables/$table"
                        params={{
                          year: year,
                          group,
                          table: 'all',
                        }}
                        search={{ women }}
                        activeOptions={{
                          includeSearch: false,
                        }}
                        activeProps={{
                          className: `underline underline-offset-auto`,
                        }}
                      >
                        <span className="md:text-sm">
                          Alla
                        </span>
                      </Link>
                    }
                  />
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    onClick={toggleOnMobile}
                    render={
                      <Link
                        to="/seasons/$year/$group/tables/$table"
                        params={{
                          year,
                          group,
                          table: 'home',
                        }}
                        search={{ women }}
                        activeOptions={{
                          includeSearch: false,
                        }}
                        activeProps={{
                          className: `underline underline-offset-auto`,
                        }}
                      >
                        <span className="md:text-sm">
                          Hemma
                        </span>
                      </Link>
                    }
                  />
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    onClick={toggleOnMobile}
                    render={
                      <Link
                        to="/seasons/$year/$group/tables/$table"
                        params={{
                          year,
                          group,
                          table: 'away',
                        }}
                        search={{ women }}
                        activeOptions={{
                          includeSearch: false,
                        }}
                        activeProps={{
                          className: `underline underline-offset-auto`,
                        }}
                      >
                        <span className="md:text-sm">
                          Borta
                        </span>
                      </Link>
                    }
                  />
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                onClick={toggleOnMobile}
                render={
                  <Link
                    to="/seasons/$year/$group/games"
                    params={{ year, group }}
                    search={{ women }}
                    activeOptions={{ includeSearch: false }}
                    activeProps={{
                      className: `underline underline-offset-auto`,
                    }}
                  >
                    <span className="md:text-sm">
                      Matcher
                    </span>
                  </Link>
                }
              />
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                onClick={toggleOnMobile}
                render={
                  <Link
                    to="/seasons/$year/$group/development"
                    params={{ year, group }}
                    search={{ women, index: 0 }}
                    activeOptions={{ includeSearch: false }}
                    activeProps={{
                      className: `underline underline-offset-auto`,
                    }}
                  >
                    <span className="md:text-sm">
                      Utveckling
                    </span>
                  </Link>
                }
              />
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                onClick={toggleOnMobile}
                render={
                  <Link
                    to="/seasons/$year/$group/interval"
                    params={{ year, group }}
                    search={{ women, start: 0 }}
                    activeOptions={{ includeSearch: false }}
                    activeProps={{
                      className: `underline underline-offset-auto`,
                    }}
                  >
                    <span className="md:text-sm">
                      Intervall
                    </span>
                  </Link>
                }
              />
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                onClick={toggleOnMobile}
                render={
                  <Link
                    to="/seasons/$year/$group/stats"
                    params={{ year, group }}
                    search={{ women }}
                    activeOptions={{ includeSearch: false }}
                    activeProps={{
                      className: `underline underline-offset-auto`,
                    }}
                  >
                    <span className="md:text-sm">
                      Statistik
                    </span>
                  </Link>
                }
              />
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                onClick={toggleOnMobile}
                render={
                  <Link
                    to="/seasons/$year/$group/map"
                    params={{ year, group }}
                    search={{ women }}
                    activeOptions={{ includeSearch: false }}
                    activeProps={{
                      className: `underline underline-offset-auto`,
                    }}
                  >
                    <span className="md:text-sm">
                      Karta
                    </span>
                  </Link>
                }
              />
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarGroupContent>
      </SidebarGroup>

      <PlayoffSidebar />
    </>
  )
}

function PlayoffSidebar() {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const { open, isMobile, setOpenMobile } = useSidebar()

  const { lastSeason } = useGetFirstAndLastSeason()
  const params = useParams({ strict: false })
  const year = params.year ?? lastSeason
  const toggleOnMobile = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  if (!open) return null
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Slutspel</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/playoff/table"
                  params={{ year }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{
                    className: `underline underline-offset-auto`,
                  }}
                >
                  <span className="md:text-sm">Tabell</span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/playoff/games"
                  params={{ year }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{
                    className: `underline underline-offset-auto`,
                  }}
                >
                  <span className="md:text-sm">
                    Matcher
                  </span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/playoff/stats"
                  params={{ year }}
                  search={{ women }}
                  activeOptions={{ includeSearch: false }}
                  activeProps={{
                    className: `underline underline-offset-auto`,
                  }}
                >
                  <span className="md:text-sm">
                    Statistik
                  </span>
                </Link>
              }
            />
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              onClick={toggleOnMobile}
              render={
                <Link
                  to="/seasons/$year/playoff/map"
                  params={{ year }}
                  search={{ women }}
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
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
