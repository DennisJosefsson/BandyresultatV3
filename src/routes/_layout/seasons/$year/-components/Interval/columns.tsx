import type { ColumnDef } from '@tanstack/react-table'
import type { ReturnDevDataTableItem } from '@/lib/types/table'

export const columns: Array<ColumnDef<ReturnDevDataTableItem>> = [
  {
    accessorKey: 'team.casualName',
    header: () => (
      <div className="xs:text-[10px] w-16 truncate text-left text-[8px] sm:text-xs lg:w-32 lg:text-sm xl:text-base 2xl:text-lg">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-16 truncate text-left text-[8px] sm:w-28 sm:text-xs xl:text-base 2xl:text-lg">
        {row.getValue('team_casualName')}
      </div>
    ),
    maxSize: 160,
  },

  {
    accessorKey: 'totalGames',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        M
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        V
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        O
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        F
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        GM
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        IM
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        MS
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        P
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  },
]
