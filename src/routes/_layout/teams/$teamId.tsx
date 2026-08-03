import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/base/ui/menubar'
import { useSidebar } from '@/components/base/ui/sidebar'
import { zd } from '@/lib/utils/zod'
import {
  CatchBoundary,
  Link,
  Navigate,
  Outlet,
  createFileRoute,
  useChildMatches,
} from '@tanstack/react-router'
import TeamHeader from './$teamId/-components/TeamHeader'
import { getSingleTeam } from './$teamId/-functions/getSingleTeam'

export const Route = createFileRoute(
  '/_layout/teams/$teamId',
)({
  beforeLoad: () => {
    return { sidebarSection: 'singleTeam' }
  },
  params: {
    parse: (params) => ({
      teamId: zd
        .number()
        .int()
        .parse(Number(params.teamId)),
    }),
    stringify: ({ teamId }) => ({ teamId: `${teamId}` }),
  },
  loader: async ({ params }) => {
    const team = await getSingleTeam({
      data: params.teamId,
    })

    if (!team) throw new Error('Något oväntat gick fel.')
    return team
  },
  component: SingleTeam,
  pendingComponent: () => <Loading page="singleTeam" />,
  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Lag',
  },
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ?? 'Bandyresultat - Lag',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Lag',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Lag',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ?? 'Bandyresultat - Lag',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se',
      },
      {
        property: 'og:image',
        content:
          loaderData?.status === 200
            ? `/logos/teams/128/${params.teamId}_128x128.png`
            : 'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
})

function SingleTeam() {
  const { open } = useSidebar()
  const data = Route.useLoaderData()
  const teamId = Route.useParams({
    select: (s) => s.teamId,
  })

  const childMatches = useChildMatches()

  if (data.status === 404) {
    return (
      <div className="mt-2 flex flex-row justify-center">
        <p>
          Finns tyvärr inget sådant lag, men det finns en{' '}
          <Link
            to="/teams"
            search={{ women: false }}
            className="underline"
          >
            lista
          </Link>{' '}
          och man kan också söka via{' '}
          <Link
            to="/teams/map"
            search={{ women: false }}
            className="underline"
          >
            karta
          </Link>
          .
        </p>
      </div>
    )
  }

  if (childMatches.length === 0) {
    return (
      <Navigate
        from={Route.fullPath}
        to="/teams/$teamId/tables"
        search={(prev) => ({ ...prev })}
        params={(prev) => ({ teamId: prev.teamId })}
        
      />
    )
  }

  return (
    <div>
      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent
            id="singleteam"
            error={error}
            reset={reset}
          />
        )}
      >
        <div className="font-inter text-foreground mt-6 flex min-h-screen flex-col">
          <TeamHeader />
          {open ? null : (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger
                  className="xs:text-[10px] text-[8px] md:text-sm"
                  value="tables"
                  nativeButton={false}
                  render={
                    <Route.Link
                      to="/teams/$teamId/tables"
                      params={{ teamId }}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                    >
                      <span className="truncate">
                        Tabeller
                      </span>
                    </Route.Link>
                  }
                />

                <MenubarTrigger
                  className="text-[10px] md:text-sm"
                  value="latest"
                  nativeButton={false}
                  render={
                    <Route.Link
                      to="/teams/$teamId/latest"
                      params={{ teamId }}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                    >
                      <span className="xs:max-w-fit max-w-12 truncate">
                        5 senaste säsongerna
                      </span>
                    </Route.Link>
                  }
                />
                <MenubarTrigger
                  className="text-[10px] md:text-sm"
                  value="seasons"
                  nativeButton={false}
                  render={
                    <Route.Link
                      to="/teams/$teamId/seasons"
                      params={{ teamId }}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                    >
                      <span className="truncate">
                        Alla säsonger
                      </span>
                    </Route.Link>
                  }
                />
                <MenubarTrigger
                  className="text-[10px] md:text-sm"
                  value="stats"
                  nativeButton={false}
                  render={
                    <Route.Link
                      to="/teams/$teamId/stats"
                      params={{ teamId }}
                      search={(prev) => ({
                        women: prev.women,
                      })}
                    >
                      <span className="truncate">
                        Statistik
                      </span>
                    </Route.Link>
                  }
                />
              </MenubarMenu>
            </Menubar>
          )}
          <div>
            <Outlet />
          </div>
        </div>
      </CatchBoundary>
    </div>
  )
}
