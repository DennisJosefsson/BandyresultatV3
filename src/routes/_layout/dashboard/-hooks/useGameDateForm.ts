import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { updateDate } from '../-functions/GameFunctions.ts/updateDate'
const route = getRouteApi('/_layout/dashboard/games/$today/$gameId')

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

export const useGameDateForm = () => {
  const game = route.useLoaderData()
  const navigate = route.useNavigate()
  const router = useRouter()
  const today = route.useParams({ select: (s) => s.today })
  const women = route.useSearch({
    select: (search) => search.women,
  })
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

  const close = () => {
    navigate({
      to: '/dashboard/games/$today',
      search: { women },
      params: { today },
    })
  }

  const onSuccessSubmit = (data: Data) => {
    router.invalidate({
      filter: (route) => route.routeId === '/_layout/dashboard/games/$today',
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
