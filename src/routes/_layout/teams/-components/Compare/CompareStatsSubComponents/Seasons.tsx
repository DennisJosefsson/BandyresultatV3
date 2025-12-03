import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRouteApi } from '@tanstack/react-router'
const route = getRouteApi('/_layout/teams/compare')

const Seasons = () => {
  const women = route.useSearch({
    select(state) {
      return state.women
    },
  })
  const { allDbSeasons, firstDivisionSeasons, firstDivisionSeasonsSince1931 } =
    route.useLoaderData()
  return (
    <>
      <Card className="mt-2 w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
            Säsonger i databasen
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full p-1 pt-0 text-xs xl:text-sm 2xl:text-base">
          <div className="mb-2">
            {allDbSeasons.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                >
                  <div className="flex flex-row justify-between">
                    <div>{team.team.casualName}</div>
                    <div className="text-right">{team.seasons}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      <Card className="mt-2 w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
            Säsonger i högsta serien
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full p-1 pt-0 text-xs xl:text-sm 2xl:text-base">
          <div className="mb-2">
            {firstDivisionSeasons.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                >
                  <div className="flex flex-row justify-between">
                    <div>{team.team.casualName}</div>
                    <div className="text-right">{team.seasons}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      {!women && (
        <>
          <Card className="mt-2 w-full">
            <CardHeader className="p-2">
              <CardTitle className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
                Säsonger i högsta serien sedan 1931
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full p-1 pt-0 text-[10px] sm:text-sm">
              <div className="mb-2">
                {firstDivisionSeasonsSince1931.map((team) => {
                  return (
                    <div
                      key={team.teamId}
                      className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                    >
                      <div className="flex flex-row justify-between">
                        <div>{team.team.casualName}</div>
                        <div className="text-right">{team.seasons}</div>
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

export default Seasons
