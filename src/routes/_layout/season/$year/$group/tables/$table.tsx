import { zd } from '@/lib/utils/zod'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import GroupListForErrorComponent from '../../-components/GroupListForErrorComponent'
import SeasonTables from '../../-components/SeasonTables'
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
      throw notFound({
        data: data.message,
        routeId: '/_layout/season/$year/$group/',
      })
    }
    return data
  },
  component: SeasonTables,
  notFoundComponent(props) {
    if (props.data && typeof props.data === 'string') {
      return (
        <div className="mt-4 flex flex-col justify-center text-sm">
          <div className="mb-4 flex flex-row justify-center">
            <p>{props.data}</p>
          </div>

          {props.data.includes('Välj en ny i listan') ? (
            <GroupListForErrorComponent />
          ) : null}
        </div>
      )
    }
    return (
      <div className="mt-4 flex flex-row justify-center">
        <p>Något gick tyvärr fel.</p>
      </div>
    )
  },
})
