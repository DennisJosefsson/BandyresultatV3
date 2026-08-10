import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import PlayoffGames from '../-components/Playoff/Games/PlayoffGames'
import { getPlayoffGames } from '../-functions/getPlayoffGames'
import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'

export const Route = createFileRoute(
  '/_layout/seasons/$year/playoff/games',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const data = await getPlayoffGames({
      data: { year: params.year, women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: { breadcrumb: 'Matcher' },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Matcher',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Matcher',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Matcher',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Matcher',
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
  const data = Route.useLoaderData()
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
      <PlayoffGames />
    </CustomCatchBoundary>
  )
}
