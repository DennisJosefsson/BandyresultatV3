import { getRouteApi } from '@tanstack/react-router'
import PointsGoals from './PointsGoals'

const route = getRouteApi('/_layout/maraton/records/conceded')

const Conceded = () => {
  const conceded = route.useLoaderData()
  return <PointsGoals data={conceded} stat="conceded" />
}

export default Conceded
