import { Button } from '@/components/ui/button'
import { Game } from '@/lib/types/game'
import { useMediaQuery } from 'usehooks-ts'

type GamesListItemProps = {
  game: Omit<Game, 'season'>
  openDialog: (id: number) => void
}

// const route = getRouteApi('/_layout/dashboard/season/$seasonId/info_/$serieId/edit/games')

const GamesListItem = ({ game, openDialog }: GamesListItemProps) => {
  const matches768 = useMediaQuery('(min-width: 768px)')

  return (
    <div className="w-full">
      <div
        id={game.gameId?.toString()}
        className="mb-1 flex flex-row justify-evenly gap-1 px-1 py-0.5 text-[10px] transition-colors md:grid md:max-w-240 md:grid-cols-8 md:gap-4 md:px-2 md:text-sm"
      >
        <span>{game.date}</span>
        <span>{matches768 ? game.home.casualName : game.home.shortName}</span>
        <span className="w-1 text-center xl:w-4"> - </span>
        <span>{matches768 ? game.away.casualName : game.away.shortName}</span>

        <span className="text-right tabular-nums md:w-16">{game.result}</span>

        <span className="text-right tabular-nums md:w-16">
          {game.halftimeResult ? `(${game.halftimeResult})` : null}
        </span>

        <span>
          <Button size={matches768 ? 'default' : 'textxxs'}>Ändra</Button>
        </span>
        <span>
          <Button
            size={matches768 ? 'default' : 'textxxs'}
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
