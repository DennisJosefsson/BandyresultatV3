import type { Stats } from '@/lib/types/stats'
import StreakStats from './StreakStats'
import GoalStats from './GoalStats'
import GoalData from './GoalData'
import GameData from './GameData'

type StatsProps = {
  stats: Stats
}

const StatsComponent = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-10 2xl:gap-x-20">
      <GoalData goalData={stats} />
      <GameData gameData={stats} />
      <GoalStats goalData={stats} />
      <StreakStats streakData={stats} />
    </div>
  )
}

export default StatsComponent
