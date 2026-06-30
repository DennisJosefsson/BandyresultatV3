import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import type { FiveSeason } from '@/lib/types/team'
import type { VisibilityState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import DataTable from './TableComponents/DataTable'
import { columns } from './TableComponents/fiveSeasonsColumns'
import MobileDataTable from './TableComponents/MobileDataTable'

type ComponentProps = {
  tables: FiveSeason['tables']
  season?: string
  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<
    SetStateAction<VisibilityState>
  >
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
            <Card
              key={table.group}
              className="mb-2"
              size="sm"
            >
              <CardHeader>
                <CardTitle className="xs:group-data-[size=sm]/card:text-xs group-data-[size=sm]/card:text-[10px] md:group-data-[size=sm]/card:text-sm">
                  {`${table.serie.serieName} ${season}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="hidden sm:block max-w-3xl p-2">
                  <DataTable
                    columns={columns}
                    data={[table]}
                  />
                </div>
                <div className="sm:hidden">
                  <MobileDataTable
                    columns={columns}
                    data={[table]}
                    columnVisibility={columnVisibility}
                    setColumnVisibility={
                      setColumnVisibility
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default FiveSeasonTeamTable
