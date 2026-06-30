import Date from '@/components/Common/Date'
import type { TeamStreak } from '@/lib/types/team'
import type { ReactNode } from 'react'

const StreakComponent = ({
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
  streak,
}: {
  streak: Array<TeamStreak>
}) {
  if (!streak || streak.length === 0) return null

  return (
    <div>
      {streak.map((s, index) => {
        return (
          <div
            key={`${s.startDate}-${index}`}
            className="bg-muted-foreground/20 mb-1 flex flex-row justify-between rounded px-2 py-1 xs:text-xs text-[8px] lg:text-sm max-w-md"
          >
            <div>
              <Date>{s.startDate}</Date> -{' '}
              <Date>{s.endDate}</Date>
            </div>
            <div>{s.gameCount}</div>
          </div>
        )
      })}
    </div>
  )
}

StreakComponent.Title = Title
StreakComponent.Content = Content

export default StreakComponent
