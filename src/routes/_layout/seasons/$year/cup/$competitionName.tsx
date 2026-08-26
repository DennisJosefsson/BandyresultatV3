import { zd } from '@/lib/utils/zod'
import {
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'
import { getCompetition } from './-functions/getCompetition'

export const Route = createFileRoute(
  '/_layout/seasons/$year/cup/$competitionName',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  params: {
    parse: (params) => ({
      competitionName: zd
        .string()
        .parse(params.competitionName),
    }),
    stringify: ({ competitionName }) => ({
      competitionName: `${competitionName.replaceAll(' ', '_')}`,
    }),
  },
  loader: async ({
    deps: { women },
    params: { competitionName },
    context: { seasonYear },
  }) => {
    const data = await getCompetition({
      data: {
        competitionName,
        seasonYear,
        women,
      },
    })

    if (!data) throw new Error('Missing competition data')

    return { data }
  },

   staticData: {
    breadcrumb: (match) =>
      match.params.competitionName.replaceAll('_', ' ') ?? 'Cup',
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData({
    select: (dataItem) => {
      if (!dataItem) {
        console.log(dataItem)
        throw new Error('dataItem is undefined')
      }
      return dataItem.data
    },
  })

  if (data.status === 404) {
    return (
      <div className="flex flex-row mt-4 justify-center">
        <span className="text.sm">{data.message}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row mt-4 justify-center">
        <span className="text-sm font-semibold">
          {data.competition.competitionName}
        </span>
      </div>
      <Outlet />
    </div>
  )
}
