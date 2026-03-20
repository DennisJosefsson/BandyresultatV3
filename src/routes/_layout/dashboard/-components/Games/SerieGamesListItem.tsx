import { getRouteApi } from '@tanstack/react-router'

import { Button } from '@/components/base/ui/button'
import type { Game } from '@/lib/types/game'

type GamesListItemProps = {
  game: Omit<Game, 'season'>
  openDialog: (id: number) => void
}

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/games',
)

const GamesListItem = ({
  game,
  openDialog,
}: GamesListItemProps) => {
  const women = route.useSearch({ select: (s) => s.women })

  const matchup = `${game.home.shortName} - ${game.away.shortName}`

  const mdMatchup = `${game.home.casualName} - ${game.away.casualName}`

  return (
    <div className="w-full">
      <div
        id={game.gameId?.toString()}
        className="mb-1 flex flex-row gap-1 px-1 py-0.5 text-[10px] transition-colors md:gap-4 md:px-2 md:text-sm"
      >
        <span className="w-20">{game.date}</span>
        <span className="w-50 text-base h-8 md:hidden">
          {matchup}
        </span>
        <span className="w-50 hidden text-base h-8 md:inline-block">
          {mdMatchup}
        </span>

        <span className="text-right tabular-nums w-10">
          {game.result}
        </span>

        <span className="text-right tabular-nums w-10">
          {game.halftimeResult
            ? `(${game.halftimeResult})`
            : null}
        </span>
        <span className="text-right tabular-nums md:w-16">
          {game.otResult
            ? `otResult: (${game.otResult})`
            : null}
        </span>

        <span>
          <Button
            size="responsive"
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/$serieId/edit/$gameId"
                params={{ gameId: game.gameId }}
                search={{ women }}
              >
                Ändra
              </route.Link>
            }
            nativeButton={false}
          />
        </span>
        <span>
          <Button
            size="responsive"
            variant="destructive"
            onClick={() => openDialog(game.gameId)}
          >
            Ta bort
          </Button>
        </span>
      </div>
    </div>
  )
}

export default GamesListItem
