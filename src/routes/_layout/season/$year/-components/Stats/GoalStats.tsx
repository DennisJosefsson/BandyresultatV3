import { Stats } from '@/lib/types/stats'
import ScoreStatsCard from './MaxMinGoalsStatsCard'

type GoalStatsProps = {
  goalData: Pick<Stats, 'maxGoals' | 'minGoals' | 'maxDiff'>
}
const GoalStats = ({ goalData }: GoalStatsProps) => {
  return (
    <div>
      {goalData.maxGoals.games.length > 0 ? (
        <ScoreStatsCard
          title="Match(er) med flest antal mål:"
          maxMinGoals={goalData.maxGoals.games}
        />
      ) : null}
      {goalData.minGoals.games.length > 0 ? (
        <ScoreStatsCard
          title="Match(er) med minst antal mål:"
          maxMinGoals={goalData.minGoals.games}
        />
      ) : null}
      {goalData.maxDiff.games.length > 0 ? (
        <ScoreStatsCard
          title="Match(er) med störst målskillnad:"
          maxMinGoals={goalData.maxDiff.games}
        />
      ) : null}
    </div>
  )
}

export default GoalStats
