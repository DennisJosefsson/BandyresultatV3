import { zd } from '@/lib/utils/zod'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { getTables } from '../../-functions/getTables'

export const Route = createFileRoute(
  '/_layout/season/$year/$group/tables/$table',
)({
  params: {
    parse: (params) => ({
      table: zd.enum(['all', 'away', 'home']).catch('all').parse(params.table),
    }),
    stringify: ({ table }) => ({ table: `${table}` }),
  },
  loaderDeps: ({ search: { women } }) => ({ women }),
  beforeLoad: ({ search, params }) => {
    if (
      search.women &&
      [1973, 1974].includes(params.year) &&
      params.table !== 'all'
    ) {
      throw redirect({
        to: '/season/$year/$group/tables/$table',
        params: { table: 'all', year: params.year, group: params.group },
        search: { women: search.women },
      })
    }
  },
  loader: async ({ deps, params }) => {
    if (!params.group) throw notFound()
    const data = await getTables({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
        table: params.table,
      },
    })
    if (!data) throw new Error('Missing data')
    if (data.status === 404) {
      throw notFound({ data: data.message })
    }
    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  if (data.tables.length === 0) return <div>Ingen data</div>
  return (
    <div>
      {data.tables[0].team.name} {data.tables[0].totalGames} matcher{' '}
      {data.tables[0].totalPoints} poäng
    </div>
  )
}
