import { createFileRoute } from '@tanstack/react-router'
import Season from '../../-components/Season/Season'
import { getSeasonInfo } from '../../-functions/SeasonFunctions/getSeasonInfo'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/')({
  loader: async ({ params }) => {
    const season = await getSeasonInfo({ data: { seasonId: params.seasonId } })
    if (!season) throw new Error('Missing data')

    return season
  },
  component: Season,
})
