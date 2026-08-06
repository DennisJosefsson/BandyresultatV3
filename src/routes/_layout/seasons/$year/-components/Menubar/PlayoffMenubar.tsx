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
  getRouteApi,
  useLoaderData,
} from '@tanstack/react-router'

const route = getRouteApi('/_layout/seasons/$year/playoff')

const PlayoffMenubar = () => {
  const data = useLoaderData({
    from: '/_layout/seasons/$year',
  })

  const { open, isMobile } = useSidebar()

  if (data.status === 200) {
    const groupFromData = data.groups[0].group
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
                        group: groupFromData,
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
                        group: groupFromData,
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
                        group: groupFromData,
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
                        group: groupFromData,
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
                        group: groupFromData,
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
                        group: groupFromData,
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
                        <route.Link
                          to="/seasons/$year/$group/tables/$table"
                          search={(prev) => ({
                            ...prev,
                          })}
                          params={(prev) => ({
                            year: prev.year,
                            group: group.group,
                            table: 'all',
                          })}
                          className="sm:text-sm"
                        >
                          {group.name}
                        </route.Link>
                      </MenubarItem>
                    )
                  })}
                </MenubarContent>
              </MenubarMenu>
            ) : null}
          </Menubar>
        ) : null}
      </div>
    )
  }

  return null
}

export default PlayoffMenubar
