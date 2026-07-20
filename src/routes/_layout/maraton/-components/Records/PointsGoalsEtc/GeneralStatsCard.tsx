import type { GeneralStatItem } from '@/lib/types/records'

const GeneralStatsCard = ({
  position,
  team,
  count,
}: GeneralStatItem) => {
  return (
    <div className="mb-1 flex max-w-80 flex-row items-center justify-between p-1 text-[10px] msm:text-xs md:mb-2 md:p-2 lg:text-sm">
      <span className="mr-4 w-8 text-right text-base font-bold tabular-nums md:text-2xl">
        {position}
      </span>

      <div className="flex grow flex-row items-center justify-between">
        <div className="w-16 xxs:w-fit">
          <span className="truncate">{team.name}</span>
        </div>
        <div>
          <span className="mr-4 text-right">{count}</span>
        </div>
      </div>
    </div>
  )
}

export default GeneralStatsCard
