import { ColumnDef } from '@tanstack/react-table'

import { ReturnDevDataTableItem } from '@/lib/types/table'

export const columns: ColumnDef<ReturnDevDataTableItem>[] = [
  {
    accessorKey: 'team.casualName',
    header: () => (
      <div className="w-6 truncate text-left text-[10px] sm:w-24 lg:w-32 lg:text-sm xl:text-base 2xl:text-lg">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-6 truncate text-left sm:w-28 xl:text-base 2xl:text-lg">
        {row.getValue('team_casualName')}
      </div>
    ),
    maxSize: 160,
  },

  {
    accessorKey: 'totalGames',
    header: () => <div className="text-center text-[10px] lg:text-sm">M</div>,
    cell: ({ row }) => (
      <div className="text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: () => <div className="text-center text-[10px] lg:text-sm">V</div>,
    cell: ({ row }) => (
      <div className="text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: () => <div className="text-center text-[10px] lg:text-sm">O</div>,
    cell: ({ row }) => (
      <div className="text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: () => <div className="text-center text-[10px] lg:text-sm">F</div>,
    cell: ({ row }) => (
      <div className="text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: () => <div className="text-center text-[10px] lg:text-sm">GM</div>,
    cell: ({ row }) => (
      <div className="text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: () => <div className="text-center text-[10px] lg:text-sm">IM</div>,
    cell: ({ row }) => (
      <div className="text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: () => <div className="text-center text-[10px] lg:text-sm">MS</div>,
    cell: ({ row }) => (
      <div className="text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: () => <div className="text-center text-[10px] lg:text-sm">P</div>,
    cell: ({ row }) => (
      <div className="text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  },
]
