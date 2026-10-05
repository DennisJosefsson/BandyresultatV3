import { Button } from '@/components/base/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/base/ui/popover'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { SeriesGamesV2 } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import GamesList from './Games/GamesList'
import GamePreference from './shared/games/GamePreference'

type SeasonGamesProps = {
  games: {
    played: Array<SeriesGamesV2>
    unplayed: Array<SeriesGamesV2>
  }
  serie: Serie
}

export const SeasonGames = ({
  games,
  serie,
}: SeasonGamesProps) => {
  const {
    sortGames: sortPreference,
    sortPlayedGames,
    sortUnplayedGames,
  } = useCookies()

  if (games.played.length + games.unplayed.length === 0) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga matcher i {serie.serieName} än denna säsong.
      </div>
    )
  }

  const playedGames =
    sortPlayedGames === 'asc'
      ? games.played
      : games.played.toReversed()
  const unplayedGames =
    sortUnplayedGames === 'desc'
      ? games.unplayed
      : games.unplayed.toReversed()

  return (
    <div className="@container mx-1 flex flex-col gap-2 @sm:gap-4">
      <div className="flex flex-row gap-x-12 items-center">
        <h3 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
          {serie.serieName}
        </h3>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline">
                Sidinställningar
              </Button>
            }
          />
          <PopoverContent>
            <GamePreference />
          </PopoverContent>
        </Popover>
        {serie.comment ? (
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline">Kommentar</Button>
              }
            />
            <PopoverContent>
              <span className="p-2 text-xs @sm:text-sm font-semibold">
                {serie.comment}
              </span>
            </PopoverContent>
          </Popover>
        ) : null}
      </div>

      <div
        data-sort={sortPreference}
        className="flex gap-4 @5xl:grid @5xl:grid-cols-2 mt-2 data-[sort=played]:flex-col data-[sort=unplayed]:flex-col-reverse"
      >
        <GamesList
          games={playedGames}
          title="Spelade"
          serie={serie}
        />
        <GamesList
          games={unplayedGames}
          title="Kommande"
          serie={serie}
        />
      </div>
    </div>
  )
}
