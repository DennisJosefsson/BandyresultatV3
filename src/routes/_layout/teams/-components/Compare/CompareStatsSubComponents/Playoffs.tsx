import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import CompareStatsCard from './CompareStatsCard'
const route = getRouteApi('/_layout/teams/compare')
const Playoffs = () => {
  const women = route.useSearch({
    select(state) {
      return state.women
    },
  })
  const data = route.useLoaderData()
  if (data.status === 400 || data.status === 404)
    return null
  return (
    <>
      <Card
        className="mt-2 w-full"
        size="sm"
      >
        <CardHeader>
          <CardTitle>Slutspel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            {data.allPlayoffs.map((stat) => {
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
      {!women && (
        <>
          <Card
            className="mt-2 w-full"
            size="sm"
          >
            <CardHeader>
              <CardTitle>Slutspel sedan 1931</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                {data.playoffs.map((stat) => {
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
        </>
      )}
    </>
  )
}

export default Playoffs
