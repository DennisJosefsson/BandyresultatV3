import { getRouteApi } from '@tanstack/react-router'
const route = getRouteApi('/_layout/teams/$teamId/stats/')

const TeamSeasonCuriosities = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  return (
    <div>
      <div className="xs:text-xs text-[10px] md:text-sm">
        Kuriosa
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:text-xs text-[10px] md:text-sm mb-4">
        <div className="mb-1">
          <span>
            Säsonger i högsta serien:{' '}
            {data.statCounts.firstDivSeasonsCount}.{' '}
            {data.statCounts.firstDivSeasonsCount > 0
              ? data.statCounts.firstDivSeasonsCount === 1
                ? `Säsongen ${data.statCounts.firstFirstDivisionSeason?.year}.`
                : `Första säsongen ${data.statCounts.firstFirstDivisionSeason?.year} och senaste ${data.statCounts.latestFirstDivisionSeason?.year}.`
              : null}
          </span>
        </div>

        <div className="mb-1">
          <span>
            {data.statCounts.qualificationSeasonsCount > 0
              ? `Kval till högsta serien i databasen: ${data.statCounts.qualificationSeasonsCount}.`
              : null}
          </span>
        </div>

        <div className="mb-1">
          <span>
            Antal slutspel: {data.statCounts.playoffCount}.
          </span>
        </div>

        <div className="mb-1">
          <span>
            Antal finaler: {data.statCounts.finalCount}.{' '}
            {data.statCounts.finalCount > 0
              ? `Senast ${data.statCounts.latestFinal}.`
              : null}
          </span>
        </div>

        <div className="mb-1">
          <span>
            Antal finalvinster:{' '}
            {data.statCounts.finalWinCount}.{' '}
            {data.statCounts.finalWinCount > 0
              ? `(${data.statCounts.finalWins.join(', ')}).`
              : null}
          </span>
        </div>

        {data.streaks.playoffStreak.length > 0 ? (
          <div className="mb-1 sm:mb-2 lg:mb-3">
            {data.streaks.playoffStreak.map(
              (streak, index) => {
                return (
                  <div key={`${streak.startYear}-${index}`}>
                    {data.team.casualName} spelade slutspel{' '}
                    {streak.streakLength} år på raken mellan{' '}
                    {streak.startYear} och {streak.endYear}.
                  </div>
                )
              },
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TeamSeasonCuriosities
