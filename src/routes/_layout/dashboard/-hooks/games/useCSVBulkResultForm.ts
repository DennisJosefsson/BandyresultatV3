import type { BulkResultFileParser } from '@/lib/types/game'
import { bulkResultsArray } from '@/lib/types/game'
import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { toast } from 'sonner'
import { bulkResults } from '../../-functions/GameFunctions/bulkResults'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit',
)

type Data = Awaited<ReturnType<typeof bulkResults>>

type UseCSVBulkResultFormProps = {
  gameData: BulkResultFileParser
}

export const useCSVBulkResultForm = ({
  gameData,
}: UseCSVBulkResultFormProps) => {
  const serie = route.useLoaderData({
    select: (s) => s.serie,
  })
  const defaultValues: zd.input<typeof bulkResultsArray> = {
    gameObjectsArray: gameData.map((game) => {
      return {
        homeTeamId: game.homeTeamId,
        awayTeamId: game.awayTeamId,
        result: game.result ?? '',
        otResult: game.otResult ?? '',
        halftimeResult: game.halftimeResult ?? '',
        date: game.date,
        ...serie,
        played: true,
        playoff: [
          'eight',
          'quarter',
          'semi',
          'final',
        ].includes(serie.category),
        women: serie.season.women ?? false,
        penalties: false,
        extraTime: false,
      }
    }),
  }
  const navigate = route.useNavigate()

  const mutation = useMutation({
    mutationFn: bulkResults,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: bulkResultsArray,
    },
    defaultValues: { ...defaultValues },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    navigate({
      to: '/dashboard/season/$seasonId/info/serie/$serieId/edit',
      search: (prev) => ({ ...prev }),
    })
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
