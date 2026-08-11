import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import SeasonDevelopmentSkeleton from '@/components/Loading/Skeletons/SeasonDevelopmentSkeleton'
import { zd } from '@/lib/utils/zod'
import {
  Await,
  createFileRoute,
} from '@tanstack/react-router'
import DevelopmentData from '../-components/Development/DevelopmentData'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import { getDevAndIntMeta } from '../-functions/getDevAndIntMeta'
import { getDevData } from '../-functions/getDevData'

const searchParams = zd.object({ index: zd.int().catch(0) })

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/development',
)({
  validateSearch: searchParams,
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const devMeta = await getDevAndIntMeta({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
        origin: 'development',
      },
    })
    const data = getDevData({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    if (!data || !devMeta) throw new Error('Missing data')

    return { data, devMeta }
  },
  component: RouteComponent,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Utveckling',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.devMeta.meta.title ??
          'Bandyresultat - Tabellutveckling',
      },
      {
        name: 'description',
        content:
          loaderData?.devMeta.meta.description ??
          'Bandyresultat - Tabellutveckling',
      },
      {
        property: 'og:description',
        content:
          loaderData?.devMeta.meta.description ??
          'Bandyresultat - Tabellutveckling',
      },
      {
        property: 'og:title',
        content:
          loaderData?.devMeta.meta.title ??
          'Bandyresultat - Tabellutveckling',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.devMeta.meta.url ??
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
    <Await
      promise={promiseData}
      fallback={<SeasonDevelopmentSkeleton />}
    >
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
          <CustomCatchBoundary id="development">
            <DevelopmentData {...data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}
