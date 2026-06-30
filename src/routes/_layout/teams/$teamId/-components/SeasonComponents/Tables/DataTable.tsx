import type { TeamTable } from '@/lib/types/table'
import { cn } from '@/lib/utils/utils'
import type { SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
// oxlint-disable no-unused-expressions
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import { columns } from './columns'

interface DataTableProps {
  data: Array<TeamTable>
  casualName: string
  serieStructure: Array<number> | null | undefined
}

const DataTable = ({
  data,
  serieStructure,
  casualName,
}: DataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'totalPoints', desc: true },
    { id: 'totalGoalDifference', desc: true },
    { id: 'totalGoalsScored', desc: true },
    { id: 'team_casualName', desc: false },
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

  const getString = (x: unknown): string => {
    if (!x) throw new Error('Missing string')

    return x as string
  }

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead
                key={'position'}
                className="hidden px-0 py-1 sm:table-cell sm:w-12 sm:px-2 xl:text-base 2xl:text-lg"
              >
                P
              </TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                data-state={
                  row.getIsSelected() && 'selected'
                }
                className={cn(
                  casualName ===
                    getString(
                      row.getValue('team_casualName'),
                    )
                    ? 'font-bold italic'
                    : null,
                  serieStructure?.includes(index + 1)
                    ? 'border-foreground border-b-2'
                    : null,
                )}
              >
                <TableCell
                  key={`index-${index}`}
                  className="hidden tabular-nums sm:table-cell sm:w-12 xl:text-base 2xl:text-lg"
                >
                  {index + 1}
                </TableCell>
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
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
