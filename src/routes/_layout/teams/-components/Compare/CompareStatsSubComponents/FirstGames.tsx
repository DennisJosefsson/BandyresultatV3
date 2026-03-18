import { getRouteApi } from '@tanstack/react-router'

import Date from '@/components/Common/Date'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'

const route = getRouteApi('/_layout/teams/compare')

const FirstGames = () => {
  const data = route.useLoaderData()

  if (data.status === 400) return null

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
          {data.firstGames.map((game) => {
            return (
              <div
                key={game.gameId}
                className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1"
              >
                <div className="mb-0.5 font-semibold">
                  <Date>{game.date}</Date>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    {game.homeName}-{game.awayName}
                  </div>
                  <div className="tabular-nums">
                    {game.result}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default FirstGames
