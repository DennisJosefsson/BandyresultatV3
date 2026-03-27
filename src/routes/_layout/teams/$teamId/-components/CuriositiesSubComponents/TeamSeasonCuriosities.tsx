import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
const route = getRouteApi('/_layout/teams/$teamId')

const TeamSeasonCuriosities = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

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
        <div className="mb-1">
          {data.strings.seasonString}
        </div>

        <div className="mb-1">
          {data.strings.finalsAndWinsString}
        </div>

        <div className="mb-1">
          {data.strings.playoffCountString}
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
      </CardContent>
    </Card>
  )
}

export default TeamSeasonCuriosities
