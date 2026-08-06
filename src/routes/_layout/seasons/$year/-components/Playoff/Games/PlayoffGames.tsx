import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base/ui/accordion'
import { useCookies } from '@/lib/contexts/cookieContext'
import { getRouteApi } from '@tanstack/react-router'
import PlayoffGamesPreference from '../../shared/games/PlayoffGamesPreference'
import Games from '../Games'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/games',
)

const PlayoffGames = () => {
  const data = route.useLoaderData()
  const { sortGames: sortPreference } = useCookies()
  if (data.status === 404) return null
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
        className="flex gap-4 max-w-3xl data-[sort=played]:flex-col data-[sort=unplayed]:flex-col-reverse"
      >
        {data.games.playedLength > 0 ? (
          <Games
            games={data.games.played}
            title="Spelade"
          />
        ) : null}
        {data.games.unplayedLength > 0 ? (
          <Games
            games={data.games.unplayed}
            title="Kommande"
          />
        ) : null}
      </div>
    </div>
  )
}

export default PlayoffGames
