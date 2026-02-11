import { getRouteApi } from '@tanstack/react-router'
import PointsGoals from './PointsGoals'

const route = getRouteApi('/_layout/maraton/records/points')

const Points = () => {
  const points = route.useLoaderData({ select: (s) => s.points })
  return <PointsGoals data={points} stat="points" />
}

export default Points
