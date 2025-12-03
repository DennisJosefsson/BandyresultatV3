import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRouteApi } from '@tanstack/react-router'
const route = getRouteApi('/_layout/teams/compare')

const Golds = () => {
  const { golds } = route.useLoaderData()
  if (golds.length === 0) return null
  return (
    <Card className="mt-2 w-full">
      <CardHeader className="p-2">
        <CardTitle className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
          SM-Guld
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full p-1 pt-0 text-xs xl:text-sm 2xl:text-base">
        <div className="mb-2">
          {golds.map((team) => {
            return (
              <div
                key={team.teamId}
                className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
              >
                <div className="flex flex-row justify-between">
                  <div>{team.team.casualName}</div>
                  <div className="text-right">{team.guld}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default Golds
