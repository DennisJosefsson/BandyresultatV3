import Date from '@/components/Common/Date'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type LatestWinsProps = {
  latestWins: {
    gameId: number
    result: string | null
    homeName: string | null
    awayName: string | null
    date: string
  }[]
  title: string
}

const LatestWins = ({ latestWins, title }: LatestWinsProps) => {
  if (latestWins.length === 0) return null
  return (
    <Card className="mt-2 w-full">
      <CardHeader className="p-2">
        <CardTitle className="text-[10px] md:text-sm xl:text-base 2xl:text-lg">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mb-3 w-full p-1 pt-0 text-xs xl:text-sm 2xl:text-base">
        <div>
          {latestWins.map((game) => {
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
                  <div className="tabular-nums">{game.result}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestWins
