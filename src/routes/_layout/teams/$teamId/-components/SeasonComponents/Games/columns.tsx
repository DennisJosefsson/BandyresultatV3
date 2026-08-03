import type { ColumnDef } from '@tanstack/react-table'
import type { Game } from '@/lib/types/game'
import TeamLogo from '@/components/Common/TeamLogo'

export const columns: Array<ColumnDef<Game>> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="xs:w-16 flex w-12 flex-row items-center gap-1 text-left text-[8px] sm:w-28 sm:gap-2 sm:text-sm lg:text-base 2xl:w-32">
        <span className="truncate">{row.getValue('home_casualName')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: ({ row }) => (
      <div className="xxs:gap-1 msm:gap-2 flex flex-row items-center justify-evenly gap-0.5 text-[8px] sm:text-sm lg:text-base">
        <TeamLogo
          size={32}
          teamId={row.original.homeTeamId}
          className="xxs:block hidden size-[1lh] object-scale-down"
          alt={row.original.home.casualName}
          title={row.original.home.casualName}
        />
        <span className="w-4 text-center">-</span>
        <TeamLogo
          size={32}
          teamId={row.original.awayTeamId}
          className="xxs:block hidden size-[1lh] object-scale-down"
          alt={row.original.away.casualName}
          title={row.original.away.casualName}
        />
      </div>
    ),
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="xs:w-16 flex w-12 flex-row items-center gap-1 text-left text-[8px] sm:w-28 sm:gap-2 sm:text-sm lg:text-base 2xl:w-32">
        <span className="truncate">{row.getValue('away_casualName')}</span>
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
      <div className="w-6 text-center text-[8px] sm:text-sm md:w-8 lg:w-10 lg:text-base 2xl:w-12 2xl:text-lg">
        {row.getValue('result')}
      </div>
    ),
  },
  {
    accessorKey: 'halftimeResult',
    cell: ({ row }) => (
      <div className="w-6 text-center text-[8px] sm:text-sm md:w-8 lg:w-10 lg:text-base 2xl:w-12 2xl:text-lg">
        <span>
          {row.getValue('halftimeResult') === null || row.getValue('halftimeResult') === ''
            ? null
            : `(${row.getValue('halftimeResult')})`}
        </span>
      </div>
    ),
  },
]
