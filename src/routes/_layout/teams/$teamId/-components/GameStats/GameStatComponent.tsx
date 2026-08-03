import { Datum } from '@/components/Common/Date'
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
    <div className="xs:text-xs mb-1 text-[8px] md:text-sm">
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
            className="xs:p-2 xs:text-xs mb-2 flex max-w-lg flex-col gap-1 rounded border p-1 text-[8px] shadow-xs md:shadow-sm lg:text-sm"
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
