import type { ColumnDef } from '@tanstack/react-table'
import type { Game } from '@/lib/types/game'

export const columns: Array<ColumnDef<Omit<Game, 'season'>>> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="xs:text-xs w-16 truncate text-left text-[8px] sm:w-24 sm:text-sm xl:w-32 xl:text-base 2xl:text-lg">
        {row.getValue('home_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: () => (
      <div className="xs:text-xs w-4 text-center text-[8px] tabular-nums sm:text-sm xl:text-base 2xl:text-lg">
        <span>-</span>
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="xs:text-xs w-16 truncate text-left text-[8px] sm:w-24 sm:text-sm xl:w-32 xl:text-base 2xl:text-lg">
        {row.getValue('away_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'result',

    cell: ({ row }) => (
      <div className="xs:text-xs w-12 text-center text-[8px] tabular-nums sm:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('result')}
      </div>
    ),
  },
]
