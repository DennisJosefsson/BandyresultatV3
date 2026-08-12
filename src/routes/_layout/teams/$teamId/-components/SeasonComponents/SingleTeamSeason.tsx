import { Button } from '@/components/base/ui/button'
import { getRouteApi } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import GamesList from './Games/GamesList'
import SeasonTables from './SeasonTables'

const route = getRouteApi(
  '/_layout/teams/$teamId/seasons/$seasonId/',
)

const SingleTeamSeason = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div className="@container flex flex-col gap-2 mt-2 sm:mt-4">
      <div className="flex flex-row items-center justify-center gap-10">
        <route.Link
          to="/teams/$teamId/seasons/$seasonId"
          search={(prev) => ({ ...prev })}
          params={(prev) => ({
            ...prev,
            seasonId:
              data.previousSeason?.seasonId ??
              data.lastSeason?.seasonId,
          })}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Gå till föregående säsong"
          >
            <ArrowLeftIcon className="size-3 lg:size-6" />
            <span className="sr-only">Tidigare säsong</span>
          </Button>
        </route.Link>
        <span className="w-24 text-center text-sm font-semibold md:text-base">
          {data.seasonYear}
        </span>
        <route.Link
          to="/teams/$teamId/seasons/$seasonId"
          search={(prev) => ({ ...prev })}
          params={(prev) => ({
            ...prev,
            seasonId:
              data.nextSeason?.seasonId ??
              data.firstSeason?.seasonId,
          })}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Gå till nästa säsong"
          >
            <ArrowRightIcon className="size-3 lg:size-6" />
            <span className="sr-only">Senare säsong</span>
          </Button>
        </route.Link>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <SeasonTables />
        {data.hasGames ? null : (
          <div className="mt-2 flex flex-row justify-center font-semibold">
            Inga inlagda matcher denna säsong.
          </div>
        )}
        <div className="grid grid-cols-1 gap-2 @3xl:grid-cols-2 @3xl:gap-4">
          <GamesList gamesArray={data.games.playedGames} />
          <GamesList
            gamesArray={data.games.unplayedGames}
          />
        </div>
      </div>
    </div>
  )
}

export default SingleTeamSeason
