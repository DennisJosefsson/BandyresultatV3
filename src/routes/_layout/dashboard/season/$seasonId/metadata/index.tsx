import { createFileRoute } from '@tanstack/react-router'
import { getSeasonInfo } from '../../../-functions/SeasonFunctions/getSeasonInfo'
import MetadataForm from '../../../-components/Forms/MetadataForms/MetadataForm'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/metadata/')({
  loader: async ({ params }) => {
    const season = await getSeasonInfo({ data: { seasonId: params.seasonId } })
    if (!season) throw new Error('Missing data')

    return season
  },
  component: MetadataForm,
})
