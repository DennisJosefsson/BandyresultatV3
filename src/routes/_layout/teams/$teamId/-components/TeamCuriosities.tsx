import Streaks from './CuriositiesSubComponents/Streaks'
import TeamSeasonCuriosities from './CuriositiesSubComponents/TeamSeasonCuriosities'
import GameStats from './GameStats/GameStats'

const TeamCuriosities = () => {
  return (
    <div className="@container mt-2 sm:mt-4 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
      <TeamSeasonCuriosities />
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-x-8 gap-y-1 @sm:gap-y-2 mt-2 @5xl:mt-4 @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
        <GameStats />
        <Streaks />
      </div>
    </div>
  )
}

export default TeamCuriosities
