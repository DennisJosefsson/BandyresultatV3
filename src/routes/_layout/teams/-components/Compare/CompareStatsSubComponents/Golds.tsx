import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import CompareStatsCard from './CompareStatsCard'
const route = getRouteApi('/_layout/teams/compare')

const Golds = () => {
  const data = route.useLoaderData()
  if (data.status === 400 || data.status === 404)
    return null

  if (data.golds.length === 0) return null
  return (
    <Card
      className="mt-2 w-full"
      size="sm"
    >
      <CardHeader>
        <CardTitle>SM-Guld</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          {data.golds.map((stat) => {
            return (
              <CompareStatsCard
                stat={stat}
                key={stat.teamId}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default Golds
