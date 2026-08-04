import { Button } from '@/components/base/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/base/ui/table'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { Game } from '@/lib/types/game'
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
}

const route = getRouteApi(
  '/_layout/teams/$teamId/seasons/$seasonId/',
)

const DataTable = <TData, TValue>({
  columns,
  data,
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

  const { favTeams } = useCookies()

  const origin = useLocation().pathname

  return (
    <div className="mb-1 ml-1 border px-1 shadow-xs sm:px-2 md:mb-3 md:ml-2 md:shadow-sm">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const original = row.original as Game

              const expandedInfo =
                !!original.extraTime || !!original.penalties

              return (
                <Fragment
                  key={`${row.id}-${original.gameId}`}
                >
                  <TableRow
                    data-state={
                      row.getIsSelected() && 'selected'
                    }
                    data-favteam={
                      favTeams.includes(
                        original.homeTeamId,
                      ) ||
                      favTeams.includes(original.awayTeamId)
                        ? true
                        : false
                    }
                    data-expandedinfo={
                      expandedInfo ? true : false
                    }
                    className="data-[expandedinfo=true]:border-none data-[favteam=true]:font-semibold"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
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
                                original.homeTeamId,
                                original.awayTeamId,
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
                        className="xs:text-[8px] p-0 pb-1 text-[7px] sm:text-[10px] md:text-xs xl:text-sm"
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
