import { Datum } from '@/components/Common/Date'
import type { Game } from '@/lib/types/game'
import { getRouteApi } from '@tanstack/react-router'
import GamesDataTable from './GamesDataTable'
import { columns } from './gamesColumn'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/development',
)

type DevelopmentGamesListProps = {
  games: Array<{
    date: string
    games: Array<Omit<Game, 'season'>>
  }>
}

const DevelopmentGamesList = ({
  games,
}: DevelopmentGamesListProps) => {
  const index = route.useSearch({ select: (s) => s.index })

  return (
    <div>
      <div className="text-[10px] font-semibold tracking-wide @sm/dev:text-xs @3xl/dev:text-sm mt-2">
        <Datum>{games[index]?.date}</Datum>
      </div>
      <GamesDataTable
        columns={columns}
        data={games[index]?.games}
      />
    </div>
  )
}

export default DevelopmentGamesList
