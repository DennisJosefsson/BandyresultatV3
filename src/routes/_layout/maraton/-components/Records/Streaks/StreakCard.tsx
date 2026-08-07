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
      <div className="mb-2 @3xl:mb-4 max-w-65 @xs:max-w-70 @2xl:max-w-90 @7xl:max-w-105 border shadow-xs md:shadow-sm">
        {streak.map((s) => {
          return (
            <div
              className="mb-1 flex w-full flex-row items-center justify-between p-1 text-[8px] msm:text-[10px] md:mb-2 md:p-2 md:text-sm border-b border-accent last:border-none"
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
                  <span>
                    <Datum>{s.startDate}</Datum> -{' '}
                    <Datum>{s.endDate}</Datum>
                  </span>
                </div>
              </div>
              <div>
                <span className="mr-2 @sm:mr-4 w-4 @sm:w-8 text-right text-[10px] @sm:text-xs @md:text-sm font-semibold tabular-nums">
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
