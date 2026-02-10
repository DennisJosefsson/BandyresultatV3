import { playoffSeasonObject } from '@/lib/types/playoffseason'
import { zd } from '@/lib/utils/zod'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { updatePlayoffSeason } from '../-functions/SeasonFunctions/updatePlayoffSeason'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/playoffseason/')

type Data = Awaited<ReturnType<typeof updatePlayoffSeason>>

export const usePlayoffSeasonForm = () => {
  const playoffSeason = route.useLoaderData({ select: (s) => s.playoffSeason })
  const defaultValues: zd.input<typeof playoffSeasonObject> = {
    playoffSeasonId: playoffSeason.playoffSeasonId,
    seasonId: playoffSeason.seasonId,
    women: playoffSeason.women ?? false,
    hasEight: playoffSeason.hasEight ?? false,
    hasQuarter: playoffSeason.hasQuarter ?? false,
    playoffAsSeries: playoffSeason.playoffAsSeries ?? false,
    uefaSorting: playoffSeason.uefaSorting ?? false,
  }
  const navigate = route.useNavigate()
  const router = useRouter()
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const women = route.useSearch({
    select: (search) => search.women,
  })
  const mutation = useMutation({
    mutationFn: updatePlayoffSeason,

    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onErrorFunction(error),
  })

  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: playoffSeasonObject },
    onSubmit: ({ value }) => mutation.mutateAsync({ data: value }),
  })

  const returnToSeason = () => {
    navigate({
      to: '/dashboard/season/$seasonId',
      search: { women },
      params: { seasonId },
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
    returnToSeason()
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
