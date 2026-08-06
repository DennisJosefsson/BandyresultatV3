import {
  Divider,
  Result,
  TeamName,
} from '@/components/Common/Tables/GamesListItems'
import TeamLogo from '@/components/Common/TeamLogo'
import type { Game } from '@/lib/types/game'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: Array<ColumnDef<Game>> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <TeamName>
        <span className="truncate">
          {row.getValue('home_casualName')}
        </span>
      </TeamName>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: ({ row }) => (
      <Divider>
        <TeamLogo
          size={32}
          teamId={row.original.homeTeamId}
          className="@sm:block hidden size-[1lh] object-scale-down"
          alt={row.original.home.casualName}
          title={row.original.home.casualName}
        />
        <span className="text-center">-</span>
        <TeamLogo
          size={32}
          teamId={row.original.awayTeamId}
          className="@sm:block hidden size-[1lh] object-scale-down"
          alt={row.original.away.casualName}
          title={row.original.away.casualName}
        />
      </Divider>
    ),
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <TeamName>
        <span className="truncate">
          {row.getValue('away_casualName')}
        </span>
      </TeamName>
    ),
  },
  {
    accessorKey: 'result',
    accessorFn: (row) => {
      if (row.otResult) return row.otResult
      return row.result
    },
    cell: ({ row }) => (
      <Result>{row.getValue('result')}</Result>
    ),
  },
  {
    accessorKey: 'halftimeResult',
    cell: ({ row }) => (
      <Result>
        <span className="hidden @3xs:block">
          {row.getValue('halftimeResult') === null ||
          row.getValue('halftimeResult') === ''
            ? null
            : `(${row.getValue('halftimeResult')})`}
        </span>
      </Result>
    ),
  },
]
