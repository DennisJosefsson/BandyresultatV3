import type { ColumnDef } from '@tanstack/react-table'

import type { Game } from '@/lib/types/game'

export const columns: Array<
  ColumnDef<Omit<Game, 'season'>>
> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="w-16 truncate text-left sm:w-24 xl:w-32 text-[8px] xs:text-xs sm:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('home_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: () => (
      <div className="w-4 text-center tabular-nums text-[8px] xs:text-xs sm:text-sm xl:text-base 2xl:text-lg">
        <span>-</span>
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="w-16 truncate text-left sm:w-24 xl:w-32 text-[8px] xs:text-xs sm:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('away_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'result',

    cell: ({ row }) => (
      <div className="w-12 text-center tabular-nums text-[8px] xs:text-xs sm:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('result')}
      </div>
    ),
  },
]
