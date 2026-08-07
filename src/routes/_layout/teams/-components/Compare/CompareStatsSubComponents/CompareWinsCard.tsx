import { Datum } from '@/components/Common/Date'
import type { CompareGameStat } from '@/lib/types/compare'
const CompareWinsCard = ({
  stat,
}: {
  stat: CompareGameStat
}) => {
  return (
    <div className="bg-muted-foreground/20 mb-4 last:mb-1 flex w-full flex-col rounded px-3 py-1 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
      <div className="mb-0.5 font-semibold">
        <Datum>{stat.date}</Datum>
      </div>
      <div className="flex flex-row justify-between">
        <span>
          {stat.homeName}-{stat.awayName}
        </span>
        <span className="tabular-nums">{stat.result}</span>
      </div>
    </div>
  )
}

export default CompareWinsCard
