import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { seasonTable } from '@/lib/types/tables/seasonTable'
import { cn } from '@/lib/utils/utils'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { z } from 'zod'
import { columns, hideColumns, showColumns } from './columns'

interface DataTableProps {
  data: z.infer<typeof seasonTable>[]
  casualName: string
  serieStructure: number[] | null | undefined
}

const DataTable = ({ data, serieStructure, casualName }: DataTableProps) => {
  const matches = useMediaQuery('(min-width: 640px)')
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'totalPoints', desc: true },
    { id: 'totalGoalDifference', desc: true },
    { id: 'totalGoalsScored', desc: true },
    { id: 'team_casualName', desc: false },
  ])
  const [columnVisibility, setColumnVisibility] = useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  })

  useEffect(() => {
    matches
      ? setColumnVisibility(showColumns)
      : setColumnVisibility(hideColumns)
  }, [matches])

  const getString = (x: unknown): string => {
    if (!x) throw new Error('Missing string')

    return x as string
  }

  return (
    <div>
      <Table className="text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead
                key={'position'}
                className="hidden px-0 py-1 sm:table-cell sm:w-12 sm:px-2"
              >
                P
              </TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`max-w-[${header.column.getSize()}px]`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={cn(
                  casualName === getString(row.getValue('team_casualName'))
                    ? 'font-bold italic'
                    : null,
                  serieStructure?.includes(index + 1)
                    ? 'border-b-2 border-foreground'
                    : null
                )}
              >
                <TableCell
                  key={`index-${index}`}
                  className="hidden tabular-nums sm:table-cell sm:w-12"
                >
                  {index + 1}
                </TableCell>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={`px-0 py-1 max-w-[${cell.column.getSize()}px]`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
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
