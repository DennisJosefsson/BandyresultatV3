import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
const route = getRouteApi('/_layout/teams/$teamId')

const TeamSeasonCuriosities = () => {
  const playoffStreak = route.useLoaderData({
    select: (data) => data.streaks.playoffStreak,
  })
  const {
    team: { casualName },
    strings: {
      seasonString,
      finalsAndWinsString,
      playoffCountString,
    },
  } = route.useLoaderData()

  return (
    <Card
      className="mb-2"
      size="sm"
    >
      <CardHeader>
        <CardTitle className="group-data-[size=sm]/card:text-[10px] xs:group-data-[size=sm]/card:text-xs md:group-data-[size=sm]/card:text-sm">
          Kuriosa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-1">{seasonString}</div>

        <div className="mb-1">{finalsAndWinsString}</div>

        <div className="mb-1">{playoffCountString}</div>

        {playoffStreak.length > 0 ? (
          <div className="mb-1 sm:mb-2 lg:mb-3">
            {playoffStreak.map((streak, index) => {
              return (
                <div key={`${streak.startYear}-${index}`}>
                  {casualName} spelade slutspel{' '}
                  {streak.streakLength} år på raken mellan{' '}
                  {streak.startYear} och {streak.endYear}.
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
