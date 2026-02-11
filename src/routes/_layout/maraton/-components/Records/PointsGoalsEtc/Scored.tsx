import { getRouteApi } from '@tanstack/react-router'
import PointsGoals from './PointsGoals'
import RenderMaxMinGoalsCard from './RenderMaxMinGoalsCard'

const route = getRouteApi('/_layout/maraton/records/scored')

const Scored = () => {
  const { gamesMaxGoals, gamesMinGoals, count, ...rest } = route.useLoaderData({
    select: (s) => s.scored,
  })
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="grid-cols1 grid gap-2 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
            Elitseriematcher med flest antal mål
          </h2>
          <RenderMaxMinGoalsCard stat="maxScored" array={gamesMaxGoals} />
          <p className="my-2 max-w-xl p-1 text-[10px] font-bold md:text-xs xl:text-sm 2xl:text-base">
            Totalt {count.maxGoalCount} matcher med {count.lastMaxGoal} mål.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-sm leading-4 font-bold sm:text-lg lg:text-xl">
            Elitseriematcher med flest antal mål
          </h2>
          <RenderMaxMinGoalsCard stat="minScored" array={gamesMinGoals} />
          <p className="my-2 max-w-xl p-1 text-[10px] font-bold md:text-xs xl:text-sm 2xl:text-base">
            Totalt {count.minGoalCount} matcher med {count.lastMinGoal} mål.
          </p>
        </div>
      </div>
      <PointsGoals data={rest} stat="scored" />
    </div>
  )
}

export default Scored
