import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import { createFileRoute } from '@tanstack/react-router'
import Conceded from '../-components/Records/PointsGoalsEtc/Conceded'
import { getConcededMeta } from '../-functions/getConcededMeta'
import { getConcededRecords } from '../-functions/getConcededRecords'

export const Route = createFileRoute(
  '/_layout/maraton/records/conceded',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const concededMeta = await getConcededMeta({
      data: { women: deps.women },
    })
    const data = getConcededRecords({
      data: { women: deps.women },
    })
    if (!data || !concededMeta)
      throw new Error('Missing data')

    return { data, concededMeta }
  },
  staticData: {
    breadcrumb: 'Insläppta mål',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.concededMeta.meta.title ??
          'Bandyresultat - Rekord: Insläppta mål',
      },
      {
        name: 'description',
        content:
          loaderData?.concededMeta.meta.description ??
          'Bandyresultat - Rekord: Insläppta mål',
      },
      {
        property: 'og:description',
        content:
          loaderData?.concededMeta.meta.description ??
          'Bandyresultat - Rekord: Insläppta mål',
      },
      {
        property: 'og:title',
        content:
          loaderData?.concededMeta.meta.title ??
          'Bandyresultat - Rekord: Insläppta mål',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.concededMeta.meta.url ??
          'https://www.bandyresultat.se/maraton/records/conceded',
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
    <CustomCatchBoundary id="conceded">
      <Conceded />
    </CustomCatchBoundary>
  )
}
