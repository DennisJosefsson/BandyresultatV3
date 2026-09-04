import { Datum } from '@/components/Common/Date'
import TeamLogo from '@/components/Common/TeamLogo'
import type { MaxMinGoalGames } from '@/lib/types/records'

const MaxMinGoalsCard = ({
  position,
  homeTeam,
  homeTeamId,
  awayTeam,
  awayTeamId,
  result,
  date,
}: MaxMinGoalGames) => {
  return (
    <div className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6 flex w-full flex-row items-center p-1 md:p-2 border-b border-accent last:border-none">
      <span className="mr-2 @lg:mr-4 w-4 @sm:w-6 @lg:w-8 text-right text-sm @xs:text-base font-bold tabular-nums @md:text-2xl">
        {position}
      </span>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col gap-1 @sm:gap-2">
          <div className="flex flex-row gap-2">
            <div>
              <TeamLogo
                teamId={homeTeamId}
                size={32}
              />
            </div>
            <div>
              <span className="truncate font-semibold">
                {homeTeam}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-2">
              <div>
                <TeamLogo
                  teamId={awayTeamId}
                  size={32}
                />
              </div>
              <div>
                <span className="truncate font-semibold">
                  {awayTeam}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 @sm:gap-2">
          <span className="mr-2 @3xl:mr-4 text-right text-[10px] @sm:text-xs @md:text-sm font-semibold tabular-nums">
            {result}
          </span>
          <span className="@3xl:ml-1 text-[7px] @xs:text-[8px] @sm:text-[10px] @xl:text-xs">
            <Datum>{date}</Datum>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MaxMinGoalsCard
