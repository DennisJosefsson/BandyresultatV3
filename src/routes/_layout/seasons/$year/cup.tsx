import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import {
  Outlet,
  createFileRoute,
  useChildMatches,
  useLoaderData,
} from '@tanstack/react-router'
import CupMenubar from './-components/Menubar/CupMenubar'

export const Route = createFileRoute(
  '/_layout/seasons/$year/cup',
)({
  beforeLoad: () => {
    return { sidebarSection: 'cup' }
  },
  staticData: { breadcrumb: 'Cup' },
  head: ({ match }) => {
    const seasonYear = match.context.seasonYear
    const women = match.search.women
    return {
      meta: [
        {
          title: `Bandyresultat - Cuper ${women ? 'damer' : 'herrar'} ${seasonYear}`,
        },
        {
          property: 'og:description',
          content: `Bandycuper för ${women ? 'damer' : 'herrar'} säsongen ${seasonYear}`,
        },
        {
          property: 'og:title',
          content: `Bandyresultat - Cuper ${women ? 'damer' : 'herrar'} ${seasonYear}`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: `https://bandyresultat.se/seasons/${match.params.year}}/cup?women=${women}`,
        },
        {
          property: 'og:image',
          content:
            'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
        },
      ],
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CustomCatchBoundary id="cup">
      <CupMenubar />
      <Cup />
    </CustomCatchBoundary>
  )
}

function Cup() {
  const women = Route.useSearch({ select: (s) => s.women })
  const data = useLoaderData({
    from: '/_layout/seasons/$year',
  })
  const childMatches = useChildMatches()

  if (childMatches.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center">
          <h3 className="text-xs font-semibold sm:text-sm md:text-base">
            Välj cup
          </h3>
        </div>
        <div className="flex flex-row justify-center">
          {data.status === 200 && data.cups.length > 0 ? (
            <div className="flex flex-row gap-2 justify-center">
              {data.cups.map((cup) => {
                return (
                  <Route.Link
                    to="/seasons/$year/cup/$competitionName"
                    search={{ women }}
                    params={(prev) => ({
                      ...prev,
                      competitionName: cup.competitionName,
                    })}
                    key={cup.competitionId.toString()}
                  >
                    <div className="grid grid-cols-2 xs:flex flex-row items-center justify-center gap-2 xs:gap-4 border px-4 py-2 shadow-xs sm:gap-8 md:shadow-sm w-50 xs:w-full">
                      <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                        {cup.competitionName}
                      </span>
                    </div>
                  </Route.Link>
                )
              })}
            </div>
          ) : (
            <div>
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                Finns inga cuper inlagda det här året.
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}
