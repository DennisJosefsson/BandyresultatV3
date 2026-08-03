import type { ReturnDevDataTableItem } from '@/lib/types/table'
import type { Serie } from '@/lib/types/serie'
import MobileDataTable from './MobileDataTable'
import DataTable from './DataTable'
import { columns } from './columns'

type IntervalTableProps = {
  table: Array<ReturnDevDataTableItem>

  serie: Serie
}

const IntervalTable = ({ table, serie }: IntervalTableProps) => {
  return (
    <div>
      <div className="hidden sm:block">
        <DataTable
          serieStructure={serie.serieStructure}
          columns={columns}
          data={table}
          comment={serie.comment}
        />
      </div>
      <div className="sm:hidden">
        <MobileDataTable
          serieStructure={serie.serieStructure}
          columns={columns}
          data={table}
          comment={serie.comment}
        />
      </div>
    </div>
  )
}

export default IntervalTable
