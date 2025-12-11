import Date from '@/components/Common/Date'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'

type StatItem = {
  gameId: number
  date: string
  result: string | null
  homeTeam: string | null
  awayTeam: string | null
}

const GameStatComponent = ({ children }: { children: ReactNode }) => {
  return <Card className="mb-2">{children}</Card>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader className="p-3">
      <CardTitle className="text-[10px] md:text-sm">{children}</CardTitle>
    </CardHeader>
  )
}

function Content({ statArray }: { statArray: StatItem[] }) {
  if (!statArray || statArray.length === 0) return null

  return (
    <CardContent className="xxs:text-xs text-[10px] lg:mr-0 lg:text-sm">
      <div>
        {statArray.map((stat, index) => {
          return (
            <div
              key={`${stat.gameId}-${index}`}
              className="bg-muted-foreground/20 xs:p-2 mb-1 flex flex-col gap-1 rounded p-1"
            >
              <div className="flex flex-row justify-between">
                <span>
                  {stat.homeTeam}-{stat.awayTeam}
                </span>
                <span>{stat.result}</span>
              </div>
              <div>
                <Date>{stat.date}</Date>
              </div>
            </div>
          )
        })}
      </div>
    </CardContent>
  )
}

GameStatComponent.Title = Title
GameStatComponent.Content = Content

export default GameStatComponent
