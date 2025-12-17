import { Game } from '@/lib/types/game'
import { cn } from '@/lib/utils/utils'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/team/$teamId/$seasonId')

type GamesListItemProps = {
  game: Game
}

const GamesListItem = ({ game }: GamesListItemProps) => {
  const casualName = route.useLoaderData({
    select: (data) => data.team.casualName,
  })

  return (
    <div className="flex w-full flex-row items-center gap-1">
      <div
        id={game.gameId?.toString()}
        className="xs:w-9/10 bg-muted dark:bg-muted/50 mb-1 flex h-6 w-full flex-row items-center justify-between gap-1 rounded-sm px-1 py-0.5 text-[10px] transition-colors sm:w-xl md:h-8 md:px-2 md:text-sm xl:mb-2 xl:text-base 2xl:w-176 2xl:text-lg dark:hover:bg-slate-800/50"
      >
        <span
          className={cn(
            'w-24 sm:w-40 lg:w-40 xl:w-52 2xl:w-60',
            casualName === game.home.casualName
              ? 'text-primary font-bold'
              : null,
          )}
        >
          {game.home.casualName}
        </span>
        <span className="w-1 text-center xl:w-4"> - </span>
        <span
          className={cn(
            'w-24 sm:w-40 lg:w-40 xl:w-52 2xl:w-60',
            casualName === game.away.casualName
              ? 'text-primary font-bold'
              : null,
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
      </div>
    </div>
  )
}

export default GamesListItem
