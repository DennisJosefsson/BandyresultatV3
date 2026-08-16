import { Button } from '@/components/base/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/base/ui/popover'
import { useCookies } from '@/lib/contexts/cookieContext'
import type { PlayoffGames } from '@/lib/types/game'
import PlayoffGamesPreference from '../../shared/games/PlayoffGamesPreference'
import Games from '../Games'

type PlayoffGamesProps = {
  games: PlayoffGames
}

const PlayoffGames = ({ games }: PlayoffGamesProps) => {
  const { sortGames: sortPreference } = useCookies()
  return (
    <div className="@container/playoff mx-1 flex flex-col gap-2 @sm/playoff:gap-4">
      <div className="flex flex-row gap-x-12 items-center">
        <h3 className="text-primary font-semibold tracking-wider text-sm">
          Slutspel
        </h3>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline">
                Sidinställningar
              </Button>
            }
          />
          <PopoverContent className="max-w-72">
            <PlayoffGamesPreference />
          </PopoverContent>
        </Popover>
      </div>
      <div
        data-sort={sortPreference}
        className="flex gap-4 @5xl:grid @5xl:grid-cols-2 mt-2 data-[sort=played]:flex-col data-[sort=unplayed]:flex-col-reverse"
      >
        {games.playedLength > 0 ? (
          <Games
            games={games.played}
            title="Spelade"
          />
        ) : null}
        {games.unplayedLength > 0 ? (
          <Games
            games={games.unplayed}
            title="Kommande"
          />
        ) : null}
      </div>
    </div>
  )
}

export default PlayoffGames
