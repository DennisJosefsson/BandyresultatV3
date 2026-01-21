import { createFileRoute } from '@tanstack/react-router'
import Conceded from '../-components/Records/PointsGoalsEtc/Conceded'
import { getConcededRecords } from '../-functions/getConcededRecords'

export const Route = createFileRoute('/_layout/maraton/records/conceded')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getConcededRecords({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data.conceded
  },
  component: Conceded,
})
