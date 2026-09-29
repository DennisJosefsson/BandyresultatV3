import { getRouteApi } from '@tanstack/react-router'
import GameStatComponent from './GameStatComponent'

const route = getRouteApi('/_layout/teams/$teamId/stats/')

const GameStats = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  console.log({ executionTime: data.executionTime })
  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 justify-start">
      {data.stats.maxScoredHome &&
      data.stats.maxScoredHome.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Gjorda mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxScoredHome}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxScoredAway &&
      data.stats.maxScoredAway.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Gjorda mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxScoredAway}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxConcededHome &&
      data.stats.maxConcededHome.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Insläppta mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxConcededHome}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxConcededAway &&
      data.stats.maxConcededAway.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Insläppta mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxConcededAway}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxGoalDifferenceHome &&
      data.stats.maxGoalDifferenceHome.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst vinst, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxGoalDifferenceHome}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxGoalDifferenceAway &&
      data.stats.maxGoalDifferenceAway.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst vinst, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxGoalDifferenceAway}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.minGoalDifferenceHome &&
      data.stats.minGoalDifferenceHome.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst förlust, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.minGoalDifferenceHome}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.minGoalDifferenceAway &&
      data.stats.minGoalDifferenceAway.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Störst förlust, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.minGoalDifferenceAway}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxTotalHome &&
      data.stats.maxTotalHome.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Flest antal mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxTotalHome}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.maxTotalAway &&
      data.stats.maxTotalAway.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Flest antal mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.maxTotalAway}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.minTotalHome &&
      data.stats.minTotalHome.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Minst antal mål, hemma
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.minTotalHome}
          />
        </GameStatComponent>
      ) : null}
      {data.stats.minTotalAway &&
      data.stats.minTotalAway.length > 0 ? (
        <GameStatComponent>
          <GameStatComponent.Title>
            Minst antal mål, borta
          </GameStatComponent.Title>
          <GameStatComponent.Content
            statArray={data.stats.minTotalAway}
          />
        </GameStatComponent>
      ) : null}
    </div>
  )
}

export default GameStats
