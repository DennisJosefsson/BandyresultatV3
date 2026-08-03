import type { ColumnDef } from '@tanstack/react-table'
import type { Game } from '@/lib/types/game'

export const columns: Array<ColumnDef<Omit<Game, 'season'>>> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="xs:text-[10px] w-16 truncate text-left text-[8px] sm:w-24 sm:text-xs lg:text-sm xl:w-32 xl:text-base">
        {row.getValue('home_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: () => (
      <div className="xs:text-[10px] w-4 text-center text-[8px] tabular-nums sm:text-xs lg:text-sm xl:text-base">
        <span>-</span>
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="xs:text-[10px] w-16 truncate text-left text-[8px] sm:w-24 sm:text-xs lg:text-sm xl:w-32 xl:text-base">
        {row.getValue('away_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'result',

    cell: ({ row }) => (
      <div className="xs:text-[10px] w-12 text-center text-[8px] tabular-nums sm:text-xs lg:text-sm xl:text-base">
        {row.getValue('result')}
      </div>
    ),
  },
]
