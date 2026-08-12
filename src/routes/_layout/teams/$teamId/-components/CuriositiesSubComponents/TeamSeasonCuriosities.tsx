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
            data={data.statCounts.firstDivSeasonsCount}
          />

          {data.statCounts.firstDivSeasonsCount > 1 ? (
            <DataCard
              label="Första"
              data={
                data.statCounts.firstFirstDivisionSeason
                  ?.year
              }
            />
          ) : null}
          {data.statCounts.firstDivSeasonsCount > 1 ? (
            <DataCard
              label="Senaste"
              data={
                data.statCounts.latestFirstDivisionSeason
                  ?.year
              }
            />
          ) : null}
          {data.statCounts.firstDivSeasonsCount === 1 ? (
            <DataCard
              label="Säsong"
              data={
                data.statCounts.firstFirstDivisionSeason
                  ?.year
              }
            />
          ) : null}
        </div>
        <div className="flex flex-col border p-1 @xs:p-2 shadow-xs w-full @2xl:max-w-lg @4xl:max-w-xl h-fit justify-self-start">
          <DataCard
            label="Antal slutspel"
            data={data.statCounts.playoffCount}
          />
          <DataCard
            label="Antal finaler"
            data={data.statCounts.finalCount}
          />
          {data.statCounts.finalCount > 0 ? (
            <DataCard
              label="Senaste"
              data={data.statCounts.latestFinal}
            />
          ) : null}
          <DataCard
            label="Antal finalvinster"
            data={data.statCounts.finalWinCount}
          />
          {data.statCounts.finalWinCount > 0 ? (
            <DataCard
              label="Senaste"
              data={data.statCounts.finalWins.at(-1)}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default TeamSeasonCuriosities
