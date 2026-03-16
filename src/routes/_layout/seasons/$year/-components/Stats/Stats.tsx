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
    <div className="grid grid-cols-1 gap-y-6 lg:gap-y-10 lg:gap-x-10 2xl:gap-x-20 lg:grid-cols-2">
      <GoalData goalData={stats} />
      <GameData gameData={stats} />
      <GoalStats goalData={stats} />
      <StreakStats streakData={stats} />
    </div>
  )
}

export default StatsComponent
