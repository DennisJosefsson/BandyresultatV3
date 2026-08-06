import { Result } from '@/components/Common/Tables/GamesListItems'
import type { Game } from '@/lib/types/game'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: Array<
  ColumnDef<Omit<Game, 'season'>>
> = [
  {
    accessorKey: 'home.casualName',

    cell: ({ row }) => (
      <div className="ml-2 @md:ml-4 @xs:w-16 w-8 text-left @xl:w-28 @5xl:w-32">
        {row.getValue('home_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'game_id',

    cell: () => (
      <div className="w-4">
        <span>-</span>
      </div>
    ),
  },
  {
    accessorKey: 'away.casualName',

    cell: ({ row }) => (
      <div className="@xs:w-16 w-8 text-left @xl:w-28 @5xl:w-32">
        {row.getValue('away_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'result',

    cell: ({ row }) => (
      <Result>{row.getValue('result')}</Result>
    ),
  },
]
