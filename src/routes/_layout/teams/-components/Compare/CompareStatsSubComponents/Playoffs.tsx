import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRouteApi } from '@tanstack/react-router'
const route = getRouteApi('/_layout/teams/compare')
const Playoffs = () => {
  const women = route.useSearch({
    select(state) {
      return state.women
    },
  })
  const { allPlayoffs, playoffs } = route.useLoaderData()
  return (
    <>
      <Card className="mt-2 w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
            Slutspel
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full p-1 pt-0 text-xs xl:text-sm 2xl:text-base">
          <div className="mb-2">
            {allPlayoffs.map((team) => {
              return (
                <div
                  key={team.teamId}
                  className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                >
                  <div className="flex flex-row justify-between">
                    <div>{team.team.casualName}</div>
                    <div className="text-right">{team.playoffs}</div>
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
                Slutspel sedan 1931
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full p-1 pt-0 text-xs xl:text-sm 2xl:text-base">
              <div className="mb-2">
                {playoffs.map((team) => {
                  return (
                    <div
                      key={team.teamId}
                      className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
                    >
                      <div className="flex flex-row justify-between">
                        <div>{team.team.casualName}</div>
                        <div className="text-right">{team.playoffs}</div>
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
