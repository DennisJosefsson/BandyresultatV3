import { Button } from '@/components/base/ui/button'
import { getRouteApi } from '@tanstack/react-router'
import type { VisibilityState } from '@tanstack/react-table'
import { useState } from 'react'
import DataTable from './DataTable'
import MobileDataTable from './MobileDataTable'
import {
  columns,
  gameColumns,
  goalsColumns,
} from './columns'

const route = getRouteApi('/_layout/teams/compare')

const CompareTables = () => {
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

  if (data.status === 200) {
    const { allData, categoryData, homeTeam, awayTeam } =
      data
    return (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
          Alla matcher
        </h3>
        <span className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
          Tabeller för {homeTeam.casualName} med{' '}
          {awayTeam.casualName} som motståndare.
        </span>
        <div className="xs:hidden">
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
          <div className="mb-4 xs:mb-6">
            <div className="xs:block hidden w-full py-2 sm:w-120 xl:w-full xl:max-w-160">
              <DataTable
                columns={columns}
                data={allData}
              />
            </div>
            <div className="xs:hidden">
              <MobileDataTable
                columns={columns}
                data={allData}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
              />
            </div>
          </div>
          <h3 className="font-semibold text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
            Tabeller per division och serie
          </h3>
          {categoryData.map((division) => {
            return (
              <div
                key={division.division}
                className="mb-4"
              >
                <div>
                  <h5 className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
                    {division.divisionName}
                  </h5>
                </div>
                <div>
                  {division.tables.map((table) => {
                    return (
                      <div key={table.category}>
                        <h6 className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
                          {table.categoryName}
                        </h6>
                        <div className="xs:block hidden w-full py-2 sm:w-120 xl:w-full xl:max-w-160">
                          <DataTable
                            columns={columns}
                            data={table.tables}
                          />
                        </div>
                        <div className="xs:hidden">
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
}

export default CompareTables
