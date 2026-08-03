import { getRouteApi } from '@tanstack/react-router'
import StatsCard from '../shared/StatsCard'
const route = getRouteApi('/_layout/teams/$teamId/stats/')

const TeamSeasonCuriosities = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  console.log({ executionTime: data.executionTime })
  return (
    <div>
      <div className="xs:text-xs mb-4 grid grid-cols-1 gap-2 text-[10px] sm:grid-cols-2 md:text-sm">
        {data.statCounts.firstDivSeasonsCount > 0 ? (
          <StatsCard>
            <StatsCard.Upper>
              <StatsCard.Content>
                <span>Säsonger i högsta serien:</span>
              </StatsCard.Content>
              <StatsCard.Content>
                {data.statCounts.firstDivSeasonsCount}
              </StatsCard.Content>
            </StatsCard.Upper>
            <StatsCard.Lower>
              <StatsCard.Content>
                {data.statCounts.firstDivSeasonsCount === 1
                  ? `Säsongen ${data.statCounts.firstFirstDivisionSeason?.year}.`
                  : `Första säsongen ${data.statCounts.firstFirstDivisionSeason?.year} och senaste ${data.statCounts.latestFirstDivisionSeason?.year}.`}
              </StatsCard.Content>
            </StatsCard.Lower>
          </StatsCard>
        ) : null}

        {data.statCounts.playoffCount > 0 ? (
          <StatsCard>
            <StatsCard.Upper>
              <StatsCard.Content>
                <span>Antal slutspel:</span>
              </StatsCard.Content>
              <StatsCard.Content>
                {data.statCounts.playoffCount}
              </StatsCard.Content>
            </StatsCard.Upper>
          </StatsCard>
        ) : null}

        {data.statCounts.finalCount > 0 ? (
          <StatsCard>
            <StatsCard.Upper>
              <StatsCard.Content>
                <span>Antal finaler:</span>
              </StatsCard.Content>
              <StatsCard.Content>
                {data.statCounts.finalCount}
              </StatsCard.Content>
            </StatsCard.Upper>
            <StatsCard.Lower>
              <StatsCard.Content>
                {`Senast ${data.statCounts.latestFinal}.`}
              </StatsCard.Content>
            </StatsCard.Lower>
          </StatsCard>
        ) : null}
        {data.statCounts.finalWinCount > 0 ? (
          <StatsCard>
            <StatsCard.Upper>
              <StatsCard.Content>
                <span>Antal finalvinster:</span>
              </StatsCard.Content>
              <StatsCard.Content>
                {data.statCounts.finalWinCount}
              </StatsCard.Content>
            </StatsCard.Upper>
            <StatsCard.Lower>
              <StatsCard.Content>
                {`(${data.statCounts.finalWins
                  .map((win) => {
                    if (win.includes('/'))
                      return win.split('/').at(-1)
                    return win
                  })
                  .join(', ')}).`}
              </StatsCard.Content>
            </StatsCard.Lower>
          </StatsCard>
        ) : null}

        {data.streaks.playoffStreak.length > 0 ? (
          <StatsCard>
            <StatsCard.Upper>
              <StatsCard.Content>
                Slutspelssviter
              </StatsCard.Content>
            </StatsCard.Upper>
            <StatsCard.Lower>
              <StatsCard.Content>
                {data.streaks.playoffStreak.map(
                  (streak, index) => {
                    return (
                      <div
                        key={`${streak.startYear}-${index}`}
                      >
                        {`${streak.startYear} - ${streak.endYear} (${streak.streakLength} år)`}
                      </div>
                    )
                  },
                )}
              </StatsCard.Content>
            </StatsCard.Lower>
          </StatsCard>
        ) : null}
      </div>
    </div>
  )
}

export default TeamSeasonCuriosities
