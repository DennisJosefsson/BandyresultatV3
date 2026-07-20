import Date from '@/components/Common/Date'
import StatsCard from './StatsCard'

type LatestWinsProps = {
  latestWins: Array<{
    gameId: number
    result: string | null
    homeName: string | null
    awayName: string | null
    date: string
  }>
  title: string
}

const LatestWins = ({
  latestWins,
  title,
}: LatestWinsProps) => {
  if (latestWins.length === 0) return null
  return (
    <StatsCard>
      <StatsCard.Title>{title}</StatsCard.Title>
      <StatsCard.Content>
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
                <div className="tabular-nums">
                  {game.result}
                </div>
              </div>
            </div>
          )
        })}
      </StatsCard.Content>
    </StatsCard>
  )
}

export default LatestWins
