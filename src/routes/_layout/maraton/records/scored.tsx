import { createFileRoute } from '@tanstack/react-router'
import Scored from '../-components/Records/PointsGoalsEtc/Scored'
import { getScoredRecords } from '../-functions/getScoredRecords'

export const Route = createFileRoute('/_layout/maraton/records/scored')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getScoredRecords({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data.scored
  },
  component: Scored,
})
