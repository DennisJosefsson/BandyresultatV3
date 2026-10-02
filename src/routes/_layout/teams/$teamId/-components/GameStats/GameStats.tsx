import type { TeamRecord } from '@/lib/types/team'
import { getRouteApi } from '@tanstack/react-router'
import GameStatComponent from './GameStatComponent'

const route = getRouteApi('/_layout/teams/$teamId/stats/')

const RenderGameStats = ({
  array,
  title,
}: {
  array: Array<TeamRecord>
  title: string
}) => {
  return (
    <GameStatComponent>
      <GameStatComponent.Title>
        {title}
      </GameStatComponent.Title>
      <GameStatComponent.Content statArray={array} />
    </GameStatComponent>
  )
}

const GameStats = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  console.log({ executionTime: data.executionTime })
  if (!data.stats.homeRecords && !data.stats.awayRecords)
    return null

  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4 justify-start">
      {data.stats.homeRecords?.maxScored &&
      data.stats.homeRecords.maxScored.length > 0 ? (
        <RenderGameStats
          title="Gjorda mål, hemma"
          array={data.stats.homeRecords?.maxScored}
        />
      ) : null}
      {data.stats.awayRecords?.maxScored &&
      data.stats.awayRecords.maxScored.length > 0 ? (
        <RenderGameStats
          title="Gjorda mål, borta"
          array={data.stats.awayRecords?.maxScored}
        />
      ) : null}
      {data.stats.homeRecords?.maxConceded &&
      data.stats.homeRecords.maxConceded.length > 0 ? (
        <div>
          <RenderGameStats
            title="Insläppta mål, hemma"
            array={data.stats.homeRecords?.maxConceded}
          />
        </div>
      ) : null}
      {data.stats.awayRecords?.maxConceded &&
      data.stats.awayRecords.maxConceded.length > 0 ? (
        <div>
          <RenderGameStats
            title="Insläppta mål, borta"
            array={data.stats.awayRecords?.maxConceded}
          />
        </div>
      ) : null}
      {data.stats.homeRecords?.maxGoalDifference &&
      data.stats.homeRecords.maxGoalDifference.length >
        0 ? (
        <div>
          <RenderGameStats
            title="Störst vinst, hemma"
            array={data.stats.homeRecords.maxGoalDifference}
          />
        </div>
      ) : null}
      {data.stats.awayRecords?.maxGoalDifference &&
      data.stats.awayRecords.maxGoalDifference.length >
        0 ? (
        <div>
          <RenderGameStats
            title="Störst vinst, borta"
            array={data.stats.awayRecords.maxGoalDifference}
          />
        </div>
      ) : null}
      {data.stats.homeRecords?.minGoalDifference &&
      data.stats.homeRecords.minGoalDifference.length >
        0 ? (
        <div>
          <RenderGameStats
            title="Störst förlust, hemma"
            array={data.stats.homeRecords.minGoalDifference}
          />
        </div>
      ) : null}
      {data.stats.awayRecords?.minGoalDifference &&
      data.stats.awayRecords.minGoalDifference.length >
        0 ? (
        <div>
          <RenderGameStats
            title="Störst förlust, borta"
            array={data.stats.awayRecords.minGoalDifference}
          />
        </div>
      ) : null}
      {data.stats.homeRecords?.maxTotalGoals &&
      data.stats.homeRecords.maxTotalGoals.length > 0 ? (
        <div>
          <RenderGameStats
            title="Flest antal mål, hemma"
            array={data.stats.homeRecords?.maxTotalGoals}
          />
        </div>
      ) : null}
      {data.stats.awayRecords?.maxTotalGoals &&
      data.stats.awayRecords.maxTotalGoals.length > 0 ? (
        <div>
          <RenderGameStats
            title="Flest antal mål, borta"
            array={data.stats.awayRecords?.maxTotalGoals}
          />
        </div>
      ) : null}
      {data.stats.homeRecords?.minTotalGoals &&
      data.stats.homeRecords.minTotalGoals.length > 0 ? (
        <div>
          <RenderGameStats
            title="Minst antal mål, hemma"
            array={data.stats.homeRecords?.minTotalGoals}
          />
        </div>
      ) : null}
      {data.stats.awayRecords?.minTotalGoals &&
      data.stats.awayRecords.minTotalGoals.length > 0 ? (
        <div>
          <RenderGameStats
            title="Minst antal mål, borta"
            array={data.stats.awayRecords?.minTotalGoals}
          />
        </div>
      ) : null}
    </div>
  )
}

export default GameStats
