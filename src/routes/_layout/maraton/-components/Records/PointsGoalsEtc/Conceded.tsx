import { getRouteApi } from '@tanstack/react-router'
import PointsGoals from './PointsGoals'

const route = getRouteApi('/_layout/maraton/records/conceded')

const Conceded = () => {
  const conceded = route.useLoaderData({ select: (s) => s.conceded })
  return <PointsGoals data={conceded} stat="conceded" />
}

export default Conceded
