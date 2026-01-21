import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import Streaks from '../-components/Records/Streaks/Streaks'
import { getStreakRecords } from '../-functions/getStreakRecords'

export const Route = createFileRoute('/_layout/maraton/records/streaks')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getStreakRecords({
      data: { women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data.data
  },
  component: Streaks,
  pendingComponent: () => <Loading page="streaks" />,
})
