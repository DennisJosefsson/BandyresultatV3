import { getRouteApi } from '@tanstack/react-router'
import PointsGoals from './PointsGoals'
import { H1 } from '../Headers'

const route = getRouteApi('/_layout/maraton/records/points')

const Points = () => {
  const points = route.useLoaderData({
    select: (s) => s.points,
  })
  return (
    <div className="flex flex-col gap-2">
      <div>
        <H1>Poäng</H1>
      </div>
      <PointsGoals data={points} stat="points" />
    </div>
  )
}

export default Points
