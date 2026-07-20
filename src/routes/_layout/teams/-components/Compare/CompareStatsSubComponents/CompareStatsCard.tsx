import type { CompareSeasonStat } from '@/lib/types/compare'

const CompareStatsCard = ({
  stat,
}: {
  stat: CompareSeasonStat
}) => {
  return (
    <div className="bg-muted-foreground/20 my-2 flex w-full flex-col rounded px-3 py-1">
      <div className="flex flex-row justify-between">
        <div>{stat.team.casualName}</div>
        <div className="text-right">{stat.data}</div>
      </div>
    </div>
  )
}
export default CompareStatsCard
