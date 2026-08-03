import { Datum } from '@/components/Common/Date'
import type { RecordStreak } from '@/lib/types/records'
import { H3 } from '../Headers'
type StreakCardProps = {
  streak: Array<RecordStreak>
  title: string
}

const StreakCard = ({ streak, title }: StreakCardProps) => {
  return (
    <div className="mt-2">
      <H3>{title}</H3>
      <div className="max-w-105 border shadow-sm">
        {streak.map((s) => {
          return (
            <div
              className="mb-1 flex max-w-100 flex-row items-center justify-between p-1 text-[8px] msm:text-[10px] md:mb-2 md:p-2 md:text-sm"
              key={`${s.name}-${s.startDate}`}
            >
              <span className="mr-2 msm:mr-4 w-6 msm:w-8 text-right text-base font-bold tabular-nums md:text-2xl">
                {s.position}
              </span>
              <div className="flex grow flex-col">
                <div className="flex flex-row justify-between">
                  <span className="truncate font-semibold">
                    {s.name}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <span className="w-48 sm:w-64">
                    <Datum>{s.startDate}</Datum> -{' '}
                    <Datum>{s.endDate}</Datum>
                  </span>
                </div>
              </div>
              <div>
                <span className="mr-4 w-8 text-right text-xs font-semibold tabular-nums md:text-sm">
                  {s.gameCount}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StreakCard
