import type { CompareSeasonStat } from '@/lib/types/compare'

const CompareStatsCard = ({
  stat,
}: {
  stat: CompareSeasonStat
}) => {
  return (
    <div className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1">
      <div className="flex flex-row justify-between text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
        <span>{stat.team.casualName}</span>
        <span className="text-right">{stat.data}</span>
      </div>
    </div>
  )
}
export default CompareStatsCard
