import {
  TableCell,
  TableRow,
} from '@/components/base/ui/table'
import type { Game } from '@/lib/types/game'
import { cn } from '@/lib/utils/utils'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi(
  '/_layout/teams/$teamId/seasons/$seasonId/',
)

type GamesListItemProps = {
  game: Game
}

const GamesListItem = ({ game }: GamesListItemProps) => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  return (
    <TableRow className="text-[8px] sm:text-sm lg:text-base">
      <TableCell
        className={cn(
          'w-12 xs:w-18 p-0 py-1 truncate',
          data.team.casualName === game.home.casualName
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
          data.team.casualName === game.away.casualName
            ? 'text-primary font-bold'
            : null,
        )}
      >
        {game.away.casualName}
      </TableCell>

      <TableCell className="xs:w-18 w-12 p-0 py-1 tabular-nums">
        {game.otResult
          ? `${game.otResult} (${game.result})`
          : game.result}
      </TableCell>

      <TableCell className="w-8 p-0 py-1 tabular-nums">
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
