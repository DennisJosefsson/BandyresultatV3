import type { ReactNode } from 'react'

import Date from '@/components/Common/Date'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import type { TeamStatItem } from '@/lib/types/team'

const GameStatComponent = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <Card
      className="mb-2"
      size="sm"
    >
      {children}
    </Card>
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader>
      <CardTitle className="group-data-[size=sm]/card:text-[10px] xs:group-data-[size=sm]/card:text-xs md:group-data-[size=sm]/card:text-sm">
        {children}
      </CardTitle>
    </CardHeader>
  )
}

function Content({
  statArray,
}: {
  statArray: Array<TeamStatItem>
}) {
  if (!statArray || statArray.length === 0) return null

  return (
    <CardContent>
      <div>
        {statArray.map((stat, index) => {
          return (
            <div
              key={`${stat.gameId}-${index}`}
              className="bg-muted-foreground/20 xs:p-2 mb-1 flex flex-col gap-1 rounded p-1 text-[10px] lg:text-sm"
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
