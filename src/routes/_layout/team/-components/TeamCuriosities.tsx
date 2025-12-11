import Streaks from './CuriositiesSubComponents/Streaks'
import TeamSeasonCuriosities from './CuriositiesSubComponents/TeamSeasonCuriosities'
import GameStats from './GameStats/GameStats'

const TeamCuriosities = () => {
  return (
    <div>
      <TeamSeasonCuriosities />
      <GameStats />
      <Streaks />
    </div>
  )
}

export default TeamCuriosities
