import type { ColumnDef } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { Game } from '@/lib/types/game'
import { useCookies } from '@/lib/contexts/cookieContext'
import { Table, TableBody, TableCell, TableRow } from '@/components/base/ui/table'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>
}

const GamesDataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { favTeams } = useCookies()

  return (
    <div className="border px-1 py-0.5 shadow-xs sm:p-2 md:shadow-sm">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const original = row.original as Omit<Game, 'season'>
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  data-favteam={
                    favTeams.includes(original.homeTeamId) || favTeams.includes(original.awayTeamId)
                      ? true
                      : false
                  }
                  className="data-[favteam=true]:font-semibold"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} className="px-0 py-1">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
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

export default GamesDataTable
