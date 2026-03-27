import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import CompareWinsCard from './CompareWinsCard'
const route = getRouteApi('/_layout/teams/compare')

const LatestGames = () => {
  const data = route.useLoaderData()
  if (
    data.status === 400 ||
    data.status === 404 ||
    data.latestGames.length === 0
  )
    return null

  return (
    <Card
      className="mt-2 w-full"
      size="sm"
    >
      <CardHeader>
        <CardTitle>Senaste matcherna</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {data.latestGames.map((stat) => (
            <CompareWinsCard
              stat={stat}
              key={stat.gameId}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestGames
