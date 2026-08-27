import type { zd } from '@/lib/utils/zod'
import {
  revalidateLogic,
  useForm,
} from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useRouter,
} from '@tanstack/react-router'
import { toast } from 'sonner'

import {
  gameEditArray,
  updateGameArrayResult,
} from '../-functions/GameFunctions/updateGameArrayResult'

const route = getRouteApi('/_layout/dashboard/games/$today')

type Data = Awaited<
  ReturnType<typeof updateGameArrayResult>
>

export const useInlineEditGameArrayForm = () => {
  const router = useRouter()
  const values = route.useLoaderData()
  const navigate = route.useNavigate()
  const mutation = useMutation({
    mutationFn: updateGameArrayResult,
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onErrorFunction(error),
  })

  const defaultValues: zd.input<typeof gameEditArray> = {
    gameArray: values.map((gameObject) => {
      return {
        gameId: gameObject.gameId,
        result: gameObject.result ?? '',
        halftimeResult: gameObject.halftimeResult ?? '',
        date: gameObject.date,
        women: gameObject.women,
        homeTeamId: gameObject.homeTeamId,
        awayTeamId: gameObject.awayTeamId,
        penalties: gameObject.penalties ?? false,
        extraTime: gameObject.extraTime ?? false,
        otResult: gameObject.otResult ?? '',
        homeTeamGameId: gameObject.home.teamGameId,
        awayTeamGameId: gameObject.away.teamGameId,
      }
    }),
  }

  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: gameEditArray },
    onSubmit: ({ value }) =>
      mutation.mutateAsync({ data: value }),
  })

  const onSuccessSubmit = (data: Data) => {
    router.invalidate({
      filter: (route2) =>
        route2.routeId ===
        '/_layout/dashboard/games/$today',
    })
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    navigate({
      to: '/dashboard',
      search: (prev) => ({ ...prev }),
    })
  }

  const onErrorFunction = (error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Något gick fel.')
    }
  }

  return form
}
