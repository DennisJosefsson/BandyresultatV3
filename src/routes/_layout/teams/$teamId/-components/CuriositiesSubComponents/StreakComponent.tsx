import { Datum } from '@/components/Common/Date'
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
    <div className="xs:text-xs mb-1 text-[8px] md:text-sm">
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
            className="xs:text-xs mb-2 flex max-w-lg flex-row justify-between rounded border px-2 py-1 text-[8px] shadow-xs md:shadow-sm lg:text-sm"
          >
            <div>
              <Datum>{s.startDate}</Datum> -{' '}
              <Datum>{s.endDate}</Datum>
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
