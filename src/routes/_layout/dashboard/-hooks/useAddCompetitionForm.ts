import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { useSearch } from '@tanstack/react-router'
import { addCompetitionObject } from '../-functions/CompetitionFunctions/addCompetition'
import { useAddCompetitionMutation } from './addCompetitionMutation'

export const useAddCompetitionForm = ({
  seasonId,
}: {
  seasonId: number
}) => {
  const women = useSearch({
    from: '__root__',
    select: (s) => s.women,
  })
  const mutation = useAddCompetitionMutation()

  const defaultValues: zd.input<
    typeof addCompetitionObject
  > = {
    seasonId,
    competitionName: '',
    division: 1,
    isCup: false,
    women: women,
  }
  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: addCompetitionObject,
    },
    defaultValues: { ...defaultValues },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  return form
}
