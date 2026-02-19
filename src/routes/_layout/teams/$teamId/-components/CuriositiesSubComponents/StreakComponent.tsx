import Date from '@/components/Common/Date'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { ReactNode } from 'react'

type Streak = {
  teamId: number
  name: string
  women: boolean
  gameCount: number
  startDate: string
  endDate: string
}

const StreakComponent = ({ children }: { children: ReactNode }) => {
  return <Card className="mb-2">{children}</Card>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader className="p-3">
      <CardTitle className="text-[10px] md:text-sm">{children}</CardTitle>
    </CardHeader>
  )
}

function Content({ streak }: { streak: Streak[] }) {
  if (!streak || streak.length === 0) return null

  return (
    <CardContent className="xxs:text-xs text-[10px] lg:mr-0 lg:text-sm">
      <div>
        {streak.map((streak, index) => {
          return (
            <div
              key={`${streak.startDate}-${index}`}
              className="bg-muted-foreground/20 mb-1 flex flex-row justify-between rounded px-3 py-1"
            >
              <div>
                <Date>{streak.startDate}</Date> - <Date>{streak.endDate}</Date>
              </div>
              <div>{streak.gameCount} matcher</div>
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
