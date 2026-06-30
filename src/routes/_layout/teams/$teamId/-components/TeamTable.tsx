import { Button } from '@/components/base/ui/button'
import { getRouteApi } from '@tanstack/react-router'
import type { VisibilityState } from '@tanstack/react-table'
import { useState } from 'react'
import {
  columns,
  gameColumns,
  goalsColumns,
} from './TableComponents/columns'
import DataTable from './TableComponents/DataTable'
import MobileDataTable from './TableComponents/MobileDataTable'

const route = getRouteApi('/_layout/teams/$teamId/tables/')

const TeamTable = () => {
  const data = route.useLoaderData()
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(goalsColumns)
  const [visibleColumns, setVisibleColumns] = useState<
    'goals' | 'games'
  >('goals')

  const onClickHandler = () => {
    if (visibleColumns === 'goals') {
      setColumnVisibility(gameColumns)
      setVisibleColumns('games')
    } else if (visibleColumns === 'games') {
      setColumnVisibility(goalsColumns)
      setVisibleColumns('goals')
    }
  }
  if (data.status === 404) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <h2 className="text-xs font-bold md:text-sm">
          {data.message}
        </h2>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="sm:hidden">
        <Button
          className="w-full"
          variant="outline"
          size="xs"
          onClick={onClickHandler}
        >
          {visibleColumns === 'games'
            ? 'Visa målkolumner'
            : 'Visa matchkolumner'}
        </Button>
      </div>
      <div>
        {data.tables.map((level) => {
          return (
            <div
              key={level.level}
              className="mb-2"
            >
              <div className="mb-2">
                <span className="text-[10px] md:text-sm font-semibold">
                  {level.levelName}
                </span>
              </div>
              <div>
                {level.tables.map((table) => {
                  return (
                    <div key={table.category}>
                      <h6 className="text-[10px] md:text-xs lg:text-sm xl:text-base font-semibold">
                        {table.categoryName}
                      </h6>
                      <div className="hidden sm:block max-w-3xl p-2">
                        <DataTable
                          columns={columns}
                          data={table.tables}
                        />
                      </div>
                      <div className="sm:hidden">
                        <MobileDataTable
                          columns={columns}
                          data={table.tables}
                          columnVisibility={
                            columnVisibility
                          }
                          setColumnVisibility={
                            setColumnVisibility
                          }
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TeamTable
