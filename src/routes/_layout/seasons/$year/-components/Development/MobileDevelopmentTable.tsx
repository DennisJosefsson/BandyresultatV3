import { getRouteApi } from '@tanstack/react-router'
import { columns } from './tablecolumns'
import MobileDataTable from './MobileTableData'

const route = getRouteApi('/_layout/seasons/$year/$group/development')

const MobileDevelopmentTable = () => {
  const index = route.useSearch({ select: (s) => s.index })
  const data = route.useLoaderData()

  if (data.status === 404) return null

  return (
    <MobileDataTable
      columns={columns}
      serieStructure={data.serie.serieStructure}
      comment={data.serie.comment}
      data={data.tables[index].table}
    />
  )
}

export default MobileDevelopmentTable
