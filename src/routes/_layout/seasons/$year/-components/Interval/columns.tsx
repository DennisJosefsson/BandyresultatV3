import type { ColumnDef } from '@tanstack/react-table'

import type { ReturnDevDataTableItem } from '@/lib/types/table'

export const columns: Array<
  ColumnDef<ReturnDevDataTableItem>
> = [
  {
    accessorKey: 'team.casualName',
    header: () => (
      <div className="w-16 truncate text-left text-[8px] xs:text-[10px] sm:text-xs lg:w-32 lg:text-sm xl:text-base 2xl:text-lg">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-16 truncate text-left text-[8px] xs:text-[10px] sm:text-xs sm:w-28 xl:text-base 2xl:text-lg">
        {row.getValue('team_casualName')}
      </div>
    ),
    maxSize: 160,
  },

  {
    accessorKey: 'totalGames',
    header: () => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        M
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg tabular-nums">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: () => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        V
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg tabular-nums">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: () => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        O
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg tabular-nums">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: () => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        F
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg tabular-nums">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: () => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        GM
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg tabular-nums">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: () => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        IM
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg tabular-nums">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: () => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        MS
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg tabular-nums">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: () => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        P
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 lg:w-9 2xl:w-12 text-center text-[8px] xs:text-[10px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg tabular-nums">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  },
]
