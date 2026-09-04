import { Datum } from '@/components/Common/Date'
import TeamLogo from '@/components/Common/TeamLogo'
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
      <div className="mb-2 @3xl:mb-4 border shadow-xs md:shadow-sm">
        {streak.map((s) => {
          return (
            <div
              className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6 flex w-full flex-row items-center justify-between p-1 md:p-2 border-b border-accent last:border-none"
              key={`${s.name}-${s.startDate}`}
            >
              <span className="mr-2 @lg:mr-4 w-4 @sm:w-6 @lg:w-8 text-right text-sm @xs:text-base font-bold tabular-nums @md:text-2xl">
                {s.position}
              </span>
              <div className="flex grow flex-col gap-1 @sm:gap-2">
                <div className="flex flex-row gap-2">
                  <TeamLogo
                    teamId={s.teamId}
                    size={32}
                  />
                  <span className="truncate font-semibold">
                    {s.name}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <span className="@3xl:ml-1 text-[7px] @xs:text-[8px] @sm:text-[10px] @xl:text-xs">
                    <Datum>{s.startDate}</Datum> -{' '}
                    <Datum>{s.endDate}</Datum>
                  </span>
                </div>
              </div>
              <div>
                <span className="mr-2 @3xl:mr-4 w-4 @sm:w-8 text-right text-[10px] @sm:text-xs @md:text-sm font-semibold tabular-nums">
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
