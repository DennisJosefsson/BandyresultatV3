import { getRouteApi } from '@tanstack/react-router'
import TableList from './Tables/TableList'

const route = getRouteApi('/_layout/teams/$teamId/$seasonId')

const SeasonTables = () => {
  const tables = route.useLoaderData({ select: (data) => data.tables })
  const staticTables = route.useLoaderData({
    select: (data) => data.staticTables,
  })
  const casualName = route.useLoaderData({
    select: (data) => data.team.casualName,
  })

  if (tables.length + staticTables.length === 0) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga tabeller än denna säsong.
      </div>
    )
  }

  return (
    <div>
      {tables.length > 0 ? (
        <TableList tableArray={tables} casualName={casualName} />
      ) : null}
      {staticTables.length > 0 ? (
        <TableList casualName={casualName} tableArray={staticTables} />
      ) : null}
    </div>
  )
}

export default SeasonTables
