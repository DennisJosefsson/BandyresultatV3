import { createFileRoute } from '@tanstack/react-router'
import { getAllSeasons } from '../-functions/SeasonFunctions/getAllSeasons'
import SeasonsList from '../-components/Season/SeasonsList'

export const Route = createFileRoute('/_layout/dashboard/seasons/')({
  loader: async () => {
    const seasons = await getAllSeasons()
    if (!seasons) throw new Error('Missing data.')
    return seasons
  },
  component: SeasonsList,
})
