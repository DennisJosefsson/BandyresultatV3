import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import { createFileRoute } from '@tanstack/react-router'
import CupTables from '../-components/Tables/CupTables'
import { getCupSeriesTables } from '../-functions/getCupSeriesTables'

export const Route = createFileRoute(
  '/_layout/seasons/$year/cup/$competitionName/tables',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { competitionName },
    deps: { women },
    context: { seasonYear },
  }) => {
    const data = await getCupSeriesTables({
      data: { seasonYear, women, competitionName },
    })

    if (!data) throw new Error('Missing cup game data')
    return { data }
  },

  staticData: { breadcrumb: 'Tabeller' },
  head: ({ match }) => {
    const seasonYear = match.context.seasonYear
    const women = match.search.women
    return {
      meta: [
        {
          title: `Bandyresultat - Tabeller ${
            match.params.competitionName.replaceAll(
              '_',
              ' ',
            ) ?? 'Cup'
          } ${women ? 'damer' : 'herrar'} ${seasonYear}`,
        },
        {
          property: 'og:description',
          content: `Bandyresultat - Tabeller för ${
            match.params.competitionName.replaceAll(
              '_',
              ' ',
            ) ?? 'Cup'
          } ${women ? 'damer' : 'herrar'} ${seasonYear}`,
        },
        {
          property: 'og:title',
          content: `Bandyresultat - Tabeller ${
            match.params.competitionName.replaceAll(
              '_',
              ' ',
            ) ?? 'Cup'
          } ${women ? 'damer' : 'herrar'} ${seasonYear}`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: `https://bandyresultat.se/seasons/${match.params.year}}/cup/${match.params.competitionName}/tables?women=${women}`,
        },
        {
          property: 'og:image',
          content:
            'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
        },
      ],
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData({
    select(match) {
      if (!match)
        throw new Error('Missing data in useLoaderData')
      return match.data
    },
  })
  if (data.status === 404) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <span className="xs:text-xs text-[8px] sm:text-sm">
          {data.message}
        </span>
      </div>
    )
  }
  return (
    <CustomCatchBoundary id="cupTables">
      <CupTables />
    </CustomCatchBoundary>
  )
}
