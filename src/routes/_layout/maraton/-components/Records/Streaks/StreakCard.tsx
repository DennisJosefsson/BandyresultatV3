import Date from '@/components/Common/Date'
import type { RecordStreak } from '@/lib/types/records'
type StreakCardProps = {
  streak: Array<RecordStreak>
  title: string
}

const StreakCard = ({ streak, title }: StreakCardProps) => {
  return (
    <div className="mt-2">
      <h3 className="mb-2 text-xs leading-4 font-bold sm:text-base lg:text-lg">
        {title}
      </h3>
      <div>
        {streak.map((s) => {
          return (
            <div
              className="mb-1 flex max-w-100 flex-row items-center justify-between p-1 text-[10px] md:mb-2 md:p-2 md:text-sm"
              key={`${s.name}-${s.startDate}`}
            >
              <span className="mr-4 w-8 text-right text-base font-bold tabular-nums md:text-2xl">
                {s.position}
              </span>
              <div className="flex grow flex-col">
                <div className="flex flex-row justify-between">
                  <span className="truncate font-semibold">
                    {s.name}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between text-[10px] md:text-xs">
                  <span className="w-48 sm:w-64">
                    <Date>{s.startDate}</Date> -{' '}
                    <Date>{s.endDate}</Date>
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
