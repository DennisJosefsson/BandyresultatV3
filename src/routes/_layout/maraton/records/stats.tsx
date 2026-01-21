import { createFileRoute } from '@tanstack/react-router'
import GeneralStats from '../-components/Records/PointsGoalsEtc/GeneralStats'
import { getGeneralStats } from '../-functions/getGeneralStats'

export const Route = createFileRoute('/_layout/maraton/records/stats')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getGeneralStats({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data.generalStats
  },
  component: GeneralStats,
})
