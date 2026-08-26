import type { Competition } from '@/lib/types/team'
import type { VisibilityState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import DataTable from './TableComponents/DataTable'
import MobileDataTable from './TableComponents/MobileDataTable'
import { columns } from './TableComponents/fiveSeasonsColumns'

type ComponentProps = {
  tables: Competition['tables']
  competitionName: string
  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<
    SetStateAction<VisibilityState>
  >
}

const FiveSeasonTeamTable = ({
  tables,
  competitionName,
  columnVisibility,
  setColumnVisibility,
}: ComponentProps) => {
  return (
    <div>
      <span className="xs:text-xs text-[10px] font-semibold md:text-sm">
        {competitionName}
      </span>
      <div>
        {tables.map((table) => {
          return (
            <div
              key={table.group}
              className="@container/latest mb-2"
            >
              <div>
                <span className="xs:text-xs text-[10px] font-semibold md:text-sm">
                  {table.serie.serieName}
                </span>
              </div>
              <div>
                <div className="@lg:block hidden w-full p-2 @3xl:w-160">
                  <DataTable
                    columns={columns}
                    data={[table]}
                  />
                </div>
                <div className="@lg:hidden">
                  <MobileDataTable
                    columns={columns}
                    data={[table]}
                    columnVisibility={columnVisibility}
                    setColumnVisibility={
                      setColumnVisibility
                    }
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
