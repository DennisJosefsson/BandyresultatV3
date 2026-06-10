import { queryOptions } from '@tanstack/react-query'
import { getMunicipalitiesForTeamForm } from '../-functions/TeamFunctions/getMunicipalitiesForTeamForm'

export const municipalityKeys = {
  teamForm: (countyId: number) => ['municipalities', countyId] as const,
}

export const municipalityQueries = {
  teamForm: (countyId: number) =>
    queryOptions({
      queryKey: municipalityKeys.teamForm(countyId),
      queryFn: () => getMunicipalitiesForTeamForm({ data: { countyId } }),
    }),
}
