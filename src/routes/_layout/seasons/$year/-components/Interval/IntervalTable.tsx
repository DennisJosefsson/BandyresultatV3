import type { Serie } from '@/lib/types/serie'
import type { ReturnDevDataTableItem } from '@/lib/types/table'

import { columns } from './columns'
import DataTable from './DataTable'

type IntervalTableProps = {
  table: Array<ReturnDevDataTableItem>

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
