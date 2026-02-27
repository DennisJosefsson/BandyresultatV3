import { InlineEditGame } from '@/lib/types/game'
import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { updateDate } from '../-functions/GameFunctions/updateDate'

type Data =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      message: string
    }
  | undefined

const submitGameResult = zd.object({
  gameId: zd.number().int().positive(),
  date: zd.iso.date({ message: 'Fel datumformat.' }),
  homeTeamGameId: zd.number().int().positive(),
  awayTeamGameId: zd.number().int().positive(),
})

type GameProps = {
  game: InlineEditGame
}

export const useInledDateEditForm = ({ game }: GameProps) => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: updateDate,
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onErrorFunction(error),
  })

  const form = useForm({
    defaultValues: {
      gameId: game.gameId,
      date: game.date,
      homeTeamGameId: game.home.teamGameId,
      awayTeamGameId: game.away.teamGameId,
    },
    validators: { onSubmit: submitGameResult, onBlur: submitGameResult },
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
