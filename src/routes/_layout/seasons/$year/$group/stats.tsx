import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import StatsComponent from '../-components/Stats/Stats'
import { getGroupStats } from '../-functions/getGroupStats'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/stats',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const data = await getGroupStats({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,
  pendingComponent: () => <Loading page="seasonStats" />,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Statistik',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Statistik',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Statistik',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Statistik',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Statistik',
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
    <CustomCatchBoundary id="stats">
      <Stats />
    </CustomCatchBoundary>
  )
}

function Stats() {
  const data = Route.useLoaderData()
  if (data.status === 404) return null
  return <StatsComponent stats={data} />
}
