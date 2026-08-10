import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import { SeasonGames } from '../-components/SeasonGames'
import { getGames } from '../-functions/getGames'

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
    const data = await getGames({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    if (!data) throw new Error('Missing games data')

    return data
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

        {data.message.includes('Välj en ny i listan') ? (
          <GroupListForErrorComponent />
        ) : null}
      </div>
    )
  }
  return (
    <CustomCatchBoundary id="seasonGames">
      <SeasonGames />
    </CustomCatchBoundary>
  )
}
