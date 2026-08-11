import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import SeasonMapSkeleton from '@/components/Loading/Skeletons/SeasonMapSkeleton'
import {
  Await,
  createFileRoute,
} from '@tanstack/react-router'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import GroupMap from '../-components/Maps/GroupMap'
import { getTeamsForGroupMap } from '../-functions/map/getTeamsForGroupMap'
import { getTeamsForGroupMapMeta } from '../-functions/map/getTeamsForGroupMapMeta'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/map',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const mapMeta = await getTeamsForGroupMapMeta({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    const data = getTeamsForGroupMap({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    if (!data || !mapMeta) throw new Error('Missing data')

    return { data, mapMeta }
  },
  component: RouteComponent,

  staticData: {
    breadcrumb: (match) => {
      if (match.loaderData.breadCrumb === undefined) {
        return 'Karta'
      }

      return match.loaderData.breadCrumb
    },
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.mapMeta.meta.title ??
          'Bandyresultat - Karta',
      },
      {
        name: 'description',
        content:
          loaderData?.mapMeta.meta.description ??
          'Bandyresultat - Karta',
      },
      {
        property: 'og:description',
        content:
          loaderData?.mapMeta.meta.description ??
          'Bandyresultat - Karta',
      },
      {
        property: 'og:title',
        content:
          loaderData?.mapMeta.meta.title ??
          'Bandyresultat - Karta',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.mapMeta.meta.url ??
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
      fallback={<SeasonMapSkeleton />}
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
          <CustomCatchBoundary id="groupmap">
            <GroupMap {...data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}
