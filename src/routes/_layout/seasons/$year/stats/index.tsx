import { createFileRoute } from '@tanstack/react-router'

import DivisionScoringStats from './-components/DivisionScoringStats'
import { getSeasonStats } from './-functions/getSeasonStats'

export const Route = createFileRoute(
  '/_layout/seasons/$year/stats/',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps: { women }, params: { year } }) => {
    const data = await getSeasonStats({
      data: { women, intYear: year },
    })
    if (!data) throw new Error('Missing seasons stats data')

    return data
  },
  staticData: { breadcrumb: 'Säsongsstatistik' },
  head: (ctx) => {
    const title = `Bandyresultat - Säsongsstatistik ${ctx.match.context.seasonYear} ${ctx.match.search.women ? 'Damher' : 'Herrar'}`
    const url = `https://www.bandyresultat.se${ctx.match.pathname}?women=${ctx.match.search.women}`
    return {
      meta: [
        {
          title:
            title ?? 'Bandyresultat - Säsongsstatistik',
        },
        {
          name: 'description',
          content: 'Bandyresultat - Säsongsstatistik',
        },
        {
          property: 'og:description',
          content:
            title ?? 'Bandyresultat - Säsongsstatistik',
        },
        {
          property: 'og:title',
          content:
            title ?? 'Bandyresultat - Säsongsstatistik',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: url ?? 'https://www.bandyresultat.se',
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
  const data = Route.useLoaderData()
  if (data.status === 404) {
    return (
      <div className="flex flex-row justify-center mt-4">
        <span className="font-semibold">
          {data.message}
        </span>
      </div>
    )
  }

  return (
    <div>
      <DivisionScoringStats />
    </div>
  )
}
