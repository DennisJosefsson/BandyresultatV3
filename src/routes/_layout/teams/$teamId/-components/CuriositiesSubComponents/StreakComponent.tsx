import type { ReactNode } from 'react'

import Date from '@/components/Common/Date'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'

type Streak = {
  teamId: number
  name: string
  women: boolean
  gameCount: number
  startDate: string
  endDate: string
}

const StreakComponent = ({
  children,
}: {
  children: ReactNode
}) => {
  return <Card className="mb-2">{children}</Card>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader className="p-3">
      <CardTitle className="text-[10px] md:text-sm">
        {children}
      </CardTitle>
    </CardHeader>
  )
}

function Content({ streak }: { streak: Array<Streak> }) {
  if (!streak || streak.length === 0) return null

  return (
    <CardContent className="xxs:text-xs text-[10px] lg:mr-0 lg:text-sm">
      <div>
        {streak.map((s, index) => {
          return (
            <div
              key={`${s.startDate}-${index}`}
              className="bg-muted-foreground/20 mb-1 flex flex-row justify-between rounded px-3 py-1"
            >
              <div>
                <Date>{s.startDate}</Date> -{' '}
                <Date>{s.endDate}</Date>
              </div>
              <div>{s.gameCount} matcher</div>
            </div>
          )
        })}
      </div>
    </CardContent>
  )
}

StreakComponent.Title = Title
StreakComponent.Content = Content

export default StreakComponent
