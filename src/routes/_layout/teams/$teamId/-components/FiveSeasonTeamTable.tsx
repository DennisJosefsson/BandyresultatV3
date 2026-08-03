import type { Dispatch, SetStateAction } from 'react'
import type { VisibilityState } from '@tanstack/react-table'
import type { FiveSeason } from '@/lib/types/team'
import MobileDataTable from './TableComponents/MobileDataTable'
import { columns } from './TableComponents/fiveSeasonsColumns'
import DataTable from './TableComponents/DataTable'

type ComponentProps = {
  tables: FiveSeason['tables']
  season?: string
  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>
}

const FiveSeasonTeamTable = ({
  tables,
  season = '',
  columnVisibility,
  setColumnVisibility,
}: ComponentProps) => {
  return (
    <div className="my-4">
      <div>
        {tables.map((table) => {
          return (
            <div key={table.group} className="mb-2">
              <div>
                <span className="xs:text-xs text-[10px] font-semibold md:text-sm">
                  {`${table.serie.serieName} ${season}`}
                </span>
              </div>
              <div>
                <div className="msm:block hidden max-w-3xl p-2">
                  <DataTable columns={columns} data={[table]} />
                </div>
                <div className="msm:hidden">
                  <MobileDataTable
                    columns={columns}
                    data={[table]}
                    columnVisibility={columnVisibility}
                    setColumnVisibility={setColumnVisibility}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FiveSeasonTeamTable
