import { submitGameResult } from '@/lib/types/game'
import { zd } from '@/lib/utils/zod'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { updateResult } from '../-functions/GameFunctions/updateResult'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/$gameId',
)

type Data = Awaited<ReturnType<typeof updateResult>>

export const useEditGameForm = () => {
  const game = route.useLoaderData()
  const router = useRouter()

  const women = route.useSearch({
    select: (search) => search.women,
  })

  const navigate = route.useNavigate()

  const mutation = useMutation({
    mutationFn: updateResult,
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onErrorFunction(error),
  })

  const defaultValues: zd.input<typeof submitGameResult> = {
    gameId: game.gameId,
    result: game.result ?? '',
    halftimeResult: game.halftimeResult ?? '',
    date: game.date,
    women: game.women,
    homeTeamId: game.homeTeamId,
    awayTeamId: game.awayTeamId,
    penalties: game.penalties ?? false,
    extraTime: game.extraTime ?? false,
    otResult: game.otResult ?? '',
    homeTeamGameId: game.home.teamGameId,
    awayTeamGameId: game.away.teamGameId,
  }

  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: submitGameResult },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const close = () => {
    navigate({
      to: '/dashboard/season/$seasonId/info/$serieId/edit/games',
      search: { women },
    })
  }

  const onSuccessSubmit = (data: Data) => {
    router.invalidate({
      filter: (route) =>
        route.routeId ===
        '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/games',
    })
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
    close()
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
