import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import {
  Await,
  createFileRoute,
} from '@tanstack/react-router'
import PlayoffGames from '../-components/Playoff/Games/PlayoffGames'
import { getPlayoffGames } from '../-functions/playoff/getPlayoffGames'
import { getPlayoffGamesMeta } from '../-functions/playoff/getPlayoffGamesMeta'

export const Route = createFileRoute(
  '/_layout/seasons/$year/playoff/games',
)({
  beforeLoad: () => {
    return { sidebarSection: 'playoffGames' }
  },
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const gamesMeta = await getPlayoffGamesMeta({
      data: { year: params.year, women: deps.women },
    })
    const data = getPlayoffGames({
      data: { year: params.year, women: deps.women },
    })
    if (!data || !gamesMeta) throw new Error('Missing data')

    return { data, gamesMeta }
  },
  staticData: { breadcrumb: 'Matcher' },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.gamesMeta.meta.title ??
          'Bandyresultat - Matcher',
      },
      {
        name: 'description',
        content:
          loaderData?.gamesMeta.meta.description ??
          'Bandyresultat - Matcher',
      },
      {
        property: 'og:description',
        content:
          loaderData?.gamesMeta.meta.description ??
          'Bandyresultat - Matcher',
      },
      {
        property: 'og:title',
        content:
          loaderData?.gamesMeta.meta.title ??
          'Bandyresultat - Matcher',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.gamesMeta.meta.url ??
          'https://www.bandyresultat.se',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: RouteComponent,
  pendingComponent: () => (
    <Loading page="seasonGamesList" />
  ),
})

function RouteComponent() {
  const promiseData = Route.useLoaderData({
    select: (s) => s.data,
  })
  return (
    <Await promise={promiseData}>
      {(data) => {
        if (!data) return null
        if (data.status === 404) {
          return (
            <div className="mt-4 flex flex-col justify-center text-sm">
              <div className="mb-4 flex flex-row justify-center">
                <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm">
                  {data.message}
                </span>
              </div>
            </div>
          )
        }
        return (
          <CustomCatchBoundary id="playoffgames">
            <PlayoffGames {...data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}
