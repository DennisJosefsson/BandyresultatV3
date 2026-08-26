import { Button } from '@/components/base/ui/button'
import { getRouteApi } from '@tanstack/react-router'
import type { VisibilityState } from '@tanstack/react-table'
import { useState } from 'react'
import DataTable from './TableComponents/DataTable'
import MobileDataTable from './TableComponents/MobileDataTable'
import {
  columns,
  gameColumns,
  goalsColumns,
} from './TableComponents/columns'

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
    <div className="flex flex-col gap-2 mt-2 sm:mt-4">
      <div className="msm:hidden">
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
        {data.tables.map((division) => {
          return (
            <div
              key={division.division}
              className="mb-2"
            >
              <div className="mb-2">
                <span className="text-[10px] font-semibold md:text-sm">
                  {division.divisionName}
                </span>
              </div>
              <div>
                {division.tables.map((table) => {
                  return (
                    <div
                      key={table.category}
                      className="@container/teamtable"
                    >
                      <h6 className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm">
                        {table.categoryName}
                      </h6>
                      <div className="@lg:block hidden w-full p-2 @3xl:w-160">
                        <DataTable
                          columns={columns}
                          data={table.tables}
                        />
                      </div>
                      <div className="@lg:hidden">
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
