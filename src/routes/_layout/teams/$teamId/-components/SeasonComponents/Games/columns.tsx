import TeamLogo from '@/components/Common/TeamLogo'
import type { Game } from '@/lib/types/game'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: Array<ColumnDef<Game>> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="w-12 xs:w-16 text-left text-[8px] sm:w-28 sm:text-sm md:text-sm lg:text-base 2xl:w-32 flex flex-row gap-1 sm:gap-2 items-center">
        <TeamLogo
          size={32}
          teamId={row.original.homeTeamId}
          className="object-scale-down w-2 xs:w-3 sm:w-4 md:w-5"
          alt={row.original.home.casualName}
          title={row.original.home.casualName}
        />
        <span className="truncate">
          {row.getValue('home_casualName')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: () => (
      <div className="w-4 text-[8px] sm:text-sm md:text-sm lg:text-base">
        <span>-</span>
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="w-12 xs:w-16 text-left text-[8px] sm:w-28 sm:text-sm md:text-sm lg:text-base 2xl:w-32 flex flex-row gap-1 sm:gap-2 items-center">
        <TeamLogo
          size={32}
          teamId={row.original.awayTeamId}
          className="object-scale-down w-2 xs:w-3 sm:w-4 md:w-5"
          alt={row.original.away.casualName}
          title={row.original.away.casualName}
        />
        <span className="truncate">
          {row.getValue('away_casualName')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'result',
    accessorFn: (row) => {
      if (row.otResult) return row.otResult
      return row.result
    },
    cell: ({ row }) => (
      <div className="w-6 text-center text-[10px] sm:text-xs md:w-8 md:text-sm lg:w-10 lg:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('result')}
      </div>
    ),
  },
  {
    accessorKey: 'halftimeResult',
    cell: ({ row }) => (
      <div className="w-6 text-center text-[10px] sm:text-xs md:w-8 md:text-sm lg:w-10 lg:text-base 2xl:w-12 2xl:text-lg">
        <span>
          {row.getValue('halftimeResult') === null ||
          row.getValue('halftimeResult') === ''
            ? null
            : `(${row.getValue('halftimeResult')})`}
        </span>
      </div>
    ),
  },
]
