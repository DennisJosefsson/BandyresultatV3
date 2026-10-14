import type { MvPlayoffStats } from '@/lib/types/stats'
import AllGoals from './AllGoals'
import AllResults from './AllResults'
import Games from './Games'

type StatsProps = {
  stats: MvPlayoffStats
}

const PlayoffStatsComponent = ({ stats }: StatsProps) => {
  return (
    <div className="@container/stats flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xs sm:text-sm">
          Slutspelsstatistik
        </h1>
      </div>
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-2 sm:gap-8">
        <AllResults data={stats.allStats} />
        <AllGoals data={stats.allStats} />
      </div>
      <div>
        <Games games={stats.maxMinGames} variant="playoff"/>
      </div>
    </div>
  )
}

export default PlayoffStatsComponent
