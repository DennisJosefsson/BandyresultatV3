import type { ColumnDef } from '@tanstack/react-table'

import type { Game } from '@/lib/types/game'

export const columns: Array<
  ColumnDef<Omit<Game, 'season'>>
> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="w-12 text-left text-[10px] sm:text-xs md:text-sm sm:w-24 2xl:w-32 lg:text-base 2xl:text-lg">
        {row.getValue('home_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: () => (
      <div className="w-4 text-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-lg">
        <span>-</span>
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="w-12 text-left text-[10px] sm:text-xs md:text-sm sm:w-24 2xl:w-32 lg:text-base 2xl:text-lg">
        {row.getValue('away_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'result',

    cell: ({ row }) => (
      <div className="w-6 md:w-8 lg:w-10 2xl:w-12 text-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-lg">
        {row.getValue('result')}
      </div>
    ),
  },
  {
    accessorKey: 'halftimeResult',
    cell: ({ row }) => (
      <div className="w-6 md:w-8 lg:w-10 2xl:w-12 text-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-lg">
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
    accessorKey: 'penalties',
    cell: ({ row }) => (
      <div className="w-6 md:w-8 lg:w-10 2xl:w-12 text-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-lg">
        <span>
          {row.getValue('penalties') === true ? 'S' : null}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'extraTime',
    cell: ({ row }) => (
      <div className="w-6 md:w-8 lg:w-10 2xl:w-12 text-center text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-lg">
        <span>
          {row.getValue('extraTime') === true ? 'ÖT' : null}
        </span>
      </div>
    ),
  },
]
