import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import { createFileRoute } from '@tanstack/react-router'
import Points from '../-components/Records/PointsGoalsEtc/Points'
import { getPointRecords } from '../-functions/getPointRecords'
import { getPointsMeta } from '../-functions/getPointsMeta'

export const Route = createFileRoute(
  '/_layout/maraton/records/points',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const pointsMeta = await getPointsMeta({
      data: { women: deps.women },
    })
    const data = getPointRecords({
      data: { women: deps.women },
    })
    if (!data || !pointsMeta)
      throw new Error('Missing data')

    return { data, pointsMeta }
  },
  staticData: {
    breadcrumb: 'Poäng',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.pointsMeta.meta.title ??
          'Bandyresultat - Rekord: Poäng',
      },
      {
        name: 'description',
        content:
          loaderData?.pointsMeta.meta.description ??
          'Bandyresultat - Rekord: Poäng',
      },
      {
        property: 'og:description',
        content:
          loaderData?.pointsMeta.meta.description ??
          'Bandyresultat - Rekord: Poäng',
      },
      {
        property: 'og:title',
        content:
          loaderData?.pointsMeta.meta.title ??
          'Bandyresultat - Rekord: Poäng',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.pointsMeta.meta.url ??
          'https://www.bandyresultat.se/maraton/records/points',
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
    <CustomCatchBoundary id="points">
      <Points />
    </CustomCatchBoundary>
  )
}
