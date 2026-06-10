import GameStats from './GameStats/GameStats'
import TeamSeasonCuriosities from './CuriositiesSubComponents/TeamSeasonCuriosities'
import Streaks from './CuriositiesSubComponents/Streaks'

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
