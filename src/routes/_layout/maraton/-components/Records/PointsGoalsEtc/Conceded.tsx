import PointsGoalsSkeleton from '@/components/Loading/Skeletons/PointsGoalsSkeleton'
import { Await, getRouteApi } from '@tanstack/react-router'
import { H1 } from '../Headers'
import PointsGoals from './PointsGoals'

const route = getRouteApi(
  '/_layout/maraton/records/conceded',
)

const Conceded = () => {
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
        const conceded = data.conceded
        return (
          <div className="flex flex-col gap-2">
            <div>
              <H1>Insläppta mål</H1>
            </div>
            <PointsGoals
              data={conceded}
              stat="conceded"
            />
          </div>
        )
      }}
    </Await>
  )
}

export default Conceded
