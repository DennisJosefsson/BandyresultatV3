import {
  queryOptions,
  useQuery,
} from '@tanstack/react-query'
import { getTeamName } from '../../-functions/TeamFunctions/getTeamName'

export const teamnameKeys = {
  teamnameForm: (teamnameId: number | undefined) =>
    ['teamnameForTeamForm', teamnameId] as const,
}

export const teamnameQueries = {
  teamForm: (teamnameId: number) =>
    queryOptions({
      queryKey: teamnameKeys.teamnameForm(teamnameId),
      queryFn: () =>
        getTeamName({
          data: { teamnameId },
        }),
      enabled: !!teamnameId,
    }),
}

export const useTeamName = (teamnameId: number) =>
  useQuery(teamnameQueries.teamForm(teamnameId))
