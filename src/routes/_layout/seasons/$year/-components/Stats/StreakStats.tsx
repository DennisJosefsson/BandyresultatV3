import { Stats } from '@/lib/types/stats'
import StreakStatsCard from './StreakStatsCard'

type StreakStatsProps = {
  streakData: Pick<
    Stats,
    | 'winStreak'
    | 'noWinStreak'
    | 'losingStreak'
    | 'unbeatenStreak'
    | 'drawStreak'
  >
}

const StreakStats = ({ streakData }: StreakStatsProps) => {
  return (
    <>
      <div>
        {streakData.unbeatenStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad utan förlust:"
            streak={streakData.unbeatenStreak}
          />
        ) : null}

        {streakData.winStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad med vinst:"
            streak={streakData.winStreak}
          />
        ) : null}

        {streakData.drawStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad med oavgjort:"
            streak={streakData.drawStreak}
          />
        ) : null}

        {streakData.noWinStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad utan vinst:"
            streak={streakData.noWinStreak}
          />
        ) : null}

        {streakData.losingStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad med förlust:"
            streak={streakData.losingStreak}
          />
        ) : null}
      </div>
    </>
  )
}

export default StreakStats
