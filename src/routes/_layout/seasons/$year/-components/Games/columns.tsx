import type { ColumnDef } from '@tanstack/react-table'

import type { Game } from '@/lib/types/game'

export const columns: Array<
  ColumnDef<Omit<Game, 'season'>>
> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="w-12 text-left text-[8px] sm:text-sm lg:text-base md:text-sm sm:w-24 2xl:w-32">
        {row.getValue('home_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: () => (
      <div className="w-4 text-[8px] sm:text-sm lg:text-base md:text-sm">
        <span>-</span>
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="w-12 text-left text-[8px] sm:text-sm lg:text-base md:text-sm sm:w-24 2xl:w-32">
        {row.getValue('away_casualName')}
      </div>
    ),
  },
  {
    accessorFn: (row) =>
      row.otResult
        ? `${row.otResult} (${row.result})`
        : row.result,
    accessorKey: 'result',

    cell: ({ row }) => (
      <div className="w-6 md:w-8 lg:w-10 2xl:w-12 tabular-nums text-[8px] sm:text-sm lg:text-base md:text-sm">
        {row.getValue('result')}
      </div>
    ),
  },
  {
    accessorKey: 'halftimeResult',
    cell: ({ row }) => (
      <div className="w-6 md:w-8 lg:w-10 2xl:w-12 tabular-nums text-[8px] sm:text-sm lg:text-base md:text-sm">
        <span>
          {row.getValue('halftimeResult') === null ||
          row.getValue('halftimeResult') === ''
            ? null
            : `(${row.getValue('halftimeResult')})`}
        </span>
      </div>
    ),
  },
  {
    id: 'decider',
    accessorFn: (row) => {
      if (row.penalties) {
        return 'S'
      } else if (row.extraTime) {
        return 'ÖT'
      } else {
        return null
      }
    },

    cell: ({ row }) => (
      <div className="w-6 md:w-8 lg:w-10 2xl:w-12 tabular-nums text-[8px] sm:text-sm lg:text-base md:text-sm">
        <span>{row.getValue('decider')}</span>
      </div>
    ),
  },
]
