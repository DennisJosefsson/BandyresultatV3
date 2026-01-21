import { createFileRoute } from '@tanstack/react-router'
import Points from '../-components/Records/PointsGoalsEtc/Points'
import { getPointRecords } from '../-functions/getPointRecords'

export const Route = createFileRoute('/_layout/maraton/records/points')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getPointRecords({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data.points
  },
  component: Points,
})
