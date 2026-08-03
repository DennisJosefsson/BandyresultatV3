import Streaks from './CuriositiesSubComponents/Streaks'
import TeamSeasonCuriosities from './CuriositiesSubComponents/TeamSeasonCuriosities'
import GameStats from './GameStats/GameStats'

const TeamCuriosities = () => {
  return (
    <div className="mt-2 sm:mt-4">
      <TeamSeasonCuriosities />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <GameStats />
        <Streaks />
      </div>
    </div>
  )
}

export default TeamCuriosities
