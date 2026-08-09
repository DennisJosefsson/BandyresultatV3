import PointsGoalsSkeleton from '@/components/Loading/Skeletons/PointsGoalsSkeleton'
import { Await, getRouteApi } from '@tanstack/react-router'
import { H1 } from '../Headers'
import PointsGoals from './PointsGoals'

const route = getRouteApi('/_layout/maraton/records/points')

const Points = () => {
  const promiseData = route.useLoaderData({
    select: (s) => s.data,
  })

  return (
    <Await
      promise={promiseData}
      fallback={<PointsGoalsSkeleton />}
    >
      {(data) => {
        if (!data) return null
        const points = data.points
        return (
          <div className="flex flex-col gap-2">
            <div>
              <H1>Insläppta mål</H1>
            </div>
            <PointsGoals
              data={points}
              stat="points"
            />
          </div>
        )
      }}
    </Await>
  )
}

export default Points
