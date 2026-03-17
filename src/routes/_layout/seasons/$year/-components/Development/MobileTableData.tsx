import type {
  ColumnDef,
  VisibilityState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/base/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { useState } from 'react'
import { gameColumns, goalsColumns } from './exports'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>
  teamObject: {
    [x: string]: number
  }
  serieStructure: number[] | null | undefined
  comment: string | null
}

const MobileDataTable = <TData, TValue>({
  columns,
  data,
  teamObject,
  serieStructure,
  comment,
}: DataTableProps<TData, TValue>) => {
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(goalsColumns)
  const [visibleColumns, setVisibleColumns] = useState<
    'goals' | 'games'
  >('goals')
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  })

  const { favTeams } = useFavTeam()

  const getString = (x: unknown): string => {
    if (!x) throw new Error('Missing string')

    return x as string
  }

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
        <Button
          className="w-full"
          variant="outline"
          size="xs"
          onClick={onClickHandler}
        >
          {visibleColumns === 'games'
            ? 'Visa målkolumner'
            : 'Visa matchkolumner'}
        </Button>
      </div>
      <Table>
        <TableCaption>{comment}</TableCaption>
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
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={
                  row.getIsSelected() && 'selected'
                }
                className={`${
                  favTeams.includes(
                    teamObject[
                      getString(
                        row.getValue('team_casualName'),
                      )
                    ],
                  )
                    ? 'font-bold'
                    : null
                } ${
                  serieStructure?.includes(index + 1)
                    ? 'border-foreground border-b-2'
                    : null
                }`}
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
    </div>
  )
}

export default MobileDataTable
