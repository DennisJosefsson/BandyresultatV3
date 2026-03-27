import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import CompareWinsCard from './CompareWinsCard'

const route = getRouteApi('/_layout/teams/compare')

const FirstGames = () => {
  const data = route.useLoaderData()

  if (
    data.status === 400 ||
    data.status === 404 ||
    data.firstGames.length === 0
  )
    return null

  return (
    <Card
      className="mt-2 w-full"
      size="sm"
    >
      <CardHeader>
        <CardTitle>Första matcherna</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          {data.firstGames.map((stat) => (
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

export default FirstGames
