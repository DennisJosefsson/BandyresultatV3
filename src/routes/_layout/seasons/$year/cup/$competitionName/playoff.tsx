import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import { createFileRoute } from '@tanstack/react-router'
import CupPlayoffTables from '../-components/Playoff/CupPlayoffTables'
import { getCupPlayoffTables } from '../-functions/getCupPlayoffTables'

export const Route = createFileRoute(
  '/_layout/seasons/$year/cup/$competitionName/playoff',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { competitionName },
    deps: { women },
    context: { seasonYear },
  }) => {
    const data = await getCupPlayoffTables({
      data: { seasonYear, women, competitionName },
    })

    if (!data) throw new Error('Missing cup playoff data')
    return { data }
  },
  staticData: { breadcrumb: 'Slutspel' },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData({
    select(match) {
      if (!match) {
        throw new Error(
          'Missing data in cup playoff useLoaderData',
        )
      }
      return match.data
    },
  })
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
    <CustomCatchBoundary id="cupPlayoff">
      <CupPlayoffTables />
    </CustomCatchBoundary>
  )
}
