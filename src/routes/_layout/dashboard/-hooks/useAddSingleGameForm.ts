import { zd } from '@/lib/utils/zod'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { toast } from 'sonner'
import { parseNewGameWithResult } from '../-functions/dataParsers/parseGameResults'
import { addSingleGame } from '../-functions/GameFunctions/addSingleGame'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/singlegame',
)

type Data = Awaited<ReturnType<typeof addSingleGame>>

export const useAddSingleGameForm = () => {
  const serie = route.useLoaderData({ select: (s) => s.serie })

  const defaultValues: zd.input<typeof parseNewGameWithResult> = {
    result: '',
    otResult: '',
    halftimeResult: '',
    homeTeamId: 0,
    awayTeamId: 0,
    date: '',
    group: serie.group,
    category: serie.category,
    seasonId: serie.seasonId,
    serieId: serie.serieId,
    women: serie.season.women ?? false,
    penalties: false,
    extraTime: false,
    playoff: ['eight', 'quarter', 'semi', 'final'].includes(serie.category),
  }

  const mutation = useMutation({
    mutationFn: addSingleGame,

    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: parseNewGameWithResult,
    },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel')
    }
  }

  return form
}
