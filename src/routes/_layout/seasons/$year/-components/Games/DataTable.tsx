import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { cn } from '@/lib/utils/utils'
import { getRouteApi, useLocation } from '@tanstack/react-router'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMediaQuery } from 'usehooks-ts'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  teamObject: {
    [x: string]: number
  }
}

const route = getRouteApi('/_layout/seasons/$year/$group/games')

const DataTable = <TData, TValue>({
  columns,
  data,
  teamObject,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { favTeams } = useFavTeam()

  const matches = useMediaQuery('(min-width: 768px)')

  const origin = useLocation().pathname

  const getString = (x: unknown): string => {
    if (!x) throw new Error('Missing string')

    return x as string
  }

  return (
    <div>
      <Table className="text-[10px] lg:text-sm xl:text-base">
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={cn(
                  '',
                  favTeams.includes(
                    teamObject[getString(row.getValue('home_casualName'))],
                  ) ||
                    favTeams.includes(
                      teamObject[getString(row.getValue('away_casualName'))],
                    )
                    ? 'font-bold'
                    : undefined,
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className="px-0 py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
                <TableCell className="w-12">
                  <Button
                    size={matches ? 'sm' : 'xs'}
                    variant="default"
                    asChild
                  >
                    <route.Link
                      to="/teams/compare"
                      search={(prev) => ({
                        ...prev,
                        teamArray: [
                          teamObject[
                            getString(row.getValue('home_casualName'))
                          ],
                          teamObject[
                            getString(row.getValue('away_casualName'))
                          ],
                        ],
                      })}
                      state={{ origin: origin }}
                    >
                      <span className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
                        H2H
                      </span>
                    </route.Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Inga matcher.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
