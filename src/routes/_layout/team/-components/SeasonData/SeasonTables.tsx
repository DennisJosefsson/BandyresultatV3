import { getRouteApi } from '@tanstack/react-router'
import StaticTableList from './Tables/StaticTableList'
import TableList from './Tables/TableList'

const route = getRouteApi('/_layout/team/$teamId/$seasonId')

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
      <div className="flex flex-row justify-center mt-2 font-semibold">
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
        <div>
          {staticTables.map((tableObject) => {
            return (
              <StaticTableList
                key={tableObject.group}
                casualName={casualName}
                tableObject={tableObject}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default SeasonTables
