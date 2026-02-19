import { getRouteApi } from '@tanstack/react-router'
import GameStatComponent from './GameStatComponent'

const route = getRouteApi('/_layout/teams/$teamId')

const GameStats = () => {
  const gameStats = route.useLoaderData({ select: (data) => data.stats })

  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
      {gameStats.maxScoredHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>Gjorda mål, hemma</GameStatComponent.Title>
          <GameStatComponent.Content statArray={gameStats.maxScoredHomeGames} />
        </GameStatComponent>
      ) : null}
      {gameStats.maxScoredAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>Gjorda mål, borta</GameStatComponent.Title>
          <GameStatComponent.Content statArray={gameStats.maxScoredAwayGames} />
        </GameStatComponent>
      ) : null}
      {gameStats.maxConcededHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Insläppta mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={gameStats.maxConcededHomeGames}
          />
        </GameStatComponent>
      ) : null}
      {gameStats.maxConcededAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Insläppta mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={gameStats.maxConcededAwayGames}
          />
        </GameStatComponent>
      ) : null}
      {gameStats.maxGoalDifferenceHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>Störst vinst, hemma</GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={gameStats.maxGoalDifferenceHomeGames}
          />
        </GameStatComponent>
      ) : null}
      {gameStats.maxGoalDifferenceAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>Störst vinst, borta</GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={gameStats.maxGoalDifferenceAwayGames}
          />
        </GameStatComponent>
      ) : null}
      {gameStats.minGoalDifferenceHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst förlust, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={gameStats.minGoalDifferenceHomeGames}
          />
        </GameStatComponent>
      ) : null}
      {gameStats.minGoalDifferenceAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst förlust, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={gameStats.minGoalDifferenceAwayGames}
          />
        </GameStatComponent>
      ) : null}
      {gameStats.maxTotalHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Flest antal mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content statArray={gameStats.maxTotalHomeGames} />
        </GameStatComponent>
      ) : null}
      {gameStats.maxTotalAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Flest antal mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content statArray={gameStats.maxTotalAwayGames} />
        </GameStatComponent>
      ) : null}
      {gameStats.minTotalHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Minst antal mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content statArray={gameStats.minTotalHomeGames} />
        </GameStatComponent>
      ) : null}
      {gameStats.minTotalAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Minst antal mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content statArray={gameStats.minTotalAwayGames} />
        </GameStatComponent>
      ) : null}
    </div>
  )
}

export default GameStats
