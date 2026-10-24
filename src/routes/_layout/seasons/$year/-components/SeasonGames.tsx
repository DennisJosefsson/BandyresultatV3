import { Button } from '@/components/base/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/base/ui/popover'
import type { SeriesGamesV2 } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import GamesList from './Games/GamesList'

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
  if (games.played.length + games.unplayed.length === 0) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga matcher i {serie.serieName} än denna säsong.
      </div>
    )
  }

  return (
    <div className="@container mx-1 flex flex-col gap-2 @sm:gap-4">
      <div className="flex flex-row gap-x-12 items-center">
        <h3 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
          {serie.serieName}
        </h3>

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

      <div className="flex gap-4 @5xl:grid @5xl:grid-cols-2 mt-2">
        <GamesList
          games={games.played}
          title="Spelade"
          serie={serie}
        />
        <GamesList
          games={games.unplayed}
          title="Kommande"
          serie={serie}
        />
      </div>
    </div>
  )
}
