import { Button } from '@/components/base/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/base/ui/table'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { Game } from '@/lib/types/game'
import { Link, useLocation } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { GitCompareArrowsIcon } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>
}

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
    <div className="border px-1 py-0.5 @2xl:px-2 shadow-xs @3xl:shadow-sm">
      <Table className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm">
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
                    data-expandedinfo={
                      expandedInfo ? true : false
                    }
                    data-favteam={
                      favTeams.includes(
                        original.homeTeamId,
                      ) ||
                      favTeams.includes(original.awayTeamId)
                        ? true
                        : false
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
                    <TableCell className="w-8">
                      <Button
                        size="sm"
                        variant="outline"
                        render={
                          <Link
                            from="/seasons/$year"
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
                            <GitCompareArrowsIcon className="@2xl:hidden" />
                            <span className="hidden @2xl:block">
                              H2H
                            </span>
                          </Link>
                        }
                        nativeButton={false}
                      />
                    </TableCell>
                  </TableRow>
                  {row.getIsExpanded() && expandedInfo && (
                    <TableRow key={`${row.id}-expandedRow`}>
                      <TableCell
                        colSpan={6}
                        className="px-1 py-0 text-[8px] xxs:text-[10px] xs:text-xs sm:text-sm 2xl:text-base break-all"
                      >
                        <p>
                          {original.result} vid full tid och
                          matchen avgjordes{' '}
                          {original.penalties
                            ? 'på straffar'
                            : original.extraTime
                              ? 'i förlängningen'
                              : 'på okänt vis'}
                          .
                        </p>
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
