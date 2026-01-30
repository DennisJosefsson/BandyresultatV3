import { metadataObject } from '@/lib/types/metadata'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { updateMetadata } from '../-functions/SeasonFunctions/updateMetadata'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/metadata/')

type Data =
  | {
      status: 200
      message: string
    }
  | undefined

export const useMetadataForm = () => {
  const metadata = route.useLoaderData({
    select: (s) => s.metadata,
  })
  const navigate = route.useNavigate()
  const router = useRouter()
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const women = route.useSearch({
    select: (search) => search.women,
  })

  const mutation = useMutation({
    mutationFn: updateMetadata,
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onErrorFunction(error),
  })

  const { winnerId, ...rest } = metadata

  const form = useForm({
    defaultValues: {
      ...rest,
      name: rest?.name ?? '',
      year: rest?.year ?? '',
      winnerName: rest?.winnerName ?? '',
      hostCity: rest?.hostCity ?? '',
      finalDate: rest?.finalDate ?? '',
      comment: rest?.comment ?? '',
    },
    validators: { onBlur: metadataObject, onSubmit: metadataObject },
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
