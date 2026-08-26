import { getRouteApi } from '@tanstack/react-router'
import TableList from './TableList'

const route = getRouteApi(
  '/_layout/seasons/$year/cup/$competitionName/tables',
)

const CupTables = () => {
  const data = route.useLoaderData({
    select(match) {
      if (!match)
        throw new Error(
          'Missing data in CupTables useLoaderData',
        )

      return match.data
    },
  })

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
      {data.tables.length > 0 ? (
        <TableList tableArray={data.tables} />
      ) : null}
    </div>
  )
}

export default CupTables
