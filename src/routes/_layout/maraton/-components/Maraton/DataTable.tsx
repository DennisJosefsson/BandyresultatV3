import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { MaratonTable } from '@/lib/types/table'
import { useCookies } from '@/lib/contexts/cookieContext'
import { PositionCell, PositionHeader } from '@/components/Common/Tables/Number'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>
}

const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'totalPoints', desc: true },
    { id: 'totalGoalDifference', desc: true },
    { id: 'totalGoalsScored', desc: true },
    { id: 'team_name', desc: false },
  ])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  const { favTeams } = useCookies()

  return (
    <div className="border p-2 shadow-xs md:shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <PositionHeader key={'position'}>P</PositionHeader>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="px-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => {
              const original = row.original as MaratonTable
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  data-favteam={favTeams.includes(original.teamId) ? true : false}
                  className="data-[favteam=true]:font-semibold"
                >
                  <PositionCell key={`index-${index}`} className="xxs:table-cell hidden">
                    {index + 1}
                  </PositionCell>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
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
                Inga resultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
