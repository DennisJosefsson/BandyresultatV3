import { Datum } from '@/components/Common/Date'
import type {
  TeamPlayoffStreakV2,
  TeamStreakV2,
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
  streak: Array<TeamStreakV2>
}) {
  if (!streak || streak.length === 0) return null

  return (
    <div>
      {streak.slice(0, 5).map((s, index) => {
        return (
          <div
            key={`${s.startDate}-${index}`}
            className="bg-muted-foreground/20 px-1 @sm:px-3  py-1 mb-1 flex flex-row justify-between"
          >
            <div className="w-44 @xs:w-54 @sm:w-66 flex flex-row justify-between gap-2">
              <span className="w-20 @xs:w-25 @sm:w-36">
                <Datum>{s.startDate}</Datum>
              </span>
              <span className="w-2">-</span>
              <span className="w-20 @xs:w-25 @sm:w-36">
                <Datum>{s.endDate}</Datum>
              </span>
            </div>
            <div>{s.count}</div>
          </div>
        )
      })}
    </div>
  )
}

function PlayoffContent({
  streak,
}: {
  streak: Array<TeamPlayoffStreakV2>
}) {
  if (!streak || streak.length === 0) return null

  return (
    <div>
      {streak.slice(0, 5).map((s, index) => {
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
              <p>{s.count} år</p>
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
