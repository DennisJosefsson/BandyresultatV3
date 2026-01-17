import { Stats } from '@/lib/types/stats'
import GameData from './GameData'
import GoalData from './GoalData'
import GoalStats from './GoalStats'
import StreakStats from './StreakStats'

type StatsProps = {
  stats: Stats
}

const StatsComponent = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
      <GoalData goalData={stats} />
      <GameData gameData={stats} />
      <StreakStats streakData={stats} />
      <GoalStats goalData={stats} />
    </div>
  )
}

export default StatsComponent
