import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
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
  CatchBoundary,
  Link,
  Outlet,
  createFileRoute,
  useLoaderData,
} from '@tanstack/react-router'
import { validateGroup } from './-functions/validateGroup'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { year, group },
    deps: { women },
  }) => {
    const data = await validateGroup({
      data: { year, group, women },
    })

    return data
  },
  staticData: {
    breadcrumb: (match) => {
      return match.loaderData.breadCrumb ?? 'Serie'
    },
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          id="groupRoute"
          error={error}
          reset={reset}
        />
      )}
    >
      <Group />
    </CatchBoundary>
  )
}

function Group() {
  const sidebar = useSidebar()
  const data = useLoaderData({
    from: '/_layout/seasons/$year',
  })

  return (
    <div className="flex flex-col gap-2">
      {sidebar.open ? null : (
        <div className="mb-2">
          <Menubar className="lg:hidden">
            <MenubarMenu>
              <MenubarTrigger className="sm:text-sm">
                Grundserie
              </MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
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
                    <Route.Link
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
                    </Route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
                  </MenubarItem>

                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Route.Link
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
                    </Route.Link>
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
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="table"
                render={
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="development"
                render={
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="interval"
                render={
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="stats"
                render={
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <Route.Link
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
                  </Route.Link>
                }
                nativeButton={false}
              />
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger
                className="sm:text-sm"
                value="map"
                render={
                  <Route.Link
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
                  </Route.Link>
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
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  )
}
