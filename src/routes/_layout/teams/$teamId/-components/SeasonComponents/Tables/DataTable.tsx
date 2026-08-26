import {
  PositionCell,
  PositionHeader,
} from '@/components/Common/Tables/Number'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { TeamTable } from '@/lib/types/table'
import { getRouteApi } from '@tanstack/react-router'
import type { SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/base/ui/table'
import {
  TeamLogoCell,
  TeamLogoHeader,
} from '@/components/Common/Tables/Teamname'
import TeamLogo from '@/components/Common/TeamLogo'
import { columns } from './columns'

interface DataTableProps {
  data: Array<Omit<TeamTable, 'women' | 'season' | 'group'>>
  serieStructure: Array<number> | null | undefined
}

const route = getRouteApi(
  '/_layout/teams/$teamId/seasons/$seasonId/',
)

const DataTable = ({
  data,
  serieStructure,
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

  const teamId = route.useParams({
    select: (s) => s.teamId,
  })
  const { favTeams } = useCookies()
  return (
    <div className="border p-2 shadow-xs md:shadow-sm">
      <Table className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <PositionHeader
                key={'position'}
                className="hidden @xs:table-cell"
              >
                <span className="hidden @xs:invisible">
                  P
                </span>
              </PositionHeader>
              <TeamLogoHeader className="hidden @xs:table-cell">
                <span className="hidden @xs:invisible">
                  Lag
                </span>
              </TeamLogoHeader>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="py-1"
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
            table.getRowModel().rows.map((row, index) => {
              const original = row.original as TeamTable
              return (
                <TableRow
                  key={row.id}
                  data-state={
                    row.getIsSelected() && 'selected'
                  }
                  data-currentteam={
                    teamId === original.teamId
                      ? true
                      : false
                  }
                  data-tabledivider={
                    serieStructure?.includes(index + 1)
                      ? true
                      : false
                  }
                  data-favteam={
                    favTeams.includes(original.teamId)
                      ? true
                      : false
                  }
                  className="data-[currentteam=true]:bg-muted/50 data-[tabledivider=true]:border-foreground data-[favteam=true]:font-semibold data-[tabledivider=true]:border-b-2"
                >
                  <PositionCell
                    key={`index-${index}`}
                    className="@xs:table-cell hidden py-1"
                  >
                    {index + 1}
                  </PositionCell>
                  <TeamLogoCell className="@xs:table-cell hidden w-8 py-1">
                    <TeamLogo
                      size={32}
                      teamId={original.team.teamId}
                      className="size-[1lh] object-scale-down"
                      alt={original.team.casualName}
                      title={original.team.casualName}
                    />
                  </TeamLogoCell>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className="py-1"
                      >
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
