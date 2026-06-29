import Date from '@/components/Common/Date'
import type { TeamStatItem } from '@/lib/types/team'
import type { ReactNode } from 'react'

const GameStatComponent = ({
  children,
}: {
  children: ReactNode
}) => {
  return <div className="mb-2">{children}</div>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <div className="xs:text-xs text-[8px] md:text-sm mb-1">
      {children}
    </div>
  )
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
            className="bg-muted-foreground/20 xs:p-2 mb-1 flex flex-col gap-1 rounded p-1 xs:text-xs text-[8px] lg:text-sm max-w-md"
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
  )
}

GameStatComponent.Title = Title
GameStatComponent.Content = Content

export default GameStatComponent
