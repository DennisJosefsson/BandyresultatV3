import { getRouteApi } from '@tanstack/react-router'
import PointsGoals from './PointsGoals'
import { H1 } from '../Headers'

const route = getRouteApi('/_layout/maraton/records/conceded')

const Conceded = () => {
  const conceded = route.useLoaderData({
    select: (s) => s.conceded,
  })
  return (
    <div className="flex flex-col gap-2">
      <div>
        <H1>Insläppta mål</H1>
      </div>
      <PointsGoals data={conceded} stat="conceded" />
    </div>
  )
}

export default Conceded
