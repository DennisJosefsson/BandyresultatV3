import { getRouteApi } from '@tanstack/react-router'
import RenderMaxMinGoalsCard from './RenderMaxMinGoalsCard'
import PointsGoals from './PointsGoals'
import { H1, H2 } from '../Headers'

const route = getRouteApi('/_layout/maraton/records/scored')

const Scored = () => {
  const { gamesMaxGoals, gamesMinGoals, count, ...rest } = route.useLoaderData({
    select: (s) => s.scored,
  })
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="grid-cols1 grid gap-2 lg:grid-cols-2">
        <div>
          <H2>Elitseriematcher med flest antal mål</H2>
          <RenderMaxMinGoalsCard stat="maxScored" array={gamesMaxGoals} />
          <p className="my-2 max-w-xl p-1 text-[10px] font-semibold md:text-xs xl:text-sm 2xl:text-base">
            Totalt {count.maxGoalCount} matcher med {count.lastMaxGoal} mål.
          </p>
        </div>
        <div>
          <H2>Elitseriematcher med minst antal mål</H2>
          <RenderMaxMinGoalsCard stat="minScored" array={gamesMinGoals} />
          <p className="my-2 max-w-xl p-1 text-[10px] font-semibold md:text-xs xl:text-sm 2xl:text-base">
            Totalt {count.minGoalCount} matcher med {count.lastMinGoal} mål.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <H1>Gjorda mål</H1>
        </div>
        <PointsGoals data={rest} stat="scored" />
      </div>
    </div>
  )
}

export default Scored
