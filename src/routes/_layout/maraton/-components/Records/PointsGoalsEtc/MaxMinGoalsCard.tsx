import { Datum } from '@/components/Common/Date'
import type { MaxMinGoalGames } from '@/lib/types/records'

const MaxMinGoalsCard = ({
  position,
  teams,
  result,
  date,
}: MaxMinGoalGames) => {
  return (
    <div className="msm:text-xs flex max-w-100 flex-row items-center justify-between p-1 text-[8px] msm:text-[10px] md:p-2 lg:text-sm">
      <span className="mr-2 msm:mr-4 w-6 msm:w-8 text-right text-base font-bold tabular-nums md:text-2xl">
        {position}
      </span>
      <div className="flex grow flex-col">
        <div className="flex flex-row justify-between">
          <span className="truncate font-semibold">
            {teams}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="w-48 sm:w-64">
            <Datum>{date}</Datum>
          </span>
        </div>
      </div>
      <div>
        <span className="mr-4 w-8 text-right text-xs font-semibold tabular-nums md:text-sm">
          {result}
        </span>
      </div>
    </div>
  )
}

export default MaxMinGoalsCard
