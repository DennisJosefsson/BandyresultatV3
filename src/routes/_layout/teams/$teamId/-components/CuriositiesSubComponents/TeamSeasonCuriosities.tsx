import { getRouteApi } from '@tanstack/react-router'
import DataCard from '../shared/DataCard'
const route = getRouteApi('/_layout/teams/$teamId/stats/')

const TeamSeasonCuriosities = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  console.log({ executionTime: data.executionTime })
  return (
    <div>
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-x-8 gap-y-1 @sm:gap-y-2">
        <div className="flex flex-col border p-1 @xs:p-2 shadow-xs w-full @2xl:max-w-lg @4xl:max-w-xl h-fit justify-self-start">
          <DataCard
            label="Säsonger i högsta serien"
            count={data.stats.firstDivisionSeasons.count}
          />

          {data.stats.firstDivisionSeasons.count &&
          data.stats.firstDivisionSeasons.count > 1 ? (
            <DataCard
              label="Första"
              count={
                data.stats.firstAndLatestFirstDivisionSeason
                  ?.first
              }
            />
          ) : null}
          {data.stats.firstDivisionSeasons.count &&
          data.stats.firstDivisionSeasons.count > 1 ? (
            <DataCard
              label="Senaste"
              count={
                data.stats.firstAndLatestFirstDivisionSeason
                  ?.latest
              }
            />
          ) : null}
          {data.stats.firstDivisionSeasons.count &&
          data.stats.firstDivisionSeasons.count === 1 ? (
            <DataCard
              label="Säsong"
              count={
                data.stats.firstAndLatestFirstDivisionSeason
                  ?.first
              }
            />
          ) : null}
        </div>
        <div className="flex flex-col border p-1 @xs:p-2 shadow-xs w-full @2xl:max-w-lg @4xl:max-w-xl h-fit justify-self-start">
          <DataCard
            label="Antal slutspel"
            count={data.stats.playoffCount.count}
          />
          {data.stats.playoffCount.count &&
          data.stats.playoffCount.count > 0 ? (
            <DataCard
              label="Senaste"
              count={data.stats.playoffCount.latest}
            />
          ) : null}
          <DataCard
            label="Antal finaler"
            count={data.stats.finalCount.count}
          />
          {data.stats.finalCount.count &&
          data.stats.finalCount.count > 0 ? (
            <DataCard
              label="Senaste"
              count={data.stats.finalCount.latest}
            />
          ) : null}
          <DataCard
            label="Antal finalvinster"
            count={data.stats.finalWinCount.count}
          />
          {data.stats.finalWinCount.count &&
          data.stats.finalWinCount.count > 0 ? (
            <DataCard
              label="Senaste"
              count={data.stats.finalWinCount.latest}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default TeamSeasonCuriosities
