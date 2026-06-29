import { Button } from '@/components/base/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/base/ui/table'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import type { Game } from '@/lib/types/game'
import { cn } from '@/lib/utils/utils'
import {
  getRouteApi,
  useLocation,
} from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Fragment } from 'react/jsx-runtime'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>
  teamObject: {
    [x: string]: number
  }
}

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/games',
)

const DataTable = <TData, TValue>({
  columns,
  data,
  teamObject,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    state: { expanded: true },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => {
      const original = row.original as Omit<Game, 'season'>
      const penalties = !!original.penalties
      const extraTime = !!original.extraTime

      return penalties || extraTime
    },
  })

  const { favTeams } = useFavTeam()

  const origin = useLocation().pathname

  const getString = (x: unknown): string => {
    if (!x) throw new Error('Missing string')

    return x as string
  }

  return (
    <div>
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const original = row.original as Omit<
                Game,
                'season'
              >

              const expandedInfo =
                !!original.extraTime || !!original.penalties

              return (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={
                      row.getIsSelected() && 'selected'
                    }
                    className={cn(
                      '',
                      favTeams.includes(
                        teamObject[
                          getString(
                            row.getValue('home_casualName'),
                          )
                        ],
                      ) ||
                        favTeams.includes(
                          teamObject[
                            getString(
                              row.getValue(
                                'away_casualName',
                              ),
                            )
                          ],
                        )
                        ? 'font-bold'
                        : undefined,
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className="px-0 py-1"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    })}
                    <TableCell className="w-12">
                      <Button
                        size="responsive"
                        variant="default"
                        render={
                          <route.Link
                            to="/teams/compare"
                            search={(prev) => ({
                              ...prev,
                              teamArray: [
                                teamObject[
                                  getString(
                                    row.getValue(
                                      'home_casualName',
                                    ),
                                  )
                                ],
                                teamObject[
                                  getString(
                                    row.getValue(
                                      'away_casualName',
                                    ),
                                  )
                                ],
                              ],
                            })}
                            state={{ origin: origin }}
                          >
                            <span>H2H</span>
                          </route.Link>
                        }
                        nativeButton={false}
                      />
                    </TableCell>
                  </TableRow>
                  {row.getIsExpanded() && expandedInfo && (
                    <TableRow key={`${row.id}-expandedRow`}>
                      <TableCell
                        colSpan={6}
                        className="text-[8px] sm:text-[10px] md:text-xs xl:text-sm"
                      >
                        Matchen slutade {original.result}{' '}
                        efter full tid och avgjordes{' '}
                        {original.penalties
                          ? 'på straffar'
                          : original.extraTime
                            ? 'i förlängningen'
                            : 'på okänt vis'}
                        .
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
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
