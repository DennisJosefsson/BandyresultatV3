import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { getRouteApi } from '@tanstack/react-router'
import { editCompetitionObject } from '../-functions/CompetitionFunctions/editCompetition'
import { useEditCompetitionMutation } from './editCompetitionMutation'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/edit',
)

export const useEditCompetitionForm = () => {
  const mutation = useEditCompetitionMutation()

  const data = route.useLoaderData()

  if (data.status === 404) {
    throw new Error(data.message)
  }

  const defaultValues: zd.input<
    typeof editCompetitionObject
  > = data.competition
  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: editCompetitionObject,
    },
    defaultValues: { ...defaultValues },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  return form
}
