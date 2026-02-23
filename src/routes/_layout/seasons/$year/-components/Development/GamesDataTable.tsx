import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { cn } from '@/lib/utils/utils'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  teamObject: {
    [x: string]: number
  }
}

const GamesDataTable = <TData, TValue>({
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

export default GamesDataTable
