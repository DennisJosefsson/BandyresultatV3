import { createFileRoute } from '@tanstack/react-router'
import { getSeasonInfo } from '../../-functions/SeasonFunctions/getSeasonInfo'
import Season from '../../-components/Season/Season'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/')({
  loader: async ({ params }) => {
    const season = await getSeasonInfo({ data: { seasonId: params.seasonId } })
    if (!season) throw new Error('Missing data')

    return season
  },
  component: Season,
})
