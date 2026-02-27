import { InlineEditGame, submitGameResult } from '@/lib/types/game'
import { zd } from '@/lib/utils/zod'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { updateResult } from '../-functions/GameFunctions/updateResult'

type Data = Awaited<ReturnType<typeof updateResult>>

type GameProps = {
  game: InlineEditGame
}

export const useInlineEditGameForm = ({ game }: GameProps) => {
  const router = useRouter()

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

  const onSuccessSubmit = (data: Data) => {
    router.invalidate({
      filter: (route) => route.routeId === '/_layout/dashboard/games/$today',
    })
    if (!data) {
      toast.success('Okänt fel.')
    } else {
      toast.success(data.message)
    }
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
