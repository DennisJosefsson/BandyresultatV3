import type { Stats } from '@/lib/types/stats'
import GameData from './GameData'
import GoalData from './GoalData'
import GoalStats from './GoalStats'
import StreakStats from './StreakStats'

type StatsProps = {
  stats: Stats
}

const StatsComponent = ({ stats }: StatsProps) => {
  return (
    <div className="@container/stats">
      <div className="grid grid-cols-1 gap-y-6 @xl/stats:grid-cols-2 @xl/stats:gap-y-10 @xl/stats:gap-x-2 @3xl/stats:gap-x-10 @5xl:gap-x-20 p-1">
        <GoalData goalData={stats} />
        <GameData gameData={stats} />
        <GoalStats goalData={stats} />
        <StreakStats streakData={stats} />
      </div>
    </div>
  )
}

export default StatsComponent
