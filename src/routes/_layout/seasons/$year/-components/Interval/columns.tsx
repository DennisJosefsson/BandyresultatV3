import TeamLogo from '@/components/Common/TeamLogo'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: Array<
  ColumnDef<ReturnDevDataTableItem>
> = [
  {
    accessorKey: 'team.casualName',
    header: () => (
      <div className="xs:text-[10px] w-16 truncate text-left text-[8px] sm:text-xs lg:w-32 lg:text-sm xl:text-base">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-16 truncate text-left text-[8px] sm:w-28 sm:text-xs xl:text-base  flex flex-row items-center gap-1 sm:gap-2">
        <TeamLogo
          size={32}
          teamId={row.original.teamId}
          className="object-scale-down w-2 xs:w-3 sm:w-4 md:w-5"
          alt={row.original.team.casualName}
          title={row.original.team.casualName}
        />
        <span className="truncate">
          {row.getValue('team_casualName')}
        </span>
      </div>
    ),
    maxSize: 160,
  },

  {
    accessorKey: 'totalGames',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        M
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        V
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        O
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        F
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        GM
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        IM
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        MS
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        P
      </div>
    ),
    cell: ({ row }) => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:w-9 lg:text-sm xl:text-base 2xl:w-12">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  },
]
