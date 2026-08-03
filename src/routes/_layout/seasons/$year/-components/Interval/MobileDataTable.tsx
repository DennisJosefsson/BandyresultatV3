import type { ColumnDef, VisibilityState } from '@tanstack/react-table'
import { useState } from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import { useCookies } from '@/lib/contexts/cookieContext'
import { PositionCell, PositionHeader } from '@/components/Common/Tables/Number'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import { Button } from '@/components/base/ui/button'
import { gameColumns, goalsColumns } from './exports'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>
  serieStructure: Array<number> | null | undefined
  comment: string | null
}

const DataTable = <TData, TValue>({
  columns,
  data,
  serieStructure,
  comment,
}: DataTableProps<TData, TValue>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(goalsColumns)
  const [visibleColumns, setVisibleColumns] = useState<'goals' | 'games'>('goals')
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  })

  const { favTeams } = useCookies()

  const onClickHandler = () => {
    if (visibleColumns === 'goals') {
      setColumnVisibility(gameColumns)
      setVisibleColumns('games')
    } else if (visibleColumns === 'games') {
      setColumnVisibility(goalsColumns)
      setVisibleColumns('goals')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button className="w-full" variant="outline" size="xs" onClick={onClickHandler}>
          {visibleColumns === 'games' ? 'Visa målkolumner' : 'Visa matchkolumner'}
        </Button>
      </div>
      <div className="border px-1 py-0.5 shadow-xs sm:p-2 md:shadow-sm">
        <Table>
          <TableCaption>{comment}</TableCaption>
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
                const original = row.original as ReturnDevDataTableItem
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    data-favteam={favTeams.includes(original.teamId) ? true : false}
                    data-tabledivider={serieStructure?.includes(index + 1) ? true : false}
                    className="data-[tabledivider=true]:border-foreground data-[favteam=true]:font-semibold data-[tabledivider=true]:border-b-2"
                  >
                    <PositionCell key={`index-${index}`}>{index + 1}</PositionCell>
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
                  Inga resultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable
