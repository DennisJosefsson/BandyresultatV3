import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import {
  Await,
  createFileRoute,
} from '@tanstack/react-router'
import SeasonPlayoffTables from '../-components/Playoff/SeasonPlayoffTables'
import { getPlayoffTable } from '../-functions/playoff/getPlayoffTable'
import { getPlayoffTableMeta } from '../-functions/playoff/getPlayoffTableMeta'

export const Route = createFileRoute(
  '/_layout/seasons/$year/playoff/table',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const tableMeta = await getPlayoffTableMeta({
      data: { year: params.year, women: deps.women },
    })
    const data = getPlayoffTable({
      data: { year: params.year, women: deps.women },
    })
    if (!data || !tableMeta) throw new Error('Missing data')

    return { data, tableMeta }
  },
  staticData: { breadcrumb: 'Slutspelsträd' },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.tableMeta.meta.title ??
          'Bandyresultat - Slutspelsträd',
      },
      {
        name: 'description',
        content:
          loaderData?.tableMeta.meta.description ??
          'Bandyresultat - Slutspelsträd',
      },
      {
        property: 'og:description',
        content:
          loaderData?.tableMeta.meta.description ??
          'Bandyresultat - Slutspelsträd',
      },
      {
        property: 'og:title',
        content:
          loaderData?.tableMeta.meta.title ??
          'Bandyresultat - Slutspelsträd',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.tableMeta.meta.url ??
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
  pendingComponent: () => <Loading page="seasonPlayoff" />,
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
          <CustomCatchBoundary id="seasonPlayoff">
            <SeasonPlayoffTables {...data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}
