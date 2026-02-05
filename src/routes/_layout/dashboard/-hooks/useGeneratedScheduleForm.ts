import { generatedGameObjectArray } from '@/lib/types/game'
import { zd } from '@/lib/utils/zod'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { toast } from 'sonner'
import { insertFromGeneratedSchedule } from '../-functions/GameFunctions.ts/insertFromGeneratedSchedule'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/generateschedule',
)

type Data = Awaited<ReturnType<typeof insertFromGeneratedSchedule>>

export const useGeneratedScheduleForm = () => {
  const gameData = route.useLoaderData({ select: (s) => s.games })
  const defaultValues: zd.input<typeof generatedGameObjectArray> = {
    gameArray: gameData,
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
