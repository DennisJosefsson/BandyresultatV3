import { GeneralStatItem } from '@/lib/types/records'

const GeneralStatsCard = ({ position, team, count }: GeneralStatItem) => {
  return (
    <div className="mb-1 flex max-w-100 flex-row items-center justify-between p-1 text-[10px] md:mb-2 md:p-2 md:text-sm">
      <span className="mr-4 w-8 text-right text-base font-bold tabular-nums md:text-2xl">
        {position}
      </span>

      <div className="flex grow flex-row items-center justify-between">
        <span className="truncate font-semibold">{team.name}</span>
        <span className="mr-4 text-right text-xs font-semibold md:text-sm">
          {count}
        </span>
      </div>
    </div>
  )
}

export default GeneralStatsCard
