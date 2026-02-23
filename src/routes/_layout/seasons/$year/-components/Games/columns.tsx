import { ColumnDef } from '@tanstack/react-table'

import { Game } from '@/lib/types/game'

export const columns: ColumnDef<Omit<Game, 'season'>>[] = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="w-6 truncate text-left sm:w-24 lg:w-32 xl:text-base 2xl:text-lg">
        {row.getValue('home_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: () => (
      <div className="w-4 text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        <span>-</span>
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="w-6 truncate text-left sm:w-24 lg:w-32 xl:text-base 2xl:text-lg">
        {row.getValue('away_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'result',

    cell: ({ row }) => (
      <div className="w-12 text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('result')}
      </div>
    ),
  },
  {
    accessorKey: 'halftimeResult',
    cell: ({ row }) => (
      <div className="w-12 text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
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
      <div className="w-12 text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        <span>{row.getValue('penalties') === true ? 'S' : null}</span>
      </div>
    ),
  },
  {
    accessorKey: 'extraTime',
    cell: ({ row }) => (
      <div className="w-12 text-center text-[10px] tabular-nums lg:text-sm xl:text-base 2xl:text-lg">
        <span>{row.getValue('extraTime') === true ? 'ÖT' : null}</span>
      </div>
    ),
  },
]
