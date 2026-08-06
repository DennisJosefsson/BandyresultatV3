import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/base/ui/menubar'
import { useSidebar } from '@/components/base/ui/sidebar'
import {
  Link,
  getRouteApi,
  useLoaderData,
} from '@tanstack/react-router'

const route = getRouteApi('/_layout/seasons/$year/$group')

const GroupMenubar = () => {
  const data = useLoaderData({
    from: '/_layout/seasons/$year',
  })

  const { open, isMobile } = useSidebar()

  if (data.status === 404) return null

  return (
    <div className="mb-2">
      {isMobile || !open ? (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="sm:text-sm">
              Grundserie
            </MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/$group/games"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Matcher
                  </route.Link>
                </MenubarItem>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/$group/tables/$table"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                      table: 'all',
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Tabeller
                  </route.Link>
                </MenubarItem>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/$group/development"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                      index: 0,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Utveckling
                  </route.Link>
                </MenubarItem>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/$group/interval"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                      start: 0,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Intervall
                  </route.Link>
                </MenubarItem>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/$group/stats"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Statistik
                  </route.Link>
                </MenubarItem>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/$group/map"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Karta
                  </route.Link>
                </MenubarItem>
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="sm:text-sm">
              Slutspel
            </MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/playoff/games"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Matcher
                  </route.Link>
                </MenubarItem>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/playoff/table"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                      table: 'all',
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Slutspelsträd
                  </route.Link>
                </MenubarItem>

                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/playoff/stats"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Statistik
                  </route.Link>
                </MenubarItem>
                <MenubarItem>
                  <route.Link
                    to="/seasons/$year/playoff/map"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{
                      'data-state': 'active',
                    }}
                    className="sm:text-sm"
                  >
                    Karta
                  </route.Link>
                </MenubarItem>
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
          {data.status === 200 ? (
            <MenubarMenu>
              <MenubarTrigger className="sm:text-sm">
                Serier
              </MenubarTrigger>
              <MenubarContent>
                {data.groups.map((group) => {
                  return (
                    <MenubarItem key={group.group}>
                      <Link
                        to="."
                        search={(prev) => ({
                          ...prev,
                          start: prev.start ? 0 : undefined,
                          end: undefined,
                          index: prev.index ? 0 : undefined,
                        })}
                        params={{ group: group.group }}
                        className="sm:text-sm"
                      >
                        {group.name}
                      </Link>
                    </MenubarItem>
                  )
                })}
              </MenubarContent>
            </MenubarMenu>
          ) : null}
        </Menubar>
      ) : null}
      {/* {open ? null : (
        <>
          <Menubar className="lg:hidden">
            <MenubarMenu>
              <MenubarTrigger className="sm:text-sm">
                Grundserie
              </MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/$group/games"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Matcher
                    </route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/$group/tables/$table"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                        table: 'all',
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Tabeller
                    </route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/$group/development"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                        index: 0,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Utveckling
                    </route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/$group/interval"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                        start: 0,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Intervall
                    </route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/$group/stats"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Statistik
                    </route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/$group/map"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Karta
                    </route.Link>
                  </MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="sm:text-sm">
                Slutspel
              </MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/playoff/games"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Matcher
                    </route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/playoff/table"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                        table: 'all',
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Slutspelsträd
                    </route.Link>
                  </MenubarItem>

                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/playoff/stats"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Statistik
                    </route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <route.Link
                      to="/seasons/$year/playoff/map"
                      params={(prev) => ({
                        year: prev.year,
                        group: prev.group,
                      })}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                      activeProps={{
                        'data-state': 'active',
                      }}
                      className="sm:text-sm"
                    >
                      Karta
                    </route.Link>
                  </MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
            {data.status === 200 ? (
              <MenubarMenu>
                <MenubarTrigger className="sm:text-sm">
                  Serier
                </MenubarTrigger>
                <MenubarContent>
                  {data.groups.map((group) => {
                    return (
                      <MenubarItem key={group.group}>
                        <Link
                          to="."
                          search={(prev) => ({
                            ...prev,
                            start: prev.start
                              ? 0
                              : undefined,
                            end: undefined,
                            index: prev.index
                              ? 0
                              : undefined,
                          })}
                          params={{ group: group.group }}
                          className="sm:text-sm"
                        >
                          {group.name}
                        </Link>
                      </MenubarItem>
                    )
                  })}
                </MenubarContent>
              </MenubarMenu>
            ) : null}
          </Menubar>
          <Menubar className="hidden lg:flex">
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="games"
                render={
                  <route.Link
                    to="/seasons/$year/$group/games"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Matcher
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="table"
                render={
                  <route.Link
                    to="/seasons/$year/$group/tables/$table"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                      table: 'all',
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Tabell
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="development"
                render={
                  <route.Link
                    to="/seasons/$year/$group/development"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                      index: 0,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Utveckling
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="interval"
                render={
                  <route.Link
                    to="/seasons/$year/$group/interval"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                      start: 0,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Intervall
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="stats"
                render={
                  <route.Link
                    to="/seasons/$year/$group/stats"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Statistik
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <route.Link
                    to="/seasons/$year/$group/map"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Karta
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <route.Link
                    to="/seasons/$year/playoff/table"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Slutspelsträd
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <route.Link
                    to="/seasons/$year/playoff/games"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Slutspelsmatcher
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <route.Link
                    to="/seasons/$year/playoff/stats"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Slutspelsstatistik
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <route.Link
                    to="/seasons/$year/playoff/map"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Slutspelskarta
                  </route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            {data.status === 200 ? (
              <MenubarMenu>
                <MenubarTrigger className="sm:text-sm">
                  Serier
                </MenubarTrigger>
                <MenubarContent>
                  {data.groups.map((group) => {
                    return (
                      <MenubarItem key={group.group}>
                        <Link
                          to="."
                          search={(prev) => ({
                            ...prev,
                            start: prev.start
                              ? 0
                              : undefined,
                            end: undefined,
                            index: prev.index
                              ? 0
                              : undefined,
                          })}
                          params={{ group: group.group }}
                          className="sm:text-sm"
                        >
                          {group.name}
                        </Link>
                      </MenubarItem>
                    )
                  })}
                </MenubarContent>
              </MenubarMenu>
            ) : null}
          </Menubar>
        </>
      )} */}
    </div>
  )
}

export default GroupMenubar
