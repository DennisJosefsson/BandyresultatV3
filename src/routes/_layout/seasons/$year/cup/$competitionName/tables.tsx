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
        <span className="xs:text-xs text-[8px] font-semibold sm:text-sm xl:text-base">
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
