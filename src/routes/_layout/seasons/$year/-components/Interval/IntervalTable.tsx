import { Serie } from '@/lib/types/serie'
import { ReturnDevDataTableItem } from '@/lib/types/table'
import DataTable from './DataTable'
import { columns } from './columns'

type IntervalTableProps = {
  table: ReturnDevDataTableItem[]

  serie: Serie
}

const IntervalTable = ({ table, serie }: IntervalTableProps) => {
  const teamObject = table.reduce(
    (o, key) => ({
      ...o,
      [key.team.casualName]: key.teamId,
    }),
    {},
  )

  return (
    <DataTable
      serieStructure={serie.serieStructure}
      columns={columns}
      data={table}
      comment={serie.comment}
      teamObject={teamObject}
    />
  )
}

export default IntervalTable
