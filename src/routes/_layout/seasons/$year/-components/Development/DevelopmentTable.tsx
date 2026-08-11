import type { Serie } from '@/lib/types/serie'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import { getRouteApi } from '@tanstack/react-router'
import DataTable from './TableDataTable'
import { columns } from './tablecolumns'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/development',
)

type DevelopmentTableProps = {
  tables: Array<{
    date: string
    table: Array<ReturnDevDataTableItem>
  }>
  serie: Serie
}

const DevelopmentTable = ({
  tables,
  serie,
}: DevelopmentTableProps) => {
  const index = route.useSearch({ select: (s) => s.index })

  return (
    <DataTable
      columns={columns}
      serieStructure={serie.serieStructure}
      comment={serie.comment}
      data={tables[index].table}
    />
  )
}

export default DevelopmentTable
