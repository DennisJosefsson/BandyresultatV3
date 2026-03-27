import Date from '@/components/Common/Date'
import type { CompareGameStat } from '@/lib/types/compare'
const CompareWinsCard = ({
  stat,
}: {
  stat: CompareGameStat
}) => {
  return (
    <div className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1">
      <div className="mb-0.5 font-semibold">
        <Date>{stat.date}</Date>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          {stat.homeName}-{stat.awayName}
        </div>
        <div className="tabular-nums">{stat.result}</div>
      </div>
    </div>
  )
}

export default CompareWinsCard
