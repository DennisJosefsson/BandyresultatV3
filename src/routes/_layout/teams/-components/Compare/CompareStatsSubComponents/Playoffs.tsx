import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
const route = getRouteApi('/_layout/teams/compare')
const Playoffs = () => {
  const women = route.useSearch({
    select(state) {
      return state.women
    },
  })
  const data = route.useLoaderData()
  if (data.status === 400) return null
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
            {data.allPlayoffs.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                >
                  <div className="flex flex-row justify-between">
                    <div>{team.team.casualName}</div>
                    <div className="text-right">
                      {team.playoffs}
                    </div>
                  </div>
                </div>
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
                {data.playoffs.map((team) => {
                  return (
                    <div
                      key={team.teamId}
                      className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                    >
                      <div className="flex flex-row justify-between">
                        <div>{team.team.casualName}</div>
                        <div className="text-right">
                          {team.playoffs}
                        </div>
                      </div>
                    </div>
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
