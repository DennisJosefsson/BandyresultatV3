import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import { createFileRoute } from '@tanstack/react-router'
import Scored from '../-components/Records/PointsGoalsEtc/Scored'
import { getScoredMeta } from '../-functions/getScoredMeta'
import { getScoredRecords } from '../-functions/getScoredRecords'

export const Route = createFileRoute(
  '/_layout/maraton/records/scored',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const scoredMeta = await getScoredMeta({
      data: { women: deps.women },
    })
    const data = getScoredRecords({
      data: { women: deps.women },
    })
    if (!data || !scoredMeta)
      throw new Error('Missing data')

    return { data, scoredMeta }
  },
  staticData: {
    breadcrumb: 'Gjorda mål',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.scoredMeta.meta.title ??
          'Bandyresultat - Rekord: Gjorda mål',
      },
      {
        name: 'description',
        content:
          loaderData?.scoredMeta.meta.description ??
          'Bandyresultat - Rekord: Gjorda mål',
      },
      {
        property: 'og:description',
        content:
          loaderData?.scoredMeta.meta.description ??
          'Bandyresultat - Rekord: Gjorda mål',
      },
      {
        property: 'og:title',
        content:
          loaderData?.scoredMeta.meta.title ??
          'Bandyresultat - Rekord: Gjorda mål',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.scoredMeta.meta.url ??
          'https://www.bandyresultat.se/maraton/records/scored',
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
    <CustomCatchBoundary id="scored">
      <Scored />
    </CustomCatchBoundary>
  )
}
