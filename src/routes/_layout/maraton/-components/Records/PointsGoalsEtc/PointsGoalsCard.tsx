import type { RecordData } from '@/lib/types/records'

const PointsGoalsCard = ({
  position,
  data,
  year,
  team,
}: RecordData) => {
  return (
    <div className="msm:text-xs flex max-w-100 flex-row items-center justify-between p-1 text-[8px] msm:text-[10px] md:p-2 lg:text-sm">
      <span className="mr-2 msm:mr-4 w-6 msm:w-8 text-right text-base font-bold tabular-nums md:text-2xl">
        {position}
      </span>
      <div className="flex grow flex-col">
        <div className="xxs:w-40 flex w-16 flex-row justify-between">
          <span className="truncate font-semibold">
            {team.name}
          </span>
        </div>
        <div>
          <span className="w-12">{year}</span>
        </div>
      </div>
      <div>
        <span className="mr-4 w-8 text-right text-xs font-semibold tabular-nums md:text-sm">
          {data}
        </span>
      </div>
    </div>
  )
}

export default PointsGoalsCard
