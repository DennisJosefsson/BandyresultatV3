import { getRouteApi } from '@tanstack/react-router'

import TableList from './Tables/TableList'

const route = getRouteApi(
  '/_layout/teams/$teamId/$seasonId',
)

const SeasonTables = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  if (data.tables.length + data.staticTables.length === 0) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga tabeller än denna säsong.
      </div>
    )
  }

  return (
    <div>
      {data.tables.length > 0 ? (
        <TableList
          tableArray={data.tables}
          casualName={data.team.casualName}
        />
      ) : null}
      {data.staticTables.length > 0 ? (
        <TableList
          casualName={data.team.casualName}
          tableArray={data.staticTables}
        />
      ) : null}
    </div>
  )
}

export default SeasonTables
