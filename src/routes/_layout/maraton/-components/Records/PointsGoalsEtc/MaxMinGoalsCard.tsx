import Date from '@/components/Common/Date'
import { MaxMinGoalGames } from '@/lib/types/records'

const MaxMinGoalsCard = ({
  position,
  teams,
  result,
  date,
}: MaxMinGoalGames) => {
  return (
    <div className="mb-1 flex max-w-100 flex-row items-center justify-between p-1 text-[10px] md:mb-2 md:p-2 md:text-sm">
      <span className="mr-4 w-8 text-right text-base font-bold tabular-nums md:text-2xl">
        {position}
      </span>
      <div className="flex grow flex-col">
        <div className="flex flex-row justify-between">
          <span className="truncate font-semibold">{teams}</span>
        </div>
        <div className="flex flex-row items-center justify-between text-[10px] md:text-xs">
          <span className="w-48 sm:w-64">
            <Date>{date}</Date>
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
