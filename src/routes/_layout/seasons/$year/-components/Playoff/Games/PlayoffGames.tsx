import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base/ui/accordion'
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
      <Accordion className="bg-secondary border">
        <AccordionItem className="rounded-md p-0.5 @sm/playoff:p-2">
          <AccordionTrigger className="text-[10px] @sm/playoff:text-xs @md/playoff:text-sm">
            Sidinställningar
          </AccordionTrigger>
          <AccordionContent>
            <PlayoffGamesPreference />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
