import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import type { ColumnDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>
  serieStructure: Array<number> | null | undefined
}

const DataTable = <TData, TValue>({
  columns,
  data,
  serieStructure,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { favTeams } = useCookies()

  return (
    <div className="border px-1 py-0.5 shadow-xs @xl/dev:px-2 @3xl/dev:shadow-sm mt-1">
      <Table className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
            table.getRowModel().rows.map((row, index) => {
              const original =
                row.original as ReturnDevDataTableItem
              return (
                <TableRow
                  key={row.id}
                  data-state={
                    row.getIsSelected() && 'selected'
                  }
                  data-favteam={
                    favTeams.includes(original.teamId)
                      ? true
                      : false
                  }
                  data-tabledivider={
                    serieStructure?.includes(index + 1)
                      ? true
                      : false
                  }
                  className="data-[tabledivider=true]:border-foreground data-[favteam=true]:font-semibold data-[tabledivider=true]:border-b-2"
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
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Inga tabeller.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
