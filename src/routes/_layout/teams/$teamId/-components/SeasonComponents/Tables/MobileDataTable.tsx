import type { SortingState, VisibilityState } from '@tanstack/react-table'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import { Button } from '@/components/base/ui/button'
import { columns, gameColumns, goalsColumns } from './columns'

interface MobileDataTableProps {
  data: Array<TeamTable>
  serieStructure: Array<number> | null | undefined
}

const route = getRouteApi('/_layout/teams/$teamId/seasons/$seasonId/')

const MobileDataTable = ({ data, serieStructure }: MobileDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'totalPoints', desc: true },
    { id: 'totalGoalDifference', desc: true },
    { id: 'totalGoalsScored', desc: true },
    { id: 'team_casualName', desc: false },
  ])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(goalsColumns)
  const [visibleColumns, setVisibleColumns] = useState<'goals' | 'games'>('goals')
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

  const teamId = route.useParams({
    select: (s) => s.teamId,
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
      <div className="border px-1 py-0.5 shadow-xs md:shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <PositionHeader key={'position'} className="xxs:table-cell hidden">
                  P
                </PositionHeader>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-6 px-0">
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
                    <PositionCell key={`index-${index}`} className="xxs:table-cell hidden">
                      {index + 1}
                    </PositionCell>
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

export default MobileDataTable
