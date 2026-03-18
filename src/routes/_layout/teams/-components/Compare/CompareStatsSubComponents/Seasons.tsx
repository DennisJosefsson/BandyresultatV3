import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
const route = getRouteApi('/_layout/teams/compare')

const Seasons = () => {
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
          <CardTitle>Säsonger i databasen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            {data.allDbSeasons.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                >
                  <div className="flex flex-row justify-between">
                    <div>{team.team.casualName}</div>
                    <div className="text-right">
                      {team.seasons}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      <Card
        className="mt-2 w-full"
        size="sm"
      >
        <CardHeader>
          <CardTitle>Säsonger i högsta serien</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            {data.firstDivisionSeasons.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                >
                  <div className="flex flex-row justify-between">
                    <div>{team.team.casualName}</div>
                    <div className="text-right">
                      {team.seasons}
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
              <CardTitle>
                Säsonger i högsta serien sedan 1931
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                {data.firstDivisionSeasonsSince1931.map(
                  (team) => {
                    return (
                      <div
                        key={team.teamId}
                        className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                      >
                        <div className="flex flex-row justify-between">
                          <div>{team.team.casualName}</div>
                          <div className="text-right">
                            {team.seasons}
                          </div>
                        </div>
                      </div>
                    )
                  },
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}

export default Seasons
