import { BulkGameFileParser, generatedGameObjectArray } from '@/lib/types/game'
import { zd } from '@/lib/utils/zod'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { toast } from 'sonner'
import { insertFromGeneratedSchedule } from '../-functions/GameFunctions.ts/insertFromGeneratedSchedule'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)

type Data = Awaited<ReturnType<typeof insertFromGeneratedSchedule>>

type UseBulkGameFormProps = {
  gameData: BulkGameFileParser
}

export const useBulkGameForm = ({ gameData }: UseBulkGameFormProps) => {
  const serie = route.useLoaderData({ select: (s) => s.serie })
  const defaultValues: zd.input<typeof generatedGameObjectArray> = {
    gameArray: gameData.map((game) => {
      return {
        homeTeamId: game.homeTeamId,
        awayTeamId: game.awayTeamId,
        date: game.date,
        ...serie,
        played: false,
        playoff: ['eight', 'quarter', 'semi', 'final'].includes(serie.category),
        women: serie.season.women ?? false,
      }
    }),
  }
  const navigate = route.useNavigate()

  const mutation = useMutation({
    mutationFn: insertFromGeneratedSchedule,
    onSuccess: (data) => onMutationSuccess(data),
    onError: (error) => onMutationError(error),
  })

  const form = useForm({
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: generatedGameObjectArray,
    },
    defaultValues: { ...defaultValues },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const onMutationSuccess = (data: Data) => {
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    navigate({ to: '..', search: (prev) => ({ women: prev.women }) })
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
