import { Datum } from '@/components/Common/Date'
import type { TeamStatItem } from '@/lib/types/team'
import type { ReactNode } from 'react'

const GameStatComponent = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="border p-1 @xs:p-2 shadow-xs md:shadow-sm w-full @2xl:max-w-lg @4xl:max-w-xl h-fit justify-self-start">
      {children}
    </div>
  )
}

function Title({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

function Content({
  statArray,
}: {
  statArray: Array<TeamStatItem>
}) {
  if (!statArray || statArray.length === 0) return null

  return (
    <div>
      {statArray.map((stat, index) => {
        return (
          <div
            key={`${stat.gameId}-${index}`}
            className="bg-muted-foreground/20 px-1 @sm:px-3 py-1 mb-1"
          >
            <div className="flex flex-row justify-between">
              <span>
                {stat.homeTeam}-{stat.awayTeam}
              </span>
              <span>{stat.result}</span>
            </div>
            <div>
              <Datum>{stat.date}</Datum>
            </div>
          </div>
        )
      })}
    </div>
  )
}

GameStatComponent.Title = Title
GameStatComponent.Content = Content

export default GameStatComponent
