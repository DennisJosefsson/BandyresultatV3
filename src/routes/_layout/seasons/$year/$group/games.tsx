import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import { zd } from '@/lib/utils/zod'
import {
  Await,
  createFileRoute,
} from '@tanstack/react-router'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import { SeasonGames } from '../-components/SeasonGames'
import { getGames } from '../-functions/games/getGames'
import { getGamesMeta } from '../-functions/games/getGamesMeta'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/games',
)({
  validateSearch: zd.object({
    teams: zd
      .array(zd.number().int().positive())
      .optional(),
  }),
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const gamesMeta = await getGamesMeta({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    const data = getGames({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    if (!data || !gamesMeta)
      throw new Error('Missing games data')

    return { data, gamesMeta }
  },
  component: RouteComponent,
  pendingComponent: () => (
    <Loading page="seasonGamesList" />
  ),
  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Matcher',
  },
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

              {data.message.includes(
                'Välj en ny i listan',
              ) ? (
                <GroupListForErrorComponent />
              ) : null}
            </div>
          )
        }
        return (
          <CustomCatchBoundary id="seasonGames">
            <SeasonGames {...data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}
