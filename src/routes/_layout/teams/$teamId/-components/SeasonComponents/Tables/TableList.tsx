import type { TeamSeasonTableV2 } from '@/lib/types/table'
import DataTable from './DataTable'
import MobileDataTable from './MobileDataTable'

type TableListProps = {
  tableArray: Array<TeamSeasonTableV2>
  serieStructure: Array<number> | null | undefined
}

const TableList = ({
  tableArray,
  serieStructure,
}: TableListProps) => {
  if (tableArray.length === 0) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Inga tabeller för denna serie.
        </p>
      </div>
    )
  }
  return (
    <div>
      <div className="hidden flex-col gap-2 @lg:flex">
        <DataTable
          data={tableArray}
          serieStructure={serieStructure}
        />
      </div>
      <div className="flex flex-col gap-2 @lg:hidden">
        <MobileDataTable
          data={tableArray}
          serieStructure={serieStructure}
        />
      </div>
    </div>
  )
}

export default TableList
