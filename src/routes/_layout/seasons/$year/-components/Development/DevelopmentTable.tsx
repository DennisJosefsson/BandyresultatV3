import { getRouteApi } from '@tanstack/react-router'

import { columns } from './tablecolumns'
import DataTable from './TableDataTable'

const route = getRouteApi('/_layout/seasons/$year/$group/development')

const DevelopmentTable = () => {
  const index = route.useSearch({ select: (s) => s.index })
  const serie = route.useLoaderData({ select: (s) => s.serie })
  const tables = route.useLoaderData({ select: (s) => s.tables })

  const teamObject = tables[index]?.table.reduce(
    (o, key) => ({
      ...o,
      [key.team.casualName]: key.teamId,
    }),
    {},
  )

  return (
    <DataTable
      columns={columns}
      serieStructure={serie.serieStructure}
      comment={serie.comment}
      teamObject={teamObject}
      data={tables[index].table}
    />
  )
}

export default DevelopmentTable
