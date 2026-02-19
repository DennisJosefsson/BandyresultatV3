import { Button } from '@/components/ui/button'
import { useFavTeam } from '@/lib/contexts/favTeamsContext'
import { Game } from '@/lib/types/game'
import { cn } from '@/lib/utils/utils'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

type GamesListItemProps = {
  game: Omit<Game, 'season'>
}

const GamesListItem = ({ game }: GamesListItemProps) => {
  const { favTeams } = useFavTeam()
  const navigate = useNavigate({ from: '/seasons/$year/$group/games' })
  const matches = useMediaQuery('(min-width: 768px)')

  const origin = useLocation().pathname

  const onClickHandler = () => {
    navigate({
      to: '/teams/compare',
      search: (prev) => ({
        ...prev,
        teamArray: [game.homeTeamId, game.awayTeamId],
      }),
      state: { origin: origin },
    })
  }

  return (
    <div className="flex w-full flex-row items-center gap-1">
      <div
        id={game.gameId?.toString()}
        className="mb-1 grid w-full grid-cols-6 gap-1 rounded-sm px-1 py-0.5 text-[10px] transition-colors md:px-2 md:text-sm xl:mb-2 xl:w-xl xl:text-base 2xl:w-176 2xl:text-lg"
      >
        <span
          className={cn(
            'w-24 sm:w-40 lg:w-40 xl:w-52 2xl:w-60',
            favTeams.includes(game.homeTeamId) ? 'font-bold' : null,
          )}
        >
          {game.home.casualName}
        </span>
        <span className="w-1 text-center xl:w-4"> - </span>
        <span
          className={cn(
            'w-24 sm:w-40 lg:w-40 xl:w-52 2xl:w-60',
            favTeams.includes(game.awayTeamId) ? 'font-bold' : null,
          )}
        >
          {game.away.casualName}
        </span>

        <span className="w-16 text-right tabular-nums">{game.result}</span>

        {game.halftimeResult && (
          <>
            <span className="w-10 text-right tabular-nums md:w-16">
              ({game.halftimeResult})
            </span>
          </>
        )}

        <Button
          size={matches ? 'sm' : 'xs'}
          variant="default"
          className="group"
          onClick={onClickHandler}
        >
          <span className="text-[10px] group-hover:font-semibold md:text-sm xl:text-base 2xl:text-lg">
            H2H
          </span>
        </Button>
      </div>
    </div>
  )
}

export default GamesListItem
