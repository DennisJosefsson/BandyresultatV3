import { Button } from '@/components/base/ui/button'
import type { Game } from '@/lib/types/game'
import { getRouteApi } from '@tanstack/react-router'

type GamesListItemProps = {
  game: Omit<Game, 'season'>
  openDialog: (id: number) => void
}

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit/games',
)

const GamesListItem = ({
  game,
  openDialog,
}: GamesListItemProps) => {
  const matchup = `${game.home.shortName} - ${game.away.shortName}`

  const mdMatchup = `${game.home.casualName} - ${game.away.casualName}`

  return (
    <div className="w-full">
      <div
        id={game.gameId?.toString()}
        className="mb-1 flex flex-row gap-1 px-1 py-0.5 text-xs"
      >
        <span className="w-24">{game.date}</span>
        <span className="w-50 md:hidden">{matchup}</span>
        <span className="hidden w-45 md:inline-block">
          {mdMatchup}
        </span>

        <span className="w-8 text-right tabular-nums">
          {game.result}
        </span>

        <span className="w-8 text-right tabular-nums">
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
            size="sm"
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/$gameId"
                params={{ gameId: game.gameId }}
                search={(prev) => ({ ...prev })}
                hash="gameedit"
              >
                Ändra
              </route.Link>
            }
            nativeButton={false}
          />
        </span>
        <span>
          <Button
            size="sm"
            render={
              <route.Link
                to="/dashboard/season/$seasonId/info/serie/$serieId/edit/date/$gameId"
                params={{ gameId: game.gameId }}
                search={(prev) => ({ ...prev })}
                hash="gameedit"
              >
                Datum
              </route.Link>
            }
            nativeButton={false}
          />
        </span>
        <span>
          <Button
            size="sm"
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
