import { getRouteApi } from '@tanstack/react-router'
import TableList from './Tables/TableList'

const route = getRouteApi('/_layout/teams/$teamId/seasons/$seasonId/')

const SeasonTables = () => {
  const data = route.useLoaderData()

  if (data.status === 404) return null

  if (data.tableLength === 0) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga tabeller än denna säsong.
      </div>
    )
  }

  return (
    <div>
      {data.tables.length > 0 ? <TableList tableArray={data.tables} /> : null}
      
    </div>
  )
}

export default SeasonTables
