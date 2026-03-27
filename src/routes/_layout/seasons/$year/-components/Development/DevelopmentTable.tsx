import { getRouteApi } from '@tanstack/react-router'

import { columns } from './tablecolumns'
import DataTable from './TableDataTable'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/development',
)

const DevelopmentTable = () => {
  const index = route.useSearch({ select: (s) => s.index })
  const data = route.useLoaderData()

  if (data.status === 404) return null

  const teamObject = data.tables[index]?.table.reduce(
    (o, key) => ({
      ...o,
      [key.team.casualName]: key.teamId,
    }),
    {},
  )

  return (
    <DataTable
      columns={columns}
      serieStructure={data.serie.serieStructure}
      comment={data.serie.comment}
      teamObject={teamObject}
      data={data.tables[index].table}
    />
  )
}

export default DevelopmentTable
