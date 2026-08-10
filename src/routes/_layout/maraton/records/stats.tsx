import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import { createFileRoute } from '@tanstack/react-router'
import GeneralStats from '../-components/Records/PointsGoalsEtc/GeneralStats'
import { getGeneralStats } from '../-functions/getGeneralStats'
import { getGeneralStatsMeta } from '../-functions/getGeneralStatsMeta'

export const Route = createFileRoute(
  '/_layout/maraton/records/stats',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const statsMeta = await getGeneralStatsMeta({
      data: { women: deps.women },
    })
    const data = getGeneralStats({
      data: { women: deps.women },
    })
    if (!data || !statsMeta) throw new Error('Missing data')

    return { data, statsMeta }
  },
  staticData: {
    breadcrumb: 'Statistik',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.statsMeta.meta.title ??
          'Bandyresultat - Rekord: Statistik',
      },
      {
        name: 'description',
        content:
          loaderData?.statsMeta.meta.description ??
          'Bandyresultat - Rekord: Statistik',
      },
      {
        property: 'og:description',
        content:
          loaderData?.statsMeta.meta.description ??
          'Bandyresultat - Rekord: Statistik',
      },
      {
        property: 'og:title',
        content:
          loaderData?.statsMeta.meta.title ??
          'Bandyresultat - Rekord: Statistik',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.statsMeta.meta.url ??
          'https://www.bandyresultat.se/maraton/records/stats',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CustomCatchBoundary id="generalStats">
      <GeneralStats />
    </CustomCatchBoundary>
  )
}
