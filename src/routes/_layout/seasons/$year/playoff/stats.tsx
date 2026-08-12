import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import {
  Await,
  createFileRoute,
} from '@tanstack/react-router'
import StatsComponent from '../-components/Stats/Stats'
import { getPlayoffStats } from '../-functions/playoff/getPlayoffStats'
import { getPlayoffStatsMeta } from '../-functions/playoff/getPlayoffStatsMeta'

export const Route = createFileRoute(
  '/_layout/seasons/$year/playoff/stats',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const statsMeta = await getPlayoffStatsMeta({
      data: { year: params.year, women: deps.women },
    })
    const data = getPlayoffStats({
      data: { year: params.year, women: deps.women },
    })
    if (!data || !statsMeta) throw new Error('Missing data')

    return { data, statsMeta }
  },
  staticData: { breadcrumb: 'Statistik' },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.statsMeta.meta.title ??
          'Bandyresultat - Statistik',
      },
      {
        name: 'description',
        content:
          loaderData?.statsMeta.meta.description ??
          'Bandyresultat - Statistik',
      },
      {
        property: 'og:description',
        content:
          loaderData?.statsMeta.meta.description ??
          'Bandyresultat - Statistik',
      },
      {
        property: 'og:title',
        content:
          loaderData?.statsMeta.meta.title ??
          'Bandyresultat - Statistik',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.statsMeta.meta.url ??
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
  pendingComponent: () => <Loading page="seasonStats" />,
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
          <CustomCatchBoundary id="playoffstats">
            <StatsComponent stats={data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}
