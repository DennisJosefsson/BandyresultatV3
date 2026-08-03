import type { SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { getRouteApi } from '@tanstack/react-router'
import type { TeamTable } from '@/lib/types/table'
import { useCookies } from '@/lib/contexts/cookieContext'
import { PositionCell, PositionHeader } from '@/components/Common/Tables/Number'
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
  serieStructure: Array<number> | null | undefined
}

const route = getRouteApi('/_layout/teams/$teamId/seasons/$seasonId/')

const DataTable = ({ data, serieStructure }: DataTableProps) => {
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

  const teamId = route.useParams({
    select: (s) => s.teamId,
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
              const original = row.original as TeamTable
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  data-currentteam={teamId === original.teamId ? true : false}
                  data-tabledivider={serieStructure?.includes(index + 1) ? true : false}
                  data-favteam={favTeams.includes(original.teamId) ? true : false}
                  className="data-[currentteam=true]:bg-muted/50 data-[tabledivider=true]:border-foreground data-[favteam=true]:font-semibold data-[tabledivider=true]:border-b-2"
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
  )
}

export default DataTable
