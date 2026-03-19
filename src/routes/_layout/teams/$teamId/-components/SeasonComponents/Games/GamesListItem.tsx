import { getRouteApi } from '@tanstack/react-router'

import {
  TableCell,
  TableRow,
} from '@/components/base/ui/table'
import type { Game } from '@/lib/types/game'
import { cn } from '@/lib/utils/utils'

const route = getRouteApi(
  '/_layout/teams/$teamId/$seasonId',
)

type GamesListItemProps = {
  game: Game
}

const GamesListItem = ({ game }: GamesListItemProps) => {
  const casualName = route.useLoaderData({
    select: (data) => data.team.casualName,
  })

  return (
    <TableRow className="text-[8px] sm:text-sm lg:text-base">
      <TableCell
        className={cn(
          'w-12 xs:w-18 p-0 py-1 truncate',
          casualName === game.home.casualName
            ? 'text-primary font-bold'
            : null,
        )}
      >
        {game.home.casualName}
      </TableCell>
      <TableCell className="w-4">-</TableCell>
      <TableCell
        className={cn(
          'w-12 xs:w-18 p-0 py-1 truncate',
          casualName === game.away.casualName
            ? 'text-primary font-bold'
            : null,
        )}
      >
        {game.away.casualName}
      </TableCell>

      <TableCell className="w-12 xs:w-18 tabular-nums p-0 py-1">
        {game.otResult
          ? `${game.otResult} (${game.result})`
          : game.result}
      </TableCell>

      <TableCell className="w-8 tabular-nums p-0 py-1">
        {game.halftimeResult
          ? `(${game.halftimeResult})`
          : null}
      </TableCell>

      <TableCell className="w-6 p-0 py-1 text-center">
        {game.penalties
          ? 'S'
          : game.extraTime
            ? 'ÖT'
            : null}
      </TableCell>
    </TableRow>
  )
}

export default GamesListItem
