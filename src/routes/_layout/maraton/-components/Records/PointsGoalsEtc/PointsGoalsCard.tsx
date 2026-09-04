import TeamLogo from '@/components/Common/TeamLogo'
import type { RecordData } from '@/lib/types/records'

const PointsGoalsCard = ({
  position,
  data,
  year,
  team,
}: RecordData) => {
  return (
    <div className="text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6 flex w-full flex-row items-center justify-between p-1 md:p-2 border-b border-accent last:border-none">
      <span className="mr-2 @lg:mr-4 w-4 @sm:w-6 @lg:w-8 text-right text-sm @xs:text-base font-bold tabular-nums @md:text-2xl">
        {position}
      </span>
      <div className="flex grow flex-row items-center justify-between">
        <div className="flex grow flex-col gap-1 @sm:gap-2">
          <div className="flex flex-row gap-2">
            <TeamLogo
              teamId={team.teamId}
              size={32}
            />
            <span className="truncate font-semibold">
              {team.name}
            </span>
          </div>
          <div>
            <span className="@3xl:ml-1 text-[7px] @xs:text-[8px] @sm:text-[10px] @xl:text-xs">
              {year}
            </span>
          </div>
        </div>
        <div>
          <span className="mr-2 @3xl:mr-4 w-4 @sm:w-8 text-right text-[10px] @sm:text-xs @md:text-sm font-semibold tabular-nums">
            {data}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PointsGoalsCard
