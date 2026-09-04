import ScoredSkeleton from '@/components/Loading/Skeletons/ScoredSkeleton'
import { Await, getRouteApi } from '@tanstack/react-router'
import { H1, H2 } from '../Headers'
import PointsGoals from './PointsGoals'
import RenderMaxMinGoalsCard from './RenderMaxMinGoalsCard'

const route = getRouteApi('/_layout/maraton/records/scored')

const Scored = () => {
  const promiseData = route.useLoaderData({
    select: (s) => s.data,
  })

  return (
    <Await
      promise={promiseData}
      fallback={<ScoredSkeleton />}
    >
      {(data) => {
        if (!data) return null
        const {
          gamesMaxGoals,
          gamesMinGoals,
          count,
          ...rest
        } = data.scored

        return (
          <div className="mt-3 flex flex-col gap-2">
            <div className="grid grid-cols-1 gap-y-4 @3xl:grid-cols-2 @3xl:gap-4 @7xl:grid-cols-3 @7xl:gap-10">
              <div>
                <H2>
                  Elitseriematcher med flest antal mål
                </H2>
                <RenderMaxMinGoalsCard
                  stat="maxScored"
                  array={gamesMaxGoals}
                />
                <p className="my-2 max-w-xl p-1 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
                  Totalt {count.maxGoalCount} matcher med{' '}
                  {count.lastMaxGoal} mål.
                </p>
              </div>
              <div>
                <H2>
                  Elitseriematcher med minst antal mål
                </H2>
                <RenderMaxMinGoalsCard
                  stat="minScored"
                  array={gamesMinGoals}
                />
                <p className="my-2 max-w-xl p-1 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
                  Totalt {count.minGoalCount} matcher med{' '}
                  {count.lastMinGoal} mål.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <H1>Gjorda mål</H1>
              </div>
              <PointsGoals
                data={rest}
                stat="scored"
              />
            </div>
          </div>
        )
      }}
    </Await>
  )
}

export default Scored
