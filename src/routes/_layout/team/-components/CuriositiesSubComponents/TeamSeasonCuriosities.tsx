import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRouteApi } from '@tanstack/react-router'
const route = getRouteApi('/_layout/team/$teamId')

const TeamSeasonCuriosities = () => {
  const playoffStreak = route.useLoaderData({
    select: (data) => data.streaks.playoffStreak,
  })
  const {
    team: { casualName },
    strings: { seasonString, finalsAndWinsString, playoffCountString },
  } = route.useLoaderData()

  return (
    <Card className="mb-2 p-1">
      <CardHeader className="p-1 md:p-6">
        <CardTitle className="text-[10px] md:text-sm">Kuriosa</CardTitle>
      </CardHeader>
      <CardContent className="xxs:text-xs p-1 text-[10px] md:p-6 lg:mr-0 lg:text-sm">
        <div className="mb-1">{seasonString}</div>

        <div className="mb-1">{finalsAndWinsString}</div>

        <div className="mb-1">{playoffCountString}</div>

        {playoffStreak.length > 0 ? (
          <div className="mb-1">
            {playoffStreak.map((streak, index) => {
              return (
                <div key={`${streak.startYear}-${index}`}>
                  {casualName} spelade slutspel {streak.streakLength} år på
                  raken mellan {streak.startYear} och {streak.endYear}.
                </div>
              )
            })}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default TeamSeasonCuriosities
