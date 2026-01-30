import { zd } from '@/lib/utils/zod'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { updateResult } from '../-functions/GameFunctions.ts/updateResult'

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
  homeTeamId: zd.number().int().positive(),
  awayTeamId: zd.number().int().positive(),
  result: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' }),
  halftimeResult: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat, halvtid.' })
    .or(zd.literal('')),
  otResult: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, {
      message: 'Fel resultatformat, övertid eller straffar.',
    })
    .or(zd.literal('')),
  date: zd.iso.date({ message: 'Fel datumformat.' }),
  extraTime: zd.boolean(),
  penalties: zd.boolean(),
  women: zd.boolean(),
  homeTeamGameId: zd.number().int().positive(),
  awayTeamGameId: zd.number().int().positive(),
})

export const useGameResultForm = () => {
  const game = route.useLoaderData()
  const router = useRouter()
  const today = route.useParams({ select: (s) => s.today })
  const women = route.useSearch({
    select: (search) => search.women,
  })

  const navigate = route.useNavigate()

  const mutation = useMutation({
    mutationFn: updateResult,
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onErrorFunction(error),
  })

  const form = useForm({
    defaultValues: {
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
