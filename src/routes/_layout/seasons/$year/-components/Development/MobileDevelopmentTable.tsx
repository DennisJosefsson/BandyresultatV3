import { getRouteApi } from '@tanstack/react-router'

import MobileDataTable from './MobileTableData'
import { columns } from './tablecolumns'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/development',
)

const MobileDevelopmentTable = () => {
  const index = route.useSearch({ select: (s) => s.index })
  const serie = route.useLoaderData({
    select: (s) => s.serie,
  })
  const tables = route.useLoaderData({
    select: (s) => s.tables,
  })

  const teamObject = tables[index]?.table.reduce(
    (o, key) => ({
      ...o,
      [key.team.casualName]: key.teamId,
    }),
    {},
  )

  return (
    <MobileDataTable
      columns={columns}
      serieStructure={serie.serieStructure}
      comment={serie.comment}
      teamObject={teamObject}
      data={tables[index].table}
    />
  )
}

export default MobileDevelopmentTable
