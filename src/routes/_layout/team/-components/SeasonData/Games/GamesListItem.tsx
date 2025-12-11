import { gameObject } from '@/lib/types/games/gameObject'
import { cn } from '@/lib/utils/utils'
import { getRouteApi } from '@tanstack/react-router'

import { z } from 'zod'

const route = getRouteApi('/_layout/team/$teamId/$seasonId')

type GamesListItemProps = {
  game: z.infer<typeof gameObject>
}

const GamesListItem = ({ game }: GamesListItemProps) => {
  const casualName = route.useLoaderData({
    select: (data) => data.team.casualName,
  })

  return (
    <div className="flex flex-row items-center w-full gap-1">
      <div
        id={game.gameId?.toString()}
        className="xs:w-9/10 rounded-sm h-6 md:h-8 py-0.5 mb-1 flex w-full flex-row items-center justify-between gap-1 bg-muted px-1 md:px-2 text-[10px] transition-colors dark:bg-muted/50  dark:hover:bg-slate-800/50 md:text-sm xl:text-base 2xl:text-lg xl:mb-2 sm:w-[36rem] 2xl:w-[44rem]"
      >
        <span
          className={cn(
            'w-24 sm:w-40 lg:w-40 xl:w-52 2xl:w-60',
            casualName === game.homeTeam.casualName
              ? 'font-bold text-primary'
              : null
          )}
        >
          {game.homeTeam.casualName}
        </span>
        <span className="w-1 text-center xl:w-4"> - </span>
        <span
          className={cn(
            'w-24 sm:w-40 lg:w-40 xl:w-52 2xl:w-60',
            casualName === game.awayTeam.casualName
              ? 'font-bold text-primary'
              : null
          )}
        >
          {game.awayTeam.casualName}
        </span>

        <span className="w-16 text-right tabular-nums">{game.result}</span>

        {game.halftimeResult && (
          <>
            <span className="w-10 text-right md:w-16 tabular-nums">
              ({game.halftimeResult})
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default GamesListItem
