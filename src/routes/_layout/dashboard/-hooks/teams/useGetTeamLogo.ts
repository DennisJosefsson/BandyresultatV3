import {
  queryOptions,
  useQuery,
} from '@tanstack/react-query'
import { getTeamLogo } from '../../-functions/TeamFunctions/getTeamLogo'

export const teamlogoKeys = {
  teamnameForm: (logoId: number | undefined) =>
    ['teamlogoForTeamNameForm', logoId] as const,
}

export const teamlogoQueries = {
  teamForm: (logoId: number) =>
    queryOptions({
      queryKey: teamlogoKeys.teamnameForm(logoId),
      queryFn: () =>
        getTeamLogo({
          data: { logoId },
        }),
      enabled: !!logoId,
    }),
}

export const useTeamLogo = (logoId: number) =>
  useQuery(teamlogoQueries.teamForm(logoId))
