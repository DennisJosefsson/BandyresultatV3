import { getRouteApi } from '@tanstack/react-router'
import DataTable from './TableDataTable'
import { columns } from './tablecolumns'

const route = getRouteApi('/_layout/seasons/$year/$group/development')

const DevelopmentTable = () => {
  const index = route.useSearch({ select: (s) => s.index })
  const data = route.useLoaderData()

  if (data.status === 404) return null

  return (
    <DataTable
      columns={columns}
      serieStructure={data.serie.serieStructure}
      comment={data.serie.comment}
      data={data.tables[index].table}
    />
  )
}

export default DevelopmentTable
