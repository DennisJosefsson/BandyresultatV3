import { createFileRoute } from '@tanstack/react-router'
import { getSeasonInfo } from '../../../-functions/SeasonFunctions/getSeasonInfo'
import PlayoffSeasonForm from '../../../-components/Forms/PlayoffSeasonForm/PlayoffSeasonForm'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/playoffseason/')({
  loader: async ({ params }) => {
    const season = await getSeasonInfo({ data: { seasonId: params.seasonId } })
    if (!season) throw new Error('Missing data')

    return season
  },
  component: PlayoffSeasonForm,
})
