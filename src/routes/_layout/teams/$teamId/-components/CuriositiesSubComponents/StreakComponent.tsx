import { Datum } from '@/components/Common/Date'
import type {
  TeamPlayoffStreak,
  TeamStreak,
} from '@/lib/types/team'
import type { ReactNode } from 'react'

const StreakComponent = ({
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
            className="bg-muted-foreground/20 px-1 @sm:px-3  py-1 mb-1 flex flex-row justify-between"
          >
            <div className="w-44 @xs:w-54 @sm:w-66 flex flex-row justify-between gap-2">
              <span className="w-20 @xs:w-25 @sm:w-32">
                <Datum>{s.startDate}</Datum>
              </span>
              <span className="w-2">-</span>
              <span className="w-20 @xs:w-25 @sm:w-32">
                <Datum>{s.endDate}</Datum>
              </span>
            </div>
            <div>{s.gameCount}</div>
          </div>
        )
      })}
    </div>
  )
}

function PlayoffContent({
  streak,
}: {
  streak: Array<TeamPlayoffStreak>
}) {
  if (!streak || streak.length === 0) return null

  return (
    <div>
      {streak.map((s, index) => {
        return (
          <div
            key={`${s.startYear}-${index}`}
            className="bg-muted-foreground/20 px-1 @sm:px-3  py-1 mb-1 flex flex-row justify-between"
          >
            <div>
              <p>
                {s.startYear} - {s.endYear}
              </p>
            </div>
            <div>
              <p>{s.streakLength} år</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

StreakComponent.Title = Title
StreakComponent.Content = Content
StreakComponent.PlayoffContent = PlayoffContent

export default StreakComponent
