import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import type {
  ColumnDef,
  VisibilityState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>

  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<
    SetStateAction<VisibilityState>
  >
}

const MobileDataTable = <TData, TValue>({
  columns,
  data,

  columnVisibility,
  setColumnVisibility,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <Table className="text-[10px] lg:text-sm xl:text-base">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
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
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
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
  )
}

export default MobileDataTable
