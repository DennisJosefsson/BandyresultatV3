import { getRouteApi } from '@tanstack/react-router'

import GameStatComponent from './GameStatComponent'

const route = getRouteApi('/_layout/teams/$teamId')

const GameStats = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null

  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
      {data.stats.maxScoredHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Gjorda mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxScoredHomeGames}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxScoredAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Gjorda mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxScoredAwayGames}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxConcededHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Insläppta mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxConcededHomeGames}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxConcededAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Insläppta mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxConcededAwayGames}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxGoalDifferenceHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst vinst, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={
              data.stats.maxGoalDifferenceHomeGames
            }
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxGoalDifferenceAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst vinst, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={
              data.stats.maxGoalDifferenceAwayGames
            }
          />
        </GameStatComponent>
      ) : null}
      {data.stats.minGoalDifferenceHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst förlust, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={
              data.stats.minGoalDifferenceHomeGames
            }
          />
        </GameStatComponent>
      ) : null}
      {data.stats.minGoalDifferenceAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst förlust, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={
              data.stats.minGoalDifferenceAwayGames
            }
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxTotalHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Flest antal mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxTotalHomeGames}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxTotalAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Flest antal mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxTotalAwayGames}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.minTotalHomeGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Minst antal mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.minTotalHomeGames}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.minTotalAwayGames.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Minst antal mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.minTotalAwayGames}
          />
        </GameStatComponent>
      ) : null}
    </div>
  )
}

export default GameStats
